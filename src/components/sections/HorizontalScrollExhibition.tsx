"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Maximize2, MapPin, Sparkles } from "lucide-react";
import { PhotoData } from "../ui/LightboxModal";
import { soundFx } from "../../utils/sound";

gsap.registerPlugin(ScrollTrigger);

export const exhibitionPhotos: PhotoData[] = [
  {
    id: "ex-1",
    title: "Nocturne in Shibuya",
    category: "Night Photography",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop",
    camera: "Hasselblad H6D",
    lens: "35mm f/3.5",
    aperture: "f/2.8",
    shutter: "1/125s",
    iso: "ISO 400",
    location: "Tokyo, Japan",
    year: "2026",
    description: "Rain reflections and glowing neon night lights captured across the vibrant streets of Shibuya, Tokyo.",
  },
  {
    id: "ex-2",
    title: "Haute Silk & Shadow",
    category: "Fashion Editorial",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1600&auto=format&fit=crop",
    camera: "Phase One 150MP",
    lens: "80mm f/1.4",
    aperture: "f/1.4",
    shutter: "1/1000s",
    iso: "ISO 50",
    location: "Paris, France",
    year: "2026",
    description: "A studio fashion portrait exploring the beauty of natural drape, textured fabric, and sculpted light.",
  },
  {
    id: "ex-3",
    title: "Basalt Monolith",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop",
    camera: "Leica S3",
    lens: "70mm f/2.5",
    aperture: "f/8.0",
    shutter: "1/250s",
    iso: "ISO 100",
    location: "Reykjavik, Iceland",
    year: "2025",
    description: "Striking modern architecture emerging from morning mist, highlighting clean geometric structures.",
  },
  {
    id: "ex-4",
    title: "Glacial Crystal Study",
    category: "Nature & Landscape",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop",
    camera: "Sony Alpha 1",
    lens: "24-70mm f/2.8",
    aperture: "f/4.0",
    shutter: "1/4000s",
    iso: "ISO 160",
    location: "Jökulsárlón, Iceland",
    year: "2026",
    description: "Ancient glacial ice formations reflecting clear blue water and low winter sunlight in Iceland.",
  },
  {
    id: "ex-5",
    title: "The Solitary Muse",
    category: "Studio Portrait",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1600&auto=format&fit=crop",
    camera: "Hasselblad 907X",
    lens: "90mm f/2.5",
    aperture: "f/2.5",
    shutter: "1/500s",
    iso: "ISO 200",
    location: "Milan Studio",
    year: "2026",
    description: "An intimate, authentic portrait study capturing subtle emotion and soft studio key lighting.",
  },
];

interface HorizontalScrollExhibitionProps {
  onSelectPhoto: (photo: PhotoData) => void;
}

export default function HorizontalScrollExhibition({ onSelectPhoto }: HorizontalScrollExhibitionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.2,
          start: "top top",
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="exhibition"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#05070E] overflow-hidden select-none"
    >
      {/* Radiant Gallery Spotlight Aura */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-radial-gradient from-blue-500/15 via-sky-400/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Section Title Header */}
      <div className="absolute top-8 left-6 sm:left-12 md:left-24 lg:left-32 z-30 flex items-center gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-blue-400 font-semibold block mb-1">
            PHOTO GALLERY // 02
          </span>
          <h2 className="font-serif font-light text-2xl sm:text-4xl text-white tracking-tight">
            Selected Works
          </h2>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-white bg-[#0B0F19]/90 px-4 py-2 rounded-full border-2 border-white/50 backdrop-blur-md shadow-lg font-semibold">
          <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
          <span>SCROLL TO EXPLORE</span>
        </div>
      </div>

      {/* Horizontal GSAP Scrolling Track */}
      <div
        ref={trackRef}
        className="horizontal-gallery-wrapper h-full flex items-center pl-6 sm:pl-16 md:pl-28 lg:pl-36 pr-24 gap-8 md:gap-14 pt-20"
      >
        {/* Intro Curation Card with Clear Language & Thick 2px White Border */}
        <div className="flex-shrink-0 relative w-72 sm:w-88 p-8 rounded-3xl bg-[#0B0F19]/95 backdrop-blur-xl border-2 border-white/40 hover:border-white flex flex-col justify-between shadow-2xl overflow-hidden transition-all duration-300">
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="w-10 h-10 rounded-2xl bg-blue-500/15 border-2 border-white/40 text-blue-400 flex items-center justify-center mb-6 shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs text-blue-400 uppercase tracking-widest block mb-2 font-semibold">
              CURATED COLLECTION
            </span>
            <h3 className="font-serif font-light text-2xl sm:text-3xl text-white mb-4">
              Featured Series
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed font-light">
              A curated collection of fine art and editorial photographs captured on location in Tokyo, Paris, and Iceland.
            </p>
          </div>

          <div className="pt-6 border-t-2 border-white/20 font-mono text-xs text-slate-200 flex items-center justify-between">
            <span className="text-blue-400 font-bold">5 FEATURED WORKS</span>
            <span className="text-white font-semibold">HIGH RESOLUTION</span>
          </div>
        </div>

        {/* Dynamic Photographic Exhibition Cards */}
        {exhibitionPhotos.map((item, index) => (
          <div
            key={item.id}
            onClick={() => {
              soundFx.playShutter();
              onSelectPhoto(item);
            }}
            onMouseEnter={() => soundFx.playHover()}
            data-cursor="INSPECT"
            className="group flex-shrink-0 relative w-[320px] sm:w-[460px] md:w-[580px] h-[65vh] sm:h-[70vh] rounded-3xl p-3.5 bg-[#0B0F19]/95 backdrop-blur-xl border-2 border-white/35 hover:border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.85),0_0_30px_rgba(59,130,246,0.15)] hover:shadow-[0_25px_70px_-10px_rgba(0,0,0,0.95),0_0_40px_rgba(255,255,255,0.25)] transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            {/* Image Box */}
            <div className="relative w-full h-[78%] rounded-2xl overflow-hidden bg-black border-2 border-white/25">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover filter contrast-105 brightness-95 group-hover:scale-105 group-hover:brightness-105 transition-all duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Shade */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-60" />

              {/* Top Tag & Zoom Button */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border-2 border-white/40 shadow-md font-semibold">
                  {item.category}
                </span>

                <div className="w-8 h-8 rounded-full bg-black/85 backdrop-blur-md border-2 border-white/40 text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all shadow-md">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Bottom Meta Bar */}
            <div className="px-4 pb-2 pt-3 flex flex-col justify-between flex-1 relative z-10">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-lg sm:text-xl text-white tracking-wide group-hover:text-blue-200 transition-colors">
                  {item.title}
                </h4>
                <span className="font-mono text-xs text-blue-400 font-bold">
                  // 0{index + 1}
                </span>
              </div>

              <div className="flex items-center justify-between font-mono text-[11px] text-slate-300 pt-2.5 border-t-2 border-white/20">
                <span className="text-white font-medium">{item.aperture} • {item.shutter}</span>
                <div className="flex items-center gap-1.5 text-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* End Exploration Card */}
        <div className="flex-shrink-0 relative w-80 p-8 rounded-3xl bg-[#0B0F19]/95 border-2 border-white/40 hover:border-white flex flex-col justify-center items-center text-center shadow-2xl overflow-hidden transition-all duration-300">
          <div className="absolute inset-0 bg-radial-gradient from-blue-600/15 via-transparent to-transparent pointer-events-none" />

          <span className="font-mono text-xs text-blue-400 uppercase tracking-widest block mb-2 relative z-10 font-bold">
            FULL COLLECTION
          </span>
          <h3 className="font-serif font-light text-2xl text-white mb-3 relative z-10">
            1,400+ Photos
          </h3>
          <p className="text-slate-300 text-xs mb-6 leading-relaxed font-light relative z-10">
            Explore our complete archive of fashion campaigns, architectural studies, and travel monographs.
          </p>
          <a
            href="#archive-bento"
            className="px-7 py-3.5 rounded-full bg-white text-black hover:bg-slate-100 font-semibold text-xs tracking-widest uppercase transition-all shadow-xl relative z-10 border-2 border-white"
          >
            VIEW ARCHIVE
          </a>
        </div>
      </div>
    </section>
  );
}
