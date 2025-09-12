document.addEventListener("DOMContentLoaded", async () => {
    // --- 1. SELEÇÃO DOS ELEMENTOS DO HTML ---
    const params = new URLSearchParams(window.location.search);
    const ferramentaId = params.get("id");

    // Elementos da página
    const toolNome = document.getElementById("toolNome");
    const toolId = document.getElementById("toolId");
    const toolDescricao = document.getElementById("toolDescricao");
    const toolEstoque = document.getElementById("toolEstoque");
    const btnAssociar = document.getElementById("btnAssociar");
    const statusMsg = document.getElementById("statusMsg"); // Para mensagens de erro

    // Elementos do Pop-up de confirmação
    const popup = document.getElementById("confirmationPopup");
    const popupMessage = document.getElementById("popupMessage");
    const closePopupBtn = document.getElementById("closePopupBtn");

    // --- 2. VERIFICAÇÃO DO USUÁRIO LOGADO ---
    let usuarioLogado = null;
    try {
        usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    } catch (e) {
        console.error("Erro ao ler dados do usuário do localStorage:", e);
    }

    // Pega o ID do usuário (aceita tanto 'id' quanto 'usuarioId' no objeto)
    const idUsuario = usuarioLogado?.id ?? usuarioLogado?.usuarioId;
    const nomeUsuario = usuarioLogado?.nome ?? 'Usuário'; // Pega o nome do usuário

    if (!idUsuario) {
        alert("Sessão expirada ou inválida. Faça login para continuar.");
        window.location.href = "/index.html"; // Redireciona para a página de login
        return;
    }

// --- 3. BUSCA E EXIBIÇÃO DOS DADOS DA FERRAMENTA ---
try {
    const res = await fetch(`http://localhost:8080/api/ferramentas/${ferramentaId}`);
    if (!res.ok) {
        throw new Error("Ferramenta não encontrada no sistema.");
    }
    const ferramenta = await res.json();

    toolNome.textContent = ferramenta.nome;
    toolId.textContent = ferramenta.id;
    toolDescricao.textContent = ferramenta.descricao || "Sem descrição";
    toolEstoque.textContent = ferramenta.quantidadeEstoque;

    // 🔹 Mostrar se está associada a um usuário
    const statusDiv = document.getElementById("statusMsg");
    if (ferramenta.usuarioNome) {
    statusMsg.innerHTML = `🟢 Em uso por: <strong>${ferramenta.usuarioNome}</strong>`;
    statusMsg.style.color = "green";
    } else {
        statusMsg.innerHTML = "⚪ Disponível";
        statusMsg.style.color = "gray";
    }

    } catch (err) {
        console.error("Falha ao buscar dados da ferramenta:", err);
        toolNome.textContent = "Erro ao carregar ferramenta";
        statusMsg.textContent = err.message;
        statusMsg.style.color = "red";
        btnAssociar.disabled = true;
        return;
    }


    // --- 4. LÓGICA DO BOTÃO "ASSOCIAR" ---
    btnAssociar.addEventListener("click", async () => {
        statusMsg.textContent = ""; // Limpa mensagens de erro antigas

        try {
            const assocRes = await fetch(`http://localhost:8080/api/ferramentas/associar/${ferramentaId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuarioId: idUsuario })
            });

            const respostaTexto = await assocRes.text();

            if (!assocRes.ok) {
                // Se a resposta não for OK, lança um erro com a mensagem do servidor
                throw new Error(respostaTexto || "Erro desconhecido do servidor.");
            }

            // Mostra o pop-up de sucesso
            popupMessage.innerHTML = `✅ ${respostaTexto}<br>Associado ao usuário: <strong>${nomeUsuario}</strong>`;
            popup.style.display = "flex";

        } catch (err) {
            // Mostra erros da associação na mensagem de status
            console.error("Falha ao associar ferramenta:", err);
            statusMsg.textContent = `Erro: ${err.message}`;
            statusMsg.style.color = "red";
        }
    });

    // --- 5. LÓGICA PARA FECHAR O POP-UP ---
    closePopupBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });
});