# PRD — 6 Days Kashmir Super Deluxe Landing Page (Discover Daze Holidays)

## Problem Statement
High-converting, luxury Google/Meta Ads landing page for the "6 Days Kashmir Super Deluxe Package". Single goal: maximize WhatsApp + phone call inquiries. Dedicated route, does NOT touch existing homepage. Luxury palette (White, Gold #D4AF37, Deep Navy #0A192F, Soft Black #111). Glassmorphism, framer-motion, Lenis smooth scroll. Awwwards-level craft.

## Architecture
- Frontend: React (CRA/craco), Tailwind, framer-motion, lenis, react-fast-marquee, shadcn/ui.
- Route: `/kashmir-super-deluxe` (homepage `/` untouched).
- Backend: FastAPI + MongoDB. `POST /api/leads` (save lead + async Resend email), `GET /api/leads`.
- Email: Resend (onboarding@resend.dev → discoverdazeholidays@gmail.com), subject "New Lead – Discover Daze Holidays".

## Core Requirements (static)
- Attention bar + evergreen daily countdown, cinematic hero video, floating WhatsApp+Call, trust bar, highlights bento, vertical itinerary timeline, what's included, pricing cards (Best Value), why-us, animated reviews marquee, urgency, lead form, FAQ, contact.
- All WhatsApp CTAs → wa.me/917006186445. Phone → +917006186445.

## Implemented (2025-12)
- Full landing page with 13 sections, all CTAs wired, floating buttons.
- Lead form: saves to Mongo `leads`, sends Resend email, opens WhatsApp prefilled; "Call Now" also saves lead then dials.
- Verified: curl + UI submit → lead persisted + email id returned by Resend. Screenshots confirm hero, highlights, itinerary, pricing, lead form.

## Backlog / Next
- P1: Verify a custom domain in Resend for guaranteed deliverability + higher quota (free/test mode caps ~monthly quota and delivers reliably only to account owner).
- P1: Simple `/leads` admin view (protected) to browse inquiries.
- P2: Meta Pixel / Google Ads conversion tracking on CTA clicks + form submit.
- P2: Replace stock hero video with client's own drone footage.
- P2: Deploy to Vercel (user requested — front the FastAPI backend appropriately).

## Redesign v2 (2025-12) — Conversion-focused
- Image parallax hero (HeroV2, /images/kashmir-hero.jpg, no video) with new headline "6 Days Kashmir Super Deluxe — Flat 30% OFF".
- FOMO: FomoBanner ("30% OFF Ends Soon" + daily countdown), LiveActivity (viewers + families booked), urgency chips, MobileCTABar (fixed bottom, mobile).
- Booking form now captures Name, Phone, Email, Travel Date, Travellers, Package, Message → saves to Mongo + Resend email (email+travel_date added) + WhatsApp prefilled + success toast.
- Testimonials with photos + 4.9 Google rating; 5 trust badges.
- Meta Pixel + Google Ads tracking wired via env placeholders (REACT_APP_META_PIXEL_ID, REACT_APP_GOOGLE_ADS_ID, REACT_APP_GOOGLE_ADS_CONVERSION_LABEL); trackLead on submit, trackContact on CTA clicks. Console-logs events until real IDs added.
- Verified via testing_agent iteration_3: backend 100%, frontend 100%. Fixed WA-redirect URIError (decodeURIComponent on '30% OFF').

## Fixes (2025-12) — Tracking + Lead submission + Mobile
- GA4 Measurement ID corrected to G-BBKY82CFQG (env REACT_APP_GA4_ID); page_view on load + form_submit/generate_lead on submit (verified via dataLayer + gtag/js request).
- Booking form error handling: on backend failure now shows 'Submission failed: <detail>' toast and does NOT open WhatsApp (no silent continue).
- MOBILE WhatsApp fix (RCA): window.open() after await lost user-activation on iOS Safari/Android Chrome → blocked. Fix: desktop pre-opens tab synchronously in click gesture then sets location; mobile uses window.location.href to the wa.me deep link. Verified via testing_agent iteration_4 (mobile navigates to wa.me, desktop opens tab).
- Backend verified healthy: /api/leads GET/POST 200, Resend emails sending (daily quota ~24/50), Mongo OK. 5 real customer leads preserved.

## Production 405 fix (2025-12) — Vercel routing
- Root cause: deployed frontend called its OWN domain (offers.discoverdazeholidays.com/api/leads) → Vercel static host returns 405 (no FastAPI there). Backend itself returns 200.
- Fix in repo: (1) frontend/vercel.json rewrites /api/:path* -> FastAPI backend + SPA fallback to /index.html; (2) BookingForm API base: use REACT_APP_BACKEND_URL if full http(s) URL else same-origin '/api' (works via the Vercel proxy, bypasses CORS); (3) backend CORS allow_origin_regex for *.discoverdazeholidays.com.
- Verified iteration_6: no regression. USER still must (a) deploy a stable backend URL (Emergent preview is not for prod) and set vercel.json destination to it, or set Vercel REACT_APP_BACKEND_URL to that backend; (b) redeploy frontend so vercel.json takes effect.
