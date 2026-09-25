import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

/**
 * Toda Server Action do painel chama isto primeiro. Se não houver sessão
 * válida, redireciona pro login — nenhuma ação chega ao Model sem isso.
 */
export async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

export function redirectComErro(base, erro) {
  redirect(`${base}?erro=${encodeURIComponent(erro)}`);
}
