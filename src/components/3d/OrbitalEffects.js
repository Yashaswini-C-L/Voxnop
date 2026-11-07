import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export default function OrbitalEffects({ interactionIntensity = 0 }) {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const nodesRef = useRef();

  const nodeCount = 10;
  const nodes = useMemo(() => {
    const list = [];
    for (let i = 0; i < nodeCount; i++) {
      list.push({
        phase: (i / nodeCount) * Math.PI * 2,
        speed: 0.35 + (i % 2) * 0.15,
        color: i % 2 === 0 ? '#12B8F5' : '#0866E8',
        size: 0.018 + (i % 3) * 0.005,
      });
    }
    return list;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (ring1Ref.current) {
      ring1Ref.current.rotation.y = t * 0.12;
      ring1Ref.current.rotation.z = Math.sin(t * 0.2) * 0.04;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.09;
      ring2Ref.current.rotation.x = 0.38 + Math.cos(t * 0.25) * 0.04;
    }

    if (nodesRef.current) {
      const children = nodesRef.current.children;
      for (let i = 0; i < children.length; i++) {
        const node = nodes[i];
        if (node && children[i]) {
          const angle = node.phase + t * node.speed * 0.5;
          const a = 1.25;
          const b = 0.88;
          children[i].position.x = 0.02 + Math.cos(angle) * a;
          children[i].position.z = Math.sin(angle) * b;
          children[i].position.y = 0.55 + Math.sin(angle * 2 + t) * 0.16;
        }
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Primary Orbital Ellipse */}
      <group ref={ring1Ref} position={[0.04, 0.55, 0]} rotation={[0.35, 0, -0.18]}>
        <mesh>
          <torusGeometry args={[1.15, 0.003, 12, 80]} />
          <meshBasicMaterial
            color="#12B8F5"
            transparent
            opacity={0.45 + interactionIntensity * 0.2}
          />
        </mesh>
      </group>

      {/* Secondary Orbital Ellipse */}
      <group ref={ring2Ref} position={[0.06, 0.52, 0]} rotation={[-0.28, 0.32, 0.15]}>
        <mesh>
          <torusGeometry args={[0.98, 0.0028, 12, 80]} />
          <meshBasicMaterial
            color="#0866E8"
            transparent
            opacity={0.35 + interactionIntensity * 0.15}
          />
        </mesh>
      </group>

      {/* Glowing Orbital Nodes */}
      <group ref={nodesRef}>
        {nodes.map((node, i) => (
          <mesh key={i}>
            <sphereGeometry args={[node.size, 12, 12]} />
            <meshBasicMaterial color={node.color} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
