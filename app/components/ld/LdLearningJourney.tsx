"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import {
  Search,
  PenTool,
  Layers,
  Rocket,
  BarChart3,
  Award,
  GraduationCap,
  Check,
  ArrowDown,
} from "lucide-react";
import { EASE, useMounted } from "./primitives";
import { DownloadResumeButton } from "./DownloadResumeButton";
import { ldImpact } from "../../data/ldPortfolio";

/* The L&D counterpart to the AI portfolio's terminal: a self-playing
   "learning journey" console. Same window chrome family, but instead of
   typed shell commands it runs a corporate learning program end to end:
   ADDIE milestone rail, LMS-style module progress, impact metrics
   counting up, and a completion badge. */

const TITLE = "Turning learning into measurable business performance";

const PHASES = [
  { key: "Analyze", desc: "Stakeholder discovery & needs analysis", icon: Search },
  { key: "Design", desc: "Learning architecture & storyboards", icon: PenTool },
  { key: "Develop", desc: "Content, media & assessments", icon: Layers },
  { key: "Implement", desc: "LMS rollout & facilitation", icon: Rocket },
  { key: "Evaluate", desc: "Kirkpatrick L1-L4 measurement", icon: BarChart3 },
];

/* Steps: 0 idle/typing · 1..5 phase (step-1) running · 6 metrics · 7 done */
const STEP_DURATIONS = [0, 1050, 1050, 1050, 1050, 1050, 1400];

function useTypewriter(text: string, run: boolean, speed = 28) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (count >= text.length) return;
    const t = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(t);
  }, [run, count, text.length, speed]);
  return { typed: text.slice(0, count), done: count >= text.length };
}

function CountUpStat({
  to,
  prefix = "",
  suffix = "",
  label,
  run,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  label: string;
  run: boolean;
}) {
  const reduced = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (reduced) {
      setVal(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1100;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setVal(to * easeOutCubic(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, reduced, to]);

  return (
    <div className="min-w-0">
      <div className="font-serif text-lg font-medium tracking-tight text-white md:text-xl">
        {prefix}
        {Math.round(val).toLocaleString()}
        {suffix}
      </div>
      <div className="mt-0.5 truncate text-[10px] leading-tight text-neutral-500">{label}</div>
    </div>
  );
}

export function LdLearningJourney({ className = "" }: { className?: string }) {
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();
  const reduced = mounted ? reducedMotion : false;

  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, margin: "-40px" });
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [resumeExpanded, setResumeExpanded] = useState(false);

  useEffect(() => {
    if (!mounted || !inView) return;
    const t = setTimeout(() => setStarted(true), 350);
    return () => clearTimeout(t);
  }, [mounted, inView]);

  const { typed, done: titleDone } = useTypewriter(TITLE, started && !reduced);

  // Advance the program one step at a time once the title has typed in.
  useEffect(() => {
    if (!started) return;
    if (reduced) {
      setStep(7);
      return;
    }
    if (step === 0) {
      if (!titleDone) return;
      const t = setTimeout(() => setStep(1), 350);
      return () => clearTimeout(t);
    }
    if (step >= 7) return;
    const t = setTimeout(() => setStep((s) => s + 1), STEP_DURATIONS[step]);
    return () => clearTimeout(t);
  }, [started, step, titleDone, reduced]);

  const runningPhase = step >= 1 && step <= 5 ? step - 1 : -1;
  const completedPhases = step >= 6 ? 5 : Math.max(0, step - 1);
  const showMetrics = step >= 6;
  const showBadge = step >= 7;
  const railProgress = step >= 6 ? 1 : Math.max(0, step - 1) / (PHASES.length - 1);

  const titleText = reduced ? TITLE : typed;

  return (
    <motion.div
      ref={rootRef}
      initial={reduced ? false : { opacity: 0, scale: 0.95, y: 20 }}
      animate={reduced || started ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.4, ease: EASE }}
      className={`flex h-full w-full flex-col overflow-hidden rounded-xl border border-neutral-800 bg-[#0a0a0f] shadow-2xl shadow-emerald-500/5 ${className}`}
    >
      {/* Window chrome: same family as the AI terminal's title bar */}
      <div className="flex items-center justify-between border-b border-neutral-800/50 bg-[#111116] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-emerald-500/70 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
          <div className="h-3 w-3 rounded-full bg-neutral-600/60" />
          <div className="h-3 w-3 rounded-full bg-teal-500/70 shadow-[0_0_8px_rgba(45,212,191,0.4)]" />
        </div>
        <div className="flex items-center gap-2">
          <GraduationCap className="h-3.5 w-3.5 text-emerald-400/80" strokeWidth={2} />
          <span className="text-xs text-neutral-500">
            jitin <span className="text-neutral-700">/</span>{" "}
            <span className="font-medium text-neutral-300">learning-journey</span>
          </span>
        </div>
        <div className="w-16" />
      </div>

      {/* Program content */}
      <div className="flex flex-1 flex-col bg-gradient-to-b from-[#0a0a0f] via-[#0c0c12] to-[#08080a] p-4 md:p-6">
        {/* Typed program title */}
        <div className="min-h-[3.4rem] md:min-h-[4.6rem]">
          <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-emerald-400/80">
            Program
          </div>
          <h2 className="mt-1.5 font-serif text-lg font-medium leading-snug tracking-tight text-white md:text-[1.45rem]">
            {titleText}
            {!reduced && !titleDone && started && (
              <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-pulse bg-emerald-400" />
            )}
          </h2>
        </div>

        {/* ADDIE milestone rail */}
        <div className="mt-4 md:mt-6">
          <div className="relative flex items-center justify-between">
            {/* Track + animated fill */}
            <div className="absolute inset-x-3 top-1/2 h-px -translate-y-1/2 bg-neutral-800" />
            <motion.div
              className="absolute inset-x-3 top-1/2 h-px -translate-y-1/2 origin-left bg-emerald-400/70"
              initial={false}
              animate={{ scaleX: railProgress }}
              transition={{ duration: 0.6, ease: EASE }}
            />
            {PHASES.map((phase, i) => {
              const isDone = i < completedPhases;
              const isRunning = i === runningPhase;
              return (
                <div key={phase.key} className="relative flex flex-col items-center">
                  <motion.div
                    animate={
                      isRunning && !reduced
                        ? { scale: [1, 1.18, 1] }
                        : { scale: 1 }
                    }
                    transition={
                      isRunning && !reduced
                        ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 0.25, ease: EASE }
                    }
                    className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors duration-300 ${
                      isDone
                        ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-400"
                        : isRunning
                          ? "border-emerald-400/70 bg-emerald-400/10 text-emerald-300"
                          : "border-neutral-700 bg-[#0d0d13] text-neutral-600"
                    }`}
                  >
                    {isDone ? (
                      <Check className="h-3 w-3" strokeWidth={3} />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    )}
                  </motion.div>
                  <span
                    className={`mt-1.5 hidden text-[9px] font-medium uppercase tracking-wider transition-colors duration-300 sm:block ${
                      isDone || isRunning ? "text-neutral-300" : "text-neutral-600"
                    }`}
                  >
                    {phase.key}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active module panel (LMS-style row with filling progress bar) */}
        <div className="mt-4 flex-1 md:mt-5">
          <AnimatePresence mode="wait">
            {runningPhase >= 0 && !reduced ? (
              <motion.div
                key={PHASES[runningPhase].key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="rounded-lg border border-neutral-800/80 bg-white/[0.02] p-3.5"
              >
                {(() => {
                  const Icon = PHASES[runningPhase].icon;
                  return (
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-emerald-400/10 text-emerald-400">
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[13px] font-semibold text-white">
                          {PHASES[runningPhase].key}
                        </div>
                        <div className="truncate text-[11px] text-neutral-500">
                          {PHASES[runningPhase].desc}
                        </div>
                      </div>
                    </div>
                  );
                })()}
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-neutral-800">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.85, ease: EASE }}
                    className="h-full origin-left rounded-full bg-emerald-400"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="complete"
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={step >= 6 || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-lg border border-emerald-400/15 bg-emerald-400/[0.04] p-3.5 md:grid-cols-4"
              >
                {ldImpact.map((stat) => (
                  <CountUpStat
                    key={stat.label}
                    to={stat.to}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    label={stat.label}
                    run={showMetrics || !!reduced}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Completion badge */}
        <div className="mt-3 flex min-h-[1.75rem] items-center gap-2">
          <AnimatePresence>
            {showBadge && (
              <motion.div
                initial={reduced ? false : { opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1"
              >
                <Award className="h-3.5 w-3.5 text-emerald-400" strokeWidth={2} />
                <span className="text-[11px] font-medium text-emerald-300">
                  Program complete · Impact measured at Level 4
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA footer: available immediately, like the terminal's interactive end state */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={reduced || started ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: reduced ? 0 : 0.6, ease: EASE }}
          className="mt-3 flex items-center gap-2.5 border-t border-neutral-800/60 pt-3.5"
        >
          <AnimatePresence>
            {!resumeExpanded && (
              <motion.a
                key="learn-more"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                href="#impact"
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-emerald-400 px-4 py-3 text-xs font-semibold text-[#062a1d] transition-transform duration-150 hover:bg-emerald-300 active:scale-[0.97]"
              >
                Learn More
                <ArrowDown className="h-3.5 w-3.5" strokeWidth={2} />
              </motion.a>
            )}
          </AnimatePresence>
          <div className={`transition-all duration-300 ${resumeExpanded ? "w-full" : "flex-1"}`}>
            <DownloadResumeButton mobile onExpandChange={setResumeExpanded} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
