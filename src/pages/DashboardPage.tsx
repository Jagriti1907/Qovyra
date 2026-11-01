import React, { useState } from 'react';
import { PageId } from '../types';
import {
  LayoutDashboard,
  GraduationCap,
  Briefcase,
  Building2,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Gauge,
  Sliders,
  Cpu,
  Bookmark
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (page: PageId) => void;
}

type UserRole = 'student' | 'engineer' | 'executive';

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [role, setRole] = useState<UserRole>('engineer');

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 p-0.5 shadow-md shadow-violet-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-violet-400" />
                </div>
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight font-mono">
                Role-Based Quality Operations Dashboard
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Switch roles to experience customized workspaces for engineering students, professional quality engineers, and plant leadership.
            </p>
          </div>

          {/* Role Switcher Pills */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setRole('student')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all ${
                role === 'student'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student</span>
            </button>

            <button
              onClick={() => setRole('engineer')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all ${
                role === 'engineer'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Quality Engineer</span>
            </button>

            <button
              onClick={() => setRole('executive')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all ${
                role === 'executive'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Plant Leadership</span>
            </button>
          </div>
        </div>

        {/* DEMO ENVIRONMENT WATERMARK (Requirement 13) */}
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-center justify-between font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Active Session: Demonstration Sandbox Environment • Preloaded with realistic industrial state</span>
          </div>
          <span className="text-[10px] text-slate-500">SSO & Multi-Tenant RBAC Ready</span>
        </div>

        {/* ============================================================= */}
        {/* VIEW 1: ENGINEERING STUDENT DASHBOARD */}
        {/* ============================================================= */}
        {role === 'student' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
                <div className="text-[10px] text-slate-400 uppercase">Curriculum Progress</div>
                <div className="text-2xl font-bold text-cyan-400 mt-1">68%</div>
                <div className="text-[10px] text-slate-500 mt-1">4 of 6 Modules Finished</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
                <div className="text-[10px] text-slate-400 uppercase">Average Quiz Score</div>
                <div className="text-2xl font-bold text-emerald-400 mt-1">92.4%</div>
                <div className="text-[10px] text-slate-500 mt-1">GATE Practice Sets</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
                <div className="text-[10px] text-slate-400 uppercase">Daily Challenge Streak</div>
                <div className="text-2xl font-bold text-amber-400 mt-1">7 Days 🔥</div>
                <div className="text-[10px] text-slate-500 mt-1">620 Points Earned</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
                <div className="text-[10px] text-slate-400 uppercase">Formulas Bookmarked</div>
                <div className="text-2xl font-bold text-violet-400 mt-1">8 Cards</div>
                <div className="text-[10px] text-slate-500 mt-1">Cp, Cpk, Weibull, OEE</div>
              </div>
            </div>

            {/* Student Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Learning Modules In-Progress */}
              <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center justify-between">
                  <span>Enrolled Quality Engineering Modules</span>
                  <button onClick={() => onNavigate('learning')} className="text-xs text-cyan-400 hover:underline">
                    View All →
                  </button>
                </h3>

                <div className="space-y-3">
                  {[
                    { title: 'Statistical Process Control (SPC) & Control Charts', progress: 100, status: 'Completed' },
                    { title: 'Process Capability Analysis: Cp, Cpk, Pp, Ppk', progress: 85, status: 'In Progress' },
                    { title: 'Failure Mode and Effects Analysis (FMEA & FMECA)', progress: 40, status: 'In Progress' },
                    { title: 'Quality Gurus: Deming, Juran, Taguchi & Ishikawa', progress: 100, status: 'Completed' }
                  ].map((m, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold text-white">
                        <span>{m.title}</span>
                        <span className="font-mono text-cyan-400">{m.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-cyan-500 h-full rounded-full transition-all"
                          style={{ width: `${m.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Jump to Tools & Mentor */}
              <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white">Recommended Study Activities</h3>
                <div className="space-y-2.5">
                  <button
                    onClick={() => onNavigate('challenges')}
                    className="w-full p-3.5 rounded-xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-left transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">Daily Numerical SPC Challenge</div>
                      <div className="text-[11px] text-slate-400">Calculate Upper Control Limit from R-bar sample</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-cyan-400" />
                  </button>

                  <button
                    onClick={() => onNavigate('mentor')}
                    className="w-full p-3.5 rounded-xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-left transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">Consult QOVYRA AI Quality Mentor</div>
                      <div className="text-[11px] text-slate-400">Ask any numerical or conceptual quality question</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-cyan-400" />
                  </button>

                  <button
                    onClick={() => onNavigate('toolkit')}
                    className="w-full p-3.5 rounded-xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-left transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">Practice in Capability Calculator</div>
                      <div className="text-[11px] text-slate-400">Test Cp/Cpk centering formulas with custom data</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-cyan-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* VIEW 2: PROFESSIONAL QUALITY ENGINEER DASHBOARD */}
        {/* ============================================================= */}
        {role === 'engineer' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
                <div className="text-[10px] text-slate-400 uppercase">Active FMEA Studies</div>
                <div className="text-2xl font-bold text-cyan-400 mt-1">4 Active</div>
                <div className="text-[10px] text-slate-500 mt-1">AIAG-VDA Harmonized</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
                <div className="text-[10px] text-slate-400 uppercase">Open CAPAs</div>
                <div className="text-2xl font-bold text-amber-400 mt-1">2 Pending</div>
                <div className="text-[10px] text-slate-500 mt-1">1 Verified, 1 In-Progress</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
                <div className="text-[10px] text-slate-400 uppercase">Avg Process Cpk</div>
                <div className="text-2xl font-bold text-emerald-400 mt-1">1.64</div>
                <div className="text-[10px] text-slate-500 mt-1">Target ≥ 1.33</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
                <div className="text-[10px] text-slate-400 uppercase">Supplier PPAP Status</div>
                <div className="text-2xl font-bold text-violet-400 mt-1">98.2%</div>
                <div className="text-[10px] text-slate-500 mt-1">Level 3 Approvals</div>
              </div>
            </div>

            {/* Engineer Workspace Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active FMEA & Risk Priority */}
              <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">Active FMEA Risk Registry</h3>
                  <button onClick={() => onNavigate('toolkit')} className="text-xs text-cyan-400 hover:underline">
                    Open FMEA Tool →
                  </button>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between">
                    <div>
                      <div className="font-bold text-white">Resistance Spot Welding Expulsion</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">S=9, O=5, D=4 • RPN: 180</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-mono text-[10px] font-bold border border-rose-800">
                      AP: HIGH
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between">
                    <div>
                      <div className="font-bold text-white">5-Axis Spindle Chatter Harmonics</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">S=8, O=4, D=3 • RPN: 96</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-mono text-[10px] font-bold border border-amber-800">
                      AP: MEDIUM
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between">
                    <div>
                      <div className="font-bold text-white">Catheter Tube Wall Thickness Drift</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">S=6, O=3, D=2 • RPN: 36</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-800">
                      AP: LOW
                    </span>
                  </div>
                </div>
              </div>

              {/* Active Corrective Actions (CAPA) */}
              <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">Active Corrective Actions (CAPA)</h3>
                  <button onClick={() => onNavigate('toolkit')} className="text-xs text-cyan-400 hover:underline">
                    Manage CAPAs →
                  </button>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-cyan-400 font-bold">CAPA-2026-08</span>
                      <span className="text-[10px] text-amber-400 font-mono">In Progress</span>
                    </div>
                    <div className="font-semibold text-white">Quench Cracking in AISI 4340 Gears</div>
                    <div className="text-[11px] text-slate-400">Owner: Carlos Mendez • Due: 2026-11-15</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-cyan-400 font-bold">CAPA-2026-09</span>
                      <span className="text-[10px] text-emerald-400 font-mono">Verified</span>
                    </div>
                    <div className="font-semibold text-white">Solder Paste Bridging on 0.4mm QFN</div>
                    <div className="text-[11px] text-slate-400">Owner: Elena Rostova • Due: 2026-11-05</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* VIEW 3: MANUFACTURING COMPANY / PLANT LEADERSHIP DASHBOARD */}
        {/* ============================================================= */}
        {role === 'executive' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Executive KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
                <div className="text-[10px] text-slate-400 uppercase">Plant-Wide OEE</div>
                <div className="text-2xl font-bold text-cyan-400 mt-1">94.8%</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">+1.8% vs last month</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
                <div className="text-[10px] text-slate-400 uppercase">Scrap & Rework Cost</div>
                <div className="text-2xl font-bold text-emerald-400 mt-1">$14,200</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">-34% reduction via Twin</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
                <div className="text-[10px] text-slate-400 uppercase">First-Pass Yield (FPY)</div>
                <div className="text-2xl font-bold text-white mt-1">99.2%</div>
                <div className="text-[10px] text-slate-500 mt-1">Across 8 bays</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
                <div className="text-[10px] text-slate-400 uppercase">External Warranty PPM</div>
                <div className="text-2xl font-bold text-cyan-300 mt-1">8.5 PPM</div>
                <div className="text-[10px] text-slate-500 mt-1">World-class benchmark</div>
              </div>
            </div>

            {/* Plant Fleet & Digital Twin Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">Machine Fleet Readiness</h3>
                  <button onClick={() => onNavigate('factory')} className="text-xs text-cyan-400 hover:underline">
                    Enter 3D Factory →
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-slate-500 text-[10px]">ZONE 1 (Raw Inspec)</div>
                    <div className="font-bold text-emerald-400 mt-1">99.4% Eff</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-slate-500 text-[10px]">ZONE 2 (CNC Milling)</div>
                    <div className="font-bold text-cyan-400 mt-1">97.6% Eff</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-slate-500 text-[10px]">ZONE 3 (Laser Weld)</div>
                    <div className="font-bold text-amber-400 mt-1">94.1% (Optics)</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-slate-500 text-[10px]">ZONE 6 (CMM Lab)</div>
                    <div className="font-bold text-emerald-400 mt-1">99.9% Eff</div>
                  </div>
                </div>
              </div>

              <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white">Digital Twin Actions</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Run predictive simulations, inspect machine degradation, and test emergency fault scenarios.
                </p>
                <button
                  onClick={() => onNavigate('digital-twin')}
                  className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Launch Digital Twin Cockpit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
