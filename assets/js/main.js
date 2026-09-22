/* ==========================================================================
   Larissa Doces — Site público (versão TESTE)
   ========================================================================== */
(function () {
  "use strict";
  const D = window.LarissaData;
  let data = D.load();

  const ICONS = {
    calendar: '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" stroke-width="1.6"/><path d="M8 3v4M16 3v4M3 10h18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 7v5l3.5 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 22s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12Z" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="10" r="2.6" stroke="currentColor" stroke-width="1.6"/></svg>',
    city: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 21V9l6-4 6 4v12M14 21V13h4v8" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  };

  /* ---------- WhatsApp ---------- */
  function waLink(templateKey, vars) {
    const tpl = data.whatsappTemplates[templateKey] || data.whatsappTemplates.encomenda;
    const msg = D.fillTemplate(tpl, vars || {});
    return D.buildWhatsappLink(data.perfil.whatsapp, msg);
  }

  function setupWhatsappLinks() {
    const geral = waLink("encomenda");
    [
      "ctaHeaderWhats", "ctaMenuWhats", "ctaHeroWhats", "ctaSobreWhats",
      "ctaEncomendaWhats", "footerWhats", "footerWhatsTexto", "whatsappFloat",
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.href = geral;
    });

    const ig = data.perfil.instagram;
    ["ctaInstagram", "footerInstagram", "footerInstagramTexto"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.href = ig;
    });

    const cidadeEl = document.getElementById("footerCidade");
    if (cidadeEl) cidadeEl.textContent = data.perfil.cidade;

    const descEl = document.getElementById("perfilDescricao");
    if (descEl && data.perfil.descricao) descEl.textContent = data.perfil.descricao;

    const fotoEl = document.getElementById("perfilFoto");
    if (fotoEl && data.perfil.fotoPerfil) fotoEl.src = data.perfil.fotoPerfil;

    const heroVideo = document.getElementById("heroVideo");
    if (heroVideo && data.perfil.videoCapa) {
      const sources = heroVideo.querySelectorAll("source");
      if (sources[1]) sources[1].src = data.perfil.videoCapa;
      if (sources[0] && data.perfil.videoCapaWebm) sources[0].src = data.perfil.videoCapaWebm;
      heroVideo.load();
    }
    if (heroVideo && data.perfil.fotoCapa) heroVideo.setAttribute("poster", data.perfil.fotoCapa);
  }

  /* ---------- Próximo evento + Agenda ---------- */
  function eventosFuturos() {
    return data.eventos
      .filter((e) => e.ativo !== false && !D.isEventoPast(e.data))
      .sort((a, b) => a.data.localeCompare(b.data));
  }

  function renderEventoDestaque() {
    const container = document.getElementById("eventoDestaque");
    const futuros = eventosFuturos();
    if (!futuros.length) {
      container.innerHTML = `
        <div class="evento-empty">
          <h3>Nova data em breve</h3>
          <p>Ainda não tenho um evento confirmado, mas fica de olho — em breve divulgo por aqui e no Instagram!</p>
        </div>`;
      return;
    }
    const ev = futuros[0];
    const diaSemana = D.formatDiaSemana(ev.data);
    const dataExtensa = D.formatDataExtensa(ev.data);
    const bg = ev.imagem ? `style="background-image:url('${ev.imagem}')"` : "";
    container.innerHTML = `
      <div class="evento-card">
        <div class="evento-info">
          <span class="evento-tag">${ICONS.calendar} Próximo evento</span>
          <h3>${escapeHtml(ev.nome)}</h3>
          <div class="evento-meta">
            <div>${ICONS.calendar}<span><span class="label">Quando</span><strong>${diaSemana}, ${dataExtensa}</strong></span></div>
            <div>${ICONS.clock}<span><span class="label">Horário</span><strong>${escapeHtml(ev.horario)}</strong></span></div>
            <div>${ICONS.pin}<span><span class="label">Local</span><strong>${escapeHtml(ev.local)}</strong></span></div>
            <div>${ICONS.city}<span><span class="label">Cidade</span><strong>${escapeHtml(ev.cidade)}</strong></span></div>
          </div>
          <a class="btn btn-ghost" style="background:rgba(255,255,255,.9);color:var(--rose-dark);" href="${ev.mapsLink || "#"}" target="_blank" rel="noopener">
            ${ICONS.pin} Como chegar
          </a>
        </div>
        <div class="evento-visual" ${bg}></div>
      </div>`;
  }

  function renderAgenda() {
    const container = document.getElementById("agendaLista");
    const futuros = eventosFuturos();
    if (!futuros.length) {
      container.innerHTML = `<p class="agenda-empty">Nenhum evento agendado no momento. Nova data em breve!</p>`;
      return;
    }
    container.innerHTML = futuros
      .map((ev, i) => {
        const { dia, mes } = D.formatDataCurta(ev.data);
        return `
        <div class="agenda-item" style="--i:${i}">
          <div class="agenda-date"><span class="num">${dia}</span><span class="mes">${mes}</span></div>
          <div class="agenda-info">
            <h4>${escapeHtml(ev.nome)}</h4>
            <div class="agenda-sub">
              <span>${ICONS.clock}${escapeHtml(ev.horario)}</span>
              <span>${ICONS.pin}${escapeHtml(ev.local)}</span>
              <span>${ICONS.city}${escapeHtml(ev.cidade)}</span>
            </div>
          </div>
          <a class="btn btn-outline" href="${ev.mapsLink || "#"}" target="_blank" rel="noopener">Como chegar</a>
        </div>`;
      })
      .join("");
  }

  /* ---------- Sabores ---------- */
  function renderSabores() {
    const container = document.getElementById("saboresGrid");
    const lista = data.sabores.filter((s) => s.disponivel !== false).sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
    if (!lista.length) {
      container.innerHTML = `<p>Novos sabores chegando em breve!</p>`;
      return;
    }
    container.innerHTML = lista
      .map((s, i) => `
        <article class="sabor-card" style="--i:${i}">
          <div class="sabor-media">
            <img src="${s.foto}" alt="${escapeHtml(s.nome)}" loading="lazy" />
            <span class="sabor-preco">R$ ${Number(s.preco).toFixed(2).replace(".", ",")}</span>
          </div>
          <div class="sabor-body">
            <h3>${escapeHtml(s.nome)}</h3>
            <p>${escapeHtml(s.descricao || "")}</p>
            <a class="btn btn-whatsapp" href="${waLink("produto", { nome: s.nome })}">Pedir pelo WhatsApp</a>
          </div>
        </article>`)
      .join("");
  }

  /* ---------- Depoimentos ---------- */
  function renderDepoimentos() {
    const container = document.getElementById("depoimentosGrid");
    const lista = data.depoimentos.filter((d) => d.ativo !== false).sort((a, b) => (a.ordem || 0) - (b.ordem || 0)).slice(0, 4);
    if (!lista.length) {
      container.innerHTML = `<p>Em breve, novos depoimentos por aqui!</p>`;
      return;
    }
    container.innerHTML = lista
      .map((dp, i) => `
        <figure class="depoimento-card" style="--i:${i}">
          <span class="depoimento-quote-mark">“</span>
          <p class="depoimento-msg">${escapeHtml(dp.descricao || "")}</p>
          ${dp.autor ? `<figcaption class="depoimento-autor">${escapeHtml(dp.autor)}</figcaption>` : ""}
        </figure>`)
      .join("");
  }

  /* ---------- Novidades / Publicações ---------- */
  function renderNovidades() {
    const section = document.getElementById("novidades");
    const container = document.getElementById("novidadesLista");
    const lista = data.publicacoes
      .filter((p) => p.status === "publicado")
      .sort((a, b) => b.data.localeCompare(a.data))
      .slice(0, 3);
    if (!lista.length) {
      section.style.display = "none";
      return;
    }
    container.innerHTML = lista
      .map((p, i) => `
        <article class="sabor-card" style="--i:${i}">
          <div class="sabor-media" style="aspect-ratio:4/3;">
            <img src="${p.foto}" alt="${escapeHtml(p.titulo)}" loading="lazy" />
          </div>
          <div class="sabor-body">
            ${p.categoria ? `<span class="eyebrow" style="margin-bottom:0;">${escapeHtml(p.categoria)}</span>` : ""}
            <h3>${escapeHtml(p.titulo)}</h3>
            <p>${escapeHtml(p.descricao || "")}</p>
          </div>
        </article>`)
      .join("");
  }

  /* ---------- Instagram grid ---------- */
  function renderInstagram() {
    const container = document.getElementById("instagramGrid");
    const fotos = data.publicacoes.length
      ? data.publicacoes.slice(0, 4).map((p) => p.foto)
      : [
          "assets/media/placeholders/instagram-placeholder-1.jpg",
          "assets/media/placeholders/instagram-placeholder-2.jpg",
          "assets/media/placeholders/instagram-placeholder-3.jpg",
          "assets/media/placeholders/instagram-placeholder-4.jpg",
        ];
    while (fotos.length < 4) {
      fotos.push(`assets/media/placeholders/instagram-placeholder-${(fotos.length % 4) + 1}.jpg`);
    }
    container.innerHTML = fotos
      .slice(0, 4)
      .map((f, i) => `<a href="${data.perfil.instagram}" target="_blank" rel="noopener" style="--i:${i}"><img src="${f}" alt="Publicação do Instagram da Larissa Oliveira Cakes" loading="lazy" /></a>`)
      .join("");
  }

  function escapeHtml(str) {
    return String(str || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  /* ---------- UI: header, menu, reveal ---------- */
  function setupHeader() {
    const header = document.getElementById("siteHeader");
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function setupScrollProgress() {
    const bar = document.getElementById("scrollProgress");
    if (!bar) return;
    const onScroll = () => {
      const trackHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = trackHeight > 0 ? (window.scrollY / trackHeight) * 100 : 0;
      bar.style.width = Math.min(100, Math.max(0, pct)) + "%";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  function setupMobileMenu() {
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("mobileMenu");
    function close() {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  }

  function setupReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach((el) => io.observe(el));
  }

  function setupYear() {
    const el = document.getElementById("anoAtual");
    if (el) el.textContent = new Date().getFullYear();
  }

  function setupHeroVideoFallback() {
    const video = document.getElementById("heroVideo");
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      video.removeAttribute("autoplay");
      video.pause();
    }
    video.addEventListener("error", () => {
      video.style.display = "none";
    });
  }

  /* ---------- Mantém o site em dia com o painel administrativo ---------- */
  function renderTudo() {
    setupWhatsappLinks();
    renderEventoDestaque();
    renderAgenda();
    renderNovidades();
    renderSabores();
    renderDepoimentos();
    renderInstagram();
  }

  function setupSincroniaComPainel() {
    // Quando o painel administrativo salva algo (mesmo navegador), essa aba
    // recebe o aviso automaticamente e já atualiza o conteúdo na hora.
    window.addEventListener("storage", (e) => {
      if (e.key === D.STORAGE_KEY) {
        data = D.load();
        renderTudo();
      }
    });
    // Reforço: também atualiza ao voltar para essa aba, caso o navegador
    // não dispare o evento acima (ex: mesma aba, guias diferentes).
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        data = D.load();
        renderTudo();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderTudo();
    setupHeader();
    setupScrollProgress();
    setupMobileMenu();
    setupReveal();
    setupYear();
    setupHeroVideoFallback();
    setupSincroniaComPainel();
  });
})();
