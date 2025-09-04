document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const ferramentaId = params.get("id");

  const toolNome = document.getElementById("toolNome");
  const toolId = document.getElementById("toolId");
  const toolDescricao = document.getElementById("toolDescricao");
  const toolEstoque = document.getElementById("toolEstoque");
  const btnAssociar = document.getElementById("btnAssociar");
  const statusMsg = document.getElementById("statusMsg");

  // Verifica se usuário está logado
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!usuarioLogado) {
    alert("Faça login para continuar.");
    window.location.href = "/index.html";
    return;
  }

  // Busca dados da ferramenta
  try {
    const res = await fetch(`http://localhost:8080/api/ferramentas/${ferramentaId}`);
    if (!res.ok) throw new Error("Ferramenta não encontrada");
    const ferramenta = await res.json();

    // Preenche campos
    toolNome.textContent = ferramenta.nome;
    toolId.textContent = ferramenta.id;
    toolDescricao.textContent = ferramenta.descricao || "-";
    toolEstoque.textContent = ferramenta.quantidadeEstoque;

  } catch (err) {
    console.error(err);
    toolNome.textContent = "Erro ao carregar ferramenta.";
    return;
  }
console.log("Usuário logado salvo:", usuarioLogado);

  // Evento do botão Associar
  btnAssociar.addEventListener("click", async () => {
    try {
      // pega id do usuário (id ou usuarioId, para compatibilidade)
      const idUsuario = usuarioLogado.id ?? usuarioLogado.usuario?.id;
      if (!idUsuario) {
        alert("Erro: usuário logado inválido. Faça login novamente.");
        return;
        
      }

      const assocRes = await fetch(`http://localhost:8080/api/ferramentas/associar/${ferramentaId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuarioId: idUsuario })
      });

      const text = await assocRes.text();

      if (!assocRes.ok) throw new Error(text);

      statusMsg.textContent = text;
      statusMsg.style.color = "green";

    } catch (err) {
      statusMsg.textContent = err.message;
      statusMsg.style.color = "red";
    }
  });
});
