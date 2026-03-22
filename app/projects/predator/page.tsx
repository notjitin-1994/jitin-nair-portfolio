'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowLeft, ExternalLink, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import HeroSection from './components/HeroSection';
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
            className="p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20"
          >
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-3 sm:mb-4">Explore the Code</h2>
            <p className="text-slate-400 mb-6 sm:mb-8 max-w-xl text-sm sm:text-base">
              The Predator system is open source. View the complete implementation, documentation, and deployment guides on GitHub.
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
                href="/"
                className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-white/[0.03] text-slate-300 border border-white/[0.08] hover:border-cyan-500/20 transition-all text-sm sm:text-base"
              >
                <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Dashboard</span>
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
              Predator Scalping System · Built with Python, LangGraph, and TimescaleDB
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
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/[0.05] backdrop-blur-md border border-white/[0.1] text-slate-300 hover:text-white hover:border-cyan-500/30 transition-all text-xs sm:text-sm"
          >
            <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Dashboard</span>
          </Link>
        </div>
      </nav>

      <HeroSection />
      <ProcessFlow />
      <MetricsDashboard />
      <CodeShowcase />
      <TechStackGrid />
      <CitationsSection />
      <CTASection />
    </main>
  );
}
