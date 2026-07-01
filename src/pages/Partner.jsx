/**
 * Partner.jsx — Driver & Fleet Partner Application
 * Dual-channel submission: Email (Web3Forms) + WhatsApp deep link
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IndianRupee, Shield, Star } from "lucide-react";
import { PageHero, SectionLabel } from "../components/SectionLabel.jsx";
import {
  buildWhatsAppMessage,
  openWhatsApp,
  submitToWeb3Forms,
  MethodToggle,
  ChannelHint,
  SuccessCard,
  ErrorBanner,
  SubmitButton,
} from "../utils/formSubmit.jsx";
import SEO from "../components/SEO.jsx";
import { Turnstile } from "@marsidev/react-turnstile";

// ─── Benefit cards ────────────────────────────────────────────────
const BENEFITS = [
  {
    icon: IndianRupee,
    title: "Predictable Income",
    desc: "Corporate contracts mean guaranteed trip volume — no dead hours waiting for surge rides.",
  },
  {
    icon: Shield,
    title: "Safety First",
    desc: "Background verification, insurance coverage and 24/7 dispatch support on every shift.",
  },
  {
    icon: Star,
    title: "Premium Clientele",
    desc: "Drive for Cognizant, Wipro, EY and other Infopark enterprises — rated rides, no cash handling.",
  },
];

// ─── Blank state ──────────────────────────────────────────────────
const EMPTY = {
  name: "", phone: "", vehicleType: "EV Sedan",
  vehicleNumber: "", experience: "", location: "", notes: "",
};

// ─── Page ─────────────────────────────────────────────────────────
export default function Partner() {
  const [fields, setFields]     = useState(EMPTY);
  const [method, setMethod]     = useState("email");
  const [submitting, setSubmit] = useState(false);
  const [status, setStatus]     = useState(null);   // null | "success" | "error"
  const [errMsg, setErrMsg]     = useState("");
  const [turnstileToken, setTurnstileToken] = useState(null);
  
  const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));

  const isValid =
    fields.name.trim() && fields.phone.trim() &&
    fields.vehicleNumber.trim() && fields.experience.trim() &&
    fields.location.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    if (!turnstileToken) {
      setErrMsg("Please complete the security verification.");
      setStatus("error");
      return;
    }

    if (method === "email") {
      setSubmit(true);
      setStatus(null);
      setErrMsg("");
      try {
        await submitToWeb3Forms(
          `New Driver Application — ${fields.name}`,
          "HeadGreen! Automated Dispatch",
          {
            "Driver Name":        fields.name,
            "Phone":              fields.phone,
            "Vehicle Type":       fields.vehicleType,
            "Vehicle Reg. No.":   fields.vehicleNumber,
            "Experience (yrs)":   fields.experience,
            "Home Location":      fields.location,
            "Additional Notes":   fields.notes || "—",
          }
        );
        setStatus("success");
        setFields(EMPTY);
      } catch (err) {
        setStatus("error");
        setErrMsg(err.message);
      } finally {
        setSubmit(false);
      }
    } else {
      openWhatsApp(buildWhatsAppMessage("DRIVER APPLICATION", {
        "Name":           fields.name,
        "Phone":          fields.phone,
        "Vehicle Type":   fields.vehicleType,
        "Vehicle No.":    fields.vehicleNumber,
        "Experience":     `${fields.experience} yrs`,
        "Location":       fields.location,
        "Notes":          fields.notes || undefined,
      }));
    }
  };

  return (
    <>
      <SEO 
        title="Become a Driver Partner | HeadGreen!" 
        description="Join Kochi's cleanest way to earn. Drive for premium corporate clients like Infopark enterprises with guaranteed trip volumes. Apply as a driver today!" 
        schemaType="JobPosting" 
      />
      <PageHero
        label="Driver & Fleet Partners"
        title="Earn more, drive"
        accent="electric"
        subtitle="Join HeadGreen's driver and fleet partner network. Premium corporate contracts, predictable income, zero emissions — Kochi's cleanest way to earn."
      />

      {/* ── BENEFITS ─────────────────────────────────────────── */}
      <section className="section py-16">
        <SectionLabel className="mb-8">Why Partner With Us</SectionLabel>
        <div className="grid gap-5 md:grid-cols-3">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-3xl p-7
                bg-white border border-slate-200/80 shadow-sm
                dark:bg-white/[0.02] dark:border-white/[0.07] dark:shadow-none
                hover:border-emerald-500/30 dark:hover:border-emerald-500/25
                hover:-translate-y-1 transition-all duration-500"
            >
              <div
                className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 0% 0%, rgba(16,185,129,0.06) 0%, transparent 70%)" }}
              />
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <Icon size={18} />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">{title}</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-zinc-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── APPLICATION FORM ─────────────────────────────────── */}
      <section className="section pt-4 pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.07] shadow-sm dark:shadow-none p-8 md:p-10">
            <SectionLabel>Driver Application</SectionLabel>
            <h2 className="mt-4 font-syne text-xl font-semibold text-slate-900 dark:text-white">
              Tell us about you and your vehicle
            </h2>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <SuccessCard
                  key="success"
                  title="Application Submitted! 🙌"
                  body="Thank you! Our operations desk has logged your driver application and will reach out within 4 business hours."
                  onReset={() => { setStatus(null); setFields(EMPTY); }}
                />
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={false}
                  className="mt-8 space-y-5"
                >
                  {/* Fields grid */}
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="label-base" htmlFor="pa-name">Full Name</label>
                      <input id="pa-name" className="input-base" placeholder="Your name"
                        value={fields.name} onChange={set("name")} required />
                    </div>
                    <div>
                      <label className="label-base" htmlFor="pa-phone">Phone Number</label>
                      <input id="pa-phone" type="tel" className="input-base" placeholder="+91 98765 43210"
                        value={fields.phone} onChange={set("phone")} required />
                    </div>
                    <div>
                      <label className="label-base" htmlFor="pa-vtype">Vehicle Type</label>
                      <select id="pa-vtype" className="input-base"
                        value={fields.vehicleType} onChange={set("vehicleType")}>
                        <option>EV Sedan</option>
                        <option>EV Hatchback</option>
                        <option>EV SUV</option>
                        <option>EV Shuttle / Van</option>
                      </select>
                    </div>
                    <div>
                      <label className="label-base" htmlFor="pa-vreg">Vehicle Registration</label>
                      <input id="pa-vreg" className="input-base font-mono" placeholder="KL-07-EV-1234"
                        value={fields.vehicleNumber} onChange={set("vehicleNumber")} required />
                    </div>
                    <div>
                      <label className="label-base" htmlFor="pa-exp">Driving Experience (years)</label>
                      <input id="pa-exp" type="number" min="0" className="input-base font-mono text-emerald-600 dark:text-emerald-400"
                        placeholder="5" value={fields.experience} onChange={set("experience")} required />
                    </div>
                    <div>
                      <label className="label-base" htmlFor="pa-loc">Your Home Location</label>
                      <input id="pa-loc" className="input-base" placeholder="Kakkanad, Ernakulam..."
                        value={fields.location} onChange={set("location")} required />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label-base" htmlFor="pa-notes">Anything else to share?</label>
                      <textarea id="pa-notes" rows={3} className="input-base resize-none"
                        placeholder="Preferred zones, shift availability, questions..."
                        value={fields.notes} onChange={set("notes")} />
                    </div>
                  </div>

                  {/* Channel selector */}
                  <div className="space-y-2">
                    <label className="label-base">How should we reach you?</label>
                    <MethodToggle value={method} onChange={setMethod} />
                    <ChannelHint method={method} />
                  </div>

                  {/* Turnstile CAPTCHA */}
                  <div className="flex justify-center my-4 min-h-[65px]">
                    <Turnstile
                      siteKey={SITE_KEY}
                      onSuccess={(token) => setTurnstileToken(token)}
                      onError={() => setErrMsg("Security widget failed to load. Please disable adblockers or refresh.")}
                      options={{ theme: "auto" }}
                    />
                  </div>

                  {/* Error */}
                  <ErrorBanner message={status === "error" ? errMsg : ""} />

                  {/* Submit */}
                  <SubmitButton
                    method={method}
                    isSubmitting={submitting}
                    isDisabled={!isValid}
                    labelEmail="Submit Application"
                    labelWhatsApp="Apply via WhatsApp"
                  />
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}
