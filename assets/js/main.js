/* ============================================================
   ERROR 404 — CREATIVE PORTFOLIO
   JavaScript: Animations, Particles, Interactions
   ============================================================ */

// ==================== LOADER ====================
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loaderBar');
let loadProgress = 0;

const loadInterval = setInterval(() => {
  loadProgress += Math.random() * 15;
  if (loadProgress >= 100) {
    loadProgress = 100;
    clearInterval(loadInterval);
    setTimeout(() => {
      loader.classList.add('hidden');
      initAnimations();
    }, 600);
  }
  loaderBar.style.width = loadProgress + '%';
}, 100);

// ==================== CUSTOM CURSOR ====================
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursorRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateCursorRing);
}
animateCursorRing();

// Hover effects for interactive elements
const hoverables = document.querySelectorAll('a, button, .magnetic-btn, input, textarea');
hoverables.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorDot.classList.add('hovering');
    cursorRing.classList.add('hovering');
  });
  el.addEventListener('mouseleave', () => {
    cursorDot.classList.remove('hovering');
    cursorRing.classList.remove('hovering');
  });
});

// ==================== MAGNETIC BUTTONS ====================
const magneticBtns = document.querySelectorAll('.magnetic-btn');

magneticBtns.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    if (btn.querySelector('span')) {
      btn.querySelector('span').style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    }
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    if (btn.querySelector('span')) {
      btn.querySelector('span').style.transform = '';
    }
  });
});

// ==================== PARTICLE CANVAS ====================
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = this.getRandomColor();
  }

  getRandomColor() {
    const colors = [
      '124, 58, 237',   // Purple
      '6, 182, 212',    // Cyan
      '244, 63, 94',    // Rose
      '236, 72, 153',   // Pink
      '245, 158, 11',   // Amber
      '16, 185, 129',   // Emerald
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Mouse interaction
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150) {
      const force = (150 - dist) / 150;
      this.x -= dx * force * 0.01;
      this.y -= dy * force * 0.01;
    }

    // Wrap around
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
  }
}

// Create particles
function initParticles() {
  const count = Math.min(150, Math.floor(window.innerWidth * 0.1));
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}
initParticles();

// Draw connections
function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(124, 58, 237, ${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  drawConnections();
  animationId = requestAnimationFrame(animateParticles);
}
animateParticles();

// ==================== GSAP ANIMATIONS ====================
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function initAnimations() {
  // Hero entrance
  const heroTl = gsap.timeline({ delay: 0.3 });

  heroTl
    .to('.hero-tag', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .to('.hero-word', {
      y: 0,
      duration: 1,
      stagger: 0.12,
      ease: 'power4.out'
    }, '-=0.4')
    .to('.hero-subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5')
    .to('.hero-actions', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5');

  // Section title reveals
  document.querySelectorAll('.section-header[data-animation="reveal"]').forEach(header => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    const number = header.querySelector('.section-number');
    const lines = header.querySelectorAll('.title-line span');

    if (number) {
      tl.from(number, {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: 'power3.out'
      });
    }

    tl.from(lines, {
      y: '100%',
      duration: 0.8,
      stagger: 0.1,
      ease: 'power4.out'
    }, '-=0.3');
  });

  // Fade up animations
  document.querySelectorAll('[data-animation="fade-up"]').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Stat counter animation
  document.querySelectorAll('.stat-number').forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    const counter = { value: 0 };

    gsap.to(counter, {
      value: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: stat,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      onUpdate: () => {
        stat.textContent = Math.round(counter.value);
      }
    });
  });

  // Skill bars
  document.querySelectorAll('.skill-bar-fill').forEach(bar => {
    const width = bar.getAttribute('data-width');
    gsap.to(bar, {
      width: width + '%',
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: bar,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Timeline progress
  gsap.to('.timeline-line-progress', {
    height: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.timeline',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1
    }
  });

  // Big text parallax
  gsap.to('.big-text-track', {
    x: '-30%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.big-text-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  });

  // Project cards stagger
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 60,
      scale: 0.95,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      delay: (i % 3) * 0.1
    });
  });

  // Testimonial cards
  gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      rotateY: -5,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      delay: i * 0.15
    });
  });

  // Skill categories stagger
  gsap.utils.toArray('.skill-category').forEach((cat, i) => {
    gsap.from(cat, {
      opacity: 0,
      y: 40,
      scale: 0.97,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cat,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      delay: i * 0.1
    });
  });

  // Contact items slide in
  gsap.utils.toArray('.contact-item').forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      x: -30,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      delay: i * 0.1
    });
  });

  // Social links
  gsap.utils.toArray('.social-link').forEach((link, i) => {
    gsap.from(link, {
      opacity: 0,
      y: 20,
      scale: 0.5,
      duration: 0.5,
      ease: 'back.out(2)',
      scrollTrigger: {
        trigger: link.parentElement,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      delay: i * 0.08
    });
  });
}

// ==================== NAVIGATION ====================
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

// Scroll state
window.addEventListener('scroll', () => {
  // Nav background
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  // Back to top
  const backToTop = document.getElementById('backToTop');
  if (window.scrollY > 600) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  // Active nav link
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 200;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === current) {
      link.classList.add('active');
    }
  });
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 80 },
        duration: 1,
        ease: 'power3.inOut'
      });
    }
    // Close mobile menu
    mobileMenu.classList.remove('active');
    navHamburger.classList.remove('active');
  });
});

// Back to top
document.getElementById('backToTop').addEventListener('click', () => {
  gsap.to(window, {
    scrollTo: 0,
    duration: 1.2,
    ease: 'power3.inOut'
  });
});

// ==================== MOBILE MENU ====================
const navHamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('mobileMenu');

navHamburger.addEventListener('click', () => {
  navHamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// ==================== ROTATING WORDS ====================
const rotatingWords = document.querySelectorAll('.rotating-word');
let currentWordIndex = 0;

function rotateWords() {
  rotatingWords.forEach(word => word.classList.remove('active'));
  currentWordIndex = (currentWordIndex + 1) % rotatingWords.length;
  rotatingWords[currentWordIndex].classList.add('active');
}

setInterval(rotateWords, 2500);

// ==================== PROJECT FILTER ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        gsap.from(card, {
          opacity: 0,
          y: 30,
          scale: 0.95,
          duration: 0.5,
          ease: 'power3.out'
        });
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('.btn-submit');
  const originalText = btn.querySelector('span').textContent;

  btn.querySelector('span').textContent = 'Sending...';
  btn.style.pointerEvents = 'none';

  // Simulate send
  setTimeout(() => {
    btn.querySelector('span').textContent = 'Sent! ✓';
    btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';

    setTimeout(() => {
      btn.querySelector('span').textContent = originalText;
      btn.style.background = '';
      btn.style.pointerEvents = '';
      contactForm.reset();
    }, 2500);
  }, 1500);
});

// ==================== TILT EFFECT ON CARDS ====================
document.querySelectorAll('.project-card, .skill-category, .testimonial-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ==================== PARALLAX FLOATING SHAPES ====================
window.addEventListener('mousemove', (e) => {
  const shapes = document.querySelectorAll('.shape');
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  shapes.forEach((shape, i) => {
    const speed = (i + 1) * 15;
    const offsetX = (x - 0.5) * speed;
    const offsetY = (y - 0.5) * speed;
    shape.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });
});

// ==================== ORB MOUSE FOLLOW ====================
document.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.orb');
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  orbs.forEach((orb, i) => {
    const speed = (i + 1) * 20;
    gsap.to(orb, {
      x: (x - 0.5) * speed,
      y: (y - 0.5) * speed,
      duration: 2,
      ease: 'power2.out'
    });
  });
});

// ==================== SMOOTH REVEAL ON SCROLL ====================
// Add intersection observer for elements without GSAP
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// ==================== RESIZE HANDLER ====================
window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
  ScrollTrigger.refresh();
});

// ==================== PERFORMANCE: PAUSE PARTICLES WHEN NOT VISIBLE ====================
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (!animationId) animateParticles();
    } else {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  });
}, { threshold: 0 });

heroObserver.observe(document.getElementById('hero'));

// ==================== ABOUT IMAGE SLIDESHOW — CREATIVE TRANSITIONS ====================
const slideshow = document.getElementById('aboutSlideshow');
if (slideshow) {
  const slides = slideshow.querySelectorAll('.slide-img');
  const dots = slideshow.querySelectorAll('.slide-dot');
  const progressBar = document.getElementById('slideProgressBar');
  const fxOverlay = document.getElementById('slideFxOverlay');
  const fxLabel = document.getElementById('slideFxLabel');
  const glitchLayer1 = document.getElementById('glitchLayer1');
  const glitchLayer2 = document.getElementById('glitchLayer2');
  let currentSlide = 0;
  let slideInterval;
  const slideDuration = 4000;
  let slideStartTime;
  let progressRAF;
  let isTransitioning = false;

  // Transition effects pool
  const transitions = ['glitch', 'slice', 'clip', 'zoom', 'rgb', 'shutter', 'sliceH'];
  let lastTransition = '';

  function getRandomTransition() {
    let t;
    do {
      t = transitions[Math.floor(Math.random() * transitions.length)];
    } while (t === lastTransition);
    lastTransition = t;
    return t;
  }

  function showFxLabel(name) {
    const labels = {
      glitch: 'GLITCH',
      slice: 'SLICE',
      sliceH: 'H-SLICE',
      clip: 'MORPH',
      zoom: 'ZOOM BURST',
      rgb: 'RGB SPLIT',
      shutter: 'SHUTTER'
    };
    fxLabel.textContent = '✦ ' + (labels[name] || name.toUpperCase());
    fxLabel.classList.add('visible');
    setTimeout(() => fxLabel.classList.remove('visible'), 1200);
  }

  function cleanupSlide(el) {
    el.classList.remove('active', 'prev',
      'clip-enter', 'clip-exit',
      'zoom-enter', 'zoom-exit',
      'rgb-enter', 'rgb-exit',
      'shutter-enter', 'shutter-exit'
    );
    el.style.clipPath = '';
    el.style.transform = '';
    el.style.filter = '';
    el.style.opacity = '';
    el.style.zIndex = '';
  }

  function goToSlide(index) {
    if (isTransitioning || index === currentSlide) return;
    isTransitioning = true;

    const effect = getRandomTransition();
    showFxLabel(effect);

    const prevSlide = slides[currentSlide];
    const nextSlideEl = slides[index];

    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    dots[currentSlide].classList.add('active');

    switch (effect) {
      case 'glitch':
        transitionGlitch(prevSlide, nextSlideEl);
        break;
      case 'slice':
        transitionSlice(prevSlide, nextSlideEl, false);
        break;
      case 'sliceH':
        transitionSlice(prevSlide, nextSlideEl, true);
        break;
      case 'clip':
        transitionClip(prevSlide, nextSlideEl);
        break;
      case 'zoom':
        transitionZoom(prevSlide, nextSlideEl);
        break;
      case 'rgb':
        transitionRGB(prevSlide, nextSlideEl);
        break;
      case 'shutter':
        transitionShutter(prevSlide, nextSlideEl);
        break;
    }

    resetProgress();
  }

  // ---- GLITCH ----
  function transitionGlitch(prev, next) {
    const currentSrc = prev.src;
    glitchLayer1.style.backgroundImage = `url(${currentSrc})`;
    glitchLayer2.style.backgroundImage = `url(${currentSrc})`;

    slideshow.classList.add('slideshow-glitching');
    slideshow.classList.add('flash');

    let flickerCount = 0;
    const flickerInterval = setInterval(() => {
      flickerCount++;
      if (flickerCount % 2 === 0) {
        prev.style.opacity = '1';
        next.style.opacity = '0';
      } else {
        prev.style.opacity = '0';
        next.style.opacity = '1';
      }
      if (flickerCount > 6) {
        clearInterval(flickerInterval);
        cleanupSlide(prev);
        next.classList.add('active');
        next.style.opacity = '';
        prev.style.opacity = '';
      }
    }, 60);

    setTimeout(() => {
      slideshow.classList.remove('slideshow-glitching', 'flash');
      isTransitioning = false;
    }, 800);
  }

  // ---- SLICE ----
  function transitionSlice(prev, next, horizontal) {
    fxOverlay.className = 'slide-fx-overlay' + (horizontal ? ' horizontal' : '');

    fxOverlay.querySelectorAll('.fx-slice').forEach(s => {
      s.style.animation = 'none';
      s.offsetHeight;
      s.style.animation = '';
    });

    fxOverlay.classList.add('active');

    setTimeout(() => {
      cleanupSlide(prev);
      next.classList.add('active');
    }, 320);

    setTimeout(() => {
      fxOverlay.classList.remove('active', 'horizontal');
      isTransitioning = false;
    }, 900);
  }

  // ---- CLIP PATH MORPH ----
  function transitionClip(prev, next) {
    const origins = ['50% 50%', '0% 0%', '100% 0%', '0% 100%', '100% 100%'];
    const origin = origins[Math.floor(Math.random() * origins.length)];
    const [ox, oy] = origin.split(' ');

    next.style.clipPath = `circle(0% at ${ox} ${oy})`;
    next.classList.add('active');
    next.style.opacity = '1';
    next.style.zIndex = '4';

    gsap.to(next, {
      clipPath: `circle(150% at ${ox} ${oy})`,
      duration: 0.9,
      ease: 'power3.inOut',
      onComplete: () => {
        cleanupSlide(prev);
        next.style.zIndex = '';
        next.style.clipPath = '';
        isTransitioning = false;
      }
    });

    slideshow.classList.add('flash');
    setTimeout(() => slideshow.classList.remove('flash'), 300);
  }

  // ---- ZOOM BURST ----
  function transitionZoom(prev, next) {
    prev.classList.add('prev');
    prev.classList.add('zoom-exit');

    setTimeout(() => {
      next.classList.add('active', 'zoom-enter');
    }, 150);

    slideshow.classList.add('flash');
    setTimeout(() => slideshow.classList.remove('flash'), 300);

    setTimeout(() => {
      cleanupSlide(prev);
      next.classList.remove('zoom-enter');
      isTransitioning = false;
    }, 1000);
  }

  // ---- RGB SPLIT ----
  function transitionRGB(prev, next) {
    prev.classList.add('prev', 'rgb-exit');

    setTimeout(() => {
      next.classList.add('active', 'rgb-enter');
    }, 200);

    setTimeout(() => {
      cleanupSlide(prev);
      next.classList.remove('rgb-enter');
      isTransitioning = false;
    }, 1000);
  }

  // ---- SHUTTER ----
  function transitionShutter(prev, next) {
    prev.classList.add('prev', 'shutter-exit');

    setTimeout(() => {
      next.classList.add('active', 'shutter-enter');
    }, 250);

    slideshow.classList.add('flash');
    setTimeout(() => slideshow.classList.remove('flash'), 300);

    setTimeout(() => {
      cleanupSlide(prev);
      next.classList.remove('shutter-enter');
      isTransitioning = false;
    }, 1000);
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }

  function resetProgress() {
    slideStartTime = performance.now();
    if (progressRAF) cancelAnimationFrame(progressRAF);
    animateProgress();
  }

  function animateProgress() {
    const elapsed = performance.now() - slideStartTime;
    const progress = Math.min((elapsed / slideDuration) * 100, 100);
    progressBar.style.width = progress + '%';
    if (progress < 100) {
      progressRAF = requestAnimationFrame(animateProgress);
    }
  }

  // Click on dots
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      if (i === currentSlide || isTransitioning) return;
      clearInterval(slideInterval);
      goToSlide(i);
      slideInterval = setInterval(nextSlide, slideDuration);
    });
  });

  // Start slideshow
  resetProgress();
  slideInterval = setInterval(nextSlide, slideDuration);

  // Pause on hover
  slideshow.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
    if (progressRAF) cancelAnimationFrame(progressRAF);
  });

  slideshow.addEventListener('mouseleave', () => {
    resetProgress();
    slideInterval = setInterval(nextSlide, slideDuration);
  });
}

console.log('🎨 ERROR 404 Portfolio — Loaded');
