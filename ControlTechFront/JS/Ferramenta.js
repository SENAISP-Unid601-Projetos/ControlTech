function filtrarFerramentas() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll("#carouselFerramentas .tool-card");

  cards.forEach(card => {
    const nome = card.getAttribute("data-nome").toLowerCase();
    if (nome.includes(input)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

function scrollCarousel(direcao) {
  const carousel = document.getElementById("carouselFerramentas");
  const cardWidth = 240;
  carousel.scrollBy({
    left: direcao * cardWidth,
    behavior: 'smooth'
  });
}

function selecionarFerramenta(nome) {
  alert(`Você selecionou: ${nome}`);
}
