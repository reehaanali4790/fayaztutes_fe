"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus } from "@react-three/drei";

function FloatingShapes() {
  return (
    <>
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.8}>
        <Sphere args={[1.1, 64, 64]} position={[-0.4, 0.2, 0]}>
          <MeshDistortMaterial
            color="#6366f1"
            distort={0.32}
            speed={2}
            roughness={0.15}
            metalness={0.85}
          />
        </Sphere>
      </Float>
      <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.5}>
        <Torus args={[0.65, 0.18, 32, 64]} position={[1.2, -0.3, -0.5]} rotation={[0.8, 0.4, 0]}>
          <meshStandardMaterial color="#a855f7" metalness={0.9} roughness={0.1} />
        </Torus>
      </Float>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <Sphere args={[0.35, 32, 32]} position={[0.8, 0.9, -0.8]}>
          <meshStandardMaterial color="#818cf8" emissive="#4f46e5" emissiveIntensity={0.4} />
        </Sphere>
      </Float>
    </>
  );
}

export function Hero3DScene() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[min(480px,45vw)] h-[min(480px,45vw)] opacity-70 pointer-events-none hidden lg:block">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 42 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 4]} intensity={1.4} color="#e0e7ff" />
        <pointLight position={[-3, -2, 2]} intensity={0.6} color="#c4b5fd" />
        <Suspense fallback={null}>
          <FloatingShapes />
        </Suspense>
      </Canvas>
    </div>
  );
}
