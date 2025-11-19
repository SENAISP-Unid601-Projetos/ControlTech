document.addEventListener('DOMContentLoaded', () => {
    // =======================================
    // 1. VARIÁVEIS E ELEMENTOS GLOBAIS
    // =======================================
    const sidebar = document.getElementById('sidebar');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn'); 
    const body = document.body;
    
    // Elementos do Pop-up de Configurações
    const settingsBtn = document.getElementById('settings-btn');
    const themePopup = document.getElementById('theme-popup');
    const closePopupBtn = document.getElementById('close-popup-btn');
    
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
            // 'heroWelcome' não é mais necessário no novo layout, mas mantemos a estrutura.
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
            // Controla a transição visual dos ícones de sol e lua no botão de toggle
            sunIcon.style.opacity = activeTheme === 'dark' ? '0' : '1'; 
            sunIcon.style.transform = activeTheme === 'dark' ? 'translateY(-10px)' : 'translateY(0)'; 
            moonIcon.style.opacity = activeTheme === 'dark' ? '1' : '0'; 
            moonIcon.style.transform = activeTheme === 'dark' ? 'translateY(0)' : 'translateY(10px)'; 
        }
    };

    const saveTheme = (theme) => { 
        localStorage.setItem('theme', theme); 
        const currentLang = localStorage.getItem('lang') || 'pt'; 
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
        
        // --- Lógica para o Nome e Saudação ---
        const defaultUserName = (lang === 'pt' ? 'Usuário' : 'User'); 
        // Usa o nome completo, mas exibe apenas o primeiro nome
        const nomeCompleto = (userInfo && userInfo.nome) ? userInfo.nome : defaultUserName;
        const firstName = nomeCompleto.split(' ')[0];
        
        // 1. Atualiza Sidebar
        if (welcomeMessageElement) {
            welcomeMessageElement.textContent = trans.welcomeMessage || (lang === 'pt' ? 'Olá,' : 'Hello,');
        }
        if (userNameElement) {
            userNameElement.textContent = firstName;
        } 
        
        // 2. Atualiza Header Principal (Onde a frase 'Olá, [Nome] - ControlTech' aparece)
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
        const langToggleBtnSpan = document.getElementById('lang-toggle-btn')?.querySelector('span'); 
        const langStatusEl = document.getElementById('lang-status'); 
        const trans = translations[activeLang] || translations.pt;

        if (langToggleBtnSpan) langToggleBtnSpan.textContent = activeLang.toUpperCase(); 
        
        if (langStatusEl) { 
            langStatusEl.textContent = activeLang === 'pt' 
                ? (trans.langStatusPT || 'Português') 
                : (trans.langStatusEN || 'English'); 
        }
    };
    
    const saveLanguage = (lang) => { 
        localStorage.setItem('lang', lang); 
        updateLanguageStatusText(lang);
        // Atualiza elementos textuais (nome e tema) na nova língua
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

    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // --- Pop-up de Configurações ---
    settingsBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        themePopup?.classList.add('visible'); 
        themePopup?.classList.remove('hidden'); 
        closeMenu(); 
    });

    closePopupBtn?.addEventListener('click', () => {
        themePopup?.classList.remove('visible');
        themePopup?.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
        // @ts-ignore
        if (themePopup?.classList.contains('visible') && !themePopup.contains(e.target) && !settingsBtn?.contains(e.target)) {
            themePopup.classList.remove('visible');
            themePopup?.classList.add('hidden');
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
    langToggleBtn?.addEventListener('click', () => { 
        const currentLang = localStorage.getItem('lang') || 'pt'; 
        const newLang = currentLang === 'pt' ? 'en' : 'pt'; 
        saveLanguage(newLang); 
    });


    // =======================================
    // 7. OBSERVER E REVELAÇÃO DE CONTEÚDO
    // =======================================
    
    // Revela imediatamente o conteúdo principal (h1, p, a) da Landing Page
    // ISSO É CRUCIAL PARA CORRIGIR O PROBLEMA DA TELA VAZIA (IMAGEM AZUL)
    document.querySelectorAll('.hero-content-section > *').forEach(el => {
        // As classes de animação (fade-in-up, etc.) foram removidas
        // do HTML principal no novo layout para garantir que ele apareça imediatamente,
        // mas mantemos este bloco de código para qualquer outro elemento que use animação.
        
        // Se você quiser animações, adicione as classes .fade-in-up no HTML
        // e este bloco as ativará no carregamento:
        setTimeout(() => {
            el.classList.add('animate-visible');
        }, 50); 
    });

    // Intersection Observer para elementos que devem aparecer ao rolar a página
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

    // Observa todos os elementos que têm classes de animação definidas no CSS
    const elementsToAnimate = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .shadow-pop, .float-effect');
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});