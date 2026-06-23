"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function IcosahedronMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  // Animate rotation and subtle floating
  useFrame((state) => {
    if (!meshRef.current || !wireRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.08;
    meshRef.current.rotation.y = t * 0.12;
    meshRef.current.rotation.z = t * 0.04;
    wireRef.current.rotation.x = t * 0.08;
    wireRef.current.rotation.y = t * 0.12;
    wireRef.current.rotation.z = t * 0.04;
    // Subtle float
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.08;
    wireRef.current.position.y = Math.sin(t * 0.5) * 0.08;
  });

  return (
    <group>
      {/* Core glassy icosahedron */}
      <mesh ref={meshRef} castShadow>
        <icosahedronGeometry args={[1.15, 1]} />
        <MeshDistortMaterial
          color="#8B5CF6"
          emissive="#3B82F6"
          emissiveIntensity={0.25}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.35}
          distort={0.18}
          speed={1.5}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.18, 1]} />
        <meshBasicMaterial
          color="#8B5CF6"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Outer glow sphere */}
      <mesh>
        <sphereGeometry args={[1.6, 12, 12]} />
        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function ParticleField() {
  const count = 80;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#8B5CF6"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          color="#8B5CF6"
        />
        <directionalLight
          position={[-5, -2, -3]}
          intensity={0.6}
          color="#3B82F6"
        />

        <IcosahedronMesh />
        <ParticleField />
      </Canvas>
    </div>
  );
}
