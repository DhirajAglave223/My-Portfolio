import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Dynamic connection lines between the center and orbiting nodes,
 * plus ring connections between adjacent nodes on the same orbit.
 *
 * All geometry is pre-allocated and updated in-place for performance.
 */
export const TechNetworkLines = ({ nodeRefs, orbitConfig, shouldReduceMotion = false }) => {
  const radialRef = useRef();
  const ringRef = useRef();

  // Count the lines we need
  const totalNodes = orbitConfig.reduce((sum, o) => sum + o.count, 0);
  // Radial: center -> each node
  const radialLineCount = totalNodes;
  // Ring: each node -> next node on same orbit
  const ringLineCount = totalNodes;

  const radialPositions = useMemo(() => new Float32Array(radialLineCount * 6), [radialLineCount]);
  const ringPositions = useMemo(() => new Float32Array(ringLineCount * 6), [ringLineCount]);

  const darkRadialColor = useMemo(() => new THREE.Color('#00e5ff'), []);
  const lightRadialColor = useMemo(() => new THREE.Color('#1e3a8a'), []);
  
  const darkRingColor = useMemo(() => new THREE.Color('#38bdf8'), []);
  const lightRingColor = useMemo(() => new THREE.Color('#1e40af'), []);

  useFrame((state) => {
    const nodes = nodeRefs.current;
    if (!nodes || nodes.length === 0) return;

    const t = state.clock.getElapsedTime();
    const isLight = document.body.classList.contains('light-theme');

    // --- Radial lines: center (0,0,0) → each node ---
    let idx = 0;
    for (let i = 0; i < nodes.length; i++) {
      if (!nodes[i]) continue;
      radialPositions[idx * 6 + 0] = 0;
      radialPositions[idx * 6 + 1] = 0;
      radialPositions[idx * 6 + 2] = 0;
      radialPositions[idx * 6 + 3] = nodes[i].position.x;
      radialPositions[idx * 6 + 4] = nodes[i].position.y;
      radialPositions[idx * 6 + 5] = nodes[i].position.z;
      idx++;
    }
    if (radialRef.current) {
      radialRef.current.geometry.attributes.position.needsUpdate = true;
      radialRef.current.material.color.lerp(isLight ? lightRadialColor : darkRadialColor, 0.1);
      radialRef.current.material.opacity = isLight 
        ? 0.35 + Math.sin(t * 1.2) * 0.05
        : 0.08 + Math.sin(t * 1.2) * 0.03;
    }

    // --- Ring lines: node[i] → node[i+1] within same orbit ---
    let rIdx = 0;
    let globalIdx = 0;
    for (const orbit of orbitConfig) {
      for (let i = 0; i < orbit.count; i++) {
        const currentNode = nodes[globalIdx + i];
        const nextNode = nodes[globalIdx + ((i + 1) % orbit.count)];
        if (!currentNode || !nextNode) continue;
        ringPositions[rIdx * 6 + 0] = currentNode.position.x;
        ringPositions[rIdx * 6 + 1] = currentNode.position.y;
        ringPositions[rIdx * 6 + 2] = currentNode.position.z;
        ringPositions[rIdx * 6 + 3] = nextNode.position.x;
        ringPositions[rIdx * 6 + 4] = nextNode.position.y;
        ringPositions[rIdx * 6 + 5] = nextNode.position.z;
        rIdx++;
      }
      globalIdx += orbit.count;
    }
    if (ringRef.current) {
      ringRef.current.geometry.attributes.position.needsUpdate = true;
      ringRef.current.material.color.lerp(isLight ? lightRingColor : darkRingColor, 0.1);
      ringRef.current.material.opacity = isLight
        ? 0.4 + Math.sin(t * 0.8) * 0.05
        : 0.12 + Math.sin(t * 0.8) * 0.04;
    }
  });

  return (
    <group>
      {/* Radial connections: center → nodes */}
      <lineSegments ref={radialRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={radialLineCount * 2}
            array={radialPositions}
            itemSize={3}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Ring connections: adjacent nodes */}
      <lineSegments ref={ringRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={ringLineCount * 2}
            array={ringPositions}
            itemSize={3}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.14}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
};
