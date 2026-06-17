import { motion } from "framer-motion";
import { Reveal, stagger, fadeUp } from "./motion.jsx";
import { WHY } from "../data/site.js";
import { Leaf, ShieldCheck, Route, MapPin, BarChart3, RefreshCw } from "lucide-react";
import { SectionLabel } from "./SectionLabel.jsx";

// Animated bar for the "On-time" stat card
function OnTimeBar({ pct = 98 }) {
  return (
    <div className="mt-auto pt-5">
      <div className="flex items-end justify-between mb-2">
        <span className="text-[10px] uppercase tracking-widest font-medium text-slate-500 dark:text-zinc-500">On-time Rate</span>
        <span className="font-mono text-xs font-bold text-emerald-500 dark:text-emerald-400">{pct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        />
      </div>
      <div className="mt-2 grid grid-cols-7 gap-0.5">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => {
          const currentDayIndex = (new Date().getDay() + 6) % 7;
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className="w-full rounded-sm"
                style={{
                  height: `${[88, 95, 92, 98, 97, 100, 96][i]}%`,
                  maxHeight: "20px",
                  minHeight: "8px",
                  background: i === currentDayIndex ? "linear-gradient(to top, #10B981, #2DD4BF)" : "rgba(16,185,129,0.25)",
                }}
              />
              <span className="text-[8px] text-slate-400 dark:text-zinc-600 font-mono">{d}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// EV leaf cluster visual
function EcoRing() {
  return (
    <div className="absolute bottom-4 right-4 opacity-[0.08] dark:opacity-[0.06] pointer-events-none">
      <svg viewBox="0 0 80 80" className="w-20 h-20" aria-hidden="true">
        <circle cx="40" cy="40" r="36" stroke="#10B981" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
        <circle cx="40" cy="40" r="24" stroke="#2DD4BF" strokeWidth="1" fill="none" strokeDasharray="3 5" />
        <circle cx="40" cy="40" r="12" fill="#10B981" />
      </svg>
    </div>
  );
}

// Circular lifecycle spin graphic
function CircularSpinRing() {
  return (
    <div className="absolute bottom-4 right-4 opacity-[0.07] dark:opacity-[0.05] pointer-events-none">
      <svg viewBox="0 0 80 80" className="w-20 h-20" aria-hidden="true">
        <circle cx="40" cy="40" r="36" stroke="#10B981" strokeWidth="1.5" fill="none" strokeDasharray="8 4" />
        <circle cx="40" cy="40" r="24" stroke="#2DD4BF" strokeWidth="1" fill="none" strokeDasharray="5 5" />
        <path d="M40 16 A24 24 0 0 1 64 40" stroke="#10B981" strokeWidth="2" fill="none" strokeLinecap="round" />
        <polygon points="64,36 64,44 70,40" fill="#10B981" opacity="0.8" />
      </svg>
    </div>
  );
}

// Zero-emission CO₂ counter chip
function EmissionChip() {
  return (
    <div className="mt-6 inline-flex w-fit self-start items-center gap-2 rounded-full border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-1.5">
      <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">0g</span>
      <span className="text-[10px] uppercase tracking-widest text-emerald-600/70 dark:text-emerald-500/60">Tailpipe CO₂ / Ride</span>
    </div>
  );
}

const BENTO_WHY = [
  {
    icon: Leaf, title: "100% Electric", desc: "Zero tailpipe emissions across every ride — sustained by a solar-offset charging grid, not the fossil grid.",
    span: "md:col-span-2", hero: true,
  },
  {
    icon: BarChart3, title: "Cost Efficient", desc: "Lower per-km cost than conventional fleets — solar charging and second-life batteries structurally reduce your mobility spend.",
    span: "", ontime: true, tall: true,
  },
  {
    icon: ShieldCheck, title: "Safe Drivers", desc: "Verified, background-checked and continuously trained. Every driver operates under 24/7 dispatch oversight.",
    span: "", tall: false,
  },
  {
    icon: Route, title: "Smart Routes", desc: "Predictive AI eliminates dead mileage — routing the fastest, most energy-efficient path across Kochi's tech corridor.",
    span: "", tall: false,
  },
  {
    icon: MapPin, title: "Live Tracking", desc: "Sub-second vehicle telemetry visible to your ops team and every employee, from departure to arrival.",
    span: "", tall: false,
  },
  {
    icon: RefreshCw, title: "Circular Lifecycle", desc: "We intercept capable EVs at their 5–6 year mark, remanufacture battery packs in-house and return them to peak efficiency — eliminating the industrial carbon cost of new vehicle manufacturing.",
    span: "", tall: false, circular: true,
  },
];

export default function WhyUs() {
  return (
    <section className="section">
      <Reveal className="mb-12 max-w-2xl">
        <SectionLabel index={8}>Why Enterprises Choose Us</SectionLabel>
        <h2 className="mt-5 font-syne text-3xl font-light tracking-tight md:text-4xl lg:text-5xl leading-[1.15]">
          Built for operations teams{" "}
          <span className="font-extrabold text-slate-900 dark:text-white">that demand more</span>
        </h2>
      </Reveal>

      <motion.div
        variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
        className="grid gap-4 md:grid-cols-3 auto-rows-auto"
      >
        {BENTO_WHY.map(({ icon: Icon, title, desc, span, hero, ontime, tall, circular }) => (
          <motion.div
            key={title}
            variants={fadeUp}
            className={[
              "group relative overflow-hidden rounded-3xl p-6 flex flex-col",
              "bg-white border border-slate-200/80 shadow-sm",
              "dark:bg-white/[0.02] dark:border-white/[0.07] dark:shadow-none",
              "transition-all duration-500 hover:-translate-y-1",
              "hover:border-emerald-500/30 dark:hover:border-emerald-500/30",
              "hover:shadow-[0_20px_40px_rgba(16,185,129,0.06)] dark:hover:shadow-[0_20px_40px_rgba(16,185,129,0.06)]",
              span,
              tall ? "md:row-span-2 min-h-[300px]" : "min-h-[160px]",
            ].filter(Boolean).join(" ")}
          >
            <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 20% 20%, rgba(16,185,129,0.06) 0%, transparent 70%)" }} />

            {hero && <EcoRing />}
            {circular && <CircularSpinRing />}

            <div className="flex items-start gap-4">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 text-emerald-500 dark:text-emerald-400 transition-all duration-300 group-hover:border-emerald-500/40">
                <div className="absolute -inset-1 rounded-xl bg-emerald-500/5 opacity-0 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
                <Icon size={18} className="relative z-10" />
              </div>
              <div>
                <h3 className={[
                  "font-semibold text-slate-900 dark:text-white/90 leading-tight",
                  hero ? "text-xl" : "text-base",
                ].join(" ")}>{title}</h3>
                <p className={[
                  "mt-1.5 text-slate-500 dark:text-zinc-500 leading-relaxed",
                  hero ? "text-sm" : "text-xs",
                ].join(" ")}>{desc}</p>
              </div>
            </div>

            {hero && <EmissionChip />}
            {ontime && <OnTimeBar pct={98} />}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

