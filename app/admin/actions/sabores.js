"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSession, redirectComErro } from "./_shared";
import { createSabor, updateSabor, deleteSabor } from "@/lib/models/sabores";
import { saveUploadedImage } from "@/lib/upload";
import { requireString, optionalString, requireNumber, checkboxValue, ValidationError } from "@/lib/validate";

async function fromForm(formData) {
  const nome = requireString(formData.get("nome"), "Nome do sabor", { max: 140 });
  const descricao = optionalString(formData.get("descricao"), { max: 500 });
  const preco = requireNumber(formData.get("preco"), "Preço");
  const disponivel = checkboxValue(formData.get("disponivel"));

  const fotoUpload = await saveUploadedImage(formData.get("foto"));
  const fotoAtual = formData.get("fotoAtual")?.toString() || null;
  const foto = fotoUpload || fotoAtual;
  if (!foto) throw new ValidationError("Escolha uma foto para o sabor.");

  return { nome, descricao: descricao || null, preco, disponivel, foto };
}

export async function criarSabor(formData) {
  await requireSession();
  try {
    await createSabor(await fromForm(formData));
  } catch (e) {
    if (e instanceof ValidationError) redirectComErro("/admin/sabores/novo", e.message);
    throw e;
  }
  revalidatePath("/");
  revalidatePath("/admin/sabores");
  redirect("/admin/sabores");
}

export async function editarSabor(id, formData) {
  await requireSession();
  try {
    await updateSabor(id, await fromForm(formData));
  } catch (e) {
    if (e instanceof ValidationError) redirectComErro(`/admin/sabores/${id}`, e.message);
    throw e;
  }
  revalidatePath("/");
  revalidatePath("/admin/sabores");
  redirect("/admin/sabores");
}

export async function excluirSabor(id) {
  await requireSession();
  await deleteSabor(id);
  revalidatePath("/");
  revalidatePath("/admin/sabores");
  redirect("/admin/sabores");
}
