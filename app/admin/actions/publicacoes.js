"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSession, redirectComErro } from "./_shared";
import { createPublicacao, updatePublicacao, deletePublicacao } from "@/lib/models/publicacoes";
import { saveUploadedImage } from "@/lib/upload";
import { requireString, optionalString, requireDate, checkboxValue, ValidationError } from "@/lib/validate";

async function fromForm(formData) {
  const titulo = requireString(formData.get("titulo"), "Título", { max: 140 });
  const descricao = optionalString(formData.get("descricao"), { max: 600 });
  const data = requireDate(formData.get("data"), "Data");
  const categoria = optionalString(formData.get("categoria"), { max: 60 });
  const status = checkboxValue(formData.get("status")) ? "publicado" : "rascunho";

  const fotoUpload = await saveUploadedImage(formData.get("foto"));
  const fotoAtual = formData.get("fotoAtual")?.toString() || null;

  return {
    titulo,
    descricao: descricao || null,
    data,
    categoria: categoria || null,
    status,
    foto: fotoUpload || fotoAtual || null,
  };
}

export async function criarPublicacao(formData) {
  await requireSession();
  try {
    await createPublicacao(await fromForm(formData));
  } catch (e) {
    if (e instanceof ValidationError) redirectComErro("/admin/publicacoes/novo", e.message);
    throw e;
  }
  revalidatePath("/");
  revalidatePath("/admin/publicacoes");
  redirect("/admin/publicacoes");
}

export async function editarPublicacao(id, formData) {
  await requireSession();
  try {
    await updatePublicacao(id, await fromForm(formData));
  } catch (e) {
    if (e instanceof ValidationError) redirectComErro(`/admin/publicacoes/${id}`, e.message);
    throw e;
  }
  revalidatePath("/");
  revalidatePath("/admin/publicacoes");
  redirect("/admin/publicacoes");
}

export async function excluirPublicacao(id) {
  await requireSession();
  await deletePublicacao(id);
  revalidatePath("/");
  revalidatePath("/admin/publicacoes");
  redirect("/admin/publicacoes");
}
