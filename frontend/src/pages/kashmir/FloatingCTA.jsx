import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, X } from "lucide-react";
import { waLink, PHONE_TEL, DEFAULT_WA_MSG } from "./data";

export default function FloatingCTA() {
  const [showTip, setShowTip] = useState(true);

  return (
    <div className="fixed bottom-5 right-4 z-50 hidden flex-col items-end gap-3 sm:bottom-6 sm:right-6 sm:flex">
      {/* Call button */}
      <motion.a
        href={`tel:${PHONE_TEL}`}
        data-testid="floating-call-btn"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#0A192F] text-[#D4AF37] shadow-lg"
        aria-label="Call now"
      >
        <Phone className="h-5 w-5" strokeWidth={2.4} />
      </motion.a>

      {/* WhatsApp button with pulse + tooltip */}
      <div className="relative flex items-center">
        <AnimatePresence>
          {showTip && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-16 flex items-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-white/90 px-4 py-2 text-sm font-medium text-[#0A192F] shadow-xl backdrop-blur-md"
            >
              Chat with an Expert
              <button
                onClick={() => setShowTip(false)}
                aria-label="Dismiss"
                className="text-[#0A192F]/50 hover:text-[#0A192F]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <span className="absolute inline-flex h-14 w-14 animate-ping rounded-full bg-[#25D366] opacity-40" />
        <motion.a
          href={waLink(DEFAULT_WA_MSG)}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="floating-whatsapp-btn"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-4px_rgba(37,211,102,0.7)]"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-7 w-7" strokeWidth={2.2} />
        </motion.a>
      </div>
    </div>
  );
}
