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
  var loaderDismissed = false;

  // Failsafe: dismiss loader after max 3 s no matter what (GSAP CDN fail, etc.)
  function dismissLoader() {
    if (loaderDismissed) return;
    loaderDismissed = true;
    if (loader) {
      loader.style.transition = 'opacity 0.4s ease';
      loader.style.opacity = '0';
      setTimeout(function () {
        loader.classList.add('hidden');
      }, 400);
    }
    initAnimations();
  }

  var loaderFailsafe = setTimeout(dismissLoader, 3000);

  if (loader && loaderBar && loaderCounter && loaderBlinds && typeof gsap !== 'undefined') {
    try {
      var counterObj = { val: 0 };
      var loaderTl = gsap.timeline();

      loaderTl.to(counterObj, {
        val: 100,
        duration: 0.5,
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
            duration: 0.3,
            stagger: { each: 0.015, from: 'center' },
            ease: 'power3.inOut',
          });

          gsap.to('.loader-center', {
            scale: 1.05,
            opacity: 0,
            duration: 0.2,
            ease: 'power3.in'
          });

          gsap.to(loader, {
            opacity: 0,
            duration: 0.3,
            delay: 0.2,
            ease: 'power2.inOut',
            onComplete: function () {
              clearTimeout(loaderFailsafe);
              if (loaderDismissed) return;
              loaderDismissed = true;
              loader.classList.add('hidden');
              initAnimations();
            }
          });
        }
      });
    } catch (e) {
      // GSAP failed — dismiss immediately
      clearTimeout(loaderFailsafe);
      dismissLoader();
    }
  } else {
    // No loader or no GSAP — dismiss immediately
    clearTimeout(loaderFailsafe);
    dismissLoader();
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

  // ==================== PARTICLE CANVAS — REMOVED ====================
  // The old O(n²) particle + connections system was the #1 performance killer.
  // Replaced with pure CSS orbs + mesh in the hero section — zero JS overhead.

  // ==================== GSAP SCROLL ANIMATIONS ====================
  function initAnimations() {
    if (typeof gsap === 'undefined') return;

    // ── Split text ──
    qsa('[data-split]').forEach(function (el) {
      splitTextIntoChars(el);
    });

    // ── CINEMATIC HERO ENTRANCE — streamlined for speed ──
    var heroTl = gsap.timeline({ delay: 0.15 });

    // Phase 1: Tag + mesh fade in together
    heroTl.fromTo('.hero-mesh', {
      opacity: 0, scale: 0.85,
    }, {
      opacity: 1, scale: 1,
      duration: 0.8, stagger: 0.1, ease: 'power2.out',
    });

    heroTl.fromTo('.hero-tag', {
      opacity: 0, y: 15,
    }, {
      opacity: 1, y: 0,
      duration: 0.5, ease: 'power3.out',
    }, '-=0.6');

    // Phase 2: All title lines reveal quickly
    heroTl.fromTo('.hero-line .hero-word', {
      y: '100%', opacity: 0,
    }, {
      y: '0%', opacity: 1,
      duration: 0.7, stagger: 0.06, ease: 'power4.out',
    }, '-=0.3');

    // Phase 3: Name characters cascade
    var heroChars = qsa('.hero-name .char');
    if (heroChars.length) {
      heroTl.fromTo(heroChars, {
        opacity: 0, y: 40, scale: 0.5,
      }, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.6,
        stagger: { each: 0.03, from: 'start' },
        ease: 'back.out(1.5)',
      }, '-=0.5');
    }

    // Phase 4: Subtitle + CTAs together
    heroTl.fromTo('.hero-subtitle', {
      opacity: 0, y: 20,
    }, {
      opacity: 1, y: 0,
      duration: 0.5, ease: 'power3.out',
    }, '-=0.2');

    heroTl.set('.hero-actions', { opacity: 1, y: 0 });
    heroTl.fromTo('.hero-actions a', {
      opacity: 0, y: 20, scale: 0.95,
    }, {
      opacity: 1, y: 0, scale: 1,
      duration: 0.4, stagger: 0.08, ease: 'power3.out',
    }, '-=0.3');

    // Phase 5: Grid lines + scroll cue — ambient finishers
    heroTl.fromTo('.grid-line', {
      scaleY: 0, transformOrigin: 'top center',
    }, {
      scaleY: 1, duration: 0.8,
      stagger: 0.06, ease: 'power2.out',
    }, '-=0.4');

    heroTl.fromTo('.hero-scroll-cue', {
      opacity: 0, y: 10,
    }, {
      opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
    }, '-=0.3');

    // ── HERO PARALLAX ON SCROLL — lightweight ──
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      // Content fades as user scrolls down
      gsap.to('.hero-content', {
        y: -80, opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom 60%',
          scrub: 1.5,
        }
      });

      // Orbs parallax (CSS-only orbs, just shift via GSAP scrub)
      gsap.to('.orb-1', {
        y: -100,
        ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 2 }
      });

      gsap.to('.orb-2', {
        y: -70,
        ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 2.5 }
      });

      // Grid lines fade on scroll
      gsap.to('.hero-grid-lines', {
        y: -50, opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom 70%', scrub: 1 }
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
    { exit: { y: -40, opacity: 0, duration: 0.3 },
      enter: { from: { y: 40, opacity: 0 },
               to: { y: 0, opacity: 1, duration: 0.45 } } },
    { exit: { rotateX: 90, opacity: 0, duration: 0.3 },
      enter: { from: { rotateX: -90, opacity: 0 },
               to: { rotateX: 0, opacity: 1, duration: 0.45 } } },
    { exit: { scale: 2, opacity: 0, duration: 0.3 },
      enter: { from: { scale: 0, opacity: 0 },
               to: { scale: 1, opacity: 1, duration: 0.45 } } },
    { exit: { x: -80, opacity: 0, skewX: -15, duration: 0.3 },
      enter: { from: { x: 80, opacity: 0, skewX: 15 },
               to: { x: 0, opacity: 1, skewX: 0, duration: 0.45 } } }
  ];

  function getRandomWordAnim() {
    var idx;
    do { idx = Math.floor(Math.random() * wordAnimations.length); } while (idx === lastWordAnim);
    lastWordAnim = idx;
    return wordAnimations[idx];
  }

  function rotateWordsFn() {
    if (!rotatingWords.length) return;

    // Kill any in-progress word tweens to prevent overlap
    rotatingWords.forEach(function (w) { gsap.killTweensOf(w); });

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
    var wordInterval = null;

    function startWordRotation() {
      if (wordInterval) return;
      wordInterval = setInterval(rotateWordsFn, 2500);
    }

    function stopWordRotation() {
      if (wordInterval) {
        clearInterval(wordInterval);
        wordInterval = null;
      }
    }

    // Reset words to a clean state when tab becomes visible again
    function resetWords() {
      rotatingWords.forEach(function (w) {
        gsap.killTweensOf(w);
        w.classList.remove('active');
        w.style.cssText = '';
      });
      // Activate the current word cleanly
      rotatingWords[currentWordIndex].classList.add('active');
      rotatingWords[currentWordIndex].style.opacity = '1';
      rotatingWords[currentWordIndex].style.transform = 'translateY(0) rotateX(0deg)';
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        stopWordRotation();
      } else {
        resetWords();
        startWordRotation();
      }
    });

    startWordRotation();
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

  // ==================== TILT EFFECT ON CARDS — rAF-throttled ====================
  if (!isTouchDevice) {
    qsa('.project-card, .skill-category, .testimonial-card, .stat-card').forEach(function (card) {
      var tiltRaf = null;
      card.addEventListener('mousemove', function (e) {
        if (tiltRaf) return;
        tiltRaf = requestAnimationFrame(function () {
          var rect = card.getBoundingClientRect();
          var x = e.clientX - rect.left;
          var y = e.clientY - rect.top;
          var centerX = rect.width / 2;
          var centerY = rect.height / 2;
          var rotX = (y - centerY) / 20;
          var rotY = (centerX - x) / 20;

          card.style.transform = 'perspective(1000px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) translateY(-8px) scale(1.01)';
          card.style.setProperty('--mouse-x', x + 'px');
          card.style.setProperty('--mouse-y', y + 'px');
          tiltRaf = null;
        });
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
        card.style.setProperty('--mouse-x', '50%');
        card.style.setProperty('--mouse-y', '50%');
      });
    });
  }

  // ==================== PARALLAX FLOATING SHAPES — REMOVED ====================
  // Was running style updates on every mousemove — replaced with pure CSS animation.

  // ==================== ORB MOUSE FOLLOW — REMOVED ====================
  // Was firing gsap.to() on every mousemove for 3 orbs — very expensive.
  // Orbs now drift via lightweight CSS @keyframes animation only.

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
  var resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }, 200);
  });

  console.log('🎨 ERROR 404 Portfolio — Loaded');
});
