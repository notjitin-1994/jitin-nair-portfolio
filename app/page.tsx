"use client";

import { useState, useEffect, useCallback } from "react";
import { Footer } from "./components/Footer";
import LazySection from "./components/LazySection";
import { FeaturedInsight } from "./components/FeaturedInsight";

// Import Home Components
import { useIsMobile } from "./components/home/shared";
import { MobileHero } from "./components/home/MobileHero";
import { MobileBento } from "./components/home/MobileBento";
import { MobileTechStack } from "./components/home/MobileTechStack";
import { MobileProjects } from "./components/home/MobileProjects";
import { MobileJourney } from "./components/home/MobileJourney";
import { MobileContact } from "./components/home/MobileContact";

import { DesktopHero } from "./components/home/DesktopHero";
import { DesktopExpertiseMarquee } from "./components/desktop-expertise-marquee";
import { DesktopTechStack } from "./components/home/DesktopTechStack";
import { DesktopProjects } from "./components/home/DesktopProjects";
import { DesktopJourney } from "./components/home/DesktopJourney";
import { DesktopContact } from "./components/home/DesktopContact";

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
