"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// 3D Procedural Cybernetic Aperture Iris & Optical Lens
function CyberApertureModel({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const irisBladesRef = useRef<THREE.Group>(null);
  const glassRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);

  // Generate 9 Interlocking Aperture Blades
  const bladeCount = 9;
  const blades = useMemo(() => {
    const arr = [];
    const shape = new THREE.Shape();
    // Curved blade geometry
    shape.moveTo(0, 0);
    shape.quadraticCurveTo(1.6, 0.4, 2.8, 1.8);
    shape.lineTo(2.3, 2.2);
    shape.quadraticCurveTo(0.8, 1.2, 0, 0);

    const extrudeSettings = {
      depth: 0.04,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    for (let i = 0; i < bladeCount; i++) {
      const angle = (i / bladeCount) * Math.PI * 2;
      arr.push({ angle, id: i });
    }
    return { geometry, arr };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth mouse tilt parallax
    const targetRotX = mousePos.current.y * 0.4;
    const targetRotY = mousePos.current.x * 0.4;
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 4, delta);
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 4, delta);

    // Continuous slow hypnotic rotation
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.15;
    }

    // Dynamic Aperture Expansion based on mouse distance from center
    if (irisBladesRef.current) {
      const dist = Math.sqrt(mousePos.current.x ** 2 + mousePos.current.y ** 2);
      const targetIrisOpen = 0.5 + dist * 0.8; // Open from f/16 to f/1.2
      irisBladesRef.current.children.forEach((blade, i) => {
        const baseAngle = (i / bladeCount) * Math.PI * 2;
        blade.rotation.z = THREE.MathUtils.damp(blade.rotation.z, baseAngle + targetIrisOpen * 0.4, 5, delta);
      });
    }

    // Glass sheen pulsation
    if (glassRef.current && (glassRef.current.material as THREE.MeshPhysicalMaterial)) {
      const mat = glassRef.current.material as THREE.MeshPhysicalMaterial;
      mat.roughness = 0.05 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Outer Knurled Aluminum Lens Barrel */}
      <mesh ref={outerRingRef} rotation={[0, 0, 0]}>
        <torusGeometry args={[3.2, 0.28, 24, 64]} />
        <meshStandardMaterial
          color="#060B18"
          metalness={0.95}
          roughness={0.2}
          emissive="#0044aa"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Laser-Engraved Glowing Cyan Index Ring */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[2.9, 0.06, 16, 64]} />
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={2.0}
          roughness={0.1}
        />
      </mesh>

      {/* Second Inner Ring */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[2.4, 0.08, 16, 64]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Multi-coated Optical Front Glass Element */}
      <mesh ref={glassRef} position={[0, 0, 0.15]}>
        <sphereGeometry args={[2.3, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.35]} />
        <meshPhysicalMaterial
          color="#00F0FF"
          transmission={0.92}
          opacity={1}
          transparent
          roughness={0.08}
          ior={1.65}
          thickness={1.2}
          specularIntensity={1.5}
          specularColor="#38BDF8"
        />
      </mesh>

      {/* Mechanical Iris Blades Group */}
      <group ref={irisBladesRef} position={[0, 0, -0.1]}>
        {blades.arr.map((blade) => (
          <mesh
            key={blade.id}
            geometry={blades.geometry}
            position={[Math.cos(blade.angle) * 0.9, Math.sin(blade.angle) * 0.9, 0]}
            rotation={[0, 0, blade.angle]}
          >
            <meshStandardMaterial
              color="#0A1124"
              metalness={0.9}
              roughness={0.25}
              bumpScale={0.05}
            />
          </mesh>
        ))}
      </group>

      {/* Deep Center Void Glow Core */}
      <mesh position={[0, 0, -0.6]}>
        <circleGeometry args={[1.6, 32]} />
        <meshBasicMaterial
          color="#001833"
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

// 3D Stellar Particle Swarm
function StarDust() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1200;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color("#00F0FF");
    const c2 = new THREE.Color("#38BDF8");
    const c3 = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;

      const mixed = new THREE.Color();
      const r = Math.random();
      if (r < 0.6) mixed.lerpColors(c1, c2, r / 0.6);
      else mixed.lerpColors(c2, c3, (r - 0.6) / 0.4);

      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroApertureCanvas() {
  const mousePos = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    mousePos.current.x = ((clientX - rect.left) / rect.width - 0.5) * 2;
    mousePos.current.y = -((clientY - rect.top) / rect.height - 0.5) * 2;
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ touchAction: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.6} />
        {/* Glow Blue Cybernetic Keylight */}
        <pointLight position={[5, 6, 4]} color="#00F0FF" intensity={3.5} distance={20} />
        {/* Deep Azure Fill */}
        <pointLight position={[-5, -4, 2]} color="#0055FF" intensity={2.8} distance={18} />
        {/* Specular White Rim */}
        <directionalLight position={[0, 8, 5]} color="#ffffff" intensity={1.2} />

        <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
          <CyberApertureModel mousePos={mousePos} />
        </Float>

        <StarDust />
      </Canvas>
    </div>
  );
}
