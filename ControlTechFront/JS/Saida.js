document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o botão do hambúrguer e a barra lateral
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('sidebar');

    // Adiciona o evento de clique ao botão do hambúrguer
    if (hamburgerBtn && sidebar) {
        hamburgerBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Elementos da página
    const crachaInput = document.getElementById('crachaInput');
    const dadosAluno = document.getElementById('dadosAluno');
    const confirmarBtn = document.getElementById('confirmarBtn');
    const currentTime = document.getElementById('currentTime');
    const currentDate = document.getElementById('currentDate');
    const notification = document.getElementById('notification');
    
    // Atualizar relógio em tempo real
    function updateClock() {
        const now = new Date();
        if (currentTime) currentTime.textContent = now.toLocaleTimeString('pt-BR');
        if (currentDate) currentDate.textContent = now.toLocaleDateString('pt-BR');
    }
    
    setInterval(updateClock, 1000);
    updateClock();
    
    // Função para ler o crachá
    function lerCracha(crachaNumero) {
        if (crachaInput) crachaInput.value = crachaNumero;
        
        setTimeout(() => {
            exibirDadosAluno({
                nome: "Aluno Exemplo",
                matricula: `MAT${crachaNumero}`,
                curso: "Técnico em Informática",
                turma: "INFO-2023",
                entrada: "08:15:23"
            });
        }, 800);
    }
    
    // Função para exibir os dados do aluno
    function exibirDadosAluno(aluno) {
        if (dadosAluno) {
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
        }
        
        if (confirmarBtn) confirmarBtn.disabled = false;
        showNotification('success', 'Crachá identificado com sucesso!');
    }
    
    // Função para registrar a saída
    function registrarSaida() {
        if (!crachaInput || crachaInput.value.trim() === '') {
            showNotification('error', 'Nenhum crachá foi lido!');
            return;
        }
        
        if (confirmarBtn) {
            confirmarBtn.disabled = true;
            confirmarBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registrando...';
        }
        
        setTimeout(() => {
            showNotification('success', 'Saída registrada com sucesso!');
            
            if (confirmarBtn) {
                confirmarBtn.innerHTML = '<i class="fas fa-check-circle"></i> Saída Confirmada';
            }
            
            setTimeout(() => {
                if (crachaInput) crachaInput.value = '';
                if (dadosAluno) {
                    dadosAluno.innerHTML = `
                        <div class="placeholder">
                            <i class="fas fa-user-graduate"></i>
                            <p>Aguardando leitura do crachá...</p>
                        </div>
                    `;
                }
                if (confirmarBtn) {
                    confirmarBtn.innerHTML = '<i class="fas fa-check-circle"></i> Confirmar Saída';
                    confirmarBtn.disabled = true;
                }
            }, 3000);
        }, 1500);
    }
    
    // Função para mostrar notificações
    function showNotification(type, message) {
        if (notification) {
            notification.className = `notification ${type}`;
            notification.innerHTML = `<i class="fas fa-${type === 'success' ? 'check' : 'times'}-circle"></i> ${message}`;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 5000);
        }
    }
    
    // Event listeners
    if (crachaInput) {
        crachaInput.addEventListener('input', function() {
            if (this.value.length >= 6) {
                lerCracha(this.value);
            }
        });
    }
    
    if (confirmarBtn) {
        confirmarBtn.addEventListener('click', registrarSaida);
    }
    
    // Focar no input automaticamente (simulando leitor RFID)
    if (crachaInput) {
        crachaInput.focus();
    }
});