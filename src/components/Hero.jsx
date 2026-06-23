import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import NetworkMesh from "./NetworkMesh.jsx";
import { SectionLabel } from "./SectionLabel.jsx";
import fleetLight from '../assets/Light.png';
import fleetDark from '../assets/Dark.png';

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-50/40 via-slate-50/60 to-white dark:bg-none dark:bg-[#050816]">
      <NetworkMesh />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-20 lg:grid-cols-2 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        >
          <SectionLabel variant="slash">Kochi's EV Mobility Platform</SectionLabel>
          <h1 className="mt-6 font-display text-5xl font-light tracking-tight text-slate-900 dark:text-white leading-[1.05] md:text-5xl lg:text-6xl">
            Kochi's Premier Corporate EV Fleet<br />
            for{" "}
            <span className="font-extrabold text-slate-900 dark:text-white">Zero-Emission</span>{" "}
            <span className="relative inline-block font-extrabold">
              <span className="text-emerald-500 dark:text-emerald-400">Employee Transport.</span>
              <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 opacity-60" />
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-600 dark:text-zinc-400">
            Upgrade your B2B electric cab service with our dedicated EV fleets. We help enterprises in Infopark and SmartCity hit their ESG goals with reliable, 100% zero tailpipe emission daily pickups and airport transfers.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/corporate" className="btn-primary btn-shine overflow-hidden">
              Get a Free Fleet Demo <ArrowRight size={18} />
            </Link>
            <button
              onClick={() => {
                const el = document.getElementById("services");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-ghost"
            >Explore Services</button>
          </div>

          <div className="mt-12 grid max-w-md grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { value: "20+",    unit: "EV Fleet",       detail: "On road today" },
              { value: "22",    unit: "min",       detail: "Avg pickup ETA" },
              { value: "10+",    unit: "Clients",  detail: "Infopark · SmartCity" },
            ].map(({ value, unit, detail }) => (
              <div key={unit} className="group bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.05] rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 dark:hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10 dark:hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)] px-4 py-5">
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-2xl font-bold leading-none text-emerald-500 dark:text-[#00e87a] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">{value}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-500">{unit}</span>
                </div>
                <div className="mt-1.5 text-[10px] text-slate-400 dark:text-zinc-600 leading-tight tracking-wide">{detail}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute h-80 w-80 rounded-full bg-primary/20 opacity-30 dark:opacity-100 blur-3xl" />
          <div className="bg-white dark:bg-[#050816] rounded-2xl border border-slate-200/80 dark:border-white/[0.08] shadow-xl shadow-slate-200/40 dark:shadow-[0_0_40px_rgba(16,185,129,0.15)] overflow-hidden relative animate-float max-w-lg">
            <img src={fleetLight} alt="Tata Nexon EV Corporate Fleet" className="block dark:hidden w-full h-full object-cover transition-opacity duration-500" />
            <img src={fleetDark} alt="Tata Nexon EV Corporate Fleet" className="hidden dark:block w-full h-full object-cover transition-opacity duration-500" />
            <div className="mt-3 px-2 pb-3 space-y-2">
              <div className="flex items-center justify-between text-xs tracking-wider uppercase font-mono">
                <div className="text-muted">HeadGreen Fleet</div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Live
                </div>
              </div>
              <p className="text-[9px] leading-relaxed tracking-widest text-slate-400/60 dark:text-zinc-600/70 uppercase font-mono border-t border-slate-100 dark:border-white/[0.04] pt-2">
                100% Electric &amp; Solar-Powered
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
