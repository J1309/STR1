"use client";

import React, { useEffect, useState } from "react";
import { soundFx } from "../../utils/sound";

interface SkeletonLoaderProps {
  onComplete: () => void;
}

export default function SkeletonLoader({ onComplete }: SkeletonLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFadingContent, setIsFadingContent] = useState(false);
  const [isCurtainsOpening, setIsCurtainsOpening] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.floor(Math.random() * 5) + 3;
        const next = Math.min(prev + increment, 100);

        if (next >= 100) {
          clearInterval(interval);
          
          // Phase 1: Fade out the preloader content with a gentle flash
          setTimeout(() => {
            setIsFadingContent(true);
            soundFx.playShutter();

            // Phase 2: Smoothly part the curtains
            setTimeout(() => {
              setIsCurtainsOpening(true);

              // Phase 3: Finish and unlock site
              setTimeout(() => {
                onComplete();
              }, 1100);
            }, 300);
          }, 350);
        }
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden font-sans">
      
      {/* Top Curtain Panel - Pure Dark without Middle Line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1/2 bg-[#05070E] z-10 transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isCurtainsOpening ? "-translate-y-full" : "translate-y-0"
        }`}
      />

      {/* Bottom Curtain Panel - Pure Dark without Middle Line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-[#05070E] z-10 transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isCurtainsOpening ? "translate-y-full" : "translate-y-0"
        }`}
      />

      {/* Main Preloader Content Layer */}
      <div
        className={`absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-12 md:p-16 text-white transition-all duration-600 ease-out ${
          isFadingContent ? "opacity-0 scale-[1.04] blur-[4px]" : "opacity-100 scale-100 blur-0"
        }`}
      >
        {/* Top Studio Label */}
        <div className="flex justify-between items-center w-full font-mono text-[10px] sm:text-[11px] text-slate-400 tracking-[0.25em] uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3B82F6] animate-pulse" />
            <span className="text-white font-semibold">STARLINE STUDIO</span>
          </div>
          <span className="hidden sm:inline text-slate-300">EST. 2018 // EDITION 2026</span>
        </div>

        {/* Center: Immersive Glowing Star Logo & Optical Rings */}
        <div className="w-full max-w-lg mx-auto flex flex-col items-center my-auto relative">
          
          {/* Pulsing Luminous Blue Backlight Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 sm:w-80 h-56 sm:h-80 bg-blue-600/30 rounded-full blur-[90px] pointer-events-none animate-pulse" />

          {/* Concentric Rotating Optical Rings */}
          <div className="relative w-32 sm:w-48 h-32 sm:h-48 flex items-center justify-center mb-6 sm:mb-8">
            
            {/* Outer Subtle Dashed Ring */}
            <div className="absolute inset-0 rounded-full border border-blue-400/20 animate-[spin_20s_linear_infinite]" />
            <div className="absolute -inset-2.5 sm:-inset-3 rounded-full border border-white/10 animate-[spin_30s_linear_infinite_reverse]" />

            {/* Middle Glowing Ring */}
            <div className="absolute inset-3 sm:inset-4 rounded-full border border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.4)]" />

            {/* Central Glowing Star Logo */}
            <div className="relative z-10 w-20 sm:w-28 h-20 sm:h-28 flex items-center justify-center p-2">
              <img
                src="/logo-transparent.png"
                alt="Starline Emblem"
                className="w-full h-full object-contain filter brightness-110 drop-shadow-[0_0_20px_rgba(59,130,246,0.9)] animate-pulse"
              />
            </div>
          </div>

          {/* Refined Brand Wordmark */}
          <h1 className="font-serif font-light text-3xl sm:text-4xl md:text-5xl tracking-[0.35em] text-white uppercase mb-3 sm:mb-4 ml-[0.35em] text-center drop-shadow-lg">
            STARLINE
          </h1>

          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-blue-400 font-semibold mb-6 sm:mb-8 text-center">
            EDITORIAL & FINE ART PHOTOGRAPHY
          </span>

          {/* Minimalist Glowing Progress Track */}
          <div className="w-full max-w-[240px] sm:max-w-xs h-[2px] bg-white/15 overflow-hidden rounded-full relative mb-3">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-white transition-all duration-100 ease-out shadow-[0_0_12px_#3B82F6]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Percentage Counter */}
          <span className="font-mono text-[11px] sm:text-xs font-semibold text-slate-300 tracking-widest">
            INITIALIZING // {progress < 10 ? `00${progress}` : progress < 100 ? `0${progress}` : progress}%
          </span>
        </div>

        {/* Bottom Status Telemetry */}
        <div className="flex justify-between items-end w-full font-mono text-[10px] sm:text-xs text-slate-400">
          <div>
            <span className="text-[9px] sm:text-[10px] text-slate-500 block uppercase tracking-wider mb-0.5">ARCHIVE</span>
            <span className="text-white font-medium">100MP MASTER COLLECTION</span>
          </div>

          <div className="text-right">
            <span className="text-[9px] sm:text-[10px] text-slate-500 block uppercase tracking-wider mb-0.5">LOCATION</span>
            <span className="text-blue-400 font-semibold">PARIS • TOKYO • NY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
