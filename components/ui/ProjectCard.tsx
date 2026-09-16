"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, GitBranch, X } from "lucide-react";
import Badge from "@/components/ui/Badge";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

/**
 * Project card with hover zoom, 3D tilt, and a modal for project details.
 */
export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Subtle tilt on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  const categoryColors: Record<string, string> = {
    "health-tech": "#00D9A3",
    ai: "#6C5CE7",
    web3: "#E040FB",
    saas: "#00B4D8",
    fleet: "#FFA500",
    admin: "#FF6B6B",
  };

  const accentColor = categoryColors[project.category] ?? "var(--accent)";

  return (
    <>
      <motion.div
        ref={cardRef}
        className="project-card"
        style={{ "--card-accent": accentColor } as React.CSSProperties}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setModalOpen(true)}
        data-cursor-hover
      >
        {/* Image or placeholder */}
        <div className="project-card__image-wrap">
          <div className="project-card__image-inner">
            {project.image && project.image !== "" ? (
              <Image
                src={project.image}
                alt={`${project.title} project screenshot`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="project-card__image"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div className="project-card__placeholder">
                <span className="project-card__placeholder-letter">
                  {project.title.charAt(0)}
                </span>
              </div>
            )}
            {/* Gradient overlay */}
            <div className="project-card__overlay" aria-hidden="true" />
          </div>
          {/* Hover reveal arrow */}
          <div className="project-card__hover-cta" aria-hidden="true">
            <ExternalLink size={20} />
            <span>View Details</span>
          </div>
        </div>

        {/* Content */}
        <div className="project-card__content">
          <div className="project-card__header">
            <h3 className="project-card__title">{project.title}</h3>
            <div className="project-card__links" onClick={(e) => e.stopPropagation()}>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__icon-link"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <GitBranch size={16} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__icon-link"
                  aria-label={`View ${project.title} live demo`}
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
          <p className="project-card__description">{project.description}</p>
          <div className="project-card__tags">
            {project.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="outline" className="badge--sm">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 4 && (
              <Badge variant="outline" className="badge--sm badge--muted">
                +{project.tags.length - 4}
              </Badge>
            )}
          </div>
        </div>
      </motion.div>

      {/* Project detail modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} details`}
          >
            <motion.div
              className="project-modal"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal close */}
              <button
                className="project-modal__close"
                onClick={() => setModalOpen(false)}
                aria-label="Close project details"
              >
                <X size={20} />
              </button>

              {/* Modal image */}
              <div className="project-modal__image-wrap">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>

              {/* Modal content */}
              <div className="project-modal__body">
                <h2 className="project-modal__title">{project.title}</h2>
                <p className="project-modal__desc">{project.longDescription ?? project.description}</p>
                <div className="project-modal__tags">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="accent">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="project-modal__actions">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--accent"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--outline"
                    >
                      <GitBranch size={16} />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
