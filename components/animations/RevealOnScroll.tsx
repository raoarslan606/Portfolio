"use client";

import { motion, type EasingFunction } from "framer-motion";
import { ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

/**
 * Wraps children in a Framer Motion container that reveals them on scroll.
 * Respects `prefers-reduced-motion` via Framer Motion's built-in support.
 */
export default function RevealOnScroll({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className,
  once = true,
}: RevealOnScrollProps) {
  const directionMap: Record<string, { x?: number; y?: number }> = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
  };

  const initial = { opacity: 0, ...directionMap[direction] };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          delay,
          ease: "easeOut" as const,
        },
      }}
      viewport={{ once, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}
