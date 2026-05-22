"use client";

import { Environment, Float, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function OrbitalRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
  });

  return (
    <group ref={groupRef}>
      {[0, 1, 2].map((ring) => (
        <mesh key={ring} rotation={[Math.PI / 2.5, 0, ring * 0.4]}>
          <torusGeometry args={[1.35 + ring * 0.22, 0.02, 20, 200]} />
          <meshStandardMaterial
            color={ring === 1 ? "#67e8f9" : "#a78bfa"}
            emissive={ring === 1 ? "#67e8f9" : "#8b5cf6"}
            emissiveIntensity={0.9}
            transparent
            opacity={0.45 - ring * 0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroThreeCanvas() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden rounded-[2rem]">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 48 }} dpr={[1, 1.4]} gl={{ antialias: true }}>
        <color attach="background" args={["#05060d"]} />
        <ambientLight intensity={0.48} />
        <pointLight position={[3, 2, 5]} intensity={0.9} color="#8b5cf6" />
        <pointLight position={[-2, -2, 3]} intensity={0.72} color="#22d3ee" />

        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
          <OrbitalRings />
        </Float>

        <mesh position={[0, 0, -0.9]}>
          <icosahedronGeometry args={[0.95, 1]} />
          <meshStandardMaterial
            color="#1f2340"
            wireframe
            emissive="#0ea5e9"
            emissiveIntensity={0.3}
            transparent
            opacity={0.35}
          />
        </mesh>

        <Sparkles count={70} size={2.2} speed={0.18} opacity={0.6} color="#7dd3fc" scale={[7, 5, 3]} />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
