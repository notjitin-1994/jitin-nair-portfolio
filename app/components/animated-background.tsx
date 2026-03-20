"use client";

import React from "react";
import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0d0d12] to-[#0a0a0f]" />
      
      {/* Animated orbs - super slow and smooth */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.08]"
        style={{
          background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{
          x: ["-20%", "60%", "-20%"],
          y: ["10%", "40%", "10%"],
        }}
        transition={{
          duration: 60,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #10b981 0%, transparent 70%)",
          filter: "blur(80px)",
          right: "-10%",
          top: "20%",
        }}
        animate={{
          x: ["0%", "-40%", "0%"],
          y: ["0%", "30%", "0%"],
        }}
        transition={{
          duration: 45,
          ease: "linear",
          repeat: Infinity,
          delay: 5,
        }}
      />
      
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)",
          filter: "blur(60px)",
          left: "30%",
          bottom: "-10%",
        }}
        animate={{
          x: ["0%", "20%", "0%"],
          y: ["0%", "-20%", "0%"],
        }}
        transition={{
          duration: 50,
          ease: "linear",
          repeat: Infinity,
          delay: 10,
        }}
      />

      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
