function simularLeituraCracha(crachaCodigo) {
  const alunos = {
    "12345": { id: "12345", nome: "João da Silva" },
    "67890": { id: "67890", nome: "Maria Oliveira" },
    "11111": { id: "11111", nome: "Carlos Souza" }
  };

  const aluno = alunos[crachaCodigo];
  const statusMsg = document.getElementById('statusMsg');
  const infoAluno = document.getElementById('infoAluno');

  if (aluno) {
    const agora = new Date();
    // @ts-ignore
    document.getElementById('idAluno').textContent = aluno.id;
    // @ts-ignore
    document.getElementById('nomeAluno').textContent = aluno.nome;
    // @ts-ignore
    document.getElementById('dataAtual').textContent = agora.toLocaleDateString('pt-BR');
    // @ts-ignore
    document.getElementById('horaAtual').textContent = agora.toLocaleTimeString('pt-BR');
    // @ts-ignore
    statusMsg.textContent = "Crachá lido com sucesso!";
    // @ts-ignore
    infoAluno.style.display = 'block';
  } else {
    // @ts-ignore
    statusMsg.textContent = "Crachá não reconhecido. Tente novamente.";
    // @ts-ignore
    infoAluno.style.display = 'none';
  }
}

function entrar() {
  // @ts-ignore
  const nome = document.getElementById('nomeAluno').textContent;
  // @ts-ignore
  document.getElementById('popupNome').textContent = nome;
  // @ts-ignore
  document.getElementById('popup').classList.remove('hidden');
}

document.addEventListener("DOMContentLoaded", () => {
  // @ts-ignore
  document.getElementById('fecharPopup').addEventListener('click', () => {
    // @ts-ignore
    document.getElementById('popup').classList.add('hidden');
    window.location.href = '/HTML/Ferramentas.html';
  });

  // Simula leitura do crachá após 2 segundos
  setTimeout(() => {
    simularLeituraCracha("12345");
  }, 2000);
});

var container = document.getElementById('container')
var innerHTML = ''
for(var i=0; i<15; ++i){
  innerHTML += '<div class="row">'
  for(var j=0; j<20; ++j){
    innerHTML += '<div class="hexagon"></div>'
  }
  innerHTML += '</div>'
}
// @ts-ignore
container.innerHTML = innerHTML