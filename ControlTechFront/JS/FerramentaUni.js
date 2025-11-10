// Dicionário de traduções (Adaptado do Ferramenta.js)
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
        // NOVAS CHAVES
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
        // NOVAS CHAVES
        'timeElapsedLabel': 'Time in Use:',
        'timeDisplayInitial': '--:--:--',
    }
};

// --- FUNÇÕES DE UTILIDADE DE TEMA E IDIOMA ---

// Variável para armazenar o ID do intervalo do cronômetro
let cronometroIntervalId = null;

// NOVO: Função para formatar segundos em HH:MM:SS
function formatarTempo(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
        .map(t => t.toString().padStart(2, '0'))
        .join(':');
}

// NOVO: Função para iniciar o cronômetro
function iniciarCronometro(timestampAssociacao) {
    const chronometerDisplay = document.getElementById('chronometer-display');
    const timeElapsedContainer = document.getElementById('time-elapsed');
    const dataAssociacao = new Date(timestampAssociacao);

    if (!chronometerDisplay || !timeElapsedContainer) return;

    // 1. Limpa qualquer cronômetro anterior
    if (cronometroIntervalId) {
        clearInterval(cronometroIntervalId);
    }
    
    // 2. Função de atualização
    function atualizarCronometro() {
        const now = new Date();
        const diffMs = now.getTime() - dataAssociacao.getTime();
        const diffSeconds = Math.floor(diffMs / 1000);
        
        // Evita tempo negativo (caso data futura, embora não deva ocorrer)
        if (diffSeconds < 0) return; 

        chronometerDisplay.textContent = formatarTempo(diffSeconds);
    }

    // Executa a primeira vez imediatamente
    atualizarCronometro();
    
    // Inicia o intervalo de 1 segundo
    cronometroIntervalId = setInterval(atualizarCronometro, 1000);
    
    // Mostra o cronômetro
    timeElapsedContainer.classList.remove('hidden');
}


const setText = (id, key, trans) => {
    const element = document.getElementById(id);
    if (element) element.textContent = trans[key] || '';
    else console.warn(`Elemento ID '${id}' não encontrado.`);
};

const setSpanText = (id, key, trans) => {
    const element = document.getElementById(id)?.querySelector('span');
    if (element) element.textContent = trans[key] || '';
    else console.warn(`Span dentro do ID '${id}' não encontrado.`);
};

// FUNÇÃO CRÍTICA MOVIDA E CORRIGIDA: Agora acessível pelos event listeners.
const setInnerHtml = (id, key, trans, args = {}) => {
    const element = document.getElementById(id);
    if (element) {
        let text = trans[key] || '';
        Object.keys(args).forEach(k => {
            text = text.replace(`{${k}}`, args[k]);
        });
        element.innerHTML = text;
    }
};

const updateTranslations = (lang) => {
    const currentLang = translations[lang] ? lang : 'pt';
    const trans = translations[currentLang];
    if (!trans) return console.error("Traduções não encontradas para:", currentLang);

    document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';
    document.title = trans.pageTitle || 'Ferramenta - ControlTech';

    // Barra lateral
    setSpanText('nav-tools', 'sidebarTools', trans);
    setSpanText('nav-return', 'sidebarReturn', trans);
    setSpanText('nav-help', 'sidebarHelp', trans);
    setSpanText('nav-history', 'sidebarHistory', trans);
    setSpanText('nav-exit', 'sidebarExit', trans);
    setSpanText('settings-btn', 'sidebarSettings', trans);

    // Conteúdo Principal
    setInnerHtml('label-descricao', 'labelDescricao', trans); 
    setInnerHtml('label-estoque', 'labelEstoque', trans);    
    
    // CORREÇÃO DOS WARNINGS: Usando setText para elementos que são o <span> alvo
    setText('btn-voltar-text', 'btnVoltar', trans);
    setText('btn-associar-text', 'btnAssociar', trans);
    setText('popup-btn-fechar', 'popupBtnFechar', trans);

    // NOVO: Traduções do cronômetro
    setText('time-elapsed-label', 'timeElapsedLabel', trans);
    // setText('chronometer-display', 'timeDisplayInitial', trans); // Não é necessário traduzir o valor inicial, pois o cronômetro começa imediatamente

    // Popup Configurações
    setText('settings-popup-title', 'settingsPopupTitle', trans);
    setText('theme-label', 'themeLabel', trans);
    setText('lang-label', 'langLabel', trans);

    // Atualiza textos de status
    updateThemeStatusText(document.body.classList.contains('dark-theme') ? 'dark' : 'light', currentLang);
    updateLanguageStatusText(currentLang);
    displayUserName(currentLang);
    
    // Forçamos a atualização do status para que o cronômetro e a mensagem sejam traduzidos
    atualizarStatusDaFerramenta();
};

const saveTheme = (theme) => { localStorage.setItem('theme', theme); const cl = localStorage.getItem('lang') || 'pt'; updateThemeStatusText(theme, cl); updateThemeToggleButtonVisuals(theme); };
const loadTheme = () => { const st = localStorage.getItem('theme') || 'light'; const cl = localStorage.getItem('lang') || 'pt'; document.body.classList.toggle('dark-theme', st === 'dark'); updateThemeStatusText(st, cl); updateThemeToggleButtonVisuals(st); };
const updateThemeStatusText = (activeTheme, lang) => { const ts = document.getElementById('theme-status'); const tr = translations[lang]; if (ts && tr) { ts.textContent = activeTheme === 'dark' ? (tr.themeStatusDark || 'Tema Escuro') : (tr.themeStatusLight || 'Tema Claro'); }};
const updateThemeToggleButtonVisuals = (activeTheme) => { const si = document.querySelector('#theme-toggle-btn .fa-sun'); const mi = document.querySelector('#theme-toggle-btn .fa-moon'); if (si && mi) { si.style.opacity = activeTheme === 'dark' ? '0' : '1'; si.style.transform = activeTheme === 'dark' ? 'translateY(-10px)' : 'translateY(0)'; mi.style.opacity = activeTheme === 'dark' ? '1' : '0'; mi.style.transform = activeTheme === 'dark' ? 'translateY(0)' : 'translateY(10px)'; }};
const saveLanguage = (lang) => { localStorage.setItem('lang', lang); updateTranslations(lang); };
const loadLanguage = () => { const sl = localStorage.getItem('lang') || 'pt'; updateTranslations(sl); };
const updateLanguageStatusText = (activeLang) => { const lts = document.getElementById('lang-toggle-btn')?.querySelector('span'); const ls = document.getElementById('lang-status'); if (lts) lts.textContent = activeLang.toUpperCase(); if (ls) { const transPt = translations.pt; const transEn = translations.en; if (transPt && transEn) { ls.textContent = activeLang === 'pt' ? (transPt.langStatusPT || 'Português') : (transEn.langStatusEN || 'English'); }}};
function displayUserName(lang) { const wm = document.getElementById('welcome-message'); const une = document.getElementById('user-name'); const tr = translations[lang]; let userInfo = null; try { const su = localStorage.getItem('usuarioLogado'); if (su) userInfo = JSON.parse(su); } catch (e) { console.error("Erro ao ler usuarioLogado:", e); } if (wm && une && tr) { const du = (lang === 'pt' ? 'Usuário' : 'User'); wm.textContent = tr.welcomeMessage || (lang === 'pt' ? 'Olá,' : 'Hello,'); une.textContent = (userInfo && userInfo.nome) ? userInfo.nome : du; }};


// --- LÓGICA PRINCIPAL DA PÁGINA ---

// --- Função ATUALIZADA para atualizar status (traduzida e com cronômetro) ---
function atualizarStatus(usuarioNome, dataAssociacao) { // Recebe dataAssociacao
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
        
        // NOVO: Inicia o cronômetro se houver data de associação
        if (dataAssociacao) {
            iniciarCronometro(dataAssociacao);
        }
    } else {
        if (statusMsg) statusMsg.innerHTML = trans.statusDisponivel;
        if (statusMsg) statusMsg.style.color = "gray"; 
        if (btnAssociar) btnAssociar.disabled = false; 
    }
}

// --- Buscar usuário associado via GET (ATUALIZADA para pegar a data) ---
async function atualizarStatusDaFerramenta() {
    const ferramentaId = new URLSearchParams(window.location.search).get("id");
    const lang = localStorage.getItem('lang') || 'pt';
    try {
        const res = await fetch(`http://localhost:8080/api/ferramentas/${ferramentaId}/usuario`);
        if (!res.ok) throw new Error(lang === 'pt' ? "Erro ao buscar usuário da ferramenta" : "Error fetching tool user");
        
        // A API agora retorna UsuarioStatusDTO com dataAssociacao
        const usuarioStatus = await res.json(); 

        // Passa o nome e o timestamp para a função de atualização
        atualizarStatus(usuarioStatus.nome, usuarioStatus.dataAssociacao); 
    } catch (err) {
        console.error(err);
        // Em caso de erro de conexão, assume que não está em uso
        atualizarStatus(null, null); 
    }
}

// --- Carrega os dados da ferramenta (ATUALIZADA) ---
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
        const res = await fetch(`http://localhost:8080/api/ferramentas/${ferramentaId}`);
        if (!res.ok) throw new Error(trans.erroCarregar);

        const ferramenta = await res.json();

        // IMPLEMENTAÇÃO DAS VERIFICAÇÕES DE NULIDADE AQUI
        if (toolNome) toolNome.textContent = ferramenta.nome;
        if (toolId) toolId.textContent = ferramenta.id;
        if (toolDescricao) toolDescricao.textContent = ferramenta.descricao || (lang === 'pt' ? 'Sem descrição' : 'No description');
        if (toolEstoque) toolEstoque.textContent = ferramenta.quantidadeEstoque;
        if (toolImage) toolImage.src = ferramenta.imagemUrl || '/img/tools.png'; 

        // Atualiza status usando GET do usuário associado
        await atualizarStatusDaFerramenta();

        return ferramenta;
    } catch (err) {
        console.error("Erro ao carregar ferramenta:", err);
        // IMPLEMENTAÇÃO DAS VERIFICAÇÕES DE NULIDADE AQUI
        if (toolNome) toolNome.textContent = trans.erroCarregar;
        if (statusMsg) statusMsg.textContent = err.message;
        if (statusMsg) statusMsg.style.color = "red";
        if (btnAssociar) btnAssociar.disabled = true;
        return null;
    }
}


document.addEventListener("DOMContentLoaded", async () => {
    // Referências do HTML (incluindo as novas)
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

    
    // Inicializa Tema e Idioma (antes de carregar os dados)
    loadTheme();
    loadLanguage(); // Isso chama updateTranslations > displayUserName

    const lang = localStorage.getItem('lang') || 'pt';
    const trans = translations[lang];

    // --- Verifica usuário logado ---
    let usuarioLogado = null;
    try {
        usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    } catch (e) {
        console.error("Erro ao ler dados do usuário:", e);
    }

    const idUsuario = usuarioLogado?.id ?? usuarioLogado?.usuarioId;
    if (!idUsuario) {
        alert(trans.erroSessao);
        window.location.href = "/index.html";
        return;
    }

    let ferramenta = await carregarFerramenta();

    // --- Botão associar (ATUALIZADO para usar a data de associação do retorno) ---
    btnAssociar?.addEventListener("click", async () => {
        if (statusMsg) statusMsg.textContent = "";

        try {
            const assocRes = await fetch(`http://localhost:8080/api/ferramentas/associar/${ferramentaId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuarioId: idUsuario })
            });

            let resposta;
            try {
                // A API agora retorna um Map (JSON)
                resposta = await assocRes.json();
            } catch {
                const texto = await assocRes.text();
                throw new Error(lang === 'pt' ? "Resposta inválida do servidor: " + texto : "Invalid server response: " + texto);
            }

            if (!assocRes.ok) throw new Error(resposta.erro || trans.erroFalhaAssociar);

            // Usa a função setInnerHtml (agora global) para o popup
            setInnerHtml("popupMessage", "popupSucesso", trans, {
                ferramentaNome: resposta.ferramentaNome,
                usuarioNome: resposta.usuarioNome
            });
            popup.style.display = "flex";

            // Atualiza status imediatamente (usando o novo campo dataAssociacao)
            atualizarStatus(resposta.usuarioNome, resposta.dataAssociacao);
            ferramenta.usuarioNome = resposta.usuarioNome;

        } catch (err) {
            console.error("Erro ao associar:", err);
            if (statusMsg) {
                statusMsg.textContent = `${lang === 'pt' ? 'Erro' : 'Error'}: ${err.message}`;
                statusMsg.style.color = "red";
            }
        }
    });
    
    // --- Fechar popup de confirmação ---
    closePopupBtn?.addEventListener("click", () => {
        popup.style.display = "none";
    });

    // --- Eventos do Dashboard ---
    hamburgerBtn?.addEventListener('click', () => sidebar?.classList.toggle('active'));

    // Eventos Popup Configurações
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

    // --- Atualização automática a cada 5s ---
    setInterval(atualizarStatusDaFerramenta, 5000);
});