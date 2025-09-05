// --- CONTROLE DO MENU HAMBÚRGUER (PARA TELAS PEQUENAS) ---

// Seleciona o botão do hambúrguer e a barra lateral
const hamburgerBtn = document.getElementById('hamburger-btn');
const sidebar = document.getElementById('sidebar');

// Adiciona um evento de clique ao botão
hamburgerBtn.addEventListener('click', () => {
    // Adiciona ou remove a classe 'active' da barra lateral,
    // o que faz com que ela apareça ou desapareça (controlado pelo CSS).
    sidebar.classList.toggle('active');
});


// --- LÓGICA DO FORMULÁRIO DE AJUDA E POP-UP ---

// Seleciona o formulário de ajuda
const form = document.getElementById('formAjuda');

// Adiciona um evento que dispara quando o formulário é enviado
form.addEventListener('submit', function(event) {
    // Impede que a página recarregue ao enviar o formulário
    event.preventDefault();

    // Pega os valores dos campos e remove espaços em branco do início e fim
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const problema = form.problema.value.trim();

    // Validação simples: verifica se algum campo está vazio
    if (!nome || !email || !problema) {
        alert('Por favor, preencha todos os campos do formulário.');
        return; // Interrompe a execução se a validação falhar
    }

    // Se todos os campos estiverem preenchidos:
    mostrarPopup(nome, email); // Chama a função para exibir o pop-up de sucesso
    form.reset(); // Limpa todos os campos do formulário
});

/**
 * Função para exibir o pop-up de confirmação.
 * @param {string} nome - O nome do usuário.
 * @param {string} email - O e-mail do usuário.
 */
function mostrarPopup(nome, email) {
    const popup = document.getElementById('popupAjuda');
    const mensagem = document.getElementById('mensagemPopup');
    
    // Monta a mensagem de confirmação personalizada
    mensagem.innerHTML = `✅ Obrigado, <strong>${nome}</strong>! Seu pedido de ajuda foi registrado. Entraremos em contato pelo e-mail <strong>${email}</strong> em breve.`;

    // Altera o estilo do pop-up para 'flex', tornando-o visível
    popup.style.display = 'flex';
}

/**
 * Função para fechar o pop-up.
 * Esta função é chamada pelo botão "Fechar" no HTML: <button onclick="fecharPopup()">
 */
function fecharPopup() {
    const popup = document.getElementById('popupAjuda');
    
    // Altera o estilo do pop-up para 'none', escondendo-o
    popup.style.display = 'none';
}