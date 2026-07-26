import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ChangePasswordForm from "@/components/admin/ChangePasswordForm";
import Container from "@/components/ui/Container";

export default function ChangePasswordPage() {
  return (
    <section className="min-h-screen pb-20">
      <AdminPageHeader eyebrow="Безопасность" title="Пароль администратора" description="Изменение пароля текущей учётной записи." />
      <Container><ChangePasswordForm /></Container>
    </section>
  );
}
