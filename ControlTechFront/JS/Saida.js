const crachasCadastrados = {
    "123456": { nome: "João Silva", id: "123456" },
    "987654": { nome: "Maria Souza", id: "987654" },
    "111222": { nome: "Carlos Oliveira", id: "111222" }
  };

  function focusInput() {
    document.getElementById("crachaInput").focus();
  }

  function lerCracha() {
    const input = document.getElementById("crachaInput");
    const codigo = input.value.trim();
    const dados = document.getElementById("dadosAluno");
    const botao = document.getElementById("confirmarBtn");

    if (codigo.length >= 6) {
      if (crachasCadastrados[codigo]) {
        const aluno = crachasCadastrados[codigo];
        dados.innerHTML = `<strong>ID:</strong> ${aluno.id}<br><strong>Nome:</strong> ${aluno.nome}`;
        botao.style.display = "inline-block";
      } else {
        dados.innerHTML = `Crachá não reconhecido.`;
        botao.style.display = "none";
      }

      input.value = "";
      focusInput();
    }
  }

  function registrarSaida() {
    alert("Saída registrada com sucesso!");
    window.location.href = "Login.html";
  }

  document.addEventListener("click", focusInput);
  document.addEventListener("keydown", focusInput);