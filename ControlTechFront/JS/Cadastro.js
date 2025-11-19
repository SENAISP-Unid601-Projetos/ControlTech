import { API_BASE_URL } from './apiConfig.js';
import { startCamera, stopCamera } from './Login.js';

const btnToggleCameraCadastro = document.getElementById('btnToggleCameraCadastro');
const btnCadastrar = document.getElementById('btnCadastrar');
const nomeCadastroInput = document.getElementById('nomeCadastro');
const perfilCadastroInput = document.getElementById('perfilCadastro');
const statusMsgCadastro = document.getElementById('statusMsgCadastro');
const popupCadastro = document.getElementById('popupCadastro');
const popupNomeCadastro = document.getElementById('popupNomeCadastro');
const cadastroQrInput = document.getElementById('cadastroQrInput');
const cadastroFileNameDisplay = document.getElementById('cadastroFileNameDisplay');

let qrCodeLido = null;

// ----------------- LÓGICA DA CÂMERA DE CADASTRO -----------------
// Usa a mesma lógica corrigida do Login.js (startCamera detecta mobile/pc)

btnToggleCameraCadastro?.addEventListener('click', () => {
    // Garante que a câmera de login pare
    stopCamera('login');

    // Inicia câmera em modo 'cadastro'
    startCamera('cadastro', (decodedText, decodedResult) => {
        // Sucesso na leitura da câmera
        stopCamera('cadastro');
        qrCodeLido = decodedText;
        if(statusMsgCadastro) statusMsgCadastro.textContent = `QR Code lido: ${decodedText}. Prossiga com o cadastro.`;
        if(statusMsgCadastro) statusMsgCadastro.style.color = "green";
    });
});

// ----------------- LÓGICA DE UPLOAD DE CADASTRO (CORRIGIDA) -----------------

cadastroQrInput?.addEventListener('change', () => {
    const file = cadastroQrInput.files[0];
    if (!file) return;

    stopCamera('cadastro'); // Para a câmera se estiver rodando
    qrCodeLido = null;

    const formData = new FormData();
    formData.append("file", file);

    if (statusMsgCadastro) {
        statusMsgCadastro.textContent = "Processando QR Code do arquivo...";
        statusMsgCadastro.style.color = "orange";
    }

    // --- CORREÇÃO PRINCIPAL: Usa o endpoint /decodificar ---
    fetch(`${API_BASE_URL}/api/qrcode/decodificar`, {
        method: "POST",
        body: formData
    })
    .then(res => {
        if (!res.ok) {
            return res.text().then(text => { throw new Error(text || "Erro ao ler imagem."); });
        }
        return res.json();
    })
    .then(data => {
        // O Backend novo retorna: { "qrCode": "12345" }
        const qrCodeTexto = data.qrCode;
        
        if (qrCodeTexto) {
            qrCodeLido = qrCodeTexto;
            if (statusMsgCadastro) {
                statusMsgCadastro.textContent = `QR Code lido: ${qrCodeTexto}. Prossiga com o cadastro.`;
                statusMsgCadastro.style.color = "green";
            }
        } else {
             throw new Error("QR Code ilegível ou resposta vazia.");
        }
    })
    .catch(err => {
        console.error("Erro upload cadastro:", err);
        qrCodeLido = null;
        if (statusMsgCadastro) {
            statusMsgCadastro.textContent = "Erro: " + err.message;
            statusMsgCadastro.style.color = "red";
        }
    });

    if (cadastroFileNameDisplay) {
        cadastroFileNameDisplay.textContent = file.name;
    }
});


// ----------------- LÓGICA DE SALVAR CADASTRO (POST) -----------------

btnCadastrar?.addEventListener('click', async () => {
    const nome = nomeCadastroInput.value.trim();
    const perfil = perfilCadastroInput.value.trim();

    if (!nome || !perfil || !qrCodeLido) {
        if (statusMsgCadastro) {
            statusMsgCadastro.textContent = "Preencha todos os campos e leia o crachá/QR Code!";
            statusMsgCadastro.style.color = "red";
        }
        return;
    }

    if(statusMsgCadastro) {
        statusMsgCadastro.textContent = 'Enviando dados...';
        statusMsgCadastro.style.color = "blue";
    }

    const usuarioData = {
        nome: nome,
        perfil: perfil,
        qrCode: qrCodeLido
    };

    try {
        const response = await fetch(`${API_BASE_URL}/api/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioData)
        });

        if (!response.ok) {
             const errorText = await response.text();
             throw new Error(errorText || `Falha no cadastro: ${response.status}`);
        }

        const usuarioCadastrado = await response.json();

        // Sucesso: exibe popup
        if(popupNomeCadastro) popupNomeCadastro.textContent = usuarioCadastrado.nome;
        if(popupCadastro) popupCadastro.classList.remove('hidden');

        // Limpa tudo
        if (nomeCadastroInput) nomeCadastroInput.value = '';
        if (perfilCadastroInput) perfilCadastroInput.value = '';
        if (cadastroQrInput) cadastroQrInput.value = '';
        if (cadastroFileNameDisplay) cadastroFileNameDisplay.textContent = "Nenhum arquivo escolhido";
        qrCodeLido = null;
        if(statusMsgCadastro) statusMsgCadastro.textContent = '';

    } catch (error) {
        console.error('Erro no cadastro:', error);
        if(statusMsgCadastro) {
            statusMsgCadastro.textContent = 'ERRO: ' + (error.message || 'Falha na comunicação.');
            statusMsgCadastro.style.color = "red";
        }
    } finally {
        if(btnCadastrar) btnCadastrar.innerHTML = 'Cadastrar';
    }
});

// ----------------- POPUP E EVENTOS DE NAVEGAÇÃO -----------------

document.getElementById('fecharPopupCadastro')?.addEventListener('click', () => {
    popupCadastro.classList.add('hidden');
    // Volta para o login
    document.getElementById('voltarLogin')?.click();
});