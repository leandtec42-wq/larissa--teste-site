"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSession, redirectComErro } from "./_shared";
import { createDepoimento, updateDepoimento, deleteDepoimento } from "@/lib/models/depoimentos";
import { saveUploadedImage } from "@/lib/upload";
import { requireString, optionalString, checkboxValue, ValidationError } from "@/lib/validate";

async function fromForm(formData) {
  const descricao = requireString(formData.get("descricao"), "Mensagem do depoimento", { max: 600 });
  const autor = optionalString(formData.get("autor"), { max: 100 });
  const ativo = checkboxValue(formData.get("ativo"));

  const fotoUpload = await saveUploadedImage(formData.get("foto"));
  const fotoAtual = formData.get("fotoAtual")?.toString() || null;

  return { descricao, autor: autor || null, ativo, foto: fotoUpload || fotoAtual || null };
}

export async function criarDepoimento(formData) {
  await requireSession();
  try {
    await createDepoimento(await fromForm(formData));
  } catch (e) {
    if (e instanceof ValidationError) redirectComErro("/admin/depoimentos/novo", e.message);
    throw e;
  }
  revalidatePath("/");
  revalidatePath("/admin/depoimentos");
  redirect("/admin/depoimentos");
}

export async function editarDepoimento(id, formData) {
  await requireSession();
  try {
    await updateDepoimento(id, await fromForm(formData));
  } catch (e) {
    if (e instanceof ValidationError) redirectComErro(`/admin/depoimentos/${id}`, e.message);
    throw e;
  }
  revalidatePath("/");
  revalidatePath("/admin/depoimentos");
  redirect("/admin/depoimentos");
}

export async function excluirDepoimento(id) {
  await requireSession();
  await deleteDepoimento(id);
  revalidatePath("/");
  revalidatePath("/admin/depoimentos");
  redirect("/admin/depoimentos");
}
