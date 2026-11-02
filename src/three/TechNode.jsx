import React, { forwardRef, useMemo, useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * A single technology icon node rendered as a pure Three.js sprite.
 * Added subtle hover interaction: scale up and soft glow.
 */
export const TechNode = forwardRef(({
  color,
  texture,
}, ref) => {
  const [hovered, setHovered] = useState(false);
  const spriteRef = useRef();
  const glowRef = useRef();
  
  // Uniform icon size for all technologies
  const baseSize = 0.55;

  const spriteMat = useMemo(() => new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    blending: THREE.NormalBlending,
    depthWrite: false,
  }), [texture]);

  // Procedural glow texture
  const glowTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  const glowMat = useMemo(() => new THREE.SpriteMaterial({
    map: glowTexture,
    color: color,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), [glowTexture, color]);

  useFrame((state, delta) => {
    // Smooth scale on hover
    const targetScale = hovered ? baseSize * 1.25 : baseSize;
    if (spriteRef.current) {
      const currentScale = spriteRef.current.scale.x;
      const newScale = THREE.MathUtils.damp(currentScale, targetScale, 6, delta);
      spriteRef.current.scale.set(newScale, newScale, 1);
    }

    // Smooth glow opacity
    const targetGlow = hovered ? 0.4 : 0;
    if (glowRef.current) {
      glowRef.current.material.opacity = THREE.MathUtils.damp(glowRef.current.material.opacity, targetGlow, 8, delta);
      // Glow scales with icon
      const scale = spriteRef.current ? spriteRef.current.scale.x * 2.5 : baseSize * 2.5;
      glowRef.current.scale.set(scale, scale, 1);
    }
  });

  return (
    <group ref={ref}>
      {/* Glow sprite */}
      <sprite ref={glowRef} material={glowMat} renderOrder={1} />
      
      {/* Main icon sprite */}
      <sprite 
        ref={spriteRef} 
        material={spriteMat} 
        renderOrder={2}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      />
    </group>
  );
});

TechNode.displayName = 'TechNode';
