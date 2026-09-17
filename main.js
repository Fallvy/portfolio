/**
 * ============================================
 * NEBULA DIGITAL - Main Application
 * Entry Point
 * ============================================
 */

class NebulaDigital {
    constructor() {
        this.scene3D = null;
        this.cursor = null;
        this.animations = null;
        this.navigation = null;

        this.init();
    }

    async init() {
        console.log('%c NEBULA DIGITAL ', 
            'background: linear-gradient(135deg, #00F0FF, #BD00FF); color: white; font-size: 20px; padding: 10px 20px;');
        console.log('Initializing digital universe...');

        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // Initialize 3D scene
        console.log('Creating 3D environment...');
        this.scene3D = new Scene3D();

        // Initialize custom cursor
        console.log('Calibrating neural cursor...');
        this.cursor = new CustomCursor();

        // Initialize animations
        console.log('Loading animation matrices...');
        this.animations = new Animations();

        // Initialize navigation
        console.log('Establishing navigation links...');
        this.navigation = new Navigation(this.scene3D, this.animations);

        // Setup additional effects
        this.setupAdditionalEffects();

        // Setup form handling
        this.setupFormHandling();

        // Add utility overlays
        Utils.addNoiseOverlay();

        console.log('%c✓ NEBULA DIGITAL READY ', 
            'background: #39FF14; color: black; font-size: 14px; padding: 5px 10px;');
        console.log('Welcome to the digital universe.');
    }

    setupAdditionalEffects() {
        // Magnetic buttons
        const magneticButtons = document.querySelectorAll('.liquid-button, .hud-button, .submit-button');

        magneticButtons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                // Update button custom properties for ripple effect
                button.style.setProperty('--mouse-x', ((e.clientX - rect.left) / rect.width * 100) + '%');
                button.style.setProperty('--mouse-y', ((e.clientY - rect.top) / rect.height * 100) + '%');

                gsap.to(button, {
                    x: x * 0.2,
                    y: y * 0.2,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.5)"
                });
            });
        });

        // Smooth scroll for portfolio
        const portfolioCorridor = document.querySelector('.portfolio-corridor');
        let isDown = false;
        let startX;
        let scrollLeft;

        if (portfolioCorridor) {
            portfolioCorridor.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - portfolioCorridor.offsetLeft;
                scrollLeft = portfolioCorridor.scrollLeft;
            });

            portfolioCorridor.addEventListener('mouseleave', () => {
                isDown = false;
            });

            portfolioCorridor.addEventListener('mouseup', () => {
                isDown = false;
            });

            portfolioCorridor.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - portfolioCorridor.offsetLeft;
                const walk = (x - startX) * 2;
                portfolioCorridor.scrollLeft = scrollLeft - walk;
            });
        }

        // Service node hover effects
        const serviceNodes = document.querySelectorAll('.service-node');

        serviceNodes.forEach(node => {
            node.addEventListener('mouseenter', () => {
                const service = node.dataset.service;
                this.highlightService(service);
            });

            node.addEventListener('mouseleave', () => {
                this.resetServiceHighlight();
            });
        });
    }

    highlightService(service) {
        const brainCore = document.querySelector('.brain-core');
        if (!brainCore) return;

        const colors = {
            automation: '#00F0FF',
            development: '#BD00FF',
            integration: '#39FF14'
        };

        const color = colors[service] || '#00F0FF';

        gsap.to(brainCore, {
            backgroundColor: color,
            scale: 1.2,
            duration: 0.4,
            ease: "power2.out"
        });

        brainCore.style.boxShadow = `0 0 40px ${color}, 0 0 80px ${color}`;
    }

    resetServiceHighlight() {
        const brainCore = document.querySelector('.brain-core');
        if (!brainCore) return;

        gsap.to(brainCore, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
        });

        brainCore.style.boxShadow = '';
    }

    setupFormHandling() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Validate
            if (!data.name || !data.email || !data.message) {
                this.showFormError('Пожалуйста, заполните все поля');
                return;
            }

            if (!this.isValidEmail(data.email)) {
                this.showFormError('Введите корректный email');
                return;
            }

            // Simulate sending
            const submitBtn = form.querySelector('.submit-button');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<span>ОТПРАВКА...</span>';
            submitBtn.disabled = true;

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Success
            submitBtn.innerHTML = '<span>✓ ОТПРАВЛЕНО</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #39FF14, #00F0FF)';

            // Reset form
            form.reset();

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;

                // Hide form and show button again
                form.classList.add('hidden');
                document.getElementById('start-project-btn').classList.remove('hidden');
                document.getElementById('start-project-btn').style.opacity = '1';
            }, 2000);

            // Trigger success animation
            this.animations.particleExplosion(
                window.innerWidth / 2,
                window.innerHeight / 2
            );
        });

        // Input focus effects
        const inputs = form.querySelectorAll('.form-input');

        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                gsap.to(input.parentElement, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            input.addEventListener('blur', () => {
                gsap.to(input.parentElement, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    showFormError(message) {
        // Create error notification
        const error = document.createElement('div');
        error.textContent = message;
        error.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #ff0000, #ff6600);
            color: white;
            padding: 1rem 2rem;
            border-radius: 4px;
            font-family: var(--font-mono);
            font-size: 0.875rem;
            z-index: 10001;
            box-shadow: 0 10px 30px rgba(255, 0, 0, 0.3);
            animation: slide-down 0.3s ease-out;
        `;

        document.body.appendChild(error);

        setTimeout(() => {
            gsap.to(error, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                onComplete: () => error.remove()
            });
        }, 3000);
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Public API
    warpTo(section) {
        this.navigation.navigateToSection(section);
    }

    returnHome() {
        this.navigation.returnToHome();
    }
}

// Initialize application
const app = new NebulaDigital();

// Expose to window for debugging
window.NebulaDigital = app;
