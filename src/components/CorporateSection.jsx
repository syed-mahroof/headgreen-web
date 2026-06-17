import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, stagger, fadeUp } from "./motion.jsx";
import { CORPORATE_FEATURES } from "../data/site.js";
import { SectionLabel } from "./SectionLabel.jsx";

// ─────────────────────────────────────────────
// TAB: OVERVIEW
// ─────────────────────────────────────────────
function OverviewTab() {
  const stats = [
    { label: "Active Trips", value: "184", delta: "+12", up: true },
    { label: "Fleet Online", value: "92", delta: "+3", up: true },
    { label: "On-time", value: "98%", delta: "+0.4%", up: true },
  ];
  const feed = [
    { plate: "KL-07-EV-1204", route: "Kakkanad → Infopark", status: "En Route", time: "ETA 4m" },
    { plate: "KL-07-EV-0891", route: "SmartCity → Edapally", status: "Arrived", time: "2m ago" },
    { plate: "KL-07-EV-2033", route: "Palarivattom → HiLite", status: "En Route", time: "ETA 11m" },
    { plate: "KL-07-EV-0445", route: "MG Road → Infopark", status: "Charging", time: "—" },
  ];
  const statusColor = {
    "En Route": "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    "Arrived": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    "Charging": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  };
  return (
    <motion.div key="overview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
      {/* Stat row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] p-3">
            <div className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase tracking-wider font-medium">{s.label}</div>
            <div className="mt-1 text-2xl font-mono font-bold tracking-tighter text-slate-900 dark:text-white">{s.value}</div>
            <div className={`mt-0.5 text-[10px] font-semibold font-mono ${s.up ? "text-emerald-500" : "text-red-400"}`}>
              {s.delta} today
            </div>
          </div>
        ))}
      </div>
      {/* Live trip feed */}
      <div className="rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 dark:border-white/[0.05]">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 dark:text-zinc-500">Live Trip Feed</span>
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE
          </span>
        </div>
        {feed.map((f) => (
          <div key={f.plate} className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 dark:border-white/[0.03] last:border-b-0">
            <div>
              <div className="text-[11px] font-mono font-semibold text-slate-700 dark:text-zinc-200">{f.plate}</div>
              <div className="text-[10px] text-slate-400 dark:text-zinc-600 mt-0.5">{f.route}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${statusColor[f.status]}`}>{f.status}</span>
              <span className="text-[9px] font-mono text-slate-400 dark:text-zinc-600">{f.time}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// TAB: FLEET
// ─────────────────────────────────────────────
function CapacityMini({ pct }) {
  const r = 12, circ = 2 * Math.PI * r;
  return (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r={r} stroke="currentColor" strokeWidth="3" fill="none" className="text-slate-200 dark:text-white/10" />
      <circle cx="16" cy="16" r={r} stroke="#10B981" strokeWidth="3" fill="none"
        strokeDasharray={`${(pct / 100) * circ} ${circ}`}
        strokeDashoffset={circ * 0.25} strokeLinecap="round" />
    </svg>
  );
}

function FleetTab() {
  const vehicles = [
    { plate: "KL-07-EV-1204", model: "Premium EV Sedan", status: "Online", battery: 87, trips: 14 },
    { plate: "KL-07-EV-0891", model: "Executive EV", status: "Online", battery: 62, trips: 9 },
    { plate: "KL-07-EV-2033", model: "Corporate Shuttle", status: "Online", battery: 45, trips: 7 },
    { plate: "KL-07-EV-0445", model: "EV Hatchback", status: "Charging", battery: 23, trips: 3 },
  ];
  const statusDot = { Online: "bg-emerald-500", Charging: "bg-amber-500" };
  return (
    <motion.div key="fleet" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
      <div className="rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 px-4 py-2 border-b border-slate-200 dark:border-white/[0.05]">
          <span className="text-[9px] uppercase tracking-widest font-semibold text-slate-400 dark:text-zinc-600">Vehicle</span>
          <span className="text-[9px] uppercase tracking-widest font-semibold text-slate-400 dark:text-zinc-600 text-center">Batt.</span>
          <span className="text-[9px] uppercase tracking-widest font-semibold text-slate-400 dark:text-zinc-600 text-center">Trips</span>
        </div>
        {vehicles.map((v) => (
          <div key={v.plate} className="grid grid-cols-[1fr_auto_auto] gap-x-4 items-center px-4 py-3 border-b border-slate-100 dark:border-white/[0.03] last:border-b-0">
            <div className="flex items-center gap-2.5">
              <span className={`h-2 w-2 shrink-0 rounded-full ${statusDot[v.status]}`} />
              <div>
                <div className="text-[11px] font-mono font-semibold text-slate-700 dark:text-zinc-200">{v.plate}</div>
                <div className="text-[10px] text-slate-400 dark:text-zinc-600">{v.model}</div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <CapacityMini pct={v.battery} />
              <span className="text-[9px] font-mono font-bold text-emerald-500 mt-0.5">{v.battery}%</span>
            </div>
            <div className="text-center font-mono text-sm font-bold text-slate-700 dark:text-zinc-200">{v.trips}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// TAB: ANALYTICS
// ─────────────────────────────────────────────
function AnalyticsTab() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const vals = [142, 168, 155, 184, 177, 98, 60];
  const max = Math.max(...vals);
  return (
    <motion.div key="analytics" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
      <div className="rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 dark:text-zinc-500">Trips This Week</span>
          <span className="font-mono text-xs font-bold text-emerald-500">+18% vs last week</span>
        </div>
        {/* Bar chart */}
        <div className="flex items-end gap-2 h-24">
          {vals.map((v, i) => (
            <div key={days[i]} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                className={`w-full rounded-t-md ${i === 3 ? "bg-gradient-to-t from-emerald-600 to-teal-400" : "bg-emerald-500/30 dark:bg-emerald-500/20"}`}
                initial={{ height: 0 }}
                whileInView={{ height: `${(v / max) * 80}px` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                style={{ minHeight: "4px" }}
              />
              <span className="text-[8px] font-mono text-slate-400 dark:text-zinc-600">{days[i].slice(0, 1)}</span>
            </div>
          ))}
        </div>
        {/* Sparkline metrics */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-white/[0.05]">
          {[
            { label: "Avg / day", value: "155" },
            { label: "Peak", value: "184" },
            { label: "CO₂ saved", value: "1.2t" },
          ].map((m) => (
            <div key={m.label} className="text-center">
              <div className="font-mono text-base font-bold text-slate-800 dark:text-white">{m.value}</div>
              <div className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-zinc-600 mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// THE MAIN DASHBOARD MOCK
// ─────────────────────────────────────────────
export function DashboardMock({ activeTab: controlledTab }) {
  const [internalTab, setInternalTab] = useState("overview");
  // Use external controlled tab if provided, otherwise use internal state
  const activeTab = controlledTab ?? internalTab;
  const setActiveTab = (t) => { if (!controlledTab) setInternalTab(t); };
  const tabs = ["overview", "fleet", "analytics"];

  return (
    <div className="rounded-3xl bg-white dark:bg-card/30 border border-slate-200 dark:border-white/[0.06] shadow-sm dark:shadow-none relative overflow-hidden p-5">
      {/* Chrome bar */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
        </div>
        <div className="flex items-center gap-2">
          <div className="text-[10px] font-mono text-slate-400 dark:text-zinc-600 tracking-wider">headgreen.in/admin</div>
          <span className="flex items-center gap-1 text-[9px] font-mono font-semibold text-emerald-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE
          </span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="mb-5 flex gap-1 rounded-xl bg-slate-100 dark:bg-white/[0.04] p-1 w-full">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={[
              "flex-1 rounded-lg px-3 py-1.5 text-[11px] font-semibold capitalize transition-all duration-200",
              activeTab === tab
                ? "bg-white dark:bg-white/[0.08] text-slate-900 dark:text-white shadow-sm"
                : "text-slate-400 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-zinc-300",
            ].join(" ")}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content with AnimatePresence */}
      <AnimatePresence mode="wait">
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "fleet" && <FleetTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </AnimatePresence>

      {/* Ambient glow */}
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/10 dark:bg-emerald-500/10 blur-3xl pointer-events-none" />
    </div>
  );
}

// ─────────────────────────────────────────────
// CORPORATE SECTION
// ─────────────────────────────────────────────
export default function CorporateSection() {
  return (
    <section className="section">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <SectionLabel index={3}>Corporate Fleet OS</SectionLabel>
          <h2 className="mt-5 font-syne text-3xl font-light tracking-tight md:text-4xl lg:text-5xl leading-[1.15]">
            One platform for your{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-500 bg-clip-text text-transparent font-syne font-extrabold">
              entire mobility ops
            </span>
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Dedicated EV fleets, attendance integration and live operations — built for HR, admin and ops teams.
          </p>

          <motion.div
            variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {CORPORATE_FEATURES.map(({ icon: Icon, title }) => (
              <motion.div
                key={title} variants={fadeUp}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 group
                  bg-slate-100/70 dark:bg-white/[0.03]
                  border border-slate-200/60 dark:border-white/[0.05]
                  text-slate-800 dark:text-zinc-200
                  hover:border-emerald-500/30 dark:hover:border-emerald-500/20
                  transition-all duration-300"
              >
                <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 text-emerald-500 dark:text-emerald-400 transition-all duration-300 group-hover:border-emerald-500/30">
                  <div className="absolute -inset-1 rounded-lg bg-emerald-500/5 opacity-0 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
                  <Icon size={15} className="relative z-10" />
                </div>
                <span className="text-sm font-medium">{title}</span>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>

        <Reveal variant={{ hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0, transition: { duration: 0.8 } } }} className="relative">
          <div
            className="absolute -inset-12 rounded-full blur-3xl opacity-40 -z-10 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0) 70%)" }}
          />
          <DashboardMock />
        </Reveal>
      </div>
    </section>
  );
}

