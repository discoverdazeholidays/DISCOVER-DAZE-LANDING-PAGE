import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { WhatsAppButton, CallButton } from "./CtaButtons";
import { Reveal } from "./shared";
import { BRAND, PHONE_DISPLAY, EMAIL, ADDRESS } from "./data";

export default function Contact() {
  return (
    <footer className="bg-[#0A192F] px-5 py-20 sm:px-8" data-testid="contact-section">
      <div className="mx-auto max-w-6xl">
        <Reveal className="rounded-[2rem] border border-[#D4AF37]/25 bg-white/[0.03] p-8 text-center sm:p-14">
          <h2 className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Ready to explore Kashmir in luxury?
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-white/65">
            Message us now — our local expert replies in minutes with your best price.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <WhatsAppButton testid="contact-whatsapp-btn" />
            <CallButton testid="contact-call-btn" />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 border-t border-white/10 pt-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/60 text-[#D4AF37] font-display">D</span>
              <span className="font-display text-lg text-white">{BRAND}</span>
            </div>
            <p className="mt-4 font-body text-sm leading-relaxed text-white/55">
              Your trusted local Kashmir travel experts, crafting luxury journeys since day one.
            </p>
          </div>

          <div className="space-y-4">
            <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} data-testid="footer-phone" className="flex items-center gap-3 text-white/80 hover:text-[#D4AF37]">
              <Phone className="h-4 w-4 text-[#D4AF37]" /> {PHONE_DISPLAY}
            </a>
            <a href={`mailto:${EMAIL}`} data-testid="footer-email" className="flex items-center gap-3 text-white/80 hover:text-[#D4AF37]">
              <Mail className="h-4 w-4 text-[#D4AF37]" /> {EMAIL}
            </a>
          </div>

          <div className="flex items-start gap-3 text-white/70">
            <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#D4AF37]" />
            <p className="font-body text-sm leading-relaxed">{ADDRESS}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {BRAND}. All rights reserved.</p>
          <p>Luxury Kashmir Tours • Best Price Guarantee</p>
        </div>
      </div>
    </footer>
  );
}
