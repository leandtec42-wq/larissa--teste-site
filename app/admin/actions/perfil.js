"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSession, redirectComErro } from "./_shared";
import { updatePerfil } from "@/lib/models/perfil";
import { atualizarAcesso } from "@/lib/models/admin";
import { saveUploadedImage } from "@/lib/upload";
import { onlyDigits } from "@/lib/whatsapp";
import { requireString, optionalString, ValidationError } from "@/lib/validate";

export async function salvarPerfil(formData) {
  await requireSession();
  try {
    const nome = requireString(formData.get("nome"), "Nome de exibição", { max: 100 });
    const marca = requireString(formData.get("marca"), "Nome da marca", { max: 120 });
    const frase = requireString(formData.get("frase"), "Frase de efeito", { max: 200 });
    const descricao = requireString(formData.get("descricao"), "Descrição", { max: 1000 });
    const cidade = requireString(formData.get("cidade"), "Cidade", { max: 100 });
    const whatsapp = onlyDigits(requireString(formData.get("whatsapp"), "WhatsApp", { max: 20 }));
    const instagram = optionalString(formData.get("instagram"), { max: 300 });

    const fotoUpload = await saveUploadedImage(formData.get("fotoPerfil"));
    const fotoAtual = formData.get("fotoPerfilAtual")?.toString();

    await updatePerfil({
      nome,
      marca,
      frase,
      descricao,
      cidade,
      whatsapp,
      instagram: instagram || "",
      ...(fotoUpload ? { fotoPerfil: fotoUpload } : fotoAtual ? { fotoPerfil: fotoAtual } : {}),
    });
  } catch (e) {
    if (e instanceof ValidationError) redirectComErro("/admin/perfil", e.message);
    throw e;
  }
  revalidatePath("/");
  revalidatePath("/admin/perfil");
  redirect("/admin/perfil?ok=1");
}

export async function salvarMensagens(formData) {
  await requireSession();
  const tplEncomenda = optionalString(formData.get("tplEncomenda"), { max: 400 });
  const tplProduto = optionalString(formData.get("tplProduto"), { max: 400 });
  const tplEvento = optionalString(formData.get("tplEvento"), { max: 400 });
  await updatePerfil({ tplEncomenda, tplProduto, tplEvento });
  revalidatePath("/");
  revalidatePath("/admin/perfil");
  redirect("/admin/perfil?ok=1");
}

export async function salvarAcesso(formData) {
  await requireSession();
  const usuario = optionalString(formData.get("usuario"), { max: 60 });
  const novaSenha = optionalString(formData.get("novaSenha"), { max: 200 });
  if (novaSenha && novaSenha.length < 6) {
    redirectComErro("/admin/perfil", "A nova senha precisa ter pelo menos 6 caracteres.");
  }
  await atualizarAcesso({ usuario: usuario || null, novaSenha: novaSenha || null });
  revalidatePath("/admin/perfil");
  redirect("/admin/perfil?ok=1");
}
