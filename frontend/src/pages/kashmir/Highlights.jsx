import React from "react";
import { Reveal, SectionHeading, Icon } from "./shared";
import { WhatsAppButton } from "./CtaButtons";
import { HIGHLIGHTS, IMAGES } from "./data";

const ImageCard = ({ src, title, span }) => (
  <Reveal className={`${span} group relative overflow-hidden rounded-3xl`}>
    <div className="relative h-full min-h-[220px] w-full">
      <img
        src={src}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/85 via-[#0A192F]/10 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6">
        <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">Experience</span>
        <h3 className="mt-1 font-display text-2xl text-white">{title}</h3>
      </div>
    </div>
  </Reveal>
);

const IconCard = ({ item, span }) => (
  <Reveal className={`${span} group rounded-3xl border border-[#0A192F]/8 bg-white p-6 transition-colors duration-500 hover:border-[#D4AF37]/50`}>
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0A192F] text-[#D4AF37] transition-transform duration-500 group-hover:-translate-y-1">
      <Icon name={item.icon} className="h-5 w-5" />
    </div>
    <h3 className="mt-5 font-display text-xl text-[#0A192F]">{item.title}</h3>
    <p className="mt-2 font-body text-sm leading-relaxed text-[#1A1A1A]/60">{item.desc}</p>
  </Reveal>
);

export default function Highlights() {
  return (
    <section id="highlights" className="bg-[#FAFAFA] px-5 py-24 sm:px-8 sm:py-32" data-testid="highlights-section">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          chapter="01 —"
          overline="What Makes It Special"
          title="A journey engineered for pure indulgence"
          subtitle="Every inclusion is handpicked so all you do is soak in the Himalayas."
        />

        <div className="mt-14 grid grid-cols-12 gap-4">
          <IconCard item={HIGHLIGHTS[0]} span="col-span-12 sm:col-span-6 lg:col-span-4" />
          <IconCard item={HIGHLIGHTS[1]} span="col-span-12 sm:col-span-6 lg:col-span-4" />
          <ImageCard src={IMAGES.shikara} title="Shikara Ride on Dal Lake" span="col-span-12 lg:col-span-4 lg:row-span-2" />

          <IconCard item={HIGHLIGHTS[2]} span="col-span-12 sm:col-span-6 lg:col-span-4" />
          <IconCard item={HIGHLIGHTS[3]} span="col-span-12 sm:col-span-6 lg:col-span-4" />

          <ImageCard src={IMAGES.houseboat} title="Luxury Houseboat Stay" span="col-span-12 sm:col-span-6 lg:col-span-4" />
          <IconCard item={HIGHLIGHTS[4]} span="col-span-6 lg:col-span-2" />
          <IconCard item={HIGHLIGHTS[5]} span="col-span-6 lg:col-span-2" />
          <IconCard item={HIGHLIGHTS[6]} span="col-span-6 lg:col-span-2" />
          <IconCard item={HIGHLIGHTS[7]} span="col-span-6 lg:col-span-2" />
        </div>

        <div className="mt-12 flex justify-center">
          <WhatsAppButton label="Ask About Inclusions" testid="highlights-whatsapp-btn" message="Hi! Please share full inclusions & pricing for the 6 Days Kashmir Super Deluxe Package." />
        </div>
      </div>
    </section>
  );
}
