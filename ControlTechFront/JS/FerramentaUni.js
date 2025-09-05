document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const ferramentaId = params.get("id");

  const toolNome = document.getElementById("toolNome");
  const toolId = document.getElementById("toolId");
  const toolDescricao = document.getElementById("toolDescricao");
  const toolEstoque = document.getElementById("toolEstoque");
  const btnAssociar = document.getElementById("btnAssociar");
  const statusMsg = document.getElementById("statusMsg");

  // 🔹 Recupera usuário logado (aceita id ou usuarioId)
  let usuarioLogado = null;
  try {
    usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  } catch (e) {
    console.error("Erro ao recuperar usuário logado:", e);
  }

  const idUsuario = usuarioLogado?.id ?? usuarioLogado?.usuarioId;

  if (!idUsuario) {
    alert("Faça login para continuar.");
    window.location.href = "/index.html";
    return;
  }
  console.log("Usuário logado:", usuarioLogado);

  // 🔹 Busca dados da ferramenta
  try {
    const res = await fetch(`http://localhost:8080/api/ferramentas/${ferramentaId}`);
    if (!res.ok) throw new Error("Ferramenta não encontrada");
    const ferramenta = await res.json();

    toolNome.textContent = ferramenta.nome;
    toolId.textContent = ferramenta.id;
    toolDescricao.textContent = ferramenta.descricao || "-";
    toolEstoque.textContent = ferramenta.quantidadeEstoque;

  } catch (err) {
    console.error(err);
    toolNome.textContent = "Erro ao carregar ferramenta.";
    return;
  }

  // 🔹 Evento do botão Associar
  btnAssociar.addEventListener("click", async () => {
    try {
      const assocRes = await fetch(`http://localhost:8080/api/ferramentas/associar/${ferramentaId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuarioId: idUsuario })
      });

      const text = await assocRes.text();

      if (!assocRes.ok) throw new Error(text);

      statusMsg.textContent = `✅ ${text} (Usuário: ${usuarioLogado.nome})`;
      statusMsg.style.color = "green";

    } catch (err) {
      statusMsg.textContent = err.message;
      statusMsg.style.color = "red";
    }
  });
});
