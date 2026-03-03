/* ============================================================
   ERROR 404 — CREATIVE PORTFOLIO
   JavaScript: Animations, Particles, Interactions
   ============================================================ */

// ==================== LOADER — CINEMATIC SEQUENCE ====================
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loaderBar');
const loaderCounter = document.getElementById('loaderCounter');
const loaderBlinds = document.getElementById('loaderBlinds');
let loadProgress = 0;

// Animate counter 0 → 100 with eased speed
const counterObj = { val: 0 };
const loaderTl = gsap.timeline();

loaderTl.to(counterObj, {
  val: 100,
  duration: 2.2,
  ease: 'power2.inOut',
  onUpdate: () => {
    const v = Math.round(counterObj.val);
    loaderCounter.textContent = v;
    loaderBar.style.width = v + '%';
  },
  onComplete: () => {
    // Blinds sweep open staggered
    const blinds = loaderBlinds.querySelectorAll('.loader-blind');
    gsap.to(blinds, {
      scaleY: 0,
      duration: 0.6,
      stagger: { each: 0.05, from: 'center' },
      ease: 'power3.inOut',
    });

    // Explosive exit of the entire loader
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
      onComplete: () => {
        loader.classList.add('hidden');
        initAnimations();
      }
    });
  }
});

// ==================== CUSTOM CURSOR — AURORA RING ====================
const cursorCanvas = document.getElementById('cursorCanvas');
const cursorCtx = cursorCanvas.getContext('2d');
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;

function resizeCursorCanvas() {
  cursorCanvas.width = window.innerWidth;
  cursorCanvas.height = window.innerHeight;
}
resizeCursorCanvas();
window.addEventListener('resize', resizeCursorCanvas);

const cursor = {
  x: window.innerWidth / 2, y: window.innerHeight / 2,
  vx: 0, vy: 0,
  scale: 1, targetScale: 1,
  rotation: 0,
  baseRadius: 16, radius: 16,
  dotX: window.innerWidth / 2, dotY: window.innerHeight / 2,
};

const SPRING = 0.12, DAMPING = 0.72, DOT_EASE = 0.25;
let isHovering = false, isClicking = false, hoverTarget = null, clickFlash = 0, cursorHue = 260;

const SPARKLE_COUNT = 6;
const sparkles = [];
for (let i = 0; i < SPARKLE_COUNT; i++) {
  sparkles.push({
    angle: (Math.PI * 2 / SPARKLE_COUNT) * i,
    speed: 0.008 + Math.random() * 0.012,
    distance: 0, targetDistance: 0,
    size: 1 + Math.random() * 1.5,
    hueOffset: i * 40, opacity: 0,
  });
}

document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
document.addEventListener('mousedown', () => { isClicking = true; clickFlash = 1; cursor.targetScale = 0.6; });
document.addEventListener('mouseup', () => { isClicking = false; cursor.targetScale = isHovering ? 1.8 : 1; });

function setupCursorHovers() {
  document.querySelectorAll('a, button, .magnetic-btn, .project-card, .filter-btn, .social-link, .skill-category, .contact-item').forEach(el => {
    el.addEventListener('mouseenter', () => { isHovering = true; hoverTarget = el; cursor.targetScale = 1.8; });
    el.addEventListener('mouseleave', () => { isHovering = false; hoverTarget = null; cursor.targetScale = 1; });
  });
}
setupCursorHovers();

function drawCursor() {
  cursorCtx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
  const dx = mouseX - cursor.x, dy = mouseY - cursor.y;
  cursor.vx += dx * SPRING; cursor.vy += dy * SPRING;
  cursor.vx *= DAMPING; cursor.vy *= DAMPING;
  cursor.x += cursor.vx; cursor.y += cursor.vy;
  cursor.dotX += (mouseX - cursor.dotX) * DOT_EASE;
  cursor.dotY += (mouseY - cursor.dotY) * DOT_EASE;

  const speed = Math.sqrt(cursor.vx * cursor.vx + cursor.vy * cursor.vy);
  const angle = Math.atan2(cursor.vy, cursor.vx);
  const stretch = Math.min(speed * 0.06, 0.5);
  cursor.scale += (cursor.targetScale - cursor.scale) * 0.1;
  cursorHue = (cursorHue + 0.15) % 360;
  if (clickFlash > 0) clickFlash *= 0.88;

  const r = cursor.baseRadius * cursor.scale;
  cursorCtx.save();
  cursorCtx.translate(cursor.x, cursor.y);
  cursorCtx.rotate(angle);

  const glowRadius = r * 2.5;
  const glow = cursorCtx.createRadialGradient(0, 0, r * 0.5, 0, 0, glowRadius);
  glow.addColorStop(0, `hsla(${cursorHue}, 80%, 60%, ${0.06 + clickFlash * 0.15})`);
  glow.addColorStop(0.5, `hsla(${(cursorHue + 40) % 360}, 70%, 50%, ${0.02 + clickFlash * 0.06})`);
  glow.addColorStop(1, 'hsla(0, 0%, 0%, 0)');
  cursorCtx.beginPath(); cursorCtx.arc(0, 0, glowRadius, 0, Math.PI * 2);
  cursorCtx.fillStyle = glow; cursorCtx.fill();

  const sx = 1 + stretch, sy = 1 - stretch * 0.4;
  cursorCtx.scale(sx, sy);
  const ringAlpha = isHovering ? 0.7 : 0.55;
  cursorCtx.beginPath(); cursorCtx.arc(0, 0, r, 0, Math.PI * 2);
  cursorCtx.strokeStyle = `hsla(${cursorHue}, 75%, 70%, ${ringAlpha})`;
  cursorCtx.lineWidth = isHovering ? 2 : 1.5; cursorCtx.stroke();
  cursorCtx.beginPath(); cursorCtx.arc(0, 0, r + 3, 0, Math.PI * 2);
  cursorCtx.strokeStyle = `hsla(${(cursorHue + 60) % 360}, 70%, 65%, ${ringAlpha * 0.25})`;
  cursorCtx.lineWidth = 0.8; cursorCtx.stroke();
  cursorCtx.restore();

  sparkles.forEach((s) => {
    s.angle += s.speed;
    s.targetDistance = isHovering ? r * cursor.scale + 6 : r * cursor.scale - 2;
    s.distance += (s.targetDistance - s.distance) * 0.08;
    s.opacity += ((isHovering ? 0.7 : 0.35) - s.opacity) * 0.05;
    const sx2 = cursor.x + Math.cos(s.angle) * s.distance;
    const sy2 = cursor.y + Math.sin(s.angle) * s.distance;
    cursorCtx.beginPath(); cursorCtx.arc(sx2, sy2, s.size * cursor.scale, 0, Math.PI * 2);
    cursorCtx.fillStyle = `hsla(${(cursorHue + s.hueOffset) % 360}, 80%, 70%, ${s.opacity})`; cursorCtx.fill();
  });

  const dotSize = isClicking ? 2 : 3;
  cursorCtx.beginPath(); cursorCtx.arc(cursor.dotX, cursor.dotY, dotSize, 0, Math.PI * 2);
  cursorCtx.fillStyle = `hsla(${cursorHue}, 70%, 85%, 0.9)`; cursorCtx.fill();

  if (clickFlash > 0.01) {
    cursorCtx.beginPath(); cursorCtx.arc(cursor.x, cursor.y, r * (1 + (1 - clickFlash) * 2), 0, Math.PI * 2);
    cursorCtx.strokeStyle = `hsla(${cursorHue}, 80%, 75%, ${clickFlash * 0.6})`;
    cursorCtx.lineWidth = 1; cursorCtx.stroke();
  }
  requestAnimationFrame(drawCursor);
}
drawCursor();

// ==================== MAGNETIC BUTTONS ====================
const magneticBtns = document.querySelectorAll('.magnetic-btn');
magneticBtns.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    if (btn.querySelector('span')) btn.querySelector('span').style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = ''; if (btn.querySelector('span')) btn.querySelector('span').style.transform = '';
  });
});

// ==================== PARTICLE CANVAS ====================
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId;

function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5; this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5; this.opacity = Math.random() * 0.5 + 0.1;
    this.color = this.getRandomColor();
  }
  getRandomColor() {
    const colors = ['124, 58, 237', '6, 182, 212', '244, 63, 94', '236, 72, 153', '245, 158, 11', '16, 185, 129'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.x += this.speedX; this.y += this.speedY;
    const dx = mouseX - this.x, dy = mouseY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150) { const force = (150 - dist) / 150; this.x -= dx * force * 0.01; this.y -= dy * force * 0.01; }
    if (this.x < 0) this.x = canvas.width; if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height; if (this.y > canvas.height) this.y = 0;
  }
  draw() {
    ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`; ctx.fill();
  }
}

const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
const isMobile = window.innerWidth <= 768;

function initParticles() {
  const count = isMobile ? Math.min(30, Math.floor(window.innerWidth * 0.05)) : Math.min(150, Math.floor(window.innerWidth * 0.1));
  particles = [];
  for (let i = 0; i < count; i++) particles.push(new Particle());
}
initParticles();

function drawConnections() {
  if (isMobile) return;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(124, 58, 237, ${0.08 * (1 - dist / 120)})`; ctx.lineWidth = 0.5; ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  animationId = requestAnimationFrame(animateParticles);
}
animateParticles();

// ==================== SPLIT TEXT UTILITY ====================
function splitTextIntoChars(el) {
  const text = el.textContent;
  el.innerHTML = '';
  text.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.classList.add('char');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.setProperty('--char-index', i);
    el.appendChild(span);
  });
  return el.querySelectorAll('.char');
}

// ==================== GSAP ANIMATIONS ====================
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function initAnimations() {
  // ── Split text init for [data-split] elements ──
  document.querySelectorAll('[data-split]').forEach(el => {
    splitTextIntoChars(el);
  });

  // ── HERO ENTRANCE — CINEMATIC REVEAL ──
  const heroTl = gsap.timeline({ delay: 0.2 });

  // Tag entrance with elastic bounce
  heroTl.to('.hero-tag', {
    opacity: 1, y: 0,
    duration: 0.9, ease: 'back.out(1.7)',
  });

  // Hero words — staggered with perspective rotation
  heroTl.to('.hero-word', {
    y: 0,
    duration: 1.2,
    stagger: 0.1,
    ease: 'power4.out',
  }, '-=0.5');

  // If hero-name was split into chars, animate them with wave
  const heroChars = document.querySelectorAll('.hero-name .char');
  if (heroChars.length) {
    heroTl.fromTo(heroChars, {
      opacity: 0,
      y: 60,
      rotateX: -90,
      scale: 0.5,
    }, {
      opacity: 1, y: 0, rotateX: 0, scale: 1,
      duration: 0.8,
      stagger: { each: 0.04, from: 'start' },
      ease: 'back.out(2)',
    }, '-=1');
  }

  // Subtitle
  heroTl.to('.hero-subtitle', {
    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
  }, '-=0.5');

  // Actions
  heroTl.to('.hero-actions', {
    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
  }, '-=0.5');

  // Scroll cue
  heroTl.to('.hero-scroll-cue', {
    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
  }, '-=0.3');

  // Grid lines fade in
  heroTl.fromTo('.grid-line', {
    scaleY: 0, transformOrigin: 'top center',
  }, {
    scaleY: 1, duration: 1.2,
    stagger: 0.08, ease: 'power3.out',
  }, '-=1');

  // ── SECTION HEADER REVEAL — with .in-view class toggle ──
  document.querySelectorAll('.section-header[data-animation="reveal"]').forEach(header => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
        onEnter: () => header.classList.add('in-view'),
      }
    });

    const number = header.querySelector('.section-number');
    const lines = header.querySelectorAll('.title-line span');

    if (number) {
      tl.fromTo(number, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' });
    }

    tl.fromTo(lines, { y: '110%', rotateX: -15, opacity: 0 }, {
      y: '0%', rotateX: 0, opacity: 1,
      duration: 1, stagger: 0.12, ease: 'power4.out',
    }, '-=0.4');
  });

  // ── FADE-UP ELEMENTS — enhanced with perspective ──
  document.querySelectorAll('[data-animation="fade-up"]').forEach(el => {
    gsap.fromTo(el, {
      opacity: 0, y: 50, scale: 0.97,
    }, {
      opacity: 1, y: 0, scale: 1,
      duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
    });
  });

  // ── STAT COUNTER — counting animation ──
  document.querySelectorAll('.stat-number').forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    const counter = { value: 0 };
    gsap.to(counter, {
      value: target, duration: 2.5, ease: 'power2.out',
      scrollTrigger: { trigger: stat, start: 'top 85%', toggleActions: 'play none none none' },
      onUpdate: () => { stat.textContent = Math.round(counter.value); }
    });
  });

  // ── SKILL BARS ──
  document.querySelectorAll('.skill-bar-fill').forEach(bar => {
    const width = bar.getAttribute('data-width');
    gsap.to(bar, {
      width: width + '%', duration: 1.8, ease: 'power3.out',
      scrollTrigger: { trigger: bar, start: 'top 90%', toggleActions: 'play none none none' }
    });
  });

  // ── SKILL CATEGORIES — staggered reveal ──
  gsap.utils.toArray('.skill-category').forEach((cat, i) => {
    gsap.fromTo(cat, {
      opacity: 0, y: 60, rotateX: -8, scale: 0.95,
    }, {
      opacity: 1, y: 0, rotateX: 0, scale: 1,
      duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: cat, start: 'top 88%', toggleActions: 'play none none none' },
      delay: i * 0.1
    });
  });

  // ── SKILL TAGS — stagger pop in per category ──
  document.querySelectorAll('.skill-category').forEach(cat => {
    const tags = cat.querySelectorAll('.skill-tag');
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

  // ── TIMELINE ITEMS — staggered 3D entrance ──
  gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    gsap.fromTo(item, {
      opacity: 0, x: -40, rotateY: 8,
    }, {
      opacity: 1, x: 0, rotateY: 0,
      duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none none' },
      delay: i * 0.12
    });
  });

  // ── BIG TEXT — dual-track scrub parallax ──
  const bigTextTracks = document.querySelectorAll('.big-text-track');
  bigTextTracks.forEach((track, i) => {
    const direction = track.classList.contains('big-text-reverse') ? '10%' : '-15%';
    gsap.to(track, {
      x: direction, ease: 'none',
      scrollTrigger: {
        trigger: '.big-text-section',
        start: 'top bottom', end: 'bottom top', scrub: 1.2,
      }
    });
  });

  // ── PROJECT CARDS — staggered grid reveal ──
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.fromTo(card, {
      opacity: 0, y: 80, scale: 0.9, rotateX: -5,
    }, {
      opacity: 1, y: 0, scale: 1, rotateX: 0,
      duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
      delay: i * 0.1
    });
  });

  // ── TESTIMONIAL CARDS — wave entrance ──
  gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
    gsap.fromTo(card, {
      opacity: 0, y: 60, rotateY: -8, scale: 0.92,
    }, {
      opacity: 1, y: 0, rotateY: 0, scale: 1,
      duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
      delay: i * 0.15
    });
  });

  // ── CONTACT ITEMS — slide in with spring ──
  gsap.utils.toArray('.contact-item').forEach((item, i) => {
    gsap.fromTo(item, {
      opacity: 0, x: -40, scale: 0.95,
    }, {
      opacity: 1, x: 0, scale: 1,
      duration: 0.8, ease: 'back.out(1.5)',
      scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none none' },
      delay: i * 0.1
    });
  });

  // ── SOCIAL LINKS — pop in ──
  gsap.utils.toArray('.social-link').forEach((link, i) => {
    gsap.fromTo(link, {
      opacity: 0, y: 25, scale: 0.3, rotation: -20,
    }, {
      opacity: 1, y: 0, scale: 1, rotation: 0,
      duration: 0.6, ease: 'back.out(3)',
      scrollTrigger: { trigger: link.parentElement, start: 'top 90%', toggleActions: 'play none none none' },
      delay: i * 0.1
    });
  });

  // ── FORM FIELDS — stagger reveal ──
  gsap.utils.toArray('.form-field').forEach((field, i) => {
    gsap.fromTo(field, {
      opacity: 0, y: 30, x: 20,
    }, {
      opacity: 1, y: 0, x: 0,
      duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: field, start: 'top 92%', toggleActions: 'play none none none' },
      delay: i * 0.08
    });
  });

  // ── FOOTER — reveal ──
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

  // Refresh ScrollTrigger
  ScrollTrigger.refresh();
}

// ==================== PROJECT CARDS — MOUSE SPOTLIGHT ====================
if (!isTouchDevice) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
    });
  });

  // Also for skill categories
  document.querySelectorAll('.skill-category').forEach(cat => {
    cat.addEventListener('mousemove', (e) => {
      const rect = cat.getBoundingClientRect();
      cat.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
      cat.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
    });
  });
}

// ==================== NAVIGATION ====================
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) { nav.classList.add('scrolled'); } else { nav.classList.remove('scrolled'); }

  const backToTop = document.getElementById('backToTop');
  if (window.scrollY > 600) { backToTop.classList.add('visible'); } else { backToTop.classList.remove('visible'); }

  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === current) link.classList.add('active');
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      gsap.to(window, { scrollTo: { y: target, offsetY: 80 }, duration: 1.2, ease: 'power3.inOut' });
    }
    mobileMenu.classList.remove('active');
    navHamburger.classList.remove('active');
  });
});

document.getElementById('backToTop').addEventListener('click', () => {
  gsap.to(window, { scrollTo: 0, duration: 1.2, ease: 'power3.inOut' });
});

// ==================== MOBILE MENU ====================
const navHamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('mobileMenu');

navHamburger.addEventListener('click', () => {
  navHamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// ==================== ROTATING WORDS — with glitch flash ====================
const rotatingWords = document.querySelectorAll('.rotating-word');
let currentWordIndex = 0;

function rotateWords() {
  const current = rotatingWords[currentWordIndex];
  const next = rotatingWords[(currentWordIndex + 1) % rotatingWords.length];

  gsap.to(current, {
    y: -30, rotateX: 30, opacity: 0,
    duration: 0.4, ease: 'power3.in',
    onComplete: () => {
      current.classList.remove('active');
      current.style.cssText = '';
    }
  });

  currentWordIndex = (currentWordIndex + 1) % rotatingWords.length;

  gsap.fromTo(next, {
    y: 30, rotateX: -30, opacity: 0,
  }, {
    y: 0, rotateX: 0, opacity: 1,
    duration: 0.5, ease: 'power3.out',
    delay: 0.3,
    onStart: () => next.classList.add('active'),
  });
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

    projectCards.forEach((card, i) => {
      const category = card.getAttribute('data-category');
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
          onComplete: () => card.classList.add('hidden'),
        });
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
  setTimeout(() => {
    btn.querySelector('span').textContent = 'Sent! ✓';
    btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
    gsap.fromTo(btn, { scale: 1.05 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
    setTimeout(() => {
      btn.querySelector('span').textContent = originalText;
      btn.style.background = ''; btn.style.pointerEvents = '';
      contactForm.reset();
    }, 2500);
  }, 1500);
});

// ==================== TILT EFFECT ON CARDS ====================
if (!isTouchDevice) {
  document.querySelectorAll('.project-card, .skill-category, .testimonial-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const centerX = rect.width / 2, centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20, rotateY = (centerX - x) / 20;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

// ==================== PARALLAX FLOATING SHAPES ====================
if (!isTouchDevice) {
  window.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth, y = e.clientY / window.innerHeight;
    shapes.forEach((shape, i) => {
      const speed = (i + 1) * 15;
      shape.style.transform = `translate(${(x - 0.5) * speed}px, ${(y - 0.5) * speed}px)`;
    });
  });
}

// ==================== ORB MOUSE FOLLOW ====================
if (!isTouchDevice) {
  document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.orb');
    const x = e.clientX / window.innerWidth, y = e.clientY / window.innerHeight;
    orbs.forEach((orb, i) => {
      gsap.to(orb, { x: (x - 0.5) * (i + 1) * 20, y: (y - 0.5) * (i + 1) * 20, duration: 2, ease: 'power2.out' });
    });
  });
}

// ==================== SMOOTH REVEAL ON SCROLL ====================
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; }
  });
}, observerOptions);

// ==================== SCROLL-VELOCITY MARQUEE SPEED ==================== 
let lastScrollTop = 0;
let scrollVelocity = 0;

window.addEventListener('scroll', () => {
  const st = window.scrollY;
  scrollVelocity = Math.abs(st - lastScrollTop);
  lastScrollTop = st;

  // Speed up marquee based on scroll speed
  const marqueeTrack = document.querySelectorAll('.marquee-track');
  marqueeTrack.forEach(track => {
    const baseSpeed = track.classList.contains('marquee-reverse') ? 30 : 25;
    const speedBoost = Math.min(scrollVelocity * 0.3, 15);
    track.style.animationDuration = Math.max(baseSpeed - speedBoost, 8) + 's';
  });
}, { passive: true });

// ==================== RESIZE HANDLER ====================
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); ScrollTrigger.refresh(); });

// ==================== PAUSE PARTICLES WHEN NOT VISIBLE ====================
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { if (!animationId) animateParticles(); }
    else { cancelAnimationFrame(animationId); animationId = null; }
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
