"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  /** "words" splits by word, "chars" splits character by character */
  split?: "words" | "chars";
  delay?: number;
  stagger?: number;
  className?: string;
  wordClassName?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

/**
 * Animated text component that reveals words or characters with a staggered enter animation.
 * Each word/char slides up from a clip mask for a premium reveal feel.
 */
export default function SplitText({
  text,
  split = "words",
  delay = 0,
  stagger = 0.06,
  className,
  wordClassName,
  as: Tag = "div",
}: SplitTextProps) {
  const units = split === "words" ? text.split(" ") : text.split("");

  return (
    <Tag className={className}>
      <motion.span
        style={{ display: "flex", flexWrap: "wrap", gap: split === "words" ? "0.25em" : "0" }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: stagger,
              delayChildren: delay,
            },
          },
        }}
        aria-label={text}
      >
        {units.map((unit, i) => (
          <span
            key={i}
            style={{
              overflow: "hidden",
              display: "inline-block",
              paddingRight: "0.1em",
              paddingBottom: "0.08em",
              verticalAlign: "bottom",
            }}
            aria-hidden="true"
          >
            <motion.span
              style={{ display: "inline-block" }}
              className={wordClassName}
              variants={{
                hidden: { y: "110%", opacity: 0 },
                visible: {
                  y: "0%",
                  opacity: 1,
                  transition: {
                    duration: 0.75,
                    ease: "easeOut" as const,
                  },
                },
              }}
            >
              {unit}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
