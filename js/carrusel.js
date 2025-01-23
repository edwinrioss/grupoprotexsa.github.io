document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;

    function updateCarousel(direction) {
        items.forEach(item => {
            item.classList.remove('active', 'next', 'prev');
        });

        items[currentIndex].classList.add('active');
        
        const nextIndex = (currentIndex + 1) % items.length;
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        
        if (direction === 'next') {
            items[nextIndex].classList.add('next');
            items[currentIndex].classList.add('prev');
        } else {
            items[prevIndex].classList.add('prev');
            items[currentIndex].classList.add('next');
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