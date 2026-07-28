import React from "react";
import { Flame } from "lucide-react";
import { CountdownUnits } from "./Countdown";

export default function AttentionBar() {
  return (
    <div
      data-testid="attention-bar"
      className="sticky top-0 z-[60] border-b border-[#D4AF37]/25 bg-[#0A192F]/95 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-2.5 sm:flex-row sm:px-8">
        <div className="flex items-center gap-2.5 text-center">
          <Flame className="h-4 w-4 shrink-0 text-[#D4AF37]" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white sm:text-xs">
            Limited Time Offer —{" "}
            <span className="text-[#D4AF37]">Save up to 30% Off</span>
            <span className="hidden text-white/60 sm:inline"> • Limited Seats • Ends Tonight</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-[10px] uppercase tracking-[0.2em] text-white/50 md:inline">
            Offer ends in
          </span>
          <CountdownUnits compact />
        </div>
      </div>
    </div>
  );
}
