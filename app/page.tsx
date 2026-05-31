"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Cpu, GraduationCap } from "lucide-react";

const choices = [
  {
    href: "/AI-Systems-Architecture-Portfolio",
    icon: Cpu,
    eyebrow: "Build",
    title: "AI Systems Architecture",
    description:
      "Multi-agent orchestration, agentic AI, and autonomous systems. 200+ agents deployed.",
    accent: "from-cyan-500/20 to-violet-500/10",
    hover: "hover:border-cyan-400/40 hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.4)]",
    iconColor: "text-cyan-400",
  },
  {
    href: "/LD-Systems-Portfolio",
    icon: GraduationCap,
    eyebrow: "Enable",
    title: "Learning & Development Systems",
    description:
      "Instructional design, L&D platforms, and capability-building systems that scale.",
    accent: "from-fuchsia-500/20 to-violet-500/10",
    hover: "hover:border-fuchsia-400/40 hover:shadow-[0_0_40px_-10px_rgba(217,70,239,0.4)]",
    iconColor: "text-fuchsia-400",
  },
];

export default function Home() {
  const reducedMotion = useReducedMotion();

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reducedMotion ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0.2 : 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#0a0a0f] text-[#f8fafc] selection:bg-cyan-500/30">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[600px] w-[600px] translate-x-1/2 rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-6 py-16">
        {/* Portrait */}
        <motion.div {...fade(0.05)} className="relative mb-8">
          <div className="absolute inset-0 scale-110 rounded-full bg-cyan-500/20 blur-2xl" />
          <div className="relative h-28 w-28 overflow-hidden rounded-full border border-white/10 shadow-2xl sm:h-32 sm:w-32">
            <Image
              src="/hero-photo.jpg"
              alt="Jitin Nair"
              fill
              className="object-cover"
              style={{ objectPosition: "center 20%" }}
              priority
              fetchPriority="high"
              sizes="128px"
            />
          </div>
        </motion.div>

        {/* Brief */}
        <motion.h1
          {...fade(0.15)}
          className="text-center font-serif text-3xl font-medium tracking-tight sm:text-4xl"
        >
          Jitin Nair
        </motion.h1>
        <motion.p
          {...fade(0.25)}
          className="mt-3 max-w-xl text-center text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          I architect AI systems and design the learning that lets teams run them.
          A decade across autonomous multi-agent platforms and learning &amp; development —
          choose the work you&apos;d like to explore.
        </motion.p>

        {/* Choice cards */}
        <div className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
          {choices.map((choice, i) => {
            const Icon = choice.icon;
            return (
              <motion.div key={choice.href} {...fade(0.4 + i * 0.12)}>
                <Link
                  href={choice.href}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 transition-all duration-300 hover:bg-white/[0.05] ${choice.hover}`}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${choice.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />
                  <div className="relative">
                    <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] ${choice.iconColor}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-5 font-mono text-xs uppercase tracking-widest text-slate-500">
                      {choice.eyebrow}
                    </p>
                    <h2 className="mt-1.5 text-xl font-semibold text-white">
                      {choice.title}
                    </h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                      {choice.description}
                    </p>
                    <span className={`mt-6 inline-flex items-center gap-1.5 text-sm font-medium ${choice.iconColor}`}>
                      Explore
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
