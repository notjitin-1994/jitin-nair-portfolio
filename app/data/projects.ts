export interface TechCategory {
  name: string;
  items: string[];
  color: string;
}

export interface Metric {
  id: string;
  label: string;
  value: number;
  unit: string;
  description: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  color: string;
}

export interface Project {
  id: string;
  number: number;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  whatItDoes: string;
  howItWorks: string;
  technologies: string[];
  techCategories: TechCategory[];
  keyInnovations: string[];
  processFlow: string[];
  features: string[];
  metrics: Metric[];
  githubUrl?: string;
  liveUrl?: string;
  learnMoreUrl?: string;
  theme: {
    primary: string;
    secondary: string;
    gradient: string;
  };
}

export const projectsData: Project[] = [
  {
    id: 'predator',
    number: 1,
    name: 'Predator Scalping System',
    shortName: 'Predator',
    tagline: 'Autonomous Trading Engine',
    description: 'Autonomous XAU/USD scalping engine deploying 5 specialized AI agents that detect market regimes, predict micro-movements, and execute sub-50ms trades with institutional-grade risk management.',
    whatItDoes: 'Predator is a fully autonomous gold trading system that scalps XAU/USD by detecting market regimes (trending, ranging, volatile) and adapting its strategy in real-time. It processes tick data through 5 specialized agents, each handling a specific layer of the trading pipeline.',
    howItWorks: 'The system uses adaptive regime detection (v2 algorithm) with MAD-based thresholds, Choppiness Index, and Kaufman\'s Efficiency Ratio. TimescaleDB stores time-series data with point-in-time correctness. A Champion/Challenger model registry enables A/B testing.',
    technologies: ['Python 3.13', 'LangGraph', 'TimescaleDB', 'Polars', 'NumPy', 'Numba', 'CCXT', 'WebSocket', 'FastAPI', 'Streamlit', 'Docker', 'Redis', 'PostgreSQL', 'scikit-learn', 'ADWIN', 'PSI Drift Detection'],
    techCategories: [
      { name: 'Core Engine', items: ['Python 3.13', 'Numba', 'Polars'], color: '#22d3ee' },
      { name: 'Multi-Agent', items: ['LangGraph', '5 Specialized Agents'], color: '#a78bfa' },
      { name: 'Data Layer', items: ['TimescaleDB', 'Redis', 'PostgreSQL'], color: '#f472b6' },
      { name: 'ML/Ops', items: ['ADWIN', 'PSI', 'Model Registry'], color: '#22c55e' },
    ],
    keyInnovations: [
      'Adaptive Regime Detection v2 with hysteresis filtering',
      'Champion/Challenger model registry with statistical testing',
      'Real-time drift detection (PSI, ADWIN, KS-test)',
      'Online/offline feature store with point-in-time correctness',
      '10x speedup via Numba JIT compilation',
      'Circuit breaker with 3-state automatic recovery',
    ],
    processFlow: [
      'Tick Data Ingestion (WebSocket/OANDA)',
      'Regime Classification (ADX + CHOP + ER)',
      'Strategy Selection (Trend/Range/Reversal)',
      'Position Sizing (Kelly Criterion)',
      'Execution (Sub-50ms via CCXT)',
      'Drift Monitoring (PSI/ADWIN)',
    ],
    features: [
      '<50ms execution latency (p99)',
      '85-90% regime detection accuracy',
      'Monte Carlo backtesting framework',
      'MLOps pipeline with model versioning',
      'Real-time Streamlit dashboard',
      'Self-healing circuit breaker',
    ],
    metrics: [
      { id: 'latency', label: 'Execution Latency', value: 47, unit: 'ms', description: 'End-to-end signal to execution (p99)', trend: 'stable', trendValue: 'p99', color: '#22d3ee' },
      { id: 'accuracy', label: 'Regime Detection', value: 88, unit: '%', description: 'Classification accuracy on out-of-sample data', trend: 'up', trendValue: '+2.3%', color: '#a78bfa' },
      { id: 'uptime', label: 'System Uptime', value: 99.9, unit: '%', description: '24/7 continuous operation since deployment', trend: 'stable', trendValue: '30d', color: '#22c55e' },
      { id: 'winrate', label: 'Strategy Win Rate', value: 62.5, unit: '%', description: 'Backtested win rate on 6 months data', trend: 'up', trendValue: '+1.2%', color: '#f472b6' },
    ],
    githubUrl: 'https://github.com/notjitin-1994/predator-scalping-system',
    learnMoreUrl: '/projects/predator',
    theme: {
      primary: '#22d3ee',
      secondary: '#a78bfa',
      gradient: 'from-cyan-400 via-purple-400 to-pink-400',
    },
  },
  {
    id: 'agency',
    number: 2,
    name: 'AI Agency Ops',
    shortName: 'Agency',
    tagline: 'Multi-Agent Orchestration',
    description: 'Unified multi-agent orchestration platform managing 30+ specialized AI agents through unified context management, real-time event streaming, and intelligent cross-agent coordination.',
    whatItDoes: 'AI Agency Ops is a production-grade platform that orchestrates 30+ specialized AI agents. It provides unified context management, real-time event streaming via Redis, and Model Context Protocol (MCP) for seamless tool sharing across agent boundaries.',
    howItWorks: 'Built on LangGraph state machines with vector memory persistence. Agents communicate via Redis Streams event bus. MCP enables tools to be shared as capabilities rather than possessions. Multi-LLM routing intelligently selects providers based on query type.',
    technologies: ['Claude', 'Gemini', 'GPT-4', 'Kimi', 'Ollama', 'Qwen', 'Python', 'FastAPI', 'LangGraph', 'Redis', 'MCP', 'Telegram API', 'WhatsApp API', 'GitHub API'],
    techCategories: [
      { name: 'AI/ML', items: ['LangGraph', 'OpenAI', 'Anthropic'], color: '#a78bfa' },
      { name: 'Orchestration', items: ['LangChain', 'Instructor', 'Pydantic'], color: '#22d3ee' },
      { name: 'Data', items: ['PostgreSQL', 'pgvector', 'Redis'], color: '#f472b6' },
      { name: 'Protocol', items: ['MCP', 'FastAPI', 'WebSocket'], color: '#22c55e' },
    ],
    keyInnovations: [
      'Model Context Protocols for cross-agent tool sharing',
      'LangGraph state machines for complex workflows',
      'Vector memory for context persistence',
      'Real-time event bus with Redis Streams',
      'Multi-LLM routing across 6 providers',
      '30+ specialized agent templates',
    ],
    processFlow: [
      'Intent Recognition (NLP)',
      'Agent Selection (Matching)',
      'Context Retrieval (Vector)',
      'Tool Execution (MCP)',
      'Cross-Agent Coordination',
    ],
    features: [
      '30+ specialized agents',
      'Cross-agent workflows',
      'Model Context Protocols',
      'Context Management',
      'Real-time event bus',
      'Vector memory',
    ],
    metrics: [
      { id: 'agents', label: 'Active Agents', value: 34, unit: 'agents', description: 'Production agents across 3 clusters', trend: 'up', trendValue: '+4', color: '#a78bfa' },
      { id: 'tools', label: 'Shared Tools', value: 47, unit: 'tools', description: 'MCP-enabled cross-agent capabilities', trend: 'up', trendValue: '+12', color: '#22d3ee' },
      { id: 'savings', label: 'Cost Savings', value: 34, unit: '%', description: 'Multi-LLM routing optimization', trend: 'up', trendValue: '+8%', color: '#22c55e' },
      { id: 'speed', label: 'Response Time', value: 350, unit: 'ms', description: 'Average end-to-end latency', trend: 'down', trendValue: '-120ms', color: '#f472b6' },
    ],
    githubUrl: 'https://github.com/jitinnair1',
    learnMoreUrl: '/projects/agency',
    theme: {
      primary: '#a78bfa',
      secondary: '#22d3ee',
      gradient: 'from-purple-400 via-cyan-400 to-pink-400',
    },
  },
  {
    id: 'reality',
    number: 3,
    name: 'Reality-Check System',
    shortName: 'Reality',
    tagline: 'Anti-Hallucination Governance',
    description: 'Autonomous multi-agent governance platform enforcing truth-only protocols across 147 AI agents, eliminating fictional data generation through automated policy injection.',
    whatItDoes: 'Reality-Check is a distributed governance system enforcing a "No Fiction Protocol" across an entire agent fleet. It automatically injects truth-verification mandates into agent prompts and maintains immutable audit trails.',
    howItWorks: 'Traverses all agent directories, injects protocol references into AGENTS.md files, and establishes GLOBAL_PROTOCOLS.md mandates. Each agent verifies before reporting, cites sources, and says "UNKNOWN" when uncertain.',
    technologies: ['Bash', 'Node.js', 'Python', 'YAML', 'Markdown', 'Git', 'Regex', 'File System APIs', 'Process Management', 'Audit Logging'],
    techCategories: [
      { name: 'Enforcement', items: ['Bash Scripts', 'Node.js', 'Regex'], color: '#22d3ee' },
      { name: 'Policy', items: ['GLOBAL_PROTOCOLS.md', 'YAML Config'], color: '#22d3ee' },
      { name: 'Audit', items: ['VIOLATIONS.log', 'Real-time'], color: '#22d3ee' },
      { name: 'Coverage', items: ['141/147 Agents', '96%'], color: '#22d3ee' },
    ],
    keyInnovations: [
      'Automated policy injection across 147 agents',
      'Immutable violation logging with audit trails',
      'Source-citation enforcement',
      'Real-time compliance monitoring',
      'Cross-agent governance without central control',
      'Self-documenting protocol system',
    ],
    processFlow: [
      'Agent Output Generation',
      'Truth Verification Check',
      'Source Citation Validation',
      'Violation Detection & Flagging',
      'Centralized Audit Logging',
      'Compliance Report',
    ],
    features: [
      '96% fleet coverage (141/147 agents)',
      'Automated AGENTS.md modification',
      'Real-time violation tracking',
      'Immutable audit trails',
      'Self-healing enforcement',
      'Zero-config onboarding',
    ],
    metrics: [
      { id: 'enforced', label: 'Agents Enforced', value: 141, unit: 'agents', description: 'Out of 147 total agents', trend: 'up', trendValue: '+4', color: '#22d3ee' },
      { id: 'coverage', label: 'Coverage', value: 96, unit: '%', description: 'Fleet-wide policy coverage', trend: 'stable', trendValue: '96%', color: '#22c55e' },
      { id: 'violations', label: 'Violations', value: 0, unit: 'active', description: 'Current active violations', trend: 'stable', trendValue: '0', color: '#22c55e' },
      { id: 'time', label: 'Enforcement Time', value: 3, unit: 'min', description: 'Full fleet policy rollout', trend: 'down', trendValue: '-2min', color: '#22d3ee' },
    ],
    githubUrl: 'https://github.com/notjitin-1994/anti-hallucination',
    learnMoreUrl: '/projects/reality',
    theme: {
      primary: '#22d3ee',
      secondary: '#22c55e',
      gradient: 'from-cyan-400 to-emerald-400',
    },
  },
  {
    id: 'smartslate',
    number: 4,
    name: 'Smartslate AI-First Learning',
    shortName: 'Smartslate',
    tagline: 'HITL Learning Ecosystem',
    description: 'AI-native Learning & Development platform with Human-in-the-Loop validation, automating discovery to delivery while maintaining quality through expert oversight.',
    whatItDoes: 'Smartslate Polaris combines automated learning discovery, AI-native instructional design, content development, AI-powered LMS, personalized tutoring, and analytics into a unified pipeline. Every AI output is validated by human experts.',
    howItWorks: 'The HITL pipeline begins with Polaris automated discovery—AI conducts stakeholder interviews and generates learning strategy blueprints with SME validation. Constellation automates instructional design using established learning frameworks.',
    technologies: ['React', 'TypeScript', 'Vite', 'Supabase', 'PostgreSQL', 'Claude', 'GPT-4', 'Perplexity API', 'Framer Motion', 'Tailwind CSS', 'Zustand', 'React Query', 'TipTap'],
    techCategories: [
      { name: 'Frontend', items: ['React 18', 'TypeScript', 'Vite', 'Framer Motion'], color: '#22d3ee' },
      { name: 'AI/ML', items: ['Claude 3.5', 'GPT-4o', 'Perplexity'], color: '#a78bfa' },
      { name: 'Backend', items: ['Supabase', 'PostgreSQL', 'Edge Functions'], color: '#f472b6' },
      { name: 'Pipeline', items: ['Webhook Workers', 'Job Queue', 'Real-time'], color: '#22c55e' },
    ],
    keyInnovations: [
      'Human-in-the-Loop validation gates at every stage',
      'Automated discovery via 7-stage questionnaires',
      'AI-native instructional design frameworks',
      'Integrated content development workflows',
      'Unified AI-powered LMS with adaptive paths',
      '24/7 AI Tutor with human escalation',
    ],
    processFlow: [
      'Role & Organization Discovery',
      'Contextual 7-Stage Questionnaire',
      'Multi-Provider AI Analysis',
      'Async Report Generation Job',
      'Webhook Completion Notification',
      'Interactive Starmap Delivery',
    ],
    features: [
      'Automated HITL Learning Discovery',
      'Automated Instructional Design',
      'AI-native Content Development',
      'AI-powered LMS',
      'AI Tutor with escalation',
      'Analytics & Reporting',
    ],
    metrics: [
      { id: 'stages', label: 'Questionnaire Stages', value: 7, unit: 'stages', description: 'Contextual discovery flow', trend: 'stable', trendValue: '7', color: '#22d3ee' },
      { id: 'providers', label: 'AI Providers', value: 3, unit: 'providers', description: 'Multi-provider redundancy', trend: 'up', trendValue: '+1', color: '#a78bfa' },
      { id: 'jobs', label: 'Async Jobs', value: 500, unit: 'daily', description: 'Daily background processing', trend: 'up', trendValue: '+150', color: '#22c55e' },
      { id: 'time', label: 'Report Gen', value: 45, unit: 'sec', description: 'Average generation time', trend: 'down', trendValue: '-15s', color: '#f472b6' },
    ],
    liveUrl: 'https://smartslate.io',
    learnMoreUrl: '/projects/smartslate',
    theme: {
      primary: '#22d3ee',
      secondary: '#a78bfa',
      gradient: 'from-cyan-400 via-purple-400 to-pink-400',
    },
  },
  {
    id: 'revos',
    number: 5,
    name: 'RevOS',
    shortName: 'RevOS',
    tagline: 'Automotive Workshop Management',
    description: 'Comprehensive automotive garage management platform digitizing workshop operations from job cards to inventory with AI-powered insights.',
    whatItDoes: 'RevOS digitizes every aspect of garage operations: intelligent Job Cards, parts inventory with auto-save, Vehicle Registry with service history, Customer CRM, Employee Management, and Marketing automation.',
    howItWorks: 'Job Card system tracks vehicles from intake to delivery through customizable workflows. Inventory auto-tracks parts consumption and alerts on low stock. Vehicle Registry builds comprehensive service histories for predictive maintenance.',
    technologies: ['Next.js 14', 'TypeScript', 'Supabase', 'PostgreSQL', 'Prisma', 'TanStack Query', 'Zustand', 'React Hook Form', 'Zod', 'DnD Kit', 'FullCalendar', 'Framer Motion'],
    techCategories: [
      { name: 'Frontend', items: ['Next.js 14', 'TypeScript', 'Tailwind', 'Radix UI'], color: '#22d3ee' },
      { name: 'State', items: ['TanStack Query', 'Zustand', 'React Hook Form', 'Zod'], color: '#a78bfa' },
      { name: 'Backend', items: ['Supabase', 'PostgreSQL', 'Prisma'], color: '#f472b6' },
      { name: 'Features', items: ['DnD Kit', 'FullCalendar', 'Framer Motion'], color: '#22c55e' },
    ],
    keyInnovations: [
      'End-to-end job card lifecycle management',
      'Auto-save inventory with real-time tracking',
      'Vehicle service history with predictive maintenance',
      'Role-based access for garage hierarchies',
      'Integrated marketing automation',
      'AI-powered analytics dashboard',
    ],
    processFlow: [
      'Vehicle Intake & Job Creation',
      'Service Planning & Parts Allocation',
      'Mechanic Assignment & Execution',
      'Quality Check & Completion',
      'Customer Delivery & Feedback',
      'Service History Update',
    ],
    features: [
      'Digital job card management',
      'Real-time inventory tracking',
      'Vehicle service history',
      'Customer CRM & marketing',
      'Employee RBAC system',
      'AI-powered analytics',
    ],
    metrics: [
      { id: 'jobs', label: 'Job Cards', value: 500, unit: 'monthly', description: 'Average monthly job cards', trend: 'up', trendValue: '+12%', color: '#22d3ee' },
      { id: 'inventory', label: 'Inventory', value: 10, unit: 'K+ items', description: 'Parts tracked in system', trend: 'up', trendValue: '+2K', color: '#a78bfa' },
      { id: 'vehicles', label: 'Vehicles', value: 5, unit: 'K+ tracked', description: 'Active vehicle records', trend: 'up', trendValue: '+800', color: '#22c55e' },
      { id: 'uptime', label: 'Uptime', value: 99.5, unit: '%', description: 'Platform availability', trend: 'stable', trendValue: '99.5%', color: '#f472b6' },
    ],
    liveUrl: 'https://glitchzero.com',
    learnMoreUrl: '/projects/revos',
    theme: {
      primary: '#22d3ee',
      secondary: '#22c55e',
      gradient: 'from-cyan-400 to-emerald-400',
    },
  },
  {
    id: 'commune',
    number: 6,
    name: 'Project Commune',
    shortName: 'Commune',
    tagline: 'Privacy-First Communities',
    description: 'Privacy-first community communication platform enabling anonymous collaboration through map-based location tagging and WhatsApp-style workspaces.',
    whatItDoes: 'Commune combines map-based location tagging with anonymous workspaces. Users discover and connect around geographic interests without exposing personal identity. Supports tiered accounts and role-based project management.',
    howItWorks: 'Users explore an interactive map to discover location-based communities. WhatsApp-style workspace system enables anonymous group collaboration where members are identified by roles rather than personal information.',
    technologies: ['Next.js 14', 'TypeScript', 'Supabase', 'Leaflet', 'Zustand', 'React-Leaflet', 'OpenStreetMap', 'PostgreSQL', 'Realtime', 'Framer Motion'],
    techCategories: [
      { name: 'Frontend', items: ['Next.js 14', 'React', 'TypeScript', 'Tailwind'], color: '#22d3ee' },
      { name: 'Maps', items: ['Leaflet', 'React-Leaflet', 'OpenStreetMap'], color: '#a78bfa' },
      { name: 'Backend', items: ['Supabase', 'PostgreSQL', 'Realtime'], color: '#f472b6' },
      { name: 'State', items: ['Zustand', 'Framer Motion'], color: '#22c55e' },
    ],
    keyInnovations: [
      'Anonymous workspace participation',
      'Map-tag relationship system',
      'Tiered account architecture',
      'Privacy-preserving network',
      'WhatsApp-style messaging',
      'Role-based checklists',
    ],
    processFlow: [
      'Map Discovery & Tag Creation',
      'Anonymous Network Join',
      'Role-Based Workspace Access',
      'Project Creation & Checklists',
      'Task Assignment & Tracking',
      'Community Content Sharing',
    ],
    features: [
      'Interactive community map',
      'Anonymous workspaces',
      'Project checklists',
      'Role-based permissions',
      'Photo sharing',
      'Network management',
    ],
    metrics: [
      { id: 'networks', label: 'Networks', value: 50, unit: 'active', description: 'Active community networks', trend: 'up', trendValue: '+12', color: '#22d3ee' },
      { id: 'workspaces', label: 'Workspaces', value: 200, unit: 'created', description: 'Total workspaces', trend: 'up', trendValue: '+45', color: '#a78bfa' },
      { id: 'privacy', label: 'Privacy', value: 100, unit: '%', description: 'Identity protection', trend: 'stable', trendValue: '100%', color: '#22c55e' },
      { id: 'uptime', label: 'Uptime', value: 99.9, unit: '%', description: 'Platform availability', trend: 'stable', trendValue: '99.9%', color: '#f472b6' },
    ],
    githubUrl: 'https://github.com/notjitin-1994/commune',
    learnMoreUrl: '/projects/commune',
    theme: {
      primary: '#22d3ee',
      secondary: '#a78bfa',
      gradient: 'from-cyan-400 via-purple-400 to-pink-400',
    },
  },
];
