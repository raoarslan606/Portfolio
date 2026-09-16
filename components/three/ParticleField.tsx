"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 900;

/**
 * Particle field that spans across the entire viewport.
 * Particles drift slowly and respond subtly to pointer movement in useFrame.
 */
export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random particle positions distributed across the entire screen
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    const accentColor = new THREE.Color("#e040fb");
    const secondaryColor = new THREE.Color("#6C5CE7");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Wide elliptical distribution to cover full widescreen layouts seamlessly
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.0 + Math.random() * 4.5;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 1.8; // Wide X spread
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 1.2; // Full Y spread
      positions[i * 3 + 2] = r * Math.cos(phi) - 0.5;

      // Color variation between magenta and neon purple
      const t = Math.random();
      const color = accentColor.clone().lerp(secondaryColor, t);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime;

    // Slow rotation with subtle pointer influence
    pointsRef.current.rotation.y = time * 0.02 + state.pointer.x * 0.08;
    pointsRef.current.rotation.x = time * 0.01 - state.pointer.y * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
