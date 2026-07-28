import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading, Reveal } from "./shared";
import { WhatsAppButton } from "./CtaButtons";
import { FAQS } from "./data";

export default function Faq() {
  return (
    <section className="bg-white px-5 py-24 sm:px-8 sm:py-32" data-testid="faq-section">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          chapter="08 —"
          overline="Questions"
          title="Everything you might be wondering"
          center
        />
        <Reveal className="mt-12">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} data-testid={`faq-item-${i}`} className="border-b border-[#0A192F]/10">
                <AccordionTrigger className="text-left font-display text-lg text-[#0A192F] hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-[15px] leading-relaxed text-[#1A1A1A]/70">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <p className="font-body text-[#1A1A1A]/60">Still have a question?</p>
          <WhatsAppButton label="Ask on WhatsApp" testid="faq-whatsapp-btn" />
        </div>
      </div>
    </section>
  );
}
