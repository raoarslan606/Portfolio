"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Globe, ArrowUpRight, Plus } from "lucide-react";
import { smoothScrollTo } from "@/lib/utils";

/**
 * Editorial Studio About Section (Wolfpixel Bento Grid)
 * Matching Reference Screenshot 4:
 * - Left editorial description with hand-drawn arrow
 * - Center Bento Card with 120% metric + monochrome portrait
 * - Right Bento Card with avatar card, arrow button, and plus-icon bullets
 */
export default function About() {
  return (
    <section id="about" className="studio-about" aria-labelledby="about-heading">
      <div className="studio-container">
        <div className="studio-about__grid">
          {/* Left Column: Heading, Narrative, and Directional Arrow */}
          <div className="studio-about__left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 id="about-heading" className="studio-about__title">
                About Me
              </h2>
              <p className="studio-about__desc">
                I specialize in turning complex problems into elegant solutions. My approach blends
                creativity with strategic engineering to deliver designs and platforms that not only look
                great but work seamlessly. Ready to start your next project?
              </p>
            </motion.div>

            {/* Hand-drawn style curved arrow pointing to the cards */}
            <div className="studio-about__arrow-wrap" aria-hidden="true">
              <svg
                width="120"
                height="80"
                viewBox="0 0 120 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="studio-about__arrow-svg"
              >
                <path
                  d="M10 60C45 65 80 45 105 15M105 15L90 18M105 15L108 30"
                  stroke="#CCCCCC"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Center Bento Card: 120% Metric + Portrait */}
          <motion.div
            className="studio-card studio-card--metric"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="studio-card__metric-header">
              <div className="studio-card__icon-badge" aria-hidden="true">
                <Globe size={18} />
              </div>
              <div className="studio-card__metric-val">120%</div>
              <p className="studio-card__metric-sub">
                Average increase in client engagement in the first 6 months
              </p>
            </div>

            <div className="studio-card__portrait-box">
              <Image
                src="/images/about-portrait.jpg"
                alt="Muhammad Arslan Rasheed"
                width={400}
                height={400}
                className="studio-card__portrait-img"
              />
            </div>
          </motion.div>

          {/* Right Bento Column: Avatar CTA + Plus Bullet Points */}
          <motion.div
            className="studio-about__right-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Top Micro-Card: Avatar + Circular Arrow Action */}
            <div className="studio-card studio-card--action">
              <div className="studio-card__action-inner">
                <div className="studio-card__action-avatar">
                  <Image
                    src="/images/about-portrait.jpg"
                    alt="Arslan avatar"
                    width={120}
                    height={120}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <button
                  onClick={() => smoothScrollTo("#contact", -70)}
                  className="studio-circle-arrow-btn"
                  aria-label="Contact Arslan"
                >
                  <ArrowUpRight size={20} />
                </button>
              </div>
            </div>

            {/* Bullet Point 1 */}
            <div className="studio-card studio-card--bullet">
              <div className="studio-bullet">
                <span className="studio-bullet__icon" aria-hidden="true">
                  <Plus size={14} />
                </span>
                <p className="studio-bullet__text">
                  With <strong>2+ years of experience</strong>, I specialize in creating intuitive,
                  user-focused architectures, robust MERN backends, and Web3 platforms that solve
                  real-world problems and deliver seamless digital experiences.
                </p>
              </div>
            </div>

            {/* Bullet Point 2 */}
            <div className="studio-card studio-card--bullet">
              <div className="studio-bullet">
                <span className="studio-bullet__icon" aria-hidden="true">
                  <Plus size={14} />
                </span>
                <p className="studio-bullet__text">
                  I thrive on working closely with founders and engineering teams, blending technical
                  precision with strategy to bring their vision to life through thoughtful,
                  high-performance web solutions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
