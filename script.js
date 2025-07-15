document.addEventListener('DOMContentLoaded', () => {
    const robotIframe = document.getElementById('robot-iframe');

    // Function to send mouse coordinates to the iframe
    function sendMouseCoordinates(event) {
        if (robotIframe && robotIframe.contentWindow) {
            robotIframe.contentWindow.postMessage({
                type: 'mousemove',
                clientX: event.clientX,
                clientY: event.clientY
            }, '*'); // '*' allows messaging to any origin
        }
    }

    // Add mousemove listener to the main document
    document.addEventListener('mousemove', sendMouseCoordinates);

    // Header scroll effect
    const siteHeader = document.querySelector('.site-header');
    const heroSection = document.querySelector('.hero-section');

    const handleScroll = () => {
        if (heroSection) {
            const heroHeight = heroSection.offsetHeight;
            if (window.scrollY > heroHeight - siteHeader.offsetHeight) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        } else {
            // Fallback if heroSection is not found, apply blur after a certain scroll position
            if (window.scrollY > 50) { // Example threshold
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    // Call once on load to set initial state
    handleScroll();

    // Cookie Consent Banner functionality
    const cookieBanner = document.getElementById('cookie-consent-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const declineCookiesBtn = document.getElementById('decline-cookies');

    // Check if cookies have been accepted or declined before
    const cookieConsent = localStorage.getItem('cookieConsent');

    if (cookieConsent === 'accepted') {
        cookieBanner.style.display = 'none';
    } else if (cookieConsent === 'declined') {
        cookieBanner.style.display = 'none'; // Or handle as per your policy for declined cookies
    } else {
        cookieBanner.style.display = 'flex';
    }

    acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieBanner.style.display = 'none';
    });

    declineCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        cookieBanner.style.display = 'none'; // Or redirect, show a different message, etc.
    });
});