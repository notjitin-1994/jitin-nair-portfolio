"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Footer } from "./components/Footer";
import LazySection from "./components/LazySection";
import { Section } from "./components/ui/Section";

import { motion, AnimatePresence, useScroll, useTransform, useSpring, useAnimation } from "framer-motion";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ScrollReveal, StaggerReveal } from "./components/ScrollReveal";
import {
  Brain,
  Zap,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Mail,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Terminal,
  Sparkles,
  Cpu,
  Layers,
  ArrowUpRight,
  ArrowRight,
  Monitor,
  Smartphone,
  Bot,
  Network,
  Layout,
  Code2,
  Cloud,
  Database,
  Shield,
  MessageSquare,
  Calendar,
  FileText,
  Search,
  BarChart3,
  TrendingUp,
  Workflow,
  Boxes,
  GitBranch,
  Server,
  Lock,
  Eye,
  Mic,
  Image as ImageIcon,
  Video,
  Music,
  Wrench,
  Settings,
  Rocket,
  Target,
  BookOpen,
  Users,
  Award,
  Command,
  ChevronDown,
  MapPin,
  Clock,
  Send,
  Copy,
  Check,
  GraduationCap,
  Headphones,
  VideoIcon,
  Download,
  Briefcase,
  HelpCircle,
  ExternalLink,
  Phone,
  MessageCircle,
  Instagram,
} from "lucide-react";
import { AnimatedBackground } from "./components/animated-background";
import { TouchFlipCard } from "./components/TouchFlipCard";
import { ProjectCarousel } from "./components/ProjectCarousel";
import { FeaturedInsight } from "./components/FeaturedInsight";
import { Terminal as TerminalComponent } from "./components/terminal";
import { DesktopVortexBackground } from "./components/desktop-vortex-background";

// Optimized viewport config for Framer Motion - reduces layout thrashing
const viewportConfig = {
  once: true,
  amount: 0.1,
  margin: "-50px",
};

// GPU-accelerated motion props
const gpuMotionProps = {
  style: {
    willChange: "transform, opacity",
    transform: "translateZ(0)",
  },
};

// Custom hook for detecting mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// Hook for strict one-card-per-scroll carousel
function useStrictCarousel(containerRef: React.RefObject<HTMLDivElement>, itemCount: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout>();
  const accumulatedDelta = useRef(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || itemCount <= 1) return;

    const handleScroll = () => {
      if (isScrolling.current) return;

      const scrollLeft = container.scrollLeft;
      const itemWidth = container.firstElementChild?.clientWidth || container.clientWidth * 0.88;
      const gap = 16; // matches the gap-4 (16px) in the container
      const newIndex = Math.round(scrollLeft / (itemWidth + gap));
      const clampedIndex = Math.min(Math.max(newIndex, 0), itemCount - 1);

      setActiveIndex(clampedIndex);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerRef, itemCount]);

  const scrollToIndex = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container || isScrolling.current) return;

    isScrolling.current = true;
    const itemWidth = container.firstElementChild?.clientWidth || container.clientWidth * 0.88;
    const gap = 16;

    container.scrollTo({
      left: index * (itemWidth + gap),
      behavior: 'smooth'
    });
    setActiveIndex(index);

    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isScrolling.current = false;
    }, 500);
  }, [containerRef]);

  // Handle wheel events for strict one-scroll-per-card
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let wheelTimeout: NodeJS.Timeout;
    const WHEEL_THRESHOLD = 80; // Increased threshold

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) {
        e.preventDefault();
        return;
      }

      // Only handle horizontal scrolling or significant vertical
      const deltaX = e.deltaX || 0;
      const deltaY = e.deltaY || 0;
      const delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;

      accumulatedDelta.current += Math.abs(delta);

      if (accumulatedDelta.current > WHEEL_THRESHOLD) {
        e.preventDefault();
        accumulatedDelta.current = 0;

        const direction = delta > 0 ? 1 : -1;
        const newIndex = Math.min(Math.max(activeIndex + direction, 0), itemCount - 1);

        if (newIndex !== activeIndex) {
          scrollToIndex(newIndex);
        }
      }

      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        accumulatedDelta.current = 0;
      }, 200);
    };

    // Touch handling for one-swipe-per-card
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling.current) {
        e.preventDefault();
        return;
      }

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchStartX.current - touchEndX;
      const deltaY = touchStartY.current - touchEndY;

      // Only handle horizontal swipes
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        e.preventDefault();
        const direction = deltaX > 0 ? 1 : -1;
        const newIndex = Math.min(Math.max(activeIndex + direction, 0), itemCount - 1);

        if (newIndex !== activeIndex) {
          scrollToIndex(newIndex);
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(wheelTimeout);
      clearTimeout(scrollTimeout.current);
    };
  }, [containerRef, itemCount, activeIndex, scrollToIndex]);

  return { activeIndex, scrollToIndex };
}

// Animation Variants for Cinematic Entrance - Slower, Smoother
const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 2.5, // After image (2s) + container entry (0.5s)
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5, // Content animates in 0.5s
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Mobile-First Components
// Hook to detect reduced motion preference
function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return reducedMotion;
}

// Skeleton Loader Component
function SkeletonLoader({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse bg-white/5 rounded", className)} />
  );
}

function MobileHero({ onUnlock }: { onUnlock?: () => void }) {
  const [currentWord, setCurrentWord] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const reducedMotion = useReducedMotion();
  const words = ["Websites", "Web Apps", "AI Apps", "Agentic Systems", "Desktop Apps"];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [mounted, words.length]);

  useEffect(() => {
    if (!mounted) return;
    // Check if image is already cached/loaded
    if (imgRef.current?.complete) {
      setImageLoaded(true);
    }
    // Fallback: show image after 2 seconds even if onLoad hasn't fired
    const fallbackTimer = setTimeout(() => {
      setImageLoaded(true);
    }, 2000);
    return () => clearTimeout(fallbackTimer);
  }, [mounted]);

  // Prevent hydration mismatch - render placeholder on server
  if (!mounted) {
    return (
      <section className="relative min-h-[100svh] flex flex-col justify-end pb-4 pt-4 overflow-hidden bg-[#0a0a0f]">
        <div className="relative z-10 px-5">
          <div className="max-w-3xl mx-auto">
            <SkeletonLoader className="h-[380px] w-full" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end pb-4 pt-4 overflow-hidden">
      <AnimatedBackground />
      {/* Photo Background - Cinematic Ken Burns + Fade */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        initial={{ opacity: 0 }}
        animate={{
          opacity: imageLoaded ? 1 : 0,
          scale: reducedMotion ? 1 : (imageLoaded ? 1 : 1.05)
        }}
        transition={{
          duration: reducedMotion ? 0.3 : 2.0,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <img
          ref={imgRef}
          src="/hero-photo.jpg"
          alt="Jitin Nair"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 15%" }}
          onLoad={() => setImageLoaded(true)}
          loading="eager"
        />
      </motion.div>

      {/* Gradient Overlays - Fade in with image */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-transparent transition-opacity duration-500"
        style={{ opacity: imageLoaded ? 1 : 0 }}
      />
      <div
        className="absolute inset-0 bg-void/40 transition-opacity duration-500"
        style={{ opacity: imageLoaded ? 1 : 0 }}
      />

      {/* Content - Terminal UI */}
      <div className="relative z-10 px-5">
        <motion.div
          initial={false}
          animate={{ opacity: imageLoaded ? 1 : 0, y: imageLoaded ? 0 : 30 }}
          transition={{ duration: reducedMotion ? 0.3 : 1.0, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
          style={{ willChange: 'opacity, transform' }}
        >
          <TerminalComponent
            username="jitin"
            typingSpeed={45}
            initialDelay={600}
            className="max-w-none"
            isMobile={true}
            onUnlock={onUnlock}
          />
        </motion.div>
      </div>
    </section>
  );
}

// Marquee Component for smooth perpetual motion
function Marquee({
  children,
  speed = 30,
  direction = "left",
}: {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
}) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div className="flex overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-5">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 gap-4"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="flex shrink-0 gap-4">
          {children}
        </div>
        <div className="flex shrink-0 gap-4">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

// Bento Grid Components
function BentoCard({
  children,
  className = "",
  spotlight = true,
}: {
  children: React.ReactNode;
  className?: string;
  spotlight?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-[2px] transition-all duration-500 hover:border-cyan-500/30 hover:bg-white/[0.05] ${className}`}
    >
      {spotlight && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34,211,238,0.15), transparent 40%)`,
          }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

interface ExpertiseItem {
  icon: React.ElementType;
  title: string;
  description: string;
  skills: string[];
  featured?: boolean;
}

const expertiseData: ExpertiseItem[] = [
  {
    icon: Brain,
    title: "Autonomous Agentic Systems",
    description: "Multi-agent orchestration networks that perceive, decide, and act autonomously—spanning trading, operations, monitoring, and decision intelligence.",
    skills: ["LangGraph", "AutoGen", "CrewAI", "Vector DBs"],
    featured: true,
  },
  {
    icon: Sparkles,
    title: "AI-Native Applications",
    description: "RAG-powered apps, semantic search, document intelligence, and verification frameworks achieving 95%+ accuracy.",
    skills: ["OpenAI", "RAG", "CoVe", "TypeScript"],
  },
  {
    icon: Zap,
    title: "Intelligent Process Automation",
    description: "Self-healing infrastructure, browser automation, and workflow engines that reduce manual work by 80%+.",
    skills: ["Playwright", "Python", "systemd", "Docker"],
  },
  {
    icon: Network,
    title: "Enterprise Integration Platforms",
    description: "API orchestration, chatbots, IoT systems, messaging, and secrets management across 200+ connected agents.",
    skills: ["Discord/Telegram", "1Password", "IoT", "GitHub"],
  },
  {
    icon: Monitor,
    title: "Desktop & Internal Tools",
    description: "Cross-platform desktop applications and internal productivity accelerators built for engineering teams.",
    skills: ["Tauri", "Electron", "Rust", "React"],
  },
  {
    icon: VideoIcon,
    title: "Content & Media Pipelines",
    description: "AI-generated content, video processing, speech-to-text, and automated media workflows at scale.",
    skills: ["FFmpeg", "Whisper", "AI Gen", "Summarization"],
  },
  {
    icon: Database,
    title: "Real-Time Data Infrastructure",
    description: "Streaming pipelines, time-series databases, and live analytics dashboards with sub-second latency.",
    skills: ["Kafka", "Redis", "TimescaleDB", "D3"],
  },
  {
    icon: TrendingUp,
    title: "Quantitative & Algorithmic Systems",
    description: "Institutional-grade trading infrastructure with regime detection, MLOps, and sub-second execution.",
    skills: ["TimescaleDB", "Polars", "Backtesting", "Risk"],
  },
];

function MobileBento() {
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const Card = ({ item, index }: { item: ExpertiseItem; index: number }) => {
    const Icon = item.icon;

    return (
      <div className="flex-shrink-0 w-[320px] px-2 py-6">
        <div className={`relative overflow-hidden rounded-2xl p-6 h-[220px] ${item.featured ? "bg-gradient-to-br from-cyan-500/20 via-white/[0.05] to-transparent border-cyan-500/30" : "bg-white/[0.03] border-white/[0.08]"} border backdrop-blur-[2px] transition-all duration-500 hover:border-cyan-500/30 hover:bg-white/[0.05] hover:scale-[1.02] group`}>
          {item.featured && (
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          )}
          <div className="relative z-10 h-full flex flex-col text-left">
            <div className={`w-12 h-12 rounded-xl ${item.featured ? "bg-cyan-500 shadow-lg shadow-cyan-500/25" : "bg-white/10"} flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110`}>
              <Icon className={`w-6 h-6 ${item.featured ? "text-white" : "text-cyan-400"}`} />
            </div>
            <h3 className="text-lg font-bold mb-2 whitespace-nowrap">{item.title}</h3>
            <p className="text-slate-400 text-xs mb-4 leading-relaxed flex-grow">{item.description}</p>
            <div className="flex flex-wrap gap-2">
              {item.skills.slice(0, 3).map((skill, i) => (
                <span
                  key={i}
                  className={`px-2.5 py-1 text-[10px] font-mono rounded-full border ${item.featured ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/20" : "bg-white/5 text-slate-400 border-white/10"}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Skeleton loader for initial render
  if (!mounted) {
    return (
      <section className="overflow-hidden">
        <div className="mb-10 px-5">
          <SkeletonLoader className="h-4 w-32 mb-3" />
          <SkeletonLoader className="h-8 w-64 mb-3" />
          <SkeletonLoader className="h-4 w-full max-w-md" />
        </div>
        <div className="flex gap-4 px-5 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonLoader key={i} className="h-[220px] w-[320px] flex-shrink-0" />
          ))}
        </div>
      </section>
    );
  }

  return (
     <section className="overflow-hidden relative">
      {/* Section Header - CSS Animated, SSR Safe */}
      <div className="mb-6 px-1" suppressHydrationWarning>
        <p className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-2 mobile-section-subtitle">
          What I Deliver
        </p>
        <h2 className="text-3xl font-bold mb-2 mobile-section-title">
          Products That Drive Results
        </h2>
        <p className="text-slate-400 text-sm mobile-section-desc">
          Production-ready solutions that reduce costs, accelerate workflows, and deliver measurable business impact.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
        <Marquee speed={40} direction="left">
          {expertiseData.map((item, index) => (
            <Card key={index} item={item} index={index} />
          ))}
        </Marquee>
      </div>
     </section>
  );
}

// Obsolete - functionality moved to DesktopExpertiseMarquee component
function DesktopBento() {
  return null;
}

// Shared Projects Data
const projectsData = [
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
    name: "Smarslate AI-First Learning Ecosystem",
    shortName: "Smarslate",
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
    whatItDoes: "Smarslate Polaris is a Human-in-the-Loop (HITL) AI learning ecosystem that automates the entire L\u0026D lifecycle-from discovery to delivery. The platform combines automated learning discovery (Polaris), AI-native instructional design (Constellation), intelligent content development (Nova), integrated AI-powered LMS (Orbit), personalized AI tutoring (Nebula), and comprehensive analytics (Spectrum) into a unified pipeline. Every AI output is validated by human experts, ensuring quality while achieving 10x throughput gains.",
    howItWorks: "The HITL pipeline begins with Polaris automated discovery-AI conducts stakeholder interviews, analyzes organizational context, and generates learning strategy blueprints (Starmaps) with human SME validation at each stage. Constellation automates instructional design using Bloom's Taxonomy, Gagné's 9 Events, and Merrill's First Principles, with ID experts reviewing and refining AI-generated frameworks. Nova handles AI-native content development-generating interactive modules, assessments, and media-while content teams curate and enhance outputs. Orbit delivers via an AI-powered LMS with adaptive learning paths, while Nebula provides 24/7 AI tutoring with escalation to human instructors. Spectrum analytics continuously feed insights back to optimize the entire pipeline.",
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
      "Interactive Starmap Delivery"
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
    liveUrl: "https://smarslate.io",
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

// Comprehensive Capabilities Matrix
const capabilitiesData = {
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
function MobileCapabilities() {
  const categories = Object.entries(capabilitiesData);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrev = () => setActiveIndex((prev) => Math.max(prev - 1, 0));
  const goToNext = () => setActiveIndex((prev) => Math.min(prev + 1, categories.length - 1));

  return (
    <section className="overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0d0d12] to-[#0a0a0f]"></div>
        <div className="absolute w-[800px] h-[800px] rounded-full opacity-[0.08]"
          style={{
            background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)',
            filter: 'blur(100px)',
            top: '10%',
            left: '-20%'
          }}
        />
        <div className="absolute w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{
            background: 'radial-gradient(circle, #10b981 0%, transparent 70%)',
            filter: 'blur(80px)',
            right: '-10%',
            top: '30%'
          }}
        />
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)',
            filter: 'blur(60px)',
            left: '30%',
            bottom: '-10%'
          }}
        />
      </div>

      <div className="relative z-10">
      <div className="px-5 mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold"
        >
          Technical <span className="text-cyan-400">Arsenal</span>
        </motion.h2>
      </div>

      {/* Carousel Container */}
      <div className="px-5">
        <div className="relative rounded-2xl border border-white/[0.08] bg-[#0d0d12] overflow-hidden">
          {/* Cards Container - With padding for arrows */}
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {categories.map(([key, data]) => {
              const Icon = data.icon;
              return (
                <div
                  key={key}
                  className="w-full flex-shrink-0 min-w-full px-12 py-6 overflow-hidden"
                >
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0 border border-cyan-500/20">
                      <Icon className="w-7 h-7 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{data.title}</h3>
                      <p className="text-slate-500 text-sm">{data.skills.length} skills</p>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3">
                    {data.skills.map((skill, idx) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-slate-300 truncate pr-2">{skill.name}</span>
                          <span className="text-xs text-cyan-400 font-mono flex-shrink-0">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-full"
                            style={{ width: `${skill.level}%`, transition: 'width 0.7s ease-out', transitionDelay: `${idx * 50}ms` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows - Inside but at edges */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <button
              onClick={goToPrev}
              disabled={activeIndex === 0}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-surface/80 backdrop-blur border border-white/20 text-cyan-400 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
              aria-label="Previous"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              onClick={goToNext}
              disabled={activeIndex === categories.length - 1}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-surface/80 backdrop-blur border border-white/20 text-cyan-400 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
              aria-label="Next"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-1.5 pb-4">
            {categories.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'w-6 bg-cyan-400' : 'w-1.5 bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Row - Consistent Styling */}
      <div className="px-5 mt-8 grid grid-cols-3 gap-3">
        {[
          { value: "50+", label: "Skills", icon: Target },
          { value: "200+", label: "Agents", icon: Bot },
          { value: "25+", label: "Integrations", icon: Workflow },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="glass-mobile rounded-xl p-4 text-center border border-white/10"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center mx-auto mb-2 border border-cyan-500/20">
              <stat.icon className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
            <div className="text-xs text-slate-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>
      </div>
       </section>
      );
      }
function MobileProjects() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
     <section id="projects" className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{
            background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)',
            filter: 'blur(80px)',
            top: '20%',
            left: '-30%'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-1 sm:px-2">
        {/* Section Header - CSS Animated, SSR Safe */}
        <div className="mb-6 text-left" suppressHydrationWarning>
          <p 
            className={`text-cyan-400 font-mono text-xs tracking-widest uppercase mb-2 ${mounted ? 'mobile-section-subtitle' : 'opacity-0'}`}
          >
            Featured Deliverables
          </p>
          <h2 
            className={`text-3xl md:text-4xl font-bold ${mounted ? 'mobile-section-title' : 'opacity-0'}`}
          >
            Production Systems
          </h2>
          <p 
            className={`text-slate-400 text-sm mt-2 leading-relaxed max-w-2xl ${mounted ? 'mobile-section-desc' : 'opacity-0'}`}
          >
            Enterprise-grade implementations spanning algorithmic trading, multi-agent orchestration, and intelligent AI infrastructure.
          </p>
        </div>

        <div className="px-0">
          <ProjectCarousel />
        </div>
        </div>
         </section>
        );
        }

function MobileJourney() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const journeyData = [
    {
      year: "2025",
      period: "Present",
      title: "AI Systems Architect",
      role: "Independent Consultant",
      description: "Architected 200+ autonomous AI agents. Built high-frequency trading engines (Predator), multi-agent governance platforms (Reality-Check), and AI-native learning ecosystems (Smarslate). Specialized in LangGraph orchestration and Model Context Protocol (MCP) integrations across 147 agent instances.",
      highlights: ["200+ Agents Deployed", "96% Fleet Compliance", "MCP Orchestration"],
      icon: Bot,
      bgImage: "/journey-ai.jpg",
      gradient: "from-cyan-500/20 to-teal-500/20",
      stats: { agents: "200+", compliance: "96%", mcp: "147" }
    },
    {
      year: "2022",
      period: "3 Years",
      title: "Instructional Designer",
      role: "Moody's Ratings",
      description: "Led video-based learning production for global ratings agency. Built scalable content pipelines and automated workflows, reducing production time by 60% while maintaining 90%+ completion rates for complex financial curriculum.",
      highlights: ["60% Production Save", "90%+ Completion", "Global L&D Scale"],
      icon: VideoIcon,
      bgImage: "/journey-finance.jpg",
      gradient: "from-emerald-500/20 to-teal-500/20",
      stats: { production: "-60%", completion: "90%+", reach: "Global" }
    },
    {
      year: "2019",
      period: "3 Years",
      title: "Instructor Analyst",
      role: "Accenture",
      description: "Managed L&D for 300+ employees. Developed hybrid learning models that reduced training time by 70% while maintaining retention, saving ~$140K. Engineered a 1,400+ line VBA automation suite for pan-India TNA audits.",
      highlights: ["$140K Cost Savings", "70% Time Reduction", "VBA Audit Engine"],
      icon: Users,
      bgImage: "/journey-training.jpg",
      gradient: "from-teal-500/20 to-cyan-500/20",
      stats: { savings: "$140K+", reduction: "70%", reach: "300+" }
    },
    {
      year: "2015",
      period: "2 Years",
      title: "Senior Executive",
      role: "247.ai",
      description: "Managed back-end support for a US retail giant, ensuring seamless buyer-seller experiences. Recognized as 3x Top Performer and identified for the leadership track within 24 months for excellence in process training and problem solving.",
      highlights: ["3x Top Performer", "Leadership Track", "Customer Success"],
      icon: Headphones,
      bgImage: "/journey-support.jpg",
      gradient: "from-cyan-500/20 to-emerald-500/20",
      stats: { performance: "Top 1%", tenure: "2.5y", training: "SME" }
    },
    {
      year: "2015",
      period: "Foundation",
      title: "Bachelor of Commerce",
      role: "Sindhi College",
      description: "Developed foundation in business administration and systems logic. Self-taught programmer during college years, architecting early web applications and automated business tools.",
      highlights: ["Self-Taught Dev", "Business Logic", "Analytical Core"],
      icon: GraduationCap,
      bgImage: "/journey-edu.jpg",
      gradient: "from-emerald-500/20 to-cyan-500/20",
      stats: { degree: "B.Com", systems: "Core", logic: "Advanced" }
    }
  ];

  const scrollToCard = (index: number) => {
    setActiveIndex(index);
    setExpandedCard(null);
    const element = document.getElementById(`journey-card-${index}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
     <section className="overflow-hidden relative">
      {/* Header */}
      <div className="mb-6 px-1" suppressHydrationWarning>
        <p className={`text-cyan-400 font-mono text-xs tracking-widest uppercase mb-3 ${mounted ? 'mobile-section-subtitle' : 'opacity-0'}`}>Journey So Far</p>
        <h2 className={`text-3xl font-bold mb-2 ${mounted ? 'mobile-section-title' : 'opacity-0'}`}>Career Timeline</h2>
        <p className={`text-slate-400 text-sm ${mounted ? 'mobile-section-desc' : 'opacity-0'}`}>From commerce grad to AI architect — {journeyData.length} milestones</p>
      </div>

      {/* Progress Stepper - Simplified for performance */}
      <div
        className={`flex items-center justify-between mb-8 px-2 ${mounted ? 'mobile-section-desc' : 'opacity-0'}`}
      >
        {journeyData.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;
          
          return (
            <motion.button
              key={item.year + item.title}
              onClick={() => scrollToCard(index)}
              className={`relative flex flex-col items-center gap-2 transition-all ${
                isActive ? 'scale-110' : 'opacity-60 hover:opacity-100'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                isActive 
                  ? 'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20' 
                  : isPast
                    ? 'bg-cyan-500/10 border-cyan-500/30'
                    : 'bg-white/5 border-white/10'
              }`}>
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              </div>
              <span className={`text-xs font-medium ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                {item.year}
              </span>
              
              {/* Connector Line */}
              {index < journeyData.length - 1 && (
                <div className={`absolute top-5 left-full w-[calc(100%-1rem)] h-0.5 -ml-1 ${
                  isPast ? 'bg-cyan-500' : 'bg-white/10'
                }`} style={{ width: '2rem' }} />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Timeline Cards */}
      <div ref={containerRef} className="space-y-6">
        {journeyData.map((item, index) => {
          const Icon = item.icon;
          const isExpanded = expandedCard === index;
          const isEven = index % 2 === 0;
          
          return (
            <motion.div
              key={item.year + item.title}
              id={`journey-card-${index}`}
              initial={{ opacity: 0, x: isEven ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              onViewportEnter={() => setActiveIndex(index)}
              className="relative"
            >
              {/* Timeline Connector - Solid Cyan */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-cyan-500/40" />
              
              {/* Card */}
              <motion.div
                layout
                onClick={() => setExpandedCard(isExpanded ? null : index)}
                className={`ml-10 relative rounded-2xl border overflow-hidden cursor-pointer transition-all ${
                  isExpanded 
                    ? 'border-cyan-500/40 bg-white/[0.05]' 
                    : 'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.12]'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background Image - subtle blur */}
                <div 
                  className="absolute inset-0 scale-105"
                  style={{
                    backgroundImage: `url(${item.bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-30`} />
                <div className="absolute inset-0 bg-[#0a0a0f]/80 backdrop-blur-[8px]" />

                {/* Content */}
                <div className="relative z-10 p-5">
                  {/* Header Row */}
                  <div className="flex items-start gap-4 mb-4">
                    {/* Icon */}
                    <motion.div
                      animate={{ 
                        boxShadow: isExpanded 
                          ? '0 0 20px rgba(34, 211, 238, 0.3)' 
                          : '0 0 0px rgba(34, 211, 238, 0)'
                      }}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${item.gradient} border border-white/10`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    
                    {/* Title Group */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 text-[10px] font-mono font-bold border border-cyan-500/30">
                          {item.year}
                        </span>
                        <span className="text-slate-500 text-xs">{item.period}</span>
                      </div>
                      <h3 className="font-bold text-lg leading-tight mb-0.5">{item.title}</h3>
                      <p className="text-cyan-400 text-sm">{item.role}</p>
                    </div>
                    
                    {/* Expand Indicator */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      className="text-slate-500"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-3 mb-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                          {Object.entries(item.stats).map(([key, value], i) => (
                            <div key={key} className="text-center">
                              <p className="text-lg font-bold text-cyan-400">{value}</p>
                              <p className="text-[10px] text-slate-500 uppercase tracking-wide">{key}</p>
                            </div>
                          ))}
                        </div>

                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2">
                          {item.highlights.map((highlight) => (
                            <span
                              key={highlight}
                              className="px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] text-xs text-slate-300"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Tap Hint */}
                  {!isExpanded && (
                    <p className="text-xs text-slate-600 mt-3 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Tap to expand
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
     </section>
  );
}

function MobileTechStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [categoryPages, setCategoryPages] = useState<Record<string, number>>({});
  const [mounted, setMounted] = useState(false);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setExpandedSkill(null);
  }, [activeIndex, categoryPages]);

  const goToPrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };
  const goToNext = () => {
    setDirection(1);
    setActiveIndex((prev) => Math.min(prev + 1, toolCategories.length - 1));
  };

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      goToNext();
    } else if (info.offset.x > threshold) {
      goToPrev();
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  const handlePageChange = (category: string, newPage: number) => {
    setCategoryPages(prev => ({ ...prev, [category]: newPage }));
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert": return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "Advanced": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      default: return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    }
  };

  const getLevelWidth = (level: string) => {
    switch (level) {
      case "Expert": return "100%";
      case "Advanced": return "75%";
      default: return "50%";
    }
  };

  // Safety: reset activeIndex if out of bounds
  if (activeIndex >= toolCategories.length) {
    setActiveIndex(0);
  }

  return (
     <section id="techstack" className="overflow-hidden relative">
      <div className="px-1 mb-6" suppressHydrationWarning>
        <p className={`text-cyan-400 font-mono text-xs tracking-widest uppercase mb-2 ${mounted ? 'mobile-section-subtitle' : 'opacity-0'}`}>
          Technical Arsenal
        </p>
        <h2 className={`text-3xl font-bold mb-2 ${mounted ? 'mobile-section-title' : 'opacity-0'}`}>
          Tools & Technologies
        </h2>
        <p className={`text-slate-400 text-sm ${mounted ? 'mobile-section-desc' : 'opacity-0'}`}>
          {toolCategories.length} categories • {toolCategories.reduce((acc, cat) => acc + cat.tools.length, 0)} skills
        </p>
      </div>

      {/* Category Pills */}
      <div className="px-5 mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {toolCategories.map((cat, idx) => (
          <button
            key={cat.category}
            onClick={() => { 
              setDirection(idx > activeIndex ? 1 : -1);
              setActiveIndex(idx); 
              setExpandedSkill(null); 
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              idx === activeIndex
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                : "bg-white/[0.03] text-slate-400 border border-white/[0.08]"
            }`}
          >
            {cat.category.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Carousel Container with Navigation */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-end gap-2 mb-3">
          <button
            onClick={goToPrev}
            disabled={activeIndex === 0}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0d0d12]/80 backdrop-blur border border-white/20 text-cyan-400 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goToNext}
            disabled={activeIndex === toolCategories.length - 1}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0d0d12]/80 backdrop-blur border border-white/20 text-cyan-400 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-[2px] overflow-hidden min-h-[400px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              className="w-full h-full flex-shrink-0 min-w-full px-5 py-6"
            >
              {(() => {
                const cat = toolCategories[activeIndex];
                const Icon = cat.icon;
                const currentPage = categoryPages[cat.category] || 1;
                const totalPages = Math.ceil((cat.tools?.length || 0) / ITEMS_PER_PAGE);
                const paginatedTools = (cat.tools || []).slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

                return (
                  <>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0 border border-cyan-500/20">
                          <Icon className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-lg leading-tight">{cat.category}</h3>
                          <p className="text-slate-500 text-xs">{cat.description}</p>
                        </div>
                      </div>

                      {totalPages > 1 && (
                        <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] rounded-lg px-1.5 py-0.5">
                          <button
                            onClick={(e) => { e.stopPropagation(); handlePageChange(cat.category, Math.max(currentPage - 1, 1)); }}
                            disabled={currentPage === 1}
                            className="p-0.5 hover:text-cyan-400 disabled:opacity-30 transition-colors"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[9px] font-mono text-slate-500 min-w-[2rem] text-center">
                            {currentPage}/{totalPages}
                          </span>
                          <button
                            onClick={(e) => { e.stopPropagation(); handlePageChange(cat.category, Math.min(currentPage + 1, totalPages)); }}
                            disabled={currentPage === totalPages}
                            className="p-0.5 hover:text-cyan-400 disabled:opacity-30 transition-colors"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Skills List */}
                    {paginatedTools.length > 0 ? (
                      <div className="space-y-2.5">
                        {paginatedTools.map((tool) => (
                        <div
                          key={tool.name}
                          className={`p-3 rounded-xl border transition-all ${
                            expandedSkill === `${cat.category}-${tool.name}`
                              ? "bg-white/[0.06] border-cyan-500/30"
                              : "bg-white/[0.03] border-white/[0.08] hover:border-cyan-500/20"
                          }`}
                          onClick={() => setExpandedSkill(
                            expandedSkill === `${cat.category}-${tool.name}`
                              ? null
                              : `${cat.category}-${tool.name}`
                          )}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-medium text-slate-200">{tool.name}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getLevelColor(tool.level)}`}>
                              {tool.level}
                            </span>
                          </div>
                          {/* Progress Bar */}
                          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: getLevelWidth(tool.level) }}
                              transition={{ duration: 0.5, delay: 0.1 }}
                              className={`h-full rounded-full ${
                                tool.level === "Expert" ? "bg-cyan-400" :
                                tool.level === "Advanced" ? "bg-emerald-400" : "bg-amber-400"
                              }`}
                            />
                          </div>
                          {/* Description (shown when expanded) */}
                          <AnimatePresence>
                            {expandedSkill === `${cat.category}-${tool.name}` && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-xs text-slate-400 mt-2 pt-2 border-t border-white/5"
                              >
                                {tool.description}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                      </div>
                    ) : (
                      <p className="text-slate-500 text-sm py-4">No skills listed</p>
                    )}
                  </>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center items-center gap-2">
        <span className="text-slate-500 text-xs font-mono">
          {String(activeIndex + 1).padStart(2, "0")} / {String(toolCategories.length).padStart(2, "0")}
        </span>
        <div className="flex gap-1.5 ml-3">
          {toolCategories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setActiveIndex(idx); setExpandedSkill(null); }}
              className={`h-1.5 rounded-full transition-all ${
                idx === activeIndex ? "w-4 bg-cyan-400" : "w-1.5 bg-slate-600"
              }`}
            />
          ))}
        </div>
      </div>
     </section>
  );
}

const toolCategories = [
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
      { name: "English", level: "Expert", description: "Native proficiency - business and technical" },
      { name: "Malayalam", level: "Expert", description: "Native proficiency" },
      { name: "Hindi", level: "Advanced", description: "Strong command - professional fluency" },
      { name: "Tamil", level: "Advanced", description: "Strong command - conversational and business" },
      { name: "Kannada", level: "Advanced", description: "Strong command - conversational proficiency" },
      { name: "Problem Solving", level: "Expert", description: "Analytical thinking and creative solutions" },
      { name: "Cross-Cultural Collaboration", level: "Advanced", description: "Global team coordination" },
      { name: "Adaptability", level: "Expert", description: "Rapid learning and technology adoption" },
      { name: "Critical Thinking", level: "Expert", description: "Evidence-based decision making" },
    ],
  },
];

// Primary Stack - curated technologies organized by category
const primaryStack = [
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

const categories = ["Primary Stack", "All", ...toolCategories.map((cat) => cat.category)];

function DesktopTechStack() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Primary Stack");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [mainPage, setMainPage] = useState(1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const ITEMS_PER_PAGE = 12;

  // Reset pagination when filter/search changes
  useEffect(() => {
    setMainPage(1);
  }, [selectedCategory, searchQuery]);

  // Flatten all skills for "All" view - memoized for speed
  const allSkills = useMemo(() => toolCategories.flatMap((cat) =>
    cat.tools.map((tool) => ({ ...tool, category: cat.category, Icon: cat.icon }))
  ), []);

  // Memoized filtered skills for high performance
  const displaySkills = useMemo(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      // Search across all skills
      return allSkills.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query)
      );
    }
    if (selectedCategory === "Primary Stack") {
      return primaryStack.map((skill) => ({ ...skill, Icon: skill.icon }));
    }
    if (selectedCategory === "All") {
      return allSkills;
    }
    // Specific category selected
    const cat = toolCategories.find(c => c.category === selectedCategory);
    if (cat) {
      return cat.tools.map(tool => ({ ...tool, category: cat.category, Icon: cat.icon }));
    }
    return [];
  }, [searchQuery, selectedCategory, allSkills]);

  // Keyboard shortcut: Cmd/Ctrl + K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setSelectedSkill(null);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getLevelPercentage = (level: string) => {
    switch (level) {
      case "Expert": return 100;
      case "Advanced": return 75;
      default: return 50;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert": return "from-cyan-500 to-cyan-400";
      case "Advanced": return "from-emerald-500 to-emerald-400";
      default: return "from-amber-500 to-amber-400";
    }
  };

  const getLevelBgColor = (level: string) => {
    switch (level) {
      case "Expert": return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "Advanced": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      default: return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    }
  };

  const SkillCard = ({ tool, category, Icon, index }: { tool: { name: string; level: string; description: string }; category: string; Icon: React.ComponentType<{ className?: string }>; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      layout
      onClick={() => setSelectedSkill(selectedSkill === tool.name ? null : tool.name)}
      className={`group relative rounded-xl border backdrop-blur-[2px] p-4 cursor-pointer transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/[0.06] ${
        selectedSkill === tool.name ? "border-cyan-500/50 ring-1 ring-cyan-500/20 bg-white/[0.05]" : "border-white/[0.08] bg-white/[0.03]"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-500/30 transition-colors">
            <Icon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
          </div>
          <div>
            <h4 className="font-medium text-sm text-slate-200 group-hover:text-white transition-colors">
              {tool.name}
            </h4>
            <span className="text-[10px] text-slate-500">{category}</span>
          </div>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getLevelBgColor(tool.level)}`}>
          {tool.level}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${getLevelPercentage(tool.level)}%` }}
            transition={{ duration: 0.8, delay: index * 0.05 + 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`h-full bg-gradient-to-r ${getLevelColor(tool.level)} rounded-full`}
          />
        </div>
      </div>

      {/* Expanded Description */}
      <AnimatePresence>
        {selectedSkill === tool.name && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-white/5">
              {tool.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click hint */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        {selectedSkill === tool.name ? (
          <X className="w-3 h-3 text-slate-500" />
        ) : (
          <div className="w-3 h-3 rounded-full bg-cyan-500/20 border border-cyan-500/30" />
        )}
      </div>
    </motion.div>
  );

  return (
     <section id="techstack" className="py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4"
          >
            Technical Arsenal
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Capabilities Matrix
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-2xl"
          >
            Production-grade stack meticulously selected for building enterprise-scale
            AI systems and autonomous platforms
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-500" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills, tools, technologies..."
              className="w-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-[2px] rounded-xl py-3.5 pl-12 pr-32 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            />
            <div className="absolute inset-y-0 right-3 flex items-center gap-2">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1.5 rounded-md hover:bg-white/5 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-500 font-mono">
                <Command className="w-3 h-3" />
                <span>K</span>
              </kbd>
            </div>
          </div>
        </motion.div>

        {/* Category Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 backdrop-blur-[2px] ${
                  selectedCategory === category
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "bg-white/[0.03] text-slate-400 border border-white/[0.08] hover:bg-white/[0.06] hover:text-slate-200 hover:border-cyan-500/20"
                }`}
              >
                {category}
                {category === "Primary Stack" && (
                  <span className="ml-2 text-[10px] text-slate-500">20</span>
                )}
                {category !== "All" && category !== "Primary Stack" && (
                  <span className="ml-2 text-[10px] text-slate-500">
                    {toolCategories.find((c) => c.category === category)?.tools.length}
                  </span>
                )}
                {category === "All" && (
                  <span className="ml-2 text-[10px] text-slate-500">{allSkills.length}</span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 flex items-center justify-between"
        >
          <div className="text-sm text-slate-500">
            {searchQuery ? (
              <span>
                Found <span className="text-cyan-400">{displaySkills.length}</span> skills matching &quot;
                {searchQuery}&quot;
              </span>
            ) : selectedCategory === "Primary Stack" ? (
              <span>
                <span className="text-cyan-400">{primaryStack.length}</span> technologies in Primary Stack
              </span>
            ) : selectedCategory === "All" ? (
              <span>
                Showing all <span className="text-cyan-400">{allSkills.length}</span> skills
              </span>
            ) : (
              <span>
                <span className="text-cyan-400">
                  {displaySkills.length}
                </span>{" "}
                skills in {selectedCategory}
              </span>
            )}
            {displaySkills.length > ITEMS_PER_PAGE && (
              <span className="ml-2 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider">
                Page {mainPage} of {Math.ceil(displaySkills.length / ITEMS_PER_PAGE)}
              </span>
            )}
          </div>
          {(searchQuery || selectedCategory !== "Primary Stack") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Primary Stack");
              }}
              className="text-xs text-slate-500 hover:text-cyan-400 transition-colors"
            >
              Show Primary Stack
            </button>
          )}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + searchQuery + mainPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displaySkills
                .slice((mainPage - 1) * ITEMS_PER_PAGE, mainPage * ITEMS_PER_PAGE)
                .map((tool, index) => (
                  <SkillCard
                    key={tool.name}
                    tool={tool}
                    category={tool.category}
                    Icon={tool.Icon}
                    index={index}
                  />
                ))}
            </div>

            {Math.ceil(displaySkills.length / ITEMS_PER_PAGE) > 1 && (
              <div className="flex items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setMainPage(prev => Math.max(prev - 1, 1))}
                  disabled={mainPage === 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm font-medium text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 disabled:opacity-30 disabled:hover:text-inherit transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.ceil(displaySkills.length / ITEMS_PER_PAGE) }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setMainPage(i + 1)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono transition-all ${
                        mainPage === i + 1
                          ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                          : "bg-white/[0.03] text-slate-500 border border-white/[0.08] hover:text-slate-300"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setMainPage(prev => Math.min(prev + 1, Math.ceil(displaySkills.length / ITEMS_PER_PAGE)))}
                  disabled={mainPage === Math.ceil(displaySkills.length / ITEMS_PER_PAGE)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm font-medium text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 disabled:opacity-30 disabled:hover:text-inherit transition-all"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {displaySkills.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-6 md:py-8"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-slate-500" />
            </div>
            <h3 className="text-lg font-medium text-slate-300 mb-2">No skills found</h3>
            <p className="text-sm text-slate-500">
              Try adjusting your search or category filter
            </p>
          </motion.div>
        )}

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-5 gap-4"
        >
          {[
            { value: "38", label: "Technologies", icon: Wrench },
            { value: "6", label: "Categories", icon: Boxes },
            { value: "15", label: "Expert Level", icon: Award },
            { value: "12", label: "Advanced", icon: Target },
            { value: "11", label: "Intermediate", icon: Calendar },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl p-5 border border-white/[0.08] bg-white/[0.03] backdrop-blur-[2px] hover:border-cyan-500/30 hover:bg-white/[0.06] transition-all duration-300 text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-cyan-400 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
     </section>
  );
}
function DesktopContact() {
  const [isConnectExpanded, setIsConnectExpanded] = useState(false);

  const contactOptions = [
    {
      icon: Mail,
      label: "Email",
      href: "mailto:not.jitin@gmail.com",
      color: "from-cyan-500/20 to-cyan-400/10",
      borderColor: "border-cyan-500/30",
      iconColor: "text-cyan-400"
    },
    {
      icon: Phone,
      label: "Call",
      href: "tel:+919008898642",
      color: "from-teal-500/20 to-teal-400/10",
      borderColor: "border-teal-500/30",
      iconColor: "text-teal-400"
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/919008898642",
      color: "from-cyan-500/15 to-teal-500/15",
      borderColor: "border-cyan-500/25",
      iconColor: "text-cyan-400"
    },
  ];

  const staticLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/notjitin-1994", description: "View Public Repos" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/notjitin/", description: "Connect professionally" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com/not_jitin", description: "@not_jitin" },
  ];

  return (
     <section id="contact" className="py-6 md:py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Header */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4"
            >
              Get In Touch
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Let&apos;s Build Something <span className="text-cyan-400">Extraordinary</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-slate-400 text-lg mb-8 max-w-lg"
            >
              Ready to architect autonomous systems? I&apos;m available for full-time roles,
              contracts, and advisory engagements.
            </motion.p>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-[2px] hover:border-cyan-500/30 transition-all inline-block"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400 font-medium">Available for new opportunities</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Full-time", "Contract", "Advisory"].map((t, i) => (
                  <span key={i} className="px-3 py-1 text-sm bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right - Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Static Links */}
            {staticLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, borderColor: "rgba(34, 211, 238, 0.3)" }}
                className="group p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-[2px] hover:border-cyan-500/30 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    <link.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <ExternalLink className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                  {link.label}
                </h3>
                <p className="text-sm text-slate-500">{link.description}</p>
              </motion.a>
            ))}

            {/* Interactive Connect Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`relative rounded-2xl border overflow-hidden transition-all duration-500 ${
                isConnectExpanded 
                  ? 'col-span-1 sm:col-span-1 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-cyan-500/40' 
                  : 'bg-white/[0.03] border-white/[0.08] hover:border-cyan-500/30 hover:bg-white/[0.06]'
              }`}
            >
              <AnimatePresence mode="wait">
                {!isConnectExpanded ? (
                  <motion.button
                    key="connect-collapsed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setIsConnectExpanded(true)}
                    className="w-full p-6 text-left cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors relative">
                        <Users className="w-6 h-6 text-cyan-400" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse border-2 border-[#0a0a0f]" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                      Connect
                    </h3>
                    <p className="text-sm text-slate-500">Click to see options</p>
                  </motion.button>
                ) : (
                  <motion.div
                    key="connect-expanded"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-500/10">
                          <Users className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <p className="text-base font-semibold text-white">Choose how to connect</p>
                          <p className="text-xs text-slate-400">Direct contact options</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsConnectExpanded(false)}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                      >
                        <X className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>

                    {/* Contact Options Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      {contactOptions.map((option, index) => (
                        <motion.a
                          key={option.label}
                          href={option.href}
                          target={option.label === "WhatsApp" ? "_blank" : undefined}
                          rel={option.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex flex-col items-center gap-2 p-4 rounded-xl border bg-gradient-to-br ${option.color} ${option.borderColor} transition-all duration-200`}
                        >
                          <option.icon className={`w-6 h-6 ${option.iconColor}`} />
                          <span className="text-sm font-medium text-slate-200">{option.label}</span>
                        </motion.a>
                      ))}
                    </div>

                    {/* Contact Info */}
                    <div className="pt-4 border-t border-white/10 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Mail className="w-4 h-4 text-cyan-400" />
                        <span>not.jitin@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Phone className="w-4 h-4 text-teal-400" />
                        <span>+91 90088 98642</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
     </section>
  );
}

function MobileContact() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const contactOptions = [
    {
      icon: Mail,
      label: "Email",
      href: "mailto:not.jitin@gmail.com",
      color: "from-cyan-500/20 to-cyan-400/10",
      borderColor: "border-cyan-500/30",
      iconColor: "text-cyan-400"
    },
    {
      icon: Phone,
      label: "Call",
      href: "tel:+919008898642",
      color: "from-teal-500/20 to-teal-400/10",
      borderColor: "border-teal-500/30",
      iconColor: "text-teal-400"
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/919008898642",
      color: "from-cyan-500/15 to-teal-500/15",
      borderColor: "border-cyan-500/25",
      iconColor: "text-cyan-400"
    },
  ];

  return (
     <section id="contact" className="py-8 px-5 pb-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 blur-[100px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-3">
          Get In Touch
        </p>

        <h2 className="text-4xl font-bold mb-4 tracking-tight">
          Let&apos;s Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 text-glow-cyan">Extraordinary</span>
        </h2>

        <p className="text-slate-400 mb-10 text-base leading-relaxed max-w-md">
          Ready to architect autonomous systems? I&apos;m available for full-time roles, contracts, and advisory engagements.
        </p>
      </motion.div>

      {/* Main Grid */}
      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-3 gap-3">
          {/* GitHub */}
          <motion.a
            href="https://github.com/notjitin-1994"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.96 }}
            className="flex flex-col items-center justify-center p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md active:border-cyan-500/40 transition-all duration-300 shadow-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-2">
              <Github className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-bold text-slate-200 uppercase tracking-tighter">GitHub</span>
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            href="https://www.linkedin.com/in/notjitin/"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.96 }}
            className="flex flex-col items-center justify-center p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md active:border-cyan-500/40 transition-all duration-300 shadow-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-2">
              <Linkedin className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-tighter">LinkedIn</span>
          </motion.a>

          {/* Instagram */}
          <motion.a
            href="https://instagram.com/not_jitin"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.96 }}
            className="flex flex-col items-center justify-center p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md active:border-purple-500/40 transition-all duration-300 shadow-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-2">
              <Instagram className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-tighter">Instagram</span>
          </motion.a>
        </div>

        {/* Connect Expandable Card */}
        <div 
          className={`relative rounded-[32px] border transition-all duration-500 overflow-hidden shadow-2xl ${
            isExpanded 
              ? 'bg-gradient-to-br from-[#12121a] to-[#0a0a0f] border-cyan-500/40 ring-1 ring-cyan-500/20' 
              : 'bg-white/[0.02] border-white/[0.08] active:scale-[0.98]'
          }`}
        >
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              <motion.button
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsExpanded(true)}
                className="w-full flex items-center justify-between p-6 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-cyan-400" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse border-2 border-[#0a0a0f]" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-lg font-bold text-white tracking-tight">Connect</span>
                    <span className="text-xs text-slate-500 font-medium uppercase tracking-widest">Direct Options</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <ChevronDown className="w-5 h-5 text-cyan-400" />
                </div>
              </motion.button>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="p-8"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                      <Users className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white tracking-tight">Connect</p>
                      <p className="text-xs text-slate-500 uppercase tracking-widest">Choose a channel</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 active:scale-90 transition-transform"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                {/* Vertical Options - Better for mobile than horizontal icons */}
                <div className="space-y-3">
                  {contactOptions.map((option, idx) => (
                    <motion.a
                      key={option.label}
                      href={option.href}
                      target={option.label === "WhatsApp" ? "_blank" : undefined}
                      rel={option.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center justify-between p-5 rounded-2xl border bg-gradient-to-r ${option.color} ${option.borderColor} group shadow-lg`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-active:bg-white/10 transition-colors">
                          <option.icon className={`w-6 h-6 ${option.iconColor}`} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base font-bold text-white">{option.label}</span>
                          <span className="text-xs text-slate-400">
                            {option.label === "Email" ? "not.jitin@gmail.com" : option.label === "Call" ? "+91 90088 98642" : "Quick chat"}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-600 group-active:text-white transition-all group-active:translate-x-1" />
                    </motion.a>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Encrypted Communication</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Availability Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-6 rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md active:border-emerald-500/40 transition-all duration-300 shadow-xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <p className="text-base text-emerald-400 font-semibold uppercase tracking-tight">Available for new opportunities</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Full-time", "Contract", "Advisory"].map((t, i) => (
            <span key={i} className="px-4 py-2 text-xs font-bold bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 uppercase tracking-widest">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
     </section>
  );
}



// Import DesktopProducts (carousel-style like mobile)
// Import Desktop Products and Expertise

import { DesktopProjectCarousel } from "./components/DesktopProjectCarousel";
// Import Desktop components
import { DesktopExpertiseMarquee } from "./components/desktop-expertise-marquee";
import { DesktopCapabilitiesEnhanced } from "./components/desktop-capabilities-enhanced";

// Desktop Components (Original Design)
function DesktopHero({ onUnlock }: { onUnlock?: () => void }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Check if image is already cached/loaded
    if (imgRef.current?.complete) {
      setImageLoaded(true);
    }
    // Fallback: show image after 3 seconds even if onLoad hasn't fired
    const fallbackTimer = setTimeout(() => {
      setImageLoaded(true);
    }, 3000);
    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
     <section className="relative min-h-screen flex items-center overflow-hidden px-4 bg-[#0a0a0f]">
      {/* Vortex particles - desktop only (transparent, overlays on dark bg) */}
      <div className="hidden md:block absolute inset-0 z-0">
        <DesktopVortexBackground>
          <div className="absolute inset-0" /> {/* Empty div to satisfy children prop */}
        </DesktopVortexBackground>
      </div>

      {/* Animated background - mobile only */}
      <div className="md:hidden absolute inset-0 z-0">
        <AnimatedBackground />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {/* Left Column - Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 md:order-1 h-[480px]"
          >
            <TerminalComponent
              username="jitin"
              typingSpeed={45}
              initialDelay={600}
              isMobile={false}
              onUnlock={onUnlock}
            />
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 1 : 1.05 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="order-1 md:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-[480px] h-[480px]">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-cyan-500/20 rounded-xl blur-3xl scale-110" />

              {/* Image container */}
              <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  ref={imgRef}
                  src="/hero-photo.jpg"
                  alt="Jitin Nair"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 20%" }}
                  onLoad={() => setImageLoaded(true)}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
     </section>
  );
}

function DesktopCapabilities() {
  return (
    <section className="py-6 md:py-8 relative">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/capabilities-bg.jpg)',
          filter: 'blur(48px) brightness(0.4)',
          transform: 'scale(1.1)'
        }}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4">Capabilities Matrix</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Everything We Build</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Combined expertise of AI systems, full-stack engineering, and enterprise integrations
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-4 mb-12">
          {[
            { value: "50+", label: "Technical Skills", icon: Target },
            { value: "200+", label: "AI Agents Deployed", icon: Bot },
            { value: "25+", label: "Enterprise Integrations", icon: Workflow },
            { value: "95%", label: "Success Rate", icon: Award },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl p-5 border border-white/[0.08] bg-white/[0.03] backdrop-blur-[2px] hover:border-cyan-500/30 hover:bg-white/[0.06] transition-all duration-300 text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-cyan-400 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
     </section>
  );
}
function DesktopProjects() {
  return (
     <section id="projects" className="py-4 md:py-6">
      <DesktopProjectCarousel />
     </section>
  );
}

function DesktopJourney() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth spring animation for progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform for progress line height
  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const journeyData = [
    {
      year: "2025",
      title: "AI Systems Architect",
      role: "Independent Consultant",
      period: "March 2025 - Present",
      description: "Architected 200+ autonomous AI agents. Built high-frequency trading engines (Predator), multi-agent governance platforms (Reality-Check), and AI-native learning ecosystems (Smarslate). Specialized in LangGraph orchestration and Model Context Protocol (MCP) integrations across 147 agent instances.",
      highlights: ["200+ Agents Deployed", "96% Fleet Compliance", "MCP Orchestration"],
      icon: Bot,
      bgImage: "/journey-ai.jpg",
      gradient: "from-cyan-500/20 to-blue-500/20"
    },
    {
      year: "2022",
      title: "Instructional Designer",
      role: "Moody's Ratings",
      period: "Sept 2022 - Mar 2025",
      description: "Led video-based learning production for global ratings agency. Built scalable content pipelines and automated workflows, reducing production time by 60% while maintaining 90%+ completion rates for complex financial curriculum.",
      highlights: ["60% Production Save", "90%+ Completion", "Global L&D Scale"],
      icon: VideoIcon,
      bgImage: "/journey-finance.jpg",
      gradient: "from-emerald-500/20 to-teal-500/20"
    },
    {
      year: "2019",
      title: "Instructor Analyst",
      role: "Accenture",
      period: "Jan 2019 - Sept 2022",
      description: "Managed L&D for 300+ employees. Developed hybrid learning models that reduced training time by 70% while maintaining retention, saving ~$140K. Engineered a 1,400+ line VBA automation suite for pan-India TNA audits.",
      highlights: ["$140K Cost Savings", "70% Time Reduction", "VBA Audit Engine"],
      icon: Users,
      bgImage: "/journey-training.jpg",
      gradient: "from-teal-500/20 to-cyan-500/20"
    },
    {
      year: "2015",
      title: "Senior Executive",
      role: "247.ai",
      period: "May 2015 - Dec 2017",
      description: "Managed back-end support for a US retail giant, ensuring seamless buyer-seller experiences. Recognized as 3x Top Performer and identified for the leadership track within 24 months for excellence in process training and problem solving.",
      highlights: ["3x Top Performer", "Leadership Track", "Customer Success"],
      icon: Headphones,
      bgImage: "/journey-support.jpg",
      gradient: "from-cyan-500/20 to-emerald-500/20"
    },
    {
      year: "2015",
      title: "Bachelor of Commerce",
      role: "Sindhi College",
      period: "2012 - 2015",
      description: "Developed foundation in business administration and systems logic. Self-taught programmer during college years, architecting early web applications and automated business tools.",
      highlights: ["Self-Taught Dev", "Business Logic", "Analytical Core"],
      icon: GraduationCap,
      bgImage: "/journey-edu.jpg",
      gradient: "from-emerald-500/20 to-cyan-500/20"
    }
  ];

  // Background gradient animation based on scroll
  const bgGradient = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [
      "radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)",
      "radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)",
      "radial-gradient(circle at 50% 100%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)"
    ]
  );

  return (
    <section ref={containerRef} className="py-6 md:py-8 px-6 relative">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: bgGradient
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-left mb-20"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4"
          >
            The Path Here
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6 pb-2 bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent"
          >
            Journey So Far
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-slate-400 max-w-2xl text-lg"
          >
            10 years. 4 roles. From customer support to AI architecture -
            every step built the foundation for what comes next.
          </motion.p>
        </motion.div>

        {/* Scroll-Based Timeline */}
        <div className="relative">
          {/* Progress Line Container */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1">
            {/* Background Track */}
            <div className="absolute inset-0 bg-white/[0.05] rounded-full" />
            {/* Animated Progress Fill */}
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-cyan-400 via-cyan-300 to-cyan-500 rounded-full"
              style={{
                height: progressHeight,
                boxShadow: "0 0 20px rgba(34, 211, 238, 0.5)"
              }}
            />
          </div>

          {/* Journey Items */}
          <div className="space-y-16 md:space-y-24">
            {journeyData.map((item, index) => (
              <JourneyCard
                key={item.year + item.title}
                item={item}
                index={index}
                isLast={index === journeyData.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
     </section>
  );
}

// Individual Journey Card Component with Scroll Animations
function JourneyCard({ item, index, isLast }: {
  item: any;
  index: number;
  isLast: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98], delay: index * 0.1 }}
      className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Desktop Layout */}
      <div className={`hidden md:flex w-full items-center gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>

        {/* Card Container */}
        <motion.div
          className={`w-[calc(50%-60px)] ${isEven ? 'pr-0' : 'pl-0'}`}
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.1 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="relative p-8 rounded-3xl border border-white/[0.08] backdrop-blur-xl overflow-hidden cursor-pointer group text-left"
            animate={{
              backgroundColor: isHovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
              borderColor: isHovered ? "rgba(34, 211, 238, 0.3)" : "rgba(255,255,255,0.08)",
              y: isHovered ? -5 : 0
            }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated Gradient Border */}
            <motion.div
              className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              style={{ padding: '1px' }}
            >
              <div className="w-full h-full rounded-3xl bg-[#0a0a0f]" />
            </motion.div>

            {/* Parallax Background Image */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url(${item.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(10px)',
                scale: 1.2
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f]/90 via-[#0a0a0f]/80 to-transparent" />

            {/* Glowing Accent */}
            <motion.div
              className={`absolute ${isEven ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 w-1 h-20 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-50`}
              animate={{ opacity: isHovered ? 1 : 0.3 }}
            />

            <div className="relative z-10">
              {/* Year Badge with Glow */}
              <motion.div
                className={`flex items-center gap-3 mb-4 ${isEven ? '' : 'justify-end'}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <motion.span
                  className="px-3 py-1.5 rounded-full bg-cyan-400/15 text-cyan-400 text-xs font-mono font-bold border border-cyan-400/30"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 211, 238, 0.25)" }}
                >
                  {item.year}
                </motion.span>
                <span className="text-slate-500 text-sm">{item.period}</span>
              </motion.div>

              {/* Title with Reveal Animation */}
              <motion.h3
                className="text-xl font-bold mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {item.title}
              </motion.h3>

              <motion.p
                className="text-cyan-400 text-sm mb-4 font-medium"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
              >
                {item.role}
              </motion.p>

              <motion.p
                className="text-slate-400 text-sm leading-relaxed mb-5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                {item.description}
              </motion.p>

              {/* Highlights with Stagger */}
              <motion.div
                className={`flex flex-wrap gap-2 ${isEven ? '' : 'justify-end'}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                {item.highlights.map((highlight: string, i: number) => (
                  <motion.span
                    key={highlight}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 211, 238, 0.15)" }}
                    className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs text-slate-300 backdrop-blur-sm transition-colors"
                  >
                    {highlight}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Icon Hub with Connection */}
        <div className="w-24 flex-shrink-0 flex items-center justify-center relative">
          {/* Connector Line */}
          <motion.div
            className={`absolute h-0.5 bg-cyan-400 ${isEven ? 'left-0 right-1/2' : 'left-1/2 right-0'}`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ originX: isEven ? 0 : 1 }}
          />

          {/* Pulsing Icon Container */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 15 }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            className="relative z-10"
          >
            {/* Pulse Ring */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-cyan-400/30"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Icon */}
            <motion.div
              className="relative w-14 h-14 rounded-2xl bg-[#0a0a0f] border-2 border-cyan-400/60 flex items-center justify-center shadow-lg shadow-cyan-400/30"
              whileHover={{
                boxShadow: "0 0 30px rgba(34, 211, 238, 0.5)",
                borderColor: "rgba(34, 211, 238, 1)"
              }}
            >
              <item.icon className="w-6 h-6 text-cyan-400" />
            </motion.div>
          </motion.div>
        </div>

        {/* Empty Space */}
        <div className="w-[calc(50%-60px)]" />
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex items-start gap-5">
        {/* Timeline with Progress */}
        <div className="relative flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative z-10 w-12 h-12 rounded-xl bg-[#0a0a0f] border-2 border-cyan-400/50 flex items-center justify-center shadow-lg shadow-cyan-400/20"
          >
            <item.icon className="w-5 h-5 text-cyan-400" />
          </motion.div>

          {!isLast && (
            <motion.div
              className="w-0.5 flex-1 min-h-[60px] bg-cyan-400"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{ originY: 0 }}
            />
          )}
        </div>

        {/* Mobile Card */}
        <motion.div
          className="flex-1 pb-10"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="relative p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden"
            whileHover={{ scale: 1.02, borderColor: "rgba(34, 211, 238, 0.2)" }}
          >
            <motion.div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `url(${item.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(10px)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f]/90 via-[#0a0a0f]/80 to-transparent" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-cyan-400/15 text-cyan-400 text-xs font-mono font-bold border border-cyan-400/30">
                  {item.year}
                </span>
                <span className="text-slate-500 text-xs">{item.period}</span>
              </div>

              <h3 className="text-base font-bold mb-1">{item.title}</h3>
              <p className="text-cyan-400 text-xs mb-2">{item.role}</p>
              <p className="text-slate-400 text-xs leading-relaxed mb-3">{item.description}</p>

              <div className="flex flex-wrap gap-1.5">
                {item.highlights.slice(0, 3).map((highlight: string) => (
                  <span
                    key={highlight}
                    className="px-2 py-1 rounded-full bg-white/[0.08] border border-white/[0.12] text-[10px] text-slate-300"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}


// Main Page Component
export default function Home() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleUnlock = useCallback(() => {
    const expertiseSection = document.getElementById('expertise');
    if (expertiseSection) {
      expertiseSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Prevent hydration mismatch by rendering null until mounted
  if (!mounted) {
    return (
      <main className="bg-void min-h-screen">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  return (
    <main className="bg-void min-h-screen selection:bg-cyan-500/30">
      {isMobile ? (
        <>
          <div id="top" className="relative z-10">
            <MobileHero onUnlock={handleUnlock} />
          </div>
          
          <div className="space-y-4 md:space-y-0">
            <LazySection id="expertise">
              <MobileBento />
            </LazySection>
            
            <LazySection id="techstack">
              <MobileTechStack />
            </LazySection>
            
            <LazySection id="projects">
              <MobileProjects />
            </LazySection>
            
            <LazySection id="insights">
              <FeaturedInsight />
            </LazySection>
            
            <LazySection id="journey">
              <MobileJourney />
            </LazySection>
            
            <LazySection id="contact">
              <MobileContact />
            </LazySection>
          </div>
        </>
      ) : (
        <>
          <div id="top" className="relative z-10">
            <DesktopHero onUnlock={handleUnlock} />
          </div>

          <div className="space-y-12 md:space-y-0">
            <LazySection id="expertise">
              <DesktopExpertiseMarquee />
            </LazySection>
            
            <LazySection id="techstack">
              <DesktopTechStack />
            </LazySection>
            
            <LazySection id="projects">
              <DesktopProjects />
            </LazySection>
            
            <LazySection id="insights">
              <FeaturedInsight />
            </LazySection>
            
            <LazySection id="journey">
              <DesktopJourney />
            </LazySection>
            
            <LazySection id="contact">
              <DesktopContact />
            </LazySection>
          </div>
        </>
      )}
      <Footer />
    </main>
  );
}
