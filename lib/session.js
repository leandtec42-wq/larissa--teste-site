// Sessão do painel: cookie assinado (HMAC), httpOnly, sameSite=lax e
// `secure` em produção. Sem biblioteca de sessão externa — só node:crypto.
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "larissa_admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 8; // 8 horas

const DEV_FALLBACK_SECRET = "dev-only-insecure-secret-troque-em-producao";
let avisouFallback = false;

function secret() {
  const s = process.env.SESSION_SECRET;
  if (s) return s;

  if (process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET não configurado. Defina-o em .env.local antes de rodar em produção.");
  }
  // Em desenvolvimento, roda com um valor padrão pra não travar quem só
  // rodou `npm install` sem copiar o .env.example — mas avisa uma vez.
  if (!avisouFallback) {
    console.warn("[larissa] SESSION_SECRET não definido — usando um valor de desenvolvimento. Copie .env.example para .env.local e gere um valor seu antes de ir para produção.");
    avisouFallback = true;
  }
  return DEV_FALLBACK_SECRET;
}

function sign(value) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export async function createSession(usuario) {
  const payload = JSON.stringify({ usuario, exp: Date.now() + MAX_AGE_SECONDS * 1000 });
  const encoded = Buffer.from(payload).toString("base64url");
  const signature = sign(encoded);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, `${encoded}.${signature}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSession() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  const [encoded, signature] = raw.split(".");
  if (!encoded || !signature) return null;

  const expected = sign(encoded);
  const a = Buffer.from(signature, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString());
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
