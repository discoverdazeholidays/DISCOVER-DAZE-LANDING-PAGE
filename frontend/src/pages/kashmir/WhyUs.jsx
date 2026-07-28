import React from "react";
import { Reveal, SectionHeading, Icon } from "./shared";
import { WHY_US } from "./data";

export default function WhyUs() {
  return (
    <section className="bg-[#FAFAFA] px-5 py-24 sm:px-8 sm:py-32" data-testid="why-us-section">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          chapter="05 —"
          overline="Why Discover Daze"
          title="Locals who love showing off home"
          subtitle="Born and raised in Kashmir — we craft trips we'd send our own family on."
          center
        />
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {WHY_US.map((w, i) => (
            <Reveal
              key={w.title}
              delay={i * 0.05}
              className="group flex flex-col items-center gap-4 rounded-3xl border border-[#0A192F]/8 bg-white px-5 py-8 text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-[#D4AF37]/50"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0A192F] text-[#D4AF37] transition-transform duration-500 group-hover:rotate-6">
                <Icon name={w.icon} className="h-6 w-6" />
              </span>
              <span className="font-body text-sm font-medium text-[#0A192F]">{w.title}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
