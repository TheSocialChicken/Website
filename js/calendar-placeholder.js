/**
 * SOCIALCHICKEN: CALENDAR / BOOKING INTEGRATION POINT
 *
 * To activate:
 * 1. Set `enabled: true`
 * 2. Set your provider and booking URL
 * 3. All buttons with data-booking-trigger="true" will automatically open the modal
 *
 * Recommended providers:
 * - Calendly (easiest):  https://calendly.com
 * - Cal.com (open source, self-hostable): https://cal.com
 * - TidyCal (one-time fee): https://tidycal.com
 *
 * The #calendar-embed-container div on contact.html is ready for inline embeds.
 */

window.BookingConfig = {
  enabled: false,
  provider: null,         // 'calendly' | 'calcom' | 'tidycal'
  bookingUrl: null,       // e.g. 'https://calendly.com/your-name/30min'
  embedType: 'popup',     // 'popup' | 'inline'
  inlineContainerId: 'calendar-embed-container',
};

(function () {
  'use strict';

  const cfg = window.BookingConfig;

  // ---- Wire up all booking trigger buttons ----
  document.addEventListener('DOMContentLoaded', () => {
    const triggers = document.querySelectorAll('[data-booking-trigger="true"]');

    triggers.forEach(btn => {
      btn.addEventListener('click', openBooking);
    });

    // Inline embed on contact page
    if (cfg.enabled && cfg.embedType === 'inline') {
      initInlineEmbed();
    }
  });

  function openBooking(e) {
    e.preventDefault();

    if (!cfg.enabled || !cfg.bookingUrl) {
      // Fallback: scroll to contact form
      const contact = document.getElementById('contact-form');
      if (contact) {
        contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.location.href = './contact.html';
      }
      return;
    }

    // ---- CALENDLY POPUP ----
    // if (cfg.provider === 'calendly' && window.Calendly) {
    //   window.Calendly.initPopupWidget({ url: cfg.bookingUrl });
    // }

    // ---- CAL.COM POPUP ----
    // if (cfg.provider === 'calcom' && window.Cal) {
    //   window.Cal('ui', { styles: { branding: { brandColor: '#FF6A13' } } });
    //   window.Cal('openModal', { calLink: cfg.bookingUrl });
    // }

    // Generic fallback: open in new tab
    window.open(cfg.bookingUrl, '_blank', 'noopener,noreferrer');
  }

  function initInlineEmbed() {
    const container = document.getElementById(cfg.inlineContainerId);
    if (!container) return;

    // Remove placeholder text
    container.innerHTML = '';

    // ---- CALENDLY INLINE ----
    // if (cfg.provider === 'calendly') {
    //   container.innerHTML = `<div class="calendly-inline-widget"
    //     data-url="${cfg.bookingUrl}"
    //     style="min-width:320px;height:630px;"></div>`;
    //   var script = document.createElement('script');
    //   script.src = 'https://assets.calendly.com/assets/external/widget.js';
    //   script.async = true;
    //   document.body.appendChild(script);
    // }
  }

})();
