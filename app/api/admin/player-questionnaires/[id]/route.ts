import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createDatabaseId, withDatabaseTransaction } from "@/lib/postgres";
import { slugify } from "@/lib/admin-content-validation";

export const runtime = "nodejs";
interface Context { params: Promise<{ id: string }>; }

function splitFullName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  return { lastName: parts[0] || "Игрок", firstName: parts.slice(1).join(" ") || "PFA" };
}

export async function PATCH(request: Request, { params }: Context) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const { id } = await params;
  const body = await request.json().catch(() => ({})) as { action?: unknown };
  if (body.action === "needs_clarification") {
    const result = await withDatabaseTransaction(async (client) => client.query(
      `UPDATE "PlayerQuestionnaire" SET "status"='NEEDS_CLARIFICATION',"updatedAt"=CURRENT_TIMESTAMP
       WHERE "id"=$1 AND "status" IN ('SUBMITTED','NEEDS_CLARIFICATION') RETURNING "id"`, [id],
    ));
    return result.rowCount ? NextResponse.json({ ok: true, status: "NEEDS_CLARIFICATION" }) : NextResponse.json({ ok: false, message: "Анкета не готова к обработке." }, { status: 409 });
  }
  if (body.action !== "confirm") return NextResponse.json({ ok: false, message: "Неизвестное действие." }, { status: 400 });

  try {
    const result = await withDatabaseTransaction(async (client) => {
      const found = await client.query<Record<string, unknown>>(`SELECT * FROM "PlayerQuestionnaire" WHERE "id"=$1 FOR UPDATE`, [id]);
      const q = found.rows[0];
      if (!q || !["SUBMITTED", "NEEDS_CLARIFICATION"].includes(String(q.status)) || !q.fullName) throw new Error("NOT_READY");
      const names = splitFullName(String(q.fullName));
      let playerId = typeof q.linkedPlayerId === "string" ? q.linkedPlayerId : null;
      const photoUrl = q.photoSize ? `/api/player-questionnaires/${q.token}/photo` : null;
      if (playerId) {
        await client.query(
          `UPDATE "Player" SET "updatedAt"=CURRENT_TIMESTAMP,"firstName"=$2,"lastName"=$3,"birthDate"=$4,
           "nationality"=$5,"position"=$6,"club"=$7,"height"=$8,"weight"=$9,"preferredFoot"=$10,
           "description"=$11,"achievements"=$12,"photoUrl"=COALESCE($13,"photoUrl"),"videoUrl"=$14 WHERE "id"=$1`,
          [playerId, names.firstName, names.lastName, q.birthDate, q.citizenship, (q.positions as string[]).join(", "), q.clubs,
            q.height, q.weight, q.preferredFoot, q.individualFeatures, q.achievements, photoUrl, (q.videoLinks as string[])[0] ?? null],
        );
      } else {
        playerId = createDatabaseId();
        const baseSlug = slugify(`${names.firstName}-${names.lastName}`) || "player";
        const slug = `${baseSlug}-${id.slice(-6).toLowerCase()}`;
        await client.query(
          `INSERT INTO "Player" ("id","createdAt","updatedAt","firstName","lastName","slug","birthDate","nationality","position","club","height","weight","preferredFoot","description","achievements","photoUrl","videoUrl","isPublished","sortOrder")
           VALUES ($1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,false,0)`,
          [playerId, names.firstName, names.lastName, slug, q.birthDate, q.citizenship, (q.positions as string[]).join(", "), q.clubs,
            q.height, q.weight, q.preferredFoot, q.individualFeatures, q.achievements, photoUrl, (q.videoLinks as string[])[0] ?? null],
        );
      }
      await client.query(
        `UPDATE "PlayerQuestionnaire" SET "status"='CONFIRMED',"confirmedAt"=CURRENT_TIMESTAMP,"updatedAt"=CURRENT_TIMESTAMP,"linkedPlayerId"=$2 WHERE "id"=$1`,
        [id, playerId],
      );
      return { playerId };
    });
    revalidatePath("/admin/player-questionnaires");
    revalidatePath("/admin/players");
    revalidatePath("/players");
    return NextResponse.json({ ok: true, status: "CONFIRMED", playerId: result.playerId });
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_READY") return NextResponse.json({ ok: false, message: "Анкета ещё не заполнена." }, { status: 409 });
    return NextResponse.json({ ok: false, message: "Не удалось подтвердить анкету." }, { status: 500 });
  }
}
