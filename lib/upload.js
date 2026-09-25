// Upload de imagem do painel: valida tipo/tamanho e salva em public/uploads.
// Devolve o caminho público (ex: "/uploads/abc123.jpg") para guardar no banco.
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";

const MAX_BYTES = 4 * 1024 * 1024; // 4MB
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const EXT_BY_TYPE = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" };

export async function saveUploadedImage(file) {
  if (!file || typeof file === "string" || file.size === 0) return null;
  if (!ALLOWED.has(file.type)) {
    throw new Error("Formato de imagem não suportado. Use JPG, PNG, WEBP ou GIF.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Imagem muito grande. Escolha uma de até 4MB.");
  }
  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = EXT_BY_TYPE[file.type] || "jpg";
  const name = `${Date.now()}-${randomBytes(6).toString("hex")}.${ext}`;
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });
  await writeFile(path.join(uploadsDir, name), bytes);
  return `/uploads/${name}`;
}
