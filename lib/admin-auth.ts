import "server-only";

import { createHash, createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { neonQuery } from "@/lib/neon";

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
  email: string | null;
}

interface SessionPayload extends AdminSession {
  version: 1;
}

const scryptAsync = promisify(scrypt);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_HASH_PREFIX = "scrypt";
const PASSWORD_MIN_LENGTH = 12;

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
      const email = typeof record.email === "string" ? record.email.trim().toLowerCase() : null;

      if (
        !id || !login || !password || !name
        || id.length > 100 || login.length > 200
        || password.length > 500 || name.length > 200
        || (email !== null && (!EMAIL_PATTERN.test(email) || email.length > 254))
        || ids.has(id) || logins.has(login)
      ) {
        return null;
      }

      ids.add(id);
      logins.add(login);
      users.push({ id, login, password, name, email });
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

async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const derivedKey = await scryptAsync(password, salt, 64) as Buffer;
  return `${PASSWORD_HASH_PREFIX}$${salt.toString("base64url")}$${derivedKey.toString("base64url")}`;
}

async function verifyPasswordHash(password: string, storedHash: string) {
  const [prefix, encodedSalt, encodedHash, extra] = storedHash.split("$");
  if (prefix !== PASSWORD_HASH_PREFIX || !encodedSalt || !encodedHash || extra) return false;

  try {
    const expected = Buffer.from(encodedHash, "base64url");
    const derived = await scryptAsync(password, Buffer.from(encodedSalt, "base64url"), expected.length) as Buffer;
    return expected.length === derived.length && timingSafeEqual(expected, derived);
  } catch {
    return false;
  }
}

export function isValidAdminPassword(password: string) {
  return password.length >= PASSWORD_MIN_LENGTH && password.length <= 500;
}

export async function verifyAdminCredentials(
  login: string,
  password: string,
): Promise<Omit<AdminUser, "password" | "email"> | null> {
  const config = getAdminConfig();
  if (!config) return null;

  const user = config.users.find((candidate) => safeEqual(login, candidate.login));
  if (!user) return null;

  try {
    const queryCredential = () => neonQuery<{ passwordHash: string | null }>(
      `SELECT "passwordHash" FROM "AdminCredential" WHERE "adminId"=$1 LIMIT 1`,
      [user.id],
    );
    let rows: { passwordHash: string | null }[];
    try {
      rows = await queryCredential();
    } catch {
      rows = await queryCredential();
    }
    const credential = rows[0];
    const isValid = credential?.passwordHash
      ? await verifyPasswordHash(password, credential.passwordHash)
      : safeEqual(password, user.password);
    if (!isValid) return null;
  } catch {
    return null;
  }

  return { id: user.id, login: user.login, name: user.name };
}

export function createAdminSessionToken(user: Omit<AdminUser, "password" | "email">) {
  const config = getAdminConfig();
  if (!config) return null;

  const payload: SessionPayload = {
    version: 1,
    id: user.id,
    login: user.login,
    name: user.name,
    expiresAt: Math.floor(Date.now() / 1000) + ADMIN_SESSION_TTL_SECONDS,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = signPayload(encodedPayload, config.secret);

  return `${encodedPayload}.${signature}`;
}

export function getAdminUserByEmail(email: string) {
  const config = getAdminConfig();
  if (!config) return null;
  const normalizedEmail = email.trim().toLowerCase();
  const user = config.users.find((candidate) => candidate.email === normalizedEmail);
  return user ? { id: user.id, login: user.login, name: user.name, email: user.email! } : null;
}

export async function createAdminPasswordReset(adminId: string) {
  const token = randomBytes(32).toString("base64url");
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

  await neonQuery(
    `INSERT INTO "AdminCredential"
     ("adminId","passwordHash","resetTokenHash","resetExpiresAt","updatedAt")
     VALUES ($1,NULL,$2,$3,CURRENT_TIMESTAMP)
     ON CONFLICT ("adminId") DO UPDATE SET
     "resetTokenHash"=EXCLUDED."resetTokenHash",
     "resetExpiresAt"=EXCLUDED."resetExpiresAt",
     "updatedAt"=CURRENT_TIMESTAMP`,
    [adminId, tokenHash, expiresAt.toISOString()],
  );

  return { token, tokenHash };
}

export async function clearAdminPasswordReset(adminId: string, tokenHash: string) {
  await neonQuery(
    `UPDATE "AdminCredential" SET "resetTokenHash"=NULL,"resetExpiresAt"=NULL,"updatedAt"=CURRENT_TIMESTAMP
     WHERE "adminId"=$1 AND "resetTokenHash"=$2`,
    [adminId, tokenHash],
  );
}

export async function resetAdminPassword(token: string, password: string) {
  if (!token || token.length > 200 || !isValidAdminPassword(password)) return false;
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const passwordHash = await hashPassword(password);
  const rows = await neonQuery<{ adminId: string }>(
    `UPDATE "AdminCredential" SET
     "passwordHash"=$2,"resetTokenHash"=NULL,"resetExpiresAt"=NULL,"updatedAt"=CURRENT_TIMESTAMP
     WHERE "resetTokenHash"=$1 AND "resetExpiresAt">CURRENT_TIMESTAMP
     RETURNING "adminId"`,
    [tokenHash, passwordHash],
  );
  return Boolean(rows[0]);
}

export async function changeAdminPassword(adminId: string, password: string) {
  if (!isValidAdminPassword(password)) return false;
  const passwordHash = await hashPassword(password);
  await neonQuery(
    `INSERT INTO "AdminCredential"
     ("adminId","passwordHash","resetTokenHash","resetExpiresAt","updatedAt")
     VALUES ($1,$2,NULL,NULL,CURRENT_TIMESTAMP)
     ON CONFLICT ("adminId") DO UPDATE SET
     "passwordHash"=EXCLUDED."passwordHash",
     "resetTokenHash"=NULL,
     "resetExpiresAt"=NULL,
     "updatedAt"=CURRENT_TIMESTAMP`,
    [adminId, passwordHash],
  );
  return true;
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
      payload.version === 1
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
