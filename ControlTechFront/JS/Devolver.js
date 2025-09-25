// Dicionário de traduções
const translations = {
    'pt': {
        'pageTitle': 'Devolver Ferramenta',
        'sidebarTools': 'Ferramentas',
        'sidebarReturn': 'Devolver',
        'sidebarHelp': 'Ajuda',
        'sidebarHistory': 'Histórico',
        'sidebarExit': 'Sair',
        'sidebarSettings': 'Configurações',
        'labelCracha': 'Número do Crachá:',
        'labelFerramentaId': 'ID da Ferramenta:',
        'btnDevolver': 'Devolver Ferramenta',
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
        'pageTitle': 'Return Tool',
        'sidebarTools': 'Tools',
        'sidebarReturn': 'Return',
        'sidebarHelp': 'Help',
        'sidebarHistory': 'History',
        'sidebarExit': 'Exit',
        'sidebarSettings': 'Settings',
        'labelCracha': 'Badge Number:',
        'labelFerramentaId': 'Tool ID:',
        'btnDevolver': 'Return Tool',
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
    document.getElementById('label-cracha-devolver').textContent = trans.labelCracha;
    document.getElementById('label-ferramenta-id-devolver').textContent = trans.labelFerramentaId;
    document.getElementById('btn-devolver').textContent = trans.btnDevolver;

    // Traduzir o pop-up de configurações
    document.getElementById('settings-popup-title').textContent = trans.settingsPopupTitle;
    document.getElementById('theme-label').textContent = trans.themeLabel;
    document.getElementById('lang-label').textContent = trans.langLabel;

    // Atualizar o status do tema e idioma
    updateThemeStatus(document.body.classList.contains('dark-theme') ? 'dark' : 'light', lang);
    updateLanguageStatus(lang);
    displayUserName(lang); // Atualiza a mensagem de boas-vindas
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

// Gerencia o formulário de devolução
const devolverForm = document.getElementById('devolver-form');

devolverForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const cracha = document.getElementById('cracha-devolver').value;
    const ferramentaId = document.getElementById('ferramenta-id-devolver').value;

    try {
        const response = await fetch(`${BASE_URL}/devolucoes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuarioId: cracha, ferramentaId: ferramentaId })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Erro ao registrar devolução.');
        }

        alert('Devolução registrada com sucesso!');
        devolverForm.reset();
    } catch (error) {
        console.error('Erro ao devolver ferramenta:', error);
        alert(`Erro: ${error.message}`);
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