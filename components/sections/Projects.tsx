"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

type FilterCategory = "all" | Project["category"];

const filters: { label: string; value: FilterCategory }[] = [
  { label: "All Work", value: "all" },
  { label: "Web3", value: "web3" },
  { label: "AI Platforms", value: "ai" },
  { label: "Health-Tech", value: "health-tech" },
  { label: "SaaS Systems", value: "saas" },
  { label: "Fleet & Admin", value: "fleet" },
];

/**
 * Editorial Studio Projects Section (Wolfpixel Style)
 * Matching Reference Screenshot 4
 */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="studio-projects" aria-labelledby="projects-heading">
      <div className="studio-container">
        {/* Section Header */}
        <div className="studio-section-header">
          <div>
            <div className="studio-eyebrow">
              <span className="studio-eyebrow__dot" />
              <span>Portfolio</span>
            </div>
            <h2 id="projects-heading" className="studio-section-title">
              Crafted With Purpose
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="studio-filter-pills" role="tablist" aria-label="Filter projects">
            {filters.map((filter) => (
              <button
                key={filter.value}
                className={`studio-filter-pill ${activeFilter === filter.value ? "studio-filter-pill--active" : ""}`}
                onClick={() => setActiveFilter(filter.value)}
                role="tab"
                aria-selected={activeFilter === filter.value}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div
          className="studio-projects__grid"
          layout
          role="tabpanel"
          aria-label="Projects showcase"
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
