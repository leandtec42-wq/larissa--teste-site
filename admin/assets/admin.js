/* ==========================================================================
   Painel administrativo — Larissa Doces (versão TESTE)
   Tudo roda no navegador (localStorage). Sem servidor, sem banco de dados
   real — ideal para prototipar e mostrar para a Larissa antes de usar a
   versão TOPZERA (com login seguro de verdade e banco de dados).
   ========================================================================== */
(function () {
  "use strict";
  const D = window.LarissaData;
  let data = D.load();
  const AUTH_KEY = "larissaDoces:auth";

  /* ---------------------------- Utils ---------------------------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }
  function persist() { D.save(data); }
  function toast(msg, isError) {
    const wrap = $("#toastWrap");
    const el = document.createElement("div");
    el.className = "toast" + (isError ? " is-error" : "");
    el.textContent = msg;
    wrap.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }
  function escapeHtml(str) {
    return String(str || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function toAdminSrc(p) {
    if (!p) return "";
    if (p.startsWith("data:") || p.startsWith("http")) return p;
    return "../" + p;
  }
  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /* ---------------------------- Auth ---------------------------- */
  function isLoggedIn() { return sessionStorage.getItem(AUTH_KEY) === "1"; }
  function setLoggedIn(v) { v ? sessionStorage.setItem(AUTH_KEY, "1") : sessionStorage.removeItem(AUTH_KEY); }

  function showApp() {
    $("#loginScreen").style.display = "none";
    $("#appShell").classList.add("is-active");
    renderAll();
  }
  function showLogin() {
    $("#appShell").classList.remove("is-active");
    $("#loginScreen").style.display = "flex";
  }

  $("#loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const user = $("#loginUser").value.trim();
    const pass = $("#loginPass").value;
    if (user === data.admin.usuario && pass === data.admin.senha) {
      setLoggedIn(true);
      $("#loginError").classList.remove("show");
      showApp();
    } else {
      $("#loginError").classList.add("show");
    }
  });
  $("#btnLogout").addEventListener("click", () => { setLoggedIn(false); showLogin(); });

  /* ---------------------------- Navegação ---------------------------- */
  const viewTitles = {
    dashboard: "Início", agenda: "Minha agenda", sabores: "Meus sabores",
    depoimentos: "Feedback dos clientes", publicacoes: "Minhas publicações", perfil: "Meu perfil",
  };
  function goToView(name) {
    $all(".view").forEach((v) => v.classList.remove("is-active"));
    $("#view-" + name).classList.add("is-active");
    $all(".side-link[data-view]").forEach((b) => b.classList.toggle("is-active", b.dataset.view === name));
    $("#topbarTitle").textContent = viewTitles[name] || "";
    closeSidebarMobile();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  $all(".side-link[data-view]").forEach((btn) => btn.addEventListener("click", () => goToView(btn.dataset.view)));

  function openSidebarMobile() { $("#sidebar").classList.add("is-open"); $("#sidebarOverlay").classList.add("is-active"); }
  function closeSidebarMobile() { $("#sidebar").classList.remove("is-open"); $("#sidebarOverlay").classList.remove("is-active"); }
  $("#sidebarToggle").addEventListener("click", openSidebarMobile);
  $("#sidebarOverlay").addEventListener("click", closeSidebarMobile);

  $all("[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const map = {
        "novo-evento": () => { goToView("agenda"); openEventoForm(); },
        "novo-sabor": () => { goToView("sabores"); openSaborForm(); },
        "novo-depoimento": () => { goToView("depoimentos"); openDepoimentoForm(); },
        "nova-publicacao": () => { goToView("publicacoes"); openPublicacaoForm(); },
      };
      (map[btn.dataset.action] || function () {})();
    });
  });

  /* ---------------------------- Modal genérico ---------------------------- */
  const modalOverlay = $("#modalOverlay");
  const modalForm = $("#modalForm");
  function closeModal() { modalOverlay.classList.remove("is-active"); modalForm.innerHTML = ""; }
  $("#modalClose").addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) closeModal(); });

  /**
   * fields: [{name,label,type:text|textarea|date|time|number|url|image|checkbox, required, placeholder, hint}]
   */
  function openForm({ title, fields, values, onSubmit, onDelete }) {
    $("#modalTitle").textContent = title;
    modalForm.innerHTML = "";
    const imageState = {};

    fields.forEach((f) => {
      const wrap = document.createElement("div");
      if (f.type === "image") {
        wrap.className = "field";
        const current = values && values[f.name];
        imageState[f.name] = current || "";
        wrap.innerHTML = `
          <label>${f.label}</label>
          <div class="image-upload" data-imgfield="${f.name}">
            <img src="${toAdminSrc(current) || ""}" style="${current ? "" : "display:none;"}" />
            <div class="ph" style="display:flex;align-items:center;justify-content:center;gap:8px;"><svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1-2h7l1 2h2A1.5 1.5 0 0 1 20 8.5v9A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-9Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="13" r="3.2" stroke="currentColor" stroke-width="1.6"/></svg> Clique para escolher uma imagem</div>
            <input type="file" accept="image/*" />
          </div>`;
        modalForm.appendChild(wrap);
        const box = wrap.querySelector(".image-upload");
        const input = box.querySelector("input");
        const img = box.querySelector("img");
        const ph = box.querySelector(".ph");
        box.addEventListener("click", () => input.click());
        input.addEventListener("change", async () => {
          if (!input.files[0]) return;
          if (input.files[0].size > 4 * 1024 * 1024) {
            toast("Imagem muito grande. Escolha uma de até 4MB.", true);
            return;
          }
          const dataUrl = await fileToDataUrl(input.files[0]);
          imageState[f.name] = dataUrl;
          img.src = dataUrl; img.style.display = "block"; ph.style.display = "none";
        });
        return;
      }
      wrap.className = "field";
      const val = (values && values[f.name] != null) ? values[f.name] : "";
      if (f.type === "textarea") {
        wrap.innerHTML = `<label>${f.label}</label><textarea data-field="${f.name}" placeholder="${f.placeholder || ""}" ${f.required ? "required" : ""}>${escapeHtml(val)}</textarea>`;
      } else if (f.type === "checkbox") {
        wrap.className = "field field-checkbox";
        wrap.innerHTML = `<input type="checkbox" data-field="${f.name}" id="chk-${f.name}" ${val ? "checked" : ""}/><label for="chk-${f.name}" style="margin:0;">${f.label}</label>`;
      } else {
        wrap.innerHTML = `<label>${f.label}</label><input type="${f.type || "text"}" data-field="${f.name}" value="${escapeHtml(val)}" placeholder="${f.placeholder || ""}" ${f.required ? "required" : ""} ${f.step ? `step="${f.step}"` : ""}/>`;
      }
      if (f.hint) wrap.innerHTML += `<div class="field-hint">${f.hint}</div>`;
      modalForm.appendChild(wrap);
    });

    const actions = document.createElement("div");
    actions.className = "modal-actions";
    actions.innerHTML = `
      ${onDelete ? `<button type="button" class="btn btn-danger" id="modalDeleteBtn">Excluir</button>` : ""}
      <button type="button" class="btn btn-secondary" id="modalCancelBtn">Cancelar</button>
      <button type="submit" class="btn btn-primary">Salvar</button>
    `;
    modalForm.appendChild(actions);

    $("#modalCancelBtn").addEventListener("click", closeModal);
    if (onDelete) $("#modalDeleteBtn").addEventListener("click", () => { onDelete(); closeModal(); });

    modalForm.onsubmit = (e) => {
      e.preventDefault();
      const out = {};
      fields.forEach((f) => {
        if (f.type === "image") { out[f.name] = imageState[f.name] || ""; return; }
        const el = modalForm.querySelector(`[data-field="${f.name}"]`);
        if (f.type === "checkbox") out[f.name] = el.checked;
        else if (f.type === "number") out[f.name] = parseFloat(el.value || "0");
        else out[f.name] = el.value;
      });
      onSubmit(out);
      closeModal();
    };

    modalOverlay.classList.add("is-active");
  }

  /* ---------------------------- Eventos (agenda) ---------------------------- */
  const eventoFields = [
    { name: "nome", label: "Nome do evento", required: true },
    { name: "data", label: "Data", type: "date", required: true },
    { name: "horario", label: "Horário", placeholder: "Ex: 16h às 20h", required: true },
    { name: "local", label: "Local", required: true },
    { name: "cidade", label: "Cidade", required: true },
    { name: "endereco", label: "Endereço completo" },
    { name: "mapsLink", label: "Link do Google Maps", type: "url", hint: "Cole o link de compartilhamento do Google Maps." },
    { name: "descricao", label: "Descrição", type: "textarea" },
    { name: "imagem", label: "Imagem (opcional)", type: "image" },
    { name: "ativo", label: "Evento ativo (visível no site)", type: "checkbox" },
  ];
  function openEventoForm(item) {
    openForm({
      title: item ? "Editar evento" : "Adicionar evento",
      fields: eventoFields,
      values: item || { ativo: true },
      onSubmit: (vals) => {
        if (item) Object.assign(item, vals);
        else data.eventos.push(Object.assign({ id: D.uid("evt") }, vals));
        persist(); renderAgendaAdmin(); renderDashboard();
        toast(item ? "Evento atualizado!" : "Evento adicionado!");
      },
      onDelete: item ? () => {
        data.eventos = data.eventos.filter((e) => e.id !== item.id);
        persist(); renderAgendaAdmin(); renderDashboard();
        toast("Evento excluído.");
      } : null,
    });
  }
  $("#btnAddEvento").addEventListener("click", () => openEventoForm());

  function renderAgendaAdmin() {
    const list = $("#listaEventos");
    const items = data.eventos.slice().sort((a, b) => a.data.localeCompare(b.data));
    if (!items.length) { list.innerHTML = `<div class="empty-state">Nenhum evento cadastrado ainda.</div>`; return; }
    list.innerHTML = items.map((ev) => {
      const passou = D.isEventoPast(ev.data);
      return `
      <div class="item-row">
        <img class="item-thumb" src="${ev.imagem ? toAdminSrc(ev.imagem) : placeholderThumb()}" alt="" />
        <div class="item-info">
          <h4>${escapeHtml(ev.nome)}</h4>
          <div class="item-sub">${D.formatDataExtensa(ev.data)} · ${escapeHtml(ev.horario)} · ${escapeHtml(ev.cidade)}</div>
        </div>
        <span class="badge-pill ${passou ? "badge-off" : (ev.ativo !== false ? "badge-on" : "badge-off")}">${passou ? "Já passou" : (ev.ativo !== false ? "Ativo" : "Oculto")}</span>
        <div class="item-actions">
          <button class="btn btn-secondary btn-sm" data-edit="${ev.id}">Editar</button>
        </div>
      </div>`;
    }).join("");
    list.querySelectorAll("[data-edit]").forEach((b) => b.addEventListener("click", () => {
      const item = data.eventos.find((e) => e.id === b.dataset.edit);
      openEventoForm(item);
    }));
  }

  /* ---------------------------- Sabores ---------------------------- */
  const saborFields = [
    { name: "nome", label: "Nome do sabor", required: true },
    { name: "descricao", label: "Descrição curta", type: "textarea" },
    { name: "preco", label: "Preço (R$)", type: "number", step: "0.01", required: true },
    { name: "foto", label: "Foto do sabor", type: "image" },
    { name: "disponivel", label: "Disponível no site", type: "checkbox" },
  ];
  function openSaborForm(item) {
    openForm({
      title: item ? "Editar sabor" : "Adicionar sabor",
      fields: saborFields,
      values: item || { disponivel: true },
      onSubmit: (vals) => {
        if (!vals.foto) vals.foto = (item && item.foto) || "assets/media/placeholders/sabor-placeholder-1.jpg";
        if (item) Object.assign(item, vals);
        else data.sabores.push(Object.assign({ id: D.uid("sb"), ordem: data.sabores.length + 1 }, vals));
        persist(); renderSaboresAdmin(); renderDashboard();
        toast(item ? "Sabor atualizado!" : "Sabor adicionado!");
      },
      onDelete: item ? () => {
        data.sabores = data.sabores.filter((s) => s.id !== item.id);
        persist(); renderSaboresAdmin(); renderDashboard();
        toast("Sabor excluído.");
      } : null,
    });
  }
  $("#btnAddSabor").addEventListener("click", () => openSaborForm());

  function renderSaboresAdmin() {
    const list = $("#listaSabores");
    const items = data.sabores.slice().sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
    if (!items.length) { list.innerHTML = `<div class="empty-state">Nenhum sabor cadastrado ainda.</div>`; return; }
    list.innerHTML = items.map((s) => `
      <div class="item-row">
        <img class="item-thumb" src="${toAdminSrc(s.foto)}" alt="" />
        <div class="item-info">
          <h4>${escapeHtml(s.nome)}</h4>
          <div class="item-sub">R$ ${Number(s.preco).toFixed(2).replace(".", ",")}</div>
        </div>
        <span class="badge-pill ${s.disponivel !== false ? "badge-on" : "badge-off"}">${s.disponivel !== false ? "Disponível" : "Oculto"}</span>
        <div class="item-actions"><button class="btn btn-secondary btn-sm" data-edit="${s.id}">Editar</button></div>
      </div>`).join("");
    list.querySelectorAll("[data-edit]").forEach((b) => b.addEventListener("click", () => {
      openSaborForm(data.sabores.find((s) => s.id === b.dataset.edit));
    }));
  }

  /* ---------------------------- Depoimentos ---------------------------- */
  const depoimentoFields = [
    { name: "descricao", label: "Mensagem do depoimento", type: "textarea", required: true, placeholder: "Cole aqui o que a cliente escreveu pra você" },
    { name: "autor", label: "Nome da cliente (opcional)", placeholder: "Ex: Lai" },
    { name: "ativo", label: "Mostrar no site", type: "checkbox" },
  ];
  function openDepoimentoForm(item) {
    openForm({
      title: item ? "Editar depoimento" : "Adicionar depoimento",
      fields: depoimentoFields,
      values: item || { ativo: true },
      onSubmit: (vals) => {
        if (item) Object.assign(item, vals);
        else data.depoimentos.push(Object.assign({ id: D.uid("dp"), ordem: data.depoimentos.length + 1 }, vals));
        persist(); renderDepoimentosAdmin(); renderDashboard();
        toast(item ? "Depoimento atualizado!" : "Depoimento adicionado!");
      },
      onDelete: item ? () => {
        data.depoimentos = data.depoimentos.filter((d) => d.id !== item.id);
        persist(); renderDepoimentosAdmin(); renderDashboard();
        toast("Depoimento excluído.");
      } : null,
    });
  }
  $("#btnAddDepoimento").addEventListener("click", () => openDepoimentoForm());

  function renderDepoimentosAdmin() {
    const list = $("#listaDepoimentos");
    const items = data.depoimentos.slice().sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
    if (!items.length) { list.innerHTML = `<div class="empty-state">Nenhum depoimento cadastrado ainda.</div>`; return; }
    list.innerHTML = items.map((d) => `
      <div class="item-row">
        <img class="item-thumb" src="${placeholderThumb()}" alt="" />
        <div class="item-info">
          <h4>${d.autor ? escapeHtml(d.autor) : "Depoimento"}</h4>
          <div class="item-sub">${escapeHtml((d.descricao || "").slice(0, 70))}${(d.descricao || "").length > 70 ? "…" : ""}</div>
        </div>
        <span class="badge-pill ${d.ativo !== false ? "badge-on" : "badge-off"}">${d.ativo !== false ? "Visível" : "Oculto"}</span>
        <div class="item-actions"><button class="btn btn-secondary btn-sm" data-edit="${d.id}">Editar</button></div>
      </div>`).join("");
    list.querySelectorAll("[data-edit]").forEach((b) => b.addEventListener("click", () => {
      openDepoimentoForm(data.depoimentos.find((d) => d.id === b.dataset.edit));
    }));
  }

  /* ---------------------------- Publicações ---------------------------- */
  const publicacaoFields = [
    { name: "foto", label: "Foto", type: "image" },
    { name: "titulo", label: "Título", required: true, placeholder: "Ex: Hoje tem fatia de chocolate" },
    { name: "descricao", label: "Descrição", type: "textarea" },
    { name: "data", label: "Data", type: "date", required: true },
    { name: "categoria", label: "Categoria", placeholder: "Ex: Novidade, Sabores, Agenda" },
    { name: "status", label: "Publicar no site (senão fica como rascunho)", type: "checkbox" },
  ];
  function openPublicacaoForm(item) {
    openForm({
      title: item ? "Editar publicação" : "Nova publicação",
      fields: publicacaoFields,
      values: item ? Object.assign({}, item, { status: item.status === "publicado" }) : { status: true, data: new Date().toISOString().slice(0, 10) },
      onSubmit: (vals) => {
        vals.status = vals.status ? "publicado" : "rascunho";
        if (item) Object.assign(item, vals);
        else data.publicacoes.unshift(Object.assign({ id: D.uid("pb") }, vals));
        persist(); renderPublicacoesAdmin(); renderDashboard();
        toast(item ? "Publicação atualizada!" : "Publicação criada!");
      },
      onDelete: item ? () => {
        data.publicacoes = data.publicacoes.filter((p) => p.id !== item.id);
        persist(); renderPublicacoesAdmin(); renderDashboard();
        toast("Publicação excluída.");
      } : null,
    });
  }
  $("#btnAddPublicacao").addEventListener("click", () => openPublicacaoForm());

  function renderPublicacoesAdmin() {
    const list = $("#listaPublicacoes");
    const items = data.publicacoes.slice().sort((a, b) => b.data.localeCompare(a.data));
    if (!items.length) { list.innerHTML = `<div class="empty-state">Nenhuma publicação ainda.</div>`; return; }
    list.innerHTML = items.map((p) => `
      <div class="item-row">
        <img class="item-thumb" src="${p.foto ? toAdminSrc(p.foto) : placeholderThumb()}" alt="" />
        <div class="item-info"><h4>${escapeHtml(p.titulo)}</h4><div class="item-sub">${p.data} ${p.categoria ? "· " + escapeHtml(p.categoria) : ""}</div></div>
        <span class="badge-pill ${p.status === "publicado" ? "badge-on" : "badge-off"}">${p.status === "publicado" ? "Publicado" : "Rascunho"}</span>
        <div class="item-actions"><button class="btn btn-secondary btn-sm" data-edit="${p.id}">Editar</button></div>
      </div>`).join("");
    list.querySelectorAll("[data-edit]").forEach((b) => b.addEventListener("click", () => {
      openPublicacaoForm(data.publicacoes.find((p) => p.id === b.dataset.edit));
    }));
  }

  function placeholderThumb() {
    return "data:image/svg+xml;utf8," + encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='62' height='62'><rect width='62' height='62' rx='14' fill='#f3e4d8'/></svg>`
    );
  }

  /* ---------------------------- Perfil ---------------------------- */
  function fillPerfilForm() {
    $("#perfilNome").value = data.perfil.nome;
    $("#perfilMarca").value = data.perfil.marca;
    $("#perfilFrase").value = data.perfil.frase;
    $("#perfilDescricaoInput").value = data.perfil.descricao;
    $("#perfilCidade").value = data.perfil.cidade;
    $("#perfilWhats").value = data.perfil.whatsapp;
    $("#perfilInstagram").value = data.perfil.instagram;
    $("#tplEncomenda").value = data.whatsappTemplates.encomenda;
    $("#tplProduto").value = data.whatsappTemplates.produto;
    $("#tplEvento").value = data.whatsappTemplates.evento;
    $("#acessoUsuario").value = data.admin.usuario;
    const preview = $("#previewFotoPerfil");
    if (data.perfil.fotoPerfil) { preview.src = toAdminSrc(data.perfil.fotoPerfil); preview.style.display = "block"; $("#placeholderFotoPerfil").style.display = "none"; }
  }
  $("#uploadFotoPerfil input").addEventListener("change", async (e) => {
    if (!e.target.files[0]) return;
    const dataUrl = await fileToDataUrl(e.target.files[0]);
    data.perfil.fotoPerfil = dataUrl;
    persist();
    fillPerfilForm();
    toast("Foto atualizada! Não esqueça de salvar as informações.");
  });
  $("#formPerfil").addEventListener("submit", (e) => {
    e.preventDefault();
    Object.assign(data.perfil, {
      nome: $("#perfilNome").value,
      marca: $("#perfilMarca").value,
      frase: $("#perfilFrase").value,
      descricao: $("#perfilDescricaoInput").value,
      cidade: $("#perfilCidade").value,
      whatsapp: D.onlyDigits($("#perfilWhats").value),
      instagram: $("#perfilInstagram").value,
    });
    persist();
    toast("Informações salvas!");
  });
  $("#formWhatsapp").addEventListener("submit", (e) => {
    e.preventDefault();
    data.whatsappTemplates.encomenda = $("#tplEncomenda").value;
    data.whatsappTemplates.produto = $("#tplProduto").value;
    data.whatsappTemplates.evento = $("#tplEvento").value;
    persist();
    toast("Mensagens salvas!");
  });
  $("#formAcesso").addEventListener("submit", (e) => {
    e.preventDefault();
    const novoUsuario = $("#acessoUsuario").value.trim();
    const novaSenha = $("#acessoSenha").value;
    if (novoUsuario) data.admin.usuario = novoUsuario;
    if (novaSenha) data.admin.senha = novaSenha;
    persist();
    $("#acessoSenha").value = "";
    toast("Acesso atualizado!");
  });

  /* ---------------------------- Dashboard ---------------------------- */
  function renderDashboard() {
    const futuros = data.eventos.filter((e) => e.ativo !== false && !D.isEventoPast(e.data)).sort((a, b) => a.data.localeCompare(b.data));
    const cards = [
      { label: "Próximo evento", value: futuros[0] ? D.formatDataCurta(futuros[0].data).dia + " " + D.formatDataCurta(futuros[0].data).mes : "—" },
      { label: "Eventos cadastrados", value: data.eventos.length },
      { label: "Sabores ativos", value: data.sabores.filter((s) => s.disponivel !== false).length },
      { label: "Depoimentos", value: data.depoimentos.length },
      { label: "Publicações", value: data.publicacoes.length },
    ];
    $("#dashboardCards").innerHTML = cards.map((c) => `
      <div class="stat-card"><div class="stat-label">${c.label}</div><div class="stat-value">${c.value}</div></div>
    `).join("");
  }

  function renderAll() {
    renderDashboard();
    renderAgendaAdmin();
    renderSaboresAdmin();
    renderDepoimentosAdmin();
    renderPublicacoesAdmin();
    fillPerfilForm();
  }

  /* ---------------------------- Boot ---------------------------- */
  if (isLoggedIn()) showApp(); else showLogin();
})();
