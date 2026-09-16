"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline";
  className?: string;
  role?: string;
}

/**
 * Small pill/badge component for skill tags and tech stack labels.
 */
export default function Badge({ children, variant = "default", className, role }: BadgeProps) {
  return (
    <span
      role={role}
      className={cn(
        "badge",
        variant === "accent" && "badge--accent",
        variant === "outline" && "badge--outline",
        className
      )}
    >
      {children}
    </span>
  );
}
