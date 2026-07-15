import { Link } from "react-router-dom";
import { Building2, ShieldCheck, Zap, Users, Clock, BarChart3, ArrowRight } from "lucide-react";
import { PageHero, SectionLabel } from "../components/SectionLabel.jsx";
import { STATS } from "../data/site.js";
import SEO from "../components/SEO.jsx";

const FAQ_ITEMS = [
  {
    question: "Does HeadGreen operate inside SmartCity Kochi's gated campus?",
    answer: "Yes. Our drivers are pre-verified for campus entry protocols and our dispatch system accounts for SmartCity's gated-access checkpoints when calculating pickup ETAs, so employees aren't left waiting at the gate.",
  },
  {
    question: "Can HeadGreen manage executive and VIP transfers for SmartCity companies?",
    answer: "Yes — alongside daily employee shuttles, we run premium executive transfers and client-visit transport for SmartCity enterprises that need a higher service tier for leadership and visiting clients.",
  },
  {
    question: "What's the difference between HeadGreen's Infopark and SmartCity coverage?",
    answer: "Both run on the same electric fleet and dispatch platform. Infopark routing is tuned for its Phase 1/2 layout and IT-park density; SmartCity routing accounts for its gated single-campus access and lower-density landscaped layout.",
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

export default function LocationSmartCity() {
  return (
    <>
      <SEO
        title="Electric Corporate Fleet SmartCity Kochi | HeadGreen"
        description="Zero-emission corporate cab service for SmartCity Kochi — gated-campus employee shuttles, executive transfers, and ESG-ready EV fleet for Kakkanad enterprises."
        path="/smartcity-kakkanad"
        schemaType="FAQPage"
        faqItems={FAQ_ITEMS}
      />

      <PageHero
        label="SmartCity, Kakkanad"
        title="Electric Corporate Fleet in"
        accent="SmartCity, Kochi"
        subtitle="Dedicated EV transport for SmartCity Kochi's gated multinational campus — daily employee shuttles, executive transfers, and zero-emission client travel."
      >
        <div className="flex flex-wrap gap-3">
          <FeaturePill icon={Building2} label="Gated Campus Access" />
          <FeaturePill icon={Users} label="Executive Transfers" />
          <FeaturePill icon={Zap} label="100% Electric Fleet" />
        </div>
      </PageHero>

      <section className="section pt-0 pb-16">
        <div className="mx-auto max-w-3xl space-y-5 text-sm md:text-base leading-relaxed text-slate-600 dark:text-zinc-400">
          <p>
            SmartCity Kochi runs differently from a typical IT park — it's a single, gated, master-planned campus, which means every cab has to clear an access checkpoint before it can reach a pickup point. A vendor that doesn't account for that adds friction to every single trip, twice a day, for every employee.
          </p>
          <p>
            HeadGreen's dispatch system factors gate transit time directly into ETA calculations, and our drivers are pre-cleared for campus entry protocols. On top of daily employee shuttles, we run a premium tier for executive and client transfers — useful for SmartCity's mix of multinational tenants who regularly host visiting leadership and clients.
          </p>
          <p>
            The fleet itself is identical to what runs across Infopark: Tata Nexon EV, Tata Tigor EV, Kia Carens Clavis, Citroën ëC3 and BYD e6, all solar-charged and zero tailpipe emissions — so a company running teams across both SmartCity and Infopark gets one consistent vendor, one attendance system, and one ESG report.
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

      {/* Why SmartCity companies choose HeadGreen */}
      <section className="section py-16">
        <SectionLabel index={2} className="mb-8">Built for SmartCity's Campus Layout</SectionLabel>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Gate-Aware Dispatch", desc: "ETAs account for SmartCity's single-entry checkpoint, so pickups stay on schedule instead of stacking up at the gate." },
            { icon: Users, title: "Executive & Client Transfers", desc: "A premium service tier for leadership travel and visiting clients, alongside standard employee shuttles." },
            { icon: BarChart3, title: "Unified ESG Reporting", desc: "One consolidated carbon and fuel savings report across SmartCity and Infopark teams under a single vendor." },
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
            Bring zero-emission transport to your SmartCity team
          </h2>
          <p className="mt-3 text-slate-500 dark:text-zinc-400">
            Request a fleet demo and get a SmartCity-specific route plan within days.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/corporate" className="btn-primary btn-shine overflow-hidden flex items-center gap-1.5">
              Request a Fleet Demo <ArrowRight size={16} />
            </Link>
            <Link to="/kochi-infopark" className="btn-ghost">See Infopark Coverage</Link>
          </div>
        </div>
      </section>
    </>
  );
}
