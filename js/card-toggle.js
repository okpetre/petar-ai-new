document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookie-consent-banner');
    const acceptCookies = document.getElementById('accept-cookies');
    const declineCookies = document.getElementById('decline-cookies');
    const privacyPolicyLink = document.querySelector('.privacy-policy-link');

    if (!cookieBanner || !acceptCookies || !declineCookies || !privacyPolicyLink) {
        console.error('Cookie consent banner elements not found.');
        return;
    }

    // Function to show the banner
    const showBanner = () => {
        cookieBanner.style.setProperty('display', 'flex', 'important');
    };

    // Function to hide the banner
    const hideBanner = () => {
        cookieBanner.style.display = 'none';
    };

    // Check consent on page load
    if (!localStorage.getItem('cookie_consent')) {
        // Delay showing the banner slightly to avoid race conditions with other scripts
        setTimeout(showBanner, 150);
    } else {
        hideBanner();
    }

    // Event listeners for buttons
    acceptCookies.addEventListener('click', function() {
        localStorage.setItem('cookie_consent', 'accepted');
        hideBanner();
    });

    declineCookies.addEventListener('click', function() {
        localStorage.setItem('cookie_consent', 'declined');
        hideBanner();
    });

    // Event listener for privacy policy link
    privacyPolicyLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.open('privacy-policy.html', '_blank');
    });
});
