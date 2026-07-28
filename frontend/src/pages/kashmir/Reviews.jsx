import React from "react";
import Marquee from "react-fast-marquee";
import { Star } from "lucide-react";
import { SectionHeading } from "./shared";
import { REVIEWS } from "./data";

const ReviewCard = ({ r }) => (
  <div className="mx-3 flex w-[330px] shrink-0 flex-col rounded-2xl border border-[#0A192F]/8 bg-white p-6 shadow-[0_10px_40px_-20px_rgba(10,25,47,0.3)]">
    <div className="flex items-center justify-between">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />
        ))}
      </div>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FAFAFA] text-xs font-bold text-[#0A192F]">G</span>
    </div>
    <p className="mt-4 font-body text-[15px] leading-relaxed text-[#1A1A1A]/80">"{r.text}"</p>
    <div className="mt-5 flex items-center gap-3 border-t border-black/5 pt-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0A192F] font-display text-sm text-[#D4AF37]">
        {r.name.charAt(0)}
      </span>
      <div>
        <p className="text-sm font-semibold text-[#0A192F]">{r.name}</p>
        <p className="text-xs text-[#1A1A1A]/50">{r.city}</p>
      </div>
    </div>
  </div>
);

export default function Reviews() {
  return (
    <section className="overflow-hidden bg-white py-24 sm:py-32" data-testid="reviews-section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          chapter="06 —"
          overline="Social Proof"
          title="Loved by travelers across India"
          subtitle="Real words from guests who've explored Kashmir with us."
          center
        />
      </div>
      <div className="mt-14">
        <Marquee gradient gradientColor="#ffffff" gradientWidth={80} speed={40} pauseOnHover>
          {REVIEWS.map((r) => (
            <ReviewCard key={r.name} r={r} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
