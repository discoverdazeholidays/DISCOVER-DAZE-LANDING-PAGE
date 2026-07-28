import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Phone, MessageCircle, Loader2, ShieldCheck, Lock, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Reveal, SectionHeading } from "./shared";
import { waLink, PHONE_TEL, GUEST_OPTIONS, PACKAGE_OPTIONS } from "./data";
import { trackLead } from "./tracking";

// Backend base URL. If REACT_APP_BACKEND_URL is a full http(s) URL, call it directly.
// Otherwise fall back to a same-origin "/api" path, which works with the Vercel
// rewrite/proxy (see frontend/vercel.json) that forwards /api/* to the backend.
const RAW_BACKEND = process.env.REACT_APP_BACKEND_URL;
const API = `${RAW_BACKEND && /^https?:\/\//.test(RAW_BACKEND) ? RAW_BACKEND : ""}/api`;

const empty = { full_name: "", phone: "", email: "", travel_date: "", guests: "", package: "", message: "" };

export default function BookingForm() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // When a user clicks "Book Now" on a pricing card, pre-select that package here
  // (WhatsApp is NOT opened — only after the form is submitted).
  useEffect(() => {
    const onSelect = (e) => {
      if (e.detail) {
        setForm((f) => ({ ...f, package: e.detail }));
        toast.message("Package selected — fill the form to confirm your booking.");
      }
    };
    window.addEventListener("dd-select-package", onSelect);
    return () => window.removeEventListener("dd-select-package", onSelect);
  }, []);

  const buildWaMessage = () =>
    `Hi Discover Daze Holidays! I'd like to BOOK the 6 Days Kashmir Super Deluxe Package (Flat 30% OFF).\n\n` +
    `Name: ${form.full_name || "-"}\nPhone: ${form.phone || "-"}\nEmail: ${form.email || "-"}\n` +
    `Travel Date: ${form.travel_date || "-"}\nTravellers: ${form.guests || "-"}\nPackage: ${form.package || "-"}` +
    (form.message ? `\nMessage: ${form.message}` : "");

  const isMobile = () =>
    typeof navigator !== "undefined" && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  const validate = () => {
    if (!form.full_name.trim() || !form.phone.trim()) {
      toast.error("Please enter your name and phone number.");
      return false;
    }
    return true;
  };

  // Save the lead to the DB (backend also emails discoverdazeholidays@gmail.com via Resend).
  // Returns true only on success. On failure it surfaces the real error and returns false.
  const postLead = async () => {
    setLoading(true);
    try {
      await axios.post(`${API}/leads`, {
        full_name: form.full_name,
        phone: form.phone,
        email: form.email,
        travel_date: form.travel_date,
        guests: form.guests,
        package: form.package || "6 Days Kashmir Super Deluxe",
        message: form.message,
      });
      trackLead({ value: 9800, currency: "INR" });
      toast.success("Enquiry received! Opening WhatsApp…");
      return true;
    } catch (err) {
      const detail =
        err?.response?.data?.detail ||
        err?.message ||
        "Network error. Please check your connection and try again.";
      toast.error(`Submission failed: ${detail}`);
      // eslint-disable-next-line no-console
      console.error("Lead submission failed:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const url = waLink(buildWaMessage());
    // Desktop: pre-open the tab synchronously inside the click gesture so it is NOT
    // blocked after the await. Mobile: navigate the current tab (most reliable for deep links).
    const preWin = isMobile() ? null : window.open("", "_blank");
    const ok = await postLead();
    if (!ok) {
      if (preWin) preWin.close();
      return; // backend failed — show error, do not silently continue
    }
    if (preWin && !preWin.closed) {
      preWin.location.href = url;
    } else {
      window.location.href = url;
    }
  };

  const handleCall = async () => {
    if (!validate()) return;
    const ok = await postLead();
    if (ok) window.location.href = `tel:${PHONE_TEL}`;
  };

  return (
    <section id="quote" className="relative bg-[#FAFAFA] px-5 py-24 sm:px-8 sm:py-32" data-testid="lead-form-section">
      <div className="mx-auto grid max-w-6xl items-start gap-14 lg:grid-cols-2">
        <div className="lg:sticky lg:top-24">
          <SectionHeading
            chapter="07 —"
            overline="Book Now · Flat 30% OFF"
            title="Reserve your seats in 2 minutes"
            subtitle="Fill the form and our local expert sends your personalised quote on WhatsApp instantly."
          />
          <div className="mt-8 space-y-3">
            {[
              { icon: ShieldCheck, t: "Instant response on WhatsApp — no waiting" },
              { icon: Lock, t: "100% secure. We never share your details" },
              { icon: Users, t: "Only a few seats left at this price this season" },
            ].map(({ icon: I, t }) => (
              <div key={t} className="flex items-center gap-3 text-[15px] text-[#1A1A1A]/75">
                <I className="h-5 w-5 text-[#25D366]" /> {t}
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/8 px-5 py-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4AF37] opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#D4AF37]" />
            </span>
            <p className="text-sm font-medium text-[#0A192F]">High demand — 38 families booked this week</p>
          </div>
        </div>

        <Reveal>
          <form
            onSubmit={handleBook}
            data-testid="lead-form"
            className="rounded-[2rem] border border-[#0A192F]/10 bg-white p-7 shadow-[0_30px_80px_-30px_rgba(10,25,47,0.4)] sm:p-9"
          >
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="full_name" className="text-[#0A192F]">Full Name *</Label>
                  <Input id="full_name" data-testid="lead-name-input" value={form.full_name} onChange={(e) => update("full_name", e.target.value)} placeholder="Aarav Mehta" className="mt-1.5 h-12 border-[#0A192F]/15 bg-[#FAFAFA] focus-visible:ring-[#D4AF37]" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-[#0A192F]">Phone *</Label>
                  <Input id="phone" type="tel" data-testid="lead-phone-input" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 98765 43210" className="mt-1.5 h-12 border-[#0A192F]/15 bg-[#FAFAFA] focus-visible:ring-[#D4AF37]" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email" className="text-[#0A192F]">Email</Label>
                  <Input id="email" type="email" data-testid="lead-email-input" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" className="mt-1.5 h-12 border-[#0A192F]/15 bg-[#FAFAFA] focus-visible:ring-[#D4AF37]" />
                </div>
                <div>
                  <Label htmlFor="travel_date" className="text-[#0A192F]">Travel Date</Label>
                  <Input id="travel_date" type="date" data-testid="lead-date-input" value={form.travel_date} onChange={(e) => update("travel_date", e.target.value)} className="mt-1.5 h-12 border-[#0A192F]/15 bg-[#FAFAFA] focus-visible:ring-[#D4AF37]" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <Label className="text-[#0A192F]">Number of Travellers</Label>
                  <Select value={form.guests} onValueChange={(v) => update("guests", v)}>
                    <SelectTrigger data-testid="lead-guests-select" className="mt-1.5 h-12 border-[#0A192F]/15 bg-[#FAFAFA]"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {GUEST_OPTIONS.map((g) => (<SelectItem key={g} value={g} data-testid={`guest-opt-${g}`}>{g}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-[#0A192F]">Package</Label>
                  <Select value={form.package} onValueChange={(v) => update("package", v)}>
                    <SelectTrigger data-testid="lead-package-select" className="mt-1.5 h-12 border-[#0A192F]/15 bg-[#FAFAFA]"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {PACKAGE_OPTIONS.map((p) => (<SelectItem key={p} value={p} data-testid={`pkg-opt-${p}`}>{p}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-[#0A192F]">Message (optional)</Label>
                <Textarea id="message" data-testid="lead-message-input" value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Any special requests? Honeymoon, kids, dates flexibility…" className="mt-1.5 min-h-[84px] border-[#0A192F]/15 bg-[#FAFAFA] focus-visible:ring-[#D4AF37]" />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <motion.button type="submit" data-testid="lead-submit-btn" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 font-body text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] disabled:opacity-70">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <MessageCircle className="h-5 w-5" />} Book Now on WhatsApp
              </motion.button>
              <motion.button type="button" onClick={handleCall} data-testid="lead-call-btn" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#0A192F]/20 px-6 py-4 font-body text-sm font-semibold text-[#0A192F] hover:bg-[#0A192F] hover:text-white">
                <Phone className="h-5 w-5" /> Call Now
              </motion.button>
            </div>
            <p className="mt-4 text-center text-xs text-[#1A1A1A]/45">🔒 Secure booking • By submitting you agree to be contacted on WhatsApp / phone.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
