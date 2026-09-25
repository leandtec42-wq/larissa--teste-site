"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSession, redirectComErro } from "./_shared";
import { createEvento, updateEvento, deleteEvento } from "@/lib/models/eventos";
import { saveUploadedImage } from "@/lib/upload";
import { requireString, optionalString, requireDate, checkboxValue, ValidationError } from "@/lib/validate";

async function fromForm(formData, idAtual) {
  const nome = requireString(formData.get("nome"), "Nome do evento", { max: 140 });
  const data = requireDate(formData.get("data"), "Data");
  const horario = requireString(formData.get("horario"), "Horário", { max: 60 });
  const local = requireString(formData.get("local"), "Local", { max: 140 });
  const cidade = requireString(formData.get("cidade"), "Cidade", { max: 100 });
  const endereco = optionalString(formData.get("endereco"), { max: 200 });
  const mapsLink = optionalString(formData.get("mapsLink"), { max: 500 });
  const descricao = optionalString(formData.get("descricao"), { max: 1000 });
  const ativo = checkboxValue(formData.get("ativo"));

  const imagemUpload = await saveUploadedImage(formData.get("imagem"));
  const imagemAtual = formData.get("imagemAtual")?.toString() || null;

  return {
    nome,
    data,
    horario,
    local,
    cidade,
    endereco: endereco || null,
    mapsLink: mapsLink || null,
    descricao: descricao || null,
    ativo,
    imagem: imagemUpload || imagemAtual,
  };
}

export async function criarEvento(formData) {
  await requireSession();
  try {
    const dados = await fromForm(formData);
    await createEvento(dados);
  } catch (e) {
    if (e instanceof ValidationError) redirectComErro("/admin/agenda/novo", e.message);
    throw e;
  }
  revalidatePath("/");
  revalidatePath("/admin/agenda");
  redirect("/admin/agenda");
}

export async function editarEvento(id, formData) {
  await requireSession();
  try {
    const dados = await fromForm(formData, id);
    await updateEvento(id, dados);
  } catch (e) {
    if (e instanceof ValidationError) redirectComErro(`/admin/agenda/${id}`, e.message);
    throw e;
  }
  revalidatePath("/");
  revalidatePath("/admin/agenda");
  redirect("/admin/agenda");
}

export async function excluirEvento(id) {
  await requireSession();
  await deleteEvento(id);
  revalidatePath("/");
  revalidatePath("/admin/agenda");
  redirect("/admin/agenda");
}
