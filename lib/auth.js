// Senha do admin: hash scrypt (nunca texto puro) + comparação em tempo
// constante. Usa só o módulo nativo node:crypto — nenhuma dependência extra.
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

export function hashPassword(senha) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(senha, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(senha, armazenado) {
  const [salt, hash] = (armazenado || "").split(":");
  if (!salt || !hash) return false;
  const hashTentativa = scryptSync(senha, salt, 64).toString("hex");
  const a = Buffer.from(hash, "hex");
  const b = Buffer.from(hashTentativa, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
