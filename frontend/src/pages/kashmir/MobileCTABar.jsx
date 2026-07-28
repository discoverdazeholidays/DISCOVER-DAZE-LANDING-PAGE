import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { waLink, PHONE_TEL, DEFAULT_WA_MSG, scrollToQuote } from "./data";
import { trackContact } from "./tracking";

export default function MobileCTABar() {
  return (
    <div
      data-testid="mobile-cta-bar"
      className="fixed bottom-0 left-0 z-50 w-full border-t border-[#D4AF37]/20 bg-[#0A192F]/95 px-3 py-2.5 backdrop-blur-xl sm:hidden"
    >
      <div className="flex items-center gap-2">
        <a
          href={waLink(DEFAULT_WA_MSG)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContact("whatsapp")}
          data-testid="mobile-whatsapp-btn"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#25D366] py-3 text-sm font-semibold text-white"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
        <a
          href={`tel:${PHONE_TEL}`}
          onClick={() => trackContact("call")}
          data-testid="mobile-call-btn"
          className="flex items-center justify-center gap-1.5 rounded-full border border-[#D4AF37]/50 px-4 py-3 text-sm font-semibold text-[#D4AF37]"
        >
          <Phone className="h-4 w-4" /> Call
        </a>
        <button
          onClick={scrollToQuote}
          data-testid="mobile-quote-btn"
          className="flex items-center justify-center rounded-full bg-[#D4AF37] px-4 py-3 text-sm font-semibold text-[#0A192F]"
        >
          Get Quote
        </button>
      </div>
    </div>
  );
}
