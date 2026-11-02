import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

import { TechEcosystem } from './TechEcosystem';

const CameraController = ({ shouldReduceMotion }) => {
  const { camera } = useThree();
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame((state, delta) => {
    if (!shouldReduceMotion) {
      // Subtle mouse parallax — smooth and cinematic
      const targetX = mousePos.current.x * 0.6;
      const targetY = mousePos.current.y * 0.4;
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 2.5, delta);
    }

    // Scroll-based camera pull-back
    const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const scrollZ = Math.min(currentScrollY * 0.003, 2.0);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 9 + scrollZ, 3, delta);

    camera.lookAt(0, 0, 0);
  });

  return null;
};

export const HeroScene = ({ shouldReduceMotion = false }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div 
      className="hero-scene-wrapper"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        zIndex: 0,
        pointerEvents: 'auto',
      }}
    >
      <Canvas
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        style={{ pointerEvents: 'auto' }}
        frameloop="always"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={45} />
        <CameraController shouldReduceMotion={shouldReduceMotion} />

        {/* Lighting — minimal for performance, meshBasicMaterial doesn't use lights */}
        <ambientLight intensity={0.6} />
        <pointLight position={[8, 8, 8]} intensity={1.2} color="#00e5ff" distance={35} />
        <pointLight position={[-8, -6, -4]} intensity={0.8} color="#b580ff" distance={25} />

        {/* 3D Technology Ecosystem */}
        <TechEcosystem shouldReduceMotion={shouldReduceMotion} />
      </Canvas>
    </div>
  );
};
