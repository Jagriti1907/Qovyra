import React from 'react';
import { PageId } from '../../types';
import {
  Cpu,
  Mail,
  ShieldCheck,
  Globe,
  Terminal,
  Activity,
  ArrowUpRight,
  BookOpen,
  Award
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-300 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNav('home')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-md shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold text-white font-mono tracking-wider">QOVYRA</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              <strong className="text-slate-200">Redefining Quality Through Intelligence.</strong> An integrated industrial ecosystem connecting engineering students, professional quality engineers, researchers, and global manufacturing organizations.
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Direct Contact:</span>
                <a
                  href="mailto:singhjagriti200328@gmail.com"
                  className="text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
                >
                  singhjagriti200328@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Architecture: Full-Stack React + Three.js + Gemini AI Engine</span>
              </div>
            </div>
          </div>

          {/* Platform Pillars */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('factory')} className="hover:text-cyan-300 transition-colors text-left flex items-center gap-1">
                  <span>3D Virtual Factory</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('defects')} className="hover:text-cyan-300 transition-colors text-left flex items-center gap-1">
                  <span>Defect Intelligence</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('toolkit')} className="hover:text-cyan-300 transition-colors text-left flex items-center gap-1">
                  <span>Quality Toolkit (FMEA, SPC, Cpk)</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('digital-twin')} className="hover:text-cyan-300 transition-colors text-left flex items-center gap-1">
                  <span>Digital Twin Simulator</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </button>
              </li>
            </ul>
          </div>

          {/* Intelligence & Education */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Intelligence & Edu
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('mentor')} className="hover:text-cyan-300 transition-colors text-left flex items-center gap-1">
                  <span>QOVYRA AI Quality Mentor</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('learning')} className="hover:text-cyan-300 transition-colors text-left flex items-center gap-1">
                  <span>Learning Hub & Formulas</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('challenges')} className="hover:text-cyan-300 transition-colors text-left flex items-center gap-1">
                  <span>Daily Challenge Arena</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-cyan-300 transition-colors text-left flex items-center gap-1">
                  <span>Industry Solutions (9 Sectors)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Organization & Dashboards */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('dashboard')} className="hover:text-cyan-300 transition-colors text-left">
                  <span>Student & Engineer Dashboard</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-cyan-300 transition-colors text-left">
                  <span>About QOVYRA</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-cyan-300 transition-colors text-left">
                  <span>Contact & Support</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} QOVYRA Engineering Systems. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Industrial Node Active
            </span>
            <span>v2.4.0-Production</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
