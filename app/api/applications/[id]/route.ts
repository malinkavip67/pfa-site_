import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { neonQuery } from "@/lib/neon";
import { APPLICATION_STATUSES, type ApplicationStatusValue } from "@/types/application";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ id: string }>;
}

function isApplicationStatus(value: unknown): value is ApplicationStatusValue {
  return typeof value === "string" && APPLICATION_STATUSES.some((status) => status === value);
}

export async function PATCH(request: Request, { params }: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { ok: false, message: "Требуется авторизация." },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;
    if (!id || id.length > 100) {
      return NextResponse.json({ ok: false, message: "Некорректный идентификатор заявки." }, { status: 400 });
    }

    const body: unknown = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, message: "Некорректные данные." }, { status: 400 });
    }

    const payload = body as Record<string, unknown>;
    const data: { status?: ApplicationStatusValue; internalNote?: string | null } = {};

    if ("status" in payload) {
      if (!isApplicationStatus(payload.status)) {
        return NextResponse.json({ ok: false, message: "Некорректный статус заявки." }, { status: 400 });
      }
      data.status = payload.status;
    }

    if ("internalNote" in payload) {
      if (typeof payload.internalNote !== "string" || payload.internalNote.length > 10_000) {
        return NextResponse.json({ ok: false, message: "Внутренняя заметка слишком длинная." }, { status: 400 });
      }
      data.internalNote = payload.internalNote.trim() || null;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ ok: false, message: "Нет данных для сохранения." }, { status: 400 });
    }

    const rows = await neonQuery<{
      id: string;
      status: ApplicationStatusValue;
      internalNote: string | null;
    }>(
      `UPDATE "Application" SET
       "status"=CASE WHEN $2::boolean THEN $3::"ApplicationStatus" ELSE "status" END,
       "internalNote"=CASE WHEN $4::boolean THEN $5 ELSE "internalNote" END,
       "updatedAt"=CURRENT_TIMESTAMP
       WHERE "id"=$1
       RETURNING "id","status","internalNote"`,
      [id, data.status !== undefined, data.status ?? null, data.internalNote !== undefined, data.internalNote ?? null],
    );

    if (!rows[0]) {
      return NextResponse.json({ ok: false, message: "Заявка не найдена." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, application: rows[0] });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ ok: false, message: "Некорректный формат запроса." }, { status: 400 });
    }

    console.error("Application update failed.");

    return NextResponse.json(
      { ok: false, message: "Не удалось сохранить изменения. Попробуйте ещё раз." },
      { status: 500 },
    );
  }
}
