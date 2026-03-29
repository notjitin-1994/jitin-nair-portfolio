"use client";

import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading,
  leftIcon,
  rightIcon,
  fullWidth,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = cn(
    "inline-flex items-center justify-center gap-2 font-medium",
    "transition-all duration-200",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "btn-interactive",
    fullWidth && "w-full"
  );

  const variantStyles: Record<ButtonVariant, string> = {
    primary: cn(
      "bg-gradient-to-r from-cyan-500 to-teal-500 text-white",
      "hover:from-cyan-400 hover:to-teal-400",
      "shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40",
      "border-0"
    ),
    secondary: cn(
      "bg-white/[0.08] text-slate-200",
      "hover:bg-white/[0.12] hover:text-white",
      "border border-white/[0.12] hover:border-cyan-500/30"
    ),
    ghost: cn(
      "bg-transparent text-slate-400",
      "hover:bg-white/[0.05] hover:text-slate-200"
    ),
    outline: cn(
      "bg-transparent text-cyan-400",
      "border border-cyan-500/30",
      "hover:bg-cyan-500/10 hover:border-cyan-500/50"
    ),
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-sm rounded-xl",
    lg: "px-8 py-4 text-base rounded-xl",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!isLoading && leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
}

// Icon button for compact actions
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function IconButton({
  icon,
  variant = "ghost",
  size = "md",
  isLoading,
  className,
  disabled,
  ...props
}: IconButtonProps) {
  const sizeStyles = {
    sm: "w-8 h-8 rounded-lg",
    md: "w-10 h-10 rounded-xl",
    lg: "w-12 h-12 rounded-xl",
  };

  const variantStyles = {
    primary: "bg-cyan-500 text-white hover:bg-cyan-400",
    secondary: "bg-white/[0.08] text-slate-300 hover:bg-white/[0.12] hover:text-white",
    ghost: "bg-transparent text-slate-400 hover:bg-white/[0.05] hover:text-slate-200",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center",
        "transition-all duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "btn-interactive",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
    </button>
  );
}

// Link component with consistent styling
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "default" | "subtle" | "underline" | "gradient";
  external?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Link({
  children,
  variant = "default",
  external,
  leftIcon,
  rightIcon,
  className,
  ...props
}: LinkProps) {
  const variantStyles: Record<string, string> = {
    default: cn(
      "text-cyan-400 hover:text-cyan-300",
      "transition-colors duration-200"
    ),
    subtle: cn(
      "text-slate-400 hover:text-slate-200",
      "transition-colors duration-200"
    ),
    underline: cn(
      "text-cyan-400 link-underline",
      "hover:text-cyan-300"
    ),
    gradient: cn(
      "gradient-text hover:opacity-80",
      "transition-opacity duration-200"
    ),
  };

  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  const externalIcon = external && (
    <svg
      className="w-3 h-3 opacity-60"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );

  return (
    <a
      className={cn(
        "inline-flex items-center gap-1.5",
        variantStyles[variant],
        className
      )}
      {...externalProps}
      {...props}
    >
      {leftIcon}
      {children}
      {externalIcon}
      {rightIcon}
    </a>
  );
}

// CTA Button group for hero sections
interface CTAGroupProps {
  primary?: {
    label: string;
    href: string;
    external?: boolean;
  };
  secondary?: {
    label: string;
    href: string;
    external?: boolean;
  };
  className?: string;
}

export function CTAGroup({ primary, secondary, className }: CTAGroupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={cn("flex flex-wrap gap-4", className)}
    >
      {primary && (
        <a
          href={primary.href}
          {...(primary.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <Button
            variant="primary"
            size="lg"
            rightIcon={
              primary.external ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              ) : undefined
            }
          >
            {primary.label}
          </Button>
        </a>
      )}
      {secondary && (
        <a
          href={secondary.href}
          {...(secondary.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <Button variant="secondary" size="lg">
            {secondary.label}
          </Button>
        </a>
      )}
    </motion.div>
  );
}

// Note: Button "asChild" support requires additional implementation
// For now, we'll export a ButtonLink component for link buttons
interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  external,
  leftIcon,
  rightIcon,
  fullWidth,
  className,
}: ButtonLinkProps) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a href={href} {...externalProps}>
      <Button
        variant={variant}
        size={size}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        fullWidth={fullWidth}
        className={className}
      >
        {children}
      </Button>
    </a>
  );
}
