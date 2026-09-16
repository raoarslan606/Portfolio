"use client";

import { useEffect, useState, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
  /** Normalised to [-1, 1] */
  nx: number;
  ny: number;
}

/**
 * Hook that tracks mouse position efficiently on mousemove event only.
 */
export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    nx: 0,
    ny: 0,
  });

  const ticking = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          const x = e.clientX;
          const y = e.clientY;
          const nx = (x / window.innerWidth) * 2 - 1;
          const ny = -(y / window.innerHeight) * 2 + 1;
          setPosition({ x, y, nx, ny });
          ticking.current = false;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}
