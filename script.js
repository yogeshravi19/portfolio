/* ============================================
   YOGESH RAVI M — Portfolio v5
   GSAP + ScrollTrigger + Lenis
   Robust Hybrid Animation Engine
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    /* === 1. GSAP Setup === */
    gsap.registerPlugin(ScrollTrigger);

    /* === 2. Lenis Smooth Scroll === */
    const lenis = new Lenis({
        duration: 1.2,
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
        el.style.transform = 'translateY(28px)';
    });
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.removeAttribute('data-animate');
        heroVisual.style.opacity = '0';
        heroVisual.style.transform = 'translateX(40px)';
    }

    const heroTL = gsap.timeline({ defaults: { ease: 'power4.out', duration: 0.75 }, delay: 0.3 });
    heroTL
        .to('.hero-greeting', { opacity: 1, y: 0, duration: 0.5 })
        .to('.hero-name', { opacity: 1, y: 0, duration: 0.65 }, '-=0.25')
        .to('.hero-typewriter', { opacity: 1, y: 0, duration: 0.45 }, '-=0.25')
        .to('.hero-description', { opacity: 1, y: 0, duration: 0.55 }, '-=0.2')
        .to('.hero-actions', { opacity: 1, y: 0, duration: 0.45 }, '-=0.15')
        .to('.hero-socials', { opacity: 1, y: 0, duration: 0.45 }, '-=0.15')
        .to('.hero-visual', { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');

    /* === 5. GSAP Stagger Animations === */

    // Achievement stat cards
    ScrollTrigger.create({
        trigger: '.achievements-stat-grid',
        start: 'top 82%',
        once: true,
        onEnter: () => {
            gsap.fromTo('.stat-card',
                { opacity: 0, y: 40, scale: 0.96 },
                { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out' }
            );
        },
    });

    // Milestone timeline
    ScrollTrigger.create({
        trigger: '.milestone-timeline',
        start: 'top 82%',
        once: true,
        onEnter: () => {
            gsap.fromTo('.milestone',
                { opacity: 0, y: 36 },
                { opacity: 1, y: 0, stagger: 0.12, duration: 0.65, ease: 'power3.out' }
            );
        },
    });

    // Experience items
    ScrollTrigger.create({
        trigger: '.exp-timeline',
        start: 'top 82%',
        once: true,
        onEnter: () => {
            gsap.fromTo('.exp-item',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out' }
            );
        },
    });

    // Activity cards (all groups)
    document.querySelectorAll('.activities-grid').forEach(grid => {
        ScrollTrigger.create({
            trigger: grid,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.fromTo(grid.querySelectorAll('.activity-card'),
                    { opacity: 0, y: 35 },
                    { opacity: 1, y: 0, stagger: 0.08, duration: 0.55, ease: 'power3.out' }
                );
            },
        });
    });

    // Project cards
    ScrollTrigger.create({
        trigger: '.projects-grid',
        start: 'top 85%',
        once: true,
        onEnter: () => {
            gsap.fromTo('.project-card',
                { opacity: 0, y: 45 },
                { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out' }
            );
        },
    });

    // Education cards
    ScrollTrigger.create({
        trigger: '.education-grid',
        start: 'top 85%',
        once: true,
        onEnter: () => {
            gsap.fromTo('.edu-card',
                { opacity: 0, y: 35 },
                { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out' }
            );
        },
    });

    // Contact cards
    ScrollTrigger.create({
        trigger: '.contact-cards',
        start: 'top 88%',
        once: true,
        onEnter: () => {
            gsap.fromTo('.contact-card',
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, stagger: 0.08, duration: 0.45, ease: 'power3.out' }
            );
        },
    });

    // Activity images
    document.querySelectorAll('.activity-img').forEach(img => {
        ScrollTrigger.create({
            trigger: img,
            start: 'top 92%',
            once: true,
            onEnter: () => {
                gsap.fromTo(img,
                    { opacity: 0, scale: 0.92 },
                    { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
                );
            },
        });
    });

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
                    duration: 1.8,
                    ease: 'power2.out',
                    onUpdate: () => {
                        el.textContent = Math.round(obj.val) + (target >= 100 ? '+' : '');
                    },
                });
            },
        });
    });

    /* === 7. Refresh ScrollTrigger After Lenis === */
    setTimeout(() => { ScrollTrigger.refresh(); }, 500);

    /* === EXISTING FEATURES === */

    // Typewriter
    const typewriterEl = document.getElementById('typewriter');
    const titles = ['Research Analyst', 'Data Science Explorer', 'Python Developer', 'AI/ML Enthusiast', 'Analytics Problem Solver'];
    let titleIdx = 0, charIdx = 0, deleting = false;

    function typeWriter() {
        const cur = titles[titleIdx];
        if (deleting) { typewriterEl.textContent = cur.substring(0, --charIdx); }
        else { typewriterEl.textContent = cur.substring(0, ++charIdx); }

        let speed = deleting ? 35 : 70;
        if (!deleting && charIdx === cur.length) { speed = 2200; deleting = true; }
        else if (deleting && charIdx === 0) { deleting = false; titleIdx = (titleIdx + 1) % titles.length; speed = 400; }

        setTimeout(typeWriter, speed);
    }
    typeWriter();

    // Navbar
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-link-cta)');
    const sections = document.querySelectorAll('section[id]');

    lenis.on('scroll', ({ scroll }) => {
        navbar.classList.toggle('scrolled', scroll > 50);
        let current = '';
        sections.forEach(s => { if (scroll >= s.offsetTop - 120) current = s.id; });
        navLinks.forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
        });
    });
    if (window.scrollY > 50) navbar.classList.add('scrolled');

    // Mobile Nav
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');
    navToggle.addEventListener('click', () => { navToggle.classList.toggle('active'); navLinksContainer.classList.toggle('active'); });
    navLinksContainer.querySelectorAll('.nav-link').forEach(l => {
        l.addEventListener('click', () => { navToggle.classList.remove('active'); navLinksContainer.classList.remove('active'); });
    });

    // Cursor Glow
    const cursorGlow = document.getElementById('cursorGlow');
    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function updateGlow() { cursorGlow.style.left = mx + 'px'; cursorGlow.style.top = my + 'px'; requestAnimationFrame(updateGlow); })();

    // Smooth Anchors
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const t = document.querySelector(a.getAttribute('href'));
            if (t) lenis.scrollTo(t, { offset: -68, duration: 1.2 });
        });
    });

    // Particles
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [], cw, ch;

    function resize() { cw = canvas.width = innerWidth; ch = canvas.height = innerHeight; }
    resize(); addEventListener('resize', resize);

    class P {
        constructor() { this.reset(); }
        reset() { this.x = Math.random() * cw; this.y = Math.random() * ch; this.s = Math.random() * 1.8 + 0.4; this.vx = (Math.random() - .5) * .25; this.vy = (Math.random() - .5) * .25; this.o = Math.random() * .35 + .08; }
        update() { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > cw) this.vx *= -1; if (this.y < 0 || this.y > ch) this.vy *= -1; }
        draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2); ctx.fillStyle = `rgba(6,182,212,${this.o})`; ctx.fill(); }
    }

    for (let i = 0; i < 50; i++) particles.push(new P());

    (function animate() {
        ctx.clearRect(0, 0, cw, ch);
        particles.forEach(p => { p.update(); p.draw(); });
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 140) {
                    ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(6,182,212,${(1 - d / 140) * .06})`; ctx.lineWidth = .5; ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    })();

    // Contact Form
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('.btn');
        const orig = btn.innerHTML;
        btn.innerHTML = '<span style="display:flex;align-items:center;gap:8px;justify-content:center;">✓ Message Sent!</span>';
        btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
        setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; form.reset(); lucide.createIcons(); }, 3000);
    });

    lucide.createIcons();
});
