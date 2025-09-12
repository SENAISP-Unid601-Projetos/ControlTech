
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

const BASE_URL = "http://localhost:8080/api/ferramentas"; // Ajuste para a porta do seu backend

const BASE_URL = "http://localhost:8080/api/ferramentas";

// Funções auxiliares
function getUsuarioLogado() {
    const usuario = localStorage.getItem("usuarioLogado");
    return usuario ? JSON.parse(usuario) : null;
}

function preencherDataHora() {
    const agora = new Date();
    document.getElementById("dataAtual").textContent = agora.toLocaleDateString('pt-BR');
    document.getElementById("horaAtual").textContent = agora.toLocaleTimeString('pt-BR');
}

function exibirUsuarioLogado(usuario) {
    document.getElementById("funcId").textContent = usuario.id;
    document.getElementById("funcNome").textContent = usuario.nome;
    preencherDataHora();
    document.getElementById("infoUsuario").classList.remove("hidden");
    document.getElementById("devolucaoForm").classList.remove("hidden");
    carregarFerramentas(usuario.id);
}

function esconderInfos() {
    document.getElementById("infoUsuario").classList.add("hidden");
    document.getElementById("devolucaoForm").classList.add("hidden");
}

// Validação do crachá
const crachaInput = document.getElementById("cracha");
crachaInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, '').slice(0, 5);
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

// Submissão do formulário manual
document.getElementById("devolucaoForm").addEventListener("submit", function (event) {
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
        mensagem.textContent = "Informe o ID da ferramenta a ser devolvida.";
        mensagem.className = "mensagem msg-error";
        return;
    }

    // Faz o POST para o endpoint de devolução
    fetch(`${BASE_URL}/${objeto}/devolver?observacoes=${encodeURIComponent(observacoes)}`, {
        method: "POST"
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(`Erro HTTP: ${res.status}`);
            }
            return res.text();
        })
        .then(msg => {
            mensagem.textContent = msg;
            mensagem.className = "mensagem msg-success";
            carregarFerramentas(usuario.id); // recarrega lista atualizada
        })
        .catch(err => {
            console.error(err);
            mensagem.textContent = "Erro ao devolver a ferramenta.";
            mensagem.className = "mensagem msg-error";
        });
});


// Carregar ferramentas do usuário
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
                lista.innerHTML = "";
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

                const dataPegoFormatada = f.dataPego
                    ? new Date(f.dataPego).toLocaleString('pt-BR')
                    : "Não registrado";

                div.innerHTML = `
                    <p><strong>ID:</strong> ${f.ferramentaId}</p>
                    <p><strong>Nome:</strong> ${f.ferramentaNome}</p>
                    <p><strong>Data Retirada:</strong> ${dataPegoFormatada}</p>
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

// Modal de confirmação de devolução
let ferramentaParaDevolver = null;

function ativarModalBotoes() {
    document.querySelectorAll(".btnDevolver").forEach(btn => {
        btn.addEventListener("click", function () {
            ferramentaParaDevolver = this;
            document.getElementById("confirmModal").classList.remove("hidden");
        });
    });
}

document.getElementById("confirmBtn").addEventListener("click", function () {
    if (!ferramentaParaDevolver) return;

    const ferramentaId = ferramentaParaDevolver.dataset.id;
    const observacoes = ferramentaParaDevolver.parentElement.querySelector(".obsInput").value;

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

document.getElementById("cancelBtn").addEventListener("click", function () {
    document.getElementById("confirmModal").classList.add("hidden");
    ferramentaParaDevolver = null;
});

// Auto-inicializa usuário logado
const usuarioLogado = getUsuarioLogado();
if (usuarioLogado) {
    crachaInput.value = usuarioLogado.id;
    exibirUsuarioLogado(usuarioLogado);
}
