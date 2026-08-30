import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createDatabaseId, databaseQuery } from "@/lib/postgres";
import {
  APPLICATION_STATUSES,
  type ApplicationRecord,
  type ApplicationStatusValue,
} from "@/types/application";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readRequiredString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;

  const normalized = value.trim();
  if (!normalized || normalized.length > maxLength) return null;

  return normalized;
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { ok: false, message: "Требуется авторизация." },
      { status: 401 },
    );
  }

  try {
    const applications = await databaseQuery<ApplicationRecord>(
      `SELECT "id","createdAt","type","firstName","lastName","phone","email","story",
       "isAdult","consent","status","internalNote"
       FROM "Application" ORDER BY "createdAt" DESC`,
    );

    return NextResponse.json({ ok: true, applications });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Не удалось загрузить заявки." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, message: "Некорректные данные заявки." }, { status: 400 });
    }

    const payload = body as Record<string, unknown>;
    const isAdminEntry = payload.adminEntry === true;
    const isAdmin = isAdminEntry ? await isAdminAuthenticated() : false;

    if (isAdminEntry && !isAdmin) {
      return NextResponse.json({ ok: false, message: "Требуется авторизация." }, { status: 401 });
    }

    const type = payload.type === "PLAYER" || payload.type === "PARENT" ? payload.type : null;
    const firstName = readRequiredString(payload.firstName, 100);
    const lastName = readRequiredString(payload.lastName, 100);
    const phone = readRequiredString(payload.phone, 50);
    const email = readRequiredString(payload.email, 254)?.toLowerCase() ?? null;
    const story = readRequiredString(payload.story, 10_000);
    const isAdult = payload.isAdult === true;
    const consent = payload.consent === true;
    const internalNote = typeof payload.internalNote === "string"
      ? payload.internalNote.trim().slice(0, 10_000) || null
      : null;
    const requestedStatus = typeof payload.status === "string"
      && APPLICATION_STATUSES.includes(payload.status as ApplicationStatusValue)
      ? payload.status as ApplicationStatusValue
      : "NEW";

    if (!type || !firstName || !lastName || !phone || !email || !story) {
      return NextResponse.json({ ok: false, message: "Заполните все обязательные поля." }, { status: 400 });
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ ok: false, message: "Укажите корректный адрес электронной почты." }, { status: 400 });
    }

    if (!consent) {
      return NextResponse.json({ ok: false, message: "Для отправки заявки необходимо согласие на обработку данных." }, { status: 400 });
    }

    if (!isAdult) {
      return NextResponse.json({ ok: false, message: "Подтвердите возраст или полномочия законного представителя." }, { status: 400 });
    }

    const id = createDatabaseId();
    const rows = await databaseQuery<ApplicationRecord>(
      `INSERT INTO "Application"
       ("id","createdAt","updatedAt","type","firstName","lastName","phone","email","story","isAdult","consent","status","internalNote")
       VALUES ($1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,$2::"ApplicationType",$3,$4,$5,$6,$7,$8,$9,$10::"ApplicationStatus",$11)
       RETURNING "id","createdAt","type","firstName","lastName","phone","email","story",
       "isAdult","consent","status","internalNote"`,
      [id, type, firstName, lastName, phone, email, story, isAdult, consent, isAdmin ? requestedStatus : "NEW", isAdmin ? internalNote : null],
    );

    return NextResponse.json(
      {
        ok: true,
        id,
        application: rows[0] ? { ...rows[0], createdAt: String(rows[0].createdAt) } : undefined,
        message: "Заявка успешно отправлена.",
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ ok: false, message: "Некорректный формат запроса." }, { status: 400 });
    }

    console.error("Application creation failed.");

    return NextResponse.json(
      { ok: false, message: "Не удалось отправить заявку. Попробуйте ещё раз позже." },
      { status: 500 },
    );
  }
}
