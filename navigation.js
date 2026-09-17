/**
 * ============================================
 * NEBULA DIGITAL - Navigation Module
 * ============================================
 */

class Navigation {
    constructor(scene3D, animations) {
        this.scene3D = scene3D;
        this.animations = animations;
        this.currentSection = 'home';
        this.asteroids = document.querySelectorAll('.asteroid');
        this.returnBtn = document.getElementById('return-btn');
        this.audioToggle = document.getElementById('audio-toggle');
        this.audioEnabled = false;

        this.init();
    }

    init() {
        // Setup asteroid navigation
        this.asteroids.forEach(asteroid => {
            asteroid.addEventListener('click', () => {
                const section = asteroid.dataset.section;
                this.navigateToSection(section);
            });

            // Magnetic effect
            asteroid.addEventListener('mousemove', (e) => {
                const rect = asteroid.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(asteroid, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            asteroid.addEventListener('mouseleave', () => {
                gsap.to(asteroid, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.5)"
                });
            });
        });

        // Return button
        this.returnBtn.addEventListener('click', () => {
            this.returnToHome();
        });

        // Audio toggle
        this.audioToggle.addEventListener('click', () => {
            this.toggleAudio();
        });

        // Keyboard navigation
        this.setupKeyboardNav();
    }

    navigateToSection(section) {
        if (this.currentSection === section) return;

        // Trigger warp effect
        this.animations.warpEffect();

        // 3D scene warp
        const sectionIndex = Array.from(this.asteroids).findIndex(
            a => a.dataset.section === section
        );

        this.scene3D.warpToSection(sectionIndex);

        // Update content
        this.animations.transitionToSection(section);

        // Update current section
        this.currentSection = section;

        // Show return button
        this.returnBtn.classList.remove('hidden');

        // Create particle explosion at cursor
        const asteroid = document.querySelector(`.asteroid[data-section="${section}"]`);
        if (asteroid) {
            const rect = asteroid.getBoundingClientRect();
            this.animations.particleExplosion(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            );
        }
    }

    returnToHome() {
        if (this.currentSection === 'home') return;

        this.animations.warpEffect();
        this.scene3D.returnToCenter();
        this.animations.transitionToSection('home');
        this.currentSection = 'home';
        this.returnBtn.classList.add('hidden');
    }

    toggleAudio() {
        this.audioEnabled = !this.audioEnabled;

        if (this.audioEnabled) {
            this.audioToggle.classList.add('active');
            // Here you would initialize and play ambient audio
            console.log('Audio enabled - ambient sound playing');
        } else {
            this.audioToggle.classList.remove('active');
            // Pause audio
            console.log('Audio disabled');
        }
    }

    setupKeyboardNav() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'h':
                case 'H':
                case 'Home':
                    this.returnToHome();
                    break;
                case '1':
                    this.navigateToSection('home');
                    break;
                case '2':
                    this.navigateToSection('portfolio');
                    break;
                case '3':
                    this.navigateToSection('services');
                    break;
                case '4':
                    this.navigateToSection('contact');
                    break;
                case 'Escape':
                    this.returnToHome();
                    break;
            }
        });
    }

    // Update asteroid positions based on scroll
    updateAsteroidPositions(scrollY) {
        this.asteroids.forEach((asteroid, index) => {
            const baseY = asteroid.dataset.position === '0' || asteroid.dataset.position === '2' 
                ? 0 
                : scrollY * 0.2;

            gsap.to(asteroid, {
                y: baseY,
                duration: 1,
                ease: "power2.out"
            });
        });
    }
}

window.Navigation = Navigation;
