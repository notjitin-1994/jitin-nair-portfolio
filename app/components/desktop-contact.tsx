"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Clock,
  Calendar,
  Download,
  Video,
  ExternalLink,
  Check,
  Copy,
  Send,
  Sparkles,
  Zap,
  Briefcase,
  Users,
  Globe,
  ChevronDown,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

// Particle Field Background Component
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const createParticles = () => {
      particles = [];
      const count = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 15000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((p, i) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = canvas.offsetWidth;
        if (p.x > canvas.offsetWidth) p.x = 0;
        if (p.y < 0) p.y = canvas.offsetHeight;
        if (p.y > canvas.offsetHeight) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${p.alpha})`;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.1 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

// 3D Tilt Card Component
function TiltCard({
  children,
  className = "",
  glowColor = "rgba(34, 211, 238, 0.3)",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      <div
        style={{
          transform: "translateZ(20px)",
        }}
      >
        {children}
      </div>
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mouseX.get() * 100 + 50}% ${mouseY.get() * 100 + 50}%, ${glowColor}, transparent 50%)`,
          opacity: useTransform(mouseX, [-0.5, 0, 0.5], [0.5, 0, 0.5]),
        }}
      />
    </motion.div>
  );
}

// Animated Text Reveal Component
function AnimatedText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const letters = text.split("");

  return (
    <motion.span className={`inline-flex flex-wrap ${className}`}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={letter === " " ? "mr-2" : ""}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Status Pulse Component
function StatusPulse() {
  return (
    <span className="relative flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
    </span>
  );
}

// Copy to Clipboard Hook
function useClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return { copied, copy };
}

// Contact Channel Card
function ContactChannelCard({
  icon: Icon,
  name,
  handle,
  stats,
  href,
  color = "cyan",
}: {
  icon: React.ElementType;
  name: string;
  handle: string;
  stats: { label: string; value: string }[];
  href: string;
  color?: "cyan" | "emerald" | "violet" | "amber";
}) {
  const colorClasses = {
    cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 hover:border-cyan-400/50",
    emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 hover:border-emerald-400/50",
    violet: "from-violet-500/20 to-violet-500/5 border-violet-500/30 hover:border-violet-400/50",
    amber: "from-amber-500/20 to-amber-500/5 border-amber-500/30 hover:border-amber-400/50",
  };

  const iconColors = {
    cyan: "text-cyan-400",
    emerald: "text-emerald-400",
    violet: "text-violet-400",
    amber: "text-amber-400",
  };

  return (
    <TiltCard>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, rotateX: -15 }}
        whileInView={{ opacity: 1, rotateX: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -8, scale: 1.02 }}
        className={`block p-6 rounded-2xl bg-gradient-to-br ${colorClasses[color]} border backdrop-blur-xl transition-all duration-500 group`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-6 h-6 ${iconColors[color]}`} />
          </div>
          <ExternalLink className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <h3 className="text-lg font-bold mb-1">{name}</h3>
        <p className={`text-sm ${iconColors[color]} mb-4`}>{handle}</p>

        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/5 rounded-lg p-2 border border-white/5">
              <p className="text-lg font-bold text-white">{stat.value}</p>
              <p className="text-xs text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.a>
    </TiltCard>
  );
}

// Animated Input Component
function AnimatedInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  delay = 0,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  delay?: number;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="relative"
    >
      <motion.label
        className="absolute left-4 text-sm font-medium transition-all duration-300 pointer-events-none"
        style={{
          top: isFocused || value ? "-10px" : "50%",
          transform: isFocused || value ? "translateY(0)" : "translateY(-50%)",
          fontSize: isFocused || value ? "12px" : "14px",
          color: isFocused ? "#22d3ee" : "#94a3b8",
          backgroundColor: isFocused || value ? "#0d0d12" : "transparent",
          padding: isFocused || value ? "0 8px" : "0",
        }}
      >
        {label}
      </motion.label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={!isFocused && !value ? placeholder : ""}
        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-4 text-white placeholder-transparent focus:outline-none focus:border-cyan-500/50 transition-all duration-300"
      />
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-cyan-500"
        initial={{ width: 0 }}
        animate={{ width: isFocused ? "100%" : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

// Project Type Selector
function ProjectTypeSelector({
  selected,
  onSelect,
}: {
  selected: string[];
  onSelect: (types: string[]) => void;
}) {
  const types = [
    { id: "fulltime", label: "Full-time", icon: Briefcase },
    { id: "contract", label: "Contract", icon: Zap },
    { id: "advisory", label: "Advisory", icon: Users },
    { id: "partnership", label: "Partnership", icon: Globe },
  ];

  const toggleType = (id: string) => {
    if (selected.includes(id)) {
      onSelect(selected.filter((t) => t !== id));
    } else {
      onSelect([...selected, id]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <label className="block text-sm font-medium text-slate-400 mb-3">Project Type</label>
      <div className="flex flex-wrap gap-2">
        {types.map((type, i) => {
          const isSelected = selected.includes(type.id);
          return (
            <motion.button
              key={type.id}
              type="button"
              onClick={() => toggleType(type.id)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                isSelected
                  ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                  : "bg-white/[0.03] border-white/[0.08] text-slate-400 hover:border-white/20"
              }`}
            >
              <type.icon className="w-4 h-4" />
              <span className="text-sm">{type.label}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

// Budget Range Slider
function BudgetSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const ranges = ["$5k", "$10k", "$25k", "$50k", "$100k+", "Enterprise"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <label className="block text-sm font-medium text-slate-400 mb-3">
        Budget Range: <span className="text-cyan-400 font-bold">{ranges[value]}</span>
      </label>
      <div className="relative">
        <input
          type="range"
          min={0}
          max={ranges.length - 1}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-500"
          style={{
            background: `linear-gradient(to right, #22d3ee 0%, #22d3ee ${(value / (ranges.length - 1)) * 100}%, rgba(255,255,255,0.1) ${(value / (ranges.length - 1)) * 100}%, rgba(255,255,255,0.1) 100%)`,
          }}
        />
        <div className="flex justify-between mt-2 text-xs text-slate-500">
          {ranges.map((r, i) => (
            <span key={i} className={i === value ? "text-cyan-400" : ""}>
              {r}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Animated Textarea
function AnimatedTextarea({
  value,
  onChange,
  maxLength = 500,
}: {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="relative"
    >
      <motion.label
        className="absolute left-4 transition-all duration-300 pointer-events-none"
        style={{
          top: isFocused || value ? "-10px" : "16px",
          fontSize: isFocused || value ? "12px" : "14px",
          color: isFocused ? "#22d3ee" : "#94a3b8",
          backgroundColor: isFocused || value ? "#0d0d12" : "transparent",
          padding: isFocused || value ? "0 8px" : "0",
        }}
      >
        Your Message
      </motion.label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rows={4}
        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all duration-300 resize-none"
      />
      <div className="flex justify-end mt-2">
        <span className={`text-xs ${value.length > maxLength * 0.9 ? "text-amber-400" : "text-slate-500"}`}>
          {value.length}/{maxLength}
        </span>
      </div>
    </motion.div>
  );
}

// Submit Button with Loading State
function SubmitButton({ onSubmit, isLoading }: { onSubmit: () => void; isLoading: boolean }) {
  return (
    <motion.button
      type="button"
      onClick={onSubmit}
      disabled={isLoading}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 font-bold text-lg overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: isLoading ? "100%" : ["-100%", "100%"] }}
        transition={{
          duration: 1.5,
          repeat: isLoading ? Infinity : 0,
          repeatDelay: 0.5,
        }}
      />

      <span className="relative flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full"
            />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </span>
    </motion.button>
  );
}

// Success Animation
function SuccessAnimation({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="absolute inset-0 flex items-center justify-center bg-[#0d0d12]/95 backdrop-blur-xl rounded-2xl z-20"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto mb-4"
        >
          <Check className="w-10 h-10 text-emerald-400" />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold mb-2"
        >
          Message Sent!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-slate-400"
        >
          I&apos;ll get back to you within 2 hours
        </motion.p>
      </div>
    </motion.div>
  );
}

// Main Desktop Contact Component
export function DesktopContact() {
  const { copied, copy } = useClipboard();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectTypes: [] as string[],
    budgetRange: 2,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 1500);
  };

  const handleSuccessComplete = () => {
    setShowSuccess(false);
    setFormData({
      name: "",
      email: "",
      company: "",
      projectTypes: [],
      budgetRange: 2,
      message: "",
    });
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <ParticleField />
        {/* Mesh Gradient Overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse at 20% 20%, rgba(34, 211, 238, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.05) 0%, transparent 70%)
            `,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400 font-medium">Open for Opportunities</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <AnimatedText
              text="Let's Build the Future"
              className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto"
          >
            Ready to architect autonomous systems?
          </motion.p>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Column 1: Availability & Status */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Status Card */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-4">
                <StatusPulse />
                <span className="text-emerald-400 font-medium">Available</span>
              </div>
              <p className="text-slate-300 mb-4">Open for new opportunities</p>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Clock className="w-4 h-4" />
                <span>&lt; 2 hour response time</span>
              </div>
            </div>

            {/* Location Card */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <span className="font-medium">Location</span>
              </div>
              <p className="text-slate-300">Bangalore, India</p>
              <p className="text-sm text-slate-500">IST (UTC+5:30)</p>
            </div>

            {/* Calendar Visual */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <span className="font-medium">Next Available Slots</span>
              </div>
              <div className="space-y-3">
                {[
                  { day: "Mon", date: "24", time: "10:00 AM" },
                  { day: "Tue", date: "25", time: "2:00 PM" },
                  { day: "Wed", date: "26", time: "11:00 AM" },
                ].map((slot, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-cyan-400">{slot.day}</span>
                    </div>
                    <div>
                      <p className="font-medium group-hover:text-cyan-400 transition-colors">{slot.date} Mar</p>
                      <p className="text-xs text-slate-500">{slot.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Column 2: Contact Channels */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <h2 className="text-lg font-medium text-slate-400 mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Connect With Me
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ContactChannelCard
                icon={Github}
                name="GitHub"
                handle="@notjitin-1994"
                stats={[
                  { label: "Repositories", value: "45+" },
                  { label: "Contributions", value: "1.2k" },
                ]}
                href="https://github.com/notjitin-1994"
                color="violet"
              />

              <ContactChannelCard
                icon={Linkedin}
                name="LinkedIn"
                handle="@jitin-nair"
                stats={[
                  { label: "Connections", value: "2.5k" },
                  { label: "Endorsements", value: "150+" },
                ]}
                href="https://www.linkedin.com/in/notjitin/"
                color="cyan"
              />

              <ContactChannelCard
                icon={Twitter}
                name="Twitter/X"
                handle="@jitin_nair"
                stats={[
                  { label: "Followers", value: "1.8k" },
                  { label: "Engagement", value: "4.2%" },
                ]}
                href="https://twitter.com/jitin_nair"
                color="emerald"
              />

              {/* Email Card with Copy */}
              <TiltCard>
                <motion.div
                  initial={{ opacity: 0, rotateX: -15 }}
                  whileInView={{ opacity: 1, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30 backdrop-blur-xl transition-all duration-500 group cursor-pointer"
                  onClick={() => copy("hello@jitin.dev")}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6 text-amber-400" />
                    </div>
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Check className="w-5 h-5 text-emerald-400" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Copy className="w-5 h-5 text-slate-500" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <h3 className="text-lg font-bold mb-1">Email</h3>
                  <p className="text-sm text-amber-400 mb-4">hello@jitin.dev</p>

                  <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <p className="text-sm text-slate-400">
                      {copied ? "Copied to clipboard!" : "Click to copy email address"}
                    </p>
                  </div>
                </motion.div>
              </TiltCard>
            </div>
          </motion.div>

          {/* Column 3: Quick Actions & Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-4"
          >
            <h2 className="text-lg font-medium text-slate-400 mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Quick Actions
            </h2>

            {/* Quick Action Buttons */}
            <div className="space-y-4 mb-8">
              <motion.a
                href="/resume.pdf"
                download
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Download className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Download Resume</p>
                  <p className="text-sm text-slate-500">PDF • 2.4 MB</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </motion.a>

              <motion.a
                href="https://cal.com/jitin-nair"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-emerald-500/30 hover:bg-white/[0.05] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Video className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Schedule a Call</p>
                  <p className="text-sm text-slate-500">30 min • Google Meet</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </motion.a>

              <motion.a
                href="https://github.com/notjitin-1994?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-violet-500/30 hover:bg-white/[0.05] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Github className="w-6 h-6 text-violet-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">View GitHub</p>
                  <p className="text-sm text-slate-500">45+ repositories</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
              </motion.a>
            </div>

            {/* Engagement Form */}
            <div className="relative">
              <h3 className="text-sm font-medium text-slate-400 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Or send a message directly
              </h3>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl relative overflow-hidden">
                <AnimatePresence>
                  {showSuccess && <SuccessAnimation onComplete={handleSuccessComplete} />}
                </AnimatePresence>

                <div className="space-y-5">
                  <AnimatedInput
                    label="Your Name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(v) => setFormData({ ...formData, name: v })}
                    delay={0}
                  />

                  <AnimatedInput
                    label="Email Address"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(v) => setFormData({ ...formData, email: v })}
                    delay={0.1}
                  />

                  <ProjectTypeSelector
                    selected={formData.projectTypes}
                    onSelect={(types) => setFormData({ ...formData, projectTypes: types })}
                  />

                  <BudgetSlider
                    value={formData.budgetRange}
                    onChange={(v) => setFormData({ ...formData, budgetRange: v })}
                  />

                  <AnimatedTextarea
                    value={formData.message}
                    onChange={(v) => setFormData({ ...formData, message: v })}
                  />

                  <SubmitButton onSubmit={handleSubmit} isLoading={isSubmitting} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center pt-16 border-t border-white/[0.08]"
        >
          <p className="text-slate-500 text-sm">
            Crafted with precision • Jitin Nair © 2025
          </p>
        </motion.div>
      </div>
    </section>
  );
}
