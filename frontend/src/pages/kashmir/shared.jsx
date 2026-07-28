import React from "react";
import { motion } from "framer-motion";
import * as Lucide from "lucide-react";

export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const Overline = ({ children, dark = false }) => (
  <span
    className={`inline-block text-xs font-semibold uppercase tracking-[0.3em] ${
      dark ? "text-[#D4AF37]" : "text-[#D4AF37]"
    }`}
  >
    {children}
  </span>
);

export const SectionHeading = ({ chapter, overline, title, subtitle, light = false, center = false }) => (
  <div className={`${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
    <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
      {chapter && (
        <span className="font-display text-sm text-[#D4AF37]/80">{chapter}</span>
      )}
      <Overline>{overline}</Overline>
    </div>
    <h2
      className={`mt-4 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl ${
        light ? "text-white" : "text-[#0A192F]"
      }`}
    >
      {title}
    </h2>
    {subtitle && (
      <p className={`mt-4 font-body text-base ${light ? "text-white/70" : "text-[#1A1A1A]/65"}`}>
        {subtitle}
      </p>
    )}
  </div>
);

export const Icon = ({ name, className = "h-6 w-6" }) => {
  const Cmp = Lucide[name] || Lucide.Sparkles;
  return <Cmp className={className} strokeWidth={1.6} />;
};
