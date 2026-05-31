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
import { ArrowRight, Cpu, GraduationCap } from "lucide-react";

// Smooth expo-out curve for reveals. Used for the mask-reveal and image wipe.
const EASE = [0.16, 1, 0.3, 1] as const;

// The story arc: a decade of L&D, then AI systems architecture. The two
// emphasized words are colour-linked to the two track buttons below
// (violet = Learning & Development, cyan = AI Systems Architecture).
const HEADLINE: ReactNode[] = [
  <>
    Ten years designing how humans <span className="text-violet-400">learn</span>.
  </>,
  <>
    Now architecting the <span className="text-cyan-400">AI</span> that empowers them.
  </>,
];

// Proof points, all from the CV and the AI architecture portfolio. Count-up
// animates the numeric part. One AI stat, one L&D stat, one ROI stat.
const PROOF = [
  { to: 200, format: (n: number) => `${Math.round(n)}+`, label: "AI agents in production" },
  { to: 50, format: (n: number) => `${Math.round(n)}K+`, label: "learners trained" },
  { to: 140, format: (n: number) => `$${Math.round(n)}K+`, label: "training costs saved" },
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
    accent: "text-violet-400",
    ring: "hover:border-violet-400/40",
    glow: "hover:shadow-[0_0_36px_-10px_rgba(139,92,246,0.55)]",
  },
];

/* ---------- Background: brand-neutral dual-tone aurora ---------- */
function AuroraBackground() {
  const reduced = useReducedMotion();
  const orb = "pointer-events-none absolute rounded-full blur-[120px]";
  return (
    <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className={`${orb} left-[-12%] top-[-15%] h-[60vh] w-[60vh] bg-violet-600/20`}
        animate={reduced ? undefined : { x: [0, 40, 0], y: [0, 28, 0], scale: [1, 1.08, 1] }}
        transition={reduced ? undefined : { duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`${orb} bottom-[-15%] right-[-12%] h-[55vh] w-[55vh] bg-cyan-500/20`}
        animate={reduced ? undefined : { x: [0, -36, 0], y: [0, -26, 0], scale: [1, 1.1, 1] }}
        transition={reduced ? undefined : { duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[#0a0a0f]/35" />
    </div>
  );
}

/* ---------- Count-up stat ---------- */
function StatTile({
  to,
  format,
  label,
  run,
}: {
  to: number;
  format: (n: number) => string;
  label: string;
  run: boolean;
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
    const duration = 1100;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setVal(to * easeOutCubic(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, run, to]);

  return (
    <div>
      <div className="font-serif text-2xl font-medium tracking-tight text-white sm:text-3xl">
        {format(val)}
      </div>
      <div className="mt-1 text-xs text-neutral-500">{label}</div>
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
    x.set((e.clientX - (r.left + r.width / 2)) * 0.15);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={reduced ? { opacity: 1, y: 0 } : ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      <motion.div ref={ref} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset}>
        <Link
          href={track.href}
          className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-[transform,border-color,box-shadow] duration-200 ease-out active:scale-[0.98] ${track.ring} ${track.glow}`}
        >
          {/* Sheen sweep on hover */}
          <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
            <span className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[320%]" />
          </span>

          <span className={`relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.05] ${track.accent}`}>
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <span className="relative min-w-0">
            <span className="block text-[15px] font-semibold text-white">{track.title}</span>
            <span className="block text-[13px] leading-snug text-neutral-400">{track.what}</span>
          </span>
          <ArrowRight
            className={`relative ml-auto h-5 w-5 flex-shrink-0 ${track.accent} transition-transform duration-200 ease-out group-hover:translate-x-1`}
            strokeWidth={2}
          />
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
    mvX.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    mvY.set((0.5 - (e.clientY - r.top) / r.height) * 10);
  };
  const reset = () => {
    mvX.set(0);
    mvY.set(0);
  };

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="flex h-[360px] w-full items-stretch justify-center sm:h-[440px] md:h-full md:justify-start"
    >
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        className="relative h-full w-full"
        style={{ perspective: 900 }}
      >
        {/* Dual-tone glow */}
        <div className="absolute inset-0 scale-110 rounded-[28px] bg-gradient-to-tr from-violet-600/25 to-cyan-500/25 blur-3xl" />

        {/* Clip-path wipe-up reveal + subtle scale settle */}
        <motion.div
          initial={reduced ? false : { clipPath: "inset(100% 0% 0% 0% round 28px)", scale: 1.12 }}
          animate={
            reduced || ready
              ? { clipPath: "inset(0% 0% 0% 0% round 28px)", scale: 1 }
              : { clipPath: "inset(100% 0% 0% 0% round 28px)", scale: 1.12 }
          }
          transition={{ duration: 1.15, ease: EASE }}
          className="relative h-full w-full overflow-hidden rounded-[28px] border border-white/10 shadow-2xl will-change-transform"
        >
          {/* Pointer tilt layer */}
          <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative h-full w-full">
            <Image
              src="/hero-photo.jpg"
              alt="Jitin Nair"
              fill
              className="object-cover"
              style={{ objectPosition: "center 20%" }}
              sizes="(max-width: 768px) 360px, 440px"
              priority
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/55 via-transparent to-transparent" />

            {/* One-time sheen sweep as the image reveals */}
            {!reduced && (
              <motion.div
                aria-hidden
                initial={{ x: "-160%" }}
                animate={ready ? { x: "160%" } : { x: "-160%" }}
                transition={{ duration: 1.2, delay: 0.45, ease: "easeInOut" }}
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-2/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent"
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

  useEffect(() => {
    if (!ready || reduced) return;
    const t = setTimeout(() => setCountRun(true), 1100);
    return () => clearTimeout(t);
  }, [ready, reduced]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : 0.14, delayChildren: reduced ? 0 : 0.08 } },
  };
  const lineVariant = reduced
    ? { hidden: { y: 0 }, show: { y: 0 } }
    : {
        hidden: { y: "112%" },
        show: { y: 0, transition: { duration: 0.95, ease: EASE } },
      };

  const fade = (delay: number) =>
    reduced
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 16 },
          animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <main className="relative flex min-h-[100dvh] items-center overflow-hidden bg-[#0a0a0f] px-5 text-[#f8fafc] selection:bg-cyan-500/30">
      <h1 className="sr-only">
        Jitin Nair · Learning &amp; Development Designer and AI Systems Architect
      </h1>

      <AuroraBackground />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-10 py-16 md:grid-cols-2 md:items-stretch md:gap-14">
        {/* Left - portrait */}
        <Portrait ready={ready} />

        {/* Right - content */}
        <div className="max-w-2xl">
          <motion.h2
            variants={container}
            initial="hidden"
            animate={ready ? "show" : "hidden"}
            className="font-serif text-[2rem] font-medium leading-[1.18] tracking-tight text-white sm:text-[2.6rem] lg:text-[3rem]"
          >
            {HEADLINE.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <motion.span variants={lineVariant} className="block transform-gpu will-change-transform">
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          <motion.p {...fade(0.62)} className="mt-6 text-base text-neutral-400 sm:text-lg">
            Learning &amp; Development Designer <span className="text-neutral-600">and</span> AI Systems Architect
          </motion.p>

          <motion.div
            {...fade(0.74)}
            className="mt-8 grid max-w-md grid-cols-3 gap-5 border-t border-white/10 pt-6"
          >
            {PROOF.map((stat) => (
              <StatTile key={stat.label} {...stat} run={countRun} />
            ))}
          </motion.div>

          <div className="mt-9 grid gap-3.5">
            {TRACKS.map((track, i) => (
              <MagneticCard key={track.href} track={track} delay={0.9 + i * 0.09} ready={ready} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
