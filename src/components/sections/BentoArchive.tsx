"use client";

import React from "react";
import { Award, Camera, Shield, Star, CheckCircle2 } from "lucide-react";

export default function BentoArchive() {
  return (
    <section
      id="archive-bento"
      className="relative py-28 sm:py-36 px-5 sm:px-10 md:px-16 lg:pl-32 lg:pr-16 bg-[#05070E] select-none overflow-hidden"
    >
      {/* Section Header with Clear Language */}
      <div className="max-w-6xl mx-auto mb-14">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-blue-400 font-semibold block mb-2">
          ABOUT THE STUDIO // 06
        </span>
        <h2 className="font-serif font-light text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-4">
          Our Experience & Standards
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-light">
          A look at our professional camera equipment, international photography awards, and museum-quality print standards.
        </p>
      </div>

      {/* Gapless Balanced Bento Grid with Thick 2px White Structured Borders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        
        {/* Bento 1: Professional Camera Gear (2-Col Span on LG) */}
        <div className="lg:col-span-2 rounded-3xl p-8 bg-[#0B0F19]/95 border-2 border-white/35 hover:border-white shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group backdrop-blur-md">
          <div className="relative z-10">
            <div className="w-11 h-11 rounded-2xl bg-blue-500/15 text-blue-400 border-2 border-white/40 flex items-center justify-center mb-6 shadow-sm">
              <Camera className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs text-blue-400 uppercase tracking-widest block mb-2 font-bold">
              CAMERA GEAR
            </span>
            <h3 className="font-serif font-light text-2xl sm:text-3xl text-white mb-3">
              High-End Camera Equipment
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed max-w-md font-light">
              We shoot with top-tier Hasselblad, Leica, and Phase One medium format cameras for unmatched sharpness, rich detail, and true-to-life colors.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-white/20 flex items-center justify-between font-mono text-xs text-slate-200 relative z-10 font-semibold">
            <span>ULTRA-HIGH RESOLUTION</span>
            <span className="text-blue-400 font-bold">MAXIMUM SHARPNESS & DETAIL</span>
          </div>
        </div>

        {/* Bento 2: Global Accolades Card */}
        <div className="rounded-3xl p-8 bg-[#0B0F19]/95 border-2 border-white/35 hover:border-white shadow-2xl transition-all duration-300 flex flex-col justify-between backdrop-blur-md">
          <div>
            <div className="w-11 h-11 rounded-2xl bg-blue-500/15 text-blue-400 border-2 border-white/40 flex items-center justify-center mb-6 shadow-sm">
              <Award className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs text-blue-400 uppercase tracking-widest block mb-2 font-bold">
              AWARDS
            </span>
            <h3 className="font-serif font-light text-2xl text-white mb-3">
              18 International Awards
            </h3>
            <ul className="space-y-2.5 font-mono text-xs text-slate-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>PX3 Paris Photography Award (Gold)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Hasselblad Masters Finalist</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Tokyo Photo Book of the Year</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t-2 border-white/20 font-mono text-[11px] text-slate-400 font-semibold">
            <span>2021 — 2026</span>
          </div>
        </div>

        {/* Bento 3: Fine Art Archival Certification */}
        <div className="rounded-3xl p-8 bg-[#0B0F19]/95 border-2 border-white/35 hover:border-white shadow-2xl transition-all duration-300 flex flex-col justify-between backdrop-blur-md">
          <div>
            <div className="w-11 h-11 rounded-2xl bg-blue-500/15 text-blue-400 border-2 border-white/40 flex items-center justify-center mb-6 shadow-sm">
              <Shield className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs text-blue-400 uppercase tracking-widest block mb-2 font-bold">
              PRINT QUALITY
            </span>
            <h3 className="font-serif font-light text-2xl text-white mb-3">
              Museum-Grade Prints
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed font-light">
              Every printed photo uses 100% fine cotton archival paper and fade-resistant inks designed to maintain their brilliance for decades.
            </p>
          </div>

          <div className="pt-6 border-t-2 border-white/20 font-mono text-[11px] text-blue-400 font-bold">
            <span>100+ YEAR FADE RESISTANCE</span>
          </div>
        </div>

        {/* Bento 4: Client Critique / Vogue Quote (2-Col Span on LG) */}
        <div className="lg:col-span-2 rounded-3xl p-8 bg-[#0B0F19]/95 border-2 border-white/35 hover:border-white shadow-2xl transition-all duration-300 flex flex-col justify-between backdrop-blur-md">
          <div>
            <div className="flex items-center gap-1 text-amber-400 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="font-serif italic text-lg sm:text-xl text-slate-100 leading-relaxed mb-6 font-light">
              "Starline doesn't just take pictures—they create timeless art. Their attention to lighting, shadows, and natural emotion is extraordinary."
            </p>
          </div>

          <div className="pt-6 border-t-2 border-white/20 flex items-center justify-between font-mono text-xs text-slate-200">
            <div>
              <span className="text-white font-semibold block">CLARA DE LA ROCHE</span>
              <span className="text-[10px] text-slate-400">CREATIVE DIRECTOR, PARIS FASHION REVIEW</span>
            </div>
            <span className="text-blue-400 font-bold">PARIS EXHIBITION</span>
          </div>
        </div>
      </div>
    </section>
  );
}
