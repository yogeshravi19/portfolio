/* ============================================
   YOGESH RAVI M — Portfolio Scripts v3
   GSAP + ScrollTrigger + Lenis Smooth Scrolling
   Premium Animation Engine
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    /* ============================================
       1. GSAP + SCROLLTRIGGER REGISTRATION
       Must register BEFORE Lenis references ScrollTrigger
       ============================================ */
    gsap.registerPlugin(ScrollTrigger);

    gsap.defaults({
        ease: 'power3.out',
        duration: 1,
    });

    /* ============================================
       2. LENIS SMOOTH SCROLLING
       Ultra-smooth scrolling with GSAP sync
       ============================================ */
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    /* ============================================
       3. HERO SECTION — Page Load Animations
       Sequenced entrance: greeting → name → typewriter
       → description → buttons → socials → photo card
       ============================================ */
    const heroTL = gsap.timeline({
        defaults: { ease: 'power4.out', duration: 0.9 },
        delay: 0.3,
    });

    // Set initial states (everything hidden)
    gsap.set('.hero-greeting, .hero-name, .hero-typewriter, .hero-description, .hero-actions, .hero-socials', {
        opacity: 0,
        y: 40,
    });
    gsap.set('.hero-visual', {
        opacity: 0,
        x: 60,
        scale: 0.95,
    });
    gsap.set('.hero-scroll-indicator', {
        opacity: 0,
        y: 20,
    });

    // Animate in sequence
    heroTL
        .to('.hero-greeting', { opacity: 1, y: 0, duration: 0.7 })
        .to('.hero-name', { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
        .to('.hero-typewriter', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .to('.hero-description', { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
        .to('.hero-actions', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .to('.hero-socials', { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .to('.hero-visual', { opacity: 1, x: 0, scale: 1, duration: 1 }, '-=0.8')
        .to('.hero-scroll-indicator', { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');

    /* ============================================
       4. SECTION HEADERS — Fade Up on Scroll
       Each section header animates when entering view
       ============================================ */
    gsap.utils.toArray('.section-header').forEach((header) => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 88%',
                once: true,
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
        });

        // Animate child elements with stagger
        const children = header.querySelectorAll('.section-tag, .section-title, .section-line');
        gsap.from(children, {
            scrollTrigger: {
                trigger: header,
                start: 'top 88%',
                once: true,
            },
            opacity: 0,
            y: 25,
            stagger: 0.12,
            duration: 0.6,
            delay: 0.2,
        });
    });

    /* ============================================
       5. ABOUT SECTION ANIMATIONS
       Text and detail card slide in from sides
       ============================================ */
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 82%',
            once: true,
        },
        opacity: 0,
        x: -50,
        duration: 0.9,
    });

    gsap.from('.about-details', {
        scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 82%',
            once: true,
        },
        opacity: 0,
        x: 50,
        duration: 0.9,
        delay: 0.2,
    });

    // About highlights stagger
    gsap.from('.highlight-item', {
        scrollTrigger: {
            trigger: '.about-highlights',
            start: 'top 90%',
            once: true,
        },
        opacity: 0,
        x: -30,
        stagger: 0.15,
        duration: 0.6,
    });

    /* ============================================
       6. TIMELINE MILESTONES — Sequential Stagger
       Each milestone slides up into view sequentially
       ============================================ */
    // Featured milestone (the top one)
    gsap.from('.milestone-content-featured', {
        scrollTrigger: {
            trigger: '.milestone-content-featured',
            start: 'top 85%',
            once: true,
        },
        opacity: 0,
        y: 40,
        scale: 0.97,
        duration: 0.8,
    });

    // Timeline milestones stagger
    const milestones = gsap.utils.toArray('.milestone-timeline .milestone');
    gsap.from(milestones, {
        scrollTrigger: {
            trigger: '.milestone-timeline',
            start: 'top 80%',
            once: true,
        },
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.7,
    });

    /* ============================================
       7. LEADERSHIP SECTION
       Showcase card with scale entrance
       ============================================ */
    gsap.from('.leadership-main-card', {
        scrollTrigger: {
            trigger: '.leadership-showcase',
            start: 'top 82%',
            once: true,
        },
        opacity: 0,
        y: 60,
        scale: 0.96,
        duration: 1,
    });

    // Leadership inner elements stagger
    gsap.from('.role-chip, .resp-item', {
        scrollTrigger: {
            trigger: '.leadership-main-card',
            start: 'top 75%',
            once: true,
        },
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.5,
        delay: 0.4,
    });

    /* ============================================
       8. EVENT CARDS — Staggered Scroll Animation
       Each event card animates sequentially with
       upward slide and fade-in
       ============================================ */
    const eventBlocks = gsap.utils.toArray('.event-block');
    gsap.from(eventBlocks, {
        scrollTrigger: {
            trigger: '#events .container',
            start: 'top 78%',
            once: true,
        },
        opacity: 0,
        y: 60,
        stagger: 0.25,
        duration: 0.9,
    });

    // Event category labels
    gsap.utils.toArray('.event-category-label').forEach((label) => {
        gsap.from(label, {
            scrollTrigger: {
                trigger: label,
                start: 'top 90%',
                once: true,
            },
            opacity: 0,
            y: 30,
            duration: 0.6,
        });
    });

    // Event transition
    gsap.from('.event-transition', {
        scrollTrigger: {
            trigger: '.event-transition',
            start: 'top 90%',
            once: true,
        },
        opacity: 0,
        duration: 0.8,
    });

    // Coming soon cards stagger
    const comingSoonCards = gsap.utils.toArray('.coming-soon-card');
    gsap.from(comingSoonCards, {
        scrollTrigger: {
            trigger: '.event-coming-soon',
            start: 'top 85%',
            once: true,
        },
        opacity: 0,
        y: 40,
        scale: 0.95,
        stagger: 0.15,
        duration: 0.6,
    });

    /* ============================================
       9. EVENT & PROJECT IMAGES — Scroll Reveal
       Images scale and fade in when scrolled into viewport
       ============================================ */
    gsap.utils.toArray('.event-photo').forEach((img) => {
        gsap.from(img, {
            scrollTrigger: {
                trigger: img,
                start: 'top 90%',
                once: true,
            },
            opacity: 0,
            scale: 0.88,
            y: 30,
            duration: 0.8,
        });
    });

    /* ============================================
       10. EXPERIENCE TIMELINE
       Experience cards slide up with stagger
       ============================================ */
    const expItems = gsap.utils.toArray('.exp-item');
    gsap.from(expItems, {
        scrollTrigger: {
            trigger: '.exp-timeline',
            start: 'top 80%',
            once: true,
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
    });

    /* ============================================
       11. PROJECT CARDS — Staggered Entrance
       Cards rise up with slight stagger
       ============================================ */
    const projectCards = gsap.utils.toArray('.project-card');
    gsap.from(projectCards, {
        scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 85%',
            once: true,
        },
        opacity: 0,
        y: 60,
        stagger: 0.2,
        duration: 0.9,
    });

    /* ============================================
       12. SKILLS SECTION — Category Stagger
       Each skill category card animates in
       ============================================ */
    const skillCategories = gsap.utils.toArray('.skill-category');
    gsap.from(skillCategories, {
        scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 85%',
            once: true,
        },
        opacity: 0,
        y: 50,
        stagger: 0.12,
        duration: 0.8,
    });

    // Skill tags animation
    gsap.utils.toArray('.skill-tag').forEach((tag, i) => {
        gsap.from(tag, {
            scrollTrigger: {
                trigger: tag.closest('.skill-category'),
                start: 'top 80%',
                once: true,
            },
            opacity: 0,
            scale: 0.85,
            duration: 0.4,
            delay: 0.3 + (i % 8) * 0.06,
        });
    });

    /* ============================================
       13. RESEARCH INTERESTS — Card Stagger
       ============================================ */
    const researchCards = gsap.utils.toArray('.research-card');
    gsap.from(researchCards, {
        scrollTrigger: {
            trigger: '.research-grid',
            start: 'top 85%',
            once: true,
        },
        opacity: 0,
        y: 50,
        scale: 0.95,
        stagger: 0.15,
        duration: 0.7,
    });

    /* ============================================
       14. CERTIFICATIONS
       ============================================ */
    gsap.from('.cert-card', {
        scrollTrigger: {
            trigger: '.certs-grid',
            start: 'top 85%',
            once: true,
        },
        opacity: 0,
        y: 40,
        duration: 0.7,
    });

    /* ============================================
       15. ACHIEVEMENTS — Staggered Card Entrance
       ============================================ */
    const achievementCards = gsap.utils.toArray('.achievement-card');
    gsap.from(achievementCards, {
        scrollTrigger: {
            trigger: '.achievements-grid',
            start: 'top 85%',
            once: true,
        },
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
    });

    /* ============================================
       16. EDUCATION — Card Entrance
       ============================================ */
    const eduCards = gsap.utils.toArray('.edu-card');
    gsap.from(eduCards, {
        scrollTrigger: {
            trigger: '.education-grid',
            start: 'top 85%',
            once: true,
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
    });

    /* ============================================
       17. CONTACT SECTION
       Left info and right form slide in
       ============================================ */
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 82%',
            once: true,
        },
        opacity: 0,
        x: -50,
        duration: 0.9,
    });

    gsap.from('.contact-form-wrap', {
        scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 82%',
            once: true,
        },
        opacity: 0,
        x: 50,
        duration: 0.9,
        delay: 0.15,
    });

    // Contact cards stagger
    const contactCards = gsap.utils.toArray('.contact-card');
    gsap.from(contactCards, {
        scrollTrigger: {
            trigger: '.contact-cards',
            start: 'top 88%',
            once: true,
        },
        opacity: 0,
        x: -30,
        stagger: 0.12,
        duration: 0.6,
        delay: 0.3,
    });

    /* ============================================
       18. FOOTER ANIMATION
       ============================================ */
    gsap.from('.footer-content', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 92%',
            once: true,
        },
        opacity: 0,
        y: 30,
        duration: 0.7,
    });

    /* ============================================
       19. SKILL BAR FILL — ScrollTrigger Powered
       Bars fill to their data-width on scroll
       ============================================ */
    gsap.utils.toArray('.skill-bar-fill').forEach((bar) => {
        const width = bar.getAttribute('data-width');
        ScrollTrigger.create({
            trigger: bar,
            start: 'top 90%',
            once: true,
            onEnter: () => {
                gsap.to(bar, {
                    width: width + '%',
                    duration: 1.4,
                    ease: 'power2.out',
                });
            },
        });
    });

    /* ============================================
       20. COUNTER ANIMATION — Hero Stats
       Numbers count up when visible
       ============================================ */
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(element, target) {
        const obj = { val: 0 };
        gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
                element.textContent = Math.round(obj.val) + (target >= 100 ? '+' : '');
            },
        });
    }

    /* ============================================
       EXISTING FEATURES (Preserved)
       ============================================ */

    // === Typewriter Effect ===
    const typewriterEl = document.getElementById('typewriter');
    const titles = [
        'Data Analyst',
        'Python Developer',
        'Machine Learning Explorer',
        'Analytics Problem Solver',
        'AI/ML Enthusiast',
        'Data Visualization Expert',
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const current = titles[titleIndex];
        if (isDeleting) {
            typewriterEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === current.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            speed = 500;
        }

        setTimeout(typeWriter, speed);
    }
    typeWriter();

    // === Navbar Scroll (Lenis-compatible) ===
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-link-cta)');
    const sections = document.querySelectorAll('section[id]');

    // Use Lenis scroll event for navbar effects
    lenis.on('scroll', ({ scroll }) => {
        // Navbar background
        if (scroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link highlight
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (scroll >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Initial navbar state
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // === Mobile Nav Toggle ===
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // === Cursor Glow ===
    const cursorGlow = document.getElementById('cursorGlow');
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursorGlow() {
        cursorGlow.style.left = mouseX + 'px';
        cursorGlow.style.top = mouseY + 'px';
        requestAnimationFrame(updateCursorGlow);
    }
    updateCursorGlow();

    // === Smooth Anchor Scroll (via Lenis) ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                lenis.scrollTo(target, {
                    offset: -72, // nav height offset
                    duration: 1.2,
                });
            }
        });
    });

    // === Particle Background ===
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    const particleCount = 60;
    let canvasWidth, canvasHeight;

    function resizeCanvas() {
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvasWidth;
            this.y = Math.random() * canvasHeight;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.4 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvasWidth) this.speedX *= -1;
            if (this.y < 0 || this.y > canvasHeight) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    const opacity = (1 - dist / 150) * 0.08;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // === Contact Form ===
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('.btn');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<span style="display:flex;align-items:center;gap:8px;justify-content:center;">✓ Message Sent!</span>';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            contactForm.reset();
            lucide.createIcons();
        }, 3000);
    });

    // === Club Activities Slideshow ===
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slide-dot');
    const prevBtn = document.getElementById('slidePrev');
    const nextBtn = document.getElementById('slideNext');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlideFunc() {
        goToSlide(currentSlide + 1);
    }

    function prevSlideFunc() {
        goToSlide(currentSlide - 1);
    }

    function startAutoPlay() {
        slideInterval = setInterval(nextSlideFunc, 4000);
    }

    function resetAutoPlay() {
        clearInterval(slideInterval);
        startAutoPlay();
    }

    if (slides.length > 0) {
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlideFunc(); resetAutoPlay(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlideFunc(); resetAutoPlay(); });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                goToSlide(parseInt(dot.getAttribute('data-index')));
                resetAutoPlay();
            });
        });

        startAutoPlay();
    }

    // === Interactive Achievement Cards (Accordion) ===
    const expandableCards = document.querySelectorAll('.achievement-card.expandable');

    expandableCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.event-item a')) return;

            const isCurrentlyExpanded = card.classList.contains('expanded');

            expandableCards.forEach(c => {
                c.classList.remove('expanded');
            });

            if (!isCurrentlyExpanded) {
                card.classList.add('expanded');

                setTimeout(() => {
                    lenis.scrollTo(card, {
                        offset: -100,
                        duration: 0.8,
                    });
                }, 300);
            }
        });
    });

    // Re-initialize Lucide icons for dynamically added elements
    lucide.createIcons();
});
