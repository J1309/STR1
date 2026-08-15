"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Check, Sparkles, Send, ShieldCheck } from "lucide-react";
import { soundFx } from "../../utils/sound";

interface CommissionPackage {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  duration: string;
  deliverables: string[];
  recommended?: boolean;
}

const packages: CommissionPackage[] = [
  {
    id: "editorial",
    name: "Editorial Lookbook & Monograph",
    category: "Haute Fashion & Campaign",
    basePrice: 6500,
    duration: "1 Full Production Day",
    deliverables: [
      "100MP Medium Format Hasselblad Capture",
      "Full On-Set Digital Tech & Tethered 8K Review",
      "25 Hand-Mastered Master Grade Retouched Works",
      "Worldwide Commercial Editorial Rights",
    ],
  },
  {
    id: "architectural",
    name: "Architectural & Monolith Form",
    category: "Global Structures & Interiors",
    basePrice: 9200,
    duration: "2 Production Days (Dawn / Dusk)",
    deliverables: [
      "Leica S3 + Schneider Calibrated Prime Suite",
      "Dawn & Blue-Hour Chiaroscuro Lighting Study",
      "40 Exhibition-Ready Fine Art Digital Master Negatives",
      "Signed Hahnemühle Archival Monograph Folio",
    ],
    recommended: true,
  },
  {
    id: "bespoke",
    name: "Private Fine Art Masterwork",
    category: "Bespoke Solo Commission",
    basePrice: 14000,
    duration: "3-5 Curated Expedition Days",
    deliverables: [
      "Phase One 150MP Trichromatic Medium Format Suite",
      "Custom Global Location Scouting & Lighting Crew",
      "Museum-Grade 100-Year Pigment Framed Polyptych",
      "Exclusive Sole Ownership & Copyright Assignment",
    ],
  },
];

interface AddOn {
  id: string;
  name: string;
  price: number;
}

const addOnOptions: AddOn[] = [
  { id: "darkroom-print", name: "Hahnemühle 308gsm Cotton Print Box (10x Prints)", price: 1200 },
  { id: "rush-grade", name: "48-Hour Priority Color Grade Calibration", price: 1800 },
  { id: "satellite-tether", name: "Encrypted Live Satellite Tether Feed for Global Directors", price: 2400 },
];

export default function BookingTerminal() {
  const [selectedPkg, setSelectedPkg] = useState<string>("architectural");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["darkroom-print"]);
  const [studioCity, setStudioCity] = useState<string>("Paris Atelier");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const currentPkg = packages.find((p) => p.id === selectedPkg) || packages[1];
  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = addOnOptions.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);
  const totalEstimate = currentPkg.basePrice + addonsTotal;

  const toggleAddon = (id: string) => {
    soundFx.playClick(900);
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playShutter();
    setIsSubmitted(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#2563EB", "#60A5FA", "#FFFFFF", "#94A3B8"],
    });
  };

  return (
    <section
      id="booking"
      className="relative py-28 sm:py-36 px-5 sm:px-10 md:px-16 lg:pl-32 lg:pr-16 bg-[#05070E] select-none border-t-2 border-white/30 overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-14">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-blue-400 font-semibold block mb-2">
          COMMISSION // 07
        </span>
        <h2 className="font-serif font-light text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-4">
          Commission Studio Terminal
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-light">
          Configure bespoke photographic commissions. Select atelier location, medium format capture package, and archival add-ons.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
        
        {/* Left: Package Selector */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="space-y-4">
            {packages.map((pkg) => {
              const isSelected = selectedPkg === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => {
                    soundFx.playClick(1000);
                    setSelectedPkg(pkg.id);
                  }}
                  className={`p-6 sm:p-7 rounded-3xl cursor-pointer transition-all duration-300 border-2 relative backdrop-blur-md ${
                    isSelected
                      ? "bg-[#0E172C] border-white shadow-[0_15px_35px_-5px_rgba(37,99,235,0.5)] ring-2 ring-white"
                      : "bg-[#0B0F19]/95 border-white/30 hover:border-white/70 shadow-xl"
                  }`}
                >
                  {pkg.recommended && (
                    <div className="absolute top-5 right-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-mono tracking-widest font-bold border-2 border-white/40">
                      <Sparkles className="w-3 h-3" />
                      <span>RECOMMENDED</span>
                    </div>
                  )}

                  <span className="font-mono text-[10px] uppercase tracking-wider text-blue-400 font-bold block mb-1">
                    {pkg.category}
                  </span>
                  <h3 className="font-serif text-2xl text-white mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-serif text-3xl text-white font-medium">
                      ${pkg.basePrice.toLocaleString()}
                    </span>
                    <span className="font-mono text-xs text-slate-300 font-medium">/ {pkg.duration}</span>
                  </div>

                  <ul className="space-y-2 border-t-2 border-white/15 pt-4 font-mono text-xs text-slate-200">
                    {pkg.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Add-ons Selection with Thick 2px White Border */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#0B0F19]/95 border-2 border-white/35 hover:border-white/60 shadow-xl backdrop-blur-md transition-all duration-300">
            <h3 className="font-mono text-xs uppercase tracking-widest text-white font-bold mb-4">
              ARCHIVAL & DIGITAL ADD-ONS
            </h3>
            <div className="space-y-3">
              {addOnOptions.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3.5 rounded-2xl cursor-pointer transition-all flex items-center justify-between border-2 ${
                      isChecked
                        ? "bg-blue-600/25 border-white text-white shadow-sm"
                        : "bg-white/[0.04] border-white/20 text-slate-200 hover:border-white/50"
                    }`}
                  >
                    <span className="text-xs font-light">{addon.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-blue-400">
                        +${addon.price}
                      </span>
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center text-xs border-2 ${
                          isChecked ? "bg-blue-600 text-white border-white" : "border-white/40"
                        }`}
                      >
                        {isChecked && "✓"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Booking Form & Real-time Quote Summary with Thick 2px White Borders */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-7 sm:p-8 rounded-3xl bg-[#0B0F19]/95 border-2 border-white/35 shadow-2xl backdrop-blur-md flex flex-col justify-between h-full">
            <div>
              <span className="font-mono text-xs text-blue-400 uppercase tracking-widest block mb-2 font-bold">
                CURATORIAL QUOTE SUMMARY
              </span>
              <h3 className="font-serif text-3xl text-white mb-6">Estimated Investment</h3>

              <div className="space-y-3 pb-6 border-b-2 border-white/15 font-mono text-xs">
                <div className="flex justify-between text-slate-200">
                  <span>{currentPkg.name}</span>
                  <span className="text-white font-semibold">${currentPkg.basePrice.toLocaleString()}</span>
                </div>
                {selectedAddons.map((id) => {
                  const addon = addOnOptions.find((a) => a.id === id);
                  if (!addon) return null;
                  return (
                    <div key={id} className="flex justify-between text-slate-200">
                      <span className="truncate max-w-[200px]">{addon.name}</span>
                      <span className="text-blue-400 font-bold">+${addon.price}</span>
                    </div>
                  );
                })}
              </div>

              <div className="py-5 border-b-2 border-white/15 flex items-baseline justify-between font-mono">
                <span className="text-xs uppercase text-slate-300 font-semibold">TOTAL ESTIMATE</span>
                <span className="font-serif text-4xl text-white font-bold">
                  ${totalEstimate.toLocaleString()}
                </span>
              </div>

              {/* Booking Input Form with Thick White Borders */}
              {isSubmitted ? (
                <div className="my-8 p-6 rounded-2xl bg-blue-900/30 border-2 border-white/40 text-center">
                  <Sparkles className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h4 className="font-serif text-xl text-white mb-1 font-semibold">
                    Commission Request Received
                  </h4>
                  <p className="text-slate-200 text-xs font-light">
                    Our lead curatorial director will contact you at <strong className="text-blue-400 font-bold">{email}</strong> within 12 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block font-mono text-[10px] text-slate-300 uppercase tracking-widest mb-1.5 font-semibold">
                      SELECT ATELIER LOCATION
                    </label>
                    <select
                      value={studioCity}
                      onChange={(e) => setStudioCity(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-black/60 border-2 border-white/30 text-white text-xs font-mono focus:outline-none focus:border-white font-medium"
                    >
                      <option value="Paris Atelier">Paris Atelier // 48.8566° N</option>
                      <option value="Tokyo CineRAW Lab">Tokyo CineRAW Lab // 35.6762° N</option>
                      <option value="Los Angeles Studio">Los Angeles Studio // 34.0522° N</option>
                      <option value="Milan Archival Lab">Milan Archival Lab // 45.4642° N</option>
                      <option value="Custom Global Location">Custom Global Location Scouting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-slate-300 uppercase tracking-widest mb-1.5 font-semibold">
                      COMMISSIONER NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova / Maison Saint"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-black/60 border-2 border-white/30 text-white text-xs focus:outline-none focus:border-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-slate-300 uppercase tracking-widest mb-1.5 font-semibold">
                      COMMISSIONER EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="curator@haute-gallery.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-black/60 border-2 border-white/30 text-white text-xs focus:outline-none focus:border-white font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-white hover:bg-slate-100 text-black font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-xl active:scale-98 border-2 border-white"
                  >
                    <span>SUBMIT COMMISSION PROPOSAL</span>
                    <Send className="w-3.5 h-3.5 text-black" />
                  </button>
                </form>
              )}
            </div>

            <div className="mt-6 pt-4 border-t-2 border-white/15 flex items-center gap-2 font-mono text-[10px] text-slate-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>STRICT NDA & COMMERCIAL EXCLUSIVITY GUARANTEED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
