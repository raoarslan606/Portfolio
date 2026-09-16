"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/experience";
import { smoothScrollTo } from "@/lib/utils";

/**
 * Sticky glassmorphism navbar with smooth-scroll links and an animated mobile menu.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLElement>(null);

  // Detect scroll to apply glassmorphism
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection Observer to track active section
  useEffect(() => {
    const sections = navItems.map((item) =>
      document.querySelector(item.href)
    ).filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="navbar__inner" aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" className="navbar__logo" aria-label="Muhammad Arslan Rasheed — Home">
            <span className="navbar__logo-text">MAR</span>
            <span className="navbar__logo-dot" aria-hidden="true" />
          </Link>

          {/* Desktop links */}
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

          {/* CTA */}
          <button
            className="btn btn--accent navbar__cta"
            onClick={() => handleNavClick("#contact")}
            aria-label="Book a meeting — scroll to contact"
          >
            Book a Meeting
          </button>

          {/* Mobile hamburger */}
          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
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

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            aria-modal="true"
            role="dialog"
            aria-label="Navigation menu"
          >
            <ul className="mobile-menu__links" role="list">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <button
                    className={`mobile-menu__link ${activeSection === item.href ? "mobile-menu__link--active" : ""}`}
                    onClick={() => handleNavClick(item.href)}
                  >
                    <span className="mobile-menu__link-num">0{i + 1}</span>
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="mobile-menu__footer">
              <button
                className="btn btn--accent"
                onClick={() => handleNavClick("#contact")}
              >
                Book a Meeting
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
