import type { Metadata } from "next";
import ResetPasswordForm from "@/components/admin/ResetPasswordForm";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Новый пароль",
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token = "" } = await searchParams;
  return (
    <section className="min-h-[calc(100vh-72px)] bg-[#050b14] py-20 max-md:py-14">
      <Container><ResetPasswordForm token={token} /></Container>
    </section>
  );
}
