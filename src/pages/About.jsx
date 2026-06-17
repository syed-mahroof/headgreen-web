import CountUp from "react-countup";
import { Reveal, stagger, fadeUp } from "../components/motion.jsx";
import { motion } from "framer-motion";
import { STATS, TIMELINE } from "../data/site.js";
import { Target, Eye, Leaf, Zap, ArrowRight } from "lucide-react";
import { PageHero, SectionLabel } from "../components/SectionLabel.jsx";
import SEO from "../components/SEO.jsx";

// ── Stat card with animated number ──────────────────────────────────────────
function StatCard({ value, suffix, label, delay = 0 }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative overflow-hidden rounded-3xl p-7
        bg-white border border-slate-200/80 shadow-sm
        dark:bg-white/[0.02] dark:border-white/[0.07] dark:shadow-none
        hover:border-emerald-500/30 dark:hover:border-emerald-500/25
        hover:shadow-[0_20px_40px_rgba(16,185,129,0.06)]
        transition-all duration-500"
    >
      <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 20% 20%, rgba(16,185,129,0.05) 0%, transparent 70%)" }} />
      <div className="text-5xl font-mono font-bold tracking-tighter text-emerald-500 dark:text-emerald-400 tabular-nums">
        <CountUp end={value} duration={2.2} separator="," enableScrollSpy scrollSpyOnce />
        <span className="text-3xl">{suffix}</span>
      </div>
      <div className="mt-3 text-sm font-medium text-slate-500 dark:text-zinc-400">{label}</div>
    </motion.div>
  );
}

// ── Mission / Vision cards ───────────────────────────────────────────────────
function PillarCard({ icon: Icon, title, body, accent }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl p-8
      bg-white border border-slate-200/80 shadow-sm
      dark:bg-white/[0.02] dark:border-white/[0.07] dark:shadow-none
      hover:border-emerald-500/30 dark:hover:border-emerald-500/25
      transition-all duration-500 hover:-translate-y-1"
    >
      <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 0% 0%, rgba(16,185,129,0.07) 0%, transparent 70%)" }} />
      {/* Numbered accent */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
          <Icon size={20} />
        </div>
        <span className="font-mono text-[10px] font-bold text-slate-200 dark:text-white/10 tracking-widest">{accent}</span>
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-3 text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">{body}</p>
    </div>
  );
}

// ── Timeline ─────────────────────────────────────────────────────────────────
function TimelineItem({ year, title, desc, index, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-start`}
    >
      {/* Left content (even) */}
      <div className={`${index % 2 === 0 ? "md:text-right" : "md:col-start-3"}`}>
        {index % 2 === 0 ? (
          <div className="rounded-2xl p-6
            bg-white border border-slate-200/80 shadow-sm
            dark:bg-white/[0.02] dark:border-white/[0.07]
            hover:border-emerald-500/25 transition-all duration-300"
          >
            <div className="font-mono text-xs font-bold text-emerald-500 dark:text-emerald-400 mb-2">{year}</div>
            <div className="font-semibold text-slate-900 dark:text-white text-base">{title}</div>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-zinc-500 leading-relaxed">{desc}</p>
          </div>
        ) : (
          <div className="md:hidden rounded-2xl p-6
            bg-white border border-slate-200/80 shadow-sm
            dark:bg-white/[0.02] dark:border-white/[0.07]
            hover:border-emerald-500/25 transition-all duration-300"
          >
            <div className="font-mono text-xs font-bold text-emerald-500 dark:text-emerald-400 mb-2">{year}</div>
            <div className="font-semibold text-slate-900 dark:text-white text-base">{title}</div>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-zinc-500 leading-relaxed">{desc}</p>
          </div>
        )}
      </div>

      {/* Center spine */}
      <div className="hidden md:flex flex-col items-center">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-[0_0_20px_rgba(16,185,129,0.5)] z-10">
          {String(index + 1).padStart(2, "0")}
        </div>
        {!isLast && <div className="mt-2 w-px flex-1 bg-gradient-to-b from-emerald-500/40 to-transparent min-h-[4rem]" />}
      </div>

      {/* Right content (odd) */}
      {index % 2 !== 0 && (
        <div className="hidden md:block md:col-start-3">
          <div className="rounded-2xl p-6
            bg-white border border-slate-200/80 shadow-sm
            dark:bg-white/[0.02] dark:border-white/[0.07]
            hover:border-emerald-500/25 transition-all duration-300"
          >
            <div className="font-mono text-xs font-bold text-emerald-500 dark:text-emerald-400 mb-2">{year}</div>
            <div className="font-semibold text-slate-900 dark:text-white text-base">{title}</div>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-zinc-500 leading-relaxed">{desc}</p>
          </div>
        </div>
      )}
      {index % 2 === 0 && <div className="hidden md:block" />}
    </motion.div>
  );
}

export default function About() {
  return (
    <>
      <SEO 
        title="Our Story | HeadGreen Mobility" 
        description="HeadGreen operates on a closed-loop model: intercepting capable EVs at end-of-first-life, remanufacturing battery packs, and charging via solar grid." 
        schemaType="Organization" 
      />
      {/* ── PAGE HERO ── */}
      <PageHero
        label="Our Story"
        title="Built to decarbonise"
        accent="Kochi's commute"
        subtitle="HeadGreen operates on a closed-loop model: intercepting capable EVs at end-of-first-life, remanufacturing battery packs in-house, and charging every vehicle through a dedicated solar grid — bringing premium, zero-fossil corporate mobility to India's tech hubs."
      />

      {/* ── MISSION / VISION ── */}
      <section className="section py-16">
        <Reveal className="mb-10">
          <SectionLabel>What Drives Us</SectionLabel>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          <PillarCard
            icon={Target} accent="MISSION"
            title="Electrify every corporate commute"
            body="To replace 1M+ petrol kilometres each year through a circular second-life fleet model — intercepting vehicles at peak usable age, remanufacturing them to specification, and running them on solar-charged infrastructure across South India's enterprise corridors."
          />
          <PillarCard
            icon={Eye} accent="VISION"
            title="South India's default enterprise mobility OS"
            body="To be the most trusted circular electro-mobility platform for forward-thinking companies — where HR, ops and employees all work from a single intelligent system, powered by zero-fossil, restorative infrastructure."
          />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="section py-16 relative">
        <div className="absolute inset-0 grid-bg opacity-20 dark:opacity-100 pointer-events-none" />
        <Reveal className="mb-10">
          <SectionLabel>The Numbers</SectionLabel>
          <h2 className="mt-5 font-syne text-3xl font-light tracking-tight md:text-4xl leading-[1.15]">
            Traction that{" "}
            <span className="font-extrabold text-slate-900 dark:text-white">speaks for itself</span>
          </h2>
        </Reveal>
        <motion.div
          variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-4"
        >
          {STATS.map((s, i) => (
            <StatCard key={s.label} value={s.value} suffix={s.suffix} label={s.label} delay={i * 0.1} />
          ))}
        </motion.div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="section py-16">
        <Reveal className="mb-14">
          <SectionLabel>Our Journey</SectionLabel>
          <h2 className="mt-5 font-syne text-3xl font-light tracking-tight md:text-4xl leading-[1.15]">
            From idea to{" "}
            <span className="font-serif italic font-light text-emerald-400">Kochi's streets</span>
          </h2>
        </Reveal>
        <div className="space-y-6">
          {TIMELINE.map((t, i) => (
            <TimelineItem
              key={t.year}
              year={t.year}
              title={t.title}
              desc={t.desc}
              index={i}
              isLast={i === TIMELINE.length - 1}
            />
          ))}
        </div>
      </section>
    </>
  );
}
