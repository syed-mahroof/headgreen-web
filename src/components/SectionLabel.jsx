/**
 * SectionLabel — replaces the generic pill eyebrow across every section.
 *
 * Variants:
 *   "rule"    → ── 01 ──  LABEL  (default, for content sections)
 *   "slash"   → / LABEL           (for hero/page headers)
 *   "dot"     → ◆ LABEL           (for callout cards / sub-sections)
 */
export function SectionLabel({ children, variant = "rule", index, className = "" }) {
  if (variant === "slash") {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <span className="font-mono text-emerald-500 dark:text-emerald-400 text-xs select-none">/</span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-zinc-400">
          {children}
        </span>
      </div>
    );
  }

  if (variant === "dot") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-zinc-400">
          {children}
        </span>
      </div>
    );
  }

  // Default: "rule" variant
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {index !== undefined && (
        <span className="font-mono text-[10px] font-bold text-emerald-500 dark:text-emerald-400 tabular-nums">
          {String(index).padStart(2, "0")}
        </span>
      )}
      <span className="h-px flex-none w-6 bg-emerald-500/50 dark:bg-emerald-400/40" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-zinc-400">
        {children}
      </span>
    </div>
  );
}

/**
 * PageHero — full premium page header block for inner pages.
 * Replaces the bare eyebrow + h1 pattern used on About/Corporate/Partner/BookTrip.
 */
export function PageHero({ label, labelIndex, title, accent, subtitle, children }) {
  return (
    <section className="section pb-16 relative">
      {/* Faint grid underlayer */}
      <div className="absolute inset-0 grid-bg opacity-30 dark:opacity-100 pointer-events-none" />

      <div className="relative">
        <SectionLabel index={labelIndex} className="mb-6">{label}</SectionLabel>

        <h1 className="font-display text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl leading-[1.05] text-slate-900 dark:text-white">
          {title}
          {accent && (
            <>
              {" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
                {accent}
              </span>
            </>
          )}
        </h1>

        {subtitle && (
          <p className="mt-6 max-w-2xl text-lg text-slate-500 dark:text-zinc-400 leading-relaxed">
            {subtitle}
          </p>
        )}

        {children}

        {/* Decorative border line at bottom */}
        <div className="mt-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/30 to-transparent" />
          <span className="font-mono text-[10px] text-slate-300 dark:text-zinc-700 tracking-widest">HG</span>
          <div className="h-px w-8 bg-slate-200 dark:bg-white/10" />
        </div>
      </div>
    </section>
  );
}
