
// Dicionário de traduções
const translations = {
    'pt': {
        'pageTitle': 'Histórico - ControlTech',
        'sidebarTools': 'Ferramentas',
        'sidebarReturn': 'Devolver',
        'sidebarHelp': 'Ajuda',
        'sidebarHistory': 'Histórico',
        'sidebarExit': 'Sair',
        'sidebarSettings': 'Configurações',
        'headerTitle': 'Histórico de Devoluções',
        'btnMeuHistorico': 'Meu Histórico',
        'btnTodos': 'Todos',
        'cardUsuario': 'Usuário:',
        'cardData': 'Data da Devolução:',
        'cardObs': 'Observações:',
        'cardNenhumaObs': '-',
        'msgNenhumHistorico': 'Nenhum histórico de devolução encontrado.',
        'msgErroHistorico': 'Erro ao carregar histórico.',
        'settingsPopupTitle': 'Configurações',
        'themeLabel': 'Alternar Tema:',
        'themeStatusLight': 'Tema Claro',
        'themeStatusDark': 'Tema Escuro',
        'langLabel': 'Alternar Idioma:',
        'langStatusPT': 'Português',
        'langStatusEN': 'Inglês',
        'welcomeMessage': 'Olá,'
    },
    'en': {
        'pageTitle': 'History - ControlTech',
        'sidebarTools': 'Tools',
        'sidebarReturn': 'Return',
        'sidebarHelp': 'Help',
        'sidebarHistory': 'History',
        'sidebarExit': 'Exit',
        'sidebarSettings': 'Settings',
        'headerTitle': 'Return History',
        'btnMeuHistorico': 'My History',
        'btnTodos': 'All',
        'cardUsuario': 'User:',
        'cardData': 'Return Date:',
        'cardObs': 'Observations:',
        'cardNenhumaObs': '-',
        'msgNenhumHistorico': 'No return history found.',
        'msgErroHistorico': 'Error loading history.',
        'settingsPopupTitle': 'Settings',
        'themeLabel': 'Toggle Theme:',
        'themeStatusLight': 'Light Theme',
        'themeStatusDark': 'Dark Theme',
        'langLabel': 'Toggle Language:',
        'langStatusPT': 'Portuguese',
        'langStatusEN': 'English',
        'welcomeMessage': 'Hello,'
    }
};

// --- FUNÇÕES DE LÓGICA DE TEMA E IDIOMA ---
// (Copie EXATAMENTE as mesmas funções do JS/Ferramenta.js ou JS/Devolver.js)
const updateTranslations = (lang) => {
    const currentLang = translations[lang] ? lang : 'pt';
    const trans = translations[currentLang];
    if (!trans) return console.error("Traduções não encontradas:", currentLang);

    document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';
    document.title = trans.pageTitle || 'Histórico - ControlTech';

    const setText = (id, key) => {
        const element = document.getElementById(id);
        if (element) element.textContent = trans[key] || '';
        else console.warn(`Elemento ID '${id}' não encontrado.`);
    };
    const setSpanText = (id, key) => {
        const element = document.getElementById(id)?.querySelector('span');
        if (element) element.textContent = trans[key] || '';
        else console.warn(`Span dentro do ID '${id}' não encontrado.`);
    };

    // Barra lateral
    setSpanText('nav-tools', 'sidebarTools');
    setSpanText('nav-return', 'sidebarReturn');
    setSpanText('nav-help', 'sidebarHelp');
    setSpanText('nav-history', 'sidebarHistory');
    setSpanText('nav-exit', 'sidebarExit');
    setSpanText('settings-btn', 'sidebarSettings');

    // Conteúdo Principal
    setText('header-title', 'headerTitle');
    setText('btnUsuario', 'btnMeuHistorico');
    setText('btnTodos', 'btnTodos');

    // Popup Configurações
    setText('settings-popup-title', 'settingsPopupTitle');
    setText('theme-label', 'themeLabel');
    setText('lang-label', 'langLabel');

    // Atualiza textos de status
    updateThemeStatusText(document.body.classList.contains('dark-theme') ? 'dark' : 'light', currentLang);
    updateLanguageStatusText(currentLang);
    displayUserName(currentLang);

    // Recarrega histórico para traduzir cards e mensagens
    const activeButton = document.querySelector('.select-btn.active') || document.getElementById('btnTodos');
    if (activeButton && typeof carregarHistorico === 'function') {
        const usuario = getUsuarioLogado();
        if (activeButton.id === 'btnUsuario' && usuario) {
            carregarHistorico(usuario.id);
        } else {
            carregarHistorico(); // Carrega 'todos'
        }
    } else {
        // Carrega 'todos' como fallback inicial se botão ativo não for encontrado
        if (typeof carregarHistorico === 'function') carregarHistorico();
    }
};
const saveTheme = (theme) => { localStorage.setItem('theme', theme); const cl = localStorage.getItem('lang') || 'pt'; updateThemeStatusText(theme, cl); updateThemeToggleButtonVisuals(theme); };
const loadTheme = () => { const st = localStorage.getItem('theme') || 'light'; const cl = localStorage.getItem('lang') || 'pt'; document.body.classList.toggle('dark-theme', st === 'dark'); updateThemeStatusText(st, cl); updateThemeToggleButtonVisuals(st); };
const updateThemeStatusText = (at, l) => { const ts = document.getElementById('theme-status'); const tr = translations[l]; if (ts && tr) ts.textContent = at === 'dark' ? (tr.themeStatusDark || 'Escuro') : (tr.themeStatusLight || 'Claro'); };
const updateThemeToggleButtonVisuals = (at) => { const si = document.querySelector('#theme-toggle-btn .fa-sun'); const mi = document.querySelector('#theme-toggle-btn .fa-moon'); if (si && mi) { si.style.opacity = at === 'dark' ? '0' : '1'; si.style.transform = at === 'dark' ? 'translateY(-10px)' : 'translateY(0)'; mi.style.opacity = at === 'dark' ? '1' : '0'; mi.style.transform = at === 'dark' ? 'translateY(0)' : 'translateY(10px)'; }};
const saveLanguage = (lang) => { localStorage.setItem('lang', lang); updateTranslations(lang); };
const loadLanguage = () => { const sl = localStorage.getItem('lang') || 'pt'; updateTranslations(sl); };
const updateLanguageStatusText = (al) => { const lts = document.getElementById('lang-toggle-btn')?.querySelector('span'); const ls = document.getElementById('lang-status'); if (lts) lts.textContent = al.toUpperCase(); if (ls) { const tp = translations.pt; const te = translations.en; if (tp && te) ls.textContent = al === 'pt' ? (tp.langStatusPT || 'PT') : (te.langStatusEN || 'EN'); }};
function displayUserName(lang) { const wm = document.getElementById('welcome-message'); const une = document.getElementById('user-name'); const tr = translations[lang]; let ui = null; try { const su = localStorage.getItem('usuarioLogado'); if (su) ui = JSON.parse(su); } catch (e) { console.error(e); } if (wm && une && tr) { const du = (lang === 'pt' ? 'Usuário' : 'User'); wm.textContent = tr.welcomeMessage || '?'; une.textContent = (ui && ui.nome) ? ui.nome : du; }};

// --- LÓGICA ORIGINAL DA PÁGINA (PRESERVADA E INTEGRADA) ---

const BASE_URL = "http://localhost:8080/api/historico"; // URL base da API de histórico

// Função original para carregar histórico (atualizada para traduções)
function carregarHistorico(usuarioId = null) {
  const url = usuarioId ? `${BASE_URL}/usuario/${usuarioId}` : `${BASE_URL}/todos`;
  const currentLang = localStorage.getItem('lang') || 'pt';
  const trans = translations[currentLang];
  const historicoContainer = document.getElementById("historicoContainer");

  if (!historicoContainer || !trans) return console.error("Container de histórico ou traduções não encontrados.");

  // Limpa container e mostra mensagem de carregamento (opcional)
  historicoContainer.innerHTML = `<p>${currentLang === 'pt' ? 'Carregando histórico...' : 'Loading history...'}</p>`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then(historicos => {
      historicoContainer.innerHTML = ""; // Limpa mensagem de carregamento

      if (!historicos || !Array.isArray(historicos) || historicos.length === 0) {
        historicoContainer.innerHTML = `<p class="lista-vazia">${trans.msgNenhumHistorico}</p>`;
        return;
      }

      historicos.forEach(h => {
        const card = document.createElement("div");
        card.classList.add("historico-card");

        // Formata data/hora (API retorna LocalDateTime)
        let dataFormatada = 'N/A';
        let horaFormatada = '';
        if (h.dataDevolucao) {
            try {
                // Tenta parsear como LocalDateTime (formato ISO como '2023-10-23T14:30:00')
                const data = new Date(h.dataDevolucao);
                 if (!isNaN(data)) { // Verifica se a data é válida
                    dataFormatada = data.toLocaleDateString(currentLang === 'pt' ? 'pt-BR' : 'en-US');
                    horaFormatada = data.toLocaleTimeString(currentLang === 'pt' ? 'pt-BR' : 'en-US', { hour: '2-digit', minute: '2-digit' });
                 }
            } catch (e) {
                 console.error("Erro ao formatar data de devolução:", h.dataDevolucao, e);
            }
        }

        // Cria HTML do card com traduções
        card.innerHTML = `
          <h3>${h.nomeFerramenta || (currentLang === 'pt' ? 'Ferramenta?' : 'Tool?')}</h3>
          <p><strong>${trans.cardUsuario}</strong> ${h.nomeUsuario || (currentLang === 'pt' ? 'Usuário?' : 'User?')}</p>
          <p><strong>${trans.cardData}</strong> ${dataFormatada} ${horaFormatada ? (currentLang === 'pt' ? 'às' : 'at') + ' ' + horaFormatada : ''}</p>
          <p class="observacoes"><strong>${trans.cardObs}</strong> ${h.observacoes || trans.cardNenhumaObs}</p>
        `;

        historicoContainer.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Erro ao carregar histórico:", err);
      historicoContainer.innerHTML = `<p class="mensagem msg-error">${trans.msgErroHistorico}</p>`;
    });
}

// Função original para pegar usuário logado
function getUsuarioLogado() {
    try {
        const usuario = localStorage.getItem("usuarioLogado");
        return usuario ? JSON.parse(usuario) : null;
    } catch(e) {
        console.error("Erro ao parsear usuarioLogado:", e);
        return null;
    }
}

// --- INICIALIZAÇÃO E EVENT LISTENERS ---
document.addEventListener("DOMContentLoaded", () => {
    // Referências
    const usuario = getUsuarioLogado();
    const btnUsuario = document.getElementById("btnUsuario");
    const btnTodos = document.getElementById("btnTodos");
    const hamburgerBtn = document.getElementById("hamburger-btn"); // ID corrigido
    const sidebar = document.getElementById("sidebar");
    const settingsBtn = document.getElementById('settings-btn');
    const themePopup = document.getElementById('theme-popup');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const langToggleBtn = document.getElementById('lang-toggle-btn');

    // Inicializa Tema e Idioma
    loadTheme();
    // loadLanguage será chamado DEPOIS de definir listeners de histórico

    // Função para marcar botão ativo
    function setActiveButton(activeBtn) {
        [btnUsuario, btnTodos].forEach(btn => btn?.classList.remove("active"));
        activeBtn?.classList.add("active");
    }

    // Listener Botão "Meu Histórico"
    if (usuario && btnUsuario) {
        btnUsuario.addEventListener("click", () => {
            carregarHistorico(usuario.id);
            setActiveButton(btnUsuario);
        });
    } else if (btnUsuario) {
        // Desabilita se não logado
        btnUsuario.disabled = true;
        btnUsuario.style.opacity = 0.5;
        btnUsuario.style.cursor = "not-allowed";
    }

    // Listener Botão "Todos"
    if (btnTodos) {
        btnTodos.addEventListener("click", () => {
            carregarHistorico(); // Sem ID para carregar todos
            setActiveButton(btnTodos);
        });
    }

    // Carregamento inicial (prioriza 'Meu Histórico' se logado)
    if (usuario && btnUsuario) {
        carregarHistorico(usuario.id);
        setActiveButton(btnUsuario);
    } else if (btnTodos) {
        carregarHistorico();
        setActiveButton(btnTodos);
    } else {
        // Fallback se nenhum botão for encontrado
         carregarHistorico();
    }

    // Chama loadLanguage AGORA, após definir listeners de histórico
    loadLanguage();

    // Listener Hamburger
    hamburgerBtn?.addEventListener("click", () => sidebar?.classList.toggle("active"));

    // Listeners Popup Configurações
    settingsBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        themePopup?.classList.toggle('visible');
        themePopup?.classList.toggle('hidden', !themePopup.classList.contains('visible'));
    });
    closePopupBtn?.addEventListener('click', () => {
        themePopup?.classList.remove('visible');
        themePopup?.classList.add('hidden');
    });
    themeToggleBtn?.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-theme');
        saveTheme(isDark ? 'light' : 'dark');
        document.body.classList.toggle('dark-theme');
    });
    langToggleBtn?.addEventListener('click', () => {
        const currentLang = localStorage.getItem('lang') || 'pt';
        saveLanguage(currentLang === 'pt' ? 'en' : 'pt'); // Salva e atualiza UI (recarrega histórico)
    });

}); // Fim do DOMContentLoaded
