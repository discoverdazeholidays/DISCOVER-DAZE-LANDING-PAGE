import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, ChevronDown, Sparkles } from "lucide-react";
import { WhatsAppButton } from "./CtaButtons";
import { IMAGES, BRAND, scrollToQuote } from "./data";

const MaskLine = ({ children, delay = 0 }) => (
  <span className="block overflow-hidden">
    <motion.span
      className="block"
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

export default function HeroV2() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.24]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] w-full overflow-hidden bg-[#0A192F]">
      {/* Parallax + slow zoom image */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <motion.img
          src={IMAGES.heroLocal}
          alt="Kashmir Dal Lake at golden hour"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Overlays for depth + text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/75 via-[#0A192F]/35 to-[#0A192F]" />
      <div className="absolute inset-0 bg-black/25" />

      {/* Logo + trust chip */}
      <div className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 pt-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-2.5"
          data-testid="brand-logo"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/60 text-[#D4AF37] font-display text-lg">D</span>
          <span className="font-display text-lg tracking-tight text-white sm:text-xl">{BRAND}</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 backdrop-blur-md sm:flex"
        >
          <div className="flex">{[...Array(5)].map((_, i) => (<Star key={i} className="h-3.5 w-3.5 fill-[#D4AF37] text-[#D4AF37]" />))}</div>
          <span className="text-xs font-medium text-white/90">4.9/5 · 2,000+ Travelers</span>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 mx-auto flex min-h-[calc(100svh-84px)] max-w-7xl flex-col justify-center px-5 pb-24 pt-8 sm:px-8"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/12 px-4 py-1.5 backdrop-blur-md"
        >
          <Sparkles className="h-4 w-4 text-[#D4AF37]" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Flat 30% OFF · Limited Time</span>
        </motion.div>

        <h1 className="max-w-4xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.4rem]">
          <MaskLine delay={0.2}>6 Days Kashmir</MaskLine>
          <MaskLine delay={0.35}>
            Super Deluxe <span className="italic text-[#D4AF37]">— Flat 30% OFF</span>
          </MaskLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-6 max-w-2xl font-body text-sm text-white/85 sm:text-lg"
        >
          Book Today • Limited Seats • Instant Confirmation • Trusted Local Tour Operator
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="mt-7 flex flex-wrap items-end gap-x-8 gap-y-4"
        >
          <div>
            <span className="block font-body text-xs uppercase tracking-widest text-white/60">Starting from</span>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl font-semibold text-[#D4AF37] sm:text-5xl">₹9,800</span>
              <span className="font-body text-sm text-white/70">/ person</span>
            </div>
          </div>
          <div className="hidden h-12 w-px bg-white/20 sm:block" />
          <div className="font-body text-sm text-white/75">
            <p>Luxury Hotels • Houseboat • Shikara Ride</p>
            <p>Daily Meals • Private Cab • 24×7 Support</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <WhatsAppButton testid="hero-whatsapp-btn" />
          <motion.button
            onClick={scrollToQuote}
            data-testid="hero-quote-btn"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-8 py-4 font-body text-base font-semibold text-[#0A192F] shadow-[0_10px_40px_-8px_rgba(212,175,55,0.6)]"
          >
            Get Instant Quote
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/60"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}
