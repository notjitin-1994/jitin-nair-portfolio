'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  ArrowUpRight, 
  Github,
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Layers,
  Boxes,
  ArrowRight,
  Zap,
  TrendingUp,
  Clock,
  Radio,
  Brain,
  Shield,
  Target,
  Search,
  Wrench,
  Bell,
  Download,
  Settings,
  Cpu,
  Database,
  Upload,
  Circle,
  Mail,
  Phone,
  X,
  Check,
  BookOpen,
  Activity,
  Server,
  AlertTriangle,
  BarChart3,
  Workflow,
  Map,
  Users,
  MessageSquare,
  FolderKanban,
  Send
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  AreaChart,
  Area
} from 'recharts';

interface TechCategory {
  name: string;
  items: string[];
  color: string;
}

interface Project {
  name: string;
  shortName?: string;
  technologies: string[];
  techCategories?: TechCategory[];
  description: string;
  whatItDoes?: string;
  howItWorks?: string;
  keyInnovations?: string[];
  processFlow?: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  metrics?: {
    label: string;
    value: string;
    unit?: string;
    trend?: 'up' | 'down' | 'neutral';
  }[];
  dataViz?: {
    type: 'gauge' | 'progress' | 'bar' | 'area';
    data?: any[];
    value?: number;
    max?: number;
    label: string;
    color?: string;
  }[];
}

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    if (value.includes('%') || value.includes('ms')) return Math.round(latest);
    return latest.toFixed(1);
  });
  
  const [displayValue, setDisplayValue] = useState('0');
  
  useEffect(() => {
    const controls = rounded.on('change', (v) => setDisplayValue(String(v)));
    count.set(numericValue);
    return controls;
  }, [count, numericValue, rounded]);

  return <span className="font-mono font-bold">{displayValue}{suffix}</span>;
}

function CircularGauge({ value, max = 100, size = 60, strokeWidth = 6, color = '#22d3ee', label }: any) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min(value / max, 1);
  const dashoffset = circumference - progress * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={strokeWidth} />
          <motion.circle 
            cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
            strokeLinecap="round" strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white">{Math.round(progress * 100)}%</span>
        </div>
      </div>
      <span className="text-[9px] text-slate-400 uppercase tracking-wider">{label}</span>
    </div>
  );
}

function MiniBarChart({ data, color = '#22d3ee' }: { data: { name: string; value: number }[]; color?: string }) {
  return (
    <div className="h-16 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Bar dataKey="value" fill={color} radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function MiniAreaChart({ data, color = '#22d3ee' }: { data: { name: string; value: number }[]; color?: string }) {
  return (
    <div className="h-16 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="value" stroke={color} fill={`url(#grad-${color})`} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function ProgressBar({ value, max = 100, color = '#22d3ee', label, sublabel }: any) {
  const progress = Math.min(value / max, 1);
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] text-slate-300">{label}</span>
        <span className="text-[10px] font-mono text-cyan-400">{value}{max === 100 ? '%' : '+'}</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ backgroundColor: color }}
          initial={{ width: 0 }} animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      {sublabel && <span className="text-[9px] text-slate-500 mt-0.5 block">{sublabel}</span>}
    </div>
  );
}

function TechTag({ icon, label }: any) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[9px] text-slate-300">
      <span className="w-3 h-3 flex items-center justify-center">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function ProcessStep({ step, index, isLast }: any) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-1.5">
        <span className="w-4 h-4 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center text-[8px] text-cyan-400 font-mono">
          {index + 1}
        </span>
        <span className="text-[9px] text-slate-400 whitespace-nowrap">{step}</span>
      </div>
      {!isLast && <ArrowRight className="w-3 h-3 text-slate-600 mx-0.5" />}
    </div>
  );
}

// Access Request Modal Component
function AccessRequestModal({ isOpen, onClose, projectName }: { isOpen: boolean; onClose: () => void; projectName: string }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
    // Close modal after showing success
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setEmail('');
      setPhone('');
    }, 2500);
  };

  return (
    <>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal - Centered with flexbox */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md pointer-events-auto"
            >
              <div className="relative bg-[#0d0d12] border border-white/[0.1] rounded-2xl p-6 shadow-2xl">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {!isSubmitted ? (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-teal-400/10 border border-cyan-400/20 flex items-center justify-center">
                      <Shield className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Request Access</h3>
                    <p className="text-sm text-slate-400">
                      Enter your details to request access to <span className="text-cyan-400">{projectName}</span>
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 px-4 bg-gradient-to-r from-cyan-400 to-teal-400 text-black font-semibold rounded-lg hover:from-cyan-300 hover:to-teal-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                          />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Request Access</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 flex items-center justify-center"
                  >
                    <Check className="w-10 h-10 text-black" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">Request Received!</h3>
                  <p className="text-sm text-slate-400">We&apos;ll get back to you shortly.</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
        </>
      )}
    </>
  );
}

function TechStackInfographic({ categories }: { categories: TechCategory[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {categories.map((cat, idx) => (
        <motion.div
          key={cat.name}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          className="p-2.5 rounded-lg border border-white/[0.08] bg-white/[0.02]"
        >
          <div className="flex items-center gap-1.5 mb-2">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: cat.color, boxShadow: `0 0 6px ${cat.color}` }}
            />
            <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: cat.color }}>
              {cat.name}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {cat.items.map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 + i * 0.05 }}
                className="px-1.5 py-0.5 text-[8px] rounded bg-white/5 text-slate-300 border border-white/5"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ArchitectureFlow({ project }: { project: Project }) {
  // Map agent names to Lucide icons
  const getIcon = (name: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      "Ingest": <Radio className="w-4 h-4" />,
      "Regime": <Brain className="w-4 h-4" />,
      "Strategy": <Zap className="w-4 h-4" />,
      "Risk": <Shield className="w-4 h-4" />,
      "Execute": <Target className="w-4 h-4" />,
      "Analyze": <Search className="w-4 h-4" />,
      "Predict": <Sparkles className="w-4 h-4" />,
      "Remediate": <Wrench className="w-4 h-4" />,
      "Alert": <Bell className="w-4 h-4" />,
      "Input": <Download className="w-4 h-4" />,
      "Process": <Settings className="w-4 h-4" />,
      "ML": <Cpu className="w-4 h-4" />,
      "Store": <Database className="w-4 h-4" />,
      "Output": <Upload className="w-4 h-4" />,
      "Discover": <Map className="w-4 h-4" />,
      "Connect": <Users className="w-4 h-4" />,
      "Collaborate": <MessageSquare className="w-4 h-4" />,
      "Manage": <FolderKanban className="w-4 h-4" />,
      "Deliver": <Send className="w-4 h-4" />,
    };
    return iconMap[name] || <Circle className="w-4 h-4" />;
  };

  // Define agent flow based on project
  const getAgentFlow = () => {
    if (project.name.includes("Predator")) {
      return [
        { name: "Ingest", tech: "WebSocket/Redis", color: "#22d3ee" },
        { name: "Regime", tech: "Polars/Numba", color: "#06b6d4" },
        { name: "Strategy", tech: "LangGraph", color: "#67e8f9" },
        { name: "Risk", tech: "Kelly/PoS", color: "#5eead4" },
        { name: "Execute", tech: "CCXT", color: "#2dd4bf" }
      ];
    }
    if (project.name.includes("Agency")) {
      return [
        { name: "Ingest", tech: "Webhook/API", color: "#22d3ee" },
        { name: "Route", tech: "LangGraph", color: "#06b6d4" },
        { name: "Execute", tech: "MCP Tools", color: "#67e8f9" },
        { name: "Sync", tech: "Redis Bus", color: "#5eead4" },
        { name: "Output", tech: "Multi-Channel", color: "#2dd4bf" }
      ];
    }
    if (project.name.includes("Reality")) {
      return [
        { name: "Generate", tech: "Agent Output", color: "#22d3ee" },
        { name: "Verify", tech: "Truth Check", color: "#06b6d4" },
        { name: "Validate", tech: "Source Cite", color: "#67e8f9" },
        { name: "Log", tech: "Audit Trail", color: "#5eead4" },
        { name: "Enforce", tech: "Compliance", color: "#2dd4bf" }
      ];
    }
    if (project.name.includes("Smarslate")) {
      return [
        { name: "Polaris", tech: "Discovery", color: "#22d3ee" },
        { name: "Constellation", tech: "Mapping", color: "#06b6d4" },
        { name: "Nova", tech: "Generation", color: "#67e8f9" },
        { name: "Orbit+Nebula", tech: "Delivery", color: "#5eead4" },
        { name: "Spectrum", tech: "Analytics", color: "#2dd4bf" }
      ];
    }
    if (project.name.includes("RevOS")) {
      return [
        { name: "Intake", tech: "Vehicle In", color: "#22d3ee" },
        { name: "Plan", tech: "Service", color: "#06b6d4" },
        { name: "Execute", tech: "Mechanic", color: "#67e8f9" },
        { name: "QC", tech: "Quality", color: "#5eead4" },
        { name: "Deliver", tech: "Customer", color: "#2dd4bf" }
      ];
    }
    if (project.name.includes("Commune")) {
      return [
        { name: "Discover", tech: "Map/Tags", color: "#22d3ee" },
        { name: "Connect", tech: "Network", color: "#06b6d4" },
        { name: "Collaborate", tech: "Workspace", color: "#67e8f9" },
        { name: "Manage", tech: "Project", color: "#5eead4" },
        { name: "Deliver", tech: "Complete", color: "#2dd4bf" }
      ];
    }
    return [
      { name: "Input", tech: "API/Web", color: "#22d3ee" },
      { name: "Process", tech: "Core Logic", color: "#06b6d4" },
      { name: "ML", tech: "AI/Models", color: "#67e8f9" },
      { name: "Store", tech: "Database", color: "#5eead4" },
      { name: "Output", tech: "UI/API", color: "#2dd4bf" }
    ];
  };
  const agents = getAgentFlow();

  // Generate impressive AI/ML description based on project
  const getImpressiveDescription = () => {
    if (project.name.includes("Predator")) {
      return "Production-grade multi-agent trading system featuring regime-aware architecture with 85-90% ML accuracy targets. Numba-optimized calculations deliver 10x performance gains. Adaptive algorithms utilize MAD-based dynamic thresholds, Choppiness Index filtering, and Kaufman Efficiency Ratio for trend validation. Full MLOps stack including model registry with Champion/Challenger gates, PSI drift detection, ADWIN concept drift monitoring, and sub-millisecond feature store. Kelly criterion position sizing with ATR-based risk management achieves 2:1 reward/risk ratios.";
    }
    if (project.name.includes("Agency")) {
      return "Production-grade multi-agent orchestration platform managing 30+ specialized AI agents through MCP (Model Context Protocol). LangGraph state machines coordinate complex cross-domain workflows across GitHub, Gmail, Slack, Telegram, WhatsApp, and IoT devices. Vector-based semantic memory enables agents to share context and learn from interactions. Real-time event streaming via Redis with sub-second latency. Self-improving skill system allows agents to autonomously expand capabilities through the skill-creator module.";
    }
    if (project.name.includes("Reality")) {
      return "Distributed governance platform enforcing truth-only protocols across 147 AI agents. Automated policy injection modifies AGENTS.md system prompts at scale, achieving 96% fleet coverage (141 agents) in under 3 minutes. Immutable VIOLATIONS.log provides full audit trails. Real-time compliance monitoring detects fictional data generation before it reaches users. Zero-configuration enforcement ensures new agents automatically inherit truth-verification mandates.";
    }
    if (project.name.includes("Smarslate")) {
      return "Human-in-the-Loop (HITL) AI learning ecosystem automating the entire L\u0026D lifecycle from discovery to delivery. Six integrated modules—Polaris (automated discovery), Constellation (AI instructional design), Nova (content development), Orbit (AI-powered LMS), Nebula (AI Tutor), and Spectrum (analytics)—form a unified pipeline. Every AI output passes through human validation gates, ensuring quality while achieving 10x throughput. Multi-provider AI orchestration with automated stakeholder interviews, Bloom's Taxonomy-aligned design frameworks, and adaptive learning paths with seamless human escalation.";
    }
    if (project.name.includes("RevOS")) {
      return "Automotive workshop management platform digitizing complete garage operations through intelligent job card lifecycle management. Built with Next.js 14, Supabase PostgreSQL, and TanStack Query for real-time data synchronization. Features end-to-end service tracking from vehicle intake to customer delivery, auto-save inventory management with low-stock alerts, comprehensive vehicle service history for predictive maintenance, and role-based access control for multi-level garage hierarchies. AI-powered analytics dashboard provides workshop optimization insights.";
    }
    if (project.name.includes("Commune")) {
      return "Privacy-first community platform enabling anonymous collaboration through map-based location tagging and WhatsApp-style workspaces. Built with Next.js 14, Leaflet maps, and Supabase Realtime. Features tiered account architecture (Paid/Free Broker, Paid User), anonymous workspace participation without identity exposure, project management with template-based checklists, and role-based permissions. Zustand state management with Framer Motion animations delivers fluid user experience. No personal identifiers exposed between members—complete privacy preservation.";
    }
    return "AI-native application architecture with intelligent orchestration. Advanced ML pipelines with automated feature engineering and model versioning. Production monitoring with p50/p95/p99 latency tracking and confidence distribution analytics. Drift detection and automated retraining ensure model reliability at scale.";
  };

  return (
    <div className="space-y-3">
      {/* Agent Flow - Center-Aligned Pipeline */}
      <div className="relative flex justify-center">
        <div className="flex items-center">
          {agents.map((agent, i) => (
            <div key={agent.name} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center"
              >
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-1"
                  style={{ background: `${agent.color}15`, border: `1px solid ${agent.color}40`, color: agent.color }}
                >
                  {getIcon(agent.name)}
                </div>
                <span className="text-[8px] font-medium text-slate-300">{agent.name}</span>
                <span className="text-[7px] text-slate-500">{agent.tech}</span>
              </motion.div>
              {i < agents.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: i * 0.08 + 0.04, duration: 0.2 }}
                  className="w-6 h-px mx-1 self-center"
                  style={{ background: 'linear-gradient(90deg, #22d3ee40, #06b6d440)' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Core Logic Block */}
      <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08]">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="text-[8px] font-semibold text-cyan-400 uppercase tracking-wider">Core Logic</span>
        </div>
        <div className="space-y-1">
          {project.keyInnovations?.slice(0, 3).map((innovation, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <span className="text-[8px] text-cyan-400 mt-0.5">→</span>
              <span className="text-[8px] text-slate-300 line-clamp-1">{innovation}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI/ML Description Block - Replaces Tech Stack */}
      <div className="p-2.5 rounded-lg bg-gradient-to-br from-cyan-400/[0.08] to-teal-400/[0.05] border border-white/[0.08]">
        <div className="flex items-center gap-1.5 mb-2">
          <Cpu className="w-3 h-3 text-cyan-400" />
          <span className="text-[8px] font-semibold text-cyan-400 uppercase tracking-wider">AI & Machine Learning</span>
        </div>
        <p className="text-[9px] text-slate-300 leading-relaxed">{getImpressiveDescription()}</p>
      </div>
    </div>
  );
}

function ProductCard({ project, index, isFlipped, onFlip }: any) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGithubHovered, setIsGithubHovered] = useState(false);
  const cardHeight = "h-[560px]";

  return (
    <>
      <motion.div
        className={`relative ${cardHeight} cursor-pointer group`}
        style={{ perspective: '1200px' }}
        onClick={onFlip}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="absolute -inset-2 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.2) 0%, transparent 70%)', filter: 'blur(20px)' }}
          animate={{ scale: isHovered ? 1.05 : 1, opacity: isHovered ? 0.8 : 0 }}
          transition={{ duration: 0.4 }}
        />

        <motion.div
          className="relative w-full h-full"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* FRONT SIDE */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0d0d12] transition-all duration-300 hover:border-cyan-500/20" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
            {/* Background image for Predator card */}
            {project.name.includes("Predator") && (
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'url(/predator-bg.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(8px)'
                }}
              />
            )}
            {/* Background image for Reality card */}
            {project.name.includes("Reality") && (
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'url(/reality-bg.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(8px)'
                }}
              />
            )}
            {project.name.includes("Smarslate") && (
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'url(/smarslate-bg.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(8px)'
                }}
              />
            )}
            {project.name.includes("RevOS") && (
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'url(/revos-bg.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(8px)'
                }}
              />
            )}
            {project.name.includes("Commune") && (
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'url(/commune-bg.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(8px)'
                }}
              />
            )}
            <div className="relative z-10 h-full flex flex-col p-6">
              <div className="flex items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-400/15 border border-cyan-400/25 flex items-center justify-center">
                    {project.name.includes("Predator") ? (
                      <Target className="w-5 h-5 text-cyan-400" />
                    ) : project.name.includes("Reality") ? (
                      <Shield className="w-5 h-5 text-cyan-400" />
                    ) : project.name.includes("Smarslate") ? (
                      <BookOpen className="w-5 h-5 text-cyan-400" />
                    ) : project.name.includes("RevOS") ? (
                      <Wrench className="w-5 h-5 text-cyan-400" />
                    ) : project.name.includes("Commune") ? (
                      <Users className="w-5 h-5 text-cyan-400" />
                    ) : (
                      <Layers className="w-5 h-5 text-cyan-400" />
                    )}
                  </div>
                  <span className="text-slate-500 font-mono text-xs">{String(index + 1).padStart(2, '0')}</span>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white leading-tight mb-3">{project.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-4">{project.description}</p>

                <div className="mb-3">
                  <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Process Flow</span>
                  <div className="flex flex-wrap items-center gap-y-0.5">
                    {project.processFlow?.slice(0, 4).map((step: string, i: number) => (
                      <ProcessStep key={i} step={step} index={i} isLast={i === Math.min(project.processFlow!.length, 4) - 1} />
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Tech Stack</span>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech: string, i: number) => (
                      <span key={i} className="px-1.5 py-0.5 text-[7px] font-medium rounded whitespace-nowrap" style={{ background: 'rgba(34, 211, 238, 0.06)', color: '#22d3ee', border: '1px solid rgba(34, 211, 238, 0.15)' }}>{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto">
                  <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Key Features</span>
                  <div className="flex flex-wrap gap-1">
                    {project.features?.slice(0, 5).map((feature: string, i: number) => (
                      <span key={i} className="px-1.5 py-0.5 text-[8px] rounded bg-white/5 border border-white/10 text-slate-300">{feature}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                <span className="text-slate-500 text-xs flex items-center gap-1.5">
                  <motion.span animate={{ x: isHovered ? 3 : 0 }} transition={{ duration: 0.2 }}>→</motion.span>
                  Click to explore
                </span>                <div className="flex gap-1.5">
                  {project.githubUrl && (
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsModalOpen(true);
                      }}
                      onMouseEnter={() => setIsGithubHovered(true)}
                      onMouseLeave={() => setIsGithubHovered(false)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300"
                      animate={{
                        backgroundColor: isGithubHovered 
                          ? (project.name.includes("Reality") ? '#22d3ee' : '#6e5494')
                          : 'rgba(255,255,255,0.05)',
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {project.name.includes("Reality") ? (
                        <ArrowUpRight 
                          className="w-3 h-3 transition-colors duration-300" 
                          style={{ color: isGithubHovered ? '#0a0a0f' : '#94a3b8' }}
                        />
                      ) : (
                        <Github 
                          className="w-3 h-3 transition-colors duration-300" 
                          style={{ color: isGithubHovered ? '#ffffff' : '#94a3b8' }}
                        />
                      )}
                    </motion.button>
                  )}
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      onMouseEnter={() => setIsGithubHovered(true)}
                      onMouseLeave={() => setIsGithubHovered(false)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300"
                      animate={{
                        backgroundColor: isGithubHovered ? '#22d3ee' : 'rgba(255,255,255,0.05)',
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowUpRight 
                        className="w-3 h-3 transition-colors duration-300" 
                        style={{ color: isGithubHovered ? '#0a0a0f' : '#94a3b8' }}
                      />
                    </motion.a>
                  )}
                </div>
              </div>            </div>

            <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
              <div className="absolute top-4 left-4 w-6 h-px bg-gradient-to-r from-cyan-400/50 to-transparent" />
              <div className="absolute top-4 left-4 w-px h-6 bg-gradient-to-b from-cyan-400/50 to-transparent" />
            </div>
          </div>

        {/* BACK SIDE - Compact Architecture View */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0d0d12] transition-all duration-300 hover:border-cyan-400/20" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          {/* Background image for Predator card */}
          {project.name.includes("Predator") && (
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'url(/predator-bg.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(8px)'
              }}
            />
          )}
          {/* Background image for Agency card */}
          {project.name.includes("Agency") && (
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'url(/agency-bg.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(8px)'
              }}
            />
          )}
          {/* Background image for Reality card */}
          {project.name.includes("Reality") && (
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'url(/reality-bg.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(8px)'
              }}
            />
          )}
          {/* Background image for Smarslate card */}
          {project.name.includes("Smarslate") && (
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'url(/smarslate-bg.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(8px)'
              }}
            />
          )}
          {/* Background image for RevOS card */}
          {project.name.includes("RevOS") && (
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'url(/revos-bg.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(8px)'
              }}
            />
          )}
          {/* Background image for Commune card */}
          {project.name.includes("Commune") && (
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'url(/commune-bg.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(8px)'
              }}
            />
          )}
          
          <div className="relative z-10 h-full flex flex-col p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-400 font-mono text-[9px] uppercase tracking-widest">Architecture</span>
              </div>
              <span className="text-[9px] text-slate-500">{project.shortName || project.name}</span>
            </div>

            {/* Architecture Flow - Main Content */}
            <div className="flex-1 overflow-hidden">
              <ArchitectureFlow project={project} />
            </div>

            {/* Compact Metrics Row */}
            <div className="grid grid-cols-4 gap-2 my-3 py-3 border-y border-white/[0.06]">
              {project.metrics?.slice(0, 4).map((metric: any, i: number) => (
                <div key={i} className="text-center">
                  <div className="text-[11px] font-mono font-bold text-cyan-400">{metric.value}{metric.unit}</div>
                  <div className="text-[7px] text-slate-500 uppercase">{metric.label}</div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-medium relative z-20 pointer-events-auto bg-cyan-400/15 text-cyan-400 border border-cyan-400/40"
              >
                <BookOpen className="w-3 h-3" />
                <span>Learn More</span>
              </motion.button>
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-medium transition-all hover:scale-105 bg-cyan-400/15 text-cyan-400 border border-cyan-400/30"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Live</span>
                </a>
              )}
            </div>

            <div className="mt-2 text-center">
              <span className="text-slate-600 text-[9px]">Click to flip back</span>
            </div>
          </div>
        </div>
      </motion.div>
      </motion.div>

      {/* Access Request Modal */}
      <AccessRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        projectName={project.name}
      />
    </>
  );
}

const projectsData: Project[] = [
  {
    name: "Predator Scalping System",
    shortName: "Predator",
    technologies: [
      "Python 3.13", "LangGraph", "TimescaleDB", "Polars", "Pandas", "NumPy", "Numba",
      "CCXT", "WebSocket", "FastAPI", "Streamlit", "Docker", "Redis",
      "PostgreSQL", "scikit-learn", "statsmodels", "ADWIN", "PSI Drift Detection"
    ],
    techCategories: [
      { name: "Core Engine", items: ["Python 3.13", "Numba", "Polars"], color: "#22d3ee" },
      { name: "Multi-Agent", items: ["LangGraph", "5 Specialized Agents"], color: "#a78bfa" },
      { name: "Data Layer", items: ["TimescaleDB", "Redis", "PostgreSQL"], color: "#f472b6" },
      { name: "ML/Ops", items: ["ADWIN", "PSI", "Model Registry"], color: "#22c55e" }
    ],
    description: "Autonomous XAU/USD scalping engine deploying 5 specialized AI agents that detect market regimes, predict micro-movements, and execute sub-50ms trades with institutional-grade risk management.",
    whatItDoes: "Predator is a fully autonomous gold trading system that scalps XAU/USD by detecting market regimes (trending, ranging, volatile) and adapting its strategy in real-time. It processes tick data through 5 specialized agents, each handling a specific layer of the trading pipeline—from ingestion to execution.",
    howItWorks: "The system uses adaptive regime detection (v2 algorithm) with MAD-based thresholds, Choppiness Index, and Kaufman's Efficiency Ratio to classify market conditions. TimescaleDB stores time-series data with point-in-time correctness. A Champion/Challenger model registry enables A/B testing of algorithms. Drift detection (PSI, ADWIN) monitors for concept drift and triggers retraining when market conditions shift.",
    keyInnovations: [
      "Adaptive Regime Detection v2 with hysteresis filtering",
      "Champion/Challenger model registry with statistical testing",
      "Real-time drift detection (PSI, ADWIN, KS-test)",
      "Online/offline feature store with point-in-time correctness",
      "10x speedup via Numba JIT compilation",
      "Circuit breaker with 3-state automatic recovery"
    ],
    processFlow: [
      "Tick Data Ingestion (WebSocket/OANDA)",
      "Regime Classification (ADX + CHOP + ER)",
      "Strategy Selection (Trend/Rangel/Reversal)",
      "Position Sizing (Kelly Criterion)",
      "Execution (Sub-50ms via CCXT)",
      "Drift Monitoring (PSI/ADWIN)"
    ],
    features: [
      "<50ms execution latency (p99)",
      "85-90% regime detection accuracy",
      "Monte Carlo backtesting framework",
      "MLOps pipeline with model versioning",
      "Real-time Streamlit dashboard",
      "Self-healing circuit breaker"
    ],
    githubUrl: "https://github.com/jitinnair1",
    metrics: [
      { label: "Execution Latency", value: "50", unit: "ms", trend: "down" },
      { label: "Win Rate", value: "67", unit: "%", trend: "up" },
      { label: "Sharpe Ratio", value: "2.4", trend: "up" },
      { label: "Backtest Trades", value: "50000", unit: "+", trend: "neutral" }
    ],
    dataViz: [
      { type: "gauge", value: 67, max: 100, label: "Win Rate", color: "#22d3ee" },
      { type: "progress", value: 2.4, label: "Sharpe Ratio", color: "#a78bfa" },
      { type: "progress", value: 50, label: "Latency (ms)", color: "#f472b6" }
    ]
  },
  {
    name: "AI Agency Ops",
    shortName: "Agency",
    technologies: [
      "Claude", "Google Gemini", "ChatGPT", "Kimi", "Ollama", "Qwen 3.5",
      "Python", "FastAPI", "LangGraph", "Redis", "Model Context Protocols",
      "Telegram API", "WhatsApp API", "GitHub API", "Slack API"
    ],
    techCategories: [
      { name: "LLM Suite", items: ["Claude", "Gemini", "ChatGPT", "Kimi", "Qwen 3.5"], color: "#22d3ee" },
      { name: "Orchestration", items: ["LangGraph", "FastAPI", "Python"], color: "#2dd4bf" },
      { name: "Integrations", items: ["GitHub", "Slack", "Telegram", "WhatsApp"], color: "#5eead4" },
      { name: "Context Management", items: ["Redis", "MCP", "Ollama"], color: "#99f6e4" }
    ],
    description: "Unified multi-agent orchestration platform managing 30+ specialized AI agents—from code automation and content generation to IoT control and knowledge management—with seamless cross-agent collaboration.",
    whatItDoes: "AI Agency Ops is a comprehensive multi-agent platform that orchestrates 30+ specialized AI agents across diverse domains. From automated GitHub issue resolution and Gmail/Calendar management to IoT device control, content summarization, and image generation—each agent operates autonomously yet collaborates through a shared MCP (Model Context Protocol) bus. The platform enables complex cross-domain workflows like: auto-resolving GitHub issues → generating fix summaries → posting to Slack → updating project documentation in Obsidian.",
    howItWorks: "The platform uses LangGraph for agent orchestration with a central MCP (Model Context Protocol) hub enabling inter-agent communication. Each specialized agent (gh-issues, gog, himalaya, nano-banana-pro, summarize, wacli, etc.) exposes standardized tools via FastAPI endpoints. Redis Streams handle async event routing between agents. The system supports both reactive triggers (incoming GitHub webhook → auto-fix) and proactive scheduling (daily email summaries, blog monitoring). Agents share context through PostgreSQL with vector embeddings for semantic memory.",
    keyInnovations: [
      "Model Context Protocols for cross-agent tool sharing",
      "LangGraph state machines for complex multi-step workflows",
      "Autonomous agent spawning via skill-creator module",
      "Vector memory system for agent context persistence",
      "Real-time event bus with Redis Streams",
      "Unified credential management via 1Password integration"
    ],
    processFlow: [
      "Intent Recognition (NLP routing)",
      "Agent Selection (Capability matching)",
      "Context Retrieval (Vector memory)",
      "Tool Execution (MCP calls)",
      "Cross-Agent Coordination (LangGraph)",
      "Response Synthesis (Multi-modal output)"
    ],
    features: [
      "30+ specialized autonomous agents",
      "Cross-agent workflow orchestration",
      "Model Context Protocols",
      "Context Management",
      "Real-time multi-channel integration",
      "Unified observability dashboard",
      "Human-in-the-loop approvals"
    ],
    githubUrl: "https://github.com/jitinnair1",
    metrics: [
      { label: "Active Agents", value: "32", unit: "", trend: "up" },
      { label: "Daily Tasks", value: "500", unit: "+", trend: "up" },
      { label: "Success Rate", value: "94", unit: "%", trend: "up" },
      { label: "Avg Latency", value: "850", unit: "ms", trend: "down" }
    ],
    dataViz: [
      { type: "gauge", value: 94, max: 100, label: "Success Rate", color: "#22d3ee" },
      { type: "progress", value: 32, label: "Active Agents", color: "#2dd4bf" },
      { type: "progress", value: 500, label: "Daily Tasks", color: "#5eead4" }
    ]
  },
  {
    name: "AI-First Learning Management (smarslate.io)",
    technologies: ["Next.js 15", "TypeScript", "Supabase", "ChatGPT", "LangChain", "SCORM/xAPI"],
    description: "Enterprise learning platform with AI-generated personalized training pathways.",
    processFlow: ["Skills Assessment", "AI Content Generation", "Personalized Pathway", "Progress Tracking", "Certification"],
    features: ["AI content generation", "Competency analytics", "Adaptive learning paths", "SCORM/xAPI compliance", "Multi-tenant SaaS"],
    liveUrl: "https://smarslate.io",
    metrics: [
      { label: "Content Generated", value: "10000", unit: "+", trend: "up" },
      { label: "Learner Engagement", value: "89", unit: "%", trend: "up" },
      { label: "Completion Rate", value: "78", unit: "%", trend: "up" }
    ],
    dataViz: [
      { type: "gauge", value: 78, max: 100, label: "Completion", color: "#22d3ee" },
      { type: "progress", value: 89, label: "Engagement", color: "#a78bfa" },
      { type: "progress", value: 40, label: "Time Saved", color: "#22c55e" }
    ]
  },
  {
    name: "Enterprise AI Verification Framework",
    technologies: ["RAG", "CoVe", "Pydantic", "Python", "Pinecone", "FastAPI"],
    description: "Production safety system ensuring AI output reliability through multi-layer Chain-of-Verification (CoVe).",
    processFlow: ["LLM Generation", "Claim Extraction", "Multi-Source Verification", "Confidence Scoring", "Human Review Queue"],
    features: ["Chain-of-Verification", "Multi-source validation", "Hallucination detection", "Confidence scoring", "Audit trails"],
    githubUrl: "https://github.com/jitinnair1",
    metrics: [
      { label: "Accuracy", value: "95", unit: "%+", trend: "up" },
      { label: "Hallucinations Caught", value: "99.2", unit: "%", trend: "up" },
      { label: "Verification Time", value: "150", unit: "ms", trend: "down" }
    ],
    dataViz: [
      { type: "gauge", value: 95, max: 100, label: "Accuracy", color: "#22c55e" },
      { type: "gauge", value: 99.2, max: 100, label: "Detection", color: "#22d3ee" },
      { type: "progress", value: 150, label: "Latency (ms)", color: "#a78bfa" }
    ]
  },
  {
    name: "Multi-Tenant AI Service Platform (glitchzero.com)",
    technologies: ["Multi-Agent", "LangGraph", "Next.js", "PostgreSQL", "Stripe API", "Docker Swarm"],
    description: "White-label AI infrastructure powering 12+ client organizations with isolated tenant environments.",
    processFlow: ["Tenant Onboarding", "Resource Provisioning", "Agent Deployment", "Usage Tracking", "Automated Billing"],
    features: ["Isolated tenant architecture", "Custom agent orchestration", "Usage analytics portals", "Automated billing", "White-label branding"],
    liveUrl: "https://glitchzero.com",
    metrics: [
      { label: "Active Tenants", value: "12", unit: "+", trend: "up" },
      { label: "API Uptime", value: "99.95", unit: "%", trend: "neutral" },
      { label: "Revenue Growth", value: "340", unit: "%", trend: "up" }
    ],
    dataViz: [
      { type: "progress", value: 12, label: "Tenants", color: "#22d3ee" },
      { type: "gauge", value: 99.95, max: 100, label: "Uptime", color: "#22c55e" },
      { type: "progress", value: 340, label: "Growth %", color: "#a78bfa" }
    ]
  },
  {
    name: "Intelligent Process Automation",
    technologies: ["Python", "Playwright", "Gradio", "Docker", "ChatGPT", "Browser-Use"],
    description: "Visual workflow automation platform enabling non-technical teams to deploy browser-based AI agents.",
    processFlow: ["Visual Workflow Design", "Agent Compilation", "Browser Execution", "Result Capture", "Audit Logging"],
    features: ["No-code workflow builder", "Multi-LLM integration", "Visual session capture", "Self-healing selectors", "Audit trail logging"],
    githubUrl: "https://github.com/jitinnair1",
    metrics: [
      { label: "Workflows Executed", value: "100000", unit: "+", trend: "up" },
      { label: "Success Rate", value: "98.5", unit: "%", trend: "up" },
      { label: "Time Saved", value: "12000", unit: " hrs", trend: "up" }
    ],
    dataViz: [
      { type: "gauge", value: 98.5, max: 100, label: "Success Rate", color: "#22c55e" },
      { type: "progress", value: 100000, label: "Executions", color: "#22d3ee" },
      { type: "progress", value: 12000, label: "Hours Saved", color: "#a78bfa" }
    ]
  }
];

interface DesktopProductsProps {
  projects: Project[];
}

export function DesktopProducts({ projects }: DesktopProductsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  const updateCardsPerView = useCallback(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width >= 1536) return 3;
      if (width >= 1280) return 2;
      return 2;
    }
    return 2;
  }, []);

  const [cardsPerView, setCardsPerView] = useState(updateCardsPerView);

  useEffect(() => {
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, [updateCardsPerView]);

  const maxIndex = Math.max(0, projects.length - cardsPerView);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    setFlippedCards(new Set());
  }, [maxIndex]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    setFlippedCards(new Set());
  }, []);

  const handleFlip = useCallback((index: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) newSet.delete(index);
      else newSet.add(index);
      return newSet;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  const visibleProjects = projects.slice(currentIndex, currentIndex + cardsPerView);

  const getGridClasses = () => {
    return "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6";
  };

  return (
    <section id="projects" className="py-11 lg:py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-cyan-400 font-mono text-sm tracking-[0.2em] uppercase mb-4"
          >
            Featured Deliverables
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Production <span className="text-cyan-400">Systems</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 max-w-2xl text-lg"
          >
            Enterprise-grade implementations spanning algorithmic trading, multi-agent orchestration, browser automation, and AI infrastructure tooling.
          </motion.p>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Desktop Navigation Arrows */}
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-20 w-12 h-12 rounded-full bg-surface/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 hidden xl:flex"
            aria-label="Previous projects"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-20 w-12 h-12 rounded-full bg-surface/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 hidden xl:flex"
            aria-label="Next projects"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Grid */}
          <div className="overflow-hidden px-4">
            <motion.div
              className={getGridClasses()}
              layout
            >
              <AnimatePresence mode="popLayout">
                {visibleProjects.map((project, i) => (
                  <motion.div
                    key={project.name}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <ProductCard
                      project={project}
                      index={currentIndex + i}
                      isFlipped={flippedCards.has(currentIndex + i)}
                      onFlip={() => handleFlip(currentIndex + i)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-between items-center mb-4 xl:hidden">
            <button onClick={goToPrev} disabled={currentIndex === 0} className="w-10 h-10 rounded-full bg-surface/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-all disabled:opacity-30"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={goToNext} disabled={currentIndex >= maxIndex} className="w-10 h-10 rounded-full bg-surface/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-all disabled:opacity-30"><ChevronRight className="w-5 h-5" /></button>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center items-center gap-3 mt-8">
            <span className="text-slate-500 text-sm font-mono">
              {String(currentIndex + 1).padStart(2, '0')} — {String(Math.min(currentIndex + cardsPerView, projects.length)).padStart(2, '0')} of {String(projects.length).padStart(2, '0')}
            </span>
            <div className="flex gap-2 ml-4">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentIndex(i); setFlippedCards(new Set()); }}
                  className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-600'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Keyboard Hint */}
          <div className="text-center mt-6">
            <div className="inline-flex items-center gap-4 text-slate-500 text-sm">
              <span className="flex items-center gap-2">
                <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs">←</kbd>
                <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs">→</kbd>
                <span>Navigate</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-2">
                <span className="text-cyan-400">Click cards</span>
                <span>to flip</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DesktopProducts;