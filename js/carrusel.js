document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;
    let isTransitioning = false;

    function updateCarousel(direction) {
        if (isTransitioning) return;
        isTransitioning = true;

        // Primero removemos todas las clases
        items.forEach(item => {
            item.classList.remove('active', 'next', 'prev');
            item.style.transform = 'translateX(100%)';
        });

        // Configuramos las posiciones iniciales
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        const nextIndex = (currentIndex + 1) % items.length;

        if (direction === 'next') {
            items[currentIndex].style.transform = 'translateX(-100%)';
            items[nextIndex].style.transform = 'translateX(0)';
            currentIndex = nextIndex;
        } else {
            items[currentIndex].style.transform = 'translateX(100%)';
            items[prevIndex].style.transform = 'translateX(0)';
            currentIndex = prevIndex;
        }

        // Esperamos a que termine la transición
        setTimeout(() => {
            isTransitioning = false;
        }, 500); // Este tiempo debe coincidir con la duración de la transición en CSS
    }

    nextButton.addEventListener('click', () => {
        if (!isTransitioning) {
            updateCarousel('next');
        }
    });

    prevButton.addEventListener('click', () => {
        if (!isTransitioning) {
            updateCarousel('prev');
        }
    });

    // Auto-avance cada 5 segundos
    setInterval(() => {
        if (!isTransitioning) {
            updateCarousel('next');
        }
    }, 5000);

    // Configuración inicial
    items[currentIndex].style.transform = 'translateX(0)';
    items.forEach((item, index) => {
        if (index !== currentIndex) {
            item.style.transform = 'translateX(100%)';
        }
    });
});