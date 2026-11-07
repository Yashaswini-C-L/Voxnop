import React from 'react';
import * as THREE from 'three';

export default function Platform() {
  return (
    <group position={[0, 0, 0]}>
      {/* Lower Platform Tier - Metallic Cobalt Blue */}
      <mesh position={[0, 0.11, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.18, 1.22, 0.22, 64]} />
        <meshStandardMaterial
          color="#0A2B68"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Middle Accent Trim - Electric Blue */}
      <mesh position={[0, 0.225, 0]}>
        <cylinderGeometry args={[1.17, 1.18, 0.015, 64]} />
        <meshStandardMaterial
          color="#0866E8"
          metalness={0.6}
          roughness={0.15}
        />
      </mesh>

      {/* Upper Deck - Metallic White / Brushed Silver */}
      <mesh position={[0, 0.255, 0]} receiveShadow>
        <cylinderGeometry args={[1.14, 1.16, 0.05, 64]} />
        <meshStandardMaterial
          color="#F8FAFC"
          metalness={0.35}
          roughness={0.18}
        />
      </mesh>

      {/* Circular Inset Decorative Groove */}
      <mesh position={[0, 0.282, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.02, 1.04, 64]} />
        <meshBasicMaterial
          color="#12B8F5"
          transparent
          opacity={0.65}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Neon Cyan Base Ring (Ground Level) */}
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.24, 0.024, 16, 64]} />
        <meshBasicMaterial color="#12B8F5" />
      </mesh>

      {/* Floor Halo Light Puddle */}
      <mesh position={[0, 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.20, 1.55, 64]} />
        <meshBasicMaterial
          color="#12B8F5"
          transparent
          opacity={0.38}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Arm Mounting Base Pad */}
      <mesh position={[-0.35, 0.28, 0]} receiveShadow>
        <cylinderGeometry args={[0.36, 0.38, 0.03, 36]} />
        <meshStandardMaterial
          color="#E2E8F0"
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>

      {/* Base Pad Accent Ring */}
      <mesh position={[-0.35, 0.296, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.30, 0.32, 36]} />
        <meshBasicMaterial color="#0866E8" transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>

      {/* Ground Glow PointLight */}
      <pointLight position={[0, 0.08, 0]} color="#12B8F5" intensity={1.4} distance={3.5} />
    </group>
  );
}
