import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Eye, Flame } from "lucide-react";

const BOOKINGS = [
  { name: "Rahul", city: "Delhi", pkg: "Group of 5" },
  { name: "Ananya", city: "Mumbai", pkg: "Couple Package" },
  { name: "Vikram", city: "Bengaluru", pkg: "Group of 9" },
  { name: "Fatima", city: "Hyderabad", pkg: "Group of 6" },
  { name: "Karthik", city: "Chennai", pkg: "Couple Package" },
  { name: "Simran", city: "Pune", pkg: "Group of 5" },
  { name: "Arjun", city: "Kolkata", pkg: "Budget Package" },
];

export default function LiveActivity() {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(false);
  const [viewers, setViewers] = useState(27);
  const [pastHero, setPastHero] = useState(false);

  // Only reveal after the user scrolls past the hero so it never covers the hero price/CTAs
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!pastHero) return;
    const first = setTimeout(() => setShow(true), 800);
    return () => clearTimeout(first);
  }, [pastHero]);

  useEffect(() => {
    if (!show) return;
    const cycle = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % BOOKINGS.length);
        setShow(true);
      }, 600);
    }, 6500);
    return () => clearInterval(cycle);
  }, [show]);

  useEffect(() => {
    const v = setInterval(() => {
      setViewers((n) => Math.min(46, Math.max(19, n + (Math.random() > 0.5 ? 1 : -1))));
    }, 4000);
    return () => clearInterval(v);
  }, []);

  const b = BOOKINGS[idx];

  if (!pastHero) return null;

  return (
    <div className="pointer-events-none fixed bottom-6 left-4 z-40 hidden max-w-[300px] flex-col gap-2 sm:flex" data-testid="live-activity">
      {/* Persistent viewers pill */}
      <div className="pointer-events-auto flex w-fit items-center gap-2 rounded-full border border-white/15 bg-[#0A192F]/90 px-3.5 py-2 text-white shadow-xl backdrop-blur-md">
        <Eye className="h-4 w-4 text-[#D4AF37]" />
        <span className="text-xs font-medium">
          <span className="text-[#D4AF37]">{viewers}</span> people viewing now
        </span>
      </div>

      {/* Rotating booking toast */}
      <AnimatePresence mode="wait">
        {show && (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20, y: 8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3 shadow-[0_16px_40px_-16px_rgba(10,25,47,0.5)]"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#25D366]" />
            <div>
              <p className="text-sm font-semibold text-[#0A192F]">{b.name} from {b.city}</p>
              <p className="text-xs text-[#1A1A1A]/60">just booked the {b.pkg}</p>
              <p className="mt-0.5 flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-[#D4AF37]">
                <Flame className="h-3 w-3" /> a few minutes ago
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
