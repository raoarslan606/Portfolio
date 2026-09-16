"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/animations/RevealOnScroll";

const highlights = [
  { value: "2+", label: "Years of Experience" },
  { value: "8+", label: "Products Shipped" },
  { value: "3", label: "Web3 Projects" },
  { value: "5+", label: "Tech Stacks" },
];

/**
 * About section — professional summary with animated highlights grid.
 */
export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container">
        <div className="about__layout">
          {/* Left — heading + highlights */}
          <div className="about__left">
            <SectionHeading
              eyebrow="About Me"
              title="Building Digital Experiences That Matter"
              id="about-heading"
            />

            {/* Highlight cards */}
            <div className="about__highlights" aria-label="Key achievements">
              {highlights.map((item, i) => (
                <RevealOnScroll key={item.label} delay={i * 0.1} direction="up">
                  <div className="about__highlight-card">
                    <span className="about__highlight-value">{item.value}</span>
                    <span className="about__highlight-label">{item.label}</span>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>

          {/* Right — summary text */}
          <div className="about__right">
            <RevealOnScroll direction="left" delay={0.2}>
              <div className="about__body">
                <p>
                  I&apos;m a <strong>Full-Stack MERN Developer</strong> with a passion for building
                  premium, high-performance web applications that solve real-world problems. With
                  experience across <strong>SaaS platforms, AI-powered tools, health-tech
                  devices</strong>, and <strong>Web3 ecosystems</strong>, I bring a product-focused
                  mindset to every project I work on.
                </p>
                <p>
                  Currently at <strong>Quantum Bases</strong>, I architect and ship full-stack
                  features across multiple products — from identity verification pipelines and
                  fleet management systems, to decentralised token presale platforms and
                  enterprise dashboards.
                </p>
                <p>
                  My core stack is <strong>React · Next.js · Node.js · TypeScript · MongoDB ·
                  PostgreSQL</strong>, with deep experience in cloud infrastructure (AWS, Docker),
                  smart contract integrations (Ethers.js, Solidity), and modern animation/UX
                  techniques. I care deeply about code quality, performance, and creating
                  interfaces that feel genuinely premium.
                </p>
                <p>
                  When I&apos;m not shipping features, I&apos;m exploring emerging tech in the Web3 and
                  AI space — bridging the gap between cutting-edge technology and intuitive
                  user experience.
                </p>
              </div>
            </RevealOnScroll>

            {/* Download CV button */}
            <RevealOnScroll direction="up" delay={0.4}>
              <a
                href="/Muhammad_Arslan_Rasheed_CV.pdf"
                download
                className="btn btn--outline about__cv-btn"
                aria-label="Download CV as PDF"
              >
                Download CV
              </a>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
