import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import LeadershipEditor from "@/components/admin/LeadershipEditor";
import Container from "@/components/ui/Container";
import { databaseQuery } from "@/lib/postgres";
import type { AdminLeadershipRecord } from "@/types/admin-content";

interface Props { params: Promise<{ id: string }>; }
export const dynamic = "force-dynamic";

export default async function EditLeadershipPage({ params }: Props) {
  const { id } = await params;
  if (!/^leadership-[1-3]$/.test(id)) notFound();
  let member: AdminLeadershipRecord = { id, createdAt: "", updatedAt: "", firstName: null, lastName: null, position: null, description: null, photoUrl: null, isPublished: true, sortOrder: Number(id.at(-1)) };
  try {
    const row = (await databaseQuery<AdminLeadershipRecord>(`SELECT * FROM "LeadershipMember" WHERE "id"=$1 LIMIT 1`, [id]))[0];
    if (row) member = { ...row, createdAt: String(row.createdAt), updatedAt: String(row.updatedAt) };
  } catch {
    console.warn("Leadership profile is temporarily unavailable; placeholder is used.");
  }
  const fullName = [member.firstName, member.lastName].filter(Boolean).join(" ");
  return <section className="min-h-screen pb-20"><AdminPageHeader eyebrow="Руководство" title={fullName || `Карточка ${member.sortOrder}`} description="Измените информацию и сохраните — данные появятся на главной странице." /><Container><LeadershipEditor member={member} /></Container></section>;
}
