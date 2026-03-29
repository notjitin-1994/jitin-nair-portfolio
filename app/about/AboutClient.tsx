"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageLayout } from "../components/PageLayout";
import { skillsData } from "../data/skillsData";
import { resources } from "../data/resources";
import {
  Section,
  SectionHeader,
  Card,
  Badge,
  fadeInUp,
} from "../components/ui";
import {
  Brain,
  Code2,
  ChevronDown,
  Download,
  FileText,
  Network,
  CheckSquare,
  Users,
  Video,
  Award,
  Headphones,
  GraduationCap,
  MapPin,
  Calendar,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  Network,
  CheckSquare,
  Users,
};

// Journey data with cyan/teal colors only
const journey = [
  {
    year: "2025",
    title: "Independent — AI Systems Architect",
    role: "Agentic AI & Automation",
    description: "200+ autonomous agents, multi-agent orchestration, Reality-Check governance",
    icon: Brain,
    color: "#22d3ee",
  },
  {
    year: "2022",
    title: "Moody's Ratings",
    role: "Instructional Designer",
    description: "Video production automation, 1000+ hours saved annually, global L&D",
    icon: Video,
    color: "#14b8a6",
  },
  {
    year: "2019",
    title: "Accenture",
    role: "Instructor Analyst → Analyst",
    description: "Promoted in 9 months, Fortune 500 training, $140K cost savings",
    icon: Award,
    color: "#22d3ee",
  },
  {
    year: "2017",
    title: "247.ai — Electronic Arts",
    role: "Senior Executive",
    description: "QA automation, mobile app testing, top performer 3x consecutive",
    icon: Headphones,
    color: "#14b8a6",
  },
  {
    year: "2015",
    title: "Sindhi College — B.Com",
    role: "Commerce Graduate",
    description: "Business foundation, self-taught programming",
    icon: GraduationCap,
    color: "#22d3ee",
  },
];

export default function AboutClient() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    skillsData[0]?.title || null
  );

  return (
    <PageLayout>
      {/* Hero Section */}
      <Section withAurora className="pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mono-label-cyan mb-4">About Me</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            The Human Behind the Agents
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl">
            From commerce grad to AI architect — 10 years of building learning
            systems and autonomous agents. Based in Bangalore, India.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <div className="flex items-center gap-2 text-slate-400">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span className="text-sm">Bangalore, India</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Calendar className="w-4 h-4 text-teal-400" />
              <span className="text-sm">10+ Years Experience</span>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Skills Matrix */}
      <Section className="py-16 border-t border-white/[0.08]">
        <SectionHeader
          title="Skills Matrix"
          description={`${skillsData.reduce(
            (acc, cat) => acc + cat.skills.length,
            0
          )} skills across ${skillsData.length} domains`}
        />

        <div className="space-y-3">
          {skillsData.map((category) => {
            const isExpanded = expandedCategory === category.title;
            return (
              <motion.div
                key={category.title}
                layout
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedCategory(isExpanded ? null : category.title)
                  }
                  className="w-full flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-white">{category.title}</h3>
                      <p className="text-xs text-slate-500">
                        {category.skills.length} skills
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {category.skills.map((skill) => (
                          <div
                            key={skill.name}
                            className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium text-slate-200">
                                {skill.name}
                              </span>
                              <span
                                className="text-xs font-mono"
                                style={{ color: category.color }}
                              >
                                {skill.level}%
                              </span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: category.color }}
                              />
                            </div>
                            <p className="text-[11px] text-slate-500 mt-1.5">
                              {skill.description}
                            </p>
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
      </Section>

      {/* Career Timeline */}
      <Section className="py-16 border-t border-white/[0.08]">
        <SectionHeader
          title="Career Timeline"
          description="A decade of evolution from support to AI architecture"
        />

        <div className="space-y-6">
          {journey.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.year + item.title}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border-2"
                    style={{
                      borderColor: item.color,
                      backgroundColor: `${item.color}15`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  {i < journey.length - 1 && (
                    <div
                      className="w-px flex-1 mt-2"
                      style={{ backgroundColor: `${item.color}30` }}
                    />
                  )}
                </div>
                <div className="pb-8 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant={i % 2 === 0 ? "cyan" : "teal"}
                      size="sm"
                    >
                      {item.year}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p
                    className="text-sm mb-1"
                    style={{ color: item.color }}
                  >
                    {item.role}
                  </p>
                  <p className="text-sm text-slate-400">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Resources */}
      <Section className="py-16 border-t border-white/[0.08]">
        <SectionHeader
          title="Resources"
          description="Templates, blueprints, and guides from my work in AI enablement."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((res, i) => {
            const Icon = iconMap[res.icon] || FileText;
            return (
              <motion.div
                key={res.title}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
              >
                <Card variant="ghost" hover className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-sm text-slate-200">
                          {res.title}
                        </h3>
                        <Badge variant="teal" size="sm">
                          {res.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {res.description}
                      </p>
                    </div>
                    <Download className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Languages */}
      <Section className="py-16 border-t border-white/[0.08]">
        <SectionHeader
          title="Languages"
          description="Multilingual communication for global collaboration"
        />

        <div className="flex flex-wrap gap-3">
          {[
            { name: "English", level: "Native" },
            { name: "Malayalam", level: "Native" },
            { name: "Hindi", level: "Professional" },
            { name: "Tamil", level: "Professional" },
            { name: "Kannada", level: "Professional" },
          ].map((lang) => (
            <div
              key={lang.name}
              className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/30 transition-colors"
            >
              <span className="font-medium text-sm text-slate-200">
                {lang.name}
              </span>
              <span className="text-xs text-slate-500 ml-2">{lang.level}</span>
            </div>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
