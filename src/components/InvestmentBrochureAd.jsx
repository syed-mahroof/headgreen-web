/**
 * InvestmentBrochureAd.jsx
 * ─────────────────────────────────────────────────────────────────
 * An interactive, story-style brochure component for Investment Tiers.
 * Inspired by HeadGreenStoryAd but tailored for HNWI & B2B investors.
 * ─────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { RefreshCcw, CarFront, Zap, ChevronRight, TrendingUp } from "lucide-react";
import hgLogo from "../assets/ADHIL LOGO.png";

const SCENE_DURATION = 5500;
const TOTAL_SCENES   = 5;

// ─── SCENES ───────────────────────────────────────────────────────

function Scene1() {
  return (
    <div className="ib-scene-inner" style={{ animationName: "ibFadeUp", animationDuration: "0.8s", animationFillMode: "both" }}>
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-[#00e87a] font-semibold text-[10px] uppercase tracking-widest mb-6 border border-emerald-500/20 shadow-[0_0_15px_rgba(0,232,122,0.15)]">
          <TrendingUp size={14} />
          Investment Opportunities
        </div>
        <img src={hgLogo} alt="HeadGreen! Premium Corporate Cabs Kerala" className="h-10 md:h-12 w-auto mb-4 filter drop-shadow-[0_0_15px_rgba(0,232,122,0.3)]" />
        <h2 className="font-display text-2xl md:text-4xl font-bold text-white leading-tight mb-4" style={{ animationDelay: "0.2s" }}>
          Power the Future of<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e87a] to-teal-200">Corporate Mobility.</span>
        </h2>
        <div className="font-syne tracking-[0.22em] text-[8px] md:text-[10px] font-bold uppercase text-[#539242] mb-6" style={{ animationDelay: "0.4s" }}>
          DRIVE GREEN, LIVE CLEAN
        </div>
        <p className="text-white/60 text-xs md:text-sm max-w-md mx-auto leading-relaxed" style={{ animationDelay: "0.6s", animationName: "ibFadeUp", animationDuration: "0.8s", animationFillMode: "both" }}>
          High-yield, asset-backed investment opportunities in Kochi's premier zero-emission corporate fleet.
        </p>
      </div>
    </div>
  );
}

function Scene2() {
  return (
    <div className="ib-scene-inner w-full max-w-lg mx-auto" style={{ animationName: "ibCardIn", animationDuration: "0.6s", animationFillMode: "both" }}>
      <div className="flex flex-col items-center text-center p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-slate-200/10 backdrop-blur-md shadow-[0_20px_40px_-15px_rgba(16,185,129,0.1)]">
        <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 text-[#00e87a] shadow-[0_0_15px_rgba(0,232,122,0.2)]">
          <RefreshCcw size={28} />
        </div>
        <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2">Refurbished Vehicle</h3>
        <div className="inline-block px-3 py-1 rounded bg-white/5 text-slate-300 text-[9px] md:text-[10px] font-bold tracking-widest mb-4 uppercase border border-white/10">
          Certified Fleet Renewal
        </div>
        <p className="text-white/70 text-xs md:text-sm leading-relaxed">
          A highly genuine, lower-barrier entry point. Invest in high-quality, lightly used EVs that undergo our rigorous HeadGreen! certification process. Achieve accelerated deployment and rapid ROI while maintaining strictly zero-emission standards.
        </p>
      </div>
    </div>
  );
}

function Scene3() {
  return (
    <div className="ib-scene-inner w-full max-w-lg mx-auto" style={{ animationName: "ibCardIn", animationDuration: "0.6s", animationFillMode: "both" }}>
      <div className="flex flex-col items-center text-center p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-slate-200/10 backdrop-blur-md shadow-[0_20px_40px_-15px_rgba(16,185,129,0.1)]">
        <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 text-[#00e87a] shadow-[0_0_15px_rgba(0,232,122,0.2)]">
          <CarFront size={28} />
        </div>
        <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2">New Vehicle Leasing</h3>
        <div className="inline-block px-3 py-1 rounded bg-white/5 text-slate-300 text-[9px] md:text-[10px] font-bold tracking-widest mb-4 uppercase border border-white/10">
          Premium EV Asset Equity
        </div>
        <p className="text-white/70 text-xs md:text-sm leading-relaxed">
          Direct investment in brand-new, top-tier electric vehicles (e.g. Kia Carens Clavis EV) injected directly into our fleet. You own the asset; we manage the enterprise deployment. Enjoy consistent, contract-backed monthly yields.
        </p>
      </div>
    </div>
  );
}

function Scene4() {
  return (
    <div className="ib-scene-inner w-full max-w-lg mx-auto relative group" style={{ animationName: "ibCardIn", animationDuration: "0.6s", animationFillMode: "both" }}>
      <div className="ib-hero-card flex flex-col items-center text-center p-6 md:p-8 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-[#00e87a]/30 backdrop-blur-md shadow-[0_0_30px_-5px_rgba(0,232,122,0.3)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00e87a]/15 via-transparent to-transparent rounded-3xl pointer-events-none" />
        
        <div className="relative z-10 h-14 w-14 rounded-2xl bg-[#00e87a]/20 border border-[#00e87a]/40 flex items-center justify-center mb-5 text-[#00e87a] shadow-[0_0_20px_rgba(0,232,122,0.4)]">
          <Zap size={28} />
        </div>
        <h3 className="relative z-10 font-display text-xl md:text-2xl font-bold text-white mb-2">Infrastructure Investment</h3>
        <div className="relative z-10 inline-block px-3 py-1 rounded bg-[#00e87a]/20 text-[#00e87a] text-[9px] md:text-[10px] font-bold tracking-widest mb-4 uppercase border border-[#00e87a]/40 shadow-[0_0_10px_rgba(0,232,122,0.2)]">
          Core Infrastructure Seed Fund
        </div>
        <p className="relative z-10 text-white/80 text-xs md:text-sm leading-relaxed">
          Become a foundational partner. Seed fund our proprietary charging hubs, tech stacks, and operational scaling. Your capital fuels the grid that keeps our entire fleet moving, offering overarching, company-wide growth participation.
        </p>
      </div>
    </div>
  );
}

function Scene5() {
  return (
    <div className="ib-scene-inner flex flex-col items-center text-center" style={{ animationName: "ibFadeUp", animationDuration: "0.6s", animationFillMode: "both" }}>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
        Ready to energize<br /><span className="text-[#00e87a]">your portfolio?</span>
      </h2>
      <p className="text-white/60 text-xs md:text-sm max-w-sm mx-auto leading-relaxed mb-8" style={{ animationDelay: "0.2s", animationName: "ibFadeUp", animationDuration: "0.6s", animationFillMode: "both" }}>
        Connect directly with our founders to discuss yields, fleet deployment schedules, and overarching equity opportunities.
      </p>
      <a 
        href="mailto:founders@headgreen.in?subject=Investment%20Prospectus%20Request"
        className="group inline-flex items-center gap-2 rounded-full bg-[#00e87a] px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#050816] transition-all hover:bg-emerald-400 hover:shadow-[0_0_25px_-5px_rgba(0,232,122,0.6)]"
        style={{ animationDelay: "0.4s", animationName: "ibFadeUp", animationDuration: "0.6s", animationFillMode: "both" }}
      >
        Request Prospectus
        <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────

export default function InvestmentBrochureAd() {
  const [currentScene, setCurrentScene] = useState(0);
  const [playing,      setPlaying]      = useState(false);
  const [mobileActive, setMobileActive] = useState(false);

  const progressBarRef= useRef(null);
  const isHovering    = useRef(false);
  const rafId         = useRef(null);
  const startTimeRef  = useRef(null);
  const pausedAtRef   = useRef(0);
  const currentRef    = useRef(0);
  const playingRef    = useRef(false);
  const containerRef  = useRef(null);
  const activeTimer   = useRef(null);

  useEffect(() => { currentRef.current = currentScene; }, [currentScene]);

  // Core rAF loop
  const animate = useCallback((ts) => {
    if (!playingRef.current) return;
    if (!startTimeRef.current) startTimeRef.current = ts;
    const elapsed = ts - startTimeRef.current + pausedAtRef.current;
    const pct     = Math.min((elapsed / SCENE_DURATION) * 100, 100);
    if (progressBarRef.current) progressBarRef.current.style.width = pct + "%";
    if (pct >= 100) {
      pausedAtRef.current  = 0;
      startTimeRef.current = null;
      const next = (currentRef.current + 1) % TOTAL_SCENES;
      setCurrentScene(next);
      rafId.current = requestAnimationFrame(animate);
      return;
    }
    rafId.current = requestAnimationFrame(animate);
  }, []);

  // Play / Pause
  const startPlay = useCallback(() => {
    playingRef.current   = true;
    setPlaying(true);
    startTimeRef.current = null;
    rafId.current = requestAnimationFrame(animate);
  }, [animate]);

  const pause = useCallback(() => {
    playingRef.current = false;
    setPlaying(false);
    cancelAnimationFrame(rafId.current);
    if (startTimeRef.current !== null) {
      pausedAtRef.current = Math.min(
        pausedAtRef.current + (performance.now() - startTimeRef.current),
        SCENE_DURATION - 10
      );
    }
    startTimeRef.current = null;
  }, []);

  // IntersectionObserver — scroll-to-play
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!playingRef.current && !isHovering.current) startPlay();
        } else {
          if (playingRef.current) pause();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startPlay, pause]);

  // Cleanup on unmount
  useEffect(() => () => cancelAnimationFrame(rafId.current), []);

  // Hover: pause / resume
  const handleMouseEnter = () => { isHovering.current = true;  if (playingRef.current)  pause();     };
  const handleMouseLeave = () => { isHovering.current = false; if (!playingRef.current) startPlay(); };

  // Mobile touch reveal controls
  const handleTouch = () => {
    setMobileActive(true);
    if (activeTimer.current) clearTimeout(activeTimer.current);
    activeTimer.current = setTimeout(() => {
      setMobileActive(false);
    }, 4000);
  };

  // Manual navigation
  const goTo = (idx) => {
    pausedAtRef.current  = 0;
    startTimeRef.current = null;
    setCurrentScene(idx);
    if (progressBarRef.current) progressBarRef.current.style.width = "0%";
    if (playing) { cancelAnimationFrame(rafId.current); rafId.current = requestAnimationFrame(animate); }
  };
  const goPrev    = (e) => { e.stopPropagation(); goTo((currentScene - 1 + TOTAL_SCENES) % TOTAL_SCENES); };
  const goNext    = (e) => { e.stopPropagation(); goTo((currentScene + 1) % TOTAL_SCENES); };
  const togglePlay = (e) => { e.stopPropagation(); playing ? pause() : startPlay(); };

  const scenes = [
    <Scene1 key="s1" />,
    <Scene2 key="s2" />,
    <Scene3 key="s3" />,
    <Scene4 key="s4" />,
    <Scene5 key="s5" />
  ];

  return (
    <>
      <style>{`
        /* Scoped styles specifically for Investment Brochure Ad */
        .ib-ad {
          width: 100%;
          font-family: 'Inter', system-ui, sans-serif;
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          padding: 32px 16px;
          height: auto;
          min-height: 420px;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.05);
        }
        @media (min-width: 768px) {
          .ib-ad {
            padding: 0;
            aspect-ratio: 16/10;
            max-height: 480px;
            min-height: 480px;
          }
        }

        /* Scenes */
        .ib-scene {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.65s cubic-bezier(.4,0,.2,1);
          padding: 20px; pointer-events: none;
          will-change: transform, opacity;
        }
        @media (min-width: 768px) { .ib-scene { padding: 40px; } }
        .ib-scene.ib-active { opacity: 1; pointer-events: auto; }

        /* Background Effects */
        .ib-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,232,122,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,232,122,0.15) 1px, transparent 1px);
          background-size: 30px 30px;
          pointer-events: none;
          opacity: 0.2;
        }
        .ib-glow {
          position: absolute; border-radius: 50%; filter: blur(70px); pointer-events: none;
        }

        /* Animations */
        @keyframes ibFadeUp {
          from { opacity: 0; transform: translateY(15px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ibCardIn {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Glowing Border for Tier 3 Hero Card */
        .ib-hero-card {
          position: relative;
        }
        .ib-hero-card::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(90deg, #00e87a, transparent, #00e87a, transparent);
          background-size: 200% 100%;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: ibBorderFlow 3s linear infinite;
          opacity: 0.9;
          z-index: -1;
        }
        @keyframes ibBorderFlow {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }

        /* UI Overlays */
        .ib-progress-bar {
          position: absolute; top: 0; left: 0;
          height: 3px;
          transition: width 0.1s linear; z-index: 20;
        }
        .ib-controls-container {
          position: absolute; bottom: 0; left: 0; right: 0; height: 50px;
          opacity: 0; pointer-events: none;
          transform: translateY(4px);
          transition: all 0.3s ease;
          display: flex; justify-content: center; align-items: center;
          background: linear-gradient(to top, rgba(5,8,22,0.9), transparent);
        }
        .ib-dots {
          position: absolute; bottom: 18px; left: 50%;
          transform: translateX(-50%);
          display: flex; gap: 8px; z-index: 20;
        }
        .ib-dot {
          width: 6px; height: 6px; border-radius: 50%;
          cursor: pointer; border: none; padding: 0;
        }
        .ib-controls { position: absolute; bottom: 13px; right: 16px; display: flex; gap: 8px; z-index: 20; }
        .ib-ctrl-btn {
          font-size: 10px; padding: 5px 12px;
          border-radius: 6px; cursor: pointer;
          font-family: 'Inter', system-ui, sans-serif;
          font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;
        }
        
        .ib-hover-hint {
          position: absolute; inset: 0; z-index: 10;
          display: flex; align-items: center; justify-content: center;
          pointer-events: none; opacity: 0; transition: opacity 0.3s;
        }
        @media (hover: hover) {
          .ib-ad:hover .ib-hover-hint { opacity: 1; }
          .ib-ad:hover .ib-controls-container { opacity: 1; transform: translateY(0); }
          .ib-ad:hover .ib-controls-container .ib-dots,
          .ib-ad:hover .ib-controls-container .ib-controls { pointer-events: auto; }
        }
        .ib-pause-badge {
          font-size: 10px; font-weight: 700;
          padding: 6px 12px; border-radius: 20px;
          letter-spacing: 1px; text-transform: uppercase;
        }

        .ib-ad.ib-mobile-active .ib-controls-container { opacity: 1; transform: translateY(0); }
        .ib-ad.ib-mobile-active .ib-controls-container .ib-dots,
        .ib-ad.ib-mobile-active .ib-controls-container .ib-controls { pointer-events: auto; }
      `}</style>

      <div
        id="ib-ad"
        ref={containerRef}
        className={`ib-ad group bg-[#03050d] text-white transition-colors duration-300 ${mobileActive ? "ib-mobile-active" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleTouch}
        role="region"
        aria-label="HeadGreen Investment Brochure"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {/* Backgrounds */}
        <div className="ib-grid-bg" />
        <div className="ib-glow" style={{ width: 300, height: 300, background: "rgba(0,232,122,0.06)", top: -100, right: -50 }} />
        <div className="ib-glow" style={{ width: 250, height: 250, background: "rgba(0,100,200,0.08)", bottom: -50, left: -50 }} />

        {/* Hover Hint */}
        <div className="ib-hover-hint">
          <span className="ib-pause-badge bg-black/50 text-[#00e87a] border border-[#00e87a]/30 backdrop-blur-md">⏸ Paused</span>
        </div>

        {/* Scenes */}
        {scenes.map((sceneEl, i) => (
          <div key={i} className={`ib-scene${currentScene === i ? " ib-active" : ""}`}>
            {sceneEl}
          </div>
        ))}

        {/* UI Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div ref={progressBarRef} className="ib-progress-bar bg-[#00e87a] shadow-[0_0_10px_rgba(0,232,122,0.8)]" style={{ width: "0%" }} />

          <div className="ib-controls-container">
            <div className="ib-dots" role="tablist">
              {Array.from({ length: TOTAL_SCENES }).map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={currentScene === i}
                  aria-label={`Go to scene ${i + 1}`}
                  className={`ib-dot bg-white/20 transition-all${currentScene === i ? " ib-dot-active !bg-[#00e87a] scale-125" : ""}`}
                  onClick={(e) => { e.stopPropagation(); goTo(i); }}
                />
              ))}
            </div>

            <div className="ib-controls">
              <button className="ib-ctrl-btn bg-white/10 text-white/80 hover:bg-[#00e87a]/20 hover:text-[#00e87a] backdrop-blur-sm border border-white/10 transition-colors" onClick={goPrev}>‹</button>
              <button className="ib-ctrl-btn bg-white/10 text-white/80 hover:bg-[#00e87a]/20 hover:text-[#00e87a] backdrop-blur-sm border border-white/10 transition-colors" onClick={togglePlay}>
                {playing ? "⏸" : "▶"}
              </button>
              <button className="ib-ctrl-btn bg-white/10 text-white/80 hover:bg-[#00e87a]/20 hover:text-[#00e87a] backdrop-blur-sm border border-white/10 transition-colors" onClick={goNext}>›</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
