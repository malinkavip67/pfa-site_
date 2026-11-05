import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { SITE_URL } from "@/lib/constants";
import { createDatabaseId, databaseQuery } from "@/lib/postgres";
import { QUESTIONNAIRE_SELECT, toQuestionnaireRecord } from "@/lib/player-questionnaire";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const rows = await databaseQuery<Record<string, unknown>>(
    `SELECT ${QUESTIONNAIRE_SELECT},
      CASE WHEN p."id" IS NULL THEN NULL ELSE CONCAT_WS(' ',p."lastName",p."firstName") END AS "linkedPlayerName"
     FROM "PlayerQuestionnaire" q LEFT JOIN "Player" p ON p."id"=q."linkedPlayerId"
     ORDER BY q."createdAt" DESC`,
  );
  return NextResponse.json({ ok: true, questionnaires: rows.map(toQuestionnaireRecord) });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await request.json().catch(() => ({})) as { linkedPlayerId?: unknown };
  const linkedPlayerId = typeof body.linkedPlayerId === "string" && body.linkedPlayerId ? body.linkedPlayerId : null;
  if (linkedPlayerId) {
    const player = await databaseQuery<{ id: string }>(`SELECT "id" FROM "Player" WHERE "id"=$1 LIMIT 1`, [linkedPlayerId]);
    if (!player[0]) return NextResponse.json({ ok: false, message: "Игрок не найден." }, { status: 404 });
  }
  const id = createDatabaseId();
  const token = randomBytes(24).toString("base64url");
  await databaseQuery(
    `INSERT INTO "PlayerQuestionnaire" ("id","token","createdAt","updatedAt","status","linkedPlayerId")
     VALUES ($1,$2,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'INVITED',$3)`,
    [id, token, linkedPlayerId],
  );
  return NextResponse.json({ ok: true, id, token, url: `${SITE_URL}/player-questionnaire/${token}` }, { status: 201 });
}
