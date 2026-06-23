/**
 * Corporate.jsx — Demo Request Form
 * Dual-channel submission: Email (Web3Forms) + WhatsApp deep link
 * All shared UI components imported from utils/formSubmit.jsx
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "../components/motion.jsx";
import CorporateSection from "../components/CorporateSection.jsx";
import HeadGreenStoryAd from "../components/HeadGreenStoryAd.jsx";
import { Building2, Users, Zap, ShieldCheck } from "lucide-react";
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

// ─── Value pill ───────────────────────────────────────────────────
function ValuePill({ icon: Icon, label }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] px-4 py-2 text-xs font-medium text-slate-700 dark:text-zinc-300 shadow-sm dark:shadow-none">
      <Icon size={13} className="text-emerald-500" />
      {label}
    </div>
  );
}

// ─── Blank state ──────────────────────────────────────────────────
const EMPTY = {
  company: "", contact: "", email: "",
  phone: "", employees: "", requirements: "",
};

// ─── Page ─────────────────────────────────────────────────────────
export default function Corporate() {
  const [fields, setFields]     = useState(EMPTY);
  const [method, setMethod]     = useState("email");
  const [submitting, setSubmit] = useState(false);
  const [status, setStatus]     = useState(null);   // null | "success" | "error"
  const [errMsg, setErrMsg]     = useState("");
  const [turnstileToken, setTurnstileToken] = useState(null);

  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));

  const isValid =
    fields.company.trim() && fields.contact.trim() &&
    fields.phone.trim()   && fields.email.trim();

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
          `Corporate Demo Request — ${fields.company}`,
          "HeadGreen! Automated Dispatch",
          {
            "Company Name":        fields.company,
            "Contact Person":      fields.contact,
            "Work Email":          fields.email,
            "Phone":               fields.phone,
            "Employees Commuting": fields.employees || "Not specified",
            "Requirements":        fields.requirements || "—",
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
      openWhatsApp(buildWhatsAppMessage("CORPORATE DEMO REQUEST", {
        "Company":    fields.company,
        "Contact":    fields.contact,
        "Email":      fields.email,
        "Phone":      fields.phone,
        "Employees":  fields.employees || undefined,
        "Requirements": fields.requirements || undefined,
      }));
    }
  };

  return (
    <>
      <SEO 
        title="B2B Electric Cab Service & Corporate Mobility | HeadGreen" 
        description="Streamline your enterprise logistics with HeadGreen's zero-emission corporate mobility solutions. Reliable B2B employee transport services across Kerala." 
        schemaType="Service" 
        path="/corporate"
      />
      {/* ── PAGE HERO ─────────────────────────────────────────── */}
      <PageHero
        label="Corporate Solutions"
        title="Zero-Emission"
        accent="Corporate Mobility Solutions"
        subtitle="Seamlessly integrate our B2B electric cab service into your daily operations. From Infopark employee transit to corporate airport transfers, achieve your ESG goals effortlessly."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <ValuePill icon={Building2}   label="Dedicated EV Fleet"      />
          <ValuePill icon={Users}       label="Attendance Integration"  />
          <ValuePill icon={Zap}         label="Live Dispatch"           />
          <ValuePill icon={ShieldCheck} label="Verified Drivers"        />
        </div>
      </PageHero>

      {/* ── INTERACTIVE AD ───────────────────────────────────── */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-4">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">
          What HeadGreen Delivers
        </p>
        <HeadGreenStoryAd />
      </section>

      {/* ── PLATFORM SECTION ─────────────────────────────────── */}
      <CorporateSection />

      {/* ── DEMO REQUEST FORM ────────────────────────────────── */}
      <section className="section">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.07] shadow-sm dark:shadow-none p-8 md:p-10">

            <SectionLabel>Request a Demo</SectionLabel>
            <h2 className="mt-5 font-syne text-2xl font-light tracking-tight md:text-3xl text-slate-900 dark:text-white leading-[1.2]">
              Request Your{" "}
              <span className="font-extrabold text-slate-900 dark:text-white">
                Corporate EV Fleet Demo
              </span>
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-zinc-500">
              Choose how you'd like us to reach back — enterprise email or instant WhatsApp.
            </p>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <SuccessCard
                  key="success"
                  title="Request Received! 🎉"
                  body={
                    <>
                      Thank you! Our operations desk has logged your request and will reach out to{" "}
                      <strong className="text-emerald-600 dark:text-emerald-400">
                        team@headgreen.in
                      </strong>{" "}
                      within 4 business hours.
                    </>
                  }
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
                      <label className="label-base" htmlFor="cd-company">Company Name</label>
                      <input id="cd-company" className="input-base" placeholder="Cognizant, Infopark"
                        value={fields.company} onChange={set("company")} required />
                    </div>
                    <div>
                      <label className="label-base" htmlFor="cd-contact">Contact Person</label>
                      <input id="cd-contact" className="input-base" placeholder="Full name"
                        value={fields.contact} onChange={set("contact")} required />
                    </div>
                    <div>
                      <label className="label-base" htmlFor="cd-email">Work Email</label>
                      <input id="cd-email" type="email" className="input-base" placeholder="ops@company.com"
                        value={fields.email} onChange={set("email")} required />
                    </div>
                    <div>
                      <label className="label-base" htmlFor="cd-phone">Phone</label>
                      <input id="cd-phone" type="tel" className="input-base" placeholder="+91 98765 43210"
                        value={fields.phone} onChange={set("phone")} required />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label-base" htmlFor="cd-emp">Employees Commuting Daily</label>
                      <input id="cd-emp" type="number" min="1"
                        className="input-base font-mono text-emerald-600 dark:text-emerald-400"
                        placeholder="250" value={fields.employees} onChange={set("employees")} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label-base" htmlFor="cd-req">Your Requirements</label>
                      <textarea id="cd-req" rows={4} className="input-base resize-none"
                        placeholder="Routes, shift times, special requirements..."
                        value={fields.requirements} onChange={set("requirements")} />
                    </div>
                  </div>

                  {/* Channel selector */}
                  <div className="space-y-2">
                    <label className="label-base">How should we reach you?</label>
                    <MethodToggle value={method} onChange={setMethod} />
                    <ChannelHint method={method} />
                  </div>

                  {/* Turnstile CAPTCHA */}
                  <div className="flex justify-center my-4">
                    <Turnstile
                      siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                      onSuccess={(token) => setTurnstileToken(token)}
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
                    labelEmail="Send via Enterprise Email"
                    labelWhatsApp="Connect via WhatsApp"
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
