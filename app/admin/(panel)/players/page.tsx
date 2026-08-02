import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminPlayersList from "@/components/admin/AdminPlayersList";
import Container from "@/components/ui/Container";
import { databaseQuery } from "@/lib/postgres";
import type { AdminPlayerRecord } from "@/types/admin-content";

export const dynamic = "force-dynamic";
export default async function AdminPlayersPage() {
  const rows = await databaseQuery<AdminPlayerRecord>(`SELECT * FROM "Player" ORDER BY "sortOrder" ASC,"createdAt" DESC`);
  const players = rows.map((row) => ({ ...row, createdAt: String(row.createdAt), updatedAt: String(row.updatedAt), birthDate: row.birthDate ? String(row.birthDate) : null }));
  return <section className="min-h-screen pb-20"><AdminPageHeader eyebrow="Игроки" title="Состав PFA" description="Создавайте профили, меняйте порядок и управляйте публикацией." actionHref="/admin/players/new" actionLabel="Добавить игрока" /><Container><AdminPlayersList players={players} /></Container></section>;
}
