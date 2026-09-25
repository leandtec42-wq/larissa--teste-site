// Model — tudo que envolve o registro único de perfil/configurações do site.
import { prisma } from "@/lib/prisma";

export async function getPerfil() {
  const perfil = await prisma.perfil.findUnique({ where: { id: 1 } });
  if (!perfil) throw new Error("Perfil não encontrado — rode `npx prisma db seed`.");
  return perfil;
}

export async function updatePerfil(data) {
  return prisma.perfil.update({ where: { id: 1 }, data });
}
