/* ==========================================================================
   Larissa Doces — Camada de dados (versão TESTE)
   Guarda tudo no localStorage do navegador. O site público e o painel
   administrativo leem/escrevem essa mesma estrutura, então funcionam juntos
   quando abertos no MESMO navegador. Não há servidor nem banco de dados
   real nesta versão — veja o README para a versão TOPZERA (com banco real).
   ========================================================================== */

(function (global) {
  const STORAGE_KEY = "larissaDoces:data:v1";

  const DEFAULT_DATA = {
    perfil: {
      nome: "Larissa",
      marca: "Larissa Oliveira Cakes",
      frase: "As fatias de tortas mais deliciosas que você irá provar!",
      cidade: "Camaçari - BA",
      whatsapp: "557193978984",
      instagram: "https://www.instagram.com/larissaoliveiracakes/",
      descricao:
        "Confeiteira artesanal em Camaçari, feita de carinho, capricho e muito sabor em cada fatia. Cada torta nasce de receita própria, ingredientes selecionados e do cuidado de quem ama o que faz.",
      fotoPerfil: "assets/media/larissa-confeiteira.png",
      fotoCapa: "assets/media/hero-poster.jpg",
      videoCapa: "assets/media/hero-video.mp4",
      videoCapaWebm: "assets/media/hero-video.webm",
    },
    eventos: [
      {
        id: "evt-1",
        nome: "Feira Gastronômica da Orla",
        data: addDays(6),
        horario: "16h às 21h",
        local: "Orla de Camaçari — Stand Larissa Doces",
        cidade: "Camaçari - BA",
        endereco: "Av. Beira Mar, Camaçari - BA",
        mapsLink: "https://www.google.com/maps/search/?api=1&query=Orla+de+Camacari",
        descricao: "Fatias fresquinhas, tortas inteiras por encomenda e brindes especiais para quem chegar cedo!",
        imagem: "assets/media/hero-poster.jpg",
        ativo: true,
      },
      {
        id: "evt-2",
        nome: "Feira da Praça Central",
        data: addDays(20),
        horario: "17h às 20h",
        local: "Praça Central",
        cidade: "Camaçari - BA",
        endereco: "Praça Central, Centro, Camaçari - BA",
        mapsLink: "https://www.google.com/maps/search/?api=1&query=Praca+Central+Camacari",
        descricao: "",
        imagem: "",
        ativo: true,
      },
    ],
    sabores: [
      { id: "sb-1", nome: "Torta de Morango com Chantininho", descricao: "Camadas de bolo fofinho, recheio cremoso e cobertura de morangos fresquinhos.", preco: 18, foto: "assets/media/placeholders/sabor-placeholder-1.jpg", disponivel: true, ordem: 1 },
      { id: "sb-2", nome: "Torta de Chocolate Belga", descricao: "Recheio intenso de chocolate belga com ganache aveludada.", preco: 20, foto: "assets/media/placeholders/sabor-placeholder-2.jpg", disponivel: true, ordem: 2 },
      { id: "sb-3", nome: "Torta de Ninho com Nutella", descricao: "Combinação clássica que todo mundo ama, cremosa e generosa.", preco: 20, foto: "assets/media/placeholders/sabor-placeholder-3.jpg", disponivel: true, ordem: 3 },
      { id: "sb-4", nome: "Torta Red Velvet", descricao: "Massa aveludada com toque de cacau e cobertura de cream cheese.", preco: 22, foto: "assets/media/placeholders/sabor-placeholder-4.jpg", disponivel: true, ordem: 4 },
      { id: "sb-5", nome: "Torta de Limão com Merengue", descricao: "Frescor cítrico equilibrado com um merengue suave maçaricado.", preco: 19, foto: "assets/media/placeholders/sabor-placeholder-5.jpg", disponivel: true, ordem: 5 },
      { id: "sb-6", nome: "Torta de Doce de Leite", descricao: "Recheio cremoso de doce de leite artesanal com toque de baunilha.", preco: 19, foto: "assets/media/placeholders/sabor-placeholder-6.jpg", disponivel: true, ordem: 6 },
    ],
    depoimentos: [
      { id: "dp-1", autor: "Lai", descricao: "Ficou perfeito! Amamos viu, e ainda teve os chaveiros. Tudo lindo, parabéns!!!", ordem: 1, ativo: true },
      { id: "dp-2", autor: "", descricao: "Gratidão, tô apaixonada. Que cuidado e carinho, Lary. Amei, amei muitooo! Ansiosa pra experimentar!!", ordem: 2, ativo: true },
      { id: "dp-3", autor: "", descricao: "Fofinho, rico em detalhes e sabor, e o melhor: não é enjoativo!", ordem: 3, ativo: true },
      { id: "dp-4", autor: "@livialbate", descricao: "Minha linda, muito sucesso para ti. Tão lindo e feito com muito amor. Amei!", ordem: 4, ativo: true },
      { id: "dp-5", autor: "", descricao: "Obrigada a você por nos esperar. Que Deus continue te abençoando cada vez mais.", ordem: 5, ativo: false },
    ],
    publicacoes: [
      { id: "pb-1", foto: "assets/media/placeholders/instagram-placeholder-1.jpg", titulo: "Agenda de outubro aberta!", descricao: "Já pode chamar no WhatsApp pra garantir sua fatia nos próximos eventos.", data: addDays(-2), categoria: "Novidade", status: "publicado" },
      { id: "pb-2", foto: "assets/media/placeholders/instagram-placeholder-2.jpg", titulo: "Hoje tem fatia de chocolate", descricao: "Só até acabar o estoque de hoje!", data: addDays(-6), categoria: "Sabores", status: "publicado" },
    ],
    whatsappTemplates: {
      encomenda: "Oi Larissa! Vim pelo site e quero fazer uma encomenda.",
      produto: "Oi Larissa! Vi no site a {nome} e gostaria de fazer um pedido.",
      evento: "Oi Larissa! Vi no site que você estará no {evento} e gostaria de saber mais.",
    },
    admin: {
      usuario: "larissa",
      senha: "doces2026",
    },
  };

  function addDays(n) {
    const d = new Date();
    d.setDate(d.getDate() + n);
    return d.toISOString().slice(0, 10);
  }

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        save(DEFAULT_DATA);
        return clone(DEFAULT_DATA);
      }
      const parsed = JSON.parse(raw);
      // Garante que campos novos existam mesmo se o localStorage for antigo
      return Object.assign({}, clone(DEFAULT_DATA), parsed);
    } catch (e) {
      console.warn("Não foi possível ler os dados salvos, usando padrão.", e);
      return clone(DEFAULT_DATA);
    }
  }

  function save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("Erro ao salvar dados (localStorage cheio?)", e);
      return false;
    }
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
    return load();
  }

  function uid(prefix) {
    return prefix + "-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function isEventoPast(isoDate) {
    if (!isoDate) return false;
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const d = new Date(isoDate + "T00:00:00");
    return d < hoje;
  }

  function diasSemana() {
    return ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
  }

  function meses() {
    return ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  }

  function formatDiaSemana(isoDate) {
    const d = new Date(isoDate + "T00:00:00");
    return diasSemana()[d.getDay()];
  }

  function formatDataCurta(isoDate) {
    const d = new Date(isoDate + "T00:00:00");
    return { dia: d.getDate(), mes: meses()[d.getMonth()] };
  }

  function formatDataExtensa(isoDate) {
    const d = new Date(isoDate + "T00:00:00");
    const mesesLongos = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    return `${d.getDate()} de ${mesesLongos[d.getMonth()]} de ${d.getFullYear()}`;
  }

  function onlyDigits(str) {
    return (str || "").replace(/\D/g, "");
  }

  function buildWhatsappLink(numero, mensagem) {
    const n = onlyDigits(numero);
    return `https://wa.me/${n}?text=${encodeURIComponent(mensagem)}`;
  }

  function fillTemplate(tpl, vars) {
    return tpl.replace(/\{(\w+)\}/g, (_, k) => (vars && vars[k] != null ? vars[k] : ""));
  }

  global.LarissaData = {
    STORAGE_KEY,
    DEFAULT_DATA,
    load,
    save,
    reset,
    uid,
    clone,
    isEventoPast,
    formatDiaSemana,
    formatDataCurta,
    formatDataExtensa,
    buildWhatsappLink,
    fillTemplate,
    onlyDigits,
  };
})(window);
