import React from "react";
import { Check } from "lucide-react";
import { Reveal, SectionHeading } from "./shared";
import { WhatsAppButton, CallButton } from "./CtaButtons";
import { INCLUDED, IMAGES } from "./data";

export default function Included() {
  return (
    <section className="bg-[#FAFAFA] px-5 py-24 sm:px-8 sm:py-32" data-testid="included-section">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-[2rem]">
            <img src={IMAGES.room} alt="Luxury hotel room" className="h-[520px] w-full object-cover" />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
          </div>
          {/* Clipped floating badge */}
          <div className="absolute -bottom-6 -right-4 rounded-2xl border border-[#D4AF37]/30 bg-[#0A192F] px-7 py-5 text-white shadow-2xl sm:right-6">
            <p className="font-display text-3xl text-[#D4AF37]">100%</p>
            <p className="text-xs uppercase tracking-widest text-white/70">Transparent Pricing</p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            chapter="03 —"
            overline="What's Included"
            title="Everything covered. Zero surprises."
            subtitle="From tolls to driver stay — it's all in. You only pay for personal extras."
          />
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {INCLUDED.map((item, i) => (
              <Reveal key={item} delay={i * 0.04} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 text-[#1a8f47]">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="font-body text-[15px] text-[#1A1A1A]/85">{item}</span>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton size="sm" testid="included-whatsapp-btn" />
            <CallButton size="sm" variant="solid" testid="included-call-btn" />
          </div>
        </div>
      </div>
    </section>
  );
}
