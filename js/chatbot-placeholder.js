/**
 * SOCIALCHICKEN: CHATBOT INTEGRATION POINT
 *
 * To activate:
 * 1. Set `enabled: true`
 * 2. Set your provider and credentials
 * 3. Uncomment the initialization block for your provider
 *
 * Recommended providers:
 * - Tidio (free tier): https://www.tidio.com
 * - Crisp (free tier): https://crisp.chat
 * - Intercom: https://www.intercom.com
 * - Custom LLM widget: replace the loader with your embed script
 *
 * The #chatbot-widget-container div is pre-styled in components.css
 */

window.ChatbotConfig = {
  enabled: false,
  provider: null,   // 'tidio' | 'crisp' | 'intercom' | 'custom'
  publicKey: null,  // Your provider's public key / site ID
};

(function () {
  'use strict';

  const cfg = window.ChatbotConfig;
  if (!cfg.enabled || !cfg.provider) return;

  // ---- TIDIO ----
  // if (cfg.provider === 'tidio') {
  //   var script = document.createElement('script');
  //   script.src = '//code.tidio.co/' + cfg.publicKey + '.js';
  //   script.async = true;
  //   document.body.appendChild(script);
  // }

  // ---- CRISP ----
  // if (cfg.provider === 'crisp') {
  //   window.$crisp = [];
  //   window.CRISP_WEBSITE_ID = cfg.publicKey;
  //   var script = document.createElement('script');
  //   script.src = 'https://client.crisp.chat/l.js';
  //   script.async = true;
  //   document.body.appendChild(script);
  // }

  // ---- INTERCOM ----
  // if (cfg.provider === 'intercom') {
  //   window.intercomSettings = { app_id: cfg.publicKey };
  //   var script = document.createElement('script');
  //   script.src = 'https://widget.intercom.io/widget/' + cfg.publicKey;
  //   script.async = true;
  //   document.body.appendChild(script);
  // }

})();
