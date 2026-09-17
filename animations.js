/**
 * ============================================
 * NEBULA DIGITAL - Animations Module
 * GSAP Implementation
 * ============================================
 */

class Animations {
    constructor() {
        this.preloader = document.getElementById('preloader');
        this.loaderBar = document.querySelector('.loader-bar');
        this.codeLines = document.querySelectorAll('.code-line');

        this.init();
    }

    init() {
        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Run preloader animation
        this.runPreloader();

        // Setup scroll animations
        this.setupScrollAnimations();

        // Setup text animations
        this.setupTextAnimations();
    }

    runPreloader() {
        const tl = gsap.timeline();

        // Animate code lines
        tl.from(this.codeLines, {
            opacity: 0,
            stagger: 0.3,
            duration: 0.5,
            ease: "power2.out"
        }, 0);

        // Wait for loading bar
        tl.to(this.preloader, {
            opacity: 0,
            visibility: 'hidden',
            duration: 0.8,
            delay: 2.5,
            ease: "power2.inOut",
            onComplete: () => {
                this.preloader.style.display = 'none';
                this.afterPreloader();
            }
        }, 3);
    }

    afterPreloader() {
        // Animate hero section
        const heroTitle = document.querySelector('.hero-title');
        const sloganWords = document.querySelectorAll('.slogan-word');
        const scrollIndicator = document.querySelector('.scroll-indicator');

        const tl = gsap.timeline();

        // Glitch effect on title
        tl.from(heroTitle, {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            ease: "back.out(1.7)"
        }, 0);

        // Animate slogan words
        tl.to(sloganWords, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out"
        }, 0.3);

        // Fade in scroll indicator
        tl.from(scrollIndicator, {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 0.5
        }, 1);

        // Animate asteroids
        this.animateAsteroids();
    }

    animateAsteroids() {
        const asteroids = document.querySelectorAll('.asteroid');

        asteroids.forEach((asteroid, index) => {
            gsap.from(asteroid, {
                scale: 0,
                opacity: 0,
                duration: 1.5,
                delay: 0.5 + index * 0.2,
                ease: "elastic.out(1, 0.5)"
            });
        });
    }

    setupScrollAnimations() {
        // Animate sections on scroll
        const sections = document.querySelectorAll('.content-section');

        sections.forEach(section => {
            if (section.dataset.section !== 'home') {
                gsap.from(section.querySelectorAll('.project-showcase, .service-node'), {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    },
                    y: 100,
                    opacity: 0,
                    stagger: 0.2,
                    duration: 1,
                    ease: "power3.out"
                });
            }
        });

        // Parallax effect for asteroids
        gsap.to(document.querySelectorAll('.asteroid'), {
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            },
            y: (i, target) => -100 * (i + 1),
            stagger: 0.1
        });
    }

    setupTextAnimations() {
        // Glitch text effect
        const glitchTexts = document.querySelectorAll('.glitch-text');

        glitchTexts.forEach(text => {
            setInterval(() => {
                text.classList.add('glitch');
                setTimeout(() => {
                    text.classList.remove('glitch');
                }, 300);
            }, Utils.random(3000, 8000));
        });

        // Neon flicker on hover
        const neonElements = document.querySelectorAll('.asteroid-core, .tech-tag');

        neonElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.classList.add('neon-flicker');
            });

            el.addEventListener('mouseleave', () => {
                el.classList.remove('neon-flicker');
            });
        });
    }

    // Section transition animation
    transitionToSection(sectionId) {
        const currentSection = document.querySelector('.content-section.active');
        const targetSection = document.getElementById(`section-${sectionId}`);

        if (!targetSection || currentSection === targetSection) return;

        const tl = gsap.timeline();

        // Zoom out current section
        tl.to(currentSection, {
            opacity: 0,
            scale: 1.5,
            duration: 0.6,
            ease: "power2.in"
        }, 0);

        // Change active class
        tl.call(() => {
            currentSection.classList.remove('active');
            targetSection.classList.add('active');
        }, null, 0.3);

        // Zoom in new section
        tl.fromTo(targetSection, {
            opacity: 0,
            scale: 0.5
        }, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out"
        }, 0.4);

        // Animate elements in new section
        this.animateSectionElements(targetSection);
    }

    animateSectionElements(section) {
        const title = section.querySelector('.section-title');
        const items = section.querySelectorAll('.project-showcase, .service-node');

        if (title) {
            gsap.from(title, {
                x: -50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        }

        if (items.length > 0) {
            gsap.from(items, {
                y: 50,
                opacity: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.3
            });
        }
    }

    // Warp effect for navigation
    warpEffect() {
        const overlay = document.querySelector('.distortion-overlay') || this.createDistortionOverlay();

        const tl = gsap.timeline();

        tl.to(overlay, {
            opacity: 1,
            duration: 0.2
        })
        .to(overlay, {
            opacity: 0,
            duration: 0.3,
            delay: 0.1
        });

        // Add chromatic aberration
        document.body.classList.add('chromatic-active');
        setTimeout(() => {
            document.body.classList.remove('chromatic-active');
        }, 500);
    }

    createDistortionOverlay() {
        const overlay = document.createElement('div');
        overlay.classList.add('distortion-overlay');
        document.body.appendChild(overlay);
        return overlay;
    }

    // Contact form animation
    animateFormReveal() {
        const button = document.getElementById('start-project-btn');
        const form = document.getElementById('contact-form');

        button.addEventListener('click', () => {
            const tl = gsap.timeline();

            // Explode button
            tl.to(button, {
                scale: 1.5,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            })
            .call(() => {
                button.classList.add('hidden');
                form.classList.remove('hidden');
            })
            .from(form, {
                y: 50,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out"
            });

            // Animate form fields
            gsap.from(form.querySelectorAll('.form-group'), {
                x: -30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
                delay: 0.3,
                ease: "power3.out"
            });
        });
    }

    // Particle explosion effect
    particleExplosion(x, y) {
        const particleCount = 30;
        const colors = ['#00F0FF', '#BD00FF', '#39FF14'];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.background = colors[Utils.randomInt(0, colors.length - 1)];
            document.body.appendChild(particle);

            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = Utils.random(50, 150);
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            gsap.to(particle, {
                x: tx,
                y: ty,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                onComplete: () => particle.remove()
            });
        }
    }
}

window.Animations = Animations;
