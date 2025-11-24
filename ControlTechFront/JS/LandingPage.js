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

    // Dicionário de traduções
    const translations = {
        'pt': {
            'themeStatusLight': 'Tema Claro',
            'themeStatusDark': 'Tema Escuro',
            'langStatusPT': 'Português',
            'langStatusEN': 'English',
            'welcomeMessage': 'Olá,',
        },
        'en': {
            'themeStatusLight': 'Light Theme',
            'themeStatusDark': 'Dark Theme',
            'langStatusPT': 'Português',
            'langStatusEN': 'English',
            'welcomeMessage': 'Hello,',
        }
    };


    // =======================================
    // 2. LÓGICA DO TEMA CLARO/ESCURO (CHAVE: 'theme')
    // =======================================
    
    const updateThemeStatusText = (activeTheme, lang) => { 
        const themeStatusEl = document.getElementById('theme-status'); 
        const trans = translations[lang] || translations.pt;
        if (themeStatusEl && trans) { 
            themeStatusEl.textContent = activeTheme === 'dark' ? (trans.themeStatusDark || 'Tema Escuro') : (trans.themeStatusLight || 'Tema Claro'); 
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
        const savedTheme = localStorage.getItem('theme') || 'dark'; 
        const currentLang = localStorage.getItem('lang') || 'pt'; 
        document.body.classList.toggle('dark-theme', savedTheme === 'dark'); 
        updateThemeStatusText(savedTheme, currentLang); 
        updateThemeToggleButtonVisuals(savedTheme); 
    };

    // =======================================
    // 3. CAPTURA E EXIBIÇÃO DO NOME (CHAVE: 'usuarioLogado')
    // =======================================
    
    function displayUserName(lang) { 
        const trans = translations[lang] || translations.pt;
        let userInfo = null; 
        
        try { 
            const storedUser = localStorage.getItem('usuarioLogado'); 
            if (storedUser) userInfo = JSON.parse(storedUser); 
        } catch (e) { 
            console.error("Erro ao ler usuarioLogado:", e); 
        } 
        
        const defaultUserName = (lang === 'pt' ? 'Usuário' : 'User'); 
        const nomeCompleto = (userInfo && userInfo.nome) ? userInfo.nome : defaultUserName;
        const firstName = nomeCompleto.split(' ')[0];
        
        // 1. Atualiza Sidebar
        if (welcomeMessageElement) {
            welcomeMessageElement.textContent = trans.welcomeMessage || (lang === 'pt' ? 'Olá,' : 'Hello,');
        }
        if (userNameElement) {
            userNameElement.textContent = firstName;
        } 
        
        // 2. Atualiza Header Principal 
        const headerTitle = document.getElementById('header-title');
        if (headerTitle) {
            const saudacao = trans.welcomeMessage.replace(',', ''); 
            headerTitle.textContent = `${saudacao} ${firstName} à ControlTech`;
        }
    };

    // =======================================
    // 4. LÓGICA DE IDIOMA (CHAVE: 'lang')
    // =======================================

    const updateLanguageStatusText = (activeLang) => { 
        const langStatusEl = document.getElementById('lang-status'); 
        const langToggleBtn = document.getElementById('lang-toggle-btn');
        const trans = translations[activeLang] || translations.pt;

        if (langToggleBtn) langToggleBtn.textContent = activeLang.toUpperCase(); 
        
        if (langStatusEl) { 
            langStatusEl.textContent = activeLang === 'pt' 
                ? (trans.langStatusPT || 'Português') 
                : (trans.langStatusEN || 'English'); 
        }
    };
    
    const saveLanguage = (lang) => { 
        localStorage.setItem('lang', lang); 
        updateLanguageStatusText(lang);
        displayUserName(lang);
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        updateThemeStatusText(currentTheme, lang); 
    };

    const loadLanguage = () => { 
        const savedLang = localStorage.getItem('lang') || 'pt'; 
        updateLanguageStatusText(savedLang); 
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
        '.cta-standalone-container .fade-in-up' // Inclui o novo botão
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