/**
 * formSubmit.jsx
 * ─────────────────────────────────────────────────────────────────
 * Shared utilities for every form on the HeadGreen platform.
 *
 * Exports:
 *   WEB3FORMS_KEY    — live access key
 *   WHATSAPP_NUMBER  — company WA number
 *   buildWhatsAppMessage(title, fields) — clean, emoji-formatted string
 *   submitToWeb3Forms(payload)          — async fetch wrapper
 *   MethodToggle                        — segmented tab component (React)
 *   ChannelHint                         — contextual helper text (React)
 *   SuccessCard                         — animated success overlay (React)
 *   ErrorBanner                         — animated error bar (React)
 *   SubmitButton                        — smart submit CTA (React)
 * ─────────────────────────────────────────────────────────────────
 */

import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";

// ─── Global config ────────────────────────────────────────────────
export const WEB3FORMS_KEY   = import.meta.env.VITE_WEB3FORMS_KEY || "";
export const WEB3FORMS_URL   = "https://api.web3forms.com/submit";
export const WHATSAPP_NUMBER = "918589844333";

// ─── WhatsApp message builder ─────────────────────────────────────
// Produces a clean, emoji-labelled block — no encoding artifacts.
// All special chars are safely handled by encodeURIComponent at call site.
export function buildWhatsAppMessage(title, fields) {
  const divider = "--------------------------------";
  const lines = [
    `*HEADGREEN! — ${title.toUpperCase()}*`,
    divider,
    "",
  ];

  Object.entries(fields).forEach(([key, val]) => {
    if (val !== undefined && val !== null && String(val).trim()) {
      // Sanitize input by stripping potential HTML tags
      const sanitizedVal = String(val).replace(/[<>]/g, "").trim();
      lines.push(`• *${key}:* ${sanitizedVal}`);
    }
  });

  lines.push("", divider, "_Sent via HeadGreen website_");
  return lines.join("\n");
}

// ─── Open WhatsApp deep link ──────────────────────────────────────
export function openWhatsApp(message) {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

// ─── Web3Forms async fetch ────────────────────────────────────────
// Returns { ok: boolean, message: string }
export async function submitToWeb3Forms(subject, fromName, fields) {
  const payload = {
    access_key: WEB3FORMS_KEY,
    subject,
    from_name:  fromName,
    ...fields,
  };

  const res  = await fetch(WEB3FORMS_URL, {
    method:  "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body:    JSON.stringify(payload),
  });
  const data = await res.json();

  if (res.ok && data.success) return { ok: true, message: "Success" };
  throw new Error(data.message || "Submission failed — please try WhatsApp.");
}

// ═══════════════════════════════════════════════════════════════════
// ─── Shared React UI Components ───────────────────────────────────
// ═══════════════════════════════════════════════════════════════════

// ─── Segmented method toggle ──────────────────────────────────────
export function MethodToggle({ value, onChange }) {
  const options = [
    { id: "email",    Icon: Mail,           label: "Enterprise Email" },
    { id: "whatsapp", Icon: MessageCircle,  label: "WhatsApp"         },
  ];

  return (
    <div
      role="group"
      aria-label="Submission channel"
      className="flex gap-1.5 p-1 rounded-2xl
        bg-slate-100 dark:bg-white/[0.04]
        border border-slate-200 dark:border-white/[0.06]"
    >
      {options.map(({ id, Icon, label }) => {
        const active = value === id;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(id)}
            className={`
              relative flex-1 flex items-center justify-center gap-2
              rounded-xl px-4 py-2.5 text-[13px] font-semibold
              transition-all duration-250
              focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
              ${active
                ? id === "whatsapp"
                  ? "bg-[#25D366] text-white shadow-[0_4px_16px_rgba(37,211,102,0.30)]"
                  : "bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-[0_4px_16px_rgba(16,185,129,0.28)]"
                : "text-slate-500 dark:text-zinc-500 hover:text-slate-800 dark:hover:text-zinc-200"
              }
            `}
          >
            <Icon size={14} className="flex-shrink-0" />
            {label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Contextual hint text ─────────────────────────────────────────
export function ChannelHint({ method }) {
  return (
    <p className="text-[11px] text-slate-400 dark:text-zinc-600 pl-1 leading-relaxed">
      {method === "email"
        ? "✉️ A detailed summary will be emailed to our ops team at team@headgreen.in — typical response within 4h."
        : "💬 Opens WhatsApp in a new tab with your details pre-filled — we respond in minutes during business hours."
      }
    </p>
  );
}

// ─── Animated success card ────────────────────────────────────────
export function SuccessCard({ title = "Request Received! 🎉", body, onReset }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mt-10 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.06] p-8 text-center"
    >
      <div className="flex justify-center mb-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30">
          <CheckCircle2 size={32} className="text-emerald-500" />
        </div>
      </div>
      <h3 className="font-syne text-xl font-bold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400 max-w-sm mx-auto">
        {body || (
          <>
            Thank you! Our operations desk has logged your request and will reach out to{" "}
            <strong className="text-emerald-600 dark:text-emerald-400">team@headgreen.in</strong>{" "}
            within 4 business hours.
          </>
        )}
      </p>
      <button
        onClick={onReset}
        className="mt-6 text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
      >
        Submit another ↑
      </button>
    </motion.div>
  );
}

// ─── Error banner ─────────────────────────────────────────────────
export function ErrorBanner({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex items-start gap-3 rounded-xl border border-red-500/25 bg-red-500/[0.06] px-4 py-3 text-sm text-red-500"
        >
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          <span>
            <strong>Submission failed:</strong>{" "}
            {message || "Please try again or switch to WhatsApp."}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Smart submit button ──────────────────────────────────────────
export function SubmitButton({ method, isSubmitting, isDisabled, labelEmail, labelWhatsApp }) {
  const isWA = method === "whatsapp";

  return (
    <button
      type="submit"
      disabled={isSubmitting || isDisabled}
      className={`
        relative w-full flex items-center justify-center gap-2.5
        rounded-2xl px-6 py-4
        font-semibold uppercase tracking-widest text-xs
        transition-all duration-300 overflow-hidden btn-shine
        focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
        disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0
        ${isWA
          ? "bg-[#25D366] text-white hover:shadow-[0_8px_24px_rgba(37,211,102,0.4)] hover:-translate-y-0.5"
          : "bg-gradient-to-r from-emerald-500 to-teal-500 text-black hover:shadow-[0_8px_24px_rgba(16,185,129,0.4)] hover:-translate-y-0.5"
        }
      `}
    >
      {isSubmitting ? (
        <>
          <Loader2 size={14} className="animate-spin" />
          Processing secure transit data…
        </>
      ) : isWA ? (
        <>
          <MessageCircle size={14} />
          {labelWhatsApp || "Connect via WhatsApp"}
        </>
      ) : (
        <>
          <Send size={14} />
          {labelEmail || "Send via Enterprise Email"}
        </>
      )}
    </button>
  );
}
