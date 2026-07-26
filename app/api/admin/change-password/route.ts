import { NextResponse } from "next/server";
import {
  changeAdminPassword,
  getAdminSession,
  isValidAdminPassword,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, message: "Требуется авторизация." }, { status: 401 });
  }

  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, message: "Некорректный запрос." }, { status: 400 });
    }

    const payload = body as Record<string, unknown>;
    const currentPassword = typeof payload.currentPassword === "string" ? payload.currentPassword : "";
    const newPassword = typeof payload.newPassword === "string" ? payload.newPassword : "";

    if (!isValidAdminPassword(newPassword)) {
      return NextResponse.json(
        { ok: false, message: "Новый пароль должен содержать не менее 12 символов." },
        { status: 400 },
      );
    }

    if (!(await verifyAdminCredentials(session.login, currentPassword))) {
      return NextResponse.json(
        { ok: false, message: "Текущий пароль указан неверно." },
        { status: 401 },
      );
    }

    await changeAdminPassword(session.id, newPassword);
    return NextResponse.json({ ok: true, message: "Пароль успешно изменён." });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Не удалось изменить пароль. Попробуйте позже." },
      { status: 500 },
    );
  }
}
