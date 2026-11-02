import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PresentationControls } from '@react-three/drei';
import { renderToStaticMarkup } from 'react-dom/server';
import * as THREE from 'three';

// react-icons
import {
  FaReact, FaPython, FaJs, FaHtml5, FaCss3Alt, FaBootstrap,
  FaGitAlt, FaGithub, FaGitlab,
} from 'react-icons/fa';
import {
  SiFastapi, SiMysql, SiPostgresql, SiMongodb,
  SiSupabase, SiFirebase, SiFlutter, SiDart,
  SiRender, SiNetlify, SiVercel,
  SiTailwindcss, SiPostman,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

import { TechNode } from './TechNode';
import { CentralAICore } from './CentralAICore';
import { TechNetworkLines } from './TechNetworkLines';
import { Particles } from './Particles';

/* ── Texture Generation ── */
function createIconTexture(IconComponent, color) {
  // Render the react-icon to static SVG markup
  const iconSvg = renderToStaticMarkup(<IconComponent size={140} color={color} />);

  // Force-replace all color references for data URI context
  let colored = iconSvg
    .replace(/currentColor/g, color)
    .replace(/color:\s*[^;"]+/g, `color:${color}`)
    .replace(/fill:\s*[^;"]+/g, `fill:${color}`);

  // Extract viewBox and inner content
  const vbMatch = colored.match(/viewBox="([^"]+)"/);
  const viewBox = vbMatch ? vbMatch[1] : '0 0 24 24';
  const innerMatch = colored.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  const inner = innerMatch ? innerMatch[1] : '';

  // Build composite SVG: icon only, no background circle
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
    <svg x="28" y="28" width="200" height="200" viewBox="${viewBox}" fill="${color}">
      ${inner}
    </svg>
  </svg>`;

  const uri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  const texture = new THREE.TextureLoader().load(uri);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/* ── Technology Definitions ── */
// Inner orbit (6) — core technologies
const INNER = [
  { id: 'react',      Icon: FaReact,      color: '#00e5ff' },
  { id: 'python',     Icon: FaPython,     color: '#38bdf8' },
  { id: 'javascript', Icon: FaJs,         color: '#facc15' },
  { id: 'fastapi',    Icon: SiFastapi,    color: '#2dd4bf' },
  { id: 'postgresql', Icon: SiPostgresql, color: '#60a5fa' },
  { id: 'git',        Icon: FaGitAlt,     color: '#fb923c' },
];

// Middle orbit (8) — databases & platforms
const MIDDLE = [
  { id: 'mongodb',  Icon: SiMongodb,  color: '#4ade80' },
  { id: 'mysql',    Icon: SiMysql,    color: '#0ea5e9' },
  { id: 'supabase', Icon: SiSupabase, color: '#3fcf8e' },
  { id: 'firebase', Icon: SiFirebase, color: '#ffca28' },
  { id: 'github',   Icon: FaGithub,   color: '#e2e8f0' },
  { id: 'gitlab',   Icon: FaGitlab,   color: '#fc6d26' },
  { id: 'html',     Icon: FaHtml5,    color: '#e34f26' },
  { id: 'css',      Icon: FaCss3Alt,  color: '#38bdf8' },
];

// Outer orbit (9) — tools & deployment
const OUTER = [
  { id: 'bootstrap',   Icon: FaBootstrap,   color: '#7952b3' },
  { id: 'tailwindcss', Icon: SiTailwindcss, color: '#06b6d4' },
  { id: 'flutter',     Icon: SiFlutter,     color: '#02569b' },
  { id: 'dart',        Icon: SiDart,        color: '#0175c2' },
  { id: 'vercel',      Icon: SiVercel,      color: '#e2e8f0' },
  { id: 'netlify',     Icon: SiNetlify,     color: '#00c7b7' },
  { id: 'render',      Icon: SiRender,      color: '#46e3b7' },
  { id: 'postman',     Icon: SiPostman,     color: '#ff6c37' },
  { id: 'vscode',      Icon: VscVscode,     color: '#007acc' },
];

// Orbit configuration — shared with TechNetworkLines
const ORBIT_CONFIG = [
  { radius: 2.2,  count: INNER.length,  speed: 0.02 },
  { radius: 3.5,  count: MIDDLE.length, speed: 0.015 },
  { radius: 5.0,  count: OUTER.length,  speed: 0.01 },
];

/* ── Main Component ── */
export const TechEcosystem = ({ shouldReduceMotion = false }) => {
  const { viewport } = useThree();
  const ecosystemGroupRef = useRef();
  const ecosystemRef = useRef();
  const nodeRefs = useRef([]);

  // Build flat node array with orbital parameters
  const nodesData = useMemo(() => {
    const layers = [INNER, MIDDLE, OUTER];
    const allNodes = [];

    layers.forEach((layer, layerIdx) => {
      const orbit = ORBIT_CONFIG[layerIdx];
      layer.forEach((tech, nodeIdx) => {
        const phase = (nodeIdx / layer.length) * Math.PI * 2;
        allNodes.push({
          ...tech,
          texture: createIconTexture(tech.Icon, tech.color),
          phase,
          orbitLayer: layerIdx,
          radius: orbit.radius,
          speed: orbit.speed,
        });
      });
    });

    return allNodes;
  }, []);

  /* ── useFrame: orbital animation only, no scroll tracking ── */
  useFrame((state, delta) => {
    if (shouldReduceMotion) return;
    const t = state.clock.getElapsedTime();

    // Static mobile Y offset — no scroll tracking
    if (ecosystemGroupRef.current) {
      const baseMobileY = (typeof window !== 'undefined' && window.innerWidth < 1024)
        ? -viewport.height * 0.28
        : 0;
      ecosystemGroupRef.current.position.y = baseMobileY;

      // Subtle mouse parallax (gentle tilt/depth)
      const targetX = (state.pointer.x * 0.1);
      const targetY = (state.pointer.y * 0.1);
      ecosystemGroupRef.current.rotation.y = THREE.MathUtils.damp(ecosystemGroupRef.current.rotation.y, targetX, 2, delta);
      ecosystemGroupRef.current.rotation.x = THREE.MathUtils.damp(ecosystemGroupRef.current.rotation.x, -targetY, 2, delta);
    }

    // Orbit icons — alternating directions per layer
    // Layer 0 (inner):  clockwise     (+1)
    // Layer 1 (middle): counter-clockwise (-1)
    // Layer 2 (outer):  clockwise     (+1)
    nodeRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const n = nodesData[i];
      const direction = n.orbitLayer % 2 === 0 ? 1 : -1;
      const angle = t * n.speed * direction + n.phase;

      ref.position.x = Math.cos(angle) * n.radius;
      ref.position.y = 0;
      ref.position.z = Math.sin(angle) * n.radius;
    });
  });

  /* ── Responsive Architecture ── */
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const particleCount = isMobile ? 50 : 120;

  // Max width of Hero container is 1280px (minus 4rem padding = 64px)
  const maxContainerWidth = 1216;
  const currentContainerWidth = typeof window !== 'undefined' ? Math.min(window.innerWidth - 64, maxContainerWidth) : maxContainerWidth;

  // Right column width on desktop is half the container
  const heroVisualPixelWidth = isMobile ? window.innerWidth : currentContainerWidth / 2;
  const heroVisualWorldWidth = (heroVisualPixelWidth / (typeof window !== 'undefined' ? window.innerWidth : 1280)) * viewport.width;

  // Maximum theoretical diameter of our orbits including icons
  const maxTreeDiameter = 12.0;

  // Calculate dynamic scale to ensure it fits inside the visual column
  const dynamicScale = Math.min(
    (heroVisualWorldWidth * 1.15) / maxTreeDiameter,
    (viewport.height * 0.95) / maxTreeDiameter,
    2.2
  );

  // Calculate dynamic X Position to center it in the right column
  const xOffsetPixels = isMobile ? 0 : currentContainerWidth / 4;
  const targetX = (xOffsetPixels / (typeof window !== 'undefined' ? window.innerWidth : 1280)) * viewport.width;

  // 40° tilt in radians
  const tiltAngle = (40 * Math.PI) / 180;

  return (
    <group ref={ecosystemGroupRef} position={[targetX, 0, 0]} scale={dynamicScale}>
      <PresentationControls
        global={false}
        cursor={true}
        snap={{ mass: 4, tension: 400 }}
        speed={1.5}
        polar={[-0.15, 0.15]}
        azimuth={[-0.25, 0.25]}
      >
        <group ref={ecosystemRef} rotation={[tiltAngle, 0, -0.05]}>
          {/* Central AI Core */}
          <CentralAICore shouldReduceMotion={shouldReduceMotion} />

          {/* Connection Lines */}
          <TechNetworkLines
            nodeRefs={nodeRefs}
            orbitConfig={ORBIT_CONFIG}
            shouldReduceMotion={shouldReduceMotion}
          />

          {/* Technology Nodes — all uniform size, static placement */}
          {nodesData.map((node, i) => (
            <TechNode
              key={node.id}
              ref={(el) => (nodeRefs.current[i] = el)}
              color={node.color}
              texture={node.texture}
            />
          ))}
        </group>
      </PresentationControls>

      {/* Space Dust Particles */}
      <Particles count={particleCount} shouldReduceMotion={shouldReduceMotion} />
    </group>
  );
};
