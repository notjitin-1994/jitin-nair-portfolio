"use client";

import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

export type CardVariant = "default" | "featured" | "compact" | "ghost" | "spotlight";

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  className?: string;
  hover?: boolean;
  animate?: boolean;
  delay?: number;
  onClick?: () => void;
  as?: "div" | "article" | "button" | "a";
  href?: string;
}

const variantStyles: Record<CardVariant, string> = {
  default:
    "rounded-2xl bg-white/[0.03] border border-white/[0.08] p-6 hover:border-cyan-500/30 hover:bg-white/[0.05]",
  featured:
    "rounded-2xl bg-white/[0.05] border border-cyan-500/20 p-8 hover:border-cyan-500/40 hover:bg-white/[0.07]",
  compact:
    "rounded-xl bg-white/[0.02] border border-white/[0.08] p-4 hover:border-cyan-500/20 hover:bg-white/[0.04]",
  ghost:
    "rounded-xl bg-transparent border border-transparent hover:bg-white/[0.03] hover:border-white/[0.06] p-4",
  spotlight:
    "rounded-2xl bg-white/[0.03] border border-white/[0.08] p-6 spotlight-card",
};

const hoverStyles =
  "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer";

export function Card({
  children,
  variant = "default",
  className,
  hover = true,
  animate = false,
  delay = 0,
  onClick,
  as: Component = "div",
  href,
}: CardProps) {
  const baseClasses = cn(
    variantStyles[variant],
    hover && variant !== "ghost" && hoverStyles,
    onClick && "cursor-pointer",
    className
  );

  const content = (
    <Component
      className={baseClasses}
      onClick={onClick}
      {...(href ? { href } : {})}
    >
      {children}
    </Component>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.5,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}

// Card subcomponents for consistent composition
Card.Header = function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("mb-4", className)}>{children}</div>;
};

Card.Title = function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn("text-lg font-bold text-white leading-tight", className)}>
      {children}
    </h3>
  );
};

Card.Description = function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-sm text-slate-400 leading-relaxed", className)}>
      {children}
    </p>
  );
};

Card.Footer = function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mt-4 pt-4 border-t border-white/[0.06]", className)}>
      {children}
    </div>
  );
};

Card.Content = function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("", className)}>{children}</div>;
};

// Featured card with icon
interface FeaturedCardProps extends Omit<CardProps, "variant"> {
  icon: React.ReactNode;
  title: string;
  description: string;
  meta?: React.ReactNode;
  action?: React.ReactNode;
}

export function FeaturedCard({
  icon,
  title,
  description,
  meta,
  action,
  className,
  ...props
}: FeaturedCardProps) {
  return (
    <Card variant="featured" className={className} {...props}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <Card.Title className="mb-2">{title}</Card.Title>
          <Card.Description>{description}</Card.Description>
          {meta && <div className="mt-3 flex items-center gap-2">{meta}</div>}
        </div>
      </div>
      {action && <Card.Footer>{action}</Card.Footer>}
    </Card>
  );
}

// Compact card for lists/grids
interface CompactCardProps extends Omit<CardProps, "variant"> {
  label?: string;
  labelVariant?: "cyan" | "teal";
  title: string;
  description?: string;
  meta?: React.ReactNode;
}

export function CompactCard({
  label,
  labelVariant = "cyan",
  title,
  description,
  meta,
  className,
  ...props
}: CompactCardProps) {
  return (
    <Card variant="compact" className={className} {...props}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {label && (
            <span
              className={cn(
                "inline-block mb-2 text-[10px] font-mono uppercase tracking-wide rounded-full px-2 py-0.5",
                labelVariant === "cyan"
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  : "bg-teal-500/10 text-teal-400 border border-teal-500/20"
              )}
            >
              {label}
            </span>
          )}
          <h4 className="font-bold text-white text-sm leading-tight mb-1">
            {title}
          </h4>
          {description && (
            <p className="text-xs text-slate-400 line-clamp-2">{description}</p>
          )}
        </div>
        {meta && <div className="flex-shrink-0">{meta}</div>}
      </div>
    </Card>
  );
}

// Resource/Download card
interface ResourceCardProps extends Omit<CardProps, "variant"> {
  icon: React.ReactNode;
  title: string;
  description: string;
  type: string;
  onDownload?: () => void;
}

export function ResourceCard({
  icon,
  title,
  description,
  type,
  onDownload,
  className,
  ...props
}: ResourceCardProps) {
  return (
    <Card
      variant="default"
      className={cn("group cursor-pointer", className)}
      onClick={onDownload}
      {...props}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/20 transition-colors">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-sm text-white">{title}</h3>
            <span className="px-2 py-0.5 text-[10px] bg-teal-500/10 text-teal-400 rounded-full border border-teal-500/20">
              {type}
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
}

// Metric card for stats display
interface MetricCardProps extends Omit<CardProps, "variant"> {
  value: string | number;
  label: string;
  unit?: string;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  color?: "cyan" | "teal";
}

export function MetricCard({
  value,
  label,
  unit,
  trend,
  trendValue,
  color = "cyan",
  className,
  ...props
}: MetricCardProps) {
  const colorClasses = {
    cyan: "text-cyan-400",
    teal: "text-teal-400",
  };

  const trendColors = {
    up: "text-teal-400",
    down: "text-rose-400",
    stable: "text-slate-400",
  };

  return (
    <Card
      variant="compact"
      className={cn("text-center", className)}
      hover={false}
      {...props}
    >
      <div className={cn("text-2xl font-bold mb-1", colorClasses[color])}>
        {value}
        {unit && <span className="text-sm ml-1">{unit}</span>}
      </div>
      <div className="text-xs text-slate-400 mb-2">{label}</div>
      {trend && trendValue && (
        <div className={cn("text-xs font-mono", trendColors[trend])}>
          {trend === "up" && "↑"}
          {trend === "down" && "↓"}
          {trend === "stable" && "→"} {trendValue}
        </div>
      )}
    </Card>
  );
}
