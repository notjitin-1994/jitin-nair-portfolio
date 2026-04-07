"use client";

import { motion } from "framer-motion";
import { Brain, Target, Compass, BarChart3, ArrowRight, CheckCircle2, UserCheck, ShieldAlert, Zap, Layers, GitBranch, Users2, Activity, Timer, Network, Database, Cpu, ShieldCheck, Share2, ArrowDownRight, Workflow } from "lucide-react";

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

const pantheonNodes = [
  { name: "Hermes", role: "Data Ingestion", detail: "WebSocket / Socket.io", color: "cyan" },
  { name: "Argus", role: "Regime Detection", detail: "Gaussian HMM / Random Forest", color: "emerald" },
  { name: "Athena", role: "Strategy Matrix", detail: "16-node Logic Engine", color: "violet" },
  { name: "Apollo", role: "Signal Oracle", detail: "Probabilistic Inference", color: "blue" }
];

export function BayesianArchitectureInfographic() {
  return (
    <div className="my-12 p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
          {pantheonNodes.map((node, i) => (
            <motion.div
              key={node.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 text-center group hover:border-cyan-500/30 transition-all"
            >
              <div className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest mb-1">{node.name}</div>
              <div className="text-white font-bold text-xs mb-1">{node.role}</div>
              <div className="text-[9px] text-slate-500 italic leading-tight">{node.detail}</div>
            </motion.div>
          ))}
        </div>
        
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-tighter">System Performance</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-slate-400 text-xs">P99 Ingest-to-Signal</span>
              <span className="text-2xl font-black text-white">&lt;10ms</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-cyan-400"
                initial={{ width: 0 }}
                whileInView={{ width: "95%" }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed italic">
            The Pantheon architecture fuses high-frequency socket data with probabilistic logic, achieving 90%+ regime classification accuracy.
          </p>
        </div>
      </div>
    </div>
  );
}

const realityStages = [
  { id: "intent", title: "Intent Validation", detail: "Intercept tool calls; verify user intent with SLM guard.", icon: Target },
  { id: "cove", title: "CoVe Audit", detail: "Multi-stage fact checking via Chain-of-Verification.", icon: CheckCircle2 },
  { id: "dreamcycle", title: "Dreamcycle", detail: "Nightly memory distillation & noise pruning (LanceDB).", icon: Brain },
  { id: "governance", title: "Global Protocol", detail: "Fleet-scale policy injection via YAML/Markdown.", icon: Compass }
];

export function RealityCheckInfographic() {
  return (
    <div className="my-12 p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 border border-white/[0.08] relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {realityStages.map((stage, i) => {
          const Icon = stage.icon;
          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white uppercase tracking-tight">{stage.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed italic">{stage.detail}</p>
                </div>
              </div>
              {i < realityStages.length - 1 && (
                <div className="hidden lg:block absolute top-6 -right-3 w-6 h-px bg-white/10" />
              )}
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/5 pt-8">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Hallucination Rate</div>
          <div className="text-2xl font-black text-emerald-400">-85%</div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Fleet Compliance</div>
          <div className="text-2xl font-black text-cyan-400">96%</div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Context Density</div>
          <div className="text-2xl font-black text-violet-400">4x</div>
        </div>
      </div>
    </div>
  );
}

const hitlStages = [
  { id: "automation", title: "AI Execution", detail: "Agents handle >80% of routine workflows autonomously.", icon: Zap },
  { id: "trigger", title: "Threshold Trigger", detail: "Low confidence (<85%) or high-risk actions trigger pause.", icon: ShieldAlert },
  { id: "human", title: "Human Oversight", detail: "Expert SMEs validate, correct, or override agentic output.", icon: UserCheck },
  { id: "feedback", title: "Feedback Loop", detail: "Human corrections injected back into RAG for local learning.", icon: Layers }
];

export function HITLArchitectureInfographic() {
  return (
    <div className="my-12 p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-6">
          <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">The Escalation Ladder</h4>
          <div className="space-y-4">
            {hitlStages.map((stage, i) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <stage.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{stage.title}</div>
                  <div className="text-[11px] text-slate-500 leading-tight">{stage.detail}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col justify-center gap-6">
          <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
            <div className="text-3xl font-black text-white mb-1">71%</div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">Productivity Gain</div>
            <p className="text-[11px] text-slate-400 leading-relaxed italic">
              Validated shift from &quot;Approval Models&quot; to &quot;Escalation-Only&quot; HITL orchestration in 2026 enterprise environments.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
            <div className="text-3xl font-black text-white mb-1">&gt;80%</div>
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3">Automation Floor</div>
            <p className="text-[11px] text-slate-400 leading-relaxed italic">
              Median autonomous task completion rate when humans transition from &quot;labelers&quot; to &quot;supervisors.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const comparisonMetrics = [
  { label: "Paradigm", graph: "Deterministic Graph", crew: "Role-Based Team", icon: GitBranch },
  { label: "Success Rate", graph: "94% (Complex Cycles)", crew: "78% (Linear Tasks)", icon: Activity },
  { label: "Latency", graph: "22% Lower (Optimized)", crew: "Higher (Reasoning Overload)", icon: Timer },
  { label: "Dev Velocity", graph: "Moderate (High Boilerplate)", crew: "Fast (40% quicker deployment)", icon: Zap }
];

export function FrameworkComparisonInfographic() {
  return (
    <div className="my-12 p-8 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 border border-white/[0.08] relative overflow-hidden">
      <div className="relative z-10">
        <h4 className="text-sm font-mono text-cyan-400 uppercase tracking-[0.2em] mb-8 text-center">2026 Orchestration Trade-off Matrix</h4>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Framework A */}
          <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <GitBranch className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-lg font-black text-white">Graph-Based</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed italic mb-4">
              Best for mission-critical infrastructure with strict state requirements and cyclical logic.
            </p>
            <div className="flex items-center gap-2">
              <div className="px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-[10px] text-cyan-400 font-bold uppercase">Durable Execution</div>
              <div className="px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-[10px] text-cyan-400 font-bold uppercase">Time-Travel Debug</div>
            </div>
          </div>

          {/* Framework B */}
          <div className="p-6 rounded-2xl bg-purple-500/5 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Users2 className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-lg font-black text-white">Role-Based</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed italic mb-4">
              Best for mapping business workflows to human-like team structures with rapid deployment.
            </p>
            <div className="flex items-center gap-2">
              <div className="px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-[10px] text-purple-400 font-bold uppercase">Agent-to-Agent (A2A)</div>
              <div className="px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-[10px] text-purple-400 font-bold uppercase">Native MCP</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {comparisonMetrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-3 gap-4 p-3 rounded-xl border border-white/5 bg-white/[0.01] items-center"
            >
              <div className="flex items-center gap-2">
                <metric.icon className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{metric.label}</span>
              </div>
              <div className="text-[11px] text-cyan-300 font-medium">{metric.graph}</div>
              <div className="text-[11px] text-purple-300 font-medium">{metric.crew}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const harnessNodes = [
  { id: "gemini", name: "Gemini 1.5 Pro", role: "Deep Reasoning", detail: "Long-context architectural mapping & system-wide logic verification.", color: "blue" },
  { id: "claude", name: "Claude 3.5 Sonnet", role: "Rapid Iteration", detail: "State-of-the-art coding velocity, refactoring, and UI implementation.", color: "orange" },
  { id: "openclaw", name: "OpenClaw Gateway", role: "Governance & Memory", detail: "Reality-Check enforcement and Dreamcycle memory distillation.", color: "purple" }
];

export function AIEngineeringHarnessInfographic() {
  return (
    <div className="my-12 p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-orange-500/5 pointer-events-none" />
      <h4 className="text-sm font-mono text-cyan-400 uppercase tracking-[0.2em] mb-10 text-center">The 10x Engineering Harness</h4>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {harnessNodes.map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col items-center text-center group"
          >
            <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-white/10 group-hover:scale-110 transition-transform shadow-lg`}>
              {node.id === 'gemini' && <Brain className="w-6 h-6 text-blue-400" />}
              {node.id === 'claude' && <Zap className="w-6 h-6 text-orange-400" />}
              {node.id === 'openclaw' && <ShieldAlert className="w-6 h-6 text-purple-400" />}
            </div>
            <h5 className="text-white font-bold mb-2">{node.name}</h5>
            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-3">{node.role}</div>
            <p className="text-xs text-slate-400 leading-relaxed italic">{node.detail}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4 text-[10px] font-mono text-slate-500">
        <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Research & Planning</span>
        <div className="hidden md:block w-8 h-px bg-white/10" />
        <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Execution & UI</span>
        <div className="hidden md:block w-8 h-px bg-white/10" />
        <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Security & Persistence</span>
      </div>
    </div>
  );
}

export function MCPNervousSystemInfographic() {
  const mcpStats = [
    { label: "Active Instances", value: "147", icon: Activity },
    { label: "Tool Protocols", value: "200+", icon: Layers },
    { label: "Inter-Agent Latency", value: "<5ms", icon: Timer },
    { label: "Protocol Compliance", value: "100%", icon: CheckCircle2 }
  ];

  return (
    <div className="my-12 p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 border border-white/[0.08] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
      <h4 className="text-sm font-mono text-cyan-400 uppercase tracking-[0.2em] mb-8">MCP: The Agentic Nervous System</h4>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {mcpStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-4 rounded-xl bg-white/5 border border-white/10"
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
            </div>
            <div className="text-2xl font-black text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>
      
      <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-white uppercase tracking-tighter">Unified Context Layer</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          The Model Context Protocol (MCP) standardizes how agents discover, negotiate, and execute tools. By abstracting the tool layer, we allow 147+ agent instances to share a single, verifiable &quot;working memory&quot; without context duplication or logic drift.
        </p>
      </div>
    </div>
  );
}

export function MCPArchitectureInfographic() {
  return (
    <div className="my-12 p-8 rounded-3xl bg-zinc-900/50 border border-white/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-bold text-red-400 uppercase tracking-widest font-mono">
            Legacy: The M*N Problem
          </div>
          <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-dashed border-white/10 opacity-60">
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[1, 2, 3].map(i => <div key={i} className="h-8 rounded bg-white/10 border border-white/10 flex items-center justify-center text-[10px] text-slate-500">Model {i}</div>)}
            </div>
            <div className="space-y-2">
              {[1, 2].map(i => (
                <div key={i} className="flex items-center gap-2 text-[10px] text-red-500/50">
                  <div className="w-full h-px bg-red-500/20" />
                  <div className="flex-shrink-0">Bespoke Integration {i}</div>
                  <div className="w-full h-px bg-red-500/20" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 opacity-40">
              <div className="h-8 rounded bg-white/5 border border-white/5 flex items-center justify-center text-[10px] text-slate-600 italic font-mono">Database</div>
              <div className="h-8 rounded bg-white/5 border border-white/5 flex items-center justify-center text-[10px] text-slate-600 italic font-mono">API</div>
            </div>
          </div>
          <p className="text-xs text-slate-500 italic">Complexity scales exponentially with every new model and tool.</p>
        </div>

        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-400 uppercase tracking-widest font-mono">
            2026: The MCP Standard
          </div>
          <div className="relative space-y-6">
            <div className="flex justify-center gap-4">
              {[1, 2, 3].map(i => <div key={i} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"><Cpu className="w-5 h-5 text-slate-400" /></div>)}
            </div>
            
            <div className="flex items-center justify-center gap-4 py-2 px-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-sm tracking-tighter">
              <Network className="w-4 h-4 animate-pulse" />
              MODEL CONTEXT PROTOCOL
            </div>

            <div className="flex justify-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"><Database className="w-5 h-5 text-slate-400" /></div>
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"><Share2 className="w-5 h-5 text-slate-400" /></div>
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"><Activity className="w-5 h-5 text-slate-400" /></div>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-light">MCP acts as the universal &quot;USB-C&quot; interface, allowing any model to use any tool instantly via standardized schemas.</p>
        </div>
      </div>
    </div>
  );
}

export function CompoundAISystemInfographic() {
  return (
    <div className="my-12 p-8 rounded-3xl bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 border border-white/[0.08] relative overflow-hidden">
      <div className="flex flex-col items-center gap-10 text-left">
        <h4 className="text-sm font-mono text-violet-400 uppercase tracking-[0.2em] text-center">System-Level Performance Stack</h4>
        
        <div className="w-full max-w-2xl space-y-4">
          {/* Level 1: Orchestration */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 relative group hover:border-violet-500/30 transition-all">
            <div className="absolute -top-3 left-6 px-2 py-1 bg-[#0a0a0f] border border-white/10 rounded text-[10px] font-bold text-violet-400 uppercase font-mono">Lead Orchestrator (LLM)</div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
                <Brain className="w-6 h-6 text-violet-400" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-bold text-white tracking-tight">Frontier Reasoning</div>
                <div className="text-[11px] text-slate-500 leading-tight">GPT-5 / Claude 4 level logic for planning and goal decomposition.</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center h-8">
            <ArrowDownRight className="w-6 h-6 text-slate-700" />
          </div>

          {/* Level 2: Task-Specific Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 border-l-cyan-500/50 border-l-2">
              <div className="flex items-center gap-3 mb-3">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">Specialized SLM</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed italic">High-frequency JSON extraction &amp; classification. 90% cost reduction vs LLM.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 border-l-emerald-500/50 border-l-2">
              <div className="flex items-center gap-3 mb-3">
                <Database className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">RAG Engine</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed italic">Vector memory &amp; context retrieval. Prevents model knowledge drift.</p>
            </div>
          </div>

          <div className="flex justify-center h-8">
            <div className="w-px h-full bg-gradient-to-b from-white/10 to-transparent" />
          </div>

          {/* Level 3: Governance */}
          <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-sm font-bold text-white tracking-tight">Governance Layer</div>
                <div className="text-[10px] text-emerald-500/70 font-mono uppercase font-bold">Reality-Check Protocol</div>
              </div>
            </div>
            <div className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase font-mono">Enforced</div>
          </div>
        </div>
      </div>
    </div>
  );
}

