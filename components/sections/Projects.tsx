"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

type FilterCategory = "all" | Project["category"];

const filters: { label: string; value: FilterCategory }[] = [
  { label: "All", value: "all" },
  { label: "Health-Tech", value: "health-tech" },
  { label: "AI", value: "ai" },
  { label: "Web3", value: "web3" },
  { label: "SaaS", value: "saas" },
  { label: "Fleet", value: "fleet" },
  { label: "Admin", value: "admin" },
];

/**
 * Projects section — filterable grid of project cards with layout animations.
 */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section section--alt" aria-labelledby="projects-heading">
      <div className="container">
        <SectionHeading
          id="projects-heading"
          eyebrow="Selected Work"
          title="Projects I've Shipped"
          subtitle="A selection of the products I've built — from AI platforms to Web3 ecosystems."
        />

        {/* Filter tabs */}
        <div
          className="projects__filters"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              className={`projects__filter-btn ${activeFilter === filter.value ? "projects__filter-btn--active" : ""}`}
              onClick={() => setActiveFilter(filter.value)}
              role="tab"
              aria-selected={activeFilter === filter.value}
              aria-label={`Filter: ${filter.label}`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <motion.div
          className="projects__grid"
          layout
          role="tabpanel"
          aria-label={`${activeFilter === "all" ? "All" : activeFilter} projects`}
        >
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
