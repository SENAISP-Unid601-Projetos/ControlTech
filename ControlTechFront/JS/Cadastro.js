import { API_BASE_URL } from './apiConfig.js';
import { stopCamera } from './Login.js';

// === ESTADO ===
let dados = { qrCode: '', fotoBlob: null };
let html5QrCode = null;
let streamVideo = null;

// === REFERÊNCIAS ===
const statusMsg = document.getElementById('statusMsgCadastro');

// === INICIALIZAÇÃO ===
window.iniciarFluxoCadastro = function() {
    console.log(">>> Iniciando Cadastro...");
    limparEstado();
    stopCamera(); 
    irPara('qr');
};

// === NAVEGAÇÃO INTERNA ===
function irPara(etapa) {
    document.getElementById('etapa-qr').style.display = 'none';
    document.getElementById('etapa-foto').style.display = 'none';
    document.getElementById('etapa-form').style.display = 'none';
    statusMsg.textContent = "";

    if (etapa === 'qr') {
        document.getElementById('etapa-qr').style.display = 'block';
        setTimeout(ligarCameraQR, 300);
    } 
    else if (etapa === 'foto') {
        document.getElementById('etapa-foto').style.display = 'block';
        setTimeout(ligarSelfie, 300);
    } 
    else if (etapa === 'form') {
        document.getElementById('etapa-form').style.display = 'block';
        document.getElementById('preview-foto').src = URL.createObjectURL(dados.fotoBlob);
        document.getElementById('txt-qr-lido').textContent = dados.qrCode;
    }
}

// === CÂMERAS ===
function ligarCameraQR() {
    const divId = "leitor-qr-cadastro";
    if (html5QrCode) html5QrCode.clear().catch(() => {});
    
    // @ts-ignore
    html5QrCode = new Html5Qrcode(divId);
    html5QrCode.start({ facingMode: "user" }, { fps: 10, qrbox: 250 }, 
        (texto) => {
            dados.qrCode = texto;
            html5QrCode.stop().then(() => irPara('foto'));
        },
        (err) => { }
    ).catch(err => statusMsg.textContent = "Erro Câmera: " + err);
}

function ligarSelfie() {
    const video = document.getElementById('video-selfie');
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        streamVideo = stream;
        video.srcObject = stream;
    })
    .catch(err => statusMsg.textContent = "Erro Selfie: " + err);
}

document.getElementById('btn-capturar-foto').addEventListener('click', () => {
    const video = document.getElementById('video-selfie');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth; canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.translate(canvas.width, 0); ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);
    
    canvas.toBlob(blob => {
        dados.fotoBlob = blob;
        if(streamVideo) streamVideo.getTracks().forEach(t => t.stop());
        irPara('form');
    }, 'image/jpeg', 0.9);
});

// === FINALIZAR CADASTRO (AQUI ESTÁ A MÁGICA) ===
document.getElementById('btn-finalizar-cadastro').addEventListener('click', async () => {
    const nome = document.getElementById('input-nome').value;
    const perfil = document.getElementById('input-perfil').value;
    
    if(!nome || !perfil) return alert("Preencha todos os campos!");
    
    const btn = document.getElementById('btn-finalizar-cadastro');
    btn.disabled = true;
    btn.textContent = "Salvando...";

    const formData = new FormData();
    formData.append("usuario", new Blob([JSON.stringify({ nome, perfil, qrCode: dados.qrCode })], {type: "application/json"}));
    formData.append("foto", dados.fotoBlob, "perfil.jpg");

    try {
        const res = await fetch(`${API_BASE_URL}/api/usuarios/cadastrar-com-foto`, {
            method: 'POST', body: formData
        });
        
        if(!res.ok) throw new Error(await res.text());
        
        const user = await res.json();
        
        // 1. Mostra Popup de Sucesso
        document.getElementById('popupNomeCadastro').textContent = user.nome;
        document.getElementById('popupCadastro').classList.remove('hidden');
        document.getElementById('popupCadastro').style.display = 'flex';
        
        limparEstado();

        // 2. Redirecionamento Automático após 2 segundos
        setTimeout(() => {
            fecharCadastro(); 
        }, 2000);
        
    } catch(err) {
        statusMsg.textContent = "Erro: " + err.message;
        btn.disabled = false;
        btn.textContent = "Tentar Novamente";
    }
});

// === VOLTAR PARA O LOGIN (Força Bruta) ===
function fecharCadastro() {
    console.log(">>> Voltando para o Login...");
    
    // Esconde o Popup se estiver aberto
    document.getElementById('popupCadastro').style.display = 'none';
    document.getElementById('popupCadastro').classList.add('hidden');

    // Esconde a caixa de Cadastro
    document.getElementById('cadastroBox').style.display = 'none';
    document.getElementById('cadastroBox').classList.remove('active');

    // Mostra a caixa de Login (Força o CSS)
    const loginContainer = document.getElementById('loginContainer');
    loginContainer.style.cssText = "display: block !important; opacity: 1 !important; visibility: visible !important;";
    
    limparEstado();
}

// Eventos dos botões de voltar
document.getElementById('fecharPopupCadastro').addEventListener('click', fecharCadastro);
document.getElementById('btn-cancelar-1').addEventListener('click', fecharCadastro);

document.getElementById('btn-voltar-qr').addEventListener('click', () => {
    if(streamVideo) streamVideo.getTracks().forEach(t => t.stop());
    irPara('qr');
});
document.getElementById('btn-voltar-foto').addEventListener('click', () => irPara('foto'));

function limparEstado() {
    if(html5QrCode) html5QrCode.stop().catch(()=>{});
    if(streamVideo) streamVideo.getTracks().forEach(t => t.stop());
    dados = { qrCode: '', fotoBlob: null };
    document.getElementById('input-nome').value = '';
    document.getElementById('input-perfil').value = '';
    document.getElementById('btn-finalizar-cadastro').disabled = false;
    document.getElementById('btn-finalizar-cadastro').textContent = "Finalizar Cadastro";
}