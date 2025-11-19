import { API_BASE_URL } from './apiConfig.js';

// ============================================================================
// 1. DICIONÁRIO DE TRADUÇÕES
// ============================================================================
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

// ============================================================================
// 2. UTILITÁRIOS DE TEMA E IDIOMA
// ============================================================================
const setText = (id, key, trans) => { const el = document.getElementById(id); if (el) el.textContent = trans[key] || ''; };
const setPlaceholder = (id, key, trans) => { const el = document.getElementById(id); if (el) el.placeholder = trans[key] || ''; };
const setSpanText = (id, key, trans) => { const el = document.getElementById(id)?.querySelector('span'); if (el) el.textContent = trans[key] || ''; };

const updateTranslations = (lang) => {
    const currentLang = translations[lang] ? lang : 'pt';
    const trans = translations[currentLang];
    if (!trans) return;

    document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';
    
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

    // Re-renderiza ferramentas para atualizar textos dos cards
    if (typeof renderizarFerramentas === 'function') renderizarFerramentas();
};

const saveTheme = (theme) => { localStorage.setItem('theme', theme); loadTheme(); };
const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    const currentLang = localStorage.getItem('lang') || 'pt';
    updateThemeStatusText(savedTheme, currentLang);
};
const updateThemeStatusText = (activeTheme, lang) => {
    const el = document.getElementById('theme-status');
    const trans = translations[lang];
    if (el && trans) el.textContent = activeTheme === 'dark' ? (trans.themeStatusDark || 'Escuro') : (trans.themeStatusLight || 'Claro');
};

const saveLanguage = (lang) => { localStorage.setItem('lang', lang); updateTranslations(lang); };
const loadLanguage = () => { const savedLang = localStorage.getItem('lang') || 'pt'; updateTranslations(savedLang); };
const updateLanguageStatusText = (activeLang) => {
    const el = document.getElementById('lang-status');
    if (el) el.textContent = activeLang === 'pt' ? 'Português' : 'English';
};

// ============================================================================
// 3. GESTÃO DE USUÁRIO (CORRIGIDO PARA FOTO)
// ============================================================================

function carregarDadosUsuario() {
    console.log(">>> Carregando perfil do usuário...");
    
    const usuarioJson = localStorage.getItem("usuarioLogado");
    if (!usuarioJson) {
        window.location.href = '/index.html'; // Redireciona se não estiver logado
        return;
    }

    let usuario;
    try {
        usuario = JSON.parse(usuarioJson);
    } catch (e) {
        console.error("JSON inválido:", e);
        return;
    }

    // 1. Preenche Nome e Perfil
    const elNome = document.getElementById('nomeUsuarioDisplay');
    const elPerfil = document.getElementById('perfilUsuarioDisplay');

    if (elNome) elNome.textContent = usuario.nome || "Usuário";
    if (elPerfil) elPerfil.textContent = usuario.perfil || "Visitante";

    // 2. Lógica da Foto
    const imgPerfil = document.getElementById('fotoPerfilUsuario');
    const iconePadrao = document.getElementById('iconePadraoUsuario');

    if (!imgPerfil || !iconePadrao) return console.warn("Elementos de foto não encontrados no HTML.");

    if (usuario.fotoUrl) {
        // Monta a URL: Backend (8080) + Caminho da Foto
        const urlCompleta = `${API_BASE_URL}${usuario.fotoUrl}`;
        console.log("Tentando carregar foto:", urlCompleta);
        
        imgPerfil.src = urlCompleta;
        
        imgPerfil.onload = function() {
            imgPerfil.style.display = 'block';
            iconePadrao.style.display = 'none';
        };
        
        imgPerfil.onerror = function() {
            console.warn("Falha ao carregar imagem (404 ou erro). Usando ícone.");
            imgPerfil.style.display = 'none';
            iconePadrao.style.display = 'flex';
        };
    } else {
        // Sem foto cadastrada
        imgPerfil.style.display = 'none';
        iconePadrao.style.display = 'flex';
    }
}

// ============================================================================
// 4. LÓGICA DE FERRAMENTAS
// ============================================================================

let ferramentas = [];
let ferramentasFiltradas = [];

// Formatação de data
function formatarDataAssociacao(dataStr, lang) {
    if (!dataStr) return translations[lang].dataNaoDisponivel || '-';
    try {
        const date = new Date(dataStr);
        return date.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US');
    } catch (e) { return '-'; }
}

// Busca usuário que está com a ferramenta
async function buscarUsuarioDaFerramenta(id) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/ferramentas/${id}/usuario`);
        if (res.ok) return await res.json();
    } catch (err) { /* silencioso */ }
    return null;
}

async function carregarFerramentas() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/ferramentas`);
        if (!res.ok) throw new Error("Erro API");
        ferramentas = await res.json();
        ferramentasFiltradas = [...ferramentas];
        renderizarFerramentas();
    } catch (err) {
        console.error(err);
        const grid = document.getElementById("toolGrid");
        if(grid) grid.innerHTML = "<p style='color:white'>Erro ao carregar ferramentas.</p>";
    }
}

function filtrarFerramentas() {
    const termo = document.getElementById("search-input")?.value.toLowerCase() || '';
    ferramentasFiltradas = ferramentas.filter(f => (f.nome || '').toLowerCase().includes(termo));
    renderizarFerramentas();
}

window.renderizarFerramentas = async function() {
    const grid = document.getElementById("toolGrid");
    if (!grid) return;
    grid.innerHTML = "";

    const lang = localStorage.getItem('lang') || 'pt';
    const trans = translations[lang];

    if (ferramentasFiltradas.length === 0) {
        grid.innerHTML = `<p style="color: #ccc;">${trans.noToolsFound}</p>`;
        return;
    }

    const promises = ferramentasFiltradas.map(async (f) => {
        const userStatus = await buscarUsuarioDaFerramenta(f.id);
        const nomeUser = userStatus?.nome;
        const dataAssoc = userStatus?.dataAssociacao;
        
        const isLivre = !nomeUser;
        const statusClass = isLivre ? 'disponivel' : 'emprestado';
        let statusTxt = isLivre ? trans.disponivel : `${trans.emUsoPor} ${nomeUser}`;

        // Se tiver data, usa formato detalhado
        if (!isLivre && dataAssoc) {
            const dataFmt = formatarDataAssociacao(dataAssoc, lang);
            statusTxt = trans.emUsoDesde.replace('{nomeUsuario}', nomeUser).replace('{dataHora}', dataFmt);
        }

        const div = document.createElement('div');
        div.className = 'tool-card';
        div.innerHTML = `
            <img src="${f.imagemUrl || '/img/tools.png'}" onerror="this.src='/img/tools.png'">
            <h3>${f.nome}</h3>
            <p class="status ${statusClass}">${statusTxt}</p>
            <button class="select-btn" ${isLivre ? '' : 'disabled'}>${trans.selectButton}</button>
        `;

        if (isLivre) {
            div.querySelector('button').onclick = () => window.location.href = `FerramentaUni.html?id=${f.id}`;
        }
        return div;
    });

    const cards = await Promise.all(promises);
    cards.forEach(c => grid.appendChild(c));
};

// ============================================================================
// 5. INICIALIZAÇÃO
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Carrega Perfil (Foto e Nome)
    carregarDadosUsuario();

    // 2. Configura Tema e Idioma
    loadTheme();
    loadLanguage();
    
    // 3. Carrega Dados da API
    carregarFerramentas();

    // 4. Eventos
    document.getElementById('hamburger-btn')?.addEventListener('click', () => 
        document.getElementById('sidebar')?.classList.toggle('active')
    );
    
    document.getElementById("search-input")?.addEventListener("input", filtrarFerramentas);

    // Configurações (Popup)
    const settingsBtn = document.getElementById('settings-btn');
    const popup = document.getElementById('theme-popup');
    
    settingsBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        popup?.classList.toggle('hidden');
        popup?.classList.toggle('visible');
    });
    
    document.getElementById('close-popup-btn')?.addEventListener('click', () => {
        popup?.classList.add('hidden');
        popup?.classList.remove('visible');
    });

    document.getElementById('theme-toggle-btn')?.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-theme');
        saveTheme(isDark ? 'light' : 'dark');
    });

    document.getElementById('lang-toggle-btn')?.addEventListener('click', () => {
        const curr = localStorage.getItem('lang') || 'pt';
        saveLanguage(curr === 'pt' ? 'en' : 'pt');
    });

    // Logout
    document.getElementById('nav-exit')?.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('usuarioLogado');
        window.location.href = '/index.html';
    });
});