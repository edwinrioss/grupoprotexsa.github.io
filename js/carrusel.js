document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;
    let isTransitioning = false;

    function updateCarousel(direction) {
        if (isTransitioning) return;
        isTransitioning = true;

        const nextIndex = direction === 'next' 
            ? (currentIndex + 1) % items.length 
            : (currentIndex - 1 + items.length) % items.length;

        // Posicionar siguiente/anterior imagen
        items[nextIndex].style.transform = direction === 'next' 
            ? 'translateX(100%)' 
            : 'translateX(-100%)';
        
        // Asegurar que la imagen actual está visible
        items[currentIndex].style.transform = 'translateX(0)';

        // Forzar reflow
        items[nextIndex].offsetHeight;

        // Animar el deslizamiento
        items[currentIndex].style.transform = direction === 'next' 
            ? 'translateX(-100%)' 
            : 'translateX(100%)';
        items[nextIndex].style.transform = 'translateX(0)';

        // Actualizar índice
        currentIndex = nextIndex;

        setTimeout(() => {
            isTransitioning = false;
            // Reposicionar las demás imágenes fuera de vista
            items.forEach((item, index) => {
                if (index !== currentIndex) {
                    item.style.transform = 'translateX(100%)';
                }
            });
        }, 1000);
    }

    nextButton.addEventListener('click', () => {
        if (!isTransitioning) updateCarousel('next');
    });

    prevButton.addEventListener('click', () => {
        if (!isTransitioning) updateCarousel('prev');
    });

    // Auto-avance
    setInterval(() => {
        if (!isTransitioning) updateCarousel('next');
    }, 5000);

    // Configuración inicial
    items[currentIndex].style.transform = 'translateX(0)';
    items.forEach((item, index) => {
        if (index !== currentIndex) {
            item.style.transform = 'translateX(100%)';
        }
    });
});