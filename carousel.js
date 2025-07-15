document.addEventListener('DOMContentLoaded', () => {
    const serviceGrid = document.querySelector('.platforms-section .service-grid');

    if (serviceGrid) {
        // Only enable auto-scroll and duplicate content on mobile devices
        if (window.innerWidth <= 768) {
            // Duplicate content to create a seamless loop
            const content = serviceGrid.innerHTML;
            serviceGrid.innerHTML += content; // Duplicate once
            serviceGrid.innerHTML += content; // Duplicate again for more seamlessness

            let scrollPosition = 0;
            const scrollSpeed = 0.75; // Adjust speed as needed for smoother animation
            let animationFrameId; // To store the animation frame ID

            function animateScroll() {
                scrollPosition += scrollSpeed;

                // When scrollPosition reaches the end of the first duplicate, reset to the beginning of the first duplicate
                // This creates the seamless loop effect
                if (scrollPosition >= serviceGrid.scrollWidth / 3) { // Divide by 3 because we duplicated twice
                    scrollPosition = 0; 
                }
                serviceGrid.scrollLeft = scrollPosition;
                animationFrameId = requestAnimationFrame(animateScroll); // Store the ID
            }

            // Make the container horizontally scrollable with hidden scrollbar
            serviceGrid.style.overflowX = 'scroll';
            serviceGrid.style.whiteSpace = 'nowrap';
            serviceGrid.style.scrollbarWidth = 'none'; // For Firefox
            serviceGrid.style.msOverflowStyle = 'none';  // For IE/Edge
            serviceGrid.style.webkitOverflowScrolling = 'touch'; // For iOS

            // Hide scrollbar for Webkit browsers
            const style = document.createElement('style');
            style.innerHTML = `
                    .platforms-section .service-grid::-webkit-scrollbar {
                        display: none;
                    }
                    .platforms-section .service-card {
                        display: inline-block; /* Ensure cards are in a line */
                        margin-right: 20px; /* Space between cards */
                    }
                `;
            document.head.appendChild(style);

            // Add event listeners to stop animation on click
            const serviceCards = serviceGrid.querySelectorAll('.service-card');
            serviceCards.forEach(card => {
                card.addEventListener('click', () => {
                    cancelAnimationFrame(animationFrameId);
                });
            });

            animateScroll();
        }
    }
});
