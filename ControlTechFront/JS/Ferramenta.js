import { API_BASE_URL } from './apiConfig.js';

const translations = {
    'pt': {
        'pageTitle': 'Ajuda - SENAI ControlTech',
        'sidebarAbout': 'Início', 
        'sidebarTools': 'Ferramentas',
        'sidebarReturn': 'Devolver',
        'sidebarHelp': 'Ajuda',
        'sidebarHistory': 'Histórico',
        'sidebarChatBot': 'ChatBot', 
        'sidebarExit': 'Sair',
        'sidebarSettings': 'Configurações',
        'headerTitle': 'Selecione seu Componente',
        'searchInputPlaceholder': 'Pesquisar ferramentas...',
        'selectButton': 'Selecionar',
        'disponivel': 'Disponível',
        'emprestado': 'Emprestado', 
        'emUsoPor': 'Em uso por:',   
        'emUsoDesde': 'Em uso por: {nomeUsuario} (desde {dataHora})',
        'dataNaoDisponivel': 'Data não disponível',
        'noToolsFound': 'Nenhuma ferramenta encontrada.',
        'errorLoadingTools': 'Erro ao carregar ferramentas.',
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
        'pageTitle': 'Help - SENAI ControlTech',
        'sidebarAbout': 'Home', 
        'sidebarTools': 'Tools',
        'sidebarReturn': 'Return',
        'sidebarHelp': 'Help',
        'sidebarHistory': 'History',
        'sidebarChatBot': 'ChatBot', 
        'sidebarExit': 'Exit',
        'sidebarSettings': 'Settings',
        'headerTitle': 'Select Your Component',
        'searchInputPlaceholder': 'Search tools...',
        'selectButton': 'Select',
        'disponivel': 'Available',
        'emprestado': 'Loaned', 
        'emUsoPor': 'In use by:',   
        'emUsoDesde': 'In use by: {nomeUsuario} (since {dataHora})',
        'dataNaoDisponivel': 'Date unavailable',
        'noToolsFound': 'No tools found.',
        'errorLoadingTools': 'Error loading tools.',
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

const setText = (id, key, trans) => { const element = document.getElementById(id); if (element) element.textContent = trans[key] || ''; else console.warn(`Elemento ID '${id}' não encontrado.`); };
const setPlaceholder = (id, key, trans) => { const element = document.getElementById(id); if (element) element.placeholder = trans[key] || ''; else console.warn(`Elemento ID '${id}' para placeholder não encontrado.`); };
const setSpanText = (id, key, trans) => { const element = document.getElementById(id)?.querySelector('span'); if (element) element.textContent = trans[key] || ''; else console.warn(`Span dentro do ID '${id}' não encontrado.`); };

const updateTranslations = (lang) => { 
    const currentLang = translations[lang] ? lang : 'pt'; 
    const trans = translations[currentLang]; 
    if (!trans) return console.error("Traduções não encontradas para:", currentLang); 
    document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en'; 
    document.title = trans.pageTitle || 'Ferramentas - SENAI ControlTech'; 
    
    setSpanText('nav-tools', 'sidebarTools', trans); 
    setSpanText('nav-return', 'sidebarReturn', trans); 
    setSpanText('nav-help', 'sidebarHelp', trans); 
    setSpanText('nav-history', 'sidebarHistory', trans); 
    setSpanText('nav-exit', 'sidebarExit', trans); 
    setSpanText('settings-btn', 'sidebarSettings', trans); 
    setText('header-title', 'headerTitle', trans); 
    setPlaceholder('search-input', 'searchInputPlaceholder', trans); 
    setText('settings-popup-title', 'settingsPopupTitle', trans); 
    setText('theme-label', 'themeLabel', trans); 
    setText('lang-label', 'langLabel', trans); 
    updateThemeStatusText(document.body.classList.contains('dark-theme') ? 'dark' : 'light', currentLang); 
    updateLanguageStatusText(currentLang); 
    displayUserName(currentLang); 
    
    // Estas chaves parecem não existir no HTML/CSS, mantendo por segurança
    setText('filter-all', 'filterAll', trans);
    setText('filter-available', 'filterAvailable', trans);
    setText('filter-loaned', 'filterLoaned', trans);
    
    // Renderiza novamente após mudar o idioma para atualizar textos nos cards
    if (typeof renderizarFerramentas === 'function') { 
        renderizarFerramentas(); 
    } 
};
const saveTheme = (theme) => { localStorage.setItem('theme', theme); const currentLang = localStorage.getItem('lang') || 'pt'; updateThemeStatusText(theme, currentLang); updateThemeToggleButtonVisuals(theme); };
const loadTheme = () => { const savedTheme = localStorage.getItem('theme') || 'light'; const currentLang = localStorage.getItem('lang') || 'pt'; document.body.classList.toggle('dark-theme', savedTheme === 'dark'); updateThemeStatusText(savedTheme, currentLang); updateThemeToggleButtonVisuals(savedTheme); };
const updateThemeStatusText = (activeTheme, lang) => { const themeStatusEl = document.getElementById('theme-status'); const trans = translations[lang]; if (themeStatusEl && trans) { themeStatusEl.textContent = activeTheme === 'dark' ? (trans.themeStatusDark || 'Tema Escuro') : (trans.themeStatusLight || 'Tema Claro'); }};
const updateThemeToggleButtonVisuals = (activeTheme) => { const sunIcon = document.querySelector('#theme-toggle-btn .fa-sun'); const moonIcon = document.querySelector('#theme-toggle-btn .fa-moon'); if (sunIcon && moonIcon) { sunIcon.style.opacity = activeTheme === 'dark' ? '0' : '1'; sunIcon.style.transform = activeTheme === 'dark' ? 'translateY(-10px)' : 'translateY(0)'; moonIcon.style.opacity = activeTheme === 'dark' ? '1' : '0'; moonIcon.style.transform = activeTheme === 'dark' ? 'translateY(0)' : 'translateY(10px)'; }};
const saveLanguage = (lang) => { localStorage.setItem('lang', lang); updateTranslations(lang); };
const loadLanguage = () => { const savedLang = localStorage.getItem('lang') || 'pt'; updateTranslations(savedLang); };
const updateLanguageStatusText = (activeLang) => { const langToggleBtnSpan = document.getElementById('lang-toggle-btn')?.querySelector('span'); const langStatusEl = document.getElementById('lang-status'); if (langToggleBtnSpan) langToggleBtnSpan.textContent = activeLang.toUpperCase(); if (langStatusEl) { const transPt = translations.pt; const transEn = translations.en; if (transPt && transEn) { langStatusEl.textContent = activeLang === 'pt' ? (transPt.langStatusPT || 'Português') : (transEn.langStatusEN || 'English'); }}};
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
        welcomeMessage.textContent = trans.welcomeMessage || (lang === 'pt' ? 'Olá,' : 'Hello,'); 
        // CORREÇÃO: Garante que pega o nome corretamente
        userNameElement.textContent = (userInfo && userInfo.nome) ? userInfo.nome : defaultUserName; 
    }
};

let ferramentas = [];
let ferramentasFiltradas = [];
// Variável de controle para prevenir a condição de corrida
let currentRenderToken = 0; 

function formatarDataAssociacao(localDateTimeStr, lang) {
    const trans = translations[lang];
    if (!localDateTimeStr) return trans.dataNaoDisponivel || 'Data não disponível';
    try {
        const date = new Date(localDateTimeStr);
        if (isNaN(date)) return trans.dataNaoDisponivel || 'Data não disponível';
        const locale = lang === 'pt' ? 'pt-BR' : 'en-US';
        const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const datePart = date.toLocaleDateString(locale, dateOptions);
        const timePart = date.toLocaleTimeString(locale, timeOptions);
        return lang === 'pt' ? `${datePart} às ${timePart}` : `${datePart} at ${timePart}`;
    } catch (e) { return trans.dataNaoDisponivel || 'Data não disponível'; }
}

async function buscarUsuarioDaFerramenta(ferramentaId) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/ferramentas/${ferramentaId}/usuario`);
        if (!res.ok) return null;
        return await res.json();
    } catch (err) { return null; }
}

async function carregarFerramentas() {
    const grid = document.getElementById("toolGrid");
    const currentTrans = translations[localStorage.getItem('lang') || 'pt'];
    try {
        const res = await fetch(`${API_BASE_URL}/api/ferramentas`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        ferramentas = await res.json();
        if (!Array.isArray(ferramentas)) ferramentas = [];
        ferramentasFiltradas = [...ferramentas];
        renderizarFerramentas(); 
    } catch (err) {
        console.error("Erro ao carregar ferramentas:", err);
        if (grid && currentTrans) grid.innerHTML = `<p>${currentTrans.errorLoadingTools || 'Erro.'}</p>`;
    }
}

window.renderizarFerramentas = async function() { 
    const grid = document.getElementById("toolGrid");
    if (!grid) return;
    
    // 1. Gera um novo token para esta requisição
    const renderToken = ++currentRenderToken;
    
    const currentLang = localStorage.getItem('lang') || 'pt';
    const trans = translations[currentLang];
    if (!trans) return;

    // Limpa a tela imediatamente, mas só adiciona os novos itens se esta for a última requisição ativa
    grid.innerHTML = ""; 

    if (ferramentasFiltradas.length === 0) {
        grid.innerHTML = `<p>${trans.noToolsFound}</p>`;
        return;
    }

    const cardPromises = ferramentasFiltradas.map(async (f) => {
        // 2. Verifica se uma nova renderização foi iniciada antes de continuar o processamento do card
        if (renderToken !== currentRenderToken) return null; 
        
        const id = f.id;
        const nome = f.nome || 'Nome Indisponível';
        const imageUrlApi = f.imagemUrl;

        if (id === null || id === undefined) return null; 

        const usuarioInfo = await buscarUsuarioDaFerramenta(id);
        
        // 3. Verifica novamente após a chamada assíncrona
        if (renderToken !== currentRenderToken) return null;

        const nomeUsuarioAssociado = usuarioInfo?.nome; 
        const dataAssociacao = usuarioInfo?.dataAssociacao; 

        const isDisponivel = !nomeUsuarioAssociado; 
        let statusText;
        
        if (isDisponivel) {
            statusText = trans.disponivel;
        } else if (dataAssociacao) {
            const dataFormatada = formatarDataAssociacao(dataAssociacao, currentLang);
            statusText = trans.emUsoDesde.replace('{nomeUsuario}', nomeUsuarioAssociado).replace('{dataHora}', dataFormatada);
        } else {
            statusText = `${trans.emUsoPor} ${nomeUsuarioAssociado}`; 
        }
        
        const statusClass = isDisponivel ? 'disponivel' : 'emprestado'; 
        const imageUrl = imageUrlApi || "/img/tools.png";

        const card = document.createElement("div");
        card.classList.add("tool-card");
        card.setAttribute("data-nome", nome);

        card.innerHTML = `
            <img src="${imageUrl}" alt="${nome}" onerror="this.onerror=null; this.src='/img/tools.png';"/>
            <h3>${nome}</h3>
            <p class="status ${statusClass}">${statusText}</p> 
            <button class="select-btn" ${isDisponivel ? '' : 'disabled'}>
                ${trans.selectButton}
            </button>
        `;

        const selectBtn = card.querySelector(".select-btn");
        if (selectBtn && isDisponivel) { 
            selectBtn.addEventListener("click", () => {
                window.location.href = `FerramentaUni.html?id=${id}`;
            });
        }
        return card; 
    }); 

    const cards = await Promise.all(cardPromises);
    
    // 4. Última verificação antes de anexar ao DOM
    if (renderToken !== currentRenderToken) {
        console.log(`Renderização obsoleta cancelada (Token: ${renderToken}).`);
        return; // Aborta a renderização
    }

    cards.forEach(card => { 
        // Apenas anexa se o card não foi marcado como nulo (cancelado no meio do processamento)
        if (card) grid.appendChild(card); 
    });

    // Se a lista foi filtrada para 0 itens mas o loop de promises rodou,
    // precisamos garantir que a mensagem de 'no tools found' apareça.
    if (grid.children.length === 0 && ferramentasFiltradas.length > 0) {
         // Este caso é improvável após a correção, mas garante um fallback
         grid.innerHTML = `<p>${trans.noToolsFound}</p>`;
    }
} 

function filtrarFerramentas() { 
    const searchInput = document.getElementById("search-input"); 
    if (!searchInput) return; 
    const termo = searchInput.value.trim().toLowerCase(); 
    ferramentasFiltradas = ferramentas.filter(f => (f.nome || '').toLowerCase().includes(termo)); 
    // A função renderizarFerramentas agora lida com o controle de concorrência
    renderizarFerramentas(); 
}

document.addEventListener("DOMContentLoaded", () => { 
    const hamburgerBtn = document.getElementById('hamburger-btn'); 
    const sidebar = document.getElementById('sidebar'); 
    const searchInput = document.getElementById("search-input"); 
    const settingsBtn = document.getElementById('settings-btn'); 
    const themePopup = document.getElementById('theme-popup'); 
    const closePopupBtn = document.getElementById('close-popup-btn'); 
    const themeToggleBtn = document.getElementById('theme-toggle-btn'); 
    const langToggleBtn = document.getElementById('lang-toggle-btn'); 
    let usuarioLogado = null; 
    try { 
        const storedUser = localStorage.getItem("usuarioLogado"); 
        if (storedUser) usuarioLogado = JSON.parse(storedUser); 
    } catch (e) { console.error(e); } 
    if (!usuarioLogado) { 
        alert("Faça login para continuar."); 
        window.location.href = "/index.html"; 
        return; 
    } 
    loadTheme(); 
    loadLanguage(); 
    carregarFerramentas(); 
    
    // CORREÇÃO: Evento hambúrguer garantido
    hamburgerBtn?.addEventListener('click', () => sidebar?.classList.toggle('active')); 
    
    searchInput?.addEventListener("input", filtrarFerramentas); 
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
        const newTheme = isDark ? 'light' : 'dark'; 
        document.body.classList.toggle('dark-theme'); 
        saveTheme(newTheme); 
    }); 
    langToggleBtn?.addEventListener('click', () => { 
        const currentLang = localStorage.getItem('lang') || 'pt'; 
        const newLang = currentLang === 'pt' ? 'en' : 'pt'; 
        saveLanguage(newLang); 
    }); 
});