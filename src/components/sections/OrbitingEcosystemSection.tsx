"use client";

import React from "react";
import { OrbitingCirclesGlobe } from "../ui/orbiting-circles-02";
import { MapPin, Globe2, ShieldCheck } from "lucide-react";

const studioHubs = [
  { city: "Paris", role: "European Studio", coord: "Paris, France" },
  { city: "Tokyo", role: "Asia-Pacific Studio", coord: "Tokyo, Japan" },
  { city: "Los Angeles", role: "Creative Production Hub", coord: "Los Angeles, USA" },
  { city: "Milan", role: "Editorial & Print Studio", coord: "Milan, Italy" },
];

export default function OrbitingEcosystemSection() {
  return (
    <section
      id="ecosystem"
      className="relative py-28 sm:py-36 px-5 sm:px-10 md:px-16 lg:pl-32 lg:pr-16 bg-[#05070E] select-none overflow-hidden"
    >
      {/* Soft Ambient Radial Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section with Clear Language */}
      <div className="max-w-6xl mx-auto text-center mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B0F19]/90 border-2 border-white/40 shadow-xl text-xs font-mono tracking-widest text-white mb-4 backdrop-blur-md font-semibold">
          <Globe2 className="w-3.5 h-3.5 text-blue-400" />
          <span>GLOBAL STUDIOS</span>
        </div>

        <h2 className="font-serif font-light text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-4 drop-shadow-md">
          Our Studios Worldwide
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          We photograph, edit, and print artwork from our four primary studios across Europe, Asia, and North America.
        </p>
      </div>

      {/* Orbiting Component */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex justify-center items-center py-6">
        <OrbitingCirclesGlobe />
      </div>

      {/* 4 Global Hub Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto mt-12 relative z-10">
        {studioHubs.map((hub) => (
          <div
            key={hub.city}
            className="p-5 rounded-2xl bg-[#0B0F19]/95 border-2 border-white/30 hover:border-white shadow-xl transition-all duration-300 flex flex-col justify-between backdrop-blur-md"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-serif text-lg text-white font-semibold">{hub.city}</span>
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <span className="text-xs text-slate-300 block mb-2 font-light">{hub.role}</span>
            <span className="font-mono text-[10px] text-blue-400 font-bold block border-t-2 border-white/20 pt-2">
              {hub.coord}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Information Strip with Clear Plain Language */}
      <div className="max-w-4xl mx-auto mt-12 pt-8 border-t-2 border-white/30 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-300 relative z-10">
        <div className="flex items-center gap-2 font-semibold">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span>SECURE HIGH-SPEED CLOUD STORAGE</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-blue-400 font-bold">FULL 8K RESOLUTION</span>
          <span className="text-white font-medium">WORLDWIDE DELIVERY</span>
        </div>
      </div>
    </section>
  );
}
