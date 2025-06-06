// Dados dos funcionários cadastrados (mesmos do login)
    const funcionarios = {
      "12345": { id: "12345", nome: "João da Silva" },
      "67890": { id: "67890", nome: "Maria Oliveira" },
      "11111": { id: "11111", nome: "Carlos Souza" }
    };

    // Função para preencher data e hora
    function preencherDataHora() {
      const agora = new Date();
      const data = agora.toLocaleDateString('pt-BR');
      const hora = agora.toLocaleTimeString('pt-BR');
      // @ts-ignore
      document.getElementById("dataAtual").textContent = data;
      // @ts-ignore
      document.getElementById("horaAtual").textContent = hora;
    }

    // Validação do crachá em tempo real
    // @ts-ignore
    document.getElementById("cracha").addEventListener("input", function() {
      // Remove qualquer caractere não numérico
      // @ts-ignore
      this.value = this.value.replace(/\D/g, '');
      
      // Limita a 5 dígitos
      // @ts-ignore
      if (this.value.length > 5) {
        // @ts-ignore
        this.value = this.value.slice(0, 5);
      }
      
      // Validação visual
      // @ts-ignore
      if (this.value.length === 5 && !/^\d+$/.test(this.value)) {
        // @ts-ignore
        this.classList.add("error-border");
      } else {
        // @ts-ignore
        this.classList.remove("error-border");
      }
    });

    // Quando o crachá for validado
    // @ts-ignore
    document.getElementById("cracha").addEventListener("change", function() {
      // @ts-ignore
      const crachaCodigo = this.value.trim();
      const infoUsuario = document.getElementById("infoUsuario");
      const devolucaoForm = document.getElementById("devolucaoForm");
      const mensagem = document.getElementById("mensagem");

      // Resetar mensagens
      // @ts-ignore
      mensagem.classList.add("hidden");
      
      // Verifica se tem 5 dígitos numéricos
      if (crachaCodigo.length === 5 && /^\d+$/.test(crachaCodigo)) {
        const funcionario = funcionarios[crachaCodigo];
        
        if (funcionario) {
          // Preenche os dados do funcionário
          // @ts-ignore
          document.getElementById("funcId").textContent = funcionario.id;
          // @ts-ignore
          document.getElementById("funcNome").textContent = funcionario.nome;
          preencherDataHora();
          
          // Mostra as seções
          // @ts-ignore
          infoUsuario.classList.remove("hidden");
          // @ts-ignore
          devolucaoForm.classList.remove("hidden");
          
          // Feedback visual
          // @ts-ignore
          mensagem.textContent = "Funcionário identificado com sucesso!";
          // @ts-ignore
          mensagem.classList.remove("hidden", "msg-error");
          // @ts-ignore
          mensagem.classList.add("msg-success");
          
          // Foca no campo de objeto
          // @ts-ignore
          document.getElementById("objeto").focus();
        } else {
          // Crachá não cadastrado
          // @ts-ignore
          mensagem.textContent = "Crachá não cadastrado. Verifique o número.";
          // @ts-ignore
          mensagem.classList.remove("hidden", "msg-success");
          // @ts-ignore
          mensagem.classList.add("msg-error");
          // @ts-ignore
          infoUsuario.classList.add("hidden");
          // @ts-ignore
          devolucaoForm.classList.add("hidden");
        }
      } else if (crachaCodigo.length > 0) {
        // Formato inválido
        // @ts-ignore
        mensagem.textContent = "O crachá deve conter exatamente 5 dígitos numéricos.";
        // @ts-ignore
        mensagem.classList.remove("hidden", "msg-success");
        // @ts-ignore
        mensagem.classList.add("msg-error");
        // @ts-ignore
        infoUsuario.classList.add("hidden");
        // @ts-ignore
        devolucaoForm.classList.add("hidden");
      }
    });

    // Manipulador do formulário de devolução
    // @ts-ignore
    document.getElementById("devolucaoForm").addEventListener("submit", function(event) {
      event.preventDefault();

      // @ts-ignore
      const cracha = document.getElementById("cracha").value;
      // @ts-ignore
      const objeto = document.getElementById("objeto").value;
      const mensagem = document.getElementById("mensagem");

      if (objeto) {
        // Sucesso na devolução
        // @ts-ignore
        mensagem.textContent = `Item "${objeto}" devolvido com sucesso pelo funcionário ${cracha}.`;
        // @ts-ignore
        mensagem.classList.remove("hidden", "msg-error");
        // @ts-ignore
        mensagem.classList.add("msg-success");
        
        // Limpa apenas o campo de objeto e observações
        // @ts-ignore
        document.getElementById("objeto").value = "";
        // @ts-ignore
        document.getElementById("observacoes").value = "";
        
        // Foca no campo de objeto para nova devolução
        // @ts-ignore
        document.getElementById("objeto").focus();
      } else {
        // Item não informado
        // @ts-ignore
        mensagem.textContent = "Por favor, informe o item a ser devolvido.";
        // @ts-ignore
        mensagem.classList.remove("hidden", "msg-success");
        // @ts-ignore
        mensagem.classList.add("msg-error");
      }
    });