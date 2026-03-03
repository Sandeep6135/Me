/* ============================================================
   CURSOR — Context-Aware Cursor with Trail, Morphing & Magnetics
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var cursorCanvas = qs('#cursorCanvas');
  if (!cursorCanvas || isTouchDevice) return;

  var ctx = cursorCanvas.getContext('2d');

  function resize() {
    cursorCanvas.width = window.innerWidth;
    cursorCanvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // ── Cursor State ──
  var cursor = {
    x: window.innerWidth / 2, y: window.innerHeight / 2,
    vx: 0, vy: 0,
    scale: 1, targetScale: 1,
    radius: 16, baseRadius: 16,
    dotX: window.innerWidth / 2, dotY: window.innerHeight / 2,
    label: '', labelOpacity: 0,
    state: 'default',
  };

  var SPRING = 0.12;
  var DAMPING = 0.72;
  var DOT_EASE = 0.25;
  var hue = 260;
  var clickFlash = 0;
  var isClicking = false;
  var isHovering = false;
  var hoverTarget = null;

  // ── Trail System — physics-damped following points ──
  var TRAIL_COUNT = 8;
  var trail = [];
  for (var i = 0; i < TRAIL_COUNT; i++) {
    trail.push({
      x: cursor.x, y: cursor.y,
      vx: 0, vy: 0,
      size: Math.max(1.5, 5 - i * 0.45),
      opacity: Math.max(0.03, 0.22 - i * 0.025),
      spring: Math.max(0.015, 0.1 - i * 0.01),
      damping: 0.7 + i * 0.025,
    });
  }

  // ── Sparkles ──
  var SPARKLE_COUNT = 6;
  var sparkles = [];
  for (var s = 0; s < SPARKLE_COUNT; s++) {
    sparkles.push({
      angle: (Math.PI * 2 / SPARKLE_COUNT) * s,
      speed: 0.008 + Math.random() * 0.012,
      distance: 0, targetDistance: 0,
      size: 1 + Math.random() * 1.5,
      hueOffset: s * 40, opacity: 0,
    });
  }

  // ── Input Events ──
  document.addEventListener('mousedown', function () {
    isClicking = true;
    clickFlash = 1;
    cursor.targetScale = 0.6;
  });

  document.addEventListener('mouseup', function () {
    isClicking = false;
    cursor.targetScale = isHovering ? 1.8 : 1;
  });

  // ── Context-Aware Hover Detection ──
  function setupCursorHovers() {
    // Standard interactive elements
    var hoverEls = 'a, button, .magnetic-btn, .filter-btn, .social-link, .skill-category, .contact-item, .slide-dot, .sound-toggle';
    qsa(hoverEls).forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        isHovering = true;
        hoverTarget = el;
        cursor.targetScale = 1.8;
        cursor.state = 'hover';
      });
      el.addEventListener('mouseleave', function () {
        isHovering = false;
        hoverTarget = null;
        cursor.targetScale = 1;
        cursor.state = 'default';
        cursor.label = '';
      });
    });

    // Project cards — "VIEW" cursor label
    qsa('.project-card').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.label = 'VIEW';
        cursor.targetScale = 2.5;
        cursor.state = 'view';
      });
    });

    // About slideshow — "DRAG" cursor label
    qsa('.about-slideshow').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        isHovering = true;
        cursor.label = 'DRAG';
        cursor.targetScale = 2.2;
        cursor.state = 'view';
      });
      el.addEventListener('mouseleave', function () {
        isHovering = false;
        cursor.targetScale = 1;
        cursor.state = 'default';
        cursor.label = '';
      });
    });
  }

  setupCursorHovers();

  // ── Magnetic Pull toward interactive elements ──
  qsa('.magnetic-btn').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect();
      var bx = rect.left + rect.width / 2;
      var by = rect.top + rect.height / 2;
      var dx = e.clientX - bx;
      var dy = e.clientY - by;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var maxDist = Math.max(rect.width, rect.height);
      // Subtle magnetic pull on the cursor ring
      if (dist < maxDist) {
        var pull = 1 - (dist / maxDist);
        cursor.x += (bx - cursor.x) * pull * 0.03;
        cursor.y += (by - cursor.y) * pull * 0.03;
      }
    });
  });

  // ── Trail Physics Update ──
  function updateTrail() {
    for (var i = 0; i < trail.length; i++) {
      var t = trail[i];
      var targetX = i === 0 ? cursor.x : trail[i - 1].x;
      var targetY = i === 0 ? cursor.y : trail[i - 1].y;
      var dx = targetX - t.x;
      var dy = targetY - t.y;
      t.vx += dx * t.spring;
      t.vy += dy * t.spring;
      t.vx *= t.damping;
      t.vy *= t.damping;
      t.x += t.vx;
      t.y += t.vy;
    }
  }

  // ── Main Render Loop ──
  function drawCursor() {
    ctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);

    // Spring physics
    var dx = mouseX - cursor.x;
    var dy = mouseY - cursor.y;
    cursor.vx += dx * SPRING;
    cursor.vy += dy * SPRING;
    cursor.vx *= DAMPING;
    cursor.vy *= DAMPING;
    cursor.x += cursor.vx;
    cursor.y += cursor.vy;
    cursor.dotX += (mouseX - cursor.dotX) * DOT_EASE;
    cursor.dotY += (mouseY - cursor.dotY) * DOT_EASE;

    // Velocity-based values
    var speed = Math.sqrt(cursor.vx * cursor.vx + cursor.vy * cursor.vy);
    var angle = Math.atan2(cursor.vy, cursor.vx);
    var stretch = Math.min(speed * 0.06, 0.5);
    cursor.scale += (cursor.targetScale - cursor.scale) * 0.1;
    hue = (hue + 0.15) % 360;
    if (clickFlash > 0) clickFlash *= 0.88;

    // Label opacity interpolation
    var targetLabelOpacity = cursor.label ? 1 : 0;
    cursor.labelOpacity += (targetLabelOpacity - cursor.labelOpacity) * 0.1;

    updateTrail();

    // ── Draw trail ──
    for (var i = trail.length - 1; i >= 0; i--) {
      var t = trail[i];
      ctx.beginPath();
      ctx.arc(t.x, t.y, t.size * cursor.scale, 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(' + ((hue + i * 15) % 360) + ', 70%, 65%, ' + (t.opacity * cursor.scale) + ')';
      ctx.fill();
    }

    var r = cursor.baseRadius * cursor.scale;

    // ── Draw glow ──
    ctx.save();
    ctx.translate(cursor.x, cursor.y);
    ctx.rotate(angle);

    var glowR = r * 2.5;
    var glow = ctx.createRadialGradient(0, 0, r * 0.5, 0, 0, glowR);
    glow.addColorStop(0, 'hsla(' + hue + ', 80%, 60%, ' + (0.06 + clickFlash * 0.15) + ')');
    glow.addColorStop(0.5, 'hsla(' + ((hue + 40) % 360) + ', 70%, 50%, ' + (0.02 + clickFlash * 0.06) + ')');
    glow.addColorStop(1, 'hsla(0, 0%, 0%, 0)');
    ctx.beginPath();
    ctx.arc(0, 0, glowR, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();

    // ── Velocity-based distortion ──
    var sx = 1 + stretch;
    var sy = 1 - stretch * 0.4;
    ctx.scale(sx, sy);

    // ── Main ring ──
    var ringAlpha = isHovering ? 0.7 : 0.55;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'hsla(' + hue + ', 75%, 70%, ' + ringAlpha + ')';
    ctx.lineWidth = isHovering ? 2 : 1.5;
    ctx.stroke();

    // ── Outer ring ──
    ctx.beginPath();
    ctx.arc(0, 0, r + 3, 0, Math.PI * 2);
    ctx.strokeStyle = 'hsla(' + ((hue + 60) % 360) + ', 70%, 65%, ' + (ringAlpha * 0.25) + ')';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    ctx.restore();

    // ── Context label (VIEW / DRAG) ──
    if (cursor.labelOpacity > 0.01) {
      ctx.save();
      ctx.globalAlpha = cursor.labelOpacity;
      ctx.font = '600 10px "Space Grotesk", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'hsla(' + hue + ', 70%, 85%, 0.9)';
      ctx.fillText(cursor.label, cursor.x, cursor.y);
      ctx.restore();
    }

    // ── Sparkles ──
    sparkles.forEach(function (sp) {
      sp.angle += sp.speed;
      sp.targetDistance = isHovering ? r * cursor.scale + 6 : r * cursor.scale - 2;
      sp.distance += (sp.targetDistance - sp.distance) * 0.08;
      sp.opacity += ((isHovering ? 0.7 : 0.35) - sp.opacity) * 0.05;
      var spx = cursor.x + Math.cos(sp.angle) * sp.distance;
      var spy = cursor.y + Math.sin(sp.angle) * sp.distance;
      ctx.beginPath();
      ctx.arc(spx, spy, sp.size * cursor.scale, 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(' + ((hue + sp.hueOffset) % 360) + ', 80%, 70%, ' + sp.opacity + ')';
      ctx.fill();
    });

    // ── Center dot ──
    var dotSize = isClicking ? 2 : 3;
    ctx.beginPath();
    ctx.arc(cursor.dotX, cursor.dotY, dotSize, 0, Math.PI * 2);
    ctx.fillStyle = 'hsla(' + hue + ', 70%, 85%, 0.9)';
    ctx.fill();

    // ── Click flash ring ──
    if (clickFlash > 0.01) {
      ctx.beginPath();
      ctx.arc(cursor.x, cursor.y, r * (1 + (1 - clickFlash) * 2), 0, Math.PI * 2);
      ctx.strokeStyle = 'hsla(' + hue + ', 80%, 75%, ' + (clickFlash * 0.6) + ')';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    requestAnimationFrame(drawCursor);
  }

  drawCursor();
});
