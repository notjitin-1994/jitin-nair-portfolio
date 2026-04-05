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
    howItWorks: 'The system uses a Bayesian Pantheon of agents (Hermes, Argus, Athena, Apollo) orchestrated via LangGraph. It fuses Price Action, Random Forest classifiers, and Gaussian HMMs to determine market regimes with 90% accuracy.',
    technologies: ['Python 3.13', 'LangGraph', 'TimescaleDB', 'cTrader OpenAPI', 'Numba', 'Random Forest', 'Gaussian HMM', 'Bayesian Inference', 'Next.js 15', 'WebSockets', 'Redis Streams', 'Prometheus', 'Grafana'],
    techCategories: [
      { name: 'Core Engine', items: ['Python 3.13', 'LangGraph', 'cTrader OpenAPI', 'Numba'], color: '#22d3ee' },
      { name: 'The Pantheon', items: ['Argus (Regime)', 'Athena (Strategy)', 'Apollo (Oracle)', 'Hermes (Data)'], color: '#14b8a6' },
      { name: 'Intelligence', items: ['Random Forest', 'Gaussian HMM', 'Bayesian Fusion'], color: '#2dd4bf' },
      { name: 'Ops & Data', items: ['TimescaleDB', 'Redis Streams', 'Prometheus'], color: '#06b6d4' },
    ],
    keyInnovations: [
      'Bayesian Confluence Engine with 90% regime detection accuracy',
      '16-node Dynamic Strategy Matrix for context-aware execution',
      'Absolute Time Anchor logic for zero-drift time synchronization',
      'Order Flow Imbalance (OFI) extraction from LOB Depth of Market',
      'Sub-10ms Bayesian posterior inference p99 latency',
      'Dual-independent scroll dashboard with real-time WebSocket pulse',
    ],
    processFlow: [
      'Hermes: High-Freq cTrader Socket Ingestion',
      'Argus: Multi-Timeframe Bayesian Regime Detection',
      'Athena: Dynamic Strategy Matrix Orchestration',
      'Apollo: Probabilistic Signal Inference',
      'Sentinel: MLOps & Integrity Monitoring',
      'Nexus Pulse: Real-time Visual Transparency',
    ],
    features: [
      '10ms p99 execution latency',
      '90% Bayesian regime detection accuracy',
      '70.2% validated strategy win rate',
      '5000+ messages/sec data throughput',
    ],
    metrics: [
      { id: 'latency', label: 'Latency', value: 10, unit: 'ms', description: 'p99 signal-to-socket', color: '#22d3ee' },
      { id: 'accuracy', label: 'Accuracy', value: 90, unit: '%', description: 'Regime classification', color: '#14b8a6' },
      { id: 'winrate', label: 'Win Rate', value: 70.2, unit: '%', description: 'Validated performance', color: '#2dd4bf' },
    ],
    theme: {
      primary: '#22d3ee',
      secondary: '#14b8a6',
      gradient: 'from-cyan-500/20 to-teal-500/20',
    },
    client: 'Proprietary',
    industry: 'FinTech / Algorithmic Trading',
    category: 'Agentic Systems',
    challenge: 'Scaling a script-based trading bot into an institutional-grade multi-agent system capable of handling high-frequency market data and complex regime-switching logic without compromising execution speed.',
    solution: 'Engineered the Predator Nexus V4.0, a decentralized Bayesian Pantheon of agents. Implemented a multithreaded ingestion layer (Hermes), a probabilistic regime observer (Argus), and a dynamic strategy matrix (Athena) to create a robust, low-latency intelligence loop.',
    results: [
      { metric: 'Latency', value: '10ms', context: 'p99 execution' },
      { metric: 'Accuracy', value: '90%', context: 'Regime detection' },
      { metric: 'Win Rate', value: '70.2%', context: 'Backtested performance' },
      { metric: 'Efficiency', value: '10x', context: 'via Numba JIT' },
    ],
    duration: '6 Months',
  },
  {
    id: 'agency',
    number: 2,
    name: 'OpenClaw: Reality Check Engine',
    shortName: 'RCE',
    tagline: 'Native Anti-Hallucination & Cognitive Memory Stack',
    description: 'A mission-critical reinforcement layer for OpenClaw Gateway, implementing a 3-stage Reality Check Engine and a hierarchical cognitive memory system to eliminate agentic hallucinations.',
    whatItDoes: 'Hardens AI infrastructure against logic errors and false claims. Intercepts tool calls for intent verification, audits responses for factual accuracy using Chain-of-Verification (CoVe), and manages long-term memory distillation via automated "Dreamcycle" routines.',
    howItWorks: 'Integrated as a native TypeScript plugin within the OpenClaw Gateway. Utilizes sequential hooks (before_tool_call, message_sending, before_prompt_build) to orchestrate a validator model (Gemini) and a memory-optimization pipeline (QMD + LanceDB).',
    technologies: ['OpenClaw SDK', 'TypeScript', 'QMD Backend', 'LanceDB', 'SQLite', 'Gemini', 'GLM', 'Systemd'],
    techCategories: [
      { name: 'Core', items: ['OpenClaw SDK', 'TypeScript', 'Systemd'], color: '#a78bfa' },
      { name: 'Memory', items: ['QMD', 'LanceDB', 'SQLite'], color: '#f472b6' },
      { name: 'Intelligence', items: ['Gemini', 'GLM'], color: '#22c55e' },
    ],
    keyInnovations: [
      '3-Stage Reality Check Engine (RCE)',
      'Automated "Dreamcycle" Memory Distillation',
      'Real-time Intent Validation Hook',
      'Strict RAG Context Grounding Policy',
    ],
    processFlow: [
      'Intercept Sensitive Tool Calls',
      'Validate Intent via SLM Guard',
      'Audit Claims via CoVe Plugin',
      'Distill Memories Nightly',
    ],
    features: [
      'Zero-overhead process monitoring',
      'Recursive protection for sub-agents',
      'Dynamic context window optimization',
    ],
    metrics: [
      { id: 'hallucination-reduction', label: 'Hallucination reduction', value: 85, unit: '%', description: 'via Intent Validation', color: '#a78bfa' },
      { id: 'context-density', label: 'Context Density', value: 400, unit: '%', description: 'Working memory expansion', color: '#f472b6' },
    ],
    results: [
      { metric: 'Hallucination Rate', value: '-85%', context: 'via Intent Validation' },
      { metric: 'Context Density', value: '4x', context: 'Working memory expansion' },
      { metric: 'Uptime', value: '99.9%', context: 'Native Systemd hardening' },
      { metric: 'Inference Latency', value: '<200ms', context: 'Validation overhead' },
    ],
    theme: {
      primary: '#a78bfa',
      secondary: '#f472b6',
      gradient: 'from-violet-500/20 to-pink-500/20',
    },
    client: 'Personal Infrastructure',
    industry: 'AI Security / Infra',
    category: 'Agentic Systems',
    challenge: 'Preventing "Rogue AI" actions and hallucinations in high-stakes trading and system-level automation without introducing massive latency or operational complexity.',
    solution: 'Engineered a native reinforcement plugin that anchors agent cognition to verifiable context and user intent through a multi-tier auditing pipeline.',
    duration: 'Continuous Integration',
  },
  {
    id: 'reality',
    number: 3,
    name: 'Reality Check',
    shortName: 'Reality',
    tagline: 'Anti-Hallucination Guardrail',
    description: 'An AI safety layer that validates LLM outputs against ground truth data sources using semantic verification.',
    whatItDoes: 'Reality Check intercepts LLM responses and verifies factual claims against verified knowledge bases or external APIs before the user sees the output.',
    howItWorks: 'Uses RAG patterns to retrieve supporting context. A secondary critic agent performs a cross-check between the prompt, the context, and the proposed answer.',
    technologies: ['OpenAI', 'Pinecone', 'Python', 'FastAPI', 'React', 'TypeScript'],
    techCategories: [
      { name: 'AI Layer', items: ['ChatGPT', 'Critic Agents'], color: '#fb923c' },
      { name: 'Vector DB', items: ['Pinecone', 'Semantic Search'], color: '#ef4444' },
      { name: 'API', items: ['FastAPI', 'GraphQL'], color: '#38bdf8' },
    ],
    keyInnovations: [
      'Deterministic verification of non-deterministic outputs',
      'Contextual grounding confidence scores',
      'Automated fact-checking pipeline',
    ],
    processFlow: [
      'Input Detection',
      'Claim Extraction',
      'Context Retrieval',
      'Fact Verification',
      'Output Filtering',
    ],
    features: [
      'Hallucination detection > 95%',
      'Sub-200ms verification latency',
      'Custom ground-truth integration',
    ],
    metrics: [
      { id: 'precision', label: 'Precision', value: 98, unit: '%', description: 'Detection accuracy', color: '#fb923c' },
      { id: 'safety', label: 'Safety', value: 100, unit: '%', description: 'Factual compliance', color: '#ef4444' },
    ],
    theme: {
      primary: '#fb923c',
      secondary: '#ef4444',
      gradient: 'from-orange-500/20 to-red-500/20',
    },
    client: 'HealthTech Provider',
    industry: 'Healthcare',
    category: 'AI Automation',
    challenge: 'Implementing generative AI in a medical context where factual accuracy is non-negotiable and hallucinations could have serious consequences.',
    solution: 'Developed a dual-agent verification system that enforces strict grounding on medical documentation, rejecting any claims not explicitly supported by the evidence.',
    results: [
      { metric: 'Accuracy', value: '99.2%', context: 'Medical compliance' },
      { metric: 'Risk', value: '-95%', context: 'Hallucination reduction' },
    ],
    duration: '3 Months',
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
    name: 'RevOS',
    shortName: 'RevOS',
    tagline: 'Revenue Operations OS',
    description: 'Unified command center for B2B sales teams, automating pipeline tracking and revenue forecasting.',
    whatItDoes: 'RevOS connects to CRM systems to provide a clean, actionable view of the sales pipeline, identifying bottlenecks and predicting quarterly revenue.',
    howItWorks: 'The system uses a combination of traditional statistical models and machine learning to forecast sales cycles and identify deals at risk.',
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
    tagline: 'Decentralized Social Engine',
    description: 'Privacy-focused social networking protocol built on distributed ledger technology.',
    whatItDoes: 'Commune allows users to own their data and interact in a censorship-resistant environment without centralized authorities.',
    howItWorks: 'Built on a custom blockchain architecture with a React Native frontend. It uses end-to-end encryption for all communications and IPFS for storage.',
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
