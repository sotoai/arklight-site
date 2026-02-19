    (function() {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const cards = document.querySelectorAll('.tilt-card');
        const maxDeg = 8;
        const depth = 10;

        cards.forEach((card) => {
            const object = card.querySelector('.tilt-object');
            if (!object) return;

            let rafId = null;
            let bounds = null;

            const update = (event) => {
                if (!bounds) bounds = card.getBoundingClientRect();
                const x = (event.clientX - bounds.left) / bounds.width - 0.5;
                const y = (event.clientY - bounds.top) / bounds.height - 0.5;
                const rotY = x * maxDeg;
                const rotX = -y * maxDeg;

                if (rafId) cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(() => {
                    object.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${depth}px)`;
                });
            };

            const reset = () => {
                if (rafId) cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(() => {
                    object.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
                });
                bounds = null;
            };

            card.addEventListener('mouseenter', () => {
                bounds = card.getBoundingClientRect();
            });
            card.addEventListener('mousemove', update);
            card.addEventListener('mouseleave', reset);
            card.addEventListener('touchstart', reset, { passive: true });
        });
    })();
