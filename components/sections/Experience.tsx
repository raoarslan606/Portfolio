"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { experiences, education } from "@/data/experience";
import { smoothScrollTo } from "@/lib/utils";

/**
 * Editorial Studio Experience Section (Wolfpixel Style)
 * Matching Reference Screenshot 5:
 * - Section header with eyebrow, title, narrative bio, and "Book A Call ↗" link
 * - Horizontal list rows with pill tags, dates, and active preview card
 */
export default function Experience() {
  const currentExp = experiences[0];

  return (
    <section id="experience" className="studio-experience" aria-labelledby="exp-heading">
      <div className="studio-container">
        {/* Header matching Screenshot 5 */}
        <div className="studio-exp-header">
          <div>
            <div className="studio-eyebrow">
              <span className="studio-eyebrow__dot" />
              <span>Experiences</span>
            </div>
            <h2 id="exp-heading" className="studio-section-title">
              Explore My Engineering Journey
            </h2>
          </div>

          <div className="studio-exp-header__right">
            <p className="studio-exp-header__desc">
              Over the past 2+ years, I&apos;ve had the opportunity to architect and ship a wide range of
              SaaS, Web3, and health-tech platforms; collaborating with diverse teams and founders to
              bring creative visions to life.
            </p>
            <button
              onClick={() => smoothScrollTo("#contact", -70)}
              className="studio-link-arrow"
            >
              <span>Book A Call</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>

        {/* Timeline Rows */}
        {/* Timeline Rows — Editorial Divider List matching Dribbble Reference */}
        <div className="studio-exp-list">
          {/* Active Featured Experience Row (Expanded card with 3 images like Screenshot 5) */}
          <motion.div
            className="studio-exp-row studio-exp-row--active"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="studio-exp-row__main">
              <div className="studio-exp-row__meta">
                <h3 className="studio-exp-row__company">
                  {currentExp.company}, {currentExp.location}
                </h3>
                <span className="studio-exp-row__date">• {currentExp.period}</span>
              </div>
              <div className="studio-exp-row__role">{currentExp.role}</div>
              <div className="studio-exp-row__tags">
                <span className="studio-tag studio-tag--dark">MERN Stack</span>
                <span className="studio-tag">Web3</span>
                <span className="studio-tag">Next.js</span>
              </div>
            </div>

            {/* 3 Preview Thumbnails + Narrative + Action Button (Screenshot 5) */}
            <div className="studio-exp-preview">
              <div className="studio-exp-preview__images">
                <div className="studio-exp-preview__img-box">
                  <Image
                    src="/images/projects/verifilite.png"
                    alt="Verifilite project preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="studio-exp-preview__img-box">
                  <Image
                    src="/images/projects/vitu.png"
                    alt="Vitu health-tech platform preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="studio-exp-preview__img-box">
                  <Image
                    src="/images/projects/verifilite-portal.png"
                    alt="Verifilite portal preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>

              <div className="studio-exp-preview__content">
                <p className="studio-exp-preview__text">
                  From architecting AI identity verification pipelines (Verifilite) to leading Web3 token
                  presale platforms (OFNT &amp; ASFR) and real-time medical IoT device dashboards (Vitu),
                  each experience has strengthened my passion for solving complex full-stack challenges.
                </p>
                <button
                  onClick={() => smoothScrollTo("#projects", -70)}
                  className="studio-circle-arrow-btn"
                  aria-label="View projects"
                >
                  <ArrowUpRight size={22} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Education / Degree Row */}
          {education.map((edu, idx) => (
            <motion.div
              key={edu.id}
              className="studio-exp-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (idx + 1) }}
            >
              <div className="studio-exp-row__main">
                <div className="studio-exp-row__meta">
                  <h3 className="studio-exp-row__company">{edu.institution}</h3>
                  <span className="studio-exp-row__date">• {edu.period}</span>
                </div>
                <div className="studio-exp-row__role">
                  {edu.degree} in {edu.field}
                </div>
                <div className="studio-exp-row__tags">
                  <span className="studio-tag">Computer Science</span>
                  <span className="studio-tag">Algorithms &amp; DS</span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Freelance & Open Source Row */}
          <motion.div
            className="studio-exp-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="studio-exp-row__main">
              <div className="studio-exp-row__meta">
                <h3 className="studio-exp-row__company">Independent Web3 &amp; SaaS Consulting</h3>
                <span className="studio-exp-row__date">• 2023 – Present</span>
              </div>
              <div className="studio-exp-row__role">Full-Stack Solutions Architect</div>
              <div className="studio-exp-row__tags">
                <span className="studio-tag">Smart Contracts</span>
                <span className="studio-tag">Tailwind</span>
                <span className="studio-tag">Node APIs</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
