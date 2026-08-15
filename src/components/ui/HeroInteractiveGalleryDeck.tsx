"use client";

import React, { useState, useRef, useEffect } from "react";
import { MapPin, Maximize2 } from "lucide-react";
import { soundFx } from "../../utils/sound";

export interface HeroWorkItem {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  tag: string;
}

const showcaseWorks: HeroWorkItem[] = [
  {
    id: "h1",
    title: "Nocturne in Shibuya",
    category: "Night Photography",
    location: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop",
    tag: "100MP // CINEMATIC",
  },
  {
    id: "h2",
    title: "Haute Silk & Shadow",
    category: "Fashion Editorial",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop",
    tag: "STUDIO HAUTE",
  },
  {
    id: "h3",
    title: "Basalt Monolith",
    category: "Architecture",
    location: "Reykjavik, Iceland",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    tag: "MONOCHROME FORM",
  },
  {
    id: "h4",
    title: "Glacial Crystal Study",
    category: "Nature & Light",
    location: "Jökulsárlón, Iceland",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    tag: "ARCTIC LIGHT",
  },
];

const AUTO_INTERVAL = 4200; // 4.2 seconds per photograph

export default function HeroInteractiveGalleryDeck() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>();

  // Continuous Silky Damped Mouse Parallax
  useEffect(() => {
    const updateSmoothMouse = () => {
      setSmoothMouse((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.08,
        y: prev.y + (mousePos.y - prev.y) * 0.08,
      }));
      animFrameRef.current = requestAnimationFrame(updateSmoothMouse);
    };

    animFrameRef.current = requestAnimationFrame(updateSmoothMouse);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [mousePos]);

  // Automatic Smooth Transition Cycle
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      soundFx.playShutter();
      setActiveIndex((prev) => (prev + 1) % showcaseWorks.length);
    }, AUTO_INTERVAL);

    return () => clearInterval(timer);
  }, [isHovered]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  const handleSelectCard = (index: number) => {
    if (index !== activeIndex) {
      soundFx.playShutter();
      setActiveIndex(index);
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className="relative w-full max-w-[340px] sm:max-w-[480px] lg:max-w-[560px] aspect-[4/5] sm:aspect-[1/1.12] flex items-center justify-center select-none my-6 lg:my-0"
    >
      {/* Soft Ambient Luminous Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-blue-600/15 rounded-full blur-[100px] pointer-events-none transition-all duration-1000" />

      {/* Layered 3D Kinetic Film Cards Stack */}
      <div className="relative w-full h-full flex items-center justify-center [perspective:1200px] [transform-style:preserve-3d]">
        {showcaseWorks.map((work, index) => {
          const total = showcaseWorks.length;
          const offset = (index - activeIndex + total) % total;
          const isFront = offset === 0;

          // Responsive stack coordinate curve
          const stackStepX = 22;
          const stackStepY = -12;
          const stackStepZ = -50;
          const stackRotateZ = 3.5;

          let targetX = offset * stackStepX + smoothMouse.x * (18 - offset * 3);
          let targetY = offset * stackStepY + smoothMouse.y * (14 - offset * 2);
          let targetZ = offset * stackStepZ;
          let targetRotZ = offset * stackRotateZ + smoothMouse.x * 4;
          let targetRotX = smoothMouse.y * -6;
          let targetRotY = smoothMouse.x * 6;
          let targetScale = 1 - offset * 0.055;
          let targetOpacity = offset > 2 ? 0.3 : 1 - offset * 0.18;
          let zIndex = total - offset;

          if (isFront) {
            targetX = smoothMouse.x * 14;
            targetY = smoothMouse.y * 10;
            targetRotZ = smoothMouse.x * 2;
            targetOpacity = 1;
          }

          return (
            <div
              key={work.id}
              onClick={() => handleSelectCard(index)}
              style={{
                transform: `translate3d(${targetX}px, ${targetY}px, ${targetZ}px) rotateX(${targetRotX}deg) rotateY(${targetRotY}deg) rotateZ(${targetRotZ}deg) scale(${targetScale})`,
                zIndex,
                opacity: targetOpacity,
                transition: "transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 850ms cubic-bezier(0.16, 1, 0.3, 1), border-color 400ms ease, box-shadow 400ms ease",
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
              }}
              className={`absolute w-[260px] sm:w-[350px] md:w-[390px] h-[350px] sm:h-[450px] md:h-[490px] rounded-3xl p-3 sm:p-4 bg-[#0B0F19]/95 backdrop-blur-2xl border-2 cursor-pointer shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(37,99,235,0.18)] flex flex-col justify-between overflow-hidden ${
                isFront
                  ? "border-white ring-2 ring-white/30"
                  : "border-white/30 hover:border-white/70 hover:scale-[1.02]"
              }`}
            >
              {/* Photo Frame with Thick White Border */}
              <div className="relative w-full h-[76%] sm:h-[78%] rounded-2xl overflow-hidden bg-black border-2 border-white/20">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover filter contrast-105 brightness-95 group-hover:scale-105 transition-transform duration-1000 ease-out"
                />

                {/* Subtle darkroom vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/85 via-transparent to-transparent" />

                {/* Top Category Badge */}
                <div className="absolute top-2.5 sm:top-3.5 left-2.5 sm:left-3.5 right-2.5 sm:right-3.5 flex items-center justify-between pointer-events-none">
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-white bg-black/85 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border-2 border-white/40 font-semibold shadow-md">
                    {work.category}
                  </span>

                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/85 backdrop-blur-md border-2 border-white/40 text-white flex items-center justify-center shadow-md">
                    <Maximize2 className="w-3 h-3" />
                  </div>
                </div>

                {/* Technical Spec Tag */}
                <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3.5 pointer-events-none">
                  <span className="font-mono text-[8px] sm:text-[9px] text-blue-300 font-bold bg-[#0B0F19]/90 px-2 sm:px-2.5 py-0.5 rounded border border-white/30 tracking-wider">
                    {work.tag}
                  </span>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-2 px-1 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-base sm:text-xl text-white font-normal truncate max-w-[170px] sm:max-w-[240px]">
                    {work.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-slate-300 font-mono text-[10px] sm:text-[11px] mt-0.5">
                    <MapPin className="w-3 h-3 text-blue-400" />
                    <span className="truncate max-w-[150px] sm:max-w-none">{work.location}</span>
                  </div>
                </div>

                <div className="font-mono text-[11px] sm:text-xs font-bold text-blue-400 bg-blue-600/20 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-white/30">
                  0{index + 1}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sleek Minimal Auto-Advance Progress Indicators */}
      <div className="absolute -bottom-5 sm:-bottom-8 z-30 flex items-center gap-2 sm:gap-2.5 bg-[#0B0F19]/95 backdrop-blur-xl px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border-2 border-white/40 shadow-2xl">
        <span className="font-mono text-[9px] sm:text-[10px] text-slate-400 font-semibold uppercase tracking-wider mr-0.5 sm:mr-1">
          {isHovered ? "PAUSED" : "AUTO"}
        </span>

        {showcaseWorks.map((_, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={i}
              onClick={() => handleSelectCard(i)}
              className="relative w-6 sm:w-10 h-1 sm:h-1.5 rounded-full overflow-hidden bg-white/20 hover:bg-white/40 transition-colors"
              title={`View Photograph 0${i + 1}`}
            >
              {isActive && (
                <div
                  key={activeIndex}
                  className={`h-full bg-blue-400 rounded-full shadow-[0_0_8px_#3B82F6] ${
                    isHovered ? "w-full" : "animate-[smoothGrow_4.2s_linear_forwards]"
                  }`}
                />
              )}
            </button>
          );
        })}

        <span className="font-mono text-[11px] sm:text-xs font-bold text-white ml-0.5 sm:ml-1">
          0{activeIndex + 1}
        </span>
      </div>

      <style>{`
        @keyframes smoothGrow {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
