import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useScrolled from "../hooks/useScrolled.js";
import { NAV_LINKS } from "../data/site.js";
import logo from "../assets/logo.png";

export default function Navbar() {
  const scrolled = useScrolled(30);
  const [open, setOpen] = useState(false);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "bg-white/60 dark:bg-[#050816]/60 border-b border-slate-200/40 dark:border-white/[0.04] backdrop-blur-md"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 z-50" onClick={() => setOpen(false)}>
            <img src={logo} alt="HeadGreen! Premium EV Cab Service Logo" className="h-9 w-auto" />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight font-montserrat text-[#539242] leading-none">
                HeadGreen!<sup className="align-super text-[0.45em] font-medium opacity-70 tracking-normal">&trade;</sup>
              </span>
              <span className="font-syne mt-1 text-[7.5px] font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-zinc-400">
                DRIVE <span className="text-[#539242]">GREEN</span>, LIVE <span className="text-[#539242]">CLEAN</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-2 lg:flex">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `relative px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-emerald-600 dark:text-primary"
                      : "text-slate-600 hover:text-emerald-600 dark:text-zinc-300 dark:hover:text-emerald-400"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 h-[3px] w-5 -translate-x-1/2 rounded-full bg-emerald-600 dark:bg-primary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block z-50">
            <Link
              to="/corporate"
              className="btn-primary btn-shine overflow-hidden flex items-center gap-1.5 hover:-translate-y-0.5 transition-transform shadow-[0_4px_20px_-4px_rgba(0,186,124,0.4)] dark:shadow-[0_4px_20px_-4px_rgba(0,232,122,0.4)]"
            >
              <Zap size={16} /> Request Demo
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/60 bg-white/50 text-slate-700 backdrop-blur-md transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-[#090d1a]/50 dark:text-white/90 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 top-[72px] z-40 flex flex-col bg-slate-50/95 backdrop-blur-2xl dark:bg-[#050816]/95 lg:hidden"
          >
            <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 py-8">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block text-3xl font-bold tracking-tight transition-colors ${
                        isActive
                          ? "text-emerald-600 dark:text-primary"
                          : "text-slate-800 dark:text-white/90"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="border-t border-slate-200/60 pb-12 pt-6 px-6 dark:border-white/10"
            >
              <Link
                to="/corporate"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-4 text-lg font-bold text-white shadow-[0_8px_30px_-6px_rgba(0,186,124,0.5)] transition-transform hover:-translate-y-1 dark:bg-primary dark:text-[#050816] dark:shadow-[0_8px_30px_-6px_rgba(0,232,122,0.4)]"
              >
                <Zap size={20} /> Request Free Fleet Demo
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

