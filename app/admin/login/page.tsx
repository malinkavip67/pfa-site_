import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Typography from "@/components/ui/Typography";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Вход в CRM",
  description: "Закрытый вход администратора PFA.",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin/applications");
  }

  return (
    <section className="min-h-[calc(100vh-72px)] border-b border-white/10 bg-[#050b14] py-20 max-md:py-14">
      <Container className="grid gap-10">
        <div>
          <SectionHeading index="ADMIN">Безопасный доступ</SectionHeading>
          <Typography variant="bodyMedium" className="mt-5 max-w-xl text-slate-300">
            Панель заявок доступна только авторизованному администратору.
          </Typography>
        </div>
        <AdminLoginForm />
      </Container>
    </section>
  );
}
