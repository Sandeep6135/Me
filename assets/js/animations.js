/* ============================================================
   ANIMATIONS — Loader, Particles, GSAP Scroll Animations,
   Magnetic Buttons, Rotating Words, Tilt, Parallax, Spotlight
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // ── Register GSAP plugins ──
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  }

  // ==================== LOADER — CINEMATIC SEQUENCE ====================
  var loader = qs('#loader');
  var loaderBar = qs('#loaderBar');
  var loaderCounter = qs('#loaderCounter');
  var loaderBlinds = qs('#loaderBlinds');

  if (loader && loaderBar && loaderCounter && loaderBlinds) {
    var counterObj = { val: 0 };
    var loaderTl = gsap.timeline();

    loaderTl.to(counterObj, {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: function () {
        var v = Math.round(counterObj.val);
        loaderCounter.textContent = v;
        loaderBar.style.width = v + '%';
      },
      onComplete: function () {
        var blinds = loaderBlinds.querySelectorAll('.loader-blind');
        gsap.to(blinds, {
          scaleY: 0,
          duration: 0.6,
          stagger: { each: 0.05, from: 'center' },
          ease: 'power3.inOut',
        });

        gsap.to('.loader-center', {
          scale: 1.2,
          opacity: 0,
          filter: 'blur(10px)',
          duration: 0.5,
          ease: 'power3.in'
        });

        gsap.to(loader, {
          opacity: 0,
          duration: 0.6,
          delay: 0.5,
          ease: 'power2.inOut',
          onComplete: function () {
            loader.classList.add('hidden');
            initAnimations();
          }
        });
      }
    });
  } else {
    // No loader found — initialise animations immediately
    initAnimations();
  }

  // ==================== MAGNETIC BUTTONS ====================
  qsa('.magnetic-btn').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = 'translate(' + (x * 0.3) + 'px, ' + (y * 0.3) + 'px)';
      var span = btn.querySelector('span');
      if (span) span.style.transform = 'translate(' + (x * 0.1) + 'px, ' + (y * 0.1) + 'px)';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.transform = '';
      var span = btn.querySelector('span');
      if (span) span.style.transform = '';
    });
  });

  // ==================== PARTICLE CANVAS ====================
  var heroCanvas = qs('#heroCanvas');
  var heroCtx = heroCanvas ? heroCanvas.getContext('2d') : null;
  var particles = [];
  var particleAnimationId = null;

  function resizeParticleCanvas() {
    if (!heroCanvas) return;
    heroCanvas.width = window.innerWidth;
    heroCanvas.height = window.innerHeight;
  }

  if (heroCanvas) {
    resizeParticleCanvas();
    window.addEventListener('resize', resizeParticleCanvas);
  }

  function Particle() { this.reset(); }
  Particle.prototype.reset = function () {
    if (!heroCanvas) return;
    this.x = Math.random() * heroCanvas.width;
    this.y = Math.random() * heroCanvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = this.getRandomColor();
  };
  Particle.prototype.getRandomColor = function () {
    var colors = ['124, 58, 237', '6, 182, 212', '244, 63, 94', '236, 72, 153', '245, 158, 11', '16, 185, 129'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  Particle.prototype.update = function () {
    if (!heroCanvas) return;
    this.x += this.speedX;
    this.y += this.speedY;
    var dx = mouseX - this.x;
    var dy = mouseY - this.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150) {
      var force = (150 - dist) / 150;
      this.x -= dx * force * 0.01;
      this.y -= dy * force * 0.01;
    }
    if (this.x < 0) this.x = heroCanvas.width;
    if (this.x > heroCanvas.width) this.x = 0;
    if (this.y < 0) this.y = heroCanvas.height;
    if (this.y > heroCanvas.height) this.y = 0;
  };
  Particle.prototype.draw = function () {
    if (!heroCtx) return;
    heroCtx.beginPath();
    heroCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    heroCtx.fillStyle = 'rgba(' + this.color + ', ' + this.opacity + ')';
    heroCtx.fill();
  };

  function initParticles() {
    if (!heroCanvas) return;
    var count = isMobile
      ? Math.min(30, Math.floor(window.innerWidth * 0.05))
      : Math.min(150, Math.floor(window.innerWidth * 0.1));
    particles = [];
    for (var i = 0; i < count; i++) particles.push(new Particle());
  }

  function drawConnections() {
    if (isMobile || !heroCtx) return;
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          heroCtx.beginPath();
          heroCtx.moveTo(particles[i].x, particles[i].y);
          heroCtx.lineTo(particles[j].x, particles[j].y);
          heroCtx.strokeStyle = 'rgba(124, 58, 237, ' + (0.08 * (1 - dist / 120)) + ')';
          heroCtx.lineWidth = 0.5;
          heroCtx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    if (!heroCtx || !heroCanvas) return;
    heroCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
    particles.forEach(function (p) { p.update(); p.draw(); });
    drawConnections();
    particleAnimationId = requestAnimationFrame(animateParticles);
  }

  if (heroCanvas) {
    initParticles();
    animateParticles();
  }

  // ── Pause particles when hero is offscreen ──
  var heroSection = qs('#hero');
  if (heroSection) {
    var heroObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (!particleAnimationId) animateParticles();
        } else {
          cancelAnimationFrame(particleAnimationId);
          particleAnimationId = null;
        }
      });
    }, { threshold: 0 });
    heroObserver.observe(heroSection);
  }

  // ==================== GSAP SCROLL ANIMATIONS ====================
  function initAnimations() {
    if (typeof gsap === 'undefined') return;

    // ── Split text ──
    qsa('[data-split]').forEach(function (el) {
      splitTextIntoChars(el);
    });

    // ── CINEMATIC HERO ENTRANCE ──
    // Register premium easing curves
    if (typeof CustomEase !== 'undefined') {
      try {
        CustomEase.create('cinematic', 'M0,0 C0.23,1 0.32,1 1,1');
        CustomEase.create('heroReveal', 'M0,0 C0.77,0 0.175,1 1,1');
      } catch(e) { /* already registered */ }
    }

    var heroTl = gsap.timeline({ delay: 0.3 });

    // Phase 1: Cinematic reveal line sweeps across the viewport
    heroTl.fromTo('.hero-reveal-line', {
      scaleX: 0, opacity: 1,
    }, {
      scaleX: 1,
      duration: 1, ease: 'power4.inOut',
    });

    // Phase 2: Breathing pause — let the line settle
    heroTl.to({}, { duration: 0.15 });

    // Phase 3: Ambient mesh fades in
    heroTl.fromTo('.hero-mesh', {
      opacity: 0, scale: 0.8,
    }, {
      opacity: 1, scale: 1,
      duration: 1.5, stagger: 0.2, ease: 'power2.out',
    }, '-=0.1');

    // Phase 4: Tag appears with blur-to-sharp
    heroTl.fromTo('.hero-tag', {
      opacity: 0, y: 20, filter: 'blur(10px)',
    }, {
      opacity: 1, y: 0, filter: 'blur(0px)',
      duration: 1, ease: 'power4.out',
    }, '-=1.2');

    // Phase 5: Title lines — staggered mask reveal with blur-to-sharp
    heroTl.fromTo('.hero-line:nth-child(1) .hero-word', {
      y: '120%', opacity: 0, filter: 'blur(8px)', rotateX: -20,
    }, {
      y: '0%', opacity: 1, filter: 'blur(0px)', rotateX: 0,
      duration: 1.2, stagger: 0.08, ease: 'power4.out',
    }, '-=0.6');

    heroTl.fromTo('.hero-line:nth-child(2) .hero-word', {
      y: '120%', opacity: 0, filter: 'blur(8px)', rotateX: -20,
    }, {
      y: '0%', opacity: 1, filter: 'blur(0px)', rotateX: 0,
      duration: 1.2, stagger: 0.08, ease: 'power4.out',
    }, '-=0.8');

    heroTl.fromTo('.hero-line:nth-child(3) .hero-word', {
      y: '120%', opacity: 0, filter: 'blur(8px)', rotateX: -20,
    }, {
      y: '0%', opacity: 1, filter: 'blur(0px)', rotateX: 0,
      duration: 1.2, stagger: 0.08, ease: 'power4.out',
    }, '-=0.8');

    // Phase 6: Name character cascade — dramatic 3D reveal
    var heroChars = qsa('.hero-name .char');
    if (heroChars.length) {
      heroTl.fromTo(heroChars, {
        opacity: 0, y: 80, rotateX: -90, scale: 0.3,
        filter: 'blur(12px)',
      }, {
        opacity: 1, y: 0, rotateX: 0, scale: 1,
        filter: 'blur(0px)',
        duration: 1,
        stagger: { each: 0.04, from: 'start' },
        ease: 'back.out(1.7)',
      }, '-=1.2');
    }

    // Phase 7: Breathing pause — moment of stillness
    heroTl.to({}, { duration: 0.25 });

    // Phase 8: Subtitle — gentle blur-to-sharp
    heroTl.fromTo('.hero-subtitle', {
      opacity: 0, y: 30, filter: 'blur(6px)',
    }, {
      opacity: 1, y: 0, filter: 'blur(0px)',
      duration: 0.9, ease: 'power3.out',
    });

    // Phase 9: CTA buttons — staggered entrance
    heroTl.set('.hero-actions', { opacity: 1, y: 0 });

    heroTl.fromTo('.hero-actions .btn-primary', {
      opacity: 0, y: 25, scale: 0.9,
    }, {
      opacity: 1, y: 0, scale: 1,
      duration: 0.7, ease: 'back.out(1.7)',
    }, '-=0.3');

    heroTl.fromTo('.hero-actions .btn-outline', {
      opacity: 0, y: 25, scale: 0.9,
    }, {
      opacity: 1, y: 0, scale: 1,
      duration: 0.7, ease: 'back.out(1.7)',
    }, '-=0.5');

    // Phase 10: Ambient grid lines rise from top
    heroTl.fromTo('.grid-line', {
      scaleY: 0, transformOrigin: 'top center',
    }, {
      scaleY: 1, duration: 1.5,
      stagger: 0.1, ease: 'power3.out',
    }, '-=1.2');

    // Phase 11: Scroll cue fades in
    heroTl.fromTo('.hero-scroll-cue', {
      opacity: 0, y: 15,
    }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
    }, '-=0.5');

    // Phase 12: Reveal line dissolves gracefully
    heroTl.to('.hero-reveal-line', {
      opacity: 0, scaleY: 0,
      duration: 0.6, ease: 'power2.out',
    }, '-=0.8');

    // ── HERO PARALLAX ON SCROLL — depth layers at different speeds ──
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      // Content fades, scales, and blurs as user scrolls down
      gsap.to('.hero-content', {
        y: -120, opacity: 0, scale: 0.95, filter: 'blur(10px)',
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom 60%',
          scrub: 1.5,
        }
      });

      // Orbs at different parallax depths
      gsap.to('.orb-1', {
        y: -180, x: 40,
        ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 2 }
      });

      gsap.to('.orb-2', {
        y: -120, x: -30,
        ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 2.5 }
      });

      gsap.to('.orb-3', {
        y: -200,
        ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 3 }
      });

      // Floating shapes parallax
      gsap.to('.floating-shapes', {
        y: -150,
        ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 2 }
      });

      // Grid lines fade on scroll
      gsap.to('.hero-grid-lines', {
        y: -80, opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom 70%', scrub: 1 }
      });

      // Ambient mesh deeper parallax
      gsap.to('.hero-ambient', {
        y: -100,
        ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 3 }
      });
    }

    // ── SECTION HEADER REVEAL ──
    qsa('.section-header[data-animation="reveal"]').forEach(function (header) {
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
          onEnter: function () { header.classList.add('in-view'); },
        }
      });

      var number = header.querySelector('.section-number');
      var lines = header.querySelectorAll('.title-line span');

      if (number) {
        tl.fromTo(number, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' });
      }

      tl.fromTo(lines, { y: '110%', rotateX: -15, opacity: 0 }, {
        y: '0%', rotateX: 0, opacity: 1,
        duration: 1, stagger: 0.12, ease: 'power4.out',
      }, '-=0.4');
    });

    // ── FADE-UP ELEMENTS ──
    qsa('[data-animation="fade-up"]').forEach(function (el) {
      gsap.fromTo(el, {
        opacity: 0, y: 50, scale: 0.97,
      }, {
        opacity: 1, y: 0, scale: 1,
        duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      });
    });

    // ── STAT COUNTERS ──
    qsa('.stat-number').forEach(function (stat) {
      var target = parseInt(stat.getAttribute('data-count'));
      var counter = { value: 0 };
      gsap.to(counter, {
        value: target, duration: 2.5, ease: 'power2.out',
        scrollTrigger: { trigger: stat, start: 'top 85%', toggleActions: 'play none none none' },
        onUpdate: function () { stat.textContent = Math.round(counter.value); }
      });
    });

    // ── SKILL BARS ──
    qsa('.skill-bar-fill').forEach(function (bar) {
      var width = bar.getAttribute('data-width');
      gsap.to(bar, {
        width: width + '%', duration: 1.8, ease: 'power3.out',
        scrollTrigger: { trigger: bar, start: 'top 90%', toggleActions: 'play none none none' }
      });
    });

    // ── SKILL CATEGORIES — staggered ──
    gsap.utils.toArray('.skill-category').forEach(function (cat, i) {
      gsap.fromTo(cat, {
        opacity: 0, y: 60, rotateX: -8, scale: 0.95,
      }, {
        opacity: 1, y: 0, rotateX: 0, scale: 1,
        duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: cat, start: 'top 88%', toggleActions: 'play none none none' },
        delay: i * 0.1
      });
    });

    // ── SKILL TAGS ──
    qsa('.skill-category').forEach(function (cat) {
      var tags = cat.querySelectorAll('.skill-tag');
      gsap.fromTo(tags, {
        opacity: 0, scale: 0.6, y: 20,
      }, {
        opacity: 1, scale: 1, y: 0,
        duration: 0.5, stagger: 0.04,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: cat, start: 'top 80%', toggleActions: 'play none none none' }
      });
    });

    // ── TIMELINE PROGRESS ──
    gsap.to('.timeline-line-progress', {
      height: '100%', ease: 'none',
      scrollTrigger: { trigger: '.timeline', start: 'top 80%', end: 'bottom 20%', scrub: 1 }
    });

    // ── TIMELINE ITEMS ──
    gsap.utils.toArray('.timeline-item').forEach(function (item, i) {
      gsap.fromTo(item, {
        opacity: 0, x: -40, rotateY: 8,
      }, {
        opacity: 1, x: 0, rotateY: 0,
        duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none none' },
        delay: i * 0.12
      });
    });

    // ── BIG TEXT — scrub parallax ──
    qsa('.big-text-track').forEach(function (track) {
      var direction = track.classList.contains('big-text-reverse') ? '10%' : '-15%';
      gsap.to(track, {
        x: direction, ease: 'none',
        scrollTrigger: {
          trigger: '.big-text-section',
          start: 'top bottom', end: 'bottom top', scrub: 1.2,
        }
      });
    });

    // ── PROJECT CARDS ──
    gsap.utils.toArray('.project-card').forEach(function (card, i) {
      gsap.fromTo(card, {
        opacity: 0, y: 80, scale: 0.9, rotateX: -5,
      }, {
        opacity: 1, y: 0, scale: 1, rotateX: 0,
        duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
        delay: i * 0.1
      });
    });

    // ── TESTIMONIAL CARDS ──
    gsap.utils.toArray('.testimonial-card').forEach(function (card, i) {
      gsap.fromTo(card, {
        opacity: 0, y: 60, rotateY: -8, scale: 0.92,
      }, {
        opacity: 1, y: 0, rotateY: 0, scale: 1,
        duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
        delay: i * 0.15
      });
    });

    // ── CONTACT ITEMS ──
    gsap.utils.toArray('.contact-item').forEach(function (item, i) {
      gsap.fromTo(item, {
        opacity: 0, x: -40, scale: 0.95,
      }, {
        opacity: 1, x: 0, scale: 1,
        duration: 0.8, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none none' },
        delay: i * 0.1
      });
    });

    // ── SOCIAL LINKS ──
    gsap.utils.toArray('.social-link').forEach(function (link, i) {
      gsap.fromTo(link, {
        opacity: 0, y: 25, scale: 0.3, rotation: -20,
      }, {
        opacity: 1, y: 0, scale: 1, rotation: 0,
        duration: 0.6, ease: 'back.out(3)',
        scrollTrigger: { trigger: link.parentElement, start: 'top 90%', toggleActions: 'play none none none' },
        delay: i * 0.1
      });
    });

    // ── FORM FIELDS ──
    gsap.utils.toArray('.form-field').forEach(function (field, i) {
      gsap.fromTo(field, {
        opacity: 0, y: 30, x: 20,
      }, {
        opacity: 1, y: 0, x: 0,
        duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: field, start: 'top 92%', toggleActions: 'play none none none' },
        delay: i * 0.08
      });
    });

    // ── FOOTER ──
    gsap.fromTo('.footer-content', {
      opacity: 0, y: 40,
    }, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.footer', start: 'top 90%', toggleActions: 'play none none none' }
    });

    gsap.fromTo('.footer-bottom', {
      opacity: 0,
    }, {
      opacity: 1, duration: 0.8,
      scrollTrigger: { trigger: '.footer-bottom', start: 'top 95%', toggleActions: 'play none none none' }
    });

    ScrollTrigger.refresh();
  }

  // ==================== PROJECT CARDS — MOUSE SPOTLIGHT ====================
  if (!isTouchDevice) {
    qsa('.project-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
      });
    });

    qsa('.skill-category').forEach(function (cat) {
      cat.addEventListener('mousemove', function (e) {
        var rect = cat.getBoundingClientRect();
        cat.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
        cat.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
      });
    });
  }

  // ==================== ROTATING WORDS ====================
  var rotatingWords = qsa('.rotating-word');
  var currentWordIndex = 0;
  var lastWordAnim = -1;

  var wordAnimations = [
    { exit: { y: -40, opacity: 0, scale: 1.3, rotateZ: 4, filter: 'blur(8px)', duration: 0.35 },
      enter: { from: { y: 50, opacity: 0, scale: 0.6, rotateZ: -3, filter: 'blur(8px)' },
               to: { y: 0, opacity: 1, scale: 1, rotateZ: 0, filter: 'blur(0px)', duration: 0.55 } } },
    { exit: { rotateX: 90, opacity: 0, y: -20, duration: 0.4 },
      enter: { from: { rotateX: -90, opacity: 0, y: 20 },
               to: { rotateX: 0, opacity: 1, y: 0, duration: 0.5 } } },
    { exit: { y: 80, opacity: 0, scaleY: 0.3, duration: 0.35 },
      enter: { from: { y: -80, opacity: 0, scaleY: 2.5 },
               to: { y: 0, opacity: 1, scaleY: 1, duration: 0.5 } } },
    { exit: { scale: 3, opacity: 0, filter: 'blur(12px)', duration: 0.4 },
      enter: { from: { scale: 0, opacity: 0, filter: 'blur(12px)' },
               to: { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.55 } } },
    { exit: { x: -120, opacity: 0, skewX: -25, scaleX: 0.5, duration: 0.4 },
      enter: { from: { x: 120, opacity: 0, skewX: 25, scaleX: 0.5 },
               to: { x: 0, opacity: 1, skewX: 0, scaleX: 1, duration: 0.55 } } },
    { exit: { opacity: 0, scale: 0.8, rotateY: 90, duration: 0.35 },
      enter: { from: { opacity: 0, scale: 0.8, rotateY: -90 },
               to: { opacity: 1, scale: 1, rotateY: 0, duration: 0.55 } } },
    { exit: { y: -60, x: 30, opacity: 0, rotateZ: 8, scale: 0.7, duration: 0.35 },
      enter: { from: { y: 60, x: -30, opacity: 0, rotateZ: -8, scale: 0.7 },
               to: { y: 0, x: 0, opacity: 1, rotateZ: 0, scale: 1, duration: 0.55 } } },
    { exit: { scaleX: 0, opacity: 0, filter: 'blur(4px)', duration: 0.3 },
      enter: { from: { scaleX: 0, opacity: 0, filter: 'blur(4px)' },
               to: { scaleX: 1, opacity: 1, filter: 'blur(0px)', duration: 0.55 } } }
  ];

  function getRandomWordAnim() {
    var idx;
    do { idx = Math.floor(Math.random() * wordAnimations.length); } while (idx === lastWordAnim);
    lastWordAnim = idx;
    return wordAnimations[idx];
  }

  function rotateWordsFn() {
    if (!rotatingWords.length) return;
    var current = rotatingWords[currentWordIndex];
    currentWordIndex = (currentWordIndex + 1) % rotatingWords.length;
    var next = rotatingWords[currentWordIndex];
    var anim = getRandomWordAnim();

    gsap.to(current, {
      ...anim.exit,
      ease: 'power3.in',
      onComplete: function () {
        current.classList.remove('active');
        current.style.cssText = '';
        next.classList.add('active');
        gsap.fromTo(next, anim.enter.from, {
          ...anim.enter.to,
          ease: 'back.out(1.4)',
        });
      }
    });
  }

  if (rotatingWords.length) {
    setInterval(rotateWordsFn, 2500);
  }

  // ==================== PROJECT FILTER ====================
  var filterBtns = qsa('.filter-btn');
  var projectCards = qsa('.project-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');

      projectCards.forEach(function (card, i) {
        var category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          gsap.fromTo(card, {
            opacity: 0, y: 40, scale: 0.9, rotateX: -5,
          }, {
            opacity: 1, y: 0, scale: 1, rotateX: 0,
            duration: 0.6, ease: 'power3.out', delay: i * 0.06,
          });
        } else {
          gsap.to(card, {
            opacity: 0, scale: 0.9, y: -20,
            duration: 0.3, ease: 'power3.in',
            onComplete: function () { card.classList.add('hidden'); },
          });
        }
      });
    });
  });

  // ==================== TILT EFFECT ON CARDS — 3D + LIGHTING SIMULATION ====================
  if (!isTouchDevice) {
    qsa('.project-card, .skill-category, .testimonial-card, .stat-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = (y - centerY) / 15;
        var rotateY = (centerX - x) / 15;

        // 3D tilt with enhanced scale
        card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-10px) scale(1.02)';

        // Lighting simulation via CSS custom properties
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
        card.style.setProperty('--mouse-x', '50%');
        card.style.setProperty('--mouse-y', '50%');
      });
    });
  }

  // ==================== PARALLAX FLOATING SHAPES ====================
  if (!isTouchDevice) {
    window.addEventListener('mousemove', function (e) {
      var shapes = qsa('.shape');
      var x = e.clientX / window.innerWidth;
      var y = e.clientY / window.innerHeight;
      shapes.forEach(function (shape, i) {
        var speed = (i + 1) * 15;
        shape.style.setProperty('--mx', ((x - 0.5) * speed) + 'px');
        shape.style.setProperty('--my', ((y - 0.5) * speed) + 'px');
      });
    });
  }

  // ==================== ORB MOUSE FOLLOW ====================
  if (!isTouchDevice) {
    document.addEventListener('mousemove', function (e) {
      var orbs = qsa('.orb');
      var x = e.clientX / window.innerWidth;
      var y = e.clientY / window.innerHeight;
      orbs.forEach(function (orb, i) {
        gsap.to(orb, {
          x: (x - 0.5) * (i + 1) * 20,
          y: (y - 0.5) * (i + 1) * 20,
          duration: 2, ease: 'power2.out'
        });
      });
    });
  }

  // ==================== SMOOTH REVEAL OBSERVER ====================
  var observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // ==================== RESIZE HANDLER ====================
  window.addEventListener('resize', function () {
    resizeParticleCanvas();
    initParticles();
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  });

  console.log('🎨 ERROR 404 Portfolio — Loaded');
});
