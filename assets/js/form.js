/* ============================================================
   FORM — Contact Form Handling (no animation code)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var contactForm = qs('#contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var btn = contactForm.querySelector('.btn-submit');
    if (!btn) return;

    var btnSpan = btn.querySelector('span');
    if (!btnSpan) return;

    var originalText = btnSpan.textContent;
    btnSpan.textContent = 'Sending...';
    btn.style.pointerEvents = 'none';

    setTimeout(function () {
      btnSpan.textContent = 'Sent! \u2713';
      btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';

      // Delegate animation to utils helper
      animateButtonSuccess(btn);

      setTimeout(function () {
        btnSpan.textContent = originalText;
        btn.style.background = '';
        btn.style.pointerEvents = '';
        contactForm.reset();
      }, 2500);
    }, 1500);
  });
});
