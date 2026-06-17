/**
 * Fleet.jsx — Premium Horizontal Carousel
 * ─────────────────────────────────────────────────────────────────
 * Architecture:
 *  • Framer Motion drag="x" slider with computed dragConstraints
 *  • Cards: min-w-[360px] w-[360px], generous padding
 *  • Vehicle images: overflow-visible, pop-out above card top edge,
 *    elliptical wheel-shadow underneath, scale/lift on hover
 *  • Signature green wipe on hover + full contrast flip
 *  • Custom arrow nav + dot progress indicator
 *  • useRef + useState for track measurement — no layout shift
 * ─────────────────────────────────────────────────────────────────
 */

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import { Snowflake, Leaf, Users, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./motion.jsx";
import { SectionLabel } from "./SectionLabel.jsx";

// ─── Vehicle asset imports (Vite resolves → hashed production URLs) ──
import imgTigorEV    from "../assets/Tata Tigor EV sedan.png";
import imgNexonEV    from "../assets/tata nexon ev.png";
import imgCitroenEC3 from "../assets/citroen ec3 EV.png";
import imgBYDE6      from "../assets/byd e6 ev.png";
import imgKiaCarens  from "../assets/Kia Carens Clavis.png";

// ─── Layout hook ─────────────────────────────────────────────
function useCardLayout() {
  const [layout, setLayout] = useState({ width: 360, gap: 24, stride: 384, isDesktop: true });
  
  useEffect(() => {
    const update = () => {
      // Calculate dynamic width for mobile to prevent overflow
      const isMobile = window.innerWidth < 400;
      const isDesktop = window.innerWidth >= 1024;
      const width = isMobile ? Math.max(280, window.innerWidth - 40) : 360;
      const gap = 24;
      setLayout({ width, gap, stride: width + gap, isDesktop });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  
  return layout;
}

// ─── Easing ──────────────────────────────────────────────────────
const FLUID = [0.22, 1, 0.36, 1];

// ─── Fleet data ───────────────────────────────────────────────────
// Defined here (not in site.js) so Vite can process the PNG imports.
// Each `image` field is a resolved JS module reference — no string mismatches.
const FLEET = [
  {
    // ── 1. SEDAN ────────────────────────────────────────────────
    name:          "Premium EV Sedan",
    model:         "Tata Tigor EV",
    capacity:      "4 Seats",
    ac:            true,
    eco:           5,
    features:      ["Leather Seats", "Remanufactured Battery", "Premium Audio"],
    badge:         "Solar-Charged · Battery-Optimised",
    image:         imgTigorEV,
    accent:        "#059669",   // emerald-600
    hoverTextDark: false,       // white text on hover (dark green bg)
  },
  {
    // ── 2. SUV ──────────────────────────────────────────────────
    name:          "Executive EV SUV",
    model:         "Tata Nexon EV",
    capacity:      "4 Seats",
    ac:            true,
    eco:           5,
    features:      ["Business Class Cabin", "In-Car Wi-Fi", "Privacy Glass"],
    badge:         "Solar-Charged · Zero-Waste Propulsion",
    image:         imgNexonEV,
    accent:        "#10b981",   // emerald-500 (bright)
    hoverTextDark: true,        // dark text on hover (bright green bg)
  },
  {
    // ── 3. HATCHBACK ────────────────────────────────────────────
    name:          "EV Hatchback",
    model:         "Citroën ëC3",
    capacity:      "4 Seats",
    ac:            true,
    eco:           5,
    features:      ["City Efficient", "Lightweight Build", "Low Running Cost"],
    badge:         "Solar-Charged · Urban-Optimised",
    image:         imgCitroenEC3,
    accent:        "#0d9488",   // teal-600
    hoverTextDark: true,
  },
  {
    // ── 4. SHUTTLE / MPV ────────────────────────────────────────
    name:          "Corporate Shuttle",
    model:         "BYD e6",
    capacity:      "6–7 Seats",
    ac:            true,
    eco:           5,
    features:      ["Group Travel Config", "Luggage Bay", "Reclining Seats"],
    badge:         "Solar-Charged · Closed-Loop Fleet",
    image:         imgBYDE6,
    accent:        "#064e3b",   // emerald-900 deep
    hoverTextDark: false,
  },
  {
    // ── 5. MUV / 7-SEATER ───────────────────────────────────────
    name:          "Premium MUV",
    model:         "Kia Carens Clavis",
    capacity:      "6–7 Seats",
    ac:            true,
    eco:           5,
    features:      ["3-Row Seating", "Connected Tech Suite", "ADAS Safety Pack"],
    badge:         "Solar-Charged · Multi-Row Premium",
    image:         imgKiaCarens,
    accent:        "#047857",   // emerald-700
    hoverTextDark: false,
  },
];

// ─── Hover contrast helper ────────────────────────────────────────
// hoverTextDark = true  → bright accent bg → deep black text
// hoverTextDark = false → dark accent bg   → white text
function hc(dark) {
  const a = "group-data-[active=true]:";
  return {
    h3:      dark ? `lg:group-hover:text-slate-950 ${a}text-slate-950` : `lg:group-hover:text-white ${a}text-white`,
    sub:     dark ? `lg:group-hover:text-slate-800 ${a}text-slate-800` : `lg:group-hover:text-white/90 ${a}text-white/90`,
    muted:   dark ? `lg:group-hover:text-slate-700 ${a}text-slate-700` : `lg:group-hover:text-white/75 ${a}text-white/75`,
    pill:    dark
      ? `lg:group-hover:bg-black/10 lg:group-hover:text-slate-900 ${a}bg-black/10 ${a}text-slate-900`
      : `lg:group-hover:bg-white/20 lg:group-hover:text-white ${a}bg-white/20 ${a}text-white`,
    check:   dark ? `lg:group-hover:text-slate-900 ${a}text-slate-900` : `lg:group-hover:text-white ${a}text-white`,
    border:  dark ? `lg:group-hover:border-black/12 ${a}border-black/12` : `lg:group-hover:border-white/20 ${a}border-white/20`,
    evBadge: dark
      ? `lg:group-hover:bg-black/12 lg:group-hover:text-slate-900 ${a}bg-black/12 ${a}text-slate-900`
      : `lg:group-hover:bg-white/20 lg:group-hover:text-white ${a}bg-white/20 ${a}text-white`,
  };
}

// ─── Single Fleet Card ───────────────────────────────────────────
function FleetCard({ card, index, cardWidth, isActive, onClick }) {
  const contrast = hc(card.hoverTextDark);

  return (
    <div
      onClick={onClick}
      // Each card is a fixed-width flex column; overflow VISIBLE so image pops out
      className="relative flex-shrink-0 group outline-none cursor-pointer [-webkit-tap-highlight-color:transparent]"
      style={{ width: cardWidth, touchAction: "manipulation" }}
      data-active={isActive}
    >
      {/*
        ─── CARD BACKGROUND BOX ──────────────────────────────────
        overflow-hidden clips the green wipe; the image sits OUTSIDE
        this box in an absolutely-positioned layer above it.
      */}
      <div
        className="relative overflow-hidden rounded-3xl
          bg-white dark:bg-[#090d1a]
          border border-slate-200/80 dark:border-white/[0.05]
          pt-[140px] pb-7 px-7
          transition-colors duration-300 will-change-[background-color,border-color]
          lg:group-hover:border-emerald-500/40 lg:group-hover:shadow-[0_0_20px_rgba(0,232,122,0.15)]
          group-data-[active=true]:border-emerald-500/40 group-data-[active=true]:shadow-[0_0_20px_rgba(0,232,122,0.15)]"
        // pt-[140px] reserves space for the overflowing image
      >
        {/* ── Green wipe (hardware accelerated transform) ─────────────── */}
        <div
          className="absolute inset-0 z-0 translate-y-[101%] lg:group-hover:translate-y-0 group-data-[active=true]:translate-y-0 transition-transform duration-400 ease-out will-change-transform"
          style={{ backgroundColor: card.accent }}
        />

        {/* ── Content — always above wipe ─────────────────────── */}
        <div className="relative z-10">

          {/* EV badge */}
          <div
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1
              text-[10px] font-bold tracking-widest uppercase
              bg-emerald-500/10 dark:bg-emerald-500/15
              text-emerald-600 dark:text-emerald-400
              transition-none lg:transition-all lg:duration-300 ${contrast.evBadge}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            EV · Solar-Charged
          </div>

          {/* Tier name */}
          <h3
            className={`mt-3 text-xl font-bold leading-tight
              text-slate-800 dark:text-zinc-100
              transition-none lg:transition-colors lg:duration-300 ${contrast.h3}`}
          >
            {card.name}
          </h3>

          {/* Model subtitle */}
          <p
            className={`mt-0.5 font-mono text-[11px] tracking-wide
              text-slate-400/80 dark:text-zinc-600
              transition-none lg:transition-colors lg:duration-300 ${contrast.muted}`}
          >
            {card.model}
          </p>

          {/* Tech badge line */}
          {card.badge && (
            <p
              className={`mt-2 text-[9px] uppercase tracking-[0.18em] font-mono
                text-slate-400/60 dark:text-zinc-700
                transition-none lg:transition-colors lg:duration-300 ${contrast.muted}`}
            >
              {card.badge}
            </p>
          )}

          {/* Divider */}
          <div
            className={`mt-5 mb-4 h-px bg-slate-100 dark:bg-white/[0.05]
              transition-none lg:transition-colors lg:duration-300 ${contrast.border}`}
          />

          {/* Spec pills */}
          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full
                px-3 py-1.5 text-[11px] font-medium
                bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-zinc-400
                transition-none lg:transition-all lg:duration-300 ${contrast.pill}`}
            >
              <Users size={12} /> {card.capacity}
            </span>
            {card.ac && (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full
                  px-3 py-1.5 text-[11px] font-medium
                  bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-zinc-400
                  transition-none lg:transition-all lg:duration-300 ${contrast.pill}`}
              >
                <Snowflake size={12} /> Climate AC
              </span>
            )}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full
                px-3 py-1.5 text-[11px] font-medium
                bg-emerald-500/10 text-emerald-600 dark:text-emerald-400
                transition-none lg:transition-all lg:duration-300 ${contrast.pill}`}
            >
              <Leaf size={12} /> Eco {card.eco}/5
            </span>
          </div>

          {/* Feature list */}
          <ul
            className={`mt-5 space-y-2.5 text-sm
              text-slate-600 dark:text-zinc-400
              transition-none lg:transition-colors lg:duration-300 ${contrast.sub}`}
          >
            {card.features.map((f) => (
              <li key={f} className="flex items-center gap-2.5">
                <Check
                  size={14}
                  className={`flex-shrink-0 text-emerald-500
                    transition-none lg:transition-colors lg:duration-300 ${contrast.check}`}
                />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/*
        ─── VEHICLE IMAGE LAYER ─────────────────────────────────
        Absolutely positioned over the card; top-negative pulls it
        above the card's background box. overflow-visible = true
        (because this parent div has no overflow:hidden).
        The image "breaks out" of the card visually.
      */}
      <div
        className="absolute left-0 right-0 flex items-end justify-center pointer-events-none"
        style={{
          top: -60,           // pull up above the card box
          height: 220,        // total image zone height
          zIndex: 20,
        }}
      >
        {/* Elliptical wheel shadow (studio lighting) */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: 220,
            height: 20,
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.30) 0%, transparent 72%)",
            filter: "blur(6px)",
            zIndex: 10,
          }}
        />

        {/* The vehicle PNG — breaks top edge, scales + lifts on hover */}
        <img
          src={card.image}
          alt={`${card.name} — ${card.model}`}
          className="relative w-auto object-contain z-20 transition-all duration-400 ease-out will-change-transform drop-shadow-[0_16px_14px_rgba(0,0,0,0.22)] lg:group-hover:-translate-y-2 lg:group-hover:scale-[1.05] lg:group-hover:drop-shadow-[0_30px_20px_rgba(0,0,0,0.35)] group-data-[active=true]:-translate-y-2 group-data-[active=true]:scale-[1.05] group-data-[active=true]:drop-shadow-[0_30px_20px_rgba(0,0,0,0.35)]"
          style={{
            height: 190,
          }}
          draggable={false}
        />
      </div>
    </div>
  );
}

// ─── Arrow Button ────────────────────────────────────────────────
function NavArrow({ direction, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous vehicles" : "Next vehicles"}
      style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
      className={`
        relative flex-shrink-0 h-11 w-11 rounded-full
        flex items-center justify-center
        border transition-all duration-250
        focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
        ${disabled
          ? "border-slate-200 dark:border-white/[0.05] text-slate-300 dark:text-zinc-700 cursor-not-allowed bg-white dark:bg-white/[0.02]"
          : "border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-zinc-300 bg-white dark:bg-white/[0.04] hover:bg-emerald-500 hover:border-emerald-500 hover:text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer"
        }
      `}
    >
      {direction === "left"
        ? <ChevronLeft size={18} strokeWidth={2.5} />
        : <ChevronRight size={18} strokeWidth={2.5} />
      }
    </button>
  );
}

// ─── Dot Indicator ────────────────────────────────────────────────
function DotIndicator({ count, active, onDotClick }) {
  return (
    <div className="flex items-center gap-2" role="tablist" aria-label="Fleet carousel position">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={i === active}
          onClick={() => onDotClick?.(i)}
          className={`
            rounded-full transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
            ${i === active
              ? "w-6 h-1.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
              : "w-1.5 h-1.5 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40"
            }
          `}
        />
      ))}
    </div>
  );
}

// ─── Main Fleet Section ───────────────────────────────────────────
export default function Fleet() {
  const { width: cardWidth, gap: cardGap, stride: cardStride, isDesktop } = useCardLayout();
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileSelectedIndex, setMobileSelectedIndex] = useState(null);
  const trackRef     = useRef(null);
  const viewportRef  = useRef(null);
  const x            = useMotionValue(0);
  const controls     = useAnimation();

  // How many cards visible at once (used for nav logic)
  const [visibleCount, setVisibleCount] = useState(3);

  // Compute drag constraints: track total width vs viewport width
  const getMaxDrag = useCallback(() => {
    if (!viewportRef.current) return 0;
    const viewW = viewportRef.current.offsetWidth;
    const trackW = FLEET.length * cardStride - cardGap;
    return Math.max(0, trackW - viewW);
  }, [cardStride, cardGap]);

  // Sync visible count on resize
  useEffect(() => {
    const update = () => {
      if (!viewportRef.current) return;
      const vw = viewportRef.current.offsetWidth;
      setVisibleCount(Math.floor((vw + cardGap) / cardStride));
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, [cardGap, cardStride]);

  // Snap to a given card index (clamped)
  const snapTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(idx, FLEET.length - 1));
    setActiveIndex(clamped);
    const target = -clamped * cardStride;
    const maxDrag = getMaxDrag();
    const final   = Math.max(-maxDrag, target);   // don't overshoot end
    controls.start({ x: final, transition: { type: "spring", stiffness: 120, damping: 22 } });
  }, [controls, getMaxDrag, cardStride]);

  const canPrev = activeIndex > 0;
  const canNext = activeIndex < FLEET.length - visibleCount;

  // After a free drag ends, snap to nearest card
  const handleDragEnd = (_, info) => {
    const currentX = x.get();
    // Nearest index from current position
    const rawIdx = -currentX / cardStride;
    const nearest = Math.round(rawIdx);
    // Momentum nudge: if velocity > threshold, nudge one card further
    const vx = info.velocity.x;
    let target = nearest;
    if (vx < -200) target = nearest + 1;
    if (vx >  200) target = nearest - 1;
    snapTo(Math.max(0, Math.min(target, FLEET.length - 1)));
  };

  const maxDrag = getMaxDrag();

  return (
    <section className="section overflow-hidden">
      {/* ── Section header ─────────────────────────────────────── */}
      <Reveal className="mb-14 max-w-2xl">
        <SectionLabel index={5}>The Electric Garage</SectionLabel>
        <h2 className="mt-5 font-syne text-3xl font-light tracking-tight md:text-4xl lg:text-5xl leading-[1.15]">
          Zero emissions,{" "}
          <span className="font-extrabold text-slate-900 dark:text-white">
            uncompromised
          </span>{" "}
          <span className="font-serif italic font-light text-emerald-400">
            comfort
          </span>
        </h2>
        <p className="mt-4 text-base text-slate-500 dark:text-zinc-500 leading-relaxed max-w-xl">
          Five solar-charged EV tiers. Drag or use the arrows to explore the fleet.
        </p>
      </Reveal>

      {/* ── Controls row ───────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-8">
        <DotIndicator count={FLEET.length} active={activeIndex} onDotClick={snapTo} />
        <div className="flex items-center gap-3">
          <NavArrow direction="left"  onClick={() => snapTo(activeIndex - 1)} disabled={!canPrev} />
          <NavArrow direction="right" onClick={() => snapTo(activeIndex + 1)} disabled={!canNext} />
        </div>
      </div>

      {/* ── Slider viewport ────────────────────────────────────── */}
      {/*
        overflow-visible so vehicle images can pop above the track;
        but we also need the mask to fade left/right edges elegantly.
        We achieve this by wrapping in a container with a CSS mask.
      */}
      <div
        ref={viewportRef}
        className="relative w-full"
        style={{
          // Fade right edge to hint "more cards"
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 3%, black 92%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 3%, black 92%, transparent 100%)",
        }}
      >
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.04}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ x, paddingTop: 72, paddingBottom: 24 }}
          className="flex gap-6 cursor-grab active:cursor-grabbing"
        >
          {FLEET.map((card, i) => (
            <FleetCard 
              key={card.name} 
              card={card} 
              index={i} 
              cardWidth={cardWidth} 
              isActive={!isDesktop && i === mobileSelectedIndex} 
              onClick={() => {
                if (!isDesktop) {
                  snapTo(i);
                  setMobileSelectedIndex(prev => prev === i ? null : i);
                }
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* ── Mobile swipe hint ─────────────────────────────────── */}
      <p className="mt-6 text-center text-[10px] uppercase tracking-[0.22em] text-slate-400/50 dark:text-zinc-700 font-mono select-none sm:hidden">
        ← Swipe to explore →
      </p>
    </section>
  );
}
