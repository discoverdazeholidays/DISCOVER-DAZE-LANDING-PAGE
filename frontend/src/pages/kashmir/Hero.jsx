import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, ChevronDown } from "lucide-react";
import { WhatsAppButton, CallButton } from "./CtaButtons";
import { IMAGES, BRAND } from "./data";

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

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] w-full overflow-hidden bg-[#0A192F]">
      {/* Background video */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={IMAGES.heroPoster}
          className="h-full w-full object-cover"
        >
          <source src="/videos/kashmir-hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Overlays for depth + contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/70 via-[#0A192F]/40 to-[#0A192F]" />
      <div className="absolute inset-0 bg-black/30" />

      {/* Logo + top CTAs */}
      <div className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 pt-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-2.5"
          data-testid="brand-logo"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/60 text-[#D4AF37] font-display text-lg">
            D
          </span>
          <span className="font-display text-lg text-white sm:text-xl tracking-tight">
            {BRAND}
          </span>
        </motion.div>
        <div className="hidden sm:block">
          <CallButton size="sm" testid="hero-header-call" />
        </div>
      </div>

      {/* Hero content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex min-h-[calc(100svh-84px)] max-w-7xl flex-col justify-center px-5 pb-20 pt-10 sm:px-8"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex items-center gap-2"
        >
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />
            ))}
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-white/80">
            Rated by Happy Travelers
          </span>
        </motion.div>

        <h1 className="max-w-4xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
          <MaskLine delay={0.15}>Explore Kashmir</MaskLine>
          <MaskLine delay={0.3}>
            <span className="italic text-[#D4AF37]">in Luxury</span>
          </MaskLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-6 max-w-xl font-body text-base text-white/85 sm:text-lg"
        >
          6 Days / 5 Nights Super Deluxe Package. Luxury Hotels • Houseboat •
          Shikara Ride • Daily Meals • Private Cab.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="mt-5 flex items-baseline gap-2"
        >
          <span className="font-body text-sm uppercase tracking-widest text-white/60">
            Starting from just
          </span>
          <span className="font-display text-3xl font-semibold text-[#D4AF37] sm:text-4xl">
            ₹9,800
          </span>
          <span className="font-body text-sm text-white/70">/ person</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <WhatsAppButton testid="hero-whatsapp-btn" />
          <CallButton testid="hero-call-btn" />
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/60"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}
