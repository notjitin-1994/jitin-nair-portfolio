'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PixelBanner, type PixelLetter } from './ui/PixelBanner';

const buildLetters: PixelLetter[] = [
  [[1,1,1,1,0], [1,0,0,0,1], [1,1,1,1,0], [1,0,0,0,1], [1,1,1,1,0]], // B
  [[1,0,0,0,1], [1,0,0,0,1], [1,0,0,0,1], [1,0,0,0,1], [0,1,1,1,0]], // U
  [[0,1,1,1,0], [0,0,1,0,0], [0,0,1,0,0], [0,0,1,0,0], [0,1,1,1,0]], // I
  [[1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,1,1,1,1]], // L
  [[1,1,1,1,0], [1,0,0,0,1], [1,0,0,0,1], [1,0,0,0,1], [1,1,1,1,0]], // D
];

export function WorkingTogetherCTA() {
  return (
    <section className="py-24 px-4 sm:px-8 relative z-10 border-t border-white/[0.05]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative p-10 sm:p-16 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.08] backdrop-blur-2xl overflow-hidden shadow-2xl"
        >
          {/* Spotlight effect */}
          <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-10 opacity-80 group-hover:opacity-100 transition-opacity">
              <PixelBanner letters={buildLetters} size="sm" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white max-w-2xl">
              Interested in working together?
            </h2>
            <p className="text-slate-400 mb-10 text-lg sm:text-xl font-light leading-relaxed max-w-xl">
              Let&apos;s discuss how AI enablement can transform your operations.
            </p>
            
            <Link 
              href="/#contact" 
              className="flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20 hover:bg-cyan-500/20 transition-all hover:scale-[1.05] active:scale-[0.95]"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WorkingTogetherCTA;