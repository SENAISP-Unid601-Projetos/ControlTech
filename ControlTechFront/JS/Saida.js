// Dicionário de traduções
const translations = {
    'pt': {
        'pageTitle': 'Saída - SENAI ControlTech', // Título ajustado para refletir a página
        'sidebarAbout': 'Início', 
        'sidebarTools': 'Ferramentas',
        'sidebarReturn': 'Devolver',
        'sidebarHelp': 'Ajuda',
        'sidebarHistory': 'Histórico',
        'sidebarChatBot': 'ChatBot', 
        'sidebarExit': 'Sair',
        'sidebarSettings': 'Configurações',
        'saidaTitle': 'Aproxime seu crachá',
        'saidaInstructions': 'Posicione o crachá próximo ao leitor para registrar sua saída',
        'inputPlaceholder': 'Número do crachá (auto preenchido)',
        'placeholderText': 'Aguardando leitura do crachá...',
        'confirmBtnText': 'Confirmar Saída',
        'confirmingBtnText': 'Confirmando...',
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
        'welcomeMessage': 'Olá,',
        'labelTurma': 'Turma:', // <-- NOVO CAMPO DE TRADUÇÃO
    },
    'en': {
        'pageTitle': 'Exit - SENAI ControlTech', // Título ajustado para refletir a página
        'sidebarAbout': 'Home', 
        'sidebarTools': 'Tools',
        'sidebarReturn': 'Return',
        'sidebarHelp': 'Help',
        'sidebarHistory': 'History',
        'sidebarChatBot': 'ChatBot', 
        'sidebarExit': 'Exit',
        'sidebarSettings': 'Settings',
        'saidaTitle': 'Approach your badge',
        'saidaInstructions': 'Position your badge near the reader to register your exit',
        'inputPlaceholder': 'Badge number (auto-filled)',
        'placeholderText': 'Awaiting badge scan...',
        'confirmBtnText': 'Confirm Exit',
        'confirmingBtnText': 'Confirming...',
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
        'welcomeMessage': 'Hello,',
        'labelTurma': 'Class:', // <-- NOVO CAMPO DE TRADUÇÃO
    }
};

// --- FUNÇÕES DE LÓGICA DE TEMA E IDIOMA ---
// (Funções de tema/idioma e displayUserName omitidas para brevidade, mas estão no arquivo original)
const updateTranslations = (lang) => {
    const currentLang = translations[lang] ? lang : 'pt';
    const trans = translations[currentLang];
    if (!trans) return console.error("Traduções não encontradas:", currentLang);

    document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';
    document.title = trans.pageTitle || 'Saída - SENAI';

    const setText = (id, key, isHTML = false) => {
        const element = document.getElementById(id);
        if (element) {
            if (isHTML) element.innerHTML = trans[key] || '';
            else element.textContent = trans[key] || '';
        } else console.warn(`Elemento ID '${id}' não encontrado.`);
    };
    const setPlaceholder = (id, key) => { const e=document.getElementById(id); if(e) e.placeholder=trans[key]||''; else console.warn(`ID '${id}' placeholder não encontrado.`); };
    const setSpanText = (id, key) => { const e=document.getElementById(id)?.querySelector('span'); if(e) e.textContent=trans[key]||''; else console.warn(`Span ID '${id}' não encontrado.`); };


    // Barra lateral
    setSpanText('nav-tools', 'sidebarTools');
    setSpanText('nav-return', 'sidebarReturn');
    setSpanText('nav-help', 'sidebarHelp');
    setSpanText('nav-history', 'sidebarHistory');
    setSpanText('nav-exit', 'sidebarExit');
    setSpanText('settings-btn', 'sidebarSettings');

    // Conteúdo Principal
    setText('saida-title', 'saidaTitle', true); // Mantém ícone
    setText('saida-instructions', 'saidaInstructions');
    setPlaceholder('crachaInput', 'inputPlaceholder');
    setText('placeholder-text', 'placeholderText'); // Texto dentro do card placeholder
    setText('confirm-btn-text', 'confirmBtnText'); // Span dentro do botão confirmar

    // Popup Configurações
    setText('settings-popup-title', 'settingsPopupTitle');
    setText('theme-label', 'themeLabel');
    setText('lang-label', 'langLabel');

    // Atualiza textos de status
    updateThemeStatusText(document.body.classList.contains('dark-theme') ? 'dark' : 'light', currentLang);
    updateLanguageStatusText(currentLang);
    displayUserName(currentLang);
};
const saveTheme = (theme) => { localStorage.setItem('theme', theme); const cl = localStorage.getItem('lang') || 'pt'; updateThemeStatusText(theme, cl); updateThemeToggleButtonVisuals(theme); };
const loadTheme = () => { const st = localStorage.getItem('theme') || 'light'; const cl = localStorage.getItem('lang') || 'pt'; document.body.classList.toggle('dark-theme', st === 'dark'); updateThemeStatusText(st, cl); updateThemeToggleButtonVisuals(st); };
const updateThemeStatusText = (at, l) => { const ts = document.getElementById('theme-status'); const tr = translations[l]; if (ts && tr) ts.textContent = at === 'dark' ? (tr.themeStatusDark || 'Escuro') : (tr.themeStatusLight || 'Claro'); };
const updateThemeToggleButtonVisuals = (at) => { const si = document.querySelector('#theme-toggle-btn .fa-sun'); const mi = document.querySelector('#theme-toggle-btn .fa-moon'); if (si && mi) { si.style.opacity = at === 'dark' ? '0' : '1'; si.style.transform = at === 'dark' ? 'translateY(-10px)' : 'translateY(0)'; mi.style.opacity = at === 'dark' ? '1' : '0'; mi.style.transform = at === 'dark' ? 'translateY(0)' : 'translateY(10px)'; }};
const saveLanguage = (lang) => { localStorage.setItem('lang', lang); updateTranslations(lang); };
const loadLanguage = () => { const sl = localStorage.getItem('lang') || 'pt'; updateTranslations(sl); };
const updateLanguageStatusText = (al) => { const lts = document.getElementById('lang-toggle-btn')?.querySelector('span'); const ls = document.getElementById('lang-status'); if (lts) lts.textContent = al.toUpperCase(); if (ls) { const tp = translations.pt; const te = translations.en; if (tp && te) ls.textContent = al === 'pt' ? (tp.langStatusPT || 'PT') : (te.langStatusEN || 'EN'); }};
function displayUserName(lang) { const wm = document.getElementById('welcome-message'); const une = document.getElementById('user-name'); const tr = translations[lang]; let ui = null; try { const su = localStorage.getItem('usuarioLogado'); if (su) ui = JSON.parse(su); } catch (e) { console.error(e); } if (wm && une && tr) { const du = (lang === 'pt' ? 'Usuário' : 'User'); wm.textContent = tr.welcomeMessage || '?'; une.textContent = (ui && ui.nome) ? ui.nome : du; }};


// --- LÓGICA ORIGINAL DA PÁGINA (PRESERVADA E INTEGRADA) ---

// Função para exibir notificações (mantida)
function showNotification(messageKey, isSuccess = true, userName = '') {
    const notification = document.getElementById('notification');
    const lang = localStorage.getItem('lang') || 'pt';
    const trans = translations[lang];
    let message = trans[messageKey] || messageKey;

    if (messageKey === 'successSaida' && userName) {
        message = `${message} ${userName}`;
    }

    if (notification) {
        notification.textContent = message;
        notification.className = 'notification show ' + (isSuccess ? 'success' : 'error');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }
}

// Atualiza a hora e a data (mantida)
function updateTime() {
    const now = new Date();
    const timeEl = document.getElementById('currentTime');
    const dateEl = document.getElementById('currentDate');
    const lang = localStorage.getItem('lang') || 'pt';
    const locale = lang === 'pt' ? 'pt-BR' : 'en-US';

    if(timeEl) timeEl.textContent = now.toLocaleTimeString(locale);
    if(dateEl) dateEl.textContent = now.toLocaleDateString(locale);
}


// Exibe os dados do usuário no card (CORRIGIDO)
function displayUserData(user) {
    const infoCard = document.getElementById('dadosAluno');
    const placeholder = document.getElementById('placeholder-container');
    const confirmarBtn = document.getElementById('confirmarBtn');
    const crachaInput = document.getElementById('crachaInput');
    const scannerAnimation = document.getElementById('scannerAnimation');
    
    // NOVO: Captura a linguagem para tradução do label
    const lang = localStorage.getItem('lang') || 'pt'; 
    const trans = translations[lang];

    if (!infoCard || !placeholder || !confirmarBtn || !crachaInput || !scannerAnimation) return;

    infoCard.innerHTML = `
        <h3 style="color: #004b8d; margin-bottom: 0.5rem;">${user.nome || 'N/A'}</h3>
        <p><strong>ID:</strong> ${user.id || 'N/A'}</p>
        <p><strong>${trans.labelTurma}</strong> ${user.turma || 'N/A'}</p> `;
    placeholder.style.display = 'none';
    infoCard.style.display = 'block';
    confirmarBtn.disabled = false;
    crachaInput.value = user.id || '';
    scannerAnimation.style.display = 'none';
}

// Simula a leitura do crachá (mantida)
function simularLeituraCracha() {
    const lang = localStorage.getItem('lang') || 'pt';
    const usuarioLogado = getUsuarioLogado(); 

    if (!usuarioLogado || !usuarioLogado.id) {
        showNotification('notLoggedError', false);
        setTimeout(() => {
            window.location.href = '/index.html';
        }, 3000);
        return;
    }

    displayUserData(usuarioLogado);
}

// ### FUNÇÃO REGISTRAR SAÍDA ATUALIZADA ###
// Removemos a simulação de API (Promise, setTimeout, lastExit check)
// Agora ela apenas desloga e redireciona.
function registrarSaida() {
    const lang = localStorage.getItem('lang') || 'pt';
    const trans = translations[lang];
    const usuarioLogado = getUsuarioLogado();
    const confirmarBtn = document.getElementById('confirmarBtn');
    const confirmBtnTextSpan = document.getElementById('confirm-btn-text'); // Span do texto

    if (!usuarioLogado || !usuarioLogado.id) {
        showNotification('notLoggedError', false);
        setTimeout(() => window.location.href = '/index.html', 3000);
        return;
    }
    if (!confirmarBtn || !confirmBtnTextSpan) return; 

    // 1. Mudar visual para "Confirmando..."
    confirmarBtn.disabled = true;
    confirmBtnTextSpan.textContent = trans.confirmingBtnText; 
    confirmarBtn.querySelector('i')?.classList.replace('fa-check-circle', 'fa-spinner');
    confirmarBtn.querySelector('i')?.classList.add('fa-spin');

    // 2. Mostrar notificação de sucesso imediatamente
    showNotification('successSaida', true, usuarioLogado.nome);
    
    // 3. Remover o login do localStorage
    localStorage.removeItem('usuarioLogado'); 

    // 4. Redirecionar para o Início (Login) após 2 segundos
    setTimeout(() => {
        window.location.href = '/index.html';
    }, 2000); // 2 segundos para o usuário ler a notificação
}

// Pega usuário logado (mantida)
function getUsuarioLogado() {
    try {
        const usuario = localStorage.getItem("usuarioLogado");
        return usuario ? JSON.parse(usuario) : null;
    } catch (e) {
        console.error("Erro ao parsear usuarioLogado:", e);
        return null;
    }
}

// --- INICIALIZAÇÃO E EVENT LISTENERS ---
document.addEventListener("DOMContentLoaded", () => {
    // Referências
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('sidebar');
    const confirmarBtn = document.getElementById('confirmarBtn');
    const settingsBtn = document.getElementById('settings-btn');
    const themePopup = document.getElementById('theme-popup');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const langToggleBtn = document.getElementById('lang-toggle-btn');

    // Inicializa Tema e Idioma
    loadTheme();
    loadLanguage(); // Isso chama updateTranslations > displayUserName

    // Simula a leitura do crachá automaticamente ao carregar a página
    simularLeituraCracha();

    // Atualiza hora/data
    updateTime();
    const timerInterval = setInterval(updateTime, 1000); // Guarda o ID do intervalo

    // Evento Hamburger
    hamburgerBtn?.addEventListener('click', () => sidebar?.classList.toggle('active'));

    // Evento Botão Confirmar Saída
    confirmarBtn?.addEventListener('click', () => {
        clearInterval(timerInterval); // Para o relógio ao tentar sair
        registrarSaida(); // Chama a nova função (mais simples)
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

}); 