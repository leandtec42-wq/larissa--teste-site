import { prisma } from "@/lib/prisma";

export async function listPublicacoes() {
  return prisma.publicacao.findMany({ orderBy: { data: "desc" } });
}

export async function listPublicacoesPublicadas(limit = 3) {
  return prisma.publicacao.findMany({
    where: { status: "publicado" },
    orderBy: { data: "desc" },
    take: limit,
  });
}

export async function getPublicacao(id) {
  return prisma.publicacao.findUnique({ where: { id } });
}

export async function createPublicacao(data) {
  return prisma.publicacao.create({ data });
}

export async function updatePublicacao(id, data) {
  return prisma.publicacao.update({ where: { id }, data });
}

export async function deletePublicacao(id) {
  return prisma.publicacao.delete({ where: { id } });
}
