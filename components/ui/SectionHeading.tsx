"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
}

/**
 * Reusable section heading with eyebrow label, large title and optional subtitle.
 * Animates in from below when the section enters the viewport.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <motion.div
      className={cn(
        "section-heading",
        align === "center" && "section-heading--center",
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
    >
      {eyebrow && (
        <motion.span
          className="section-heading__eyebrow"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: "easeOut" as const },
            },
          }}
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        id={id}
        className="section-heading__title"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: "easeOut" as const },
          },
        }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="section-heading__subtitle"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: "easeOut" as const },
            },
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
