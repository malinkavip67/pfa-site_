import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "pfa_admin_session";
export const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 8;

export interface AdminSession {
  id: string;
  login: string;
  name: string;
  expiresAt: number;
}

interface AdminUser {
  id: string;
  login: string;
  password: string;
  name: string;
}

interface SessionPayload extends AdminSession {
  version: 2;
}

function getAdminConfig() {
  const serializedUsers = process.env.ADMIN_USERS_JSON;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!serializedUsers || !secret || secret.length < 32) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(serializedUsers);
    if (!Array.isArray(parsed) || parsed.length === 0) return null;

    const users: AdminUser[] = [];
    const ids = new Set<string>();
    const logins = new Set<string>();

    for (const value of parsed) {
      if (!value || typeof value !== "object") return null;
      const record = value as Record<string, unknown>;
      const id = typeof record.id === "string" ? record.id.trim() : "";
      const login = typeof record.login === "string" ? record.login.trim() : "";
      const password = typeof record.password === "string" ? record.password : "";
      const name = typeof record.name === "string" ? record.name.trim() : "";

      if (
        !id || !login || !password || !name
        || id.length > 100 || login.length > 200
        || password.length < 12 || password.length > 500 || name.length > 200
        || ids.has(id) || logins.has(login)
      ) {
        return null;
      }

      ids.add(id);
      logins.add(login);
      users.push({ id, login, password, name });
    }

    return { users, secret };
  } catch {
    return null;
  }
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    timingSafeEqual(leftBuffer, Buffer.alloc(leftBuffer.length));
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function signPayload(encodedPayload: string, secret: string) {
  return createHmac("sha256", secret).update(encodedPayload).digest("base64url");
}

export function isAdminAuthConfigured() {
  return getAdminConfig() !== null;
}

export function verifyAdminCredentials(
  login: string,
  password: string,
): Omit<AdminUser, "password"> | null {
  const config = getAdminConfig();
  if (!config) return null;

  const user = config.users.find((candidate) => safeEqual(login, candidate.login));
  if (!user || !safeEqual(password, user.password)) return null;

  return { id: user.id, login: user.login, name: user.name };
}

export function createAdminSessionToken(user: Omit<AdminUser, "password">) {
  const config = getAdminConfig();
  if (!config) return null;

  const payload: SessionPayload = {
    version: 2,
    id: user.id,
    login: user.login,
    name: user.name,
    expiresAt: Math.floor(Date.now() / 1000) + ADMIN_SESSION_TTL_SECONDS,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = signPayload(encodedPayload, config.secret);

  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(token: string | undefined): AdminSession | null {
  const config = getAdminConfig();
  if (!config || !token) return null;

  const [encodedPayload, signature, extraPart] = token.split(".");
  if (!encodedPayload || !signature || extraPart) return null;

  const expectedSignature = signPayload(encodedPayload, config.secret);
  if (!safeEqual(signature, expectedSignature)) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8"),
    ) as Partial<SessionPayload>;

    const isValid = (
      payload.version === 2
      && typeof payload.id === "string"
      && typeof payload.login === "string"
      && typeof payload.name === "string"
      && typeof payload.expiresAt === "number"
      && Number.isSafeInteger(payload.expiresAt)
      && payload.expiresAt > Math.floor(Date.now() / 1000)
    );
    if (!isValid) return null;

    const configuredUser = config.users.find((user) => user.id === payload.id);
    if (
      !configuredUser
      || !safeEqual(payload.login!, configuredUser.login)
      || !safeEqual(payload.name!, configuredUser.name)
    ) {
      return null;
    }

    return {
      id: payload.id!,
      login: payload.login!,
      name: payload.name!,
      expiresAt: payload.expiresAt!,
    };
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function isAdminAuthenticated() {
  return (await getAdminSession()) !== null;
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_SESSION_TTL_SECONDS,
  };
}
