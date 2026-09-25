// Popula o banco na primeira execução com o conteúdo real da Larissa —
// fotos e vídeos de verdade, tirados dela em feiras e sessões de produto.
import { PrismaClient } from "@prisma/client";
import { randomBytes, scryptSync } from "node:crypto";

const prisma = new PrismaClient();

// Duplicado de lib/auth.js de propósito: este arquivo roda com `node` puro
// (fora do bundler do Next), então evita importar um .js escrito em ESM
// sem "type": "module" no package.json.
function hashPassword(senha) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(senha, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function addDays(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  d.setHours(0, 0, 0, 0);
  return d;
}

async function main() {
  await prisma.admin.upsert({
    where: { usuario: "larissa" },
    update: {},
    create: { usuario: "larissa", senhaHash: hashPassword("doces2026") },
  });

  await prisma.perfil.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      nome: "Larissa",
      marca: "Larissa Oliveira",
      frase: "As fatias de tortas mais deliciosas que você irá provar!",
      cidade: "Camaçari - BA",
      whatsapp: "557193978984",
      instagram: "https://www.instagram.com/larissaoliveiracakes/",
      descricao:
        "Confeiteira artesanal em Camaçari, feita de carinho, capricho e muito sabor em cada fatia. Cada torta nasce de receita própria, ingredientes selecionados e do cuidado de quem ama o que faz.",
      fotoPerfil: "/media/larissa-retrato.jpg",
      fotoSecundaria: "/media/larissa-feira.jpg",
      fotoCapa: "/media/hero-poster.jpg",
      videoCapa: "/media/hero.mp4",
      videoVitrine: "/media/vitrine-vitrine.mp4",
      tplEncomenda: "Oi Larissa! Vim pelo site e quero fazer uma encomenda.",
      tplProduto: "Oi Larissa! Vi no site a {nome} e gostaria de fazer um pedido.",
      tplEvento: "Oi Larissa! Vi no site que você estará no {evento} e gostaria de saber mais.",
    },
  });

  const eventosExistentes = await prisma.evento.count();
  if (eventosExistentes === 0) {
    await prisma.evento.createMany({
      data: [
        {
          nome: "Feira Gastronômica da Orla",
          data: addDays(6),
          horario: "16h às 21h",
          local: "Orla de Camaçari — Stand Larissa Oliveira",
          cidade: "Camaçari - BA",
          endereco: "Av. Beira Mar, Camaçari - BA",
          mapsLink: "https://www.google.com/maps/search/?api=1&query=Orla+de+Camacari",
          descricao: "Fatias fresquinhas, tortas inteiras por encomenda e brindes especiais para quem chegar cedo!",
          imagem: "/media/evento-vitrine-morango.jpg",
          ativo: true,
        },
        {
          nome: "Feira da Praça Central",
          data: addDays(20),
          horario: "17h às 20h",
          local: "Praça Central",
          cidade: "Camaçari - BA",
          endereco: "Praça Central, Centro, Camaçari - BA",
          mapsLink: "https://www.google.com/maps/search/?api=1&query=Praca+Central+Camacari",
          imagem: "/media/evento-mesa-vermelha.jpg",
          ativo: true,
        },
      ],
    });
  }

  const saboresExistentes = await prisma.sabor.count();
  if (saboresExistentes === 0) {
    await prisma.sabor.createMany({
      data: [
        { nome: "Torta de Morango com Chantininho", descricao: "Camadas de bolo fofinho, recheio cremoso e cobertura de morangos fresquinhos.", preco: 18, foto: "/media/sabor-morango.jpg", disponivel: true, ordem: 1 },
        { nome: "Torta de Chocolate Belga com Frutas Vermelhas", descricao: "Recheio intenso de chocolate belga com frutas vermelhas fresquinhas.", preco: 20, foto: "/media/sabor-chocolate-belga.jpg", disponivel: true, ordem: 2 },
        { nome: "Torta de Maracujá com Chocolate", descricao: "Contraste perfeito entre o azedinho do maracujá e o chocolate cremoso.", preco: 20, foto: "/media/sabor-maracuja.jpg", disponivel: true, ordem: 3 },
        { nome: "Torta de Frutas Vermelhas com Limão", descricao: "Amora, morango e limão siciliano sobre um chantininho leve.", preco: 21, foto: "/media/sabor-frutas-vermelhas.jpg", disponivel: true, ordem: 4 },
        { nome: "Torta de Doce de Leite com Baunilha", descricao: "Recheio cremoso de doce de leite artesanal com toque de baunilha.", preco: 19, foto: "/media/sabor-doce-de-leite.jpg", disponivel: true, ordem: 5 },
        { nome: "Torta de Abacaxi com Coco", descricao: "Frescor tropical do abacaxi com coco queimado na medida certa.", preco: 19, foto: "/media/sabor-abacaxi-coco.jpg", disponivel: true, ordem: 6 },
      ],
    });
  }

  const depoimentosExistentes = await prisma.depoimento.count();
  if (depoimentosExistentes === 0) {
    await prisma.depoimento.createMany({
      data: [
        { autor: "Lai", descricao: "Ficou perfeito! Amamos viu, e ainda teve os chaveiros. Tudo lindo, parabéns!!!", foto: "/media/depoimentos/depoimento-03.png", ordem: 1, ativo: true },
        { autor: "", descricao: "Gratidão, tô apaixonada. Que cuidado e carinho, Lary. Amei, amei muitooo! Ansiosa pra experimentar!!", foto: "/media/depoimentos/depoimento-05.png", ordem: 2, ativo: true },
        { autor: "", descricao: "Fofinho, rico em detalhes e sabor, e o melhor: não é enjoativo!", foto: "/media/depoimentos/depoimento-01.png", ordem: 3, ativo: true },
        { autor: "@livialbate", descricao: "Minha linda, muito sucesso para ti. Tão lindo e feito com muito amor. Amei!", foto: "/media/depoimentos/depoimento-04.png", ordem: 4, ativo: true },
        { autor: "", descricao: "Obrigada a você por nos esperar. Que Deus continue te abençoando cada vez mais.", foto: "/media/depoimentos/depoimento-02.png", ordem: 5, ativo: false },
      ],
    });
  }

  const publicacoesExistentes = await prisma.publicacao.count();
  if (publicacoesExistentes === 0) {
    await prisma.publicacao.createMany({
      data: [
        { foto: "/media/evento-carro-bolos.jpg", titulo: "10 tortas prontas pra uma feira só!", descricao: "Um gostinho da produção da semana — de maracujá a red velvet, tudo fresquinho.", data: addDays(-2), categoria: "Bastidores", status: "publicado" },
        { foto: "/media/mini-bolos.jpg", titulo: "Mini bolos personalizados chegando", descricao: "Perfeitos pra festas e lembrancinhas — já pode encomendar os seus.", data: addDays(-6), categoria: "Novidade", status: "publicado" },
        { foto: "/media/bolo-personalizado-dourado.jpg", titulo: "Bolos personalizados sob encomenda", descricao: "Do tema à cobertura, cada detalhe pensado pra sua festa.", data: addDays(-10), categoria: "Personalizados", status: "publicado" },
      ],
    });
  }

  console.log("Seed concluído.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
