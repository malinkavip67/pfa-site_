import AdminNewsList from "@/components/admin/AdminNewsList";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Container from "@/components/ui/Container";
import { databaseQuery } from "@/lib/postgres";
import type { AdminNewsRecord } from "@/types/admin-content";
export const dynamic = "force-dynamic";
export default async function AdminNewsPage() { const rows = await databaseQuery<AdminNewsRecord>(`SELECT * FROM "News" ORDER BY "publishedAt" DESC NULLS LAST,"createdAt" DESC`); const news = rows.map((row) => ({ ...row, createdAt: String(row.createdAt), updatedAt: String(row.updatedAt), publishedAt: row.publishedAt ? String(row.publishedAt) : null })); return <section className="min-h-screen pb-20"><AdminPageHeader eyebrow="Новости" title="Редакция" description="Управляйте материалами и датами публикации." actionHref="/admin/news/new" actionLabel="Добавить новость" /><Container><AdminNewsList news={news} /></Container></section>; }
