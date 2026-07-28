import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { waLink, PHONE_TEL, DEFAULT_WA_MSG } from "./data";
import { trackContact } from "./tracking";

export function WhatsAppButton({ message = DEFAULT_WA_MSG, label = "Book on WhatsApp", size = "lg", testid = "wa-cta", className = "" }) {
  const pad = size === "lg" ? "px-8 py-4 text-base" : "px-5 py-3 text-sm";
  return (
    <motion.a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={testid}
      onClick={() => trackContact("whatsapp")}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] font-body font-semibold text-white shadow-[0_10px_40px_-8px_rgba(37,211,102,0.6)] ${pad} ${className}`}
    >
      <MessageCircle className="h-5 w-5" strokeWidth={2.4} />
      {label}
    </motion.a>
  );
}

export function CallButton({ label = "Call Now", size = "lg", variant = "outline", testid = "call-cta", href = `tel:${PHONE_TEL}`, className = "" }) {
  const pad = size === "lg" ? "px-8 py-4 text-base" : "px-5 py-3 text-sm";
  const styles =
    variant === "outline"
      ? "border border-[#D4AF37]/70 text-white hover:bg-[#D4AF37] hover:text-[#0A192F] backdrop-blur-md bg-white/5"
      : "bg-[#0A192F] text-white hover:bg-[#0A192F]/90";
  return (
    <motion.a
      href={href}
      data-testid={testid}
      onClick={() => trackContact("call")}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-2.5 rounded-full font-body font-semibold ${pad} ${styles} ${className}`}
    >
      <Phone className="h-5 w-5" strokeWidth={2.4} />
      {label}
    </motion.a>
  );
}
