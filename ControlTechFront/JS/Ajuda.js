
const translations = {
    'pt': {
        'pageTitle': 'Ajuda - SENAI ControlTech',
        'sidebarTools': 'Ferramentas',
        'sidebarReturn': 'Devolver',
        'sidebarHelp': 'Ajuda',
        'sidebarHistory': 'Histórico',
        'sidebarExit': 'Sair',
        'sidebarSettings': 'Configurações',
        'headerTitle': 'Central de Ajuda',
        'headerSubtitle': 'Encontre respostas para as perguntas mais frequentes abaixo:',
        'faq1Title': 'Como faço para devolver uma ferramenta?',
        'faq1Text': 'Para registrar a devolução de uma ferramenta, vá até a aba "Devolver" no menu lateral. Na página, você poderá selecionar a ferramenta na lista de itens que estão em seu nome e confirmar a devolução.',
        'faq2Title': 'Como posso sair do sistema ao final do dia?',
        'faq2Text': 'Para encerrar sua sessão com segurança, clique na opção "Sair", localizada no menu lateral. Esta ação garante que seus dados fiquem protegidos e finaliza seu acesso à plataforma.',
        'faq3Title': 'Como posso entrar em contato com o suporte?',
        'faq3Text': 'Se as perguntas frequentes não resolveram seu problema, você pode nos enviar uma mensagem através do formulário abaixo ou entrar em contato pelo e-mail suporteControlTech@gmail.com',
        'formTitle': 'Relate seu problema',
        'labelNome': 'Nome:',
        'nomePlaceholder': 'Digite seu nome',
        'labelEmail': 'E-mail:',
        'emailPlaceholder': 'Digite seu e-mail',
        'labelProblema': 'Descreva o problema:',
        'problemaPlaceholder': 'Descreva seu problema aqui...',
        'btnSubmitAjuda': 'Enviar',
        'popupMsg': '✅ Obrigado, <strong>{nome}</strong>! Seu pedido de ajuda foi registrado. Entraremos em contato pelo e-mail <strong>{email}</strong> em breve.',
        'popupBtnFechar': 'Fechar',
        'popupAlertaPreenchimento': 'Por favor, preencha todos os campos do formulário.',
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
        'sidebarTools': 'Tools',
        'sidebarReturn': 'Return',
        'sidebarHelp': 'Help',
        'sidebarHistory': 'History',
        'sidebarExit': 'Exit',
        'sidebarSettings': 'Settings',
        'headerTitle': 'Help Center',
        'headerSubtitle': 'Find answers to frequently asked questions below:',
        'faq1Title': 'How do I return a tool?',
        'faq1Text': 'To register a tool return, go to the "Return" tab in the side menu. On the page, you can select the tool from the list of items under your name and confirm the return.',
        'faq2Title': 'How can I log out?',
        'faq2Text': 'To end your session securely, click the "Exit" option in the side menu. This action protects your data and ends your access.',
        'faq3Title': 'How can I contact support?',
        'faq3Text': 'If the FAQs did not solve your problem, send us a message using the form below or contact us at suporteControlTech@gmail.com',
        'formTitle': 'Report your problem',
        'labelNome': 'Name:',
        'nomePlaceholder': 'Enter your name',
        'labelEmail': 'E-mail:',
        'emailPlaceholder': 'Enter your e-mail',
        'labelProblema': 'Describe the problem:',
        'problemaPlaceholder': 'Describe your problem here...',
        'btnSubmitAjuda': 'Submit',
        'popupMsg': '✅ Thank you, <strong>{nome}</strong>! Your help request is registered. We will contact you at <strong>{email}</strong> shortly.',
        'popupBtnFechar': 'Close',
        'popupAlertaPreenchimento': 'Please fill in all form fields.',
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
    const currentLang = translations[lang] ? lang : 'pt';
    const trans = translations[currentLang];
    if (!trans) return console.error("Traduções não encontradas:", currentLang);

    document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';
    document.title = trans.pageTitle || 'Ajuda - SENAI';

    const setText = (id, key) => {
        const element = document.getElementById(id);
        if (element) element.textContent = trans[key] || '';
        else console.warn(`Elemento ID '${id}' não encontrado.`);
    };
    const setPlaceholder = (id, key) => {
        const element = document.getElementById(id);
        if (element) element.placeholder = trans[key] || '';
        else console.warn(`Elemento ID '${id}' para placeholder não encontrado.`);
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
    setText('header-subtitle', 'headerSubtitle');
    setText('faq-1-title', 'faq1Title');
    setText('faq-1-text', 'faq1Text');
    setText('faq-2-title', 'faq2Title');
    setText('faq-2-text', 'faq2Text');
    setText('faq-3-title', 'faq3Title');
    setText('faq-3-text', 'faq3Text');

    // Formulário
    setText('form-title', 'formTitle');
    setText('label-nome', 'labelNome');
    setPlaceholder('nome', 'nomePlaceholder');
    setText('label-email', 'labelEmail');
    setPlaceholder('email', 'emailPlaceholder');
    setText('label-problema', 'labelProblema');
    setPlaceholder('problema', 'problemaPlaceholder');
    setText('btn-submit-ajuda', 'btnSubmitAjuda');

    // Popup (botão fechar)
    setText('btn-fechar-popup', 'popupBtnFechar');

    // Popup Configurações
    setText('settings-popup-title', 'settingsPopupTitle');
    setText('theme-label', 'themeLabel');
    setText('lang-label', 'langLabel');

    // Atualiza textos de status
    updateThemeStatusText(document.body.classList.contains('dark-theme') ? 'dark' : 'light', currentLang);
    updateLanguageStatusText(currentLang);
    displayUserName(currentLang);
};

// Funções saveTheme, loadTheme, updateThemeStatusText, updateThemeToggleButtonVisuals,
// saveLanguage, loadLanguage, updateLanguageStatusText, displayUserName
// (Copie EXATAMENTE as mesmas funções do JS/Ferramenta.js ou JS/Devolver.js, pois são idênticas)
const saveTheme = (theme) => {
    localStorage.setItem('theme', theme);
    const currentLang = localStorage.getItem('lang') || 'pt';
    updateThemeStatusText(theme, currentLang);
    updateThemeToggleButtonVisuals(theme);
};
const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const currentLang = localStorage.getItem('lang') || 'pt';
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    updateThemeStatusText(savedTheme, currentLang);
    updateThemeToggleButtonVisuals(savedTheme);
};
const updateThemeStatusText = (activeTheme, lang) => {
    const themeStatusEl = document.getElementById('theme-status');
    const trans = translations[lang];
    if (themeStatusEl && trans) {
        themeStatusEl.textContent = activeTheme === 'dark' ? (trans.themeStatusDark || 'Tema Escuro') : (trans.themeStatusLight || 'Tema Claro');
    }
};
const updateThemeToggleButtonVisuals = (activeTheme) => {
    const sunIcon = document.querySelector('#theme-toggle-btn .fa-sun');
    const moonIcon = document.querySelector('#theme-toggle-btn .fa-moon');
    if (sunIcon && moonIcon) {
        sunIcon.style.opacity = activeTheme === 'dark' ? '0' : '1';
        sunIcon.style.transform = activeTheme === 'dark' ? 'translateY(-10px)' : 'translateY(0)';
        moonIcon.style.opacity = activeTheme === 'dark' ? '1' : '0';
        moonIcon.style.transform = activeTheme === 'dark' ? 'translateY(0)' : 'translateY(10px)';
    }
};
const saveLanguage = (lang) => {
    localStorage.setItem('lang', lang);
    updateTranslations(lang);
};
const loadLanguage = () => {
    const savedLang = localStorage.getItem('lang') || 'pt';
    updateTranslations(savedLang);
};
const updateLanguageStatusText = (activeLang) => {
    const langToggleBtnSpan = document.getElementById('lang-toggle-btn')?.querySelector('span');
    const langStatusEl = document.getElementById('lang-status');
    if (langToggleBtnSpan) langToggleBtnSpan.textContent = activeLang.toUpperCase();
    if (langStatusEl) {
        const transPt = translations.pt;
        const transEn = translations.en;
        if (transPt && transEn) {
            langStatusEl.textContent = activeLang === 'pt' ? (transPt.langStatusPT || 'Português') : (transEn.langStatusEN || 'English');
        }
    }
};
function displayUserName(lang) {
    const welcomeMessage = document.getElementById('welcome-message');
    const userNameElement = document.getElementById('user-name');
    const trans = translations[lang];
    let userInfo = null;
    try {
        const storedUser = localStorage.getItem('usuarioLogado');
        if (storedUser) userInfo = JSON.parse(storedUser);
    } catch (e) { console.error("Erro ao ler usuarioLogado:", e); }

    if (welcomeMessage && userNameElement && trans) {
        const defaultUserName = (lang === 'pt' ? 'Usuário' : 'User');
        welcomeMessage.textContent = trans.welcomeMessage || (lang === 'pt' ? 'Olá,' : 'Hello,');
        userNameElement.textContent = (userInfo && userInfo.nome) ? userInfo.nome : defaultUserName;
    }
}


// --- LÓGICA ORIGINAL DA PÁGINA (PRESERVADA E INTEGRADA) ---

// Função global original para fechar popup de ajuda
function fecharPopup() {
    const popup = document.getElementById('popupAjuda');
    if(popup) popup.style.display = 'none';
}
window.fecharPopup = fecharPopup; // Torna acessível ao 'onclick'

// Função interna para mostrar popup de ajuda (agora usa traduções)
function mostrarPopupAjuda(nome, email, lang) {
    const popup = document.getElementById('popupAjuda');
    const mensagemEl = document.getElementById('mensagemPopup');
    const trans = translations[lang];

    if (popup && mensagemEl && trans) {
        let msgFormatada = (trans.popupMsg || 'Erro')
            .replace('{nome}', nome)
            .replace('{email}', email);
        mensagemEl.innerHTML = msgFormatada;
        popup.style.display = 'flex';
    } else {
         console.error("Popup de ajuda ou elemento de mensagem não encontrado.")
    }
}

// --- INICIALIZAÇÃO E EVENT LISTENERS ---
document.addEventListener("DOMContentLoaded", () => {
    // Referências
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('sidebar');
    const form = document.getElementById('formAjuda');
    const settingsBtn = document.getElementById('settings-btn');
    const themePopup = document.getElementById('theme-popup');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const langToggleBtn = document.getElementById('lang-toggle-btn');

    // Inicializa Tema e Idioma
    loadTheme();
    loadLanguage(); // Chama updateTranslations > displayUserName

    // Evento Hamburger
    hamburgerBtn?.addEventListener('click', () => sidebar?.classList.toggle('active'));

    // Evento Formulário de Ajuda (usa traduções)
    form?.addEventListener('submit', function(event) {
        event.preventDefault();
        const currentLang = localStorage.getItem('lang') || 'pt';
        const trans = translations[currentLang];

        const nome = form.nome?.value.trim();
        const email = form.email?.value.trim();
        const problema = form.problema?.value.trim();

        if (!nome || !email || !problema) {
            alert(trans?.popupAlertaPreenchimento || 'Preencha todos os campos.');
            return;
        }

        mostrarPopupAjuda(nome, email, currentLang); // Chama popup com idioma
        form.reset();
    });

    // Eventos Popup Configurações
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

}); // Fim do DOMContentLoaded