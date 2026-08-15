"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, Globe, Mail, MapPin } from "lucide-react";
import { soundFx } from "../../utils/sound";

export default function Footer() {
  const [utcTime, setUtcTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    soundFx.playClick(1300);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#05070E] text-white pt-24 pb-14 px-5 sm:px-10 md:px-16 lg:pl-32 lg:pr-16 select-none overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col justify-between gap-16">
        
        {/* Top Massive Studio Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo-transparent.png"
                alt="Starline Logo"
                className="w-6 h-6 object-contain filter drop-shadow-[0_0_8px_#3B82F6]"
              />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-blue-400 font-bold">
                STARLINE STUDIOS & MONOGRAPHS
              </span>
            </div>

            <h2 className="font-serif font-light text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white">
              Light. Form. <br />
              <span className="font-serif italic font-normal text-blue-200">Preserved.</span>
            </h2>
          </div>

          {/* Scroll to top button with Thick White Border */}
          <button
            onClick={scrollToTop}
            onMouseEnter={() => soundFx.playHover()}
            className="group self-start md:self-end flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#0B0F19] hover:bg-white/15 border-2 border-white/40 hover:border-white text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 shadow-xl font-semibold"
          >
            <span>TOP OF ARCHIVE</span>
            <ArrowUp className="w-4 h-4 text-blue-400 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>

        {/* Middle Navigation & Ateliers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
          
          {/* Col 1: Paris Atelier with Thick White Border */}
          <div className="p-5 rounded-2xl bg-[#0B0F19]/90 border-2 border-white/25 hover:border-white/50 transition-all">
            <span className="text-[10px] text-blue-400 uppercase tracking-widest block mb-3 font-bold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              PARIS ATELIER
            </span>
            <p className="text-slate-200 leading-relaxed font-light mb-2">
              14 Rue de Beaujolais<br />
              75001 Paris, France
            </p>
            <span className="text-slate-400 text-[11px] block font-medium">+33 1 42 68 00 19</span>
          </div>

          {/* Col 2: Tokyo Lab with Thick White Border */}
          <div className="p-5 rounded-2xl bg-[#0B0F19]/90 border-2 border-white/25 hover:border-white/50 transition-all">
            <span className="text-[10px] text-blue-400 uppercase tracking-widest block mb-3 font-bold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              TOKYO CINELAB
            </span>
            <p className="text-slate-200 leading-relaxed font-light mb-2">
              5-7-22 Minamiaoyama, Minato-ku<br />
              Tokyo 107-0062, Japan
            </p>
            <span className="text-slate-400 text-[11px] block font-medium">+81 3 5412 8890</span>
          </div>

          {/* Col 3: Direct Studio Inquiry with Thick White Border */}
          <div className="p-5 rounded-2xl bg-[#0B0F19]/90 border-2 border-white/25 hover:border-white/50 transition-all">
            <span className="text-[10px] text-blue-400 uppercase tracking-widest block mb-3 font-bold flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              CURATORIAL INQUIRIES
            </span>
            <a
              href="mailto:curator@starline-studios.com"
              className="text-white hover:text-blue-400 transition-colors block mb-1 font-semibold"
            >
              curator@starline-studios.com
            </a>
            <span className="text-slate-400 text-[11px] block font-light">
              Response time: Under 12 Hours
            </span>
          </div>

          {/* Col 4: Telemetry & Live UTC with Thick White Border */}
          <div className="p-5 rounded-2xl bg-[#0B0F19]/90 border-2 border-white/25 hover:border-white/50 transition-all">
            <span className="text-[10px] text-blue-400 uppercase tracking-widest block mb-3 font-bold flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              SYSTEM CLOCK
            </span>
            <div className="font-mono text-sm text-white font-bold mb-1">
              {utcTime || "SYNCHRONIZING..."}
            </div>
            <span className="text-slate-400 text-[11px] block font-light">
              ALL ATELIERS ONLINE
            </span>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar with Subtle Divider */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} STARLINE VISUAL DIRECTION & MONOGRAPHS. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">PRIVACY PROTOCOL</span>
            <span className="hover:text-white cursor-pointer">CURATORIAL TERMS</span>
            <span className="text-blue-400 font-bold">EDITION 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
