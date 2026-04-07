"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { PageLayout } from "../components/PageLayout";
import { projectsData } from "../data/projects";
import {
  Section,
  SectionHeader,
  FilterTabs,
  FilterContainer,
  Card,
  Badge,
  fadeInUp,
} from "../components/ui";

const categories = ["All", "AI Automation", "Agentic Systems", "Full-Stack"];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <PageLayout>
      {/* Hero Section */}
      <Section withAurora className="pt-24 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mono-label-cyan mb-4">
            Portfolio
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Featured Projects
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl">
            Production systems with measurable outcomes. Each project solves
            real problems and delivers quantifiable results across AI
            automation, multi-agent orchestration, and full-stack development.
          </p>
        </motion.div>
      </Section>

      {/* Projects Grid */}
      <Section className="py-10 md:py-12">
        <FilterContainer
          totalCount={projectsData.length}
          filteredCount={filteredProjects.length}
        >
          <FilterTabs
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </FilterContainer>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/projects/${project.id}`}>
                <Card variant="default" hover className="h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex items-center justify-center w-10 h-10 rounded-lg text-lg font-bold"
                        style={{
                          backgroundColor: `${project.theme.primary}20`,
                          color: project.theme.primary,
                        }}
                      >
                        {project.number}
                      </span>
                      <Badge variant="cyan" size="sm">
                        {project.category}
                      </Badge>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-sm text-slate-500 mb-1">
                    {project.client} — {project.industry}
                  </p>

                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {project.challenge.slice(0, 120)}...
                  </p>

                  {/* Results */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {project.results.slice(0, 4).map((result, i) => (
                      <div
                        key={i}
                        className="text-center p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                      >
                        <div className="text-lg font-bold text-cyan-400">
                          {result.value}
                        </div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wide">
                          {result.metric}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono bg-white/[0.05] text-slate-400 rounded border border-white/[0.08]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="px-2 py-0.5 text-[10px] text-slate-500">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* CTA Section */}
      <Section className="py-10 md:py-12 border-t border-white/[0.08]">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            title="Ready to build something exceptional?"
            description="Let's discuss how AI systems can transform your operations."
            align="center"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-white font-medium hover:bg-cyan-400 transition-colors"
            >
              Start a Project
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </Section>
    </PageLayout>
  );
}
