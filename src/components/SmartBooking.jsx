import { useForm } from "react-hook-form";
import { Reveal, fadeLeft, fadeRight } from "./motion.jsx";
import { openWhatsApp, buildWhatsAppMessage } from "../utils/formSubmit.jsx";
import { MapPin, Send } from "lucide-react";
import { SectionLabel } from "./SectionLabel.jsx";

export default function SmartBooking() {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    openWhatsApp(buildWhatsAppMessage("New Trip Booking", {
      Pickup: data.pickup, Destination: data.destination,
      Date: data.date, Time: data.time, Passengers: data.passengers,
    }));
    reset();
  };

  return (
    <section className="section">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal variant={fadeLeft} className="relative">
          <div 
            className="absolute -inset-12 rounded-full blur-3xl opacity-30 -z-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0) 70%)' }}
          />
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-white dark:bg-[#050816] border border-slate-200 dark:border-zinc-800">
            <div className="absolute inset-0 grid-bg opacity-40" />
            {/* stylized route */}
            <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id="rt" x1="0" x2="1">
                  <stop offset="0" stopColor="#10B981" />
                  <stop offset="1" stopColor="#2DD4BF" />
                </linearGradient>
              </defs>
              <path d="M40 320 C 120 280, 140 200, 220 180 S 360 100, 360 60"
                stroke="url(#rt)" strokeWidth="3.5" fill="none" strokeDasharray="8 8" />
              <circle cx="40" cy="320" r="8" fill="#10B981" />
              <circle cx="40" cy="320" r="16" stroke="#10B981" strokeWidth="2" fill="none" className="animate-ping" style={{ transformOrigin: '40px 320px', animationDuration: '3s' }} />
              <circle cx="360" cy="60" r="8" fill="#2DD4BF" />
              <circle cx="360" cy="60" r="16" stroke="#2DD4BF" strokeWidth="2" fill="none" className="animate-ping" style={{ transformOrigin: '360px 60px', animationDuration: '3s' }} />
            </svg>
            <div className="absolute left-6 top-6 border border-slate-200 dark:border-white/[0.06] rounded-2xl px-4 py-2 text-xs uppercase tracking-wider font-medium text-slate-700 dark:text-white bg-slate-100/80 dark:bg-zinc-800/50 backdrop-blur-sm">
              <MapPin size={12} className="mr-1.5 inline text-emerald-400" /> Live Map Preview
            </div>
            <div className="absolute bottom-6 right-6 backdrop-blur-md bg-white/80 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] rounded-2xl px-4 py-2 text-xs text-slate-500 dark:text-muted">
              Estimated ETA: <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">22 min</span>
            </div>
          </div>
        </Reveal>

        <Reveal variant={fadeRight}>
          <SectionLabel index={2}>On-Demand Rides</SectionLabel>
          <h2 className="mt-5 font-syne text-3xl font-light tracking-tight md:text-4xl lg:text-5xl leading-[1.15]">
            From request to{" "}
            <span className="font-extrabold text-slate-900 dark:text-white">confirmed ride</span>{" "}
            <span className="font-serif italic font-light text-emerald-400">in 60 seconds</span>
          </h2>
          <p className="mt-3 text-muted">Fill in your trip details and we'll pick it up on WhatsApp — no app download, no account needed.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="card-base mt-8 grid gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold tracking-wide text-slate-600 dark:text-zinc-400 uppercase">Pickup</label>
                <input 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-white/20 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-500" 
                  placeholder="Kakkanad" 
                  {...register("pickup", { required: true })} 
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold tracking-wide text-slate-600 dark:text-zinc-400 uppercase">Destination</label>
                <input 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-white/20 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-500" 
                  placeholder="Infopark" 
                  {...register("destination", { required: true })} 
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold tracking-wide text-slate-600 dark:text-zinc-400 uppercase">Date</label>
                <input 
                  type="date" 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-white/20 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-500" 
                  {...register("date", { required: true })} 
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold tracking-wide text-slate-600 dark:text-zinc-400 uppercase">Time</label>
                <input 
                  type="time" 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-white/20 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-500" 
                  {...register("time", { required: true })} 
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-semibold tracking-wide text-slate-600 dark:text-zinc-400 uppercase">Passengers</label>
                <input 
                  type="number" 
                  min="1" 
                  defaultValue={1} 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-mono text-emerald-600 dark:text-emerald-400 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-white/20 dark:bg-transparent dark:placeholder:text-zinc-500" 
                  {...register("passengers", { required: true })} 
                />
              </div>
            </div>
            <button type="submit" className="btn-primary mt-4 font-semibold text-black uppercase tracking-wider text-xs py-3.5">
              Book Ride <Send size={14} className="ml-1" />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

