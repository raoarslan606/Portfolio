"use client";

import { motion } from "framer-motion";
import {
  Monitor, Server, Database, Cloud, Layers, Wrench
} from "lucide-react";
import { skillCategories } from "@/data/skills";

const iconMap: Record<string, React.ReactNode> = {
  Monitor: <Monitor size={18} />,
  Server: <Server size={18} />,
  Database: <Database size={18} />,
  Cloud: <Cloud size={18} />,
  Layers: <Layers size={18} />,
  Wrench: <Wrench size={18} />,
};

// Flatten skills for the scrolling marquee
const allSkills = skillCategories.flatMap((c) => c.skills.map((s) => s.name));

/**
 * Editorial Studio Skills Section (Wolfpixel Style)
 * - Clean section header with eyebrow and title
 * - 3-column Bento grid with icon badges and pill tags
 * - Continuous high-end marquee ticker
 */
export default function Skills() {
  return (
    <section id="skills" className="studio-skills" aria-labelledby="skills-heading">
      <div className="studio-container">
        {/* Section Header */}
        <div className="studio-section-header">
          <div>
            <div className="studio-eyebrow">
              <span className="studio-eyebrow__dot" />
              <span>Tech Stack</span>
            </div>
            <h2 id="skills-heading" className="studio-section-title">
              Tools &amp; Technologies
            </h2>
          </div>
          <p className="studio-skills__desc">
            A curated set of production-proven frameworks, cloud tools, and architectures I use to ship scalable software.
          </p>
        </div>

        {/* 3-Column Bento Grid */}
        <div className="studio-skills__grid" role="list" aria-label="Skill categories">
          {skillCategories.map((category, ci) => (
            <motion.div
              key={category.category}
              className="studio-card studio-skills__card"
              role="listitem"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.08 }}
            >
              <div className="studio-skills__category-top">
                <div className="studio-skills__category-icon" aria-hidden="true">
                  {iconMap[category.icon] ?? <Monitor size={18} />}
                </div>
                <h3 className="studio-skills__category-title">{category.category}</h3>
              </div>

              {/* Flex-wrap list of stylish studio pills */}
              <div className="studio-skills__pills" role="list">
                {category.skills.map((skill) => (
                  <span key={skill.name} className="studio-tag studio-tag--sm">
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scrolling Marquee Strip */}
      <div className="studio-marquee" aria-hidden="true">
        <div className="studio-marquee__track">
          {[...allSkills, ...allSkills].map((skill, i) => (
            <span key={i} className="studio-marquee__item">
              {skill}
              <span className="studio-marquee__dot">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
