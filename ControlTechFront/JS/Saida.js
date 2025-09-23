// Dicionário de traduções
const translations = {
    'pt': {
        'pageTitle': 'Registro de Saída - SENAI ControlTech',
        'sidebarTools': 'Ferramentas',
        'sidebarReturn': 'Devolver',
        'sidebarHelp': 'Ajuda',
        'sidebarHistory': 'Histórico',
        'sidebarExit': 'Sair',
        'sidebarSettings': 'Configurações',
        'saidaTitle': 'Aproxime seu crachá',
        'saidaInstructions': 'Posicione o crachá próximo ao leitor para registrar sua saída',
        'inputPlaceholder': 'Número do crachá (auto preenchido)',
        'placeholderText': 'Aguardando leitura do crachá...',
        'confirmBtnText': 'Confirmar Saída',
        'successSaida': '✅ Saída registrada com sucesso para',
        'userNotFound': '❌ Erro: Usuário não encontrado no sistema.',
        'alreadyExited': '❌ Você já registrou sua saída hoje.',
        'errorSaida': '❌ Erro ao registrar saída. Tente novamente.',
        'settingsPopupTitle': 'Configurações',
        'themeLabel': 'Alternar Tema:',
        'themeStatusLight': 'Tema Claro',
        'themeStatusDark': 'Tema Escuro',
        'langLabel': 'Alternar Idioma:',
        'langStatusPT': 'Português',
        'langStatusEN': 'Inglês',
        'notLoggedError': 'Usuário não logado. Redirecionando para a página de login...',
        'welcomeMessage': 'Olá,'
    },
    'en': {
        'pageTitle': 'Exit Registration - SENAI ControlTech',
        'sidebarTools': 'Tools',
        'sidebarReturn': 'Return',
        'sidebarHelp': 'Help',
        'sidebarHistory': 'History',
        'sidebarExit': 'Exit',
        'sidebarSettings': 'Settings',
        'saidaTitle': 'Approach your badge',
        'saidaInstructions': 'Position your badge near the reader to register your exit',
        'inputPlaceholder': 'Badge number (auto-filled)',
        'placeholderText': 'Awaiting badge scan...',
        'confirmBtnText': 'Confirm Exit',
        'successSaida': '✅ Exit successfully registered for',
        'userNotFound': '❌ Error: User not found in the system.',
        'alreadyExited': '❌ You have already registered your exit today.',
        'errorSaida': '❌ Error registering exit. Please try again.',
        'settingsPopupTitle': 'Settings',
        'themeLabel': 'Toggle Theme:',
        'themeStatusLight': 'Light Theme',
        'themeStatusDark': 'Dark Theme',
        'langLabel': 'Toggle Language:',
        'langStatusPT': 'Portuguese',
        'langStatusEN': 'English',
        'notLoggedError': 'User not logged in. Redirecting to login page...',
        'welcomeMessage': 'Hello,'
    }
};

// --- FUNÇÕES DE LÓGICA DE TEMA E IDIOMA ---
const updateTranslations = (lang) => {
    const trans = translations[lang];

    document.title = trans.pageTitle;
    
    document.getElementById('nav-tools').querySelector('span').textContent = trans.sidebarTools;
    document.getElementById('nav-return').querySelector('span').textContent = trans.sidebarReturn;
    document.getElementById('nav-help').querySelector('span').textContent = trans.sidebarHelp;
    document.getElementById('nav-history').querySelector('span').textContent = trans.sidebarHistory;
    document.getElementById('nav-exit').querySelector('span').textContent = trans.sidebarExit;
    document.getElementById('settings-btn').querySelector('span').textContent = trans.sidebarSettings;

    document.getElementById('saida-title').textContent = trans.saidaTitle;
    document.getElementById('saida-instructions').textContent = trans.saidaInstructions;
    document.getElementById('crachaInput').placeholder = trans.inputPlaceholder;
    document.getElementById('placeholder-text').textContent = trans.placeholderText;
    document.getElementById('confirm-btn-text').textContent = trans.confirmBtnText;

    document.getElementById('settings-popup-title').textContent = trans.settingsPopupTitle;
    document.getElementById('theme-label').textContent = trans.themeLabel;
    document.getElementById('lang-label').textContent = trans.langLabel;

    updateThemeStatus(document.body.classList.contains('dark-theme') ? 'dark' : 'light', lang);
    updateLanguageStatus(lang);
    displayUserName(lang); // Adicionado para atualizar o nome na barra lateral
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

// Função para exibir notificações
function showNotification(message, isSuccess = true) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification show ' + (isSuccess ? 'success' : 'error');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// Atualiza a hora e a data a cada segundo
function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString('pt-BR');
    const date = now.toLocaleDateString('pt-BR');
    document.getElementById('currentTime').textContent = time;
    document.getElementById('currentDate').textContent = date;
}
setInterval(updateTime, 1000);

// Exibe os dados do usuário no card
function displayUserData(user, lang) {
    const infoCard = document.getElementById('dadosAluno');
    infoCard.innerHTML = `
        <h3 style="color: #004b8d; margin-bottom: 0.5rem;">${user.nome}</h3>
        <p><strong>ID:</strong> ${user.id}</p>
        <p><strong>Perfil:</strong> ${user.perfil}</p>
        <p><strong>QR Code:</strong> ${user.qrCode}</p>
    `;
    document.getElementById('confirmarBtn').disabled = false;
    document.getElementById('crachaInput').value = user.id;
}

// Simula a leitura do crachá (crachá é o próprio usuário logado)
function simularLeituraCracha() {
    const lang = localStorage.getItem('lang') || 'pt';
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!usuarioLogado || !usuarioLogado.id) {
        showNotification(translations[lang].notLoggedError, false);
        setTimeout(() => {
            window.location.href = '/HTML/login.html';
        }, 3000);
        return;
    }

    displayUserData(usuarioLogado, lang);
    document.getElementById('scannerAnimation').style.display = 'none';
}

// Simula o registro de saída no "backend"
async function registrarSaida() {
    const lang = localStorage.getItem('lang') || 'pt';
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const confirmarBtn = document.getElementById('confirmarBtn');

    if (!usuarioLogado || !usuarioLogado.id) {
        showNotification(translations[lang].notLoggedError, false);
        setTimeout(() => {
            window.location.href = '/HTML/login.html';
        }, 3000);
        return;
    }

    confirmarBtn.disabled = true;
    confirmarBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${translations[lang]['confirmBtnText']}`;

    // Simulação de chamada de API
    const response = await new Promise(resolve => {
        setTimeout(() => {
            const now = new Date();
            const lastExit = localStorage.getItem('lastExitDate');
            const today = now.toISOString().slice(0, 10);

            if (lastExit === today) {
                resolve({ success: false, message: translations[lang].alreadyExited });
            } else {
                localStorage.setItem('lastExitDate', today);
                resolve({ success: true, message: translations[lang].successSaida + ' ' + usuarioLogado.nome });
            }
        }, 1500); // 1.5 segundos para simular a requisição
    });

    if (response.success) {
        showNotification(response.message, true);
        localStorage.removeItem('usuarioLogado'); // Deslogar o usuário após a saída
        setTimeout(() => {
            window.location.href = '/HTML/login.html';
        }, 3000);
    } else {
        showNotification(response.message, false);
    }

    confirmarBtn.disabled = false;
    confirmarBtn.innerHTML = `<i class="fas fa-check-circle"></i> <span id="confirm-btn-text">${translations[lang].confirmBtnText}</span>`;
}

// --- EVENT LISTENERS E INICIALIZAÇÃO ---
document.addEventListener("DOMContentLoaded", () => {
    // Referências dos elementos
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('sidebar');
    const crachaInput = document.getElementById('crachaInput');
    const confirmarBtn = document.getElementById('confirmarBtn');
    const settingsBtn = document.getElementById('settings-btn');
    const themePopup = document.getElementById('theme-popup');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    
    // Inicializa tema, idioma e nome do usuário
    loadTheme();
    loadLanguage();

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

    // Simula a leitura do crachá ao pressionar "Enter" no input
    crachaInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            simularLeituraCracha();
        }
    });

    // Registra a saída ao clicar no botão
    confirmarBtn.addEventListener('click', () => {
        registrarSaida();
    });
});