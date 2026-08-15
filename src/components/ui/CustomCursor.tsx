"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrame: number;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest("[data-cursor], button, a, input, [role='button']");

      if (interactiveEl) {
        setIsHovered(true);
        const text = interactiveEl.getAttribute("data-cursor");
        setCursorText(text || "");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseleave", onMouseLeave);

    const updateTrail = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.2,
        y: prev.y + (position.y - prev.y) * 0.2,
      }));
      animationFrame = requestAnimationFrame(updateTrail);
    };

    animationFrame = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, [position, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden hidden md:block select-none">
      {/* Precision Center Dot */}
      <div
        className={`fixed -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ease-out ${
          isHovered ? "w-1.5 h-1.5 bg-blue-400" : "w-1 h-1 bg-white"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />

      {/* Trailing Minimal Ring */}
      <div
        className={`fixed -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 transition-all duration-200 ease-out flex items-center justify-center ${
          isHovered
            ? "w-14 h-14 border-blue-400/60 bg-blue-600/10 backdrop-blur-[1px]"
            : "w-7 h-7 border-white/20"
        }`}
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
        }}
      >
        {cursorText && isHovered && (
          <span className="font-mono text-[8px] font-medium tracking-widest text-slate-200 uppercase">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
