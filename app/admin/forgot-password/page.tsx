import type { Metadata } from "next";
import ForgotPasswordForm from "@/components/admin/ForgotPasswordForm";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Восстановление доступа",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <section className="min-h-[calc(100vh-72px)] bg-[#050b14] py-20 max-md:py-14">
      <Container><ForgotPasswordForm /></Container>
    </section>
  );
}
