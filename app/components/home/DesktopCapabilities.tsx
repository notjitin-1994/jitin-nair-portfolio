"use client";

import { motion } from "framer-motion";
import { Target, Bot, Workflow, Award } from "lucide-react";

export function DesktopCapabilities() {
  return (
    <section className="py-6 md:py-8 relative">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/capabilities-bg.jpg)',
          filter: 'blur(48px) brightness(0.4)',
          transform: 'scale(1.1)'
        }}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4">Capabilities Matrix</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Everything We Build</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Combined expertise of AI systems, full-stack engineering, and enterprise integrations
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-4 mb-12">
          {[
            { value: "50+", label: "Technical Skills", icon: Target },
            { value: "200+", label: "AI Agents Deployed", icon: Bot },
            { value: "25+", label: "Enterprise Integrations", icon: Workflow },
            { value: "95%", label: "Success Rate", icon: Award },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl p-5 border border-white/[0.08] bg-white/[0.03] backdrop-blur-[2px] hover:border-cyan-500/30 hover:bg-white/[0.06] transition-all duration-300 text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-cyan-400 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
     </section>
  );
}
