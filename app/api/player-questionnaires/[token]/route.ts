import { NextResponse } from "next/server";
import { databaseQuery } from "@/lib/postgres";
import { QUESTIONNAIRE_SELECT, toQuestionnaireRecord, validateQuestionnaireSubmission } from "@/lib/player-questionnaire";

export const runtime = "nodejs";

interface Context { params: Promise<{ token: string }>; }

export async function GET(_: Request, { params }: Context) {
  const { token } = await params;
  const rows = await databaseQuery<Record<string, unknown>>(
    `SELECT ${QUESTIONNAIRE_SELECT},
      CASE WHEN p."id" IS NULL THEN NULL ELSE CONCAT_WS(' ',p."lastName",p."firstName") END AS "linkedPlayerName"
     FROM "PlayerQuestionnaire" q
     LEFT JOIN "Player" p ON p."id"=q."linkedPlayerId"
     WHERE q."token"=$1 LIMIT 1`,
    [token],
  );
  if (!rows[0]) return NextResponse.json({ ok: false, message: "Ссылка на анкету недействительна." }, { status: 404 });
  const questionnaire = toQuestionnaireRecord(rows[0]);
  return NextResponse.json({
    ok: true,
    questionnaire: {
      ...questionnaire,
      id: undefined,
      token: undefined,
      linkedPlayerId: undefined,
    },
  });
}

export async function POST(request: Request, { params }: Context) {
  try {
    const { token } = await params;
    const existing = await databaseQuery<{ id: string; status: string }>(
      `SELECT "id","status" FROM "PlayerQuestionnaire" WHERE "token"=$1 LIMIT 1`,
      [token],
    );
    if (!existing[0]) return NextResponse.json({ ok: false, message: "Ссылка на анкету недействительна." }, { status: 404 });
    if (existing[0].status === "CONFIRMED") {
      return NextResponse.json({ ok: false, message: "Эта анкета уже подтверждена. Для изменений запросите новую ссылку у PFA." }, { status: 409 });
    }

    const validated = validateQuestionnaireSubmission(await request.json());
    if (!("data" in validated)) return NextResponse.json({ ok: false, message: validated.error }, { status: 400 });
    const data = validated.data!;
    const photo = data.photo;
    await databaseQuery(
      `UPDATE "PlayerQuestionnaire" SET
        "updatedAt"=CURRENT_TIMESTAMP,"submittedAt"=CURRENT_TIMESTAMP,"status"='SUBMITTED',
        "fullName"=$2,"birthDate"=$3,"citizenship"=$4,"height"=$5,"weight"=$6,
        "preferredFoot"=$7,"positions"=$8,"clubs"=$9,"videoLinks"=$10,"transfermarktUrl"=$11,
        "achievements"=$12,"individualFeatures"=$13,"contact"=$14,"consent"=true,
        "photoData"=COALESCE($15,"photoData"),"photoMimeType"=COALESCE($16,"photoMimeType"),
        "photoFileName"=COALESCE($17,"photoFileName"),"photoSize"=COALESCE($18,"photoSize")
       WHERE "id"=$1`,
      [existing[0].id, data.fullName, data.birthDate.toISOString(), data.citizenship, data.height, data.weight,
        data.preferredFoot, data.positions, data.clubs, data.videoLinks, data.transfermarktUrl, data.achievements,
        data.individualFeatures, data.contact, photo?.data ?? null, photo?.mimeType ?? null, photo?.fileName ?? null, photo?.size ?? null],
    );
    return NextResponse.json({ ok: true, message: "Анкета отправлена в PFA." });
  } catch {
    return NextResponse.json({ ok: false, message: "Не удалось отправить анкету. Попробуйте ещё раз." }, { status: 500 });
  }
}
