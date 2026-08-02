import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import PlayerEditor from "@/components/admin/PlayerEditor";
import Container from "@/components/ui/Container";
import { databaseQuery } from "@/lib/postgres";
import type { AdminPlayerRecord } from "@/types/admin-content";
interface Props { params: Promise<{ id: string }>; }
export const dynamic = "force-dynamic";
export default async function EditPlayerPage({ params }: Props) { const { id } = await params; const row = (await databaseQuery<AdminPlayerRecord>(`SELECT * FROM "Player" WHERE "id"=$1 LIMIT 1`, [id]))[0]; if (!row) notFound(); const player = { ...row, createdAt: String(row.createdAt), updatedAt: String(row.updatedAt), birthDate: row.birthDate ? String(row.birthDate) : null }; return <section className="min-h-screen pb-20"><AdminPageHeader eyebrow="Игроки" title={`${row.firstName} ${row.lastName}`} description="Редактирование профиля, публикации и порядка отображения." /><Container><PlayerEditor player={player} /></Container></section>; }
