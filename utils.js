/**
 * ============================================
 * NEBULA DIGITAL - Utility Functions
 * ============================================
 */

const Utils = {
    // Smooth scroll to element
    scrollToElement(element, duration = 1000) {
        const start = window.pageYOffset;
        const end = element.offsetTop;
        const change = end - start;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = Utils.easeInOutCubic(progress);

            window.scrollTo(0, start + change * ease);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    },

    // Easing functions
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    },

    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    },

    // Random number generator
    random(min, max) {
        return Math.random() * (max - min) + min;
    },

    // Random integer
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Add class when element is in viewport
    revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal-on-scroll');

        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    },

    // Create gradient text
    createGradientText(element, colors = ['#00F0FF', '#BD00FF', '#39FF14']) {
        element.style.background = `linear-gradient(135deg, ${colors.join(', ')})`;
        element.style.webkitBackgroundClip = 'text';
        element.style.webkitTextFillColor = 'transparent';
        element.style.backgroundClip = 'text';
        element.style.backgroundSize = '200% 200%';
    },

    // Format number with commas
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    // Get CSS variable
    getCSSVar(name) {
        return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    },

    // Set CSS variable
    setCSSVar(name, value) {
        document.documentElement.style.setProperty(name, value);
    },

    // Preload images
    preloadImages(images) {
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    },

    // Add noise overlay
    addNoiseOverlay() {
        const noise = document.createElement('div');
        noise.classList.add('noise-overlay');
        document.body.appendChild(noise);
    },

    // Add scanlines
    addScanlines() {
        const scanlines = document.createElement('div');
        scanlines.classList.add('scanlines');
        document.body.appendChild(scanlines);
    }
};

window.Utils = Utils;
