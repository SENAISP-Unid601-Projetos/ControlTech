document.addEventListener('DOMContentLoaded', function() {
  // Elementos da página
  const crachaInput = document.getElementById('crachaInput');
  const dadosAluno = document.getElementById('dadosAluno');
  const confirmarBtn = document.getElementById('confirmarBtn');
  const currentTime = document.getElementById('currentTime');
  const currentDate = document.getElementById('currentDate');
  
  // Atualizar relógio em tempo real
  function updateClock() {
    const now = new Date();
    // @ts-ignore
    currentTime.textContent = now.toLocaleTimeString('pt-BR');
    // @ts-ignore
    currentDate.textContent = now.toLocaleDateString('pt-BR');
  }
  
  setInterval(updateClock, 1000);
  updateClock();
  
  // Função para ler o crachá
  function lerCracha(crachaNumero = null) {
    const numeroCracha = crachaNumero || Math.floor(100000 + Math.random() * 900000);
    // @ts-ignore
    crachaInput.value = numeroCracha;
    
    setTimeout(() => {
      exibirDadosAluno({
        nome: "Aluno Exemplo",
        matricula: `MAT${numeroCracha}`,
        curso: "Técnico em Informática",
        turma: "INFO-2023",
        entrada: "08:15:23"
      });
    }, 800);
  }
  
  // Função para exibir os dados do aluno
  function exibirDadosAluno(aluno) {
    // @ts-ignore
    dadosAluno.innerHTML = `
      <div class="student-info">
        <h3><i class="fas fa-user"></i> ${aluno.nome}</h3>
        <div class="student-details">
          <div class="detail-item"><strong>Matrícula:</strong> ${aluno.matricula}</div>
          <div class="detail-item"><strong>Curso:</strong> ${aluno.curso}</div>
          <div class="detail-item"><strong>Turma:</strong> ${aluno.turma}</div>
          <div class="detail-item"><strong>Entrada:</strong> ${aluno.entrada}</div>
        </div>
      </div>
    `;
    
    // @ts-ignore
    confirmarBtn.disabled = false;
    showNotification('success', 'Crachá identificado com sucesso!');
  }
  
  // Função para registrar a saída
  function registrarSaida() {
    // @ts-ignore
    if (crachaInput.value.trim() === '') {
      showNotification('error', 'Nenhum crachá foi lido!');
      return;
    }
    
    // @ts-ignore
    confirmarBtn.disabled = true;
    // @ts-ignore
    confirmarBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registrando...';
    
    setTimeout(() => {
      showNotification('success', 'Saída registrada com sucesso!');
      // @ts-ignore
      confirmarBtn.innerHTML = '<i class="fas fa-check-circle"></i> Saída Confirmada';
      
      setTimeout(() => {
        // @ts-ignore
        crachaInput.value = '';
        // @ts-ignore
        dadosAluno.innerHTML = `
          <div class="placeholder">
            <i class="fas fa-user-graduate"></i>
            <p>Aguardando leitura do crachá...</p>
          </div>
        `;
        // @ts-ignore
        confirmarBtn.innerHTML = '<i class="fas fa-check-circle"></i> Confirmar Saída';
        // @ts-ignore
        confirmarBtn.disabled = true;
      }, 3000);
    }, 1500);
  }
  
  // Função para mostrar notificações
  function showNotification(type, message) {
    const notification = document.getElementById('notification');
    // @ts-ignore
    notification.className = `notification ${type}`;
    // @ts-ignore
    notification.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check' : 'times'}-circle"></i>
      ${message}
    `;
    // @ts-ignore
    notification.classList.add('show');
    
    setTimeout(() => {
      // @ts-ignore
      notification.classList.remove('show');
    }, 5000);
  }
  
  // Event listeners
  // @ts-ignore
  crachaInput.addEventListener('input', function() {
    // @ts-ignore
    if (this.value.length >= 6) {
      // @ts-ignore
      lerCracha(this.value);
    }
  });
  
  // @ts-ignore
  confirmarBtn.addEventListener('click', registrarSaida);
  
  // Focar no input automaticamente (simulando leitor RFID)
  // @ts-ignore
  crachaInput.focus();
  
  // Simular leitura automática após 3 segundos (para demonstração)
  setTimeout(() => {
    // @ts-ignore
    if (crachaInput.value === '') {
      //lerCracha(); // Descomente para simular leitura automática
    }
  }, 3000);
});