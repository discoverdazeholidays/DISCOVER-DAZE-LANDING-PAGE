// Google Analytics 4 (GA4) + Meta Pixel + Google Ads conversion tracking.
// Wired via env vars in frontend/.env:
//   REACT_APP_GA4_ID, REACT_APP_META_PIXEL_ID, REACT_APP_GOOGLE_ADS_ID, REACT_APP_GOOGLE_ADS_CONVERSION_LABEL

const GA4_ID = process.env.REACT_APP_GA4_ID;
const META_PIXEL_ID = process.env.REACT_APP_META_PIXEL_ID;
const GOOGLE_ADS_ID = process.env.REACT_APP_GOOGLE_ADS_ID;
const GOOGLE_ADS_LABEL = process.env.REACT_APP_GOOGLE_ADS_CONVERSION_LABEL;

const isReal = (v) => v && !/^YOUR_|^AW-XXXX/.test(v);

let initialised = false;

// Load the shared gtag.js library once (used by GA4 + Google Ads).
function ensureGtag(primaryId) {
  if (window.gtag) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${primaryId}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
}

export function initTracking() {
  if (initialised || typeof window === "undefined") return;
  initialised = true;

  // ---- Meta Pixel ----
  if (isReal(META_PIXEL_ID)) {
    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
    window.fbq("init", META_PIXEL_ID);
    window.fbq("track", "PageView");
  }

  // ---- gtag (GA4 + Google Ads share the same library) ----
  const primaryId = isReal(GA4_ID) ? GA4_ID : (isReal(GOOGLE_ADS_ID) ? GOOGLE_ADS_ID : null);
  if (primaryId) ensureGtag(primaryId);

  // GA4: config auto-sends the initial page_view
  if (isReal(GA4_ID) && window.gtag) {
    window.gtag("config", GA4_ID);
    // eslint-disable-next-line no-console
    console.log("[track] GA4 page_view", GA4_ID);
  }

  // Google Ads config
  if (isReal(GOOGLE_ADS_ID) && window.gtag) {
    window.gtag("config", GOOGLE_ADS_ID);
  }
}

// Fire a lead / form-submission event across GA4, Meta Pixel and Google Ads.
export function trackLead(payload = {}) {
  try {
    if (isReal(META_PIXEL_ID) && window.fbq) {
      window.fbq("track", "Lead", payload);
    }
    if (window.gtag) {
      // GA4 form-submission events
      if (isReal(GA4_ID)) {
        window.gtag("event", "form_submit", { send_to: GA4_ID, ...payload });
        window.gtag("event", "generate_lead", { send_to: GA4_ID, ...payload });
      }
      // Google Ads conversion
      if (isReal(GOOGLE_ADS_ID)) {
        const conv = isReal(GOOGLE_ADS_LABEL)
          ? `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LABEL}`
          : GOOGLE_ADS_ID;
        window.gtag("event", "conversion", { send_to: conv, ...payload });
      }
    }
    // Always log so the event is observable even with placeholder IDs
    // eslint-disable-next-line no-console
    console.log("[track] Lead conversion", payload);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn("tracking error", e);
  }
}

// Track a CTA click (WhatsApp / Call) as a soft conversion signal.
export function trackContact(channel) {
  try {
    if (isReal(META_PIXEL_ID) && window.fbq) window.fbq("track", "Contact", { channel });
    if (window.gtag) {
      if (isReal(GA4_ID)) window.gtag("event", "contact", { send_to: GA4_ID, channel });
      if (isReal(GOOGLE_ADS_ID)) window.gtag("event", "contact", { channel });
    }
    // eslint-disable-next-line no-console
    console.log("[track] Contact", channel);
  } catch (e) {}
}
