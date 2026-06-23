/**
 * BookTrip.jsx — On-Demand EV Ride Booking
 * Dual-channel submission: Email (Web3Forms) + WhatsApp deep link
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, MapPin, Leaf } from "lucide-react";
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

// ─── Benefit strip ────────────────────────────────────────────────
function BenefitRow() {
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      {[
        { icon: Clock,  text: "Confirmed in minutes"   },
        { icon: MapPin, text: "Kochi-wide coverage"    },
        { icon: Leaf,   text: "100% electric vehicles" },
      ].map(({ icon: Icon, text }) => (
        <div key={text} className="flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-400">
          <Icon size={14} className="text-emerald-500 shrink-0" />
          {text}
        </div>
      ))}
    </div>
  );
}

// ─── Blank state ──────────────────────────────────────────────────
const EMPTY = {
  name: "", phone: "", pickup: "", destination: "",
  date: "", time: "", passengers: "1", tripType: "One Way", notes: "",
};

// ─── Page ─────────────────────────────────────────────────────────
export default function BookTrip() {
  const [fields, setFields]     = useState(EMPTY);
  const [method, setMethod]     = useState("email");
  const [submitting, setSubmit] = useState(false);
  const [status, setStatus]     = useState(null);   // null | "success" | "error"
  const [errMsg, setErrMsg]     = useState("");
  const [turnstileToken, setTurnstileToken] = useState(null);

  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));

  const isValid =
    fields.name.trim() && fields.phone.trim() &&
    fields.pickup.trim() && fields.destination.trim() &&
    fields.date && fields.time;

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
          `New Ride Booking — ${fields.name}`,
          "HeadGreen! Automated Dispatch",
          {
            "Passenger Name": fields.name,
            "Phone":          fields.phone,
            "Pickup":         fields.pickup,
            "Destination":    fields.destination,
            "Date":           fields.date,
            "Time":           fields.time,
            "Passengers":     fields.passengers,
            "Trip Type":      fields.tripType,
            "Notes":          fields.notes || "—",
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
      openWhatsApp(buildWhatsAppMessage("RIDE BOOKING REQUEST", {
        "Name":        fields.name,
        "Phone":       fields.phone,
        "Pickup":      fields.pickup,
        "Destination": fields.destination,
        "Date":        fields.date,
        "Time":        fields.time,
        "Passengers":  fields.passengers,
        "Trip Type":   fields.tripType,
        "Notes":       fields.notes || undefined,
      }));
    }
  };

  return (
    <>
      <SEO 
        title="Book Corporate Electric Cabs | EV Airport Transfers Kochi" 
        description="Book on-demand zero-emission EV airport transfers and corporate rides in Kochi. Fast, reliable, and 100% electric." 
        schemaType="Action" 
        path="/book"
      />
      <PageHero
        label="On-Demand EV Rides"
        title="Book On-Demand Corporate"
        accent="EV Rides in Kochi"
        subtitle="Need reliable B2B employee transport or executive airport transfers? Book our premium electric cab service in minutes and experience zero-emission corporate mobility."
      >
        <BenefitRow />
      </PageHero>

      <section className="section pt-4 pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.07] shadow-sm dark:shadow-none p-8 md:p-10">
            <SectionLabel>Trip Details</SectionLabel>
            <h2 className="mt-4 font-syne text-xl font-semibold text-slate-900 dark:text-white">
              Where are you headed?
            </h2>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <SuccessCard
                  key="success"
                  title="Booking Received! 🚗⚡"
                  body="Thank you! Our operations desk has logged your ride request. We'll confirm via email within 4 hours."
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
                      <label className="label-base" htmlFor="bt-name">Your Name</label>
                      <input id="bt-name" className="input-base" placeholder="Full name"
                        value={fields.name} onChange={set("name")} required />
                    </div>
                    <div>
                      <label className="label-base" htmlFor="bt-phone">Phone</label>
                      <input id="bt-phone" type="tel" className="input-base" placeholder="+91 98765 43210"
                        value={fields.phone} onChange={set("phone")} required />
                    </div>
                    <div>
                      <label className="label-base" htmlFor="bt-pickup">Pickup Location</label>
                      <input id="bt-pickup" className="input-base" placeholder="Kakkanad, Ernakulam..."
                        value={fields.pickup} onChange={set("pickup")} required />
                    </div>
                    <div>
                      <label className="label-base" htmlFor="bt-dest">Destination</label>
                      <input id="bt-dest" className="input-base" placeholder="Infopark Phase 1..."
                        value={fields.destination} onChange={set("destination")} required />
                    </div>
                    <div>
                      <label className="label-base" htmlFor="bt-date">Date</label>
                      <input id="bt-date" type="date" className="input-base"
                        value={fields.date} onChange={set("date")} required />
                    </div>
                    <div>
                      <label className="label-base" htmlFor="bt-time">Time</label>
                      <input id="bt-time" type="time" className="input-base"
                        value={fields.time} onChange={set("time")} required />
                    </div>
                    <div>
                      <label className="label-base" htmlFor="bt-pax">Passengers</label>
                      <input id="bt-pax" type="number" min="1" className="input-base font-mono text-emerald-600 dark:text-emerald-400"
                        value={fields.passengers} onChange={set("passengers")} required />
                    </div>
                    <div>
                      <label className="label-base" htmlFor="bt-type">Trip Type</label>
                      <select id="bt-type" className="input-base"
                        value={fields.tripType} onChange={set("tripType")}>
                        <option>One Way</option>
                        <option>Round Trip</option>
                        <option>Outstation</option>
                        <option>Airport Transfer</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="label-base" htmlFor="bt-notes">Notes (optional)</label>
                      <textarea id="bt-notes" rows={3} className="input-base resize-none"
                        placeholder="Any special requests, multiple stops, accessibility needs..."
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
                    labelEmail="Confirm Ride Booking"
                    labelWhatsApp="Book via WhatsApp"
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
