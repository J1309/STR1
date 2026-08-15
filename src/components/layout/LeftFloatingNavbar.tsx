"use client";

import React, { useState, useEffect } from "react";
import { 
  Film, 
  Focus, 
  Globe, 
  Sliders, 
  LayoutGrid, 
  Volume2, 
  VolumeX 
} from "lucide-react";
import { soundFx } from "../../utils/sound";

interface NavItem {
  id: string;
  label: string;
  code: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: "hero", label: "Overview", code: "01", icon: () => <img src="/logo-transparent.png" alt="Overview" className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain filter brightness-110 drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]" /> },
  { id: "exhibition", label: "Photo Gallery", code: "02", icon: Film },
  { id: "optics-lab", label: "Camera & Lens Lab", code: "03", icon: Focus },
  { id: "ecosystem", label: "Global Studios", code: "04", icon: Globe },
  { id: "color-grade", label: "Color Editing", code: "05", icon: Sliders },
  { id: "archive-bento", label: "Studio & Awards", code: "06", icon: LayoutGrid },
];

export default function LeftFloatingNavbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Track scroll position to detach navbar when scrolling down and update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 120);

      const scrollPosition = scrollY + window.innerHeight * 0.35;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    soundFx.playClick(1100);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundFx.playFocusLock();
    }
  };

  return (
    <nav 
      aria-label="Primary Navigation"
      className={`fixed z-50 select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        /* Mobile: Mid-Top Floating Horizontal Capsule */
        top-3 left-1/2 -translate-x-1/2 
        /* PC View: Left Edge Docked-then-Floating Vertical Bar */
        md:top-1/2 md:-translate-y-1/2 md:translate-x-0 ${
          isScrolled
            ? "md:left-6 lg:left-8" // PC Floats detached in viewport
            : "md:left-0" // PC Attached flush to left screen edge
        }
      `}
    >
      {/* Dynamic Shell: Horizontal pill on Mobile, Vertical docked/pill on PC */}
      <div 
        className={`relative bg-[#0B0F19]/95 backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center shadow-2xl
          /* Mobile Layout: Horizontal Row */
          flex-row gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-full border-2 border-white/40 hover:border-white/80 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.9),0_0_20px_rgba(37,99,235,0.25)]
          /* PC Layout: Vertical Column with Docked-then-Floating states */
          md:flex-col md:gap-2.5 ${
            isScrolled
              ? "md:p-2 md:rounded-full md:border-2 md:border-white/40 md:hover:border-white/80 md:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9),0_0_25px_rgba(37,99,235,0.25)]"
              : "md:pl-3 md:pr-3.5 md:py-6 md:rounded-r-2xl md:rounded-l-none md:border-t-2 md:border-r-2 md:border-b-2 md:border-l-0 md:border-white/30 md:hover:border-white/70 md:shadow-[10px_15px_40px_-10px_rgba(0,0,0,0.85)]"
          }
        `}
      >
        {/* Top/Left Starline Brand Logo */}
        <button
          onClick={() => scrollToSection("hero")}
          onMouseEnter={() => soundFx.playHover()}
          className="group relative p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 border-2 border-white/40 hover:border-white flex items-center justify-center shadow-lg"
          title="Starline Studio Overview"
        >
          <img
            src="/logo-transparent.png"
            alt="Starline Logo"
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 object-contain transition-transform duration-700 group-hover:rotate-45 drop-shadow-[0_0_8px_#3B82F6]"
          />
        </button>

        {/* Hairline Divider */}
        <div className="w-[2px] h-3 md:w-4 md:h-[2px] bg-white/40 rounded-full" />

        {/* Navigation Items Stack with Real-Time Active Tracking */}
        <div className="flex flex-row md:flex-col items-center gap-1 sm:gap-1.5 md:gap-2 relative">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <div key={item.id} className="relative group flex items-center">
                <button
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => soundFx.playHover()}
                  aria-label={item.label}
                  className={`relative p-1.5 sm:p-2 md:p-2.5 rounded-full transition-all duration-300 flex items-center justify-center border-2 ${
                    isActive
                      ? "bg-blue-600 text-white border-white shadow-[0_0_16px_rgba(37,99,235,0.8)] scale-105"
                      : "border-transparent text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/40"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                {/* PC Right Flyout Glass Label on Hover */}
                <div className="absolute left-full ml-3 sm:ml-4 pointer-events-none opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out z-50 whitespace-nowrap hidden md:block">
                  <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#0B0F19]/95 backdrop-blur-xl border-2 border-white/60 shadow-2xl">
                    <span className="font-mono text-[10px] font-bold text-blue-400 tracking-wider">
                      {item.code}
                    </span>
                    <span className="text-xs font-medium text-white tracking-wide">
                      {item.label}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_#3B82F6]" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hairline Divider */}
        <div className="w-[2px] h-3 md:w-4 md:h-[2px] bg-white/40 rounded-full" />

        {/* Audio Haptics Mute Toggle */}
        <button
          onClick={handleMuteToggle}
          onMouseEnter={() => soundFx.playHover()}
          aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
          className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 border-2 ${
            isMuted 
              ? "text-slate-600 hover:text-slate-400 border-transparent bg-transparent" 
              : "text-slate-300 hover:text-white bg-white/5 hover:bg-white/15 border-white/30 hover:border-white/70"
          }`}
          title={isMuted ? "Unmute Camera Sounds" : "Mute Camera Sounds"}
        >
          {isMuted ? <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
        </button>
      </div>
    </nav>
  );
}
