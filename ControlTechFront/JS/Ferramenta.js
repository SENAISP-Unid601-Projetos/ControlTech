const ferramentas = [
    { nome: "Chave de Fenda", img: "https://cdn-icons-png.flaticon.com/512/2357/2357457.png" },
    { nome: "Martelo", img: "https://cdn-icons-png.flaticon.com/512/2933/2933186.png" },
    { nome: "Alicate", img: "https://cdn-icons-png.flaticon.com/512/4322/4322961.png" },
    { nome: "Chave Inglesa", img: "https://cdn-icons-png.flaticon.com/512/2340/2340994.png" },
    { nome: "Serra", img: "https://cdn-icons-png.flaticon.com/512/618/618649.png" },
    { nome: "Furadeira", img: "https://cdn-icons-png.flaticon.com/512/1055/1055646.png" },
    { nome: "Trena", img: "https://cdn-icons-png.flaticon.com/512/589/589671.png" }
  ];

  function renderizarFerramentas(lista = ferramentas) {
    const container = document.getElementById("carouselFerramentas");
    container.innerHTML = "";

    lista.forEach(f => {
      const card = document.createElement("div");
      card.className = "tool-card";
      card.setAttribute("data-nome", f.nome);
      card.innerHTML = `
        <img src="${f.img}" alt="${f.nome}">
        <h3>${f.nome}</h3>
        <button>Selecionar</button>
      `;
      container.appendChild(card);
    });
  }

  function filtrarFerramentas() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const filtradas = ferramentas.filter(f => f.nome.toLowerCase().includes(input));
    renderizarFerramentas(filtradas);
  }

  function scrollCarousel(direcao) {
    const carousel = document.getElementById("carouselFerramentas");
    const cardWidth = 220; 
    carousel.scrollBy({
      left: direcao * cardWidth,
      behavior: 'smooth'
    });
  }

  renderizarFerramentas();