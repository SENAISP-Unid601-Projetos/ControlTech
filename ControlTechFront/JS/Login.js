// Login.js
import { lerQrViaUpload, exibirUsuario } from './leitorQrCode.js';

// ----- Fundo hexagonal -----
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

// ----- Popup e entrar -----
const btnEntrar = document.getElementById('btnEntrar');
const popup = document.getElementById('popup');
const popupNome = document.getElementById('popupNome');

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
        window.location.href = '/HTML/Ferramentas.html';
    } else {
        alert("Faça login com QR Code antes de entrar.");
    }
});

// ----- Abrir cadastro (Lógica de Transição de Tela) -----
const abrirCadastro = document.getElementById('abrirCadastro');
const cadastroBox = document.getElementById('cadastroBox');
const loginContainer = document.getElementById('loginContainer');
const voltarLogin = document.getElementById('voltarLogin');

abrirCadastro?.addEventListener('click', () => {
    // @ts-ignore
    loginContainer.classList.add('slide-out');
    // @ts-ignore
    cadastroBox.classList.add('active');
});

voltarLogin?.addEventListener('click', () => {
    // @ts-ignore
    loginContainer.classList.remove('slide-out');
    // @ts-ignore
    cadastroBox.classList.remove('active');
});

// ----- Ler QR Code LOGIN -----
const btnLerQr = document.getElementById('btnLerQr');
const loginQrInput = document.getElementById('loginQrInput');
const statusMsgLogin = document.getElementById('statusMsgLogin');
const infoAluno = document.getElementById('infoAluno');

btnLerQr?.addEventListener('click', () => {
    // @ts-ignore
    const file = loginQrInput.files[0];
    if (!file) {
        // @ts-ignore
        fileNameLoginStatus.textContent = "Selecione um arquivo de QR Code!"; // Alerta no status
        return;
    }

    btnLerQr.classList.add('loading');
    btnLerQr.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
    
    // @ts-ignore
    lerQrViaUpload(file, (usuario) => {
        btnLerQr.classList.remove('loading');
        btnLerQr.innerHTML = '<i class="fas fa-qrcode"></i> Ler QR Code';

        exibirUsuario(usuario);  
        salvarUsuarioLogado(usuario);
        // @ts-ignore
        statusMsgLogin.textContent = "";
        // @ts-ignore
        infoAluno.style.display = "block";
        // @ts-ignore
        fileNameLoginStatus.textContent = "Pronto para entrar!"; // Confirmação de leitura

        setTimeout(() => {
            // Removendo redirecionamento automático
            // window.location.href = "/HTML/Ferramentas.html"; 
        }, 300);
    // @ts-ignore
    }, (err) => {
        btnLerQr.classList.remove('loading');
        btnLerQr.innerHTML = '<i class="fas fa-qrcode"></i> Ler QR Code';

        console.error(err);
        // @ts-ignore
        statusMsgLogin.textContent = "QR Code inválido. Tente novamente.";
        // @ts-ignore
        infoAluno.style.display = "none";
        // @ts-ignore
        fileNameLoginStatus.textContent = "Erro na leitura do arquivo."; // Status de erro
    });
});

// ----- Funções auxiliares (salvar e exibir) -----
// @ts-ignore
function salvarUsuarioLogado(usuario) {
    console.log("Usuário recebido do backend:", usuario);
    const idUsuario = usuario.id 
        ?? usuario.usuarioId 
        ?? usuario.usuario?.id; 

    if (!idUsuario) {
        alert("Erro: não foi possível identificar o usuário retornado pelo backend.");
        return;
    }

    const usuarioFormatado = {
        id: idUsuario,
        nome: usuario.nome ?? usuario.usuario?.nome,
        perfil: usuario.perfil ?? usuario.usuario?.perfil,
        qrCode: usuario.qrCode ?? usuario.usuario?.qrCode
    };

    console.log("Usuário salvo no localStorage:", usuarioFormatado);
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioFormatado));
}

// @ts-ignore
function exibirLoginUsuario(usuario) {
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

// ========================================================
// ✅ CÓDIGO INSERIDO: Exibir nome do arquivo de forma CENTRALIZADA
// ========================================================
const fileNameLoginStatus = document.getElementById('fileNameLoginStatus'); // Referência ao novo elemento <p>

loginQrInput?.addEventListener('change', () => {
    // @ts-ignore
    if (loginQrInput.files && loginQrInput.files.length > 0) {
        // @ts-ignore
        fileNameLoginStatus.textContent = `Arquivo "${loginQrInput.files[0].name}" carregado.`;
        // Você pode adicionar um estilo temporário para destacar que foi carregado:
        // fileNameLoginStatus.style.color = '#00b41b';
    } else {
        // @ts-ignore
        fileNameLoginStatus.textContent = 'Nenhum arquivo selecionado';
        // fileNameLoginStatus.style.color = '#888';
    }
});