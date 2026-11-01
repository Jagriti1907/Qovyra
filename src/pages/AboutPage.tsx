import React from 'react';
import { PageId } from '../types';
import {
  Cpu,
  Target,
  Eye,
  ShieldCheck,
  Zap,
  Globe,
  Award,
  Layers,
  ArrowRight,
  BookOpen,
  Box
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/80">
            THE QOVYRA MANIFESTO
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Redefining Quality Through Intelligence.
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            An intelligent ecosystem uniting engineering students, professional quality engineers, metrologists, and manufacturing enterprises into a single connected platform.
          </p>
        </div>

        {/* Mission & Vision Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="glass-panel rounded-3xl p-8 border border-slate-800 space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              To make Quality Engineering more <strong className="text-white">intelligent</strong>, <strong className="text-white">accessible</strong>, <strong className="text-white">practical</strong>, and <strong className="text-white">technology-driven</strong>.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              We replace outdated spreadsheets and disconnected textbooks with interactive 3D virtual manufacturing, real statistical computing tools, and domain-specialized artificial intelligence.
            </p>
          </div>

          {/* Vision Card */}
          <div className="glass-panel rounded-3xl p-8 border border-slate-800 space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-violet-950 border border-violet-800 flex items-center justify-center text-violet-400">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Our Vision</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              To build a connected ecosystem where <strong className="text-white">engineering knowledge</strong>, <strong className="text-white">industrial intelligence</strong>, and <strong className="text-white">artificial intelligence</strong> work together to redefine quality.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Envisioning a manufacturing future where zero-defect production is achieved through autonomous feedback loops, digital twins, and proactive risk engineering.
            </p>
          </div>
        </div>

        {/* The Problem We Address */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-6">
          <h2 className="text-2xl font-bold text-white">The Challenge in Modern Quality Engineering</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300 leading-relaxed">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-rose-400">The Education Gap</h3>
              <p className="text-slate-400">
                Engineering students graduate with theoretical knowledge of formulas but zero hands-on experience navigating real factory machinery, CMM metrology probes, or industrial NDT standards.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-amber-400">Fragmented Tooling</h3>
              <p className="text-slate-400">
                Practicing quality engineers juggle static spreadsheets for FMEA, clunky calculators for Cpk, and siloed ERP software that lack interoperability, audit tracking, or intelligent guidance.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-cyan-400">Reactive Quality Culture</h3>
              <p className="text-slate-400">
                Traditional plants inspect parts post-mortem. QOVYRA introduces Digital Twin telemetry and predictive AI to identify machine degradation long before scrap parts leave the spindle.
              </p>
            </div>
          </div>
        </div>

        {/* Technological Pillars */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white">Technological Pillars of QOVYRA</h2>
            <p className="text-xs text-slate-400 mt-1">
              Built on modern browser standards and high-performance engineering libraries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <Box className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Procedural 3D WebGL</h3>
              <p className="text-xs text-slate-400">
                Three.js real-time kinematic rendering with PBR studio lighting, zero-404 asset generation, and raycast inspection.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <Cpu className="w-5 h-5 text-blue-400" />
              <h3 className="text-sm font-bold text-white">Gemini GenAI Engine</h3>
              <p className="text-xs text-slate-400">
                Server-side proxy architecture querying Google Gemini with multi-level technical depth from beginner to research.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Standard Compliance</h3>
              <p className="text-xs text-slate-400">
                Rigorous grounding in ISO 9001, IATF 16949, AS9100D, ISO 17025, and AIAG-VDA harmonized FMEA guidelines.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Mathematical Rigor</h3>
              <p className="text-xs text-slate-400">
                True Shewhart constants (A2, d2, D4), Taguchi quadratic losses, and within-subgroup moving range standard deviations.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-cyan-500/30 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Experience the Ecosystem Firsthand</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Start solving real quality engineering challenges or explore our 8-zone virtual manufacturing plant.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onNavigate('factory')}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider"
            >
              Enter Virtual Factory
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-2.5 rounded-xl glass-panel text-white hover:text-cyan-300 text-xs font-semibold"
            >
              Contact Platform Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
