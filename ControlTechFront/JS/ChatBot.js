// --- Dicionário de traduções ---
const translations = {
    'pt': {
        'pageTitle': 'ChatBot - SENAI ControlTech',
        'sidebarTools': 'Ferramentas',
        'sidebarReturn': 'Devolver',
        'sidebarHelp': 'Ajuda',
        'sidebarChatBot': 'ChatBot', 
        'sidebarHistory': 'Histórico',
        'sidebarExit': 'Sair',
        'sidebarSettings': 'Configurações',
        'settingsPopupTitle': 'Configurações',
        'themeLabel': 'Alternar Tema:',
        'themeStatusLight': 'Tema Claro',
        'themeStatusDark': 'Tema Escuro',
        'langLabel': 'Alternar Idioma:',
        'langStatusPT': 'Português',
        'langStatusEN': 'Inglês',
        'welcomeMessage': 'Olá,',
        // NOVAS STRINGS PARA O MODAL
        'clearModalTitle': 'Confirmar Exclusão',
        'clearModalMessage': 'Tem certeza que deseja limpar o histórico do chat? Esta ação não pode ser desfeita.',
        'clearConfirmBtn': 'Sim, Limpar',
        'clearCancelBtn': 'Cancelar',
        // FIM NOVAS STRINGS
        'botInitialMessage': 'Olá! Sou o Assistente Virtual do ControlTech. Sou especialista nas regras e no funcionamento do sistema. Em que posso te ajudar hoje?',
        'botMsgs': {
            'helpHappy': "Fico feliz em ajudar com a sua gestão de ferramentas! Se precisar de mais detalhes ou tiver novas dúvidas sobre o ControlTech, estou à disposição.",
            
            // TÓPICO: Sobre o Projeto
            'projectInfo': "O **ControlTech** é um sistema completo de gerenciamento de ativos (ferramentas e componentes) desenvolvido para o ambiente SENAI. Nosso objetivo é fornecer **rastreabilidade total** sobre os empréstimos e devoluções, garantindo a organização e reduzindo o extravio de materiais.",
            
            // TÓPICO: Prazo
            'prazoInfo': "O **prazo de devolução** padrão é de **7 dias** após a retirada, conforme as regras estabelecidas. O sistema é configurado para notificar o usuário sobre empréstimos pendentes, garantindo a disponibilidade dos itens para todos os alunos.",
            
            // TÓPICO: Login
            'loginInfo': "O processo de **autenticação** no ControlTech é totalmente seguro e simples. Para iniciar sua sessão e utilizar o sistema, por favor, utilize o **QR Code do seu crachá SENAI** na página de Login. Este é o método padrão de **login** e garante a rastreabilidade do usuário.",
            
            // TÓPICO: Equipe (Geral - Nomes são citados, mas sem detalhes individuais de função)
            'teamInfo': "O ControlTech é um projeto de **desenvolvimento inovador** realizado por cinco alunos do SENAI: **Eduardo Rodriges, Eliezer Beltrame, Felipe Rossi, Guilherme Augusto e Victor Hugo.**. Eles conceberam e implementaram toda a **arquitetura robusta e segura** do sistema para gestão de ferramentas.",

            // TÓPICO: Ferramentas
            'toolsInfo': "A aba **'Ferramentas'** é o coração do sistema, onde você encontra o **catálogo completo** de itens disponíveis. Para **retirar/pegar** uma ferramenta:\n\n1. Selecione o item desejado no catálogo.\n2. Registre o empréstimo, e ela ficará associada ao seu nome.\n\nO processo é rápido e garante o rastreamento.",
            
            // TÓPICO: Devolução
            'returnInfo': "O procedimento de devolução é direto:\n\n1. Acesse a seção **'Devolver'** no menu lateral.\n2. **Busque ou identifique a ferramenta pelo seu nome** ou código.\n3. O sistema fará o **registro automático** da devolução, incluindo a **data e horário**.\n\nLembre-se: A devolução imediata e a verificação do estado da ferramenta são cruciais para o controle de inventário.",
            
            // MANTIDOS: Logout, Ajuda, Histórico, Acessibilidade, Navegação
            'logoutInfo': "Para encerrar sua sessão, vá para a aba **'Saída'** no menu lateral.\n\nLá, basta pressionar o botão de **'Sair'** (ou **'Encerrar Sessão'**) para confirmar o seu desligamento do sistema. Não é necessário escanear o crachá novamente. Este processo garante a finalização segura de sua sessão.",
            'homeInfo': "A página **'Início'** (ou Landing Page) serve como o painel de boas-vindas do sistema. Ela confirma seu login, exibe o seu nome e é o ponto central para acessar todas as funções, como Ferramentas, Devolver e Histórico, através da barra lateral.",
            'helpCenterInfo': "A **Central de Ajuda** é o seu recurso para resolver dúvidas rápidas.\n\nEla contém:\n\n1. Uma seção de **Perguntas Frequentes (FAQ)**, cobrindo os processos de devolução e saída do sistema.\n2. Um **Formulário de Contato** ('Relate seu problema') para enviar solicitações específicas diretamente para o e-mail de suporte.",
            'historyInfo': "A aba **'Histórico'** oferece **rastreabilidade total e transparência**.\n\nYou can consult your **movement records** (loans and returns) and the **current status** of any tool. The system stores the student's name, tool identification, and the exact date/time of each action.",
            'accessibilityInfo': "Acessibilidade é uma prioridade fundamental! O ControlTech integra o recurso de **Acessibilidade do Governo (VLibras)**, disponível em todas as páginas. Basta localizar o ícone específico para utilizar a tradução em Libras.",
            'navInfo': "A navegação principal do sistema é clara e acessível através da barra lateral, contendo as principais funções: **Ferramentas** (para retirada), **Devolver**, **Ajuda**, **ChatBot**, **Histórico** e **Sair**. A aba **ativa** é sempre destacada para sua orientação.",
            'greeting': "Saudações! Eu sou o Assistente Virtual da ControlTech. Fui desenvolvido para te auxiliar com qualquer questão sobre o **uso, regulamentos e funcionamento** do nosso sistema de gerenciamento de ferramentas. Em que área posso te dar suporte hoje?",
            
            // FALLBACK ATUALIZADO
            'fallback': "Não consegui encontrar uma correspondência exata para sua consulta. Tente usar termos mais específicos, como: **O que é o ControlTech?**, **Prazo de devolução**, **Login**, **Devolver** ou **Equipe**."
        }
    },
    'en': {
        // ... (Traduções em inglês) ...
        'pageTitle': 'ChatBot - SENAI ControlTech',
        'sidebarTools': 'Tools',
        'sidebarReturn': 'Return',
        'sidebarHelp': 'Help',
        'sidebarChatBot': 'ChatBot', 
        'sidebarHistory': 'History',
        'sidebarExit': 'Exit',
        'sidebarSettings': 'Settings',
        'settingsPopupTitle': 'Settings',
        'themeLabel': 'Toggle Theme:',
        'themeStatusLight': 'Light Theme',
        'themeStatusDark': 'Dark Theme',
        'langLabel': 'Toggle Language:',
        'langStatusPT': 'Portuguese',
        'langStatusEN': 'English',
        'welcomeMessage': 'Hello,',
        'clearModalTitle': 'Confirm Deletion',
        'clearModalMessage': 'Are you sure you want to clear the chat history? This action cannot be undone.',
        'clearConfirmBtn': 'Yes, Clear',
        'clearCancelBtn': 'Cancel',
        'botInitialMessage': 'Hello! I am the ControlTech Virtual Assistant. I specialize in the rules and functionality of the system. How can I help you today?',
        'botMsgs': {
            'helpHappy': "I'm happy to help with your tool management! If you need more details or have new questions about ControlTech, I am available.",
            'projectInfo': "ControlTech is a complete asset management system (tools and components) developed for the SENAI environment. Our goal is to provide **full traceability** over loans and returns, ensuring organization and reducing material loss.",
            'prazoInfo': "The standard **return period** is **7 days** after checkout, according to established rules. The system is configured to notify the user about pending loans, ensuring item availability for all students.",
            'loginInfo': "The **authentication** process in ControlTech is totally secure and simple. To start your session and use the system, please use the **QR Code on your SENAI badge** on the Login page. This is the standard method for **login** and guarantees user traceability.",
            'teamInfo': "ControlTech is an **innovative development project** carried out by five SENAI students: **Eduardo Rodriges, Eliezer Beltrame, Felipe Rossi, Guilherme Augusto, and Victor Hugo.**. They conceived and implemented the entire **robust and secure architecture** of the tool management system.",
            // REMOVIDO: memberDetails
            'toolsInfo': "The **'Tools'** tab is the heart of the system, where you find the **complete catalog** of available items. To **check out** a tool:\n\n1. Select the desired item from the catalog.\n2. Register the loan, and it will be associated with your name.\n\nThe process is fast and ensures tracking.",
            'returnInfo': "The return procedure is straightforward:\n\n1. Access the **'Return'** section in the side menu.\n2. **Search for or identify the tool by its name** or code.\n3. The system will make the **automatic registration** of the return, including the **date and time**.\n\nRemember: Immediate return and verification of the tool's condition are crucial for inventory control.",
            'logoutInfo': "To end your session, go to the **'Exit'** tab in the side menu.\n\nThere, just press the **'Exit'** (or **'End Session'**) button to confirm your departure from the system. It is not necessary to scan the badge again. This process ensures the secure finalization of your session.",
            'homeInfo': "The **'Home'** page (or Landing Page) serves as the system's welcome dashboard. It confirms your login, displays your name, and is the central point for accessing all functions, such as Tools, Return, and History, through the side bar.",
            'helpCenterInfo': "The **Help Center** is your resource for quickly resolving questions.\n\nIt contains:\n\n1. A **Frequently Asked Questions (FAQ)** section, covering the return and exit processes.\n2. A **Contact Form** ('Report your problem') to send specific requests directly to the support email.",
            'historyInfo': "The **'History'** tab offers **full traceability and transparency**.\n\nYou can consult your **movement records** (loans and returns) and the **current status** of any tool. The system stores the student's name, tool identification, and the exact date/time of each action.", 
            'accessibilityInfo': "Accessibility is a fundamental priority! ControlTech integrates the **Government Accessibility feature (VLibras)**, available on all pages. Just locate the specific icon to use the translation into Libras.",
            'navInfo': "The main navigation of the system is clear and accessible through the side bar, containing the main functions: **Tools** (for checkout), **Return**, **Help**, **ChatBot**, **History**, and **Exit**. The **active** tab is always highlighted for your orientation.",
            'greeting': "Greetings! I am the ControlTech Virtual Assistant. I was developed to assist you with any questions about the **use, regulations, and functioning** of our tool management system. In what area can I support you today?",
            
            // FALLBACK ATUALIZADO
            'fallback': "I could not find an exact match for your query. Please try rephrasing your question or use more specific terms. I can provide details on:\n\n* **Return and Loans**\n* **Login/Logout** (via QR Code)\n* **Traceability** (History)\n\n* **The ControlTech Development Team**"
        }
    }
};

// --- FUNÇÕES DE UTILIDADE PARA TRADUÇÃO ---

function setText(id, key, trans) {
    const element = document.getElementById(id);
    if (element) element.textContent = trans[key] || '';
}

function setSpanText(id, key, trans) {
    const element = document.getElementById(id)?.querySelector('span');
    if (element) element.textContent = trans[key] || '';
}

// --- FUNÇÕES GLOBAIS DE TEMA E IDIOMA ---
function updateTranslations(lang) {
    const currentLang = translations[lang] ? lang : 'pt';
    const trans = translations[currentLang];
    if (!trans) return console.error("Traduções não encontradas:", currentLang);

    document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';
    document.title = trans.pageTitle || 'ChatBot - SENAI';

    // Barra lateral
    setSpanText('nav-tools', 'sidebarTools', trans);
    setSpanText('nav-return', 'sidebarReturn', trans);
    setSpanText('nav-help', 'sidebarHelp', trans);
    setSpanText('nav-chatbot', 'sidebarChatBot', trans); 
    setSpanText('nav-history', 'sidebarHistory', trans);
    setSpanText('nav-exit', 'sidebarExit', trans);
    setSpanText('settings-btn', 'sidebarSettings', trans);

    // Popup Configurações
    setText('settings-popup-title', 'settingsPopupTitle', trans);
    setText('theme-label', 'themeLabel', trans);
    setText('lang-label', 'langLabel', trans);
    
    // NOVO: Atualiza textos do Modal
    const titleEl = document.getElementById('clear-modal-title');
    const msgEl = document.getElementById('clear-modal-message');
    const confirmBtn = document.getElementById('clearConfirmBtn');
    const cancelBtn = document.getElementById('clearCancelBtn');

    if (titleEl) titleEl.textContent = trans.clearModalTitle;
    if (msgEl) msgEl.textContent = trans.clearModalMessage;
    if (confirmBtn) confirmBtn.textContent = trans.clearConfirmBtn;
    if (cancelBtn) cancelBtn.textContent = trans.clearCancelBtn;


    updateThemeStatusText(document.body.classList.contains('dark-theme') ? 'dark' : 'light', currentLang);
    updateLanguageStatusText(currentLang);
    displayUserName(currentLang);
};

function saveTheme(theme) {
    localStorage.setItem('theme', theme);
    const currentLang = localStorage.getItem('lang') || 'pt';
    
    document.body.classList.toggle('dark-theme', theme === 'dark'); 

    updateThemeStatusText(theme, currentLang);
    updateThemeToggleButtonVisuals(theme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const currentLang = localStorage.getItem('lang') || 'pt';
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    updateThemeStatusText(savedTheme, currentLang);
    updateThemeToggleButtonVisuals(savedTheme);
};

function updateThemeStatusText(activeTheme, lang) {
    const themeStatusEl = document.getElementById('theme-status');
    const trans = translations[lang];
    if (themeStatusEl && trans) {
        themeStatusEl.textContent = activeTheme === 'dark' ? (trans.themeStatusDark || 'Tema Escuro') : (trans.themeStatusLight || 'Tema Claro');
    }
};

function updateThemeToggleButtonVisuals(activeTheme) {
    const sunIcon = document.querySelector('#theme-toggle-btn .fa-sun');
    const moonIcon = document.querySelector('#theme-toggle-btn .fa-moon');
    if (sunIcon && moonIcon) {
        // @ts-ignore
        sunIcon.style.opacity = activeTheme === 'dark' ? '0' : '1';
        // @ts-ignore
        sunIcon.style.transform = activeTheme === 'dark' ? 'translateY(-10px)' : 'translateY(0)';
        // @ts-ignore
        moonIcon.style.opacity = activeTheme === 'dark' ? '1' : '0';
        // @ts-ignore
        moonIcon.style.transform = activeTheme === 'dark' ? 'translateY(0)' : 'translateY(10px)';
    }
};

function saveLanguage(lang) {
    localStorage.setItem('lang', lang);
    updateTranslations(lang);
};

function loadLanguage() {
    const savedLang = localStorage.getItem('lang') || 'pt';
    updateTranslations(savedLang);
};

function updateLanguageStatusText(activeLang) {
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


// --- FUNÇÕES DE PERSISTÊNCIA E CHAT (CORRIGIDAS) ---
const CHAT_STORAGE_KEY = 'chatbotHistory';

/**
 * Salva o histórico de mensagens no localStorage.
 */
function saveChatHistory() {
    const chatBody = document.getElementById('chatbot-body');
    if (!chatBody) return;

    const messages = Array.from(chatBody.children).map(child => {
        const sender = child.classList.contains('user-message') ? 'user' : 'bot';
        // Garante que o texto formatado (com <br>) é salvo.
        const text = child.querySelector('p')?.innerHTML || ''; 
        return { text, sender };
    });

    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
}

/**
 * Carrega e exibe o histórico de mensagens do localStorage.
 */
function loadChatHistory() {
    const chatBody = document.getElementById('chatbot-body');
    if (!chatBody) return false;

    const historyJson = localStorage.getItem(CHAT_STORAGE_KEY);
    if (!historyJson) return false;

    try {
        const history = JSON.parse(historyJson);
        if (Array.isArray(history) && history.length > 0) {
            chatBody.innerHTML = ''; 
            history.forEach(msg => {
                const messageContainer = document.createElement('div');
                messageContainer.classList.add('message');
                messageContainer.classList.add(`${msg.sender}-message`);
                
                const messageParagraph = document.createElement('p');
                // Usa innerHTML para re-inserir o texto formatado.
                messageParagraph.innerHTML = msg.text; 
                
                messageContainer.appendChild(messageParagraph);
                chatBody.appendChild(messageContainer);
            });
            chatBody.scrollTop = chatBody.scrollHeight;
            return true;
        }
    } catch (e) {
        // Se houver falha na leitura, remove o histórico quebrado para evitar travamentos.
        console.error("Erro ao carregar histórico do chat:", e);
        localStorage.removeItem(CHAT_STORAGE_KEY); 
    }
    return false;
}

// NOVO: Função para exibir o popup
function showClearConfirmModal() {
    const modal = document.getElementById('clearConfirmModal');
    if (modal) {
        modal.classList.remove('hidden');
        // Fecha o modal ao clicar no overlay escuro
        modal.onclick = (e) => {
            if (e.target === modal) modal.classList.add('hidden');
        };
    }
}

// NOVO: Função para limpar o histórico (chamada ao clicar em Sim no popup)
function performClearChatHistory() {
    const chatBody = document.getElementById('chatbot-body');
    const currentLang = localStorage.getItem('lang') || 'pt';
    const trans = translations[currentLang] || translations['pt'];

    if (chatBody) {
        localStorage.removeItem(CHAT_STORAGE_KEY);
        chatBody.innerHTML = '';
        
        // Re-adiciona a mensagem inicial do bot após limpar
        const initialMessage = trans.botInitialMessage; 
        appendMessage(initialMessage, 'bot');
    }
    // Fecha o modal após a ação
    const modal = document.getElementById('clearConfirmModal');
    if (modal) modal.classList.add('hidden');
}

// ATUALIZADO: Função chamada pelo botão de Limpar Histórico
function clearChatHistory() {
    showClearConfirmModal(); // Mostra o novo popup de confirmação
}


/**
 * Adiciona uma mensagem ao corpo do chat e salva o histórico.
 */
function appendMessage(text, sender) {
    const chatBody = document.getElementById('chatbot-body');
    if (!chatBody) return; 

    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message');
    messageContainer.classList.add(`${sender}-message`);
    
    const messageParagraph = document.createElement('p');
    // Usa innerHTML para quebras de linha (<br>).
    messageParagraph.innerHTML = text; 
    
    messageContainer.appendChild(messageParagraph);
    chatBody.appendChild(messageContainer);

    chatBody.scrollTop = chatBody.scrollHeight;
    saveChatHistory(); 
}

/**
 * Função utilitária para formatar a resposta do bot.
 */
function formatBotResponse(text) {
    // 1. Substitui **texto** por <b>texto</b>
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    // 2. Converte quebras de linha para HTML para exibição
    formattedText = formattedText.replace(/\n/g, '<br>');

    return formattedText;
}


// --- LÓGICA DO BOT (AJUSTADA) ---
function getBotResponse(input, lang) {
    const lowerInput = input.toLowerCase().trim();
    const msgs = translations[lang]?.botMsgs || translations['pt'].botMsgs; 
    if (!msgs) return "Error: Translations not loaded."; 
    
    if (/(^ok$|^tá$|obrigad[oa]|valeu|certo|sim|beleza|blz|fechado|thank\s*you|ok|correct|yes|thanks)/.test(lowerInput)) {
        return formatBotResponse(msgs.helpHappy);
    }
    
    // TÓPICO: O que é o ControlTech?
    if (/(o\s*que\s*é|qual\s*o\s*objetivo|sobre\s*a\s*controltech|o\s*que\s*faz|o\s*que\s*é\s*controltech|about\s*controltech|what\s*is\s*controltech)/.test(lowerInput)) {
        return formatBotResponse(msgs.projectInfo);
    }
    
    // TÓPICO: Prazo / Multa
    if (/(prazo|multa|atraso|data\s*limite|devolver\s*até|due\s*date|fine|delay)/.test(lowerInput)) {
        return formatBotResponse(msgs.prazoInfo);
    }

    // TÓPICO: Login/Autenticação
    if (/(login|entrar|acessar|autenticar|começo|qr\s*code|crachá|badge|start|access|logar|identificar|registrar)/.test(lowerInput)) {
        return formatBotResponse(msgs.loginInfo);
    }
    
    // TÓPICO: Logout
    if (/(sair|logout|deslogar|encerrar\s*sessão|finalizar|end\s*session|exit|leave)/.test(lowerInput)) {
        return formatBotResponse(msgs.logoutInfo);
    }

    // TÓPICO: Página Inicial
    if (/(início|inicio|pagina\s*inicial|home|bem\s*vindo|landing\s*page|welcome)/.test(lowerInput)) {
        return formatBotResponse(msgs.homeInfo);
    }

    // TÓPICO: Ajuda/Suporte
    if (/(ajuda|faq|suporte|contato|problema|problemas|perguntas\s*frequentes|help|support|contact|dúvida|duvidas)/.test(lowerInput)) {
        return formatBotResponse(msgs.helpCenterInfo);
    }

    // TÓPICO: Retirada/Ferramentas
    const retiradaRegex = /(ferramenta[s]?|item|catálogo|preciso|emprestimo|pegar|retirar|capturar|usar|quero|tool|tools|item|catalog|loan|check\s*out|pego)/;
    if (retiradaRegex.test(lowerInput)) {
        if (!/(devolver|devolução|entrega|devolvo|return|returning|give\s*back)/.test(lowerInput)) {
              return formatBotResponse(msgs.toolsInfo);
        }
    }
    
    // TÓPICO: Devolução
    if (/(devolver|devolução|entrego|entrega|devolvo|return|returning|give\s*back|deliver|delivery)/.test(lowerInput)) {
        return formatBotResponse(msgs.returnInfo);
    }

    // TÓPICO: Rastreabilidade/Histórico
    if (/(registro|quem\s*pegou|rastrear|monitoramento|historico|histórico|ver\s*quem\s*pegou|quem\s*está\s*com|history|log|trace|track)/.test(lowerInput)) {
        return formatBotResponse(msgs.historyInfo);
    }

    // TÓPICO: Equipe (Geral) - REGRA AJUSTADA PARA NÃO BUSCAR NOMES INDIVIDUAIS
    if (/(quem\s*fez|desenvolvedores|criadores|equipe|idealizadores|cria|alunos|fundadores|arquitetos|criou|pessoas|criaram|fundou|desenvolveu|arquitetou|fizeram|team|developer|developers|who\s*made|created)/.test(lowerInput)) {
        return formatBotResponse(msgs.teamInfo);
    }
    
    // TÓPICO: Acessibilidade
    if (/(acessibilidade|vlibras|inclusão|surdo|como\s*foi\s*feito|Vlibras|accessibility|inclusive)/.test(lowerInput)) {
        return formatBotResponse(msgs.accessibilityInfo);
    }
    
    // TÓPICO: Navegação
    if (/(navegação|onde\s*está|menus|abas|mexer|navegar|funções|navigation|menu|tabs|functions)/.test(lowerInput)) {
        return formatBotResponse(msgs.navInfo);
    }

    // TÓPICO: Saudação
    if (lang === 'en' && /(hello|hi|good\s*day|greetings)/.test(lowerInput)) {
         return formatBotResponse(msgs.greeting);
    } else if (lang === 'pt' && /(olá|oi|tudo\s*bem|saudação|bom\s*dia|boa\s*tarde)/.test(lowerInput)) {
         return formatBotResponse(msgs.greeting);
    }

    // TÓPICO: Fallback (AJUSTADO)
    return formatBotResponse(msgs.fallback);
}


/**
 * Processa o envio da mensagem do usuário.
 */
function handleSendMessage() {
    const chatInput = document.getElementById('chatbot-input');
    
    if (!chatInput) {
        console.error("Erro: Elemento 'chatbot-input' não encontrado.");
        return;
    }

    // @ts-ignore
    const input = chatInput.value.trim();
    
    if (input === "") return;

    // A mensagem do usuário é exibida sem formatação
    // Usa formatBotResponse para garantir que o texto salvo tenha <br> para quebras de linha, mantendo o histórico consistente.
    const formattedInput = formatBotResponse(input); 
    appendMessage(formattedInput, 'user');
    // @ts-ignore
    chatInput.value = ''; // Limpa o campo após o envio
    
    const lang = localStorage.getItem('lang') || 'pt'; // Obtém o idioma atual

    setTimeout(() => {
        const botResponse = getBotResponse(input, lang); // Passa o idioma para a função
        appendMessage(botResponse, 'bot');
    }, 500);
}


// --- INICIALIZAÇÃO E EVENT LISTENERS ---
document.addEventListener("DOMContentLoaded", () => {
    // Referências NavBar
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('sidebar');
    const themePopup = document.getElementById('theme-popup');
    const settingsBtn = document.getElementById('settings-btn');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    
    
    // Referências ChatBot
    const sendBtn = document.getElementById('send-btn');
    const chatInput = document.getElementById('chatbot-input');
    const clearHistoryBtn = document.getElementById('clear-history-btn'); 
    
    // Referências do Novo Popup
    const clearConfirmBtn = document.getElementById('clearConfirmBtn');
    const clearCancelBtn = document.getElementById('clearCancelBtn');
    const clearConfirmModal = document.getElementById('clearConfirmModal');


    // Inicializa Tema e Idioma
    loadTheme();
    loadLanguage(); 
    
    // Carrega o histórico de mensagens
    const historyLoaded = loadChatHistory();
    const lang = localStorage.getItem('lang') || 'pt'; // Obtém o idioma atual para a mensagem inicial
    const trans = translations[lang] || translations['pt'];
    
    // Mensagem inicial do bot (só se o histórico estiver vazio)
    if (!historyLoaded) {
        const initialMessage = trans.botInitialMessage; // Usa a mensagem inicial traduzida
        appendMessage(initialMessage, 'bot');
    }

    // Evento Hamburger (NavBar)
    hamburgerBtn?.addEventListener('click', () => sidebar?.classList.toggle('active'));

    // Eventos Popup Configurações
    settingsBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        
        themePopup?.classList.toggle('visible'); 
    });
    
    closePopupBtn?.addEventListener('click', () => {
        themePopup?.classList.remove('visible');
    });
    
    themeToggleBtn?.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-theme');
        const newTheme = isDark ? 'light' : 'dark';
        saveTheme(newTheme);
    });
    
    langToggleBtn?.addEventListener('click', () => {
        const currentLang = localStorage.getItem('lang') || 'pt';
        const newLang = currentLang === 'pt' ? 'en' : 'pt';
        saveLanguage(newLang);
    });
    
    // --- Lógica de Envio de Mensagem ---
    
    if (sendBtn) {
        sendBtn.addEventListener('click', handleSendMessage);
    } 

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            // @ts-ignore
            if (e.key === 'Enter') {
                e.preventDefault(); 
                handleSendMessage();
            }
        });
    } 

    // Listener para o botão de limpar histórico (Abre o modal)
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', clearChatHistory);
    }

    // Listeners para o Modal de Confirmação
    if (clearConfirmBtn) {
        clearConfirmBtn.addEventListener('click', performClearChatHistory);
    }

    if (clearCancelBtn) {
        clearCancelBtn.addEventListener('click', () => {
            clearConfirmModal?.classList.add('hidden');
        });
    }
});