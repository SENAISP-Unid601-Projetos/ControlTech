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
  popupNome.textContent = document.getElementById('nomeAluno').textContent;
  popup.classList.remove('hidden');
});

document.getElementById('fecharPopup')?.addEventListener('click', () => {
  popup.classList.add('hidden');
  window.location.href = '/HTML/Ferramentas.html';
});

// ----- Abrir cadastro -----
const abrirCadastro = document.getElementById('abrirCadastro');
const cadastroBox = document.getElementById('cadastroBox');
const loginContainer = document.getElementById('loginContainer');
const voltarLogin = document.getElementById('voltarLogin');

abrirCadastro?.addEventListener('click', () => {
  loginContainer.classList.add('slide-out');
  cadastroBox.classList.add('active');
});

voltarLogin?.addEventListener('click', () => {
  loginContainer.classList.remove('slide-out');
  cadastroBox.classList.remove('active');
});

// ----- Ler QR Code LOGIN -----
const btnLerQr = document.getElementById('btnLerQr');
const loginQrInput = document.getElementById('loginQrInput');
const statusMsgLogin = document.getElementById('statusMsgLogin');
const infoAluno = document.getElementById('infoAluno');

btnLerQr?.addEventListener('click', () => {
  const file = loginQrInput.files[0];
  if (!file) return alert("Selecione um QR Code!");

  lerQrViaUpload(file, (usuario) => {
    exibirUsuario(usuario);  // preenche campos: idAluno, nomeAluno, perfilAluno, qrCodeAluno
    statusMsgLogin.textContent = "";
    infoAluno.style.display = "block";
  }, (err) => {
    console.error(err);
    statusMsgLogin.textContent = "QR Code inválido. Tente novamente.";
    infoAluno.style.display = "none";
  });
});
function salvarUsuarioLogado(usuario) {
    // Salva apenas o ID do usuário
    localStorage.setItem("usuarioId", usuario.id);
}
function exibirLoginUsuario(usuario) {
    document.getElementById("nomeAluno").textContent = usuario.nome;
    document.getElementById("idAluno").textContent = usuario.id;
    document.getElementById("perfilAluno").textContent = usuario.perfil;
    document.getElementById("qrCodeAluno").textContent = usuario.qrCode;

    salvarUsuarioLogado(usuario); // salva ID no localStorage
}
