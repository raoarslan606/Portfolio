"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Components
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

// Lazy-load heavy client-only components
const Preloader = dynamic(() => import("@/components/layout/Preloader"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
const SmoothScrollProvider = dynamic(
  () => import("@/components/animations/SmoothScrollProvider"),
  { ssr: false }
);

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device to skip custom cursor
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  return (
    <>
      {/* Preloader overlay */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Main app — rendered behind preloader, becomes visible after */}
      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.5s ease",
          visibility: loading ? "hidden" : "visible",
        }}
      >
        {/* Custom cursor (desktop only) */}
        {!isTouchDevice && <CustomCursor />}

        {/* Lenis smooth scroll provider */}
        <SmoothScrollProvider>
          <Navbar />
          <main id="main-content" tabIndex={-1} aria-label="Main content">
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </SmoothScrollProvider>
      </div>
    </>
  );
}
