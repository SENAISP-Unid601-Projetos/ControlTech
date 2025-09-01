// Login.js
import './cadastro.js'; // Importa o JS do cadastro

import { lerQrViaUpload, lerQrViaCodigo, exibirUsuario } from './leitorQrCode.js';

// ---------- Fundo hexagonal ----------
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

// ---------- Função botão "Entrar" do popup ----------
export function entrar() {
  const nome = document.getElementById('nomeAluno')?.textContent;
  const popupNome = document.getElementById('popupNome');
  if (popupNome) popupNome.textContent = nome ?? "";
  const popup = document.getElementById('popup');
  if (popup) popup.classList.remove('hidden');
}

// ---------- Fechar popup e redirecionar ----------
document.addEventListener("DOMContentLoaded", () => {
  const btnFechar = document.getElementById('fecharPopup');
  if (btnFechar) {
    btnFechar.addEventListener('click', () => {
      const popup = document.getElementById('popup');
      if (popup) popup.classList.add('hidden');
      window.location.href = '/HTML/Ferramentas.html';
    });
  }
});

const btnEntrar = document.getElementById('btnEntrar');
if (btnEntrar) {
  btnEntrar.addEventListener('click', () => {
    const nome = document.getElementById('nomeAluno')?.textContent;
    const popupNome = document.getElementById('popupNome');
    if (popupNome) popupNome.textContent = nome ?? "";
    const popup = document.getElementById('popup');
    if (popup) popup.classList.remove('hidden');
  });
}

// ---------- Upload de QR Code ----------
const btnLerQr = document.getElementById('btnLerQr');
if (btnLerQr) {
  btnLerQr.addEventListener('click', () => {
    const file = document.getElementById('qrcodeInput')?.files[0];
    if (!file) return alert("Selecione um QR Code para leitura!");

    lerQrViaUpload(file, exibirUsuario, (err) => {
      console.error(err);
      const statusMsg = document.getElementById('statusMsg');
      if (statusMsg) statusMsg.textContent = "Crachá não reconhecido. Tente novamente.";
      const infoAluno = document.getElementById('infoAluno');
      if (infoAluno) infoAluno.style.display = 'none';
    });
  });
}

// ---------- Código manual ----------
const btnEnviarCodigo = document.getElementById('btnEnviarCodigo');
if (btnEnviarCodigo) {
  btnEnviarCodigo.addEventListener('click', () => {
    const codigo = document.getElementById('codigoQr')?.value.trim();
    if (!codigo) return alert("Digite o código do QR!");

    lerQrViaCodigo(codigo, exibirUsuario, (err) => {
      console.error(err);
      const statusMsg = document.getElementById('statusMsg');
      if (statusMsg) statusMsg.textContent = "Código não reconhecido. Tente novamente.";
      const infoAluno = document.getElementById('infoAluno');
      if (infoAluno) infoAluno.style.display = 'none';
    });
  });
}

// ---------- Abrir e voltar para cadastro ----------
const abrirCadastro = document.getElementById('abrirCadastro');
const cadastroBox = document.getElementById('cadastroBox');
const loginContainer = document.getElementById('loginContainer');
const voltarLogin = document.getElementById('voltarLogin');

abrirCadastro.addEventListener('click', () => {
  loginContainer.classList.add('slide-out');
  cadastroBox.classList.add('active');
});

voltarLogin.addEventListener('click', () => {
  loginContainer.classList.remove('slide-out');
  cadastroBox.classList.remove('active');
});
