const BASE_URL = "http://localhost:8080/api/historico"; // Ajuste para seu backend

// Função para carregar histórico do usuário
function carregarHistorico(usuarioId) {
  fetch(`${BASE_URL}/usuario/${usuarioId}`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then(historicos => {
      const historicoContainer = document.getElementById("historicoContainer");
      historicoContainer.innerHTML = "";

      if (!historicos.length) {
        historicoContainer.innerHTML = "<p>Nenhum histórico de devolução encontrado.</p>";
        return;
      }

      historicos.forEach(h => {
        const card = document.createElement("div");
        card.className = "tool-card";
        card.innerHTML = `
          <h3>${h.nomeFerramenta}</h3>
          <p><strong>Usuário:</strong> ${h.nomeUsuario}</p>
          <p><strong>Data da Devolução:</strong> ${new Date(h.dataDevolucao).toLocaleDateString('pt-BR')}</p>
          <p><strong>Observações:</strong> ${h.observacoes || '-'}</p>
        `;
        historicoContainer.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Erro ao carregar histórico:", err);
      document.getElementById("historicoContainer").innerHTML = "<p>Erro ao carregar histórico.</p>";
    });
}

// Carregar usuário logado
function getUsuarioLogado() {
  const usuario = localStorage.getItem("usuarioLogado");
  return usuario ? JSON.parse(usuario) : null;
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  const usuario = getUsuarioLogado();
  if (usuario) {
    carregarHistorico(usuario.id);
  } else {
    document.getElementById("historicoContainer").innerHTML = "<p>Usuário não logado.</p>";
  }

  // Botão hamburguer
  const hamburger = document.querySelector(".hamburger-btn");
  const sidebar = document.querySelector(".sidebar");
  hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
});
