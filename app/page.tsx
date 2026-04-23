"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Footer } from "./components/Footer";
import LazySection from "./components/LazySection";

// Static imports for above-the-fold (Critical Path)
import { useIsMobile } from "./components/home/shared";
import { MobileHero } from "./components/home/MobileHero";
import { DesktopHero } from "./components/home/DesktopHero";

// Dynamic imports for below-the-fold (Quantum Performance)
const FeaturedInsight = dynamic(() => import("./components/FeaturedInsight").then(mod => mod.FeaturedInsight), { ssr: false });
const MobileBento = dynamic(() => import("./components/home/MobileBento").then(mod => mod.MobileBento), { ssr: false });
const MobileTechStack = dynamic(() => import("./components/home/MobileTechStack").then(mod => mod.MobileTechStack), { ssr: false });
const MobileProjects = dynamic(() => import("./components/home/MobileProjects").then(mod => mod.MobileProjects), { ssr: false });
const MobileJourney = dynamic(() => import("./components/home/MobileJourney").then(mod => mod.MobileJourney), { ssr: false });
const MobileContact = dynamic(() => import("./components/home/MobileContact").then(mod => mod.MobileContact), { ssr: false });

const DesktopExpertiseMarquee = dynamic(() => import("./components/desktop-expertise-marquee").then(mod => mod.DesktopExpertiseMarquee), { ssr: false });
const DesktopTechStack = dynamic(() => import("./components/home/DesktopTechStack").then(mod => mod.DesktopTechStack), { ssr: false });
const DesktopProjects = dynamic(() => import("./components/home/DesktopProjects").then(mod => mod.DesktopProjects), { ssr: false });
const DesktopJourney = dynamic(() => import("./components/home/DesktopJourney").then(mod => mod.DesktopJourney), { ssr: false });
const DesktopContact = dynamic(() => import("./components/home/DesktopContact").then(mod => mod.DesktopContact), { ssr: false });


export default function Home() {
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
