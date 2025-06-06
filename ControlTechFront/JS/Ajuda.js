const form = document.getElementById('formAjuda');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const problema = form.problema.value.trim();

  if (!nome || !email || !problema) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  // Define mensagem personalizada no popup
  const mensagem = document.getElementById('mensagemPopup');
  mensagem.innerHTML = `✅ Obrigado, <strong>${nome}</strong>! Seu problema foi registrado. Entraremos em contato pelo e-mail <strong>${email}</strong>.`;

  // Mostra o popup
  const popup = document.getElementById('popupAjuda');
  popup.style.display = 'flex';

  // Limpa o formulário
  form.reset();
});

function fecharPopup() {
  const popup = document.getElementById('popupAjuda');
  popup.style.display = 'none';
}
