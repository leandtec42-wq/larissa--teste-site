// Playlist do carrossel de vídeos do topo do site.
//
// Os arquivos vêm de `scripts/encode-reels.mjs` (originais em assets-src/reels):
//   -720.mp4  → celular   (720x1280, leve)
//   -1080.mp4 → computador (1080x1920, nítido em tela grande/retina)
//   .jpg      → capa mostrada enquanto o vídeo carrega
// Para trocar, reordenar ou adicionar um vídeo, mexa só nesta lista.

const arquivo = (nome) => ({
  mobile: `/media/reels/${nome}-720.mp4`,
  desktop: `/media/reels/${nome}-1080.mp4`,
  poster: `/media/reels/${nome}.jpg`,
});

export const REELS = [
  { id: "montagem", label: "Cada fatia montada à mão", ...arquivo("montagem") },
  { id: "chantininho", label: "Chantininho na hora", ...arquivo("chantininho") },
  { id: "vitrine", label: "A vitrine de sabores", ...arquivo("vitrine") },
  { id: "feira", label: "Direto da feira", ...arquivo("feira") },
  { id: "chocolate", label: "Camadas de chocolate", ...arquivo("chocolate") },
  { id: "entrega", label: "Pedidos saindo do forno", ...arquivo("entrega") },
  { id: "fome", label: "Bateu a vontade?", ...arquivo("fome") },
];
