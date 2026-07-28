import React from "react";
import { CountdownUnits } from "./Countdown";
import { Reveal } from "./shared";
import { AlertTriangle } from "lucide-react";
import { WhatsAppButton, CallButton } from "./CtaButtons";

export default function Urgency() {
  return (
    <section className="relative overflow-hidden bg-[#0A192F] px-5 py-24 sm:px-8 sm:py-28" data-testid="urgency-section">
      <div className="pointer-events-none absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-[#25D366]/10 blur-3xl" />
      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            <AlertTriangle className="h-4 w-4" /> Only Limited Seats Available
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl">
            Book today to unlock{" "}
            <span className="italic text-[#D4AF37]">up to 30% OFF</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 font-body text-white/65">This exclusive ads-only price ends soon. Lock your seats before midnight.</p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex justify-center">
            <CountdownUnits />
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <WhatsAppButton testid="urgency-whatsapp-btn" message="Hi! I want to grab the up to 30% OFF on the 6 Days Kashmir Super Deluxe Package before it ends." />
            <CallButton testid="urgency-call-btn" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
