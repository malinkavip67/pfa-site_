import AdminLeadershipList from "@/components/admin/AdminLeadershipList";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Container from "@/components/ui/Container";
import { databaseQuery } from "@/lib/postgres";
import type { AdminLeadershipRecord } from "@/types/admin-content";

export const dynamic = "force-dynamic";

const fallback: AdminLeadershipRecord[] = [1, 2, 3].map((sortOrder) => ({
  id: `leadership-${sortOrder}`,
  createdAt: "",
  updatedAt: "",
  firstName: null,
  lastName: null,
  position: null,
  description: null,
  photoUrl: null,
  isPublished: true,
  sortOrder,
}));

export default async function AdminLeadershipPage() {
  let members = fallback;
  try {
    const rows = await databaseQuery<AdminLeadershipRecord>(`SELECT * FROM "LeadershipMember" ORDER BY "sortOrder" ASC`);
    if (rows.length) members = rows.map((row) => ({ ...row, createdAt: String(row.createdAt), updatedAt: String(row.updatedAt) }));
  } catch {
    console.warn("Leadership admin data is temporarily unavailable; placeholders are used.");
  }
  return <section className="min-h-screen pb-20"><AdminPageHeader eyebrow="Руководство" title="Команда агентства" description="Заполните три карточки руководителей: фотографию, имя, должность и короткое описание." /><Container><AdminLeadershipList members={members} /></Container></section>;
}
