import type { Metadata } from "next";
import ApplicationsDashboard from "@/components/admin/ApplicationsDashboard";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Typography from "@/components/ui/Typography";
import { neonQuery } from "@/lib/neon";
import type { ApplicationRecord } from "@/types/application";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Заявки CRM",
  description: "Внутренняя страница обработки заявок PFA.",
  robots: { index: false, follow: false },
};

async function loadApplications(): Promise<{ applications: ApplicationRecord[]; error: boolean }> {
  try {
    const applications = await neonQuery<ApplicationRecord>(
      `SELECT "id","createdAt","type","firstName","lastName","phone","email","story",
       "isAdult","consent","status","internalNote"
       FROM "Application" ORDER BY "createdAt" DESC`,
    );

    return {
      applications: applications.map((application) => ({
        ...application,
        createdAt: String(application.createdAt),
      })),
      error: false,
    };
  } catch {
    return { applications: [], error: true };
  }
}

export default async function ApplicationsPage() {
  const { applications, error } = await loadApplications();

  return (
    <section className="min-h-screen border-b border-white/10 bg-[#050b14] py-20 max-md:py-14">
      <Container>
        <SectionHeading index="CRM">Заявки</SectionHeading>
        <div className="mt-6 grid grid-cols-[minmax(0,1fr)_minmax(280px,.55fr)] items-end gap-10 max-lg:grid-cols-1">
          <Typography as="h1" variant="sectionTitle" className="text-[clamp(2rem,5.5vw,5rem)] leading-[.9] tracking-[-.05em]">
            Работа с<br /><span className="text-pfa-accent">обращениями</span>
          </Typography>
          <Typography variant="bodyLarge" className="border-l border-pfa-accent/60 pl-6 text-white max-lg:border-l-0 max-lg:border-t max-lg:pl-0 max-lg:pt-5">
            Новые заявки, история общения и следующий шаг — в одном рабочем пространстве.
          </Typography>
        </div>

        <div className="mt-12">
          {error ? (
            <Card as="div" className="border-red-400/30 bg-red-950/15 p-8">
              <Typography as="h2" variant="sectionTitle" className="text-[clamp(1.35rem,3vw,2.4rem)]">
                Не удалось загрузить заявки
              </Typography>
              <Typography variant="bodyMedium" className="mt-4 max-w-2xl text-slate-200">
                Проверьте подключение к базе и убедитесь, что ручной SQL инициализации выполнен в Neon.
              </Typography>
            </Card>
          ) : (
            <ApplicationsDashboard initialApplications={applications} />
          )}
        </div>
      </Container>
    </section>
  );
}
