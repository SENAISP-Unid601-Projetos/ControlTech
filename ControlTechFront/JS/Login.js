// Login.js
import { lerQrViaUpload, lerQrViaCodigo, exibirUsuario } from './leitorQrCode.js';

// Popula fundo hexagonal
const container = document.getElementById('container');
let innerHTML = '';
for (let i = 0; i < 15; i++) {
  innerHTML += '<div class="row">';
  for (let j = 0; j < 20; j++) {
    innerHTML += '<div class="hexagon"></div>';
  }
  innerHTML += '</div>';
}
container.innerHTML = innerHTML;

// Função do botão "Entrar" do popup
export function entrar() {
  const nome = document.getElementById('nomeAluno').textContent;
  document.getElementById('popupNome').textContent = nome;
  document.getElementById('popup').classList.remove('hidden');
}

// Fechar popup e redirecionar
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('fecharPopup').addEventListener('click', () => {
    document.getElementById('popup').classList.add('hidden');
    window.location.href = '/HTML/Ferramentas.html';
  });
});

// ---------- Upload de QR Code ----------
document.getElementById('btnLerQr').addEventListener('click', () => {
  const file = document.getElementById('qrcodeInput').files[0];
  if (!file) {
    alert("Selecione um QR Code para leitura!");
    return;
  }

  lerQrViaUpload(file, exibirUsuario, (err) => {
    console.error(err);
    document.getElementById('statusMsg').textContent = "Crachá não reconhecido. Tente novamente.";
    const infoAluno = document.getElementById('infoAluno');
    if (infoAluno) infoAluno.style.display = 'none';
  });
});

// ---------- Código manual ----------
document.getElementById('btnEnviarCodigo').addEventListener('click', () => {
  const codigo = document.getElementById('codigoQr').value.trim();
  if (!codigo) {
    alert("Digite o código do QR!");
    return;
  }

  lerQrViaCodigo(codigo, exibirUsuario, (err) => {
    console.error(err);
    document.getElementById('statusMsg').textContent = "Código não reconhecido. Tente novamente.";
    const infoAluno = document.getElementById('infoAluno');
    if (infoAluno) infoAluno.style.display = 'none';
  });
});
