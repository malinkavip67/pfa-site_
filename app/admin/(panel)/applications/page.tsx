import type { Metadata } from "next";
import ApplicationsDashboard from "@/components/admin/ApplicationsDashboard";
import { databaseQuery } from "@/lib/postgres";
import type { ApplicationRecord } from "@/types/application";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Заявки CRM",
  description: "Внутренняя страница обработки заявок PFA.",
  robots: { index: false, follow: false },
};

async function loadApplications(): Promise<{ applications: ApplicationRecord[]; error: boolean }> {
  try {
    const applications = await databaseQuery<ApplicationRecord>(
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

  if (error) {
    return (
      <section className="min-h-[calc(100vh-72px)] bg-[#050b14] p-8 text-white">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-400/20 bg-[#0c1726] p-8 shadow-sm">
          <h1 className="text-2xl font-extrabold">Не удалось загрузить заявки</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">Проверьте подключение к базе данных и повторите попытку.</p>
        </div>
      </section>
    );
  }

  return <ApplicationsDashboard initialApplications={applications} />;
}
