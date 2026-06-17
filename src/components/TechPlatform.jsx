import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./motion.jsx";
import { TECH_FEATURES } from "../data/site.js";
import { DashboardMock } from "./CorporateSection.jsx";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "./SectionLabel.jsx";

// Map feature index → which dashboard tab best represents it
const FEATURE_TAB_MAP = {
  0: "analytics",   // AI Route Planning → Analytics
  1: "overview",    // Live Vehicle Tracking → Overview (live feed)
  2: "fleet",       // Attendance Sync → Fleet
  3: "overview",    // WhatsApp Notifications → Overview
  4: "analytics",   // Reports → Analytics
  5: "analytics",   // Analytics → Analytics
};

const FEATURE_DESCS = [
  "Dynamic multi-stop routing that minimizes fuel and maximises punctuality.",
  "Sub-second GPS updates on every vehicle, accessible from the dashboard and mobile app.",
  "Automatically mark attendance when employees board verified HeadGreen EVs.",
  "Instant ride confirmations and ETA alerts sent directly to employees over WhatsApp.",
  "Auto-generated weekly and monthly PDFs covering mileage, costs and carbon saved.",
  "Visual dashboards covering fleet utilisation, peak-hour demand and cost-per-km.",
];

export default function TechPlatform() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeTab = FEATURE_TAB_MAP[activeIdx] ?? "overview";

  return (
    <section className="section">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        {/* LEFT: Interactive Dashboard */}
        <Reveal variant={{ hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0, transition: { duration: 0.7 } } }} className="relative lg:sticky lg:top-24">
          <div
            className="absolute -inset-12 rounded-full blur-3xl opacity-40 -z-10 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0) 70%)" }}
          />
          <DashboardMock activeTab={activeTab} />
          {/* Active feature label */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="mt-4 flex items-center gap-2 px-1"
            >
              <span className="h-1 w-4 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-500 tracking-wide">
                Showing: <span className="text-emerald-500 dark:text-emerald-400 font-semibold">{TECH_FEATURES[activeIdx].title}</span>
              </span>
            </motion.div>
          </AnimatePresence>
        </Reveal>

        {/* RIGHT: Numbered feature list */}
        <Reveal>
          <SectionLabel index={6}>Dispatch Intelligence</SectionLabel>
          <h2 className="mt-5 font-syne text-3xl font-light tracking-tight md:text-4xl lg:text-5xl leading-[1.15]">
            AI that manages your{" "}
            <span className="font-serif italic font-light text-emerald-400">fleet in real time</span>
          </h2>
          <p className="mt-3 text-muted leading-relaxed">
            AI routing, live telemetry and instant employee comms — all in one workspace.
          </p>

          <div className="mt-10 space-y-1">
            {TECH_FEATURES.map(({ icon: Icon, title }, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={title}
                  onClick={() => setActiveIdx(i)}
                  className={[
                    "group w-full text-left rounded-2xl px-5 py-4 flex items-start gap-4 transition-all duration-300",
                    isActive
                      ? "bg-white dark:bg-white/[0.05] border border-emerald-500/30 dark:border-emerald-500/25 shadow-sm dark:shadow-none"
                      : "border border-transparent hover:border-slate-200 dark:hover:border-white/[0.06] hover:bg-slate-50/80 dark:hover:bg-white/[0.02]",
                  ].join(" ")}
                >
                  {/* Number + left border accent */}
                  <div className={[
                    "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-mono font-bold transition-all duration-300",
                    isActive
                      ? "bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                      : "bg-slate-100 dark:bg-white/[0.05] text-slate-500 dark:text-zinc-500 group-hover:bg-slate-200 dark:group-hover:bg-white/[0.08]",
                  ].join(" ")}>
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Icon size={14} className={isActive ? "text-emerald-500 dark:text-emerald-400" : "text-slate-400 dark:text-zinc-500"} />
                      <span className={[
                        "text-sm font-semibold transition-colors duration-200",
                        isActive ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-zinc-400",
                      ].join(" ")}>
                        {title}
                      </span>
                    </div>
                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="mt-1.5 text-xs text-slate-500 dark:text-zinc-500 leading-relaxed overflow-hidden"
                        >
                          {FEATURE_DESCS[i]}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <ArrowRight
                    size={14}
                    className={[
                      "mt-0.5 shrink-0 transition-all duration-300",
                      isActive ? "text-emerald-500 translate-x-0 opacity-100" : "text-slate-300 dark:text-zinc-700 -translate-x-2 opacity-0 group-hover:opacity-60 group-hover:translate-x-0",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

