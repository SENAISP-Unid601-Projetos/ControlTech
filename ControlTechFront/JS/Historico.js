const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (usuarioLogado) {
    fetch(`http://localhost:8080/api/historico/usuario/${usuarioLogado.id}`)
        .then(res => res.json())
        .then(historico => {
            const listaContainer = document.getElementById("listaHistorico");
            listaContainer.innerHTML = "";

            if (historico.length === 0) {
                listaContainer.innerHTML = "<p>Nenhuma devolução registrada.</p>";
                return;
            }

            historico.forEach(item => {
                const div = document.createElement("div");
                div.className = "historico-item";
                div.innerHTML = `
                    <p><strong>Ferramenta:</strong> ${item.nomeFerramenta}</p>
                    <p><strong>Usuário:</strong> ${item.nomeUsuario}</p>
                    <p><strong>Data de Devolução:</strong> ${item.dataDevolucao}</p>
                    <p><strong>Observações:</strong> ${item.observacoes || "Nenhuma"}</p>
                    <hr>
                `;
                listaContainer.appendChild(div);
            });
        })
        .catch(err => console.error("Erro ao carregar histórico:", err));
} else {
    alert("Usuário não logado.");
}
