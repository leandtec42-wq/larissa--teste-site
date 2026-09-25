// Gera as versões otimizadas dos vídeos do carrossel do topo do site.
//
//   assets-src/reels/<nome>.mp4  →  public/media/reels/<nome>-720.mp4   (celular)
//                                   public/media/reels/<nome>-1080.mp4  (computador)
//                                   public/media/reels/<nome>.jpg       (capa/poster)
//
// Os originais são verticais (9:16). Cada versão é redimensionada com Lanczos
// (mais nítido que o esticado do navegador), levemente limpa e afiada, e
// codificada em H.264 com `faststart` para começar a tocar antes de baixar tudo.
//
// Uso:  FFMPEG_PATH=/caminho/ffmpeg node scripts/encode-reels.mjs
// (sem FFMPEG_PATH usa o `ffmpeg` do PATH)
//
// Dica de qualidade: quanto maior a resolução do original, melhor o resultado.
// Se tiver os vídeos originais do celular (1080x1920), coloque-os em
// assets-src/reels/ com o mesmo nome e rode o script de novo.
import { spawnSync } from "node:child_process";
import { mkdirSync, readdirSync } from "node:fs";
import path from "node:path";

const FFMPEG = process.env.FFMPEG_PATH || "ffmpeg";
const SRC = path.join(import.meta.dirname, "..", "assets-src", "reels");
const OUT = path.join(import.meta.dirname, "..", "public", "media", "reels");

const VERSOES = [
  // celular: 720x1280, bitrate contido pra carregar rápido no 4G
  { sufixo: "720", w: 720, h: 1280, crf: 23, maxrate: "1800k" },
  // computador: 1080x1920, pra telas grandes/retina
  { sufixo: "1080", w: 1080, h: 1920, crf: 21, maxrate: "3500k" },
];

function ffmpeg(args) {
  const r = spawnSync(FFMPEG, ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });
  if (r.status !== 0) throw new Error(`ffmpeg falhou: ${args.join(" ")}`);
}

mkdirSync(OUT, { recursive: true });

for (const arquivo of readdirSync(SRC).filter((f) => f.endsWith(".mp4"))) {
  const nome = path.basename(arquivo, ".mp4");
  const entrada = path.join(SRC, arquivo);

  for (const v of VERSOES) {
    const filtro = [
      "hqdn3d=1.2:1.2:2.5:2.5",
      `scale=${v.w}:${v.h}:force_original_aspect_ratio=increase:flags=lanczos`,
      `crop=${v.w}:${v.h}`,
      "unsharp=5:5:0.5:3:3:0.0",
      "format=yuv420p",
    ].join(",");
    ffmpeg([
      "-i", entrada, "-an", "-vf", filtro,
      "-c:v", "libx264", "-profile:v", "high", "-preset", "slow",
      "-crf", String(v.crf), "-maxrate", v.maxrate, "-bufsize", `${parseInt(v.maxrate) * 2}k`,
      "-movflags", "+faststart",
      path.join(OUT, `${nome}-${v.sufixo}.mp4`),
    ]);
  }

  // poster: primeiro quadro útil, 720x1280, JPEG progressivo
  ffmpeg([
    "-ss", "0.15", "-i", entrada, "-frames:v", "1",
    "-vf", "scale=720:1280:force_original_aspect_ratio=increase:flags=lanczos,crop=720:1280",
    "-q:v", "4", path.join(OUT, `${nome}.jpg`),
  ]);
  console.log("ok:", nome);
}
