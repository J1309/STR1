"use client";

import React from "react";
import ParticleSphereAnimation from "./orbiting-circles-02-utils/particalsphear";

interface OrbitItem {
  code: string;
  name: string;
  sub: string;
  angle: number;
  iconType: "leica" | "hasselblad" | "zeiss" | "arri" | "cooke" | "phaseone" | "kodak" | "dcip3" | "prores";
}

interface OrbitRing {
  size: string;
  duration: number;
  items: OrbitItem[];
}

const photoOrbits: OrbitRing[] = [
  {
    size: "w-110 h-110 md:w-180 md:h-180",
    duration: 22,
    items: [
      { code: "LEICA", name: "Leica S-System", sub: "Medium Format", angle: -60, iconType: "leica" },
      { code: "HASSELBLAD", name: "Hasselblad H6D", sub: "100MP CMOS", angle: 0, iconType: "hasselblad" },
      { code: "ZEISS", name: "Zeiss T* Optic", sub: "Nano-AR Element", angle: 60, iconType: "zeiss" },
    ],
  },
  {
    size: "w-150 h-150 md:w-220 md:h-220",
    duration: 28,
    items: [
      { code: "ARRI", name: "ARRI CineRAW", sub: "Large Format Cinema", angle: 0, iconType: "arri" },
      { code: "COOKE", name: "Cooke Optics", sub: "Anamorphic /i Prime", angle: -90, iconType: "cooke" },
    ],
  },
  {
    size: "w-180 h-180 md:w-265 md:h-265",
    duration: 34,
    items: [
      { code: "PORTRA", name: "Kodak Portra 400", sub: "120 Emulsion Stock", angle: -60, iconType: "kodak" },
      { code: "PHASE ONE", name: "Phase One IQ4", sub: "150MP Trichromatic", angle: 0, iconType: "phaseone" },
      { code: "DCI-P3", name: "DCI-P3 Gamut", sub: "Spectral Grade V4", angle: 60, iconType: "dcip3" },
    ],
  },
];

function RenderPhotoIcon({ type }: { type: OrbitItem["iconType"] }) {
  switch (type) {
    case "leica":
      return (
        <div className="w-full h-full rounded-full bg-red-600 border border-white/40 flex items-center justify-center text-white font-serif font-bold text-[10px] sm:text-xs shadow-md">
          <span className="italic tracking-tighter">Leica</span>
        </div>
      );
    case "hasselblad":
      return (
        <div className="w-full h-full rounded-full bg-[#0D1528] border border-white/50 flex items-center justify-center text-white font-serif font-black text-[10px] sm:text-xs">
          <span>H</span>
        </div>
      );
    case "zeiss":
      return (
        <div className="w-full h-full rounded-full bg-blue-900 border border-white/40 flex items-center justify-center text-blue-200 font-sans font-bold text-[9px] sm:text-[10px] tracking-tighter">
          <span>ZEISS</span>
        </div>
      );
    case "arri":
      return (
        <div className="w-full h-full rounded-full bg-slate-900 border border-white/40 flex items-center justify-center text-white font-mono font-bold text-[9px] sm:text-[10px]">
          <span>ARRI</span>
        </div>
      );
    case "cooke":
      return (
        <div className="w-full h-full rounded-full bg-[#16120E] border border-amber-500/60 flex items-center justify-center text-amber-200 font-serif font-bold text-[9px] sm:text-[10px]">
          <span>Cooke</span>
        </div>
      );
    case "phaseone":
      return (
        <div className="w-full h-full rounded-full bg-[#0E1726] border border-white/40 flex items-center justify-center text-blue-300 font-sans font-bold text-[8px] sm:text-[9px]">
          <span>150MP</span>
        </div>
      );
    case "kodak":
      return (
        <div className="w-full h-full rounded-full bg-amber-500 border border-white/40 flex items-center justify-center text-red-900 font-sans font-black text-[9px] sm:text-[10px]">
          <span>120</span>
        </div>
      );
    case "dcip3":
      return (
        <div className="w-full h-full rounded-full bg-blue-600/40 border border-white/40 flex items-center justify-center text-white font-mono text-[8px] sm:text-[9px]">
          <span>RAW</span>
        </div>
      );
    default:
      return (
        <div className="w-full h-full rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white text-xs">
          <span>8K</span>
        </div>
      );
  }
}

export default function OrbitingCirclesGlobeDemo() {
  return (
    <div className="relative w-full h-110 md:h-160 overflow-hidden flex justify-center items-end select-none">
      <style>{`
        @keyframes orbit-cw {
          from { transform: rotate(var(--start-angle)); }
          to   { transform: rotate(calc(var(--start-angle) + 360deg)); }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(var(--start-angle)); }
          to   { transform: rotate(calc(var(--start-angle) - 360deg)); }
        }
        @keyframes counter-cw {
          from { transform: rotate(var(--counter-offset, 0deg)); }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) - 360deg)); }
        }
        @keyframes counter-ccw {
          from { transform: rotate(var(--counter-offset, 0deg)); }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) + 360deg)); }
        }
      `}</style>

      {/* Subtle Ambient Radial Backlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 w-[500px] md:w-[700px] h-[350px] md:h-[450px] bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />

      {/* Center 3D particle globe */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 aspect-square pointer-events-none w-75 md:w-145 z-10">
        <ParticleSphereAnimation />
      </div>

      {/* Orbiting rings with Crisp White Borders */}
      {photoOrbits.map((orbit, index) => {
        const isCW = index % 2 === 0;
        const orbitAnim = isCW ? "orbit-cw" : "orbit-ccw";
        const counterAnim = isCW ? "counter-cw" : "counter-ccw";

        const allItems = [
          ...orbit.items,
          ...orbit.items.map((item) => ({
            ...item,
            angle: item.angle + 180,
          })),
        ];

        return (
          <div
            key={index}
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-white/30 hover:border-white/50 transition-colors ${orbit.size}`}
          >
            {allItems.map((itemData, itemIndex) => (
              <div
                key={itemIndex}
                className="absolute top-0 left-1/2 h-1/2 -ml-8 origin-bottom flex flex-col justify-start items-center"
                style={
                  {
                    "--start-angle": `${itemData.angle}deg`,
                    animation: `${orbitAnim} ${orbit.duration}s linear infinite`,
                  } as React.CSSProperties
                }
              >
                <div
                  className="group relative p-1.5 sm:p-2 border border-white/35 rounded-full bg-[#0B0F19]/95 backdrop-blur-md -mt-7 sm:-mt-8 relative z-10 shadow-2xl hover:border-white hover:scale-110 transition-all duration-300 cursor-pointer flex items-center justify-center"
                  style={
                    {
                      "--counter-offset": `${-itemData.angle}deg`,
                      animation: `${counterAnim} ${orbit.duration}s linear infinite`,
                    } as React.CSSProperties
                  }
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center overflow-hidden">
                    <RenderPhotoIcon type={itemData.iconType} />
                  </div>

                  {/* Hover Tooltip showing Optical Name & Spec with Crisp White Border */}
                  <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-30 whitespace-nowrap bg-black/95 px-3 py-1.5 rounded-xl border border-white/40 shadow-2xl">
                    <span className="font-serif text-xs font-semibold text-white block">
                      {itemData.name}
                    </span>
                    <span className="font-mono text-[9px] text-blue-400 block uppercase font-medium">
                      {itemData.sub}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export { OrbitingCirclesGlobeDemo as OrbitingCirclesGlobe };
