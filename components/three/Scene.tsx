"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import HeroObject from "./HeroObject";
import ParticleField from "./ParticleField";

/**
 * Root Three.js Canvas for the hero section.
 * Optimized with capped DPR [1, 1.5] and adaptive features to guarantee 60fps.
 */
export default function Scene() {
  return (
    <div className="hero-scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Adaptive performance helpers */}
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#e040fb" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#6C5CE7" />

        {/* Environment map for glossy reflections */}
        <Suspense fallback={null}>
          <Environment preset="city" />
        </Suspense>

        {/* 3D Objects */}
        <Suspense fallback={null}>
          <HeroObject />
          <ParticleField />
        </Suspense>

        {/* Post-processing */}
        <Suspense fallback={null}>
          <EffectComposer multisampling={0}>
            <Bloom
              luminanceThreshold={0.25}
              luminanceSmoothing={0.8}
              intensity={0.9}
              radius={0.7}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
