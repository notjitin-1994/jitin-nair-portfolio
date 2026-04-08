"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Quote,
  Github,
  ExternalLink,
} from "lucide-react";
import { PageLayout } from "../../components/PageLayout";
import { Project } from "../../data/projects";
import {
  Section,
  Card,
  Badge,
  fadeInUp,
  staggerContainer,
} from "../../components/ui";

interface ProjectDetailClientProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

export function ProjectDetailClient({
  project,
  prevProject,
  nextProject,
}: ProjectDetailClientProps) {
  return (
    <PageLayout>
      {/* Hero Section */}
      <Section className="pt-12 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4 mt-4">
            <Badge variant="cyan">{project.category}</Badge>
            <span className="text-sm text-slate-500">
              {project.industry} — {project.duration}
            </span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <span
              className="flex items-center justify-center w-16 h-16 rounded-2xl text-2xl font-bold"
              style={{
                backgroundColor: `${project.theme.primary}20`,
                color: project.theme.primary,
              }}
            >
              {project.number}
            </span>
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {project.name}
              </h1>
              <p className="text-slate-400 mt-1">{project.client}</p>
            </div>
          </div>

          <p className="text-lg text-slate-400 max-w-3xl">
            {project.tagline}
          </p>
        </motion.div>
      </Section>

      {/* Results Grid */}
      <Section className="py-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {project.results.map((result, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              transition={{ delay: i * 0.1 }}
            >
              <Card variant="compact" hover={false} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">
                  {result.value}
                </div>
                <div className="text-sm text-slate-400">{result.metric}</div>
                {result.context && (
                  <div className="text-xs text-slate-500 mt-1">
                    {result.context}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Challenge & Solution */}
      <Section className="py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card variant="compact" className="h-full border-l-4 border-l-rose-500/50">
              <h3 className="text-lg font-bold mb-3 text-rose-400">
                The Challenge
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {project.challenge}
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card
              variant="compact"
              className="h-full border-l-4 border-l-cyan-500"
            >
              <h3 className="text-lg font-bold mb-3 text-cyan-400">
                The Solution
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {project.solution}
              </p>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* What It Does */}
      <Section className="py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">What It Does</h2>
          <Card variant="default">
            <p className="text-slate-400 leading-relaxed">
              {project.whatItDoes}
            </p>
          </Card>
        </motion.div>
      </Section>

      {/* How It Works */}
      <Section className="py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
          <Card variant="default">
            <p className="text-slate-400 leading-relaxed mb-6">
              {project.howItWorks}
            </p>

            {/* Process Flow */}
            <h3 className="text-lg font-bold text-white mb-4">
              Process Flow
            </h3>
            <div className="space-y-3">
              {project.processFlow.map((step, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-lg bg-white/[0.03]"
                >
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold flex-shrink-0"
                    style={{
                      backgroundColor: `${project.theme.primary}20`,
                      color: project.theme.primary,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-slate-300">{step}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* Key Innovations */}
      <Section className="py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Key Innovations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.keyInnovations.map((innovation, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card variant="compact" className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-0.5">→</span>
                  <span className="text-slate-300">{innovation}</span>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Technologies */}
      <Section className="py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Technologies Used
          </h2>
          <Card variant="default">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-sm font-mono bg-white/[0.05] text-slate-300 rounded-lg border border-white/[0.08] hover:border-cyan-500/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* Metrics */}
      <Section className="py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Performance Metrics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.metrics.map((metric) => (
              <Card key={metric.id} variant="compact" className="text-center">
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ color: metric.color }}
                >
                  {metric.value}
                  <span className="text-sm ml-1">{metric.unit}</span>
                </div>
                <div className="text-sm text-slate-300 mb-1">
                  {metric.label}
                </div>
                <div className="text-xs text-slate-500">
                  {metric.description}
                </div>
                {metric.trend && (
                  <div
                    className={`text-xs font-mono mt-2 ${
                      metric.trend === "up"
                        ? "text-teal-400"
                        : metric.trend === "down"
                        ? "text-rose-400"
                        : "text-slate-400"
                    }`}
                  >
                    {metric.trend === "up" && "↑"}
                    {metric.trend === "down" && "↓"}
                    {metric.trend === "stable" && "→"} {metric.trendValue}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Testimonial */}
      {project.testimonial && (
        <Section className="py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card
              variant="featured"
              className="relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <Quote className="w-10 h-10 text-cyan-400/40 mb-4" />
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-6 italic relative z-10">
                &ldquo;{project.testimonial.quote}&rdquo;
              </p>
              <div className="relative z-10">
                <p className="text-sm font-bold text-white">
                  {project.testimonial.author}
                </p>
                <p className="text-xs text-slate-500">
                  {project.testimonial.role}, {project.testimonial.company}
                </p>
              </div>
            </Card>
          </motion.div>
        </Section>
      )}

      {/* Links */}
      <Section className="py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-4"
        >
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.08] text-slate-200 font-medium hover:bg-white/[0.12] transition-colors border border-white/[0.12]"
            >
              <Github className="w-4 h-4" />
              View on GitHub
              <ExternalLink className="w-3 h-3 opacity-50" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-white font-medium hover:bg-cyan-400 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Live Site
            </a>
          )}
        </motion.div>
      </Section>
    </PageLayout>
  );
}
