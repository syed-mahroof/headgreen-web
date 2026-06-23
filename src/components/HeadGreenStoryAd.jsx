/**
 * HeadGreenStoryAd.jsx
 * ─────────────────────────────────────────────────────────────────
 * A self-contained, story-style advertisement component.
 *
 * Features:
 *  1. SCROLL-TO-PLAY  — IntersectionObserver fires the animation
 *     loop only when ≥50% of the component is visible.
 *  2. HOVER-TO-PAUSE  — Progress bar & scene timer freeze on
 *     mouseenter and resume on mouseleave.
 *  3. MANUAL CONTROLS — Prev · Pause/Play · Next buttons +
 *     clickable scene-indicator dots.
 *  4. ZERO rAF waste  — all timers are cleaned up on unmount.
 * ─────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// ─── IMPORTS ─────────────────────────────────────────────────────
import hgLogo from "../assets/ADHIL LOGO.png";
import imgSedan from "../assets/Tata Tigor EV sedan.png";
import imgSuv from "../assets/tata nexon ev.png";
import imgHatchback from "../assets/citroen ec3 EV.png";
import imgShuttle from "../assets/byd e6 ev.png";

// ─── constants ───────────────────────────────────────────────────
const SCENE_DURATION = 4200; // ms per scene
const TOTAL_SCENES   = 6;

// ─── scene definitions ───────────────────────────────────────────
function Scene1() {
  return (
    <div
      className="hg-scene-inner"
      style={{ animationName: "hgLogoReveal", animationDuration: "0.8s", animationDelay: "0.3s", animationFillMode: "both" }}
    >
      <div className="hg-s1-logo">
        <img
          src={hgLogo}
          alt="HeadGreen! Logo"
          className="hg-logo-main"
        />
        <div className="hg-brand-name">HeadGreen!</div>
        <div className="hg-tagline text-slate-600 dark:text-white/60">EV Corporate Mobility · Kochi</div>
      </div>
      <div className="hg-s1-headline text-slate-600 dark:text-white/60" style={{ animationDelay: "0.9s" }}>
        Kochi's tech workforce deserves a<br />
        <strong className="text-[#00e87a]">smarter, cleaner commute.</strong>
      </div>
    </div>
  );
}

function Scene2() {
  const stats = [
    { num: "1.5M+", label: "Green Kilometres",  sub: "Zero tailpipe emissions", delay: "0.08s" },
    { num: "99%",   label: "On-Time Rate",       sub: "Every pick-up & drop-off", delay: "0.20s" },
    { num: "10+",   label: "Corporate Clients",  sub: "Infopark · SmartCity",    delay: "0.32s" },
    { num: "20+",   label: "EV Fleet",           sub: "Solar-charged grid",      delay: "0.44s" },
  ];
  return (
    <>
      <div className="hg-s2-title text-slate-900 dark:text-white" style={{ animationName: "hgFadeUp", animationDuration: "0.5s", animationFillMode: "both" }}>
        Numbers that <span className="text-[#00e87a]">speak for themselves</span>
      </div>
      <div className="hg-stats-grid">
        {stats.map((s) => (
          <div
            key={s.label}
            className="hg-stat-card bg-slate-900/5 dark:bg-white/5 border border-emerald-500/20 backdrop-blur-md"
            style={{ animationName: "hgCardIn", animationDuration: "0.5s", animationDelay: s.delay, animationFillMode: "both" }}
          >
            <div className="hg-stat-num text-[#00e87a]">{s.num}</div>
            <div className="hg-stat-label text-slate-600 dark:text-white/60">{s.label}</div>
            <div className="hg-stat-sub text-slate-600 dark:text-white/60">{s.sub}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function Scene3() {
  const fleet = [
    { imgSrc: imgSedan,     name: "Tigor EV Sedan",  badge: "Executive", delay: "0.06s" },
    { imgSrc: imgSuv,       name: "Nexon Executive", badge: "SUV",       delay: "0.18s" },
    { imgSrc: imgHatchback, name: "eC3 Hatchback",   badge: "Daily",     delay: "0.30s" },
    { imgSrc: imgShuttle,   name: "BYD e6 Shuttle",  badge: "7-Seater",  delay: "0.42s" },
  ];
  return (
    <>
      <div className="hg-s3-title text-slate-900 dark:text-white" style={{ animationName: "hgFadeUp", animationDuration: "0.5s", animationFillMode: "both" }}>
        Zero emissions, <span className="text-[#00e87a]">uncompromised comfort</span>
      </div>
      <div className="hg-s3-sub text-slate-600 dark:text-white/60" style={{ animationName: "hgFadeUp", animationDuration: "0.5s", animationDelay: "0.18s", animationFillMode: "both" }}>
        Four vehicle classes · all-electric · all premium
      </div>
      <div className="hg-fleet-row">
        {fleet.map(({ imgSrc, name, badge, delay }) => (
          <div
            key={name}
            className="hg-fleet-card bg-slate-900/5 dark:bg-white/5 border border-emerald-500/20 backdrop-blur-md"
            style={{ animationName: "hgCardIn", animationDuration: "0.5s", animationDelay: delay, animationFillMode: "both" }}
          >
            <img src={imgSrc} alt={name} className="hg-fleet-img" />
            <div className="hg-fleet-name text-slate-600 dark:text-white/60">{name}</div>
            <div className="hg-fleet-badge text-[#00e87a] bg-emerald-500/10">{badge}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function Scene4() {
  const tech = [
    { text: <><strong className="text-slate-900 dark:text-white">AI Route Optimisation</strong> — dynamic rerouting every shift</>,    delay: "0.04s" },
    { text: <><strong className="text-slate-900 dark:text-white">Live Vehicle Telemetry</strong> — sub-second GPS tracking</>,          delay: "0.14s" },
    { text: <><strong className="text-slate-900 dark:text-white">Automatic Attendance Sync</strong> — seamless HR integration</>,       delay: "0.24s" },
    { text: <><strong className="text-slate-900 dark:text-white">WhatsApp Notifications</strong> — instant employee alerts</>,          delay: "0.34s" },
  ];
  return (
    <>
      <div className="hg-s4-title text-slate-900 dark:text-white" style={{ animationName: "hgFadeUp", animationDuration: "0.5s", animationFillMode: "both" }}>
        AI that manages your fleet <span className="text-[#00e87a]">in real time</span>
      </div>
      <div className="hg-tech-list">
        {tech.map((t, i) => (
          <div
            key={i}
            className="hg-tech-item bg-slate-900/5 dark:bg-white/5 border border-emerald-500/20 backdrop-blur-md"
            style={{ animationName: "hgSlideIn", animationDuration: "0.5s", animationDelay: t.delay, animationFillMode: "both" }}
          >
            <div className="hg-tech-dot bg-[#00e87a] shadow-[0_0_6px_rgba(0,232,122,0.53)]" />
            <div className="hg-tech-text text-slate-600 dark:text-white/60">{t.text}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function Scene5() {
  return (
    <>
      <div className="hg-s5-title text-slate-900 dark:text-white" style={{ animationName: "hgFadeUp", animationDuration: "0.5s", animationFillMode: "both" }}>
        Built circular. <span className="text-[#00e87a]">Built to last.</span>
      </div>
      <div className="hg-eco-split">
        {/* Solar card */}
        <div
          className="hg-eco-card bg-slate-900/5 dark:bg-white/5 border border-emerald-500/20 backdrop-blur-md"
          style={{ animationName: "hgCardIn", animationDuration: "0.5s", animationDelay: "0.08s", animationFillMode: "both" }}
        >
          <svg width="46" height="46" viewBox="0 0 46 46" fill="none" aria-hidden="true" className="mx-auto h-[36px] lg:h-[46px]">
            <circle cx="23" cy="23" r="9" fill="rgba(0,232,122,0.18)" stroke="#00e87a" strokeWidth="1.5"/>
            <circle cx="23" cy="23" r="4.5" fill="#00e87a" opacity="0.75"/>
            <line x1="23" y1="5" x2="23" y2="11" stroke="#00e87a" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="23" y1="35" x2="23" y2="41" stroke="#00e87a" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="5" y1="23" x2="11" y2="23" stroke="#00e87a" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="35" y1="23" x2="41" y2="23" stroke="#00e87a" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <div className="hg-eco-label text-slate-900 dark:text-white">Solar-Offset Charging</div>
          <div className="hg-eco-desc text-slate-600 dark:text-white/60">Fleet powered by a dedicated solar grid — not the fossil fuel network</div>
        </div>
        {/* Battery card */}
        <div
          className="hg-eco-card bg-slate-900/5 dark:bg-white/5 border border-emerald-500/20 backdrop-blur-md"
          style={{ animationName: "hgCardIn", animationDuration: "0.5s", animationDelay: "0.22s", animationFillMode: "both" }}
        >
          <svg width="52" height="52" viewBox="0 0 52 52" aria-hidden="true" className="mx-auto h-[42px] lg:h-[52px]">
            <circle cx="26" cy="26" r="21" fill="none" stroke="rgba(0,232,122,0.12)" strokeWidth="4"/>
            <circle
              cx="26" cy="26" r="21"
              fill="none" stroke="#00e87a" strokeWidth="4"
              strokeDasharray="105 27" strokeLinecap="round" strokeDashoffset="35"
            />
            <text x="26" y="30" textAnchor="middle" fill="#00e87a" fontSize="10" fontWeight="800" fontFamily="Inter,sans-serif">80%</text>
          </svg>
          <div className="hg-eco-label text-slate-900 dark:text-white">Battery Refurbishment</div>
          <div className="hg-eco-desc text-slate-600 dark:text-white/60">EVs intercepted at 5–6 yrs, battery packs rebuilt in-house to peak</div>
        </div>
      </div>
    </>
  );
}

function Scene6({ onCtaClick }) {
  return (
    <>
      <div
        className="hg-cta-logo-row"
        style={{ animationName: "hgFadeUp", animationDuration: "0.5s", animationFillMode: "both" }}
      >
        <img src={hgLogo} alt="HeadGreen! Logo" className="hg-logo-sm" />
        <div className="hg-cta-logo-name">HeadGreen!</div>
      </div>
      <div
        className="hg-cta-main text-slate-900 dark:text-white"
        style={{ animationName: "hgFadeUp", animationDuration: "0.6s", animationDelay: "0.1s", animationFillMode: "both" }}
      >
        Ready to electrify<br /><span className="text-[#00e87a]">your fleet?</span>
      </div>
      <div
        className="hg-cta-sub text-slate-600 dark:text-white/60"
        style={{ animationName: "hgFadeUp", animationDuration: "0.6s", animationDelay: "0.28s", animationFillMode: "both" }}
      >
        Switch to Kochi's smartest, greenest corporate mobility platform.
      </div>
      <button
        className="hg-cta-btn bg-[#00e87a] text-slate-900 dark:text-[#050816] hover:opacity-90 hover:-translate-y-px transition-all"
        style={{ animationName: "hgFadeUp", animationDuration: "0.6s", animationDelay: "0.44s", animationFillMode: "both" }}
        onClick={onCtaClick}
      >
        Get a Free Fleet Demo
      </button>
      <div
        className="hg-cta-url text-slate-600 dark:text-white/60"
        style={{ animationName: "hgFadeUp", animationDuration: "0.6s", animationDelay: "0.6s", animationFillMode: "both" }}
      >
        headgreen.in · Infopark · SmartCity Kakkanad · COK
      </div>
    </>
  );
}

// ─── main component ───────────────────────────────────────────────
export default function HeadGreenStoryAd() {
  const navigate = useNavigate();

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
  const particlesDone = useRef(false);
  const activeTimer   = useRef(null);

  useEffect(() => { currentRef.current = currentScene; }, [currentScene]);

  // ─── particle spawning (runs once on first intersection) ────────
  const spawnParticles = useCallback(() => {
    if (particlesDone.current) return;
    particlesDone.current = true;
    const container = containerRef.current?.querySelector(".hg-particles");
    if (!container) return;
    for (let i = 0; i < 14; i++) {
      const p = document.createElement("div");
      p.className = "hg-particle";
      p.style.cssText = `
        width:${2 + Math.random() * 3}px;
        height:${2 + Math.random() * 3}px;
        left:${Math.random() * 100}%;
        top:${20 + Math.random() * 70}%;
        animation-delay:${Math.random() * 4}s;
        animation-duration:${3 + Math.random() * 3}s;
      `;
      container.appendChild(p);
    }
  }, []);

  // ─── core rAF loop ──────────────────────────────────────────────
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

  // ─── play / pause ────────────────────────────────────────────────
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

  // ─── IntersectionObserver — scroll-to-play ──────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          spawnParticles();
          if (!playingRef.current && !isHovering.current) startPlay();
        } else {
          if (playingRef.current) pause();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startPlay, pause, spawnParticles]);

  // ─── cleanup on unmount ──────────────────────────────────────────
  useEffect(() => () => cancelAnimationFrame(rafId.current), []);

  // ─── hover: pause / resume ───────────────────────────────────────
  const handleMouseEnter = () => { isHovering.current = true;  if (playingRef.current)  pause();     };
  const handleMouseLeave = () => { isHovering.current = false; if (!playingRef.current) startPlay(); };

  // ─── mobile touch reveal ─────────────────────────────────────────
  const handleTouch = () => {
    setMobileActive(true);
    if (activeTimer.current) clearTimeout(activeTimer.current);
    activeTimer.current = setTimeout(() => {
      setMobileActive(false);
    }, 4000);
  };

  // ─── manual navigation ───────────────────────────────────────────
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
    <Scene5 key="s5" />,
    <Scene6 key="s6" onCtaClick={() => navigate("/corporate")} />,
  ];

  return (
    <>
      {/* ─── scoped styles (all prefixed hg- to avoid collisions) ─── */}
      <style>{`
        .hg-ad {
          width: 100%;
          font-family: 'Inter', system-ui, sans-serif;
          position: relative;
          overflow: hidden;
          border-radius: 14px;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          /* Mobile scaling: flex padding, auto height */
          padding: 32px 16px;
          height: auto;
          min-height: 380px;
        }
        @media (min-width: 1024px) {
          .hg-ad {
            padding: 0;
            aspect-ratio: 16/9;
            height: 420px;
            max-height: 430px;
            min-height: auto;
          }
        }

        /* Logo images */
        .hg-logo-main {
          height: 44px; /* Reduced for mobile */
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 0 25px rgba(0, 232, 122, 0.25));
          margin-bottom: 6px;
        }
        @media (min-width: 640px) { .hg-logo-main { height: 60px; } }
        @media (min-width: 1024px) { .hg-logo-main { height: 95px; } }
        .hg-logo-sm {
          height: 28px;
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 0 12px rgba(0, 232, 122, 0.2));
        }
        @media (min-width: 1024px) { .hg-logo-sm { height: 42px; } }

        /* Grid bg */
        .hg-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(#00e87a 1px, transparent 1px),
            linear-gradient(90deg, #00e87a 1px, transparent 1px);
          background-size: 44px 44px;
          pointer-events: none;
        }

        /* Orbs */
        .hg-orb { position:absolute; border-radius:50%; filter:blur(65px); pointer-events:none; transition: opacity 0.3s ease; }

        /* Particles */
        .hg-particles { position:absolute; inset:0; pointer-events:none; transition: opacity 0.3s ease; }
        .hg-particle {
          position:absolute; border-radius:50%;
          background: #00e87a; opacity:0;
          animation:hgParticleFade 4s infinite;
          will-change: transform, opacity;
        }
        @keyframes hgParticleFade {
          0%   { opacity:0;   transform:translateY(0) scale(0.5); }
          30%  { opacity:0.3; }
          100% { opacity:0;   transform:translateY(-55px) scale(1.3); }
        }

        /* Scenes */
        .hg-scene {
          position:absolute; inset:0;
          display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          opacity:0; transition:opacity 0.65s cubic-bezier(.4,0,.2,1);
          padding: 16px; pointer-events:none;
          will-change: transform, opacity;
        }
        @media (min-width: 1024px) { .hg-scene { padding: 20px 28px; } }
        .hg-scene.hg-active { opacity:1; pointer-events:auto; }

        /* Keyframes */
        @keyframes hgLogoReveal {
          from { opacity:0; transform:scale(0.85) translateY(12px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes hgFadeUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes hgCardIn {
          from { opacity:0; transform:scale(0.95) translateY(10px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes hgSlideIn {
          from { opacity:0; transform:translateX(-15px); }
          to   { opacity:1; transform:translateX(0); }
        }

        /* Scene 1 */
        .hg-s1-logo { display:flex; flex-direction:column; align-items:center; }
        .hg-brand-name { font-family: 'Montserrat', sans-serif; color: #539242; font-size: 20px; font-weight:800; letter-spacing:-0.5px; margin-bottom:2px; }
        @media (min-width: 1024px) { .hg-brand-name { font-size: 24px; } }
        .hg-tagline { font-size: 9px; text-transform:uppercase; letter-spacing:1.5px; font-weight:600; }
        @media (min-width: 1024px) { .hg-tagline { font-size: 10px; } }
        .hg-s1-headline { font-size: 14px; text-align:center; margin-top: 16px; line-height:1.4; }
        .hg-s1-headline strong { font-weight:600; }
        @media (min-width: 1024px) { .hg-s1-headline { font-size:22px; margin-top:32px; } }

        /* Scene 2 */
        .hg-s2-title { font-size: 14px; font-weight:700; margin-bottom: 10px; text-align:center; }
        @media (min-width: 1024px) { .hg-s2-title { font-size:18px; margin-bottom:14px; } }
        .hg-stats-grid { display:grid; grid-template-columns:repeat(2,1fr); gap: 6px; width:100%; max-width:460px; }
        @media (min-width: 1024px) { .hg-stats-grid { gap:10px; } }
        @media (max-width: 340px) { .hg-stats-grid { grid-template-columns:1fr; } }
        .hg-stat-card {
          border-radius:11px; padding: 8px 10px;
          will-change: transform, opacity;
        }
        @media (min-width: 1024px) { .hg-stat-card { padding:15px 17px; } }
        .hg-stat-num   { font-size: 18px; font-weight:800; line-height:1; }
        @media (min-width: 1024px) { .hg-stat-num { font-size:28px; } }
        .hg-stat-label { font-size: 8.5px; margin-top:4px; text-transform:uppercase; letter-spacing:1px; }
        @media (min-width: 1024px) { .hg-stat-label { font-size: 9.5px; letter-spacing: 1.1px; } }
        .hg-stat-sub   { font-size: 9px; margin-top:3px; }
        @media (min-width: 1024px) { .hg-stat-sub { font-size:11px; } }

        /* Scene 3 */
        .hg-s3-title { font-size: 14px; font-weight:700; text-align:center; }
        @media (min-width: 1024px) { .hg-s3-title { font-size:18px; } }
        .hg-s3-sub   { font-size: 9.5px; text-align:center; margin-top:-4px; margin-bottom: 6px; }
        @media (min-width: 1024px) { .hg-s3-sub { font-size:11px; margin-top:-8px; } }
        .hg-fleet-row { display:flex; gap: 6px; margin-top: 8px; justify-content:center; flex-wrap:wrap; }
        .hg-fleet-card {
          border-radius:11px; padding: 8px;
          text-align:center; width:calc(50% - 3px);
          display:flex; flex-direction:column; align-items:center;
          will-change: transform, opacity;
        }
        @media (min-width: 1024px) {
          .hg-fleet-row { flex-wrap:nowrap; gap:10px; margin-top:14px; }
          .hg-fleet-card { width:102px; padding:14px 12px; }
        }
        .hg-fleet-img { height: 22px; width: auto; object-fit: contain; margin-bottom: 2px; }
        @media (min-width: 1024px) { .hg-fleet-img { height: 36px; } }
        .hg-fleet-name  { font-size: 8.5px; margin-top: 5px; font-weight:500; line-height:1.2; }
        @media (min-width: 1024px) { .hg-fleet-name { font-size: 9.5px; margin-top: 7px; line-height: 1.3; } }
        .hg-fleet-badge {
          display:inline-block;
          font-size: 7px; font-weight:700;
          padding:2px 6px; border-radius:4px; margin-top: 4px;
          text-transform:uppercase; letter-spacing:.8px;
        }
        @media (min-width: 1024px) { .hg-fleet-badge { font-size: 7.5px; padding: 2px 7px; margin-top: 5px; } }

        /* Scene 4 */
        .hg-s4-title { font-size: 14px; font-weight:700; text-align:center; }
        @media (min-width: 1024px) { .hg-s4-title { font-size:18px; } }
        .hg-tech-list { display:flex; flex-direction:column; gap: 6px; width:100%; max-width:390px; margin-top: 10px; }
        @media (min-width: 1024px) { .hg-tech-list { gap:9px; margin-top:14px; } }
        .hg-tech-item {
          display:flex; align-items:center; gap: 8px;
          border-radius:9px; padding: 7px 10px;
        }
        @media (min-width: 1024px) { .hg-tech-item { gap:13px; padding:11px 15px; } }
        .hg-tech-dot {
          width: 6px; height: 6px; border-radius:50%;
          flex-shrink:0;
          animation:hgPulse 2s infinite;
        }
        @media (min-width: 1024px) { .hg-tech-dot { width: 8px; height: 8px; } }
        @keyframes hgPulse { 0%,100%{opacity:1;} 50%{opacity:0.5;} }
        .hg-tech-text { font-size: 9.5px; line-height: 1.3; }
        @media (min-width: 1024px) { .hg-tech-text { font-size:12px; } }
        .hg-tech-text strong { font-weight:600; }

        /* Scene 5 */
        .hg-s5-title { font-size: 14px; font-weight:700; text-align:center; }
        @media (min-width: 1024px) { .hg-s5-title { font-size:18px; } }
        .hg-eco-split { display:grid; grid-template-columns:1fr; gap: 8px; width:100%; max-width:460px; margin-top: 10px; }
        @media (min-width: 500px) { .hg-eco-split { grid-template-columns:1fr 1fr; gap:11px; margin-top:14px; } }
        .hg-eco-card {
          border-radius: 11px; padding: 10px 12px; text-align: center;
        }
        @media (min-width: 1024px) { .hg-eco-card { padding: 16px; } }
        .hg-eco-label { font-size: 11px; font-weight: 700; margin-top: 6px; }
        @media (min-width: 1024px) { .hg-eco-label { font-size: 13px; margin-top: 10px; } }
        .hg-eco-desc { font-size: 9.5px; margin-top: 4px; line-height: 1.3; }
        @media (min-width: 1024px) { .hg-eco-desc { font-size: 11px; margin-top: 6px; } }
        
        @media (max-width: 380px) {
          .hg-stats-grid { grid-template-columns: 1fr; }
          .hg-eco-split { grid-template-columns: 1fr; }
          .hg-fleet-row { flex-wrap: wrap; }
          .hg-fleet-card { width: 45%; }
        }

        /* Scene 6 / CTA */
        .hg-cta-logo-row { display:flex; align-items:center; justify-content:center; gap: 8px; margin-bottom: 10px; }
        @media (min-width: 1024px) { .hg-cta-logo-row { gap: 10px; margin-bottom: 12px; } }
        .hg-cta-logo-name { font-family: 'Montserrat', sans-serif; color: #539242; font-size: 18px; font-weight:800; }
        @media (min-width: 1024px) { .hg-cta-logo-name { font-size: 22px; } }
        .hg-cta-main { font-size: 20px; font-weight:800; text-align:center; line-height:1.18; }
        @media (min-width: 1024px) { .hg-cta-main { font-size: 26px; } }
        .hg-cta-sub  { font-size: 10.5px; margin-top: 8px; text-align:center; }
        @media (min-width: 1024px) { .hg-cta-sub { font-size: 11.5px; } }
        .hg-cta-btn  {
          margin-top: 14px;
          font-size: 11px; font-weight:700;
          padding: 10px 24px; border-radius:7px;
          border:none; cursor:pointer;
          text-transform:uppercase; letter-spacing:1px;
        }
        @media (min-width: 1024px) { .hg-cta-btn { margin-top: 18px; font-size: 12px; padding: 11px 30px; letter-spacing: 1.2px; } }
        .hg-cta-url { font-size: 8.5px; margin-top: 10px; letter-spacing: 1px; }
        @media (min-width: 1024px) { .hg-cta-url { font-size: 9.5px; margin-top: 11px; letter-spacing: 1.1px; } }

        /* Progress bar */
        .hg-progress-bar {
          position:absolute; bottom:0; left:0;
          height:2.5px;
          transition:width 0.1s linear; z-index:20;
        }

        /* UI overlay base (Controls + Dots) */
        .hg-ui-overlay {
          position: absolute; inset: 0; z-index: 20;
          pointer-events: none;
        }
        
        /* The container for elements that should fade in/out */
        .hg-controls-container {
          position: absolute; bottom: 0; left: 0; right: 0; height: 40px;
          opacity: 0; pointer-events: none;
          transform: translateY(4px);
          transition: all 0.3s ease;
          display: flex; justify-content: center; align-items: center;
        }
        
        /* Scene dots */
        .hg-dots {
          position:absolute; bottom:13px; left:50%;
          transform:translateX(-50%);
          display:flex; gap:6px; z-index:20;
        }
        .hg-dot {
          width:5px; height:5px; border-radius:50%;
          cursor:pointer; border:none; padding:0;
        }

        /* Controls */
        .hg-controls { position:absolute; bottom:9px; right:12px; display:flex; gap:6px; z-index:20; }
        .hg-ctrl-btn {
          font-size:10.5px; padding:4px 11px;
          border-radius:5px; cursor:pointer;
          font-family:'Inter',system-ui,sans-serif;
        }

        /* Hover pause badge */
        .hg-hover-hint {
          position:absolute; inset:0; z-index:10;
          display:flex; align-items:center; justify-content:center;
          pointer-events:none; opacity:0; transition:opacity 0.3s;
        }
        @media (hover: hover) {
          .hg-ad:hover .hg-hover-hint { opacity:1; }
        }
        .hg-pause-badge {
          font-size:10px; font-weight:600;
          padding:4px 10px; border-radius:20px;
          letter-spacing:1px; text-transform:uppercase;
        }

        /* Reveal on desktop hover */
        @media (hover: hover) {
          .hg-ad:hover .hg-controls-container { opacity: 1; transform: translateY(0); }
          .hg-ad:hover .hg-controls-container .hg-dots,
          .hg-ad:hover .hg-controls-container .hg-controls { pointer-events: auto; }
        }
        /* Reveal on mobile active state */
        .hg-ad.hg-mobile-active .hg-controls-container { opacity: 1; transform: translateY(0); }
        .hg-ad.hg-mobile-active .hg-controls-container .hg-dots,
        .hg-ad.hg-mobile-active .hg-controls-container .hg-controls { pointer-events: auto; }

      `}</style>

      {/* ─── main container ────────────────────────────────────────── */}
      <div
        id="hg-ad"
        ref={containerRef}
        className={`hg-ad group bg-slate-50 dark:bg-[#050816] text-slate-900 dark:text-white transition-colors duration-300 ${mobileActive ? "hg-mobile-active" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleTouch}
        role="region"
        aria-label="HeadGreen EV Corporate Cab Service advertisement"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {/* Grid background */}
        <div className="hg-grid-bg opacity-15 dark:opacity-5" />

        {/* Ambient orbs */}
        <div className="hg-orb opacity-15 dark:opacity-100" style={{ width:220, height:220, background:"rgba(0,232,122,0.07)", top:-70, right:-50 }} />
        <div className="hg-orb opacity-15 dark:opacity-100" style={{ width:180, height:180, background:"rgba(0,100,200,0.06)", bottom:-60, left:-40 }} />
        <div className="hg-orb opacity-15 dark:opacity-100" style={{ width:100, height:100, background:"rgba(0,232,122,0.05)", top:"40%", left:"10%" }} />

        {/* Particles (populated imperatively on first intersection) */}
        <div className="hg-particles opacity-15 dark:opacity-100" />

        {/* Hover pause badge */}
        <div className="hg-hover-hint">
          <span className="hg-pause-badge bg-white/80 dark:bg-black/60 text-[#00e87a] border border-[#00e87a]/30 backdrop-blur-md">⏸ Paused — reading</span>
        </div>

        {/* Scenes */}
        {scenes.map((sceneEl, i) => (
          <div key={i} className={`hg-scene${currentScene === i ? " hg-active" : ""}`}>
            {sceneEl}
          </div>
        ))}

        {/* UI Overlay */}
        <div className="hg-ui-overlay">
          {/* Progress bar (always visible at bottom edge) */}
          <div ref={progressBarRef} className="hg-progress-bar bg-[#00e87a] shadow-[0_0_8px_rgba(0,232,122,0.6)]" style={{ width: "0%" }} />

          {/* Fade-in Controls Container (Dots + Buttons) */}
          <div className="hg-controls-container">
            {/* Scene indicator dots */}
            <div className="hg-dots" role="tablist" aria-label="Scene navigation">
              {Array.from({ length: TOTAL_SCENES }).map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={currentScene === i}
                  aria-label={`Go to scene ${i + 1}`}
                  className={`hg-dot bg-slate-900/15 dark:bg-white/15 transition-all${currentScene === i ? " hg-dot-active !bg-[#00e87a] scale-125" : ""}`}
                  onClick={(e) => { e.stopPropagation(); goTo(i); }}
                  style={{ WebkitTapHighlightColor: "transparent" }}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="hg-controls">
              <button id="hg-prevBtn" className="hg-ctrl-btn bg-slate-200 dark:bg-black/50 text-slate-700 dark:text-white/80 hover:bg-emerald-500/20 hover:text-[#00e87a] backdrop-blur-sm border border-slate-300 dark:border-white/10 hover:border-emerald-500/40 transition-colors" onClick={goPrev} aria-label="Previous scene" style={{ WebkitTapHighlightColor: "transparent" }}>‹ Prev</button>
              <button id="hg-playBtn" className="hg-ctrl-btn bg-slate-200 dark:bg-black/50 text-slate-700 dark:text-white/80 hover:bg-emerald-500/20 hover:text-[#00e87a] backdrop-blur-sm border border-slate-300 dark:border-white/10 hover:border-emerald-500/40 transition-colors" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"} style={{ WebkitTapHighlightColor: "transparent" }}>
                {playing ? "⏸ Pause" : "▶ Play"}
              </button>
              <button id="hg-nextBtn" className="hg-ctrl-btn bg-slate-200 dark:bg-black/50 text-slate-700 dark:text-white/80 hover:bg-emerald-500/20 hover:text-[#00e87a] backdrop-blur-sm border border-slate-300 dark:border-white/10 hover:border-emerald-500/40 transition-colors" onClick={goNext} aria-label="Next scene" style={{ WebkitTapHighlightColor: "transparent" }}>Next ›</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
