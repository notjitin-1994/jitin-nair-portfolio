'use client';

import { useState } from 'react';
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

function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-24 sm:py-32 px-4 sm:px-8 md:px-12 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 sm:p-16 md:p-20 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/[0.05] to-transparent border border-cyan-500/[0.1] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/[0.03] blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">Explore the Nexus</h2>
              <p className="text-slate-400 mb-10 text-lg sm:text-xl font-light leading-relaxed">
                The Predator Nexus V4.0 system is partially open source. View the complete Bayesian implementation, MLOps documentation, and deployment guides on GitHub.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-cyan-500/20 text-cyan-400 font-semibold border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors text-base"
                >
                  <Github className="w-5 h-5" />
                  <span>Request Access</span>
                  <ExternalLink className="w-5 h-5" />
                </button>

                <Link
                  href="/projects/predator/dashboard"
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/[0.05] text-white font-medium border border-white/[0.1] hover:bg-white/[0.1] transition-colors text-base"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Nexus Live Pulse</span>
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
            <p className="text-slate-500 text-sm">
              Predator Nexus V4.0 · Bayesian Multi-Agent Pantheon · Python & LangGraph
            </p>
            <p className="text-slate-600 text-xs mt-2">© 2026 Jitin Nair. All rights reserved.</p>
          </motion.div>
        </div>
      </section>

      <AccessRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default function PredatorPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-cyan-500/20">
      <HeroSection />
      
      <div className="space-y-12 sm:space-y-16 md:space-y-24 pb-20 sm:pb-32">
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
