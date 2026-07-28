// Meta Pixel + Google Ads conversion tracking.
// Fully wired via env vars. Stays inert until real IDs are provided in frontend/.env:
//   REACT_APP_META_PIXEL_ID, REACT_APP_GOOGLE_ADS_ID, REACT_APP_GOOGLE_ADS_CONVERSION_LABEL

const META_PIXEL_ID = process.env.REACT_APP_META_PIXEL_ID;
const GOOGLE_ADS_ID = process.env.REACT_APP_GOOGLE_ADS_ID;
const GOOGLE_ADS_LABEL = process.env.REACT_APP_GOOGLE_ADS_CONVERSION_LABEL;

const isReal = (v) => v && !/^YOUR_|^AW-XXXX/.test(v);

let initialised = false;

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

  // ---- Google Ads / gtag ----
  if (isReal(GOOGLE_ADS_ID)) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GOOGLE_ADS_ID);
  }
}

// Fire a lead / conversion event across both platforms.
export function trackLead(payload = {}) {
  try {
    if (isReal(META_PIXEL_ID) && window.fbq) {
      window.fbq("track", "Lead", payload);
    }
    if (isReal(GOOGLE_ADS_ID) && window.gtag) {
      const conv = isReal(GOOGLE_ADS_LABEL)
        ? `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LABEL}`
        : GOOGLE_ADS_ID;
      window.gtag("event", "conversion", { send_to: conv, ...payload });
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
    if (isReal(GOOGLE_ADS_ID) && window.gtag) window.gtag("event", "contact", { channel });
    // eslint-disable-next-line no-console
    console.log("[track] Contact", channel);
  } catch (e) {}
}
