"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

/**
 * Branded preloader with a count-up progress animation.
 * Calls `onComplete` when done so the parent can reveal the site.
 */
export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Simulate loading progress
    let current = 0;
    intervalRef.current = setInterval(() => {
      current += Math.random() * 15 + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(intervalRef.current!);
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(onComplete, 800);
        }, 300);
      }
      setProgress(Math.min(current, 100));
    }, 120);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background grid */}
          <div className="preloader__grid" aria-hidden="true" />

          {/* Logo / name */}
          <motion.div
            className="preloader__name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="preloader__name--first">Muhammad</span>
            <span className="preloader__name--last">Arslan</span>
          </motion.div>

          {/* Progress counter */}
          <motion.div
            className="preloader__counter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            {Math.round(progress)}
          </motion.div>

          {/* Progress bar */}
          <div className="preloader__bar-track" aria-hidden="true">
            <motion.div
              className="preloader__bar-fill"
              style={{ scaleX: progress / 100, transformOrigin: "left" }}
            />
          </div>

          {/* Bottom tagline */}
          <motion.p
            className="preloader__tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Full-Stack MERN Developer
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
