// JS/Ferramenta.js (Integrando lógica de FerramentaUni.js)

// Dicionário de traduções (Certifique-se que 'emUsoPor' existe)
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
        'emprestado': 'Emprestado', // Fallback
        'emUsoPor': 'Em uso por:',   // Chave para status com nome
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
        'emprestado': 'Loaned', // Fallback
        'emUsoPor': 'In use by:',   // Chave para status com nome
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
// (Estas funções permanecem iguais)
const updateTranslations = (lang) => { /* ... (código igual ao anterior) ... */ const currentLang = translations[lang] ? lang : 'pt'; const trans = translations[currentLang]; if (!trans) return console.error("Traduções não encontradas para:", currentLang); document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en'; document.title = trans.pageTitle || 'Ferramentas - SENAI ControlTech'; const setText = (id, key) => { const element = document.getElementById(id); if (element) element.textContent = trans[key] || ''; else console.warn(`Elemento ID '${id}' não encontrado.`); }; const setPlaceholder = (id, key) => { const element = document.getElementById(id); if (element) element.placeholder = trans[key] || ''; else console.warn(`Elemento ID '${id}' para placeholder não encontrado.`); }; const setSpanText = (id, key) => { const element = document.getElementById(id)?.querySelector('span'); if (element) element.textContent = trans[key] || ''; else console.warn(`Span dentro do ID '${id}' não encontrado.`); }; setSpanText('nav-tools', 'sidebarTools'); setSpanText('nav-return', 'sidebarReturn'); setSpanText('nav-help', 'sidebarHelp'); setSpanText('nav-history', 'sidebarHistory'); setSpanText('nav-exit', 'sidebarExit'); setSpanText('settings-btn', 'sidebarSettings'); setText('header-title', 'headerTitle'); setPlaceholder('search-input', 'searchInputPlaceholder'); setText('settings-popup-title', 'settingsPopupTitle'); setText('theme-label', 'themeLabel'); setText('lang-label', 'langLabel'); updateThemeStatusText(document.body.classList.contains('dark-theme') ? 'dark' : 'light', currentLang); updateLanguageStatusText(currentLang); displayUserName(currentLang); if (typeof renderizarFerramentas === 'function') { renderizarFerramentas(); } };
const saveTheme = (theme) => { /* ... (código igual ao anterior) ... */ localStorage.setItem('theme', theme); const currentLang = localStorage.getItem('lang') || 'pt'; updateThemeStatusText(theme, currentLang); updateThemeToggleButtonVisuals(theme); };
const loadTheme = () => { /* ... (código igual ao anterior) ... */ const savedTheme = localStorage.getItem('theme') || 'light'; const currentLang = localStorage.getItem('lang') || 'pt'; document.body.classList.toggle('dark-theme', savedTheme === 'dark'); updateThemeStatusText(savedTheme, currentLang); updateThemeToggleButtonVisuals(savedTheme); };
const updateThemeStatusText = (activeTheme, lang) => { /* ... (código igual ao anterior) ... */ const themeStatusEl = document.getElementById('theme-status'); const trans = translations[lang]; if (themeStatusEl && trans) { themeStatusEl.textContent = activeTheme === 'dark' ? (trans.themeStatusDark || 'Tema Escuro') : (trans.themeStatusLight || 'Tema Claro'); }};
const updateThemeToggleButtonVisuals = (activeTheme) => { /* ... (código igual ao anterior) ... */ const sunIcon = document.querySelector('#theme-toggle-btn .fa-sun'); const moonIcon = document.querySelector('#theme-toggle-btn .fa-moon'); if (sunIcon && moonIcon) { sunIcon.style.opacity = activeTheme === 'dark' ? '0' : '1'; sunIcon.style.transform = activeTheme === 'dark' ? 'translateY(-10px)' : 'translateY(0)'; moonIcon.style.opacity = activeTheme === 'dark' ? '1' : '0'; moonIcon.style.transform = activeTheme === 'dark' ? 'translateY(0)' : 'translateY(10px)'; }};
const saveLanguage = (lang) => { /* ... (código igual ao anterior) ... */ localStorage.setItem('lang', lang); updateTranslations(lang); };
const loadLanguage = () => { /* ... (código igual ao anterior) ... */ const savedLang = localStorage.getItem('lang') || 'pt'; updateTranslations(savedLang); };
const updateLanguageStatusText = (activeLang) => { /* ... (código igual ao anterior) ... */ const langToggleBtnSpan = document.getElementById('lang-toggle-btn')?.querySelector('span'); const langStatusEl = document.getElementById('lang-status'); if (langToggleBtnSpan) langToggleBtnSpan.textContent = activeLang.toUpperCase(); if (langStatusEl) { const transPt = translations.pt; const transEn = translations.en; if (transPt && transEn) { langStatusEl.textContent = activeLang === 'pt' ? (transPt.langStatusPT || 'Português') : (transEn.langStatusEN || 'English'); }}};
function displayUserName(lang) { /* ... (código igual ao anterior) ... */ const welcomeMessage = document.getElementById('welcome-message'); const userNameElement = document.getElementById('user-name'); const trans = translations[lang]; let userInfo = null; try { const storedUser = localStorage.getItem('usuarioLogado'); if (storedUser) userInfo = JSON.parse(storedUser); } catch (e) { console.error("Erro ao ler usuarioLogado:", e); } if (welcomeMessage && userNameElement && trans) { const defaultUserName = (lang === 'pt' ? 'Usuário' : 'User'); welcomeMessage.textContent = trans.welcomeMessage || (lang === 'pt' ? 'Olá,' : 'Hello,'); userNameElement.textContent = (userInfo && userInfo.nome) ? userInfo.nome : defaultUserName; }};

// --- LÓGICA PRINCIPAL DA PÁGINA ---

let ferramentas = [];
let ferramentasFiltradas = [];

// Função para buscar o usuário associado a UMA ferramenta (similar a FerramentaUni)
async function buscarUsuarioDaFerramenta(ferramentaId) {
    try {
        const res = await fetch(`http://localhost:8080/api/ferramentas/${ferramentaId}/usuario`);
        if (!res.ok) {
            // Se não encontrar (404) ou der outro erro, retorna null
            console.warn(`Erro ${res.status} ao buscar usuário para ferramenta ${ferramentaId}.`);
            return null;
        }
        const usuario = await res.json();
        // Retorna o objeto usuario (pode ter nome null se ninguém estiver usando)
        return usuario;
    } catch (err) {
        console.error(`Falha na requisição ao buscar usuário para ferramenta ${ferramentaId}:`, err);
        return null; // Retorna null em caso de erro de rede
    }
}


async function carregarFerramentas() {
    const grid = document.getElementById("toolGrid");
    const currentLang = localStorage.getItem('lang') || 'pt';
    const currentTrans = translations[currentLang];
    try {
        const res = await fetch("http://localhost:8080/api/ferramentas");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        ferramentas = await res.json();
        if (!Array.isArray(ferramentas)) {
            console.warn("API não retornou array:", ferramentas);
            ferramentas = [];
        }
        ferramentasFiltradas = [...ferramentas];
        renderizarFerramentas(); // Chama renderização
    } catch (err) {
        console.error("Erro ao carregar ferramentas:", err);
        if (grid && currentTrans) grid.innerHTML = `<p>${currentTrans.errorLoadingTools || 'Erro.'}</p>`;
        else if (grid) grid.innerHTML = `<p>Erro ao carregar ferramentas.</p>`;
    }
}

// ****** FUNÇÃO RENDERIZAR ATUALIZADA ******
window.renderizarFerramentas = async function() { // Tornada async para usar await
    const grid = document.getElementById("toolGrid");
    if (!grid) return console.error("Elemento #toolGrid não encontrado.");
    grid.innerHTML = ""; // Limpa antes de renderizar

    const currentLang = localStorage.getItem('lang') || 'pt';
    const trans = translations[currentLang];
    if (!trans) return console.error("Traduções não encontradas:", currentLang);

    if (ferramentasFiltradas.length === 0) {
        grid.innerHTML = `<p>${trans.noToolsFound}</p>`;
        return;
    }

    // Usamos Promise.all para esperar todas as buscas de usuário terminarem
    // antes de adicionar os cards ao DOM, evitando "pulos" de layout.
    const cardPromises = ferramentasFiltradas.map(async (f) => {
        const id = f.id;
        const nome = f.nome || (currentLang === 'pt' ? 'Nome Ind.' : 'Name Unav.');
        // O status inicial da API principal NÃO é mais usado diretamente para texto,
        // mas ainda pode ser usado para a classe CSS inicial.
        const statusApiPrincipal = f.status || 'DISPONIVEL';
        const imageUrlApi = f.imagemUrl;

        if (id === null || id === undefined) {
            console.warn("Ferramenta sem ID:", f);
            return null; // Retorna null para filtrar depois
        }

        // --- Busca o usuário associado ANTES de criar o card ---
        const usuarioInfo = await buscarUsuarioDaFerramenta(id);
        const nomeUsuarioAssociado = usuarioInfo?.nome; // Pega o nome se existir

        // Determina o status final e a classe CSS com base no nome do usuário
        const isDisponivel = !nomeUsuarioAssociado; // Se TEM nome, NÃO está disponível
        const statusText = isDisponivel ? trans.disponivel : `${trans.emUsoPor} ${nomeUsuarioAssociado}`;
        const statusClass = isDisponivel ? 'disponivel' : 'emprestado'; // Classe CSS baseada na disponibilidade real

        const imageUrl = imageUrlApi || "/img/tools.png";

        // Cria o elemento card (mas não adiciona ao grid ainda)
        const card = document.createElement("div");
        card.classList.add("tool-card");
        card.setAttribute("data-nome", nome);

        card.innerHTML = `
            <img src="${imageUrl}" alt="${nome}" onerror="this.onerror=null; this.src='/img/tools.png';"/>
            <h3>${nome}</h3>
            <p class="status ${statusClass}">${statusText}</p> <button class="select-btn" ${isDisponivel ? '' : 'disabled'}>
                ${trans.selectButton}
            </button>
        `;

        const selectBtn = card.querySelector(".select-btn");
        if (selectBtn && isDisponivel) { // Habilita botão só se disponível
            selectBtn.addEventListener("click", () => {
                window.location.href = `FerramentaUni.html?id=${id}`;
            });
        }

        return card; // Retorna o elemento card criado
    }); // Fim do map

    // Espera todas as Promises (buscas de usuário e criação de cards) terminarem
    const cards = await Promise.all(cardPromises);

    // Adiciona todos os cards válidos (não nulos) ao grid
    cards.forEach(card => {
        if (card) {
            grid.appendChild(card);
        }
    });

} // Fim da função renderizarFerramentas


// Filtra as ferramentas baseado no input de pesquisa
function filtrarFerramentas() { /* ... (código igual ao anterior) ... */ const searchInput = document.getElementById("search-input"); if (!searchInput) return; const termo = searchInput.value.trim().toLowerCase(); ferramentasFiltradas = ferramentas.filter(f => (f.nome || '').toLowerCase().includes(termo)); renderizarFerramentas(); }

// --- INICIALIZAÇÃO E EVENT LISTENERS ---
document.addEventListener("DOMContentLoaded", () => { /* ... (código igual ao anterior) ... */ const hamburgerBtn = document.getElementById('hamburger-btn'); const sidebar = document.getElementById('sidebar'); const searchInput = document.getElementById("search-input"); const settingsBtn = document.getElementById('settings-btn'); const themePopup = document.getElementById('theme-popup'); const closePopupBtn = document.getElementById('close-popup-btn'); const themeToggleBtn = document.getElementById('theme-toggle-btn'); const langToggleBtn = document.getElementById('lang-toggle-btn'); let usuarioLogado = null; try { const storedUser = localStorage.getItem("usuarioLogado"); if (storedUser) usuarioLogado = JSON.parse(storedUser); } catch (e) { console.error("Erro ao ler usuarioLogado:", e); } if (!usuarioLogado) { alert("Faça login para continuar."); window.location.href = "/index.html"; return; } loadTheme(); loadLanguage(); carregarFerramentas(); hamburgerBtn?.addEventListener('click', () => sidebar?.classList.toggle('active')); searchInput?.addEventListener("input", filtrarFerramentas); settingsBtn?.addEventListener('click', (e) => { e.preventDefault(); themePopup?.classList.toggle('visible'); themePopup?.classList.toggle('hidden', !themePopup.classList.contains('visible')); }); closePopupBtn?.addEventListener('click', () => { themePopup?.classList.remove('visible'); themePopup?.classList.add('hidden'); }); themeToggleBtn?.addEventListener('click', () => { const isDark = document.body.classList.contains('dark-theme'); const newTheme = isDark ? 'light' : 'dark'; document.body.classList.toggle('dark-theme'); saveTheme(newTheme); }); langToggleBtn?.addEventListener('click', () => { const currentLang = localStorage.getItem('lang') || 'pt'; const newLang = currentLang === 'pt' ? 'en' : 'pt'; saveLanguage(newLang); }); });