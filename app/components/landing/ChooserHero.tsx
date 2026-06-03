"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Cpu, GraduationCap, Sparkles, TrendingUp, Users, Target } from "lucide-react";

// Smooth expo-out curve for reveals. Used for the mask-reveal and image wipe.
const EASE = [0.16, 1, 0.3, 1] as const;

// The story arc: a decade of L&D, then AI systems architecture. The two
// emphasized words are colour-linked to the two track buttons below
// (emerald = Learning & Development, cyan = AI Systems Architecture).
const HEADLINE: ReactNode[] = [
  <>
    A decade of designing how humans <span className="text-emerald-400">learn</span>.
  </>,
  <>
    Now architecting the <span className="text-cyan-400">AI</span> that empowers them.
  </>,
];

// Proof points, all from the CV and the AI architecture portfolio. Count-up
// animates the numeric part. One AI stat, one L&D stat, one ROI stat.
const PROOF = [
  { to: 200, format: (n: number) => `${Math.round(n)}+`, label: "AI agents deployed", icon: Cpu },
  { to: 5, format: (n: number) => `${Math.round(n)}K+`, label: "Learners trained", icon: Users },
  { to: 140, format: (n: number) => `$${Math.round(n)}K+`, label: "Training costs saved", icon: TrendingUp },
];

const TRACKS = [
  {
    href: "/AI-Systems-Architecture-Portfolio",
    icon: Cpu,
    title: "AI Systems Architecture",
    what: "Multi-agent orchestration in production. 200+ agents on LangGraph, MCP, and RAG.",
    accent: "text-cyan-400",
    ring: "hover:border-cyan-400/40",
    glow: "hover:shadow-[0_0_36px_-10px_rgba(34,211,238,0.55)]",
  },
  {
    href: "/LD-Systems-Portfolio",
    icon: GraduationCap,
    title: "Learning & Development Systems",
    what: "Adult learning design, proven at scale. 90%+ completion, 70% faster delivery.",
    accent: "text-emerald-400",
    ring: "hover:border-emerald-400/40",
    glow: "hover:shadow-[0_0_36px_-10px_rgba(52,211,153,0.55)]",
  },
];

/* ---------- Background: Refined mesh-like aurora with noise ---------- */
function AuroraBackground() {
  const reduced = useReducedMotion();
  const orb = "pointer-events-none absolute rounded-full blur-[140px] mix-blend-screen";
  return (
    <div aria-hidden className="absolute inset-0 z-0 overflow-hidden bg-[#050508]">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <motion.div
        className={`${orb} left-[-15%] top-[-10%] h-[70vh] w-[70vh] bg-emerald-500/10`}
        animate={reduced ? undefined : { x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={reduced ? undefined : { duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`${orb} bottom-[-10%] right-[-15%] h-[65vh] w-[65vh] bg-cyan-500/10`}
        animate={reduced ? undefined : { x: [0, -50, 0], y: [0, -35, 0], scale: [1, 1.2, 1] }}
        transition={reduced ? undefined : { duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ---------- Count-up stat ---------- */
function StatTile({
  to,
  format,
  label,
  run,
  icon: Icon,
}: {
  to: number;
  format: (n: number) => string;
  label: string;
  run: boolean;
  icon?: any;
}) {
  const reduced = useReducedMotion();
  const [val, setVal] = useState(reduced ? to : 0);

  useEffect(() => {
    if (reduced || !run) {
      setVal(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1500; // Slightly slower for elegance
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setVal(to * easeOutQuart(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, run, to]);

  return (
    <div className="group/stat relative">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-3.5 w-3.5 text-neutral-500 transition-colors group-hover/stat:text-white" />}
        <div className="font-serif text-2xl font-medium tracking-tight text-white sm:text-3xl transition-transform group-hover/stat:scale-105 duration-300">
          {format(val)}
        </div>
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-widest text-neutral-500 transition-colors group-hover/stat:text-neutral-400">{label}</div>
    </div>
  );
}

/* ---------- Magnetic track card ---------- */
function MagneticCard({
  track,
  delay,
  ready,
}: {
  track: (typeof TRACKS)[number];
  delay: number;
  ready: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.3 });
  const Icon = track.icon;

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    // More subtle and physics-driven feel
    x.set((e.clientX - (r.left + r.width / 2)) * 0.12);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.22);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={reduced ? { opacity: 1, y: 0 } : ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      <motion.div ref={ref} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset}>
        <Link
          href={track.href}
          className={`group relative flex items-center gap-5 overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.02] px-6 py-5 transition-all duration-300 ease-out active:scale-[0.97] ${track.ring} ${track.glow} hover:bg-white/[0.04] hover:border-white/20`}
        >
          {/* Refined Liquid Sheen */}
          <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
            <span className="absolute inset-y-0 -left-full w-2/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[400%]" />
          </span>

          <span className={`relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/[0.04] transition-all duration-300 group-hover:scale-110 group-hover:bg-white/[0.08] ${track.accent}`}>
            <Icon className="h-5.5 w-5.5" strokeWidth={1.5} />
          </span>
          <span className="relative min-w-0">
            <span className="block text-[16px] font-semibold text-white tracking-tight">{track.title}</span>
            <span className="block mt-0.5 text-[13px] leading-relaxed text-neutral-400 group-hover:text-neutral-300 transition-colors">{track.what}</span>
          </span>
          <div className={`relative ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/5 bg-white/[0.03] transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10 ${track.accent}`}>
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
              strokeWidth={2.5}
            />
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* ---------- Portrait: clip-path reveal, settle, sheen, pointer tilt ---------- */
function Portrait({ ready }: { ready: boolean }) {
  const reduced = useReducedMotion();
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateY = useSpring(mvX, { stiffness: 120, damping: 14 });
  const rotateX = useSpring(mvY, { stiffness: 120, damping: 14 });
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    // Refined tilt sensitivity
    mvX.set(((e.clientX - r.left) / r.width - 0.5) * 8);
    mvY.set((0.5 - (e.clientY - r.top) / r.height) * 8);
  };
  const reset = () => {
    mvX.set(0);
    mvY.set(0);
  };

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.98 }}
      animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="flex h-[400px] w-full items-stretch justify-center sm:h-[480px] md:h-full md:justify-start"
    >
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        className="relative h-full w-full group/portrait"
        style={{ perspective: 1200 }}
      >
        {/* Refined Accent Glow */}
        <div className="absolute inset-0 -inset-x-4 -inset-y-4 scale-105 rounded-[40px] bg-gradient-to-tr from-emerald-500/15 to-cyan-500/15 blur-2xl transition-opacity duration-700 opacity-50 group-hover/portrait:opacity-100" />

        {/* Clip-path wipe-up reveal + subtle scale settle */}
        <motion.div
          initial={reduced ? false : { clipPath: "inset(100% 0% 0% 0% round 32px)", scale: 1.08 }}
          animate={
            reduced || ready
              ? { clipPath: "inset(0% 0% 0% 0% round 32px)", scale: 1 }
              : { clipPath: "inset(100% 0% 0% 0% round 32px)", scale: 1.08 }
          }
          transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
          className="relative h-full w-full overflow-hidden rounded-[32px] border border-white/10 shadow-3xl will-change-transform bg-neutral-900"
        >
          {/* Pointer tilt layer */}
          <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative h-full w-full transform-gpu">
            <Image
              src="/hero-photo.jpg"
              alt="Jitin Nair"
              fill
              className="object-cover transition-transform duration-700 group-hover/portrait:scale-105"
              style={{ objectPosition: "center 20%" }}
              sizes="(max-width: 768px) 400px, 500px"
              priority
              fetchPriority="high"
            />
            
            {/* Edge highlights */}
            <div className="absolute inset-0 rounded-[32px] border border-white/5 pointer-events-none" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent opacity-80" />

            {/* Premium Sheen Reveal */}
            {!reduced && (
              <motion.div
                aria-hidden
                initial={{ x: "-180%" }}
                animate={ready ? { x: "180%" } : { x: "-180%" }}
                transition={{ duration: 1.8, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-full -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
              />
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ---------- Hero ---------- */
export function ChooserHero() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [countRun, setCountRun] = useState(false);

  // Butter-smooth reveal: wait for the display font to load before animating,
  // so the serif never swaps mid-reveal (the cause of the previous jank).
  useEffect(() => {
    if (reduced) {
      setReady(true);
      return;
    }
    let active = true;
    const done = () => active && setReady(true);
    const fallback = setTimeout(done, 1200);
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(done).catch(done);
    } else {
      done();
    }
    return () => {
      active = false;
      clearTimeout(fallback);
    };
  }, [reduced]);

  // Sequenced reveal timeline (seconds), all gated on the same `ready` trigger:
  //   image reveals first (t=0), heading 1s later, the rest 1s after that.
  const HEADING_DELAY = 1.0;
  const REST_DELAY = 2.0;

  useEffect(() => {
    if (!ready || reduced) return;
    const t = setTimeout(() => setCountRun(true), REST_DELAY * 1000 + 150);
    return () => clearTimeout(t);
  }, [ready, reduced]);

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : 0.18,
        delayChildren: reduced ? 0 : HEADING_DELAY,
      },
    },
  };
  const lineVariant = reduced
    ? { hidden: { y: 0 }, show: { y: 0 } }
    : {
        hidden: { y: "112%" },
        show: { y: 0, transition: { duration: 1.1, ease: EASE } },
      };

  const fade = (delay: number) =>
    reduced
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 20 },
          animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
          transition: { duration: 1.0, delay, ease: [0.23, 1, 0.32, 1] },
        };

  return (
    <main className="relative flex min-h-[100dvh] items-center overflow-hidden bg-[#050508] px-6 text-[#f8fafc] selection:bg-cyan-500/30">
      <h1 className="sr-only">
        Jitin Nair · Learning &amp; Development Designer and AI Systems Architect
      </h1>

      <AuroraBackground />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.05] pointer-events-none bg-[dim-grid]" 
           style={{ backgroundImage: 'linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 py-20 md:grid-cols-2 md:items-stretch md:gap-20">
        {/* Left - portrait */}
        <div className="relative order-2 md:order-1">
          <Portrait ready={ready} />
        </div>

        {/* Right - content */}
        <div className="max-w-2xl flex flex-col justify-center order-1 md:order-2">
          <motion.div {...fade(HEADING_DELAY - 0.2)} className="mb-6 flex items-center gap-2">
            <div className="h-[1px] w-8 bg-white/20" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500">Based in Bangalore, India</span>
          </motion.div>

          <motion.h2
            variants={container}
            initial="hidden"
            animate={ready ? "show" : "hidden"}
            className="font-serif text-[2.2rem] font-medium leading-[1.1] tracking-tight text-white sm:text-[3rem] lg:text-[3.8rem]"
          >
            {HEADLINE.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-1">
                <motion.span variants={lineVariant} className="block transform-gpu will-change-transform">
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          <motion.p {...fade(REST_DELAY - 0.2)} className="mt-8 text-lg text-neutral-400 sm:text-xl leading-relaxed font-light">
            Architecting high-agency systems where <span className="text-white/80 font-medium">intelligence meets scale</span>.
          </motion.p>

          <motion.div
            {...fade(REST_DELAY)}
            className="mt-10 grid max-w-lg grid-cols-3 gap-8 border-t border-white/5 pt-8"
          >
            {PROOF.map((stat, i) => (
              <StatTile key={stat.label} {...stat} run={countRun} />
            ))}
          </motion.div>

          <div className="mt-12 grid gap-4">
            {TRACKS.map((track, i) => (
              <MagneticCard key={track.href} track={track} delay={REST_DELAY + 0.3 + i * 0.12} ready={ready} />
            ))}
          </div>

          <motion.div {...fade(REST_DELAY + 0.6)} className="mt-10 flex items-center gap-6">
             <Link href="/work" className="text-[13px] font-medium text-neutral-400 hover:text-white transition-colors flex items-center gap-2 group">
                Explore full journey 
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
             </Link>
             <div className="h-1 w-1 rounded-full bg-neutral-700" />
             <Link href="mailto:jitin@jitinnair.com" className="text-[13px] font-medium text-neutral-400 hover:text-white transition-colors flex items-center gap-2 group">
                Get in touch
                <Sparkles className="h-3.5 w-3.5 transition-colors group-hover:text-cyan-400" />
             </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
