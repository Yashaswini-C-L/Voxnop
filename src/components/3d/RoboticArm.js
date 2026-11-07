import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function smoothstep(min, max, value) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export default function RoboticArm({ onInteractionChange }) {
  const baseTurretRef = useRef();
  const shoulderPitchRef = useRef();
  const elbowPitchRef = useRef();
  const wristPitchRef = useRef();
  const wristRollRef = useRef();
  const fingerLeftRef = useRef();
  const fingerRightRef = useRef();
  const scanBeamRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const cycleDuration = 10;
    const progress = (time % cycleDuration) / cycleDuration;

    // Kinematic phase:
    // The arm stands tall and upright, firmly holding and scanning the square AI chip
    let holdFactor = 1.0;
    let interactionFactor = 0.95;

    if (progress < 0.12) {
      // Gentle micro-lift / calibrate
      const p = smoothstep(0, 0.12, progress);
      holdFactor = 0.88 + p * 0.12;
      interactionFactor = 0.5 + p * 0.45;
    } else if (progress < 0.78) {
      // Actively holding & scanning the square AI chip with realistic servo oscillation
      holdFactor = 1.0;
      const scanOsc = Math.sin(time * 3.5) * 0.06;
      interactionFactor = Math.min(1.0, 0.94 + scanOsc);
    } else if (progress < 0.94) {
      // Subtle pulse ease
      const p = smoothstep(0.78, 0.94, progress);
      holdFactor = 1.0 - p * 0.12;
      interactionFactor = 1.0 - p * 0.5;
    } else {
      const p = smoothstep(0.94, 1.0, progress);
      holdFactor = 0.88 + p * 0.12;
      interactionFactor = 0.5 + p * 0.45;
    }

    if (onInteractionChange) {
      onInteractionChange(interactionFactor);
    }

    // High-precision servo micro-vibration
    const microJitter = Math.sin(time * 2.5) * 0.002;

    // Upright & heroic kinematics:
    // Shoulder stands tall, tilting bicep right towards the chip:
    const shoulderAngle = THREE.MathUtils.lerp(-0.35, -0.40, holdFactor) + microJitter;
    if (shoulderPitchRef.current) {
      shoulderPitchRef.current.rotation.z = shoulderAngle;
    }

    // Elbow arches high in the air at y = 0.98, pointing forearm down towards the chip:
    const elbowAngle = THREE.MathUtils.lerp(-1.58, -1.68, holdFactor) - microJitter * 0.5;
    if (elbowPitchRef.current) {
      elbowPitchRef.current.rotation.z = elbowAngle;
    }

    // Wrist aims gripper downward directly over the top of the AI chip:
    const wristAngle = THREE.MathUtils.lerp(-0.82, -0.92, holdFactor);
    if (wristPitchRef.current) {
      wristPitchRef.current.rotation.z = wristAngle;
    }

    // Subtle wrist roll
    if (wristRollRef.current) {
      wristRollRef.current.rotation.x = Math.sin(time * 1.0) * 0.02;
    }

    // Gripper finger aperture:
    // Claws firmly hold the top edge of the square AI chip
    const fingerGap = THREE.MathUtils.lerp(0.058, 0.046, holdFactor) + Math.sin(time * 2.8) * 0.001;
    if (fingerLeftRef.current) {
      fingerLeftRef.current.position.z = -fingerGap;
    }
    if (fingerRightRef.current) {
      fingerRightRef.current.position.z = fingerGap;
    }

    // Optical calibration laser beam
    if (scanBeamRef.current) {
      scanBeamRef.current.material.opacity = interactionFactor * 0.8;
    }
  });

  return (
    <group position={[-0.35, 0.28, 0]}>
      {/* 1. Base Pedestal Mount */}
      <mesh position={[0, 0.035, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.33, 0.07, 36]} />
        <meshStandardMaterial color="#E2E8F0" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* Electric Blue Base Collar Ring */}
      <mesh position={[0, 0.075, 0]}>
        <cylinderGeometry args={[0.27, 0.28, 0.02, 36]} />
        <meshStandardMaterial color="#0866E8" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* 2. Base Rotating Turret */}
      <group ref={baseTurretRef} position={[0, 0.085, 0]}>
        {/* Turret Body (White Industrial Metal) */}
        <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.23, 0.25, 0.16, 36]} />
          <meshStandardMaterial color="#F8FAFC" metalness={0.3} roughness={0.2} />
        </mesh>

        {/* Dual Upright Brackets */}
        <mesh position={[0, 0.17, -0.07]} castShadow receiveShadow>
          <boxGeometry args={[0.15, 0.12, 0.04]} />
          <meshStandardMaterial color="#F8FAFC" metalness={0.3} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.17, 0.07]} castShadow receiveShadow>
          <boxGeometry args={[0.15, 0.12, 0.04]} />
          <meshStandardMaterial color="#F8FAFC" metalness={0.3} roughness={0.2} />
        </mesh>

        {/* Shoulder Pivot Axle (Electric Blue) */}
        <mesh position={[0, 0.18, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.065, 0.065, 0.19, 32]} />
          <meshStandardMaterial color="#0866E8" metalness={0.7} roughness={0.2} />
        </mesh>

        {/* 3. Shoulder Articulation Group */}
        <group ref={shoulderPitchRef} position={[0, 0.18, 0]}>
          {/* Shoulder Bearing Caps with Electric Blue Discs */}
          <mesh position={[0, 0, 0.105]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.055, 0.055, 0.015, 24]} />
            <meshStandardMaterial color="#0866E8" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, -0.105]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.055, 0.055, 0.015, 24]} />
            <meshStandardMaterial color="#0866E8" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Lower Arm (Bicep Segment - Length 0.56, standing tall) */}
          <group position={[0, 0.28, 0]}>
            {/* White Composite Shell */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.11, 0.56, 0.10]} />
              <meshStandardMaterial color="#FFFFFF" metalness={0.2} roughness={0.2} />
            </mesh>

            {/* Silver Hydraulic Actuator Rod */}
            <mesh position={[0.026, 0, 0]} castShadow>
              <cylinderGeometry args={[0.024, 0.024, 0.48, 24]} />
              <meshStandardMaterial color="#CBD5E1" metalness={0.9} roughness={0.15} />
            </mesh>

            {/* Electric Blue Industrial Stripe */}
            <mesh position={[-0.057, 0, 0]}>
              <boxGeometry args={[0.005, 0.50, 0.035]} />
              <meshStandardMaterial color="#0866E8" metalness={0.5} roughness={0.2} />
            </mesh>
          </group>

          {/* 4. Elbow Joint (Pivot high in the air at y = 0.56) */}
          <group position={[0, 0.56, 0]}>
            {/* Elbow Pivot Cylinder (Deep Navy + Blue Accent) */}
            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.06, 0.06, 0.15, 32]} />
              <meshStandardMaterial color="#071D49" metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.052, 0.052, 0.012, 24]} />
              <meshStandardMaterial color="#0866E8" metalness={0.7} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0, -0.08]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.052, 0.052, 0.012, 24]} />
              <meshStandardMaterial color="#0866E8" metalness={0.7} roughness={0.2} />
            </mesh>

            {/* 5. Forearm Pitch Articulation (Length 0.50, reaches down-right) */}
            <group ref={elbowPitchRef}>
              <group position={[0, 0.25, 0]}>
                {/* Tapered White Composite Shell */}
                <mesh castShadow receiveShadow>
                  <boxGeometry args={[0.09, 0.50, 0.085]} />
                  <meshStandardMaterial color="#F8FAFC" metalness={0.25} roughness={0.2} />
                </mesh>

                {/* Silver Precision Rail */}
                <mesh position={[0.026, 0, 0]}>
                  <cylinderGeometry args={[0.016, 0.016, 0.44, 16]} />
                  <meshStandardMaterial color="#E2E8F0" metalness={0.9} roughness={0.1} />
                </mesh>

                {/* Cyan Status LED Line */}
                <mesh position={[-0.046, 0.05, 0]}>
                  <boxGeometry args={[0.005, 0.08, 0.02]} />
                  <meshStandardMaterial color="#12B8F5" emissive="#12B8F5" emissiveIntensity={1.4} />
                </mesh>
              </group>

              {/* 6. Wrist Assembly (at y = 0.50) */}
              <group position={[0, 0.50, 0]}>
                <group ref={wristPitchRef}>
                  {/* Wrist Swivel Cylinder (Electric Blue) */}
                  <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
                    <cylinderGeometry args={[0.044, 0.044, 0.11, 24]} />
                    <meshStandardMaterial color="#0866E8" metalness={0.7} roughness={0.2} />
                  </mesh>

                  {/* Wrist Collar Extension */}
                  <mesh position={[0, 0.04, 0]} castShadow>
                    <cylinderGeometry args={[0.035, 0.038, 0.05, 24]} />
                    <meshStandardMaterial color="#E2E8F0" metalness={0.8} roughness={0.2} />
                  </mesh>

                  {/* Wrist Roll */}
                  <group ref={wristRollRef} position={[0, 0.065, 0]}>
                    <mesh castShadow>
                      <cylinderGeometry args={[0.04, 0.04, 0.02, 24]} />
                      <meshStandardMaterial color="#071D49" metalness={0.6} roughness={0.3} />
                    </mesh>

                    {/* 7. Realistic Industrial Gripper Hand (Grasping square AI chip) */}
                    <group position={[0, 0.035, 0]}>
                      {/* Gripper Main Chassis */}
                      <mesh castShadow receiveShadow>
                        <boxGeometry args={[0.078, 0.048, 0.095]} />
                        <meshStandardMaterial color="#FFFFFF" metalness={0.3} roughness={0.2} />
                      </mesh>

                      {/* Optical Sensor Aperture */}
                      <mesh position={[0.04, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                        <cylinderGeometry args={[0.012, 0.012, 0.004, 16]} />
                        <meshBasicMaterial color="#12B8F5" />
                      </mesh>

                      {/* Left Mechanical Claw Finger */}
                      <group ref={fingerLeftRef} position={[0.02, 0.035, -0.048]}>
                        {/* Knuckle mount */}
                        <mesh position={[0, 0.024, 0]} castShadow>
                          <boxGeometry args={[0.022, 0.055, 0.02]} />
                          <meshStandardMaterial color="#071D49" metalness={0.8} roughness={0.2} />
                        </mesh>
                        {/* Curved grasping fingertip */}
                        <mesh position={[0.01, 0.062, 0.01]} rotation={[0, 0, -0.28]} castShadow>
                          <boxGeometry args={[0.018, 0.045, 0.018]} />
                          <meshStandardMaterial color="#0866E8" metalness={0.5} roughness={0.25} />
                        </mesh>
                      </group>

                      {/* Right Mechanical Claw Finger */}
                      <group ref={fingerRightRef} position={[0.02, 0.035, 0.048]}>
                        {/* Knuckle mount */}
                        <mesh position={[0, 0.024, 0]} castShadow>
                          <boxGeometry args={[0.022, 0.055, 0.02]} />
                          <meshStandardMaterial color="#071D49" metalness={0.8} roughness={0.2} />
                        </mesh>
                        {/* Curved grasping fingertip */}
                        <mesh position={[0.01, 0.062, -0.01]} rotation={[0, 0, -0.28]} castShadow>
                          <boxGeometry args={[0.018, 0.045, 0.018]} />
                          <meshStandardMaterial color="#0866E8" metalness={0.5} roughness={0.25} />
                        </mesh>
                      </group>

                      {/* Optical Scan / Calibration Beam */}
                      <mesh
                        ref={scanBeamRef}
                        position={[0.028, 0.08, 0]}
                        rotation={[0, 0, -Math.PI / 2]}
                      >
                        <coneGeometry args={[0.08, 0.16, 24, 1, true]} />
                        <meshBasicMaterial
                          color="#12B8F5"
                          transparent
                          opacity={0.7}
                          side={THREE.DoubleSide}
                          depthWrite={false}
                        />
                      </mesh>
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
