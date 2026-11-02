import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const createOrbitGeometry = (radius, segments = 96) => {
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  // Compute line distances for dashed material
  const distances = new Float32Array(points.length);
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += points[i].distanceTo(points[i - 1]);
    distances[i] = total;
  }
  geometry.setAttribute('lineDistance', new THREE.BufferAttribute(distances, 1));

  return geometry;
};

export const TechOrbitPaths = ({ shouldReduceMotion = false }) => {
  const matRefs = useRef([]);

  const orbits = useMemo(() => [
    {
      geometry: createOrbitGeometry(2.2),
      color: '#00e5ff',
      opacity: 0.25,
      dashSize: 0.15,
      gapSize: 0.08,
    },
    {
      geometry: createOrbitGeometry(3.5),
      color: '#0ea5e9',
      opacity: 0.18,
      dashSize: 0.2,
      gapSize: 0.12,
    },
    {
      geometry: createOrbitGeometry(5.0),
      color: '#38bdf8',
      opacity: 0.12,
      dashSize: 0.25,
      gapSize: 0.15,
    },
  ], []);

  useFrame((state) => {
    if (shouldReduceMotion) return;
    const t = state.clock.getElapsedTime();
    matRefs.current.forEach((mat, i) => {
      if (mat) {
        mat.dashOffset = -t * (0.15 - i * 0.03);
      }
    });
  });

  return (
    <group>
      {orbits.map((orbit, idx) => (
        <line key={idx} geometry={orbit.geometry}>
          <lineDashedMaterial
            ref={(el) => (matRefs.current[idx] = el)}
            color={orbit.color}
            transparent
            opacity={orbit.opacity}
            dashSize={orbit.dashSize}
            gapSize={orbit.gapSize}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </line>
      ))}
    </group>
  );
};
