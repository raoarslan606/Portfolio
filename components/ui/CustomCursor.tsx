"use client";

import { useEffect, useRef } from "react";

/**
 * High-performance custom cursor:
 *  - Zero React state re-renders (100% direct DOM manipulation via RAF)
 *  - GPU accelerated transforms (translate3d)
 *  - Smooth lerp interpolation for the trailing ring
 *  - Event delegation for hover states
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Current and target coordinates
    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ringX = targetX;
        ringY = targetY;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX - 4}px, ${targetY - 4}px, 0)`;
      }
    };

    const render = () => {
      // Lerp ring towards target
      ringX += (targetX - ringX) * 0.15;
      ringY += (targetY - ringY) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [data-cursor-hover], input, textarea, select");
      if (interactive) {
        dotRef.current?.classList.add("cursor-dot--hover");
        ringRef.current?.classList.add("cursor-ring--hover");
      } else {
        dotRef.current?.classList.remove("cursor-dot--hover");
        ringRef.current?.classList.remove("cursor-ring--hover");
      }
    };

    const hideCursor = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", hideCursor);
    window.addEventListener("blur", hideCursor);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", hideCursor);
      window.removeEventListener("blur", hideCursor);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: 0, pointerEvents: "none", willChange: "transform" }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: 0, pointerEvents: "none", willChange: "transform" }}
        aria-hidden="true"
      />
    </>
  );
}
