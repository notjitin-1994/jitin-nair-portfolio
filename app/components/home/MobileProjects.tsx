"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ProjectCarousel = dynamic(() => import('../../components/ProjectCarousel').then(mod => mod.ProjectCarousel), { ssr: false });

export function MobileProjects() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
     <section id="projects" className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{
            background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)',
            filter: 'blur(80px)',
            top: '20%',
            left: '-30%'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
        {/* Section Header - CSS Animated, SSR Safe */}
        <div className="mb-6 text-left" suppressHydrationWarning>
          <p 
            className={`text-cyan-400 font-mono text-xs tracking-widest uppercase mb-2 ${mounted ? 'mobile-section-subtitle' : 'opacity-0'}`}
          >
            Featured Deliverables
          </p>
          <h2 
            className={`text-3xl md:text-4xl font-bold ${mounted ? 'mobile-section-title' : 'opacity-0'}`}
          >
            Production Systems
          </h2>
          <p 
            className={`text-slate-400 text-sm mt-2 leading-relaxed max-w-2xl ${mounted ? 'mobile-section-desc' : 'opacity-0'}`}
          >
            Enterprise-grade implementations spanning algorithmic trading, multi-agent orchestration, and intelligent AI infrastructure.
          </p>
        </div>

        <div className="px-0">
          <ProjectCarousel />
        </div>
        </div>
         </section>
        );
}
