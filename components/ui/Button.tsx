"use client";

import { useRef, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
}

/**
 * Premium button with magnetic hover effect and micro-animation.
 */
export default function Button({
  children,
  onClick,
  href,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  disabled,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  // Magnetic hover effect
  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    };

    const handleMouseLeave = () => {
      el.style.transform = "translate(0, 0)";
      el.style.transition = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
      setTimeout(() => {
        if (el) el.style.transition = "";
      }, 400);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const classes = cn(
    "btn",
    variant === "primary" && "btn--accent",
    variant === "outline" && "btn--outline",
    variant === "ghost" && "btn--ghost",
    size === "sm" && "btn--sm",
    size === "lg" && "btn--lg",
    className
  );

  if (href) {
    return (
      <motion.a
        ref={btnRef as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        aria-label={ariaLabel}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={btnRef as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}
