"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Footer } from "./Footer";
import LazySection from "./LazySection";

// Static imports for above-the-fold (Critical Path)
import { useIsMobile } from "./home/shared";

const AI_NAV = [
  { label: "Systems", href: "#projects" },
  { label: "Tech Stack", href: "#techstack" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

function NavAI() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5">
      <nav className="mx-auto mt-4 flex h-14 max-w-6xl items-center justify-between rounded-full border border-white/[0.08] bg-[#0a0a0f]/70 pl-5 pr-3 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-white">
          Jitin Nair
          <span className="hidden text-cyan-400/70 sm:inline">· AI Systems</span>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {AI_NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-neutral-400 transition-colors hover:text-white">
              {n.label}
            </a>
          ))}
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
