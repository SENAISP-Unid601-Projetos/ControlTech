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

  // Aqui você pode implementar o envio do formulário, via AJAX, API, etc.
  // Por enquanto, só um alerta de confirmação:
  alert(`Obrigado, ${nome}! Seu problema foi registrado. Em breve entraremos em contato pelo e-mail ${email}.`);

  form.reset();
});