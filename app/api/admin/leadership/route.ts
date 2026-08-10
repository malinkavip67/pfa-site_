import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { databaseQuery } from "@/lib/postgres";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  try {
    const members = await databaseQuery(`SELECT * FROM "LeadershipMember" ORDER BY "sortOrder" ASC`);
    return NextResponse.json({ ok: true, members });
  } catch {
    return NextResponse.json({ ok: false, message: "Не удалось загрузить карточки руководства." }, { status: 500 });
  }
}
