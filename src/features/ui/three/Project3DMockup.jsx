import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

const DeviceMesh = ({ accentColor = "#1E1E1C", mockupType = "generic" }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const mouseX = state.pointer.x * 0.35;
    const mouseY = state.pointer.y * 0.35;
    if (meshRef.current) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouseX, 0.08);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -mouseY, 0.08);
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.4}>
      <group ref={meshRef} position={[0, 0, 0]}>
        {/* Device Outer Frame (Warm Graphite Obsidian) */}
        <RoundedBox args={[3.3, 2.1, 0.12]} radius={0.08} smoothness={4}>
          <meshStandardMaterial
            color="#222220"
            roughness={0.3}
            metalness={0.7}
          />
        </RoundedBox>

        {/* Screen Bezel Accent Border */}
        <RoundedBox args={[3.12, 1.92, 0.13]} radius={0.04} smoothness={4} position={[0, 0, 0.01]}>
          <meshStandardMaterial
            color="#121210"
            roughness={0.2}
          />
        </RoundedBox>

        {/* Browser Top Bar */}
        <mesh position={[0, 0.84, 0.08]}>
          <planeGeometry args={[2.98, 0.16]} />
          <meshBasicMaterial color="#1E1E1C" />
        </mesh>

        {/* Browser Dot Indicators */}
        <mesh position={[-1.3, 0.84, 0.09]}>
          <circleGeometry args={[0.035, 16]} />
          <meshBasicMaterial color="#EF4444" />
        </mesh>
        <mesh position={[-1.2, 0.84, 0.09]}>
          <circleGeometry args={[0.035, 16]} />
          <meshBasicMaterial color="#F59E0B" />
        </mesh>
        <mesh position={[-1.1, 0.84, 0.09]}>
          <circleGeometry args={[0.035, 16]} />
          <meshBasicMaterial color="#10B981" />
        </mesh>

        {/* Screen Interior Background */}
        <mesh position={[0, -0.06, 0.08]}>
          <planeGeometry args={[2.98, 1.62]} />
          <meshStandardMaterial
            color="#141413"
            roughness={0.2}
          />
        </mesh>

        {/* Clean Wireframe UI Structure */}
        {[-0.45, -0.1, 0.25].map((y, i) => (
          <mesh key={i} position={[-0.45, y, 0.09]}>
            <planeGeometry args={[1.75 - i * 0.25, 0.07]} />
            <meshBasicMaterial color="#E8E5DC" opacity={0.75} transparent />
          </mesh>
        ))}

        {/* Clean Column Widget */}
        <mesh position={[0.92, -0.05, 0.09]}>
          <planeGeometry args={[0.82, 1.2]} />
          <meshBasicMaterial color="#1E1E1C" />
        </mesh>
        <mesh position={[0.92, 0.25, 0.1]}>
          <planeGeometry args={[0.62, 0.08]} />
          <meshBasicMaterial color="#8C8A82" />
        </mesh>
        <mesh position={[0.92, 0.05, 0.1]}>
          <planeGeometry args={[0.62, 0.06]} />
          <meshBasicMaterial color="#E8E5DC" opacity={0.6} transparent />
        </mesh>
      </group>
    </Float>
  );
};

export const Project3DMockup = ({
  accentColor = "#1E1E1C",
  mockupType = "generic",
  className = "w-full h-48 sm:h-56",
}) => {
  return (
    <div className={`relative ${className} pointer-events-auto overflow-hidden`}>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center text-xs font-mono text-[#8C8A82]">
            PREVIEWING WORKSTATION...
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 3.8], fov: 44 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full"
        >
          <ambientLight intensity={1.4} />
          <directionalLight position={[4, 5, 4]} intensity={2.0} color="#FFFFFF" />
          <directionalLight position={[-4, -3, 2]} intensity={0.8} color="#E8E5DC" />
          <DeviceMesh accentColor={accentColor} mockupType={mockupType} />
        </Canvas>
      </Suspense>
    </div>
  );
};
