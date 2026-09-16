"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { education } from "@/data/experience";

/**
 * Education section — clean card with scroll-reveal animation.
 */
export default function Education() {
  return (
    <section id="education" className="section" aria-labelledby="edu-heading">
      <div className="container">
        <SectionHeading
          id="edu-heading"
          eyebrow="Education"
          title="Academic Background"
        />

        <div className="education__grid">
          {education.map((edu, i) => (
            <RevealOnScroll key={edu.id} direction="up" delay={i * 0.1}>
              <div className="education__card">
                <div className="education__card-glow" aria-hidden="true" />

                {/* Icon */}
                <div className="education__icon" aria-hidden="true">
                  <GraduationCap size={28} />
                </div>

                {/* Content */}
                <div className="education__content">
                  <p className="education__degree">
                    {edu.degree} in <strong>{edu.field}</strong>
                  </p>
                  <h3 className="education__institution">{edu.institution}</h3>

                  <div className="education__meta">
                    <span className="education__period">
                      <Calendar size={13} aria-hidden="true" />
                      {edu.period}
                    </span>
                    {edu.grade && (
                      <span className="education__grade">
                        {edu.grade}
                      </span>
                    )}
                  </div>

                  {/* Activities */}
                  {edu.activities && (
                    <ul className="education__activities" aria-label="Academic activities">
                      {edu.activities.map((activity, ai) => (
                        <li key={ai}>{activity}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
