import React from "react";
import { motion } from "framer-motion";
import { Reveal, SectionHeading } from "./shared";
import { Star } from "lucide-react";
import { WhatsAppButton } from "./CtaButtons";
import { PRICING, waLink } from "./data";

export default function Pricing() {
  return (
    <section id="pricing" className="bg-[#111111] px-5 py-24 sm:px-8 sm:py-32" data-testid="pricing-section">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          chapter="04 —"
          overline="Pricing"
          title="Pick the plan that fits your crew"
          subtitle="All plans include the full Super Deluxe inclusions. Bigger groups, better value."
          light
          center
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRICING.map((p, i) => {
            const best = p.tag === "Best Value";
            return (
              <Reveal
                key={p.name}
                delay={i * 0.06}
                className={`relative flex flex-col rounded-3xl border p-8 ${
                  best
                    ? "border-[#D4AF37] bg-gradient-to-b from-[#D4AF37]/12 to-transparent shadow-[0_0_50px_-12px_rgba(212,175,55,0.45)]"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                {p.tag && (
                  <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[#D4AF37] px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#0A192F]">
                    <Star className="h-3 w-3 fill-[#0A192F]" /> {p.tag}
                  </span>
                )}
                <h3 className="font-display text-2xl text-white">{p.name}</h3>
                <p className="mt-1 text-sm text-white/50">{p.rooms}</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-semibold text-[#D4AF37]">{p.price}</span>
                  <span className="text-sm text-white/60">{p.unit}</span>
                </div>
                <motion.a
                  href={waLink(`Hi! I'd like to book the "${p.name}" (${p.price} ${p.unit}) of the 6 Days Kashmir Super Deluxe Package.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`pricing-book-btn-${i}`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3 font-body text-sm font-semibold transition-colors ${
                    best
                      ? "bg-[#25D366] text-white"
                      : "border border-[#D4AF37]/50 text-white hover:bg-[#D4AF37] hover:text-[#0A192F]"
                  }`}
                >
                  Book Now
                </motion.a>
              </Reveal>
            );
          })}

          {/* Reassurance cell */}
          <Reveal delay={0.3} className="flex flex-col justify-center rounded-3xl border border-dashed border-white/15 p-8 text-center">
            <p className="font-display text-xl text-white">Not sure which to choose?</p>
            <p className="mt-2 text-sm text-white/60">Tell us your group size — we'll build the perfect custom quote in minutes.</p>
            <div className="mt-6 flex justify-center">
              <WhatsAppButton size="sm" label="Get a Custom Quote" testid="pricing-custom-whatsapp-btn" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
