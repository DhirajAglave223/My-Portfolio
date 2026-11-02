import React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

import { Particles } from './Particles';

const CameraController = ({ shouldReduceMotion }) => {
  const { camera } = useThree();

  useFrame(() => {
    camera.lookAt(0, 0, 0);
  });

  return null;
};

export const GlobalSpaceScene = ({ shouldReduceMotion = false }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, /* Stay behind HTML content */
        pointerEvents: 'none', /* Crucial: Let pointer events pass through to HTML body */
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
        // eventSource connects pointer events securely from the HTML root down to the canvas
        // This solves the z-index pointer blocker issue perfectly!
        eventSource={typeof document !== 'undefined' ? document.getElementById('root') : undefined}
        eventPrefix="client"
        frameloop="always"
        style={{ pointerEvents: 'none' }} // Canvas itself doesn't catch events, eventSource does
      >
        <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={45} />
        <CameraController shouldReduceMotion={shouldReduceMotion} />

        {/* Global minimal lighting */}
        <ambientLight intensity={0.6} />
        <pointLight position={[8, 8, 8]} intensity={1.2} color="#00e5ff" distance={35} />
        <pointLight position={[-8, -6, -4]} intensity={0.8} color="#0ea5e9" distance={25} />

        {/* Global Space Particles */}
        <Particles count={isMobile ? 80 : 200} shouldReduceMotion={shouldReduceMotion} />
      </Canvas>
    </div>
  );
};
