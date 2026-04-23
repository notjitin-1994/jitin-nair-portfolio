import { Search, Users, Network, Brain, Code2, Database, Cloud, Workflow, Zap, Sparkles, Boxes, Bot, Cpu, ImageIcon, Layout, Server, BookOpen } from "lucide-react";

export const projectsData = [
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
        whatItDoes: "Predator is a fully autonomous gold trading system that scalps XAU/USD by detecting market regimes (trending, ranging, volatile) and adapting its strategy in real-time. It processes tick data through 5 specialized agents, each handling a specific layer of the trading pipeline-from ingestion to execution.",
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
        liveUrl: undefined,
        learnMoreUrl: "/projects/predator",
      },
      {
        name: "AI Agency Ops",
        shortName: "Agency",
        technologies: ["Claude", "Google Gemini", "ChatGPT", "Kimi", "Ollama", "Qwen", "Python", "FastAPI", "LangGraph", "Redis", "Model Context Protocols", "Telegram API", "WhatsApp API", "GitHub API", "Slack API"],
        description: "Unified multi-agent orchestration platform managing 30+ specialized AI agents-from code automation and content generation to IoT control and knowledge management.",
        processFlow: ["Intent Recognition (NLP)", "Agent Selection (Matching)", "Context Retrieval (Vector)", "Tool Execution (MCP)", "Cross-Agent Coordination"],
        features: ["30+ specialized agents", "Cross-agent workflows", "Model Context Protocols", "Context Management", "Real-time event bus", "Vector memory"],
        keyInnovations: [
          "Model Context Protocols for cross-agent tool sharing",
          "LangGraph state machines for complex workflows",
          "Vector memory for context persistence",
          "Real-time event bus with Redis Streams",
          "Multi-LLM routing across 6 providers"
        ],
        githubUrl: "https://github.com/jitinnair1",
        liveUrl: undefined,
      },
      {
        name: "LocalMind",
        shortName: "LocalMind",
        technologies: [
          "Python", "Gemini", "ChromaDB", "RAG", "Hybrid Search", "CLI",
          "Reciprocal Rank Fusion", "Incremental Indexing", "SHA-256", "AST Parsing"
        ],
        techCategories: [
          { name: "Core Engine", items: ["Python", "Incremental Indexing", "SHA-256"], color: "#22d3ee" },
          { name: "Search & Retrieval", items: ["ChromaDB", "Hybrid Search", "RRF"], color: "#22d3ee" },
          { name: "AI & Parsing", items: ["Gemini", "AST-based Code Parsing"], color: "#22d3ee" },
          { name: "Interface", items: ["CLI-Native", "Citation System"], color: "#22d3ee" }
        ],
        description: "High-performance local RAG system that enables natural language interaction with your desktop files, documents, and codebases—entirely offline and grounded in your personal data.",
        whatItDoes: "LocalMind indexes your local filesystem and provides a chat interface to query your documents. It uses semantic and keyword search to retrieve relevant context from PDFs, code, notes, and data files, providing answers grounded in actual local content with full citations.",
        howItWorks: "Scans directories using SHA-256 for incremental updates. Parses diverse file formats (AST-based for Python, regex for TS/JS). Generates recursive chunks with overlap. Stores embeddings in a local ChromaDB instance. Executes hybrid search using Reciprocal Rank Fusion (RRF) and passes top context to Gemini for final generation.",
        keyInnovations: [
          "Incremental indexing via SHA-256 file hashing",
          "Hybrid Search (Semantic + Keyword) with RRF",
          "AST-based intelligent parsing for source code",
          "Recursive character splitting with overlap",
          "Grounding with citations and source transparency",
          "Zero-infrastructure local persistent storage"
        ],
        processFlow: [
          "Filesystem Scanning & Hashing",
          "Multi-format Content Parsing",
          "Intelligent Recursive Chunking",
          "Vector Embedding Generation",
          "Hybrid Retrieval & RRF",
          "Context-Grounded Generation"
        ],
        features: [
          "1000+ files/min indexing speed",
          "<1s retrieval p99 latency",
          "Support for 10+ file formats",
          "Local ChromaDB persistence",
          "Gemini-powered reasoning",
          "CLI-native chat interface"
        ],
        metrics: [
          { label: "Indexing Speed", value: "1000", unit: "files/min" },
          { label: "Retrieval Latency", value: "<1", unit: "sec" },
          { label: "Formats Supported", value: "12", unit: "+" },
          { label: "Storage Efficiency", value: "1", unit: "GB/14K files" }
        ],
        githubUrl: "https://github.com/jitinnair1",
        liveUrl: undefined,
      },
      {
        name: "Smartslate AI-First Learning Ecosystem",
        shortName: "Smartslate",
        technologies: [
          "React", "TypeScript", "Vite", "Supabase", "PostgreSQL", "Row Level Security",
          "Claude", "ChatGPT", "Perplexity API", "Webhook Workers",
          "Framer Motion", "Tailwind CSS", "Zustand", "React Query", "TipTap Editor"
        ],
        techCategories: [
          { name: "Frontend Core", items: ["React 18", "TypeScript", "Vite", "Framer Motion"], color: "#22d3ee" },
          { name: "AI/ML Layer", items: ["Claude", "ChatGPT", "Perplexity"], color: "#22d3ee" },
          { name: "Backend & Data", items: ["Supabase", "PostgreSQL RLS", "Edge Functions"], color: "#22d3ee" },
          { name: "Async Pipeline", items: ["Webhook Workers", "Job Queue", "Real-time"], color: "#22d3ee" }
        ],
        description: "AI-native Learning & Development platform",
        whatItDoes: "SmartSlate Polaris is an autonomous-first AI learning design ecosystem that automates the entire L&D lifecycle—from discovery to delivery. Utilizing a proprietary Two-Phase Intelligence Engine, it captures 100% of requirements with a Zero Revision Guarantee, achieving 15x launch speed gains over traditional methods.",
        howItWorks: "The pipeline begins with Polaris Two-Phase Discovery: AI conducts deep-dive stakeholder interviews and analyzes context to generate production-ready Learning Blueprints in under 60 minutes. Constellation then automates instructional design using expert frameworks, while Nova handles AI-native content authoring. Orbit delivers via an AI-powered LMS, Nebula provides 24/7 intelligent tutoring, and Spectrum provides real-time ROI analytics.",
        keyInnovations: [
          "Human-in-the-Loop validation gates at every AI generation stage",
          "Automated discovery via contextual 7-stage AI questionnaires",
          "AI-native instructional design using established learning frameworks",
          "Integrated content development with SME curation workflows",
          "Unified AI-powered LMS with adaptive learning paths",
          "24/7 AI Tutor with seamless human escalation",
          "Closed-loop analytics feeding continuous improvement"
        ],
        processFlow: [
          "Role & Organization Discovery",
          "Contextual 7-Stage Questionnaire",
          "Multi-Provider AI Analysis",
          "Async Report Generation Job",
          "Webhook Completion Notification",
          "Interactive Learning Blueprint Delivery"
        ],
        features: [
          "Automated HITL Learning Discovery",
          "Automated HITL Instructional Design",
          "AI-native Learning Content Development",
          "AI-powered LMS",
          "AI Tutor",
          "AI-Powered Data Analytics"
        ],
        metrics: [
          { label: "Questionnaire Stages", value: "7", unit: "stages" },
          { label: "AI Providers", value: "3", unit: "providers" },
          { label: "Async Jobs", value: "500+", unit: "daily" },
          { label: "Report Gen Time", value: "45", unit: "seconds" }
        ],
        githubUrl: undefined,
        liveUrl: "https://smartslate.io",
        learnMoreUrl: "/projects/smartslate",
      },
      {
        name: "RevOS",
        shortName: "RevOS",
        technologies: [
          "Next.js 14", "TypeScript", "Supabase", "PostgreSQL", "Prisma",
          "TanStack Query", "Zustand", "React Hook Form", "Zod", "DnD Kit",
          "FullCalendar", "Framer Motion", "Tailwind CSS", "Radix UI"
        ],
        techCategories: [
          { name: "Frontend Core", items: ["Next.js 14", "TypeScript", "Tailwind", "Radix UI"], color: "#22d3ee" },
          { name: "State & Data", items: ["TanStack Query", "Zustand", "React Hook Form", "Zod"], color: "#22d3ee" },
          { name: "Backend & DB", items: ["Supabase", "PostgreSQL", "Prisma"], color: "#22d3ee" },
          { name: "Features", items: ["DnD Kit", "FullCalendar", "Framer Motion"], color: "#22d3ee" }
        ],
        description: "Automotive garage management system streamlining workshop operations from job cards to inventory with AI-powered insights.",
        whatItDoes: "RevOS (RevvOS) is a comprehensive automotive workshop management platform that digitizes every aspect of garage operations. It handles complete service job lifecycles through intelligent Job Cards, manages parts inventory with auto-save and stock tracking, maintains a Vehicle Registry with full service history, and provides Customer CRM with engagement tools. The system includes Employee Management with role-based access, Calendar scheduling for work slots, and Marketing automation for customer retention-all with AI-powered analytics insights.",
        howItWorks: "The platform centers on the Job Card system that tracks vehicles from intake to delivery through customizable workflows. Service advisors create job cards with customer and vehicle details, mechanics log labor and parts used, and managers monitor progress through real-time dashboards. The Inventory Management module auto-tracks parts consumption, alerts on low stock, and maintains supplier relationships. The Vehicle Registry builds comprehensive service histories enabling predictive maintenance recommendations. Customer Management integrates with marketing tools for automated service reminders and promotional campaigns.",
        keyInnovations: [
          "End-to-end job card lifecycle management with status workflows",
          "Auto-save inventory with real-time stock tracking and alerts",
          "Vehicle service history with predictive maintenance insights",
          "Role-based access control for multi-level garage hierarchies",
          "Integrated marketing automation for customer retention",
          "AI-powered analytics dashboard for workshop optimization"
        ],
        processFlow: [
          "Vehicle Intake & Job Creation",
          "Service Planning & Parts Allocation",
          "Mechanic Assignment & Work Execution",
          "Quality Check & Completion",
          "Customer Delivery & Feedback",
          "Service History Update"
        ],
        features: [
          "Digital job card management",
          "Real-time inventory tracking",
          "Vehicle service history",
          "Customer CRM & marketing",
          "Employee RBAC system",
          "AI-powered analytics"
        ],
        metrics: [
          { label: "Job Cards", value: "500+", unit: "monthly" },
          { label: "Inventory Items", value: "10K+", unit: "parts" },
          { label: "Vehicles", value: "5K+", unit: "tracked" },
          { label: "Uptime", value: "99.5", unit: "%" }
        ],
        githubUrl: undefined,
        liveUrl: "https://glitchzero.com",
      },
      {
        name: "Project Commune",
        shortName: "Commune",
        technologies: ["Next.js 14", "TypeScript", "Supabase", "Leaflet", "Zustand"],
        techCategories: [
          { name: "Frontend", items: ["Next.js 14", "React", "TypeScript", "Tailwind"], color: "#22d3ee" },
          { name: "Maps", items: ["Leaflet", "React-Leaflet", "OpenStreetMap"], color: "#22d3ee" },
          { name: "Backend", items: ["Supabase", "PostgreSQL", "Realtime"], color: "#22d3ee" },
          { name: "State", items: ["Zustand", "Framer Motion"], color: "#22d3ee" }
        ],
        description: "Privacy-first community communication platform enabling anonymous collaboration through map-based location tagging, WhatsApp-style workspaces, and role-based project management.",
        whatItDoes: "Commune is a community communication platform designed for privacy-conscious collaboration. It combines map-based location tagging with anonymous workspaces, allowing users to discover and connect around geographic interests without exposing personal identity. The platform supports tiered account systems (Brokers and Users), project management with customizable checklists, and photo-sharing-all within privacy-preserving workspaces where participants interact through roles rather than identities.",
        howItWorks: "Users explore an interactive map to discover location-based communities or create their own geographic tags. Posts can be linked to these tags, creating location-aware content feeds. The WhatsApp-style workspace system enables anonymous group collaboration where members are identified by roles rather than personal information. Brokers can create networks, invite participants, and manage projects with role-based checklists. All interactions preserve privacy-no phone numbers, emails, or personal identifiers are exposed between members.",
        keyInnovations: [
          "Anonymous workspace participation with role-based identity",
          "Map-tag relationship system for location-aware content",
          "Tiered account architecture (Paid/Free Broker, Paid User)",
          "Project management with template-based checklists",
          "Privacy-preserving network architecture",
          "WhatsApp-style messaging without identity exposure"
        ],
        processFlow: [
          "Map Discovery & Tag Creation",
          "Anonymous Network Join",
          "Role-Based Workspace Access",
          "Project Creation & Checklist Setup",
          "Task Assignment & Tracking",
          "Community Content Sharing"
        ],
        features: [
          "Interactive community map",
          "Anonymous workspaces",
          "Project checklists",
          "Role-based permissions",
          "Photo sharing",
          "Network management"
        ],
        metrics: [
          { label: "Networks", value: "50+", unit: "active" },
          { label: "Workspaces", value: "200+", unit: "created" },
          { label: "Privacy", value: "100", unit: "%" },
          { label: "Uptime", value: "99.9", unit: "%" }
        ],
        githubUrl: "https://github.com/notjitin-1994/commune",
        liveUrl: undefined,
      },
    ];
export const capabilitiesData = {
      aiAndAgents: {
        title: "AI & Agentic Systems",
        icon: Brain,
        color: "#22d3ee",
        skills: [
          { name: "LangGraph Orchestration", level: 95 },
          { name: "Multi-Agent Systems", level: 95 },
          { name: "LLM Integration (ChatGPT, Claude, Gemini)", level: 90 },
          { name: "RAG & Vector Databases", level: 88 },
          { name: "Chain-of-Verification", level: 92 },
          { name: "Autonomous Decision Systems", level: 90 },
          { name: "Prompt Engineering", level: 95 },
          { name: "AI Safety & Alignment", level: 85 },
        ],
      },
      development: {
        title: "Full-Stack Development",
        icon: Code2,
        color: "#22d3ee",
        skills: [
          { name: "React & Next.js", level: 92 },
          { name: "TypeScript", level: 90 },
          { name: "Node.js & Python", level: 88 },
          { name: "Database Design (PostgreSQL, TimescaleDB)", level: 85 },
          { name: "API Architecture", level: 90 },
          { name: "Real-time Systems", level: 88 },
          { name: "Desktop Apps (Tauri, Electron)", level: 82 },
          { name: "Cloud Infrastructure", level: 85 },
        ],
      },
      integrations: {
        title: "Enterprise Integrations",
        icon: Workflow,
        color: "#22d3ee",
        skills: [
          { name: "GitHub API & Automation", level: 90 },
          { name: "Google Workspace (Gmail, Calendar, Drive)", level: 88 },
          { name: "1Password Secrets Management", level: 85 },
          { name: "Discord & Telegram Bots", level: 92 },
          { name: "WhatsApp Business API", level: 80 },
          { name: "Philips Hue & IoT", level: 85 },
          { name: "Sonos/BluOS Audio Systems", level: 82 },
          { name: "Email (IMAP/SMTP)", level: 88 },
        ],
      },
      automation: {
        title: "Intelligent Automation",
        icon: Zap,
        color: "#22d3ee",
        skills: [
          { name: "Browser Automation (Playwright)", level: 92 },
          { name: "Web Scraping & Data Extraction", level: 90 },
          { name: "CI/CD Pipeline Design", level: 85 },
          { name: "Infrastructure as Code", level: 82 },
          { name: "Docker & Containerization", level: 88 },
          { name: "Systemd & Process Management", level: 85 },
          { name: "Monitoring & Observability", level: 88 },
          { name: "Auto-recovery Systems", level: 90 },
        ],
      },
      content: {
        title: "Content & Media",
        icon: Sparkles,
        color: "#22d3ee",
        skills: [
          { name: "AI Image Generation", level: 88 },
          { name: "Video Processing (FFmpeg)", level: 85 },
          { name: "Speech-to-Text (Whisper)", level: 90 },
          { name: "Text Summarization", level: 92 },
          { name: "Technical Writing", level: 90 },
          { name: "Documentation Systems", level: 88 },
          { name: "GIF/Visual Search", level: 82 },
          { name: "Audio Analysis", level: 80 },
        ],
      },
      research: {
        title: "Research & Intelligence",
        icon: Search,
        color: "#22d3ee",
        skills: [
          { name: "Web Search & Verification", level: 92 },
          { name: "Code Search (GitHub/StackOverflow)", level: 90 },
          { name: "Company Intelligence", level: 85 },
          { name: "Source Verification", level: 92 },
          { name: "Technical Research", level: 90 },
          { name: "Trend Analysis", level: 85 },
          { name: "Academic Paper Analysis", level: 82 },
          { name: "Competitive Intelligence", level: 85 },
        ],
      },
    };
export const toolCategories = [
      {
        category: "AI, ML & Frontier LLM Orchestration",
        icon: Brain,
        description: "State-of-the-art large language models and orchestration frameworks",
        tools: [
          { name: "Claude", level: "Expert", description: "Anthropic's latest reasoning models for complex agentic workflows" },
          { name: "ChatGPT", level: "Expert", description: "OpenAI's multimodal models with advanced reasoning" },
          { name: "Gemini", level: "Expert", description: "Google's long-context multimodal AI system" },
          { name: "Llama", level: "Advanced", description: "Meta's open-weight frontier model" },
          { name: "DeepSeek", level: "Advanced", description: "High-performance open reasoning models" },
          { name: "LangGraph", level: "Expert", description: "Stateful multi-agent workflow orchestration" },
          { name: "LangChain", level: "Expert", description: "LLM application development framework" },
          { name: "Semantic Kernel", level: "Advanced", description: "Microsoft's agent SDK for enterprise AI" },
          { name: "RAG Architecture", level: "Expert", description: "Retrieval-augmented generation systems" },
          { name: "Chain-of-Verification", level: "Expert", description: "Self-correction and fact-checking pipelines" },
          { name: "Fine-tuning & RLHF", level: "Advanced", description: "Model customization and alignment techniques" },
        ],
      },
      {
        category: "Agentic Ecosystems",
        icon: Boxes,
        description: "Multi-agent platforms, protocols, and memory systems",
        tools: [
          { name: "OpenClaw", level: "Expert", description: "Native anti-hallucination reinforcement and hierarchical cognitive memory architecture" },
          { name: "NemoClaw", level: "Expert", description: "Specialized multi-agent workflow system" },
          { name: "AutoGen", level: "Advanced", description: "Microsoft's conversational agent framework" },
          { name: "CrewAI", level: "Advanced", description: "Role-based multi-agent collaboration" },
          { name: "MCP (Model Context Protocol)", level: "Advanced", description: "Standardized agent-tool integration protocol" },
          { name: "A2A Protocol", level: "Intermediate", description: "Agent-to-agent communication standard" },
          { name: "Pinecone", level: "Expert", description: "Managed vector database for semantic search" },
          { name: "Weaviate", level: "Advanced", description: "Open-source AI-native vector database" },
          { name: "Chroma", level: "Advanced", description: "Embeddings database for LLM apps" },
          { name: "Qdrant", level: "Intermediate", description: "High-performance vector similarity search" },
          { name: "Knowledge Graphs", level: "Advanced", description: "Neo4j-based entity-relationship systems" },
          { name: "Agent Memory Systems", level: "Advanced", description: "Long-term context and session management" },
        ],
      },
      {
        category: "Automation",
        icon: Bot,
        description: "Browser automation, workflow orchestration, and ETL pipelines",
        tools: [
          { name: "Playwright", level: "Expert", description: "Reliable end-to-end testing and automation" },
          { name: "Selenium 4", level: "Advanced", description: "Cross-browser WebDriver automation" },
          { name: "Puppeteer", level: "Advanced", description: "Headless Chrome DevTools protocol" },
          { name: "n8n", level: "Expert", description: "Fair-code workflow automation platform" },
          { name: "Make (Integromat)", level: "Advanced", description: "Visual workflow automation" },
          { name: "Zapier", level: "Intermediate", description: "No-code app integration platform" },
          { name: "Temporal", level: "Advanced", description: "Durable workflow execution for microservices" },
          { name: "Airflow", level: "Intermediate", description: "Programmatic workflow orchestration" },
          { name: "GitHub Actions", level: "Expert", description: "CI/CD automation and DevOps pipelines" },
          { name: "Scheduled Jobs (Cron)", level: "Expert", description: "Time-based task automation" },
        ],
      },
      {
        category: "GenAI & Content Development",
        icon: Sparkles,
        description: "AI-generated media, audio, video, and creative workflows",
        tools: [
          { name: "ElevenLabs", level: "Expert", description: "Voice cloning and text-to-speech synthesis" },
          { name: "Suno / Udio", level: "Advanced", description: "AI music generation platforms" },
          { name: "Runway ML", level: "Advanced", description: "AI video generation and editing" },
          { name: "Midjourney v6", level: "Expert", description: "High-fidelity AI image generation" },
          { name: "Stable Diffusion", level: "Advanced", description: "Open image generation models" },
          { name: "Flux", level: "Advanced", description: "State-of-the-art open image models" },
          { name: "ChatGPT", level: "Expert", description: "Multimodal image understanding" },
          { name: "Whisper API", level: "Expert", description: "OpenAI's speech recognition" },
          { name: "FFmpeg", level: "Advanced", description: "Video/audio processing toolkit" },
          { name: "Content Pipelines", level: "Expert", description: "Automated media workflow systems" },
        ],
      },
      {
        category: "Local LLMs & SLMs",
        icon: Cpu,
        description: "On-premise inference, small language models, and edge deployment",
        tools: [
          { name: "Ollama", level: "Expert", description: "Local LLM management and serving" },
          { name: "llama.cpp", level: "Advanced", description: "Optimized C++ inference engine" },
          { name: "vLLM", level: "Advanced", description: "High-throughput LLM serving" },
          { name: "TensorRT-LLM", level: "Intermediate", description: "NVIDIA GPU-optimized inference" },
          { name: "Gemma", level: "Advanced", description: "Google's lightweight open models" },
          { name: "Phi", level: "Advanced", description: "Microsoft's small capable models" },
          { name: "Mistral Small", level: "Advanced", description: "Efficient European SLMs" },
          { name: "Qwen", level: "Advanced", description: "Alibaba's multilingual models" },
          { name: "Quantization (GGUF)", level: "Advanced", description: "Model compression for edge deployment" },
          { name: "LM Studio", level: "Intermediate", description: "Desktop LLM experimentation" },
        ],
      },
      {
        category: "Local GenAI",
        icon: ImageIcon,
        description: "Private image generation and local creative AI pipelines",
        tools: [
          { name: "ComfyUI", level: "Expert", description: "Node-based Stable Diffusion interface" },
          { name: "Stable Diffusion WebUI", level: "Advanced", description: "Automatic1111 interface" },
          { name: "Fooocus", level: "Advanced", description: "Simplified local image generation" },
          { name: "InvokeAI", level: "Intermediate", description: "Professional creative workflow tool" },
          { name: "Local Image Pipelines", level: "Advanced", description: "Private on-premise generation" },
          { name: "LoRA Training", level: "Intermediate", description: "Lightweight model fine-tuning" },
          { name: "ControlNet", level: "Advanced", description: "Conditional image generation control" },
          { name: "IP-Adapter", level: "Intermediate", description: "Image prompt conditioning" },
        ],
      },
      {
        category: "UX & Design Coding",
        icon: Layout,
        description: "Modern frontend frameworks, design systems, and interaction design",
        tools: [
          { name: "React", level: "Expert", description: "Latest React with Server Components" },
          { name: "Next.js", level: "Expert", description: "App Router, RSC, and edge runtime" },
          { name: "TypeScript", level: "Expert", description: "Strict type-safe development" },
          { name: "Tailwind CSS", level: "Expert", description: "Utility-first CSS framework" },
          { name: "Framer Motion", level: "Expert", description: "Production animation library" },
          { name: "shadcn/ui", level: "Expert", description: "Copy-paste component architecture" },
          { name: "Radix UI", level: "Advanced", description: "Unstyled accessible primitives" },
          { name: "Figma-to-Code", level: "Advanced", description: "Design handoff automation" },
          { name: "Design Systems", level: "Advanced", description: "Component libraries and tokens" },
          { name: "A11y (Accessibility)", level: "Advanced", description: "WCAG-compliant inclusive design" },
          { name: "Storybook", level: "Intermediate", description: "Component documentation and testing" },
        ],
      },
      {
        category: "Backend & Database",
        icon: Server,
        description: "APIs, databases, ORMs, and serverless architectures",
        tools: [
          { name: "Python", level: "Expert", description: "AI/ML backbone with latest features" },
          { name: "FastAPI", level: "Expert", description: "High-performance async Python APIs" },
          { name: "Node.js", level: "Advanced", description: "Latest LTS with native fetch" },
          { name: "GraphQL", level: "Advanced", description: "Flexible API query language" },
          { name: "tRPC", level: "Advanced", description: "End-to-end typesafe APIs" },
          { name: "PostgreSQL", level: "Expert", description: "Advanced relational database" },
          { name: "MongoDB Atlas", level: "Advanced", description: "Managed NoSQL document store" },
          { name: "Redis", level: "Advanced", description: "In-memory data and caching" },
          { name: "Supabase", level: "Expert", description: "Open-source Firebase alternative" },
          { name: "Prisma ORM", level: "Advanced", description: "Next-gen type-safe database toolkit" },
          { name: "Drizzle ORM", level: "Advanced", description: "Lightweight SQL-like ORM" },
          { name: "ClickHouse", level: "Intermediate", description: "Columnar analytics database" },
        ],
      },
      {
        category: "Systems Design",
        icon: Cloud,
        description: "Architecture patterns, infrastructure, and DevOps",
        tools: [
          { name: "Microservices", level: "Expert", description: "Distributed service architecture" },
          { name: "Event-Driven (EDA)", level: "Expert", description: "Async message-based systems" },
          { name: "CQRS / Event Sourcing", level: "Advanced", description: "Command-query separation patterns" },
          { name: "Docker", level: "Expert", description: "Containerization and multi-stage builds" },
          { name: "Kubernetes", level: "Intermediate", description: "Container orchestration platform" },
          { name: "Terraform", level: "Advanced", description: "Infrastructure as Code (IaC)" },
          { name: "AWS / GCP / Azure", level: "Advanced", description: "Cloud platform expertise" },
          { name: "Linux / Systemd", level: "Expert", description: "System administration and services" },
          { name: "Nginx", level: "Advanced", description: "Reverse proxy and load balancing" },
          { name: "Monitoring (Grafana)", level: "Intermediate", description: "Observability and alerting" },
        ],
      },
      {
        category: "Instructional Design",
        icon: BookOpen,
        description: "Learning experience design, content development, and pedagogy",
        tools: [
          { name: "ADDIE Model", level: "Expert", description: "Systematic instructional design framework" },
          { name: "Agile for Learning", level: "Expert", description: "Iterative development for training" },
          { name: "Video-Based Learning", level: "Expert", description: "Scripted educational video production" },
          { name: "SCORM / xAPI", level: "Advanced", description: "E-learning interoperability standards" },
          { name: "React Interactive Content", level: "Expert", description: "JavaScript-based learning modules" },
          { name: "H5P", level: "Advanced", description: "Open-source interactive content" },
          { name: "Articulate Storyline", level: "Advanced", description: "Professional e-learning authoring" },
          { name: "Learning Analytics", level: "Intermediate", description: "Data-driven learning insights" },
          { name: "Competency Frameworks", level: "Advanced", description: "Skill-based learning pathways" },
          { name: "Microlearning", level: "Expert", description: "Bite-sized just-in-time learning" },
          { name: "Gamification", level: "Intermediate", description: "Game mechanics for engagement" },
        ],
      },
      {
        category: "Soft Skills",
        icon: Users,
        description: "Communication, leadership, and multilingual proficiency",
        tools: [
          { name: "Communication", level: "Expert", description: "Technical writing, presentations, stakeholder management" },
          { name: "Leadership", level: "Advanced", description: "Team mentoring, project direction, decision-making" },
          { name: "Problem Solving", level: "Expert", description: "Analytical thinking and creative solutions" },
          { name: "Cross-Cultural Collaboration", level: "Advanced", description: "Global team coordination" },
          { name: "Adaptability", level: "Expert", description: "Rapid learning and technology adoption" },
          { name: "Critical Thinking", level: "Expert", description: "Evidence-based decision making" },
          { name: "English", level: "Expert", description: "Native proficiency - business and technical" },
          { name: "Malayalam", level: "Expert", description: "Native proficiency" },
          { name: "Hindi", level: "Advanced", description: "Strong command - professional fluency" },
          { name: "Tamil", level: "Advanced", description: "Strong command - conversational and business" },
          { name: "Kannada", level: "Advanced", description: "Strong command - conversational proficiency" },
        ],
      },
    ];
export const primaryStack = [
      // AI, ML & Frontier LLMs
      { name: "Claude", level: "Expert", description: "Advanced reasoning and agentic tasks", category: "AI, ML & Frontier", icon: Brain },
      { name: "ChatGPT", level: "Expert", description: "Multimodal AI integration", category: "AI, ML & Frontier", icon: Brain },
      { name: "DeepSeek", level: "Advanced", description: "Open reasoning model", category: "AI, ML & Frontier", icon: Brain },
      // Agentic Ecosystems
      { name: "LangGraph", level: "Expert", description: "Multi-agent orchestration", category: "Agentic", icon: Boxes },
      { name: "OpenClaw", level: "Expert", description: "Fact-hardened agent platform", category: "Agentic", icon: Boxes },
      { name: "NemoClaw", level: "Expert", description: "Specialized agent system", category: "Agentic", icon: Boxes },
      { name: "Pinecone", level: "Expert", description: "Vector search database", category: "Agentic", icon: Boxes },
      // Automation
      { name: "Playwright", level: "Expert", description: "Browser automation", category: "Automation", icon: Bot },
      { name: "n8n", level: "Expert", description: "Workflow automation", category: "Automation", icon: Bot },
      // GenAI & Content
      { name: "ElevenLabs", level: "Expert", description: "Voice synthesis", category: "GenAI", icon: Sparkles },
      { name: "Midjourney v6", level: "Expert", description: "AI image generation", category: "GenAI", icon: Sparkles },
      { name: "ComfyUI", level: "Advanced", description: "Local image pipelines", category: "GenAI", icon: Sparkles },
      // Local LLMs
      { name: "Ollama", level: "Expert", description: "Local LLM management", category: "Local AI", icon: Cpu },
      { name: "Gemma", level: "Advanced", description: "Lightweight open models", category: "Local AI", icon: Cpu },
      // UX & Design
      { name: "Next.js", level: "Expert", description: "Full-stack React", category: "UX & Design", icon: Layout },
      { name: "Tailwind CSS", level: "Expert", description: "Utility CSS", category: "UX & Design", icon: Layout },
      { name: "Framer Motion", level: "Expert", description: "Animation library", category: "UX & Design", icon: Layout },
      // Backend & DB
      { name: "Python", level: "Expert", description: "AI/ML backbone", category: "Backend", icon: Server },
      { name: "FastAPI", level: "Expert", description: "Async Python APIs", category: "Backend", icon: Server },
      { name: "PostgreSQL", level: "Expert", description: "Relational database", category: "Backend", icon: Server },
      { name: "Supabase", level: "Expert", description: "Backend-as-a-service", category: "Backend", icon: Server },
      // Systems
      { name: "Docker", level: "Expert", description: "Containerization", category: "Systems", icon: Cloud },
      { name: "Event-Driven Arch", level: "Expert", description: "Async system design", category: "Systems", icon: Cloud },
      // Instructional Design
      { name: "ADDIE", level: "Expert", description: "Instructional design model", category: "LXD", icon: BookOpen },
      { name: "React Interactives", level: "Expert", description: "JS learning modules", category: "LXD", icon: BookOpen },
    ];
