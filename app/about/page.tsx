"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageLayout } from "../components/PageLayout";
import { skillsData } from "../data/skillsData";
import { resources } from "../data/resources";
import {
  Brain, Code2, Server, Cloud, Bot, BookOpen, ChevronDown,
  Download, FileText, Network, Users, CheckSquare, MapPin, Calendar, Award,
  Globe, GraduationCap, Video, Headphones
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText, Network, CheckSquare, Users,
};

const journey = [
  { year: "2025", title: "Independent — AI Systems Architect", role: "Agentic AI & Automation", description: "200+ autonomous agents, multi-agent orchestration, Reality-Check governance", icon: Brain, color: "#22d3ee" },
  { year: "2022", title: "Moody's Ratings", role: "Instructional Designer", description: "Video production automation, 1000+ hours saved annually, global L&D", icon: Video, color: "#f59e0b" },
  { year: "2019", title: "Accenture", role: "Instructor Analyst → Analyst", description: "Promoted in 9 months, Fortune 500 training, $140K cost savings", icon: Award, color: "#a78bfa" },
  { year: "2017", title: "247.ai — Electronic Arts", role: "Senior Executive", description: "QA automation, mobile app testing, top performer 3x consecutive", icon: Headphones, color: "#22c55e" },
  { year: "2015", title: "Sindhi College — B.Com", role: "Commerce Graduate", description: "Business foundation, self-taught programming", icon: GraduationCap, color: "#ec4899" },
];

export default function AboutPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(skillsData[0]?.title || null);

  return (
    <PageLayout title="About Me" subtitle="The Human Behind the Agents">
      <p className="text-slate-400 text-lg mb-16 max-w-3xl -mt-8">
        From commerce grad to AI architect — 10 years of building learning systems and autonomous agents. Based in Bangalore, India.
      </p>

      {/* Skills Matrix */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-2">Skills Matrix</h2>
        <p className="text-slate-500 mb-8">{skillsData.reduce((acc, cat) => acc + cat.skills.length, 0)} skills across {skillsData.length} domains</p>

        <div className="space-y-3">
          {skillsData.map((category) => {
            const isExpanded = expandedCategory === category.title;
            return (
              <motion.div key={category.title} layout className="rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden">
                <button onClick={() => setExpandedCategory(isExpanded ? null : category.title)}
                  className="w-full flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${category.color}20` }}>
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold">{category.title}</h3>
                      <p className="text-xs text-slate-500">{category.skills.length} skills</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden">
                      <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {category.skills.map((skill) => (
                          <div key={skill.name} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">{skill.name}</span>
                              <span className="text-xs font-mono" style={{ color: category.color }}>{skill.level}%</span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="h-full rounded-full" style={{ backgroundColor: category.color }} />
                            </div>
                            <p className="text-[11px] text-slate-500 mt-1.5">{skill.description}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Career Timeline */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8">Career Timeline</h2>
        <div className="space-y-6">
          {journey.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.year + item.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center border-2" style={{ borderColor: item.color, backgroundColor: `${item.color}15` }}>
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  {i < journey.length - 1 && <div className="w-px flex-1 mt-2" style={{ backgroundColor: `${item.color}30` }} />}
                </div>
                <div className="pb-8 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 text-xs font-mono rounded-full" style={{ backgroundColor: `${item.color}20`, color: item.color }}>{item.year}</span>
                  </div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-sm text-cyan-400 mb-1">{item.role}</p>
                  <p className="text-sm text-slate-400">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Resources */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-2">Resources</h2>
        <p className="text-slate-500 mb-8">Templates, blueprints, and guides from my work in AI enablement.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((res, i) => {
            const Icon = iconMap[res.icon] || FileText;
            return (
              <motion.div key={res.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-cyan-500/30 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-sm">{res.title}</h3>
                      <span className="px-2 py-0.5 text-[10px] bg-violet-500/10 text-violet-400 rounded-full border border-violet-500/20">{res.type}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{res.description}</p>
                  </div>
                  <Download className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Languages */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Languages</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { name: "English", level: "Native" },
            { name: "Malayalam", level: "Native" },
            { name: "Hindi", level: "Professional" },
            { name: "Tamil", level: "Professional" },
            { name: "Kannada", level: "Professional" },
          ].map((lang) => (
            <div key={lang.name} className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <span className="font-medium text-sm">{lang.name}</span>
              <span className="text-xs text-slate-500 ml-2">{lang.level}</span>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
