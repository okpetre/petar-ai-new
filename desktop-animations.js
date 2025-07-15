document.addEventListener('DOMContentLoaded', () => {
    // Only apply on desktop (larger than mobile breakpoint)
    if (window.innerWidth > 768) {
        const serviceCards = document.querySelectorAll('.services-section .service-card');

        if (serviceCards.length > 0) {
            // Set the first card as expanded by default
            serviceCards[0].classList.add('expanded');
            serviceCards.forEach((card, index) => {
                if (index !== 0) {
                    card.classList.add('narrowed');
                }
            });

            let currentExpandedIndex = 0; // Keep track of the currently expanded card
            let autoCycleInterval; // Variable to hold the interval ID
            const cycleDuration = 3000; // Duration for each card to be expanded (3 seconds)

            // Function to reset and start the progress bar animation
            function startProgressBar(cardElement) {
                const progressBar = cardElement.querySelector('.progress-bar');
                if (progressBar) {
                    progressBar.style.transition = 'none'; // Disable transition for instant reset
                    progressBar.style.width = '0%';
                    // Force reflow to apply width: 0% immediately
                    void progressBar.offsetWidth;
                    progressBar.style.transition = `width ${cycleDuration / 1000}s linear`; // Re-enable transition
                    progressBar.style.width = '100%';
                }
            }

            // Function to update card states
            function updateCardStates() {
                serviceCards.forEach((card, index) => {
                    if (index === currentExpandedIndex) {
                        card.classList.remove('narrowed');
                        card.classList.add('expanded');
                        startProgressBar(card); // Start progress bar for the expanded card
                    } else {
                        card.classList.remove('expanded');
                        card.classList.add('narrowed');
                        // Reset progress bar for narrowed cards
                        const progressBar = card.querySelector('.progress-bar');
                        if (progressBar) {
                            progressBar.style.transition = 'none';
                            progressBar.style.width = '0%';
                        }
                    }
                });
            }

            // Function to manage automatic cycling
            function startAutoCycle() {
                clearInterval(autoCycleInterval); // Clear any existing interval
                autoCycleInterval = setInterval(() => {
                    currentExpandedIndex = (currentExpandedIndex + 1) % serviceCards.length;
                    updateCardStates();
                }, cycleDuration);
            }

            // Initial state: first card expanded, others narrowed
            updateCardStates();
            startAutoCycle(); // Start the automatic cycling

            // Add click event listeners to allow manual override/navigation
            serviceCards.forEach((card, index) => {
                card.addEventListener('click', () => {
                    // If the clicked card is already expanded, do nothing
                    if (index === currentExpandedIndex) {
                        return;
                    }
                    currentExpandedIndex = index; // Set clicked card as current
                    updateCardStates(); // Update states immediately
                    startAutoCycle(); // Restart auto-cycle on manual click
                });
            });
        }
    }
});
