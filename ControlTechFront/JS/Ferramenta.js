// Ferramentas.js
document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById("toolGrid");
    const searchInput = document.querySelector(".search-input");

    // Seleciona o botão do hambúrguer e a barra lateral
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('sidebar');

    // Adiciona o evento de clique ao botão do hambúrguer
    hamburgerBtn.addEventListener('click', () => {
        // Alterna a classe 'active' na barra lateral
        sidebar.classList.toggle('active');
    });

    // Recupera usuário logado
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuarioLogado) {
        alert("Faça login para continuar.");
        window.location.href = "/index.html";
        return;
    }

    // Exibir nome do usuário no dashboard (se houver o elemento)
    const nomeUsuarioElem = document.getElementById('nomeUsuario');
    if (nomeUsuarioElem) nomeUsuarioElem.textContent = usuarioLogado.nome;

    let ferramentas = [];
    let ferramentasFiltradas = [];

    // Função para buscar as ferramentas do back-end
    async function carregarFerramentas() {
        try {
            const res = await fetch("http://localhost:8080/api/ferramentas");
            if (!res.ok) throw new Error("Erro ao carregar ferramentas");

            ferramentas = await res.json();
            ferramentasFiltradas = [...ferramentas];
            renderizarFerramentas();
        } catch (err) {
            console.error(err);
            grid.innerHTML = `<p>Erro ao carregar ferramentas.</p>`;
        }
    }

    // Função para renderizar os cards
    function renderizarFerramentas() {
        grid.innerHTML = "";

        if (ferramentasFiltradas.length === 0) {
            grid.innerHTML = `<p>Nenhuma ferramenta encontrada.</p>`;
            return;
        }

        ferramentasFiltradas.forEach(f => {
            const card = document.createElement("div");
            card.classList.add("tool-card");
            card.setAttribute("data-nome", f.nome);

            card.innerHTML = `
                <img src="${f.imagemUrl || "https://placehold.co/120x120/004b8d/ffffff?text=Ferramenta"}" alt="${f.nome}" />
                <h3>${f.nome}</h3>
                <button class="select-btn">Selecionar</button>
            `;

            card.querySelector(".select-btn").addEventListener("click", () => {
                window.location.href = `ferramentaUni.html?id=${f.id}`;
            });

            grid.appendChild(card);
        });
    }

    // Função para filtrar ferramentas pela pesquisa
    function filtrarFerramentas() {
        const termo = searchInput.value.trim().toLowerCase();
        ferramentasFiltradas = ferramentas.filter(f =>
            f.nome.toLowerCase().includes(termo)
        );
        renderizarFerramentas();
    }

    // Evento de pesquisa
    searchInput.addEventListener("input", filtrarFerramentas);

    // Carrega as ferramentas ao iniciar
    carregarFerramentas();
});