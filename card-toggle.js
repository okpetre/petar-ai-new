document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card.clickable-card');

    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const description = card.querySelector('.card-description');
            const clickInfo = card.querySelector('.click-info');

            if (description && clickInfo) {
                if (description.style.display === 'none') {
                    description.style.display = 'block';
                    clickInfo.style.display = 'none';
                } else {
                    description.style.display = 'none';
                    clickInfo.style.display = 'block';
                }
            }
        });
    });
});
