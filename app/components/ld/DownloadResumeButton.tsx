"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Download, ArrowRight, Check, X } from "lucide-react";

const RESUME_URL =
  "https://kshmtzeqwovezlkkficd.supabase.co/storage/v1/object/public/resume/resume-ld-v5.pdf";

const EASE = [0.16, 1, 0.3, 1] as const;

type Stage = "idle" | "email" | "phone" | "done";

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}

function isValidPhone(v: string) {
  const d = v.trim().replace(/[\s\-.()]/g, "");
  return /^\+\d{7,15}$/.test(d);
}

/* ── Shake wrapper ─────────────────────────────────────────────────────── */
function Shake({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      animate={active ? { x: [0, -7, 7, -5, 5, -2, 2, 0] } : { x: 0 }}
      transition={{ duration: 0.38, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ── Main component ────────────────────────────────────────────────────── */
export function DownloadResumeButton() {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<Stage>("idle");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  /* Auto-focus when stage changes to input states */
  useEffect(() => {
    if (stage === "email") setTimeout(() => emailRef.current?.focus(), 120);
    if (stage === "phone") setTimeout(() => phoneRef.current?.focus(), 120);
  }, [stage]);

  /* Reset to idle after success */
  useEffect(() => {
    if (stage !== "done") return;
    const t = setTimeout(() => {
      setStage("idle");
      setEmail("");
      setPhone("");
    }, 2200);
    return () => clearTimeout(t);
  }, [stage]);

  const shakeEmail = () => {
    setEmailErr(true);
    setTimeout(() => setEmailErr(false), 500);
  };

  const shakePhone = () => {
    setPhoneErr(true);
    setTimeout(() => setPhoneErr(false), 500);
  };

  const submitEmail = () => {
    if (!isValidEmail(email)) { shakeEmail(); return; }
    setStage("phone");
  };

  const submitPhone = () => {
    if (!isValidPhone(phone)) { shakePhone(); return; }
    /* Trigger download */
    const a = document.createElement("a");
    a.href = RESUME_URL;
    a.setAttribute("download", "Jitin_Nair_Resume_LD.pdf");
    a.setAttribute("target", "_blank");
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setStage("done");
  };

  const onEmailKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") submitEmail();
    if (e.key === "Escape") setStage("idle");
  };

  const onPhoneKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") submitPhone();
    if (e.key === "Escape") setStage("idle");
  };

  /* ── Shared container styles ─────────────────────────────────────────── */
  const isInput = stage === "email" || stage === "phone";

  return (
    <motion.div
      layout
      transition={reduced ? { duration: 0 } : { duration: 0.42, ease: EASE }}
      className={`relative inline-flex items-center overflow-hidden rounded-full
        ${isInput || stage === "done"
          ? "border border-emerald-400/40 bg-white/[0.06] backdrop-blur-md"
          : "bg-emerald-400"
        }`}
      style={{ minHeight: "44px" }}
    >
      <AnimatePresence mode="wait" initial={false}>

        {/* ── IDLE: Download button ──────────────────────────────────────── */}
        {stage === "idle" && (
          <motion.button
            key="idle"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setStage("email")}
            className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#062a1d] whitespace-nowrap"
          >
            Download Resume
            <Download
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
              strokeWidth={2}
            />
          </motion.button>
        )}

        {/* ── EMAIL input ────────────────────────────────────────────────── */}
        {stage === "email" && (
          <motion.div
            key="email"
            initial={reduced ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="flex items-center gap-2 px-4 py-2.5"
            style={{ width: "300px" }}
          >
            <Shake active={emailErr}>
              <div className="flex items-center gap-2 w-full">
                <span
                  className={`shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                    emailErr ? "text-red-400" : "text-emerald-400"
                  }`}
                >
                  Email
                </span>
                <input
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={onEmailKey}
                  placeholder="you@example.com"
                  className={`flex-1 bg-transparent text-sm font-medium text-white placeholder:text-white/25 outline-none border-b pb-px transition-colors ${
                    emailErr ? "border-red-400/70" : "border-white/20 focus:border-emerald-400/60"
                  }`}
                  autoComplete="email"
                />
                <button
                  onClick={submitEmail}
                  className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400 text-[#062a1d] transition-transform hover:scale-105 active:scale-95"
                >
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </button>
                <button
                  onClick={() => setStage("idle")}
                  className="shrink-0 text-white/30 transition-colors hover:text-white/60"
                  aria-label="Cancel"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              </div>
            </Shake>
          </motion.div>
        )}

        {/* ── PHONE input ────────────────────────────────────────────────── */}
        {stage === "phone" && (
          <motion.div
            key="phone"
            initial={reduced ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="flex items-center gap-2 px-4 py-2.5"
            style={{ width: "300px" }}
          >
            <Shake active={phoneErr}>
              <div className="flex items-center gap-2 w-full">
                <span
                  className={`shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                    phoneErr ? "text-red-400" : "text-emerald-400"
                  }`}
                >
                  Phone
                </span>
                <input
                  ref={phoneRef}
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyDown={onPhoneKey}
                  placeholder="+91 90088 98642"
                  className={`flex-1 bg-transparent text-sm font-medium text-white placeholder:text-white/25 outline-none border-b pb-px transition-colors ${
                    phoneErr ? "border-red-400/70" : "border-white/20 focus:border-emerald-400/60"
                  }`}
                  autoComplete="tel"
                />
                <button
                  onClick={submitPhone}
                  className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400 text-[#062a1d] transition-transform hover:scale-105 active:scale-95"
                >
                  <Download className="h-3.5 w-3.5" strokeWidth={2.5} />
                </button>
                <button
                  onClick={() => setStage("idle")}
                  className="shrink-0 text-white/30 transition-colors hover:text-white/60"
                  aria-label="Cancel"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              </div>
            </Shake>
          </motion.div>
        )}

        {/* ── DONE: success flash ────────────────────────────────────────── */}
        {stage === "done" && (
          <motion.div
            key="done"
            initial={reduced ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-emerald-400 whitespace-nowrap"
          >
            <Check className="h-4 w-4" strokeWidth={2.5} />
            Downloading…
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  );
}
