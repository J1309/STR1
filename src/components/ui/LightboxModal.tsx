"use client";

import React, { useEffect } from "react";
import { X, Sliders, Maximize2, Download } from "lucide-react";
import { soundFx } from "../../utils/sound";

export interface PhotoData {
  id: string;
  title: string;
  category: string;
  image: string;
  camera: string;
  lens: string;
  aperture: string;
  shutter: string;
  iso: string;
  location: string;
  year: string;
  description: string;
}

interface LightboxModalProps {
  photo: PhotoData | null;
  onClose: () => void;
}

export default function LightboxModal({ photo, onClose }: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        soundFx.playClick(800);
        onClose();
      }
    };
    if (photo) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [photo, onClose]);

  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/90 backdrop-blur-3xl animate-fade-in select-none">
      {/* Modal Container with Thick 2px White Border */}
      <div className="relative w-full max-w-6xl max-h-[92vh] rounded-3xl bg-[#0B0F19]/95 border-2 border-white/40 shadow-2xl overflow-hidden flex flex-col lg:flex-row z-10">
        
        {/* Close Button with Thick White Border */}
        <button
          onClick={() => {
            soundFx.playClick(800);
            onClose();
          }}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-white hover:text-black text-white border-2 border-white/40 transition-all duration-300 shadow-lg"
          title="Close (ESC)"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Photographic Canvas */}
        <div className="relative flex-1 bg-[#05070E] flex items-center justify-center p-4 md:p-8 overflow-hidden group">
          <img
            src={photo.image}
            alt={photo.title}
            className="max-w-full max-h-[70vh] lg:max-h-[82vh] object-contain rounded-xl shadow-2xl border-2 border-white/20"
          />

          <div className="absolute bottom-6 left-8 flex items-center gap-2 font-mono text-[10px] text-slate-200 bg-black/85 px-3.5 py-1.5 rounded-full border-2 border-white/30 backdrop-blur-md shadow-md font-semibold">
            <span>HIGH RESOLUTION PHOTOGRAPH</span>
          </div>
        </div>

        {/* Technical EXIF & Curatorial Pane with Thick White Divider */}
        <div className="w-full lg:w-96 p-6 md:p-8 bg-[#0B0F19] border-t-2 lg:border-t-0 lg:border-l-2 border-white/30 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-blue-400 tracking-[0.2em] uppercase font-bold">
                {photo.category}
              </span>
              <span className="font-mono text-xs text-slate-400 font-medium">
                {photo.year}
              </span>
            </div>

            <h3 className="font-serif text-2xl md:text-3xl text-white tracking-tight mb-4">
              {photo.title}
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
              {photo.description}
            </p>

            {/* Photo Details Grid with Thick White Borders */}
            <div className="mb-6 p-4 rounded-2xl bg-black/60 border-2 border-white/25">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-200 font-bold mb-3 flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-blue-400" />
                CAMERA & PHOTO DETAILS
              </h4>

              <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                <div className="p-2 rounded-lg bg-white/[0.04] border border-white/20">
                  <span className="text-slate-400 text-[9px] block font-medium">CAMERA</span>
                  <span className="text-white font-semibold text-[11px]">{photo.camera}</span>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.04] border border-white/20">
                  <span className="text-slate-400 text-[9px] block font-medium">LENS</span>
                  <span className="text-white font-semibold text-[11px]">{photo.lens}</span>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.04] border border-white/20">
                  <span className="text-slate-400 text-[9px] block font-medium">APERTURE</span>
                  <span className="text-blue-400 font-bold">{photo.aperture}</span>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.04] border border-white/20">
                  <span className="text-slate-400 text-[9px] block font-medium">SHUTTER</span>
                  <span className="text-blue-400 font-bold">{photo.shutter}</span>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.04] border border-white/20">
                  <span className="text-slate-400 text-[9px] block font-medium">ISO</span>
                  <span className="text-white font-semibold">{photo.iso}</span>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.04] border border-white/20">
                  <span className="text-slate-400 text-[9px] block font-medium">LOCATION</span>
                  <span className="text-white font-semibold truncate block">{photo.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row with Thick White Border */}
          <div className="pt-4 border-t-2 border-white/20 flex items-center gap-3">
            <button
              onClick={() => {
                soundFx.playShutter();
                window.open(photo.image, "_blank");
              }}
              data-cursor="EXPAND"
              className="flex-1 py-3 px-4 rounded-full bg-white hover:bg-slate-100 text-black font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-xl transition-all border-2 border-white"
            >
              <Maximize2 className="w-3.5 h-3.5 text-black" />
              VIEW FULL SIZE
            </button>
            <button
              onClick={() => {
                soundFx.playClick(1000);
              }}
              data-cursor="DOWNLOAD"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 border-2 border-white/35 text-white transition-all"
              title="Save Photo"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
