"use server";

import { redirect } from "next/navigation";
import { tentarLogin } from "@/lib/models/admin";
import { createSession, destroySession } from "@/lib/session";
import { redirectComErro } from "./_shared";

export async function login(formData) {
  const usuario = (formData.get("usuario") || "").toString().trim();
  const senha = (formData.get("senha") || "").toString();

  const resultado = await tentarLogin(usuario, senha);
  if (!resultado.ok) {
    if (resultado.motivo === "bloqueado") {
      redirectComErro("/admin/login", `Muitas tentativas erradas. Aguarde ${resultado.segundosRestantes}s e tente de novo.`);
    }
    redirectComErro("/admin/login", "Usuário ou senha incorretos. Tente novamente.");
  }

  await createSession(usuario);
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}
