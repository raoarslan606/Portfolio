"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, GitBranch, X } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

/**
 * Editorial Studio Project Card (Wolfpixel Style)
 * Matching Reference Screenshot 4:
 * - Rounded aspect ratio card
 * - Centered floating circular dark arrow button (↗)
 * - Clean editorial caption below: Title + Category / Client
 * - Light modal on click
 */
export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        className="studio-project-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        onClick={() => setModalOpen(true)}
      >
        {/* Card Image Container with Floating Arrow Button */}
        <div className="studio-project-card__image-box">
          {project.image && project.image !== "" ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="studio-project-card__img"
              unoptimized
            />
          ) : (
            <div className="studio-project-card__placeholder">
              <Image
                src="/images/project-minimal-1.jpg"
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="studio-project-card__img"
                unoptimized
              />
            </div>
          )}

          {/* Floating Dark Circular Arrow Button (Reference Screenshot 4) */}
          <div className="studio-project-card__action-btn" aria-hidden="true">
            <ArrowUpRight size={22} />
          </div>
        </div>

        {/* Editorial Caption Below Image */}
        <div className="studio-project-card__caption">
          <div className="studio-project-card__title-row">
            <h3 className="studio-project-card__title">{project.title}</h3>
            <span className="studio-project-card__company">
              {project.category.toUpperCase()}
            </span>
          </div>
          <div className="studio-project-card__tags">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="studio-tag studio-tag--sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Modal Details Dialog */}
      <AnimatePresence>
        {modalOpen && (
          <div className="studio-modal-overlay" onClick={() => setModalOpen(false)}>
            <motion.div
              className="studio-modal-content"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="studio-modal-header">
                <div>
                  <span className="studio-tag studio-tag--dark mb-2">
                    {project.category.toUpperCase()}
                  </span>
                  <h3 className="studio-modal-title">{project.title}</h3>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="studio-modal-close"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="studio-modal-body">
                {/* Project Showcase Hero Image in Details Modal */}
                {project.image && (
                  <div className="studio-modal-img-wrap">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}

                <p className="studio-modal-desc">{project.description}</p>

                {project.longDescription && (
                  <p className="studio-modal-desc mt-2 text-sm text-gray-600">
                    {project.longDescription}
                  </p>
                )}

                <div className="studio-modal-tech">
                  <h4 className="studio-modal-section-title">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((t) => (
                      <span key={t} className="studio-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="studio-modal-actions">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="studio-btn studio-btn--dark"
                    >
                      <span>Live Platform</span>
                      <ExternalLink size={16} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="studio-btn studio-btn--outline"
                    >
                      <GitBranch size={16} />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
