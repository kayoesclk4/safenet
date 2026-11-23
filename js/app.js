/* ==================== SafeNet Kids – App Principal ==================== */

// ---------- Estado da Aplicação ----------
let currentUser = {
  role: "parent", // 'parent' ou 'child'
  name: "Ricardo",
  email: "ricardo@email.com",
  title: "Pai / Responsável",
  avatar: "R"
};

// Controle Dinâmico de Tempo de Tela
let tempoUsadoMinutos = 135; // 2h 15min
let limiteBaseMinutos = 180; // 3h 00min
let tempoExtraAprovadoMinutos = 0; // Aumenta quando os pais aprovam solicitações

function getLimiteTotalMinutos() {
  return limiteBaseMinutos + tempoExtraAprovadoMinutos;
}

function getTempoDisponivelMinutos() {
  return Math.max(0, getLimiteTotalMinutos() - tempoUsadoMinutos);
}

function getPorcentagemUso() {
  const limite = getLimiteTotalMinutos();
  return Math.min(100, Math.round((tempoUsadoMinutos / limite) * 100));
}

function formatarMinutos(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h 00min`;
  return `${h}h ${m < 10 ? '0' : ''}${m}min`;
}

// ---------- Dados Simulados ----------
let atividades = [
  { icon: "🚫", texto: "Tentativa de acesso a site bloqueado", tempo: "14:32", tipo: "critico" },
  { icon: "🎮", texto: "Jogou Roblox por 45 minutos", tempo: "13:10", tipo: "info" },
  { icon: "✅", texto: "Meta de leitura concluída (+15 min)", tempo: "12:05", tipo: "sucesso" },
  { icon: "📺", texto: "Assistiu YouTube Kids (28 min)", tempo: "11:20", tipo: "info" },
  { icon: "⏰", texto: "Tentativa de acesso após 21h", tempo: "Ontem 21:15", tipo: "atencao" }
];

let perfis = [
  {
    id: 1,
    nome: "Horário de Estudos",
    icone: "📚",
    horario: "14h – 17h",
    descricao: "Bloqueia redes sociais e jogos. Libera apenas sites educativos.",
    tipo: "estudos",
    ativo: true
  },
  {
    id: 2,
    nome: "Horário Livre",
    icone: "🎮",
    horario: "17h – 20h",
    descricao: "Acesso normal com monitoramento ativo e limites diários.",
    tipo: "livre",
    ativo: true
  },
  {
    id: 3,
    nome: "Horário de Dormir",
    icone: "🌙",
    horario: "Após 21h",
    descricao: "Bloqueio total de tráfego de rede e notificações desativadas.",
    tipo: "dormir",
    ativo: true
  }
];

let metas = [
  { id: 1, texto: "Leitura de 20 minutos de um livro", feito: true },
  { id: 2, texto: "Fazer as tarefas escolares do dia", feito: true },
  { id: 3, texto: "Organizar o quarto e materiais escolares", feito: false }
];

let alertas = [
  {
    id: 1,
    icone: "🚫",
    titulo: "Site bloqueado",
    descricao: "Tentativa de acesso a conteúdo adulto (domínio filtrado via DNS)",
    tempo: "Hoje, 14:32",
    tipo: "critico",
    lido: false
  },
  {
    id: 2,
    icone: "⏰",
    titulo: "Fora do horário",
    descricao: "Acesso tentado após 21h (Horário de Dormir ativo)",
    tempo: "Ontem, 21:15",
    tipo: "atencao",
    lido: false
  },
  {
    id: 3,
    icone: "🌟",
    titulo: "Pedido de Tempo Extra: +30 min",
    descricao: "Guilherme cumpriu 2 metas hoje e solicitou liberação de +30 minutos extras.",
    tempo: "Hoje, 15:10",
    tipo: "info",
    lido: false,
    solicitacao: {
      tempo: 30,
      pendente: true
    }
  },
  {
    id: 4,
    icone: "✅",
    titulo: "Meta cumprida",
    descricao: "Guilherme completou a meta de leitura e gerou bônus.",
    tempo: "Hoje, 12:05",
    tipo: "sucesso",
    lido: true
  },
  {
    id: 5,
    icone: "📱",
    titulo: "Dispositivo Pareado",
    descricao: "Galaxy A54 sincronizado com sucesso.",
    tempo: "Ontem, 09:10",
    tipo: "info",
    lido: true
  }
];

const diasSemana = [
  { dia: "Segunda-feira", tempo: "2h 10min", pct: 70 },
  { dia: "Terça-feira", tempo: "1h 45min", pct: 55 },
  { dia: "Quarta-feira", tempo: "2h 30min", pct: 80 },
  { dia: "Quinta-feira", tempo: "1h 55min", pct: 60 },
  { dia: "Sexta-feira", tempo: "2h 40min", pct: 85 },
  { dia: "Sábado", tempo: "2h 00min", pct: 65 },
  { dia: "Domingo", tempo: "1h 20min", pct: 45 }
];

let isBlocked = false;

// ---------- Elementos do DOM ----------
const screenLogin = document.getElementById("screen-login");
const screenApp = document.getElementById("screen-app");
const loginForm = document.getElementById("login-form");
const btnLogout = document.getElementById("btn-logout");
const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");
const toastEl = document.getElementById("toast");

// Elementos de Perfil de Usuário
const userAvatar = document.getElementById("user-avatar");
const userName = document.getElementById("user-name");
const userTitle = document.getElementById("user-title");
const mobileAvatar = document.getElementById("mobile-avatar");
const navGroupParent = document.getElementById("nav-group-parent");
const navGroupChild = document.getElementById("nav-group-child");

// Elementos Mobile
const btnMenu = document.getElementById("btn-menu");
const btnCloseSidebar = document.getElementById("btn-close-sidebar");
const appSidebar = document.getElementById("app-sidebar");
const sidebarBackdrop = document.getElementById("sidebar-backdrop");

// Modais
const modalPerfil = document.getElementById("modal-perfil");
const formPerfil = document.getElementById("form-perfil");
const modalPerfilTitle = document.getElementById("modal-perfil-title");
const btnExcluirPerfil = document.getElementById("btn-excluir-perfil");

const modalSolicitar = document.getElementById("modal-solicitar");
const formSolicitar = document.getElementById("form-solicitar");

const modalMeta = document.getElementById("modal-meta");
const formMeta = document.getElementById("form-meta");
const modalMetaTitle = document.getElementById("modal-meta-title");
const btnExcluirMeta = document.getElementById("btn-excluir-meta");
const btnSalvarMeta = document.getElementById("btn-salvar-meta");

const modalAuth = document.getElementById("modal-auth");
const formAuth = document.getElementById("form-auth");
const modalAuthTitle = document.getElementById("modal-auth-title");
const authFields = document.getElementById("auth-fields");
const btnAuthSubmit = document.getElementById("btn-auth-submit");

// ---------- Navegação entre Páginas ----------
function showPage(pageId) {
  pages.forEach(p => p.classList.remove("active"));
  navItems.forEach(n => n.classList.remove("active"));

  const page = document.getElementById("page-" + pageId);
  const nav = document.querySelector(`.nav-item[data-page="${pageId}"]`);

  if (page) page.classList.add("active");
  if (nav) nav.classList.add("active");

  closeMobileMenu();

  if (pageId === "dashboard" && chartCat) chartCat.resize();
  if (pageId === "relatorio" && chartSem) chartSem.resize();
}

navItems.forEach(item => {
  item.addEventListener("click", () => {
    showPage(item.dataset.page);
  });
});

// ---------- Menu Mobile ----------
function openMobileMenu() {
  if (appSidebar) appSidebar.classList.add("mobile-open");
  if (sidebarBackdrop) sidebarBackdrop.classList.add("active");
}

function closeMobileMenu() {
  if (appSidebar) appSidebar.classList.remove("mobile-open");
  if (sidebarBackdrop) sidebarBackdrop.classList.remove("active");
}

if (btnMenu) btnMenu.addEventListener("click", openMobileMenu);
if (btnCloseSidebar) btnCloseSidebar.addEventListener("click", closeMobileMenu);
if (sidebarBackdrop) sidebarBackdrop.addEventListener("click", closeMobileMenu);

// ---------- Sistema de Autenticação e Perfis (Pais vs Criança) ----------
function aplicarPerfilUsuario(role) {
  currentUser.role = role;

  if (role === "child") {
    currentUser.name = "Guilherme";
    currentUser.email = "guilherme@email.com";
    currentUser.title = "Filho (10 anos)";
    currentUser.avatar = "G";

    // Mostra apenas o menu da criança
    if (navGroupParent) {
      navGroupParent.style.display = "none";
      navGroupParent.classList.add("hidden");
    }
    if (navGroupChild) {
      navGroupChild.style.display = "flex";
      navGroupChild.style.flexDirection = "column";
      navGroupChild.classList.remove("hidden");
    }

    showPage("crianca");
    showToast("Bem-vindo, Guilherme! 👦 Suas metas estão disponíveis.", "success");
  } else {
    currentUser.name = "Ricardo";
    currentUser.email = "ricardo@email.com";
    currentUser.title = "Pai / Responsável";
    currentUser.avatar = "R";

    // Mostra apenas o menu dos pais
    if (navGroupParent) {
      navGroupParent.style.display = "flex";
      navGroupParent.style.flexDirection = "column";
      navGroupParent.classList.remove("hidden");
    }
    if (navGroupChild) {
      navGroupChild.style.display = "none";
      navGroupChild.classList.add("hidden");
    }

    showPage("dashboard");
    showToast("Bem-vindo ao Painel dos Pais, Ricardo! 👨‍💼", "success");
  }

  // Atualiza dados visuais do usuário na sidebar e topbar
  if (userAvatar) userAvatar.textContent = currentUser.avatar;
  if (userName) userName.textContent = currentUser.name;
  if (userTitle) userTitle.textContent = currentUser.title;
  if (mobileAvatar) mobileAvatar.textContent = currentUser.avatar;

  atualizarTempoTelaGeral();
}

function doLogin(role = "parent") {
  screenLogin.classList.remove("active");
  screenApp.classList.add("active");
  aplicarPerfilUsuario(role);
  setTimeout(initCharts, 150);
}

// Atalhos Rápidos da Tela de Login (Modo Apresentação)
const btnDemoPai = document.getElementById("btn-demo-pai");
const btnDemoFilho = document.getElementById("btn-demo-filho");

if (btnDemoPai) {
  btnDemoPai.addEventListener("click", () => {
    document.getElementById("email").value = "ricardo@email.com";
    document.getElementById("senha").value = "123456";
    btnDemoPai.classList.add("active");
    if (btnDemoFilho) btnDemoFilho.classList.remove("active");
    doLogin("parent");
  });
}

if (btnDemoFilho) {
  btnDemoFilho.addEventListener("click", () => {
    document.getElementById("email").value = "guilherme@email.com";
    document.getElementById("senha").value = "1234";
    btnDemoFilho.classList.add("active");
    if (btnDemoPai) btnDemoPai.classList.remove("active");
    doLogin("child");
  });
}

// Submissão do Formulário de Login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailInput = document.getElementById("email").value.trim().toLowerCase();
  const senhaInput = document.getElementById("senha").value.trim();

  // Verifica se é a conta da criança (guilherme@email.com / 1234)
  if (emailInput.includes("guilherme")) {
    doLogin("child");
  } else {
    doLogin("parent");
  }
});

btnLogout.addEventListener("click", () => {
  screenApp.classList.remove("active");
  screenLogin.classList.add("active");
  showToast("Você saiu com segurança.", "");
});

// ---------- Toast de Notificação ----------
let toastTimer = null;
function showToast(msg, tipo = "") {
  if (toastTimer) clearTimeout(toastTimer);
  toastEl.textContent = msg;
  toastEl.className = "toast show " + tipo;
  toastTimer = setTimeout(() => {
    toastEl.classList.remove("show");
  }, 3500);
}

// ---------- Controle de Modais Universal ----------
function openModal(modalEl) {
  if (modalEl) modalEl.classList.add("active");
}

function closeModal(modalEl) {
  if (modalEl) modalEl.classList.remove("active");
}

document.querySelectorAll("[data-close]").forEach(btn => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-close");
    closeModal(document.getElementById(targetId));
  });
});

document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });
});

// ---------- ATUALIZAÇÃO SINCRONIZADA DE TEMPO DE TELA ----------
function atualizarTempoTelaGeral() {
  const limiteTotal = getLimiteTotalMinutos();
  const disponivel = getTempoDisponivelMinutos();
  const porcentagem = getPorcentagemUso();

  const limiteFormatado = formatarMinutos(limiteTotal);
  const disponivelFormatado = formatarMinutos(disponivel);
  const usadoFormatado = formatarMinutos(tempoUsadoMinutos);

  // 1. Atualiza Painel dos Pais (Dashboard)
  const elDashTempo = document.getElementById("dashboard-tempo-tela");
  const elDashBadgeDisp = document.getElementById("dashboard-badge-disponivel");
  const elDashFill = document.getElementById("dashboard-progress-fill");
  const elDashSub = document.getElementById("dashboard-card-sub");

  if (elDashTempo) elDashTempo.textContent = usadoFormatado;
  if (elDashBadgeDisp) {
    elDashBadgeDisp.textContent = `${disponivelFormatado} livres`;
  }
  if (elDashFill) {
    elDashFill.style.width = `${porcentagem}%`;
    if (porcentagem > 90) {
      elDashFill.style.background = "linear-gradient(90deg, #EF4444 0%, #DC2626 100%)";
    } else if (porcentagem > 75) {
      elDashFill.style.background = "linear-gradient(90deg, #F59E0B 0%, #D97706 100%)";
    } else {
      elDashFill.style.background = "linear-gradient(90deg, #2563EB 0%, #3B82F6 100%)";
    }
  }
  if (elDashSub) {
    elDashSub.innerHTML = `Limite diário: <strong>${limiteFormatado}</strong> (${porcentagem}%) • Disponível: <strong class="text-success">${disponivelFormatado}</strong>${tempoExtraAprovadoMinutos > 0 ? ` <span class="badge-bonus">+${tempoExtraAprovadoMinutos}m bônus</span>` : ''}`;
  }

  // 2. Atualiza Painel da Criança (Meu Tempo de Rede)
  const elCriancaUsado = document.getElementById("crianca-tempo-usado");
  const elCriancaDisp = document.getElementById("crianca-tempo-disponivel");
  const elCriancaLimSub = document.getElementById("crianca-limite-sub");
  const elCriancaFill = document.getElementById("crianca-progress-fill");
  const elCriancaLabel = document.getElementById("crianca-progress-label");
  const elCriancaStatusText = document.getElementById("crianca-status-text");

  if (elCriancaUsado) elCriancaUsado.textContent = usadoFormatado;
  if (elCriancaDisp) elCriancaDisp.textContent = disponivelFormatado;
  if (elCriancaLimSub) elCriancaLimSub.textContent = `Limite diário total: ${limiteFormatado}`;
  if (elCriancaFill) {
    elCriancaFill.style.width = `${porcentagem}%`;
  }
  if (elCriancaLabel) {
    elCriancaLabel.innerHTML = `Você já utilizou <strong>${porcentagem}%</strong> do seu tempo autorizado para hoje (${usadoFormatado} de ${limiteFormatado}). Restam <strong class="text-success">${disponivelFormatado}</strong> livres.`;
  }
  if (elCriancaStatusText) {
    elCriancaStatusText.textContent = isBlocked ? "Bloqueado" : "Liberado";
    elCriancaStatusText.className = isBlocked ? "card-value danger" : "card-value success";
  }

  // 3. Atualiza Sub-hint na tela de recompensas
  const elSubHintDisp = document.getElementById("tempo-extra-status-disponivel");
  if (elSubHintDisp) {
    elSubHintDisp.innerHTML = `Tempo livre restante hoje: <strong>${disponivelFormatado}</strong> (Limite: ${limiteFormatado})`;
  }
}

// ---------- Renderização: Atividades Recentes ----------
function renderAtividades() {
  const ul = document.getElementById("lista-atividades");
  if (!ul) return;
  ul.innerHTML = atividades.map(a => `
    <li>
      <span class="activity-icon">${a.icon}</span>
      <span>${a.texto}</span>
      <span class="activity-time">${a.tempo}</span>
    </li>
  `).join("");
}

// ---------- Renderização: Perfis de Horário (Pais) ----------
function renderPerfis() {
  const container = document.getElementById("lista-perfis");
  if (!container) return;

  container.innerHTML = perfis.map(p => `
    <div class="profile-card ${p.tipo}" data-id="${p.id}">
      <div class="profile-icon">${p.icone}</div>
      <div class="profile-info">
        <h3>${p.nome}</h3>
        <p><strong>${p.horario}</strong> — ${p.descricao}</p>
      </div>
      <div class="profile-actions">
        <div class="toggle ${p.ativo ? "on" : ""}" data-id="${p.id}" title="${p.ativo ? 'Desativar perfil' : 'Ativar perfil'}"></div>
        <button class="btn btn-outline btn-sm btn-editar-perfil" data-id="${p.id}">
          ✏️ Editar
        </button>
      </div>
    </div>
  `).join("");

  container.querySelectorAll(".toggle").forEach(t => {
    t.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = parseInt(t.dataset.id);
      const perfil = perfis.find(p => p.id === id);
      if (!perfil) return;

      perfil.ativo = !perfil.ativo;
      t.classList.toggle("on", perfil.ativo);
      t.title = perfil.ativo ? 'Desativar perfil' : 'Ativar perfil';

      showToast(
        perfil.ativo ? `"${perfil.nome}" ativado com sucesso!` : `"${perfil.nome}" desativado.`,
        perfil.ativo ? "success" : ""
      );
    });
  });

  container.querySelectorAll(".btn-editar-perfil").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      abrirModalEditarPerfil(id);
    });
  });
}

function abrirModalEditarPerfil(id) {
  const perfil = perfis.find(p => p.id === id);
  if (!perfil) return;

  modalPerfilTitle.textContent = "Editar Perfil de Horário";
  document.getElementById("perfil-id").value = perfil.id;
  document.getElementById("perfil-nome").value = perfil.nome;
  document.getElementById("perfil-icone").value = perfil.icone;
  document.getElementById("perfil-tipo").value = perfil.tipo;
  document.getElementById("perfil-horario").value = perfil.horario;
  document.getElementById("perfil-descricao").value = perfil.descricao;

  btnExcluirPerfil.style.display = "inline-flex";
  openModal(modalPerfil);
}

function abrirModalNovoPerfil() {
  modalPerfilTitle.textContent = "Criar Novo Perfil de Horário";
  formPerfil.reset();
  document.getElementById("perfil-id").value = "";
  document.getElementById("perfil-icone").value = "🎯";
  document.getElementById("perfil-tipo").value = "livre";

  btnExcluirPerfil.style.display = "none";
  openModal(modalPerfil);
}

document.getElementById("btn-novo-perfil").addEventListener("click", abrirModalNovoPerfil);

formPerfil.addEventListener("submit", (e) => {
  e.preventDefault();
  const idVal = document.getElementById("perfil-id").value;
  const nome = document.getElementById("perfil-nome").value.trim();
  const icone = document.getElementById("perfil-icone").value.trim() || "⏰";
  const tipo = document.getElementById("perfil-tipo").value;
  const horario = document.getElementById("perfil-horario").value.trim();
  const descricao = document.getElementById("perfil-descricao").value.trim();

  if (idVal) {
    const id = parseInt(idVal);
    const index = perfis.findIndex(p => p.id === id);
    if (index !== -1) {
      perfis[index] = { ...perfis[index], nome, icone, tipo, horario, descricao };
      showToast(`Perfil "${nome}" atualizado com sucesso!`, "success");
    }
  } else {
    perfis.push({
      id: Date.now(),
      nome,
      icone,
      tipo,
      horario,
      descricao,
      ativo: true
    });
    showToast(`Novo perfil "${nome}" cadastrado!`, "success");
  }

  renderPerfis();
  closeModal(modalPerfil);
});

btnExcluirPerfil.addEventListener("click", () => {
  const idVal = document.getElementById("perfil-id").value;
  if (!idVal) return;
  const id = parseInt(idVal);
  const p = perfis.find(item => item.id === id);
  const nome = p ? p.nome : "Perfil";

  perfis = perfis.filter(item => item.id !== id);
  renderPerfis();
  closeModal(modalPerfil);
  showToast(`Perfil "${nome}" excluído.`, "danger");
});

// ---------- RENDERIZAÇÃO DE METAS (Gestão dos Pais vs Tela da Criança) ----------

// 1. Lista no Painel da Criança: A criança APENAS marca se cumpriu (sem editar/excluir/adicionar)
function renderMetasCrianca() {
  const ul = document.getElementById("lista-metas-crianca");
  if (!ul) return;

  ul.innerHTML = metas.map(m => `
    <li data-id="${m.id}">
      <div class="meta-item-left">
        <div class="meta-check ${m.feito ? "done" : ""}" data-id="${m.id}" title="Toque para marcar como feito">
          ${m.feito ? "✓" : ""}
        </div>
        <span class="meta-title" style="${m.feito ? "text-decoration:line-through;color:#94A3B8" : ""}">${m.texto}</span>
      </div>
      <span class="badge-pill ${m.feito ? 'success' : 'warning'}">
        ${m.feito ? 'Concluída ✓' : '+15 min'}
      </span>
    </li>
  `).join("");

  // Evento da Criança marcar/desmarcar
  ul.querySelectorAll(".meta-check").forEach(chk => {
    chk.addEventListener("click", () => {
      const id = parseInt(chk.dataset.id);
      const meta = metas.find(m => m.id === id);
      if (!meta) return;

      meta.feito = !meta.feito;
      chk.classList.toggle("done", meta.feito);
      chk.textContent = meta.feito ? "✓" : "";

      const span = chk.closest(".meta-item-left").querySelector(".meta-title");
      if (span) {
        span.style.textDecoration = meta.feito ? "line-through" : "none";
        span.style.color = meta.feito ? "#94A3B8" : "";
      }

      atualizarBonusCrianca();
      atualizarResumoDashboardMetas();
      renderMetasGestaoPais(); // Atualiza em tempo real caso o pai consulte

      showToast(
        meta.feito ? `Parabéns, Guilherme! Você concluiu "${meta.texto}" (+15 min conquistados)` : "Meta desmarcada.",
        meta.feito ? "success" : ""
      );
    });
  });
}

// 2. Lista no Painel dos Pais: Os pais gerenciam (adicionar, editar texto, excluir)
function renderMetasGestaoPais() {
  const ul = document.getElementById("lista-metas-gestao");
  if (!ul) return;

  ul.innerHTML = metas.map(m => `
    <li class="gestao-meta-item" data-id="${m.id}">
      <div class="gestao-meta-left">
        <span style="font-size: 1.4rem;">${m.feito ? '✅' : '⏳'}</span>
        <div>
          <div class="gestao-meta-title" style="${m.feito ? 'text-decoration:line-through;color:#64748B;' : ''}">${m.texto}</div>
          <div class="gestao-meta-sub">
            Status: <strong class="${m.feito ? 'text-success' : ''}">${m.feito ? 'Concluída pelo Guilherme ✓' : 'Ainda não concluída'}</strong>
          </div>
        </div>
      </div>
      <div class="gestao-meta-actions">
        <button class="btn btn-outline btn-sm btn-editar-meta-pai" data-id="${m.id}" title="Editar texto desta meta">
          ✏️ Editar
        </button>
        <button class="btn btn-outline btn-danger-text btn-sm btn-excluir-meta-pai" data-id="${m.id}" title="Excluir meta">
          🗑️ Excluir
        </button>
      </div>
    </li>
  `).join("");

  // Botões de Editar do Pai
  ul.querySelectorAll(".btn-editar-meta-pai").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      abrirModalEditarMeta(id);
    });
  });

  // Botões de Excluir do Pai
  ul.querySelectorAll(".btn-excluir-meta-pai").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      excluirMetaPorId(id);
    });
  });

  // Atualiza badge de estatísticas no painel dos pais
  const feitas = metas.filter(m => m.feito).length;
  const badgeStats = document.getElementById("badge-metas-stats");
  if (badgeStats) {
    badgeStats.textContent = `${feitas} de ${metas.length} concluídas`;
    badgeStats.className = feitas === metas.length ? "badge-pill success" : "badge-pill warning";
  }
}

// Funções de Gerenciamento de Metas (Pelos Pais)
function abrirModalNovaMeta() {
  if (modalMetaTitle) modalMetaTitle.textContent = "🎯 Cadastrar Meta para o Filho";
  if (btnSalvarMeta) btnSalvarMeta.textContent = "Cadastrar Meta";
  formMeta.reset();
  document.getElementById("meta-id").value = "";
  if (btnExcluirMeta) btnExcluirMeta.style.display = "none";
  openModal(modalMeta);
}

function abrirModalEditarMeta(id) {
  const meta = metas.find(m => m.id === id);
  if (!meta) return;

  if (modalMetaTitle) modalMetaTitle.textContent = "✏️ Editar Meta do Filho";
  if (btnSalvarMeta) btnSalvarMeta.textContent = "Salvar Alterações";
  document.getElementById("meta-id").value = meta.id;
  document.getElementById("meta-texto").value = meta.texto;
  if (btnExcluirMeta) btnExcluirMeta.style.display = "inline-flex";

  openModal(modalMeta);
}

function excluirMetaPorId(id) {
  const meta = metas.find(m => m.id === id);
  const texto = meta ? meta.texto : "Meta";
  metas = metas.filter(m => m.id !== id);

  renderMetasGestaoPais();
  renderMetasCrianca();
  atualizarBonusCrianca();
  atualizarResumoDashboardMetas();

  showToast(`Meta "${texto}" removida com sucesso.`, "danger");
}

document.getElementById("btn-nova-meta-pai").addEventListener("click", abrirModalNovaMeta);

formMeta.addEventListener("submit", (e) => {
  e.preventDefault();
  const idVal = document.getElementById("meta-id").value;
  const texto = document.getElementById("meta-texto").value.trim();
  if (!texto) return;

  if (idVal) {
    const id = parseInt(idVal);
    const meta = metas.find(m => m.id === id);
    if (meta) {
      meta.texto = texto;
      showToast(`Meta "${texto}" atualizada com sucesso!`, "success");
    }
  } else {
    metas.push({
      id: Date.now(),
      texto,
      feito: false
    });
    showToast(`Nova meta cadastrada para o Guilherme!`, "success");
  }

  renderMetasGestaoPais();
  renderMetasCrianca();
  atualizarBonusCrianca();
  atualizarResumoDashboardMetas();
  closeModal(modalMeta);
});

if (btnExcluirMeta) {
  btnExcluirMeta.addEventListener("click", () => {
    const idVal = document.getElementById("meta-id").value;
    if (!idVal) return;
    excluirMetaPorId(parseInt(idVal));
    closeModal(modalMeta);
  });
}

function atualizarBonusCrianca() {
  const feitas = metas.filter(m => m.feito).length;
  const minutos = feitas * 15;
  const tempoExtraEl = document.getElementById("tempo-extra");
  const hintEl = document.getElementById("tempo-extra-hint");

  if (tempoExtraEl) tempoExtraEl.textContent = `+ ${minutos} minutos`;
  if (hintEl) {
    if (feitas > 0) {
      hintEl.textContent = `🎉 Parabéns, Guilherme! Você já cumpriu ${feitas} de ${metas.length} metas hoje!`;
    } else {
      hintEl.textContent = `Marque suas metas acima para liberar tempo de tela extra.`;
    }
  }
}

function atualizarResumoDashboardMetas() {
  const feitas = metas.filter(m => m.feito).length;
  const metasResumoEl = document.getElementById("dashboard-metas-resumo");
  const metasSubEl = document.getElementById("dashboard-metas-sub");

  if (metasResumoEl) metasResumoEl.textContent = `${feitas} / ${metas.length}`;
  if (metasSubEl) {
    metasSubEl.textContent = `Guilherme cumpriu ${feitas} tarefas hoje`;
  }
}

// Solicitar Tempo Extra (da Criança)
document.getElementById("btn-solicitar").addEventListener("click", () => {
  const feitas = metas.filter(m => m.feito).length;
  if (feitas === 0) {
    showToast("Guilherme, cumpra pelo menos uma meta antes de solicitar tempo extra!", "danger");
    return;
  }
  openModal(modalSolicitar);
});

formSolicitar.addEventListener("submit", (e) => {
  e.preventDefault();
  const tempoSelected = document.querySelector('input[name="tempo_solicitado"]:checked').value;
  const motivo = document.getElementById("solicitacao-motivo").value.trim();

  const novoAlerta = {
    id: Date.now(),
    icone: "🌟",
    titulo: `Pedido de Tempo Extra: +${tempoSelected} min`,
    descricao: motivo ? `Guilherme pediu +${tempoSelected} min: "${motivo}"` : `Guilherme cumpriu metas e solicitou liberação de +${tempoSelected} min extras.`,
    tempo: "Agora",
    tipo: "info",
    lido: false,
    solicitacao: {
      tempo: parseInt(tempoSelected, 10),
      pendente: true
    }
  };

  alertas.unshift(novoAlerta);
  renderAlertas();
  closeModal(modalSolicitar);
  showToast("Solicitação enviada para seu pai Ricardo!", "success");
});

// ---------- Renderização: Alertas (Pais) ----------
function renderAlertas() {
  const container = document.getElementById("lista-alertas");
  if (!container) return;

  container.innerHTML = alertas.map(a => `
    <div class="alert-item ${a.tipo}">
      <span class="alert-icon">${a.icone}</span>
      <div class="alert-content">
        <h4>${a.titulo}</h4>
        <p>${a.descricao}</p>
        ${a.solicitacao && a.solicitacao.pendente ? `
          <div class="alert-actions">
            <button class="btn btn-sm btn-primary btn-aprovar" data-id="${a.id}">
              ✓ Aprovar (+${a.solicitacao.tempo} min)
            </button>
            <button class="btn btn-sm btn-outline btn-recusar" data-id="${a.id}">
              ✕ Recusar
            </button>
          </div>
        ` : ""}
      </div>
      <span class="alert-time">${a.tempo}</span>
    </div>
  `).join("");

  // Botão Aprovar Tempo Extra: Aumenta o tempo do Guilherme e recalcula a Dashboard
  container.querySelectorAll(".btn-aprovar").forEach(b => {
    b.addEventListener("click", () => {
      const id = parseInt(b.dataset.id, 10);
      const alerta = alertas.find(item => item.id === id);
      if (alerta && alerta.solicitacao) {
        alerta.solicitacao.pendente = false;
        alerta.tipo = "sucesso";
        alerta.titulo = `Tempo Extra Liberado: +${alerta.solicitacao.tempo} min`;
        alerta.descricao = `Você aprovou o pedido. O limite diário do Guilherme foi ampliado com sucesso.`;

        // Amplia o tempo disponível
        tempoExtraAprovadoMinutos += alerta.solicitacao.tempo;

        atividades.unshift({
          icon: "⏰",
          texto: `Liberado +${alerta.solicitacao.tempo} min extras para o Guilherme`,
          tempo: "Agora",
          tipo: "sucesso"
        });

        atualizarTempoTelaGeral();
        renderAlertas();
        renderAtividades();

        showToast(
          `Aprovado! Limite do Guilherme aumentado para ${formatarMinutos(getLimiteTotalMinutos())}. Restam ${formatarMinutos(getTempoDisponivelMinutos())} livres.`,
          "success"
        );
      }
    });
  });

  container.querySelectorAll(".btn-recusar").forEach(b => {
    b.addEventListener("click", () => {
      const id = parseInt(b.dataset.id, 10);
      const alerta = alertas.find(item => item.id === id);
      if (alerta && alerta.solicitacao) {
        alerta.solicitacao.pendente = false;
        alerta.tipo = "atencao";
        alerta.titulo = `Pedido Recusado (+${alerta.solicitacao.tempo} min)`;
        renderAlertas();
        showToast("Pedido de tempo extra recusado.", "");
      }
    });
  });

  const naoLidos = alertas.filter(a => !a.lido).length;
  const badge = document.getElementById("badge-alertas");
  if (badge) {
    badge.textContent = naoLidos;
    badge.style.display = naoLidos > 0 ? "inline" : "none";
  }

  const dashAlertCount = document.getElementById("dashboard-alertas-count");
  if (dashAlertCount) dashAlertCount.textContent = naoLidos;
}

document.getElementById("btn-marcar-lidos").addEventListener("click", () => {
  alertas.forEach(a => a.lido = true);
  renderAlertas();
  showToast("Todos os alertas marcados como lidos.", "success");
});

// ---------- Renderização: Dias da Semana (Relatório) ----------
function renderDias() {
  const ul = document.getElementById("lista-dias");
  if (!ul) return;
  ul.innerHTML = diasSemana.map(d => `
    <li>
      <div style="flex:1; margin-right: 1.5rem;">
        <strong>${d.dia}</strong>
        <div class="day-bar" style="width:${d.pct}%"></div>
      </div>
      <span style="font-weight:600; color:var(--text-muted);">${d.tempo}</span>
    </li>
  `).join("");
}

// ---------- Ação: Bloquear / Desbloquear Agora ----------
const btnBloquear = document.getElementById("btn-bloquear");
const btnBloquearIcon = document.getElementById("btn-bloquear-icon");
const btnBloquearText = document.getElementById("btn-bloquear-text");
const childStatus = document.getElementById("child-status");

btnBloquear.addEventListener("click", () => {
  isBlocked = !isBlocked;

  if (isBlocked) {
    btnBloquear.classList.add("btn-danger-text");
    btnBloquearIcon.textContent = "🟢";
    btnBloquearText.textContent = "Liberar acesso";

    if (childStatus) {
      childStatus.className = "status blocked";
      childStatus.innerHTML = '<span class="status-dot"></span> Dispositivo bloqueado';
    }

    atividades.unshift({
      icon: "🚫",
      texto: "Bloqueio emergencial ativado pelos pais",
      tempo: "Agora",
      tipo: "critico"
    });

    alertas.unshift({
      id: Date.now(),
      icone: "🚫",
      titulo: "Dispositivo bloqueado",
      descricao: "Acesso total à rede do Galaxy A54 foi suspenso manualmente.",
      tempo: "Agora",
      tipo: "critico",
      lido: false
    });

    renderAtividades();
    renderAlertas();
    atualizarTempoTelaGeral();
    showToast("Dispositivo do Guilherme bloqueado imediatamente!", "danger");
  } else {
    btnBloquear.classList.remove("btn-danger-text");
    btnBloquearIcon.textContent = "🚫";
    btnBloquearText.textContent = "Bloquear agora";

    if (childStatus) {
      childStatus.className = "status online";
      childStatus.innerHTML = '<span class="status-dot"></span> Online agora';
    }

    atividades.unshift({
      icon: "🌐",
      texto: "Acesso à rede liberado pelos pais",
      tempo: "Agora",
      tipo: "sucesso"
    });

    renderAtividades();
    atualizarTempoTelaGeral();
    showToast("Acesso à rede restabelecido com sucesso!", "success");
  }
});

// ---------- Ação: Exportar PDF Real ----------
document.getElementById("btn-exportar").addEventListener("click", () => {
  const container = document.getElementById("relatorio-export-container");
  showToast("Preparando relatório em PDF...", "info");

  if (typeof html2pdf !== "undefined") {
    const opt = {
      margin: [10, 10, 10, 10],
      filename: "SafeNet_Kids_Relatorio_Semanal.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    };

    html2pdf().set(opt).from(container).save().then(() => {
      showToast("Relatório PDF gerado e baixado com sucesso!", "success");
    }).catch(err => {
      console.warn("Falha no html2pdf, acionando impressão nativa:", err);
      window.print();
    });
  } else {
    window.print();
  }
});

// ---------- Modais de Autenticação (Criar Conta / Esqueci Senha) ----------
document.getElementById("link-criar-conta").addEventListener("click", (e) => {
  e.preventDefault();
  modalAuthTitle.textContent = "Criar Conta Parental";
  btnAuthSubmit.textContent = "Cadastrar Família";
  authFields.innerHTML = `
    <div class="form-group">
      <label>Nome do Responsável</label>
      <input type="text" placeholder="Ex: Ricardo Mazon" required>
    </div>
    <div class="form-group">
      <label>E-mail</label>
      <input type="email" placeholder="seu@email.com" required>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Nome do Filho(a)</label>
        <input type="text" placeholder="Ex: Guilherme" required>
      </div>
      <div class="form-group">
        <label>Idade</label>
        <input type="number" placeholder="10" min="4" max="17" required>
      </div>
    </div>
    <div class="form-group">
      <label>Crie uma Senha</label>
      <input type="password" placeholder="••••••••" required>
    </div>
  `;
  openModal(modalAuth);
});

document.getElementById("link-esqueci-senha").addEventListener("click", (e) => {
  e.preventDefault();
  modalAuthTitle.textContent = "Recuperar Acesso";
  btnAuthSubmit.textContent = "Enviar Instruções";
  authFields.innerHTML = `
    <p class="text-muted small-mb">Digite seu e-mail cadastrado para receber o link de redefinição de senha.</p>
    <div class="form-group">
      <label>Seu e-mail cadastrado</label>
      <input type="email" placeholder="seu@email.com" value="ricardo@email.com" required>
    </div>
  `;
  openModal(modalAuth);
});

formAuth.addEventListener("submit", (e) => {
  e.preventDefault();
  closeModal(modalAuth);
  showToast("Operação concluída com sucesso! Faça login para acessar.", "success");
});

// ---------- Gráficos (Chart.js) ----------
let chartCat = null;
let chartSem = null;

function initCharts() {
  if (typeof Chart === "undefined") return;

  const ctx1 = document.getElementById("chartCategorias");
  if (ctx1 && !chartCat) {
    chartCat = new Chart(ctx1, {
      type: "doughnut",
      data: {
        labels: ["Jogos (40%)", "Vídeos (30%)", "Educativo (20%)", "Outros (10%)"],
        datasets: [{
          data: [40, 30, 20, 10],
          backgroundColor: ["#2563EB", "#F59E0B", "#10B981", "#94A3B8"],
          borderWidth: 0,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 16,
              usePointStyle: true,
              font: { family: "'Plus Jakarta Sans', sans-serif", size: 12 }
            }
          }
        },
        cutout: "68%"
      }
    });
  }

  const ctx2 = document.getElementById("chartSemanal");
  if (ctx2 && !chartSem) {
    chartSem = new Chart(ctx2, {
      type: "bar",
      data: {
        labels: ["Jogos", "Vídeos", "Educativo", "Navegação / Outros"],
        datasets: [{
          label: "% do tempo semanal",
          data: [38, 27, 22, 13],
          backgroundColor: ["#2563EB", "#F59E0B", "#10B981", "#94A3B8"],
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 50,
            ticks: {
              callback: v => v + "%",
              font: { family: "'Plus Jakarta Sans', sans-serif" }
            },
            grid: { color: "#F1F5F9" }
          },
          x: {
            grid: { display: false },
            ticks: { font: { family: "'Plus Jakarta Sans', sans-serif" } }
          }
        }
      }
    });
  }
}

// ---------- Inicialização ----------
renderAtividades();
renderPerfis();
renderMetasGestaoPais();
renderMetasCrianca();
renderAlertas();
renderDias();
atualizarBonusCrianca();
atualizarResumoDashboardMetas();
atualizarTempoTelaGeral();

console.log("SafeNet Kids – Protótipo inicializado com sucesso!");
