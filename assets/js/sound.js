/* ============================================================
   SOUND — Subtle UI Sound Design (Web Audio API)
   Muted by default. User toggles via sound button.
   Respects prefers-reduced-motion.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var soundToggle = qs('#soundToggle');
  if (!soundToggle) return;

  // Respect reduced motion preference
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var audioCtx = null;
  var isEnabled = false;
  var masterGain = null;

  function initAudio() {
    if (audioCtx) return;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = audioCtx.createGain();
      masterGain.gain.value = 0.12;
      masterGain.connect(audioCtx.destination);
    } catch(e) {
      /* Web Audio API not supported */
    }
  }

  // ── Synthetic UI Click Sound ──
  function playClick() {
    if (!isEnabled || !audioCtx) return;

    var osc = audioCtx.createOscillator();
    var gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.1);
  }

  // ── Subtle Hover Sound ──
  function playHover() {
    if (!isEnabled || !audioCtx) return;

    var osc = audioCtx.createOscillator();
    var gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1400, audioCtx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.06);
  }

  // ── Ambient Drone (toggleable) ──
  var ambientNodes = null;

  function startAmbient() {
    if (!audioCtx || ambientNodes) return;

    var osc1 = audioCtx.createOscillator();
    var osc2 = audioCtx.createOscillator();
    var gain = audioCtx.createGain();
    var filter = audioCtx.createBiquadFilter();
    var lfo = audioCtx.createOscillator();
    var lfoGain = audioCtx.createGain();

    osc1.type = 'sine';
    osc1.frequency.value = 55;  // Low A
    osc2.type = 'sine';
    osc2.frequency.value = 82.41; // Low E

    filter.type = 'lowpass';
    filter.frequency.value = 200;
    filter.Q.value = 1;

    // LFO for subtle frequency wobble
    lfo.type = 'sine';
    lfo.frequency.value = 0.08;
    lfoGain.gain.value = 3;
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    // Fade in over 2 seconds
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 2);

    osc1.start();
    osc2.start();
    lfo.start();

    ambientNodes = { osc1: osc1, osc2: osc2, lfo: lfo, gain: gain };
  }

  function stopAmbient() {
    if (!ambientNodes || !audioCtx) return;

    var nodes = ambientNodes;
    ambientNodes = null;

    // Fade out over 1 second
    nodes.gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1);

    setTimeout(function () {
      try { nodes.osc1.stop(); } catch(e) {}
      try { nodes.osc2.stop(); } catch(e) {}
      try { nodes.lfo.stop(); } catch(e) {}
    }, 1200);
  }

  // ── Toggle Button ──
  soundToggle.addEventListener('click', function () {
    initAudio();
    if (!audioCtx) return;

    isEnabled = !isEnabled;
    soundToggle.classList.toggle('active', isEnabled);

    if (isEnabled) {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      startAmbient();
    } else {
      stopAmbient();
    }
  });

  // ── Attach hover/click sounds to interactive elements ──
  var interactiveSelectors = 'a, button, .magnetic-btn, .filter-btn, .social-link, .nav-link, .project-link, .slide-dot';
  qsa(interactiveSelectors).forEach(function (el) {
    el.addEventListener('mouseenter', playHover);
    el.addEventListener('click', playClick);
  });
});
