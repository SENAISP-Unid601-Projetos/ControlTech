import { lerQrViaUpload, exibirUsuario } from './leitorQrCode.js';
import { API_BASE_URL } from './apiConfig.js';

let html5QrCodeLogin = null;

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Botão: Ir para Cadastro ---
    const btnCadastro = document.getElementById('abrirCadastro');
    const boxLogin = document.getElementById('loginContainer');
    const boxCadastro = document.getElementById('cadastroBox');

    if(btnCadastro) {
        btnCadastro.addEventListener('click', () => {
            // Troca de telas
            boxLogin.style.display = 'none';
            boxCadastro.style.display = 'block';

            // Para a câmera de login se estiver rodando
            stopCameraLogin();

            // CHAMA O FLUXO NO CADASTRO.JS
            if (window.iniciarFluxoCadastro) {
                window.iniciarFluxoCadastro();
            } else {
                alert("Erro: Script de cadastro não carregado.");
            }
        });
    }

    // --- Botão: Ligar Câmera (Login) ---
    const btnCamLogin = document.getElementById('btnToggleCameraLogin');
    if(btnCamLogin) {
        btnCamLogin.addEventListener('click', () => {
            const readerDiv = document.getElementById('reader-login');
            const uploadDiv = document.getElementById('loginUploadControls');

            // Toggle
            if(readerDiv.style.display === 'block') {
                stopCameraLogin();
            } else {
                readerDiv.style.display = 'block';
                uploadDiv.style.display = 'none';
                btnCamLogin.innerHTML = '<i class="fas fa-stop"></i> Parar Câmera';
                iniciarCameraLogin();
            }
        });
    }

    // --- Input: Upload Arquivo (Login) ---
    const btnUpload = document.getElementById('btnLerQr');
    const inputUpload = document.getElementById('loginQrInput');
    
    if(btnUpload && inputUpload) {
        btnUpload.addEventListener('click', () => {
            if(inputUpload.files.length === 0) return alert("Selecione um arquivo!");
            
            stopCameraLogin();
            
            lerQrViaUpload(inputUpload.files[0], (usuario) => {
                fazerLoginNoSistema(usuario.qrCode); // Login com o código lido
            }, (err) => {
                document.getElementById('statusMsgLogin').textContent = "QR Code inválido.";
            });
        });
    }
});

// --- Funções Auxiliares Login ---

function iniciarCameraLogin() {
    const divId = "reader-login";
    // @ts-ignore
    html5QrCodeLogin = new Html5Qrcode(divId);
    
    html5QrCodeLogin.start(
        { facingMode: "environment" }, // Tenta traseira, fallback pc
        { fps: 10, qrbox: 250 },
        (texto) => {
            stopCameraLogin();
            fazerLoginNoSistema(texto);
        },
        () => {}
    ).catch(err => console.error(err));
}

function stopCameraLogin() {
    if(html5QrCodeLogin) {
        html5QrCodeLogin.stop().then(() => {
            html5QrCodeLogin.clear();
            html5QrCodeLogin = null;
        }).catch(() => {});
    }
    document.getElementById('reader-login').style.display = 'none';
    document.getElementById('loginUploadControls').style.display = 'block';
    document.getElementById('btnToggleCameraLogin').innerHTML = '<i class="fas fa-video"></i> Usar Câmera';
}

function fazerLoginNoSistema(codigo) {
    document.getElementById('statusMsgLogin').textContent = "Verificando...";
    
    fetch(`${API_BASE_URL}/api/usuarios/por-codigo/${codigo}`)
    .then(res => {
        if(!res.ok) throw new Error();
        return res.json();
    })
    .then(user => {
        // Salva dados e redireciona
        const dados = user.usuario ?? user; // Trata DTO wrapper se houver
        localStorage.setItem("usuarioLogado", JSON.stringify(dados));
        window.location.href = '/HTML/Ferramentas.html';
    })
    .catch(() => {
        document.getElementById('statusMsgLogin').textContent = "Usuário não encontrado!";
    });
}

// Exporta para o Cadastro poder parar esta câmera se necessário
export function stopCamera(dummy) {
    stopCameraLogin();
}