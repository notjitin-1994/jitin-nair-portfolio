"use client";

import { cn } from "../../lib/utils";
import { motion, Variants } from "framer-motion";

// Animation variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  withAurora?: boolean;
  withSpotlight?: boolean;
}

export function Section({
  children,
  className,
  containerClassName,
  id,
  withAurora = false,
  withSpotlight = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-24 md:py-32 overflow-hidden",
        withSpotlight && "spotlight-section",
        className
      )}
    >
      {withAurora && <div className="aurora-bg" aria-hidden="true" />}
      <div
        className={cn(
          "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}

// Animated section wrapper with scroll-triggered animations
interface AnimatedSectionProps extends SectionProps {
  delay?: number;
  animation?: "fadeInUp" | "fadeIn" | "scaleIn";
}

export function AnimatedSection({
  children,
  delay = 0,
  animation = "fadeInUp",
  ...sectionProps
}: AnimatedSectionProps) {
  const variants = {
    fadeInUp,
    fadeIn,
    scaleIn,
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants[animation]}
      transition={{ delay }}
    >
      <Section {...sectionProps}>{children}</Section>
    </motion.div>
  );
}

// Section header with consistent styling
interface SectionHeaderProps {
  label?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  variant?: "default" | "large";
}

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  className,
  variant = "default",
}: SectionHeaderProps) {
  const alignClasses = {
    left: "text-left",
    center: "text-center mx-auto",
  };

  const maxWidthClasses = {
    left: "max-w-3xl",
    center: "max-w-3xl",
  };

  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        alignClasses[align],
        maxWidthClasses[align],
        className
      )}
    >
      {label && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-block mono-label-cyan mb-4"
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={cn(
          "font-bold tracking-tight text-white",
          variant === "large"
            ? "text-4xl md:text-5xl lg:text-6xl"
            : "text-3xl md:text-4xl"
        )}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={cn(
            "mt-4 text-slate-400 leading-relaxed",
            variant === "large" ? "text-lg md:text-xl" : "text-base md:text-lg"
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

// Divider with gradient
interface SectionDividerProps {
  className?: string;
  variant?: "default" | "gradient" | "dot";
}

export function SectionDivider({
  className,
  variant = "default",
}: SectionDividerProps) {
  const variants = {
    default: "border-t border-white/[0.08]",
    gradient:
      "h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent",
    dot: "flex items-center justify-center gap-2",
  };

  if (variant === "dot") {
    return (
      <div className={cn("py-8", className)}>
        <div className={variants[variant]}>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500/50" />
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
        </div>
      </div>
    );
  }

  return <div className={cn(variants[variant], className)} />;
}

// Content grid with consistent spacing
interface ContentGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
}

export function ContentGrid({
  children,
  className,
  columns = 3,
  gap = "md",
}: ContentGridProps) {
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className={cn("grid", columnClasses[columns], gapClasses[gap], className)}
    >
      {children}
    </motion.div>
  );
}

// Hero section with aurora background
interface HeroSectionProps {
  label?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
  minHeight?: boolean;
}

export function HeroSection({
  label,
  title,
  description,
  children,
  className,
  align = "center",
  minHeight = true,
}: HeroSectionProps) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
  };

  return (
    <Section
      withAurora
      className={cn(
        "relative flex flex-col justify-center",
        minHeight && "min-h-[60vh] md:min-h-[70vh]",
        className
      )}
      containerClassName={cn("flex flex-col", alignClasses[align])}
    >
      {label && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-block mono-label-cyan mb-6"
        >
          {label}
        </motion.span>
      )}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white max-w-5xl"
      >
        {title}
      </motion.h1>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={cn(
            "mt-6 text-lg md:text-xl text-slate-400 max-w-3xl",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </motion.p>
      )}
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10"
        >
          {children}
        </motion.div>
      )}
    </Section>
  );
}
