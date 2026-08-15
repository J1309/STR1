"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  varying vec2 vUv;

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(sin(dot(i, vec2(12.9898, 78.233))),
          sin(dot(i + vec2(1.0, 0.0), vec2(12.9898, 78.233))), f.x),
      mix(sin(dot(i + vec2(0.0, 1.0), vec2(12.9898, 78.233))),
          sin(dot(i + vec2(1.0, 1.0), vec2(12.9898, 78.233))), f.x), f.y);
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
    
    // Interactive mouse wave
    float mouseDist = length(uv - u_mouse);
    float mouseWave = sin(mouseDist * 14.0 - u_time * 1.8) * exp(-mouseDist * 3.5) * 0.06;
    uv += normalize(uv - u_mouse + 0.001) * mouseWave;

    // Multi-layered chromatic caustic wave
    float t = u_time * 0.12;
    vec2 p = uv * 1.8;
    float n1 = noise(p + vec2(t * 0.3, -t * 0.2));
    float n2 = noise(p * 2.2 - vec2(-t * 0.15, t * 0.35));
    float n3 = noise(p * 3.5 + vec2(t * 0.25, t * 0.1));
    float combined = n1 * 0.5 + n2 * 0.35 + n3 * 0.15;

    // Luminous Optical Palette: Radiant Sapphire, Ice White & Cerulean Prisms
    vec3 baseDark = vec3(0.02, 0.027, 0.055);
    vec3 royalSapphire = vec3(0.12, 0.35, 0.85);
    vec3 skyLight = vec3(0.45, 0.7, 1.0);
    vec3 prismWhite = vec3(0.9, 0.95, 1.0);

    // Caustic light filaments
    float filament1 = smoothstep(0.44, 0.52, combined) - smoothstep(0.52, 0.60, combined);
    float filament2 = smoothstep(0.58, 0.63, combined) - smoothstep(0.63, 0.68, combined);
    
    // Radial light core
    float coreGlow = exp(-length(uv) * 1.4) * 0.45;
    float mouseLight = exp(-mouseDist * 2.8) * 0.35;

    vec3 finalColor = baseDark;
    finalColor += royalSapphire * (coreGlow + filament1 * 0.35);
    finalColor += skyLight * (filament1 * 0.4 + filament2 * 0.5 + mouseLight * 0.3);
    finalColor += prismWhite * pow(filament1 + filament2, 4.0) * 0.25;

    // Edge falloff
    float edgeMask = 1.0 - smoothstep(0.5, 1.5, length(uv));
    finalColor *= edgeMask;

    gl_FragColor = vec4(finalColor, 0.65);
  }
`;

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_mouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.u_time.value = state.clock.getElapsedTime();
    mat.uniforms.u_resolution.value.set(state.size.width, state.size.height);
    mat.uniforms.u_mouse.value.lerp(mouseRef.current, 0.06);
  });

  return (
    <mesh
      ref={meshRef}
      onPointerMove={(e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2 * (window.innerWidth / window.innerHeight);
        const y = -(e.clientY / window.innerHeight - 0.5) * 2;
        mouseRef.current.set(x, y);
      }}
    >
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function ShaderDistortionMesh() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-60">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
