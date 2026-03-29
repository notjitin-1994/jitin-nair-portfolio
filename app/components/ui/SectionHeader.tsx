"use client";

import { motion } from "framer-motion";

export function SectionHeader({ title, subtitle, description }: { title: string; subtitle?: string; description?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      {subtitle && <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4">{subtitle}</p>}
      <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
      {description && <p className="text-slate-400 max-w-2xl text-lg">{description}</p>}
    </motion.div>
  );
}
