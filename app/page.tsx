"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Cpu, GraduationCap } from "lucide-react";
import { DesktopVortexBackground } from "./components/desktop-vortex-background";
import { AnimatedBackground } from "./components/animated-background";

// Strong ease-out curve (Emil): CSS defaults are too weak for intentional motion.
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const PROMPT = "jitin@portfolio:~$";

type Seg = { kind: "cmd" | "out" | "comment"; text: string };

const SCRIPT: Seg[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: "Jitin Nair · Learning & Development Designer + AI Systems Architect" },
  { kind: "cmd", text: "cat profile.txt" },
  { kind: "out", text: "10 years designing how people learn. Now I build the AI systems that do the work." },
  { kind: "out", text: "200+ AI agents deployed · 50K+ learners reached · $140K+ saved" },
  { kind: "comment", text: "pick a track to explore" },
];

const TRACKS = [
  {
    href: "/AI-Systems-Architecture-Portfolio",
    icon: Cpu,
    title: "AI Systems Architecture",
    what: "Multi-agent orchestration and production-grade autonomous systems.",
    iconColor: "text-cyan-400",
    hover: "hover:border-cyan-400/40 hover:bg-cyan-500/[0.06]",
    glow: "group-hover:shadow-[0_0_24px_-8px_rgba(34,211,238,0.5)]",
  },
  {
    href: "/LD-Systems-Portfolio",
    icon: GraduationCap,
    title: "Learning & Development Systems",
    what: "AI-native learning design, from discovery to delivery.",
    iconColor: "text-violet-400",
    hover: "hover:border-violet-400/40 hover:bg-violet-500/[0.06]",
    glow: "group-hover:shadow-[0_0_24px_-8px_rgba(139,92,246,0.5)]",
  },
];

function Cursor() {
  return (
    <span className="ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-[2px] bg-cyan-400 animate-pulse" />
  );
}

function ChooserTerminal() {
  const reduced = useReducedMotion();
  const [seg, setSeg] = useState(reduced ? SCRIPT.length : 0);
  const [char, setChar] = useState(0);
  const [done, setDone] = useState(!!reduced);
  const stopped = useRef(false);
  const rafRef = useRef(0);

  // Time-driven typewriter: progress tracks elapsed wall-clock, not the number
  // of timer ticks, so it always completes in a bounded duration even when the
  // main thread is busy (background canvas, low-end device, throttled frames).
  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    stopped.current = false;
    const MS_PER_CHAR = 12;
    const PAUSE_CHARS = 9; // virtual chars "spent" pausing after each line
    const START_DELAY = 280;
    const lengths = SCRIPT.map((s) => s.text.length);
    const total = lengths.reduce((a, b) => a + b + PAUSE_CHARS, 0);
    const startAt = performance.now();

    const tick = (now: number) => {
      if (stopped.current) return;
      let v = Math.floor((now - startAt - START_DELAY) / MS_PER_CHAR);
      if (v < 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (v >= total) {
        setSeg(SCRIPT.length);
        setChar(0);
        setDone(true);
        return;
      }
      let s = 0;
      while (s < lengths.length && v >= lengths[s] + PAUSE_CHARS) {
        v -= lengths[s] + PAUSE_CHARS;
        s += 1;
      }
      setSeg(s);
      setChar(Math.min(v, lengths[s] ?? 0));
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      stopped.current = true;
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  const skip = () => {
    if (done) return;
    stopped.current = true;
    cancelAnimationFrame(rafRef.current);
    setSeg(SCRIPT.length);
    setChar(0);
    setDone(true);
  };

  return (
    <div
      onClick={skip}
      className="flex h-full flex-col overflow-hidden rounded-xl border border-neutral-800 bg-[#0a0a0f] shadow-2xl shadow-cyan-500/5"
    >
      {/* Title bar — mirrors the site's terminal chrome */}
      <div className="flex items-center justify-between border-b border-neutral-800/50 bg-[#111116] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-cyan-500/70 shadow-[0_0_8px_rgba(34,211,238,0.4)]" />
          <span className="h-3 w-3 rounded-full bg-neutral-600/60" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/70 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <span>jitin@portfolio</span>
          <span className="text-neutral-700">·</span>
          <span>zsh</span>
        </div>
        <span className="w-16" />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-1.5 overflow-y-auto bg-gradient-to-b from-[#0a0a0f] via-[#0c0c12] to-[#08080a] p-4 font-mono text-[13px] leading-relaxed sm:text-sm">
        {SCRIPT.map((line, i) => {
          if (i > seg) return null;
          const full = i < seg;
          const text = full ? line.text : line.text.slice(0, char);
          const isActive = i === seg && !done;

          if (line.kind === "cmd") {
            return (
              <div key={i} className="flex flex-wrap items-baseline">
                <span className="mr-2 flex-shrink-0 font-semibold text-cyan-400/80">{PROMPT}</span>
                <span className="text-neutral-200">{text}</span>
                {isActive && <Cursor />}
              </div>
            );
          }
          if (line.kind === "comment") {
            return (
              <div key={i} className="pt-1 text-neutral-600">
                <span className="select-none text-neutral-700"># </span>
                {text}
                {isActive && <Cursor />}
              </div>
            );
          }
          return (
            <div key={i} className="flex items-baseline text-neutral-400">
              <span className="mr-2 flex-shrink-0 select-none text-cyan-500/50">›</span>
              <span>
                {text}
                {isActive && <Cursor />}
              </span>
            </div>
          );
        })}

        {/* Buttons revealed at the end of typing */}
        {done && (
          <div className="mt-4 grid gap-2.5">
            {TRACKS.map((track, i) => {
              const Icon = track.icon;
              return (
                <motion.div
                  key={track.href}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.07, ease: EASE_OUT }}
                >
                  <Link
                    href={track.href}
                    className={`group flex items-center gap-3 rounded-lg border border-neutral-800 bg-white/[0.02] px-3.5 py-3 transition-[transform,border-color,background-color,box-shadow] duration-150 ease-out active:scale-[0.98] ${track.hover} ${track.glow}`}
                  >
                    <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-white/[0.04] ${track.iconColor}`}>
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-sans text-sm font-semibold text-white">{track.title}</span>
                      <span className="block font-sans text-xs leading-snug text-neutral-400">{track.what}</span>
                    </span>
                    <ArrowRight
                      className={`ml-auto h-4 w-4 flex-shrink-0 ${track.iconColor} transition-transform duration-200 ease-out group-hover:translate-x-0.5`}
                      strokeWidth={2}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t border-neutral-800 bg-[#111116] px-4 py-2 font-mono text-[10px] text-neutral-500">
        <span>{done ? "2 tracks available" : "booting profile…"}</span>
        <span className="text-neutral-600">{done ? "ready" : "press to skip"}</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative flex min-h-[100dvh] items-center overflow-hidden bg-[#0a0a0f] px-4 text-[#f8fafc] selection:bg-cyan-500/30">
      <h1 className="sr-only">
        Jitin Nair · Learning &amp; Development Designer and AI Systems Architect
      </h1>

      {/* Backgrounds — same as the site hero */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <DesktopVortexBackground>
          <div className="absolute inset-0" />
        </DesktopVortexBackground>
      </div>
      <div className="absolute inset-0 z-0 md:hidden">
        <AnimatedBackground />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl py-8">
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-4">
          {/* Left — terminal typewriter */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
            className="order-2 h-[440px] sm:h-[460px] md:order-1 md:h-[480px]"
          >
            <ChooserTerminal />
          </motion.div>

          {/* Right — portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.1, ease: EASE_OUT }}
            className="order-1 flex justify-center md:order-2"
          >
            <div className="relative aspect-square w-full max-w-[320px] sm:max-w-[400px] md:h-[480px] md:max-w-[480px]">
              <div className="absolute inset-0 scale-110 rounded-xl bg-cyan-500/20 blur-3xl" />
              <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                <Image
                  src="/hero-photo.jpg"
                  alt="Jitin Nair"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 20%" }}
                  sizes="(max-width: 768px) 400px, 480px"
                  priority
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
