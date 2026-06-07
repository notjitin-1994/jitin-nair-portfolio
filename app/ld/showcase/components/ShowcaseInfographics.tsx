"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  Workflow,
  Cpu,
  Network,
  Brain,
  Compass,
  ArrowRight,
  ArrowDown,
  Layers,
  Slack,
  Database,
  Sparkles,
  Target,
  RefreshCw,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* =========================================================
   1 · Measurement Maturity — Kirkpatrick→Phillips + ladder
   ========================================================= */
export function MeasurementMaturityInfographic() {
  const reduced = useReducedMotion();
  const levels = [
    { n: "L1", label: "Reaction", note: "Did they like it?", reach: true },
    { n: "L2", label: "Learning", note: "Did they pass?", reach: true },
    { n: "L3", label: "Behavior", note: "Did it change work?", reach: false },
    { n: "L4", label: "Results", note: "Did the business move?", reach: false },
    { n: "L5", label: "ROI", note: "Was it worth it?", reach: false },
  ];

  return (
    <div className="my-12 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 sm:p-9 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.06] via-transparent to-transparent pointer-events-none"
      />
      <div className="relative">
        <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-400 mb-7">
          The Evaluation Climb · Kirkpatrick → Phillips
        </h4>

        <div className="space-y-2.5">
          {levels.map((lvl, i) => (
            <div key={lvl.n}>
              <motion.div
                initial={reduced ? false : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className={`flex items-center gap-4 rounded-xl border p-4 ${
                  lvl.reach
                    ? "border-white/[0.08] bg-white/[0.03]"
                    : "border-emerald-400/25 bg-emerald-400/[0.06]"
                }`}
                style={{ marginLeft: `${i * 6}%`, marginRight: `${(4 - i) * 2}%` }}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${
                    lvl.reach
                      ? "bg-white/[0.06] text-neutral-400"
                      : "bg-emerald-400/[0.15] text-emerald-300"
                  }`}
                >
                  {lvl.n}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-white leading-tight">{lvl.label}</div>
                  <div className="text-xs text-neutral-500">{lvl.note}</div>
                </div>
                {lvl.reach ? (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-600">
                    Inside the LMS
                  </span>
                ) : (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/80">
                    Inside the business
                  </span>
                )}
              </motion.div>

              {/* Waterline between L2 and L3 */}
              {i === 1 && (
                <motion.div
                  initial={reduced ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="my-3 flex items-center gap-3"
                >
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/40 to-emerald-500/40" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-emerald-400 whitespace-nowrap">
                    ↑ where ~80% stop
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-l from-transparent via-emerald-500/40 to-emerald-500/40" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-7 pt-5 border-t border-white/[0.06] flex items-center gap-2 text-[11px] text-neutral-500 italic">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          <span>Deloitte: 95% of L&amp;D orgs don&apos;t excel at linking learning to business data.</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   2 · Learning Ecosystem — layered topology
   ========================================================= */
export function LearningEcosystemInfographic() {
  const reduced = useReducedMotion();
  const layers = [
    {
      icon: Slack,
      title: "Flow-of-Work Layer",
      detail: "Slack · Teams · Workspace — learning at the moment of need",
      accent: true,
    },
    {
      icon: Sparkles,
      title: "AI Delivery Engine",
      detail: "Ranks, routes, personalizes — the unseen engine",
      accent: true,
    },
    {
      icon: Layers,
      title: "LXP — Engagement",
      detail: "Curation · discovery · personalized pathways",
      accent: false,
    },
    {
      icon: Database,
      title: "LMS — Governance",
      detail: "Compliance · system of record · structured delivery",
      accent: false,
    },
  ];

  return (
    <div className="my-12 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 sm:p-9 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.06] via-transparent to-transparent pointer-events-none"
      />
      <div className="relative">
        <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-400 mb-7">
          The Integrated Learning Ecosystem
        </h4>

        <div className="space-y-3">
          {layers.map((layer, i) => {
            const Icon = layer.icon;
            return (
              <motion.div
                key={layer.title}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                className={`flex items-center gap-4 rounded-2xl border p-5 ${
                  layer.accent
                    ? "border-emerald-400/25 bg-emerald-400/[0.06]"
                    : "border-white/[0.08] bg-white/[0.03]"
                }`}
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    layer.accent
                      ? "bg-emerald-400/[0.15] text-emerald-300"
                      : "bg-white/[0.05] text-neutral-400"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white leading-tight">{layer.title}</div>
                  <div className="text-xs text-neutral-500 mt-0.5">{layer.detail}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] font-mono uppercase tracking-wider text-emerald-400/80">
          <Target className="h-3.5 w-3.5" />
          <span>One learner · one capability · the right moment</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   3 · Adaptive Loop — assess → diagnose → adapt → reinforce
   ========================================================= */
export function AdaptiveLoopInfographic() {
  const reduced = useReducedMotion();
  const steps = [
    { icon: BarChart3, label: "Assess", note: "Read learner state" },
    { icon: Brain, label: "Diagnose", note: "Infer the why" },
    { icon: RefreshCw, label: "Adapt", note: "Change the next move" },
    { icon: CheckCircle2, label: "Reinforce", note: "Schedule retrieval" },
  ];

  return (
    <div className="my-12 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 sm:p-9 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.07] via-transparent to-transparent pointer-events-none"
      />
      <div className="relative">
        <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-400 mb-7">
          The Adaptive Loop · Per Learner, Continuously
        </h4>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.label}
                initial={reduced ? false : { opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: EASE }}
                className="relative flex flex-col items-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] p-5 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/[0.12] text-emerald-300 mb-3">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold text-white">{step.label}</div>
                <div className="text-[11px] text-neutral-500 mt-1 leading-snug">{step.note}</div>
                <span className="absolute -top-2 -left-2 font-mono text-[10px] font-bold text-emerald-400/50">
                  0{i + 1}
                </span>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-5 flex items-center justify-center gap-2 text-[11px] font-mono uppercase tracking-wider text-emerald-400/80"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Loop repeats every interaction — at a scale no human tutor can reach</span>
        </motion.div>
      </div>
    </div>
  );
}

/* =========================================================
   4 · Skills Taxonomy — flat list vs connected mesh
   ========================================================= */
export function SkillsTaxonomyInfographic() {
  const reduced = useReducedMotion();
  const nodes = [
    { id: "py", label: "Python", x: 50, y: 22 },
    { id: "sql", label: "SQL", x: 22, y: 50 },
    { id: "stats", label: "Statistics", x: 78, y: 50 },
    { id: "ml", label: "ML", x: 35, y: 80 },
    { id: "ds", label: "Data Science", x: 70, y: 82 },
  ];
  const edges = [
    ["py", "sql"],
    ["py", "stats"],
    ["sql", "ml"],
    ["stats", "ds"],
    ["py", "ds"],
    ["ml", "ds"],
  ];
  const pos = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className="my-12 grid gap-4 lg:grid-cols-2">
      {/* Taxonomy = flat list */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
        className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7"
      >
        <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">
          Taxonomy
        </h4>
        <p className="text-[11px] text-neutral-600 mb-5">A list. It organizes.</p>
        <ul className="space-y-2.5">
          {["Programming › Python", "Data › SQL", "Math › Statistics", "AI › Machine Learning"].map(
            (s) => (
              <li
                key={s}
                className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-sm text-neutral-400 font-mono"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-600" />
                {s}
              </li>
            )
          )}
        </ul>
      </motion.div>

      {/* Ontology = connected mesh */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
        className="rounded-3xl border border-emerald-400/25 bg-emerald-400/[0.05] p-7 relative overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.08] via-transparent to-transparent pointer-events-none"
        />
        <div className="relative">
          <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2">
            Ontology
          </h4>
          <p className="text-[11px] text-emerald-400/60 mb-3">A map. It reasons.</p>
          <div className="relative aspect-square w-full">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              {edges.map(([a, b], i) => (
                <motion.line
                  key={`${a}-${b}`}
                  x1={pos[a].x}
                  y1={pos[a].y}
                  x2={pos[b].x}
                  y2={pos[b].y}
                  stroke="rgba(52,211,153,0.35)"
                  strokeWidth="0.6"
                  initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: EASE }}
                />
              ))}
            </svg>
            {nodes.map((n, i) => (
              <motion.div
                key={n.id}
                initial={reduced ? false : { opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: EASE }}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/40 bg-[#0a0a0f] px-2.5 py-1 text-[10px] font-mono font-semibold text-emerald-200 whitespace-nowrap"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                {n.label}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* =========================================================
   5 · Forgetting Curve — decay vs spaced reinforcement
   ========================================================= */
export function ForgettingCurveInfographic() {
  const reduced = useReducedMotion();
  // Decay-only curve (steep drop)
  const decay = "M5,18 C18,55 30,72 50,80 C70,86 85,88 95,89";
  // Spaced curve: sawtooth — drops then jumps back up at reinforcement points
  const spaced =
    "M5,18 C12,40 18,50 24,52 L24,24 C30,42 36,50 42,52 L42,28 C50,44 56,50 64,52 L64,34 C72,46 80,50 95,52";
  const markers = [24, 42, 64];

  return (
    <div className="my-12 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 sm:p-9 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.06] via-transparent to-transparent pointer-events-none"
      />
      <div className="relative">
        <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2">
          The Forgetting Curve · Engineered vs Abandoned
        </h4>
        <p className="text-[11px] text-neutral-600 mb-6">Retention over time after a single learning event.</p>

        <div className="relative w-full">
          <svg viewBox="0 0 100 100" className="w-full h-auto" preserveAspectRatio="none" style={{ maxHeight: 240 }}>
            {/* axes */}
            <line x1="5" y1="92" x2="95" y2="92" stroke="rgba(255,255,255,0.1)" strokeWidth="0.4" />
            <line x1="5" y1="8" x2="5" y2="92" stroke="rgba(255,255,255,0.1)" strokeWidth="0.4" />

            {/* decay-only */}
            <motion.path
              d={decay}
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="0.9"
              strokeDasharray="2 2"
              initial={reduced ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: EASE }}
            />
            {/* spaced reinforcement */}
            <motion.path
              d={spaced}
              fill="none"
              stroke="rgb(52,211,153)"
              strokeWidth="1.2"
              initial={reduced ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
            />
            {/* reinforcement markers */}
            {markers.map((x, i) => (
              <motion.circle
                key={x}
                cx={x}
                cy={i === 0 ? 52 : i === 1 ? 52 : 52}
                r="1.6"
                fill="rgb(52,211,153)"
                initial={reduced ? false : { opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.25 }}
              />
            ))}
          </svg>

          {/* legend */}
          <div className="mt-4 flex flex-wrap items-center gap-5 text-[11px]">
            <span className="flex items-center gap-2 text-neutral-500">
              <TrendingDown className="h-3.5 w-3.5" />
              <span className="inline-block h-px w-5 border-t border-dashed border-white/40" /> No reinforcement —
              ~90% lost in a week
            </span>
            <span className="flex items-center gap-2 text-emerald-400">
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="inline-block h-0.5 w-5 bg-emerald-400" /> Spaced repetition — up to 200% retention
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { v: "1d", l: "first recall" },
            { v: "3d / 7d", l: "spaced intervals" },
            { v: "21d", l: "durable memory" },
          ].map((m) => (
            <div
              key={m.v}
              className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.04] px-3 py-2.5 text-center"
            >
              <div className="font-mono text-sm font-bold text-emerald-300">{m.v}</div>
              <div className="text-[10px] text-neutral-500 mt-0.5">{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   6 · Operating Model — content factory vs performance engine
   ========================================================= */
export function OperatingModelInfographic() {
  const reduced = useReducedMotion();
  const oldModel = [
    "Request → build a course",
    "Measured by courses shipped",
    "Production is the core skill",
    "Support function · cost center",
  ];
  const newModel = [
    "Request → diagnose the gap",
    "Measured by gaps closed",
    "Analytics & orchestration core",
    "Growth engine · owns a number",
  ];

  return (
    <div className="my-12 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
      {/* OLD */}
      <motion.div
        initial={reduced ? false : { opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
        className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7"
      >
        <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500 mb-1">
          Content Factory
        </h4>
        <p className="text-[11px] text-neutral-600 mb-5">The model AI just commoditized</p>
        <ul className="space-y-3">
          {oldModel.map((s) => (
            <li key={s} className="flex items-start gap-3 text-sm text-neutral-400">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-600" />
              {s}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* arrow */}
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex items-center justify-center"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/[0.08] text-emerald-300">
          <ArrowRight className="h-5 w-5 hidden lg:block" />
          <ArrowDown className="h-5 w-5 lg:hidden" />
        </div>
      </motion.div>

      {/* NEW */}
      <motion.div
        initial={reduced ? false : { opacity: 0, x: 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        className="rounded-3xl border border-emerald-400/25 bg-emerald-400/[0.05] p-7 relative overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.08] via-transparent to-transparent pointer-events-none"
        />
        <div className="relative">
          <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-400 mb-1">
            Performance Engine
          </h4>
          <p className="text-[11px] text-emerald-400/60 mb-5">The model AI just unlocked</p>
          <ul className="space-y-3">
            {newModel.map((s) => (
              <li key={s} className="flex items-start gap-3 text-sm text-neutral-200">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

/* =========================================================
   7 · Onboarding Velocity — ramp curve + productivity debt
   ========================================================= */
export function OnboardingVelocityInfographic() {
  const reduced = useReducedMotion();

  const phases = [
    { label: "Orientation", weeks: "0–4 wks", color: "text-neutral-500", bar: "bg-neutral-700" },
    { label: "Integration", weeks: "4–16 wks", color: "text-amber-400", bar: "bg-amber-500/50" },
    { label: "Performance", weeks: "16–36 wks", color: "text-emerald-400", bar: "bg-emerald-500" },
  ];

  const costs = [
    { role: "Individual Contributor", months: "3–5 mo", cost: "~$30K" },
    { role: "Senior / Specialist", months: "6–9 mo", cost: "~$65K" },
    { role: "Manager / Leader", months: "9–12 mo", cost: "~$120K" },
  ];

  return (
    <div className="my-12 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 sm:p-9 relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.04] via-transparent to-emerald-500/[0.04] pointer-events-none" />
      <div className="relative">
        <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2">
          The Ramp Curve · Time-to-Full-Productivity
        </h4>
        <p className="text-[11px] text-neutral-600 mb-7">Each day below 100% is productivity debt accruing on your P&L.</p>

        {/* Ramp SVG */}
        <div className="relative w-full mb-8">
          <svg viewBox="0 0 100 60" className="w-full h-auto" preserveAspectRatio="none" style={{ maxHeight: 180 }}>
            {/* grid lines */}
            {[15, 30, 45, 60, 75].map(y => (
              <line key={y} x1="6" y1={y * 0.6} x2="96" y2={y * 0.6} stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" />
            ))}
            <line x1="6" y1="2" x2="96" y2="2" stroke="rgba(16,185,129,0.2)" strokeWidth="0.4" strokeDasharray="2 1.5" />

            {/* productivity debt fill */}
            <motion.path
              d="M6,55 C14,52 22,44 34,30 C46,18 60,8 80,4 L80,2 L96,2 L96,55 Z"
              fill="rgba(245,158,11,0.06)"
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />

            {/* ramp curve */}
            <motion.path
              d="M6,55 C14,52 22,44 34,30 C46,18 60,8 80,4 C88,3 92,2.4 96,2.2"
              fill="none"
              stroke="rgb(52,211,153)"
              strokeWidth="1.3"
              initial={reduced ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: EASE }}
            />

            {/* 100% label */}
            <text x="97" y="3" fontSize="3" fill="rgba(16,185,129,0.6)" textAnchor="end">100%</text>
            <text x="97" y="57" fontSize="3" fill="rgba(255,255,255,0.2)" textAnchor="end">0%</text>

            {/* phase dividers */}
            <line x1="28" y1="2" x2="28" y2="57" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" strokeDasharray="1 1" />
            <line x1="58" y1="2" x2="58" y2="57" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" strokeDasharray="1 1" />

            {/* debt annotation */}
            <text x="52" y="24" fontSize="3" fill="rgba(245,158,11,0.5)" textAnchor="middle">productivity debt</text>
          </svg>
        </div>

        {/* Phase strip */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {phases.map((p, i) => (
            <motion.div
              key={p.label}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-3 py-3 text-center"
            >
              <div className={`text-[10px] font-mono font-bold uppercase tracking-widest ${p.color} mb-1`}>{p.label}</div>
              <div className="text-[11px] text-neutral-500">{p.weeks}</div>
            </motion.div>
          ))}
        </div>

        {/* Cost table */}
        <h5 className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-neutral-500 mb-3">Estimated Ramp Cost · by Role</h5>
        <div className="space-y-2.5">
          {costs.map((c, i) => (
            <motion.div
              key={c.role}
              initial={reduced ? false : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5"
            >
              <span className="text-[12px] text-neutral-300">{c.role}</span>
              <div className="flex items-center gap-4 text-[11px]">
                <span className="font-mono text-amber-400">{c.months}</span>
                <span className="font-mono font-bold text-white">{c.cost}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-3 text-[10px] text-neutral-600">Cost estimate = salary + overhead × ramp duration × (1 – avg. productivity during ramp).</p>
      </div>
    </div>
  );
}

/* =========================================================
   8 · AI Fluency Spectrum — 4-level org capability ladder
   ========================================================= */
export function AiFluencyInfographic() {
  const reduced = useReducedMotion();

  const levels = [
    {
      n: "01",
      title: "Tool User",
      desc: "Knows AI exists and uses consumer-facing tools ad hoc. No workflow integration.",
      pct: 58,
      color: "text-neutral-400",
      bar: "bg-neutral-600",
      ring: "border-neutral-700",
    },
    {
      n: "02",
      title: "Workflow Integrator",
      desc: "Embeds AI into recurring tasks — writing, summarising, research — with intentional prompting.",
      pct: 28,
      color: "text-sky-400",
      bar: "bg-sky-500",
      ring: "border-sky-500/30",
    },
    {
      n: "03",
      title: "Prompt Architect",
      desc: "Designs multi-step prompts, chains tools, and builds reusable AI-assisted workflows for the team.",
      pct: 11,
      color: "text-violet-400",
      bar: "bg-violet-500",
      ring: "border-violet-500/30",
    },
    {
      n: "04",
      title: "Strategic Orchestrator",
      desc: "Deploys agents, evaluates model trade-offs, and aligns AI capability to business outcomes.",
      pct: 3,
      color: "text-emerald-400",
      bar: "bg-emerald-500",
      ring: "border-emerald-500/30",
    },
  ];

  return (
    <div className="my-12 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 sm:p-9 relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.04] via-transparent to-emerald-500/[0.05] pointer-events-none" />
      <div className="relative">
        <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2">
          AI Fluency Spectrum · Where Your Workforce Sits Today
        </h4>
        <p className="text-[11px] text-neutral-600 mb-7">Estimated distribution across a typical knowledge-work enterprise in 2026.</p>

        <div className="space-y-4">
          {levels.map((l, i) => (
            <motion.div
              key={l.n}
              initial={reduced ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: EASE }}
              className={`rounded-2xl border ${l.ring} bg-white/[0.02] p-4 sm:p-5`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-xs font-bold ${l.color}`}>{l.n}</span>
                  <span className={`text-sm font-semibold ${l.color}`}>{l.title}</span>
                </div>
                <span className={`font-mono text-sm font-bold ${l.color} shrink-0`}>{l.pct}%</span>
              </div>
              <p className="text-[12px] text-neutral-500 leading-relaxed mb-3">{l.desc}</p>
              <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${l.bar}`}
                  initial={reduced ? false : { width: 0 }}
                  whileInView={{ width: `${l.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: EASE }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-5 text-[10px] text-neutral-600">
          Benchmark distribution based on Upwork Future Workforce Index 2026 and Korn Ferry AI Skills Research.
          Individual organizations vary significantly based on prior investment.
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   9 · Content Half-Life — decay rates by content type
   ========================================================= */
export function ContentHalfLifeInfographic() {
  const reduced = useReducedMotion();

  const types = [
    { label: "Regulatory & Compliance", half: "24–36 mo", pct: 85, color: "bg-emerald-500" },
    { label: "Product & Tool Knowledge", half: "6–12 mo", pct: 38, color: "bg-sky-500" },
    { label: "Process & Workflow", half: "8–14 mo", pct: 45, color: "bg-violet-500" },
    { label: "Technical / AI Skills", half: "3–6 mo", pct: 20, color: "bg-amber-500" },
    { label: "Market & Competitive Intel", half: "1–3 mo", pct: 8, color: "bg-red-500" },
  ];

  const strategies = [
    { icon: "⚡", label: "Atomic units", desc: "Small, independent chunks can be swapped without rebuilding the whole." },
    { icon: "🔁", label: "Decay schedules", desc: "Every asset tagged with a review trigger, not a calendar date." },
    { icon: "🤖", label: "AI-assisted refresh", desc: "LLMs flag stale content and draft updates for SME sign-off." },
    { icon: "📊", label: "Usage signals", desc: "Drop-off and low-rating triggers auto-surface decay before SMEs notice." },
  ];

  return (
    <div className="my-12 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 sm:p-9 relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-red-500/[0.03] via-transparent to-emerald-500/[0.04] pointer-events-none" />
      <div className="relative">
        <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2">
          Content Half-Life · by Type
        </h4>
        <p className="text-[11px] text-neutral-600 mb-7">How long before 50% of the content in each category is materially outdated.</p>

        <div className="space-y-3 mb-10">
          {types.map((t, i) => (
            <motion.div
              key={t.label}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.09, ease: EASE }}
              className="flex items-center gap-3"
            >
              <span className="w-44 text-[11px] text-neutral-400 shrink-0">{t.label}</span>
              <div className="flex-1 h-2 bg-white/[0.04] rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${t.color}`}
                  initial={reduced ? false : { width: 0 }}
                  whileInView={{ width: `${t.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.09, ease: EASE }}
                />
              </div>
              <span className="font-mono text-[10px] text-neutral-500 w-20 text-right shrink-0">{t.half}</span>
            </motion.div>
          ))}
        </div>

        <h5 className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-neutral-500 mb-4">Evergreen Architecture · Four Mechanisms</h5>
        <div className="grid sm:grid-cols-2 gap-3">
          {strategies.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduced ? false : { opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.4 + i * 0.08 }}
              className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3"
            >
              <span className="text-base shrink-0 mt-0.5">{s.icon}</span>
              <div>
                <div className="text-[12px] font-semibold text-white mb-0.5">{s.label}</div>
                <div className="text-[11px] text-neutral-500 leading-relaxed">{s.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Lucide icon map for cards (keyed by ShowcaseInsight.icon) */
export const SHOWCASE_ICON_MAP = {
  BarChart3,
  Workflow,
  Cpu,
  Network,
  Brain,
  Compass,
} as const;
