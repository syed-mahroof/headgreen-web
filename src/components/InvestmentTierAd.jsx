import { useEffect, useRef, useState, useCallback } from "react";

const SCENE_DURATION = 4000;

export default function InvestmentTierAd({ 
  title, 
  badge, 
  icon: Icon, 
  scenes, 
  color = "#00e87a", 
  isHero = false,
  tierNumber
}) {
  const [currentScene, setCurrentScene] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [mobileActive, setMobileActive] = useState(false);

  const progressBarRef = useRef(null);
  const isHovering = useRef(false);
  const rafId = useRef(null);
  const startTimeRef = useRef(null);
  const pausedAtRef = useRef(0);
  const currentRef = useRef(0);
  const playingRef = useRef(false);
  const containerRef = useRef(null);
  const activeTimer = useRef(null);

  const TOTAL_SCENES = scenes.length;

  useEffect(() => { currentRef.current = currentScene; }, [currentScene]);

  const animate = useCallback((ts) => {
    if (!playingRef.current) return;
    if (!startTimeRef.current) startTimeRef.current = ts;
    const elapsed = ts - startTimeRef.current + pausedAtRef.current;
    const pct = Math.min((elapsed / SCENE_DURATION) * 100, 100);
    
    if (progressBarRef.current) progressBarRef.current.style.width = pct + "%";
    
    if (pct >= 100) {
      pausedAtRef.current = 0;
      startTimeRef.current = null;
      const next = (currentRef.current + 1) % TOTAL_SCENES;
      setCurrentScene(next);
      rafId.current = requestAnimationFrame(animate);
      return;
    }
    rafId.current = requestAnimationFrame(animate);
  }, [TOTAL_SCENES]);

  const startPlay = useCallback(() => {
    playingRef.current = true;
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

  useEffect(() => () => cancelAnimationFrame(rafId.current), []);

  const handleMouseEnter = () => { isHovering.current = true; if (playingRef.current) pause(); };
  const handleMouseLeave = () => { isHovering.current = false; if (!playingRef.current) startPlay(); };

  const handleTouch = () => {
    setMobileActive(true);
    if (activeTimer.current) clearTimeout(activeTimer.current);
    activeTimer.current = setTimeout(() => {
      setMobileActive(false);
    }, 4000);
  };

  const goTo = (idx) => {
    pausedAtRef.current = 0;
    startTimeRef.current = null;
    setCurrentScene(idx);
    if (progressBarRef.current) progressBarRef.current.style.width = "0%";
    if (playing) { cancelAnimationFrame(rafId.current); rafId.current = requestAnimationFrame(animate); }
  };
  const goPrev = (e) => { e.stopPropagation(); goTo((currentScene - 1 + TOTAL_SCENES) % TOTAL_SCENES); };
  const goNext = (e) => { e.stopPropagation(); goTo((currentScene + 1) % TOTAL_SCENES); };
  const togglePlay = (e) => { e.stopPropagation(); playing ? pause() : startPlay(); };

  // Base styling dynamically applied
  const baseCardClasses = isHero 
    ? "ita-hero-card bg-gradient-to-b from-white/[0.05] to-transparent border border-[#00e87a]/30 shadow-[0_0_30px_-5px_rgba(0,232,122,0.25)]"
    : "bg-white/[0.02] border border-white/[0.08] shadow-sm";

  return (
    <>
      <style>{`
        .ita-ad {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          height: 380px;
          width: 100%;
          transition: all 0.5s ease;
          transform: translateZ(0);
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.3);
        }
        @media (min-width: 768px) {
          .ita-ad { height: 420px; }
        }
        .ita-ad:hover {
          transform: translateY(-8px);
        }

        .ita-scene {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.65s cubic-bezier(.4,0,.2,1);
          padding: 24px; pointer-events: none;
        }
        .ita-scene.ita-active { opacity: 1; pointer-events: auto; }

        .ita-progress-bar {
          position: absolute; top: 0; left: 0;
          height: 3px; transition: width 0.1s linear; z-index: 20;
        }

        .ita-controls-container {
          position: absolute; bottom: 0; left: 0; right: 0; height: 50px;
          opacity: 0; pointer-events: none; transform: translateY(4px);
          transition: all 0.3s ease;
          display: flex; justify-content: center; align-items: center;
          background: linear-gradient(to top, rgba(5,8,22,0.95), transparent);
        }
        .ita-dots {
          position: absolute; bottom: 18px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 6px; z-index: 20;
        }
        .ita-dot {
          width: 5px; height: 5px; border-radius: 50%;
          cursor: pointer; border: none; padding: 0; background: rgba(255,255,255,0.2);
          transition: all 0.3s;
        }
        .ita-dot.ita-dot-active {
          transform: scale(1.3);
        }
        .ita-controls { position: absolute; bottom: 14px; right: 16px; display: flex; gap: 6px; z-index: 20; }
        .ita-ctrl-btn {
          font-size: 10px; padding: 4px 10px; border-radius: 6px; cursor: pointer;
          background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.8);
          border: 1px solid rgba(255,255,255,0.1);
        }
        
        .ita-hover-hint {
          position: absolute; top: 12px; right: 12px; z-index: 10;
          pointer-events: none; opacity: 0; transition: opacity 0.3s;
        }
        @media (hover: hover) {
          .ita-ad:hover .ita-hover-hint { opacity: 1; }
          .ita-ad:hover .ita-controls-container { opacity: 1; transform: translateY(0); }
          .ita-ad:hover .ita-controls-container .ita-dots,
          .ita-ad:hover .ita-controls-container .ita-controls { pointer-events: auto; }
        }
        .ita-ad.ita-mobile-active .ita-controls-container { opacity: 1; transform: translateY(0); }
        .ita-ad.ita-mobile-active .ita-controls-container .ita-dots,
        .ita-ad.ita-mobile-active .ita-controls-container .ita-controls { pointer-events: auto; }

        .ita-hero-card::before {
          content: ""; position: absolute; inset: -1px; border-radius: inherit; padding: 1px;
          background: linear-gradient(90deg, #00e87a, transparent, #00e87a, transparent);
          background-size: 200% 100%;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          animation: itaBorderFlow 3s linear infinite; opacity: 0.8; z-index: -1;
        }
        @keyframes itaBorderFlow {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }

        /* Animations */
        @keyframes itaFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        ref={containerRef}
        className={`ita-ad group backdrop-blur-md ${baseCardClasses} ${mobileActive ? "ita-mobile-active" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleTouch}
      >
        {isHero && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00e87a]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}

        <div className="ita-hover-hint">
          <span className="text-[9px] font-bold px-2 py-1 rounded-full bg-black/50 text-white/80 border border-white/10 backdrop-blur-md uppercase tracking-wider">
            ⏸ Paused
          </span>
        </div>

        {/* Global header that stays through scenes */}
        <div className="absolute top-6 left-6 z-10 opacity-40 pointer-events-none flex items-center gap-2">
           <Icon size={16} color={color} />
           <span className="text-[10px] font-syne font-bold uppercase tracking-widest text-white/60">
             {tierNumber ? `0${tierNumber} • ` : ""}{title}
           </span>
        </div>

        {/* Massive faint watermark number */}
        {tierNumber && (
          <div className="absolute -bottom-4 -right-2 z-0 opacity-[0.03] pointer-events-none font-display font-bold text-[180px] leading-none text-white select-none tracking-tighter">
            0{tierNumber}
          </div>
        )}

        {scenes.map((scene, i) => (
          <div key={i} className={`ita-scene${currentScene === i ? " ita-active" : ""}`}>
            {scene}
          </div>
        ))}

        <div className="absolute inset-0 z-20 pointer-events-none">
          <div ref={progressBarRef} className="ita-progress-bar" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}`, width: "0%" }} />

          <div className="ita-controls-container">
            <div className="ita-dots">
              {Array.from({ length: TOTAL_SCENES }).map((_, i) => (
                <button
                  key={i}
                  className={`ita-dot${currentScene === i ? " ita-dot-active" : ""}`}
                  style={{ backgroundColor: currentScene === i ? color : undefined }}
                  onClick={(e) => { e.stopPropagation(); goTo(i); }}
                />
              ))}
            </div>

            <div className="ita-controls">
              <button className="ita-ctrl-btn hover:bg-white/20" onClick={goPrev}>‹</button>
              <button className="ita-ctrl-btn hover:bg-white/20" onClick={togglePlay}>{playing ? "⏸" : "▶"}</button>
              <button className="ita-ctrl-btn hover:bg-white/20" onClick={goNext}>›</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
