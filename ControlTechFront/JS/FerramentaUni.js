import { API_BASE_URL } from './apiConfig.js';

const translations = {
    'pt': {
        'pageTitle': 'Detalhes da Ferramenta - ControlTech',
        'sidebarTools': 'Ferramentas',
        'sidebarReturn': 'Devolver',
        'sidebarHelp': 'Ajuda',
        'sidebarHistory': 'Histórico',
        'sidebarExit': 'Sair',
        'sidebarSettings': 'Configurações',
        'labelDescricao': '<strong>Descrição:</strong>',
        'labelEstoque': '<strong>Estoque:</strong>',
        'btnVoltar': 'Voltar',
        'btnAssociar': 'Associar ao meu usuário',
        'statusDisponivel': '⚪ Disponível',
        'statusEmUso': '🟢 Em uso por: ',
        'popupSucesso': '✅ Ferramenta <strong>{ferramentaNome}</strong><br>Associada ao usuário: <strong>{usuarioNome}</strong>',
        'popupBtnFechar': 'Fechar',
        'erroCarregar': 'Erro ao carregar ferramenta',
        'erroFalhaAssociar': 'Falha ao associar.',
        'erroSessao': 'Sessão expirada. Faça login.',
        'settingsPopupTitle': 'Configurações',
        'themeLabel': 'Alternar Tema:',
        'themeStatusLight': 'Tema Claro',
        'themeStatusDark': 'Tema Escuro',
        'langLabel': 'Alternar Idioma:',
        'langStatusPT': 'Português',
        'langStatusEN': 'Inglês',
        'welcomeMessage': 'Olá,',
        'timeElapsedLabel': 'Tempo em Uso:',
        'timeDisplayInitial': '--:--:--',
    },
    'en': {
        'pageTitle': 'Tool Details - ControlTech',
        'sidebarTools': 'Tools',
        'sidebarReturn': 'Return',
        'sidebarHelp': 'Help',
        'sidebarHistory': 'History',
        'sidebarExit': 'Exit',
        'sidebarSettings': 'Settings',
        'labelDescricao': '<strong>Description:</strong>',
        'labelEstoque': '<strong>Stock:</strong>',
        'btnVoltar': 'Back',
        'btnAssociar': 'Associate to my user',
        'statusDisponivel': '⚪ Available',
        'statusEmUso': '🟢 In use by: ',
        'popupSucesso': '✅ Tool <strong>{ferramentaNome}</strong><br>Associated with user: <strong>{usuarioNome}</strong>',
        'popupBtnFechar': 'Close',
        'erroCarregar': 'Error loading tool',
        'erroFalhaAssociar': 'Failed to associate.',
        'erroSessao': 'Session expired. Please log in.',
        'settingsPopupTitle': 'Settings',
        'themeLabel': 'Toggle Theme:',
        'themeStatusLight': 'Light Theme',
        'themeStatusDark': 'Dark Theme',
        'langLabel': 'Toggle Language:',
        'langStatusPT': 'Portuguese',
        'langStatusEN': 'English',
        'welcomeMessage': 'Hello,',
        'timeElapsedLabel': 'Time in Use:',
        'timeDisplayInitial': '--:--:--',
    }
};

let cronometroIntervalId = null;

function formatarTempo(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds].map(t => t.toString().padStart(2, '0')).join(':');
}

function iniciarCronometro(timestampAssociacao) {
    const chronometerDisplay = document.getElementById('chronometer-display');
    const timeElapsedContainer = document.getElementById('time-elapsed');
    
    let dataAssociacao;

    // CORREÇÃO CRÍTICA: Lida com a serialização do Java (LocalDateTime como array)
    if (Array.isArray(timestampAssociacao) && timestampAssociacao.length >= 6) {
        // Formato Java: [ano, mes(1-12), dia, hora, minuto, segundo, nanosec]
        const [year, month, day, hour, minute, second] = timestampAssociacao;
        
        // Construtor JS Date: new Date(year, monthIndex(0-11), day, hour, minute, second, millisec)
        // Usa Date.UTC() e subtrai 1 do mês (mês é 0-indexado em JS) para garantir UTC
        dataAssociacao = new Date(Date.UTC(year, month - 1, day, hour, minute, second, 0));
        
    } else {
        // Lógica de fallback para strings (ISO 8601), incluindo a correção anterior de timezone
        let dateString = timestampAssociacao;
        if (typeof dateString === 'string' && dateString.slice(-1) !== 'Z' && dateString.indexOf('+') === -1) {
            dateString += 'Z'; 
        }
        dataAssociacao = new Date(dateString);
    }
    
    // VERIFICAÇÃO DE VALIDADE DA DATA
    if (isNaN(dataAssociacao.getTime())) {
        console.error("Data de associação inválida após correção:", timestampAssociacao);
        if (timeElapsedContainer && chronometerDisplay) {
            timeElapsedContainer.classList.remove('hidden');
            chronometerDisplay.textContent = 'ERRO DE DATA';
        }
        return; 
    }

    if (!chronometerDisplay || !timeElapsedContainer) return;

    if (cronometroIntervalId) clearInterval(cronometroIntervalId);
    
    function atualizarCronometro() {
        const now = new Date();
        const diffMs = now.getTime() - dataAssociacao.getTime();
        const diffSeconds = Math.floor(diffMs / 1000);
        
        if (diffSeconds < 0) {
            chronometerDisplay.textContent = '00:00:00'; 
            return; 
        } 
        
        chronometerDisplay.textContent = formatarTempo(diffSeconds);
    }

    atualizarCronometro();
    cronometroIntervalId = setInterval(atualizarCronometro, 1000);
    timeElapsedContainer.classList.remove('hidden');
}

const setText = (id, key, trans) => { const element = document.getElementById(id); if (element) element.textContent = trans[key] || ''; };
const setSpanText = (id, key, trans) => { const element = document.getElementById(id)?.querySelector('span'); if (element) element.textContent = trans[key] || ''; };
const setInnerHtml = (id, key, trans, args = {}) => {
    const element = document.getElementById(id);
    if (element) {
        let text = trans[key] || '';
        Object.keys(args).forEach(k => { text = text.replace(`{${k}}`, args[k]); });
        element.innerHTML = text;
    }
};

const updateTranslations = (lang) => {
    const currentLang = translations[lang] ? lang : 'pt';
    const trans = translations[currentLang];
    if (!trans) return console.error("Traduções não encontradas para:", currentLang);

    document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';
    document.title = trans.pageTitle || 'Ferramenta - ControlTech';

    setSpanText('nav-tools', 'sidebarTools', trans);
    setSpanText('nav-return', 'sidebarReturn', trans);
    setSpanText('nav-help', 'sidebarHelp', trans);
    setSpanText('nav-history', 'sidebarHistory', trans);
    setSpanText('nav-exit', 'sidebarExit', trans);
    setSpanText('settings-btn', 'sidebarSettings', trans);

    setInnerHtml('label-descricao', 'labelDescricao', trans); 
    setInnerHtml('label-estoque', 'labelEstoque', trans);    
    setText('btn-voltar-text', 'btnVoltar', trans);
    setText('btn-associar-text', 'btnAssociar', trans);
    setText('popup-btn-fechar', 'popupBtnFechar', trans);
    setText('time-elapsed-label', 'timeElapsedLabel', trans);
    setText('settings-popup-title', 'settingsPopupTitle', trans);
    setText('theme-label', 'themeLabel', trans);
    setText('lang-label', 'langLabel', trans);

    updateThemeStatusText(document.body.classList.contains('dark-theme') ? 'dark' : 'light', currentLang);
    updateLanguageStatusText(currentLang);
    displayUserName(currentLang);
    atualizarStatusDaFerramenta();
};

const saveTheme = (theme) => { localStorage.setItem('theme', theme); const cl = localStorage.getItem('lang') || 'pt'; updateThemeStatusText(theme, cl); updateThemeToggleButtonVisuals(theme); };
const loadTheme = () => { const st = localStorage.getItem('theme') || 'light'; const cl = localStorage.getItem('lang') || 'pt'; document.body.classList.toggle('dark-theme', st === 'dark'); updateThemeStatusText(st, cl); updateThemeToggleButtonVisuals(st); };
const updateThemeStatusText = (activeTheme, lang) => { const ts = document.getElementById('theme-status'); const tr = translations[lang]; if (ts && tr) { ts.textContent = activeTheme === 'dark' ? (tr.themeStatusDark || 'Tema Escuro') : (tr.themeStatusLight || 'Tema Claro'); }};
const updateThemeToggleButtonVisuals = (activeTheme) => { const si = document.querySelector('#theme-toggle-btn .fa-sun'); const mi = document.querySelector('#theme-toggle-btn .fa-moon'); if (si && mi) { si.style.opacity = activeTheme === 'dark' ? '0' : '1'; si.style.transform = activeTheme === 'dark' ? 'translateY(-10px)' : 'translateY(0)'; mi.style.opacity = activeTheme === 'dark' ? '1' : '0'; mi.style.transform = activeTheme === 'dark' ? 'translateY(0)' : 'translateY(10px)'; }};
const saveLanguage = (lang) => { localStorage.setItem('lang', lang); updateTranslations(lang); };
const loadLanguage = () => { const sl = localStorage.getItem('lang') || 'pt'; updateTranslations(sl); };
const updateLanguageStatusText = (activeLang) => { const lts = document.getElementById('lang-toggle-btn')?.querySelector('span'); const ls = document.getElementById('lang-status'); if (lts) lts.textContent = activeLang.toUpperCase(); if (ls) { const transPt = translations.pt; const transEn = translations.en; if (transPt && transEn) { ls.textContent = activeLang === 'pt' ? (transPt.langStatusPT || 'Português') : (transEn.langStatusEN || 'English'); }}};
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
};

function atualizarStatus(usuarioNome, dataAssociacao) { 
    const statusMsg = document.getElementById("statusMsg");
    const btnAssociar = document.getElementById("btnAssociar");
    const timeElapsedContainer = document.getElementById('time-elapsed');
    const lang = localStorage.getItem('lang') || 'pt';
    const trans = translations[lang];

    if (cronometroIntervalId) {
        clearInterval(cronometroIntervalId);
        cronometroIntervalId = null;
    }
    if(timeElapsedContainer) timeElapsedContainer.classList.add('hidden');

    if (usuarioNome) {
        if (statusMsg) statusMsg.innerHTML = `${trans.statusEmUso}<strong>${usuarioNome}</strong>`;
        if (statusMsg) statusMsg.style.color = "green"; 
        if (btnAssociar) btnAssociar.disabled = true; 
        if (dataAssociacao) iniciarCronometro(dataAssociacao);
    } else {
        if (statusMsg) statusMsg.innerHTML = trans.statusDisponivel;
        if (statusMsg) statusMsg.style.color = "gray"; 
        if (btnAssociar) btnAssociar.disabled = false; 
    }
}

async function atualizarStatusDaFerramenta() {
    const ferramentaId = new URLSearchParams(window.location.search).get("id");
    const lang = localStorage.getItem('lang') || 'pt';
    try {
        const res = await fetch(`${API_BASE_URL}/api/ferramentas/${ferramentaId}/usuario`);
        if (!res.ok) throw new Error("Erro");
        const usuarioStatus = await res.json(); 
        atualizarStatus(usuarioStatus.nome, usuarioStatus.dataAssociacao); 
    } catch (err) {
        atualizarStatus(null, null); 
    }
}

async function carregarFerramenta() {
    const ferramentaId = new URLSearchParams(window.location.search).get("id");
    const toolNome = document.getElementById("toolNome");
    const toolId = document.getElementById("toolId");
    const toolDescricao = document.getElementById("toolDescricao");
    const toolEstoque = document.getElementById("toolEstoque");
    const toolImage = document.getElementById("toolImage"); 
    const btnAssociar = document.getElementById("btnAssociar");
    const statusMsg = document.getElementById("statusMsg");
    const lang = localStorage.getItem('lang') || 'pt';
    const trans = translations[lang];

    try {
        const res = await fetch(`${API_BASE_URL}/api/ferramentas/${ferramentaId}`);
        if (!res.ok) throw new Error(trans.erroCarregar);

        const ferramenta = await res.json();

        if (toolNome) toolNome.textContent = ferramenta.nome;
        if (toolId) toolId.textContent = ferramenta.id;
        if (toolDescricao) toolDescricao.textContent = ferramenta.descricao || (lang === 'pt' ? 'Sem descrição' : 'No description');
        if (toolEstoque) toolEstoque.textContent = ferramenta.quantidadeEstoque;
        if (toolImage) toolImage.src = ferramenta.imagemUrl || '/img/tools.png'; 

        await atualizarStatusDaFerramenta();
        return ferramenta;
    } catch (err) {
        console.error("Erro:", err);
        if (toolNome) toolNome.textContent = trans.erroCarregar;
        if (statusMsg) statusMsg.textContent = err.message;
        if (btnAssociar) btnAssociar.disabled = true;
        return null;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const ferramentaId = params.get("id");
    const btnAssociar = document.getElementById("btnAssociar");
    const statusMsg = document.getElementById("statusMsg");
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('sidebar');
    const popup = document.getElementById("confirmationPopup");
    const closePopupBtn = document.getElementById("closePopupBtn");
    const settingsBtn = document.getElementById('settings-btn');
    const themePopup = document.getElementById('theme-popup');
    const closeSettingsPopupBtn = document.getElementById('close-popup-btn'); 
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const langToggleBtn = document.getElementById('lang-toggle-btn');

    loadTheme();
    loadLanguage(); 

    const lang = localStorage.getItem('lang') || 'pt';
    const trans = translations[lang];

    let usuarioLogado = null;
    try { usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")); } catch (e) {}

    const idUsuario = usuarioLogado?.id ?? usuarioLogado?.usuarioId;
    if (!idUsuario) {
        alert(trans.erroSessao);
        window.location.href = "/index.html";
        return;
    }

    let ferramenta = await carregarFerramenta();

    btnAssociar?.addEventListener("click", async () => {
        if (statusMsg) statusMsg.textContent = "";
        try {
            const assocRes = await fetch(`${API_BASE_URL}/api/ferramentas/associar/${ferramentaId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuarioId: idUsuario })
            });

            let resposta;
            try { resposta = await assocRes.json(); } catch { 
                const texto = await assocRes.text();
                throw new Error(lang === 'pt' ? "Resposta inválida do servidor: " + texto : "Invalid server response: " + texto);
            }

            if (!assocRes.ok) throw new Error(resposta.erro || trans.erroFalhaAssociar);

            setInnerHtml("popupMessage", "popupSucesso", trans, {
                ferramentaNome: resposta.ferramentaNome,
                usuarioNome: resposta.usuarioNome
            });
            popup.style.display = "flex";

            atualizarStatus(resposta.usuarioNome, resposta.dataAssociacao);
            ferramenta.usuarioNome = resposta.usuarioNome;

        } catch (err) {
            console.error(err);
            if (statusMsg) {
                statusMsg.textContent = `${lang === 'pt' ? 'Erro' : 'Error'}: ${err.message}`;
                statusMsg.style.color = "red";
            }
        }
    });
    
    closePopupBtn?.addEventListener("click", () => popup.style.display = "none");
    hamburgerBtn?.addEventListener('click', () => sidebar?.classList.toggle('active'));
    settingsBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        themePopup?.classList.toggle('visible');
        themePopup?.classList.toggle('hidden', !themePopup.classList.contains('visible'));
    });
    closeSettingsPopupBtn?.addEventListener('click', () => { 
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

    setInterval(atualizarStatusDaFerramenta, 5000);
});