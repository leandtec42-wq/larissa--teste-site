import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = { title: "Painel administrativo — Larissa Oliveira", robots: { index: false, follow: false } };

export default async function ProtectedAdminLayout({ children }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return <AdminShell>{children}</AdminShell>;
}
