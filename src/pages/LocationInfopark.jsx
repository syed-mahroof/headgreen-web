import { Link } from "react-router-dom";
import { Building2, MapPin, Zap, ShieldCheck, Route, BarChart3, ArrowRight } from "lucide-react";
import { PageHero, SectionLabel } from "../components/SectionLabel.jsx";
import { STATS } from "../data/site.js";
import SEO from "../components/SEO.jsx";

const FAQ_ITEMS = [
  {
    question: "Does HeadGreen cover both Infopark Phase 1 and Phase 2?",
    answer: "Yes. Our dispatch routing covers Infopark Phase 1, Phase 2, and the surrounding Kakkanad IT corridor, with dedicated pickup points optimised for peak login and logout windows.",
  },
  {
    question: "Can HeadGreen handle night-shift pickups for Infopark IT companies?",
    answer: "Yes — our EV fleet runs round-the-clock dispatch with verified drivers for night-shift and early-morning login windows, backed by 24/7 operations support.",
  },
  {
    question: "How does an Infopark company switch its cab vendor to HeadGreen?",
    answer: "Request a fleet demo from our corporate page with your headcount and shift pattern. Our operations team maps your routes, sets up attendance sync, and can typically onboard a company within a few weeks.",
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

export default function LocationInfopark() {
  return (
    <>
      <SEO
        title="Corporate EV Cabs in Infopark Kochi | HeadGreen"
        description="Dedicated electric taxi service for Infopark Kochi IT companies — daily employee transport, shift-based pickups, attendance sync, and zero-emission airport transfers."
        path="/kochi-infopark"
        schemaType="FAQPage"
        faqItems={FAQ_ITEMS}
      />

      <PageHero
        label="Infopark, Kakkanad"
        title="Corporate EV Fleet in"
        accent="Infopark, Kochi"
        subtitle="Dedicated zero-emission employee transport built for Infopark's IT and ITES campuses — Phase 1, Phase 2, and the wider Kakkanad tech corridor."
      >
        <div className="flex flex-wrap gap-3">
          <FeaturePill icon={Building2} label="Infopark Phase 1 & 2" />
          <FeaturePill icon={ShieldCheck} label="Attendance Integration" />
          <FeaturePill icon={Zap} label="100% Electric Fleet" />
        </div>
      </PageHero>

      <section className="section pt-0 pb-16">
        <div className="mx-auto max-w-3xl space-y-5 text-sm md:text-base leading-relaxed text-slate-600 dark:text-zinc-400">
          <p>
            Infopark Kochi is one of Kerala's densest IT employment hubs, and its commute pattern is unforgiving: thousands of employees converging on the same campus roads within the same 30-minute login window, twice a shift, every working day. A corporate cab vendor for Infopark has to solve punctuality and route density first — sustainability is what separates a good vendor from a forgettable one.
          </p>
          <p>
            HeadGreen runs a dedicated, 100% electric fleet — Tata Nexon EV, Tata Tigor EV, Kia Carens Clavis, Citroën ëC3 and BYD e6 — with AI-assisted route planning tuned specifically to Infopark's peak-hour traffic patterns. Every pickup is live-tracked, every trip syncs to your HR attendance system, and every kilometre driven is zero tailpipe emissions, charged on our solar-offset grid.
          </p>
          <p>
            IT and ITES enterprises across Infopark and the Kakkanad corridor already route their daily employee transport through HeadGreen for exactly this reason: predictable pickups, ESG-ready reporting, and a fleet that scales from a single team to a full campus rollout.
          </p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="section py-12 relative border-y border-slate-200/50 dark:border-white/[0.02] bg-slate-50 dark:bg-[#03050c]">
        <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-5">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-mono font-bold text-emerald-500 dark:text-emerald-400">
                {s.value}{s.suffix}
              </div>
              <div className="mt-1.5 text-xs uppercase tracking-widest text-slate-500 dark:text-zinc-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Infopark companies choose HeadGreen */}
      <section className="section py-16">
        <SectionLabel index={2} className="mb-8">Why Infopark Companies Choose Us</SectionLabel>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: Route, title: "Peak-Hour Route Optimisation", desc: "AI-assisted dispatch built around Infopark's login/logout traffic surges, minimising dead mileage and late arrivals." },
            { icon: MapPin, title: "Phase 1 & 2 Coverage", desc: "Pickup points across both phases of Infopark and the broader Kakkanad IT corridor." },
            { icon: BarChart3, title: "ESG-Ready Reporting", desc: "Distance-based carbon and fuel savings reports your sustainability team can use directly in ESG disclosures." },
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
      <section className="section bg-slate-50 dark:bg-[#03050c] border-y border-slate-200/50 dark:border-white/[0.02]">
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
            Bring zero-emission transport to your Infopark team
          </h2>
          <p className="mt-3 text-slate-500 dark:text-zinc-400">
            Request a fleet demo and get an Infopark-specific route plan within days.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/corporate" className="btn-primary btn-shine overflow-hidden flex items-center gap-1.5">
              Request a Fleet Demo <ArrowRight size={16} />
            </Link>
            <Link to="/smartcity-kakkanad" className="btn-ghost">See SmartCity Coverage</Link>
          </div>
        </div>
      </section>
    </>
  );
}
