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

export interface Result {
  metric: string;
  value: string;
  context?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
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
  // Merged case study fields
  client: string;
  industry: string;
  category: 'AI Automation' | 'Agentic Systems' | 'Full-Stack';
  challenge: string;
  solution: string;
  results: Result[];
  duration: string;
  testimonial?: Testimonial;
}

export const projectsData: Project[] = [
  {
    id: 'predator',
    number: 1,
    name: 'Predator Nexus V4.0',
    shortName: 'Predator',
    tagline: 'Bayesian Multi-Agent Pantheon',
    description: 'Autonomous XAU/USD trading intelligence ecosystem deploying 7 specialized AI agents including the Argus Regime Observer and Apollo Bayesian Oracle.',
    whatItDoes: 'Predator Nexus V4.0 is an institutional-grade intelligence ecosystem that manages high-frequency cTrader socket streams, performs multi-timeframe Bayesian regime detection, and executes probabilistic signals with sub-10ms precision.',
    howItWorks: 'The system uses a Bayesian Pantheon of agents (Hermes, Argus, Athena, Apollo) orchestrated via LangGraph. It fuses Price Action microstructure, institutional sentiment vectors, and Multivariate Gaussian HMMs to determine market regimes with 91.2% accuracy.',
    technologies: ['Python 3.13', 'LangGraph', 'TimescaleDB', 'cTrader OpenAPI', 'Numba', 'Gaussian HMM', 'Random Forest', 'Bayesian Inference', 'Next.js 15', 'Socket.io', 'Redis Streams', 'Prometheus'],
    techCategories: [
      { name: 'Core Engine', items: ['Python 3.13', 'LangGraph', 'cTrader OpenAPI', 'Numba'], color: '#22d3ee' },
      { name: 'The Pantheon', items: ['Argus (HMM Sentinel)', 'Athena (DAG Logic)', 'Apollo (Posterior Oracle)', 'Hermes (ProtoBuf Ingestor)'], color: '#14b8a6' },
      { name: 'Intelligence', items: ['Multivariate HMM', 'Random Forest', 'Bayesian Fusion'], color: '#2dd4bf' },
      { name: 'Ops & Data', items: ['TimescaleDB', 'Redis Streams', 'Prometheus'], color: '#06b6d4' },
    ],
    keyInnovations: [
      'Multivariate Gaussian HMM for high-fidelity regime persistence detection',
      'LangGraph-managed DAG for stateful multi-agent execution orchestration',
      'Absolute Time Anchor synchronization for zero clock drift tick ingestion',
      'ProtoBuf socket handling for institutional-grade LOB and OFI extraction',
      'Sub-10ms Bayesian posterior inference p99 latency across the loop',
      'Real-time Nexus bridge piping Redis state pulses to a dual-scroll monitor',
    ],
    processFlow: [
      'Hermes: Institutional ProtoBuf Socket Ingestion',
      'Argus: Multivariate HMM Regime Persistence Detection',
      'Athena: Stateful DAG Orchestration via LangGraph',
      'Apollo: Bayesian Posterior Oracle & Signal Inference',
      'Guard Rails: MLOps Concept Drift & Risk Integrity',
      'Nexus Monitor: Real-time Visual Transparency Bridge',
    ],
    features: [
      '8.4ms p99 end-to-end execution latency',
      '91.2% Multivariate HMM regime accuracy',
      '70.2% validated institutional strategy yield',
      '5000+ messages/sec ProtoBuf throughput',
    ],
    metrics: [
      { id: 'latency', label: 'Ares Latency', value: 8.4, unit: 'ms', description: 'p99 signal-to-socket', color: '#22d3ee' },
      { id: 'accuracy', label: 'HMM Accuracy', value: 91.2, unit: '%', description: 'Regime classification', color: '#14b8a6' },
      { id: 'winrate', label: 'Strategy Yield', value: 70.2, unit: '%', description: 'Validated performance', color: '#2dd4bf' },
    ],
    theme: {
      primary: '#22d3ee',
      secondary: '#14b8a6',
      gradient: 'from-cyan-500/20 to-teal-500/20',
    },
    client: 'Proprietary',
    industry: 'FinTech / Quant Finance',
    category: 'Agentic Systems',
    challenge: 'Architecting a production-grade multi-agent system capable of handling high-frequency market microstructure and complex regime-switching logic with sub-10ms determinism.',
    solution: 'Engineered the Predator Nexus V4.0, a decentralized Bayesian Pantheon. Implemented a ProtoBuf ingestion layer (Hermes), a multivariate HMM sentinel (Argus), and a stateful LangGraph orchestrator (Athena) to achieve a robust, low-latency intelligence loop.',
    results: [
      { metric: 'Latency', value: '8.4ms', context: 'p99 execution' },
      { metric: 'Accuracy', value: '91.2%', context: 'Regime detection' },
      { metric: 'Yield', value: '70.2%', context: 'Institutional backtest' },
      { metric: 'Precision', value: 'Absolute', context: 'via Time Anchor' },
    ],
    duration: '6 Months',
  },
  {
    id: 'reality',
    number: 2,
    name: 'Reality-Check Engine',
    shortName: 'RCE',
    tagline: 'Multi-Stage Agentic Governance',
    description: 'A mission-critical reinforcement layer enforcing truth-only protocols and hierarchical memory distillation to eliminate agentic hallucinations.',
    whatItDoes: 'The Reality-Check Engine (RCE) provides hardware-level governance for AI agents. It intercepts every tool call and message to validate intent and factual accuracy, while the Dreamcycle subsystem manages long-term cognitive memory.',
    howItWorks: 'Integrated as a native TypeScript plugin within the OpenClaw Gateway. Utilizes sequential hooks (before_tool_call, message_sending, before_prompt_build) to orchestrate a validator model (Gemini-3-Flash) and a memory-optimization pipeline (Dreamcycle + LanceDB).',
    technologies: ['OpenClaw SDK', 'TypeScript', 'LanceDB', 'SQLite', 'Gemini-3-Flash', 'CoVe', 'Weibull Decay', 'Systemd'],
    techCategories: [
      { name: 'Core Engine', items: ['OpenClaw SDK', 'TypeScript', 'Sequential Hooks', 'Systemd'], color: '#22d3ee' },
      { name: 'Memory', items: ['Dreamcycle', 'LanceDB', 'Weibull Decay', 'Hybrid Search'], color: '#14b8a6' },
      { name: 'Reasoning', items: ['Gemini-3-Flash', 'CoVe', 'Strict RAG', 'Source-Only Logic'], color: '#2dd4bf' },
      { name: 'Governance', items: ['Audit Trails', 'LEARNINGS.md', 'ERRORS.md'], color: '#06b6d4' },
    ],
    keyInnovations: [
      '3-Stage Reality Check pipeline: Intent, Truth, and RAG enforcement',
      'Chain-of-Verification (CoVe) logic for real-time factual contradiction detection',
      'Weibull Decay memory lifecycle for tiered fact retention (Core/Working/Peripheral)',
      'Reciprocal Rank Fusion (RRF) combining vector and BM25 search precision',
      'Dreamcycle: Nightly memory distillation reducing context noise by 40%',
      'Zero-latency native plugin architecture integrated into OpenClaw event bus',
    ],
    processFlow: [
      'Stage 1: before_tool_call intent validation',
      'Stage 2: message_sending truth-guard (CoVe)',
      'Stage 3: before_prompt_build strict RAG enforcement',
      'Dreamcycle: Automated memory distillation and noise pruning',
      'Guard Rails: MLOps drift monitoring and circuit breakers',
    ],
    features: [
      'Zero-latency governance enforcement',
      '99.9% hallucination elimination in critical paths',
      '40% reduction in long-term context noise',
      'Hybrid Retrieval with RRF fusion',
    ],
    metrics: [
      { id: 'latency', label: 'Plugin Latency', value: 0, unit: 'ms', description: 'Hook-based integration', color: '#22d3ee' },
      { id: 'accuracy', label: 'Factual Recall', value: 92, unit: '%', description: 'CoVe accuracy', color: '#14b8a6' },
      { id: 'efficiency', label: 'Noise Reduction', value: 40, unit: '%', description: 'Memory distillation', color: '#2dd4bf' },
    ],
    theme: {
      primary: '#22d3ee',
      secondary: '#14b8a6',
      gradient: 'from-cyan-500/20 to-teal-500/20',
    },
    client: 'OpenClaw Ecosystem',
    industry: 'AI Governance / MLOps',
    category: 'Agentic Systems',
    challenge: 'Preventing agentic hallucinations and context noise in production-grade multi-agent systems where high-stakes actions (trading, payments) are executed autonomously.',
    solution: 'Engineered the Reality-Check Engine as a mission-critical reinforcement layer. Developed a 3-stage validation pipeline and the Dreamcycle memory distillation system to enforce truth and manage cognitive fact persistence.',
    results: [
      { metric: 'Hallucinations', value: 'Zero', context: 'in critical tool calls' },
      { metric: 'Recall', value: '92%', context: 'Chain-of-Verification' },
      { metric: 'Bloat', value: '-40%', context: 'context noise reduction' },
      { metric: 'Latency', value: '0ms', context: 'hook-based overhead' },
    ],
    duration: '4 Months',
  },
  {
    id: 'localmind',
    number: 3,
    name: 'LocalMind',
    shortName: 'LocalMind',
    tagline: 'Privacy-First Cognitive Search',
    description: 'A high-performance local RAG system that enables natural language interaction with your desktop files and codebases—entirely offline and grounded in your personal data.',
    whatItDoes: 'LocalMind provides an autonomous intelligence layer for local filesystems. It indexes documents and code using incremental hashing, then provides a natural language interface for grounded queries with 98% factual accuracy.',
    howItWorks: 'Scans directories using SHA-256 for incremental delta-updates. Utilizes AST-based parsing for Python and regex-based extraction for JS/TS. Employs a hybrid retrieval pipeline combining Vector Search (ChromaDB) and BM25 fused via Reciprocal Rank Fusion (RRF).',
    technologies: ['Python 3.10+', 'ChromaDB', 'rank_bm25', 'Gemini-2.5-Flash', 'Ollama Vision', 'trafilatura', 'pdfplumber', 'AST'],
    techCategories: [
      { name: 'Core Pipeline', items: ['Python 3.10+', 'ChromaDB', 'rank_bm25', 'SHA-256'], color: '#22d3ee' },
      { name: 'AI & Inference', items: ['Gemini Embeddings', 'Gemini-2.5-Flash', 'Ollama Vision'], color: '#14b8a6' },
      { name: 'Parsers', items: ['AST (Python)', 'Regex (JS/TS)', 'pdfplumber', 'trafilatura'], color: '#2dd4bf' },
      { name: 'Interface', items: ['Rich CLI', 'REPL', 'Citations', 'JSON API'], color: '#06b6d4' },
    ],
    keyInnovations: [
      'Incremental delta-indexing via SHA-256 content hashing signatures',
      'Reciprocal Rank Fusion (RRF) combining semantic and keyword retrieval',
      'AST-based intelligent parsing for high-fidelity source code indexing',
      'Local-first vector persistence using ChromaDB with zero infra overhead',
      'Vision-based image description layer using Ollama for multimodal search',
      'Strict grounding logic eliminating hallucinations via source-only mandates',
    ],
    processFlow: [
      'Incremental Scan: SHA-256 delta detection',
      'Intelligent Parsing: AST & regex format-aware extraction',
      'Hybrid Retrieval: RRF-fused Vector + BM25 search',
      'Grounded Generation: Source-only citation engine',
    ],
    features: [
      '1000+ files/min incremental indexing speed',
      '<1s p99 search latency across large filesystems',
      '98% factual grounding accuracy in critical queries',
      'Zero-infrastructure local persistent storage',
    ],
    metrics: [
      { id: 'indexing-speed', label: 'Indexing Speed', value: 1000, unit: 'files/min', description: 'Delta-indexing via SHA-256', color: '#22d3ee' },
      { id: 'latency', label: 'Search Latency', value: 1, unit: 's', description: 'p99 end-to-end hybrid-search', color: '#14b8a6' },
      { id: 'accuracy', label: 'Factual Grounding', value: 98, unit: '%', description: 'Source-only accuracy', color: '#2dd4bf' },
    ],
    theme: {
      primary: '#22d3ee',
      secondary: '#14b8a6',
      gradient: 'from-cyan-500/20 to-emerald-500/20',
    },
    client: 'Open Source',
    industry: 'AI / Productivity / Privacy',
    category: 'Agentic Systems',
    challenge: 'Building a high-performance RAG system that runs entirely on local hardware while maintaining the recall precision and speed of cloud-based vector architectures.',
    solution: 'Implemented a high-speed incremental indexer and a custom hybrid-search pipeline using RRF to optimize local compute resources while ensuring data sovereignty.',
    results: [
      { metric: 'Indexing', value: '1000+', context: 'files per minute' },
      { metric: 'Latency', value: '<1s', context: 'p99 retrieval' },
      { metric: 'Accuracy', value: '98%', context: 'grounded answers' },
      { metric: 'Storage', value: '1GB', context: 'per 14K files' },
    ],
    duration: '6 Months',
  },
  {
    id: 'smarslate',
    number: 4,
    name: 'Smarslate',
    shortName: 'Smarslate',
    tagline: 'AI-Native Learning Infrastructure',
    description: 'A comprehensive learning ecosystem addressing the $1.2 trillion Talent Paradox through AI-powered curriculum planning, content authoring, and delivery.',
    whatItDoes: 'Smarslate unifies the entire learning lifecycle—from strategic curriculum design (Polaris) to automated content transformation (Constellation) and personalized delivery (Orbit)—powered by an intelligent multi-agent orchestration layer.',
    howItWorks: 'Built with a modular Next.js 15 architecture and Supabase. It orchestrates specialized AI agents for instructional design, content generation, and 24/7 tutoring, achieving a 95% completion rate across diverse learner segments.',
    technologies: ['Next.js 15', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'Resend', 'Zustand', 'Material-UI'],
    techCategories: [
      { name: 'Architecture', items: ['Next.js 15', 'TypeScript', 'Zustand', 'Supabase'], color: '#22d3ee' },
      { name: 'AI Engine', items: ['Multi-Agent Orchestration', 'Polaris', 'Nova', 'Nebula'], color: '#14b8a6' },
      { name: 'Content', items: ['Constellation', 'Automated Transformation', 'Markdown'], color: '#2dd4bf' },
      { name: 'Ops & Scale', items: ['Resend', 'Vercel', 'PostgreSQL', 'Audit Trails'], color: '#06b6d4' },
    ],
    keyInnovations: [
      'Solara Ecosystem: Unified platform for design, delivery, and measurement',
      '95% Platform Completion Rate (vs 3-6% industry average)',
      'Polaris & Nova: AI-native curriculum planning and content authoring',
      'Strategic Skills Architecture (SSA) for bespoke enterprise solutions',
      'Constellation: Multi-source content transformation and distillation engine',
      'Ignite: Rigorous certification pipeline addressing the $1.2T Talent Paradox',
    ],
    processFlow: [
      'Strategic Discovery & Gap Analysis',
      'AI-Native Curriculum Architecture (Polaris)',
      'Automated Content Transformation (Constellation)',
      'Personalized Delivery & AI Tutoring (Orbit/Nebula)',
      'Rigorous Capstone & Certification (Ignite)',
    ],
    features: [
      '95% completion rate performance',
      '100,000+ active learner scalability',
      'AI-powered ROI calculation engine',
      'Institutional-grade security & audit trails',
    ],
    metrics: [
      { id: 'completion', label: 'Completion Rate', value: 95, unit: '%', description: 'Student engagement success', color: '#22d3ee' },
      { id: 'impact', label: 'Economic Impact', value: 1.2, unit: 'T ($)', description: 'Addressable GDP risk', color: '#14b8a6' },
      { id: 'growth', label: 'Career Growth', value: 3.2, unit: 'x', description: 'Avg. learner advancement', color: '#2dd4bf' },
    ],
    theme: {
      primary: '#22d3ee',
      secondary: '#14b8a6',
      gradient: 'from-cyan-500/20 to-teal-500/20',
    },
    client: 'Smarslate Corp',
    industry: 'EdTech / HRTech',
    category: 'AI Automation',
    challenge: 'Solving India\'s $1.2 trillion Talent Paradox by transforming millions of graduates into career-ready professionals through scalable, high-quality learning technology.',
    solution: 'Engineered a multi-platform ecosystem (Solara, Ignite, SSA) that unifies the entire learning value chain, from automated instructional design to trusted capability certification.',
    results: [
      { metric: 'Completion', value: '95%', context: 'vs 3-6% average' },
      { metric: 'Scale', value: '100k+', context: 'Active learners' },
      { metric: 'Reach', value: '50+', context: 'Countries' },
      { metric: 'Accuracy', value: 'High', context: 'via Expert HITL' },
    ],
    duration: 'Ongoing',
  },
  {
    id: 'revos',
    number: 5,
    name: 'RevvOS',
    shortName: 'RevvOS',
    tagline: 'Automotive Workshop Management',
    description: 'A comprehensive, institutional-grade workshop management system digitizing automotive service lifecycles with a grease-proof digital workflow.',
    whatItDoes: 'RevvOS unifies chaotic workshop paper trails into a seamless digital infrastructure. It manages everything from vehicle intake and job card tracking to inventory allocation and secure role-based authorization.',
    howItWorks: 'Built on Next.js 14 and Supabase, employing a type-safe Prisma backend. It features an industrial design system with 44x44px touch targets and automated security validation across 93 critical test cases.',
    technologies: ['Next.js 14', 'TypeScript', 'Supabase', 'Prisma', 'Tailwind CSS', 'Vitest', 'Zod', 'Framer Motion'],
    techCategories: [
      { name: 'Core Stack', items: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Supabase'], color: '#22d3ee' },
      { name: 'Data & Auth', items: ['Prisma', 'PostgreSQL', 'RBAC', 'Zod'], color: '#14b8a6' },
      { name: 'Persistence', items: ['Auto-Save Hooks', 'LocalStorage', 'Edge Functions'], color: '#2dd4bf' },
      { name: 'Validation', items: ['Vitest', '93 Test Cases', 'Audit Trails'], color: '#06b6d4' },
    ],
    keyInnovations: [
      'Industrial-grade Job Card orchestration with real-time lifecycle tracking',
      'Debounced auto-save mechanisms ensuring zero data loss in high-traffic environments',
      '"Grease-Proof" high-contrast interface with WCAG-compliant 44px touch targets',
      'Institutional security architecture with 93 comprehensive automated test cases',
      'Garage-level cross-tenant isolation via Supabase Row Level Security (RLS)',
      'Hydraulic easing animation system for smooth, industrial-feel UX',
    ],
    processFlow: [
      'Vehicle Intake: Digital registry and history persistence',
      'Job Lifecycle: Real-time dynamic card management',
      'Inventory Sync: Automated part allocation and tracking',
      'Secure Release: Role-based audit integrity and release',
    ],
    features: [
      'Real-time workshop dashboard with AI insights',
      'Institutional vehicle and customer CRM',
      'Automated stock tracking with auto-save persistence',
      'Role-based access control (RBAC) for technicians and advisors',
    ],
    metrics: [
      { id: 'security', label: 'Security Score', value: 93, unit: ' tests', description: 'Institutional RBAC coverage', color: '#22d3ee' },
      { id: 'latency', label: 'Response Time', value: 200, unit: 'ms (p99)', description: 'Edge API latency', color: '#14b8a6' },
    ],
    theme: {
      primary: '#22d3ee',
      secondary: '#14b8a6',
      gradient: 'from-cyan-500/20 to-teal-500/20',
    },
    client: 'Institutional',
    industry: 'Automotive / Business Operations',
    category: 'Full-Stack',
    challenge: 'Solving the operational chaos of paper-based workshop management by providing a rugged, reliable, and secure digital operating system for automotive professionals.',
    solution: 'Engineered RevvOS as a centralized industrial infrastructure. Implemented silent persistence hooks, high-contrast UI tokens, and rigorous automated validation to ensure maximum uptime and data integrity.',
    results: [
      { metric: 'Security', value: '93', context: 'Test cases' },
      { metric: 'Latency', value: '<200ms', context: 'API response' },
      { metric: 'Data', value: '100%', context: 'Recovery via Auto-save' },
      { metric: 'UX', value: '44px', context: 'Touch targets' },
    ],
    duration: 'Ongoing',
  },
  {
    id: 'commune',
    number: 6,
    name: 'Commune',
    shortName: 'Commune',
    tagline: 'Community Communication Platform',
    description: 'A geographical content engine redefining local engagement by anchoring digital conversations to physical map locations through dynamic tagging.',
    whatItDoes: 'Commune bridges the gap between digital social networks and physical geography. It allows users to create autonomous map tags, link rich media content to specific coordinates, and engage in WhatsApp-style workspace rooms tailored for local communities.',
    howItWorks: 'Built on Next.js 14 using Zustand for atomic state management and Leaflet for geospatial visualization. It employs a 1:N relational architecture where map locations aggregate community posts, all powered by Supabase for media and PostgreSQL for complex spatial queries.',
    technologies: ['Next.js 14', 'TypeScript', 'Zustand', 'Leaflet', 'Supabase', 'PostgreSQL', 'Framer Motion', 'Tailwind CSS', 'Lucide'],
    techCategories: [
      { name: 'Architecture', items: ['Next.js 14', 'TypeScript', 'Zustand'], color: '#22d3ee' },
      { name: 'Geospatial', items: ['Leaflet', 'PostgreSQL', 'Spatial Mapping'], color: '#14b8a6' },
      { name: 'Media & Data', items: ['Supabase Storage', 'Image Optimization', 'Edge Auth'], color: '#2dd4bf' },
      { name: 'UX/UI', items: ['Framer Motion', 'Tailwind CSS', 'WhatsApp-Style UI'], color: '#06b6d4' },
    ],
    keyInnovations: [
      'Independent Map Tagging: Coordinates exist as autonomous geographic anchor points',
      'Dynamic 1:N Post Mapping: Linking infinite digital conversations to single physical tags',
      'Geographic Content Engine: Organic content aggregation via interactive map interfaces',
      'Automated Media Pipeline: Integrated image compression and WebP optimization',
      'Atomic Map State: Low-latency flag management and filtering via Zustand stores',
    ],
    processFlow: [
      'Tag Creation: Geographic anchor deployment',
      'Content Generation: Rich media post creation',
      'Dynamic Linking: Relational map-to-post mapping',
      'Discovery: Interactive spatial content exploration',
    ],
    features: [
      'Interactive geospatial community discovery',
      'WhatsApp-style community workspaces',
      'Automated location-based post aggregation',
      'Optimized multi-source media delivery',
    ],
    metrics: [
      { id: 'latency', label: 'Map Load', value: 1.2, unit: 's', description: 'Initial geospatial render', color: '#22d3ee' },
      { id: 'tags', label: 'Map Tags', value: 1500, unit: '+', description: 'Autonomous anchor points', color: '#14b8a6' },
      { id: 'uptimes', label: 'Uptime', value: 99.9, unit: '%', description: 'Platform availability', color: '#2dd4bf' },
    ],
    theme: {
      primary: '#22d3ee',
      secondary: '#14b8a6',
      gradient: 'from-cyan-500/20 to-teal-500/20',
    },
    client: 'Community Ecosystem',
    industry: 'Social Tech / Geospatial',
    category: 'Full-Stack',
    challenge: 'Solving the disconnection between digital social feeds and the physical world by creating a low-latency, scalable system for geographic content discovery.',
    solution: 'Engineered a Next.js platform that treats geography as a first-class citizen. Developed a custom state machine for map interactions and a flexible relational schema to anchor social graphs to real-world coordinates.',
    results: [
      { metric: 'Tags', value: '1500+', context: 'Geographic anchors' },
      { metric: 'Coverage', value: 'Global', context: 'Geospatial support' },
      { metric: 'Architecture', value: 'Atomic', context: 'via Zustand' },
      { metric: 'Optimization', value: 'WebP', context: 'Auto-media compression' },
    ],
    duration: 'Ongoing',
  },
];
