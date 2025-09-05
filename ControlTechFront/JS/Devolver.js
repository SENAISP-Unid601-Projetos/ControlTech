const BASE_URL = "http://localhost:8080/api/ferramentas";

// ====================== FUNÇÕES AUXILIARES ======================

// Busca usuário logado no localStorage
function getUsuarioLogado() {
    const usuario = localStorage.getItem("usuarioLogado");
    return usuario ? JSON.parse(usuario) : null;
}

// Preenche data e hora atuais
function preencherDataHora() {
    const agora = new Date();
    document.getElementById("dataAtual").textContent = agora.toLocaleDateString('pt-BR');
    document.getElementById("horaAtual").textContent = agora.toLocaleTimeString('pt-BR');
}

// Exibe dados do usuário e ferramentas
function exibirUsuarioLogado(usuario) {
    document.getElementById("funcId").textContent = usuario.id;
    document.getElementById("funcNome").textContent = usuario.nome;
    preencherDataHora();
    document.getElementById("infoUsuario").classList.remove("hidden");
    document.getElementById("devolucaoForm").classList.remove("hidden");
    carregarFerramentas(usuario.id);
}

// Esconde informações do usuário e formulário
function esconderInfos() {
    document.getElementById("infoUsuario").classList.add("hidden");
    document.getElementById("devolucaoForm").classList.add("hidden");
}

// ====================== INPUT DE CRACHÁ ======================

const crachaInput = document.getElementById("cracha");
crachaInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, '').slice(0,5);
});

crachaInput.addEventListener("change", function () {
    const crachaCodigo = this.value.trim();
    const mensagem = document.getElementById("mensagem");
    mensagem.classList.add("hidden");

    if (/^\d{5}$/.test(crachaCodigo)) {
        const usuario = getUsuarioLogado();
        if (usuario && usuario.id.toString() === crachaCodigo) {
            exibirUsuarioLogado(usuario);
            mensagem.textContent = "Funcionário identificado com sucesso!";
            mensagem.className = "mensagem msg-success";
        } else {
            mensagem.textContent = "Crachá não cadastrado ou usuário não logado.";
            mensagem.className = "mensagem msg-error";
            esconderInfos();
        }
    } else if (crachaCodigo.length > 0) {
        mensagem.textContent = "O crachá deve conter exatamente 5 dígitos numéricos.";
        mensagem.className = "mensagem msg-error";
        esconderInfos();
    }
});

// ====================== FORMULÁRIO DE DEVOLUÇÃO ======================

document.getElementById("devolucaoForm").addEventListener("submit", function(event){
    event.preventDefault();
    const usuario = getUsuarioLogado();
    const objeto = document.getElementById("objeto").value.trim();
    const observacoes = document.getElementById("observacoes").value.trim();
    const mensagem = document.getElementById("mensagem");

    if (!usuario) { 
        alert("Usuário não logado."); 
        return; 
    }

    if (!objeto) {
        mensagem.textContent = "Informe o ID da ferramenta.";
        mensagem.className = "mensagem msg-error";
        return;
    }

    // Chamada real ao backend para devolução manual
    fetch(`${BASE_URL}/${objeto}/devolver?observacoes=${encodeURIComponent(observacoes)}`, { method: "POST" })
        .then(res => {
            if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
            return res.text();
        })
        .then(msg => {
            mensagem.textContent = msg;
            mensagem.className = "mensagem msg-success";

            // Limpa inputs
            document.getElementById("objeto").value = "";
            document.getElementById("observacoes").value = "";

            // Atualiza lista de ferramentas
            carregarFerramentas(usuario.id);
        })
        .catch(err => {
            console.error(err);
            mensagem.textContent = "Erro ao devolver a ferramenta.";
            mensagem.className = "mensagem msg-error";
        });
});

// ====================== CARREGAR FERRAMENTAS ======================

function carregarFerramentas(usuarioId) {
    fetch(`${BASE_URL}/usuario/${usuarioId}`)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
            return res.json();
        })
        .then(ferramentas => {
            const lista = document.getElementById("listaFerramentas");
            lista.innerHTML = "";

            if (!ferramentas.length) {
                const divVazia = document.createElement("div");
                divVazia.className = "lista-vazia";
                divVazia.textContent = "Nenhuma ferramenta associada a este usuário.";
                lista.appendChild(divVazia);
                lista.classList.remove("hidden");
                return;
            }

            ferramentas.forEach(f => {
                const div = document.createElement("div");
                div.className = "ferramenta-item";
                div.innerHTML = `
                    <p><strong>ID:</strong> ${f.ferramentaId}</p>
                    <p><strong>Nome:</strong> ${f.ferramentaNome}</p>
                    <p><strong>Observações:</strong> <input type="text" class="obsInput" placeholder="Digite observações"></p>
                    <button class="btnDevolver" data-id="${f.ferramentaId}">Devolver</button>
                `;
                lista.appendChild(div);
            });

            lista.classList.remove("hidden");
            ativarModalBotoes();
        })
        .catch(err => {
            console.error("Erro ao carregar ferramentas:", err);
            const lista = document.getElementById("listaFerramentas");
            lista.innerHTML = "<p>Erro ao carregar ferramentas.</p>";
            lista.classList.remove("hidden");
        });
}

// ====================== MODAL DE CONFIRMAÇÃO ======================

let ferramentaParaDevolver = null;

function ativarModalBotoes() {
    document.querySelectorAll(".btnDevolver").forEach(btn => {
        btn.addEventListener("click", function () {
            ferramentaParaDevolver = this;
            document.getElementById("confirmModal").classList.remove("hidden");
        });
    });
}

document.getElementById("confirmBtn").addEventListener("click", function(){
    if (!ferramentaParaDevolver) return;

    const ferramentaId = ferramentaParaDevolver.dataset.id;
    const observacoes = ferramentaParaDevolver.parentElement.querySelector(".obsInput").value.trim();

    fetch(`${BASE_URL}/${ferramentaId}/devolver?observacoes=${encodeURIComponent(observacoes)}`, { method: "POST" })
        .then(res => res.text())
        .then(msg => {
            const mensagem = document.getElementById("mensagem");
            mensagem.textContent = msg;
            mensagem.className = "mensagem msg-success";
            ferramentaParaDevolver.parentElement.remove();
        })
        .catch(err => {
            console.error(err);
            alert("Erro ao devolver a ferramenta.");
        })
        .finally(() => {
            document.getElementById("confirmModal").classList.add("hidden");
            ferramentaParaDevolver = null;
        });
});

document.getElementById("cancelBtn").addEventListener("click", function(){
    document.getElementById("confirmModal").classList.add("hidden");
    ferramentaParaDevolver = null;
});

// ====================== AUTO-INICIALIZAÇÃO ======================

const usuarioLogado = getUsuarioLogado();
if (usuarioLogado) {
    crachaInput.value = usuarioLogado.id;
    exibirUsuarioLogado(usuarioLogado);
}
