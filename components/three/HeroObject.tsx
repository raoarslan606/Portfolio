"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * The hero 3D object — a distorted glossy sphere:
 *  1. Floats naturally via Float
 *  2. Responsively positioned on the right side so it NEVER overlaps or blocks the text
 *  3. Seamless full-screen coordinate positioning
 *  4. Rotates smoothly with pointer coordinates without React re-renders
 */
export default function HeroObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Position sphere comfortably on the right half on desktop
  const isMobile = viewport.width < 7;
  const sphereX = isMobile ? 0 : Math.min(Math.max(viewport.width * 0.24, 1.3), 2.2);
  const sphereY = isMobile ? -0.5 : 0;
  const sphereScale = isMobile ? 0.75 : 0.95;

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // R3F state.pointer gives normalized [-1, 1] coordinates
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    // Lerp rotation toward pointer
    targetRotation.current.x += (-pointerY * 0.3 - targetRotation.current.x) * 0.05;
    targetRotation.current.y += (pointerX * 0.3 - targetRotation.current.y) * 0.05;

    meshRef.current.rotation.x = targetRotation.current.x;
    meshRef.current.rotation.y += delta * 0.15 + targetRotation.current.y * 0.01;

    // Subtle inner sphere counter-rotation
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.08;
      innerRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group position={[sphereX, sphereY, 0]} scale={sphereScale}>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
        {/* Outer distorted sphere */}
        <mesh ref={meshRef} castShadow>
          <sphereGeometry args={[1.2, 64, 64]} />
          <MeshDistortMaterial
            color="#e040fb"
            attach="material"
            distort={0.35}
            speed={2}
            roughness={0.06}
            metalness={0.9}
            envMapIntensity={2}
          />
        </mesh>

        {/* Inner glow sphere */}
        <mesh ref={innerRef}>
          <sphereGeometry args={[0.85, 32, 32]} />
          <meshStandardMaterial
            color="#6C5CE7"
            emissive="#e040fb"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={1}
            transparent
            opacity={0.65}
          />
        </mesh>

        {/* Core center */}
        <mesh>
          <sphereGeometry args={[0.4, 24, 24]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#e040fb"
            emissiveIntensity={2}
            roughness={0}
            metalness={1}
          />
        </mesh>
      </Float>
    </group>
  );
}
