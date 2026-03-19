/* ============================================
   YOGESH RAVI M — Portfolio v6
   Professional Theme
   GSAP + ScrollTrigger + Lenis
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    /* === 1. GSAP Setup === */
    gsap.registerPlugin(ScrollTrigger);

    /* === 2. Lenis Smooth Scroll === */
    const lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    /* === 3. CSS Class-Based Scroll Animations === */
    document.querySelectorAll('[data-animate]').forEach(el => {
        const delay = parseInt(el.getAttribute('data-delay') || 0);
        ScrollTrigger.create({
            trigger: el,
            start: 'top 90%',
            once: true,
            onEnter: () => {
                setTimeout(() => { el.classList.add('animated'); }, delay);
            },
        });
    });

    /* === 4. Hero Timeline === */
    const heroEls = document.querySelectorAll('.hero [data-animate]');
    heroEls.forEach(el => {
        el.removeAttribute('data-animate');
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
    });
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.removeAttribute('data-animate');
        heroVisual.style.opacity = '0';
        heroVisual.style.transform = 'translateX(30px)';
    }

    const heroTL = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.65 }, delay: 0.2 });
    heroTL
        .to('.hero-greeting', { opacity: 1, y: 0, duration: 0.4 })
        .to('.hero-name', { opacity: 1, y: 0, duration: 0.55 }, '-=0.2')
        .to('.hero-typewriter', { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
        .to('.hero-description', { opacity: 1, y: 0, duration: 0.45 }, '-=0.15')
        .to('.hero-actions', { opacity: 1, y: 0, duration: 0.4 }, '-=0.1')
        .to('.hero-socials', { opacity: 1, y: 0, duration: 0.4 }, '-=0.1')
        .to('.hero-visual', { opacity: 1, x: 0, duration: 0.65, ease: 'power3.out' }, '-=0.4');

    /* === 5. GSAP Stagger Animations === */

    // Skill category cards
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
        ScrollTrigger.create({
            trigger: skillsGrid,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.fromTo('.skill-category',
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power3.out' }
                );
            },
        });
    }

    // Achievement stat cards
    const achievementsGrid = document.querySelector('.achievements-stat-grid');
    if (achievementsGrid) {
        ScrollTrigger.create({
            trigger: achievementsGrid,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.fromTo(achievementsGrid.querySelectorAll('.stat-card'),
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power3.out' }
                );
            },
        });
    }

    // Experience items
    const expTimeline = document.querySelector('.exp-timeline');
    if (expTimeline) {
        ScrollTrigger.create({
            trigger: expTimeline,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.fromTo('.exp-item',
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, stagger: 0.12, duration: 0.55, ease: 'power3.out' }
                );
            },
        });
    }

    // Event cards (all grids)
    document.querySelectorAll('.events-grid').forEach(grid => {
        ScrollTrigger.create({
            trigger: grid,
            start: 'top 88%',
            once: true,
            onEnter: () => {
                gsap.fromTo(grid.querySelectorAll('.event-card'),
                    { opacity: 0, y: 25 },
                    { opacity: 1, y: 0, stagger: 0.06, duration: 0.45, ease: 'power3.out' }
                );
            },
        });
    });

    // Project cards
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        ScrollTrigger.create({
            trigger: projectsGrid,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.fromTo('.project-card',
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, stagger: 0.12, duration: 0.55, ease: 'power3.out' }
                );
            },
        });
    }

    // Education cards
    const eduGrid = document.querySelector('.education-grid');
    if (eduGrid) {
        ScrollTrigger.create({
            trigger: eduGrid,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.fromTo('.edu-card',
                    { opacity: 0, y: 25 },
                    { opacity: 1, y: 0, stagger: 0.12, duration: 0.5, ease: 'power3.out' }
                );
            },
        });
    }

    // Contact cards
    const contactCards = document.querySelector('.contact-cards');
    if (contactCards) {
        ScrollTrigger.create({
            trigger: contactCards,
            start: 'top 90%',
            once: true,
            onEnter: () => {
                gsap.fromTo('.contact-card',
                    { opacity: 0, x: -15 },
                    { opacity: 1, x: 0, stagger: 0.08, duration: 0.4, ease: 'power3.out' }
                );
            },
        });
    }

    /* === 6. Counter Animation === */
    document.querySelectorAll('.stat-number[data-count]').forEach(el => {
        ScrollTrigger.create({
            trigger: el,
            start: 'top 90%',
            once: true,
            onEnter: () => {
                const target = parseInt(el.getAttribute('data-count'));
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: target,
                    duration: 1.5,
                    ease: 'power2.out',
                    onUpdate: () => {
                        el.textContent = Math.round(obj.val) + (target >= 100 ? '+' : '');
                    },
                });
            },
        });
    });

    /* === 7. Refresh ScrollTrigger === */
    setTimeout(() => { ScrollTrigger.refresh(); }, 500);

    /* === 8. Navbar === */
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-link-cta)');
    const sections = document.querySelectorAll('section[id]');

    lenis.on('scroll', ({ scroll }) => {
        navbar.classList.toggle('scrolled', scroll > 50);
        let current = '';
        sections.forEach(s => { if (scroll >= s.offsetTop - 100) current = s.id; });
        navLinks.forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
        });
    });
    if (window.scrollY > 50) navbar.classList.add('scrolled');

    /* === 9. Mobile Nav === */
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });
    navLinksContainer.querySelectorAll('.nav-link').forEach(l => {
        l.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    /* === 10. Smooth Anchors === */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const t = document.querySelector(a.getAttribute('href'));
            if (t) lenis.scrollTo(t, { offset: -64, duration: 1.0 });
        });
    });

    /* === 11. Contact Form === */
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = form.querySelector('.btn');
            const orig = btn.innerHTML;
            btn.innerHTML = '<span style="display:flex;align-items:center;gap:8px;justify-content:center;">✓ Message Sent</span>';
            btn.style.background = '#0d7a5f';
            setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; form.reset(); lucide.createIcons(); }, 3000);
        });
    }

    lucide.createIcons();
});
