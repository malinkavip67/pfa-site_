import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Typography from "@/components/ui/Typography";
import { databaseQuery } from "@/lib/postgres";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const counts = (await databaseQuery<{
    newApplications: number;
    activeApplications: number;
    players: number;
    publishedPlayers: number;
    news: number;
    publishedNews: number;
  }>(
    `SELECT
     (SELECT COUNT(*)::int FROM "Application" WHERE "status"='NEW') AS "newApplications",
     (SELECT COUNT(*)::int FROM "Application" WHERE "status"='IN_PROGRESS') AS "activeApplications",
     (SELECT COUNT(*)::int FROM "Player") AS "players",
     (SELECT COUNT(*)::int FROM "Player" WHERE "isPublished"=true) AS "publishedPlayers",
     (SELECT COUNT(*)::int FROM "News") AS "news",
     (SELECT COUNT(*)::int FROM "News" WHERE "isPublished"=true) AS "publishedNews"`,
  ))[0];
  const metrics = [
    ["Новые заявки", counts.newApplications],["В работе", counts.activeApplications],["Всего игроков", counts.players],["Опубликовано игроков", counts.publishedPlayers],["Всего новостей", counts.news],["Опубликовано новостей", counts.publishedNews],
  ] as const;
  return (
    <section className="min-h-screen pb-20">
      <AdminPageHeader eyebrow="Обзор" title="Панель управления" description="Заявки, игроки, новости и основные настройки сайта в одном месте." />
      <Container>
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {metrics.map(([label,value]) => <Card as="div" className="bg-[#081321] p-6" key={label}><Typography variant="caption">{label}</Typography><Typography as="p" variant="statValue" className="mt-5 text-5xl">{value}</Typography></Card>)}
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/admin/players/new" shape="square" size="compact">Добавить игрока</Button>
          <Button href="/admin/news/new" shape="square" size="compact">Добавить новость</Button>
          <Button href="/admin/applications" variant="secondary" shape="square" size="compact">Открыть заявки</Button>
          <Button href="/" variant="secondary" shape="square" size="compact">Открыть сайт</Button>
        </div>
      </Container>
    </section>
  );
}
