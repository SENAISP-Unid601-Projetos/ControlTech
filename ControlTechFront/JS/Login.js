
// Login.js
import { lerQrViaUpload, exibirUsuario } from './leitorQrCode.js';
import { API_BASE_URL } from './apiConfig.js'; // Importa URL

// Variáveis globais para o leitor de QR Code (instâncias da biblioteca)
window.html5QrCodeCadastro = null;
let html5QrCodeLogin = null;

// ----- Fundo hexagonal (mantido) -----
const container = document.getElementById('container');
let innerHTML = '';
for (let i = 0; i < 15; i++) {
    innerHTML += '<div class="row">';
    for (let j = 0; j < 20; j++) {
        innerHTML += '<div class="hexagon"></div>';
    }
    innerHTML += '</div>';
}
if (container) container.innerHTML = innerHTML;

// ----- Popup e entrar (mantido) -----
const btnEntrar = document.getElementById('btnEntrar');
const popup = document.getElementById('popup');
const popupNome = document.getElementById('popupNome');
const statusMsgLogin = document.getElementById('statusMsgLogin');
const infoAluno = document.getElementById('infoAluno');

btnEntrar?.addEventListener('click', () => {
    // @ts-ignore
    popupNome.textContent = document.getElementById('nomeAluno').textContent;
    // @ts-ignore
    popup.classList.remove('hidden');
});

document.getElementById('fecharPopup')?.addEventListener('click', () => {
    // @ts-ignore
    popup.classList.add('hidden');
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (usuarioLogado) {
        // Para a câmera antes de sair
        stopCamera('login');
        window.location.href = '/HTML/Ferramentas.html';
    } else {
        alert("Faça login com QR Code antes de entrar.");
    }
});

// ----- Abrir cadastro (CORRIGIDO) -----
const abrirCadastro = document.getElementById('abrirCadastro');
const cadastroBox = document.getElementById('cadastroBox');
const loginContainer = document.getElementById('loginContainer');
const voltarLogin = document.getElementById('voltarLogin');

abrirCadastro?.addEventListener('click', () => {
    // @ts-ignore
    loginContainer.classList.add('slide-out');
    // @ts-ignore
    cadastroBox.classList.add('active'); // CORREÇÃO: Adiciona 'active' para exibir a caixa de cadastro
    // Certifique-se de parar a câmera de login ao ir para o cadastro
    stopCamera('login');
});

voltarLogin?.addEventListener('click', () => {
    // @ts-ignore
    loginContainer.classList.remove('slide-out');
    // @ts-ignore
    cadastroBox.classList.remove('active');
    // Certifique-se de parar a câmera de cadastro ao voltar para o login
    // @ts-ignore
    stopCamera('cadastro');
});


// ----- Funções Auxiliares de Câmera (Aprimoradas para PC e Mobile) -----

export function stopCamera(mode) {
    const readerId = mode === 'login' ? 'reader-login' : 'reader-cadastro';
    const readerContainer = document.getElementById(readerId);

    let reader = mode === 'login' ? html5QrCodeLogin : window.html5QrCodeCadastro;
    // Referencia o botão de câmera de Login pelo ID correto
    let btn = mode === 'login' ? document.getElementById('btnToggleCameraLogin') : document.getElementById('btnToggleCameraCadastro');
    const uploadControls = document.getElementById(mode === 'login' ? 'loginUploadControls' : 'cadastroUploadControls');

    if (reader && reader.isScanning) {
        reader.stop().then(ignore => {
            if (readerContainer) readerContainer.style.display = 'none';
            if (btn) btn.innerHTML = '<i class="fas fa-video"></i> Usar Câmera';
            // Adicionado fallback para o ID do botão de cadastro
            if (mode === 'cadastro' && btn) btn.innerHTML = '<i class="fas fa-video"></i> Ler Crachá com Câmera';

            if(uploadControls) uploadControls.style.display = 'block'; // NOVO: Mostra controles de upload

            // Clear the reader instance
            if (mode === 'login') html5QrCodeLogin = null;
            else window.html5QrCodeCadastro = null;
        }).catch(err => console.error("Erro ao parar câmera:", err));
    } else {
        // Garante que a opção de upload esteja visível se a câmera não estava ativa (caso de erro)
        if(uploadControls) uploadControls.style.display = 'block';
    }
}

export function startCamera(mode, onScanSuccess) {
    const readerId = mode === 'login' ? 'reader-login' : 'reader-cadastro';
    const readerContainer = document.getElementById(readerId);
    // Referencia o botão de câmera de Login pelo ID correto
    const btn = document.getElementById(mode === 'login' ? 'btnToggleCameraLogin' : 'btnToggleCameraCadastro');
    const uploadControls = document.getElementById(mode === 'login' ? 'loginUploadControls' : 'cadastroUploadControls'); // Referência ao novo container

    if (readerContainer && readerContainer.style.display === 'block') {
        stopCamera(mode);
        return;
    }

    if (readerContainer) readerContainer.style.display = 'block';
    if (btn) btn.innerHTML = '<i class="fas fa-stop-circle"></i> Parar Câmera';
    if (uploadControls) uploadControls.style.display = 'none'; // NOVO: Oculta controles de upload


    // Cria a instância se necessário
    if (mode === 'login' && !html5QrCodeLogin) {
        // @ts-ignore
        html5QrCodeLogin = new Html5Qrcode(readerId);
    } else if (mode === 'cadastro' && !window.html5QrCodeCadastro) {
        // @ts-ignore
        window.html5QrCodeCadastro = new Html5Qrcode(readerId);
    }

    let reader = mode === 'login' ? html5QrCodeLogin : window.html5QrCodeCadastro;

    const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        disableFlip: false // Importante para leitura de tela
    };

    if (reader) {
        // @ts-ignore
        Html5Qrcode.getCameras().then(devices => {
            if (devices && devices.length) {

                // --- LÓGICA REFINADA: Prioriza Câmera Traseira/Externa ---
                let startSource = devices[0].id; // Fallback: O primeiro dispositivo

                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

                if (isMobile) {
                    // Tenta iniciar com facingMode: environment no mobile para forçar traseira
                    startSource = { facingMode: { exact: "environment" } };
                } else {
                     // No PC, tenta encontrar a câmera que NÃO é a frontal (se houver mais de uma)
                    const rearCamera = devices.find(device =>
                        !device.label.toLowerCase().includes('front') &&
                        !device.label.toLowerCase().includes('user')
                    );

                    if (rearCamera) {
                         startSource = rearCamera.id;
                    } else if (devices.length > 1) {
                        // Se não encontrou pelo label, usa a última da lista (padrão em muitos Androids/iOS)
                         startSource = devices[devices.length - 1].id;
                    }
                }
                // --- FIM LÓGICA REFINADA ---

                reader.start(startSource, config, onScanSuccess, (error) => {
                    // Callback de erro de scanning (ignorado)
                })
                .catch((err) => {
                    console.error("ERRO CRÍTICO ao iniciar câmera:", err);
                    alert("ERRO: Falha ao iniciar a câmera. Detalhe: " + err);
                    stopCamera(mode);
                });
            } else {
                alert("Nenhuma câmera detectada no seu dispositivo. Use a opção 'Escolher Arquivo'.");
                stopCamera(mode);
            }
        }).catch(err => {
            console.error("ERRO ao listar câmeras:", err);
            alert("ERRO: Falha ao listar dispositivos de câmera.");
            stopCamera(mode);
        });
    }
}


// ----- Lógica de Login via Câmera (NOVA) -----
document.getElementById('btnToggleCameraLogin')?.addEventListener('click', () => {
    // @ts-ignore
    stopCamera('cadastro');
    startCamera('login', (decodedText, decodedResult) => {
        stopCamera('login');
        handleLoginSuccess(decodedText);
    });
});

function handleLoginSuccess(qrCodeContent) {
    if (statusMsgLogin) statusMsgLogin.textContent = "Processando QR Code lido...";
    
    // NOVO: Referência ao novo container de controles
    const loginControls = document.getElementById('loginControls');

    // CORREÇÃO CRÍTICA: Mapeamento para o novo endpoint GET
    fetch(`${API_BASE_URL}/api/usuarios/por-codigo/${qrCodeContent}`)
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => { throw new Error(text || "Código não encontrado"); });
            }
            return res.json();
        })
        .then(usuario => {
            // @ts-ignore
            salvarUsuarioLogado({ usuario: usuario });

            // ** NOVO: OCULTA OS CONTROLES ANTIGOS **
            if (loginControls) loginControls.style.display = 'none';

            // @ts-ignore
            exibirUsuario({ usuario: usuario }); // Exibe info-aluno (que contém o btnEntrar)

            if (statusMsgLogin) statusMsgLogin.textContent = "Login bem-sucedido! Clique em 'Entrar' para continuar.";
            if (infoAluno) infoAluno.style.display = "block";

        })
        .catch(err => {
            console.error("Erro ao fazer login por QR:", err);
            let msgErro = (err.message.includes("404")) ? "Usuário não encontrado." : `QR Code inválido ou não registrado. (${err.message})`;
            if (statusMsgLogin) statusMsgLogin.textContent = msgErro;
            if (infoAluno) infoAluno.style.display = "none";
        });
}

// ----- Lógica de Login via Upload (Botão atualizado e Corrigido) -----
// CORREÇÃO: Altera a referência para o ID correto do botão no HTML.
const btnLerQrUpload = document.getElementById('btnLerQr');
const loginQrInput = document.getElementById('loginQrInput');

btnLerQrUpload?.addEventListener('click', () => {
    // @ts-ignore
    const file = loginQrInput.files[0];
    if (!file) return alert("Selecione um QR Code!");

    // Stop camera if running
    stopCamera('login');

    btnLerQrUpload.classList.add('loading');
    btnLerQrUpload.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
    
    // NOVO: Referência ao novo container de controles
    const loginControls = document.getElementById('loginControls');

    // CORRIGIDO: Chama a função que faz o fetch com a URL pública
    // @ts-ignore
    lerQrViaUpload(file, (usuario) => {
        btnLerQrUpload.classList.remove('loading');
        btnLerQrUpload.innerHTML = '<i class="fas fa-qrcode"></i> Ler QR Code por Arquivo';

        // ** NOVO: OCULTA OS CONTROLES ANTIGOS **
        if (loginControls) loginControls.style.display = 'none';

        // @ts-ignore
        exibirUsuario(usuario);
        // @ts-ignore
        salvarUsuarioLogado(usuario);

        if (statusMsgLogin) statusMsgLogin.textContent = "Login bem-sucedido! Clique em 'Entrar' para continuar.";
        if (infoAluno) infoAluno.style.display = "block";
    // @ts-ignore
    }, (err) => {
        btnLerQrUpload.classList.remove('loading');
        btnLerQrUpload.innerHTML = '<i class="fas fa-qrcode"></i> Ler QR Code por Arquivo';

        console.error(err);
        if (statusMsgLogin) statusMsgLogin.textContent = "QR Code inválido. Tente novamente.";
        if (infoAluno) infoAluno.style.display = "none";
    });
});


// ----- Funções auxiliares (salvarUsuarioLogado, exibirLoginUsuario) (mantidas) -----

// @ts-ignore
function salvarUsuarioLogado(usuario) {
    console.log("Usuário recebido do backend:", usuario);
    // Pega o objeto de usuário, seja ele diretamente ou dentro do wrapper 'usuario'
    const dadosReais = usuario.usuario ?? usuario;

    const idUsuario = dadosReais.id
        ?? dadosReais.usuarioId;

    if (!idUsuario) {
        alert("Erro: não foi possível identificar o usuário retornado pelo backend.");
        return;
    }

    const usuarioFormatado = {
        id: idUsuario,
        nome: dadosReais.nome,
        perfil: dadosReais.perfil,
        qrCode: dadosReais.qrCode
    };

    console.log("Usuário salvo no localStorage:", usuarioFormatado);
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioFormatado));
}

// @ts-ignore
function exibirLoginUsuario(usuario) {
    // Nota: Esta função não está sendo usada no fluxo atual (handleLoginSuccess/btnLerQrUpload),
    // mas é mantida por compatibilidade caso seja chamada em outro lugar.
    // @ts-ignore
    document.getElementById("nomeAluno").textContent = usuario.nome;
    // @ts-ignore
    document.getElementById("idAluno").textContent = usuario.id ?? usuario.usuarioId;
    // @ts-ignore
    document.getElementById("perfilAluno").textContent = usuario.perfil;
    // @ts-ignore
    document.getElementById("qrCodeAluno").textContent = usuario.qrCode;

    salvarUsuarioLogado(usuario);
}


// --- Código para exibir o nome do arquivo no LOGIN (mantido) ---
const fileNameDisplay = document.getElementById('fileNameDisplay');
loginQrInput?.addEventListener('change', () => {
    // @ts-ignore
    if (loginQrInput.files.length > 0) {
        // @ts-ignore
        if (fileNameDisplay) fileNameDisplay.textContent = loginQrInput.files[0].name;
    } else {
        // @ts-ignore
        if (fileNameDisplay) fileNameDisplay.textContent = 'Nenhum arquivo escolhido';
    }
});
