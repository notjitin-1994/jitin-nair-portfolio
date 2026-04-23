"use client";

import { motion } from "framer-motion";
import { Brain, ArrowRight, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { 
  Section, 
  Badge
} from "./ui";
import { blogPosts } from "../data/blogPosts";

export function FeaturedInsight() {
  const featuredPost = blogPosts.find(
    (p) => p.slug === "from-ld-to-ai-systems-engineering"
  );

  if (!featuredPost) return null;

  return (
    <Section id="featured-insight" className="py-6 md:py-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-10"
      >
        <div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-2"
          >
            Latest Analysis
          </motion.p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Intelligence <span className="text-cyan-400 text-glow-cyan">Insights</span>
          </h2>
        </div>
        
        <Link 
          href="/insights"
          className="group flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors text-xs font-mono uppercase tracking-widest"
        >
          <span>View Knowledge Base</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>

      {/* Cinematic Card */}
      <Link href={`/insights/${featuredPost.slug}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.5 }}
          className="group relative rounded-3xl md:rounded-[2.5rem] bg-white/[0.02] border border-white/[0.08] p-6 md:p-12 overflow-hidden backdrop-blur-3xl shadow-2xl transition-all hover:border-cyan-500/30"
        >
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-cyan-500/5 blur-[80px] md:blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-teal-500/5 blur-[60px] md:blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
          
          {/* Spotlight effect */}
          <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-6">
                <Badge variant="cyan" className="px-2.5 py-0.5 md:px-3 md:py-1 rounded-lg text-[10px] md:text-xs">
                  {featuredPost.category}
                </Badge>
                <div className="hidden sm:block h-px w-6 bg-white/10" />
                <div className="flex items-center gap-3 text-[9px] md:text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-cyan-500" /> {featuredPost.readTime} Read
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-teal-500" /> 
                    {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight group-hover:text-cyan-400 transition-colors">
                {featuredPost.title}
              </h3>

              <p className="text-slate-400 text-sm md:text-xl leading-relaxed font-light mb-6 md:mb-8 line-clamp-3 md:line-clamp-none italic">
                &quot;{featuredPost.excerpt}&quot;
              </p>

              <div className="flex items-center gap-4">
                <div className="px-5 py-2.5 md:px-6 md:py-3 rounded-xl bg-cyan-500/10 text-cyan-400 text-sm md:text-base font-bold border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all flex items-center gap-2">
                  <span>Continue reading</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>

            {/* Right Illustration Area */}
            <div className="lg:col-span-5 order-1 lg:order-2 relative flex items-center justify-center py-4 lg:py-0">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-64 md:h-64 aspect-square">
                {/* Abstract Brain/Neural Graphic - STATIC, NO MOVEMENT */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full rounded-full border border-white/[0.03] flex items-center justify-center p-4 md:p-8">
                    <div className="w-full h-full rounded-full border border-white/[0.05] flex items-center justify-center p-4 md:p-8">
                      <div className="w-full h-full rounded-full border border-white/[0.08] flex items-center justify-center p-4 md:p-8">
                        <Brain className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-cyan-400/80 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pulsing Nodes - Subtle Pulse only */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400"
                    animate={{
                      opacity: [0.2, 0.8, 0.2],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 4,
                      delay: i * 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      top: `${20 + i * 30}%`,
                      right: `${10 + i * 15}%`,
                      boxShadow: '0 0 10px #22d3ee'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </Link>

      {/* Authority Keyword Cluster - Phase 2 SEO/GEO */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 md:mt-12 flex flex-wrap items-center justify-center gap-3 md:gap-6 border-t border-white/[0.05] pt-8 md:pt-10"
      >
        <span className="text-[10px] md:text-xs font-mono text-slate-500 uppercase tracking-[0.2em] w-full text-center mb-2 md:mb-4">
          Core Authority Domains
        </span>
        {[
          { name: "Agentic AI", href: "https://jitinnair.com/insights/mcp-usb-c-moment-for-ai" },
          { name: "Model Context Protocol", href: "https://modelcontextprotocol.io" },
          { name: "LangGraph Architecture", href: "https://www.langchain.com/langgraph" },
          { name: "AI Systems Design", href: "https://jitinnair.com" },
          { name: "Multi-Agent Orchestration", href: "https://jitinnair.com/insights/beyond-the-monolith-compound-ai-systems" },
          { name: "Advanced RAG", href: "https://jitinnair.com/projects/localmind" },
        ].map((domain, i) => (
          <Link 
            key={i} 
            href={domain.href}
            className="text-xs md:text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors border border-white/[0.05] hover:border-cyan-500/30 px-3 py-1.5 md:px-5 md:py-2 rounded-full bg-white/[0.02] backdrop-blur-sm"
          >
            {domain.name}
          </Link>
        ))}
      </motion.div>
    </Section>
  );
}

export default FeaturedInsight;