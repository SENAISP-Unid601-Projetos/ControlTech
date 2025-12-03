document.addEventListener('DOMContentLoaded', () => {
    // =======================================
    // 1. VARIÁVEIS E ELEMENTOS GLOBAIS
    // =======================================
    const sidebar = document.getElementById('sidebar');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn'); 
    
    // Elementos do Pop-up de Configurações
    const settingsBtn = document.getElementById('settings-btn');
    const themePopup = document.querySelector('.theme-popup'); 
    const closePopupBtn = document.querySelector('.theme-popup .close-btn'); 
    
    // Elementos do Nome de Usuário na Sidebar
    const userNameElement = document.getElementById('user-name');
    const welcomeMessageElement = document.getElementById('welcome-message');

    // Dicionário de traduções COMPLETO para todos os textos da página
    const translations = {
        'pt': {
            // Configurações e Mensagens de Usuário
            'themeStatusLight': 'Tema Claro',
            'themeStatusDark': 'Tema Escuro',
            'langStatusPT': 'Português',
            'langStatusEN': 'English',
            'welcomeMessage': 'Olá,',
            'defaultUserName': 'Usuário',
            'settingsPopupTitle': 'Configurações',
            'themeLabel': 'Alternar Tema:',
            'langLabel': 'Alternar Idioma:',

            // Navegação
            'pageTitle': 'Gerenciamento de Ferramentas - ControlTech',
            'navAbout': 'Início',
            'navTools': 'Ferramentas',
            'navReturn': 'Devolver',
            'navHelp': 'Ajuda',
            'navHistory': 'Histórico',
            'navChatbot': 'ChatBot',
            'navExit': 'Sair',
            'navSettings': 'Configurações',
            'footerNavTitle': 'Navegação',
            'footerTools': 'Ferramentas',
            'footerHistory': 'Histórico',
            'footerSupport': 'Suporte',

            // Conteúdo Principal (Hero e Recursos)
            'heroTitle': 'ControlTech: Gerenciamento eficiente e prático',
            'heroSubtitle': 'Um sistema robusto para o <strong>Gerenciamento de componentes em seu ambiente</strong> garantindo que cada ferramenta esteja onde deveria.',
            'heroCtaButton': 'Acessar Dashboard',
            'sectionTitle1': 'Por que ControlTech é Essencial?',
            'featureTitle1': 'Rastreabilidade Total',
            'featureText1': 'Saiba <strong>quem pegou</strong>, <strong>quando pegou</strong> e <strong>qual ferramenta</strong> está com cada usuário em tempo real.',
            'featureTitle2': 'Inventário Preciso',
            'featureText2': 'Mantenha um controle de estoque digital, eliminando a perda e o extravio de materiais.',
            'featureTitle3': 'Responsabilidade Individual',
            'featureText3': 'A exigência de login cria um registro de empréstimo transparente e seguro.',

            // Equipe e Rodapé
            'sectionTitle2': 'Membros da Equipe & Colaboradores',
            'sectionSubtitle2': 'Desenvolvido com paixão e expertise por:',
            'footerBrandingText': 'Gestão Inteligente de Ativos.',
            'footerContactTitle': 'Contato',
            'footerBottomText1': '&copy; 2025 ControlTech - Projeto SENAI. Todos os direitos reservados.',
            'footerBottomText2': 'Desenvolvedores: Felipe Rossi, Victor Hugo, Eliezer, Eduardo, Guilherme.',
        },
        'en': {
            // Configurações e Mensagens de Usuário
            'themeStatusLight': 'Light Theme',
            'themeStatusDark': 'Dark Theme',
            'langStatusPT': 'Português',
            'langStatusEN': 'English',
            'welcomeMessage': 'Hello,',
            'defaultUserName': 'User',
            'settingsPopupTitle': 'Settings',
            'themeLabel': 'Toggle Theme:',
            'langLabel': 'Toggle Language:',

            // Navegação
            'pageTitle': 'Tool Management - ControlTech',
            'navAbout': 'Home',
            'navTools': 'Tools',
            'navReturn': 'Return',
            'navHelp': 'Help',
            'navHistory': 'History',
            'navChatbot': 'ChatBot',
            'navExit': 'Sign Out',
            'navSettings': 'Settings',
            'footerNavTitle': 'Navigation',
            'footerTools': 'Tools',
            'footerHistory': 'History',
            'footerSupport': 'Support',

            // Conteúdo Principal (Hero e Recursos)
            'heroTitle': 'ControlTech: Efficient and Practical Management',
            'heroSubtitle': 'A robust system for <strong>Component Management in your environment</strong>, ensuring every tool is where it should be.',
            'heroCtaButton': 'Access Dashboard',
            'sectionTitle1': 'Why is ControlTech Essential?',
            'featureTitle1': 'Complete Traceability',
            'featureText1': 'Know <strong>who took it</strong>, <strong>when they took it</strong>, and <strong>which tool</strong> is with each user in real-time.',
            'featureTitle2': 'Precise Inventory',
            'featureText2': 'Maintain digital stock control, eliminating material loss and misplacement.',
            'featureTitle3': 'Individual Accountability',
            'featureText3': 'The login requirement creates a transparent and secure borrowing record.',

            // Equipe e Rodapé
            'sectionTitle2': 'Team Members & Collaborators',
            'sectionSubtitle2': 'Developed with passion and expertise by:',
            'footerBrandingText': 'Intelligent Asset Management.',
            'footerContactTitle': 'Contact',
            'footerBottomText1': '&copy; 2025 ControlTech - SENAI Project. All rights reserved.',
            'footerBottomText2': 'Developers: Felipe Rossi, Victor Hugo, Eliezer, Eduardo, Guilherme.',
        }
    };


    // =======================================
    // 2. LÓGICA DO TEMA CLARO/ESCURO (CHAVE: 'theme')
    // =======================================
    
    const updateThemeStatusText = (activeTheme, lang) => { 
        const themeStatusEl = document.getElementById('theme-status'); 
        const trans = translations[lang] || translations.pt;
        if (themeStatusEl && trans) { 
            themeStatusEl.textContent = activeTheme === 'dark' ? (trans.themeStatusDark) : (trans.themeStatusLight); 
        }
    };
    
    const updateThemeToggleButtonVisuals = (activeTheme) => { 
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

    const saveTheme = (theme) => { 
        localStorage.setItem('theme', theme); 
        const currentLang = localStorage.getItem('lang') || 'pt'; 
        document.body.classList.toggle('dark-theme', theme === 'dark'); 
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

    // NOVO: Função para aplicar todas as traduções usando o atributo data-i18n
    const applyTranslations = (lang) => {
        const trans = translations[lang] || translations.pt;
        
        // 1. Atualiza o atributo lang no <html>
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en-US'; 

        // 2. Atualiza elementos com data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (key && trans[key]) {
                if (element.tagName === 'TITLE') {
                    element.textContent = trans[key];
                } else if (element.id === 'hero-cta-button') {
                    // Trata o botão CTA para incluir o ícone
                    element.innerHTML = trans[key] + ' <i class="fas fa-arrow-right"></i>';
                } else if (element.parentElement.tagName === 'LI' && element.tagName === 'A') {
                    // Trata links do rodapé
                    element.textContent = trans[key];
                } else {
                     // Usa innerHTML para manter tags como <strong> dentro das strings
                     element.innerHTML = trans[key];
                }
            }
        });
        
        // 3. Atualiza os links de navegação da Sidebar (por ID)
        // Isso garante que os SPANs dentro dos links sejam atualizados
        document.getElementById('nav-about').querySelector('span').textContent = trans.navAbout;
        document.getElementById('nav-tools').querySelector('span').textContent = trans.navTools;
        document.getElementById('nav-return').querySelector('span').textContent = trans.navReturn;
        document.getElementById('nav-help').querySelector('span').textContent = trans.navHelp;
        document.getElementById('nav-history').querySelector('span').textContent = trans.navHistory;
        document.getElementById('nav-chatbot').querySelector('span').textContent = trans.navChatbot;
        document.getElementById('nav-exit').querySelector('span').textContent = trans.navExit;
        document.getElementById('settings-btn').querySelector('span').textContent = trans.navSettings;
        
        // 4. Garante que os status de tema e idioma estejam corretos após a troca de idioma
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        updateThemeStatusText(currentTheme, lang);
        updateLanguageStatusText(lang); 
    };


    function displayUserName(lang) { 
        const trans = translations[lang] || translations.pt;
        let userInfo = null; 
        
        try { 
            const storedUser = localStorage.getItem('usuarioLogado'); 
            if (storedUser) userInfo = JSON.parse(storedUser); 
        } catch (e) { 
            console.error("Erro ao ler usuarioLogado:", e); 
        } 
        
        const defaultUserName = trans.defaultUserName; 
        const nomeCompleto = (userInfo && userInfo.nome) ? userInfo.nome : defaultUserName;
        const firstName = nomeCompleto.split(' ')[0];
        
        // Atualiza Sidebar
        if (welcomeMessageElement) {
            welcomeMessageElement.textContent = trans.welcomeMessage;
        }
        if (userNameElement) {
            userNameElement.textContent = firstName;
        } 
        
        // Remove a lógica de atualizar o H1, pois a saudação do nome é na sidebar.
    };

    // =======================================
    // 4. LÓGICA DE IDIOMA (CHAVE: 'lang')
    // =======================================

    const updateLanguageStatusText = (activeLang) => { 
        const langStatusEl = document.getElementById('lang-status'); 
        const langToggleBtnSpan = document.querySelector('#lang-toggle-btn span');
        const trans = translations[activeLang] || translations.pt;

        if (langToggleBtnSpan) langToggleBtnSpan.textContent = activeLang.toUpperCase(); 
        
        if (langStatusEl) { 
            langStatusEl.textContent = activeLang === 'pt' 
                ? (trans.langStatusPT) 
                : (trans.langStatusEN); 
        }
    };
    
    const saveLanguage = (lang) => { 
        localStorage.setItem('lang', lang); 
        applyTranslations(lang); // Aplica a tradução após salvar o idioma
        displayUserName(lang);
    };

    const loadLanguage = () => { 
        const savedLang = localStorage.getItem('lang') || 'pt'; 
        applyTranslations(savedLang); // Aplica a tradução ao carregar a página
        displayUserName(savedLang); 
    };

    // =======================================
    // 5. INICIALIZAÇÃO
    // =======================================

    loadTheme(); 
    loadLanguage(); 


    // =======================================
    // 6. LISTENERS E LÓGICA DE INTERAÇÃO
    // =======================================

    // --- Sidebar (Mobile Toggle) ---
    const closeMenu = () => {
        if (window.innerWidth <= 768) { 
            sidebar?.classList.remove('active');
            const icon = hamburgerBtn?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    };
    
    hamburgerBtn?.addEventListener('click', () => {
        sidebar?.classList.toggle('active'); 
        const icon = hamburgerBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });

    // IMPORTANTE: Permite que o link funcione, mas fecha o menu em mobile
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // --- Pop-up de Configurações ---
    settingsBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        themePopup?.classList.add('visible'); 
        closeMenu(); 
    });

    closePopupBtn?.addEventListener('click', () => {
        themePopup?.classList.remove('visible');
    });

    window.addEventListener('click', (e) => {
        // @ts-ignore
        if (themePopup?.classList.contains('visible') && !themePopup.contains(e.target) && !settingsBtn?.contains(e.target)) {
            themePopup.classList.remove('visible');
        }
    });

    // --- Alternar Tema ---
    themeToggleBtn?.addEventListener('click', () => { 
        const isDark = document.body.classList.contains('dark-theme'); 
        const newTheme = isDark ? 'light' : 'dark'; 
        document.body.classList.toggle('dark-theme'); 
        saveTheme(newTheme); 
    });

    // --- Alternar Idioma ---
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    langToggleBtn?.addEventListener('click', () => { 
        const currentLang = localStorage.getItem('lang') || 'pt'; 
        const newLang = currentLang === 'pt' ? 'en' : 'pt'; 
        saveLanguage(newLang); 
    });


    // =======================================
    // 7. OBSERVER E REVELAÇÃO DE CONTEÚDO
    // =======================================
    
    // 1. Correção: Seletor para o conteúdo imediato da seção principal (hero-section e o novo botão)
    const heroElementsToReveal = document.querySelectorAll(
        '.hero-section .fade-in-up, ' + 
        '.hero-section .slide-in-left, ' + 
        '.hero-section .slide-in-right, ' + 
        '.cta-standalone-container .fade-in-up'
    );
    
    // Força a exibição imediata dos elementos da Seção Hero
    heroElementsToReveal.forEach(el => {
        setTimeout(() => {
            el.classList.add('animate-visible');
        }, 100); 
    });

    // 2. Intersection Observer para o restante do conteúdo (ao rolar)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        rootMargin: '0px', 
        threshold: 0.2
    });

    // Observa elementos que devem aparecer ao rolar a página
    const elementsToAnimateOnScroll = document.querySelectorAll(
        '.features-grid .fade-in-up, .features-grid .slide-in-left, .features-grid .slide-in-right, .features-grid .shadow-pop, ' + 
        '.team-grid .float-effect'
    );
    
    elementsToAnimateOnScroll.forEach(element => {
        observer.observe(element);
    });
});