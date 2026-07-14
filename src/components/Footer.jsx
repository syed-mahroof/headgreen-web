import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { CONTACT, NAV_LINKS } from "../data/site.js";
import logo from "../assets/logo.png";

const WhatsAppIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative mt-20 bg-slate-50/80 dark:bg-[#030611] border-t border-slate-200/50 dark:border-white/[0.02] text-slate-600 dark:text-zinc-400">
      {/* 1. THE PREMIUM GRADIENT TOP BORDER */}
      <div className="absolute top-0 left-0 right-0 h-[2px] w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />

      {/* 3. ENHANCED STRUCTURAL GRID */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Brand/Bio */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-2">
              <img src={logo} alt="HeadGreen! Premium Corporate EV Cab Service Logo" className="h-9 w-auto" />
              <span className="text-xl font-bold tracking-tight font-montserrat text-[#539242]">
                HeadGreen!<sup className="align-super text-[0.45em] font-medium opacity-70 tracking-normal">&trade;</sup>
              </span>
            </div>
            <div className="font-syne mb-6 tracking-[0.22em] text-xs font-bold uppercase text-slate-500 dark:text-zinc-400">
              DRIVE <span className="text-[#539242]">GREEN</span>, LIVE <span className="text-[#539242]">CLEAN</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-zinc-400">
              Smart EV commutes for Kochi's tech workforce. Built for sustainability, scale, and on-time arrival via our restorative, second-life circular infrastructure.
            </p>
          </div>

          {/* Column 2: Pages */}
          <div>
            <h4 className="mb-6 text-xs font-semibold tracking-[0.15em] text-slate-900 dark:text-white uppercase">
              Pages
            </h4>
            <ul className="space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link 
                    className="hover:text-emerald-500 dark:hover:text-teal-400 transition-colors duration-200" 
                    to={link.to}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="mb-6 text-xs font-semibold tracking-[0.15em] text-slate-900 dark:text-white uppercase">
              Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-emerald-500 dark:text-teal-400 mt-0.5 shrink-0" /> 
                <span className="leading-relaxed">{CONTACT.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-emerald-500 dark:text-teal-400 mt-0.5 shrink-0" /> 
                <span className="leading-relaxed">{CONTACT.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-emerald-500 dark:text-teal-400 mt-0.5 shrink-0" /> 
                <span className="leading-relaxed">{CONTACT.location}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Socials */}
          <div>
            <h4 className="mb-6 text-xs font-semibold tracking-[0.15em] text-slate-900 dark:text-white uppercase">
              Follow Us
            </h4>
            <div className="flex flex-wrap gap-3">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/headgreen.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
                { Icon: WhatsAppIcon, href: `https://wa.me/${CONTACT.phone.replace(/[^0-9]/g, "")}` },
                { Icon: Mail, href: `mailto:${CONTACT.email}` },
              ].map(({ Icon, href }, i) => (
                <a 
                  key={i} 
                  href={href} 
                  target={href !== "#" ? "_blank" : undefined}
                  rel={href !== "#" ? "noopener noreferrer" : undefined}
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-transparent transition-all duration-300 hover:border-emerald-500/50 hover:bg-slate-50 dark:hover:bg-white/[0.02]"
                >
                  <div className="absolute inset-0 rounded-full bg-emerald-500/5 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
                  <Icon size={16} className="relative z-10 text-slate-500 dark:text-zinc-400 transition-colors duration-300 group-hover:text-emerald-500 dark:group-hover:text-teal-400" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* 4. CLEAN BOTTOM LEDGER */}
        <div className="mt-16 pt-8 border-t border-slate-200/50 dark:border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs tracking-wide text-slate-500 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} HeadGreen!&trade; All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-500 dark:text-zinc-500">
            <Link to="/privacy" className="hover:text-emerald-500 dark:hover:text-teal-400 transition-colors duration-200">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-emerald-500 dark:hover:text-teal-400 transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-slate-400 dark:text-zinc-600">
          HeadGreen!&trade; and the HeadGreen logo are trademarks of HeadGreen Mobility.
        </div>

      </div>
    </footer>
  );
}
