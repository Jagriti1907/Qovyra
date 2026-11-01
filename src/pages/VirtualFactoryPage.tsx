import React, { useState } from 'react';
import { Factory3DCanvas } from '../components/3d/Factory3DCanvas';
import { FACTORY_ZONES, FACTORY_MACHINES } from '../data/factoryData';
import { MachineData } from '../types';
import {
  Box,
  Layers,
  Activity,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  ArrowRight,
  Maximize2,
  Gauge,
  Cpu,
  Clock,
  Sparkles
} from 'lucide-react';

export const VirtualFactoryPage: React.FC = () => {
  const [selectedMachine, setSelectedMachine] = useState<MachineData | null>(null);
  const [activeZoneId, setActiveZoneId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Operational' | 'Warning'>('All');

  // Filtered machines list
  const filteredMachines = FACTORY_MACHINES.filter((m) => {
    const matchesZone = activeZoneId === 'all' || m.zone.toLowerCase().includes(activeZoneId.toLowerCase());
    const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.function.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesZone && matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-md shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Box className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight font-mono">
                3D Virtual Manufacturing Plant
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Real-time navigable cyber-physical factory environment across 8 discrete manufacturing zones. Inspect machine kinematics, operating parameters, and live inspection tolerances.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="glass-panel px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>11 Operational</span>
              </div>
              <div className="w-px h-4 bg-slate-800" />
              <div className="flex items-center gap-1.5 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>1 Warning</span>
              </div>
              <div className="w-px h-4 bg-slate-800" />
              <div className="text-slate-400">
                OEE Avg: <strong className="text-cyan-300">98.3%</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 1. PRIMARY 3D VIRTUAL FACTORY VIEWPORT */}
        <div className="relative">
          <Factory3DCanvas
            height="700px"
            isHeroMode={false}
            selectedZoneId={activeZoneId}
            onSelectMachine={(mach) => setSelectedMachine(mach)}
            initialSelectedMachineId={selectedMachine?.id}
          />
        </div>

        {/* 2. ZONE JUMP SELECTOR BAR */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase tracking-wider">
            <span>Explore Factory Zones (8 Discrete Bays):</span>
            <span>Click any zone to jump camera</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            <button
              onClick={() => setActiveZoneId('all')}
              className={`p-3 rounded-2xl border text-left transition-all btn-futuristic ${
                activeZoneId === 'all'
                  ? 'glow-active-cyan font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white'
              }`}
            >
              <div className="text-[10px] font-mono text-cyan-400">BAY ALL</div>
              <div className="text-xs font-bold truncate mt-0.5">Whole Facility</div>
            </button>

            {FACTORY_ZONES.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setActiveZoneId(zone.name)}
                className={`p-3 rounded-2xl border text-left transition-all btn-futuristic ${
                  activeZoneId === zone.name
                    ? 'glow-active-cyan font-bold shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white'
                }`}
              >
                <div className="text-[10px] font-mono text-cyan-400">ZONE 0{zone.number}</div>
                <div className="text-xs font-bold truncate mt-0.5">{zone.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 3. MACHINE FLEET TELEMETRY & SPECIFICATIONS TABLE */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <span>Connected Factory Machine Fleet</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Real-time operational parameters, calibration schedules, and metrology standards.
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter machines, codes..."
                  className="pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                {(['All', 'Operational', 'Warning'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                      statusFilter === st
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Machine Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMachines.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelectedMachine(m)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  selectedMachine?.id === m.id
                    ? 'bg-cyan-950/40 border-cyan-400 shadow-xl shadow-cyan-500/10'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                      {m.code}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-2 leading-snug">{m.name}</h4>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">{m.zone}</div>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      m.status === 'Operational'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        m.status === 'Operational' ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}
                    />
                    {m.status}
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">{m.function}</p>

                {m.qualityAlert && (
                  <div className="mt-2.5 p-2 rounded-lg bg-amber-950/40 border border-amber-700/50 text-[11px] text-amber-200 flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{m.qualityAlert}</span>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-center font-mono">
                  <div className="p-1.5 rounded-lg bg-slate-950/80">
                    <div className="text-[9px] text-slate-500 uppercase">Efficiency</div>
                    <div className="text-xs font-bold text-cyan-400 mt-0.5">{m.efficiency}%</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-950/80">
                    <div className="text-[9px] text-slate-500 uppercase">Output</div>
                    <div className="text-xs font-bold text-white mt-0.5">{m.productionCount}</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-950/80">
                    <div className="text-[9px] text-slate-500 uppercase">Defects</div>
                    <div
                      className={`text-xs font-bold mt-0.5 ${
                        m.defectCount > 10 ? 'text-amber-400' : 'text-slate-300'
                      }`}
                    >
                      {m.defectCount}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>Cycle: {m.cycleTimeSec}s</span>
                  <span>Cal: {m.lastCalibrated}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
