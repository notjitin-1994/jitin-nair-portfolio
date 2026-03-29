"use client";

import { motion } from "framer-motion";
import { PageLayout } from "../../components/PageLayout";
import { caseStudies } from "../../data/caseStudies";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

export function CaseStudyDetail({ slug }: { slug: string }) {
  const cs = caseStudies.find((c) => c.slug === slug);
  const currentIndex = caseStudies.findIndex((c) => c.slug === slug);
  const prevCs = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const nextCs = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null;

  if (!cs) {
    return (
      <PageLayout title="Not Found">
        <p className="text-slate-400">Case study not found.</p>
        <Link href="/case-studies" className="text-cyan-400 hover:underline mt-4 inline-block">← Back to Case Studies</Link>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="pt-24 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/case-studies" className="text-sm text-slate-500 hover:text-cyan-400 mb-6 inline-flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Back to Case Studies
          </Link>
          <div className="flex items-center gap-3 mb-4 mt-4">
            <span className="px-3 py-1 text-xs font-mono bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20">{cs.category}</span>
            <span className="text-sm text-slate-500">{cs.industry} — {cs.duration}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{cs.title}</h1>
          <p className="text-lg text-slate-400 max-w-3xl">{cs.client}</p>
        </motion.div>
      </section>

      <section className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cs.results.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-1">{r.value}</div>
              <div className="text-sm text-slate-400">{r.metric}</div>
              {r.context && <div className="text-xs text-slate-500 mt-1">{r.context}</div>}
            </motion.div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03]">
          <h3 className="text-lg font-bold mb-3 text-red-400">The Challenge</h3>
          <p className="text-sm text-slate-400 leading-relaxed">{cs.challenge}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="p-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5">
          <h3 className="text-lg font-bold mb-3 text-cyan-400">The Solution</h3>
          <p className="text-sm text-slate-400 leading-relaxed">{cs.solution}</p>
        </motion.div>
      </div>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-4">Deep Dive</h3>
        <p className="text-slate-400 leading-relaxed">{cs.fullDescription}</p>
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6">Technologies Used</h3>
        <div className="flex flex-wrap gap-2">
          {cs.technologies.map((t) => (
            <span key={t} className="px-4 py-2 text-sm font-mono bg-white/[0.03] text-slate-300 rounded-xl border border-white/[0.08] hover:border-cyan-500/30 transition-colors">{t}</span>
          ))}
        </div>
      </section>

      {cs.testimonial && (
        <section className="mb-16">
          <div className="p-8 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-violet-500/5">
            <Quote className="w-8 h-8 text-cyan-400/40 mb-4" />
            <p className="text-lg text-slate-300 leading-relaxed mb-4 italic">&ldquo;{cs.testimonial.quote}&rdquo;</p>
            <div>
              <p className="text-sm font-bold text-white">{cs.testimonial.author}</p>
              <p className="text-xs text-slate-500">{cs.testimonial.role}, {cs.testimonial.company}</p>
            </div>
          </div>
        </section>
      )}

      <div className="flex justify-between items-center pt-8 border-t border-white/[0.08]">
        {prevCs ? (
          <Link href={`/case-studies/${prevCs.slug}`} className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
            <ArrowLeft className="w-4 h-4" /> {prevCs.title}
          </Link>
        ) : <div />}
        {nextCs ? (
          <Link href={`/case-studies/${nextCs.slug}`} className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
            {nextCs.title} <ArrowRight className="w-4 h-4" />
          </Link>
        ) : <div />}
      </div>
    </PageLayout>
  );
}
