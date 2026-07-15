import { Link } from "react-router-dom";
import { Leaf, BarChart3, Route as RouteIcon, ArrowRight } from "lucide-react";
import { PageHero, SectionLabel } from "../components/SectionLabel.jsx";
import SEO from "../components/SEO.jsx";

const FAQ_ITEMS = [
  {
    question: "How much can a Kochi corporate save by switching to an EV fleet?",
    answer: "Per-kilometre energy cost for an EV is typically a fraction of diesel or petrol, and HeadGreen's solar-offset charging plus second-life battery packs push that further. Most Infopark and SmartCity clients see the biggest gains in predictable per-employee transport cost and reduced fuel-price volatility exposure, on top of the ESG reporting value.",
  },
  {
    question: "What counts as Scope 3 commute emissions for ESG reporting?",
    answer: "Employee commuting is typically reported under Scope 3 (value chain emissions) in ESG and BRSR disclosures. Switching your official corporate cab vendor to a 100% electric fleet directly reduces this reported figure and gives HR and sustainability teams a documented, auditable data trail instead of estimates.",
  },
  {
    question: "Is an EV corporate shuttle reliable for shift-based IT company commutes?",
    answer: "Yes — HeadGreen's fleet runs on scheduled, dispatcher-managed routes with live tracking and attendance sync, so shift-based pickups for night shifts and early login windows are covered the same way a conventional cab vendor would, minus the tailpipe emissions.",
  },
];

function ArticleCard({ icon: Icon, tag, title, children }) {
  return (
    <article className="rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.07] shadow-sm dark:shadow-none p-8 md:p-10">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
          <Icon size={18} />
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">{tag}</span>
      </div>
      <h2 className="font-syne text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-sm md:text-base leading-relaxed text-slate-600 dark:text-zinc-400">
        {children}
      </div>
    </article>
  );
}

export default function Blog() {
  return (
    <>
      <SEO
        title="EV Corporate Fleet Blog | HeadGreen Insights"
        description="Guides on EV fleet management, ESG reporting for corporate transport, and EV vs diesel cab cost comparisons for Infopark & SmartCity companies in Kochi."
        path="/blog"
        schemaType="FAQPage"
        faqItems={FAQ_ITEMS}
      />

      <PageHero
        label="HeadGreen Insights"
        title="Guides on sustainable"
        accent="corporate mobility"
        subtitle="Practical, Kochi-specific guides on EV fleet management, ESG reporting for corporate transport, and what switching from diesel to electric actually costs your company."
      />

      <section className="section pt-0 pb-24">
        <div className="mx-auto max-w-3xl space-y-8">

          <ArticleCard icon={RouteIcon} tag="EV Fleet Guide" title="EV Fleet Guide for Kochi Corporates: What to Look for in a Vendor">
            <p>
              Kochi's tech corridor — Infopark, SmartCity, and the wider Kakkanad belt — runs on shift-based commuting: fixed login windows, night-shift pickups, and hundreds of employees converging on the same campuses at the same time. A corporate EV fleet vendor needs to solve that operational problem first, and the sustainability story second.
            </p>
            <p>Before signing a corporate cab contract, evaluate a vendor on:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-slate-800 dark:text-zinc-200">Fleet mix</strong> — sedans and hatchbacks for point-to-point pickups, SUVs and shuttles for group routes. A single-vehicle-type fleet can't flex around headcount changes.</li>
              <li><strong className="text-slate-800 dark:text-zinc-200">Charging &amp; range assurance</strong> — ask whether the fleet runs on grid power or a dedicated solar-charging setup, and how range is guaranteed across double shifts.</li>
              <li><strong className="text-slate-800 dark:text-zinc-200">Attendance &amp; HR integration</strong> — live tracking and attendance sync save your admin team from manually reconciling cab logs every month.</li>
              <li><strong className="text-slate-800 dark:text-zinc-200">Driver verification</strong> — background checks and dedicated dispatch support matter more for daily employee transport than for one-off rides.</li>
              <li><strong className="text-slate-800 dark:text-zinc-200">ESG documentation</strong> — a vendor that can hand you carbon and fuel savings reports, not just an invoice, is doing half your sustainability reporting work for you.</li>
            </ul>
            <p>
              HeadGreen runs a 20+ vehicle fleet — Tata Nexon EV, Tata Tigor EV, Kia Carens Clavis, Citroën ëC3 and BYD e6 — purpose-built for Infopark and SmartCity commute patterns, with live dispatch and attendance sync built in.{" "}
              <Link to="/corporate" className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">See the corporate fleet platform →</Link>
            </p>
          </ArticleCard>

          <ArticleCard icon={BarChart3} tag="ESG Reporting" title="ESG Reporting for Corporate Transport: Turning Commute Data into Compliance">
            <p>
              Employee commuting is one of the more visible — and more fixable — line items under Scope 3 (value chain) emissions in ESG and BRSR disclosures. Unlike supply chain emissions, which can take years to re-engineer, a company's daily commute footprint changes the moment its transport vendor switches to electric.
            </p>
            <p>The practical challenge most sustainability and HR teams run into isn't intent, it's data: diesel cab vendors don't hand over verifiable fuel-consumption or distance logs. That leaves ESG teams estimating instead of reporting.</p>
            <p>
              A dedicated EV fleet closes that gap. Every trip is logged, so distance-based CO₂ and fuel-displacement figures are pulled from actual routing data instead of assumptions. HeadGreen's Carbon Impact Calculator on the{" "}
              <Link to="/corporate" className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">corporate page</Link> gives operations and sustainability teams an instant, headcount-based estimate of annual CO₂ and fuel savings — useful as a starting figure before a formal audit-ready report.
            </p>
          </ArticleCard>

          <ArticleCard icon={Leaf} tag="Cost Comparison" title="Infopark Commute Comparison: EV vs Diesel Cabs">
            <p>
              For a company running daily employee transport into Infopark or SmartCity, the diesel-vs-electric decision usually comes down to three factors: running cost, reliability, and reporting.
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-slate-800 dark:text-zinc-200">Running cost</strong> — electricity cost per kilometre is structurally lower than diesel, and stays that way regardless of crude oil price swings. Solar-offset charging and second-life battery packs push the gap further.</li>
              <li><strong className="text-slate-800 dark:text-zinc-200">Reliability</strong> — modern EVs used for corporate shuttle routes handle Kochi's short, stop-heavy commute distances comfortably within a single charge cycle across a shift.</li>
              <li><strong className="text-slate-800 dark:text-zinc-200">Reporting</strong> — a diesel fleet gives you a fuel bill; an EV fleet with live telemetry gives you a distance-and-emissions ledger you can hand straight to your sustainability team.</li>
            </ul>
            <p>
              The net effect for most Infopark and SmartCity employers: lower and more predictable per-employee transport cost, plus an ESG data trail that a diesel vendor simply can't produce.{" "}
              <Link to="/book" className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">Book a trip to experience the fleet →</Link>
            </p>
          </ArticleCard>

        </div>

        {/* FAQ */}
        <div className="mx-auto max-w-3xl mt-16">
          <SectionLabel index={4}>Frequently Asked Questions</SectionLabel>
          <div className="mt-6 space-y-6">
            {FAQ_ITEMS.map((faq, idx) => (
              <div key={idx} className="rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] p-6 shadow-sm dark:shadow-none">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{faq.question}</h3>
                <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mx-auto max-w-3xl mt-16 rounded-3xl bg-emerald-600 dark:bg-primary p-8 md:p-10 text-center">
          <h2 className="font-syne text-2xl md:text-3xl font-bold text-white dark:text-[#050816]">
            Ready to electrify your corporate commute?
          </h2>
          <p className="mt-2 text-emerald-50 dark:text-[#050816]/80">
            Talk to our team about a dedicated EV fleet for Infopark or SmartCity.
          </p>
          <Link
            to="/corporate"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white dark:bg-[#050816] px-6 py-3 text-sm font-bold text-emerald-700 dark:text-primary shadow-lg transition-transform hover:-translate-y-0.5"
          >
            Request a Fleet Demo <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
