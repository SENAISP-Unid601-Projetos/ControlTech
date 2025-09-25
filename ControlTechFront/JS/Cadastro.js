// Cadastro.js
const cadastroQrInput = document.getElementById('cadastroQrInput');
const btnCadastrar = document.getElementById('btnCadastrar');
const statusMsgCadastro = document.getElementById('statusMsgCadastro');
const nomeCadastro = document.getElementById('nomeCadastro');
const perfilCadastro = document.getElementById('perfilCadastro');

btnCadastrar?.addEventListener('click', async () => {
  const nome = nomeCadastro.value.trim();
  const perfil = perfilCadastro.value.trim();
  const file = cadastroQrInput.files[0];

  if (!nome || !perfil || !file) {
    statusMsgCadastro.textContent = "Preencha todos os campos e envie o crachá!";
    return;
  }

  statusMsgCadastro.textContent = "";

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

      // Limpar formulário
      nomeCadastro.value = '';
      perfilCadastro.value = '';
      cadastroQrInput.value = '';

      // === Mostrar popup de cadastro ===
      const popupCadastro = document.getElementById("popupCadastro");
      const popupNomeCadastro = document.getElementById("popupNomeCadastro");
      if (popupCadastro && popupNomeCadastro) {
        popupNomeCadastro.textContent = criado.nome;
        popupCadastro.classList.remove("hidden");
      }
    } else {
      const erro = await res.text();
      statusMsgCadastro.textContent = "Erro ao cadastrar usuário: " + erro;
    }
  } catch (err) {
    console.error(err);
    statusMsgCadastro.textContent = "Erro de conexão com o servidor.";
  }
});

// === Fechar popup ===
document.getElementById("fecharPopupCadastro")?.addEventListener("click", () => {
  document.getElementById("popupCadastro").classList.add("hidden");
});
