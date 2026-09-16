"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import SplitText from "@/components/animations/SplitText";
import Button from "@/components/ui/Button";
import { smoothScrollTo } from "@/lib/utils";

// Lazy-load the 3D scene for performance
const Scene = lazy(() => import("@/components/three/Scene"));

/**
 * Hero section — name reveal, role tagline, CTA buttons, 3D scene, scroll indicator.
 */
export default function Hero() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  const scrollToProjects = () => {
    smoothScrollTo("#projects", -80);
  };

  const scrollToContact = () => {
    smoothScrollTo("#contact", -80);
  };

  return (
    <section id="hero" className="hero" aria-label="Hero section">
      {/* 3D Scene — full-bleed behind content */}
      {!reducedMotion && (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      )}

      {/* Content */}
      <div className="hero__content">
        <div className="hero__left">
          {/* Eyebrow badge */}
          <motion.div
            className="hero__eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            Available for Work
          </motion.div>

          {/* Main headline — word-by-word reveal */}
          <h1 className="hero__title" aria-label="Muhammad Arslan Rasheed">
            <SplitText
              text="Muhammad"
              split="words"
              delay={0.8}
              stagger={0.1}
              className="hero__title-line hero__title-line--first"
            />
            <SplitText
              text="Arslan"
              split="words"
              delay={1.0}
              stagger={0.1}
              className="hero__title-line hero__title-line--accent"
            />
            <SplitText
              text="Rasheed"
              split="words"
              delay={1.2}
              stagger={0.1}
              className="hero__title-line hero__title-line--last"
            />
          </h1>

          {/* Role tagline */}
          <motion.p
            className="hero__tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.5 }}
          >
            Full-Stack MERN Developer
            <span className="hero__tagline-separator" aria-hidden="true"> · </span>
            Web3 &amp; SaaS Platforms
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.7 }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={scrollToProjects}
              aria-label="View my work — scroll to projects"
            >
              View Work
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToContact}
              aria-label="Contact me — scroll to contact form"
            >
              Contact Me
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="hero__stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.0 }}
            aria-label="Quick stats"
          >
            {[
              { value: "2+", label: "Years Experience" },
              { value: "8+", label: "Projects Shipped" },
              { value: "3", label: "Web3 Platforms" },
            ].map((stat) => (
              <div key={stat.label} className="hero__stat">
                <span className="hero__stat-value">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown size={20} aria-hidden="true" />
        </motion.div>
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}
