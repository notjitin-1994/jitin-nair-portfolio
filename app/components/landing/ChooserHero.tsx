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

// Strong ease-out curve (Emil): CSS defaults are too weak for intentional motion.
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// Headline is split into mask-reveal lines. The two emphasized words are
// colour-linked to the two track buttons below (violet = L&D, cyan = AI).
const HEADLINE: ReactNode[] = [
  <>I design how people <span className="text-violet-400">learn</span>,</>,
  <>
    and build the <span className="text-cyan-400">AI</span>
  </>,
  <>that does the work.</>,
];

// Real proof points from the CV. Count-up animates the numeric part.
const PROOF = [
  { to: 200, format: (n: number) => `${Math.round(n)}+`, label: "AI agents deployed" },
  { to: 50, format: (n: number) => `${Math.round(n)}K+`, label: "learners reached" },
  { to: 140, format: (n: number) => `$${Math.round(n)}K+`, label: "cost saved" },
];

const TRACKS = [
  {
    href: "/AI-Systems-Architecture-Portfolio",
    icon: Cpu,
    title: "AI Systems Architecture",
    what: "Multi-agent orchestration and production-grade autonomous systems.",
    accent: "text-cyan-400",
    ring: "hover:border-cyan-400/40",
    glow: "hover:shadow-[0_0_36px_-10px_rgba(34,211,238,0.55)]",
  },
  {
    href: "/LD-Systems-Portfolio",
    icon: GraduationCap,
    title: "Learning & Development Systems",
    what: "AI-native learning design, from discovery to delivery.",
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

/* ---------- Headline mask-reveal line ---------- */
function RevealLine({ children, delay }: { children: ReactNode; delay: number }) {
  const reduced = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span
        className="block"
        initial={reduced ? false : { y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.85, delay, ease: EASE_OUT }}
      >
        {children}
      </motion.span>
    </span>
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
function MagneticCard({ track, delay }: { track: (typeof TRACKS)[number]; delay: number }) {
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
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: EASE_OUT }}
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

/* ---------- Portrait with pointer tilt ---------- */
function Portrait() {
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
      initial={reduced ? false : { opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.05, ease: EASE_OUT }}
      className="flex justify-center md:justify-start"
    >
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        className="relative aspect-square w-full max-w-[300px] sm:max-w-[360px] md:max-w-[440px]"
        style={{ perspective: 900 }}
      >
        {/* Dual-tone glow */}
        <div className="absolute inset-0 scale-110 rounded-[28px] bg-gradient-to-tr from-violet-600/25 to-cyan-500/25 blur-3xl" />
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative h-full w-full overflow-hidden rounded-[28px] border border-white/10 shadow-2xl"
        >
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
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ---------- Hero ---------- */
export function ChooserHero() {
  const reduced = useReducedMotion();
  const [countRun, setCountRun] = useState(false);

  useEffect(() => {
    if (reduced) {
      setCountRun(true);
      return;
    }
    const t = setTimeout(() => setCountRun(true), 750);
    return () => clearTimeout(t);
  }, [reduced]);

  const fade = (delay: number) =>
    reduced
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: EASE_OUT },
        };

  return (
    <main className="relative flex min-h-[100dvh] items-center overflow-hidden bg-[#0a0a0f] px-5 text-[#f8fafc] selection:bg-cyan-500/30">
      <h1 className="sr-only">
        Jitin Nair · Learning &amp; Development Designer and AI Systems Architect
      </h1>

      <AuroraBackground />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 py-12 md:grid-cols-[minmax(0,440px)_1fr] md:gap-16">
        {/* Left — portrait */}
        <Portrait />

        {/* Right — content */}
        <div className="max-w-xl">
          <h2 className="font-serif text-[2rem] font-medium leading-[1.12] tracking-tight text-white sm:text-[2.6rem] lg:text-[3rem]">
            {HEADLINE.map((line, i) => (
              <RevealLine key={i} delay={0.15 + i * 0.12}>
                {line}
              </RevealLine>
            ))}
          </h2>

          <motion.p {...fade(0.6)} className="mt-6 text-base text-neutral-400 sm:text-lg">
            Learning &amp; Development Designer <span className="text-neutral-600">+</span> AI Systems Architect
          </motion.p>

          <motion.div
            {...fade(0.72)}
            className="mt-8 grid max-w-md grid-cols-3 gap-5 border-t border-white/10 pt-6"
          >
            {PROOF.map((stat) => (
              <StatTile key={stat.label} {...stat} run={countRun} />
            ))}
          </motion.div>

          <div className="mt-9 grid gap-3.5">
            {TRACKS.map((track, i) => (
              <MagneticCard key={track.href} track={track} delay={0.9 + i * 0.09} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
