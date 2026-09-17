/**
 * ============================================
 * NEBULA DIGITAL - Custom Cursor Module
 * ============================================
 */

class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('cursor');
        this.follower = document.getElementById('cursor-follower');
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;

        this.init();
    }

    init() {
        // Hide default cursor
        document.body.style.cursor = 'none';

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Hover effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .asteroid, .service-node, .project-showcase, .form-input');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                this.follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });

            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
                this.follower.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });

        // Start animation loop
        this.animate();
    }

    animate() {
        // Smooth cursor following with lerp
        const dx = this.mouseX - this.cursorX;
        const dy = this.mouseY - this.cursorY;

        this.cursorX += dx * 0.15;
        this.cursorY += dy * 0.15;

        this.cursor.style.left = this.cursorX + 'px';
        this.cursor.style.top = this.cursorY + 'px';

        this.follower.style.left = this.mouseX + 'px';
        this.follower.style.top = this.mouseY + 'px';

        requestAnimationFrame(() => this.animate());
    }

    // Method to create ripple effect on click
    createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        document.body.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

window.CustomCursor = CustomCursor;
