"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
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
  Workflow,
  Boxes,
  GitBranch,
  Server,
  Lock,
  Eye,
  Mic,
  Image,
  Video,
  Music,
  Wrench,
  Settings,
  Rocket,
  Target,
  Award,
} from "lucide-react";
import { AnimatedBackground } from "./components/animated-background";
import { TouchFlipCard } from "./components/TouchFlipCard";
import { ProjectCarousel } from "./components/ProjectCarousel";
import { Terminal as TerminalComponent } from "./components/terminal";
import { DesktopVortexBackground } from "./components/desktop-vortex-background";

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
function MobileHero() {
  const [currentWord, setCurrentWord] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const words = ["Websites", "Web Apps", "AI Apps", "Agentic Systems", "Desktop Apps"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Check if image is already cached/loaded
    if (imgRef.current?.complete) {
      setImageLoaded(true);
    }
    // Fallback: show image after 2 seconds even if onLoad hasn't fired
    const fallbackTimer = setTimeout(() => {
      setImageLoaded(true);
    }, 2000);
    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end pb-4 pt-4 overflow-hidden">
      {/* Photo Background - Cinematic Ken Burns + Fade */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ 
          opacity: imageLoaded ? 1 : 0, 
          scale: imageLoaded ? 1 : 1.05 
        }}
        transition={{ 
          duration: 2.0, 
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
        />
      </motion.div>

      {/* Gradient Overlays - Fade in with image */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
      <motion.div 
        className="absolute inset-0 bg-void/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Content - Terminal UI */}
      <div className="relative z-10 px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: imageLoaded ? 1 : 0, y: imageLoaded ? 0 : 30 }}
          transition={{ duration: 1.0, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          <TerminalComponent
            username="jitin"
            typingSpeed={45}
            initialDelay={600}
            className="max-w-none"
            isMobile={true}
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
  pauseOnHover = true,
  direction = "left",
}: {
  children: React.ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
}) {
  return (
    <div className={`flex overflow-hidden ${pauseOnHover ? "group" : ""}`}>
      <div
        className="flex shrink-0 animate-marquee"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {children}
      </div>
      <div
        className="flex shrink-0 animate-marquee"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
        aria-hidden
      >
        {children}
      </div>
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

function MobileBento() {
  const expertise = [
    {
      icon: Brain,
      title: "AI Automation Systems",
      description: "Autonomous agents that streamline workflows, reduce manual tasks, and deliver measurable productivity gains for enterprise teams.",
      skills: ["LangGraph", "CrewAI", "Process Automation", "LLM Orchestration"],
      featured: true,
    },
    {
      icon: Layout,
      title: "Dashboards & Analytics",
      description: "Real-time data dashboards and admin panels that transform complex data into actionable insights for stakeholders.",
      skills: ["React", "D3.js", "PostgreSQL", "Data Visualization"],
      featured: false,
    },
    {
      icon: Bot,
      title: "AI-Enabled Applications",
      description: "Production-grade apps with integrated AI features—semantic search, document processing, and intelligent recommendations.",
      skills: ["OpenAI", "RAG", "Vector DBs", "TypeScript"],
      featured: false,
    },
    {
      icon: Globe,
      title: "Marketing Websites",
      description: "High-converting landing pages and marketing sites built for performance, SEO, and lead generation.",
      skills: ["Next.js", "Astro", "Tailwind", "SEO"],
      featured: false,
    },
    {
      icon: Monitor,
      title: "Internal Tools",
      description: "Custom desktop applications and internal tools that accelerate team productivity and replace manual processes.",
      skills: ["Tauri", "Electron", "Rust", "Cross-platform"],
      featured: false,
    },
    {
      icon: Network,
      title: "Integration Pipelines",
      description: "Scalable data pipelines and API integrations that connect disparate systems and automate data flows.",
      skills: ["Kafka", "Redis", "Docker", "Microservices"],
      featured: false,
    },
  ];

  const BentoCard = ({ item, index }: { item: typeof expertise[0]; index: number }) => (
    <div
      className="flex-shrink-0 w-[260px] px-2"
    >
      <div className={`relative overflow-hidden rounded-2xl p-5 h-[200px] ${item.featured ? "bg-gradient-to-br from-cyan-500/20 via-white/[0.05] to-transparent border-cyan-500/30" : "bg-white/[0.03] border-white/[0.08]"} border backdrop-blur-[2px] transition-all duration-500 hover:border-cyan-500/30 hover:bg-white/[0.06]`}>
        {item.featured && (
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        )}
        <div className="relative z-10 h-full flex flex-col">
          <div className={`w-10 h-10 rounded-xl ${item.featured ? "bg-cyan-500 shadow-lg shadow-cyan-500/25" : "bg-white/10"} flex items-center justify-center mb-3`}>
            <item.icon className={`w-5 h-5 ${item.featured ? "text-white" : "text-cyan-400"}`} />
          </div>
          <h3 className="text-base font-bold mb-2">{item.title}</h3>
          <p className="text-slate-400 text-xs mb-3 leading-relaxed flex-grow">{item.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {item.skills.slice(0, 3).map((skill, i) => (
              <span
                key={i}
                className={`px-2 py-0.5 text-[9px] font-mono rounded-full border ${item.featured ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/20" : "bg-white/5 text-slate-400 border-white/10"}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20 overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 px-5"
      >
        <p className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-3">
          What I Deliver
        </p>
        <h2 className="text-3xl font-bold mb-3">Products That Drive Results</h2>
        <p className="text-slate-400 text-sm">
          Production-ready solutions that reduce costs, accelerate workflows, and deliver measurable business impact.
        </p>
      </motion.div>

      {/* First Marquee Row - Left to Right */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
        <Marquee speed={35} direction="left">
          {expertise.map((item, index) => (
            <BentoCard key={index} item={item} index={index} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
function DesktopBento() {
  const expertise = [
    {
      icon: Brain,
      title: "AI Automation Systems",
      description: "Autonomous agents that streamline workflows, reduce manual tasks, and deliver measurable productivity gains for enterprise teams.",
      skills: ["LangGraph", "CrewAI", "Process Automation", "LLM Orchestration"],
      featured: true,
    },
    {
      icon: Layout,
      title: "Dashboards & Analytics",
      description: "Real-time data dashboards and admin panels that transform complex data into actionable insights for stakeholders.",
      skills: ["React", "D3.js", "PostgreSQL", "Data Visualization"],
    },
    {
      icon: Bot,
      title: "AI-Enabled Applications",
      description: "Production-grade apps with integrated AI features—semantic search, document processing, and intelligent recommendations.",
      skills: ["OpenAI", "RAG", "Vector DBs", "TypeScript"],
    },
    {
      icon: Globe,
      title: "Marketing Websites",
      description: "High-converting landing pages and marketing sites built for performance, SEO, and lead generation.",
      skills: ["Next.js", "Astro", "Tailwind", "SEO"],
    },
    {
      icon: Monitor,
      title: "Internal Tools",
      description: "Custom desktop applications and internal tools that accelerate team productivity and replace manual processes.",
      skills: ["Tauri", "Electron", "Rust", "Cross-platform"],
    },
    {
      icon: Network,
      title: "Integration Pipelines",
      description: "Scalable data pipelines and API integrations that connect disparate systems and automate data flows.",
      skills: ["Kafka", "Redis", "Docker", "Microservices"],
    },
  ];

  return (
    <section id="expertise" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4">
            What I Deliver
          </p>
          <h2 className="text-5xl font-bold mb-6">
            Products That <span className="text-cyan-400">Drive Results</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg">
            Production-ready solutions that reduce costs, accelerate workflows, and deliver measurable business impact.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {/* Featured Card - Spans 2x2 */}
          <BentoCard className="md:col-span-2 md:row-span-2 p-8">
            <div className="h-full flex flex-col">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500 flex items-center justify-center mb-6 shadow-xl shadow-cyan-500/20">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Agentic Systems</h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-6 flex-grow">
                Multi-agent orchestration networks that perceive, decide, and act autonomously at scale. Built for production workloads.
              </p>
              <div className="flex flex-wrap gap-2">
                {["LangGraph", "AutoGen", "CrewAI", "Mastra"].map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-1.5 text-sm font-mono bg-cyan-500/10 text-cyan-300 rounded-full border border-cyan-500/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* AI Apps - Spans 1x2 */}
          <BentoCard className="md:row-span-2 p-6">
            <div className="h-full flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                <Bot className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Apps</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-grow">
                Intelligent applications powered by LLMs, embeddings, vector search, and semantic understanding.
              </p>
              <div className="flex flex-wrap gap-2">
                {["OpenAI", "Anthropic", "RAG"].map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-mono bg-white/5 text-slate-300 rounded-full border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Web Apps */}
          <BentoCard className="p-6">
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                  <Layout className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">Web Apps</h3>
                <p className="text-slate-400 text-sm">
                  Full-stack SaaS platforms and dashboards.
                </p>
              </div>
              <div className="flex gap-2 mt-3">
                {["React", "Node.js"].map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-[10px] font-mono bg-white/5 text-slate-400 rounded-full border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Websites */}
          <BentoCard className="p-6">
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                  <Globe className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">Websites</h3>
                <p className="text-slate-400 text-sm">
                  High-performance marketing sites.
                </p>
              </div>
              <div className="flex gap-2 mt-3">
                {["Next.js", "Tailwind"].map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-[10px] font-mono bg-white/5 text-slate-400 rounded-full border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Desktop Apps */}
          <BentoCard className="p-6">
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                  <Monitor className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">Desktop Apps</h3>
                <p className="text-slate-400 text-sm">
                  Cross-platform native applications.
                </p>
              </div>
              <div className="flex gap-2 mt-3">
                {["Tauri", "Rust"].map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-[10px] font-mono bg-white/5 text-slate-400 rounded-full border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Systems Design - Wide */}
          <BentoCard className="md:col-span-2 p-6">
            <div className="h-full flex items-center gap-6">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <Network className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-2">Systems Design</h3>
                <p className="text-slate-400 text-sm mb-3">
                  Distributed architectures, microservices, event-driven design, and scalable infrastructure.
                </p>
                <div className="flex gap-2">
                  {["Kafka", "Redis", "Docker", "Kubernetes"].map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-mono bg-white/5 text-slate-300 rounded-full border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

// Shared Projects Data
const projectsData = [
  {
    name: "Quantitative Trading Infrastructure",
    technologies: ["LangGraph", "TimescaleDB", "Polars", "Python"],
    description: "Institutional-grade algorithmic trading platform processing real-time market data with autonomous multi-agent decision architecture.",
    features: ["Sub-second execution latency", "Multi-agent orchestration", "Institutional risk controls", "Strategy backtesting engine"],
    githubUrl: "https://github.com/notjitin-1994/xau-usd-trading-agents",
    liveUrl: undefined,
  },
  {
    name: "Enterprise AIOps Platform",
    technologies: ["Python", "systemd", "Docker", "LangGraph"],
    description: "Self-healing infrastructure intelligence deployed across 200+ autonomous monitoring agents with predictive incident resolution.",
    features: ["200+ autonomous agents", "Predictive auto-recovery", "Real-time log intelligence", "Executive health dashboards"],
    githubUrl: "https://github.com/openclaw/guardian",
    liveUrl: undefined,
  },
  {
    name: "AI-First Learning Management",
    technologies: ["React", "TypeScript", "Supabase", "AI"],
    description: "Enterprise learning platform delivering personalized training at scale with AI-generated content and competency tracking.",
    features: ["AI content generation", "Competency analytics", "SCORM/xAPI compliant", "Async learning pipelines"],
    githubUrl: undefined,
    liveUrl: "https://smartslate.io",
  },
  {
    name: "Enterprise AI Verification Framework",
    technologies: ["RAG", "CoVe", "Pydantic", "Python"],
    description: "Production safety system ensuring AI output reliability through multi-layer validation achieving 95%+ accuracy certification.",
    features: ["Chain-of-Verification", "Multi-source validation", "Confidence scoring", "Enterprise compliance"],
    githubUrl: "https://github.com/notjitin-1994/anti-hallucination",
    liveUrl: undefined,
  },
  {
    name: "Multi-Tenant AI Service Platform",
    technologies: ["Multi-Agent", "Orchestration", "Next.js", "AI"],
    description: "White-label AI infrastructure powering 12+ client organizations with isolated tenant environments and automated service delivery.",
    features: ["Isolated tenant architecture", "Agent orchestration", "Client analytics portals", "Automated billing systems"],
    githubUrl: undefined,
    liveUrl: "https://glitchzero.com",
  },
  {
    name: "Intelligent Process Automation",
    technologies: ["Python", "Gradio", "Playwright", "Docker"],
    description: "Visual workflow automation platform enabling non-technical teams to deploy browser-based AI agents without engineering support.",
    features: ["No-code workflow builder", "Multi-LLM integration", "Visual session capture", "Audit trail logging"],
    githubUrl: "https://github.com/notjitin-1994/browser-use-webui",
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
      { name: "LLM Integration (GPT-4, Claude, Gemini)", level: 90 },
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
    <section className="py-16 overflow-hidden relative">
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(/capabilities-bg.jpg)',
          filter: 'blur(36px) brightness(0.4)',
          transform: 'scale(1.1)'
        }}
      />
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative z-10">
      <div className="px-5 mb-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-2"
        >
          Capabilities Matrix
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-2"
        >
          Everything We Build
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-slate-400 text-sm"
        >
          Navigate to explore capabilities
        </motion.p>
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
  return (
    <section className="py-16">
      <div className="px-5 mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-2"
        >
          Featured Deliverables
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold"
        >
          Production Systems
        </motion.h2>
      </div>

      <div className="px-4">
        <ProjectCarousel projects={projectsData} />
      </div>
    </section>
  );
}

function MobileTechStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const toolCategories = [
    {
      category: "AI & ML",
      icon: Brain,
      tools: [
        { name: "LangGraph", level: "Expert" },
        { name: "OpenAI API", level: "Expert" },
        { name: "Anthropic Claude", level: "Expert" },
        { name: "LangChain", level: "Advanced" },
        { name: "Vector DBs", level: "Advanced" },
        { name: "Hugging Face", level: "Advanced" },
        { name: "RAG Systems", level: "Expert" },
      ],
    },
    {
      category: "Frontend",
      icon: Layout,
      tools: [
        { name: "React", level: "Expert" },
        { name: "Next.js", level: "Expert" },
        { name: "TypeScript", level: "Expert" },
        { name: "Tailwind CSS", level: "Expert" },
        { name: "Framer Motion", level: "Advanced" },
        { name: "shadcn/ui", level: "Advanced" },
      ],
    },
    {
      category: "Backend",
      icon: Server,
      tools: [
        { name: "Python", level: "Expert" },
        { name: "FastAPI", level: "Advanced" },
        { name: "Node.js", level: "Advanced" },
        { name: "PostgreSQL", level: "Advanced" },
        { name: "Redis", level: "Advanced" },
        { name: "GraphQL", level: "Intermediate" },
      ],
    },
    {
      category: "DevOps",
      icon: Cloud,
      tools: [
        { name: "Docker", level: "Advanced" },
        { name: "AWS", level: "Advanced" },
        { name: "Vercel", level: "Expert" },
        { name: "Linux", level: "Advanced" },
        { name: "Nginx", level: "Intermediate" },
        { name: "CI/CD", level: "Advanced" },
      ],
    },
    {
      category: "Automation",
      icon: Zap,
      tools: [
        { name: "Playwright", level: "Expert" },
        { name: "Selenium", level: "Advanced" },
        { name: "n8n", level: "Advanced" },
        { name: "Zapier", level: "Intermediate" },
        { name: "Puppeteer", level: "Advanced" },
        { name: "AutoHotkey", level: "Intermediate" },
      ],
    },
  ];

  const goToPrev = () => setActiveIndex((prev) => Math.max(prev - 1, 0));
  const goToNext = () => setActiveIndex((prev) => Math.min(prev + 1, toolCategories.length - 1));

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert": return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "Advanced": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      default: return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    }
  };

  return (
    <section id="techstack" className="py-16 overflow-hidden">
      <div className="px-5 mb-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-2"
        >
          Technical Arsenal
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-2"
        >
          Tools & Technologies
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-slate-400 text-sm"
        >
          Navigate to explore categories
        </motion.p>
      </div>

      {/* Carousel Container */}
      <div className="px-5 mb-6">
        <div className="relative rounded-2xl border border-white/[0.08] bg-[#0d0d12] overflow-hidden">
          {/* Cards Container - With padding for arrows */}
          <div 
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {toolCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.category}
                  className="w-full flex-shrink-0 min-w-full px-12 py-6 overflow-hidden"
                >
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0 border border-cyan-500/20">
                      <Icon className="w-7 h-7 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{cat.category}</h3>
                      <p className="text-slate-500 text-sm">{cat.tools.length} tools</p>
                    </div>
                  </div>

                  {/* Tools Grid */}
                  <div className="flex flex-wrap gap-2.5">
                    {cat.tools.map((tool) => (
                      <span
                        key={tool.name}
                        className={`px-3 py-2 rounded-lg border text-sm font-medium ${getLevelColor(tool.level)}`}
                      >
                        {tool.name}
                      </span>
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
              disabled={activeIndex === toolCategories.length - 1}
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
            {toolCategories.map((_, index) => (
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

      {/* Primary Stack Highlight */}
      <div className="px-5">
        <div className="rounded-2xl p-5 border border-white/[0.08] bg-[#0d0d12]">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-bold">Primary Stack</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {["LangGraph", "Python", "Next.js", "TypeScript", "PostgreSQL", "Docker"].map((tool) => (
              <span
                key={tool}
                className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-300 text-sm font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-5 mt-4 grid grid-cols-3 gap-3">
        {[
          { value: "35+", label: "Technologies", icon: Wrench },
          { value: "6", label: "Categories", icon: Boxes },
          { value: "15+", label: "Expert Level", icon: Award },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="rounded-xl p-3 border border-white/[0.08] bg-[#0d0d12] text-center"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center mx-auto mb-1.5">
              <stat.icon className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-lg font-bold text-cyan-400">{stat.value}</div>
            <div className="text-[10px] text-slate-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function DesktopTechStack() {
  const toolCategories = [
    {
      category: "AI & Machine Learning",
      icon: Brain,
      description: "Agent orchestration, LLM integration, and vector search",
      tools: [
        { name: "LangGraph", level: "Expert", highlight: true },
        { name: "OpenAI API", level: "Expert", highlight: true },
        { name: "Anthropic Claude", level: "Expert", highlight: true },
        { name: "LangChain", level: "Advanced", highlight: false },
        { name: "Pinecone", level: "Advanced", highlight: false },
        { name: "Weaviate", level: "Intermediate", highlight: false },
      ],
    },
    {
      category: "Frontend Engineering",
      icon: Layout,
      description: "Modern reactive interfaces with type-safe development",
      tools: [
        { name: "React 18+", level: "Expert", highlight: true },
        { name: "Next.js 14+", level: "Expert", highlight: true },
        { name: "TypeScript", level: "Expert", highlight: true },
        { name: "Tailwind CSS", level: "Expert", highlight: false },
        { name: "Framer Motion", level: "Advanced", highlight: false },
        { name: "shadcn/ui", level: "Advanced", highlight: false },
      ],
    },
    {
      category: "Backend Systems",
      icon: Server,
      description: "High-performance APIs and real-time data processing",
      tools: [
        { name: "Python 3.11+", level: "Expert", highlight: true },
        { name: "FastAPI", level: "Advanced", highlight: true },
        { name: "Node.js", level: "Advanced", highlight: false },
        { name: "WebSockets", level: "Advanced", highlight: false },
        { name: "GraphQL", level: "Intermediate", highlight: false },
        { name: "gRPC", level: "Intermediate", highlight: false },
      ],
    },
    {
      category: "Data & Storage",
      icon: Database,
      description: "Relational, time-series, and vector database systems",
      tools: [
        { name: "PostgreSQL", level: "Advanced", highlight: true },
        { name: "Supabase", level: "Expert", highlight: true },
        { name: "TimescaleDB", level: "Advanced", highlight: false },
        { name: "Redis", level: "Intermediate", highlight: false },
        { name: "ClickHouse", level: "Intermediate", highlight: false },
        { name: "S3/MinIO", level: "Advanced", highlight: false },
      ],
    },
    {
      category: "Infrastructure & DevOps",
      icon: Cloud,
      description: "Containerization, CI/CD, and cloud-native deployment",
      tools: [
        { name: "Docker", level: "Advanced", highlight: true },
        { name: "GitHub Actions", level: "Advanced", highlight: true },
        { name: "Vercel", level: "Expert", highlight: false },
        { name: "Linux", level: "Advanced", highlight: false },
        { name: "Nginx", level: "Intermediate", highlight: false },
        { name: "Terraform", level: "Intermediate", highlight: false },
      ],
    },
    {
      category: "Automation & Testing",
      icon: Bot,
      description: "Browser automation, E2E testing, and workflow orchestration",
      tools: [
        { name: "Playwright", level: "Expert", highlight: true },
        { name: "Selenium", level: "Advanced", highlight: false },
        { name: "n8n", level: "Advanced", highlight: false },
        { name: "Zapier", level: "Intermediate", highlight: false },
        { name: "Puppeteer", level: "Advanced", highlight: false },
        { name: "Cron/Scheduled", level: "Expert", highlight: false },
      ],
    },
  ];

  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4">
            Technical Arsenal
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Tools & Technologies
          </h2>
          <p className="text-slate-400 max-w-2xl">
            Production-grade stack meticulously selected for building enterprise-scale
            AI systems and autonomous platforms
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-5 gap-4 mb-12">
          {[
            { value: "30+", label: "Technologies", icon: Wrench },
            { value: "6", label: "Categories", icon: Boxes },
            { value: "15+", label: "Expert Level", icon: Award },
            { value: "12", label: "Advanced", icon: Target },
            { value: "8+", label: "Years Experience", icon: Calendar },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl p-5 border border-white/[0.08] bg-[#0d0d12] hover:border-cyan-500/20 transition-all duration-300 text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-cyan-400 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tool Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {toolCategories.map((cat, catIndex) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: catIndex * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl p-5 border border-white/[0.08] bg-[#0d0d12] hover:border-cyan-500/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">{cat.category}</h3>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mb-4">{cat.description}</p>

                <div className="flex flex-wrap gap-2">
                  {cat.tools.map((tool, toolIndex) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: catIndex * 0.1 + toolIndex * 0.03,
                      }}
                      viewport={{ once: true }}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border ${
                        tool.highlight
                          ? "bg-cyan-500/10 border-cyan-500/30"
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      <span
                        className={`text-sm font-medium ${
                          tool.highlight ? "text-cyan-300" : "text-slate-300"
                        }`}
                      >
                        {tool.name}
                      </span>
                      <span
                        className={`text-[10px] px-1 py-0.5 rounded-full ${
                          tool.level === "Expert"
                            ? "bg-cyan-500/20 text-cyan-400"
                            : tool.level === "Advanced"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-amber-500/20 text-amber-400"
                        }`}
                      >
                        {tool.level}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Highlighted Tools Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-2xl p-5 border border-white/[0.08] bg-[#0d0d12] hover:border-cyan-500/20 transition-all duration-300"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="font-bold">Primary Stack</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              "LangGraph",
              "Python",
              "Next.js",
              "TypeScript",
              "PostgreSQL",
              "Docker",
              "Vercel",
              "OpenAI",
            ].map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MobileContact() {
  const links = [
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Mail, label: "Email", href: "mailto:hello@jitin.dev" },
  ];

  return (
    <section className="py-16 px-5 pb-32">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-4"
      >
        Get In Touch
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-4"
      >
        Let's Talk
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-slate-400 text-sm mb-8"
      >
        Ready to build autonomous systems? I'm available for full-time roles, contracts, and advisory.
      </motion.p>

      {/* Contact Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {links.map((link, index) => (
          <motion.a
            key={index}
            href={link.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.08] bg-[#0d0d12] active:scale-95 transition-transform"
          >
            <link.icon className="w-5 h-5 text-cyan-400" />
            <span className="text-sm text-slate-300">{link.label}</span>
          </motion.a>
        ))}
      </div>

      {/* Availability Badge */}
      <div className="p-4 rounded-2xl border border-white/[0.08] bg-[#0d0d12]">
        <p className="text-xs text-slate-500 mb-2">Currently available for</p>
        <div className="flex flex-wrap gap-2">
          {["Full-time", "Contract", "Advisory"].map((t, i) => (
            <span key={i} className="px-3 py-1 text-xs bg-cyan-500/20 text-cyan-400 rounded-full">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileBottomNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("top");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < 100);
      lastScrollY.current = currentScrollY;

      // Determine active section
      const sections = [
        { id: "top", offset: 0 },
        { id: "expertise", offset: document.getElementById("expertise")?.offsetTop || 600 },
        { id: "projects", offset: document.getElementById("projects")?.offsetTop || 1200 },
        { id: "contact", offset: document.getElementById("contact")?.offsetTop || 2000 },
      ];

      const scrollPos = currentScrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPos >= sections[i].offset) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setActiveSection(id);
  };

  const navItems = [
    { icon: Terminal, label: "Home", id: "top" },
    { icon: Brain, label: "Work", id: "expertise" },
    { icon: Layers, label: "Projects", id: "projects" },
    { icon: Mail, label: "Contact", id: "contact" },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-safe"
    >
      <div className="mx-auto max-w-md">
        <div className="flex items-center justify-around p-2 mb-4 rounded-2xl bg-surface/90 backdrop-blur-xl border border-white/10 shadow-2xl">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
                  isActive ? "bg-cyan-500/20" : "active:bg-white/5"
                }`}
              >
                <item.icon className={`w-5 h-5 transition-colors duration-300 ${
                  isActive ? "text-cyan-400" : "text-slate-400"
                }`} />
                <span className={`text-[10px] transition-colors duration-300 ${
                  isActive ? "text-cyan-400 font-medium" : "text-slate-500"
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 w-1 h-1 rounded-full bg-cyan-400"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}

function DesktopNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-void/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => scrollTo("top")}
            className="text-lg font-bold tracking-tight hover:text-cyan-400 transition-colors"
          >
            Jitin <span className="text-cyan-400">Nair</span>
          </button>
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Expertise", id: "expertise" },
              { label: "Projects", id: "projects" },
              { label: "Tech Stack", id: "techstack" },
              { label: "Contact", id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

// Import DesktopProducts (carousel-style like mobile)
// Import Desktop Products and Expertise
import { DesktopProducts } from "./components/desktop-products";
// Import Desktop components
import { DesktopExpertiseMarquee } from "./components/desktop-expertise-marquee";
import { DesktopCapabilitiesEnhanced } from "./components/desktop-capabilities-enhanced";

// Desktop Components (Original Design)
function DesktopHero() {
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
      <div className="md:hidden absolute inset-0">
        <AnimatedBackground />
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {/* Left Column - Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 md:order-1 flex flex-col"
          >
            <TerminalComponent
              username="jitin"
              typingSpeed={45}
              initialDelay={600}
              isMobile={false}
            />
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 1 : 1.05 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="order-1 md:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-[480px] h-[488px]">
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
    <section className="py-32 relative">
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
              className="rounded-2xl p-5 border border-white/[0.08] bg-[#0d0d12] hover:border-cyan-500/20 transition-all duration-300 text-center"
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
    <DesktopProducts projects={projectsData} />
  );
}

function DesktopContact() {
  return (
    <section id="contact" className="py-32">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4">Get In Touch</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Build Something <span className="text-gradient">Autonomous</span></h2>
        <div className="flex flex-wrap gap-4 mb-16">
          {[{ icon: Github, label: "GitHub" }, { icon: Linkedin, label: "LinkedIn" }, { icon: Twitter, label: "Twitter" }, { icon: Mail, label: "Email" }].map((l, i) => (
            <a key={i} href="#" className="flex items-center gap-3 px-5 py-3 rounded-xl border border-white/[0.08] bg-[#0d0d12] hover:border-cyan-500/20 transition-all duration-300">
              <l.icon className="w-5 h-5 text-cyan-400" />
              <span className="text-slate-300">{l.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function Home() {
  const isMobile = useIsMobile();

  return (
    <main className="bg-void min-h-screen">
      {isMobile ? (
        <>
          <div id="top">
            <MobileHero />
          </div>
          <div id="expertise">
            <MobileBento />
          </div>
          <MobileCapabilities />
          <div id="projects">
            <MobileProjects />
          </div>
          <MobileTechStack />
          <div id="contact">
            <MobileContact />
          </div>
        </>
      ) : (
        <>
          <DesktopHero />
          <div id="expertise"><DesktopExpertiseMarquee /></div>
          <DesktopCapabilitiesEnhanced />
          <div id="projects"><DesktopProjects /></div>
          <div id="techstack"><DesktopTechStack /></div>
          <div id="contact"><DesktopContact /></div>
        </>
      )}
    </main>
  );
}
