document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const ferramentaId = params.get("id");

    const toolNome = document.getElementById("toolNome");
    const toolId = document.getElementById("toolId");
    const toolDescricao = document.getElementById("toolDescricao");
    const toolEstoque = document.getElementById("toolEstoque");
    const btnAssociar = document.getElementById("btnAssociar");
    const statusMsg = document.getElementById("statusMsg");

    const popup = document.getElementById("confirmationPopup");
    const popupMessage = document.getElementById("popupMessage");
    const closePopupBtn = document.getElementById("closePopupBtn");

    // --- Verifica usuário logado ---
    let usuarioLogado = null;
    try {
        usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    } catch (e) {
        console.error("Erro ao ler dados do usuário:", e);
    }

    const idUsuario = usuarioLogado?.id ?? usuarioLogado?.usuarioId;
    if (!idUsuario) {
        alert("Sessão expirada. Faça login.");
        window.location.href = "/index.html";
        return;
    }

    // --- Função para atualizar status ---
    function atualizarStatus(usuarioNome) {
        if (usuarioNome) {
            statusMsg.innerHTML = `🟢 Em uso por: <strong>${usuarioNome}</strong>`;
            statusMsg.style.color = "green";
        } else {
            statusMsg.innerHTML = "⚪ Disponível";
            statusMsg.style.color = "gray";
        }
    }

    // --- Carrega os dados da ferramenta ---
    async function carregarFerramenta() {
        try {
            const res = await fetch(`http://localhost:8080/api/ferramentas/${ferramentaId}`);
            if (!res.ok) throw new Error("Ferramenta não encontrada");

            const ferramenta = await res.json();

            toolNome.textContent = ferramenta.nome;
            toolId.textContent = ferramenta.id;
            toolDescricao.textContent = ferramenta.descricao || "Sem descrição";
            toolEstoque.textContent = ferramenta.quantidadeEstoque;

            // Atualiza status usando GET do usuário associado
            await atualizarStatusDaFerramenta();

            return ferramenta;
        } catch (err) {
            console.error("Erro ao carregar ferramenta:", err);
            toolNome.textContent = "Erro ao carregar ferramenta";
            statusMsg.textContent = err.message;
            statusMsg.style.color = "red";
            btnAssociar.disabled = true;
            return null;
        }
    }

    // --- Buscar usuário associado via GET ---
    async function atualizarStatusDaFerramenta() {
        try {
            const res = await fetch(`http://localhost:8080/api/ferramentas/${ferramentaId}/usuario`);
            if (!res.ok) throw new Error("Erro ao buscar usuário da ferramenta");
            const usuario = await res.json();

            atualizarStatus(usuario.nome); // nome pode ser null se ninguém estiver usando
        } catch (err) {
            console.error(err);
            statusMsg.textContent = err.message;
        }
    }

    let ferramenta = await carregarFerramenta();

    // --- Botão associar ---
    btnAssociar.addEventListener("click", async () => {
        statusMsg.textContent = "";

        try {
            const assocRes = await fetch(`http://localhost:8080/api/ferramentas/associar/${ferramentaId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuarioId: idUsuario })
            });

            let resposta;
            try {
                resposta = await assocRes.json();
            } catch {
                const texto = await assocRes.text();
                throw new Error("Resposta inválida do servidor: " + texto);
            }

            if (!assocRes.ok) throw new Error(resposta.erro || "Falha ao associar.");

            popupMessage.innerHTML = `✅ Ferramenta <strong>${resposta.ferramentaNome}</strong><br>
                                      Associada ao usuário: <strong>${resposta.usuarioNome}</strong>`;
            popup.style.display = "flex";

            // Atualiza status imediatamente
            atualizarStatus(resposta.usuarioNome);
            ferramenta.usuarioNome = resposta.usuarioNome;

        } catch (err) {
            console.error("Erro ao associar:", err);
            statusMsg.textContent = `Erro: ${err.message}`;
            statusMsg.style.color = "red";
        }
    });

    // --- Fechar popup ---
    closePopupBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });

    // --- Atualização automática a cada 5s ---
    setInterval(atualizarStatusDaFerramenta, 5000);
});