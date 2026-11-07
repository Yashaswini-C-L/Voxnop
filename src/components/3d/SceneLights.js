import React from 'react';

export default function SceneLights() {
  return (
    <>
      {/* Ambient Fill Light */}
      <ambientLight intensity={0.8} color="#F1F5F9" />

      {/* Main Studio Key Light */}
      <directionalLight
        position={[4, 6, 3.5]}
        intensity={1.2}
        color="#FFFFFF"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={15}
        shadow-camera-left={-3.5}
        shadow-camera-right={3.5}
        shadow-camera-top={3.5}
        shadow-camera-bottom={-3.5}
        shadow-bias={-0.0002}
      />

      {/* Soft Secondary Fill Light */}
      <directionalLight
        position={[-4, 3, -2.5]}
        intensity={0.5}
        color="#E2E8F0"
      />

      {/* Electric Blue Accent Rim Light */}
      <pointLight
        position={[-2.5, 2.2, 2.0]}
        color="#0866E8"
        intensity={0.85}
        distance={6}
      />

      {/* Cyan Platform Underglow / Bounce Light */}
      <pointLight
        position={[0.8, 0.5, 1.2]}
        color="#12B8F5"
        intensity={0.65}
        distance={4}
      />
    </>
  );
}
