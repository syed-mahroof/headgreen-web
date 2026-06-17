import { Reveal } from "./motion.jsx";
import cogLogo from "../assets/COG.svg";
import csezLogo from "../assets/csez.png";
import eyLogo from "../assets/ey.svg";
import orionLogo from "../assets/OrionInnovation.webp";
import servesysLogo from "../assets/servesys.png";
import wiproLogo from "../assets/wipro.svg";
import zellisLogo from "../assets/zellis-logo-white.svg";

const LOGOS = [
  { name: "Cognizant", src: cogLogo, isBlack: true }, // Naturally dark, needs white in Dark Mode
  { name: "CSEZ", src: csezLogo },
  { name: "EY", src: eyLogo, isBlack: true }, // Naturally dark, needs white in Dark Mode
  { name: "Orion Innovation", src: orionLogo, isBlack: true }, 
  { name: "Servesys", src: servesysLogo, isWhite: true }, // Naturally white, needs black in Light Mode
  { name: "Wipro", src: wiproLogo },
  { name: "Zellis", src: zellisLogo, isWhite: true }, // Naturally white, needs black in Light Mode
];

export default function TrustBar() {
  return (
    <section className="bg-slate-100/60 dark:bg-zinc-900/10 border-y border-slate-200/40 dark:border-white/[0.02] py-8 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-8 text-center text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-semibold">
          Trusted by modern companies
        </Reveal>
      </div>

      <div className="group relative w-full overflow-hidden select-none">
        {/* Soft fading overlays for modern aesthetic */}
        <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-zinc-50 dark:from-bg to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-zinc-50 dark:from-bg to-transparent pointer-events-none" />

        <div className="flex w-max">
          <div className="flex shrink-0 items-center justify-around gap-20 min-w-full px-8 animate-marquee group-hover:[animation-play-state:paused]">
            {LOGOS.map((logo, index) => (
              <div key={`logo-1-${index}`} className="flex h-16 w-40 items-center justify-center">
                <img
                  src={logo.src}
                  alt={logo.name}
                  /* Base Idle State: Uniform Grey in Light Mode, Uniform Silver in Dark Mode */
                  /* Smart Hover State Logic */
                  className={`max-h-10 max-w-full object-contain transition-all duration-500 cursor-pointer brightness-0 opacity-40 dark:invert dark:opacity-40 hover:scale-105 ${
                    logo.isWhite
                      ? "hover:brightness-0 hover:opacity-100 dark:hover:invert-0 dark:hover:brightness-100 dark:hover:opacity-100" 
                      : logo.isBlack
                      ? "hover:brightness-100 hover:invert-0 hover:opacity-100 dark:hover:invert dark:hover:brightness-0 dark:hover:opacity-100"
                      : "hover:brightness-100 hover:invert-0 dark:hover:invert-0 hover:opacity-100"
                  }`}
                />
              </div>
            ))}
          </div>
          <div className="flex shrink-0 items-center justify-around gap-20 min-w-full px-8 animate-marquee group-hover:[animation-play-state:paused]" aria-hidden="true">
            {LOGOS.map((logo, index) => (
              <div key={`logo-2-${index}`} className="flex h-16 w-40 items-center justify-center">
                <img
                  src={logo.src}
                  alt={logo.name}
                  /* Base Idle State: Uniform Grey in Light Mode, Uniform Silver in Dark Mode */
                  /* Smart Hover State Logic */
                  className={`max-h-10 max-w-full object-contain transition-all duration-500 cursor-pointer brightness-0 opacity-40 dark:invert dark:opacity-40 hover:scale-105 ${
                    logo.isWhite
                      ? "hover:brightness-0 hover:opacity-100 dark:hover:invert-0 dark:hover:brightness-100 dark:hover:opacity-100" 
                      : logo.isBlack
                      ? "hover:brightness-100 hover:invert-0 hover:opacity-100 dark:hover:invert dark:hover:brightness-0 dark:hover:opacity-100"
                      : "hover:brightness-100 hover:invert-0 dark:hover:invert-0 hover:opacity-100"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
