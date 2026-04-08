"use client";

import { motion } from "framer-motion";
import { Brain, ArrowRight, Clock, Calendar, Sparkles } from "lucide-react";
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
    <Section id="featured-insight" className="py-12 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-4"
            >
              Latest Analysis
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
              Intelligence <span className="text-cyan-400 text-glow-cyan">Insights</span>
            </h2>
          </div>
          
          <Link 
            href="/insights"
            className="group flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors text-sm font-mono uppercase tracking-widest pb-2"
          >
            <span>View Knowledge Base</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Cinematic Card */}
        <Link href={`/insights/${featuredPost.slug}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.5 }}
            className="group relative rounded-[2.5rem] bg-white/[0.02] border border-white/[0.08] p-8 md:p-12 overflow-hidden backdrop-blur-3xl shadow-2xl"
          >
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
            
            {/* Spotlight effect */}
            <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
              {/* Left Content */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-6">
                  <Badge variant="cyan" className="px-3 py-1 rounded-lg">
                    {featuredPost.category}
                  </Badge>
                  <div className="h-px w-8 bg-white/10" />
                  <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-500" /> {featuredPost.readTime} Read
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-teal-500" /> 
                      {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-[1.1] group-hover:text-cyan-400 transition-colors">
                  {featuredPost.title}
                </h3>

                <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-light mb-8 max-w-2xl italic">
                  &quot;{featuredPost.excerpt}&quot;
                </p>

                <div className="flex items-center gap-4">
                  <div className="px-6 py-3 rounded-xl bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all flex items-center gap-2">
                    <span>Read Analysis</span>
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Right Illustration Area */}
              <div className="lg:col-span-5 relative h-full min-h-[240px] flex items-center justify-center">
                <div className="relative w-full h-full max-w-[300px] aspect-square">
                  {/* Abstract Brain/Neural Graphic */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-full h-full rounded-full border border-cyan-500/10 flex items-center justify-center p-8">
                      <div className="w-full h-full rounded-full border border-cyan-500/20 flex items-center justify-center p-8 animate-reverse-spin">
                        <div className="w-full h-full rounded-full border border-cyan-500/40 flex items-center justify-center p-8">
                          <Brain className="w-20 h-20 text-cyan-400/80 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]" />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Pulsing Nodes */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-cyan-400"
                      animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 1,
                        repeat: Infinity,
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
      </div>
    </Section>
  );
}

export default FeaturedInsight;