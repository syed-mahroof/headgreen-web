import { Reveal } from "./motion.jsx";
import { CONTACT } from "../data/site.js";
import { Phone, Mail, MapPin } from "lucide-react";
import { SectionLabel } from "./SectionLabel.jsx";

export default function Contact() {
  return (
    <section className="section">
      <Reveal className="mb-10 max-w-2xl">
        <SectionLabel index={9}>Start the Conversation</SectionLabel>
        <h2 className="mt-5 font-syne text-3xl font-light tracking-tight md:text-4xl lg:text-5xl leading-[1.15]">
          Ready to electrify{" "}
          <span className="font-extrabold text-slate-900 dark:text-white">your fleet?</span>
        </h2>
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-3 lg:items-center mt-12">
        <div className="space-y-10 lg:col-span-1">
          {[
            { Icon: Phone, label: "Phone", value: CONTACT.phone },
            { Icon: Mail, label: "Email", value: CONTACT.email },
            { Icon: MapPin, label: "Location", value: CONTACT.location },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="group flex items-start gap-5 bg-white dark:bg-card/30 border border-slate-200 dark:border-white/[0.06] text-slate-800 dark:text-white rounded-2xl p-5">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 text-emerald-400 bg-transparent transition-all duration-300 group-hover:border-emerald-500/30 group-hover:text-emerald-300">
                <div className="absolute -inset-1 rounded-xl bg-emerald-500/5 opacity-0 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
                <Icon size={18} className="relative z-10" />
              </div>
              <div>
                <div className="text-slate-400 dark:text-zinc-500 text-xs font-semibold tracking-wider uppercase">{label}</div>
                <div className="text-slate-800 dark:text-white font-medium text-base mt-1">{value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-slate-200 dark:border-white/[0.06] backdrop-blur-xl bg-white dark:bg-white/[0.01] shadow-sm dark:shadow-none">
          <iframe
            title="HeadGreen Location"
            src={CONTACT.mapsEmbed}
            className="h-[350px] w-full grayscale-[40%] contrast-110 opacity-80 hover:opacity-100 transition-opacity duration-500"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

