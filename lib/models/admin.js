// Model — conta de acesso ao painel + proteção simples contra força bruta.
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth";

const MAX_TENTATIVAS = 5;
const BLOQUEIO_MS = 30_000;

export async function getAdmin() {
  return prisma.admin.findFirst();
}

/**
 * Tenta autenticar. Retorna { ok: true } ou { ok: false, motivo, segundosRestantes }.
 */
export async function tentarLogin(usuario, senha) {
  const admin = await prisma.admin.findUnique({ where: { usuario } });
  if (!admin) return { ok: false, motivo: "credenciais" };

  if (admin.bloqueadoAte && admin.bloqueadoAte.getTime() > Date.now()) {
    const segundosRestantes = Math.ceil((admin.bloqueadoAte.getTime() - Date.now()) / 1000);
    return { ok: false, motivo: "bloqueado", segundosRestantes };
  }

  const confere = verifyPassword(senha, admin.senhaHash);
  if (!confere) {
    const tentativas = admin.tentativas + 1;
    const bloquear = tentativas >= MAX_TENTATIVAS;
    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        tentativas: bloquear ? 0 : tentativas,
        bloqueadoAte: bloquear ? new Date(Date.now() + BLOQUEIO_MS) : null,
      },
    });
    return bloquear
      ? { ok: false, motivo: "bloqueado", segundosRestantes: Math.round(BLOQUEIO_MS / 1000) }
      : { ok: false, motivo: "credenciais" };
  }

  await prisma.admin.update({ where: { id: admin.id }, data: { tentativas: 0, bloqueadoAte: null } });
  return { ok: true };
}

export async function atualizarAcesso({ usuario, novaSenha }) {
  const admin = await getAdmin();
  const data = {};
  if (usuario) data.usuario = usuario;
  if (novaSenha) data.senhaHash = hashPassword(novaSenha);
  return prisma.admin.update({ where: { id: admin.id }, data });
}
