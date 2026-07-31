// Google Analytics 4 (GA4) + Meta Pixel + Google Ads conversion tracking.
// Wired via env vars in frontend/.env:
//   REACT_APP_GA4_ID, REACT_APP_META_PIXEL_ID, REACT_APP_GOOGLE_ADS_ID, REACT_APP_GOOGLE_ADS_CONVERSION_LABEL

const GA4_ID = process.env.REACT_APP_GA4_ID;
const META_PIXEL_ID = process.env.REACT_APP_META_PIXEL_ID;
const GOOGLE_ADS_ID = process.env.REACT_APP_GOOGLE_ADS_ID;
const GOOGLE_ADS_LABEL = process.env.REACT_APP_GOOGLE_ADS_CONVERSION_LABEL;

const isReal = (v) => v && !/^YOUR_|^AW-XXXX/.test(v);

let initialised = false;
let generateLeadFired = false; // ensures the GA4 generate_lead conversion fires exactly once

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

// Fire the GA4 "form_submit" conversion (plus generate_lead once, Meta Lead and Google Ads
// conversion) RELIABLY, then run onDone(). onDone is used to delay the WhatsApp redirect until
// the GA4 beacon has actually been sent (gtag event_callback), with a fallback timeout so the
// user is never blocked for more than ~1.2s. Call this ONLY after a successful form submission.
export function trackFormSubmit(payload = {}, onDone = () => {}) {
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    try { onDone(); } catch (e) {}
  };

  try {
    // Meta Pixel (best-effort, no callback dependency)
    if (isReal(META_PIXEL_ID) && window.fbq) window.fbq("track", "Lead", payload);

    // Google Ads conversion (best-effort)
    if (window.gtag && isReal(GOOGLE_ADS_ID)) {
      const conv = isReal(GOOGLE_ADS_LABEL)
        ? `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LABEL}`
        : GOOGLE_ADS_ID;
      window.gtag("event", "conversion", { send_to: conv, ...payload });
    }

    if (window.gtag && isReal(GA4_ID)) {
      // generate_lead — secondary event, fire once per session
      if (!generateLeadFired) {
        window.gtag("event", "generate_lead", { send_to: GA4_ID, ...payload });
        generateLeadFired = true;
        // eslint-disable-next-line no-console
        console.log("[track] GA4 generate_lead (once)", GA4_ID);
      }
      // form_submit — the Google Ads conversion event. Redirect waits for its callback.
      window.gtag("event", "form_submit", {
        send_to: GA4_ID,
        ...payload,
        event_callback: finish,
      });
      // eslint-disable-next-line no-console
      console.log("[track] GA4 form_submit sent", GA4_ID);
      // Fallback: never block the user longer than ~1.2s if the callback doesn't fire
      setTimeout(finish, 1200);
      return;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn("tracking error", e);
  }
  // GA4/gtag not available -> proceed immediately so we never block the redirect
  finish();
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
