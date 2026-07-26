import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import NewsEditor from "@/components/admin/NewsEditor";
import Container from "@/components/ui/Container";
import { neonQuery } from "@/lib/neon";
import type { AdminNewsRecord } from "@/types/admin-content";
interface Props { params: Promise<{ id: string }>; }
export const dynamic = "force-dynamic";
export default async function EditNewsPage({ params }: Props) { const { id } = await params; const row = (await neonQuery<AdminNewsRecord>(`SELECT * FROM "News" WHERE "id"=$1 LIMIT 1`, [id]))[0]; if (!row) notFound(); const item = { ...row, createdAt: String(row.createdAt), updatedAt: String(row.updatedAt), publishedAt: row.publishedAt ? String(row.publishedAt) : null }; return <section className="min-h-screen pb-20"><AdminPageHeader eyebrow="Новости" title={row.title} description="Редактирование материала и статуса публикации." /><Container><NewsEditor item={item} /></Container></section>; }
