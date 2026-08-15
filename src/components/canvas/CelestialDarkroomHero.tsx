"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// 1. Volumetric Anamorphic Light Beam Shader
const lightShaderVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const lightShaderFragment = `
  uniform float u_time;
  uniform vec2 u_mouse;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv - 0.5;
    
    // Diagonal volumetric spotlight beam
    float beam1 = exp(-pow(abs(p.x * 1.6 - p.y * 1.8 + sin(u_time * 0.3) * 0.15), 1.8) * 5.0);
    float beam2 = exp(-pow(abs(p.x * -1.2 + p.y * 2.0 - cos(u_time * 0.25) * 0.2), 1.8) * 6.5);
    
    // Mouse interactive glow
    float mouseGlow = exp(-length(p - u_mouse * 0.35) * 3.0) * 0.45;

    // Deep sapphire & white starlight palette
    vec3 deepNavy = vec3(0.04, 0.08, 0.25);
    vec3 sapphire = vec3(0.14, 0.38, 0.95);
    vec3 whiteLight = vec3(0.95, 0.98, 1.0);

    vec3 color = deepNavy * (beam1 + beam2) * 0.8;
    color += sapphire * (beam1 * 0.9 + beam2 * 0.6 + mouseGlow * 0.5);
    color += whiteLight * (pow(beam1, 3.0) * 0.3 + mouseGlow * 0.4);

    float alpha = (beam1 * 0.45 + beam2 * 0.35 + mouseGlow * 0.6) * (1.0 - length(p) * 1.15);
    gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.65));
  }
`;

function VolumetricOpticalBeam({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.u_time.value = state.clock.getElapsedTime();
    mat.uniforms.u_mouse.value.set(mousePos.current.x, mousePos.current.y);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <planeGeometry args={[28, 18]} />
      <shaderMaterial
        vertexShader={lightShaderVertex}
        fragmentShader={lightShaderFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// 2. Floating Stardust Field
function FloatingStardustField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1000;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color("#3B82F6");
    const c2 = new THREE.Color("#93C5FD");
    const c3 = new THREE.Color("#FFFFFF");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1;

      const r = Math.random();
      const mixed = new THREE.Color();
      if (r < 0.5) mixed.lerpColors(c1, c2, r / 0.5);
      else mixed.lerpColors(c2, c3, (r - 0.5) / 0.5);

      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015;
      pointsRef.current.rotation.x += delta * 0.008;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function CelestialDarkroomHero() {
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
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto select-none"
    >
      {/* 3D WebGL Canvas Layer */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 48 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[6, 4, 4]} color="#3B82F6" intensity={2.5} />
        <pointLight position={[-6, -4, 3]} color="#1E3A8A" intensity={2.0} />

        {/* Volumetric Optical Beam */}
        <VolumetricOpticalBeam mousePos={mousePos} />

        {/* Ambient Stardust Field */}
        <FloatingStardustField />
      </Canvas>

      {/* Subtle Precision Darkroom Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "75px 75px",
        }}
      />

      {/* Atmospheric Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070E] via-[#05070E]/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#05070E]/80 via-transparent to-[#05070E]/70 pointer-events-none" />
    </div>
  );
}
