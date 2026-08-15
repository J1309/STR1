"use client";

import React, { useState } from "react";
import { Sliders, Camera, Focus } from "lucide-react";
import { soundFx } from "../../utils/sound";

interface LensPreset {
  id: string;
  mm: number;
  name: string;
  tag: string;
  defaultAperture: number;
  fov: string;
  scale: number;
  blurMax: number;
  description: string;
  sampleImg: string;
}

const lensPresets: LensPreset[] = [
  {
    id: "16mm",
    mm: 16,
    name: "16mm Ultra-Wide Lens",
    tag: "ROOMS & LANDSCAPES",
    defaultAperture: 2.8,
    fov: "107° WIDE VIEW",
    scale: 0.85,
    blurMax: 2,
    description: "Captures entire buildings, interiors, and wide landscapes in a single shot.",
    sampleImg: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "35mm",
    mm: 35,
    name: "35mm Classic Lens",
    tag: "STREET & DOCUMENTARY",
    defaultAperture: 1.4,
    fov: "63° NATURAL WIDE",
    scale: 1.05,
    blurMax: 5,
    description: "Great for capturing people within their surroundings naturally and storytelling.",
    sampleImg: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "50mm",
    mm: 50,
    name: "50mm Standard Lens",
    tag: "NATURAL EYE VIEW",
    defaultAperture: 1.2,
    fov: "47° HUMAN PERSPECTIVE",
    scale: 1.25,
    blurMax: 8,
    description: "Matches how your eyes naturally see the world, with beautiful soft background blur.",
    sampleImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "85mm",
    mm: 85,
    name: "85mm Portrait Lens",
    tag: "CLASSIC PORTRAIT",
    defaultAperture: 1.4,
    fov: "28° PORTRAIT VIEW",
    scale: 1.5,
    blurMax: 12,
    description: "Flattering portraits that isolate the subject with smooth, dreamy background blur.",
    sampleImg: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "135mm",
    mm: 135,
    name: "135mm Telephoto Lens",
    tag: "CLOSE-UP TELEPHOTO",
    defaultAperture: 1.8,
    fov: "18° TIGHT FOCUS",
    scale: 1.8,
    blurMax: 16,
    description: "Brings far-away details up close and makes the background melt away completely.",
    sampleImg: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function InteractiveLensLab() {
  const [selectedLens, setSelectedLens] = useState<LensPreset>(lensPresets[2]); // 50mm default
  const [aperture, setAperture] = useState<number>(1.2);
  const [isFlashing, setIsFlashing] = useState(false);

  const handleSelectLens = (lens: LensPreset) => {
    soundFx.playClick(1200);
    setSelectedLens(lens);
    setAperture(lens.defaultAperture);
  };

  const handleTriggerShutter = () => {
    soundFx.playShutter();
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 200);
  };

  const bokehBlur = Math.max(0, ((16 - aperture) / 14.8) * selectedLens.blurMax);

  return (
    <section
      id="optics-lab"
      className="relative py-20 sm:py-36 px-4 sm:px-10 md:px-16 lg:pl-32 lg:pr-16 bg-[#05070E] select-none overflow-hidden"
    >
      {/* Radiant Optical Bench Light Table Glow */}
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-radial-gradient from-blue-500/12 via-sky-300/5 to-transparent rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header with Clear Language */}
      <div className="max-w-6xl mb-10 sm:mb-14">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-blue-400 font-semibold block mb-2">
          INTERACTIVE CAMERA // 03
        </span>
        <h2 className="font-serif font-light text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-4">
          Lens & Focus Simulator
        </h2>
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-3xl font-light leading-relaxed">
          See how different camera lenses change what you see. Switch between wide and close-up lenses, or adjust the blur slider to see background focus change in real time.
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 max-w-7xl">
        
        {/* Left: Viewfinder Display */}
        <div className="lg:col-span-7 relative rounded-3xl p-3 sm:p-3.5 bg-[#0B0F19]/95 backdrop-blur-xl border-2 border-white/35 hover:border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.85),0_0_35px_rgba(59,130,246,0.12)] flex flex-col justify-between overflow-hidden transition-all duration-300">
          
          {/* Shutter Flash */}
          <div
            className={`absolute inset-0 bg-white z-50 pointer-events-none transition-opacity duration-150 ${
              isFlashing ? "opacity-95" : "opacity-0"
            }`}
          />

          {/* Viewfinder Screen Box */}
          <div className="relative w-full h-[300px] sm:h-[480px] rounded-2xl overflow-hidden bg-black border-2 border-white/25 flex items-center justify-center">
            
            {/* Background Layer with Bokeh Blur */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out transform"
              style={{
                backgroundImage: `url(${selectedLens.sampleImg})`,
                filter: `blur(${bokehBlur}px) contrast(110%) brightness(0.96)`,
                transform: `scale(${selectedLens.scale})`,
              }}
            />

            {/* Subtle Gradient Shade */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/80 via-transparent to-transparent pointer-events-none" />

            {/* HUD Viewfinder Overlays with Clear Indicators */}
            <div className="absolute inset-3 sm:inset-5 pointer-events-none flex flex-col justify-between z-20">
              
              {/* Top Viewfinder Bar */}
              <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-slate-200 bg-black/85 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 border-white/40 shadow-lg font-semibold">
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400 animate-pulse" />
                  LIVE PREVIEW
                </span>
                <span className="hidden sm:inline">{selectedLens.fov}</span>
                <span className="text-blue-400 font-bold">{selectedLens.mm}MM LENS</span>
              </div>

              {/* Minimal Focus Crosshair */}
              <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white/60 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400 shadow-[0_0_8px_#3B82F6]" />
              </div>

              {/* Bottom HUD Bar */}
              <div className="flex items-center justify-between font-mono text-[9px] sm:text-[11px] text-white bg-black/85 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 border-white/40 shadow-lg font-semibold">
                <span className="text-blue-400 font-bold">f/{aperture.toFixed(1)}</span>
                <span className="text-slate-300 hidden sm:inline">1/2000s</span>
                <span className="text-slate-300">ISO 64</span>
                <span className="text-sky-300">BLUR: {bokehBlur.toFixed(1)}PX</span>
              </div>
            </div>
          </div>

          {/* Viewfinder Controls Strip */}
          <div className="mt-3 sm:mt-4 px-1 sm:px-2 flex items-center justify-between gap-3 sm:gap-4 pt-1 sm:pt-2">
            <div>
              <h3 className="text-white font-semibold text-xs sm:text-sm">{selectedLens.name}</h3>
              <p className="text-slate-300 text-[11px] sm:text-xs font-light line-clamp-1">{selectedLens.description}</p>
            </div>

            {/* Shutter Button */}
            <button
              onClick={handleTriggerShutter}
              data-cursor="SHUTTER"
              className="flex-shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white hover:bg-slate-100 text-black font-semibold text-[11px] sm:text-xs tracking-widest uppercase flex items-center gap-1.5 sm:gap-2 transition-all active:scale-95 shadow-xl border-2 border-white"
            >
              <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>SNAP</span>
            </button>
          </div>
        </div>

        {/* Right: Lens Selector & Aperture Slider */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
          
          {/* Lens Selector */}
          <div className="p-5 sm:p-7 rounded-3xl bg-[#0B0F19]/95 backdrop-blur-xl border-2 border-white/35 hover:border-white/70 shadow-2xl relative overflow-hidden transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

            <h3 className="font-mono text-xs uppercase tracking-widest text-white font-bold mb-3 sm:mb-4 flex items-center gap-2">
              <Focus className="w-4 h-4 text-blue-400" />
              CHOOSE A LENS
            </h3>

            <div className="space-y-2 sm:space-y-2.5">
              {lensPresets.map((lens) => {
                const isSelected = selectedLens.id === lens.id;
                return (
                  <button
                    key={lens.id}
                    onClick={() => handleSelectLens(lens)}
                    onMouseEnter={() => soundFx.playHover()}
                    className={`w-full p-2.5 sm:p-3.5 rounded-2xl text-left transition-all duration-300 flex items-center justify-between border-2 ${
                      isSelected
                        ? "bg-blue-600/30 border-white text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                        : "bg-white/[0.03] border-white/25 text-slate-300 hover:border-white hover:text-white hover:bg-white/[0.08]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-serif text-sm sm:text-base font-medium text-white">
                          {lens.mm}mm
                        </span>
                        <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-blue-400 font-bold">
                          {lens.tag}
                        </span>
                      </div>
                      <span className="text-[11px] sm:text-xs text-slate-400 line-clamp-1 font-light">
                        {lens.name}
                      </span>
                    </div>

                    <div
                      className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-mono border-2 ${
                        isSelected
                          ? "bg-blue-500 text-white border-white shadow-[0_0_8px_#3B82F6]"
                          : "bg-white/10 text-slate-400 border-white/30"
                      }`}
                    >
                      ✓
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Aperture Slider with Clear Understandable Labels */}
          <div className="p-5 sm:p-7 rounded-3xl bg-[#0B0F19]/95 backdrop-blur-xl border-2 border-white/35 hover:border-white/70 shadow-2xl relative overflow-hidden transition-all duration-300">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-white font-bold flex items-center gap-1.5 sm:gap-2">
                <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                <span>BACKGROUND BLUR</span>
              </h3>
              <span className="font-mono text-xs sm:text-sm font-bold text-white bg-blue-600/30 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full border-2 border-white/50 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                f/{aperture.toFixed(1)}
              </span>
            </div>

            <input
              type="range"
              min="1.2"
              max="16"
              step="0.1"
              value={aperture}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setAperture(val);
                soundFx.playClick(600 + val * 40);
              }}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400 mb-3 sm:mb-4 border border-white/30"
            />

            <div className="flex justify-between font-mono text-[9px] sm:text-[10px] text-slate-300 font-semibold">
              <span className="text-white">f/1.2 (BLUR)</span>
              <span>f/4.0</span>
              <span className="text-white">f/16 (SHARP)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
