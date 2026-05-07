/**
 * SOCIALCHICKEN: SPLASH SCREEN
 * Network formation animation: nodes connect and converge into the logo.
 * Skipped on repeat visits (sessionStorage) and respects prefers-reduced-motion.
 */

(function () {
  'use strict';

  const SPLASH_KEY = 'sc_splash_seen';

  const splash  = document.getElementById('splash-screen');
  const main    = document.getElementById('main-content');
  const canvas  = document.getElementById('splash-canvas');
  const logoMark = document.getElementById('splash-logo-mark');
  const tagline  = document.getElementById('splash-tagline');
  const skipBtn  = document.getElementById('skip-intro');
  const progress = document.getElementById('splash-progress');

  if (!splash || !main) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Skip if already seen ----
  if (sessionStorage.getItem(SPLASH_KEY) || prefersReduced) {
    splash.style.display = 'none';
    main.style.opacity = '1';
    main.classList.add('is-visible');
    return;
  }

  sessionStorage.setItem(SPLASH_KEY, '1');

  // ---- Skip button ----
  if (skipBtn) {
    skipBtn.addEventListener('click', exitSplash);
    skipBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') exitSplash();
    });
  }

  // ---- Canvas setup ----
  const ctx = canvas.getContext('2d');
  let W, H, animId;
  let nodes = [];
  let phase = 'scatter'; // scatter → connect → converge → hold
  let phaseTime = 0;

  const PHASES = {
    scatter:  700,
    connect:  900,
    converge: 900,
    hold:     400,
  };

  const TOTAL_DURATION =
    PHASES.scatter + PHASES.connect + PHASES.converge + PHASES.hold;

  const NODE_COUNT = 70;
  const MAX_DIST   = 160;
  const CENTER_PULL_MAX = 0.05;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  function initNodes() {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x:  randomBetween(0, W),
      y:  randomBetween(0, H),
      vx: randomBetween(-0.4, 0.4),
      vy: randomBetween(-0.4, 0.4),
      r:  randomBetween(1.5, 3.5),
      alpha: randomBetween(0.3, 0.9),
    }));
  }

  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  let startTime = null;
  let elapsed   = 0;

  function tick(timestamp) {
    if (!startTime) startTime = timestamp;
    elapsed = timestamp - startTime;

    // Update progress bar
    if (progress) {
      const pct = Math.min(elapsed / TOTAL_DURATION, 1) * 100;
      progress.style.width = pct + '%';
    }

    ctx.clearRect(0, 0, W, H);

    // Determine phase blend factor
    let convergeT = 0;
    if (elapsed > PHASES.scatter + PHASES.connect) {
      const t = (elapsed - PHASES.scatter - PHASES.connect) / PHASES.converge;
      convergeT = Math.min(easeInOut(t), 1);
    }

    const cx = W / 2;
    const cy = H / 2;

    // Move nodes
    nodes.forEach(n => {
      // Drift
      n.x += n.vx;
      n.y += n.vy;

      // Pull toward center during converge phase
      if (convergeT > 0) {
        const pull = convergeT * CENTER_PULL_MAX;
        n.vx += (cx - n.x) * pull;
        n.vy += (cy - n.y) * pull;
        // Damping
        n.vx *= 0.96;
        n.vy *= 0.96;
      }

      // Wrap edges in scatter phase, not in converge
      if (convergeT < 0.3) {
        if (n.x < -10) n.x = W + 10;
        if (n.x > W + 10) n.x = -10;
        if (n.y < -10) n.y = H + 10;
        if (n.y > H + 10) n.y = -10;
      }
    });

    // Draw connections
    const connectAlpha = elapsed > PHASES.scatter
      ? Math.min((elapsed - PHASES.scatter) / PHASES.connect, 1)
      : 0;

    if (connectAlpha > 0) {
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach(b => {
          const dx   = a.x - b.x;
          const dy   = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const lineAlpha = (1 - dist / MAX_DIST) * connectAlpha * 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255, 106, 19, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });
    }

    // Draw nodes
    nodes.forEach(n => {
      const alpha = n.alpha * (1 - convergeT * 0.4);
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
    });

    // Logo mark fade in
    if (elapsed > PHASES.scatter + PHASES.connect && logoMark) {
      const t = Math.min((elapsed - PHASES.scatter - PHASES.connect) / PHASES.converge, 1);
      logoMark.style.opacity = easeInOut(t);
      logoMark.style.transform = `scale(${0.85 + easeInOut(t) * 0.15})`;
    }

    // Tagline words fade in
    if (elapsed > PHASES.scatter + PHASES.connect + PHASES.converge * 0.6 && tagline) {
      const words = tagline.querySelectorAll('.word');
      const baseDelay = PHASES.scatter + PHASES.connect + PHASES.converge * 0.6;
      tagline.style.opacity = '1';
      words.forEach((w, i) => {
        const wordStart = baseDelay + i * 120;
        const wordT = Math.min((elapsed - wordStart) / 300, 1);
        if (wordT >= 0) {
          w.style.opacity = easeInOut(Math.max(wordT, 0));
          w.style.transform = `translateY(${(1 - easeInOut(Math.max(wordT, 0))) * 16}px)`;
        }
      });
    }

    // Trigger exit
    if (elapsed >= TOTAL_DURATION) {
      cancelAnimationFrame(animId);
      exitSplash();
      return;
    }

    animId = requestAnimationFrame(tick);
  }

  function exitSplash() {
    if (animId) cancelAnimationFrame(animId);

    splash.classList.add('splash-exit');

    splash.addEventListener('animationend', () => {
      splash.style.display = 'none';
      splash.setAttribute('aria-hidden', 'true');
    }, { once: true });

    // Fade in main content
    main.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1)';
    main.style.opacity = '1';
    main.classList.add('is-visible');

    // Move focus to main content
    setTimeout(() => {
      const firstHeading = main.querySelector('h1, [tabindex="-1"]');
      if (firstHeading) firstHeading.focus();
    }, 700);
  }

  // ---- Init ----
  window.addEventListener('resize', () => { resize(); initNodes(); });
  resize();
  initNodes();
  animId = requestAnimationFrame(tick);

  // Fail-safe: force exit after 5s regardless
  setTimeout(exitSplash, 5000);

})();
