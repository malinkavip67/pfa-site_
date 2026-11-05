import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { databaseQuery } from "@/lib/postgres";
import { createQuestionnairePdf } from "@/lib/questionnaire-pdf";

export const runtime = "nodejs";
interface Context { params: Promise<{ id: string }>; }

export async function GET(_: Request, { params }: Context) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const { id } = await params;
  const rows = await databaseQuery<Record<string, unknown>>(`SELECT * FROM "PlayerQuestionnaire" WHERE "id"=$1 LIMIT 1`, [id]);
  const row = rows[0];
  if (!row) return NextResponse.json({ ok: false, message: "Анкета не найдена." }, { status: 404 });
  if (row.status !== "CONFIRMED") return NextResponse.json({ ok: false, message: "PDF доступен после подтверждения анкеты." }, { status: 409 });

  const pdf = await createQuestionnairePdf({
    id: String(row.id), fullName: row.fullName as string | null, birthDate: row.birthDate as Date | null,
    citizenship: row.citizenship as string | null, height: row.height as number | null, weight: row.weight as number | null,
    preferredFoot: row.preferredFoot as string | null, positions: row.positions as string[] ?? [], clubs: row.clubs as string | null,
    videoLinks: row.videoLinks as string[] ?? [], transfermarktUrl: row.transfermarktUrl as string | null,
    achievements: row.achievements as string | null, individualFeatures: row.individualFeatures as string | null,
    contact: row.contact as string | null, confirmedAt: row.confirmedAt as Date | null,
    photoData: row.photoData as Buffer | null,
  });
  const safeName = String(row.fullName ?? "player").replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").slice(0, 80) || "player";
  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(`pfa-${safeName}.pdf`)}`,
      "Content-Length": String(pdf.length),
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
