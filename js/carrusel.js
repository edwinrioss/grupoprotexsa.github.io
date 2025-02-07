document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;

    function updateCarousel(direction) {
        // Primero removemos todas las clases
        items.forEach(item => {
            item.classList.remove('active', 'next', 'prev');
        });

        // Calculamos los índices
        const nextIndex = (currentIndex + 1) % items.length;
        const prevIndex = (currentIndex - 1 + items.length) % items.length;

        // Añadimos la clase active al elemento actual
        items[currentIndex].classList.add('active');

        if (direction === 'next') {
            items[nextIndex].classList.add('next');
            items[prevIndex].classList.add('prev');
        } else {
            items[prevIndex].classList.add('prev');
            items[nextIndex].classList.add('next');
        }
    }

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel('next');
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel('prev');
    });

    // Auto-avance cada 5 segundos
    setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel('next');
    }, 5000);

    // Configuración inicial
    updateCarousel('next');
});