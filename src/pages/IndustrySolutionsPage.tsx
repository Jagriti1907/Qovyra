import React, { useState } from 'react';
import { INDUSTRIES_DATA } from '../data/industriesData';
import { IndustrySector } from '../types';
import {
  Building2,
  Car,
  Plane,
  Cpu,
  Microchip,
  Activity,
  Zap,
  Truck,
  Bot,
  Package,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const SECTOR_ICONS: Record<string, React.ReactNode> = {
  Car: <Car className="w-5 h-5" />,
  Plane: <Plane className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  Microchip: <Cpu className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Truck: <Truck className="w-5 h-5" />,
  Bot: <Bot className="w-5 h-5" />,
  Package: <Package className="w-5 h-5" />
};

export const IndustrySolutionsPage: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<IndustrySector>(INDUSTRIES_DATA[0]);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 p-0.5 shadow-md shadow-emerald-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight font-mono">
                Industry Quality Solutions
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Domain-specific standards, critical NDT inspection architectures, and case studies across 9 high-reliability industrial manufacturing sectors.
            </p>
          </div>
        </div>

        {/* 9 Sector Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
          {INDUSTRIES_DATA.map((sector) => {
            const isSelected = selectedSector.id === sector.id;
            return (
              <button
                key={sector.id}
                onClick={() => setSelectedSector(sector)}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 scale-105'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                <div
                  className={`p-2 rounded-xl ${
                    isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {SECTOR_ICONS[sector.icon] || <Cpu className="w-4 h-4" />}
                </div>
                <span className="text-[11px] font-bold truncate max-w-full leading-tight">
                  {sector.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Sector Deep-Dive Dossier */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-8 animate-in fade-in duration-200">
          {/* Header of Dossier */}
          <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  Sector Reference Dossier
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 leading-tight">
                {selectedSector.name}
              </h2>
              <p className="text-sm text-cyan-300 font-mono mt-1">{selectedSector.tagline}</p>
            </div>
          </div>

          {/* Grid: Challenges vs Inspection Stages */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Major Challenges */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                <span>Primary Engineering & Quality Challenges</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedSector.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Critical Inspection Stages */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Critical Metrology & Inspection Gates</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedSector.inspectionStages.map((st, i) => (
                  <li key={i} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-cyan-400 font-bold shrink-0 mt-0.5">→</span>
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Standards & Quality Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
              <h4 className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                Governing Standards & Specs
              </h4>
              <ul className="space-y-1 text-xs text-slate-300 font-mono">
                {selectedSector.standards.map((std, i) => (
                  <li key={i}>• {std}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
              <h4 className="text-[10px] font-mono uppercase text-blue-400 font-bold">
                Quality Engineering Tools Used
              </h4>
              <ul className="space-y-1 text-xs text-slate-300 font-mono">
                {selectedSector.qualityTools.map((qt, i) => (
                  <li key={i}>• {qt}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
              <h4 className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                Typical Field & Process Defects
              </h4>
              <ul className="space-y-1 text-xs text-slate-300 font-mono">
                {selectedSector.commonDefects.map((def, i) => (
                  <li key={i}>• {def}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* AI & Digital Transformation Pillar */}
          <div className="p-5 rounded-2xl bg-violet-950/20 border border-violet-500/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-violet-400">
              <Sparkles className="w-4 h-4" />
              <span>Digital Transformation & AI Integration</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedSector.digitalTransformation}
            </p>
          </div>

          {/* Industrial Case Study */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="text-xs font-mono uppercase font-bold text-cyan-400">
                Engineering Case Study: {selectedSector.caseStudy.title}
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {selectedSector.caseStudy.organization}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <strong className="text-rose-400 block font-mono text-[10px] uppercase">Challenge:</strong>
                <p className="text-slate-400 leading-relaxed">{selectedSector.caseStudy.challenge}</p>
              </div>

              <div className="space-y-1">
                <strong className="text-cyan-400 block font-mono text-[10px] uppercase">Solution Applied:</strong>
                <p className="text-slate-400 leading-relaxed">{selectedSector.caseStudy.solution}</p>
              </div>

              <div className="space-y-1">
                <strong className="text-emerald-400 block font-mono text-[10px] uppercase">Verified Results:</strong>
                <p className="text-slate-300 leading-relaxed font-semibold">{selectedSector.caseStudy.results}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
