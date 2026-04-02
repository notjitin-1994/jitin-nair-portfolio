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
      <section className="py-10 sm:py-14 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20"
          >
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-3 sm:mb-4">Explore the Nexus</h2>
            <p className="text-slate-400 mb-6 sm:mb-8 max-w-xl text-sm sm:text-base">
              The Predator Nexus V4.0 system is open source. View the complete Bayesian implementation, MLOps documentation, and deployment guides on GitHub.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-all text-sm sm:text-base"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>View on GitHub</span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>

              <Link
                href="/projects/predator/dashboard"
                className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-white/[0.03] text-slate-300 border border-white/[0.08] hover:border-cyan-500/20 hover:text-cyan-400 transition-all text-sm sm:text-base"
              >
                <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Nexus Live Pulse</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/[0.08]"
          >
            <p className="text-slate-500 text-xs sm:text-sm">
              Predator Nexus V4.0 · Bayesian Multi-Agent Pantheon · Python & LangGraph
            </p>
            <p className="text-slate-600 text-[10px] sm:text-xs mt-1 sm:mt-2">© 2026 Jitin Nair. All rights reserved.</p>
          </motion.div>
        </div>
      </section>

      <AccessRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default function PredatorPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white selection:bg-cyan-500/30">
      <HeroSection />
      
      <div className="space-y-24 sm:space-y-36 md:space-y-48 pb-24 sm:pb-40">
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
