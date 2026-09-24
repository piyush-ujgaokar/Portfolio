import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const techBadges = [
  { name: 'React', pos: [1.8, 0.7, 0] },
  { name: 'Node.js', pos: [-1.8, 0.8, 0.4] },
  { name: 'MongoDB', pos: [0, -1.8, 0.5] },
  { name: 'Gemini AI', pos: [1.3, -1.1, -0.8] },
  { name: 'TypeScript', pos: [-1.4, -1.0, -0.5] },
  { name: 'Socket.io', pos: [0, 1.8, -0.6] },
  { name: 'Docker', pos: [0.9, 1.3, 1.0] },
];

const OrbitConstellation = () => {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.2 + state.pointer.x * 0.3;
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.15 + state.pointer.y * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Graphite Core */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#1E1E1C"
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Elegant Hairline Orbit Rings */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.2, 0.012, 16, 100]} />
        <meshBasicMaterial color="#8C8A82" opacity={0.5} transparent />
      </mesh>

      <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[2.0, 0.012, 16, 100]} />
        <meshBasicMaterial color="#6E6E6A" opacity={0.4} transparent />
      </mesh>

      {/* Orbiting Satellite Tech Nodes */}
      {techBadges.map((node, i) => (
        <group key={i} position={node.pos}>
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.6}>
            <RoundedBox args={[0.85, 0.32, 0.06]} radius={0.03} smoothness={3}>
              <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
            </RoundedBox>
            <Text
              position={[0, 0, 0.04]}
              fontSize={0.12}
              color="#1E1E1C"
              anchorX="center"
              anchorY="middle"
            >
              {node.name}
            </Text>
          </Float>
        </group>
      ))}
    </group>
  );
};

export const Skills3DOrbit = () => {
  return (
    <div className="w-full h-[320px] sm:h-[400px] relative rounded-3xl bg-[#FFFFFF] border border-[#E8E5DC] shadow-soft overflow-hidden flex items-center justify-center">
      <Suspense
        fallback={
          <div className="flex items-center justify-center text-xs font-mono text-[#8C8A82]">
            LOADING TECH CONSTELLATION...
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 46 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full"
        >
          <ambientLight intensity={1.6} />
          <directionalLight position={[5, 6, 5]} intensity={2.0} color="#FFFFFF" />
          <directionalLight position={[-5, -4, -4]} intensity={0.8} color="#E8E5DC" />
          <OrbitConstellation />
        </Canvas>
      </Suspense>

      <div className="absolute bottom-3 left-4 editorial-pill px-3 py-1 rounded-full text-[11px] font-mono text-[#6E6E6A]">
        INTERACTIVE TECH CONSTELLATION
      </div>
    </div>
  );
};
