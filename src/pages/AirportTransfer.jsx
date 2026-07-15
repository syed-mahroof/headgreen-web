import { Link } from "react-router-dom";
import { Plane, Clock, ShieldCheck, Zap, MapPin, ArrowRight } from "lucide-react";
import { PageHero, SectionLabel } from "../components/SectionLabel.jsx";
import SEO from "../components/SEO.jsx";

const FAQ_ITEMS = [
  {
    question: "Does HeadGreen serve Cochin International Airport (COK) at Nedumbassery?",
    answer: "Yes. We run zero-emission electric taxi transfers to and from Cochin International Airport (COK) at Nedumbassery, covering Ernakulam, Kakkanad, Infopark and SmartCity pickup and drop points.",
  },
  {
    question: "Can I book a corporate airport transfer for a visiting executive or client?",
    answer: "Yes — HeadGreen handles executive and client airport transfers for corporate accounts, with live tracking shared with your admin team and flight-time-aware scheduling so the driver adjusts for delays.",
  },
  {
    question: "Is the airport EV taxi available for both pickup and drop?",
    answer: "Yes. Book a one-way airport drop, a one-way arrival pickup, or a round trip through our booking page — all served by our 100% electric fleet.",
  },
  {
    question: "How do I book an electric taxi to Kochi airport?",
    answer: "Use the Book a Trip page, select \"Airport Transfer\" as the trip type, and submit your pickup location, destination and travel time. You'll get confirmation via email or WhatsApp, whichever you prefer.",
  },
];

function FeaturePill({ icon: Icon, label }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] px-4 py-2 text-xs font-medium text-slate-700 dark:text-zinc-300 shadow-sm dark:shadow-none">
      <Icon size={13} className="text-emerald-500" />
      {label}
    </div>
  );
}

export default function AirportTransfer() {
  return (
    <>
      <SEO
        title="Kochi Airport EV Taxi | Cochin International Airport Electric Cab"
        description="Book a zero-emission EV taxi to or from Cochin International Airport (COK), Nedumbassery. Flight-time-aware pickups, live tracking, and premium electric cars with driver across Kochi."
        path="/airport-transfer"
        schemaType="FAQPage"
        faqItems={FAQ_ITEMS}
      />

      <PageHero
        label="Cochin International Airport · COK"
        title="Kochi Airport EV Taxi &"
        accent="Electric Cab Transfers"
        subtitle="Zero-emission airport transfers between Cochin International Airport (Nedumbassery) and anywhere across Ernakulam, Kakkanad, Infopark and SmartCity — for individual travellers and corporate accounts alike."
      >
        <div className="flex flex-wrap gap-3">
          <FeaturePill icon={Plane} label="COK Pickup & Drop" />
          <FeaturePill icon={Clock} label="Flight-Time Aware Scheduling" />
          <FeaturePill icon={Zap} label="100% Electric Fleet" />
        </div>
      </PageHero>

      <section className="section pt-0 pb-16">
        <div className="mx-auto max-w-3xl space-y-5 text-sm md:text-base leading-relaxed text-slate-600 dark:text-zinc-400">
          <p>
            Landing at Cochin International Airport and heading into Infopark, SmartCity, or anywhere in Ernakulam shouldn't mean idling in a diesel cab queue. HeadGreen runs a dedicated electric taxi service to and from Nedumbassery, built around real flight schedules rather than fixed time slots — so a delayed landing doesn't mean a missed pickup.
            </p>
          <p>
            Every airport transfer runs on our premium EV fleet — Tata Nexon EV, Tata Tigor EV, Kia Carens Clavis, Citroën ëC3 and BYD e6 — with live GPS tracking shared with you (or your admin team, for corporate bookings) from pickup to drop.
          </p>
          <p>
            For enterprises, this doubles as a corporate travel benefit: route a visiting client or executive through the same account you already use for daily employee transport, with one consolidated bill and one ESG-ready emissions report.
          </p>
        </div>
      </section>

      {/* Feature grid */}
      <section className="section py-16 border-y border-slate-200/50 dark:border-white/[0.02] bg-slate-50 dark:bg-[#03050c]">
        <SectionLabel index={2} className="mb-8">Why Book Your Airport Transfer With Us</SectionLabel>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: Clock, title: "Flight-Time Aware", desc: "Pickup times adjust to real arrival data instead of a fixed slot, so delays don't strand you." },
            { icon: MapPin, title: "Full City Coverage", desc: "Direct routes to Ernakulam, Kakkanad, Infopark, SmartCity, and beyond — pickup or drop, your choice." },
            { icon: ShieldCheck, title: "Verified Drivers", desc: "Background-checked drivers with live dispatch oversight for every airport run, day or night." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-3xl p-7 bg-white border border-slate-200/80 shadow-sm dark:bg-white/[0.02] dark:border-white/[0.07] dark:shadow-none">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <Icon size={18} />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">{title}</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-zinc-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="mx-auto max-w-3xl px-6">
          <SectionLabel index={3}>Frequently Asked Questions</SectionLabel>
          <div className="mt-8 space-y-6">
            {FAQ_ITEMS.map((faq, idx) => (
              <div key={idx} className="rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] p-6 shadow-sm dark:shadow-none">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{faq.question}</h3>
                <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-syne text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            Book your zero-emission airport transfer
          </h2>
          <p className="mt-3 text-slate-500 dark:text-zinc-400">
            Confirmed in minutes, via email or WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/book" className="btn-primary btn-shine overflow-hidden flex items-center gap-1.5">
              Book Airport Transfer <ArrowRight size={16} />
            </Link>
            <Link to="/corporate" className="btn-ghost">Corporate Travel Accounts</Link>
          </div>
        </div>
      </section>
    </>
  );
}
