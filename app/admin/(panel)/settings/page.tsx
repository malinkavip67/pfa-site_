import AdminPageHeader from "@/components/admin/AdminPageHeader";
import SettingsEditor from "@/components/admin/SettingsEditor";
import Container from "@/components/ui/Container";
import { neonQuery } from "@/lib/neon";
import type { SiteSettingsRecord } from "@/types/admin-content";
export const dynamic = "force-dynamic";
export default async function AdminSettingsPage() { const row = (await neonQuery<SiteSettingsRecord>(`SELECT * FROM "SiteSettings" WHERE "id"='main' LIMIT 1`))[0] ?? { id:"main",updatedAt:new Date().toISOString(),siteName:null,heroTitle:null,heroSubtitle:null,heroButtonText:null,heroButtonLink:null,phone:null,email:null,telegram:null,whatsapp:null,address:null,footerText:null }; const settings = { ...row, updatedAt: String(row.updatedAt) }; return <section className="min-h-screen pb-20"><AdminPageHeader eyebrow="Настройки" title="Основные данные" description="Пустые поля автоматически используют текущие тексты сайта." /><Container><SettingsEditor settings={settings} /></Container></section>; }
