// Cadastro.js
import { API_BASE_URL } from './apiConfig.js';
// Importa funções de controle de câmera do Login.js
import { startCamera, stopCamera } from './Login.js';

const btnToggleCameraCadastro = document.getElementById('btnToggleCameraCadastro');
const btnCadastrar = document.getElementById('btnCadastrar');
const nomeCadastroInput = document.getElementById('nomeCadastro');
const turmaCadastroInput = document.getElementById('turmaCadastro'); // <-- CORRIGIDO: Busca a ID 'turmaCadastro'
const statusMsgCadastro = document.getElementById('statusMsgCadastro');
const popupCadastro = document.getElementById('popupCadastro');
const popupNomeCadastro = document.getElementById('popupNomeCadastro');
const cadastroQrInput = document.getElementById('cadastroQrInput'); 
const cadastroFileNameDisplay = document.getElementById('cadastroFileNameDisplay'); 

let qrCodeLido = null; 

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

// ----------------- LÓGICA DE UPLOAD DE CADASTRO -----------------

cadastroQrInput?.addEventListener('change', () => {
    // @ts-ignore
    const file = cadastroQrInput.files[0];
    if (!file) return;

    stopCamera('cadastro'); 
    qrCodeLido = null; 

    const formData = new FormData();
    formData.append("file", file);

    if (statusMsgCadastro) statusMsgCadastro.textContent = "Processando QR Code do arquivo...";

    // Usa o endpoint /api/qrcode/decode
    fetch(`${API_BASE_URL}/api/qrcode/decode`, { 
        method: "POST",
        body: formData
    })
    // Tratamento para verificar a resposta e extrair 'qrCode'
    .then(res => {
        if (!res.ok) {
            return res.text().then(text => Promise.reject(text || "Erro desconhecido ao ler QR Code."));
        }
        return res.json();
    })
    .then(data => {
        const qrCodeTexto = data.qrCode; 
        if (qrCodeTexto) {
            qrCodeLido = qrCodeTexto;
            // @ts-ignore
            if (statusMsgCadastro) statusMsgCadastro.textContent = `QR Code do arquivo lido: ${qrCodeTexto}. Prossiga com o cadastro.`;
        } else {
            throw new Error("QR Code não pôde ser extraído ou está vazio.");
        }
    })
    .catch(err => {
        console.error(err);
        qrCodeLido = null;
        // @ts-ignore
        if (statusMsgCadastro) statusMsgCadastro.textContent = "Erro ao ler QR Code do arquivo: " + (typeof err === 'string' ? err : err.message || 'Falha na comunicação.');
    });

    // Código para exibir o nome do arquivo no CADASTRO
    // @ts-ignore
    if (cadastroFileNameDisplay) {
        // @ts-ignore
        cadastroFileNameDisplay.textContent = file.name;
    }
});


// ----------------- LÓGICA DE CADASTRO (POST) -----------------

btnCadastrar?.addEventListener('click', async (e) => {
    e.preventDefault(); 

    // VERIFICAÇÃO ADICIONAL DE NULO: Garante que os elementos existem antes de tentar ler .value
    if (!nomeCadastroInput || !turmaCadastroInput) {
        console.error("Erro: Elementos de input (nome ou turma/perfil) não encontrados no DOM.");
        // @ts-ignore
        if (statusMsgCadastro) statusMsgCadastro.textContent = "Erro de carregamento: Campo de entrada ausente.";
        return;
    }

    // Leitura dos valores
    // @ts-ignore
    const nome = nomeCadastroInput.value.trim();
    // @ts-ignore
    const turma = turmaCadastroInput.value.trim(); 
    
    if (!nome || !turma || !qrCodeLido) { 
        // @ts-ignore
        if (statusMsgCadastro) statusMsgCadastro.textContent = "Preencha todos os campos e leia o crachá/QR Code!";
        return;
    }

    // @ts-ignore
    if(statusMsgCadastro) statusMsgCadastro.textContent = 'Enviando dados...';

    const usuarioData = {
        nome: nome,
        turma: turma, // CHAVE MANTIDA como 'perfil' para o backend
        qrCode: qrCodeLido
    };

    console.log("Tentando cadastrar em:", `${API_BASE_URL}/api/usuarios`);

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

        // Sucesso
        // @ts-ignore
        if(popupNomeCadastro) popupNomeCadastro.textContent = usuarioCadastrado.nome;
        // @ts-ignore
        if(popupCadastro) popupCadastro.classList.remove('hidden');

        // Limpa tudo
        // @ts-ignore
        if (nomeCadastroInput) nomeCadastroInput.value = '';
        // @ts-ignore
        if (turmaCadastroInput) turmaCadastroInput.value = ''; 
        // @ts-ignore
        if (cadastroQrInput) cadastroQrInput.value = '';
        qrCodeLido = null;
        // @ts-ignore
        if(statusMsgCadastro) statusMsgCadastro.textContent = '';

    } catch (error) {
        console.error('Erro no cadastro:', error);
        // @ts-ignore
        if(statusMsgCadastro) statusMsgCadastro.textContent = 'ERRO: ' + (error.message || 'Falha na comunicação.');
    } finally {
        // @ts-ignore
        if(btnCadastrar) btnCadastrar.innerHTML = 'Cadastrar';
    }
});

document.getElementById('fecharPopupCadastro')?.addEventListener('click', () => {
    // @ts-ignore
    popupCadastro.classList.add('hidden');
    // Força o retorno para o login limpando a câmera de cadastro
    document.getElementById('voltarLogin')?.click();
});