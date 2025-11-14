
// Dicionário de traduções
const translations = {
    'pt': {
        'pageTitle': 'Devolução de Itens - SENAI',
        'sidebarTools': 'Ferramentas',
        'sidebarReturn': 'Devolver',
        'sidebarHelp': 'Ajuda',
        'sidebarHistory': 'Histórico',
        'sidebarExit': 'Sair',
        'sidebarSettings': 'Configurações',
        'formTitle': 'Devolução de Itens',
        'labelIdFunc': 'ID do Funcionário:',
        'labelNomeFunc': 'Nome:',
        'labelData': 'Data:',
        'labelHorario': 'Horário:',
        'listaVazia': 'Nenhuma ferramenta associada a este usuário.',
        'btnDevolver': 'Devolver',
        'obsPlaceholder': 'Observações (opcional)',
        'modalText': 'Tem certeza que deseja devolver esta ferramenta?',
        'modalBtnSim': 'Sim',
        'modalBtnCancelar': 'Cancelar',
        'msgSucessoDevolucao': 'Devolução registrada com sucesso!',
        'msgErroDevolver': 'Erro ao devolver a ferramenta.',
        'msgErroCarregar': 'Erro ao carregar ferramentas.',
        'msgNaoLogado': 'Faça login para ver suas ferramentas.',
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
        'pageTitle': 'Item Return - SENAI',
        'sidebarTools': 'Tools',
        'sidebarReturn': 'Return',
        'sidebarHelp': 'Help',
        'sidebarHistory': 'History',
        'sidebarExit': 'Exit',
        'sidebarSettings': 'Settings',
        'formTitle': 'Item Return',
        'labelIdFunc': 'Employee ID:',
        'labelNomeFunc': 'Name:',
        'labelData': 'Date:',
        'labelHorario': 'Time:',
        'listaVazia': 'No tools associated with this user.',
        'btnDevolver': 'Return',
        'obsPlaceholder': 'Observations (optional)',
        'modalText': 'Are you sure you want to return this tool?',
        'modalBtnSim': 'Yes',
        'modalBtnCancelar': 'Cancel',
        'msgSucessoDevolucao': 'Return registered successfully!',
        'msgErroDevolver': 'Error returning the tool.',
        'msgErroCarregar': 'Error loading tools.',
        'msgNaoLogado': 'Log in to see your tools.',
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
    if (!trans) return console.error("Traduções não encontradas para:", currentLang);

    document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';
    document.title = trans.pageTitle || 'Devolução - SENAI';

    const setText = (id, key) => {
        const element = document.getElementById(id);
        if (element) element.textContent = trans[key] || '';
        else console.warn(`Elemento ID '${id}' não encontrado.`);
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
    setText('form-title', 'formTitle');
    setText('label-id-func', 'labelIdFunc');
    setText('label-nome-func', 'labelNomeFunc');
    setText('label-data', 'labelData');
    setText('label-horario', 'labelHorario');

    // Modal
    setText('modal-text', 'modalText');
    setText('confirmBtn', 'modalBtnSim');
    setText('cancelBtn', 'modalBtnCancelar');

    // Popup Configurações
    setText('settings-popup-title', 'settingsPopupTitle');
    setText('theme-label', 'themeLabel');
    setText('lang-label', 'langLabel');

    // Atualiza textos de status
    updateThemeStatusText(document.body.classList.contains('dark-theme') ? 'dark' : 'light', currentLang);
    updateLanguageStatusText(currentLang);
    displayUserName(currentLang);

    // Recarrega lista de ferramentas para traduzir botões/placeholders
    const usuario = getUsuarioLogado();
    if (usuario && typeof carregarFerramentas === 'function') {
        carregarFerramentas(usuario.id);
    } else {
        // Limpa a lista ou mostra mensagem se não estiver logado
        const lista = document.getElementById("listaFerramentas");
        if (lista) lista.innerHTML = `<div class="lista-vazia">${trans.msgNaoLogado}</div>`;
    }
};

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

// --- LÓGICA PRINCIPAL DA PÁGINA ---

const BASE_URL = "http://localhost:8080/api/ferramentas"; // URL base da API

// Pega usuário logado (se houver)
function getUsuarioLogado() {
    try {
        const usuario = localStorage.getItem("usuarioLogado");
        return usuario ? JSON.parse(usuario) : null;
    } catch (e) {
        console.error("Erro ao parsear usuarioLogado:", e);
        return null;
    }
}

// Preenche data e hora atuais na info box
function preencherDataHora() {
    const agora = new Date();
    const dataEl = document.getElementById("dataAtual");
    const horaEl = document.getElementById("horaAtual");
    if (dataEl) dataEl.textContent = agora.toLocaleDateString('pt-BR');
    if (horaEl) horaEl.textContent = agora.toLocaleTimeString('pt-BR');
}

// Mostra informações do usuário e carrega suas ferramentas
function exibirUsuarioLogado(usuario) {
    const funcIdEl = document.getElementById("funcId");
    const funcNomeEl = document.getElementById("funcNome");
    const infoUsuarioDiv = document.getElementById("infoUsuario");

    if (funcIdEl) funcIdEl.textContent = usuario.id;
    if (funcNomeEl) funcNomeEl.textContent = usuario.nome;
    preencherDataHora(); // Atualiza data/hora

    if (infoUsuarioDiv) infoUsuarioDiv.classList.remove("hidden");

    // Chama a função para carregar as ferramentas DESTE usuário
    if (typeof carregarFerramentas === 'function') {
        carregarFerramentas(usuario.id);
    }
}

// Carrega e exibe a lista de ferramentas associadas ao usuário
function carregarFerramentas(usuarioId) {
    const lista = document.getElementById("listaFerramentas");
    const currentLang = localStorage.getItem('lang') || 'pt';
    const trans = translations[currentLang];

    if (!lista || !trans) return console.error("Elemento #listaFerramentas ou traduções não encontrados.");

    // Faz a requisição à API para buscar ferramentas do usuário
    fetch(`${BASE_URL}/usuario/${usuarioId}`)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
            return res.json();
        })
        .then(ferramentas => {
            lista.innerHTML = ""; // Limpa a lista anterior

            if (!ferramentas || ferramentas.length === 0) {
                // Mostra mensagem se não houver ferramentas
                lista.innerHTML = `<div class="lista-vazia">${trans.listaVazia}</div>`;
                lista.classList.remove("hidden"); // Garante que a mensagem seja visível
                return;
            }

            // Cria um card para cada ferramenta
            ferramentas.forEach(f => {
                const div = document.createElement("div");
                div.className = "ferramenta-item";

                // Formata data de empréstimo (se existir)
                const dataPegoFormatada = f.dataPego // Assumindo que a API retorna 'dataPego'
                    ? new Date(f.dataPego).toLocaleString('pt-BR')
                    : (currentLang === 'pt' ? 'Não registrado' : 'Not recorded');

                // Cria o HTML do card
                div.innerHTML = `
                    <p><strong>ID:</strong> ${f.ferramentaId || 'N/A'}</p>
                    <p><strong>Nome:</strong> ${f.ferramentaNome || (currentLang === 'pt' ? 'Nome Ind.' : 'Name Unav.')}</p>
                    <p class="obs-container">
                       <label for="obs-${f.ferramentaId}" class="sr-only">Observações</label> <input type="text" id="obs-${f.ferramentaId}" class="obsInput" placeholder="${trans.obsPlaceholder}">
                    </p>
                    <button class="btnDevolver" data-id="${f.ferramentaId}">${trans.btnDevolver}</button>
                `;
                lista.appendChild(div);
            });

            lista.classList.remove("hidden"); // Mostra a lista
            ativarModalBotoes(); // Ativa os botões "Devolver" dos cards
        })
        .catch(err => {
            console.error("Erro ao carregar ferramentas:", err);
            lista.innerHTML = `<p class="mensagem msg-error">${trans.msgErroCarregar}</p>`; // Mostra erro
            lista.classList.remove("hidden");
        });
}


// --- LÓGICA DO MODAL DE CONFIRMAÇÃO ---
let ferramentaParaDevolver = null; // Guarda referência ao botão clicado

// Adiciona listener aos botões "Devolver" da lista
function ativarModalBotoes() {
    document.querySelectorAll(".btnDevolver").forEach(btn => {
        // Remove listener antigo para evitar duplicação (caso a lista seja recarregada)
        btn.replaceWith(btn.cloneNode(true));
    });
     // Adiciona listener aos botões clonados
    document.querySelectorAll(".btnDevolver").forEach(btn => {
        btn.addEventListener("click", function () {
            ferramentaParaDevolver = this; // Guarda o botão que foi clicado
            const modal = document.getElementById("confirmModal");
            if (modal) modal.classList.remove("hidden"); // Mostra o modal
        });
    });
}

// Evento do botão "Sim" do modal
document.getElementById("confirmBtn")?.addEventListener("click", function () {
    if (!ferramentaParaDevolver) return; // Sai se não houver botão guardado

    const ferramentaId = ferramentaParaDevolver.dataset.id;
    // Pega o input de observações DENTRO do card pai do botão
    const parentCard = ferramentaParaDevolver.closest('.ferramenta-item');
    const observacoesInput = parentCard?.querySelector(".obsInput");
    const observacoes = observacoesInput?.value.trim() || ""; // Pega valor ou string vazia
    const currentLang = localStorage.getItem('lang') || 'pt';
    const trans = translations[currentLang];
    const mensagemDiv = document.getElementById("mensagem");

    // Mostra mensagem de processando (opcional)
    if(mensagemDiv) {
        mensagemDiv.textContent = currentLang === 'pt' ? 'Processando devolução...' : 'Processing return...';
        mensagemDiv.className = 'mensagem info'; // Use uma classe CSS 'info' se tiver
        mensagemDiv.classList.remove('hidden');
    }

    // Faz a requisição POST para a API de devolução
    fetch(`${BASE_URL}/${ferramentaId}/devolver?observacoes=${encodeURIComponent(observacoes)}`, { method: "POST" })
        .then(async res => { // Usa async para poder ler o corpo do erro
            if (!res.ok) {
                 // Tenta ler a mensagem de erro do backend
                let errorMsg = trans.msgErroDevolver;
                try {
                    const errorText = await res.text();
                    if(errorText) errorMsg += `: ${errorText}`;
                } catch(e) {/* Ignora erro ao ler corpo */}
                throw new Error(errorMsg); // Lança erro com a mensagem
            }
            return res.text(); // Pega a mensagem de sucesso do backend
        })
        .then(msg => { // Sucesso
            if (mensagemDiv) {
                mensagemDiv.textContent = msg || trans.msgSucessoDevolucao; // Usa msg da API ou tradução
                mensagemDiv.className = "mensagem msg-success";
            }
            // Remove o card da ferramenta devolvida da lista
            parentCard?.remove();

            // Verifica se a lista ficou vazia após remover o item
            const lista = document.getElementById("listaFerramentas");
            if (lista && lista.children.length === 0) {
                 lista.innerHTML = `<div class="lista-vazia">${trans.listaVazia}</div>`;
            }
        })
        .catch(err => { // Erro
            console.error("Erro na devolução:", err);
            if (mensagemDiv) {
                mensagemDiv.textContent = err.message; // Mostra mensagem de erro específica
                mensagemDiv.className = "mensagem msg-error";
            }
        })
        .finally(() => { // Sempre executa, mesmo com erro
            const modal = document.getElementById("confirmModal");
            if (modal) modal.classList.add("hidden"); // Esconde o modal
            ferramentaParaDevolver = null; // Limpa a referência
        });
});

// Evento do botão "Cancelar" do modal
document.getElementById("cancelBtn")?.addEventListener("click", function () {
    const modal = document.getElementById("confirmModal");
    if (modal) modal.classList.add("hidden"); // Esconde o modal
    ferramentaParaDevolver = null; // Limpa a referência
});


// --- INICIALIZAÇÃO GERAL ---
document.addEventListener("DOMContentLoaded", () => {
    // Referências
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('sidebar');
    const mensagemDiv = document.getElementById("mensagem");
    const settingsBtn = document.getElementById('settings-btn');
    const themePopup = document.getElementById('theme-popup');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const langToggleBtn = document.getElementById('lang-toggle-btn');

    // Inicializa Tema e Idioma
    loadTheme();
    loadLanguage(); // Isso chama updateTranslations > displayUserName > carregarFerramentas

    // Evento Hamburger
    hamburgerBtn?.addEventListener('click', () => sidebar?.classList.toggle('active'));

    // Verifica se está logado e exibe info/lista
    const usuarioLogado = getUsuarioLogado();
    if (usuarioLogado) {
        exibirUsuarioLogado(usuarioLogado);
    } else {
        // Mostra mensagem se não estiver logado
        const currentLang = localStorage.getItem('lang') || 'pt';
        const trans = translations[currentLang];
        if (mensagemDiv && trans) {
            mensagemDiv.textContent = trans.msgNaoLogado;
            mensagemDiv.className = "mensagem msg-error";
            mensagemDiv.classList.remove('hidden');
        }
        // Garante que a lista esteja visível para mostrar a mensagem
        const lista = document.getElementById("listaFerramentas");
        if(lista) lista.classList.remove("hidden");
    }

    // Eventos do Popup de Configurações
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
        saveTheme(isDark ? 'light' : 'dark'); // Salva e atualiza visual
        document.body.classList.toggle('dark-theme'); // Aplica a classe ao body
    });
    langToggleBtn?.addEventListener('click', () => {
        const currentLang = localStorage.getItem('lang') || 'pt';
        saveLanguage(currentLang === 'pt' ? 'en' : 'pt'); // Salva e atualiza UI
    });

}); // Fim do DOMContentLoaded
