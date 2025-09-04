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