import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { validateLeadershipPayload } from "@/lib/admin-content-validation";
import { databaseQuery } from "@/lib/postgres";

export const runtime = "nodejs";
interface Context { params: Promise<{ id: string }>; }

export async function PATCH(request: Request, { params }: Context) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ ok: false }, { status: 401 });
  const { id } = await params;
  if (!/^leadership-[1-3]$/.test(id)) return NextResponse.json({ ok: false, message: "Карточка не найдена." }, { status: 404 });
  try {
    const value = validateLeadershipPayload(await request.json());
    if (!("data" in value)) return NextResponse.json({ ok: false, message: value.error }, { status: 400 });
    const d = value.data!;
    const rows = await databaseQuery(`UPDATE "LeadershipMember" SET "updatedAt"=CURRENT_TIMESTAMP,"firstName"=$2,"lastName"=$3,"position"=$4,"description"=$5,"photoUrl"=$6,"isPublished"=$7,"sortOrder"=$8 WHERE "id"=$1 RETURNING *`, [id, d.firstName, d.lastName, d.position, d.description, d.photoUrl, d.isPublished, d.sortOrder]);
    if (!rows[0]) return NextResponse.json({ ok: false, message: "Карточка не найдена." }, { status: 404 });
    revalidatePath("/");
    revalidatePath("/en");
    return NextResponse.json({ ok: true, member: rows[0] });
  } catch {
    return NextResponse.json({ ok: false, message: "Не удалось сохранить карточку." }, { status: 500 });
  }
}
