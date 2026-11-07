import React, { useState, Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SceneLights from './3d/SceneLights';
import Platform from './3d/Platform';
import AIProcessor from './3d/AIProcessor';
import RoboticArm from './3d/RoboticArm';
import OrbitalEffects from './3d/OrbitalEffects';
import voxnopMark from '../assets/voxnop-mark.png';

// Fallback if WebGL is unavailable
function WebGLFallback() {
  return (
    <div className="w-full h-full min-h-[260px] flex flex-col items-center justify-center p-6 bg-transparent select-none">
      <div className="relative mb-3">
        <div className="absolute -inset-3 bg-cyan-accent/20 rounded-full blur-xl animate-pulse" />
        <img
          src={voxnopMark}
          alt="Voxnop AI & Robotics"
          className="relative w-20 h-20 object-contain drop-shadow-md"
        />
      </div>
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 text-electric-blue text-[11px] font-semibold uppercase tracking-wider font-poppins">
          <span className="w-2 h-2 rounded-full bg-electric-blue animate-ping" />
          Autonomous Robotics & AI System
        </div>
      </div>
    </div>
  );
}

// Scene loader
function SceneLoader() {
  return (
    <div className="w-full h-full min-h-[260px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="w-6 h-6 rounded-full border-2 border-electric-blue/20 border-t-electric-blue animate-spin" />
        <span className="text-[10px] text-slate-grey tracking-widest uppercase font-poppins">
          Loading 3D Robotics...
        </span>
      </div>
    </div>
  );
}

// 3D Scene content
function SceneWorld({ interactionIntensity, setInteractionIntensity }) {
  const { size } = useThree();

  // Responsive scale ensuring complete upright arm and chip fit with generous padding
  const isMobile = size.width < 640;
  const sceneScale = isMobile ? 0.88 : 0.96;

  return (
    <>
      <SceneLights />

      {/* Upright heroic model group */}
      <group scale={[sceneScale, sceneScale, sceneScale]} position={[0, -0.06, 0]}>
        <Platform />
        <RoboticArm onInteractionChange={setInteractionIntensity} />
        <AIProcessor interactionIntensity={interactionIntensity} />
        <OrbitalEffects interactionIntensity={interactionIntensity} />
      </group>

      <OrbitControls
        target={[0.0, 0.46, 0]}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.45}
        dampingFactor={0.08}
        minPolarAngle={Math.PI / 2.2}
        maxPolarAngle={Math.PI / 1.95}
        minAzimuthAngle={-Math.PI / 5}
        maxAzimuthAngle={Math.PI / 5}
      />
    </>
  );
}

export default function RoboticsScene() {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [interactionIntensity, setInteractionIntensity] = useState(0);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return <WebGLFallback />;
  }

  return (
    <div className="relative w-full max-w-xl mx-auto h-[320px] sm:h-[370px] md:h-[420px] lg:h-[460px] select-none flex items-center justify-center">
      {/* Background Soft Glow Aura */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-3/4 h-3/4 rounded-full bg-cyan-accent/[0.07] blur-3xl" />
        <div className="w-1/2 h-1/2 rounded-full bg-electric-blue/[0.05] blur-2xl" />
      </div>

      {/* Desktop Supporting Text Overlay (matches desktop reference image) */}
      <div className="hidden lg:block absolute top-[12%] right-[2%] pointer-events-none text-left z-20">
        <p className="text-sm font-semibold text-slate-grey/90 tracking-wide font-sans leading-relaxed">
          Robotics. Artificial Intelligence. <br />
          Beyond Imagination.
        </p>
      </div>

      <Suspense fallback={<SceneLoader />}>
        <Canvas
          shadows
          camera={{ position: [0.0, 0.50, 3.2], fov: 38 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing bg-transparent"
        >
          <SceneWorld
            interactionIntensity={interactionIntensity}
            setInteractionIntensity={setInteractionIntensity}
          />
        </Canvas>
      </Suspense>

      {/* Subtle Drag Prompt */}
      <div className="absolute bottom-1 right-2 pointer-events-none opacity-40 hover:opacity-80 transition-opacity hidden sm:block">
        <span className="text-[10px] tracking-widest uppercase text-slate-grey font-poppins">
          Interactive 3D View
        </span>
      </div>
    </div>
  );
}
