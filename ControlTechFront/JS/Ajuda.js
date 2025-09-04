// Seleciona o botão do hambúrguer e a barra lateral
const hamburgerBtn = document.getElementById('hamburger-btn');
const sidebar = document.getElementById('sidebar');

// Adiciona o evento de clique ao botão do hambúrguer
hamburgerBtn.addEventListener('click', () => {
    // Alterna a classe 'active' na barra lateral
    sidebar.classList.toggle('active');
});

// Lógica do formulário de ajuda
const form = document.getElementById('formAjuda');

// @ts-ignore
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // @ts-ignore
    const nome = form.nome.value.trim();
    // @ts-ignore
    const email = form.email.value.trim();
    // @ts-ignore
    const problema = form.problema.value.trim();

    if (!nome || !email || !problema) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    mostrarPopup(nome, email);
    // @ts-ignore
    form.reset();
});

function mostrarPopup(nome, email) {
    const popup = document.getElementById('popupAjuda');
    const mensagem = document.getElementById('mensagemPopup');
    
    // @ts-ignore
    mensagem.innerHTML = `✅ Obrigado, <strong>${nome}</strong>! Seu problema foi registrado. Entraremos em contato pelo e-mail <strong>${email}</strong>.`;

    // @ts-ignore
    popup.style.display = 'flex';
}

function fecharPopup() {
    const popup = document.getElementById('popupAjuda');
    // @ts-ignore
    popup.style.display = 'none';
}