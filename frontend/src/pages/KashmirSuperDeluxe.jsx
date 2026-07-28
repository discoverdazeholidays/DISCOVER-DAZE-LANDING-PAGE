import React, { useEffect } from "react";
import { Toaster } from "sonner";
import FomoBanner from "./kashmir/FomoBanner";
import HeroV2 from "./kashmir/HeroV2";
import TrustBar from "./kashmir/TrustBar";
import Highlights from "./kashmir/Highlights";
import Itinerary from "./kashmir/Itinerary";
import Included from "./kashmir/Included";
import Pricing from "./kashmir/Pricing";
import WhyUs from "./kashmir/WhyUs";
import Testimonials from "./kashmir/Testimonials";
import Urgency from "./kashmir/Urgency";
import BookingForm from "./kashmir/BookingForm";
import Faq from "./kashmir/Faq";
import Contact from "./kashmir/Contact";
import FloatingCTA from "./kashmir/FloatingCTA";
import LiveActivity from "./kashmir/LiveActivity";
import MobileCTABar from "./kashmir/MobileCTABar";
import { initTracking } from "./kashmir/tracking";

export default function KashmirSuperDeluxe() {
  useEffect(() => { initTracking(); }, []);
  return (
    <div className="kashmir-lp min-h-screen bg-[#FAFAFA] pb-16 font-body text-left antialiased sm:pb-0" data-testid="kashmir-landing-page">
      <FomoBanner />
      <HeroV2 />
      <TrustBar />
      <Highlights />
      <Itinerary />
      <Included />
      <Pricing />
      <WhyUs />
      <Testimonials />
      <Urgency />
      <BookingForm />
      <Faq />
      <Contact />
      <FloatingCTA />
      <LiveActivity />
      <MobileCTABar />
      <Toaster position="top-center" richColors />
    </div>
  );
}
