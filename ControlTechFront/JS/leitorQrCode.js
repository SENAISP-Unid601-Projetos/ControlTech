// leitorQrCode.js
import { API_BASE_URL } from './apiConfig.js';

// --- FUNÇÃO AUXILIAR PARA O POP-UP ---
function mostrarMensagem(titulo, texto, tipo) {
  // Verifica se a biblioteca SweetAlert2 (Swal) foi carregada
  if (typeof Swal !== 'undefined') {
    Swal.fire({
      title: titulo,
      text: texto,
      icon: tipo, // 'success', 'error', 'warning', 'info'
      confirmButtonColor: '#007bff'
    });
  } else {
    // Fallback para o alert normal se não tiver a biblioteca
    alert(`${titulo}: ${texto}`);
  }
}

export function lerQrViaUpload(file, callbackSucesso, callbackErro) {
  // CORREÇÃO: Validação com Pop-up bonito em vez de alert feio
  if (!file) {
    mostrarMensagem("Atenção", "Nenhum arquivo selecionado.", "warning");
    if (callbackErro) callbackErro("Nenhum arquivo selecionado"); // Mantém o fluxo
    return;
  }

  const formData = new FormData();
  formData.append("file", file); 

  // --- ALTERAÇÃO DE ENDPOINT: de /ler para /decode ---
  fetch(`${API_BASE_URL}/api/qrcode/decode`, { 
    method: "POST",
    body: formData,
    mode: 'cors' 
})
  .then(res => res.ok ? res.json() : Promise.reject(`Erro ${res.status} ao ler QR Code`))
  .then(usuario => {
    // Sucesso silencioso ou pode adicionar popup aqui se quiser
    callbackSucesso(usuario);
  })
  .catch(err => {
    // CORREÇÃO: Erro com Pop-up bonito
    console.error(err);
    mostrarMensagem("Erro na Leitura", "Não foi possível identificar o QR Code. (Verifique o Back-End)", "error");
    if (callbackErro) callbackErro(err);
  });
}

export function lerQrViaCodigo(codigo, callbackSucesso, callbackErro) {
  if (!codigo) {
    mostrarMensagem("Atenção", "O código digitado está vazio.", "warning");
    if (callbackErro) callbackErro("Código vazio");
    return;
  }

  fetch(`${API_BASE_URL}/api/usuarios/por-codigo/${codigo}`)
    .then(res => res.ok ? res.json() : Promise.reject(`Erro ${res.status} ao buscar por código`))
    .then(usuario => callbackSucesso(usuario))
    .catch(err => {
      console.error(err);
      mostrarMensagem("Não Encontrado", "Usuário não encontrado com este código.", "error");
      if (callbackErro) callbackErro(err);
    });
}


function setText(id, valor) {
  const el = document.getElementById(id);
  if (el) el.textContent = valor ?? "-";
}

export function exibirUsuario(respostaJson) {
  const usuario = respostaJson.usuario || respostaJson;
  const agora = new Date();

  setText('idAluno', usuario.id);
  setText('nomeAluno', usuario.nome);
  // CORREÇÃO CRÍTICA: Usa a ID do elemento 'turmaAluno' e a propriedade 'perfil' do objeto JSON.
  setText('turmaAluno', usuario.perfil); 
  setText('qrCodeAluno', usuario.qrCode);
  
  const dataEl = document.getElementById('dataAtual');
  const horaEl = document.getElementById('horaAtual');
  if(dataEl) dataEl.textContent = agora.toLocaleDateString('pt-BR');
  if(horaEl) horaEl.textContent = agora.toLocaleTimeString('pt-BR');

  const statusMsg = document.getElementById('statusMsgLogin');
  if (statusMsg) statusMsg.textContent = "Login realizado com sucesso!";

  const infoAluno = document.getElementById('infoAluno');
  if (infoAluno) infoAluno.style.display = 'block';
}