import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, SectionHeading } from "./shared";
import { MapPin, Moon } from "lucide-react";
import { WhatsAppButton } from "./CtaButtons";
import { ITINERARY } from "./data";

export default function Itinerary() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="itinerary" className="relative bg-[#0A192F] px-5 py-24 sm:px-8 sm:py-32" data-testid="itinerary-section">
      {/* subtle grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          chapter="02 —"
          overline="Day By Day"
          title="Your six-day Kashmir story"
          subtitle="A thoughtfully paced route through the valley's most iconic landscapes."
          light
        />

        <div ref={ref} className="relative mt-16 pl-2">
          {/* Timeline track */}
          <div className="absolute left-[19px] top-2 h-full w-[2px] bg-white/10 sm:left-1/2" />
          <motion.div
            style={{ height }}
            className="absolute left-[19px] top-2 w-[2px] bg-gradient-to-b from-[#D4AF37] to-[#D4AF37]/40 sm:left-1/2"
          />

          <div className="space-y-12">
            {ITINERARY.map((d, i) => {
              const left = i % 2 === 0;
              return (
                <div
                  key={d.day}
                  className={`relative flex items-start gap-6 sm:w-1/2 ${
                    left ? "sm:pr-12" : "sm:ml-auto sm:pl-12"
                  }`}
                >
                  {/* Node */}
                  <div
                    className={`absolute top-1 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-[#0A192F] font-display text-sm text-[#D4AF37] left-0 ${
                      left ? "sm:-right-5 sm:left-auto" : "sm:-left-5"
                    }`}
                  >
                    {d.day}
                  </div>

                  <Reveal
                    delay={0.05 * i}
                    className={`ml-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:ml-0 ${
                      left ? "sm:text-right" : ""
                    }`}
                  >
                    <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
                      Day {d.day}
                    </span>
                    <h3 className="mt-2 font-display text-2xl text-white">{d.title}</h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-white/65">{d.detail}</p>
                    <div
                      className={`mt-4 flex items-center gap-2 text-sm text-white/80 ${
                        left ? "sm:justify-end" : ""
                      }`}
                    >
                      {i === ITINERARY.length - 1 ? (
                        <MapPin className="h-4 w-4 text-[#D4AF37]" />
                      ) : (
                        <Moon className="h-4 w-4 text-[#D4AF37]" />
                      )}
                      <span>{d.stay}</span>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <WhatsAppButton label="Customise This Itinerary" testid="itinerary-whatsapp-btn" message="Hi! I'd like to customise the 6 Days Kashmir itinerary. Here are my dates and group size:" />
        </div>
      </div>
    </section>
  );
}
