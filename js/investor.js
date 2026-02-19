/* ── Password gate ─────────────────────────────────────────────── */
(function() {
    if (sessionStorage.getItem('investor-access-granted') === 'true') return;

    var pw = window.prompt('Enter password for the Investor page:');
    if (pw !== 'Investor123') {
        window.location.href = 'index.html';
        return;
    }
    sessionStorage.setItem('investor-access-granted', 'true');
})();

/* ── Investor page logic ──────────────────────────────────────── */
(function() {
    const investorView = document.querySelector('main');
    if (!investorView) return;

    const tocLinks = Array.from(investorView.querySelectorAll('.toc-link'));
    const sections = Array.from(investorView.querySelectorAll('[data-section]'));
    const copyButtons = Array.from(investorView.querySelectorAll('[data-copy]'));
    const heroScroll = investorView.querySelector('[data-scroll-target]');
    const tocOverlay = investorView.querySelector('[data-toc-overlay]');
    const tocOpeners = Array.from(investorView.querySelectorAll('[data-toc-open]'));
    const tocClosers = Array.from(investorView.querySelectorAll('[data-toc-close]'));
    const heroSection = investorView.querySelector('.investor-hero');
    const heroQuote = investorView.querySelector('.investor-quote');
    const heroFooter = investorView.querySelector('.investor-hero-footer');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let investorScrollOffset = 120;
    let heroRaf = 0;

    function syncInvestorHeaderOffset() {
        const header = document.querySelector('.header');
        investorScrollOffset = (header ? Math.ceil(header.getBoundingClientRect().height) : 104) + 16;
        investorView.style.setProperty('--investor-header-offset', `${investorScrollOffset}px`);
    }

    syncInvestorHeaderOffset();
    window.addEventListener('resize', syncInvestorHeaderOffset);

    function updateHeroScrollEffects() {
        heroRaf = 0;
        if (prefersReduced || !heroSection || !heroQuote || !heroFooter) return;
        const rect = heroSection.getBoundingClientRect();
        const travel = Math.max(rect.height * 0.85, 1);
        const progress = Math.max(0, Math.min(1, (0 - rect.top) / travel));
        heroQuote.style.transform = `translate3d(0, ${progress * 26}px, 0)`;
        heroQuote.style.opacity = `${1 - progress * 0.28}`;
        heroFooter.style.transform = `translate3d(0, ${progress * 18}px, 0)`;
        heroFooter.style.opacity = `${1 - progress * 0.34}`;
    }

    function queueHeroScrollEffects() {
        if (heroRaf) return;
        heroRaf = window.requestAnimationFrame(updateHeroScrollEffects);
    }

    if (!prefersReduced && heroSection && heroQuote && heroFooter) {
        window.addEventListener('scroll', queueHeroScrollEffects, { passive: true });
        window.addEventListener('resize', queueHeroScrollEffects);
        queueHeroScrollEffects();
    }

    function setActiveSection(id) {
        sections.forEach(section => {
            section.classList.toggle('is-active', section.id === id);
        });
        tocLinks.forEach(link => {
            const isActive = link.dataset.target === id;
            link.classList.toggle('active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'true');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    function scrollToSection(id) {
        const target = investorView.querySelector(`#${id}`);
        if (!target) return;
        const top = window.scrollY + target.getBoundingClientRect().top - investorScrollOffset;
        window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
    }

    function setTocOpen(isOpen) {
        if (!tocOverlay) return;
        tocOverlay.classList.toggle('is-open', isOpen);
        document.body.classList.toggle('investor-toc-open', isOpen && true);
    }

    tocLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const targetId = link.dataset.target;
            if (!targetId) return;
            event.preventDefault();
            if (window.location.hash !== `#${targetId}`) {
                window.location.hash = targetId;
            }
            scrollToSection(targetId);
            setTocOpen(false);
        });
    });

    tocOpeners.forEach(button => {
        button.addEventListener('click', () => {
            setTocOpen(true);
        });
    });

    tocClosers.forEach(button => {
        button.addEventListener('click', () => {
            setTocOpen(false);
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setTocOpen(false);
        }
    });

    if (heroScroll) {
        heroScroll.addEventListener('click', (event) => {
            const targetId = heroScroll.dataset.scrollTarget;
            if (!targetId) return;
            event.preventDefault();
            scrollToSection(targetId);
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
            }
        });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
    if (sections.length) {
        setActiveSection(sections[0].id);
    }

    const revealItems = Array.from(investorView.querySelectorAll('[data-reveal]'));
    if (revealItems.length) {
        if (prefersReduced) {
            revealItems.forEach(item => item.classList.add('is-visible'));
            const reducedCovers = investorView.querySelectorAll('.wipe-cover');
            reducedCovers.forEach(cover => cover.remove());
        } else {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-visible');
                    if (entry.target.dataset.reveal === 'wipe') {
                        const cover = entry.target.querySelector('.wipe-cover');
                        if (cover) {
                            const removeCover = () => cover.remove();
                            cover.addEventListener('transitionend', removeCover, { once: true });
                            window.setTimeout(removeCover, 1100);
                        }
                    }
                    revealObserver.unobserve(entry.target);
                });
            }, { rootMargin: '0px 0px -10% 0px', threshold: 0.2 });

            revealItems.forEach(item => revealObserver.observe(item));
        }
    }

    function copyText(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text);
        }
        return new Promise((resolve) => {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.setAttribute('readonly', '');
            textarea.style.position = 'absolute';
            textarea.style.left = '-9999px';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            resolve();
        });
    }

    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const targetId = button.dataset.copy;
            if (!targetId) return;
            const hash = `#${targetId}`;
            await copyText(hash);
            button.dataset.copied = 'true';
            window.setTimeout(() => {
                button.dataset.copied = 'false';
            }, 1200);
        });
    });
})();
