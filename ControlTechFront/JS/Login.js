function simularLeituraCracha(crachaCodigo) {
  // Dados simulados para diferentes crachás
  const alunos = {
    "12345": { id: "12345", nome: "João da Silva" },
    "67890": { id: "67890", nome: "Maria Oliveira" },
    "11111": { id: "11111", nome: "Carlos Souza" }
  };

  const aluno = alunos[crachaCodigo];

  const statusMsg = document.getElementById('statusMsg');
  const infoAluno = document.getElementById('infoAluno');

  if(aluno) {
    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString('pt-BR');
    const horaFormatada = agora.toLocaleTimeString('pt-BR');

    document.getElementById('idAluno').textContent = aluno.id;
    document.getElementById('nomeAluno').textContent = aluno.nome;
    document.getElementById('dataAtual').textContent = dataFormatada;
    document.getElementById('horaAtual').textContent = horaFormatada;

    statusMsg.textContent = "Crachá lido com sucesso!";
    infoAluno.style.display = 'block';
  } else {
    statusMsg.textContent = "Crachá não reconhecido. Tente novamente.";
    infoAluno.style.display = 'none';
  }
}

function entrar() {
  alert('Login realizado com sucesso!');
  // Pode redirecionar para página principal
  window.location.href = 'Home.html';
}

// Exemplo de teste: simula a leitura após 2 segundos
setTimeout(() => {
  simularLeituraCracha("12345");
}, 2000);