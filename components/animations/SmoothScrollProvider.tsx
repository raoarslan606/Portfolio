"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import { useLenis } from "@/lib/hooks/useLenis";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * Wraps the app to provide Lenis smooth scrolling.
 * Lenis is initialised inside useLenis() and synced with GSAP ScrollTrigger.
 */
export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useLenis();

  // Expose lenis instance globally for programmatic scrolling from other components
  useEffect(() => {
    if (typeof window !== "undefined" && lenisRef.current) {
      (window as typeof window & { lenis?: Lenis }).lenis = lenisRef.current;
    }
  }, [lenisRef]);

  return <>{children}</>;
}
