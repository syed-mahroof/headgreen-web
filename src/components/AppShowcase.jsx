import { Reveal, fadeLeft, fadeRight } from "./motion.jsx";
import { APP_FEATURES } from "../data/site.js";
import { SectionLabel } from "./SectionLabel.jsx";

function Phone({ children }) {
  return (
    <div className="relative mx-auto h-[500px] w-[240px] sm:w-[250px] max-w-[85vw] rounded-[40px] border-2 border-slate-200 dark:border-zinc-800 bg-white dark:bg-card p-3 shadow-[0_20px_50px_rgba(16,185,129,0.08)] dark:shadow-[0_20px_50px_rgba(16,185,129,0.3)]">
      <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-black" />
      <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-white dark:bg-[#0a101f] p-4">
        {children}
      </div>
    </div>
  );
}

export default function AppShowcase() {
  return (
    <section className="section">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal variant={fadeLeft}>
          <SectionLabel index={7}>Employee Mobile App</SectionLabel>
          <h2 className="mt-5 font-syne text-3xl font-light tracking-tight md:text-4xl lg:text-5xl leading-[1.15]">
            Every shift, every ride,{" "}
            <span className="font-serif italic font-light text-emerald-400">in your pocket</span>
          </h2>
          <p className="mt-3 text-muted">Book, track and manage shifts from one app — purpose-built for corporate commuters.</p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {APP_FEATURES.map(({ icon: Icon, title }) => (
              <div key={title} className="glass flex items-center gap-3 rounded-2xl px-4 py-3 group">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 text-emerald-400 bg-transparent transition-all duration-300 group-hover:border-emerald-500/30 group-hover:text-emerald-300">
                  <div className="absolute -inset-1 rounded-lg bg-emerald-500/5 opacity-0 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
                  <Icon size={18} className="relative z-10" />
                </div>
                <span className="text-sm font-medium text-slate-800 dark:text-white/80">{title}</span>
              </div>
            ))}
          </div>
        </Reveal>
        
        <Reveal variant={fadeRight} className="relative">
          <div 
            className="absolute -inset-16 rounded-full blur-3xl opacity-35 -z-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0) 75%)' }}
          />
          <div className="relative flex justify-center gap-6">
            <div className="hidden sm:block">
              <Phone>
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400">Hi, Adhil</div>
                <div className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">Next ride in <span className="font-mono text-emerald-400">12 min</span></div>
                <div className="mt-4 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.05] rounded-2xl p-3 text-xs">
                  <div className="text-slate-500 dark:text-slate-400">From → To</div>
                  <div className="font-semibold text-slate-900 dark:text-white">Kakkanad → Infopark</div>
                </div>
                <div className="mt-3 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.05] rounded-2xl p-3 text-xs">
                  <div className="text-slate-500 dark:text-slate-400">Driver</div>
                  <div className="font-semibold text-slate-900 dark:text-white">Rahul · KL-07-EV-1234</div>
                </div>
                <div className="mt-4 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-2 text-xs font-semibold text-black text-center pointer-events-none select-none" aria-hidden="true">Track Live</div>
              </Phone>
            </div>
            <div className="translate-y-8">
              <Phone>
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400">Shifts</div>
                <div className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">This week</div>
                <div className="mt-3 space-y-2 text-xs">
                  {["Mon 9:00", "Tue 9:00", "Wed 14:00", "Thu 9:00", "Fri 9:00"].map((s) => (
                    <div key={s} className="flex items-center justify-between rounded-xl px-3 py-2 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.05] text-slate-900 dark:text-white font-medium">
                      <span className="font-mono">{s}</span><span className="text-emerald-400">●</span>
                    </div>
                  ))}
                </div>
              </Phone>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

