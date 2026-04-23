"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  id?: string;
}

/**
 * A high-performance, aesthetic reveal component for landing page sections.
 * Uses Framer Motion's whileInView for performant intersection observation.
 */
export default function LazySection({ children, id }: LazySectionProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px 200px 0px" }} // Load slightly before coming into view for speed
      transition={{
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98], // Aesthetic smooth deceleration
      }}
      style={{ 
        willChange: "transform, opacity, filter",
        contentVisibility: "auto",
        containIntrinsicSize: "0 800px" 
      }}
    >
      {children}
    </motion.div>
  );
}
