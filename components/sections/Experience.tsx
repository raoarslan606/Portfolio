"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { experiences } from "@/data/experience";

/**
 * Experience section — vertical animated timeline with scroll-reveal bullets.
 */
export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="exp-heading">
      <div className="container">
        <SectionHeading
          id="exp-heading"
          eyebrow="Work History"
          title="Where I've Built"
        />

        <div className="timeline" role="list">
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.id} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TimelineItemProps {
  experience: (typeof experiences)[number];
  index: number;
}

function TimelineItem({ experience, index }: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  return (
    <motion.div
      ref={ref}
      className="timeline__item"
      role="listitem"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Timeline line */}
      <div className="timeline__line-track" aria-hidden="true">
        <motion.div className="timeline__line-fill" style={{ height: lineHeight }} />
        <div className="timeline__dot" />
      </div>

      {/* Content card */}
      <div className="timeline__card">
        {/* Header */}
        <div className="timeline__header">
          <div className="timeline__company-info">
            <div className="timeline__company-icon" aria-hidden="true">
              <Briefcase size={18} />
            </div>
            <div>
              <h3 className="timeline__role">{experience.role}</h3>
              <p className="timeline__company">{experience.company}</p>
            </div>
          </div>
          <div className="timeline__meta">
            <span className="timeline__period">
              <Calendar size={13} aria-hidden="true" />
              {experience.period}
            </span>
            {experience.location && (
              <span className="timeline__location">
                <MapPin size={13} aria-hidden="true" />
                {experience.location}
              </span>
            )}
          </div>
        </div>

        {/* Description bullets */}
        <ul className="timeline__bullets" aria-label="Responsibilities and achievements">
          {experience.description.map((point, pi) => (
            <motion.li
              key={pi}
              className="timeline__bullet"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: pi * 0.07 }}
            >
              {point}
            </motion.li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="timeline__tech" aria-label="Technologies used">
          {experience.technologies.map((tech) => (
            <Badge key={tech} variant="accent" className="badge--sm">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
