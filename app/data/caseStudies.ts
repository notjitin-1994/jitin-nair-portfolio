export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  category: string;
  thumbnail: string;
  challenge: string;
  solution: string;
  fullDescription: string;
  results: { metric: string; value: string; context?: string }[];
  technologies: string[];
  duration: string;
  testimonial?: { quote: string; author: string; role: string; company: string };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "predator-trading-system",
    title: "Predator Scalping System",
    client: "Independent Project",
    industry: "FinTech",
    category: "AI Automation",
    thumbnail: "/projects/predator-thumb.jpg",
    challenge: "Gold (XAU/USD) markets demand sub-50ms execution with adaptive regime detection. Manual trading cannot keep pace with micro-movements across volatile, trending, and ranging conditions.",
    solution: "Built a fully autonomous scalping engine deploying 5 specialized AI agents that detect market regimes, predict micro-movements, and execute trades with institutional-grade risk management using LangGraph orchestration.",
    fullDescription: "Predator is a multi-agent trading system that processes tick data through specialized agents handling ingestion, regime classification, strategy selection, position sizing, and execution. The adaptive regime detection v2 algorithm uses MAD-based thresholds, Choppiness Index, and Kaufman Efficiency Ratio. A Champion/Challenger model registry enables A/B testing, while PSI and ADWIN drift detection monitors for concept shift.",
    results: [
      { metric: "Execution Latency", value: "<50ms", context: "p99 percentile" },
      { metric: "Regime Accuracy", value: "85-90%", context: "Across all conditions" },
      { metric: "Speedup", value: "10x", context: "Via Numba JIT compilation" },
      { metric: "Recovery", value: "Auto", context: "3-state circuit breaker" },
    ],
    technologies: ["Python", "LangGraph", "TimescaleDB", "Polars", "Numba", "CCXT", "FastAPI", "Redis", "Docker"],
    duration: "6 months",
  },
  {
    slug: "smartslate-learning-platform",
    title: "Smartslate AI-First Learning Ecosystem",
    client: "Smartslate",
    industry: "EdTech",
    category: "AI Automation",
    thumbnail: "/projects/smartslate-thumb.jpg",
    challenge: "Traditional L&D workflows are manual, slow, and fail to scale. Organizations need automated discovery-to-delivery pipelines that maintain quality through human oversight while achieving 10x throughput.",
    solution: "Designed and built a Human-in-the-Loop AI learning ecosystem that automates the entire L&D lifecycle — from discovery (Polaris) through instructional design (Constellation), content development (Nova), LMS delivery (Orbit), AI tutoring (Nebula), to analytics (Spectrum).",
    fullDescription: "Smartslate Polaris uses a 7-stage contextual AI questionnaire system that conducts automated stakeholder interviews, analyzes organizational context, and generates learning strategy blueprints (Starmaps). Every AI output passes through human SME validation gates. The platform leverages Claude 3.5 Sonnet, GPT-4o, and Perplexity API for multi-provider AI analysis with async webhook-based report generation.",
    results: [
      { metric: "Throughput", value: "10x", context: "vs. manual L&D processes" },
      { metric: "AI Providers", value: "3", context: "Claude, GPT-4o, Perplexity" },
      { metric: "Daily Jobs", value: "500+", context: "Async processing" },
      { metric: "Report Gen", value: "45s", context: "Full learning strategy" },
    ],
    technologies: ["React", "TypeScript", "Vite", "Supabase", "PostgreSQL", "Anthropic Claude", "OpenAI GPT-4", "Perplexity API", "Framer Motion", "TipTap"],
    duration: "8 months",
    testimonial: { quote: "The HITL pipeline transformed how we approach learning design. What used to take weeks now happens in hours with better quality.", author: "Learning Director", role: "Head of L&D", company: "Smartslate" },
  },
  {
    slug: "reality-check-governance",
    title: "Reality-Check Anti-Hallucination System",
    client: "Independent Project",
    industry: "AI Infrastructure",
    category: "Agentic Systems",
    thumbnail: "/projects/reality-thumb.jpg",
    challenge: "AI agent fleets generating fictional data undermine trust and create liability. With 147 independent agents, manual oversight is impossible — the system needed autonomous governance at scale.",
    solution: "Built a distributed governance platform that enforces a No Fiction Protocol across the entire agent fleet through automated policy injection, real-time violation detection, and immutable audit trails.",
    fullDescription: "Reality-Check traverses all agent directories, injects protocol references into AGENTS.md files, and establishes centralized GLOBAL_PROTOCOLS.md mandates. Each agent is instructed to verify before reporting, cite sources, say UNKNOWN when uncertain, and never simulate data. Violations are logged with full traceability. The system achieved 96% fleet coverage within minutes of deployment.",
    results: [
      { metric: "Coverage", value: "96%", context: "141 of 147 agents" },
      { metric: "Deployment", value: "3 min", context: "Full fleet enforcement" },
      { metric: "Violations", value: "0", context: "Post-deployment" },
      { metric: "Audit Trail", value: "100%", context: "Immutable logging" },
    ],
    technologies: ["Bash", "Node.js", "Python", "YAML", "Markdown", "Git", "Regex", "Policy Engine"],
    duration: "2 weeks",
  },
  {
    slug: "revos-garage-management",
    title: "RevOS Automotive Workshop Platform",
    client: "GlitchZero",
    industry: "Automotive",
    category: "Full-Stack",
    thumbnail: "/projects/revos-thumb.jpg",
    challenge: "Automotive workshops run on paper job cards, manual inventory tracking, and disconnected customer records. This creates bottlenecks, lost parts, missed follow-ups, and zero data visibility.",
    solution: "Built a comprehensive digital workshop management platform covering the full service lifecycle — from vehicle intake through job card management, parts inventory, customer CRM, employee scheduling, marketing automation, and AI-powered analytics.",
    fullDescription: "RevOS centers on an intelligent Job Card system tracking vehicles from intake to delivery through customizable workflows. Service advisors create job cards, mechanics log labor and parts, managers monitor progress via real-time dashboards. Inventory auto-tracks parts consumption with low-stock alerts. Vehicle Registry builds service histories for predictive maintenance.",
    results: [
      { metric: "Job Cards", value: "500+", context: "Monthly processing" },
      { metric: "Inventory", value: "10K+", context: "Parts tracked" },
      { metric: "Vehicles", value: "5K+", context: "Service histories" },
      { metric: "Uptime", value: "99.5%", context: "Production reliability" },
    ],
    technologies: ["Next.js 14", "TypeScript", "Supabase", "PostgreSQL", "Prisma", "TanStack Query", "Zustand", "DnD Kit", "FullCalendar", "Radix UI"],
    duration: "5 months",
    testimonial: { quote: "RevOS eliminated our paper chaos. We now track every job, every part, and every customer interaction digitally.", author: "Workshop Owner", role: "Managing Director", company: "GlitchZero" },
  },
  {
    slug: "ai-agency-ops",
    title: "AI Agency Ops — Multi-Agent Orchestration",
    client: "Independent Project",
    industry: "AI Infrastructure",
    category: "Agentic Systems",
    thumbnail: "/projects/agency-thumb.jpg",
    challenge: "Managing 30+ specialized AI agents across different LLM providers, communication channels, and tool integrations requires a unified orchestration layer with cross-agent coordination.",
    solution: "Built a unified multi-agent platform managing 30+ specialized agents — from code automation and content generation to IoT control and knowledge management — with Model Context Protocol integration and real-time event coordination.",
    fullDescription: "The platform routes intents to specialized agents via NLP matching, retrieves context from vector memory, executes tools through MCP, and coordinates cross-agent workflows via Redis Streams event bus. Supports 6 LLM providers (Claude, Gemini, ChatGPT, Kimi, Ollama, Qwen) with intelligent model routing.",
    results: [
      { metric: "Agents", value: "30+", context: "Specialized roles" },
      { metric: "Providers", value: "6", context: "Multi-LLM routing" },
      { metric: "Protocols", value: "MCP", context: "Cross-agent tools" },
      { metric: "Memory", value: "Vector", context: "Persistent context" },
    ],
    technologies: ["Claude", "Gemini", "ChatGPT", "Kimi", "Ollama", "Python", "FastAPI", "LangGraph", "Redis", "MCP", "Telegram API", "GitHub API"],
    duration: "Ongoing",
  },
];
