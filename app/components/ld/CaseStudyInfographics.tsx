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
  FileText,
  ClipboardList,
  AlertTriangle
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
      {/* Solara Ecosystem Core - Top Hero Card */}
      <BentoCard accent className="col-span-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
              <Network className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-500/80">Solara Suite</div>
              <div className="text-sm font-semibold text-white">AI-Native Learning Infrastructure</div>
            </div>
          </div>
          <div className="px-2 py-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-mono font-bold text-emerald-400">7 PRODUCTS</span>
          </div>
        </div>
        
        {/* Core Integration Visualization - Replacing the abstract inputs/logic/scale */}
        <div className="mt-5 grid grid-cols-3 gap-2 relative">
           {/* Connecting Line Backdrop */}
           <div className="absolute top-1/2 left-[15%] right-[15%] h-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 -translate-y-1/2" />
           
           <div className="flex flex-col items-center gap-2 z-10">
              <div className="h-10 w-10 rounded-full border border-white/10 bg-[#0a0a0f] flex items-center justify-center group-hover:border-emerald-500/40 transition-colors">
                 <ClipboardList className="h-4 w-4 text-neutral-500" />
              </div>
              <div className="text-[8px] font-mono text-neutral-500 uppercase">Intake</div>
           </div>

           <div className="flex flex-col items-center gap-2 z-10">
              <motion.div 
                animate={reduced ? {} : { 
                  boxShadow: ["0 0 0px rgba(52,211,153,0)", "0 0 15px rgba(52,211,153,0.2)", "0 0 0px rgba(52,211,153,0)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-12 w-12 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center"
              >
                 <Cpu className="h-5 w-5 text-emerald-400" />
              </motion.div>
              <div className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-tighter">Central Engine</div>
           </div>

           <div className="flex flex-col items-center gap-2 z-10">
              <div className="h-10 w-10 rounded-full border border-white/10 bg-[#0a0a0f] flex items-center justify-center">
                 <Zap className="h-4 w-4 text-neutral-500" />
              </div>
              <div className="text-[8px] font-mono text-neutral-500 uppercase">Outcome</div>
           </div>
        </div>
      </BentoCard>

      {/* Polaris - Contextual Design */}
      <BentoCard className="col-span-1">
        <div className="flex items-start justify-between mb-3">
          <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
            <LayoutGrid className="h-4 w-4" />
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[14px] font-mono font-bold text-white">45s</span>
            <span className="text-[7px] font-mono text-emerald-500/60 uppercase font-bold tracking-tighter">Discovery</span>
          </div>
        </div>
        <div className="text-[11px] font-semibold text-white mb-1">Polaris LXD</div>
        <p className="text-[9px] text-neutral-500 leading-relaxed mb-3">Automating static/dynamic intakes into production blueprints.</p>
        
        <div className="space-y-1.5">
           <div className="flex items-center gap-2 px-2 py-1 rounded bg-white/[0.03] border border-white/[0.05]">
              <div className="h-1 w-1 rounded-full bg-emerald-400" />
              <div className="text-[7px] font-mono text-neutral-400 uppercase">Generating Blueprint...</div>
           </div>
           <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-emerald-400" 
                initial={{ width: 0 }} 
                whileInView={{ width: "100%" }} 
                transition={{ duration: 1.5, ease: EASE }}
              />
           </div>
        </div>
      </BentoCard>

      {/* Constellation - Contextual Analysis */}
      <BentoCard className="col-span-1">
        <div className="flex items-start justify-between mb-3">
          <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-teal-400/10 text-teal-400">
            <Database className="h-4 w-4" />
          </div>
          <div className="flex flex-col items-end">
             <Activity className="h-3 w-3 text-teal-400 animate-pulse" />
             <span className="text-[7px] font-mono text-teal-500/60 uppercase font-bold tracking-tighter">Repo Audit</span>
          </div>
        </div>
        <div className="text-[11px] font-semibold text-white mb-1">Constellation</div>
        <p className="text-[9px] text-neutral-500 leading-relaxed mb-3">Cross-artifact design analysis & gap identification.</p>
        
        <div className="grid grid-cols-2 gap-1.5">
           <div className="p-1.5 rounded border border-white/[0.05] bg-white/[0.02] flex flex-col items-center">
              <FileSearch className="h-2.5 w-2.5 text-neutral-500 mb-1" />
              <span className="text-[6px] font-mono text-neutral-600 uppercase">Reviewing Artifacts</span>
           </div>
           <div className="p-1.5 rounded border border-emerald-500/20 bg-emerald-500/5 flex flex-col items-center">
              <AlertTriangle className="h-2.5 w-2.5 text-emerald-400 mb-1" />
              <span className="text-[6px] font-mono text-emerald-600 uppercase font-bold">Flagging Gaps</span>
           </div>
        </div>
      </BentoCard>

      {/* Ecosystem Breadth - Showing it's a coherent suite */}
      <BentoCard className="col-span-2">
        <div className="flex items-center justify-between">
           <div className="text-[9px] font-mono font-bold text-neutral-600 uppercase tracking-widest">Cross-Integration Roadmap</div>
           <div className="flex gap-2">
              <div className="flex items-center gap-1">
                 <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                 <span className="text-[7px] font-mono text-neutral-500 uppercase">Active</span>
              </div>
              <div className="flex items-center gap-1">
                 <div className="h-1.5 w-1.5 rounded-full bg-white/10" />
                 <span className="text-[7px] font-mono text-neutral-500 uppercase">Development</span>
              </div>
           </div>
        </div>
        
        <div className="mt-4 flex justify-between px-2">
           {['P', 'C', 'S', 'O', 'L', 'A', 'R'].map((letter, i) => (
             <div key={i} className="flex flex-col items-center gap-1">
                <div className={`h-7 w-7 rounded-lg border flex items-center justify-center font-bold text-[10px] ${
                  i < 2 
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" 
                    : "border-white/5 bg-white/[0.02] text-neutral-700"
                }`}>
                   {letter}
                </div>
                {i === 0 && <span className="text-[6px] font-mono text-emerald-600 font-bold uppercase">Polaris</span>}
                {i === 1 && <span className="text-[6px] font-mono text-teal-600 font-bold uppercase">Const</span>}
             </div>
           ))}
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
