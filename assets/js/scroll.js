/* ============================================================
   SCROLL — Navigation, Smooth Scroll, Mobile Menu, Marquee
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var nav = qs('#nav');
  var navLinks = qsa('.nav-link');
  var sections = qsa('section[id]');
  var backToTopBtn = qs('#backToTop');
  var navHamburger = qs('#navHamburger');
  var mobileMenu = qs('#mobileMenu');

  // ==================== SCROLL — NAV STATE & ACTIVE SECTION (throttled) ===========
  var scrollTicking = false;
  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      requestAnimationFrame(function () {
        // Nav scrolled class
        if (nav) {
          if (window.scrollY > 50) { nav.classList.add('scrolled'); }
          else { nav.classList.remove('scrolled'); }
        }

        // Back to top visibility
        if (backToTopBtn) {
          if (window.scrollY > 600) { backToTopBtn.classList.add('visible'); }
          else { backToTopBtn.classList.remove('visible'); }
        }

        // Active section highlight
        var current = '';
        sections.forEach(function (section) {
          if (window.scrollY >= section.offsetTop - 200) {
            current = section.getAttribute('id');
          }
        });
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === current) link.classList.add('active');
        });

        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // ==================== SMOOTH SCROLL — ANCHOR LINKS ====================
  qsa('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var target = qs(link.getAttribute('href'));
      if (target && typeof gsap !== 'undefined') {
        gsap.to(window, { scrollTo: { y: target, offsetY: 80 }, duration: 1.2, ease: 'power3.inOut' });
      }
      // Close mobile menu
      if (mobileMenu) mobileMenu.classList.remove('active');
      if (navHamburger) navHamburger.classList.remove('active');
    });
  });

  // ==================== BACK TO TOP ====================
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      if (typeof gsap !== 'undefined') {
        gsap.to(window, { scrollTo: 0, duration: 1.2, ease: 'power3.inOut' });
      }
    });
  }

  // ==================== MOBILE MENU TOGGLE ====================
  if (navHamburger && mobileMenu) {
    navHamburger.addEventListener('click', function () {
      navHamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
  }

  // ==================== SCROLL-VELOCITY MARQUEE — REMOVED ====================
  // Changing animationDuration on every scroll frame caused the animation to
  // restart/stutter. Marquee now runs at a steady pace via pure CSS.
});
