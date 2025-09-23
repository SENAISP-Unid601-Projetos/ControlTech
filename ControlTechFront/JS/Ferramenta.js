// Dicionário de traduções
const translations = {
    'pt': {
        'pageTitle': 'Ferramentas Disponíveis',
        'sidebarTools': 'Ferramentas',
        'sidebarReturn': 'Devolver',
        'sidebarHelp': 'Ajuda',
        'sidebarHistory': 'Histórico',
        'sidebarExit': 'Sair',
        'sidebarSettings': 'Configurações',
        'emprestimoTitle': 'Empréstimo de Ferramenta',
        'labelCracha': 'Número do Crachá:',
        'labelObservacoes': 'Observações (opcional):',
        'btnEmprestar': 'Emprestar Ferramenta',
        'settingsPopupTitle': 'Configurações',
        'themeLabel': 'Alternar Tema:',
        'themeStatusLight': 'Tema Claro',
        'themeStatusDark': 'Tema Escuro',
        'langLabel': 'Alternar Idioma:',
        'langStatusPT': 'Português',
        'langStatusEN': 'Inglês',
        'welcomeMessage': 'Olá,',
        'disponivel': 'Disponível',
        'emprestado': 'Emprestado'
    },
    'en': {
        'pageTitle': 'Available Tools',
        'sidebarTools': 'Tools',
        'sidebarReturn': 'Return',
        'sidebarHelp': 'Help',
        'sidebarHistory': 'History',
        'sidebarExit': 'Exit',
        'sidebarSettings': 'Settings',
        'emprestimoTitle': 'Tool Loan',
        'labelCracha': 'Badge Number:',
        'labelObservacoes': 'Notes (optional):',
        'btnEmprestar': 'Loan Tool',
        'settingsPopupTitle': 'Settings',
        'themeLabel': 'Toggle Theme:',
        'themeStatusLight': 'Light Theme',
        'themeStatusDark': 'Dark Theme',
        'langLabel': 'Toggle Language:',
        'langStatusPT': 'Portuguese',
        'langStatusEN': 'English',
        'welcomeMessage': 'Hello,',
        'disponivel': 'Available',
        'emprestado': 'Loaned'
    }
};

// --- FUNÇÕES DE LÓGICA DE TEMA E IDIOMA ---
const updateTranslations = (lang) => {
    const trans = translations[lang];

    document.title = trans.pageTitle;
    
    // Traduzir a barra lateral (navbar)
    document.getElementById('nav-tools').querySelector('span').textContent = trans.sidebarTools;
    document.getElementById('nav-return').querySelector('span').textContent = trans.sidebarReturn;
    document.getElementById('nav-help').querySelector('span').textContent = trans.sidebarHelp;
    document.getElementById('nav-history').querySelector('span').textContent = trans.sidebarHistory;
    document.getElementById('nav-exit').querySelector('span').textContent = trans.sidebarExit;
    document.getElementById('settings-btn').querySelector('span').textContent = trans.sidebarSettings;

    // Traduzir o conteúdo principal
    document.getElementById('page-title').textContent = trans.pageTitle;
    document.getElementById('emprestimo-title').textContent = trans.emprestimoTitle;
    document.getElementById('label-cracha').textContent = trans.labelCracha;
    document.getElementById('label-observacoes').textContent = trans.labelObservacoes;
    document.getElementById('btn-emprestar').textContent = trans.btnEmprestar;

    // Traduzir o pop-up de configurações
    document.getElementById('settings-popup-title').textContent = trans.settingsPopupTitle;
    document.getElementById('theme-label').textContent = trans.themeLabel;
    document.getElementById('lang-label').textContent = trans.langLabel;

    // Atualizar o status do tema e idioma
    updateThemeStatus(document.body.classList.contains('dark-theme') ? 'dark' : 'light', lang);
    updateLanguageStatus(lang);
    displayUserName(lang); // Atualiza a mensagem de boas-vindas
    renderToolCards(lang); // Re-renderiza as ferramentas para traduzir o status
};

const saveTheme = (theme) => {
    localStorage.setItem('theme', theme);
    updateThemeStatus(theme, localStorage.getItem('lang') || 'pt');
};

const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    updateThemeStatus(savedTheme, localStorage.getItem('lang') || 'pt');
};

const updateThemeStatus = (activeTheme, lang) => {
    document.getElementById('theme-status').textContent = activeTheme === 'dark' ? translations[lang].themeStatusDark : translations[lang].themeStatusLight;
};

const saveLanguage = (lang) => {
    localStorage.setItem('lang', lang);
    updateTranslations(lang);
};

const loadLanguage = () => {
    const savedLang = localStorage.getItem('lang') || 'pt';
    updateTranslations(savedLang);
};

const updateLanguageStatus = (activeLang) => {
    document.getElementById('lang-toggle-btn').querySelector('span').textContent = activeLang.toUpperCase();
    document.getElementById('lang-status').textContent = activeLang === 'pt' ? translations.pt.langStatusPT : translations.en.langStatusEN;
};

// --- FUNÇÕES DE LÓGICA DA PÁGINA ---

const BASE_URL = 'http://localhost:8080/api';

// Simulação de dados do backend
let ferramentasData = [];

// Função para exibir o nome do usuário no cabeçalho
function displayUserName(lang) {
    const userInfo = JSON.parse(localStorage.getItem('usuarioLogado'));
    const welcomeMessage = document.getElementById('welcome-message');
    const userNameElement = document.getElementById('user-name');

    if (userInfo && userInfo.nome) {
        welcomeMessage.textContent = translations[lang].welcomeMessage;
        userNameElement.textContent = userInfo.nome;
    } else {
        welcomeMessage.textContent = 'Olá,';
        userNameElement.textContent = 'Usuário';
    }
}

// Renderiza os cartões de ferramenta
function renderToolCards(lang) {
    const toolGrid = document.getElementById('tool-grid');
    toolGrid.innerHTML = '';
    const trans = translations[lang];

    ferramentasData.forEach(ferramenta => {
        const isDisponivel = ferramenta.status === 'DISPONIVEL';
        const card = document.createElement('div');
        card.className = 'tool-card';
        card.innerHTML = `
            <img src="${ferramenta.imagemUrl}" alt="${ferramenta.nome}" />
            <h3>${ferramenta.nome}</h3>
            <p>ID: ${ferramenta.id}</p>
            <p class="status ${isDisponivel ? 'disponivel' : 'emprestado'}">
                ${isDisponivel ? trans.disponivel : trans.emprestado}
            </p>
            <button class="emprestar-btn" data-tool-id="${ferramenta.id}" ${isDisponivel ? '' : 'disabled'}>
                Emprestar
            </button>
        `;
        toolGrid.appendChild(card);
    });

    attachEmprestarListeners();
}

// Carrega as ferramentas do backend (simulado)
async function fetchFerramentas() {
    try {
        const response = await fetch(`${BASE_URL}/ferramentas`);
        if (!response.ok) throw new Error('Network response was not ok');
        ferramentasData = await response.json();
        renderToolCards(localStorage.getItem('lang') || 'pt');
    } catch (error) {
        console.error('Erro ao carregar ferramentas:', error);
        const toolGrid = document.getElementById('tool-grid');
        toolGrid.innerHTML = '<p>Erro ao carregar ferramentas. Por favor, tente novamente mais tarde.</p>';
    }
}

// Anexa os eventos de clique aos botões de empréstimo
function attachEmprestarListeners() {
    document.querySelectorAll('.emprestar-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const toolId = e.target.dataset.toolId;
            openEmprestimoPopup(toolId);
        });
    });
}

// Gerencia o pop-up de empréstimo
const emprestimoPopup = document.getElementById('emprestimo-popup');
const closeEmprestimoBtn = document.getElementById('close-emprestimo-popup');
const emprestimoForm = document.getElementById('emprestimo-form');
const emprestimoToolName = document.getElementById('emprestimo-tool-name');

let selectedToolId = null;

function openEmprestimoPopup(toolId) {
    const ferramenta = ferramentasData.find(f => f.id == toolId);
    if (!ferramenta) return;

    selectedToolId = toolId;
    emprestimoToolName.textContent = `Ferramenta: ${ferramenta.nome}`;
    emprestimoPopup.classList.remove('hidden');

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuarioLogado && usuarioLogado.id) {
        document.getElementById('cracha-input').value = usuarioLogado.id;
    }
}

closeEmprestimoBtn.addEventListener('click', () => {
    emprestimoPopup.classList.add('hidden');
    emprestimoForm.reset();
});

emprestimoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const cracha = document.getElementById('cracha-input').value;
    const observacoes = document.getElementById('observacoes-input').value;

    const emprestimoData = {
        ferramentaId: selectedToolId,
        usuarioId: cracha,
        observacoes: observacoes,
        dataEmprestimo: new Date().toISOString()
    };

    try {
        const response = await fetch(`${BASE_URL}/emprestimos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emprestimoData)
        });

        if (!response.ok) throw new Error('Erro ao registrar empréstimo');

        alert('Empréstimo registrado com sucesso!');
        emprestimoPopup.classList.add('hidden');
        emprestimoForm.reset();
        fetchFerramentas(); // Atualiza a lista de ferramentas
    } catch (error) {
        console.error('Erro ao emprestar ferramenta:', error);
        alert('Erro ao registrar empréstimo. Por favor, tente novamente.');
    }
});


// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('sidebar');
    const settingsBtn = document.getElementById('settings-btn');
    const themePopup = document.getElementById('theme-popup');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const langToggleBtn = document.getElementById('lang-toggle-btn');

    // Inicializa tema, idioma e exibe o nome do usuário
    loadTheme();
    loadLanguage();
    displayUserName(localStorage.getItem('lang') || 'pt');
    fetchFerramentas();

    // Eventos do menu hambúrguer
    hamburgerBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Eventos do pop-up de configurações
    settingsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        themePopup.classList.toggle('visible');
        themePopup.classList.toggle('hidden');
    });

    closePopupBtn.addEventListener('click', () => {
        themePopup.classList.add('hidden');
        themePopup.classList.remove('visible');
    });

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.classList.toggle('dark-theme');
        saveTheme(newTheme);
    });

    langToggleBtn.addEventListener('click', () => {
        const currentLang = localStorage.getItem('lang') || 'pt';
        const newLang = currentLang === 'pt' ? 'en' : 'pt';
        saveLanguage(newLang);
    });
});