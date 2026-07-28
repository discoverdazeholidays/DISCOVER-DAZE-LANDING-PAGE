import React from "react";
import { Star } from "lucide-react";
import { Reveal, SectionHeading } from "./shared";
import { TESTIMONIALS } from "./data";

const GoogleG = () => (
  <svg viewBox="0 0 48 48" className="h-6 w-6">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

export default function Testimonials() {
  return (
    <section className="bg-white px-5 py-24 sm:px-8 sm:py-32" data-testid="testimonials-section">
      <div className="mx-auto max-w-7xl">
        <SectionHeading chapter="06 —" overline="Social Proof" title="Loved by 2,000+ happy travelers" center />

        {/* Google rating badge */}
        <Reveal className="mx-auto mt-8 flex w-fit items-center gap-4 rounded-2xl border border-[#0A192F]/8 bg-[#FAFAFA] px-6 py-4">
          <GoogleG />
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl text-[#0A192F]">4.9</span>
              <div className="flex">{[...Array(5)].map((_, i) => (<Star key={i} className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />))}</div>
            </div>
            <p className="text-xs text-[#1A1A1A]/60">Based on 2,000+ Google reviews</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.06}
              className="flex flex-col rounded-3xl border border-[#0A192F]/8 bg-[#FAFAFA] p-6 transition-colors duration-500 hover:border-[#D4AF37]/40"
            >
              <div className="flex items-center gap-3">
                <img src={t.photo} alt={t.name} loading="lazy" className="h-12 w-12 rounded-full object-cover ring-2 ring-[#D4AF37]/40" />
                <div>
                  <p className="text-sm font-semibold text-[#0A192F]">{t.name}</p>
                  <p className="text-xs text-[#1A1A1A]/50">{t.city}</p>
                </div>
                <div className="ml-auto"><GoogleG /></div>
              </div>
              <div className="mt-4 flex">{[...Array(5)].map((_, j) => (<Star key={j} className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />))}</div>
              <p className="mt-3 font-body text-[15px] leading-relaxed text-[#1A1A1A]/80">"{t.text}"</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
