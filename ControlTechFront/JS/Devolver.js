const BASE_URL = "http://localhost:8080/api/ferramentas"; // backend Spring Boot

// Preenche data e hora atual
function preencherDataHora() {
  const agora = new Date();
  document.getElementById("dataAtual").textContent = agora.toLocaleDateString('pt-BR');
  document.getElementById("horaAtual").textContent = agora.toLocaleTimeString('pt-BR');
}

// Retorna usuário logado do localStorage
function getUsuarioLogado() {
  const usuario = localStorage.getItem("usuarioLogado");
  return usuario ? JSON.parse(usuario) : null;
}

// Exibe informações do usuário na tela
function exibirUsuarioLogado(usuario) {
  document.getElementById("funcId").textContent = usuario.id;
  document.getElementById("funcNome").textContent = usuario.nome;
  preencherDataHora();
  document.getElementById("infoUsuario").classList.remove("hidden");
  document.getElementById("devolucaoForm").classList.remove("hidden");

  carregarFerramentas(usuario.id);
}

// Validação do campo crachá
document.getElementById("cracha").addEventListener("input", function() {
  this.value = this.value.replace(/\D/g, '');
  if (this.value.length > 5) this.value = this.value.slice(0,5);
  if (this.value.length === 5 && !/^\d+$/.test(this.value)) this.classList.add("error-border");
  else this.classList.remove("error-border");
});

// Quando o crachá muda
document.getElementById("cracha").addEventListener("change", function() {
  const crachaCodigo = this.value.trim();
  const mensagem = document.getElementById("mensagem");
  mensagem.classList.add("hidden");

  if (crachaCodigo.length === 5 && /^\d+$/.test(crachaCodigo)) {
    const usuario = getUsuarioLogado();
    if (usuario && usuario.id.toString() === crachaCodigo) {
      exibirUsuarioLogado(usuario);
      mensagem.textContent = "Funcionário identificado com sucesso!";
      mensagem.classList.remove("hidden", "msg-error");
      mensagem.classList.add("msg-success");
    } else {
      mensagem.textContent = "Crachá não cadastrado ou usuário não logado.";
      mensagem.classList.remove("hidden", "msg-success");
      mensagem.classList.add("msg-error");
      document.getElementById("infoUsuario").classList.add("hidden");
      document.getElementById("devolucaoForm").classList.add("hidden");
    }
  } else if (crachaCodigo.length > 0) {
    mensagem.textContent = "O crachá deve conter exatamente 5 dígitos numéricos.";
    mensagem.classList.remove("hidden", "msg-success");
    mensagem.classList.add("msg-error");
    document.getElementById("infoUsuario").classList.add("hidden");
    document.getElementById("devolucaoForm").classList.add("hidden");
  }
});

// Manipulador do formulário de devolução (campo manual)
document.getElementById("devolucaoForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const mensagem = document.getElementById("mensagem");
  const usuario = getUsuarioLogado();
  const objeto = document.getElementById("objeto").value.trim();
  const observacoes = document.getElementById("observacoes").value.trim();

  if (!usuario) {
    alert("Usuário não logado.");
    return;
  }

  if (!objeto) {
    mensagem.textContent = "Por favor, informe o item a ser devolvido.";
    mensagem.classList.remove("hidden", "msg-success");
    mensagem.classList.add("msg-error");
    return;
  }

  // Se quiser usar o ID digitado, é necessário validar/pegar do backend
  alert("Para devolução segura, use os botões de devolução listados abaixo.");
});

// Função para carregar ferramentas do usuário
function carregarFerramentas(usuarioId) {
  fetch(`${BASE_URL}/usuario/${usuarioId}`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then(ferramentas => {
      const listaContainer = document.getElementById("listaFerramentas");
      listaContainer.innerHTML = "";

      if (!ferramentas.length) {
        listaContainer.innerHTML = "<p>Nenhuma ferramenta associada a este usuário.</p>";
        listaContainer.classList.remove("hidden");
        return;
      }

      ferramentas.forEach(f => {
        const div = document.createElement("div");
        div.className = "ferramenta-item";
        div.innerHTML = `
          <p><strong>ID:</strong> ${f.ferramentaId} - <strong>Nome:</strong> ${f.ferramentaNome}</p>
          <button class="btnDevolver" data-id="${f.ferramentaId}">Devolver</button>
        `;
        listaContainer.appendChild(div);
      });

      listaContainer.classList.remove("hidden");

      // Adiciona evento de devolução
      document.querySelectorAll(".btnDevolver").forEach(btn => {
        btn.addEventListener("click", function() {
          const ferramentaId = this.dataset.id;
          const observacoes = ""; // ou pegar de algum campo se desejar
          fetch(`${BASE_URL}/${ferramentaId}/devolver?observacoes=${encodeURIComponent(observacoes)}`, { method: "POST" })
            .then(res => {
              if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
              return res.text();
            })
            .then(msg => {
              alert(msg);
              this.parentElement.remove(); // remove da lista
            })
            .catch(err => {
              console.error(err);
              alert("Erro ao devolver a ferramenta.");
            });
        });
      });
    })
    .catch(err => {
      console.error("Erro ao carregar ferramentas:", err);
      const listaContainer = document.getElementById("listaFerramentas");
      listaContainer.innerHTML = "<p>Erro ao carregar ferramentas.</p>";
      listaContainer.classList.remove("hidden");
    });
}

// Pré-carrega usuário logado
const usuarioLogado = getUsuarioLogado();
if (usuarioLogado) {
  document.getElementById("cracha").value = usuarioLogado.id;
  exibirUsuarioLogado(usuarioLogado);
}
