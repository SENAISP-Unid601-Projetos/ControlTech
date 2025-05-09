document.addEventListener('DOMContentLoaded', () => {
    const wheel = document.querySelector('.carousel-wheel');
    const tools = document.querySelectorAll('.tool');
    const leftArrow = document.querySelector('.arrow.left');
    const rightArrow = document.querySelector('.arrow.right');
    let currentAngle = 0;
    const totalItems = tools.length;
    const angleIncrement = 360 / totalItems;

    // Função para atualizar as posições das ferramentas
    function updateCarousel(direction) {
        tools.forEach((tool, index) => {
            const baseAngle = index * angleIncrement;
            const angle = baseAngle - currentAngle;
            tool.style.transform = `translate(-50%, -50%) rotateY(${angle}deg) translateZ(250px)`;

            // Define a ferramenta ativa
            const relativeAngle = (angle + 360) % 360;
            if (relativeAngle < angleIncrement / 2 || relativeAngle > 360 - angleIncrement / 2) {
                if (!tool.classList.contains('active')) {
                    // Remove classes anteriores
                    tool.classList.remove('from-left', 'from-right', 'active');
                    
                    // Aplica animação baseada na direção
                    if (direction === 'left') {
                        tool.classList.add('from-right');
                    } else if (direction === 'right') {
                        tool.classList.add('from-left');
                    }

                    // Após a animação, adiciona a classe active
                    setTimeout(() => {
                        tool.classList.remove('from-left', 'from-right');
                        tool.classList.add('active');
                    }, 1200); // Ajustado para 1200ms (duração da animação)
                }
            } else {
                tool.classList.remove('active', 'from-left', 'from-right');
            }
        });
    }

    // Eventos das setas
    leftArrow.addEventListener('click', () => {
        currentAngle += angleIncrement;
        updateCarousel('left');
    });

    rightArrow.addEventListener('click', () => {
        currentAngle -= angleIncrement;
        updateCarousel('right');
    });

    // Inicializa o carrossel
    tools.forEach((tool, index) => {
        const angle = index * angleIncrement;
        tool.style.transform = `translate(-50%, -50%) rotateY(${angle}deg) translateZ(250px)`;
    });
    updateCarousel();
});