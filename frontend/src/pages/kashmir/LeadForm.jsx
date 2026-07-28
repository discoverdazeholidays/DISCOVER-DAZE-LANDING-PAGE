import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Phone, MessageCircle, Loader2, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal, SectionHeading } from "./shared";
import { waLink, PHONE_TEL } from "./data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const GUEST_OPTIONS = ["1-2 (Couple)", "3-5", "6-9", "10+"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function LeadForm() {
  const [form, setForm] = useState({ full_name: "", phone: "", guests: "", travel_month: "" });
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const buildWaMessage = () =>
    `Hi Discover Daze Holidays! I'd like an instant quote for the 6 Days Kashmir Super Deluxe Package.%0A%0A` +
    `Name: ${form.full_name || "-"}%0APhone: ${form.phone || "-"}%0AGuests: ${form.guests || "-"}%0ATravel Month: ${form.travel_month || "-"}`;

  const submitLead = async () => {
    if (!form.full_name.trim() || !form.phone.trim()) {
      toast.error("Please enter your name and phone number.");
      return false;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/leads`, {
        full_name: form.full_name,
        phone: form.phone,
        guests: form.guests,
        travel_month: form.travel_month,
        package: "6 Days Kashmir Super Deluxe",
      });
      toast.success("Request received! Connecting you now…");
      return true;
    } catch (e) {
      // Even if saving fails, don't block the lead from reaching WhatsApp
      toast.message("Opening WhatsApp to complete your enquiry…");
      return true;
    } finally {
      setLoading(false);
    }
  };

  const handleQuote = async (e) => {
    e.preventDefault();
    const ok = await submitLead();
    if (ok) window.open(waLink(decodeURIComponent(buildWaMessage())), "_blank");
  };

  const handleCall = async () => {
    await submitLead();
    window.location.href = `tel:${PHONE_TEL}`;
  };

  return (
    <section id="quote" className="relative bg-[#FAFAFA] px-5 py-24 sm:px-8 sm:py-32" data-testid="lead-form-section">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            chapter="07 —"
            overline="Get Instant Quote"
            title="Two minutes to your dream Kashmir trip"
            subtitle="Share a few details and our local expert will send your personalised quote right away."
          />
          <ul className="mt-8 space-y-3">
            {["No spam, ever", "Instant response on WhatsApp", "Best price guaranteed"].map((t) => (
              <li key={t} className="flex items-center gap-3 text-[15px] text-[#1A1A1A]/75">
                <ShieldCheck className="h-5 w-5 text-[#25D366]" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <Reveal>
          <form
            onSubmit={handleQuote}
            data-testid="lead-form"
            className="rounded-[2rem] border border-[#0A192F]/10 bg-white p-7 shadow-[0_30px_80px_-30px_rgba(10,25,47,0.4)] sm:p-9"
          >
            <div className="space-y-5">
              <div>
                <Label htmlFor="full_name" className="text-[#0A192F]">Full Name</Label>
                <Input
                  id="full_name"
                  data-testid="lead-name-input"
                  value={form.full_name}
                  onChange={(e) => update("full_name", e.target.value)}
                  placeholder="e.g. Aarav Mehta"
                  className="mt-1.5 h-12 border-[#0A192F]/15 bg-[#FAFAFA] focus-visible:ring-[#D4AF37]"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-[#0A192F]">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  data-testid="lead-phone-input"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="mt-1.5 h-12 border-[#0A192F]/15 bg-[#FAFAFA] focus-visible:ring-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <Label className="text-[#0A192F]">Number of Guests</Label>
                  <Select value={form.guests} onValueChange={(v) => update("guests", v)}>
                    <SelectTrigger data-testid="lead-guests-select" className="mt-1.5 h-12 border-[#0A192F]/15 bg-[#FAFAFA]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {GUEST_OPTIONS.map((g) => (
                        <SelectItem key={g} value={g} data-testid={`guest-opt-${g}`}>{g}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-[#0A192F]">Travel Month</Label>
                  <Select value={form.travel_month} onValueChange={(v) => update("travel_month", v)}>
                    <SelectTrigger data-testid="lead-month-select" className="mt-1.5 h-12 border-[#0A192F]/15 bg-[#FAFAFA]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {MONTHS.map((m) => (
                        <SelectItem key={m} value={m} data-testid={`month-opt-${m}`}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <motion.button
                type="submit"
                data-testid="lead-submit-btn"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 font-body text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] disabled:opacity-70"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <MessageCircle className="h-5 w-5" />}
                Get Instant Quote
              </motion.button>
              <motion.button
                type="button"
                onClick={handleCall}
                data-testid="lead-call-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#0A192F]/20 px-6 py-4 font-body text-sm font-semibold text-[#0A192F] hover:bg-[#0A192F] hover:text-white"
              >
                <Phone className="h-5 w-5" /> Call Now
              </motion.button>
            </div>
            <p className="mt-4 text-center text-xs text-[#1A1A1A]/45">
              By submitting, you agree to be contacted on WhatsApp / phone.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
