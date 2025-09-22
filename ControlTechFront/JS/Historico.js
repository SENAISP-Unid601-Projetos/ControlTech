const BASE_URL = "http://localhost:8080/api/historico";

function carregarHistorico(usuarioId = null) {
  const url = usuarioId ? `${BASE_URL}/usuario/${usuarioId}` : `${BASE_URL}/todos`;

  fetch(url)
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
        card.classList.add("historico-card");

        const data = new Date(h.dataDevolucao);
        const dataFormatada = data.toLocaleDateString('pt-BR');
        const horaFormatada = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        card.innerHTML = `
          <h3>${h.nomeFerramenta}</h3>
          <p><strong>Usuário:</strong> ${h.nomeUsuario}</p>
          <p><strong>Data da Devolução:</strong> ${dataFormatada} às ${horaFormatada}</p>
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

function getUsuarioLogado() {
  const usuario = localStorage.getItem("usuarioLogado");
  return usuario ? JSON.parse(usuario) : null;
}

document.addEventListener("DOMContentLoaded", () => {
  const usuario = getUsuarioLogado();
  const btnUsuario = document.getElementById("btnUsuario");
  const btnTodos = document.getElementById("btnTodos");

  if (usuario && btnUsuario) btnUsuario.addEventListener("click", () => carregarHistorico(usuario.id));
  if (btnTodos) btnTodos.addEventListener("click", () => carregarHistorico());

  carregarHistorico();

  const hamburger = document.querySelector(".hamburger-btn");
  const sidebar = document.querySelector(".sidebar");
  if (hamburger) hamburger.addEventListener("click", () => sidebar.classList.toggle("active"));
});
document.addEventListener("DOMContentLoaded", () => {
    const usuario = getUsuarioLogado(); // garante que usuario está definido
    const btnUsuario = document.getElementById("btnUsuario");
    const btnTodos = document.getElementById("btnTodos");

    function setActiveButton(activeBtn) {
        [btnUsuario, btnTodos].forEach(btn => btn.classList.remove("active"));
        activeBtn.classList.add("active");
    }

    if (usuario && btnUsuario) {   // só adiciona evento se usuario existir
        btnUsuario.addEventListener("click", () => {
            carregarHistorico(usuario.id);
            setActiveButton(btnUsuario);
        });
    }

    if (btnTodos) {
        btnTodos.addEventListener("click", () => {
            carregarHistorico();
            setActiveButton(btnTodos);
        });
    }
});
