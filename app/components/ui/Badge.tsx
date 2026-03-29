"use client";

import { cn } from "../../../lib/utils";

export type BadgeVariant = "cyan" | "teal" | "slate" | "ghost";
export type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  mono?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  teal: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  slate: "bg-white/[0.05] text-slate-300 border-white/[0.10]",
  ghost: "bg-transparent text-slate-400 border-transparent",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "text-[10px] px-2 py-0.5",
  md: "text-xs px-2.5 py-1",
  lg: "text-sm px-3 py-1.5",
};

export function Badge({
  children,
  variant = "cyan",
  size = "md",
  className,
  mono = true,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        mono && "font-mono uppercase tracking-wide",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}

// Category badge (used for article/project categories)
interface CategoryBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function CategoryBadge({ children, className }: CategoryBadgeProps) {
  return (
    <Badge variant="cyan" size="sm" className={className}>
      {children}
    </Badge>
  );
}

// Status badge (active, inactive, pending, etc.)
interface StatusBadgeProps {
  status: "active" | "inactive" | "pending" | "error";
  children?: React.ReactNode;
  className?: string;
}

export function StatusBadge({
  status,
  children,
  className,
}: StatusBadgeProps) {
  const statusConfig = {
    active: { variant: "teal" as const, dot: true },
    inactive: { variant: "slate" as const, dot: false },
    pending: { variant: "cyan" as const, dot: true },
    error: { variant: "cyan" as const, dot: true }, // cyan for error to stay in palette
  };

  const config = statusConfig[status];
  const label = children || status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <Badge variant={config.variant} size="sm" className={className}>
      {config.dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse",
            config.variant === "teal" ? "bg-teal-400" : "bg-cyan-400"
          )}
        />
      )}
      {label}
    </Badge>
  );
}

// Metric badge for small stats
interface MetricBadgeProps {
  value: string | number;
  label: string;
  trend?: "up" | "down";
  className?: string;
}

export function MetricBadge({
  value,
  label,
  trend,
  className,
}: MetricBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08]",
        className
      )}
    >
      <span className="text-sm font-bold text-white">{value}</span>
      <span className="text-xs text-slate-400">{label}</span>
      {trend && (
        <span
          className={cn(
            "text-xs",
            trend === "up" ? "text-teal-400" : "text-rose-400"
          )}
        >
          {trend === "up" ? "↑" : "↓"}
        </span>
      )}
    </div>
  );
}
