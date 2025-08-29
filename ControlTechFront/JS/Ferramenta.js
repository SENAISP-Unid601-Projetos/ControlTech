document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('carouselFerramentas');
  const container = document.querySelector('.carousel-container');
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  const searchInput = document.getElementById('searchInput');

  // @ts-ignore
  let allCards = Array.from(carousel.querySelectorAll('.tool-card'));
  let visibleCards = []; // cards visíveis após filtro
  let currentIndex = 0;
  let cardWidth = 0;
  let visibleCount = 0; // quantos cards cabem visíveis na tela

  function calculateCardWidth() {
    if (allCards.length === 0) return 0;
    const style = getComputedStyle(allCards[0]);
    const marginRight = parseInt(style.marginRight) || 0;
    // @ts-ignore
    return allCards[0].offsetWidth + marginRight;
  }

  function updateVisibleCards() {
    // Filtra cards visíveis (display != none)
    // @ts-ignore
    visibleCards = allCards.filter(card => card.style.display !== 'none');
  }

  function calculateVisibleCount() {
    cardWidth = calculateCardWidth();
    // @ts-ignore
    visibleCount = Math.floor(container.offsetWidth / cardWidth);
    if (visibleCount < 1) visibleCount = 1;
  }

  function updateCarouselPosition(animate = true) {
    if (visibleCards.length === 0) {
      // @ts-ignore
      carousel.style.transform = 'translateX(0)';
      return;
    }
    if (currentIndex < 0) currentIndex = visibleCards.length - 1;
    if (currentIndex >= visibleCards.length) currentIndex = 0;

    // Limitar índice para não sair do range
    // Calcular deslocamento em px
    let offset = currentIndex * cardWidth;

    // Ajustar para mostrar sempre a quantidade de cards visíveis (ex: se tiver 5 cards visíveis e 3 na tela, vai mostrar 3 a partir do currentIndex)
    // Mas se estiver perto do fim e não tiver cards suficientes para preencher, volta para o começo (loop infinito)
    if (offset > (visibleCards.length - visibleCount) * cardWidth) {
      offset = (visibleCards.length - visibleCount) * cardWidth;
    }
    if (offset < 0) offset = 0;

    // @ts-ignore
    carousel.style.transition = animate ? 'transform 0.4s ease' : 'none';
    // @ts-ignore
    carousel.style.transform = `translateX(-${offset}px)`;
  }

  function moverDireita() {
    if (visibleCards.length === 0) return;
    currentIndex++;
    if (currentIndex > visibleCards.length - visibleCount) {
      currentIndex = 0; // loop infinito
    }
    updateCarouselPosition();
  }

  function moverEsquerda() {
    if (visibleCards.length === 0) return;
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = visibleCards.length - visibleCount;
      if (currentIndex < 0) currentIndex = 0;
    }
    updateCarouselPosition();
  }

  function filtrarFerramentas() {
    // @ts-ignore
    const input = searchInput.value.trim().toLowerCase();

    allCards.forEach(card => {
      // @ts-ignore
      const nome = card.getAttribute('data-nome').toLowerCase();
      // @ts-ignore
      card.style.display = nome.includes(input) ? 'block' : 'none';
    });

    updateVisibleCards();
    calculateVisibleCount();

    // Resetar posição ao filtrar
    currentIndex = 0;
    updateCarouselPosition(false);
  }

  function inicializar() {
    // @ts-ignore
    allCards = Array.from(carousel.querySelectorAll('.tool-card'));
    updateVisibleCards();
    calculateVisibleCount();
    currentIndex = 0;
    updateCarouselPosition(false);
  }

  // @ts-ignore
  prevButton.addEventListener('click', moverEsquerda);
  // @ts-ignore
  nextButton.addEventListener('click', moverDireita);
  // @ts-ignore
  searchInput.addEventListener('input', filtrarFerramentas);
  window.addEventListener('resize', () => {
    calculateVisibleCount();
    updateCarouselPosition(false);
  });

  inicializar();
});