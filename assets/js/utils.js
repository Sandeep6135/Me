/* ============================================================
   UTILS — Shared State, Helpers & Utilities
   ============================================================ */

// ── Shared mouse position ──
var mouseX = window.innerWidth / 2;
var mouseY = window.innerHeight / 2;

document.addEventListener('mousemove', function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// ── Device detection ──
var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
var isMobile = window.innerWidth <= 768;

// ── Safe query helpers ──
function qs(selector, scope) {
  return (scope || document).querySelector(selector);
}

function qsa(selector, scope) {
  return (scope || document).querySelectorAll(selector);
}

// ── Split text into per-character spans (SEO-safe) ──
function splitTextIntoChars(el) {
  if (!el) return [];

  var hiddenEls = Array.from(el.querySelectorAll('.visually-hidden')).map(function (h) {
    return h.cloneNode(true);
  });

  var text = '';
  el.childNodes.forEach(function (node) {
    if (node.nodeType === Node.TEXT_NODE) text += node.textContent;
  });

  el.innerHTML = '';
  text.split('').forEach(function (char, i) {
    var span = document.createElement('span');
    span.classList.add('char');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.setProperty('--char-index', i);
    el.appendChild(span);
  });

  hiddenEls.forEach(function (h) { el.appendChild(h); });
  return el.querySelectorAll('.char');
}

// ── Animation helper (keeps animation out of business logic) ──
function animateButtonSuccess(btn) {
  if (typeof gsap !== 'undefined' && btn) {
    gsap.fromTo(btn, { scale: 1.05 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
  }
}

// ── Image Download Protection ──
// Disable right-click on all protected images
document.addEventListener('contextmenu', function (e) {
  if (e.target.classList && e.target.classList.contains('protected-img')) {
    e.preventDefault();
    return false;
  }
});

// Disable drag on all protected images
document.addEventListener('dragstart', function (e) {
  if (e.target.classList && e.target.classList.contains('protected-img')) {
    e.preventDefault();
    return false;
  }
});

// Block common keyboard shortcuts for saving images (Ctrl+S, Ctrl+Shift+I)
document.addEventListener('keydown', function (e) {
  // Ctrl+S (Save page)
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
  }
});
