import { API_BASE_URL } from './apiConfig.js';

const translations = {
    'pt': {
        'pageTitle': 'Ajuda - SENAI ControlTech',
        'sidebarAbout': 'Início', 
        'sidebarTools': 'Ferramentas',
        'sidebarReturn': 'Devolver',
        'sidebarHelp': 'Ajuda',
        'sidebarHistory': 'Histórico',
        'sidebarChatBot': 'ChatBot', 
        'sidebarExit': 'Sair',
        'sidebarSettings': 'Configurações',
        'formTitle': 'Devolução de Itens',
        'labelIdFunc': 'ID do Funcionário:',
        'labelNomeFunc': 'Nome:',
        'labelData': 'Data:',
        'labelHorario': 'Horário:',
        'listaVazia': 'Nenhuma ferramenta associada a este usuário.',
        'btnDevolver': 'Devolver',
        'obsPlaceholder': 'Observações (Obrigatório)',
        'modalText': 'Tem certeza que deseja devolver esta ferramenta?',
        'modalBtnSim': 'Sim',
        'modalBtnCancelar': 'Cancelar',
        'msgSucessoDevolucao': 'Devolução registrada com sucesso!',
        'msgErroDevolver': 'Erro ao devolver a ferramenta.',
        'msgErroCarregar': 'Erro ao carregar ferramentas.',
        'msgNaoLogado': 'Faça login para ver suas ferramentas.',
        'msgObsObrigatoria': 'Por favor, preencha o campo de observações.',
        'tituloAviso': 'Campo Obrigatório',
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
        'sidebarAbout': 'Home', 
        'sidebarTools': 'Tools',
        'sidebarReturn': 'Return',
        'sidebarHelp': 'Help',
        'sidebarHistory': 'History',
        'sidebarChatBot': 'ChatBot', 
        'sidebarExit': 'Exit',
        'sidebarSettings': 'Settings',
        'formTitle': 'Item Return',
        'labelIdFunc': 'Employee ID:',
        'labelNomeFunc': 'Name:',
        'labelData': 'Date:',
        'labelHorario': 'Time:',
        'listaVazia': 'No tools associated with this user.',
        'btnDevolver': 'Return',
        'obsPlaceholder': 'Observations (Mandatory)',
        'modalText': 'Are you sure you want to return this tool?',
        'modalBtnSim': 'Yes',
        'modalBtnCancelar': 'Cancel',
        'msgSucessoDevolucao': 'Return registered successfully!',
        'msgErroDevolver': 'Error returning the tool.',
        'msgErroCarregar': 'Error loading tools.',
        'msgNaoLogado': 'Log in to see your tools.',
        'msgObsObrigatoria': 'Please fill in the observations field.',
        'tituloAviso': 'Mandatory Field',
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

const updateTranslations = (lang) => {
    const currentLang = translations[lang] ? lang : 'pt';
    const trans = translations[currentLang];
    if (!trans) return;

    document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';
    document.title = trans.pageTitle || 'Devolução - SENAI';

    const setText = (id, key) => { const e = document.getElementById(id); if (e) e.textContent = trans[key] || ''; };
    const setSpanText = (id, key) => { const e = document.getElementById(id)?.querySelector('span'); if (e) e.textContent = trans[key] || ''; };

    setSpanText('nav-tools', 'sidebarTools');
    setSpanText('nav-return', 'sidebarReturn');
    setSpanText('nav-help', 'sidebarHelp');
    setSpanText('nav-history', 'sidebarHistory');
    setSpanText('nav-exit', 'sidebarExit');
    setSpanText('settings-btn', 'sidebarSettings');

    setText('form-title', 'formTitle');
    setText('label-id-func', 'labelIdFunc');
    setText('label-nome-func', 'labelNomeFunc');
    setText('label-data', 'labelData');
    setText('label-horario', 'labelHorario');
    setText('modal-text', 'modalText');
    setText('confirmBtn', 'modalBtnSim');
    setText('cancelBtn', 'modalBtnCancelar');
    setText('settings-popup-title', 'settingsPopupTitle');
    setText('theme-label', 'themeLabel');
    setText('lang-label', 'langLabel');

    updateThemeStatusText(document.body.classList.contains('dark-theme') ? 'dark' : 'light', currentLang);
    updateLanguageStatusText(currentLang);
    displayUserName(currentLang);

    const usuario = getUsuarioLogado();
    if (usuario && typeof carregarFerramentas === 'function') {
        carregarFerramentas(usuario.id);
    } else {
        const lista = document.getElementById("listaFerramentas");
        if (lista) lista.innerHTML = `<div class="lista-vazia">${trans.msgNaoLogado}</div>`;
    }
};

const saveTheme = (theme) => { localStorage.setItem('theme', theme); const cl = localStorage.getItem('lang') || 'pt'; updateThemeStatusText(theme, cl); updateThemeToggleButtonVisuals(theme); };
const loadTheme = () => { const savedTheme = localStorage.getItem('theme') || 'light'; const currentLang = localStorage.getItem('lang') || 'pt'; document.body.classList.toggle('dark-theme', savedTheme === 'dark'); updateThemeStatusText(savedTheme, currentLang); updateThemeToggleButtonVisuals(savedTheme); };
const updateThemeStatusText = (at, l) => { const ts = document.getElementById('theme-status'); const tr = translations[l]; if (ts && tr) ts.textContent = at === 'dark' ? (tr.themeStatusDark || 'Escuro') : (tr.themeStatusLight || 'Claro'); };
const updateThemeToggleButtonVisuals = (at) => { const si = document.querySelector('#theme-toggle-btn .fa-sun'); const mi = document.querySelector('#theme-toggle-btn .fa-moon'); if (si && mi) { si.style.opacity = at === 'dark' ? '0' : '1'; si.style.transform = at === 'dark' ? 'translateY(-10px)' : 'translateY(0)'; mi.style.opacity = at === 'dark' ? '1' : '0'; mi.style.transform = at === 'dark' ? 'translateY(0)' : 'translateY(10px)'; }};
const saveLanguage = (lang) => { localStorage.setItem('lang', lang); updateTranslations(lang); };
const loadLanguage = () => { const savedLang = localStorage.getItem('lang') || 'pt'; updateTranslations(savedLang); };
const updateLanguageStatusText = (al) => { const lts = document.getElementById('lang-toggle-btn')?.querySelector('span'); const ls = document.getElementById('lang-status'); if (lts) lts.textContent = al.toUpperCase(); if (ls) { const tp = translations.pt; const te = translations.en; if (tp && te) ls.textContent = al.toUpperCase() === 'PT' ? (tp.langStatusPT || 'Português') : (te.langStatusEN || 'English'); }};
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

// --- LÓGICA PRINCIPAL ---

const BASE_URL = `${API_BASE_URL}/api/ferramentas`; 

function showAlert(titulo, mensagem) {
    const modal = document.getElementById('alertModal');
    const titleEl = document.getElementById('alertTitle');
    const msgEl = document.getElementById('alertMessage');
    const btnOk = document.getElementById('btnAlertOk');

    if (modal && titleEl && msgEl) {
        titleEl.textContent = titulo;
        msgEl.textContent = mensagem;
        modal.classList.remove('hidden'); 
        
        const fechar = () => modal.classList.add('hidden');
        if (btnOk) btnOk.onclick = fechar;
    
        modal.onclick = (e) => { 
             if (e.target === modal) fechar(); 
        };
    } else {
        alert(`${titulo}\n\n${mensagem}`);
    }
}

function getUsuarioLogado() {
    try {
        const usuario = localStorage.getItem("usuarioLogado");
        return usuario ? JSON.parse(usuario) : null;
    } catch (e) {
        console.error("Erro ao parsear usuarioLogado:", e);
        return null;
    }
}

function preencherDataHora() {
    const agora = new Date();
    const dataEl = document.getElementById("dataAtual");
    const horaEl = document.getElementById("horaAtual");
    if (dataEl) dataEl.textContent = agora.toLocaleDateString('pt-BR');
    if (horaEl) horaEl.textContent = agora.toLocaleTimeString('pt-BR');
}

function exibirUsuarioLogado(usuario) {
    const funcIdEl = document.getElementById("funcId");
    const funcNomeEl = document.getElementById("funcNome");
    const infoUsuarioDiv = document.getElementById("infoUsuario");

    if (funcIdEl) funcIdEl.textContent = usuario.id;
    if (funcNomeEl) funcNomeEl.textContent = usuario.nome;
    preencherDataHora(); 

    if (infoUsuarioDiv) infoUsuarioDiv.classList.remove("hidden");

    if (typeof carregarFerramentas === 'function') {
        carregarFerramentas(usuario.id);
    }
}

function carregarFerramentas(usuarioId) {
    const lista = document.getElementById("listaFerramentas");
    const currentLang = localStorage.getItem('lang') || 'pt';
    const trans = translations[currentLang];

    if (!lista || !trans) return console.error("Elemento #listaFerramentas ou traduções não encontrados.");

    fetch(`${BASE_URL}/usuario/${usuarioId}`)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
            return res.json();
        })
        .then(ferramentas => {
            lista.innerHTML = ""; 

            if (!ferramentas || ferramentas.length === 0) {
                lista.innerHTML = `<div class="lista-vazia">${trans.listaVazia}</div>`;
                lista.classList.remove("hidden");
                return;
            }

            ferramentas.forEach(f => {
                const div = document.createElement("div");
                div.className = "ferramenta-item";

                div.innerHTML = `
                <p><i class="fas fa-hashtag icon-sm"></i> <strong>ID:</strong> ${f.ferramentaId || 'N/A'}</p>
                <p><i class="fas fa-tag icon-sm"></i> <strong>Nome:</strong> ${f.ferramentaNome || (currentLang === 'pt' ? 'Nome Ind.' : 'Name Unav.')}</p>
                <p class="obs-container">
                    <label for="obs-${f.ferramentaId}" class="sr-only"><i class="fas fa-comment-alt icon-sm"></i> Observações</label> 
                    <input type="text" id="obs-${f.ferramentaId}" class="obsInput" placeholder="${trans.obsPlaceholder}" required>
                </p>
                <button class="btnDevolver" data-id="${f.ferramentaId}">${trans.btnDevolver}</button>
            `;
                lista.appendChild(div);
            });

            lista.classList.remove("hidden");
            ativarModalBotoes();
        })
        .catch(err => {
            console.error("Erro ao carregar ferramentas:", err);
            lista.innerHTML = `<p class="mensagem msg-error">${trans.msgErroCarregar}</p>`;
            lista.classList.remove("hidden");
        });
}

let ferramentaParaDevolver = null;

function ativarModalBotoes() {
    document.querySelectorAll(".btnDevolver").forEach(btn => {
        btn.replaceWith(btn.cloneNode(true));
    });
    
    document.querySelectorAll(".btnDevolver").forEach(btn => {
        // CORREÇÃO 1: Validação da observação antes de abrir o modal (evita loop)
        btn.addEventListener("click", function () {
            const parentCard = this.closest('.ferramenta-item');
            const observacoesInput = parentCard?.querySelector(".obsInput");
            const observacoes = observacoesInput?.value.trim() || "";
            const currentLang = localStorage.getItem('lang') || 'pt';
            const trans = translations[currentLang];
            
            if (!observacoes) {
                const titulo = trans.tituloAviso || "Campo Obrigatório";
                const mensagem = trans.msgObsObrigatoria || "A descrição é obrigatória.";
                showAlert(titulo, mensagem);
                
                if (observacoesInput) {
                    observacoesInput.style.border = "2px solid red";
                    observacoesInput.addEventListener('input', function() {
                        this.style.border = "";
                    }, { once: true });
                    setTimeout(() => observacoesInput.focus(), 100);
                }
                return; // Sai sem abrir o modal
            }

            // Se a observação estiver preenchida, procede para o modal de confirmação
            ferramentaParaDevolver = this; 
            const modal = document.getElementById("confirmModal");
            if (modal) modal.classList.remove("hidden"); 
        });
    });
}

document.getElementById("confirmBtn")?.addEventListener("click", function () {
    if (!ferramentaParaDevolver) return;

    const ferramentaId = ferramentaParaDevolver.dataset.id;
    const parentCard = ferramentaParaDevolver.closest('.ferramenta-item');
    const observacoesInput = parentCard?.querySelector(".obsInput");
    const observacoes = observacoesInput?.value.trim() || "";
    
    const currentLang = localStorage.getItem('lang') || 'pt';
    const trans = translations[currentLang];
    const mensagemDiv = document.getElementById("mensagem");

    // Validação duplicada, mas mantida por segurança.
     if (!observacoes) {
         const modal = document.getElementById("confirmModal");
         if (modal) modal.classList.add("hidden");
         ferramentaParaDevolver = null;
         showAlert(trans.tituloAviso, trans.msgObsObrigatoria);
         return;
     }


    if(mensagemDiv) {
        mensagemDiv.textContent = currentLang === 'pt' ? 'Processando devolução...' : 'Processing return...';
        mensagemDiv.className = 'mensagem info';
        mensagemDiv.classList.remove('hidden');
    }

    const modal = document.getElementById("confirmModal");
    if (modal) modal.classList.add("hidden");

    fetch(`${BASE_URL}/${ferramentaId}/devolver?observacoes=${encodeURIComponent(observacoes)}`, { method: "POST" })
        .then(async res => {
            if (!res.ok) {
                let errorMsg = trans.msgErroDevolver;
                try {
                    const errorText = await res.text();
                    if(errorText) errorMsg += `: ${errorText}`;
                } catch(e) {}
                throw new Error(errorMsg);
            }
            
            // CORREÇÃO 2: Decodificação robusta para UTF-8, garantindo a acentuação no frontend.
            const arrayBuffer = await res.arrayBuffer();
            const decoder = new TextDecoder('utf-8');
            const decodedMsg = decoder.decode(arrayBuffer);
            return decodedMsg; // Retorna o texto corretamente decodificado
        })
        .then(msg => {
            if (mensagemDiv) {
                mensagemDiv.textContent = msg || trans.msgSucessoDevolucao;
                mensagemDiv.className = "mensagem msg-success";
            }
            parentCard?.remove();
            const lista = document.getElementById("listaFerramentas");
            if (lista && lista.children.length === 0) {
                 lista.innerHTML = `<div class="lista-vazia">${trans.listaVazia}</div>`;
            }
        })
        .catch(err => {
            console.error("Erro na devolução:", err);
            if (mensagemDiv) {
                mensagemDiv.textContent = err.message;
                mensagemDiv.className = "mensagem msg-error";
            }
        })
        .finally(() => {
            ferramentaParaDevolver = null;
        });
});

document.getElementById("cancelBtn")?.addEventListener("click", function () {
    const modal = document.getElementById("confirmModal");
    if (modal) modal.classList.add("hidden");
    ferramentaParaDevolver = null;
});

document.addEventListener("DOMContentLoaded", () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('sidebar');
    const settingsBtn = document.getElementById('settings-btn');
    const themePopup = document.getElementById('theme-popup');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const langToggleBtn = document.getElementById('lang-toggle-btn');

    loadTheme();
    loadLanguage();

    // --- LISTENER DO HAMBURGUER ---
    hamburgerBtn?.addEventListener('click', () => sidebar?.classList.toggle('active'));

    const usuarioLogado = getUsuarioLogado();
    if (usuarioLogado) {
        exibirUsuarioLogado(usuarioLogado);
    } else {
        const currentLang = localStorage.getItem('lang') || 'pt';
        const trans = translations[currentLang];
        const mensagemDiv = document.getElementById("mensagem");
        if (mensagemDiv && trans) {
            mensagemDiv.textContent = trans.msgNaoLogado;
            mensagemDiv.className = "mensagem msg-error";
            mensagemDiv.classList.remove('hidden');
        }
        const lista = document.getElementById("listaFerramentas");
        if(lista) lista.classList.remove("hidden");
    }

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