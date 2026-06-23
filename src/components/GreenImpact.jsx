import { useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Reveal } from "./motion.jsx";
import { Leaf, Droplets, Wind } from "lucide-react";
import { SectionLabel } from "./SectionLabel.jsx";

// ── Radial SVG arc for CO₂ card ────────────────────────────────────────────
function RadialArc({ value, max = 100000, label = "kg CO₂ Saved" }) {
  const r = 54, strokeW = 7;
  const circ = Math.PI * r; // half circle (180°)
  const pct = Math.min(value / max, 1);
  const dash = pct * circ;

  return (
    <div className="relative flex flex-col items-center">
      <svg width="140" height="80" viewBox="0 0 140 80" className="overflow-visible">
        <defs>
          <linearGradient id="arc-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#2DD4BF" />
          </linearGradient>
        </defs>
        {/* Track */}
        <path
          d="M 16 74 A 54 54 0 0 1 124 74"
          fill="none" stroke="currentColor" strokeWidth={strokeW} strokeLinecap="round"
          className="text-slate-200 dark:text-white/10"
        />
        {/* Filled arc */}
        <motion.path
          d="M 16 74 A 54 54 0 0 1 124 74"
          fill="none" stroke="url(#arc-grad)" strokeWidth={strokeW} strokeLinecap="round"
          strokeDasharray={`${circ} ${circ}`}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Center value */}
        <text x="70" y="62" textAnchor="middle" className="fill-slate-900 dark:fill-white font-mono text-sm font-bold"
          style={{ fontSize: "13px", fontFamily: "JetBrains Mono, monospace", fontWeight: 700 }}>
          {Math.round(value / 1000)}k
        </text>
      </svg>
      <span className="text-[9px] uppercase tracking-widest font-semibold text-slate-400 dark:text-zinc-500 -mt-1">{label}</span>
    </div>
  );
}

// ── Liquid fill bar for Fuel card ───────────────────────────────────────────
function FuelBar({ value, max = 50000 }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="mt-4 space-y-2">
      <div className="flex justify-between text-[9px] font-mono font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
        <span>0 L</span><span>{Math.round(max / 1000)}k L</span>
      </div>
      <div className="relative h-3 w-full rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: "linear-gradient(to right, #0d9488, #2DD4BF)" }}
          initial={{ width: "0%" }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Wave shimmer */}
        <div
          className="absolute inset-y-0 rounded-full opacity-30"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)",
            backgroundSize: "200% 100%",
            animation: "shine 2.5s linear infinite",
          }}
        />
      </div>
      <div className="text-right font-mono text-sm font-bold text-teal-500 dark:text-teal-400">
        <CountUp end={value} duration={1.3} separator="," preserveValue />
        <span className="text-[10px] font-medium text-slate-400 dark:text-zinc-500 ml-1">litres / yr</span>
      </div>
    </div>
  );
}

// ── Leaf icon cluster for Trees card ────────────────────────────────────────
function LeafCluster({ count }) {
  // Map count to display cluster (1–10 leaf icons)
  const leaves = Math.min(Math.ceil(count / 50), 10);
  return (
    <div className="mt-4 flex flex-wrap gap-1.5">
      {Array.from({ length: leaves }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: i * 0.04, ease: "backOut" }}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-lime-50 dark:bg-lime-500/10 border border-lime-200 dark:border-lime-500/20 text-lime-600 dark:text-lime-400"
        >
          <Leaf size={13} />
        </motion.div>
      ))}
      {count > leaves * 50 && (
        <div className="flex h-7 items-center px-2 rounded-full bg-lime-50 dark:bg-lime-500/10 border border-lime-200 dark:border-lime-500/20 text-lime-600 dark:text-lime-400 text-[10px] font-mono font-bold">
          +{count - leaves * 50}
        </div>
      )}
    </div>
  );
}

// ── Manufacturing Void Callout ──────────────────────────────────────────────
function ManufacturingVoid({ employees, trees }) {
  const avoidedEmissions = Math.round(employees * 3.2);

  return (
    <div className="mt-8 relative overflow-hidden rounded-2xl border border-slate-200 dark:border-emerald-500/10 bg-slate-100/80 dark:bg-emerald-950/10 text-slate-900 dark:text-zinc-200 p-6 shadow-sm dark:shadow-none transition-colors duration-300 group">
      {/* Absolute radial dark glow */}
      <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: "radial-gradient(circle at 100% 100%, rgba(16,185,129,0.08) 0%, transparent 60%)" }} />
      
      {/* Top Header / Badge */}
      <div className="flex items-center gap-2 mb-5">
        <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
            <path d="M2 20h20" />
            <path d="M4 20V8l4 4V8l4 4V8l4 4v8" opacity="0.4" />
            <path d="M11 20a4.5 4.5 0 0 1-2-8 4.5 4.5 0 0 1 8-2 4.5 4.5 0 0 1-2 8 4.5 4.5 0 0 1-4 2" />
            <path d="M15 12L12 15" />
          </svg>
        </div>
        <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-slate-500 dark:text-emerald-500/70">
          Circular Infrastructure Offset
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
        {/* Left Column: Data Point */}
        <div className="shrink-0">
          <div className="text-[9px] uppercase tracking-widest font-semibold text-slate-400 dark:text-zinc-500 mb-1.5">
            Manufacturing Footprint Avoided
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-mono font-bold tracking-tighter text-emerald-600 dark:text-emerald-400">
              ~{avoidedEmissions.toLocaleString()}
            </span>
            <span className="text-xl font-medium text-emerald-600/70 dark:text-emerald-400/70">t</span>
          </div>
        </div>

        {/* Vertical divider on desktop */}
        <div className="hidden sm:block w-px h-14 bg-slate-200 dark:bg-emerald-500/10" />

        {/* Right Column: Narrative */}
        <div className="flex-1">
          <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
            By running a second-life fleet, you intercept the industrial carbon cost of new vehicles — equating to an additional <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">{trees.toLocaleString()} trees</span> of impact.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GreenImpact() {
  const [employees, setEmployees] = useState(100);
  const co2 = Math.round(employees * 4.6 * 22);   // kg CO₂ saved / yr
  const fuel = Math.round(employees * 2.1 * 22);   // litres saved / yr
  const trees = Math.round(co2 / 21);              // equiv trees / yr

  return (
    <section className="section relative">
      <Reveal className="mb-10 max-w-2xl">
        <SectionLabel index={4}>Carbon Impact Calculator</SectionLabel>
        <h2 className="mt-5 font-syne text-3xl font-light tracking-tight md:text-4xl lg:text-5xl leading-[1.15]">
          Calculate your fleet's{" "}
          <span className="font-extrabold text-slate-900 dark:text-white">climate contribution</span>
        </h2>
        <p className="mt-3 text-muted">Drag the slider — see the exact CO₂, fuel and tree-equivalent impact your company generates each year with HeadGreen.</p>
      </Reveal>

      <div className="rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.07] shadow-sm dark:shadow-none p-5 sm:p-8 flex flex-col lg:flex-row gap-10 lg:items-center w-full">

        {/* ── Slider ── */}
        <div className="w-full lg:w-1/2">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 dark:text-zinc-500 block mb-1">Employees</span>
              <span className="text-6xl font-mono font-bold tracking-tighter text-emerald-500 dark:text-emerald-400 tabular-nums">
                {employees.toLocaleString()}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 dark:text-zinc-500 block mb-1">Per year</span>
              <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
                {Math.round(co2 / 1000)}t CO₂ · {Math.round(fuel / 1000)}k L · {trees} trees
              </span>
            </div>
          </div>
          <input
            type="range" min={10} max={2000} step={10} value={employees}
            onChange={(e) => setEmployees(+e.target.value)}
            className="custom-range w-full py-4 touch-none"
            style={{
              background: `linear-gradient(to right, #10b981 0%, #10b981 ${((employees - 10) / (2000 - 10)) * 100}%, var(--track-color) ${((employees - 10) / (2000 - 10)) * 100}%, var(--track-color) 100%)`
            }}
          />
          <div className="mt-2 flex justify-between text-[10px] font-mono text-slate-400 dark:text-zinc-600">
            <span>10</span><span>2,000</span>
          </div>

          {/* Manufacturing Void Callout */}
          <ManufacturingVoid employees={employees} trees={trees} />
        </div>

        {/* ── Three metric cards ── */}
        <div className="w-full lg:w-1/2 grid gap-4">

          {/* CO₂ card — radial arc */}
          <div className="rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 transition-all duration-300 hover:border-emerald-500/30 dark:hover:border-emerald-500/25 text-center sm:text-left">
            <RadialArc value={co2} max={employees <= 100 ? 20000 : employees <= 500 ? 100000 : 500000} />
            <div className="flex-1 w-full">
              <div className="text-2xl font-mono font-bold tracking-tighter text-slate-900 dark:text-white flex items-baseline justify-center sm:justify-start">
                <CountUp end={co2} duration={1.2} separator="," preserveValue />
                <span className="text-base ml-1 text-slate-400 dark:text-zinc-500 font-normal">kg</span>
              </div>
              <div className="text-[10px] uppercase tracking-widest font-semibold text-emerald-600 dark:text-emerald-500 mt-1">CO₂ Saved / yr</div>
              <div className="mt-2 text-xs text-slate-400 dark:text-zinc-600 leading-relaxed">
                Tailpipe savings from switching to HeadGreen's solar-charged, second-life EV fleet — without the industrial carbon burden of new vehicle production.
              </div>
            </div>
          </div>

          {/* Fuel card — liquid fill bar */}
          <div className="rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] p-5 transition-all duration-300 hover:border-teal-500/30 dark:hover:border-teal-500/25">
            <div className="flex items-center gap-3 mb-1">
              <Droplets size={16} className="text-teal-500" />
              <div className="text-2xl font-mono font-bold tracking-tighter text-slate-900 dark:text-white">
                <CountUp end={fuel} duration={1.2} separator="," preserveValue />
                <span className="text-base ml-1 text-slate-400 dark:text-zinc-500 font-normal">L</span>
              </div>
            </div>
            <div className="text-[10px] uppercase tracking-widest font-semibold text-teal-600 dark:text-teal-500 mb-1">Fuel Saved / yr</div>
            <FuelBar value={fuel} max={Math.max(fuel * 1.3, 1000)} />
          </div>

          {/* Trees card — leaf cluster */}
          <div className="rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] p-5 transition-all duration-300 hover:border-lime-500/30 dark:hover:border-lime-500/25">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-mono font-bold tracking-tighter text-slate-900 dark:text-white">
                  <CountUp end={trees} duration={1.2} separator="," preserveValue />
                </div>
                <div className="text-[10px] uppercase tracking-widest font-semibold text-lime-600 dark:text-lime-500 mt-1">Trees Equivalent / yr</div>
              </div>
              <Leaf size={24} className="text-lime-400 dark:text-lime-500 opacity-60" />
            </div>
            <LeafCluster count={Math.min(trees, 500)} />
          </div>
        </div>
      </div>
    </section>
  );
}

