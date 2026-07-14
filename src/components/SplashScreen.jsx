/**
 * SplashScreen.jsx
 * ─────────────────────────────────────────────────────────────────
 * Cinematic preloader / splash screen for HeadGreen!
 *
 * Timeline (ms from mount):
 *  0        → canvas appears (solid #050816)
 *  300      → ambient glow blooms behind logo
 *  400      → logo fades in, scales 1.1 → 1
 *  1 200    → brand text slides up from mask
 *  1 700    → tagline & divider fade in
 *  2 000    → progress line starts filling (2 000 ms)
 *  4 200    → progress hits 100%, curtain spring-slides up
 *  ~5 000   → AnimatePresence unmounts the component entirely
 * ─────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import logoImg from "../assets/logo.png";

// ─── Easing constants ─────────────────────────────────────────────
const FLUID   = [0.22, 1, 0.36, 1];   // custom cubic-bezier
const SILK    = [0.16, 1, 0.3, 1];    // silkier for text
const EXIT_SPRING = { type: "spring", damping: 28, stiffness: 110 };

// ─── Timing (seconds) ─────────────────────────────────────────────
const LOGO_DELAY         = 0.4;
const TEXT_DELAY         = 1.2;
const TAGLINE_DELAY      = 1.65;
const PROGRESS_START     = 2.0;    // seconds
const PROGRESS_DURATION  = 2.2;    // seconds fill time
const EXIT_DELAY         = PROGRESS_START + PROGRESS_DURATION + 0.15; // ≈4.35 s

// ─── Particle data (seeded for determinism) ──────────────────────
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: (i * 37 + 11) % 100,
  y: 15 + ((i * 53 + 7) % 65),
  size: 1.5 + (i % 3) * 0.8,
  delay: (i * 0.28) % 3.5,
  dur: 3.2 + (i % 4) * 0.6,
}));

export default function SplashScreen({ onDone }) {
  const [show, setShow] = useState(true);
  const progressControls = useAnimation();
  const hasExited = useRef(false);

  // ─── Lock body scroll while splash is active ──────────────────
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // ─── Orchestrate progress → exit ─────────────────────────────
  useEffect(() => {
    let t1, t2;

    // Start filling the progress bar after PROGRESS_START seconds
    t1 = setTimeout(() => {
      progressControls.start({
        scaleX: 1,
        transition: { duration: PROGRESS_DURATION, ease: FLUID },
      });
    }, PROGRESS_START * 1000);

    // Trigger curtain exit
    t2 = setTimeout(() => {
      if (!hasExited.current) {
        hasExited.current = true;
        setShow(false);          // triggers AnimatePresence exit
        onDone?.();
      }
    }, EXIT_DELAY * 1000);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [progressControls, onDone]);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50 dark:bg-[#050816] overflow-hidden"
          /* ── EXIT: curtain slides up with spring ─────────────── */
          exit={{ y: "-100%" }}
          transition={EXIT_SPRING}
        >

          {/* ── 1. Grid overlay (very subtle) ─────────────────────── */}
          <div
            className="pointer-events-none absolute inset-0 opacity-10 dark:opacity-100"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,232,122,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,232,122,0.03) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* ── 2. Floating ambient particles ─────────────────────── */}
          <div className="pointer-events-none absolute inset-0 opacity-30 dark:opacity-100">
            {PARTICLES.map((p) => (
              <motion.span
                key={p.id}
                className="absolute rounded-full bg-emerald-400"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                }}
                animate={{
                  opacity: [0, 0.35, 0],
                  y: [0, -55],
                  scale: [0.6, 1.3],
                }}
                transition={{
                  delay: LOGO_DELAY + p.delay,
                  duration: p.dur,
                  repeat: Infinity,
                  repeatDelay: 0.8,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* ── 3. Ambient glow orbs ───────────────────────────────── */}
          <motion.div
            className="pointer-events-none absolute opacity-20 dark:opacity-100"
            style={{
              width: 480,
              height: 480,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0.06) 40%, transparent 70%)",
              filter: "blur(40px)",
              top: "50%",
              left: "50%",
              x: "-50%",
              y: "-50%",
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1.15 }}
            transition={{ delay: 0.3, duration: 2.5, ease: SILK }}
          />
          {/* Secondary off-center teal orb */}
          <motion.div
            className="pointer-events-none absolute opacity-20 dark:opacity-100"
            style={{
              width: 240,
              height: 240,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 70%)",
              filter: "blur(60px)",
              top: "35%",
              left: "60%",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.5] }}
            transition={{ delay: 0.8, duration: 3, ease: SILK }}
          />

          {/* ── 4. Centre content stack ───────────────────────────── */}
          <div className="relative z-10 flex flex-col items-center select-none">

            {/* ── 4a. Logo icon ────────────────────────────────────── */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 1.12 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: LOGO_DELAY, duration: 1.5, ease: FLUID }}
            >
              {/* Halo ring that pulses slowly */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(16,185,129,0.22) 0%, transparent 65%)",
                  filter: "blur(24px)",
                }}
                animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.85, 0.5] }}
                transition={{
                  delay: LOGO_DELAY + 1,
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <img
                src={logoImg}
                alt="HeadGreen! Zero Emission Corporate Cabs in Kochi"
                className="relative z-10 w-[88px] drop-shadow-2xl"
                draggable={false}
              />
            </motion.div>

            {/* ── 4b. Brand name (mask slide-up reveal) ────────────── */}
            <div className="mt-5 overflow-hidden leading-none">
              <motion.div
                className="font-montserrat text-[34px] font-extrabold tracking-tight text-[#539242]"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: TEXT_DELAY, duration: 0.9, ease: FLUID }}
              >
                HeadGreen!
              </motion.div>
            </div>

            {/* ── 4c. Slogan & Tagline (fade + slide up) ─────────────────────── */}
            <motion.div
              className="mt-3 flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: TAGLINE_DELAY, duration: 0.7, ease: SILK }}
            >
              <div className="font-syne text-xs md:text-sm font-bold uppercase tracking-[0.22em] text-slate-900 dark:text-white">
                DRIVE <span className="text-[#539242]">GREEN</span>, LIVE <span className="text-[#539242]">CLEAN</span>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400/80">
                EV Corporate Mobility · Kochi
              </div>
            </motion.div>

            {/* ── 4d. Thin divider ─────────────────────────────────── */}
            <motion.div
              className="mt-7 h-px bg-slate-200 dark:bg-white/[0.07]"
              style={{ width: 240 }}
              initial={{ scaleX: 0, originX: 0.5 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: TAGLINE_DELAY + 0.1, duration: 0.7, ease: FLUID }}
            />

            {/* ── 4e. Progress bar ─────────────────────────────────── */}
            <div
              className="mt-4 overflow-hidden rounded-full"
              style={{ width: 240, height: 1 }}
            >
              {/* Track */}
              <div className="h-full w-full bg-slate-200 dark:bg-white/[0.07] rounded-full relative">
                {/* Fill — scaleX from 0→1, origin left */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #10b981 0%, #34d399 60%, #6ee7b7 100%)",
                    boxShadow: "0 0 8px rgba(16,185,129,0.8)",
                    originX: 0,
                    scaleX: 0,
                  }}
                  animate={progressControls}
                />
              </div>
            </div>

            {/* ── 4f. "Loading" micro-label ─────────────────────────── */}
            <motion.div
              className="mt-4 flex flex-col items-center gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: PROGRESS_START - 0.2, duration: 0.5 }}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-900 dark:text-white">
                Initialising platform…
              </p>
              <p className="font-syne text-[8px] font-bold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
                Drive Green, Live Clean.
              </p>
            </motion.div>
          </div>

          {/* ── 5. Bottom-left version badge ──────────────────────── */}
          <motion.div
            className="absolute bottom-6 left-6 font-mono text-[9px] text-slate-500 dark:text-slate-400/80 uppercase tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            v2.0 · headgreen.in
          </motion.div>

          {/* ── 6. Bottom-right "Kochi" badge ─────────────────────── */}
          <motion.div
            className="absolute bottom-6 right-6 flex items-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 dark:text-slate-400/80">
              KERALA
            </span>
          </motion.div>

          {/* ── 7. Top edge accent line ───────────────────────────── */}
          <motion.div
            className="pointer-events-none absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.5) 40%, rgba(52,211,153,0.7) 50%, rgba(16,185,129,0.5) 60%, transparent 100%)",
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.6, duration: 1.4, ease: FLUID }}
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
}
