import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { getAdminSession } from "@/lib/admin-auth";

interface Props {
  children: React.ReactNode;
}

export default async function AdminPanelLayout({ children }: Readonly<Props>) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return <AdminShell administratorName={session.name}>{children}</AdminShell>;
}
