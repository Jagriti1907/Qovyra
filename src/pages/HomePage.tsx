import React from 'react';
import { PageId } from '../types';
import { Factory3DCanvas } from '../components/3d/Factory3DCanvas';
import {
  Cpu,
  Bot,
  Box,
  Layers,
  Wrench,
  Activity,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Award,
  Zap,
  Globe,
  Gauge,
  Microscope,
  BookOpen
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden pt-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-lg shadow-cyan-500/10">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="tracking-wide">NEXT-GEN INDUSTRIAL QUALITY ECOSYSTEM</span>
          </div>

          {/* Cinematic Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Engineering Intelligence.{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 bg-clip-text text-transparent">
              Redefining Quality.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Explore the future of Quality Engineering through AI-powered learning, industrial intelligence, virtual manufacturing, and digital twin technology.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <span>Explore the Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('factory')}
              className="px-7 py-3.5 rounded-xl glass-panel text-white hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/50 font-semibold text-sm transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <Box className="w-4 h-4 text-cyan-400" />
              <span>Enter Virtual Factory</span>
            </button>
          </div>
        </div>

        {/* 2. ACTUAL REAL-TIME 3D HERO FACTORY SCENE */}
        <div className="mt-10 max-w-6xl mx-auto">
          <Factory3DCanvas height="600px" isHeroMode={true} />
        </div>
      </section>

      {/* 3. PLATFORM CAPABILITY TICKER / METRICS */}
      <section className="border-y border-slate-800/80 bg-slate-950/60 py-10 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono">12+</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono mt-1">Defect Categories</div>
              <div className="text-[11px] text-slate-500 mt-1">Casting, Welding, CNC, Composites</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-mono">8 Zones</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono mt-1">3D Virtual Factory</div>
              <div className="text-[11px] text-slate-500 mt-1">Robotic Arms, CNC, Metrology CMM</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">10 Tools</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono mt-1">Working QE Toolkit</div>
              <div className="text-[11px] text-slate-500 mt-1">FMEA, Pareto, Fishbone, SPC, Cpk</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-3xl sm:text-4xl font-extrabold text-violet-400 font-mono">9 Sectors</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono mt-1">Industry Solutions</div>
              <div className="text-[11px] text-slate-500 mt-1">Aero, Auto, Semi, Energy, MedTech</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE ARCHITECTURAL PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/80">
            INTELLIGENT ECOSYSTEM
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            Four Pillars of Next-Generation Quality
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Bridging advanced statistical quality science, shop-floor cyber-physical systems, and artificial intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: AI Quality Mentor */}
          <div
            onClick={() => onNavigate('mentor')}
            className="metallic-card rounded-2xl p-6 cursor-pointer group hover:scale-[1.02] transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-800/80 flex items-center justify-center mb-5 group-hover:border-cyan-400 transition-colors">
                <Bot className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                AI Quality Mentor
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Dynamic, domain-specialized intelligence across SPC, FMEA, DMAIC, ISO 9001, IATF 16949, and advanced numerical problem solving.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-cyan-400 font-semibold">
              <span>Ask Quality Mentor</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: 3D Virtual Factory */}
          <div
            onClick={() => onNavigate('factory')}
            className="metallic-card rounded-2xl p-6 cursor-pointer group hover:scale-[1.02] transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800/80 flex items-center justify-center mb-5 group-hover:border-blue-400 transition-colors">
                <Box className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                3D Virtual Factory
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Full-scale 8-zone manufacturing plant with animated 6-axis robots, CNC turning cells, CMM metrology probes, and exploded views.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-blue-400 font-semibold">
              <span>Inspect Factory</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Digital Twin Simulator */}
          <div
            onClick={() => onNavigate('digital-twin')}
            className="metallic-card rounded-2xl p-6 cursor-pointer group hover:scale-[1.02] transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-violet-950/80 border border-violet-800/80 flex items-center justify-center mb-5 group-hover:border-violet-400 transition-colors">
                <Activity className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                Digital Twin Simulator
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Live manufacturing telemetry simulation with real-time OEE, cycle time curves, vibration monitoring, and fault injection tests.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-violet-400 font-semibold">
              <span>Launch Twin</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Quality Engineering Toolkit */}
          <div
            onClick={() => onNavigate('toolkit')}
            className="metallic-card rounded-2xl p-6 cursor-pointer group hover:scale-[1.02] transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800/80 flex items-center justify-center mb-5 group-hover:border-emerald-400 transition-colors">
                <Wrench className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                Quality Toolkit
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Interactive real mathematical calculators for AIAG-VDA FMEA, Pareto charts, Fishbone 6M diagrams, X-bar/R SPC, and Cp/Cpk studies.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-emerald-400 font-semibold">
              <span>Open Calculators</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE FEATURE SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800">
                DEEP DOMAIN INTELLIGENCE
              </span>
              <h3 className="text-3xl font-extrabold text-white">
                The QOVYRA AI Quality Mentor
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Unlike generic language chatbots, the QOVYRA AI Quality Mentor is trained with rigorous engineering depth across 10 specialized quality disciplines—from Shewhart statistical derivations and Taguchi Loss equations to IATF 16949 audit compliance and aerospace FAI standards.
              </p>

              <div className="space-y-2.5 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Supports 4 Technical Depth Levels (Beginner to Expert Research)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Solves GATE & Competitive Engineering SPC Numericals Step-by-Step</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Generates Structured 8D Root Cause and AIAG-VDA FMEA Recommendations</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('mentor')}
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <Bot className="w-4 h-4" />
                  <span>Start Conversation with Mentor</span>
                </button>
              </div>
            </div>

            {/* Visual Callout Card */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>SAMPLE SOLVED NUMERICAL</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">GATE Production 2024</span>
              </div>

              <div className="text-xs text-slate-300 font-mono space-y-2">
                <p className="text-slate-200 font-semibold">
                  Problem: Nominal = 25.00mm, USL = 25.12mm, LSL = 24.88mm. Mean = 25.04mm, σ = 0.025mm. Calculate Cpk and determine capability status.
                </p>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-cyan-300 space-y-1">
                  <div>CPU = (25.12 - 25.04) / (3 × 0.025) = 0.08 / 0.075 = 1.067</div>
                  <div>CPL = (25.04 - 24.88) / (3 × 0.025) = 0.16 / 0.075 = 2.133</div>
                  <div className="text-white font-bold">Cpk = min(CPU, CPL) = 1.07 (Off-Center)</div>
                  <div className="text-emerald-400 font-semibold">→ Recommendation: Recenter process mean to 25.00mm to unlock potential Cp = 1.60.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-cyan-500/20 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Redefine Your Quality Operations?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Experience role-based workspaces tailored for engineering students, quality assurance engineers, and manufacturing executives.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
            >
              Open Role-Based Dashboard
            </button>
            <button
              onClick={() => onNavigate('learning')}
              className="px-6 py-3 rounded-xl glass-panel text-white hover:text-cyan-300 font-semibold text-xs transition-all"
            >
              Browse Learning Hub
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
