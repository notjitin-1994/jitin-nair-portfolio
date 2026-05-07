'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, LayoutDashboard, Rocket } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '../../components/Footer';
import HeroSection from './components/HeroSection';
import BayesianPantheon from './components/BayesianPantheon';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import MetricsDashboard from './components/MetricsDashboard';
import CodeShowcase from './components/CodeShowcase';
import ProcessFlow from './components/ProcessFlow';
import TechStackGrid from './components/TechStackGrid';
import CitationsSection from './components/CitationsSection';

function NeuralGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
      />
    </div>
  );
}

function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -inset-[10%] opacity-50">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-cyan-500/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[1000px] h-[1000px] bg-teal-500/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-cyan-950/5 blur-[150px] rounded-full" />
      </div>
    </div>
  );
}

function CTASection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-12 border-t border-white/[0.05] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group p-10 sm:p-20 rounded-[4rem] bg-[#050505] border border-white/[0.08] relative overflow-hidden shadow-2xl"
        >
          {/* Spotlight effect */}
          <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />
          
          <div className="relative z-10 max-w-3xl text-left">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-1 bg-cyan-500 rounded-full" />
              <p className="text-cyan-400 font-mono text-sm tracking-[0.4em] uppercase font-bold text-white">Next Generation Architecture</p>
            </div>
            
            <h2 className="text-4xl sm:text-6xl font-black mb-8 tracking-tight text-white leading-tight font-display">The Absolute Frontier of <br/><span className="text-cyan-500 italic">Bayesian Systems.</span></h2>
            
            <p className="text-slate-400 mb-12 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
              Predator Nexus V4.0 is not just a tool; it&apos;s an institutional-grade intelligence layer. Explore the live performance metrics and deep telemetry from our production execution cluster.
            </p>
          </div>
          
          {/* Decorative SVG elements */}
          <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-20 transition-opacity">
             <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="99" stroke="white" strokeDasharray="4 4" />
                <circle cx="100" cy="100" r="70" stroke="white" strokeDasharray="8 8" />
                <path d="M100 0V200" stroke="white" strokeWidth="0.5" />
                <path d="M0 100H200" stroke="white" strokeWidth="0.5" />
             </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function PredatorPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="min-h-screen bg-[#050505]" />;

  return (
    <main className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-cyan-500/20 relative overflow-x-hidden">
      <NeuralGrid />
      <AuroraBackground />
      
      <HeroSection />
      
      <div className="relative z-10 space-y-12 sm:space-y-24 md:space-y-32 pb-16 sm:pb-24">
        <BayesianPantheon />
        <ProcessFlow />
        <ArchitectureDiagram />
        <MetricsDashboard />
        <CodeShowcase />
        <TechStackGrid />
        <CitationsSection />
        <CTASection />
      </div>

      <Footer />
    </main>
  );
}
