"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Shared primitives ─────────────────────────────────────────────────────────

function AnimatedBar({
  fill,
  delay = 0,
  className = "bg-gradient-to-r from-emerald-400 to-teal-400",
}: {
  fill: number;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
      <motion.div
        className={`h-full rounded-full origin-left ${className}`}
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: fill }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      />
    </div>
  );
}

// ─── 01 / Smartslate — AI Discovery Pipeline ──────────────────────────────────
const PIPELINE_STAGES = ["Brief", "Audit", "Design", "Draft", "Review", "Refine", "Ship"];

export function SmartslateInfographic() {
  const reduced = useReducedMotion();

  return (
    <div className="space-y-6 py-2">
      {/* Sequence Branding */}
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs font-bold text-emerald-400">01</span>
        <span className="h-px w-4 bg-white/10" />
        <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
          Smartslate
        </span>
      </div>

      {/* Label */}
      <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-neutral-600">
        7-Stage AI Discovery Pipeline
      </div>

      {/* Pipeline nodes */}
      <div className="relative">
        {/* Track */}
        <div className="absolute left-[18px] right-[18px] top-[17px] h-px bg-white/[0.06]" />
        {/* Animated fill */}
        <motion.div
          className="absolute left-[18px] right-[18px] top-[17px] h-px origin-left bg-gradient-to-r from-emerald-400/50 to-teal-400/25"
          initial={reduced ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.3, ease: EASE }}
        />

        {/* Nodes */}
        <div className="relative flex justify-between">
          {PIPELINE_STAGES.map((stage, i) => (
            <div key={stage} className="flex flex-col items-center gap-2">
              <motion.div
                className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-emerald-400/40 bg-[#0a0a0f]"
                initial={reduced ? false : { opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.09, ease: EASE }}
              >
                {/* Pulse halo */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-emerald-400/[0.12]"
                  animate={reduced ? undefined : {
                    scale: [1, 1.4, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2.4,
                    delay: i * 0.25,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="relative font-mono text-[8px] font-bold text-emerald-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.div>
              <motion.span
                className="text-center text-[7px] font-medium leading-none text-neutral-600"
                initial={reduced ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.09 }}
              >
                {stage}
              </motion.span>
            </div>
          ))}
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <motion.div
          className="rounded-xl border border-emerald-400/15 bg-emerald-400/[0.05] p-3"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
        >
          <div className="font-serif text-2xl font-medium text-white">
            45<span className="text-base">s</span>
          </div>
          <div className="mt-0.5 text-[10px] leading-snug text-neutral-500">per learning report</div>
        </motion.div>
        <motion.div
          className="rounded-xl border border-teal-400/15 bg-teal-400/[0.04] p-3"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.82, ease: EASE }}
        >
          <div className="font-serif text-2xl font-medium text-white">500+</div>
          <div className="mt-0.5 text-[10px] leading-snug text-neutral-500">automated jobs / day</div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── 02 / Moody's Ratings — Production Efficiency ─────────────────────────────
const MOODYS_CIRC = 2 * Math.PI * 28;

export function MoodysInfographic() {
  const reduced = useReducedMotion();

  return (
    <div className="space-y-6 py-2">
      {/* Production time comparison */}
      <div>
        <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-neutral-600 mb-4">
          Content Production Time
        </div>
        <div className="space-y-3">
          {/* Before */}
          <div>
            <div className="mb-1.5 flex justify-between">
              <span className="text-[11px] text-neutral-500">Before</span>
              <span className="text-[11px] text-neutral-500">100%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/[0.10]" />
          </div>
          {/* After */}
          <div>
            <div className="mb-1.5 flex justify-between">
              <span className="text-[11px] text-emerald-400/90">After</span>
              <span className="text-[11px] text-emerald-400/90">40%</span>
            </div>
            <AnimatedBar fill={0.4} delay={0.15} />
          </div>
          {/* Badge */}
          <div className="flex justify-end">
            <motion.span
              className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-400"
              initial={reduced ? false : { opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: 0.5, ease: EASE }}
            >
              ↓ 60% time saved
            </motion.span>
          </div>
        </div>
      </div>

      {/* Completion ring + global */}
      <div className="flex items-center gap-4 border-t border-white/[0.05] pt-5">
        {/* SVG donut */}
        <div className="relative flex-shrink-0" style={{ width: 72, height: 72 }}>
          <svg width={72} height={72} viewBox="0 0 72 72" overflow="visible">
            <defs>
              <linearGradient id="moodysGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="72" y2="72">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#2dd4bf" />
              </linearGradient>
            </defs>
            {/* Track */}
            <circle cx={36} cy={36} r={28} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={5} />
            {/* Animated fill arc */}
            <g transform="rotate(-90 36 36)">
              <motion.circle
                cx={36}
                cy={36}
                r={28}
                fill="none"
                stroke="url(#moodysGrad)"
                strokeWidth={5}
                strokeLinecap="round"
                strokeDasharray={MOODYS_CIRC}
                initial={reduced ? false : { strokeDashoffset: MOODYS_CIRC }}
                whileInView={{ strokeDashoffset: MOODYS_CIRC * 0.1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 1.5, ease: EASE }}
              />
            </g>
          </svg>
          {/* Centre label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-[13px] font-medium text-white">90%+</span>
          </div>
        </div>

        {/* Labels */}
        <div>
          <div className="text-sm font-medium text-white">Completion Rate</div>
          <div className="mt-0.5 text-[11px] text-neutral-500">module completion</div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-neutral-400">
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal-400" />
            Global teams served
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 03 / Accenture — Learning ROI ────────────────────────────────────────────
export function AccentureInfographic() {
  const reduced = useReducedMotion();

  return (
    <div className="space-y-6 py-2">
      {/* Training time reduction */}
      <div>
        <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-neutral-600 mb-4">
          Training Time Reduction
        </div>
        <div className="space-y-3">
          <div>
            <div className="mb-1.5 flex justify-between">
              <span className="text-[11px] text-neutral-500">Baseline</span>
              <span className="text-[11px] text-neutral-500">100%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/[0.10]" />
          </div>
          <div>
            <div className="mb-1.5 flex justify-between">
              <span className="text-[11px] text-emerald-400/90">Optimised</span>
              <span className="text-[11px] text-emerald-400/90">30%</span>
            </div>
            <AnimatedBar fill={0.3} delay={0.15} />
          </div>
          <motion.span
            className="text-[10px] font-semibold text-emerald-400"
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            ↓ 70% less learning time
          </motion.span>
        </div>
      </div>

      {/* Cost savings */}
      <div className="border-t border-white/[0.05] pt-5">
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-3xl font-medium text-white">$140K+</span>
          <span className="text-xs text-neutral-500">in cost savings</span>
        </div>
        <div className="mt-2.5">
          <AnimatedBar fill={1} delay={0.2} />
        </div>
      </div>

      {/* Knowledge retention */}
      <div className="border-t border-white/[0.05] pt-5">
        <div className="mb-1.5 flex items-baseline justify-between">
          <span className="text-[11px] text-neutral-400">Knowledge retention</span>
          <span className="font-serif text-base font-medium text-white">54%</span>
        </div>
        <AnimatedBar
          fill={0.54}
          delay={0.35}
          className="bg-teal-400/70"
        />
        <p className="mt-1.5 text-[10px] text-neutral-600">maintained despite 70% time cut</p>
      </div>
    </div>
  );
}

// ─── Dispatcher ───────────────────────────────────────────────────────────────
export function CaseStudyInfographic({ id }: { id: string }) {
  if (id === "smartslate") return <SmartslateInfographic />;
  if (id === "moodys") return <MoodysInfographic />;
  if (id === "accenture") return <AccentureInfographic />;
  return null;
}
