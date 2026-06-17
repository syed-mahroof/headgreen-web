import { motion } from "framer-motion";
import { Reveal, stagger, fadeUp } from "./motion.jsx";
import { SERVICES } from "../data/site.js";
import { ArrowUpRight, Building2, Plane, Bus, Clock, MapPin, Users } from "lucide-react";
import { SectionLabel } from "./SectionLabel.jsx";

// Mini SVG route path for the hero card
function RouteMicroVisual() {
  return (
    <svg viewBox="0 0 260 80" className="absolute bottom-0 right-0 h-28 w-auto opacity-[0.07] dark:opacity-[0.06] pointer-events-none" aria-hidden="true">
      <defs>
        <linearGradient id="svc-rt" x1="0" x2="1">
          <stop offset="0" stopColor="#10B981" />
          <stop offset="1" stopColor="#2DD4BF" />
        </linearGradient>
      </defs>
      <path d="M10 70 C 50 55, 80 40, 130 30 S 210 10, 250 15" stroke="url(#svc-rt)" strokeWidth="2.5" fill="none" strokeDasharray="6 5" />
      <circle cx="10" cy="70" r="5" fill="#10B981" />
      <circle cx="10" cy="70" r="11" stroke="#10B981" strokeWidth="1.5" fill="none" opacity="0.4" />
      <circle cx="250" cy="15" r="5" fill="#2DD4BF" />
      <circle cx="250" cy="15" r="11" stroke="#2DD4BF" strokeWidth="1.5" fill="none" opacity="0.4" />
      {/* Midpoint stops */}
      <circle cx="80" cy="42" r="3" fill="#10B981" opacity="0.6" />
      <circle cx="150" cy="25" r="3" fill="#2DD4BF" opacity="0.6" />
    </svg>
  );
}

// Capacity donut ring for the tall card
function CapacityRing({ pct = 78, label = "Fleet Usage" }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex items-center justify-center">
        <svg width="72" height="72" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r={r} stroke="currentColor" strokeWidth="5" fill="none" className="text-slate-200 dark:text-white/10" />
          <circle
            cx="36" cy="36" r={r}
            stroke="url(#cap-ring-grad)" strokeWidth="5"
            fill="none"
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={circ * 0.25}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="cap-ring-grad" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#2DD4BF" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute text-sm font-mono font-bold text-emerald-500 dark:text-emerald-400">{pct}%</span>
      </div>
      <span className="text-[10px] uppercase tracking-widest font-medium text-slate-500 dark:text-zinc-500">{label}</span>
    </div>
  );
}

// Live route counter chip
function LiveChip({ count, label }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-3 py-1">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
      <span className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400">{count}</span>
      <span className="text-[10px] uppercase tracking-wide text-emerald-600/70 dark:text-emerald-500/70">{label}</span>
    </div>
  );
}

// Departure-board tick for airport card
function DepartureBoard() {
  const rows = ["COK → BLR", "COK → DEL", "COK → BOM"];
  return (
    <div className="mt-auto pt-4 space-y-1.5">
      {rows.map((r, i) => (
        <div key={r} className="flex items-center justify-between font-mono text-[10px] text-slate-400 dark:text-zinc-600">
          <span>{r}</span>
          <span className={i === 0 ? "text-emerald-500" : ""}>{i === 0 ? "ON TIME" : i === 1 ? "12:30" : "16:45"}</span>
        </div>
      ))}
    </div>
  );
}

const BENTO_SERVICES = [
  {
    icon: Building2, title: "Corporate Employee Transport", desc: "Reliable daily commute for entire teams — from door to campus and back.",
    span: "md:col-span-2", tall: false, hero: true,
  },
  {
    icon: Plane, title: "Airport Transfer", desc: "On-time pickups for COK & domestic travel.",
    span: "", tall: false, board: true,
  },
  {
    icon: Bus, title: "Tech Park Shuttle", desc: "Optimised high-frequency shuttles into Infopark & SmartCity campuses.",
    span: "", tall: true, ring: true,
  },
  {
    icon: Clock, title: "Shift Based Cab Services", desc: "24/7 coverage with safe, verified night shifts.",
    span: "", tall: false,
  },
  {
    icon: MapPin, title: "Outstation Trips", desc: "Long-distance EV trips across Kerala.",
    span: "", tall: false,
  },
  {
    icon: Users, title: "Daily Employee Pickup", desc: "Optimized door-to-door pickup with AI routing.",
    span: "", tall: false,
  },
];

export default function Services() {
  return (
    <section id="services" className="section">
      <Reveal className="mb-12 max-w-2xl">
        <SectionLabel index={1}>What We Offer</SectionLabel>
        <h2 className="mt-5 font-syne text-3xl font-light tracking-tight md:text-4xl lg:text-5xl leading-[1.15]">
          How we move <span className="font-extrabold text-slate-900 dark:text-white">your people,</span>{" "}
          <span className="font-serif italic font-light text-emerald-400">every day</span>
        </h2>
        <p className="mt-4 text-muted">
          From daily employee pickup to executive airport transfers — one electric fleet, one platform.
        </p>
      </Reveal>

      {/* Bento Grid */}
      <motion.div
        variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
        className="grid gap-4 md:grid-cols-3 auto-rows-auto"
      >
        {BENTO_SERVICES.map(({ icon: Icon, title, desc, span, tall, hero, ring, board }) => (
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
              tall ? "md:row-span-2 min-h-[340px]" : "min-h-[180px]",
            ].filter(Boolean).join(" ")}
          >
            {/* Radial glow */}
            <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 20% 20%, rgba(16,185,129,0.06) 0%, transparent 70%)" }} />

            {hero && <RouteMicroVisual />}

            {/* Header row */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 text-emerald-500 dark:text-emerald-400 transition-all duration-300 group-hover:border-emerald-500/40 group-hover:text-emerald-400 dark:group-hover:text-emerald-300">
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
                    hero ? "text-sm max-w-sm" : "text-xs",
                  ].join(" ")}>{desc}</p>
                </div>
              </div>
              <ArrowUpRight
                size={16}
                className="mt-1 shrink-0 text-slate-300 dark:text-white/20 opacity-0 group-hover:opacity-100 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-all duration-300"
              />
            </div>

            {/* Hero card extras */}
            {hero && (
              <div className="mt-6 flex flex-wrap gap-3">
                <LiveChip count="184" label="Active Trips" />
                <LiveChip count="92" label="Online EVs" />
              </div>
            )}

            {/* Tall card ring */}
            {ring && (
              <div className="mt-auto pt-6 flex justify-center">
                <CapacityRing pct={78} label="Fleet Usage" />
              </div>
            )}

            {/* Airport departure board */}
            {board && <DepartureBoard />}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
