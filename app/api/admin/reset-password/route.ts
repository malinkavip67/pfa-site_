import { NextResponse } from "next/server";
import { isValidAdminPassword, resetAdminPassword } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, message: "Некорректный запрос." }, { status: 400 });
    }

    const payload = body as Record<string, unknown>;
    const token = typeof payload.token === "string" ? payload.token : "";
    const password = typeof payload.password === "string" ? payload.password : "";

    if (!isValidAdminPassword(password)) {
      return NextResponse.json(
        { ok: false, message: "Пароль должен содержать не менее 12 символов." },
        { status: 400 },
      );
    }

    if (!(await resetAdminPassword(token, password))) {
      return NextResponse.json(
        { ok: false, message: "Ссылка недействительна или срок её действия истёк." },
        { status: 400 },
      );
    }

    return NextResponse.json({ ok: true, message: "Пароль изменён. Теперь можно войти." });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Не удалось изменить пароль. Попробуйте позже." },
      { status: 500 },
    );
  }
}
