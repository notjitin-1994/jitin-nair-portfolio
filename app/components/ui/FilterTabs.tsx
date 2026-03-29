"use client";

import { cn } from "../../../lib/utils";
import { motion } from "framer-motion";

export interface FilterTabsProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
  className?: string;
  variant?: "default" | "compact" | "pills";
}

export function FilterTabs({
  categories,
  activeCategory,
  onSelect,
  className,
  variant = "default",
}: FilterTabsProps) {
  const baseClasses = cn(
    "flex flex-wrap gap-2",
    variant === "compact" && "gap-1.5",
    className
  );

  return (
    <div className={baseClasses} role="tablist" aria-label="Filter categories">
      {categories.map((category) => {
        const isActive = category === activeCategory;

        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            role="tab"
            aria-selected={isActive}
            className={cn(
              // Base styles
              "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]",

              // Variant styles
              variant === "default" && [
                isActive
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "bg-white/[0.03] text-slate-400 border border-white/[0.08] hover:bg-white/[0.06] hover:text-slate-200",
              ],

              variant === "compact" && [
                "px-3 py-1.5 text-xs",
                isActive
                  ? "bg-cyan-500/20 text-cyan-400"
                  : "text-slate-400 hover:text-slate-200",
              ],

              variant === "pills" && [
                "rounded-full border-0",
                isActive
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                  : "bg-white/[0.05] text-slate-400 hover:bg-white/[0.08] hover:text-slate-200",
              ],

              // Active indicator animation container
              "relative overflow-hidden"
            )}
          >
            {/* Active background animation */}
            {isActive && variant !== "pills" && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-cyan-500/10"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}

            <span className="relative z-10">{category}</span>
          </button>
        );
      })}
    </div>
  );
}

// Animated filter container with count
export interface FilterContainerProps {
  children: React.ReactNode;
  totalCount: number;
  filteredCount: number;
  className?: string;
}

export function FilterContainer({
  children,
  totalCount,
  filteredCount,
  className,
}: FilterContainerProps) {
  return (
    <div className={cn("mb-10", className)}>
      {children}
      <motion.p
        key={filteredCount}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-sm text-slate-500"
      >
        Showing{" "}
        <span className="text-slate-300 font-medium">{filteredCount}</span> of{" "}
        <span className="text-slate-300 font-medium">{totalCount}</span> items
      </motion.p>
    </div>
  );
}

// Quick filter chips for smaller lists
export interface QuickFiltersProps {
  options: { label: string; value: string; count?: number }[];
  selected: string;
  onSelect: (value: string) => void;
  className?: string;
}

export function QuickFilters({
  options,
  selected,
  onSelect,
  className,
}: QuickFiltersProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const isSelected = option.value === selected;

        return (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={cn(
              "group flex items-center gap-2 px-3 py-1.5 rounded-full text-sm",
              "transition-all duration-200",
              isSelected
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                : "bg-white/[0.03] text-slate-400 border border-white/[0.08] hover:border-white/[0.12]"
            )}
          >
            <span>{option.label}</span>
            {option.count !== undefined && (
              <span
                className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full",
                  isSelected
                    ? "bg-cyan-500/20 text-cyan-300"
                    : "bg-white/[0.08] text-slate-500 group-hover:text-slate-400"
                )}
              >
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
