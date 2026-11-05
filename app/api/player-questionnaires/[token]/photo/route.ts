import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { databaseQuery } from "@/lib/postgres";

export const runtime = "nodejs";
interface Context { params: Promise<{ token: string }>; }

export async function GET(_: Request, { params }: Context) {
  const { token } = await params;
  const rows = await databaseQuery<{ photoData: Buffer | null; photoMimeType: string | null; status: string }>(
    `SELECT "photoData","photoMimeType","status" FROM "PlayerQuestionnaire" WHERE "token"=$1 LIMIT 1`,
    [token],
  );
  const row = rows[0];
  if (!row?.photoData || !row.photoMimeType) return new NextResponse(null, { status: 404 });
  if (row.status !== "CONFIRMED" && !(await isAdminAuthenticated())) return new NextResponse(null, { status: 404 });
  return new NextResponse(new Uint8Array(row.photoData), {
    headers: {
      "Content-Type": row.photoMimeType,
      "Content-Length": String(row.photoData.length),
      "Cache-Control": row.status === "CONFIRMED" ? "public, max-age=86400, stale-while-revalidate=604800" : "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
