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
  AlertTriangle,
  Globe,
  Gauge,
  Clock,
  CheckCircle2,
  Circle
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
    <div className="grid grid-cols-2 gap-3 py-2">
      {/* Global Curricula - Top Left */}
      <BentoCard className="col-span-1">
        <div className="flex items-start justify-between mb-3">
          <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
            <Globe className="h-4 w-4" />
          </div>
          <div className="text-right">
             <div className="text-[14px] font-mono font-bold text-white">Global</div>
             <div className="text-[8px] font-mono text-neutral-500 uppercase tracking-tighter">Footprint</div>
          </div>
        </div>
        <div className="text-[11px] font-semibold text-white mb-1">Standardized Delivery</div>
        <p className="text-[9px] text-neutral-500 leading-relaxed">Scaling curricula across multi-national teams with consistency.</p>
        <div className="mt-3 flex justify-between">
           {[...Array(5)].map((_, i) => (
             <div key={i} className={`h-1 flex-1 mx-0.5 rounded-full ${i < 4 ? "bg-cyan-400/40" : "bg-white/5"}`} />
           ))}
        </div>
      </BentoCard>

      {/* Production Pipeline - Top Right */}
      <BentoCard accent className="col-span-1 border-emerald-500/10">
        <div className="flex items-start justify-between mb-3">
          <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
            <Zap className="h-4 w-4" />
          </div>
          <div className="text-right">
             <div className="text-[14px] font-mono font-bold text-emerald-400">-60%</div>
             <div className="text-[8px] font-mono text-neutral-500 uppercase tracking-tighter">Build Time</div>
          </div>
        </div>
        <div className="text-[11px] font-semibold text-white mb-1">Pipeline Build</div>
        <p className="text-[9px] text-neutral-500 leading-relaxed">From one-off builds to a high-velocity template engine.</p>
        <div className="mt-3 relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
           <motion.div 
             className="h-full bg-emerald-400"
             initial={{ width: "100%" }}
             whileInView={{ width: "40%" }}
             transition={{ duration: 1.5, ease: EASE }}
           />
        </div>
      </BentoCard>

      {/* Completion - Bottom Left */}
      <BentoCard className="col-span-1">
        <div className="flex items-start justify-between mb-3">
          <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-amber-400/10 text-amber-400">
            <Gauge className="h-4 w-4" />
          </div>
          <div className="text-right">
             <div className="text-[14px] font-mono font-bold text-white">90%+</div>
             <div className="text-[8px] font-mono text-neutral-500 uppercase tracking-tighter">Retention</div>
          </div>
        </div>
        <div className="text-[11px] font-semibold text-white mb-1">Module Completion</div>
        <p className="text-[9px] text-neutral-500 leading-relaxed">Achieving elite-tier engagement across financial curricula.</p>
        <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
           <motion.div 
             className="h-full bg-amber-400"
             initial={{ width: 0 }}
             whileInView={{ width: "90%" }}
             transition={{ duration: 1.5, delay: 0.2, ease: EASE }}
           />
        </div>
      </BentoCard>

      {/* Templates - Bottom Right */}
      <BentoCard className="col-span-1">
        <div className="flex items-start justify-between mb-3">
          <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-teal-400/10 text-teal-400">
            <FileCheck className="h-4 w-4" />
          </div>
          <div className="text-right">
             <div className="text-[14px] font-mono font-bold text-white">100%</div>
             <div className="text-[8px] font-mono text-neutral-500 uppercase tracking-tighter">Audit Pass</div>
          </div>
        </div>
        <div className="text-[11px] font-semibold text-white mb-1">Templated Assets</div>
        <p className="text-[9px] text-neutral-500 leading-relaxed">Standardizing artifact quality via automated production logic.</p>
        <div className="mt-3 grid grid-cols-3 gap-1">
           {[...Array(3)].map((_, i) => (
             <div key={i} className="h-3 rounded bg-teal-400/20 flex items-center justify-center">
                <div className="h-1 w-2 bg-teal-400/40 rounded-full" />
             </div>
           ))}
        </div>
      </BentoCard>
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
