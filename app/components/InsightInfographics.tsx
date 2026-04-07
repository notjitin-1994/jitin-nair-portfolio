"use client";

import { motion } from "framer-motion";
import { Brain, Target, Compass, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";

/**
 * Mappings from ID to AI Systems Engineering
 */
const skillMappings = [
  {
    id: "task-analysis",
    icon: Target,
    idLabel: "Task Analysis",
    aiLabel: "Intent Classification",
    description: "Breaking down complex human tasks into discrete logical steps for automation.",
    color: "cyan"
  },
  {
    id: "scaffolding",
    icon: Compass,
    idLabel: "Scaffolding",
    aiLabel: "Chain-of-Thought (CoT)",
    description: "Designing step-by-step reasoning paths to guide AI through complex logic.",
    color: "emerald"
  },
  {
    id: "assessment",
    icon: BarChart3,
    idLabel: "Assessment Design",
    aiLabel: "Model Benchmarking",
    description: "Creating rigorous evaluation frameworks (DeepEval/Promptfoo) for output validation.",
    color: "violet"
  },
  {
    id: "curriculum",
    icon: Brain,
    idLabel: "Curriculum Mapping",
    aiLabel: "RAG Architecture",
    description: "Structuring knowledge graphs so agents retrieve the right data at the right time.",
    color: "blue"
  }
];

export function SkillsMappingInfographic() {
  return (
    <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-6">
      {skillMappings.map((skill, index) => {
        const Icon = skill.icon;
        return (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/30 transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-tighter">
                <span className="text-slate-400 uppercase">{skill.idLabel}</span>
                <ArrowRight className="w-3 h-3 text-cyan-500" />
                <span className="text-cyan-400 uppercase">{skill.aiLabel}</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {skill.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

export function ROIMetricsInfographic() {
  const metrics = [
    { label: "Content Production", value: "-70%", sub: "Time Reduction", detail: "via AI-ID Workflows" },
    { label: "Engineering Throughput", value: "+60%", sub: "Increase", detail: "via Agentic Orchestration" },
    { label: "Payoff Ratio", value: "1.7x", sub: "Financial Return", detail: "Mature AI Integration" },
    { label: "ROI Multiplier", value: "2.1x", sub: "vs Non-upskilled Teams", detail: "Data-driven Upskilling" }
  ];

  return (
    <div className="my-12 p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-500/10 border border-white/[0.08] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
      
      <h4 className="text-sm font-mono text-cyan-400 uppercase tracking-[0.2em] mb-8">2026 Industry Impact Metrics</h4>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col gap-1"
          >
            <span className="text-3xl font-black text-white tracking-tighter">{m.value}</span>
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">{m.sub}</span>
            <span className="text-[10px] text-slate-500 font-medium">{m.detail}</span>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[10px] text-slate-500 italic">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          <span>Verified against 2026 Market Analysis: 91% global AI adoption with ROI Gap.</span>
        </div>
      </div>
    </div>
  );
}
