import { NextResponse } from "next/server";
import {
  clearAdminPasswordReset,
  createAdminPasswordReset,
  getAdminUserByEmail,
  isAdminAuthConfigured,
} from "@/lib/admin-auth";
import { isAdminEmailConfigured, sendAdminPasswordResetEmail } from "@/lib/admin-email";

export const runtime = "nodejs";

const GENERIC_MESSAGE = "Если такой email зарегистрирован, ссылка для восстановления будет отправлена.";
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

function getRequestKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "local";
}

export async function POST(request: Request) {
  if (!isAdminAuthConfigured() || !isAdminEmailConfigured()) {
    return NextResponse.json(
      { ok: false, message: "Восстановление пароля пока не настроено." },
      { status: 503 },
    );
  }

  const key = getRequestKey(request);
  const current = attempts.get(key);
  if (current && current.resetAt <= Date.now()) attempts.delete(key);
  const active = attempts.get(key);
  if (active && active.count >= MAX_ATTEMPTS) {
    return NextResponse.json(
      { ok: false, message: "Слишком много запросов. Попробуйте позже." },
      { status: 429 },
    );
  }

  attempts.set(key, {
    count: (active?.count ?? 0) + 1,
    resetAt: active?.resetAt ?? Date.now() + ATTEMPT_WINDOW_MS,
  });

  try {
    const body: unknown = await request.json();
    const email = body && typeof body === "object" && "email" in body && typeof body.email === "string"
      ? body.email.trim().toLowerCase()
      : "";

    if (!email || email.length > 254) {
      return NextResponse.json({ ok: true, message: GENERIC_MESSAGE });
    }

    const user = getAdminUserByEmail(email);
    if (!user) {
      return NextResponse.json({ ok: true, message: GENERIC_MESSAGE });
    }

    const reset = await createAdminPasswordReset(user.id);
    const sent = await sendAdminPasswordResetEmail({
      email: user.email,
      name: user.name,
      token: reset.token,
    });

    if (!sent) {
      await clearAdminPasswordReset(user.id, reset.tokenHash);
      return NextResponse.json(
        { ok: false, message: "Не удалось отправить письмо. Попробуйте позже." },
        { status: 503 },
      );
    }

    return NextResponse.json({ ok: true, message: GENERIC_MESSAGE });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Не удалось обработать запрос. Попробуйте позже." },
      { status: 500 },
    );
  }
}
