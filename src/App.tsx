"use client";

import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SkeletonLoader from "./components/ui/SkeletonLoader";
import LightboxModal, { PhotoData } from "./components/ui/LightboxModal";
import ShaderDistortionMesh from "./components/canvas/ShaderDistortionMesh";
import StudioAmbientLight from "./components/canvas/StudioAmbientLight";
import LeftFloatingNavbar from "./components/layout/LeftFloatingNavbar";
import Footer from "./components/layout/Footer";

import HeroSection from "./components/sections/HeroSection";
import HorizontalScrollExhibition from "./components/sections/HorizontalScrollExhibition";
import InteractiveLensLab from "./components/sections/InteractiveLensLab";
import OrbitingEcosystemSection from "./components/sections/OrbitingEcosystemSection";
import BeforeAfterGrade from "./components/sections/BeforeAfterGrade";
import BentoArchive from "./components/sections/BentoArchive";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoData | null>(null);

  // Initialize Lenis Smooth Scroll and sync with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  const scrollToExhibition = () => {
    const el = document.getElementById("exhibition");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#05070E] text-slate-100 selection:bg-blue-600 selection:text-white overflow-x-hidden font-sans">
      
      {/* Subtle Photochemical Film Grain */}
      <div className="film-grain" />

      {/* Haute Obsidian & White Border Preloader with Dual Curtain Reveal */}
      {isLoading && (
        <SkeletonLoader onComplete={() => setIsLoading(false)} />
      )}

      {/* WebGL GLSL Shader Ambient Mesh (Royal Sapphire Caustics) */}
      <ShaderDistortionMesh />

      {/* Interactive Studio Softbox & Ambient Light Follower */}
      <StudioAmbientLight />

      {/* Floating Vertical Left Navbar */}
      <LeftFloatingNavbar />

      {/* Main Content Sections */}
      <main className="relative z-10 w-full max-w-full overflow-x-hidden">
        {/* 01 // Hero Vision Core with 3D Background Framed in White Borders */}
        <HeroSection onExploreClick={scrollToExhibition} />

        {/* 02 // Horizontal Scroll Exhibition Room */}
        <HorizontalScrollExhibition onSelectPhoto={setSelectedPhoto} />

        {/* 03 // Optics & Focal Length Simulator */}
        <InteractiveLensLab />

        {/* 04 // Celestial 3D Orbiting Globe Ecosystem */}
        <OrbitingEcosystemSection />

        {/* 05 // RAW vs Master Grade Comparison */}
        <BeforeAfterGrade />

        {/* 06 // Studio Master Bento Archive */}
        <BentoArchive />

        {/* Studio Typographic Footer */}
        <Footer />
      </main>

      {/* High-Resolution Lightbox & Optical EXIF Viewer */}
      <LightboxModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
}
