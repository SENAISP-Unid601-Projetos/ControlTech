// Dicionário de traduções
const translations = {
    'pt': {
        'pageTitle': 'Histórico de Empréstimos',
        'sidebarTools': 'Ferramentas',
        'sidebarReturn': 'Devolver',
        'sidebarHelp': 'Ajuda',
        'sidebarHistory': 'Histórico',
        'sidebarExit': 'Sair',
        'sidebarSettings': 'Configurações',
        'labelCrachaSearch': 'Número do Crachá:',
        'searchPlaceholder': 'Buscar por número do crachá',
        'noHistoryMessage': 'Nenhum histórico encontrado para o crachá inserido.',
        'historyItemTitle': 'Ferramenta: ',
        'loanDate': 'Data do Empréstimo: ',
        'returnDate': 'Data da Devolução: ',
        'status': 'Status: ',
        'emprestado': 'Emprestado',
        'devolvido': 'Devolvido',
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
        'pageTitle': 'Loan History',
        'sidebarTools': 'Tools',
        'sidebarReturn': 'Return',
        'sidebarHelp': 'Help',
        'sidebarHistory': 'History',
        'sidebarExit': 'Exit',
        'sidebarSettings': 'Settings',
        'labelCrachaSearch': 'Badge Number:',
        'searchPlaceholder': 'Search by badge number',
        'noHistoryMessage': 'No history found for the badge number entered.',
        'historyItemTitle': 'Tool: ',
        'loanDate': 'Loan Date: ',
        'returnDate': 'Return Date: ',
        'status': 'Status: ',
        'emprestado': 'Loaned',
        'devolvido': 'Returned',
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
    document.getElementById('label-cracha-search').textContent = trans.labelCrachaSearch;
    document.getElementById('cracha-search').placeholder = trans.searchPlaceholder;
    document.getElementById('no-history-message').textContent = trans.noHistoryMessage;

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

// Renderiza os itens do histórico
function renderHistory(data, lang) {
    const historyGrid = document.getElementById('history-grid');
    const noHistoryMessage = document.getElementById('no-history-message');
    const trans = translations[lang];
    historyGrid.innerHTML = '';

    if (data.length === 0) {
        noHistoryMessage.classList.remove('hidden');
        return;
    }

    noHistoryMessage.classList.add('hidden');

    data.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        const statusText = item.dataDevolucao ? trans.devolvido : trans.emprestado;
        const statusClass = item.dataDevolucao ? 'devolvido' : 'emprestado';

        historyItem.innerHTML = `
            <h3>${trans.historyItemTitle} ${item.ferramentaNome}</h3>
            <p><strong>ID:</strong> ${item.ferramentaId}</p>
            <p><strong>${trans.loanDate}</strong> ${new Date(item.dataEmprestimo).toLocaleDateString()}</p>
            ${item.dataDevolucao ? `<p><strong>${trans.returnDate}</strong> ${new Date(item.dataDevolucao).toLocaleDateString()}</p>` : ''}
            <p><strong>${trans.status}</strong> <span class="status ${statusClass}">${statusText}</span></p>
        `;
        historyGrid.appendChild(historyItem);
    });
}

// Busca o histórico do backend
async function fetchHistory(cracha) {
    try {
        const response = await fetch(`${BASE_URL}/historico/${cracha}`);
        if (!response.ok) {
            if (response.status === 404) {
                renderHistory([], localStorage.getItem('lang') || 'pt'); // Exibe mensagem de "não encontrado"
                return;
            }
            throw new Error('Erro ao buscar histórico');
        }
        const data = await response.json();
        renderHistory(data, localStorage.getItem('lang') || 'pt');
    } catch (error) {
        console.error('Erro ao buscar histórico:', error);
        alert('Erro ao carregar histórico. Por favor, tente novamente.');
        renderHistory([], localStorage.getItem('lang') || 'pt');
    }
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('sidebar');
    const searchBtn = document.getElementById('search-btn');
    const crachaSearchInput = document.getElementById('cracha-search');
    const settingsBtn = document.getElementById('settings-btn');
    const themePopup = document.getElementById('theme-popup');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const langToggleBtn = document.getElementById('lang-toggle-btn');

    // Inicializa tema, idioma e exibe o nome do usuário
    loadTheme();
    loadLanguage();
    displayUserName(localStorage.getItem('lang') || 'pt');

    // Preenche o campo de crachá com o usuário logado
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuarioLogado && usuarioLogado.id) {
        crachaSearchInput.value = usuarioLogado.id;
        fetchHistory(usuarioLogado.id);
    } else {
        renderHistory([], localStorage.getItem('lang') || 'pt');
    }

    // Eventos do menu hambúrguer
    hamburgerBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Evento de busca
    searchBtn.addEventListener('click', () => {
        const cracha = crachaSearchInput.value.trim();
        if (cracha) {
            fetchHistory(cracha);
        } else {
            renderHistory([], localStorage.getItem('lang') || 'pt');
        }
    });

    crachaSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
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