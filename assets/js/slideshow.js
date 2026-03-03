/* ============================================================
   SLIDESHOW — About Image Slideshow with Creative Transitions
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var slideshow = qs('#aboutSlideshow');
  if (!slideshow) return;

  var slides = slideshow.querySelectorAll('.slide-img');
  var dots = slideshow.querySelectorAll('.slide-dot');
  var progressBar = qs('#slideProgressBar');
  var fxOverlay = qs('#slideFxOverlay');
  var fxLabel = qs('#slideFxLabel');
  var glitchLayer1 = qs('#glitchLayer1');
  var glitchLayer2 = qs('#glitchLayer2');

  if (!slides.length || !progressBar) return;

  var currentSlide = 0;
  var slideTimeout = null;
  var slideDuration = 6000;
  var slideStartTime = 0;
  var progressRAF = null;
  var isTransitioning = false;

  // ── Transition pool ──
  var transitions = ['glitch', 'slice', 'clip', 'zoom', 'rgb', 'shutter', 'sliceH'];
  var lastTransition = '';

  function getRandomTransition() {
    var t;
    do {
      t = transitions[Math.floor(Math.random() * transitions.length)];
    } while (t === lastTransition);
    lastTransition = t;
    return t;
  }

  function showFxLabel(name) {
    if (!fxLabel) return;
    var labels = {
      glitch: 'GLITCH',
      slice: 'SLICE',
      sliceH: 'H-SLICE',
      clip: 'MORPH',
      zoom: 'ZOOM BURST',
      rgb: 'RGB SPLIT',
      shutter: 'SHUTTER'
    };
    fxLabel.textContent = '\u2726 ' + (labels[name] || name.toUpperCase());
    fxLabel.classList.add('visible');
    setTimeout(function () { fxLabel.classList.remove('visible'); }, 1200);
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

    var effect = getRandomTransition();
    showFxLabel(effect);

    var prevSlide = slides[currentSlide];
    var nextSlideEl = slides[index];

    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
    currentSlide = index;
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');

    switch (effect) {
      case 'glitch':   transitionGlitch(prevSlide, nextSlideEl); break;
      case 'slice':    transitionSlice(prevSlide, nextSlideEl, false); break;
      case 'sliceH':   transitionSlice(prevSlide, nextSlideEl, true); break;
      case 'clip':     transitionClip(prevSlide, nextSlideEl); break;
      case 'zoom':     transitionZoom(prevSlide, nextSlideEl); break;
      case 'rgb':      transitionRGB(prevSlide, nextSlideEl); break;
      case 'shutter':  transitionShutter(prevSlide, nextSlideEl); break;
    }

    resetProgress();
  }

  // ── GLITCH ──
  function transitionGlitch(prev, next) {
    var currentSrc = prev.src;
    if (glitchLayer1) glitchLayer1.style.backgroundImage = 'url(' + currentSrc + ')';
    if (glitchLayer2) glitchLayer2.style.backgroundImage = 'url(' + currentSrc + ')';

    slideshow.classList.add('slideshow-glitching');
    slideshow.classList.add('flash');

    var flickerCount = 0;
    var flickerInterval = setInterval(function () {
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

    setTimeout(function () {
      slideshow.classList.remove('slideshow-glitching', 'flash');
      isTransitioning = false;
      scheduleNextSlide();
    }, 800);
  }

  // ── SLICE ──
  function transitionSlice(prev, next, horizontal) {
    if (!fxOverlay) { finishTransition(prev, next); return; }

    fxOverlay.className = 'slide-fx-overlay' + (horizontal ? ' horizontal' : '');

    fxOverlay.querySelectorAll('.fx-slice').forEach(function (s) {
      s.style.animation = 'none';
      s.offsetHeight; // reflow
      s.style.animation = '';
    });

    fxOverlay.classList.add('active');

    setTimeout(function () {
      cleanupSlide(prev);
      next.classList.add('active');
    }, 320);

    setTimeout(function () {
      fxOverlay.classList.remove('active', 'horizontal');
      isTransitioning = false;
      scheduleNextSlide();
    }, 900);
  }

  // ── CLIP PATH MORPH ──
  function transitionClip(prev, next) {
    if (typeof gsap === 'undefined') { finishTransition(prev, next); return; }

    var origins = ['50% 50%', '0% 0%', '100% 0%', '0% 100%', '100% 100%'];
    var origin = origins[Math.floor(Math.random() * origins.length)];
    var parts = origin.split(' ');
    var ox = parts[0];
    var oy = parts[1];

    next.style.clipPath = 'circle(0% at ' + ox + ' ' + oy + ')';
    next.classList.add('active');
    next.style.opacity = '1';
    next.style.zIndex = '4';

    gsap.to(next, {
      clipPath: 'circle(150% at ' + ox + ' ' + oy + ')',
      duration: 0.9,
      ease: 'power3.inOut',
      onComplete: function () {
        cleanupSlide(prev);
        next.style.zIndex = '';
        next.style.clipPath = '';
        isTransitioning = false;
        scheduleNextSlide();
      }
    });

    slideshow.classList.add('flash');
    setTimeout(function () { slideshow.classList.remove('flash'); }, 300);
  }

  // ── ZOOM BURST ──
  function transitionZoom(prev, next) {
    prev.classList.add('prev');
    prev.classList.add('zoom-exit');

    setTimeout(function () {
      next.classList.add('active', 'zoom-enter');
    }, 150);

    slideshow.classList.add('flash');
    setTimeout(function () { slideshow.classList.remove('flash'); }, 300);

    setTimeout(function () {
      cleanupSlide(prev);
      next.classList.remove('zoom-enter');
      isTransitioning = false;
      scheduleNextSlide();
    }, 1000);
  }

  // ── RGB SPLIT ──
  function transitionRGB(prev, next) {
    prev.classList.add('prev', 'rgb-exit');

    setTimeout(function () {
      next.classList.add('active', 'rgb-enter');
    }, 200);

    setTimeout(function () {
      cleanupSlide(prev);
      next.classList.remove('rgb-enter');
      isTransitioning = false;
      scheduleNextSlide();
    }, 1000);
  }

  // ── SHUTTER ──
  function transitionShutter(prev, next) {
    prev.classList.add('prev', 'shutter-exit');

    setTimeout(function () {
      next.classList.add('active', 'shutter-enter');
    }, 250);

    slideshow.classList.add('flash');
    setTimeout(function () { slideshow.classList.remove('flash'); }, 300);

    setTimeout(function () {
      cleanupSlide(prev);
      next.classList.remove('shutter-enter');
      isTransitioning = false;
      scheduleNextSlide();
    }, 1000);
  }

  // ── Fallback transition (no animation) ──
  function finishTransition(prev, next) {
    cleanupSlide(prev);
    next.classList.add('active');
    isTransitioning = false;
    scheduleNextSlide();
  }

  function nextSlide() {
    var nextIdx = (currentSlide + 1) % slides.length;
    goToSlide(nextIdx);
  }

  function scheduleNextSlide() {
    resetProgress();
    slideTimeout = setTimeout(nextSlide, slideDuration);
  }

  function resetProgress() {
    slideStartTime = performance.now();
    if (progressRAF) cancelAnimationFrame(progressRAF);
    animateProgress();
  }

  function animateProgress() {
    var elapsed = performance.now() - slideStartTime;
    var progress = Math.min((elapsed / slideDuration) * 100, 100);
    progressBar.style.width = progress + '%';
    if (progress < 100) {
      progressRAF = requestAnimationFrame(animateProgress);
    }
  }

  // ── Dot navigation ──
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      if (i === currentSlide || isTransitioning) return;
      clearTimeout(slideTimeout);
      goToSlide(i);
    });
  });

  // ── Start ──
  resetProgress();
  slideTimeout = setTimeout(nextSlide, slideDuration);

  // ── Pause on hover ──
  slideshow.addEventListener('mouseenter', function () {
    clearTimeout(slideTimeout);
    if (progressRAF) cancelAnimationFrame(progressRAF);
  });

  slideshow.addEventListener('mouseleave', function () {
    scheduleNextSlide();
  });
});
