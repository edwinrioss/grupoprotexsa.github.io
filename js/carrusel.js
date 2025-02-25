document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;
    let isTransitioning = false;

    // Función para inicializar el carrusel
    function initCarousel() {
        // Establecer la primera imagen como activa
        items[0].classList.add('active');
        
        // Si hay más de una imagen, establecer la segunda como next
        if (items.length > 1) {
            items[1].classList.add('next');
        }
        
        // Si hay más de dos imágenes, establecer la última como prev
        if (items.length > 2) {
            items[items.length - 1].classList.add('prev');
        }
    }

    // Función para mover al siguiente o anterior
    function moveCarousel(direction) {
        if (isTransitioning) return;
        isTransitioning = true;

        // Calcular los índices
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        const nextIndex = (currentIndex + 1) % items.length;
        
        // Quitar todas las clases actuales
        items.forEach(item => {
            item.classList.remove('active', 'next', 'prev');
        });

        if (direction === 'next') {
            // Avanzar al siguiente
            currentIndex = nextIndex;
            const newNextIndex = (currentIndex + 1) % items.length;
            
            // Aplicar las nuevas clases
            items[prevIndex].classList.add('prev');
            items[currentIndex].classList.add('active');
            items[newNextIndex].classList.add('next');
        } else {
            // Retroceder al anterior
            currentIndex = prevIndex;
            const newPrevIndex = (currentIndex - 1 + items.length) % items.length;
            
            // Aplicar las nuevas clases
            items[newPrevIndex].classList.add('prev');
            items[currentIndex].classList.add('active');
            items[nextIndex].classList.add('next');
        }

        // Permitir una nueva transición después de que termine la actual
        setTimeout(() => {
            isTransitioning = false;
        }, 1000); // Debe coincidir con la duración de la transición CSS
    }

    // Agregar eventos a los botones
    nextButton.addEventListener('click', () => {
        moveCarousel('next');
    });

    prevButton.addEventListener('click', () => {
        moveCarousel('prev');
    });

    // Inicializar el carrusel
    initCarousel();

    // Auto-avance cada 5 segundos
    setInterval(() => {
        if (!isTransitioning) {
            moveCarousel('next');
        }
    }, 5000);
});