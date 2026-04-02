/**
 * SOCIALCHICKEN: NAVIGATION
 * Handles: scroll-aware shrink, mobile menu toggle, active link highlighting.
 */

(function () {
  'use strict';

  const nav          = document.getElementById('site-nav');
  const hamburger    = document.getElementById('nav-hamburger');
  const mobileMenu   = document.getElementById('mobile-menu');
  const mobileLinks  = document.querySelectorAll('.mobile-menu__link');

  if (!nav) return;

  // ---- Scroll-aware nav ----
  let lastScroll = 0;

  function onScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  // ---- Mobile menu ----
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', toggleMenu);

    // Close on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (
        mobileMenu.classList.contains('is-open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        closeMenu();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMenu();
        hamburger.focus();
      }
    });
  }

  function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  }

  function openMenu() {
    mobileMenu.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close navigation menu');
    document.body.style.overflow = 'hidden';

    // Trap focus
    const focusable = mobileMenu.querySelectorAll('a, button');
    if (focusable.length) focusable[0].focus();
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    document.body.style.overflow = '';
  }

  // ---- Active link highlighting ----
  function setActiveLink() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-menu__link, .mobile-menu__link').forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const isHome = (href === '/' || href === '/index.html' || href === './index.html');
      const isActive = isHome
        ? (path === '/' || path.endsWith('/index.html') || path.endsWith('/Website/'))
        : path.includes(href.replace('./', '').replace('.html', ''));
      link.classList.toggle('active', isActive);
    });
  }

  setActiveLink();

})();
