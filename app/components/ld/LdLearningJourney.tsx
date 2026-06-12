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

/* ---------- Phase glyphs: one visual grammar, five drawings.
   Shared rules: viewBox 240x56, 1.5px hairline strokes, round caps,
   guides at white/10, emerald accent, GPU-friendly animation only
   (pathLength via stroke-dashoffset, opacity, transform). Each glyph
   animates the meaning of its phase, not decoration. ---------- */

/* Analyze: signals being measured against a baseline */
function GlyphAnalyze() {
  const bars = [
    { x: 32, h: 20 },
    { x: 76, h: 13 },
    { x: 120, h: 30 },
    { x: 164, h: 17 },
    { x: 208, h: 38 },
  ];
  return (
    <svg viewBox="0 0 240 56" className="h-14 w-full" aria-hidden fill="none">
      <line x1="10" y1="50" x2="230" y2="50" className="stroke-white/10" strokeWidth="1" />
      {bars.map((b, i) => (
        <motion.line
          key={b.x}
          x1={b.x}
          y1={50}
          x2={b.x}
          y2={50 - b.h}
          className="stroke-emerald-400"
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.15 + i * 0.07, ease: EASE }}
        />
      ))}
      <motion.line
        x1="10"
        y1="20"
        x2="230"
        y2="20"
        className="stroke-emerald-400/50"
        strokeWidth="1"
        strokeDasharray="4 5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.62, ease: EASE }}
      />
    </svg>
  );
}

/* Design: the storyboard frame sketches itself, then content lines */
function GlyphDesign() {
  const lines = [
    { x2: 222, y: 14, accent: true },
    { x2: 198, y: 28, accent: false },
    { x2: 176, y: 42, accent: false },
  ];
  return (
    <svg viewBox="0 0 240 56" className="h-14 w-full" aria-hidden fill="none">
      <motion.rect
        x="8"
        y="6"
        width="98"
        height="44"
        rx="7"
        className="stroke-emerald-400"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
      />
      <motion.path
        d="M16 42 L38 26 L54 36 L74 22 L98 38"
        className="stroke-emerald-400/60"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
      />
      {lines.map((l, i) => (
        <motion.line
          key={l.y}
          x1="122"
          y1={l.y}
          x2={l.x2}
          y2={l.y}
          className={l.accent ? "stroke-emerald-400" : "stroke-white/25"}
          strokeWidth={l.accent ? 2 : 1.5}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.35 + i * 0.12, ease: EASE }}
        />
      ))}
    </svg>
  );
}

/* Develop: content modules assemble, building upward */
function GlyphDevelop() {
  const blocks = [
    { x: 14, y: 26, fill: "fill-emerald-400/[0.06]" },
    { x: 90, y: 17, fill: "fill-emerald-400/[0.14]" },
    { x: 166, y: 8, fill: "fill-emerald-400/[0.24]" },
  ];
  return (
    <svg viewBox="0 0 240 56" className="h-14 w-full" aria-hidden fill="none">
      <line x1="10" y1="50" x2="230" y2="50" className="stroke-white/10" strokeWidth="1" />
      {blocks.map((b, i) => (
        <motion.rect
          key={b.x}
          x={b.x}
          y={b.y}
          width="60"
          height={50 - b.y - 2}
          rx="5"
          className={`stroke-emerald-400/70 ${b.fill}`}
          strokeWidth="1.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18 + i * 0.14, ease: EASE }}
        />
      ))}
    </svg>
  );
}

/* Implement: the cohort comes online, left to right */
function GlyphImplement() {
  const cols = 9;
  const rows = 2;
  const dots: { cx: number; cy: number; order: number }[] = [];
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      dots.push({ cx: 24 + c * 24, cy: r === 0 ? 18 : 38, order: c * rows + r });
    }
  }
  return (
    <svg viewBox="0 0 240 56" className="h-14 w-full" aria-hidden fill="none">
      {dots.map((d) => (
        <motion.circle
          key={`${d.cx}-${d.cy}`}
          cx={d.cx}
          cy={d.cy}
          r="4"
          className="fill-emerald-400"
          initial={{ opacity: 0.12, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.15 + d.order * 0.045, ease: EASE }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      ))}
    </svg>
  );
}

/* Evaluate: measured impact climbs; the endpoint lands with a pop */
function GlyphEvaluate() {
  return (
    <svg viewBox="0 0 240 56" className="h-14 w-full" aria-hidden fill="none">
      <line x1="10" y1="50" x2="230" y2="50" className="stroke-white/10" strokeWidth="1" />
      <motion.path
        d="M10 48 C60 46 96 40 134 28 C168 17 200 11 226 9 L226 50 L10 50 Z"
        className="fill-emerald-400/[0.08]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
      />
      <motion.path
        d="M10 48 C60 46 96 40 134 28 C168 17 200 11 226 9"
        className="stroke-emerald-400"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
      />
      <motion.circle
        cx="226"
        cy="9"
        r="4"
        className="fill-emerald-400"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 360, damping: 16, delay: 0.78 }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
      <motion.circle
        cx="226"
        cy="9"
        r="4"
        className="stroke-emerald-400/60"
        strokeWidth="1.5"
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: [0, 0.8, 0], scale: [1, 2.2, 2.2] }}
        transition={{ duration: 0.8, delay: 0.85, ease: "easeOut" }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
    </svg>
  );
}

const PHASES = [
  { key: "Analyze", desc: "Stakeholder discovery & needs analysis", icon: Search, glyph: GlyphAnalyze },
  { key: "Design", desc: "Learning architecture & storyboards", icon: PenTool, glyph: GlyphDesign },
  { key: "Develop", desc: "Content, media & assessments", icon: Layers, glyph: GlyphDevelop },
  { key: "Implement", desc: "LMS rollout & facilitation", icon: Rocket, glyph: GlyphImplement },
  { key: "Evaluate", desc: "Kirkpatrick L1-L4 measurement", icon: BarChart3, glyph: GlyphEvaluate },
];

/* Steps: 0 idle/typing · 1..5 phase (step-1) running · 6 metrics · 7 done */
const PHASE_MS = 1400;
const STEP_DURATIONS = [0, PHASE_MS, PHASE_MS, PHASE_MS, PHASE_MS, PHASE_MS, 1400];

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
              className="absolute inset-x-3 top-1/2 h-[2px] -translate-y-1/2 origin-left bg-emerald-400"
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
                      isDone || isRunning
                        ? "border-emerald-400 bg-emerald-400 text-[#0a0a0f]"
                        : "border-neutral-700 bg-[#0d0d13] text-neutral-600"
                    }`}
                  >
                    {isDone ? (
                      <Check className="h-3 w-3" strokeWidth={3.5} />
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
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{
                  opacity: 0,
                  y: -6,
                  filter: "blur(2px)",
                  transition: { duration: 0.15, ease: EASE },
                }}
                transition={{ duration: 0.25, ease: EASE }}
                className="rounded-lg border border-neutral-800/80 bg-white/[0.02] p-3.5"
              >
                {(() => {
                  const phase = PHASES[runningPhase];
                  const Icon = phase.icon;
                  const Glyph = phase.glyph;
                  return (
                    <>
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-emerald-400/10 text-emerald-400">
                          <Icon className="h-4 w-4" strokeWidth={1.75} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="text-[13px] font-semibold text-white">
                            {phase.key}
                          </div>
                          <div className="truncate text-[11px] text-neutral-500">
                            {phase.desc}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Glyph />
                      </div>
                      {/* Phase timer: constant motion, so linear easing */}
                      <div className="mt-3 h-0.5 overflow-hidden rounded-full bg-neutral-800">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: PHASE_MS / 1000, ease: "linear" }}
                          className="h-full origin-left rounded-full bg-emerald-400"
                        />
                      </div>
                    </>
                  );
                })()}
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
