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
    id: 'smartslate',
    number: 4,
    name: 'SmartSlate',
    shortName: 'SmartSlate',
    tagline: 'AI-Enhanced Education',
    description: 'An adaptive learning platform that generates personalized curriculum and real-time feedback for students.',
    whatItDoes: 'SmartSlate analyzes student performance data to generate custom learning paths, interactive quizzes, and instant explanations for complex topics.',
    howItWorks: 'Built with a React frontend and a Python backend. It uses generative AI to create content and a knowledge graph to track student progress through educational concepts.',
    technologies: ['React', 'Node.js', 'Python', 'PostgreSQL', 'OpenAI', 'Tailwind CSS'],
    techCategories: [
      { name: 'Frontend', items: ['React', 'Tailwind'], color: '#38bdf8' },
      { name: 'Intelligence', items: ['ChatGPT', 'Adaptive Logic'], color: '#22c55e' },
      { name: 'Backend', items: ['Node.js', 'Python'], color: '#a78bfa' },
    ],
    keyInnovations: [
      'Knowledge Graph-based progress tracking',
      'Dynamic curriculum adjustment engine',
      'AI-powered Socratic tutoring',
    ],
    processFlow: [
      'Assessment',
      'Path Generation',
      'Interactive Learning',
      'Feedback Loop',
    ],
    features: [
      'Personalized learning paths',
      'Instant AI tutoring',
      'Comprehensive teacher analytics',
    ],
    metrics: [
      { id: 'engagement', label: 'Engagement', value: 65, unit: '%', description: 'Increase in study time', color: '#38bdf8' },
      { id: 'retention', label: 'Retention', value: 40, unit: '%', description: 'Improvement in test scores', color: '#22c55e' },
    ],
    theme: {
      primary: '#38bdf8',
      secondary: '#22c55e',
      gradient: 'from-sky-500/20 to-emerald-500/20',
    },
    client: 'EdTech Startup',
    industry: 'Education',
    category: 'Full-Stack',
    challenge: 'Creating a truly personalized learning experience that adapts to individual student needs without requiring massive manual content creation.',
    solution: 'Leveraged generative AI to create content on-the-fly and a concept-mapping algorithm to ensure pedagogical soundness throughout the learning journey.',
    results: [
      { metric: 'Engagement', value: '+65%', context: 'User session length' },
      { metric: 'Score', value: '+40%', context: 'Test improvement' },
    ],
    duration: '5 Months',
  },
  {
    id: 'revos',
    number: 5,
    name: 'RevvOS',
    shortName: 'RevvOS',
    tagline: 'Automotive Workshop Management',
    description: 'Comprehensive platform digitizing workshop operations from job cards to inventory with AI-powered insights.',
    whatItDoes: 'RevvOS is a comprehensive, institutional-grade garage management system. We transformed chaotic paper trails into a seamless digital workflow—tracking everything from initial vehicle intake to final inventory allocation.',
    howItWorks: 'Built on a modern, type-safe stack combining the performance of React Server Components with the scalability of Supabase. Designed for extreme reliability on the shop floor.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Salesforce API', 'D3.js'],
    techCategories: [
      { name: 'Frontend', items: ['React', 'TypeScript', 'D3.js'], color: '#f472b6' },
      { name: 'Data', items: ['PostgreSQL', 'CRM APIs'], color: '#fb923c' },
      { name: 'Platform', items: ['Node.js', 'Serverless'], color: '#ef4444' },
    ],
    keyInnovations: [
      'Deal health scoring algorithm',
      'Automated pipeline hygiene checks',
      'Multi-source revenue attribution',
    ],
    processFlow: [
      'CRM Integration',
      'Data Cleansing',
      'ML Scoring',
      'Forecasting',
    ],
    features: [
      'Interactive deal board',
      'Visual revenue pipeline',
      'Automated sales reporting',
    ],
    metrics: [
      { id: 'forecast', label: 'Forecast', value: 92, unit: '%', description: 'Prediction accuracy', color: '#f472b6' },
      { id: 'cycle', label: 'Cycle', value: 20, unit: 'days', description: 'Avg reduction in cycle', color: '#fb923c' },
    ],
    theme: {
      primary: '#f472b6',
      secondary: '#fb923c',
      gradient: 'from-pink-500/20 to-orange-500/20',
    },
    client: 'Enterprise Sales Team',
    industry: 'Business Operations',
    category: 'Full-Stack',
    challenge: 'Solving data silos and inconsistent pipeline management that led to inaccurate revenue forecasting and missed targets.',
    solution: 'Built a centralized platform that enforces data standards and uses machine learning to provide a single, trustworthy source of truth for revenue data.',
    results: [
      { metric: 'Accuracy', value: '92%', context: 'Forecast precision' },
      { metric: 'Speed', value: '2x', context: 'Deal velocity' },
    ],
    duration: '4 Months',
  },
  {
    id: 'commune',
    number: 6,
    name: 'Commune',
    shortName: 'Commune',
    tagline: 'Community Communication Platform',
    description: 'Location-based community platform mapping physical tags to digital posts for geographic content discovery.',
    whatItDoes: 'Commune redefines local engagement by anchoring digital conversations to physical reality. We built a geographical content engine where posts are organically aggregated through dynamic map tagging.',
    howItWorks: 'A flexible relational architecture bridging the physical and digital. Built for speed and scale utilizing Supabase for fast media delivery and PostgreSQL for complex relational geospatial data mapping.',
    technologies: ['Solidity', 'Rust', 'React Native', 'IPFS', 'libp2p', 'Web3.js'],
    techCategories: [
      { name: 'Web3', items: ['Solidity', 'libp2p', 'IPFS'], color: '#38bdf8' },
      { name: 'System', items: ['Rust', 'Wasm'], color: '#a78bfa' },
      { name: 'Mobile', items: ['React Native'], color: '#2dd4bf' },
    ],
    keyInnovations: [
      'Data ownership through sovereign keys',
      'Peer-to-peer reputation scoring',
      'Decentralized identity management',
    ],
    processFlow: [
      'Identity Creation',
      'Node Handshake',
      'P2P Communication',
      'Ledger Persistence',
    ],
    features: [
      'Encrypted messaging',
      'Decentralized feed',
      'User-owned social graphs',
    ],
    metrics: [
      { id: 'privacy', label: 'Privacy', value: 100, unit: '%', description: 'Data ownership', color: '#38bdf8' },
      { id: 'uptime', label: 'Uptime', value: 99.9, unit: '%', description: 'Distributed availability', color: '#a78bfa' },
    ],
    theme: {
      primary: '#38bdf8',
      secondary: '#a78bfa',
      gradient: 'from-sky-500/20 to-violet-500/20',
    },
    client: 'Open Source Community',
    industry: 'Social Media',
    category: 'Full-Stack',
    challenge: 'Reclaiming personal data from social media giants and providing a platform for truly free and private communication.',
    solution: 'Designed and implemented a fully decentralized protocol that removes the need for centralized servers, putting control back into the hands of users.',
    results: [
      { metric: 'Ownership', value: '100%', context: 'of user data' },
      { metric: 'Freedom', value: 'Total', context: 'Censorship-free' },
    ],
    duration: '8 Months',
  },
];
