import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminPlayersList from "@/components/admin/AdminPlayersList";
import Container from "@/components/ui/Container";
import { databaseQuery } from "@/lib/postgres";
import type { AdminPlayerRecord } from "@/types/admin-content";

export const dynamic = "force-dynamic";
export default async function AdminPlayersPage() {
  const rows = await databaseQuery<AdminPlayerRecord>(`SELECT * FROM "Player" ORDER BY "sortOrder" ASC,"createdAt" DESC`);
  const players = rows.map((row) => ({ ...row, createdAt: String(row.createdAt), updatedAt: String(row.updatedAt), birthDate: row.birthDate ? String(row.birthDate) : null, clubContractUntil: row.clubContractUntil ? String(row.clubContractUntil) : null, agencyContractUntil: row.agencyContractUntil ? String(row.agencyContractUntil) : null }));
  return <section className="min-h-screen pb-20"><AdminPageHeader eyebrow="PFA CRM" title="Наши игроки" description="Клубы, сроки контрактов и контроль договоров с агентством." actionHref="/admin/players/new" actionLabel="Добавить игрока" /><Container><AdminPlayersList players={players} /></Container></section>;
}
