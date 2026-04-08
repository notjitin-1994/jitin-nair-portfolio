'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, LayoutDashboard } from 'lucide-react';
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
import AccessRequestModal from './components/AccessRequestModal';
import { WorkingTogetherCTA } from '@/app/components/WorkingTogetherCTA';

function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -inset-[10%] opacity-50">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-teal-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-950/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}

function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-6 sm:py-8 px-4 sm:px-8 md:px-12 border-t border-white/[0.05] relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group p-10 sm:p-16 md:p-20 rounded-[3rem] bg-white/[0.02] border border-white/[0.08] relative overflow-hidden backdrop-blur-3xl"
          >
            {/* Spotlight effect */}
            <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            
            <div className="relative z-10 max-w-2xl text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">The Source is Open.</h2>
              <p className="text-slate-400 mb-10 text-lg sm:text-xl font-light leading-relaxed">
                Predator Nexus V4.0 is a testament to open-source quantitative research. Access the complete Bayesian implementation, MLOps orchestration guides, and institutional deployment manifests on GitHub.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/20 hover:bg-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Github className="w-5 h-5" />
                  <span>Request Repository Access</span>
                  <ExternalLink className="w-5 h-5" />
                </button>

                <Link
                  href="/projects/predator/dashboard"
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/[0.05] text-white font-medium border border-white/[0.1] hover:bg-white/[0.1] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Nexus Live Monitor</span>
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/[0.05]"
          >
            <p className="text-slate-500 text-sm font-medium">
              Predator Nexus V4.0 · Bayesian Multi-Agent Pantheon · Distributed Intelligence
            </p>
            <p className="text-slate-600 text-xs mt-2">© 2026 Jitin Nair. Engineered for the future of finance.</p>
          </motion.div>
        </div>
      </section>

      <AccessRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default function PredatorPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="min-h-screen bg-[#050505]" />;

  return (
    <main className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-cyan-500/20 relative">
      <AuroraBackground />
      <HeroSection />
      
      <div className="relative z-10 space-y-4 sm:space-y-6 md:space-y-8 pb-6 sm:pb-10">
        <BayesianPantheon />
        <ProcessFlow />
        <ArchitectureDiagram />
        <MetricsDashboard />
        <CodeShowcase />
        <TechStackGrid />
        <CitationsSection />
        <CTASection />
        <WorkingTogetherCTA />
      </div>

      <Footer />
    </main>
  );
}
