// Dicionário de traduções
const translations = {
    'pt': {
        'pageTitle': 'Ajuda',
        'sidebarTools': 'Ferramentas',
        'sidebarReturn': 'Devolver',
        'sidebarHelp': 'Ajuda',
        'sidebarHistory': 'Histórico',
        'sidebarExit': 'Sair',
        'sidebarSettings': 'Configurações',
        'cardTitle1': 'Como Emprestar uma Ferramenta?',
        'cardText1': 'Vá para a página **"Ferramentas"**, clique no botão **"Emprestar"** da ferramenta desejada. Preencha seu número de crachá e confirme o empréstimo.',
        'cardTitle2': 'Como Devolver uma Ferramenta?',
        'cardText2': 'Na página **"Devolver"**, insira o número do seu crachá e o ID da ferramenta que você deseja devolver. Clique em **"Devolver Ferramenta"** para finalizar.',
        'cardTitle3': 'Como Vejo meu Histórico?',
        'cardText3': 'Acesse a página **"Histórico"**. Insira seu número de crachá no campo de busca para visualizar todas as ferramentas que você já emprestou e devolveu.',
        'cardTitle4': 'Problemas ou Dúvidas?',
        'cardText4': 'Se a sua dúvida não foi respondida, entre em contato com o suporte técnico para assistência.',
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
        'pageTitle': 'Help',
        'sidebarTools': 'Tools',
        'sidebarReturn': 'Return',
        'sidebarHelp': 'Help',
        'sidebarHistory': 'History',
        'sidebarExit': 'Exit',
        'sidebarSettings': 'Settings',
        'cardTitle1': 'How to Borrow a Tool?',
        'cardText1': 'Go to the **"Tools"** page, click the **"Borrow"** button for the desired tool. Fill in your badge number and confirm the loan.',
        'cardTitle2': 'How to Return a Tool?',
        'cardText2': 'On the **"Return"** page, enter your badge number and the ID of the tool you want to return. Click **"Return Tool"** to finalize.',
        'cardTitle3': 'How Do I View My History?',
        'cardText3': 'Go to the **"History"** page. Enter your badge number in the search field to view all the tools you have borrowed and returned.',
        'cardTitle4': 'Problems or Questions?',
        'cardText4': 'If your question was not answered, contact technical support for assistance.',
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
    document.getElementById('card-title-1').textContent = trans.cardTitle1;
    document.getElementById('card-text-1').innerHTML = trans.cardText1;
    document.getElementById('card-title-2').textContent = trans.cardTitle2;
    document.getElementById('card-text-2').innerHTML = trans.cardText2;
    document.getElementById('card-title-3').textContent = trans.cardTitle3;
    document.getElementById('card-text-3').innerHTML = trans.cardText3;
    document.getElementById('card-title-4').textContent = trans.cardTitle4;
    document.getElementById('card-text-4').innerHTML = trans.cardText4;

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