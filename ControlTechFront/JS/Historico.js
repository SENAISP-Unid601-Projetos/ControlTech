import { API_BASE_URL } from './apiConfig.js';

// --- CONFIGURAÇÃO DE TRADUÇÕES ---
const translations = {
    'pt': {
        'pageTitle': 'Histórico - SENAI ControlTech',
        'sidebarAbout': 'Início', 
        'sidebarTools': 'Ferramentas',
        'sidebarReturn': 'Devolver',
        'sidebarHelp': 'Ajuda',
        'sidebarHistory': 'Histórico',
        'sidebarChatBot': 'ChatBot', 
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
        'pageTitle': 'History - SENAI ControlTech',
        'sidebarAbout': 'Home', 
        'sidebarTools': 'Tools',
        'sidebarReturn': 'Return',
        'sidebarHelp': 'Help',
        'sidebarHistory': 'History',
        'sidebarChatBot': 'ChatBot', 
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

// --- FUNÇÕES DE TEMA E IDIOMA ---
const updateTranslations = (lang) => {
    const currentLang = translations[lang] ? lang : 'pt';
    const trans = translations[currentLang];
    
    if (!trans) return;

    document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';
    document.title = trans.pageTitle;

    // Função auxiliar segura para texto
    const setText = (id, key) => { 
        const el = document.getElementById(id); 
        if (el) el.textContent = trans[key] || ''; 
    };
    
    const setSpanText = (id, key) => { 
        const el = document.getElementById(id)?.querySelector('span'); 
        if (el) el.textContent = trans[key] || ''; 
    };

    // Atualiza textos da Sidebar
    setSpanText('nav-tools', 'sidebarTools');
    setSpanText('nav-return', 'sidebarReturn');
    setSpanText('nav-help', 'sidebarHelp');
    setSpanText('nav-history', 'sidebarHistory');
    setSpanText('nav-exit', 'sidebarExit');
    setSpanText('settings-btn', 'sidebarSettings');

    // Atualiza textos da Página
    setText('header-title', 'headerTitle');
    setText('btnUsuario', 'btnMeuHistorico');
    setText('btnTodos', 'btnTodos');
    setText('settings-popup-title', 'settingsPopupTitle');
    setText('theme-label', 'themeLabel');
    setText('lang-label', 'langLabel');

    updateThemeStatusText(document.body.classList.contains('dark-theme') ? 'dark' : 'light', currentLang);
    updateLanguageStatusText(currentLang);
    displayUserName(currentLang);

    // Recarrega o histórico para atualizar textos dos cards (se necessário)
    const activeButton = document.querySelector('.select-btn.active') || document.getElementById('btnTodos');
    if (activeButton) {
        const usuario = getUsuarioLogado();
        if (activeButton.id === 'btnUsuario' && usuario) {
            carregarHistorico(usuario.id);
        } else {
            carregarHistorico(); 
        }
    }
};

const saveTheme = (theme) => { localStorage.setItem('theme', theme); const cl = localStorage.getItem('lang') || 'pt'; updateThemeStatusText(theme, cl); updateThemeToggleButtonVisuals(theme); };
const loadTheme = () => { const st = localStorage.getItem('theme') || 'light'; const cl = localStorage.getItem('lang') || 'pt'; document.body.classList.toggle('dark-theme', st === 'dark'); updateThemeStatusText(st, cl); updateThemeToggleButtonVisuals(st); };
const updateThemeStatusText = (at, l) => { const ts = document.getElementById('theme-status'); const tr = translations[l]; if (ts && tr) ts.textContent = at === 'dark' ? (tr.themeStatusDark || 'Escuro') : (tr.themeStatusLight || 'Claro'); };
const updateThemeToggleButtonVisuals = (at) => { const si = document.querySelector('#theme-toggle-btn .fa-sun'); const mi = document.querySelector('#theme-toggle-btn .fa-moon'); if (si && mi) { si.style.opacity = at === 'dark' ? '0' : '1'; si.style.transform = at === 'dark' ? 'translateY(-10px)' : 'translateY(0)'; mi.style.opacity = at === 'dark' ? '1' : '0'; mi.style.transform = at === 'dark' ? 'translateY(0)' : 'translateY(10px)'; }};
const saveLanguage = (lang) => { localStorage.setItem('lang', lang); updateTranslations(lang); };
const loadLanguage = () => { const sl = localStorage.getItem('lang') || 'pt'; updateTranslations(sl); };
const updateLanguageStatusText = (al) => { const lts = document.getElementById('lang-toggle-btn')?.querySelector('span'); const ls = document.getElementById('lang-status'); if (lts) lts.textContent = al.toUpperCase(); if (ls) { const tp = translations.pt; const te = translations.en; if (tp && te) ls.textContent = al === 'pt' ? (tp.langStatusPT || 'PT') : (te.langStatusEN || 'EN'); }};

function displayUserName(lang) { 
    const welcomeMessage = document.getElementById('welcome-message'); 
    const userNameElement = document.getElementById('user-name'); 
    const trans = translations[lang]; 
    let userInfo = null; 
    try { 
        const storedUser = localStorage.getItem('usuarioLogado'); 
        if (storedUser) userInfo = JSON.parse(storedUser); 
    } catch (e) { 
        console.error("Erro ao ler usuarioLogado:", e); 
    } 
    if (welcomeMessage && userNameElement && trans) { 
        const defaultUserName = (lang === 'pt' ? 'Usuário' : 'User'); 
        welcomeMessage.textContent = trans.welcomeMessage || 'Olá,'; 
        userNameElement.textContent = (userInfo && userInfo.nome) ? userInfo.nome : defaultUserName; 
    }
}

// --- LÓGICA PRINCIPAL CORRIGIDA ---

const BASE_URL = `${API_BASE_URL}/api/historico`; 

function carregarHistorico(usuarioId = null) {
  const url = usuarioId ? `${BASE_URL}/usuario/${usuarioId}` : `${BASE_URL}/todos`;
  
  const currentLang = localStorage.getItem('lang') || 'pt';
  const trans = translations[currentLang];
  const historicoContainer = document.getElementById("historicoContainer");

  if (!historicoContainer) return;

  historicoContainer.innerHTML = `<p>${currentLang === 'pt' ? 'Carregando histórico...' : 'Loading history...'}</p>`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then(historicos => {
      historicoContainer.innerHTML = ""; 

      if (!historicos || !Array.isArray(historicos) || historicos.length === 0) {
        historicoContainer.innerHTML = `<p class="lista-vazia">${trans.msgNenhumHistorico}</p>`;
        return;
      }

      historicos.forEach(h => {
        const card = document.createElement("div");
        card.classList.add("historico-card");

        let dataFormatada = 'N/A';
        let horaFormatada = '';
        
        // CORREÇÃO: Trata a data se for recebida como array [ano, mes, dia, hora, minuto, segundo, nanosec]
        if (h.dataDevolucao) {
            let data;
            
            if (Array.isArray(h.dataDevolucao) && h.dataDevolucao.length >= 6) {
                // Formato Java: [ano, mes(1-12), dia, hora, minuto, segundo, nanosec]
                const [year, month, day, hour, minute, second] = h.dataDevolucao;
                
                // Construtor JS Date: new Date(year, monthIndex(0-11), day, hour, minute, second, millisec)
                // Usa Date.UTC() e subtrai 1 do mês para garantir UTC
                data = new Date(Date.UTC(year, month - 1, day, hour, minute, second, 0));
            } else {
                // Fallback para strings ISO (ex: "2023-10-27T...")
                data = new Date(h.dataDevolucao);
            }

            if (data && !isNaN(data.getTime())) {
                 dataFormatada = data.toLocaleDateString(currentLang === 'pt' ? 'pt-BR' : 'en-US');
                 horaFormatada = data.toLocaleTimeString(currentLang === 'pt' ? 'pt-BR' : 'en-US', { hour: '2-digit', minute: '2-digit' });
            }
        }

        card.innerHTML = `
          <h3>${h.nomeFerramenta || (currentLang === 'pt' ? 'Ferramenta Desconhecida' : 'Unknown Tool')}</h3>
          <p><strong>${trans.cardUsuario}</strong> ${h.nomeUsuario || (currentLang === 'pt' ? 'Usuário Desconhecido' : 'Unknown User')}</p>
          <p><strong>${trans.cardData}</strong> ${dataFormatada} ${horaFormatada ? (currentLang === 'pt' ? 'às' : 'at') + ' ' + horaFormatada : ''}</p>
          <p class="observacoes"><strong>${trans.cardObs}</strong> ${h.observacoes || trans.cardNenhumaObs}</p>
        `;
        historicoContainer.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Erro ao carregar:", err);
      historicoContainer.innerHTML = `<p class="mensagem msg-error">${trans.msgErroHistorico}</p>`;
    });
}

function getUsuarioLogado() {
    try {
        const usuario = localStorage.getItem("usuarioLogado");
        return usuario ? JSON.parse(usuario) : null;
    } catch(e) {
        return null;
    }
}

// INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", () => {
    const usuario = getUsuarioLogado();
    const btnUsuario = document.getElementById("btnUsuario");
    const btnTodos = document.getElementById("btnTodos");
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const sidebar = document.getElementById("sidebar");
    const settingsBtn = document.getElementById('settings-btn');
    const themePopup = document.getElementById('theme-popup');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const langToggleBtn = document.getElementById('lang-toggle-btn');

    loadTheme();

    function setActiveButton(activeBtn) {
        if(btnUsuario) btnUsuario.classList.remove("active");
        if(btnTodos) btnTodos.classList.remove("active");
        activeBtn?.classList.add("active");
    }

    if (usuario && btnUsuario) {
        btnUsuario.addEventListener("click", () => {
            carregarHistorico(usuario.id);
            setActiveButton(btnUsuario);
        });
    } else if (btnUsuario) {
        btnUsuario.disabled = true;
        btnUsuario.style.opacity = "0.5";
        btnUsuario.style.cursor = "not-allowed";
        btnUsuario.title = "Faça login para ver seu histórico";
    }

    if (btnTodos) {
        btnTodos.addEventListener("click", () => {
            carregarHistorico(); 
            setActiveButton(btnTodos);
        });
    }

    // Define botão ativo inicial (mas não chama carregarHistorico, pois loadLanguage vai chamar)
    if (btnTodos) {
        setActiveButton(btnTodos);
    } else if (usuario && btnUsuario) {
        setActiveButton(btnUsuario);
    }

    // loadLanguage chama updateTranslations, que detecta o botão ativo e chama carregarHistorico
    loadLanguage();

    // Listeners da UI
    hamburgerBtn?.addEventListener("click", () => sidebar?.classList.toggle("active"));

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
        saveLanguage(currentLang === 'pt' ? 'en' : 'pt');
    });
});