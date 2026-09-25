import { prisma } from "@/lib/prisma";

export async function listEventos() {
  return prisma.evento.findMany({ orderBy: { data: "asc" } });
}

export async function listEventosFuturosAtivos() {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  return prisma.evento.findMany({
    where: { ativo: true, data: { gte: hoje } },
    orderBy: { data: "asc" },
  });
}

export async function getEvento(id) {
  return prisma.evento.findUnique({ where: { id } });
}

export async function createEvento(data) {
  return prisma.evento.create({ data });
}

export async function updateEvento(id, data) {
  return prisma.evento.update({ where: { id }, data });
}

export async function deleteEvento(id) {
  return prisma.evento.delete({ where: { id } });
}
