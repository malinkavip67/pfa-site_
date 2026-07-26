import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAdminSessionCookieOptions,
  isAdminAuthConfigured,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

interface LoginAttempt {
  count: number;
  resetAt: number;
}

const globalForLoginAttempts = globalThis as typeof globalThis & {
  pfaAdminLoginAttempts?: Map<string, LoginAttempt>;
};

const loginAttempts = globalForLoginAttempts.pfaAdminLoginAttempts ?? new Map<string, LoginAttempt>();

if (process.env.NODE_ENV !== "production") {
  globalForLoginAttempts.pfaAdminLoginAttempts = loginAttempts;
}

function getRequestKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || request.headers.get("x-real-ip") || "local";
}

function getActiveAttempt(key: string) {
  const attempt = loginAttempts.get(key);

  if (attempt && attempt.resetAt <= Date.now()) {
    loginAttempts.delete(key);
    return null;
  }

  return attempt ?? null;
}

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { ok: false, message: "Вход администратора пока не настроен." },
      { status: 503 },
    );
  }

  const requestKey = getRequestKey(request);
  const activeAttempt = getActiveAttempt(requestKey);

  if (activeAttempt && activeAttempt.count >= MAX_ATTEMPTS) {
    const retryAfter = Math.max(1, Math.ceil((activeAttempt.resetAt - Date.now()) / 1000));
    return NextResponse.json(
      { ok: false, message: "Слишком много попыток. Попробуйте позже." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, message: "Введите логин и пароль." },
        { status: 400 },
      );
    }

    const payload = body as Record<string, unknown>;
    const login = typeof payload.login === "string" ? payload.login.trim() : "";
    const password = typeof payload.password === "string" ? payload.password : "";

    if (!login || !password || login.length > 200 || password.length > 500) {
      return NextResponse.json(
        { ok: false, message: "Введите логин и пароль." },
        { status: 400 },
      );
    }

    const user = await verifyAdminCredentials(login, password);
    if (!user) {
      const previousCount = activeAttempt?.count ?? 0;
      loginAttempts.set(requestKey, {
        count: previousCount + 1,
        resetAt: activeAttempt?.resetAt ?? Date.now() + ATTEMPT_WINDOW_MS,
      });

      return NextResponse.json(
        { ok: false, message: "Неверный логин или пароль." },
        { status: 401 },
      );
    }

    const token = createAdminSessionToken(user);
    if (!token) {
      return NextResponse.json(
        { ok: false, message: "Вход администратора пока не настроен." },
        { status: 503 },
      );
    }

    loginAttempts.delete(requestKey);
    const response = NextResponse.json({ ok: true });
    response.cookies.set(
      ADMIN_SESSION_COOKIE,
      token,
      getAdminSessionCookieOptions(),
    );

    return response;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Некорректный формат запроса." },
      { status: 400 },
    );
  }
}
