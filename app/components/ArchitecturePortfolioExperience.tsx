"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Footer } from "./Footer";
import LazySection from "./LazySection";
import { projectsData } from "../data/projects";

// Static imports for above-the-fold (Critical Path)
import { useIsMobile } from "./home/shared";
import { EditorialHero, type HeroStat } from "./landing/EditorialHero";

function ProjectsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-sm text-neutral-400 transition-colors hover:text-white"
      >
        Projects
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
          <div className="min-w-[200px] overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0a0a0f]/95 p-1.5 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            {projectsData.map((p) => (
              <Link
                key={p.id}
                href={`/ai/projects/${p.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-neutral-400 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                <span className="font-mono text-[10px] font-bold text-cyan-400/60">
                  {String(p.number).padStart(2, "0")}
                </span>
                {p.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const AI_MOBILE_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Tech Stack", href: "#techstack" },
  { label: "Insights", href: "/ai/insights" },
];

function NavAI() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5">
      <div className="mx-auto max-w-6xl">
        <nav className="relative z-10 mt-4 flex h-14 items-center justify-between rounded-full border border-cyan-400/25 bg-[#0a0a0f]/70 pl-5 pr-3 shadow-[0_0_28px_-8px_rgba(34,211,238,0.5)] backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-2.5 text-white">
            <span className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-cyan-400/60 shadow-[0_0_14px_rgba(34,211,238,0.55)]">
              <Image
                src="/hero-photo.jpg"
                alt="Jitin Nair"
                fill
                sizes="32px"
                className="object-cover"
                style={{ objectPosition: "center 20%" }}
              />
            </span>
            <span className="font-serif text-base font-medium tracking-tight">Jitin Nair</span>
            <span className="hidden text-sm text-cyan-400/70 sm:inline">· AI Systems</span>
          </Link>
          <div className="hidden items-center gap-7 md:flex">
            <ProjectsDropdown />
            <a href="#techstack" className="text-sm text-neutral-400 transition-colors hover:text-white">
              Tech Stack
            </a>
            <Link href="/ai/insights" className="text-sm text-neutral-400 transition-colors hover:text-white">
              Insights
            </Link>
          </div>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden items-center rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-[#061828] transition-[transform,background-color] duration-200 ease-out hover:bg-cyan-300 active:scale-[0.97] md:inline-flex"
          >
            Get in touch
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/30 text-cyan-300 transition-colors hover:bg-cyan-400/10 md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
          </button>
        </nav>

        {/* Mobile expansion panel */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                aria-hidden
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-0 md:hidden"
              />
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 mt-2 overflow-hidden rounded-3xl border border-cyan-400/20 bg-[#0a0a0f]/90 p-2 shadow-[0_0_28px_-8px_rgba(34,211,238,0.5)] backdrop-blur-xl md:hidden"
              >
                {AI_MOBILE_LINKS.map((n) =>
                  n.href.startsWith("/") ? (
                    <Link
                      key={n.href}
                      href={n.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-base text-neutral-300 transition-colors hover:bg-white/[0.05] hover:text-white"
                    >
                      {n.label}
                    </Link>
                  ) : (
                    <a
                      key={n.href}
                      href={n.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-base text-neutral-300 transition-colors hover:bg-white/[0.05] hover:text-white"
                    >
                      {n.label}
                    </a>
                  )
                )}
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-1 block rounded-2xl bg-cyan-400 px-4 py-3 text-center text-base font-semibold text-[#061828] active:scale-[0.98]"
                >
                  Get in touch
                </a>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
/* ---------- Hero content: same editorial language as the landing page ---------- */
const AI_HEADLINE: ReactNode[] = [
  <>
    Autonomous <span className="text-cyan-400">agents</span>, orchestrated
  </>,
  <>into systems that ship.</>,
];

const AI_STATS: HeroStat[] = [
  { to: 200, format: (n) => `${Math.round(n)}+`, label: "AI agents in production" },
  { to: 147, format: (n) => `${Math.round(n)}`, label: "live instances" },
  { to: 1, format: (n) => `${Math.round(n)}K+`, label: "hours automated" },
];

function AIHeroCtas(mobile: boolean) {
  const primary =
    "inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 font-semibold text-[#061828] transition-[transform,background-color] duration-200 ease-out hover:bg-cyan-300 active:scale-[0.97]";
  const ghost =
    "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 font-semibold text-white transition-[transform,border-color,background-color] duration-200 ease-out hover:border-cyan-400/50 hover:bg-white/[0.04] active:scale-[0.97]";
  if (mobile) {
    return (
      <div className="flex items-center gap-2.5">
        <a href="#projects" className={`${primary} flex-1 px-4 py-3 text-xs`}>
          Explore projects
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
        </a>
        <Link href="/ai/insights" className={`${ghost} flex-1 px-4 py-3 text-xs`}>
          Read insights
        </Link>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3.5">
      <a href="#projects" className={`${primary} px-6 py-3 text-sm`}>
        Explore projects
        <ArrowRight className="h-4 w-4" strokeWidth={2} />
      </a>
      <Link href="/ai/insights" className={`${ghost} px-6 py-3 text-sm`}>
        Read insights
      </Link>
    </div>
  );
}

function AIHero() {
  return (
    <EditorialHero
      accent="cyan"
      eyebrow="Jitin Nair · AI Systems"
      headline={AI_HEADLINE}
      subline={
        <>
          AI Systems Architect <span className="text-neutral-600">·</span>{" "}
          Multi-agent orchestration on LangGraph, MCP, and RAG
        </>
      }
      stats={AI_STATS}
      ctas={AIHeroCtas}
      mobilePortraitPosition="center 12%"
      desktopPortraitPosition="center 18%"
    />
  );
}

// Dynamic imports for below-the-fold (Quantum Performance)
const FeaturedInsight = dynamic(() => import("./FeaturedInsight").then(mod => mod.FeaturedInsight), { ssr: false });
const MobileBento = dynamic(() => import("./home/MobileBento").then(mod => mod.MobileBento), { ssr: false });
const MobileTechStack = dynamic(() => import("./home/MobileTechStack").then(mod => mod.MobileTechStack), { ssr: false });
const MobileProjects = dynamic(() => import("./home/MobileProjects").then(mod => mod.MobileProjects), { ssr: false });
const MobileJourney = dynamic(() => import("./home/MobileJourney").then(mod => mod.MobileJourney), { ssr: false });
const MobileContact = dynamic(() => import("./home/MobileContact").then(mod => mod.MobileContact), { ssr: false });

const DesktopExpertiseMarquee = dynamic(() => import("./desktop-expertise-marquee").then(mod => mod.DesktopExpertiseMarquee), { ssr: false });
const DesktopTechStack = dynamic(() => import("./home/DesktopTechStack").then(mod => mod.DesktopTechStack), { ssr: false });
const DesktopProjects = dynamic(() => import("./home/DesktopProjects").then(mod => mod.DesktopProjects), { ssr: false });
const DesktopJourney = dynamic(() => import("./home/DesktopJourney").then(mod => mod.DesktopJourney), { ssr: false });
const DesktopContact = dynamic(() => import("./home/DesktopContact").then(mod => mod.DesktopContact), { ssr: false });


export function ArchitecturePortfolioExperience() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by rendering null until mounted
  if (!mounted) {
    return (
      <main className="bg-[#0a0a0f] min-h-screen">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#0a0a0f] min-h-screen selection:bg-cyan-500/30">
      <NavAI />
      <div id="top" className="relative z-10">
        <AIHero />
      </div>
      {isMobile ? (
        <>
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
