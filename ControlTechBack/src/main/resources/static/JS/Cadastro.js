// Cadastro.js
import { API_BASE_URL } from './apiConfig.js';
// Importa funções de controle de câmera do Login.js
import { startCamera, stopCamera } from './Login.js';

const btnToggleCameraCadastro = document.getElementById('btnToggleCameraCadastro');
const btnCadastrar = document.getElementById('btnCadastrar');
const nomeCadastroInput = document.getElementById('nomeCadastro');
const perfilCadastroInput = document.getElementById('perfilCadastro');
const statusMsgCadastro = document.getElementById('statusMsgCadastro');
const popupCadastro = document.getElementById('popupCadastro');
const popupNomeCadastro = document.getElementById('popupNomeCadastro');
const cadastroQrInput = document.getElementById('cadastroQrInput'); // Necessário para upload
const cadastroFileNameDisplay = document.getElementById('cadastroFileNameDisplay'); // Necessário para upload

let qrCodeLido = null; // Variável para armazenar o QR Code lido pela câmera ou upload

// ----------------- LÓGICA DA CÂMERA DE CADASTRO -----------------

btnToggleCameraCadastro?.addEventListener('click', () => {
    // @ts-ignore
    stopCamera('login');

    // Inicia a câmera em modo 'cadastro'
    startCamera('cadastro', (decodedText, decodedResult) => {
        // Sucesso na leitura
        stopCamera('cadastro'); // Para a câmera imediatamente
        qrCodeLido = decodedText; // Armazena o QR Code
        // @ts-ignore
        if(statusMsgCadastro) statusMsgCadastro.textContent = `QR Code lido: ${decodedText}. Prossiga com o cadastro.`;

    });
});

// ----------------- LÓGICA DE UPLOAD DE CADASTRO (Mantida) -----------------

cadastroQrInput?.addEventListener('change', () => {
    // @ts-ignore
    const file = cadastroQrInput.files[0];
    if (!file) return;

    stopCamera('cadastro'); // Garante que a câmera pare
    qrCodeLido = null; // Reseta QR Code lido pela câmera

    const formData = new FormData();
    formData.append("file", file);

    if (statusMsgCadastro) statusMsgCadastro.textContent = "Processando QR Code do arquivo...";

    // CORRIGIDO: Usa API_BASE_URL
    fetch(`${API_BASE_URL}/api/qrcode/ler`, {
        method: "POST",
        body: formData
    })
    .then(res => res.ok ? res.json() : Promise.reject("Erro ao ler QR Code"))
    .then(data => {
        // O back-end retorna { usuario: { qrCode: "..." } } se for um QR code válido
        const qrCodeTexto = data.usuario.qrCode;
        if (qrCodeTexto) {
            qrCodeLido = qrCodeTexto;
            // @ts-ignore
            if (statusMsgCadastro) statusMsgCadastro.textContent = "QR Code do arquivo lido. Prossiga com o cadastro.";
        } else {
             throw new Error("QR Code não pôde ser extraído do arquivo.");
        }
    })
    .catch(err => {
        console.error(err);
        qrCodeLido = null;
        // @ts-ignore
        if (statusMsgCadastro) statusMsgCadastro.textContent = "Erro ao ler QR Code do arquivo: " + err;
    });

    // Código para exibir o nome do arquivo no CADASTRO (mantido)
    // @ts-ignore
    if (cadastroFileNameDisplay) {
        // @ts-ignore
        cadastroFileNameDisplay.textContent = file.name;
    }
});


// ----------------- LÓGICA DE CADASTRO (POST) -----------------

btnCadastrar?.addEventListener('click', async () => {
    // @ts-ignore
    const nome = nomeCadastroInput.value.trim();
    // @ts-ignore
    const perfil = perfilCadastroInput.value.trim();

    if (!nome || !perfil || !qrCodeLido) {
        // @ts-ignore
        if (statusMsgCadastro) statusMsgCadastro.textContent = "Preencha todos os campos e leia o crachá/QR Code!";
        return;
    }

    // @ts-ignore
    if(statusMsgCadastro) statusMsgCadastro.textContent = 'Enviando dados...';

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
        // @ts-ignore
        if(popupNomeCadastro) popupNomeCadastro.textContent = usuarioCadastrado.nome;
        // @ts-ignore
        if(popupCadastro) popupCadastro.classList.remove('hidden');

        // Limpa os campos e o QR code
        // @ts-ignore
        if (nomeCadastroInput) nomeCadastroInput.value = '';
        // @ts-ignore
        if (perfilCadastroInput) perfilCadastroInput.value = '';
        // @ts-ignore
        if (cadastroQrInput) cadastroQrInput.value = '';
        qrCodeLido = null;
        // @ts-ignore
        if(statusMsgCadastro) statusMsgCadastro.textContent = '';


    } catch (error) {
        console.error('Erro no cadastro:', error);
        // @ts-ignore
        if(statusMsgCadastro) statusMsgCadastro.textContent = 'ERRO: ' + (error.message || 'Falha na comunicação com o servidor.');
    } finally {
        // @ts-ignore
        if(btnCadastrar) btnCadastrar.innerHTML = 'Cadastrar';
    }
});


// ----------------- POPUP E EVENTOS DE NAVEGAÇÃO -----------------

document.getElementById('fecharPopupCadastro')?.addEventListener('click', () => {
    // @ts-ignore
    popupCadastro.classList.add('hidden');
    // Força o retorno para o login limpando a câmera de cadastro
    document.getElementById('voltarLogin')?.click();
});