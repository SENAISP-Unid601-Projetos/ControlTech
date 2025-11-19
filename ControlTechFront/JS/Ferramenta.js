// JS/Ferramenta.js (Integrando lógica de FerramentaUni.js)

// Dicionário de traduções (Chaves de tradução da Landing Page incluídas para consistência)
// @ts-ignore
const translations = {
    'pt': {
        'pageTitle': 'Ferramentas - SENAI ControlTech',
        'sidebarTools': 'Ferramentas',
        'sidebarReturn': 'Devolver',
        'sidebarHelp': 'Ajuda',
        'sidebarHistory': 'Histórico',
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
        'pageTitle': 'Tools - SENAI ControlTech',
        'sidebarTools': 'Tools',
        'sidebarReturn': 'Return',
        'sidebarHelp': 'Help',
        'sidebarHistory': 'History',
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

// --- FUNÇÕES DE LÓGICA DE TEMA E IDIOMA ---

// @ts-ignore
const setText = (id, key, trans) => { 
    const element = document.getElementById(id); 
    if (element) element.textContent = trans[key] || ''; 
    else console.warn(`Elemento ID '${id}' não encontrado.`); 
};
// @ts-ignore
const setPlaceholder = (id, key, trans) => { 
    const element = document.getElementById(id); 
    // @ts-ignore
    if (element) element.placeholder = trans[key] || ''; 
    else console.warn(`Elemento ID '${id}' para placeholder não encontrado.`); 
};
// @ts-ignore
const setSpanText = (id, key, trans) => { 
    const element = document.getElementById(id)?.querySelector('span'); 
    if (element) element.textContent = trans[key] || ''; 
    else console.warn(`Span dentro do ID '${id}' não encontrado.`); 
};

// Função principal de atualização de textos
// @ts-ignore
const updateTranslations = (lang) => { 
    // @ts-ignore
    const currentLang = translations[lang] ? lang : 'pt'; 
    // @ts-ignore
    const trans = translations[currentLang]; 
    if (!trans) return console.error("Traduções não encontradas para:", currentLang); 
    document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en'; 
    document.title = trans.pageTitle || 'Ferramentas - SENAI ControlTech'; 
    
    // Atualiza links da sidebar
    setSpanText('nav-tools', 'sidebarTools', trans); 
    setSpanText('nav-return', 'sidebarReturn', trans); 
    setSpanText('nav-help', 'sidebarHelp', trans); 
    setSpanText('nav-history', 'sidebarHistory', trans); 
    setSpanText('nav-exit', 'sidebarExit', trans); 
    setSpanText('settings-btn', 'sidebarSettings', trans); 
    
    // Atualiza cabeçalho e pesquisa
    setText('header-title', 'headerTitle', trans); 
    setPlaceholder('search-input', 'searchInputPlaceholder', trans); 
    
    // Atualiza pop-up de configurações
    setText('settings-popup-title', 'settingsPopupTitle', trans); 
    setText('theme-label', 'themeLabel', trans); 
    setText('lang-label', 'langLabel', trans); 
    
    // Atualiza estados
    updateThemeStatusText(document.body.classList.contains('dark-theme') ? 'dark' : 'light', currentLang); 
    updateLanguageStatusText(currentLang); 
    displayUserName(currentLang); 
    
    // Atualiza botões de filtro (Se existirem)
    // Se o HTML não tiver esses IDs, essa linha vai gerar console.warn mas não quebrará.
    setText('filter-all', 'filterAll', trans); 
    setText('filter-available', 'filterAvailable', trans);
    setText('filter-loaned', 'filterLoaned', trans);
    
    // @ts-ignore
    if (typeof renderizarFerramentas === 'function') { 
        // Re-renderiza para atualizar o texto de status
        // @ts-ignore
        renderizarFerramentas(); 
    } 
};

// Lógica de Tema
// @ts-ignore
const saveTheme = (theme) => { 
    localStorage.setItem('theme', theme); 
    const currentLang = localStorage.getItem('lang') || 'pt'; 
    updateThemeStatusText(theme, currentLang); 
    updateThemeToggleButtonVisuals(theme); 
};
const loadTheme = () => { 
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Padrão Dark
    const currentLang = localStorage.getItem('lang') || 'pt'; 
    document.body.classList.toggle('dark-theme', savedTheme === 'dark'); 
    updateThemeStatusText(savedTheme, currentLang); 
    updateThemeToggleButtonVisuals(savedTheme); 
};
// @ts-ignore
const updateThemeStatusText = (activeTheme, lang) => { 
    const themeStatusEl = document.getElementById('theme-status'); 
    // @ts-ignore
    const trans = translations[lang] || translations.pt; 
    if (themeStatusEl && trans) { 
        themeStatusEl.textContent = activeTheme === 'dark' ? (trans.themeStatusDark || 'Tema Escuro') : (trans.themeStatusLight || 'Tema Claro'); 
    }
};
// @ts-ignore
const updateThemeToggleButtonVisuals = (activeTheme) => { 
    const sunIcon = document.querySelector('#theme-toggle-btn .fa-sun'); 
    const moonIcon = document.querySelector('#theme-toggle-btn .fa-moon'); 
    if (sunIcon && moonIcon) { 
        // @ts-ignore
        sunIcon.style.opacity = activeTheme === 'dark' ? '0' : '1'; 
        // @ts-ignore
        sunIcon.style.transform = activeTheme === 'dark' ? 'translateY(-10px)' : 'translateY(0)'; 
        // @ts-ignore
        moonIcon.style.opacity = activeTheme === 'dark' ? '1' : '0'; 
        // @ts-ignore
        moonIcon.style.transform = activeTheme === 'dark' ? 'translateY(0)' : 'translateY(10px)'; 
    }
};

// Lógica de Idioma
// @ts-ignore
const saveLanguage = (lang) => { 
    localStorage.setItem('lang', lang); 
    updateTranslations(lang); 
};
const loadLanguage = () => { 
    const savedLang = localStorage.getItem('lang') || 'pt'; 
    updateTranslations(savedLang); 
};
// @ts-ignore
const updateLanguageStatusText = (activeLang) => { 
    const langToggleBtnSpan = document.getElementById('lang-toggle-btn')?.querySelector('span'); 
    const langStatusEl = document.getElementById('lang-status'); 
    // @ts-ignore
    const trans = translations[activeLang] || translations.pt;
    if (langToggleBtnSpan) langToggleBtnSpan.textContent = activeLang.toUpperCase(); 
    if (langStatusEl) { 
        langStatusEl.textContent = activeLang === 'pt' 
            ? (trans.langStatusPT || 'Português') 
            : (trans.langStatusEN || 'English'); 
    }
};

// Lógica de Nome de Usuário (CHAVE: 'usuarioLogado')
// @ts-ignore
function displayUserName(lang) { 
    const welcomeMessage = document.getElementById('welcome-message'); 
    const userNameElement = document.getElementById('user-name'); 
    // @ts-ignore
    const trans = translations[lang] || translations.pt;
    let userInfo = null; 
    try { 
        const storedUser = localStorage.getItem('usuarioLogado'); 
        if (storedUser) userInfo = JSON.parse(storedUser); 
    } catch (e) { 
        console.error("Erro ao ler usuarioLogado:", e); 
    } 
    if (welcomeMessage && userNameElement && trans) { 
        const defaultUserName = (lang === 'pt' ? 'Usuário' : 'User');
        const nomeCompleto = (userInfo && userInfo.nome) ? userInfo.nome : defaultUserName;
        const firstName = nomeCompleto.split(' ')[0]; // Pega o primeiro nome
        
        welcomeMessage.textContent = trans.welcomeMessage || (lang === 'pt' ? 'Olá,' : 'Hello,'); 
        userNameElement.textContent = firstName; 
    }
};

// --- LÓGICA PRINCIPAL DA PÁGINA E API ---

// @ts-ignore
let ferramentas = [];
// @ts-ignore
let ferramentasFiltradas = [];

// Função de utilidade para formatar o LocalDateTime recebido do backend
// @ts-ignore
function formatarDataAssociacao(localDateTimeStr, lang) {
    // @ts-ignore
    const trans = translations[lang] || translations.pt;
    if (!localDateTimeStr) {
        return trans.dataNaoDisponivel || 'Data não disponível';
    }
    try {
        const date = new Date(localDateTimeStr);
        // @ts-ignore
        if (isNaN(date)) return trans.dataNaoDisponivel || 'Data não disponível';

        const locale = lang === 'pt' ? 'pt-BR' : 'en-US';
        const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

        const datePart = date.toLocaleDateString(locale, dateOptions);
        const timePart = date.toLocaleTimeString(locale, timeOptions);
        
        // Retorna "DD/MM/AAAA às HH:MM:SS" (ou formato EN)
        if (lang === 'pt') {
            return `${datePart} às ${timePart}`;
        } else {
            return `${datePart} at ${timePart}`;
        }
    } catch (e) {
        console.error("Erro ao formatar data:", e);
        return trans.dataNaoDisponivel || 'Data não disponível';
    }
}


// Função para buscar o usuário associado a UMA ferramenta
// @ts-ignore
async function buscarUsuarioDaFerramenta(ferramentaId) {
    try {
        const res = await fetch(`http://localhost:8080/api/ferramentas/${ferramentaId}/usuario`);
        if (!res.ok) {
            console.warn(`Erro ${res.status} ao buscar usuário para ferramenta ${ferramentaId}.`);
            return null;
        }
        const usuarioStatus = await res.json();
        return usuarioStatus;
    } catch (err) {
        console.error(`Falha na requisição ao buscar usuário para ferramenta ${ferramentaId}:`, err);
        return null;
    }
}


async function carregarFerramentas() {
    const grid = document.getElementById("toolGrid");
    const currentLang = localStorage.getItem('lang') || 'pt';
    // @ts-ignore
    const currentTrans = translations[currentLang] || translations.pt;
    try {
        const res = await fetch("http://localhost:8080/api/ferramentas");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        ferramentas = await res.json();
        if (!Array.isArray(ferramentas)) {
            console.warn("API não retornou array:", ferramentas);
            ferramentas = [];
        }
        ferramentasFiltradas = [...ferramentas];
        // @ts-ignore
        renderizarFerramentas(); // Chama renderização
    } catch (err) {
        console.error("Erro ao carregar ferramentas:", err);
        if (grid && currentTrans) grid.innerHTML = `<p>${currentTrans.errorLoadingTools || 'Erro ao carregar ferramentas.'}</p>`;
        else if (grid) grid.innerHTML = `<p>Erro ao carregar ferramentas.</p>`;
    }
}

// ****** FUNÇÃO RENDERIZAR ATUALIZADA ******
// @ts-ignore
window.renderizarFerramentas = async function() { 
    const grid = document.getElementById("toolGrid");
    if (!grid) return console.error("Elemento #toolGrid não encontrado.");
    grid.innerHTML = ""; 

    const currentLang = localStorage.getItem('lang') || 'pt';
    // @ts-ignore
    const trans = translations[currentLang] || translations.pt;
    if (!trans) return console.error("Traduções não encontradas:", currentLang);

    if (ferramentasFiltradas.length === 0) {
        grid.innerHTML = `<p>${trans.noToolsFound || 'Nenhuma ferramenta encontrada.'}</p>`;
        return;
    }

    // Cria as promessas para buscar todos os usuários
    // @ts-ignore
    const cardPromises = ferramentasFiltradas.map(async (f) => {
        const id = f.id;
        const nome = f.nome || (currentLang === 'pt' ? 'Nome Ind.' : 'Name Unav.');
        const imageUrlApi = f.imagemUrl;

        if (id === null || id === undefined) {
            console.warn("Ferramenta sem ID:", f);
            return null; 
        }

        // Busca o usuário associado
        const usuarioInfo = await buscarUsuarioDaFerramenta(id);
        const nomeUsuarioAssociado = usuarioInfo?.nome; 
        const dataAssociacao = usuarioInfo?.dataAssociacao; 

        // Determina o status final e a classe CSS
        const isDisponivel = !nomeUsuarioAssociado; 
        let statusText;
        
        if (isDisponivel) {
            statusText = trans.disponivel;
        } else if (dataAssociacao) {
            // Formata a data e usa a nova chave de tradução
            const dataFormatada = formatarDataAssociacao(dataAssociacao, currentLang);
            statusText = trans.emUsoDesde
                .replace('{nomeUsuario}', nomeUsuarioAssociado)
                .replace('{dataHora}', dataFormatada);
        } else {
            // Fallback: Apenas nome (se a data não vier)
            statusText = `${trans.emUsoPor} ${nomeUsuarioAssociado}`; 
        }
        
        const statusClass = isDisponivel ? 'disponivel' : 'emprestado'; 

        const imageUrl = imageUrlApi || "/img/tools.png";

        // Cria o elemento card 
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

    // Espera todas as Promises terminarem
    const cards = await Promise.all(cardPromises);

    // Adiciona todos os cards válidos (não nulos) ao grid
    cards.forEach(card => {
        if (card) {
            grid.appendChild(card);
        }
    });

} 


// Filtra as ferramentas baseado no input de pesquisa
function filtrarFerramentas() { 
    const searchInput = document.getElementById("search-input"); 
    if (!searchInput) return; 
    // @ts-ignore
    const termo = searchInput.value.trim().toLowerCase(); 
    // @ts-ignore
    ferramentasFiltradas = ferramentas.filter(f => (f.nome || '').toLowerCase().includes(termo)); 
    // @ts-ignore
    renderizarFerramentas(); 
}

// --- LÓGICA DE INTERAÇÃO SIDEBAR E POPUP ---

const closeMenu = () => {
    const sidebar = document.getElementById('sidebar');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    if (window.innerWidth <= 768) { 
        sidebar?.classList.remove('active');
        const icon = hamburgerBtn?.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
};

// --- INICIALIZAÇÃO E EVENT LISTENERS ---
document.addEventListener("DOMContentLoaded", () => { 
    const hamburgerBtn = document.getElementById('hamburger-btn'); 
    const sidebar = document.getElementById('sidebar'); 
    const searchInput = document.getElementById("search-input"); 
    const settingsBtn = document.getElementById('settings-btn'); 
    const themePopup = document.getElementById('theme-popup'); 
    const closePopupBtn = document.getElementById('close-popup-btn'); 
    const themeToggleBtn = document.getElementById('theme-toggle-btn'); 
    const langToggleBtn = document.getElementById('lang-toggle-btn'); 
    
    // Verifica se o usuário está logado
    let usuarioLogado = null; 
    try { 
        const storedUser = localStorage.getItem("usuarioLogado"); 
        if (storedUser) usuarioLogado = JSON.parse(storedUser); 
    } catch (e) { 
        console.error("Erro ao ler usuarioLogado:", e); 
    } 
    // Redireciona se não estiver logado (Comente ou remova esta parte se não tiver página de login)
    if (!usuarioLogado) { 
        alert("Faça login para continuar."); 
        // window.location.href = "/index.html"; 
        // return; 
    } 
    
    loadTheme(); 
    loadLanguage(); 
    carregarFerramentas(); 
    
    // Listeners de Interação
    hamburgerBtn?.addEventListener('click', () => sidebar?.classList.toggle('active')); 
    searchInput?.addEventListener("input", filtrarFerramentas); 
    
    settingsBtn?.addEventListener('click', (e) => { 
        e.preventDefault(); 
        themePopup?.classList.toggle('visible'); 
        themePopup?.classList.toggle('hidden', !themePopup.classList.contains('visible')); 
        closeMenu();
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
    
    // Fechar a sidebar quando um link é clicado (no mobile)
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});