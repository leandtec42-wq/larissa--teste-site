import { prisma } from "@/lib/prisma";

export async function listSabores() {
  return prisma.sabor.findMany({ orderBy: { ordem: "asc" } });
}

export async function listSaboresDisponiveis() {
  return prisma.sabor.findMany({ where: { disponivel: true }, orderBy: { ordem: "asc" } });
}

export async function getSabor(id) {
  return prisma.sabor.findUnique({ where: { id } });
}

export async function createSabor(data) {
  const count = await prisma.sabor.count();
  return prisma.sabor.create({ data: { ...data, ordem: data.ordem ?? count + 1 } });
}

export async function updateSabor(id, data) {
  return prisma.sabor.update({ where: { id }, data });
}

export async function deleteSabor(id) {
  return prisma.sabor.delete({ where: { id } });
}
