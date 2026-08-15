"use client";

import React, { useEffect, useRef } from "react";

export default function StudioAmbientLight() {
  const lightRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const currentPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Smooth inertia interpolation for the studio light softbox
    const animate = () => {
      currentPos.current.x += (pos.current.x - currentPos.current.x) * 0.08;
      currentPos.current.y += (pos.current.y - currentPos.current.y) * 0.08;

      if (lightRef.current) {
        lightRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Studio Softbox Follower Light */}
      <div
        ref={lightRef}
        className="absolute -top-[350px] -left-[350px] w-[700px] h-[700px] rounded-full will-change-transform opacity-60"
        style={{
          background: "radial-gradient(circle 350px at center, rgba(59, 130, 246, 0.12), rgba(147, 197, 253, 0.06), rgba(255, 255, 255, 0.02), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Global Radiant Ambient Lighting Orbs */}
      {/* Upper Right Exhibition Key Light */}
      <div className="absolute top-[15vh] right-[-10vw] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-radial-gradient from-blue-500/10 via-sky-300/5 to-transparent blur-[120px]" />
      
      {/* Mid Left Optics Bench Daylight Wash */}
      <div className="absolute top-[120vh] left-[-15vw] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full bg-radial-gradient from-indigo-500/10 via-blue-400/5 to-transparent blur-[140px]" />

      {/* Mid Right Global Ecosystem Celestial Bloom */}
      <div className="absolute top-[240vh] right-[-10vw] w-[55vw] h-[55vw] max-w-[850px] max-h-[850px] rounded-full bg-radial-gradient from-blue-600/12 via-sky-400/6 to-transparent blur-[130px]" />

      {/* Lower Archive Studio Fill Light */}
      <div className="absolute top-[360vh] left-[20vw] w-[60vw] h-[40vw] max-w-[1000px] max-h-[600px] rounded-full bg-radial-gradient from-blue-400/8 via-white/3 to-transparent blur-[150px]" />
    </div>
  );
}
