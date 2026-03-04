/* ============================================================
   SOUND - Dynamic Audio Design System (Web Audio API)
   Rich synthesized sounds: clicks, hovers, whooshes, transitions,
   ambient pad, scroll tones, and section chimes.
   Muted by default. User toggles via sound button.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var soundToggle = qs('#soundToggle');
  if (!soundToggle) return;

  var audioCtx = null;
  var isEnabled = false;
  var masterGain = null;
  var compressor = null;

  function initAudio() {
    if (audioCtx) return;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      // Master compressor to prevent clipping
      compressor = audioCtx.createDynamicsCompressor();
      compressor.threshold.value = -24;
      compressor.knee.value = 30;
      compressor.ratio.value = 12;
      compressor.connect(audioCtx.destination);

      masterGain = audioCtx.createGain();
      masterGain.gain.value = 0.15;
      masterGain.connect(compressor);
    } catch(e) { /* Web Audio not supported */ }
  }

  /* -------------------------------------------------------
     HELPER: create a gain node connected to master
     ------------------------------------------------------- */
  function makeGain(vol) {
    if (!audioCtx) return null;
    var g = audioCtx.createGain();
    g.gain.value = vol || 0.1;
    g.connect(masterGain);
    return g;
  }

  function now() { return audioCtx ? audioCtx.currentTime : 0; }

  /* -------------------------------------------------------
     1. UI CLICK - crisp digital tap (randomized)
     ------------------------------------------------------- */
  function playClick() {
    if (!isEnabled || !audioCtx) return;
    var t = now();
    var freqs = [800, 900, 1000, 1100, 700];
    var freq = freqs[Math.floor(Math.random() * freqs.length)];

    var osc = audioCtx.createOscillator();
    var gain = makeGain(0.2);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, t + 0.08);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    osc.connect(gain);
    osc.start(t);
    osc.stop(t + 0.1);

    // Add a tiny noise click layer
    var bufLen = audioCtx.sampleRate * 0.02;
    var buf = audioCtx.createBuffer(1, bufLen, audioCtx.sampleRate);
    var data = buf.getChannelData(0);
    for (var i = 0; i < bufLen; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufLen, 3);
    }
    var noise = audioCtx.createBufferSource();
    noise.buffer = buf;
    var ng = makeGain(0.05);
    var hpf = audioCtx.createBiquadFilter();
    hpf.type = 'highpass';
    hpf.frequency.value = 2000;
    noise.connect(hpf);
    hpf.connect(ng);
    noise.start(t);
  }

  /* -------------------------------------------------------
     2. HOVER - soft sparkle (randomized pitch)
     ------------------------------------------------------- */
  function playHover() {
    if (!isEnabled || !audioCtx) return;
    var t = now();
    var baseFreqs = [1200, 1400, 1600, 1800, 2000];
    var freq = baseFreqs[Math.floor(Math.random() * baseFreqs.length)];

    var osc = audioCtx.createOscillator();
    var gain = makeGain(0.06);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.15, t + 0.04);
    gain.gain.setValueAtTime(0.06, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    osc.connect(gain);
    osc.start(t);
    osc.stop(t + 0.06);
  }

  /* -------------------------------------------------------
     3. WHOOSH - slide transition swoosh sound
     ------------------------------------------------------- */
  function playWhoosh() {
    if (!isEnabled || !audioCtx) return;
    var t = now();
    var duration = 0.4 + Math.random() * 0.2;

    // Filtered noise sweep
    var bufLen = Math.floor(audioCtx.sampleRate * duration);
    var buf = audioCtx.createBuffer(1, bufLen, audioCtx.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < bufLen; i++) {
      var env = Math.sin(Math.PI * i / bufLen);
      d[i] = (Math.random() * 2 - 1) * env * env;
    }
    var src = audioCtx.createBufferSource();
    src.buffer = buf;
    var bpf = audioCtx.createBiquadFilter();
    bpf.type = 'bandpass';
    bpf.frequency.setValueAtTime(500, t);
    bpf.frequency.exponentialRampToValueAtTime(4000, t + duration * 0.4);
    bpf.frequency.exponentialRampToValueAtTime(800, t + duration);
    bpf.Q.value = 2;
    var gain = makeGain(0.12);
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.12, t + duration * 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    src.connect(bpf);
    bpf.connect(gain);
    src.start(t);
  }

  /* -------------------------------------------------------
     4. TRANSITION CHIME - melodic bell for slide changes
     ------------------------------------------------------- */
  function playTransitionChime() {
    if (!isEnabled || !audioCtx) return;
    var t = now();
    var notes = [523.25, 659.25, 783.99, 1046.5, 880, 739.99]; // C5, E5, G5, C6, A5, F#5
    var note = notes[Math.floor(Math.random() * notes.length)];

    // Main bell tone
    var osc1 = audioCtx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.value = note;
    var g1 = makeGain(0.15);
    g1.gain.setValueAtTime(0.15, t);
    g1.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
    osc1.connect(g1);
    osc1.start(t);
    osc1.stop(t + 0.8);

    // Harmonic overtone
    var osc2 = audioCtx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = note * 2.01;
    var g2 = makeGain(0.05);
    g2.gain.setValueAtTime(0.05, t);
    g2.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    osc2.connect(g2);
    osc2.start(t);
    osc2.stop(t + 0.5);

    // Sub tone
    var osc3 = audioCtx.createOscillator();
    osc3.type = 'triangle';
    osc3.frequency.value = note * 0.5;
    var g3 = makeGain(0.04);
    g3.gain.setValueAtTime(0.04, t);
    g3.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
    osc3.connect(g3);
    osc3.start(t);
    osc3.stop(t + 0.6);
  }

  /* -------------------------------------------------------
     5. SECTION ENTER - warm ascending arpeggio
     ------------------------------------------------------- */
  function playSectionEnter() {
    if (!isEnabled || !audioCtx) return;
    var t = now();
    var arpeggios = [
      [392, 493.88, 587.33], // G4, B4, D5
      [440, 554.37, 659.25], // A4, C#5, E5
      [349.23, 440, 523.25], // F4, A4, C5
      [329.63, 415.3, 523.25] // E4, G#4, C5
    ];
    var arp = arpeggios[Math.floor(Math.random() * arpeggios.length)];

    arp.forEach(function (freq, i) {
      var osc = audioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      var g = makeGain(0);
      g.gain.setValueAtTime(0, t + i * 0.1);
      g.gain.linearRampToValueAtTime(0.08, t + i * 0.1 + 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.1 + 0.5);
      osc.connect(g);
      osc.start(t + i * 0.1);
      osc.stop(t + i * 0.1 + 0.5);
    });
  }

  /* -------------------------------------------------------
     6. SCROLL TICK - subtle tick on scroll progress
     ------------------------------------------------------- */
  var lastScrollTick = 0;
  function playScrollTick() {
    if (!isEnabled || !audioCtx) return;
    var n = Date.now();
    if (n - lastScrollTick < 150) return; // throttle
    lastScrollTick = n;

    var t = now();
    var freq = 2000 + Math.random() * 1000;
    var osc = audioCtx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;
    var g = makeGain(0.02);
    g.gain.setValueAtTime(0.02, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
    osc.connect(g);
    osc.start(t);
    osc.stop(t + 0.03);
  }

  /* -------------------------------------------------------
     7. TOGGLE ON/OFF - distinctive toggle sounds
     ------------------------------------------------------- */
  function playToggleOn() {
    if (!audioCtx) return;
    var t = now();
    // Rising two-tone
    [440, 660].forEach(function (freq, i) {
      var osc = audioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      var g = makeGain(0);
      g.gain.setValueAtTime(0, t + i * 0.08);
      g.gain.linearRampToValueAtTime(0.15, t + i * 0.08 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.15);
      osc.connect(g);
      osc.start(t + i * 0.08);
      osc.stop(t + i * 0.08 + 0.15);
    });
  }

  function playToggleOff() {
    if (!audioCtx) return;
    var t = now();
    // Falling two-tone
    [660, 440].forEach(function (freq, i) {
      var osc = audioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      var g = makeGain(0);
      g.gain.setValueAtTime(0, t + i * 0.08);
      g.gain.linearRampToValueAtTime(0.12, t + i * 0.08 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.12);
      osc.connect(g);
      osc.start(t + i * 0.08);
      osc.stop(t + i * 0.08 + 0.12);
    });
  }

  /* -------------------------------------------------------
     8. ERROR / FORM VALIDATION SOUND
     ------------------------------------------------------- */
  function playError() {
    if (!isEnabled || !audioCtx) return;
    var t = now();
    var osc = audioCtx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(200, t);
    osc.frequency.setValueAtTime(150, t + 0.1);
    var g = makeGain(0.08);
    g.gain.setValueAtTime(0.08, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.connect(g);
    osc.start(t);
    osc.stop(t + 0.2);
  }

  /* -------------------------------------------------------
     9. SUCCESS SOUND - form submit success
     ------------------------------------------------------- */
  function playSuccess() {
    if (!isEnabled || !audioCtx) return;
    var t = now();
    var notes = [523.25, 659.25, 783.99, 1046.5]; // C E G C
    notes.forEach(function (freq, i) {
      var osc = audioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      var g = makeGain(0);
      g.gain.setValueAtTime(0, t + i * 0.12);
      g.gain.linearRampToValueAtTime(0.1, t + i * 0.12 + 0.03);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.12 + 0.4);
      osc.connect(g);
      osc.start(t + i * 0.12);
      osc.stop(t + i * 0.12 + 0.4);
    });
  }

  /* -------------------------------------------------------
     10. AMBIENT PAD - evolving atmospheric drone
     ------------------------------------------------------- */
  var ambientNodes = null;

  function startAmbient() {
    if (!audioCtx || ambientNodes) return;

    // Chord: A2, E3, A3, C#4 (Amaj spread voicing)
    var freqs = [55, 82.41, 110, 138.59];
    var oscillators = [];
    var ambientGain = audioCtx.createGain();
    var filter = audioCtx.createBiquadFilter();
    var reverb = audioCtx.createConvolver();

    filter.type = 'lowpass';
    filter.frequency.value = 250;
    filter.Q.value = 0.7;

    // Create pseudo-reverb impulse
    var irLen = audioCtx.sampleRate * 2;
    var irBuf = audioCtx.createBuffer(2, irLen, audioCtx.sampleRate);
    for (var ch = 0; ch < 2; ch++) {
      var irData = irBuf.getChannelData(ch);
      for (var s = 0; s < irLen; s++) {
        irData[s] = (Math.random() * 2 - 1) * Math.pow(1 - s / irLen, 2.5);
      }
    }
    reverb.buffer = irBuf;

    // LFO for gentle movement
    var lfo = audioCtx.createOscillator();
    var lfoGain = audioCtx.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = 0.06;
    lfoGain.gain.value = 4;
    lfo.connect(lfoGain);

    // LFO2 for filter modulation
    var lfo2 = audioCtx.createOscillator();
    var lfo2Gain = audioCtx.createGain();
    lfo2.type = 'sine';
    lfo2.frequency.value = 0.03;
    lfo2Gain.gain.value = 60;
    lfo2.connect(lfo2Gain);
    lfo2Gain.connect(filter.frequency);

    freqs.forEach(function (freq, i) {
      var osc = audioCtx.createOscillator();
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.value = freq;
      if (i === 0) lfoGain.connect(osc.frequency);
      osc.connect(filter);
      osc.start();
      oscillators.push(osc);
    });

    filter.connect(ambientGain);

    // Dry + wet signal
    var dryGain = audioCtx.createGain();
    dryGain.gain.value = 0.7;
    var wetGain = audioCtx.createGain();
    wetGain.gain.value = 0.3;
    ambientGain.connect(dryGain);
    ambientGain.connect(reverb);
    reverb.connect(wetGain);
    dryGain.connect(masterGain);
    wetGain.connect(masterGain);

    // Fade in
    ambientGain.gain.setValueAtTime(0, now());
    ambientGain.gain.linearRampToValueAtTime(0.05, now() + 3);

    lfo.start();
    lfo2.start();

    ambientNodes = {
      oscillators: oscillators,
      lfo: lfo,
      lfo2: lfo2,
      gain: ambientGain
    };
  }

  function stopAmbient() {
    if (!ambientNodes || !audioCtx) return;
    var nodes = ambientNodes;
    ambientNodes = null;

    nodes.gain.gain.linearRampToValueAtTime(0, now() + 1.5);
    setTimeout(function () {
      try {
        nodes.oscillators.forEach(function (o) { o.stop(); });
        nodes.lfo.stop();
        nodes.lfo2.stop();
      } catch(e) {}
    }, 2000);
  }

  /* -------------------------------------------------------
     TOGGLE BUTTON
     ------------------------------------------------------- */
  soundToggle.addEventListener('click', function () {
    initAudio();
    if (!audioCtx) return;

    isEnabled = !isEnabled;
    soundToggle.classList.toggle('active', isEnabled);

    if (isEnabled) {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      playToggleOn();
      startAmbient();
    } else {
      playToggleOff();
      stopAmbient();
    }
  });

  /* -------------------------------------------------------
     ATTACH SOUNDS TO INTERACTIVE ELEMENTS
     ------------------------------------------------------- */
  var interactiveSelectors = 'a, button, .magnetic-btn, .filter-btn, .social-link, .nav-link, .project-link, .slide-dot, .project-card, .skill-tag, .timeline-card';
  qsa(interactiveSelectors).forEach(function (el) {
    el.addEventListener('mouseenter', playHover);
    el.addEventListener('click', playClick);
  });

  /* -------------------------------------------------------
     SLIDESHOW TRANSITION SOUNDS
     ------------------------------------------------------- */
  // Watch for slideshow transitions via MutationObserver
  var slideshowEl = qs('#aboutSlideshow');
  if (slideshowEl) {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.type === 'attributes' && m.attributeName === 'class') {
          var target = m.target;
          if (target.classList.contains('slide-img') && target.classList.contains('active')) {
            playWhoosh();
            setTimeout(playTransitionChime, 200);
          }
        }
      });
    });
    // Observe all slide images for class changes
    slideshowEl.querySelectorAll('.slide-img').forEach(function (slide) {
      observer.observe(slide, { attributes: true, attributeFilter: ['class'] });
    });
  }

  /* -------------------------------------------------------
     SCROLL SOUNDS
     ------------------------------------------------------- */
  var scrollRAF = null;
  window.addEventListener('scroll', function () {
    if (!isEnabled) return;
    if (scrollRAF) return;
    scrollRAF = requestAnimationFrame(function () {
      playScrollTick();
      scrollRAF = null;
    });
  }, { passive: true });

  /* -------------------------------------------------------
     SECTION ENTER SOUNDS (via IntersectionObserver)
     ------------------------------------------------------- */
  var sections = qsa('section[id]');
  if (sections.length && typeof IntersectionObserver !== 'undefined') {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          playSectionEnter();
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(function (sec) {
      sectionObserver.observe(sec);
    });
  }

  /* -------------------------------------------------------
     EXPOSE GLOBALLY for form.js integration
     ------------------------------------------------------- */
  window.SoundFX = {
    click: playClick,
    hover: playHover,
    whoosh: playWhoosh,
    chime: playTransitionChime,
    sectionEnter: playSectionEnter,
    error: playError,
    success: playSuccess
  };
});
