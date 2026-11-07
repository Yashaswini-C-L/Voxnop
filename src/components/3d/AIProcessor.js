import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function AIProcessor({ interactionIntensity = 0 }) {
  const chipGroupRef = useRef();
  const pointLightRef = useRef();
  const coreMeshRef = useRef();

  // High-resolution procedural texture with "AI" typography and circuit borders
  const aiTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Deep Navy / Electric Blue Radial Gradient Background
    const bgGrad = ctx.createRadialGradient(256, 256, 15, 256, 256, 250);
    bgGrad.addColorStop(0, '#12B8F5');
    bgGrad.addColorStop(0.38, '#0866E8');
    bgGrad.addColorStop(1, '#071D49');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 512, 512);

    // Outer Solid White Border
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 14;
    ctx.strokeRect(30, 30, 452, 452);

    // Inner Glowing Cyan Border
    ctx.strokeStyle = '#12B8F5';
    ctx.lineWidth = 20;
    ctx.strokeRect(52, 52, 408, 408);

    // Micro Circuit Corner Traces
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(80, 80); ctx.lineTo(135, 80); ctx.lineTo(155, 100);
    ctx.moveTo(432, 80); ctx.lineTo(377, 80); ctx.lineTo(357, 100);
    ctx.moveTo(80, 432); ctx.lineTo(135, 432); ctx.lineTo(155, 412);
    ctx.moveTo(432, 432); ctx.lineTo(377, 432); ctx.lineTo(357, 412);
    ctx.stroke();

    // Corner Nodes
    ctx.fillStyle = '#FFFFFF';
    [[95, 95], [417, 95], [95, 417], [417, 417]].forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
    });

    // Central Bold White "AI" Letters
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 220px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = '#12B8F5';
    ctx.shadowBlur = 32;
    ctx.fillText('AI', 256, 265);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    return texture;
  }, []);

  // Perimeter Metallic Pins (6 per side)
  const pins = useMemo(() => {
    const list = [];
    const count = 6;
    const spacing = 0.07;
    const offset = ((count - 1) * spacing) / 2;
    const dist = 0.27;

    for (let i = 0; i < count; i++) {
      const p = -offset + i * spacing;
      // North & South
      list.push({ pos: [p, 0, -dist], rot: [0, 0, 0] });
      list.push({ pos: [p, 0, dist], rot: [0, 0, 0] });
      // East & West
      list.push({ pos: [dist, 0, p], rot: [0, Math.PI / 2, 0] });
      list.push({ pos: [-dist, 0, p], rot: [0, Math.PI / 2, 0] });
    }
    return list;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (chipGroupRef.current) {
      // Gentle micro-bobbing synchronized with holding
      chipGroupRef.current.position.y = 0.44 + Math.sin(t * 1.5) * 0.015;
      // Stable forward tilt facing the eye-level camera
      chipGroupRef.current.rotation.x = 0.22 + Math.sin(t * 1.0) * 0.012;
      chipGroupRef.current.rotation.y = -0.18 + Math.cos(t * 0.8) * 0.015;
      chipGroupRef.current.rotation.z = 0.04;
    }

    // Glow pulse modulation
    const pulse = (Math.sin(t * 3.0) + 1) * 0.5;
    const intensity = 1.3 + pulse * 0.4 + interactionIntensity * 1.8;

    if (pointLightRef.current) {
      pointLightRef.current.intensity = intensity * 1.6;
    }

    if (coreMeshRef.current && coreMeshRef.current.material) {
      coreMeshRef.current.material.emissiveIntensity = 0.7 + intensity * 0.45;
    }
  });

  return (
    <group position={[0.32, 0.44, 0]}>
      {/* Floating Microchip Package held by robot hand */}
      <group ref={chipGroupRef}>
        {/* Main Chip Substrate Package (Deep Navy Matte Ceramic) */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.50, 0.045, 0.50]} />
          <meshStandardMaterial
            color="#071D49"
            roughness={0.35}
            metalness={0.6}
          />
        </mesh>

        {/* Silver Outer Heat Spreader Rim */}
        <mesh position={[0, 0.018, 0]}>
          <boxGeometry args={[0.46, 0.02, 0.46]} />
          <meshStandardMaterial
            color="#E2E8F0"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* AI Die Face Plate with "AI" Canvas Texture */}
        <mesh ref={coreMeshRef} position={[0, 0.032, 0]}>
          <boxGeometry args={[0.40, 0.01, 0.40]} />
          <meshStandardMaterial
            map={aiTexture}
            emissiveMap={aiTexture}
            emissive="#12B8F5"
            emissiveIntensity={0.8}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>

        {/* Perimeter Metallic Pins */}
        {pins.map((pin, i) => (
          <mesh key={i} position={pin.pos} rotation={pin.rot} castShadow>
            <boxGeometry args={[0.026, 0.012, 0.06]} />
            <meshStandardMaterial
              color="#E2E8F0"
              metalness={0.95}
              roughness={0.15}
            />
          </mesh>
        ))}

        {/* Luminous Core Light */}
        <pointLight
          ref={pointLightRef}
          position={[0, 0.15, 0]}
          color="#12B8F5"
          distance={2.5}
          intensity={1.8}
        />
      </group>
    </group>
  );
}
