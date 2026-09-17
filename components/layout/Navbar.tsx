"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navItems } from "@/data/experience";
import { smoothScrollTo } from "@/lib/utils";

/**
 * Editorial Studio Navbar (Wolfpixel Style)
 * Clean light minimalist header with monogram logo, text navigation links,
 * and a sleek "Book A Call ↗" pill action.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#about");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection Observer to track active section
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    smoothScrollTo(href, -80);
  };

  return (
    <>
      <motion.header
        ref={navRef}
        className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav className="navbar__inner" aria-label="Main navigation">
          {/* Logo — geometric minimalist icon + name */}
          <Link href="/" className="navbar__logo" aria-label="Muhammad Arslan Rasheed">
            <svg
              className="navbar__logo-svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L3 9L6 21L12 17L18 21L21 9L12 2Z" fill="currentColor" />
            </svg>
            <span className="navbar__logo-text">ARSLAN</span>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="navbar__links" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  className={`navbar__link ${activeSection === item.href ? "navbar__link--active" : ""}`}
                  onClick={() => handleNavClick(item.href)}
                  aria-current={activeSection === item.href ? "true" : undefined}
                >
                  {item.label}
                  <span className="navbar__link-underline" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>

          {/* CTA: Book A Call ↗ */}
          <button
            className="navbar__cta-btn"
            onClick={() => handleNavClick("#contact")}
            aria-label="Book a call — scroll to contact"
          >
            <span>Book A Call</span>
            <ArrowUpRight size={16} className="navbar__cta-icon" />
          </button>

          {/* Mobile hamburger */}
          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-label="Mobile navigation"
          >
            <ul className="mobile-menu__links" role="list">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    className={`mobile-menu__link ${activeSection === item.href ? "mobile-menu__link--active" : ""}`}
                    onClick={() => handleNavClick(item.href)}
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>

            <div className="mobile-menu__footer">
              <button
                className="navbar__cta-btn w-full justify-center"
                onClick={() => handleNavClick("#contact")}
              >
                <span>Book A Call</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
