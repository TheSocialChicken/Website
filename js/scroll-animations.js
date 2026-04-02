/**
 * SOCIALCHICKEN: SCROLL REVEAL ANIMATIONS
 * Uses IntersectionObserver to trigger .reveal classes.
 * No dependencies. Respects prefers-reduced-motion.
 */

(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Make all reveal elements visible immediately
    document.querySelectorAll('.reveal, .reveal--left, .reveal--right').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  function observeAll() {
    document.querySelectorAll('.reveal, .reveal--left, .reveal--right').forEach(el => {
      observer.observe(el);
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeAll);
  } else {
    observeAll();
  }

})();
