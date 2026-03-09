/* ============================================
   YOGESH RAVI M — Portfolio Scripts v4
   GSAP + ScrollTrigger + Lenis Smooth Scrolling
   Robust Hybrid Animation Engine
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    /* ============================================
       1. GSAP + SCROLLTRIGGER SETUP
       Register plugin FIRST before anything else
       ============================================ */
    gsap.registerPlugin(ScrollTrigger);

    /* ============================================
       2. LENIS SMOOTH SCROLLING
       Ultra-smooth scrolling synced with GSAP
       ============================================ */
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
    });

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    /* ============================================
       3. SCROLL ANIMATIONS — Class-based (Reliable)
       CSS handles the actual opacity/transform transition
       ScrollTrigger just adds the .animated class
       This approach NEVER leaves elements invisible
       ============================================ */
    const animateElements = document.querySelectorAll('[data-animate]');

    animateElements.forEach(el => {
        const delay = parseInt(el.getAttribute('data-delay') || 0);

        ScrollTrigger.create({
            trigger: el,
            start: 'top 90%',
            once: true,
            onEnter: () => {
                setTimeout(() => {
                    el.classList.add('animated');
                }, delay);
            },
        });
    });

    /* ============================================
       4. HERO SECTION — GSAP Page Load Timeline
       Sequenced entrance animation on page load
       ============================================ */
    const heroElements = document.querySelectorAll('.hero [data-animate]');
    // Remove data-animate from hero elements (we handle them with GSAP timeline)
    heroElements.forEach(el => {
        el.removeAttribute('data-animate');
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
    });

    // Also handle the hero visual separately
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.removeAttribute('data-animate');
        heroVisual.style.opacity = '0';
        heroVisual.style.transform = 'translateX(50px)';
    }

    const heroTL = gsap.timeline({
        defaults: { ease: 'power4.out', duration: 0.8 },
        delay: 0.3,
    });

    heroTL
        .to('.hero-greeting', { opacity: 1, y: 0, duration: 0.6 })
        .to('.hero-name', { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
        .to('.hero-typewriter', { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
        .to('.hero-description', { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
        .to('.hero-actions', { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .to('.hero-socials', { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .to('.hero-visual', { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6');

    /* ============================================
       5. STAGGER ANIMATIONS — GSAP-powered
       Cards and grouped elements get stagger effects
       via ScrollTrigger onEnter callbacks
       ============================================ */

    // --- Event blocks stagger ---
    ScrollTrigger.create({
        trigger: '#events .container',
        start: 'top 80%',
        once: true,
        onEnter: () => {
            gsap.fromTo('.event-block', 
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: 'power3.out' }
            );
        },
    });

    // --- Coming soon cards stagger ---
    ScrollTrigger.create({
        trigger: '.event-coming-soon',
        start: 'top 85%',
        once: true,
        onEnter: () => {
            gsap.fromTo('.coming-soon-card',
                { opacity: 0, y: 30, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.6, ease: 'power3.out' }
            );
        },
    });

    // --- Timeline milestones stagger ---
    ScrollTrigger.create({
        trigger: '.milestone-timeline',
        start: 'top 80%',
        once: true,
        onEnter: () => {
            gsap.fromTo('.milestone-timeline .milestone',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out' }
            );
        },
    });

    // --- Experience items stagger ---
    ScrollTrigger.create({
        trigger: '.exp-timeline',
        start: 'top 80%',
        once: true,
        onEnter: () => {
            gsap.fromTo('.exp-item',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, stagger: 0.18, duration: 0.7, ease: 'power3.out' }
            );
        },
    });

    // --- Project cards stagger ---
    ScrollTrigger.create({
        trigger: '.projects-grid',
        start: 'top 85%',
        once: true,
        onEnter: () => {
            gsap.fromTo('.project-card',
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, stagger: 0.18, duration: 0.8, ease: 'power3.out' }
            );
        },
    });

    // --- Skill categories stagger ---
    ScrollTrigger.create({
        trigger: '.skills-grid',
        start: 'top 85%',
        once: true,
        onEnter: () => {
            gsap.fromTo('.skill-category',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out' }
            );
        },
    });

    // --- Research cards stagger ---
    ScrollTrigger.create({
        trigger: '.research-grid',
        start: 'top 85%',
        once: true,
        onEnter: () => {
            gsap.fromTo('.research-card',
                { opacity: 0, y: 40, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.6, ease: 'power3.out' }
            );
        },
    });

    // --- Achievement cards stagger ---
    ScrollTrigger.create({
        trigger: '.achievements-grid',
        start: 'top 85%',
        once: true,
        onEnter: () => {
            gsap.fromTo('.achievement-card',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out' }
            );
        },
    });

    // --- Education cards stagger ---
    ScrollTrigger.create({
        trigger: '.education-grid',
        start: 'top 85%',
        once: true,
        onEnter: () => {
            gsap.fromTo('.edu-card',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, stagger: 0.18, duration: 0.7, ease: 'power3.out' }
            );
        },
    });

    // --- Leadership inner elements ---
    ScrollTrigger.create({
        trigger: '.leadership-main-card',
        start: 'top 80%',
        once: true,
        onEnter: () => {
            gsap.fromTo('.role-chip, .resp-item',
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, stagger: 0.06, duration: 0.4, ease: 'power2.out', delay: 0.3 }
            );
        },
    });

    // --- Contact cards stagger ---
    ScrollTrigger.create({
        trigger: '.contact-cards',
        start: 'top 88%',
        once: true,
        onEnter: () => {
            gsap.fromTo('.contact-card',
                { opacity: 0, x: -25 },
                { opacity: 1, x: 0, stagger: 0.1, duration: 0.5, ease: 'power3.out' }
            );
        },
    });

    /* ============================================
       6. IMAGE SCROLL REVEAL
       Event images scale and fade in
       ============================================ */
    document.querySelectorAll('.event-photo').forEach(img => {
        ScrollTrigger.create({
            trigger: img,
            start: 'top 92%',
            once: true,
            onEnter: () => {
                gsap.fromTo(img,
                    { opacity: 0, scale: 0.9, y: 20 },
                    { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'power3.out' }
                );
            },
        });
    });

    /* ============================================
       7. SKILL BAR FILL — ScrollTrigger Powered
       ============================================ */
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const width = bar.getAttribute('data-width');
        ScrollTrigger.create({
            trigger: bar,
            start: 'top 92%',
            once: true,
            onEnter: () => {
                gsap.to(bar, { width: width + '%', duration: 1.4, ease: 'power2.out' });
            },
        });
    });

    /* ============================================
       8. COUNTER ANIMATION — Hero Stats
       ============================================ */
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    statNumbers.forEach(el => {
        ScrollTrigger.create({
            trigger: el,
            start: 'top 90%',
            once: true,
            onEnter: () => {
                const target = parseInt(el.getAttribute('data-count'));
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: target,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: () => {
                        el.textContent = Math.round(obj.val) + (target >= 100 ? '+' : '');
                    },
                });
            },
        });
    });

    /* ============================================
       9. REFRESH SCROLLTRIGGER
       Ensures all positions are calculated correctly
       after Lenis and all DOM elements are ready
       ============================================ */
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 500);

    /* ============================================
       EXISTING FEATURES (All Preserved)
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

    lenis.on('scroll', ({ scroll }) => {
        if (scroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

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

    if (window.scrollY > 50) navbar.classList.add('scrolled');

    // === Mobile Nav Toggle ===
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

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
                    offset: -72,
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

    function nextSlideFunc() { goToSlide(currentSlide + 1); }
    function prevSlideFunc() { goToSlide(currentSlide - 1); }
    function startAutoPlay() { slideInterval = setInterval(nextSlideFunc, 4000); }
    function resetAutoPlay() { clearInterval(slideInterval); startAutoPlay(); }

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

            expandableCards.forEach(c => c.classList.remove('expanded'));

            if (!isCurrentlyExpanded) {
                card.classList.add('expanded');
                setTimeout(() => {
                    lenis.scrollTo(card, { offset: -100, duration: 0.8 });
                }, 300);
            }
        });
    });

    // Re-initialize Lucide icons
    lucide.createIcons();
});
