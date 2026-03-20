"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Download, ChevronDown, ChevronRight, ArrowRight, Phone, Mail, FileText, Check } from "lucide-react";

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

// ASCII Art
const asciiBanner = [
  "     ██╗██╗████████╗██╗███╗   ██╗",
  "     ██║██║╚══██╔══╝██║████╗  ██║",
  "     ██║██║   ██║   ██║██╔██╗ ██║",
  "██   ██║██║   ██║   ██║██║╚██╗██║",
  "╚█████╔╝██║   ██║   ██║██║ ╚████║",
  " ╚════╝ ╚═╝   ╚═╝   ╚═╝╚═╝  ╚═══╝",
];

const PROGRESS_FULL = "█";
const PROGRESS_EMPTY = "░";
const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

const skillsData = [
  { name: "agentic-systems", label: "Agentic Systems" },
  { name: "ai-workflows", label: "AI Workflows" },
  { name: "content-dev", label: "Content Development" },
  { name: "app-dev", label: "App Development" },
  { name: "web-dev", label: "Web Development" },
];

interface TerminalProps {
  className?: string;
  username?: string;
  hostname?: string;
  typingSpeed?: number;
  initialDelay?: number;
  hideHeader?: boolean;
  isMobile?: boolean;
}

// Validation functions
const isValidPhone = (phone: string): boolean => {
  // Must start with + and have at least 8 digits
  const phoneRegex = /^\+[\d\s\-\(\)]{7,}$/;
  return phoneRegex.test(phone.trim());
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export function Terminal({
  className,
  username = "jitin",
  hostname = "portfolio",
  typingSpeed = 30,
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

  const [windowOpen, setWindowOpen] = useState(false);
  const [lines, setLines] = useState<React.ReactNode[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
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
  const buttons = ["download", "projects"] as const;

  const getPrompt = useCallback(() => `${username}@${hostname}:~$ `, [username, hostname]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  useEffect(() => {
    if (!inView || animationStarted.current || !isMounted.current) return;
    animationStarted.current = true;
    const timer = setTimeout(() => {
      setWindowOpen(true);
      setTimeout(() => startAnimation(), 150);
    }, initialDelay);
    return () => clearTimeout(timer);
  }, [inView, initialDelay]);

  useEffect(() => {
    const fallback = setTimeout(() => {
      if (!animationStarted.current && isMounted.current) {
        animationStarted.current = true;
        setWindowOpen(true);
        startAnimation();
      }
    }, 2000);
    return () => clearTimeout(fallback);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [lines, currentInput]);

  useEffect(() => {
    if (downloadMode && inputRef.current && isMobile) {
      // Focus input for mobile when entering download mode
      inputRef.current.focus();
    }
  }, [downloadMode, downloadStep, isMobile]);

  // Keyboard navigation for buttons
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

  const typeText = useCallback((text: string, callback: () => void) => {
    let idx = 0;
    const typeNext = () => {
      if (idx < text.length) {
        setCurrentInput(text.slice(0, idx + 1));
        idx++;
        setTimeout(typeNext, typingSpeed);
      } else {
        callback();
      }
    };
    typeNext();
  }, [typingSpeed]);

  const startAnimation = () => {
    typeText("./jitin.exe", () => {
      setLines([
        <div key="cmd" className="text-sky-500 font-semibold">
          {getPrompt()}
          <span className="text-neutral-300">./jitin.exe</span>
        </div>
      ]);
      setCurrentInput("");
      setTimeout(() => runOutputSequence(), 200);
    });
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
      <div key="dl-empty" className="h-1" />,
      <div key="dl-header" className="text-emerald-400 text-xs">┌─ RESUME DOWNLOAD ─┐</div>,
      <div key="dl-init" className="text-neutral-400 text-sm">initiating download sequence...</div>,
      <div key="dl-prompt-phone" className="text-neutral-300 text-sm mt-1">Please enter your phone number:</div>,
    ]);
  };

  const handlePhoneSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setErrorMsg("");
    
    if (!phoneNumber.trim()) {
      setErrorMsg("Phone number is required");
      return;
    }
    
    if (!isValidPhone(phoneNumber)) {
      setErrorMsg("Please include country code (e.g., +91 90011 32425)");
      return;
    }
    
    setLines((prev) => [
      ...prev,
      <div key="phone-label" className="text-neutral-400 text-sm mt-1">
        ph number: <span className="text-neutral-200">{phoneNumber}</span>
      </div>,
      <div key="phone-check" className="text-emerald-400 text-sm">✓ phone number gathered</div>,
      <div key="email-prompt" className="text-neutral-300 text-sm mt-2">Please enter your e-mail ID:</div>,
    ]);
    
    setTimeout(() => {
      setDownloadStep("email");
      setErrorMsg("");
    }, 200);
  };

  const handleEmailSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setErrorMsg("");
    
    if (!email.trim()) {
      setErrorMsg("Email address is required");
      return;
    }
    
    if (!isValidEmail(email)) {
      setErrorMsg("Please enter a valid email address");
      return;
    }
    
    setLines((prev) => [
      ...prev,
      <div key="email-label" className="text-neutral-400 text-sm mt-1">
        email: <span className="text-neutral-200">{email}</span>
      </div>,
      <div key="email-check" className="text-emerald-400 text-sm">✓ e-mail ID gathered</div>,
    ]);
    
    setTimeout(() => {
      completeDownload();
    }, 200);
  };

  const completeDownload = () => {
    setDownloadStep("format");
    
    setLines((prev) => [
      ...prev,
      <div key="processing" className="text-cyan-400 text-sm mt-2">⠋ Processing request...</div>,
    ]);
    
    let frame = 0;
    const spinnerInterval = setInterval(() => {
      const spinner = SPINNER_FRAMES[frame % SPINNER_FRAMES.length];
      setLines((prev) => {
        const newLines = [...prev];
        const idx = newLines.findIndex((l: any) => l?.key === "processing");
        if (idx >= 0) {
          newLines[idx] = <div key="processing" className="text-cyan-400 text-sm mt-2">{spinner} Processing request...</div>;
        }
        return newLines;
      });
      frame++;
    }, 80);

    setTimeout(() => {
      clearInterval(spinnerInterval);
      setLines((prev) => {
        const filtered = prev.filter((l: any) => l?.key !== "processing");
        return [
          ...filtered,
          <div key="success" className="text-emerald-300 text-sm mt-2">✓ Details received successfully!</div>,
          <div key="format-prompt" className="text-neutral-300 text-sm mt-3">Select resume format:</div>,
        ];
      });
    }, 1500);
  };

  const handleFormatSelect = (format: "pdf" | "doc" | "md") => {
    setSelectedFormat(format);
    const formatLabels = { pdf: "PDF", doc: "DOC", md: "Markdown" };
    
    setLines((prev) => [
      ...prev,
      <div key="format-select" className="text-emerald-400 text-sm mt-2">✓ {formatLabels[format]} format selected</div>,
    ]);
    
    setTimeout(() => {
      startCountdown();
    }, 400);
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
          <div key="countdown" className="text-cyan-400 text-sm mt-2">
            Your download will begin in {count}...
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
          finishDownloadFlow();
        }, 500);
      }
    }, 1000);
  };

  const finishDownloadFlow = () => {
    setDownloadStep("complete");
    setShowLearnMore(true);
    
    // Trigger file download
    if (selectedFormat) {
      const formatExtensions = { pdf: "pdf", doc: "doc", md: "md" };
      const extension = formatExtensions[selectedFormat];
      const link = document.createElement("a");
      link.href = `/resume.${extension}`;
      link.download = `Jitin_Nair_Resume.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    setLines((prev) => {
      const newLines = [...prev];
      const idx = newLines.findIndex((l: any) => l?.key === "countdown");
      if (idx >= 0) {
        newLines[idx] = <div key="download-started" className="text-emerald-300 text-sm mt-2">✓ Download started!</div>;
      }
      return newLines;
    });
  };

  const runOutputSequence = () => {
    let delay = 0;

    setTimeout(() => {
      setLines((prev) => [
        ...prev,
        <pre key="ascii" className="text-cyan-500/80 text-[9px] leading-[1.1] tracking-wide mt-1">
          {asciiBanner.join("\n")}
        </pre>,
        <div key="ver" className="text-neutral-500 text-xs mt-1">portfolio-cli v2.0.26 x86_64-linux</div>,
      ]);
    }, delay);
    delay += 600;

    setTimeout(() => {
      setLines((prev) => [
        ...prev,
        <SectionHeader key="id-h" title="IDENTITY" />,
        <InfoRow key="name" label="Name" value="Jitin Nair" />,
        <InfoRow key="role" label="Role" value="AI Enablement Specialist | Instructional Designer" highlight />,
      ]);
    }, delay);
    delay += 700;

    setTimeout(() => {
      setLines((prev) => [
        ...prev,
        <SectionHeader key="mission-h" title="MISSION" />,
        <div key="m1" className="text-emerald-300 text-sm">Bridging AI innovation with human adoption through training systems and enablement strategies.</div>,
      ]);
    }, delay);
    delay += 800;

    setTimeout(() => {
      setLines((prev) => [...prev, <SectionHeader key="skill-h" title="SKILLSET" />]);
    }, delay);
    delay += 300;

    skillsData.forEach((skill, skillIdx) => {
      const skillKey = `skill-${skillIdx}`;
      for (let i = 0; i <= 10; i++) {
        setTimeout(() => {
          const filled = PROGRESS_FULL.repeat(i);
          const empty = PROGRESS_EMPTY.repeat(10 - i);
          const isComplete = i === 10;
          
          setLines((prev) => {
            const newLines = [...prev];
            const existingIdx = newLines.findIndex((l: any) => l?.key === skillKey);
            const progressLine = (
              <div key={skillKey} className="flex items-center gap-2 text-xs">
                <span className={isComplete ? "text-emerald-400" : "text-cyan-400"}>
                  {filled}{empty}
                </span>
                <span className={isComplete ? "text-emerald-300" : "text-neutral-500"}>
                  {skill.label} {isComplete && "✓"}
                </span>
              </div>
            );
            
            if (existingIdx >= 0) newLines[existingIdx] = progressLine;
            else newLines.push(progressLine);
            return newLines;
          });
        }, delay + i * 50);
      }
      delay += 600;
    });

    delay += 300;

    setTimeout(() => {
      setLines((prev) => [...prev, <SectionHeader key="stats-h" title="PORTFOLIO" />]);
    }, delay);
    delay += 300;

    const stats = [
      { key: "stat1", label: "Agents Built", value: "200+" },
      { key: "stat2", label: "Projects", value: "10+" },
      { key: "stat3", label: "Availability", value: "100%" },
    ];

    stats.forEach((stat, idx) => {
      animateStat(delay + idx * 600, stat.key, stat.label, stat.value);
    });
    delay += stats.length * 600 + 300;

    setTimeout(() => {
      setAnimationComplete(true);
    }, delay);
  };

  const animateStat = (startDelay: number, key: string, label: string, value: string) => {
    const frames = SPINNER_FRAMES;
    const maxFrames = frames.length * 2;
    
    for (let i = 0; i <= maxFrames; i++) {
      setTimeout(() => {
        if (i < maxFrames) {
          const spinner = frames[i % frames.length];
          setLines((prev) => updateLine(prev, key, 
            <div key={key} className="flex items-center gap-3 text-xs">
              <span className="text-cyan-400">{spinner}</span>
              <span className="text-neutral-500">{label}</span>
              <span className="text-neutral-600">...</span>
            </div>
          ));
        } else {
          setLines((prev) => updateLine(prev, key,
            <div key={key} className="flex items-center gap-3 text-xs">
              <span className="text-emerald-400">✓</span>
              <span className="text-neutral-500">{label}</span>
              <span className="text-emerald-300 font-medium">{value}</span>
            </div>
          ));
        }
      }, startDelay + i * 60);
    }
  };

  const updateLine = (lines: React.ReactNode[], key: string, newLine: React.ReactNode) => {
    const newLines = [...lines];
    const idx = newLines.findIndex((l: any) => l?.key === key);
    if (idx >= 0) newLines[idx] = newLine;
    else newLines.push(newLine);
    return newLines;
  };

  return (
    <div ref={containerRef} className={cn("w-full font-mono text-sm", className)}>
      <motion.div
        className="overflow-hidden rounded-xl border border-neutral-800 bg-[#0d0d12] shadow-2xl"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={windowOpen ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* macOS title bar */}
        {!hideHeader && (
          <div className="flex items-center justify-between bg-[#15151a] px-4 py-2.5 border-b border-neutral-800/50">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-cyan-500/70 shadow-[0_0_6px_rgba(34,211,238,0.3)]" />
              <div className="h-3 w-3 rounded-full bg-neutral-500/60" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/70 shadow-[0_0_6px_rgba(16,185,129,0.3)]" />
            </div>
            <span className="text-xs text-neutral-500 font-medium">{username}@{hostname} — zsh</span>
            <div className="w-16" />
          </div>
        )}

        {/* Terminal content */}
        <div
          ref={contentRef}
          className="h-[420px] overflow-y-auto p-4 space-y-1 custom-scrollbar bg-gradient-to-b from-[#0d0d12] to-[#0a0a0f]"
        >
          <AnimatePresence>
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
              >
                {line}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Current typing */}
          {currentInput && (
            <div className="text-sky-500 font-semibold">
              {getPrompt()}
              <span className="text-neutral-300">{currentInput}</span>
              <motion.span
                animate={{ opacity: cursorVisible ? 1 : 0 }}
                className="ml-0.5 inline-block h-4 w-2 bg-cyan-400 align-middle"
              />
            </div>
          )}

          {/* Mobile-Optimized Phone Input */}
          {downloadMode && downloadStep === "phone" && (
            <form onSubmit={handlePhoneSubmit} className="mt-2">
              <div className={cn(
                "flex items-center gap-2 p-2 rounded-lg border transition-all",
                isInputFocused ? "border-cyan-500/50 bg-cyan-500/5" : "border-neutral-700 bg-neutral-900/50"
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
                  placeholder="+91 90011 32425"
                  className="bg-transparent text-neutral-200 outline-none flex-1 text-sm min-w-0"
                  autoFocus
                />
                <button
                  type="submit"
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors active:scale-95"
                  aria-label="Submit phone number"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {errorMsg && (
                <div className="text-red-400 text-xs mt-1.5 ml-1">✗ {errorMsg}</div>
              )}
            </form>
          )}

          {/* Mobile-Optimized Email Input */}
          {downloadMode && downloadStep === "email" && (
            <form onSubmit={handleEmailSubmit} className="mt-2">
              <div className={cn(
                "flex items-center gap-2 p-2 rounded-lg border transition-all",
                isInputFocused ? "border-cyan-500/50 bg-cyan-500/5" : "border-neutral-700 bg-neutral-900/50"
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
                  placeholder="jitin.nair@example.com"
                  className="bg-transparent text-neutral-200 outline-none flex-1 text-sm min-w-0"
                  autoFocus
                />
                <button
                  type="submit"
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors active:scale-95"
                  aria-label="Submit email"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {errorMsg && (
                <div className="text-red-400 text-xs mt-1.5 ml-1">✗ {errorMsg}</div>
              )}
            </form>
          )}

          {/* Format Selection Buttons */}
          {downloadMode && downloadStep === "format" && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 space-y-1"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => handleFormatSelect("pdf")}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded hover:bg-cyan-500/20 transition-colors"
                >
                  <FileText className="w-3 h-3" />
                  PDF
                </button>
                <button
                  onClick={() => handleFormatSelect("doc")}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-neutral-800/50 border border-neutral-700 text-neutral-300 rounded hover:bg-neutral-700/50 transition-colors"
                >
                  <FileText className="w-3 h-3" />
                  DOC
                </button>
                <button
                  onClick={() => handleFormatSelect("md")}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-neutral-800/50 border border-neutral-700 text-neutral-300 rounded hover:bg-neutral-700/50 transition-colors"
                >
                  <FileText className="w-3 h-3" />
                  Markdown
                </button>
              </div>
            </motion.div>
          )}

          {/* Learn More Button - Fixed: down arrow on right */}
          {downloadMode && showLearnMore && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 pt-2 border-t border-neutral-800"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded hover:bg-cyan-500/20 transition-colors"
              >
                <span>Learn More</span>
                <ChevronDown className="w-4 h-4" />
              </a>
            </motion.div>
          )}

          {/* TUI Buttons - Fixed icons */}
          {!downloadMode && animationComplete && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-4 space-y-2"
            >
              <div className="text-neutral-500 text-xs mb-2">┌─ ACTIONS ─┐</div>
              
              {/* Download Resume - Fixed: Download icon instead of play */}
              <button
                onClick={startDownloadFlow}
                className={cn(
                  "w-full text-left block group transition-all",
                  selectedButton === 0 
                    ? "bg-cyan-500/10 border-l-2 border-cyan-400" 
                    : "border-l-2 border-transparent hover:border-neutral-600"
                )}
              >
                <div className="flex items-center gap-2 px-3 py-2">
                  <span className={selectedButton === 0 ? "text-cyan-400" : "text-neutral-500"}>
                    {selectedButton === 0 ? <Download className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                  </span>
                  <span className={selectedButton === 0 ? "text-cyan-300 font-medium" : "text-neutral-400"}>
                    Download Resume
                  </span>
                  <span className={selectedButton === 0 ? "text-cyan-500/50 text-xs ml-auto" : "text-neutral-600 text-xs ml-auto"}>
                    [Enter]
                  </span>
                </div>
              </button>

              {/* View Projects - Fixed: Down arrow instead of right arrow */}
              <a
                href="#projects"
                className={cn(
                  "w-full text-left block group transition-all",
                  selectedButton === 1 
                    ? "bg-neutral-800/30 border-l-2 border-neutral-500" 
                    : "border-l-2 border-transparent hover:border-neutral-700"
                )}
              >
                <div className="flex items-center gap-2 px-3 py-2">
                  <span className={selectedButton === 1 ? "text-neutral-400" : "text-neutral-500"}>
                    {selectedButton === 1 ? <ChevronDown className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                  <span className={selectedButton === 1 ? "text-neutral-300" : "text-neutral-400"}>
                    View Projects
                  </span>
                  <span className="text-neutral-600 text-xs ml-auto">
                    <ChevronDown className="w-3 h-3" />
                  </span>
                </div>
              </a>

              <div className="text-neutral-600 text-[10px] pt-1">└────────────┘</div>
              <div className="text-neutral-600 text-[10px]">[↑↓] Navigate • [Enter] Select • [Tab] Switch</div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between bg-[#1a1a22] px-4 py-1.5 border-t border-neutral-800 text-[10px] text-neutral-500">
          <span className="flex items-center gap-1.5">
            <span className={cn("w-1.5 h-1.5 rounded-full", animationComplete ? "bg-emerald-500" : "bg-amber-500 animate-pulse")} />
            {animationComplete ? "ready" : "loading"}
          </span>
          <span>zsh</span>
        </div>
      </motion.div>
    </div>
  );
}

// TUI Section Header
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="text-cyan-400 text-xs font-medium mt-3 mb-1">
      ┌─ {title} {"─".repeat(Math.max(0, 18 - title.length))}┐
    </div>
  );
}

// TUI Info Row
function InfoRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-baseline gap-3 text-sm">
      <span className="text-neutral-500">{label}:</span>
      <span className={highlight ? "text-emerald-300 font-medium" : "text-emerald-300"}>{value}</span>
    </div>
  );
}

export default Terminal;
