import { prisma } from "@/lib/prisma";

export async function listDepoimentos() {
  return prisma.depoimento.findMany({ orderBy: { ordem: "asc" } });
}

export async function listDepoimentosAtivos(limit = 8) {
  return prisma.depoimento.findMany({
    where: { ativo: true },
    orderBy: { ordem: "asc" },
    take: limit,
  });
}

export async function getDepoimento(id) {
  return prisma.depoimento.findUnique({ where: { id } });
}

export async function createDepoimento(data) {
  const count = await prisma.depoimento.count();
  return prisma.depoimento.create({ data: { ...data, ordem: data.ordem ?? count + 1 } });
}

export async function updateDepoimento(id, data) {
  return prisma.depoimento.update({ where: { id }, data });
}

export async function deleteDepoimento(id) {
  return prisma.depoimento.delete({ where: { id } });
}
