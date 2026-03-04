/* ============================================================
   SLIDESHOW - About Image Slideshow with 20 Creative Transitions
   Each slide gets a random unique transition for variety.
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

  /* -- Full transition pool (20 effects) -- */
  var transitions = [
    'glitch', 'slice', 'sliceH', 'clip', 'zoom', 'rgb', 'shutter',
    'fade', 'flipX', 'flipY', 'swirl', 'pixelate', 'blinds',
    'diagonal', 'rotate3d', 'squeeze', 'slideLeft', 'slideUp',
    'crossZoom', 'ripple'
  ];
  var last2Transitions = [];

  function getRandomTransition() {
    var t;
    var attempts = 0;
    do {
      t = transitions[Math.floor(Math.random() * transitions.length)];
      attempts++;
    } while (last2Transitions.indexOf(t) !== -1 && attempts < 20);
    last2Transitions.push(t);
    if (last2Transitions.length > 2) last2Transitions.shift();
    return t;
  }

  function showFxLabel(name) {
    if (!fxLabel) return;
    var labels = {
      glitch: 'GLITCH', slice: 'SLICE', sliceH: 'H-SLICE',
      clip: 'MORPH', zoom: 'ZOOM BURST', rgb: 'RGB SPLIT',
      shutter: 'SHUTTER', fade: 'CROSSFADE', flipX: 'FLIP X',
      flipY: 'FLIP Y', swirl: 'SWIRL', pixelate: 'PIXELATE',
      blinds: 'BLINDS', diagonal: 'DIAGONAL', rotate3d: '3D ROTATE',
      squeeze: 'SQUEEZE', slideLeft: 'SLIDE', slideUp: 'SLIDE UP',
      crossZoom: 'CROSS ZOOM', ripple: 'RIPPLE'
    };
    fxLabel.textContent = '\u2726 ' + (labels[name] || name.toUpperCase());
    fxLabel.classList.add('visible');
    setTimeout(function () { fxLabel.classList.remove('visible'); }, 1200);
  }

  /* -- All CSS class names that transitions can add -- */
  var allTransitionClasses = [
    'active', 'prev',
    'clip-enter', 'clip-exit', 'zoom-enter', 'zoom-exit',
    'rgb-enter', 'rgb-exit', 'shutter-enter', 'shutter-exit',
    'fade-enter', 'fade-exit',
    'flipX-enter', 'flipX-exit', 'flipY-enter', 'flipY-exit',
    'swirl-enter', 'swirl-exit',
    'pixelate-enter', 'pixelate-exit',
    'blinds-enter', 'blinds-exit',
    'diagonal-enter', 'diagonal-exit',
    'rotate3d-enter', 'rotate3d-exit',
    'squeeze-enter', 'squeeze-exit',
    'slideLeft-enter', 'slideLeft-exit',
    'slideUp-enter', 'slideUp-exit',
    'crossZoom-enter', 'crossZoom-exit',
    'ripple-enter', 'ripple-exit'
  ];

  function cleanupSlide(el) {
    allTransitionClasses.forEach(function (cls) {
      el.classList.remove(cls);
    });
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
      case 'glitch':     transitionGlitch(prevSlide, nextSlideEl); break;
      case 'slice':      transitionSlice(prevSlide, nextSlideEl, false); break;
      case 'sliceH':     transitionSlice(prevSlide, nextSlideEl, true); break;
      case 'clip':       transitionClip(prevSlide, nextSlideEl); break;
      case 'zoom':       transitionZoom(prevSlide, nextSlideEl); break;
      case 'rgb':        transitionRGB(prevSlide, nextSlideEl); break;
      case 'shutter':    transitionShutter(prevSlide, nextSlideEl); break;
      case 'fade':       transitionFade(prevSlide, nextSlideEl); break;
      case 'flipX':      transitionFlip(prevSlide, nextSlideEl, 'X'); break;
      case 'flipY':      transitionFlip(prevSlide, nextSlideEl, 'Y'); break;
      case 'swirl':      transitionSwirl(prevSlide, nextSlideEl); break;
      case 'pixelate':   transitionPixelate(prevSlide, nextSlideEl); break;
      case 'blinds':     transitionBlinds(prevSlide, nextSlideEl); break;
      case 'diagonal':   transitionDiagonal(prevSlide, nextSlideEl); break;
      case 'rotate3d':   transitionRotate3d(prevSlide, nextSlideEl); break;
      case 'squeeze':    transitionSqueeze(prevSlide, nextSlideEl); break;
      case 'slideLeft':  transitionSlideDir(prevSlide, nextSlideEl, 'left'); break;
      case 'slideUp':    transitionSlideDir(prevSlide, nextSlideEl, 'up'); break;
      case 'crossZoom':  transitionCrossZoom(prevSlide, nextSlideEl); break;
      case 'ripple':     transitionRipple(prevSlide, nextSlideEl); break;
      default:           finishTransition(prevSlide, nextSlideEl); break;
    }

    resetProgress();
  }

  // -- 1. GLITCH --
  function transitionGlitch(prev, next) {
    var currentSrc = prev.src;
    if (glitchLayer1) glitchLayer1.style.backgroundImage = 'url(' + currentSrc + ')';
    if (glitchLayer2) glitchLayer2.style.backgroundImage = 'url(' + currentSrc + ')';
    slideshow.classList.add('slideshow-glitching', 'flash');
    var flickerCount = 0;
    var flickerInterval = setInterval(function () {
      flickerCount++;
      if (flickerCount % 2 === 0) {
        prev.style.opacity = '1'; next.style.opacity = '0';
      } else {
        prev.style.opacity = '0'; next.style.opacity = '1';
      }
      if (flickerCount > 8) {
        clearInterval(flickerInterval);
        cleanupSlide(prev);
        next.classList.add('active');
        next.style.opacity = ''; prev.style.opacity = '';
      }
    }, 50);
    setTimeout(function () {
      slideshow.classList.remove('slideshow-glitching', 'flash');
      isTransitioning = false; scheduleNextSlide();
    }, 800);
  }

  // -- 2. SLICE --
  function transitionSlice(prev, next, horizontal) {
    if (!fxOverlay) { finishTransition(prev, next); return; }
    fxOverlay.className = 'slide-fx-overlay' + (horizontal ? ' horizontal' : '');
    fxOverlay.querySelectorAll('.fx-slice').forEach(function (s) {
      s.style.animation = 'none'; s.offsetHeight; s.style.animation = '';
    });
    fxOverlay.classList.add('active');
    setTimeout(function () { cleanupSlide(prev); next.classList.add('active'); }, 320);
    setTimeout(function () {
      fxOverlay.classList.remove('active', 'horizontal');
      isTransitioning = false; scheduleNextSlide();
    }, 900);
  }

  // -- 3. CLIP PATH MORPH --
  function transitionClip(prev, next) {
    var hasGsap = typeof gsap !== 'undefined';
    var shapes = [
      { from: 'circle(0% at 50% 50%)', to: 'circle(150% at 50% 50%)' },
      { from: 'circle(0% at 0% 0%)', to: 'circle(150% at 0% 0%)' },
      { from: 'circle(0% at 100% 100%)', to: 'circle(150% at 100% 100%)' },
      { from: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)', to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
      { from: 'inset(50% 50% 50% 50%)', to: 'inset(0% 0% 0% 0%)' },
      { from: 'ellipse(0% 0% at 50% 50%)', to: 'ellipse(100% 100% at 50% 50%)' }
    ];
    var shape = shapes[Math.floor(Math.random() * shapes.length)];
    next.style.clipPath = shape.from;
    next.classList.add('active');
    next.style.opacity = '1';
    next.style.zIndex = '4';
    if (hasGsap) {
      gsap.to(next, {
        clipPath: shape.to, duration: 0.9, ease: 'power3.inOut',
        onComplete: function () {
          cleanupSlide(prev); next.style.zIndex = ''; next.style.clipPath = '';
          isTransitioning = false; scheduleNextSlide();
        }
      });
    } else {
      next.style.transition = 'clip-path 0.9s cubic-bezier(0.16,1,0.3,1)';
      requestAnimationFrame(function () { next.style.clipPath = shape.to; });
      setTimeout(function () {
        cleanupSlide(prev); next.style.transition = ''; next.style.zIndex = ''; next.style.clipPath = '';
        isTransitioning = false; scheduleNextSlide();
      }, 1000);
    }
    slideshow.classList.add('flash');
    setTimeout(function () { slideshow.classList.remove('flash'); }, 300);
  }

  // -- 4. ZOOM BURST --
  function transitionZoom(prev, next) {
    prev.classList.add('prev', 'zoom-exit');
    setTimeout(function () { next.classList.add('active', 'zoom-enter'); }, 150);
    slideshow.classList.add('flash');
    setTimeout(function () { slideshow.classList.remove('flash'); }, 300);
    setTimeout(function () {
      cleanupSlide(prev); next.classList.remove('zoom-enter');
      isTransitioning = false; scheduleNextSlide();
    }, 1000);
  }

  // -- 5. RGB SPLIT --
  function transitionRGB(prev, next) {
    prev.classList.add('prev', 'rgb-exit');
    setTimeout(function () { next.classList.add('active', 'rgb-enter'); }, 200);
    setTimeout(function () {
      cleanupSlide(prev); next.classList.remove('rgb-enter');
      isTransitioning = false; scheduleNextSlide();
    }, 1000);
  }

  // -- 6. SHUTTER --
  function transitionShutter(prev, next) {
    prev.classList.add('prev', 'shutter-exit');
    setTimeout(function () { next.classList.add('active', 'shutter-enter'); }, 250);
    slideshow.classList.add('flash');
    setTimeout(function () { slideshow.classList.remove('flash'); }, 300);
    setTimeout(function () {
      cleanupSlide(prev); next.classList.remove('shutter-enter');
      isTransitioning = false; scheduleNextSlide();
    }, 1000);
  }

  // -- 7. CROSSFADE --
  function transitionFade(prev, next) {
    prev.classList.add('prev', 'fade-exit');
    next.classList.add('active', 'fade-enter');
    setTimeout(function () {
      cleanupSlide(prev); next.classList.remove('fade-enter');
      isTransitioning = false; scheduleNextSlide();
    }, 1200);
  }

  // -- 8. FLIP (X or Y axis) --
  function transitionFlip(prev, next, axis) {
    var cls = axis === 'Y' ? 'flipY' : 'flipX';
    slideshow.style.perspective = '1200px';
    prev.classList.add('prev', cls + '-exit');
    setTimeout(function () { next.classList.add('active', cls + '-enter'); }, 300);
    setTimeout(function () {
      cleanupSlide(prev); next.classList.remove(cls + '-enter');
      slideshow.style.perspective = '';
      isTransitioning = false; scheduleNextSlide();
    }, 1000);
  }

  // -- 9. SWIRL --
  function transitionSwirl(prev, next) {
    prev.classList.add('prev', 'swirl-exit');
    setTimeout(function () { next.classList.add('active', 'swirl-enter'); }, 200);
    slideshow.classList.add('flash');
    setTimeout(function () { slideshow.classList.remove('flash'); }, 300);
    setTimeout(function () {
      cleanupSlide(prev); next.classList.remove('swirl-enter');
      isTransitioning = false; scheduleNextSlide();
    }, 1100);
  }

  // -- 10. PIXELATE (blur-based) --
  function transitionPixelate(prev, next) {
    prev.classList.add('prev', 'pixelate-exit');
    setTimeout(function () { next.classList.add('active', 'pixelate-enter'); }, 250);
    setTimeout(function () {
      cleanupSlide(prev); next.classList.remove('pixelate-enter');
      isTransitioning = false; scheduleNextSlide();
    }, 1200);
  }

  // -- 11. BLINDS --
  function transitionBlinds(prev, next) {
    prev.classList.add('prev', 'blinds-exit');
    next.classList.add('active', 'blinds-enter');
    setTimeout(function () {
      cleanupSlide(prev); next.classList.remove('blinds-enter');
      isTransitioning = false; scheduleNextSlide();
    }, 1200);
  }

  // -- 12. DIAGONAL WIPE --
  function transitionDiagonal(prev, next) {
    next.style.clipPath = 'polygon(100% 0%, 100% 0%, 100% 0%)';
    next.classList.add('active');
    next.style.opacity = '1';
    next.style.zIndex = '4';
    if (typeof gsap !== 'undefined') {
      gsap.to(next, {
        clipPath: 'polygon(-20% 0%, 120% 0%, 120% 120%, -20% 120%)',
        duration: 1, ease: 'power2.inOut',
        onComplete: function () {
          cleanupSlide(prev); next.style.zIndex = ''; next.style.clipPath = '';
          isTransitioning = false; scheduleNextSlide();
        }
      });
    } else {
      next.style.transition = 'clip-path 1s cubic-bezier(0.65,0,0.35,1)';
      requestAnimationFrame(function () {
        next.style.clipPath = 'polygon(-20% 0%, 120% 0%, 120% 120%, -20% 120%)';
      });
      setTimeout(function () {
        cleanupSlide(prev); next.style.transition = ''; next.style.zIndex = ''; next.style.clipPath = '';
        isTransitioning = false; scheduleNextSlide();
      }, 1100);
    }
  }

  // -- 13. 3D ROTATE --
  function transitionRotate3d(prev, next) {
    slideshow.style.perspective = '1500px';
    prev.classList.add('prev', 'rotate3d-exit');
    setTimeout(function () { next.classList.add('active', 'rotate3d-enter'); }, 250);
    setTimeout(function () {
      cleanupSlide(prev); next.classList.remove('rotate3d-enter');
      slideshow.style.perspective = '';
      isTransitioning = false; scheduleNextSlide();
    }, 1100);
  }

  // -- 14. SQUEEZE --
  function transitionSqueeze(prev, next) {
    prev.classList.add('prev', 'squeeze-exit');
    setTimeout(function () { next.classList.add('active', 'squeeze-enter'); }, 300);
    setTimeout(function () {
      cleanupSlide(prev); next.classList.remove('squeeze-enter');
      isTransitioning = false; scheduleNextSlide();
    }, 1100);
  }

  // -- 15. SLIDE DIRECTION --
  function transitionSlideDir(prev, next, dir) {
    var cls = dir === 'up' ? 'slideUp' : 'slideLeft';
    prev.classList.add('prev', cls + '-exit');
    next.classList.add('active', cls + '-enter');
    setTimeout(function () {
      cleanupSlide(prev); next.classList.remove(cls + '-enter');
      isTransitioning = false; scheduleNextSlide();
    }, 900);
  }

  // -- 16. CROSS ZOOM --
  function transitionCrossZoom(prev, next) {
    prev.classList.add('prev', 'crossZoom-exit');
    setTimeout(function () { next.classList.add('active', 'crossZoom-enter'); }, 150);
    slideshow.classList.add('flash');
    setTimeout(function () { slideshow.classList.remove('flash'); }, 250);
    setTimeout(function () {
      cleanupSlide(prev); next.classList.remove('crossZoom-enter');
      isTransitioning = false; scheduleNextSlide();
    }, 1000);
  }

  // -- 17. RIPPLE --
  function transitionRipple(prev, next) {
    prev.classList.add('prev', 'ripple-exit');
    setTimeout(function () { next.classList.add('active', 'ripple-enter'); }, 200);
    setTimeout(function () {
      cleanupSlide(prev); next.classList.remove('ripple-enter');
      isTransitioning = false; scheduleNextSlide();
    }, 1200);
  }

  /* -- Fallback -- */
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

  // -- Dot navigation --
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      if (i === currentSlide || isTransitioning) return;
      clearTimeout(slideTimeout);
      goToSlide(i);
    });
  });

  // -- Start --
  resetProgress();
  slideTimeout = setTimeout(nextSlide, slideDuration);

  // -- Pause on hover --
  slideshow.addEventListener('mouseenter', function () {
    clearTimeout(slideTimeout);
    if (progressRAF) cancelAnimationFrame(progressRAF);
  });

  slideshow.addEventListener('mouseleave', function () {
    scheduleNextSlide();
  });
});
