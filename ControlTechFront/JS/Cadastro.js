const crachaInput = document.getElementById('qrcodeInput');
const btnCadastrar = document.getElementById('btnCadastrar');
const voltarLogin = document.getElementById('voltarLogin');
const cadastroBox = document.getElementById('cadastroBox');
const loginContainer = document.getElementById('loginContainer');
const statusMsg = document.getElementById('statusMsg');
const abrirCadastro = document.getElementById('abrirCadastro');

// Abrir cadastro
abrirCadastro.addEventListener('click', () => {
  loginContainer.classList.add('slide-out');
  cadastroBox.classList.add('active');
});

// Voltar para login
voltarLogin.addEventListener('click', () => {
  loginContainer.classList.remove('slide-out');
  cadastroBox.classList.remove('active');
});

// Botão cadastrar
btnCadastrar.addEventListener('click', async () => {
  const nome = document.getElementById('nomeCadastro').value.trim();
  const perfil = document.getElementById('perfilCadastro').value.trim();
  const file = crachaInput.files[0];

  if (!nome || !perfil || !file) {
    statusMsg.textContent = "Preencha todos os campos e envie o crachá!";
    return;
  }

  statusMsg.textContent = ""; // Limpa mensagens anteriores

  const usuario = { nome, perfil };
  const formData = new FormData();
  formData.append("file", file);
  formData.append("usuario", new Blob([JSON.stringify(usuario)], { type: "application/json" }));

  try {
    const res = await fetch("http://localhost:8080/api/qrcode/ler-e-criar", {
      method: "POST",
      body: formData
    });

    if (res.ok) {
      const criado = await res.json();
      alert(`Usuário cadastrado com sucesso: ${criado.nome}`);
      // Limpa formulário
      document.getElementById('nomeCadastro').value = '';
      document.getElementById('perfilCadastro').value = '';
      crachaInput.value = '';
    } else {
      const erro = await res.text();
      statusMsg.textContent = "Erro ao cadastrar usuário: " + erro;
    }
  } catch (err) {
    console.error(err);
    statusMsg.textContent = "Erro de conexão com o servidor.";
  }
});
