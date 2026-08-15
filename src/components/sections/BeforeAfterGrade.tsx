"use client";

import React, { useState, useRef, useCallback } from "react";
import { Sliders, Sparkles, Image as ImageIcon } from "lucide-react";
import { soundFx } from "../../utils/sound";

export default function BeforeAfterGrade() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
      setSliderPos(percent);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section
      id="color-grade"
      className="relative py-20 sm:py-36 px-4 sm:px-10 md:px-16 lg:pl-32 lg:pr-16 bg-[#05070E] select-none overflow-hidden"
    >
      {/* Section Header with Clear Language */}
      <div className="max-w-6xl mx-auto mb-10 sm:mb-12">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-blue-400 font-semibold block mb-2">
          COLOR EDITING // 05
        </span>
        <h2 className="font-serif font-light text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-4">
          Before & After Color Editing
        </h2>
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl font-light">
          Drag the slider across the image to compare the original unedited camera file (RAW) with our final color grade.
        </p>
      </div>

      {/* Interactive Comparison Split Frame */}
      <div className="max-w-6xl mx-auto">
        <div
          ref={containerRef}
          onMouseDown={() => {
            setIsDragging(true);
            soundFx.playClick(900);
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => {
            setIsDragging(true);
            soundFx.playClick(900);
          }}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={handleTouchMove}
          className="relative w-full h-[320px] sm:h-[520px] md:h-[600px] rounded-3xl overflow-hidden cursor-ew-resize border-2 border-white/40 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.9)] bg-black touch-none"
        >
          {/* Layer 1: Final Graded (Full width background) */}
          <div
            className="absolute inset-0 bg-cover bg-center filter contrast-110 saturate-120"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1800&auto=format&fit=crop)`,
            }}
          />

          {/* Layer 2: Flat Unprocessed RAW (Clipped width) */}
          <div
            className="absolute inset-0 bg-cover bg-center filter contrast-90 brightness-95 saturate-50 sepia-10"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1800&auto=format&fit=crop)`,
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
            }}
          />

          {/* Left / Right Watermark Badges */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 pointer-events-none z-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/85 text-white text-[10px] sm:text-xs font-mono tracking-wider border-2 border-white/40 shadow-lg backdrop-blur-md font-semibold">
              <ImageIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-300" />
              <span>RAW (BEFORE)</span>
            </span>
          </div>

          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 pointer-events-none z-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-600 text-white text-[10px] sm:text-xs font-mono tracking-wider shadow-lg border-2 border-white/40 backdrop-blur-md font-semibold">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>GRADED (AFTER)</span>
            </span>
          </div>

          {/* Center Divider Slider Line */}
          <div
            className="absolute top-0 bottom-0 w-[3px] bg-white pointer-events-none shadow-[0_0_15px_rgba(255,255,255,0.9)] z-30"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Center Slider Pill */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0B0F19] border-2 border-white shadow-2xl flex items-center justify-center text-blue-400">
              <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
        </div>

        {/* Bottom Information Strip */}
        <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] sm:text-xs text-slate-300 border-t-2 border-white/30 pt-4 font-semibold">
          <div className="flex items-center gap-4 sm:gap-6">
            <span>HIGH RESOLUTION</span>
            <span className="hidden sm:inline">TRUE-TO-LIFE VIBRANT COLORS</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3B82F6]" />
            <span className="text-white font-bold">PROFESSIONAL COLOR GRADE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
