"use client";

import Link from "next/link";
import { GitBranch, Link2, Mail, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { socialLinks } from "@/data/experience";
import { smoothScrollTo } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  Github: <GitBranch size={18} />,
  Linkedin: <Link2 size={18} />,
  Mail: <Mail size={18} />,
};

/**
 * Minimal footer with social links and a back-to-top button.
 */
export default function Footer() {
  const scrollToTop = () => {
    smoothScrollTo(0);
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        {/* Left — copyright */}
        <p className="footer__copy">
          © {new Date().getFullYear()} Muhammad Arslan Rasheed. Built with ♥ &amp; Next.js
        </p>

        {/* Center — social links */}
        <ul className="footer__socials" role="list" aria-label="Social media links">
          {socialLinks
            .filter((s) => s.name !== "Phone")
            .map((link) => (
              <li key={link.name}>
                <Link
                  href={link.url}
                  target={link.name !== "Email" ? "_blank" : undefined}
                  rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                  className="footer__social-link"
                  aria-label={link.name}
                >
                  {iconMap[link.icon] ?? null}
                </Link>
              </li>
            ))}
        </ul>

        {/* Right — back to top */}
        <motion.button
          className="footer__top-btn"
          onClick={scrollToTop}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
          <span>Top</span>
        </motion.button>
      </div>
    </footer>
  );
}
