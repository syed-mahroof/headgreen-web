import { Reveal } from "./motion.jsx";
import Marquee from "react-fast-marquee";
import cogLogo from "../assets/COG.svg";
import csezLogo from "../assets/csez.png";
import eyLogo from "../assets/ey.svg";
import orionLogo from "../assets/OrionInnovation.webp";
import servesysLogo from "../assets/servesys.png";
import wiproLogo from "../assets/wipro.svg";
import zellisLogo from "../assets/zellis-logo-white.svg";
import titanLogo from "../assets/titan-logo.svg";
import adhilLogo from "../assets/ADHIL LOGO.png";
import dcnLogo from "../assets/dcn_logo.png";

const LOGOS = [
  { name: "Cognizant", src: cogLogo, isBlack: true }, // Naturally dark, needs white in Dark Mode
  { name: "CSEZ", src: csezLogo },
  { name: "EY", src: eyLogo, isBlack: true }, // Naturally dark, needs white in Dark Mode
  { name: "Orion Innovation", src: orionLogo, isBlack: true }, 
  { name: "Servesys", src: servesysLogo, isWhite: true }, // Naturally white, needs black in Light Mode
  { name: "Wipro", src: wiproLogo },
  { name: "Zellis", src: zellisLogo, isWhite: true }, // Naturally white, needs black in Light Mode
  { name: "Titan", src: titanLogo, isBlack: true },
  { name: "Adhil", src: adhilLogo, isWhite: true },
  { name: "Dodge Construction Network", src: dcnLogo, isBlack: true },
];

export default function TrustBar() {
  return (
    <section className="bg-slate-100/60 dark:bg-zinc-900/10 border-y border-slate-200/40 dark:border-white/[0.02] py-8 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-6 text-center text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-semibold">
          Trusted by modern companies
        </Reveal>
      </div>

      <div className="group relative w-full overflow-hidden select-none flex items-center pt-2 pb-2">
        {/* Soft fading overlays for modern aesthetic */}
        <div className="absolute left-0 top-0 z-10 h-full w-24 sm:w-32 bg-gradient-to-r from-slate-100 dark:from-[#050816] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 z-10 h-full w-24 sm:w-32 bg-gradient-to-l from-slate-100 dark:from-[#050816] to-transparent pointer-events-none" />

        <Marquee speed={65} gradient={false} pauseOnHover={true} className="flex items-center overflow-hidden">
          {LOGOS.map((logo, index) => (
            <div key={`logo-${index}`} className="flex items-center justify-center mx-6 sm:mx-10 lg:mx-12">
              <img
                src={logo.src}
                alt={`${logo.name} Corporate Client of HeadGreen EV Taxis`}
                /* Base Idle State: Uniform Grey in Light Mode, Uniform Silver in Dark Mode */
                /* Smart Hover State Logic */
                className={`h-6 sm:h-8 lg:h-10 w-auto object-contain transition-all duration-300 cursor-pointer brightness-0 opacity-40 dark:invert dark:opacity-40 hover:scale-105 ${
                  logo.isWhite
                    ? "hover:brightness-0 hover:opacity-100 dark:hover:invert-0 dark:hover:brightness-100 dark:hover:opacity-100" 
                    : logo.isBlack
                    ? "hover:brightness-100 hover:invert-0 hover:opacity-100 dark:hover:invert dark:hover:brightness-0 dark:hover:opacity-100"
                    : "hover:brightness-100 hover:invert-0 dark:hover:invert-0 hover:opacity-100"
                }`}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
