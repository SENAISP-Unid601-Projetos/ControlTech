// Login.js
import { lerQrViaUpload, exibirUsuario } from './leitorQrCode.js';
import { API_BASE_URL } from './apiConfig.js'; 

// Variáveis globais para o leitor de QR Code
window.html5QrCodeCadastro = null;
let html5QrCodeLogin = null;

// ----- Fundo hexagonal (Corrigido o loop) -----
const container = document.getElementById('container');
if (container) {
    let innerHTML = '';
    // Corrigido: Loop de 15x20 para evitar bug de espaçamento e infinito.
    for (let i = 0; i < 15; i++) {
        innerHTML += '<div class="row">';
        for (let j = 0; j < 20; j++) {
            innerHTML += '<div class="hexagon"></div>';
        }
        innerHTML += '</div>';
    }
    container.innerHTML = innerHTML;
}

// ----- Referências -----
const statusMsgLogin = document.getElementById('statusMsgLogin');
const infoAluno = document.getElementById('infoAluno');

// ----- Abrir/Fechar cadastro -----
const abrirCadastro = document.getElementById('abrirCadastro');
const cadastroBox = document.getElementById('cadastroBox');
const loginContainer = document.getElementById('loginContainer');
const voltarLogin = document.getElementById('voltarLogin');

abrirCadastro?.addEventListener('click', () => {
    loginContainer?.classList.add('slide-out');
    cadastroBox?.classList.add('active');
    stopCamera('login');
});

voltarLogin?.addEventListener('click', () => {
    loginContainer?.classList.remove('slide-out');
    cadastroBox?.classList.remove('active');
    stopCamera('cadastro');
});

// ----- Função de Alerta Personalizado (Pop-up Bonito) -----
function showAlert(titulo, mensagem) {
    const modal = document.getElementById('alertModal');
    const titleEl = document.getElementById('alertTitle');
    const msgEl = document.getElementById('alertMessage');
    const btnOk = document.getElementById('btnAlertOk');

    // Se o modal existir no HTML, usa ele.
    if (modal && titleEl && msgEl) {
        titleEl.textContent = titulo;
        msgEl.textContent = mensagem;
        modal.classList.remove('hidden'); // Exibe o modal
        
        const fechar = () => modal.classList.add('hidden');
        if(btnOk) btnOk.onclick = fechar;
        modal.onclick = (e) => {
            if (e.target === modal) fechar();
        };
    } else {
        // Fallback caso o HTML não tenha sido atualizado ainda
        alert(`${titulo}\n\n${mensagem}`);
    }
}

// ----- Funções da Câmera (MANTIDAS) -----

// Função para Resetar a Interface (Botões e Divs)
function resetCameraUI(mode) {
    const readerId = mode === 'login' ? 'reader-login' : 'reader-cadastro';
    const readerContainer = document.getElementById(readerId);
    const btn = document.getElementById(mode === 'login' ? 'btnToggleCameraLogin' : 'btnToggleCameraCadastro');
    const uploadControls = document.getElementById(mode === 'login' ? 'loginUploadControls' : 'cadastroUploadControls');

    // Esconde a div do vídeo
    if (readerContainer) readerContainer.style.display = 'none';
    
    // Reseta o texto do botão
    if (btn) {
        if (mode === 'login') btn.innerHTML = '<i class="fas fa-video"></i> Usar Câmera';
        else btn.innerHTML = '<i class="fas fa-video"></i> Ler Crachá com Câmera';
    }

    // Mostra o botão de upload de novo
    if (uploadControls) uploadControls.style.display = 'block'; 
}

export function stopCamera(mode) {
    let reader = mode === 'login' ? html5QrCodeLogin : window.html5QrCodeCadastro;

    // Se o leitor existe e está rodando, tenta parar
    if (reader && (reader.isScanning || reader.getState() === 2)) {
        reader.stop()
            .then(() => {
                // Sucesso ao parar
                resetCameraUI(mode);
                if (mode === 'login') html5QrCodeLogin = null;
                else window.html5QrCodeCadastro = null;
            })
            .catch(err => {
                console.warn("Erro ao parar câmera (mas vamos fechar a tela mesmo assim):", err);
                // Força o fechamento da UI mesmo com erro
                resetCameraUI(mode);
                if (mode === 'login') html5QrCodeLogin = null;
                else window.html5QrCodeCadastro = null;
            });
    } else {
        // Se já estava parado ou não existe, só garante que a UI tá limpa
        resetCameraUI(mode);
        if (mode === 'login') html5QrCodeLogin = null;
        else window.html5QrCodeCadastro = null;
    }
}

export function startCamera(mode, onScanSuccess) {
    const readerId = mode === 'login' ? 'reader-login' : 'reader-cadastro';
    const readerContainer = document.getElementById(readerId);
    const btn = document.getElementById(mode === 'login' ? 'btnToggleCameraLogin' : 'btnToggleCameraCadastro');
    const uploadControls = document.getElementById(mode === 'login' ? 'loginUploadControls' : 'cadastroUploadControls');

    // Se a câmera já estiver visível, o botão funciona como "Parar"
    if (readerContainer && readerContainer.style.display === 'block') {
        stopCamera(mode);
        return;
    }

    // Configura UI para modo "Ligado"
    if (readerContainer) readerContainer.style.display = 'block';
    if (btn) btn.innerHTML = '<i class="fas fa-stop-circle"></i> Parar Câmera';
    if (uploadControls) uploadControls.style.display = 'none';

    // Cria instância se não existir
    if (mode === 'login' && !html5QrCodeLogin) {
        // @ts-ignore
        html5QrCodeLogin = new Html5Qrcode(readerId);
    } else if (mode === 'cadastro' && !window.html5QrCodeCadastro) {
        // @ts-ignore
        window.html5QrCodeCadastro = new Html5Qrcode(readerId);
    }

    let reader = mode === 'login' ? html5QrCodeLogin : window.html5QrCodeCadastro;
    const config = { fps: 25, qrbox: { width: 250, height: 250 } };

    if (reader) {
        // @ts-ignore
        Html5Qrcode.getCameras().then(devices => {
            if (devices && devices.length) {
                // Tenta achar câmera traseira
                const backCamera = devices.find(d => d.label.toLowerCase().includes('back') || d.label.toLowerCase().includes('traseira') || d.label.toLowerCase().includes('environment'));
                const startConfig = backCamera ? backCamera.id : { facingMode: "environment" };

                reader.start(startConfig, config, onScanSuccess, () => {})
                .catch((err) => {
                    console.warn("Erro ao iniciar câmera traseira, tentando padrão...", err);
                    // Fallback para qualquer câmera
                    reader.start(devices[0].id, config, onScanSuccess, () => {})
                    .catch(finalErr => {
                        showAlert("Erro Fatal", "Não foi possível iniciar nenhuma câmera.");
                        stopCamera(mode);
                    });
                });
            } else {
                showAlert("Atenção", "Nenhuma câmera detectada.");
                stopCamera(mode);
            }
        }).catch(err => {
            console.error("Erro permissão câmera:", err);
            showAlert("Erro", "Permissão de câmera negada.");
            stopCamera(mode);
        });
    }
}

// ----- Função de redirecionamento unificada -----
function performRedirect() {
    const params = new URLSearchParams(window.location.search);
    const redirectUrl = params.get('redirect');

    if (redirectUrl) {
        // Redireciona para o URL de destino (FerramentaUni.html?id=X&action=assoc)
        window.location.href = decodeURIComponent(redirectUrl);
    } else {
        // Comportamento padrão: redirecionar para a landing page
        window.location.href = './HTML/LandingPage.html';
    }
}

// ----- Login via Câmera -----
document.getElementById('btnToggleCameraLogin')?.addEventListener('click', () => {
    stopCamera('cadastro'); // Garante que a outra esteja desligada
    startCamera('login', (decodedText) => {
        stopCamera('login');
        handleLoginSuccess(decodedText);
    });
});

function handleLoginSuccess(qrCodeContent) {
    if (statusMsgLogin) statusMsgLogin.textContent = "Processando...";
    const loginControls = document.getElementById('loginControls');

    fetch(`${API_BASE_URL}/api/usuarios/por-codigo/${qrCodeContent}`)
        .then(res => {
            if (!res.ok) throw new Error("Código não encontrado");
            return res.json();
        })
        .then(usuario => {
            salvarUsuarioLogado({ usuario: usuario });
            if (loginControls) loginControls.style.display = 'none';
            exibirUsuario({ usuario: usuario }); 

            if (statusMsgLogin) statusMsgLogin.textContent = "Sucesso! Redirecionando...";
            if (infoAluno) infoAluno.style.display = "block";

            // CORREÇÃO: Redireciona usando a função performRedirect
            setTimeout(performRedirect, 500); 
        })
        .catch(err => {
            console.error(err);
            showAlert("Erro de Login", "Usuário não encontrado ou QR Code inválido.");
            if (statusMsgLogin) statusMsgLogin.textContent = "Erro no login.";
        });
}
const btnLerQrUpload = document.getElementById('btnLerQr');
const loginQrInput = document.getElementById('loginQrInput');

btnLerQrUpload?.addEventListener('click', () => {
    // @ts-ignore
    const file = loginQrInput.files[0];
    
    if (!file) {
        showAlert("Atenção", "Selecione um arquivo de QR Code primeiro.");
        return;
    }

    stopCamera('login'); 

    btnLerQrUpload.classList.add('loading');
    btnLerQrUpload.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
    
    const loginControls = document.getElementById('loginControls');

    // 1. CHAMA LER QR VIA UPLOAD (DECODIFICA IMAGEM PARA TEXTO)
    lerQrViaUpload(file, (qrResponse) => {
        // O qrResponse do /api/qrcode/decode é: { "qrCode": "TEXTO_LIDO" }
        const qrCodeContent = qrResponse.qrCode;

        if (!qrCodeContent) {
            btnLerQrUpload.classList.remove('loading');
            btnLerQrUpload.innerHTML = '<i class="fas fa-qrcode"></i> Ler QR Code por Arquivo';
            showAlert("Erro de Leitura", "O QR Code não pôde ser decodificado.");
            if (infoAluno) infoAluno.style.display = "none";
            return;
        }

        // 2. BUSCA O USUÁRIO COMPLETO USANDO O CÓDIGO DO QR
        if (statusMsgLogin) statusMsgLogin.textContent = "Buscando usuário...";
        
        fetch(`${API_BASE_URL}/api/usuarios/por-codigo/${qrCodeContent}`)
            .then(res => {
                if (!res.ok) throw new Error("Código não encontrado");
                return res.json();
            })
            .then(usuarioCompleto => {
                // 3. SUCESSO: Salva e exibe o objeto completo
                btnLerQrUpload.classList.remove('loading');
                btnLerQrUpload.innerHTML = '<i class="fas fa-qrcode"></i> Ler QR Code por Arquivo';

                if (loginControls) loginControls.style.display = 'none';
                
                // É necessário embrulhar em { usuario: usuarioCompleto } para manter o padrão de exibirUsuario/salvarUsuarioLogado
                exibirUsuario({ usuario: usuarioCompleto }); 
                salvarUsuarioLogado({ usuario: usuarioCompleto }); // Salva corretamente no localStorage

                if (statusMsgLogin) statusMsgLogin.textContent = "Login bem-sucedido!";
                if (infoAluno) infoAluno.style.display = "block";

                // CORREÇÃO: Redireciona usando a função performRedirect
                setTimeout(performRedirect, 500);
            })
            .catch(err => {
                // 3. ERRO: Falha ao buscar usuário com o código
                btnLerQrUpload.classList.remove('loading');
                btnLerQrUpload.innerHTML = '<i class="fas fa-qrcode"></i> Ler QR Code por Arquivo';
                console.error(err);
                showAlert("Erro de Login", "Usuário não encontrado para o código lido.");
                if (statusMsgLogin) statusMsgLogin.textContent = "Erro no login.";
                if (infoAluno) infoAluno.style.display = "none";
            });

    }, (err) => {
        // 1. ERRO: Falha na decodificação da imagem
        btnLerQrUpload.classList.remove('loading');
        btnLerQrUpload.innerHTML = '<i class="fas fa-qrcode"></i> Ler QR Code por Arquivo';

        console.error("Erro upload:", err);
        
        showAlert("Erro de Leitura", "A imagem enviada não é um QR Code válido ou está ilegível.");
        
        if (infoAluno) infoAluno.style.display = "none";
    });
});

// NOVO BLOCO: Lógica de login por usuário/senha (assumindo que o formulário é `login-form`)
document.getElementById('login-form')?.addEventListener('submit', async function(event) {
    event.preventDefault();
    const usernameInput = document.getElementById('username'); // Assumindo IDs padrão
    const passwordInput = document.getElementById('password'); // Assumindo IDs padrão
    
    if (!usernameInput || !passwordInput) {
        console.error("Campos de login não encontrados.");
        return;
    }

    // @ts-ignore
    const username = usernameInput.value; 
    // @ts-ignore
    const password = passwordInput.value;
    
    if (statusMsgLogin) statusMsgLogin.textContent = "Verificando credenciais...";

    try {
        const response = await fetch(`${API_BASE_URL}/api/usuarios/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, senha: password })
        });

        if (response.ok) {
            const usuarioLogado = await response.json();
            salvarUsuarioLogado(usuarioLogado); // Assume que esta função manipula o localStorage
            
            if (statusMsgLogin) statusMsgLogin.textContent = "Sucesso! Redirecionando...";
            // CORREÇÃO: Redireciona usando a função performRedirect
            setTimeout(performRedirect, 500);
            
        } else {
            const errorData = await response.json().catch(() => ({ erro: "Erro de autenticação" }));
            showAlert("Erro de Login", errorData.erro || "Credenciais inválidas.");
            if (statusMsgLogin) statusMsgLogin.textContent = "Erro no login.";
        }
    } catch (error) {
        console.error('Erro de rede/API:', error);
        showAlert("Erro de Conexão", "Não foi possível conectar ao servidor.");
        if (statusMsgLogin) statusMsgLogin.textContent = "Erro de conexão.";
    }
});


function salvarUsuarioLogado(usuario) {
    const dadosReais = usuario.usuario || usuario; 
    const idUsuario = dadosReais.id || dadosReais.usuarioId;
    if (!idUsuario) return;

    const usuarioFormatado = {
        id: idUsuario,
        nome: dadosReais.nome || "Usuário", 
        turma: dadosReais.turma, 
        qrCode: dadosReais.qrCode
    };
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioFormatado));
}

// Exibe nome do arquivo selecionado
const fileNameDisplay = document.getElementById('fileNameDisplay');
loginQrInput?.addEventListener('change', () => {
    // @ts-ignore
    if (loginQrInput.files.length > 0) {
        if (fileNameDisplay) fileNameDisplay.textContent = loginQrInput.files[0].name;
    } else {
        if (fileNameDisplay) fileNameDisplay.textContent = 'Nenhum arquivo escolhido';
    }
});