import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const Particles = ({ count = 120, shouldReduceMotion }) => {
  const points = useRef();
  const { mouse } = useThree();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute in a large sphere for space dust effect
      const r = 5 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (points.current && !shouldReduceMotion) {
      const t = state.clock.getElapsedTime();

      // Smooth mouse parallax
      targetRotation.current.x = THREE.MathUtils.damp(
        targetRotation.current.x, mouse.y * 0.04, 2, delta
      );
      targetRotation.current.y = THREE.MathUtils.damp(
        targetRotation.current.y, mouse.x * 0.04, 2, delta
      );

      points.current.rotation.y = t * 0.008 + targetRotation.current.y;
      points.current.rotation.x = t * 0.004 + targetRotation.current.x;

      // Gentle twinkling via size oscillation
      if (points.current.material) {
        points.current.material.size = 0.025 + Math.sin(t * 1.2) * 0.008;
      }
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#ffffff"
        transparent
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
