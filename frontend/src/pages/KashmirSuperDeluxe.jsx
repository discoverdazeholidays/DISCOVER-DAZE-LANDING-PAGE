import React from "react";
import { Toaster } from "sonner";
import AttentionBar from "./kashmir/AttentionBar";
import Hero from "./kashmir/Hero";
import TrustBar from "./kashmir/TrustBar";
import Highlights from "./kashmir/Highlights";
import Itinerary from "./kashmir/Itinerary";
import Included from "./kashmir/Included";
import Pricing from "./kashmir/Pricing";
import WhyUs from "./kashmir/WhyUs";
import Reviews from "./kashmir/Reviews";
import Urgency from "./kashmir/Urgency";
import LeadForm from "./kashmir/LeadForm";
import Faq from "./kashmir/Faq";
import Contact from "./kashmir/Contact";
import FloatingCTA from "./kashmir/FloatingCTA";

export default function KashmirSuperDeluxe() {
  return (
    <div className="kashmir-lp min-h-screen bg-[#FAFAFA] font-body text-left antialiased" data-testid="kashmir-landing-page">
      <AttentionBar />
      <Hero />
      <TrustBar />
      <Highlights />
      <Itinerary />
      <Included />
      <Pricing />
      <WhyUs />
      <Reviews />
      <Urgency />
      <LeadForm />
      <Faq />
      <Contact />
      <FloatingCTA />
      <Toaster position="top-center" richColors />
    </div>
  );
}
