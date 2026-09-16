"use client";

import { motion } from "framer-motion";
import {
  Monitor, Server, Database, Cloud, Layers, Cpu, Wrench
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { skillCategories } from "@/data/skills";

const iconMap: Record<string, React.ReactNode> = {
  Monitor: <Monitor size={20} />,
  Server: <Server size={20} />,
  Database: <Database size={20} />,
  Cloud: <Cloud size={20} />,
  Layers: <Layers size={20} />,
  Cpu: <Cpu size={20} />,
  Wrench: <Wrench size={20} />,
};

// Marquee track — all skill names flattened for the scrolling strip
const allSkills = skillCategories.flatMap((c) => c.skills.map((s) => s.name));

/**
 * Skills section — categorised animated badge grid + scrolling marquee strip.
 */
export default function Skills() {
  return (
    <section id="skills" className="section section--alt" aria-labelledby="skills-heading">
      <div className="container">
        <SectionHeading
          id="skills-heading"
          eyebrow="Tech Stack"
          title="Tools I Build With"
          subtitle="A curated set of technologies I use to bring ideas to production."
          align="center"
        />

        {/* Category grid */}
        <div className="skills__grid" role="list" aria-label="Skill categories">
          {skillCategories.map((category, ci) => (
            <motion.div
              key={category.category}
              className="skills__category"
              role="listitem"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: ci * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="skills__category-header">
                <span className="skills__category-icon" aria-hidden="true">
                  {iconMap[category.icon]}
                </span>
                <h3 className="skills__category-name">{category.category}</h3>
              </div>
              <div className="skills__badges" role="list" aria-label={`${category.category} skills`}>
                {category.skills.map((skill) => (
                  <Badge key={skill.name} variant="default" role="listitem">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scrolling marquee strip */}
      <div className="skills__marquee" aria-hidden="true">
        <div className="skills__marquee-track">
          {[...allSkills, ...allSkills].map((skill, i) => (
            <span key={i} className="skills__marquee-item">
              {skill}
              <span className="skills__marquee-dot">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
