<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// Dados dos funcionários cadastrados (mesmos do login)
const funcionarios = {
    "12345": { id: "12345", nome: "João da Silva" },
    "67890": { id: "67890", nome: "Maria Oliveira" },
    "11111": { id: "11111", nome: "Carlos Souza" }
};

// Seleciona o botão do hambúrguer e a barra lateral
const hamburgerBtn = document.getElementById('hamburger-btn');
const sidebar = document.getElementById('sidebar');

// Adiciona o evento de clique ao botão do hambúrguer
hamburgerBtn.addEventListener('click', () => {
    // Alterna a classe 'active' na barra lateral
    sidebar.classList.toggle('active');
});

// Função para preencher data e hora
function preencherDataHora() {
    const agora = new Date();
    const data = agora.toLocaleDateString('pt-BR');
    const hora = agora.toLocaleTimeString('pt-BR');
    document.getElementById("dataAtual").textContent = data;
    document.getElementById("horaAtual").textContent = hora;
}

// Validação do crachá em tempo real
document.getElementById("cracha").addEventListener("input", function() {
    this.value = this.value.replace(/\D/g, '');
    
    if (this.value.length > 5) {
        this.value = this.value.slice(0, 5);
    }
    
    if (this.value.length === 5 && !/^\d+$/.test(this.value)) {
        this.classList.add("error-border");
    } else {
        this.classList.remove("error-border");
    }
});

// Quando o crachá for validado
document.getElementById("cracha").addEventListener("change", function() {
    const crachaCodigo = this.value.trim();
    const infoUsuario = document.getElementById("infoUsuario");
    const devolucaoForm = document.getElementById("devolucaoForm");
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = "";
    mensagem.className = "mensagem hidden";
    
    if (crachaCodigo.length === 5 && /^\d+$/.test(crachaCodigo)) {
        const funcionario = funcionarios[crachaCodigo];
        
        if (funcionario) {
            document.getElementById("funcId").textContent = funcionario.id;
            document.getElementById("funcNome").textContent = funcionario.nome;
            preencherDataHora();
            
            infoUsuario.classList.remove("hidden");
            devolucaoForm.classList.remove("hidden");
            
            mensagem.textContent = "Funcionário identificado com sucesso!";
            mensagem.classList.remove("hidden");
            mensagem.classList.add("msg-success");
            
            document.getElementById("objeto").focus();
        } else {
            mensagem.textContent = "Crachá não cadastrado. Verifique o número.";
            mensagem.classList.remove("hidden");
            mensagem.classList.add("msg-error");
            infoUsuario.classList.add("hidden");
            devolucaoForm.classList.add("hidden");
        }
    } else if (crachaCodigo.length > 0) {
        mensagem.textContent = "O crachá deve conter exatamente 5 dígitos numéricos.";
        mensagem.classList.remove("hidden");
        mensagem.classList.add("msg-error");
        infoUsuario.classList.add("hidden");
        devolucaoForm.classList.add("hidden");
    }
});

// Manipulador do formulário de devolução
document.getElementById("devolucaoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const cracha = document.getElementById("cracha").value;
    const objeto = document.getElementById("objeto").value;
    const mensagem = document.getElementById("mensagem");

    if (objeto.trim()) {
        mensagem.textContent = `Item "${objeto}" devolvido com sucesso pelo funcionário ${cracha}.`;
        mensagem.classList.remove("hidden", "msg-error");
        mensagem.classList.add("msg-success");
        
        document.getElementById("objeto").value = "";
        document.getElementById("observacoes").value = "";
        
        document.getElementById("objeto").focus();
    } else {
        mensagem.textContent = "Por favor, informe o item a ser devolvido.";
        mensagem.classList.remove("hidden", "msg-success");
        mensagem.classList.add("msg-error");
    }
});
=======
=======
>>>>>>> a25c28883dacc198d723d3734c009c1e0680eb0d
=======
>>>>>>> a25c28883dacc198d723d3734c009c1e0680eb0d
const BASE_URL = "http://localhost:8080/api/ferramentas"; // Ajuste para a porta do seu backend

function preencherDataHora() {
  const agora = new Date();
  document.getElementById("dataAtual").textContent = agora.toLocaleDateString('pt-BR');
  document.getElementById("horaAtual").textContent = agora.toLocaleTimeString('pt-BR');
}

// Carrega usuário logado
function getUsuarioLogado() {
  const usuario = localStorage.getItem("usuarioLogado");
  return usuario ? JSON.parse(usuario) : null;
}

// Atualiza informações do usuário na tela
function exibirUsuarioLogado(usuario) {
  document.getElementById("funcId").textContent = usuario.id;
  document.getElementById("funcNome").textContent = usuario.nome;
  preencherDataHora();
  document.getElementById("infoUsuario").classList.remove("hidden");
  document.getElementById("devolucaoForm").classList.remove("hidden");

  carregarFerramentas(usuario.id);
}

// Validação do crachá
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
    if (usuario && usuario.id === crachaCodigo) {
      exibirUsuarioLogado(usuario);
      mensagem.textContent = "Funcionário identificado com sucesso!";
      mensagem.classList.remove("hidden", "msg-error");
      mensagem.classList.add("msg-success");
      document.getElementById("objeto").focus();
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

// Manipulador do formulário de devolução
document.getElementById("devolucaoForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const objeto = document.getElementById("objeto").value;
  const mensagem = document.getElementById("mensagem");
  const usuario = getUsuarioLogado();

  if (!usuario) {
    alert("Usuário não logado.");
    return;
  }

  if (objeto) {
    fetch(`${BASE_URL}/${objeto}/devolver`, { method: "POST" })
      .then(res => res.text())
      .then(msg => {
        mensagem.textContent = msg;
        mensagem.classList.remove("hidden", "msg-error");
        mensagem.classList.add("msg-success");
        document.getElementById("objeto").value = "";
        document.getElementById("observacoes").value = "";
        carregarFerramentas(usuario.id);
        document.getElementById("objeto").focus();
      })
      .catch(err => {
        console.error(err);
        mensagem.textContent = "Erro ao devolver o item.";
        mensagem.classList.remove("hidden", "msg-success");
        mensagem.classList.add("msg-error");
      });
  } else {
    mensagem.textContent = "Por favor, informe o item a ser devolvido.";
    mensagem.classList.remove("hidden", "msg-success");
    mensagem.classList.add("msg-error");
  }
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

      document.querySelectorAll(".btnDevolver").forEach(btn => {
        btn.addEventListener("click", function() {
          const ferramentaId = this.dataset.id;
          fetch(`${BASE_URL}/${ferramentaId}/devolver`, { method: "POST" })
            .then(res => res.text())
            .then(msg => {
              alert(msg);
              this.parentElement.remove();
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

// Se já houver usuário logado, pré-carrega
const usuarioLogado = getUsuarioLogado();
if (usuarioLogado) {
  document.getElementById("cracha").value = usuarioLogado.id;
  exibirUsuarioLogado(usuarioLogado);
}
<<<<<<< HEAD
>>>>>>> d4b8732c88cda30170a99c6688678fbf63556bb1
=======
>>>>>>> afc9d98106d0dd65f87edd65be7e6ff3a464e2fd
