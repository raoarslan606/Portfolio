"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { smoothScrollTo } from "@/lib/utils";

/**
 * Editorial Studio Hero Section (Wolfpixel Style)
 * - Faint "PORTFOLIO" background watermark text
 * - Left vertical rotated metadata tag
 * - Top metrics (+200 / +50)
 * - Clean geometric "Hello" headline
 * - High-contrast monochrome studio portrait
 * - "Scroll down ↓" indicators
 */
export default function Hero() {
  return (
    <section id="hero" className="studio-hero" aria-label="Hero section">
      {/* Background Watermark Typography */}
      <div className="studio-hero__watermark" aria-hidden="true">
        PORTFOLIO
      </div>

      <div className="studio-hero__container">
        {/* Left Vertical Indicator */}
        <div className="studio-hero__vertical-tag" aria-hidden="true">
          <span>Full-Stack Developer</span>
          <span className="studio-hero__vertical-dot">•</span>
          <span>2024</span>
        </div>

        {/* Hero Grid: Left Content + Right Portrait */}
        <div className="studio-hero__grid">
          {/* Left Column: Metrics & Headline */}
          <div className="studio-hero__left">
            {/* Top Metrics Row */}
            <motion.div
              className="studio-hero__metrics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="studio-hero__metric">
                <span className="studio-hero__metric-num">+200</span>
                <span className="studio-hero__metric-label">Components Built</span>
              </div>
              <div className="studio-hero__metric">
                <span className="studio-hero__metric-num">+50</span>
                <span className="studio-hero__metric-label">Features Shipped</span>
              </div>
              <div className="studio-hero__metric">
                <span className="studio-hero__metric-num">2+</span>
                <span className="studio-hero__metric-label">Years Experience</span>
              </div>
            </motion.div>

            {/* Giant "Hello" Title */}
            <motion.div
              className="studio-hero__heading-wrap"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="studio-hero__title">Hello</h1>
              <p className="studio-hero__subtitle">
                — It&apos;s <strong className="text-black font-semibold">Arslan</strong>, a full-stack MERN wizard
              </p>
            </motion.div>

            {/* Role & Tech Badges */}
            <motion.div
              className="studio-hero__tags"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="studio-tag studio-tag--dark">MERN Stack</span>
              <span className="studio-tag">Next.js 16</span>
              <span className="studio-tag">Node.js</span>
              <span className="studio-tag">Web3 &amp; SaaS</span>
            </motion.div>
          </div>

          {/* Right Column: Studio Portrait Cutout */}
          <motion.div
            className="studio-hero__portrait-wrap"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="studio-hero__portrait-inner">
              <Image
                src="/images/hero-portrait.jpg"
                alt="Muhammad Arslan Rasheed — Full-Stack Developer"
                width={700}
                height={900}
                priority
                className="studio-hero__portrait-img"
              />
              {/* Subtle gradient to seamlessly fade into background at the bottom */}
              <div className="studio-hero__portrait-fade" aria-hidden="true" />
            </div>
          </motion.div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="studio-hero__bottom">
          <button
            onClick={() => smoothScrollTo("#about", -60)}
            className="studio-hero__scroll-btn"
            aria-label="Scroll to About section"
          >
            <span>Scroll down</span>
            <ArrowDown size={14} />
          </button>
          <span className="studio-hero__year">2024</span>
        </div>
      </div>
    </section>
  );
}
