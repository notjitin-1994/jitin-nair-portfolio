"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Download, ChevronDown, ArrowRight, Phone, Mail, FileText, Check, Terminal as TerminalIcon, Cpu, Globe, Layers, Zap } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

// Hook to detect when element enters viewport
function useInView(ref: React.RefObject<HTMLElement | null>, once = true) {
  const [inView, setInView] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || (once && triggered.current)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          setInView(true);
          if (once) {
            triggered.current = true;
            observer.disconnect();
          }
        }
      },
      { threshold: 0.01, rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, once]);

  return inView;
}

// Pixel Grid ASCII Art - Renders crisp on all devices using CSS Grid
// 1 = pixel on, 0 = pixel off
const pixelBannerP = [
  [1,1,1,1,1,1],
  [1,1,0,0,0,1],
  [1,1,1,1,1,1],
  [1,1,0,0,0,0],
  [1,1,0,0,0,0],
];
const pixelBannerO = [
  [0,1,1,1,1,0],
  [1,1,0,0,1,1],
  [1,1,0,0,1,1],
  [1,1,0,0,1,1],
  [0,1,1,1,1,0],
];
const pixelBannerR = [
  [1,1,1,1,1,0],
  [1,1,0,0,1,1],
  [1,1,1,1,1,0],
  [1,1,0,0,1,1],
  [1,1,0,0,1,1],
];
const pixelBannerT = [
  [1,1,1,1,1,1],
  [0,0,1,1,0,0],
  [0,0,1,1,0,0],
  [0,0,1,1,0,0],
  [0,0,1,1,0,0],
];
const pixelBannerF = [
  [1,1,1,1,1,1],
  [1,1,0,0,0,0],
  [1,1,1,1,1,0],
  [1,1,0,0,0,0],
  [1,1,0,0,0,0],
];
const pixelBannerL = [
  [1,1,0,0,0,0],
  [1,1,0,0,0,0],
  [1,1,0,0,0,0],
  [1,1,0,0,0,0],
  [1,1,1,1,1,1],
];
const pixelBannerI = [
  [1,1,1,1],
  [0,1,1,0],
  [0,1,1,0],
  [0,1,1,0],
  [1,1,1,1],
];

const pixelLetters = [pixelBannerP, pixelBannerO, pixelBannerR, pixelBannerT, pixelBannerF, pixelBannerO, pixelBannerL, pixelBannerI, pixelBannerO];

// Pixel Banner Component - renders ASCII as CSS Grid pixels
function PixelBanner({ isMobile }: { isMobile: boolean }) {
  const pixelSize = isMobile ? 3 : 5;
  const gap = isMobile ? 1 : 2;
  const letterGap = isMobile ? 3 : 6;
  
  const totalWidth = pixelLetters.reduce((acc, letter) => acc + letter[0].length * pixelSize + letterGap, 0) - letterGap;
  
  return (
    <div className="flex items-center" style={{ height: isMobile ? '40px' : '65px' }}>
      <div className="flex items-end">
        {pixelLetters.map((letter, letterIndex) => (
          <div key={letterIndex} className="flex">
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${letter[0].length}, ${pixelSize}px)`,
                gridTemplateRows: `repeat(${letter.length}, ${pixelSize}px)`,
                gap: `${gap}px`,
              }}
            >
              {letter.flat().map((pixel, pixelIndex) => (
                <motion.div
                  key={pixelIndex}
                  className={pixel ? '' : 'bg-transparent'}
                  style={{
                    width: pixelSize,
                    height: pixelSize,
                    borderRadius: isMobile ? 0.5 : 1,
                  }}
                  initial={{ opacity: 0, scale: 0, backgroundColor: '#22d3ee' }}
                  animate={{
                    opacity: pixel ? 1 : 0,
                    scale: pixel ? 1 : 0,
                    backgroundColor: pixel ? ['#22d3ee', '#10b981', '#22d3ee'] : 'transparent',
                  }}
                  transition={{
                    opacity: { duration: 0.3, delay: (letterIndex * 5 + pixelIndex) * 0.01, ease: [0.4, 0, 0.2, 1] },
                    scale: { duration: 0.3, delay: (letterIndex * 5 + pixelIndex) * 0.01, ease: [0.4, 0, 0.2, 1] },
                    backgroundColor: { duration: 2, ease: 'linear', repeat: Infinity },
                  }}
                />
              ))}
            </div>
            {letterIndex < pixelLetters.length - 1 && (
              <div style={{ width: letterGap }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Scramble characters for decode effect
const SCRAMBLE_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// Glitch text component with neon cyberpunk effect
function GlitchText({ text, className }: { text: string; className?: string }) {
  const [glitchOffset, setGlitchOffset] = useState(0);
  const [glitchOpacity, setGlitchOpacity] = useState(0);
  const [hueRotate, setHueRotate] = useState(0);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      // Random glitch trigger
      if (Math.random() > 0.7) {
        setGlitchOffset(Math.random() > 0.5 ? 2 : -2);
        setGlitchOpacity(0.8);
        setHueRotate(Math.random() * 30 - 15);
        
        setTimeout(() => {
          setGlitchOffset(0);
          setGlitchOpacity(0);
          setHueRotate(0);
        }, 50 + Math.random() * 100);
      }
    }, 200 + Math.random() * 300);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <span className={cn("relative inline-block", className)}>
      {/* Main text */}
      <span 
        className="relative z-10"
        style={{
          color: '#22d3ee',
          textShadow: '0 0 10px rgba(34, 211, 238, 0.5), 0 0 20px rgba(34, 211, 238, 0.3)',
        }}
      >
        {text}
      </span>
      
      {/* Glitch layer 1 - Cyan offset */}
      <span 
        className="absolute inset-0 z-0 pointer-events-none select-none"
        style={{
          color: '#06b6d4',
          left: `${glitchOffset}px`,
          opacity: glitchOpacity,
          clipPath: 'inset(10% 0 60% 0)',
          filter: `hue-rotate(${hueRotate}deg)`,
        }}
        aria-hidden
      >
        {text}
      </span>
      
      {/* Glitch layer 2 - Magenta offset */}
      <span 
        className="absolute inset-0 z-0 pointer-events-none select-none"
        style={{
          color: '#d946ef',
          left: `${-glitchOffset}px`,
          opacity: glitchOpacity * 0.7,
          clipPath: 'inset(40% 0 30% 0)',
          filter: `hue-rotate(${-hueRotate}deg)`,
        }}
        aria-hidden
      >
        {text}
      </span>
      
      {/* Glitch layer 3 - Green offset */}
      <span 
        className="absolute inset-0 z-0 pointer-events-none select-none"
        style={{
          color: '#22c55e',
          left: `${glitchOffset * 0.5}px`,
          opacity: glitchOpacity * 0.5,
          clipPath: 'inset(70% 0 10% 0)',
        }}
        aria-hidden
      >
        {text}
      </span>
    </span>
  );
}

// Terminal typing animation with command execution feel
function TypewriterCommand({ 
  prompt, 
  command, 
  onComplete,
  speed = 25 
}: { 
  prompt: string; 
  command: string; 
  onComplete: () => void;
  speed?: number;
}) {
  const [displayedCommand, setDisplayedCommand] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index <= command.length) {
        setDisplayedCommand(command.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
        setShowCursor(false);
        setTimeout(onComplete, 300);
      }
    }, speed);

    return () => clearInterval(typeInterval);
  }, [command, onComplete, speed]);

  return (
    <div className="flex flex-wrap items-start">
      <span className="text-cyan-400/80 font-semibold flex-shrink-0">{prompt}</span>
      <span className="text-neutral-300 ml-1 break-all">{displayedCommand}</span>
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-cyan-400 ml-0.5 align-middle flex-shrink-0 mt-0.5"
        />
      )}
    </div>
  );
}

// Enhanced section header with TUX aesthetics
function SectionHeader({ 
  title, 
  icon: Icon,
  color = "cyan" 
}: { 
  title: string; 
  icon?: React.ComponentType<{ className?: string }>;
  color?: "cyan" | "emerald";
}) {
  const colorClasses = {
    cyan: "text-cyan-400 border-cyan-400/30",
    emerald: "text-emerald-400 border-emerald-400/30",
  };

  return (
    <div className={cn(
      "flex items-center gap-2 mt-3 sm:mt-4 mb-1.5 sm:mb-2 text-[10px] font-medium border-l-2 pl-2 py-0.5",
      colorClasses[color]
    )}>
      {Icon && <Icon className="w-3 h-3 flex-shrink-0" />}
      <span className="uppercase tracking-wider whitespace-nowrap">{title}</span>
      <span className="flex-1 border-t border-dashed border-current opacity-30 min-w-[20px]" />
    </div>
  );
}

// Status indicator component
function StatusLine({ 
  label, 
  value, 
  status = "neutral",
  animate = false 
}: { 
  label: string; 
  value: string; 
  status?: "success" | "warning" | "info" | "neutral";
  animate?: boolean;
}) {
  const statusColors = {
    success: "text-emerald-400",
    warning: "text-cyan-300",
    info: "text-cyan-400",
    neutral: "text-neutral-400",
  };

  const statusBg = {
    success: "bg-emerald-400",
    warning: "bg-cyan-300",
    info: "bg-cyan-400",
    neutral: "bg-neutral-400",
  };

  return (
    <div className={cn(
      "flex items-start gap-2 sm:gap-3 text-xs py-0.5",
      "min-w-0"
    )}>
      <span className={cn(
        "w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1",
        statusBg[status], 
        animate && "animate-pulse"
      )} />
      <span className="text-neutral-500 w-16 sm:w-20 flex-shrink-0">{label}</span>
      <span className={cn(
        "font-medium break-words leading-tight min-w-0 flex-1",
        statusColors[status]
      )}>
        {value}
      </span>
    </div>
  );
}

// Progress bar with cyberpunk styling
function CyberProgress({ 
  label, 
  progress, 
  color = "cyan",
  delay = 0
}: { 
  label: string; 
  progress: number; 
  color?: "cyan" | "emerald";
  delay?: number;
}) {
  const [displayProgress, setDisplayProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 800;
      const steps = 40;
      const increment = progress / steps;
      let current = 0;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= progress) {
          setDisplayProgress(progress);
          clearInterval(interval);
        } else {
          setDisplayProgress(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [progress, delay]);

  const filled = "█".repeat(Math.floor(displayProgress / 10));
  const empty = "░".repeat(10 - Math.floor(displayProgress / 10));
  
  const colorClasses = {
    cyan: "text-cyan-400",
    emerald: "text-emerald-400",
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs py-0.5 sm:py-1 w-full min-w-0">
      <span className="text-neutral-400 whitespace-nowrap overflow-hidden text-ellipsis max-w-[45%] sm:max-w-none">{label}</span>
      <span className="flex-1 min-w-0" />
      <span className={cn("font-mono tracking-tight flex-shrink-0", colorClasses[color])}>
        {filled}{empty}
      </span>
      <span className={cn("text-[10px] sm:text-xs w-7 sm:w-8 text-right flex-shrink-0", colorClasses[color])}>
        {displayProgress}%
      </span>
    </div>
  );
}

// Metric with animated counting
function AnimatedMetric({ 
  label, 
  value, 
  suffix = "",
  delay = 0 
}: { 
  label: string; 
  value: number | string; 
  suffix?: string;
  delay?: number;
}) {
  const [displayValue, setDisplayValue] = useState("0");
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
      if (typeof value === "number") {
        let current = 0;
        const increment = value / 20;
        const interval = setInterval(() => {
          current += increment;
          if (current >= value) {
            setDisplayValue(value.toString());
            clearInterval(interval);
          } else {
            setDisplayValue(Math.floor(current).toString());
          }
        }, 30);
        return () => clearInterval(interval);
      } else {
        setDisplayValue(value);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className="flex items-center justify-between py-0.5 sm:py-1 min-w-0">
      <span className="text-neutral-500 text-xs sm:text-sm truncate mr-2">{label}</span>
      <motion.span 
        initial={{ opacity: 0, x: -10 }}
        animate={isRevealed ? { opacity: 1, x: 0 } : {}}
        className="text-emerald-400 font-mono font-bold text-xs sm:text-sm flex-shrink-0"
      >
        {displayValue}{suffix}
      </motion.span>
    </div>
  );
}

const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

// Comprehensive data about all sections
const portfolioData = {
  identity: {
    name: "Jitin Nair",
    role: "AI Product Owner | AI Systems Architect",
    specialty: "Autonomous & HITL Agents",
    experience: "10+ years",
    location: "Bangalore, India",
    status: "Available",
  },
  expertise: [
    { name: "Autonomous & HITL Agents", level: 95, icon: Cpu },
    { name: "AI-Native Applications", level: 90, icon: Zap },
    { name: "Intelligent Process Automation", level: 88, icon: Layers },
    { name: "Enterprise Integration", level: 85, icon: Globe },
    { name: "Quantitative Systems", level: 82, icon: Terminal },
  ],
  stats: {
    yearsExperience: 10,
    technologies: 38,
    industries: 5,
    aiModels: 6,
    automationHours: 1000,
    mentored: 2000,
    agents: 200,
    instances: 147,
  },
  featuredProjects: [
    { name: "Predator Scalping System", type: "Trading & Finance", status: "Production" },
    { name: "AI Agency Ops", type: "Multi-Agentic Framework & Ecosystem", status: "Active" },
    { name: "LocalMind", type: "Local RAG Intelligence", status: "Active" },
    { name: "Smartslate", type: "L&D Platform", status: "Work in Progress" },
    { name: "Project Commune", type: "Community Platform", status: "Beta" },
    { name: "RevOS", type: "Garage Management", status: "Production" },
  ],
  stack: {
    primary: ["Claude", "GPT", "Gemini", "LangGraph", "FastAPI", "PostgreSQL"],
    agentic: ["MCP", "LangChain", "AutoGen", "CrewAI", "n8n"],
    infrastructure: ["Docker", "Redis", "Supabase", "TimescaleDB"],
  },
  journey: [
    { year: "2025", role: "AI Systems Architect", org: "Glitchzero" },
    { year: "2022", role: "Instructional Designer | VBL: Lead", org: "Moody's" },
    { year: "2019", role: "Instructor Analyst", org: "Accenture" },
    { year: "2017", role: "Senior Executive", org: "247.ai" },
    { year: "2015", role: "B.Com Graduate", org: "Sindhi College" },
  ],
  availability: {
    fulltime: true,
    contract: true,
    advisory: true,
    response: "< 24h",
  },
};

interface TerminalProps {
  className?: string;
  username?: string;
  typingSpeed?: number;
  initialDelay?: number;
  hideHeader?: boolean;
  isMobile?: boolean;
}

// Validation functions
const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+[\d\s\-\(\)]{7,}$/;
  return phoneRegex.test(phone.trim());
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

const buttons = ["download", "projects"] as const;

export function Terminal({
  className,
  username = "jitin",
  typingSpeed = 20,
  initialDelay = 200,
  hideHeader = false,
  isMobile = false,
}: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inView = useInView(containerRef);
  const animationStarted = useRef(false);
  const isMounted = useRef(false);

  const hostname = "glitchzero";

  const [windowOpen, setWindowOpen] = useState(false);
  const [lines, setLines] = useState<React.ReactNode[]>([]);
  const [currentPhase, setCurrentPhase] = useState<"idle" | "typing" | "executing" | "complete">("idle");
  const [animationComplete, setAnimationComplete] = useState(false);

  // Download flow states
  const [downloadMode, setDownloadMode] = useState(false);
  const [downloadStep, setDownloadStep] = useState<"phone" | "email" | "format" | "countdown" | "complete">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedFormat, setSelectedFormat] = useState<"pdf" | "doc" | "md" | null>(null);
  const [countdownValue, setCountdownValue] = useState(5);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Keyboard navigation
  const [selectedButton, setSelectedButton] = useState(0);

  const getPrompt = useCallback(() => `${username}@${hostname}:~$ `, [username, hostname]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  useEffect(() => {
    if (!inView || animationStarted.current || !isMounted.current) return;
    animationStarted.current = true;
    const timer = setTimeout(() => {
      setWindowOpen(true);
      setTimeout(() => setCurrentPhase("typing"), 150);
    }, initialDelay);
    return () => clearTimeout(timer);
  }, [inView, initialDelay]);

  useEffect(() => {
    const fallback = setTimeout(() => {
      if (!animationStarted.current && isMounted.current) {
        animationStarted.current = true;
        setWindowOpen(true);
        setCurrentPhase("typing");
      }
    }, 2000);
    return () => clearTimeout(fallback);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [lines, currentPhase]);

  useEffect(() => {
    if (downloadMode && inputRef.current && isMobile) {
      inputRef.current.focus();
    }
  }, [downloadMode, downloadStep, isMobile]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!animationComplete || downloadMode) return;

      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault();
          setSelectedButton((prev) => (prev + 1) % buttons.length);
          break;
        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault();
          setSelectedButton((prev) => (prev - 1 + buttons.length) % buttons.length);
          break;
        case "Enter":
          e.preventDefault();
          if (selectedButton === 0) {
            startDownloadFlow();
          } else {
            window.location.href = "#projects";
          }
          break;
        case "Tab":
          e.preventDefault();
          setSelectedButton((prev) => (prev + 1) % buttons.length);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [animationComplete, downloadMode, selectedButton]);

  const handleCommandComplete = () => {
    setCurrentPhase("executing");
    runOutputSequence();
  };

  const startDownloadFlow = () => {
    setDownloadMode(true);
    setDownloadStep("phone");
    setPhoneNumber("");
    setEmail("");
    setErrorMsg("");
    setSelectedButton(0);
    
    setLines((prev) => [
      ...prev,
      <div key="dl-sep" className="border-t border-neutral-800 my-3" />,
      <div key="dl-header" className="flex items-center gap-2 text-emerald-400 text-xs font-medium">
        <Download className="w-3.5 h-3.5" />
        <span>RESUME ACQUISITION PROTOCOL</span>
      </div>,
      <div key="dl-init" className="text-neutral-500 text-xs">Initializing secure transfer...</div>,
    ]);
  };

  const handlePhoneSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setErrorMsg("");
    
    if (!phoneNumber.trim()) {
      setErrorMsg("Phone number required for verification");
      return;
    }
    
    if (!isValidPhone(phoneNumber)) {
      setErrorMsg("Include country code (e.g., +91 90088 98642)");
      return;
    }
    
    setLines((prev) => [
      ...prev,
      <StatusLine key="phone-conf" label="Phone" value={phoneNumber} status="success" />,
    ]);
    
    setTimeout(() => {
      setDownloadStep("email");
      setLines((prev) => [
        ...prev,
        <div key="email-prompt" className="text-neutral-400 text-xs mt-2">Enter email for delivery:</div>,
      ]);
    }, 400);
  };

  const handleEmailSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setErrorMsg("");
    
    if (!email.trim()) {
      setErrorMsg("Email address required");
      return;
    }
    
    if (!isValidEmail(email)) {
      setErrorMsg("Valid email required");
      return;
    }
    
    setLines((prev) => [
      ...prev,
      <StatusLine key="email-conf" label="Email" value={email} status="success" />,
    ]);
    
    setTimeout(() => {
      completeDownload();
    }, 400);
  };

  const completeDownload = async () => {
    setDownloadStep("format");
    
    setLines((prev) => [
      ...prev,
      <div key="processing" className="flex items-center gap-2 text-cyan-400 text-xs mt-2">
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          ⟳
        </motion.span>
        <span>Processing request...</span>
      </div>,
    ]);

    // Save lead to Supabase
    setLines((prev) => [
      ...prev,
      <StatusLine key="db-init" label="Database" value="Connecting to secure vault..." status="info" animate />,
    ]);

    try {
      const supabase = createClient();
      console.log('Attempting to save lead:', { email, phoneNumber });
      
      const { error } = await supabase
        .from('terminal_leads')
        .insert([
          { 
            email: email.trim(), 
            phone_number: phoneNumber.trim() 
          }
        ]);
      
      if (error) {
        console.error('Error saving lead:', error);
        setLines((prev) => [
          ...prev,
          <StatusLine key="db-err" label="Error" value={`Sync failed: ${error.message}`} status="warning" />,
        ]);
      } else {
        console.log('Lead saved successfully');
        setLines((prev) => [
          ...prev,
          <StatusLine key="db-success" label="Database" value="Lead synchronized successfully" status="success" />,
        ]);
      }
    } catch (err: any) {
      console.error('Supabase capture failed:', err);
      setLines((prev) => [
        ...prev,
        <StatusLine key="db-fail" label="System" value={`Internal error: ${err.message || 'Unknown'}`} status="warning" />,
      ]);
    }

    setTimeout(() => {
      setLines((prev) => {
        const filtered = prev.filter((l: any) => l?.key !== "processing");
        return [
          ...filtered,
          <div key="success" className="text-emerald-400 text-xs">✓ Identity verified</div>,
          <div key="format-prompt" className="text-neutral-300 text-xs mt-3">Select format:</div>,
        ];
      });
    }, 1500);
  };

  const handleFormatSelect = async (format: "pdf" | "doc" | "md") => {
    setSelectedFormat(format);
    const formatLabels = { pdf: "PDF", doc: "DOC", md: "Markdown" };
    const formatExtensions = { pdf: "pdf", doc: "docx", md: "md" };
    const extension = formatExtensions[format];
    
    setLines((prev) => [
      ...prev,
      <div key="format-select" className="text-emerald-400 text-xs">✓ {formatLabels[format]} selected</div>,
    ]);
    
    // Start countdown for visual effect
    setTimeout(() => {
      startCountdown();
    }, 400);

    // Trigger download IMMEDIATELY from the user click to avoid browser blocking
    try {
      const supabase = createClient();
      
      console.log(`[Terminal] Initiating download protocol for format: ${format}`);
      
      // List files in the bucket to find the actual filename
      const { data: files, error: listError } = await supabase
        .storage
        .from('resume')
        .list();
        
      if (listError) {
        console.error("[Terminal] Failed to list files in bucket:", listError);
        throw listError;
      }
      
      console.log("[Terminal] Storage response - Files found:", files);
      
      // Look for files starting with 'Jitin' or matching the standard pattern
      // Priority: Files containing 'Jitin' and ending with the extension
      let targetFile = files?.find(f => 
        f.name.toLowerCase().includes('jitin') && 
        f.name.toLowerCase().endsWith(extension.toLowerCase())
      );
      
      // Fallback: Just the extension
      if (!targetFile) {
        targetFile = files?.find(f => f.name.toLowerCase().endsWith(extension.toLowerCase()));
      }
      
      if (!targetFile) {
        const errorMsg = `No resume file found with extension .${extension}`;
        console.error(`[Terminal] ${errorMsg}`);
        setLines((prev) => [
          ...prev,
          <div key={`err-${extension}`} className="text-amber-400 text-[10px] mt-1">
            ⚠ RECOVERY FAILED: {extension.toUpperCase()} source not found in &apos;resume&apos; vault.
          </div>,
        ]);
        return;
      }

      console.log(`[Terminal] Targeted file: ${targetFile.name}. Executing secure pull...`);

      const { data, error: downloadError } = await supabase
        .storage
        .from('resume')
        .download(targetFile.name);
        
      if (downloadError) {
        console.warn("[Terminal] Blob download failed, attempting direct public URL fallback:", downloadError);
        // Fallback to direct public URL if download fails (e.g. CORS)
        const { data: { publicUrl } } = supabase.storage.from('resume').getPublicUrl(targetFile.name);
        const downloadUrl = `${publicUrl}${publicUrl.includes('?') ? '&' : '?'}download=`;
        
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = targetFile.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }

      if (data) {
        console.log("[Terminal] Secure pull complete. Payload size:", data.size, "bytes");
        const url = URL.createObjectURL(data);
        const link = document.createElement("a");
        link.href = url;
        link.download = targetFile.name;
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        setTimeout(() => {
          URL.revokeObjectURL(url);
          document.body.removeChild(link);
        }, 100);
      }
    } catch (error: any) {
      console.error("[Terminal] Critical system error during acquisition:", error);
      setLines((prev) => [
        ...prev,
        <div key="system-err" className="text-red-400 text-[10px] mt-1">
          ✗ SYSTEM CRITICAL: ${error.message || "Protocol Interrupted"}
        </div>,
      ]);
    }
  };

  const startCountdown = () => {
    setDownloadStep("countdown");
    setCountdownValue(5);
    
    let count = 5;
    const countdownInterval = setInterval(() => {
      count--;
      setCountdownValue(count);
      
      setLines((prev) => {
        const newLines = [...prev];
        const idx = newLines.findIndex((l: any) => l?.key === "countdown");
        const countdownLine = (
          <div key="countdown" className="text-cyan-400 text-xs mt-2 font-mono">
            Download in {count}s...
          </div>
        );
        if (idx >= 0) {
          newLines[idx] = countdownLine;
        } else {
          newLines.push(countdownLine);
        }
        return newLines;
      });
      
      if (count <= 0) {
        clearInterval(countdownInterval);
        setTimeout(() => {
          setDownloadStep("complete");
          setShowLearnMore(true);
          setLines((prev) => {
            const newLines = [...prev];
            const idx = newLines.findIndex((l: any) => l?.key === "countdown");
            if (idx >= 0) {
              newLines[idx] = <div key="download-started" className="text-emerald-400 text-xs mt-2">✓ Download complete</div>;
            }
            return newLines;
          });
        }, 500);
      }
    }, 1000);
  };

  const runOutputSequence = () => {
    let delay = 0;

    // ASCII Banner with pixel-grid rendering (crisp on all devices)
    setTimeout(() => {
      setLines((prev) => [
        ...prev,
        <PixelBanner key="pixel-banner" isMobile={isMobile} />,
        <div key="ver" className="text-neutral-600 text-[10px] mt-2">glitchzero-cli v3.0.1 x86_64-linux-gnu</div>,
      ]);
    }, delay);
    delay += 600;

    // Identity Section
    setTimeout(() => {
      setLines((prev) => [
        ...prev,
        <SectionHeader key="id-h" title="Identity" icon={TerminalIcon} color="cyan" />,
        <StatusLine key="name" label="Name" value={portfolioData.identity.name} status="info" />,
        <StatusLine key="role" label="Role" value={portfolioData.identity.role} status="success" animate />,
        <StatusLine key="specialty" label="Focus" value={portfolioData.identity.specialty} status="info" />,
        <StatusLine key="exp" label={isMobile ? "Exp" : "Experience"} value={portfolioData.identity.experience} status="neutral" />,
        <StatusLine key="loc" label="Location" value={portfolioData.identity.location} status="neutral" />,
      ]);
    }, delay);
    delay += 700;

    // Expertise Section with progress bars
    setTimeout(() => {
      setLines((prev) => [
        ...prev,
        <SectionHeader key="exp-h" title="Core Expertise" icon={Cpu} color="emerald" />,
      ]);
      
      portfolioData.expertise.forEach((skill, idx) => {
        setLines((prev) => [
          ...prev,
          <CyberProgress 
            key={`skill-${idx}`} 
            label={skill.name} 
            progress={skill.level} 
            color={idx % 2 === 0 ? "cyan" : "emerald"}
            delay={idx * 150}
          />,
        ]);
      });
    }, delay);
    delay += 800;

    // Stats Section - Unique Metrics
    setTimeout(() => {
      setLines((prev) => [
        ...prev,
        <SectionHeader key="stats-h" title="System Metrics" icon={Zap} color="cyan" />,
        <AnimatedMetric key="years" label={isMobile ? "Exp" : "Years Experience"} value={portfolioData.stats.yearsExperience} suffix="+" delay={0} />,
        <AnimatedMetric key="tech" label="Technologies" value={portfolioData.stats.technologies} delay={50} />,
        <AnimatedMetric key="industries" label="Industries Served" value={portfolioData.stats.industries} suffix="+" delay={100} />,
        <AnimatedMetric key="models" label="AI Models Integrated" value={portfolioData.stats.aiModels} suffix="+" delay={150} />,
        <AnimatedMetric key="hours" label="Automation Hours Saved" value={portfolioData.stats.automationHours} suffix="+" delay={200} />,
        <AnimatedMetric key="agents" label="Agents Deployed" value={portfolioData.stats.agents} suffix="+" delay={250} />,
        <AnimatedMetric key="instances" label="Active Instances" value={portfolioData.stats.instances} delay={300} />,
      ]);
    }, delay);
    delay += 1000;

    // Featured Projects
    setTimeout(() => {
      setLines((prev) => [
        ...prev,
        <SectionHeader key="proj-h" title="Featured Projects" icon={Layers} color="cyan" />,
      ]);
      
      portfolioData.featuredProjects.slice(0, 4).forEach((proj, idx) => {
        setTimeout(() => {
          setLines((prev) => [
            ...prev,
            <div key={`proj-${idx}`} className="flex items-center justify-between text-xs py-1">
              <span className="text-neutral-300">{proj.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-neutral-500">{proj.type}</span>
                <span className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded",
                  proj.status === "Production" ? "bg-emerald-500/20 text-emerald-400" :
                  proj.status === "Active" ? "bg-cyan-500/20 text-cyan-400" :
                  "bg-cyan-300/20 text-cyan-300"
                )}>
                  {proj.status}
                </span>
              </div>
            </div>,
          ]);
        }, idx * 80);
      });
    }, delay);
    delay += 700;

    // Tech Stack
    setTimeout(() => {
      setLines((prev) => [
        ...prev,
        <SectionHeader key="stack-h" title="Tech Stack" icon={Globe} color="cyan" />,
        <div key="stack-primary" className="flex flex-wrap gap-1.5 mt-1">
          {portfolioData.stack.primary.map((tech, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded">
              {tech}
            </span>
          ))}
        </div>,
        <div key="stack-agentic" className="flex flex-wrap gap-1.5 mt-1.5">
          {portfolioData.stack.agentic.map((tech, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
              {tech}
            </span>
          ))}
        </div>,
      ]);
    }, delay);
    delay += 600;

    // Journey Timeline
    setTimeout(() => {
      setLines((prev) => [
        ...prev,
        <SectionHeader key="journey-h" title="Career Timeline" icon={TerminalIcon} color="emerald" />,
        ...portfolioData.journey.slice(0, 3).map((item, i) => (
          <div key={`journey-${i}`} className="flex items-center gap-3 text-xs py-0.5">
            <span className="text-neutral-600 w-10">{item.year}</span>
            <span className="text-neutral-400">{item.org}</span>
            <span className="flex-1 border-t border-dashed border-neutral-800" />
            <span className="text-emerald-400/80">{item.role}</span>
          </div>
        )),
      ]);
    }, delay);
    delay += 600;

    // Availability
    setTimeout(() => {
      setLines((prev) => [
        ...prev,
        <SectionHeader key="avail-h" title="Availability" icon={Check} color="emerald" />,
        <div key="avail-row" className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] sm:text-xs">
          {portfolioData.availability.fulltime && (
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400">Full-time</span>
            </div>
          )}
          {portfolioData.availability.contract && (
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-cyan-400">Contract</span>
            </div>
          )}
          {portfolioData.availability.advisory && (
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
              <span className="text-emerald-300">Advisory</span>
            </div>
          )}
        </div>,
        <div key="response-row" className="flex items-center gap-2 text-[10px] sm:text-xs mt-1">
          <span className="text-neutral-500">Response:</span>
          <span className="text-cyan-400">{portfolioData.availability.response}</span>
        </div>,
      ]);
    }, delay);
    delay += 500;

    // Complete
    setTimeout(() => {
      setLines((prev) => [
        ...prev,
        <div key="complete-sep" className="border-t border-neutral-800 my-3" />,
        <div key="ready" className="text-emerald-400 text-[10px] font-medium">✓ System ready for engagement</div>,
      ]);
      setAnimationComplete(true);
      setCurrentPhase("complete");
    }, delay);
  };

  return (
    <div ref={containerRef} className={cn("w-full h-full font-mono text-sm flex flex-col", className)}>
      <style jsx global>{`
        @keyframes blink {
          0%, 50% { border-color: transparent; }
          51%, 100% { border-color: currentColor; }
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
      `}</style>
      <motion.div
        className="overflow-hidden rounded-xl border border-neutral-800 bg-[#0a0a0f] shadow-2xl shadow-cyan-500/5 flex flex-col h-full"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={windowOpen ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* macOS title bar with glitchzero branding */}
        {!hideHeader && (
          <div className="flex items-center justify-between bg-[#111116] px-4 py-2.5 border-b border-neutral-800/50">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-cyan-500/70 shadow-[0_0_8px_rgba(34,211,238,0.4)]" />
              <div className="h-3 w-3 rounded-full bg-neutral-600/60" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/70 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500">{username}@</span>
              <GlitchText text={hostname} className="text-xs font-medium" />
              <span className="text-xs text-neutral-500">— zsh</span>
            </div>
            <div className="w-16" />
          </div>
        )}

        {/* Terminal content */}
        <div
          ref={contentRef}
          className={`${isMobile ? 'h-[340px]' : 'flex-1'} overflow-y-auto p-4 space-y-0.5 custom-scrollbar bg-gradient-to-b from-[#0a0a0f] via-[#0c0c12] to-[#08080a]`}
        >
          <AnimatePresence>
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {line}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Command typing animation */}
          {currentPhase === "typing" && (
            <TypewriterCommand
              prompt={getPrompt()}
              command="execute portfolio.bin"
              onComplete={handleCommandComplete}
              speed={typingSpeed}
            />
          )}

          {/* Mobile Phone Input */}
          {downloadMode && downloadStep === "phone" && (
            <form onSubmit={handlePhoneSubmit} className="mt-6">
              <div className={cn(
                "flex items-center gap-2 p-2.5 rounded-lg border transition-all",
                isInputFocused ? "border-cyan-500/50 bg-cyan-500/5" : "border-neutral-700 bg-neutral-900/30"
              )}>
                <Phone className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="tel"
                  inputMode="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setErrorMsg("");
                  }}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder="+91 90088 98642"
                  className="bg-transparent text-neutral-200 outline-none flex-1 text-sm min-w-0"
                  autoFocus
                />
                <button
                  type="submit"
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors active:scale-95"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {errorMsg && (
                <div className="text-red-400 text-xs mt-1.5 ml-1">✗ {errorMsg}</div>
              )}
            </form>
          )}

          {/* Mobile Email Input */}
          {downloadMode && downloadStep === "email" && (
            <form onSubmit={handleEmailSubmit} className="mt-6">
              <div className={cn(
                "flex items-center gap-2 p-2.5 rounded-lg border transition-all",
                isInputFocused ? "border-cyan-500/50 bg-cyan-500/5" : "border-neutral-700 bg-neutral-900/30"
              )}>
                <Mail className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMsg("");
                  }}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder="you@example.com"
                  className="bg-transparent text-neutral-200 outline-none flex-1 text-sm min-w-0"
                  autoFocus
                />
                <button
                  type="submit"
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors active:scale-95"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {errorMsg && (
                <div className="text-red-400 text-xs mt-1.5 ml-1">✗ {errorMsg}</div>
              )}
            </form>
          )}

          {/* Format Selection */}
          {downloadMode && downloadStep === "format" && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 flex flex-wrap gap-2"
            >
              {(["pdf", "doc", "md"] as const).map((format) => (
                <button
                  key={format}
                  onClick={() => handleFormatSelect(format)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded hover:bg-cyan-500/20 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  {format.toUpperCase()}
                </button>
              ))}
            </motion.div>
          )}

          {/* Learn More Button */}
          {downloadMode && showLearnMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 pt-3 border-t border-neutral-800"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded hover:bg-emerald-500/20 transition-colors"
              >
                <span>Explore Projects</span>
                <ChevronDown className="w-4 h-4" />
              </a>
            </motion.div>
          )}

          {/* Action Buttons */}
          {!downloadMode && animationComplete && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-5 space-y-2"
            >
              <div className="text-neutral-600 text-[10px] uppercase tracking-wider mb-3">Available Actions</div>
              
              {/* Download Resume */}
              <motion.button
                onClick={startDownloadFlow}
                animate={selectedButton === 0 ? {
                  backgroundColor: ['rgba(34, 211, 238, 0.08)', 'rgba(34, 211, 238, 0.15)', 'rgba(34, 211, 238, 0.08)'],
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all",
                  selectedButton === 0 
                    ? "border-cyan-400/50 bg-cyan-500/10" 
                    : "border-neutral-700/50 hover:border-neutral-600 hover:bg-neutral-800/30"
                )}
              >
                <Download className={cn("w-5 h-5", selectedButton === 0 ? "text-cyan-400" : "text-neutral-500")} />
                <span className={cn(selectedButton === 0 ? "text-cyan-300 font-medium" : "text-neutral-400")}>
                  Download Resume
                </span>
                {selectedButton === 0 && (
                  <span className="ml-auto text-cyan-500/50 text-xs">[Enter]</span>
                )}
              </motion.button>

              {/* View Projects */}
              <a
                href="#projects"
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all",
                  selectedButton === 1 
                    ? "border-emerald-400/50 bg-emerald-500/10" 
                    : "border-neutral-700/50 hover:border-neutral-600 hover:bg-neutral-800/30"
                )}
              >
                <Layers className={cn("w-5 h-5", selectedButton === 1 ? "text-emerald-400" : "text-neutral-500")} />
                <span className={cn(selectedButton === 1 ? "text-emerald-300" : "text-neutral-400")}>
                  View Projects
                </span>
                <ChevronDown className="ml-auto w-4 h-4 text-neutral-600" />
              </a>

              <div className="text-neutral-700 text-[10px] pt-2">[↑↓] Navigate • [Enter] Select</div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between bg-[#111116] px-4 py-2 border-t border-neutral-800 text-[10px] text-neutral-500">
          <span className="flex items-center gap-2">
            <span className={cn("w-1.5 h-1.5 rounded-full", animationComplete ? "bg-emerald-500" : "bg-cyan-500 animate-pulse")} />
            {animationComplete ? "ready" : currentPhase === "typing" ? "typing..." : "executing..."}
          </span>
          <div className="flex items-center gap-3">
            <span>UTF-8</span>
            <span>zsh</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Terminal;
