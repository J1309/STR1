"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import CelestialDarkroomHero from "../canvas/CelestialDarkroomHero";
import HeroInteractiveGalleryDeck from "../ui/HeroInteractiveGalleryDeck";
import { soundFx } from "../../utils/sound";

interface HeroSectionProps {
  onExploreClick: () => void;
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full flex items-center justify-center py-20 px-6 sm:px-12 md:px-16 lg:pl-32 lg:pr-16 overflow-hidden select-none bg-[#05070E]"
    >
      {/* Custom 3D Celestial Darkroom Lighting & Volumetric Atmosphere */}
      <CelestialDarkroomHero />

      {/* Main Grid: Left Typography & Big Logo + Right 3D Kinetic Image Showcase */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-10">
        
        {/* Left Column: Big Brand Emblem, Headline & Actions */}
        <div className="lg:col-span-6 flex flex-col items-start justify-center">
          
          {/* Big Size Glowing Starline Logo Emblem */}
          <div className="relative mb-8 group flex items-center gap-5">
            {/* Luminous Sapphire Radial Backlight */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-blue-600/35 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            
            {/* Big Size Logo Frame with Thick 2px White Border */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-3xl p-3 sm:p-4 bg-[#0B0F19]/90 border-2 border-white/50 hover:border-white backdrop-blur-xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.9),0_0_25px_rgba(37,99,235,0.4)] flex items-center justify-center transition-all duration-500 hover:scale-105">
              
              {/* Rotating optical light ring behind the star */}
              <div className="absolute inset-1 rounded-2xl border border-blue-400/20 animate-[spin_18s_linear_infinite]" />
              
              {/* Big Star Logo */}
              <img
                src="/logo-transparent.png"
                alt="Starline Master Logo"
                className="relative z-10 w-full h-full object-contain filter brightness-110 drop-shadow-[0_0_14px_rgba(59,130,246,0.9)] transition-transform duration-700 group-hover:rotate-12"
              />
            </div>

            {/* Studio Identity Tag beside the Big Logo */}
            <div className="flex flex-col">
              <span className="font-serif font-light text-2xl sm:text-3xl text-white tracking-[0.2em] uppercase">
                STARLINE
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] text-blue-400 uppercase tracking-[0.25em] font-semibold">
                PARIS • TOKYO • NEW YORK
              </span>
            </div>
          </div>

          {/* Minimal Category Tag with Thick 2px White Border */}
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B0F19]/80 border-2 border-white/50 backdrop-blur-md text-[11px] font-mono tracking-widest text-white shadow-xl">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>EDITORIAL & FINE ART STUDIO</span>
          </div>

          {/* Clean, Direct Headline */}
          <h1 className="font-serif font-light text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] tracking-tight leading-[1.06] text-white max-w-2xl mb-6 drop-shadow-2xl">
            Editorial & Fine Art{" "}
            <span className="font-serif italic font-normal text-blue-200">
              Photography.
            </span>
          </h1>

          {/* Minimal Direct Subtitle */}
          <p className="text-slate-200 text-base sm:text-lg font-light max-w-lg leading-relaxed mb-10 drop-shadow-md">
            Specializing in fashion editorial, architectural monographs, and cinema productions.
          </p>

          {/* Action CTA with Thick 2px White Structured Border */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                soundFx.playShutter();
                onExploreClick();
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="group inline-flex items-center gap-3 px-9 py-4 rounded-full bg-white text-black hover:bg-slate-100 font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow-2xl hover:shadow-3xl transform active:scale-98 border-2 border-white"
            >
              <span>VIEW WORK</span>
              <ArrowUpRight className="w-4 h-4 text-black transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Unique 3D Kinetic Film Deck Image Showcase */}
        <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
          <HeroInteractiveGalleryDeck />
        </div>
      </div>
    </section>
  );
}
