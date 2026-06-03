"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Footer } from "./Footer";
import LazySection from "./LazySection";
import { projectsData } from "../data/projects";

// Static imports for above-the-fold (Critical Path)
import { useIsMobile } from "./home/shared";

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
                href={`/projects/${p.id}`}
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

function NavAI() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5">
      <nav className="mx-auto mt-4 flex h-14 max-w-6xl items-center justify-between rounded-full border border-cyan-400/25 bg-[#0a0a0f]/70 pl-5 pr-3 shadow-[0_0_28px_-8px_rgba(34,211,238,0.5)] backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-white">
          Jitin Nair
          <span className="hidden text-cyan-400/70 sm:inline">· AI Systems</span>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          <ProjectsDropdown />
          <a href="#techstack" className="text-sm text-neutral-400 transition-colors hover:text-white">
            Tech Stack
          </a>
          <Link href="/insights" className="text-sm text-neutral-400 transition-colors hover:text-white">
            Insights
          </Link>
        </div>
        <a
          href="#contact"
          className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-[#061828] transition-[transform,background-color] duration-200 ease-out hover:bg-cyan-300 active:scale-[0.97]"
        >
          Get in touch
        </a>
      </nav>
    </header>
  );
}
import { MobileHero } from "./home/MobileHero";
import { DesktopHero } from "./home/DesktopHero";

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

  const handleUnlock = useCallback(() => {
    const expertiseSection = document.getElementById('expertise');
    if (expertiseSection) {
      expertiseSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
      {isMobile ? (
        <>
          <div id="top" className="relative z-10">
            <MobileHero onUnlock={handleUnlock} />
          </div>

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
          <div id="top" className="relative z-10">
            <DesktopHero onUnlock={handleUnlock} />
          </div>

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
