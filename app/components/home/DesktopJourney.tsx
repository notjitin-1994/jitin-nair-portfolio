"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Bot, VideoIcon, Users, Headphones, GraduationCap } from "lucide-react";
import { JourneyCard } from "./shared";

export function DesktopJourney() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth spring animation for progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform for progress line height
  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const journeyData = [
    {
      year: "2025",
      title: "AI Systems Architect",
      role: "Independent Consultant",
      period: "March 2025 - Present",
      description: "Architecting sophisticated multi-agent orchestration platforms and autonomous systems. Engineered institutional-grade infrastructure including high-frequency trading engines (Predator), distributed governance frameworks (Reality-Check), and AI-native learning ecosystems (SmartSlate). Specialized in LangGraph and Model Context Protocol (MCP) to enable seamless tool-sharing and truth-verified agentic autonomy.",
      highlights: ["Multi-Agent Orchestration", "HFT Engine Architecture", "MCP Tool Integration"],
      icon: Bot,
      bgImage: "/journey-ai.jpg",
      gradient: "from-cyan-500/20 to-blue-500/20"
    },
    {
      year: "2022",
      title: "Instructional Designer",
      role: "Moody's Ratings",
      period: "Sept 2022 - Mar 2025",
      description: "Led video-based learning production for global ratings agency. Built scalable content pipelines and automated workflows, reducing production time by 60% while maintaining 90%+ completion rates for complex financial curriculum.",
      highlights: ["60% Production Save", "90%+ Completion", "Global L&D Scale"],
      icon: VideoIcon,
      bgImage: "/journey-finance.jpg",
      gradient: "from-emerald-500/20 to-teal-500/20"
    },
    {
      year: "2019",
      title: "Instructor Analyst",
      role: "Accenture",
      period: "Jan 2019 - Sept 2022",
      description: "Managed L&D for 300+ employees. Developed hybrid learning models that reduced training time by 70% while maintaining retention, saving ~$140K. Engineered a 1,400+ line VBA automation suite for pan-India TNA audits.",
      highlights: ["$140K Cost Savings", "70% Time Reduction", "VBA Audit Engine"],
      icon: Users,
      bgImage: "/journey-training.jpg",
      gradient: "from-teal-500/20 to-cyan-500/20"
    },
    {
      year: "2015",
      title: "Senior Executive",
      role: "247.ai",
      period: "May 2015 - Dec 2017",
      description: "Managed back-end support for a US retail giant, ensuring seamless buyer-seller experiences. Recognized as 3x Top Performer and identified for the leadership track within 24 months for excellence in process training and problem solving.",
      highlights: ["3x Top Performer", "Leadership Track", "Customer Success"],
      icon: Headphones,
      bgImage: "/journey-support.jpg",
      gradient: "from-cyan-500/20 to-emerald-500/20"
    },
    {
      year: "2015",
      title: "Bachelor of Commerce",
      role: "Sindhi College",
      period: "2012 - 2015",
      description: "Developed foundation in business administration and systems logic. Self-taught programmer during college years, architecting early web applications and automated business tools.",
      highlights: ["Self-Taught Dev", "Business Logic", "Analytical Core"],
      icon: GraduationCap,
      bgImage: "/journey-edu.jpg",
      gradient: "from-emerald-500/20 to-cyan-500/20"
    }
  ];

  // Background gradient animation based on scroll
  const bgGradient = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [
      "radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)",
      "radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)",
      "radial-gradient(circle at 50% 100%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)"
    ]
  );

  return (
    <section ref={containerRef} className="py-6 md:py-8 px-6 relative">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: bgGradient
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-left mb-20"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4"
          >
            The Path Here
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6 pb-2 bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent"
          >
            Journey So Far
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-slate-400 max-w-2xl text-lg"
          >
            10 years. 4 roles. From customer support to AI architecture -
            every step built the foundation for what comes next.
          </motion.p>
        </motion.div>

        {/* Scroll-Based Timeline */}
        <div className="relative">
          {/* Progress Line Container */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1">
            {/* Background Track */}
            <div className="absolute inset-0 bg-white/[0.05] rounded-full" />
            {/* Animated Progress Fill */}
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-cyan-400 via-cyan-300 to-cyan-500 rounded-full"
              style={{
                height: progressHeight,
                boxShadow: "0 0 20px rgba(34, 211, 238, 0.5)"
              }}
            />
          </div>

          {/* Journey Items */}
          <div className="space-y-16 md:space-y-24">
            {journeyData.map((item, index) => (
              <JourneyCard
                key={item.year + item.title}
                item={item}
                index={index}
                isLast={index === journeyData.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
     </section>
  );
}
