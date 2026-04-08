"use client";

import { motion } from "framer-motion";
import { testimonials } from "../../data/testimonials";
import { Quote } from "lucide-react";

export function TestimonialsMarquee() {
  return (
    <section className="py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4">What People Say</p>
        <h2 className="text-3xl md:text-5xl font-bold">Client Testimonials</h2>
      </div>

      <div className="flex overflow-hidden">
        <div className="flex shrink-0 gap-6 animate-marquee" style={{ animationDuration: "40s" }}>
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="w-[350px] flex-shrink-0 p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
              <Quote className="w-6 h-6 text-cyan-400/30 mb-3" />
              <p className="text-sm text-slate-300 leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="text-sm font-bold text-white">{t.author}</p>
                <p className="text-xs text-slate-500">{t.role}, {t.company}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex shrink-0 gap-6 animate-marquee" style={{ animationDuration: "40s" }} aria-hidden>
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={`dup-${i}`} className="w-[350px] flex-shrink-0 p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
              <Quote className="w-6 h-6 text-cyan-400/30 mb-3" />
              <p className="text-sm text-slate-300 leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="text-sm font-bold text-white">{t.author}</p>
                <p className="text-xs text-slate-500">{t.role}, {t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
