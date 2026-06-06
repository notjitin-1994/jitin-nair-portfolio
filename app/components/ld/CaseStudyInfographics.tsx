"use client";

import { motion, useReducedMotion } from "framer-motion";
import { 
  Activity, 
  Layers, 
  Cpu, 
  Database, 
  Search, 
  FileCheck, 
  Network, 
  Sparkles, 
  LayoutGrid,
  Zap,
  ArrowRight,
  FileSearch,
  Scan,
  FileText
} from "lucide-react";

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

function BentoCard({ 
  children, 
  className = "", 
  accent = false 
}: { 
  children: React.ReactNode; 
  className?: string; 
  accent?: boolean 
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border p-4 transition-colors duration-300 ${
      accent 
        ? "border-emerald-500/20 bg-emerald-500/[0.04]" 
        : "border-white/[0.08] bg-white/[0.02]"
    } ${className}`}>
      {children}
    </div>
  );
}

// ─── 01 / Smartslate — Solara Ecosystem ───────────────────────────────────────

export function SmartslateInfographic() {
  const reduced = useReducedMotion();

  return (
    <div className="grid grid-cols-2 gap-3 py-2">
      {/* Solara Hub - Full Width */}
      <BentoCard accent className="col-span-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
              <Network className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-500/80">Ecosystem Hub</div>
              <div className="text-sm font-semibold text-white">Solara Core Architecture</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(7)].map((_, i) => (
              <div 
                key={i} 
                className={`h-1 w-3 rounded-full ${i < 2 ? "bg-emerald-400" : "bg-white/10"}`} 
              />
            ))}
          </div>
        </div>
        
        {/* Animated Connective Tissue */}
        <div className="mt-4 relative h-12 flex items-center justify-center overflow-hidden rounded-lg bg-white/[0.02]">
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent animate-pulse" />
           <div className="flex items-center gap-8 z-10">
              <div className="flex flex-col items-center">
                 <div className="text-[8px] font-mono text-emerald-400/60 uppercase">Inputs</div>
                 <Scan className="h-3 w-3 text-emerald-400/40" />
              </div>
              <motion.div 
                animate={reduced ? {} : { scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5"
              >
                <Cpu className="h-3 w-3 text-emerald-400" />
                <span className="text-[9px] font-mono font-bold text-emerald-400 tracking-tight">AI LOGIC LAYER</span>
              </motion.div>
              <div className="flex flex-col items-center">
                 <div className="text-[8px] font-mono text-emerald-400/60 uppercase">Scale</div>
                 <Zap className="h-3 w-3 text-emerald-400/40" />
              </div>
           </div>
        </div>
      </BentoCard>

      {/* Polaris - 45s Blueprinting */}
      <BentoCard className="col-span-1">
        <div className="flex items-start justify-between mb-3">
          <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
            <LayoutGrid className="h-4 w-4" />
          </div>
          <div className="text-right">
            <div className="text-[14px] font-mono font-bold text-white">45s</div>
            <div className="text-[8px] font-mono text-neutral-500 uppercase tracking-tighter">Blueprint</div>
          </div>
        </div>
        <div className="text-[11px] font-semibold text-white mb-1">Polaris LXD</div>
        <div className="text-[9px] text-neutral-500 leading-relaxed">Discovery to design documentation automation.</div>
        <div className="mt-3 space-y-1">
           <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-emerald-400" 
                initial={{ width: 0 }} 
                whileInView={{ width: "100%" }} 
                transition={{ duration: 1.5, ease: EASE }}
              />
           </div>
           <div className="flex justify-between text-[7px] font-mono text-neutral-600 uppercase">
              <span>Intake</span>
              <span>Synthesis</span>
           </div>
        </div>
      </BentoCard>

      {/* Constellation - Artifacts */}
      <BentoCard className="col-span-1">
        <div className="flex items-start justify-between mb-3">
          <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-teal-400/10 text-teal-400">
            <Database className="h-4 w-4" />
          </div>
          <div className="text-right">
             <Activity className="h-3 w-3 text-teal-400 animate-pulse ml-auto" />
             <div className="text-[8px] font-mono text-neutral-500 uppercase tracking-tighter">Live Audit</div>
          </div>
        </div>
        <div className="text-[11px] font-semibold text-white mb-1">Constellation</div>
        <div className="text-[9px] text-neutral-500 leading-relaxed">Cross-artifact analysis & instructional design gaps.</div>
        <div className="mt-3 flex gap-1">
           {[...Array(3)].map((_, i) => (
             <div key={i} className="flex-1 h-4 rounded bg-white/[0.04] border border-white/[0.05] flex items-center justify-center">
                <FileText className="h-2 w-2 text-neutral-600" />
             </div>
           ))}
           <div className="flex-1 h-4 rounded border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center">
              <Sparkles className="h-2 w-2 text-emerald-400" />
           </div>
        </div>
      </BentoCard>

      {/* Integration Roadmap */}
      <BentoCard className="col-span-2">
        <div className="flex items-center gap-4">
           <div className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-[0.2em] rotate-180 [writing-mode:vertical-lr]">Roadmap</div>
           <div className="flex-1 grid grid-cols-4 gap-2">
              <div className="col-span-1 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center">
                 <div className="text-[8px] font-bold text-emerald-400">P</div>
                 <div className="text-[6px] text-emerald-600 font-mono">ACTIVE</div>
              </div>
              <div className="col-span-1 p-2 rounded-lg bg-teal-500/10 border border-teal-500/20 flex flex-col items-center">
                 <div className="text-[8px] font-bold text-teal-400">C</div>
                 <div className="text-[6px] text-teal-600 font-mono">ACTIVE</div>
              </div>
              <div className="col-span-2 p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center gap-2">
                 <div className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
                 <div className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
                 <div className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
                 <div className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
                 <div className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
                 <div className="text-[7px] font-mono text-neutral-600">PENDING</div>
              </div>
           </div>
        </div>
      </BentoCard>
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
