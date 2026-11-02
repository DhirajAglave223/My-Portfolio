import React, { useRef } from 'react';
import * as THREE from 'three';

export const CentralAICore = ({ shouldReduceMotion = false }) => {
  const coreRef = useRef();
  const wireRef = useRef();
  const outerGlowRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();
  const ringRef3 = useRef();

  // Core is static — no rotation or animation
  // useFrame kept as no-op for future extensibility

  return (
    <group position={[0, 0, 0]}>
      {/* Solid geometric core */}
      <group ref={coreRef}>
        <mesh>
          <octahedronGeometry args={[0.35, 0]} />
          <meshBasicMaterial
            color="#00e5ff"
            transparent
            opacity={0.85}
          />
        </mesh>
      </group>

      {/* Wireframe overlay — counter-rotating */}
      <group ref={wireRef}>
        <mesh>
          <icosahedronGeometry args={[0.42, 1]} />
          <meshBasicMaterial
            color="#00e5ff"
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>
      </group>

      {/* Outer additive glow sphere */}
      <mesh ref={outerGlowRef}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Single core point light */}
      <pointLight color="#00e5ff" intensity={2.0} distance={8} decay={2} />

      {/* Gimbal Ring 1 — inner */}
      <group ref={ringRef1} rotation={[Math.PI / 3, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.65, 0.008, 8, 48]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.4} />
        </mesh>
      </group>

      {/* Gimbal Ring 2 — middle */}
      <group ref={ringRef2} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[0.85, 0.006, 8, 48]} />
          <meshBasicMaterial color="#0ea5e9" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Gimbal Ring 3 — outer */}
      <group ref={ringRef3} rotation={[Math.PI / 5, -Math.PI / 3, 0]}>
        <mesh>
          <torusGeometry args={[1.05, 0.005, 8, 48]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.2} />
        </mesh>
      </group>
    </group>
  );
};
