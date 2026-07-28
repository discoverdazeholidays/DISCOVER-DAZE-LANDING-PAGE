import React from "react";
import { Star } from "lucide-react";
import { Icon } from "./shared";

const ITEMS = [
  { icon: "MapPin", label: "Local Kashmir Experts" },
  { icon: "Headphones", label: "24×7 Support" },
  { icon: "ReceiptText", label: "No Hidden Charges" },
  { icon: "ShieldCheck", label: "Secure Booking" },
  { icon: "BadgeIndianRupee", label: "Best Price Guarantee" },
];

export default function TrustBar() {
  return (
    <section className="relative z-30 -mt-10 px-4 sm:px-8" data-testid="trust-bar">
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/15 bg-white/10 px-6 py-5 shadow-[0_20px_60px_-20px_rgba(10,25,47,0.6)] backdrop-blur-xl">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-6">
          <div className="flex flex-col items-center justify-center gap-1 border-white/15 md:border-r">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />
              ))}
            </div>
            <span className="text-xs font-medium uppercase tracking-wider text-white/80">
              Happy Travelers
            </span>
          </div>
          {ITEMS.map((it) => (
            <div key={it.label} className="flex flex-col items-center justify-center gap-1.5 text-center">
              <span className="text-[#D4AF37]">
                <Icon name={it.icon} className="h-5 w-5" />
              </span>
              <span className="text-xs font-medium text-white/90 sm:text-sm">{it.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
