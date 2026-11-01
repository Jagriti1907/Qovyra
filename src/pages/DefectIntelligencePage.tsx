import React, { useState, useEffect } from 'react';
import { DEFECTS_DATA } from '../data/defectsData';
import { DefectItem } from '../types';
import {
  Layers,
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  Split,
  X,
  FileCheck,
  CheckCircle2,
  Sliders,
  ExternalLink
} from 'lucide-react';

export const DefectIntelligencePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [activeDefectModal, setActiveDefectModal] = useState<DefectItem | null>(null);

  // Favorites in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('qovyra_favorite_defects');
    return saved ? JSON.parse(saved) : ['cast-01', 'weld-01', 'am-01'];
  });

  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Comparison Tool State
  const [comparisonMode, setComparisonMode] = useState(false);
  const [compareDefectA, setCompareDefectA] = useState<DefectItem | null>(DEFECTS_DATA[0]);
  const [compareDefectB, setCompareDefectB] = useState<DefectItem | null>(DEFECTS_DATA[3]);

  useEffect(() => {
    localStorage.setItem('qovyra_favorite_defects', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = ['All', ...Array.from(new Set(DEFECTS_DATA.map((d) => d.category)))];

  const filteredDefects = DEFECTS_DATA.filter((defect) => {
    const matchesCategory = selectedCategory === 'All' || defect.category === selectedCategory;
    const matchesSeverity = selectedSeverity === 'All' || defect.severity === selectedSeverity;
    const matchesFav = !onlyFavorites || favorites.includes(defect.id);
    const matchesSearch =
      defect.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      defect.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      defect.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      defect.commonCauses.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSeverity && matchesFav && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 p-0.5 shadow-md shadow-amber-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Layers className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight font-mono">
                Defect Intelligence Library
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Exhaustive metallurgical and manufacturing failure taxonomy across 12 disciplines. NDT detection protocols, root cause prevention, and industrial standard tolerances.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setComparisonMode(!comparisonMode)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                comparisonMode
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                  : 'glass-panel text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <Split className="w-4 h-4" />
              <span>{comparisonMode ? 'Close Comparison' : 'Side-by-Side Comparison'}</span>
            </button>
          </div>
        </div>

        {/* COMPARISON TOOL (IF ACTIVE) */}
        {comparisonMode && (
          <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-cyan-500/40 shadow-2xl space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Split className="w-4 h-4 text-cyan-400" />
                  <span>Defect Cross-Comparison Matrix</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Select any two failure modes to compare root causes, NDT detection sensitivity, and prevention strategies.
                </p>
              </div>
              <button
                onClick={() => setComparisonMode(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selectors for Defect A and Defect B */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Defect A Selector */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase text-cyan-400 font-semibold">
                  Defect Profile A:
                </label>
                <select
                  value={compareDefectA?.id || ''}
                  onChange={(e) => {
                    const match = DEFECTS_DATA.find((d) => d.id === e.target.value);
                    if (match) setCompareDefectA(match);
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  {DEFECTS_DATA.map((d) => (
                    <option key={d.id} value={d.id}>
                      [{d.category}] {d.name}
                    </option>
                  ))}
                </select>

                {compareDefectA && (
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400">{compareDefectA.category}</span>
                      <h4 className="text-sm font-bold text-white">{compareDefectA.name}</h4>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{compareDefectA.description}</p>
                    <div>
                      <strong className="text-slate-200 block mb-1">Common Causes:</strong>
                      <ul className="list-disc list-inside text-slate-400 space-y-1">
                        {compareDefectA.commonCauses.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <strong className="text-slate-200 block mb-1">Detection Methods:</strong>
                      <ul className="list-disc list-inside text-slate-400 space-y-1">
                        {compareDefectA.detectionMethods.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2 border-t border-slate-800 font-mono text-[11px] text-slate-400">
                      Standard: <span className="text-cyan-300">{compareDefectA.standardReference}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Defect B Selector */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase text-violet-400 font-semibold">
                  Defect Profile B:
                </label>
                <select
                  value={compareDefectB?.id || ''}
                  onChange={(e) => {
                    const match = DEFECTS_DATA.find((d) => d.id === e.target.value);
                    if (match) setCompareDefectB(match);
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-violet-500"
                >
                  {DEFECTS_DATA.map((d) => (
                    <option key={d.id} value={d.id}>
                      [{d.category}] {d.name}
                    </option>
                  ))}
                </select>

                {compareDefectB && (
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs">
                    <div>
                      <span className="text-[10px] font-mono text-violet-400">{compareDefectB.category}</span>
                      <h4 className="text-sm font-bold text-white">{compareDefectB.name}</h4>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{compareDefectB.description}</p>
                    <div>
                      <strong className="text-slate-200 block mb-1">Common Causes:</strong>
                      <ul className="list-disc list-inside text-slate-400 space-y-1">
                        {compareDefectB.commonCauses.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <strong className="text-slate-200 block mb-1">Detection Methods:</strong>
                      <ul className="list-disc list-inside text-slate-400 space-y-1">
                        {compareDefectB.detectionMethods.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2 border-t border-slate-800 font-mono text-[11px] text-slate-400">
                      Standard: <span className="text-violet-300">{compareDefectB.standardReference}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by defect name, causes, detection NDT, standard..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setOnlyFavorites(!onlyFavorites)}
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  onlyFavorites
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Favorites ({favorites.length})</span>
              </button>

              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none"
              >
                <option value="All">All Severities</option>
                <option value="Critical">Critical</option>
                <option value="Major">Major</option>
                <option value="Minor">Minor</option>
              </select>
            </div>
          </div>

          {/* Category Pill Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Defect Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDefects.map((defect) => (
            <div
              key={defect.id}
              onClick={() => setActiveDefectModal(defect)}
              className="metallic-card rounded-2xl p-6 cursor-pointer group hover:border-cyan-500/50 hover:scale-[1.01] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                    {defect.category}
                  </span>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        defect.severity === 'Critical'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : defect.severity === 'Major'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {defect.severity}
                    </span>

                    <button
                      onClick={(e) => toggleFavorite(defect.id, e)}
                      title="Bookmark Defect"
                      className="text-slate-500 hover:text-amber-400 transition-colors"
                    >
                      {favorites.includes(defect.id) ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mt-3 group-hover:text-cyan-300 transition-colors">
                  {defect.name}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-3">
                  {defect.description}
                </p>

                {/* Primary Cause Preview */}
                <div className="mt-4 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-[11px] text-slate-300">
                  <span className="font-semibold text-slate-200 block text-[10px] uppercase font-mono text-cyan-400 mb-0.5">
                    Primary Root Cause:
                  </span>
                  <div className="truncate text-slate-400">{defect.commonCauses[0]}</div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-500 font-mono truncate max-w-[180px]">
                  {defect.standardReference}
                </span>
                <span className="text-cyan-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Inspect Defect</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredDefects.length === 0 && (
          <div className="p-12 text-center rounded-3xl glass-panel border border-slate-800 text-slate-400">
            <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-white">No Defects Found</h4>
            <p className="text-xs text-slate-400 mt-1">
              No matching records for &quot;{searchQuery}&quot; under the selected filters.
            </p>
          </div>
        )}

        {/* DETAILED DEFECT MODAL */}
        {activeDefectModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel-glow rounded-3xl p-6 sm:p-8 border border-cyan-500/40 shadow-2xl space-y-6">
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                      {activeDefectModal.category}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        activeDefectModal.severity === 'Critical'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}
                    >
                      {activeDefectModal.severity} Severity
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-2">{activeDefectModal.name}</h3>
                </div>

                <button
                  onClick={() => setActiveDefectModal(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                <div>
                  <h4 className="font-semibold text-white text-sm mb-1">Description</h4>
                  <p className="text-slate-400">{activeDefectModal.description}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <h4 className="font-semibold text-cyan-300 font-mono uppercase text-[11px]">
                    Engineering Root Causes
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {activeDefectModal.commonCauses.map((cause, idx) => (
                      <li key={idx}>{cause}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <h4 className="font-semibold text-blue-300 font-mono uppercase text-[11px]">
                    Detection & Metrology NDT Methods
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {activeDefectModal.detectionMethods.map((dm, idx) => (
                      <li key={idx}>{dm}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <h4 className="font-semibold text-emerald-300 font-mono uppercase text-[10px]">
                      Prevention Controls
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-400">
                      {activeDefectModal.preventionMethods.map((pm, idx) => (
                        <li key={idx}>{pm}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <h4 className="font-semibold text-amber-300 font-mono uppercase text-[10px]">
                      Corrective Actions
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-400">
                      {activeDefectModal.correctiveActions.map((ca, idx) => (
                        <li key={idx}>{ca}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <h4 className="font-semibold text-white">Industrial Case Example</h4>
                  <p className="text-slate-400 italic">{activeDefectModal.industrialExamples}</p>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-slate-800">
                  <span>Standard: {activeDefectModal.standardReference}</span>
                  <button
                    onClick={() => setActiveDefectModal(null)}
                    className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold"
                  >
                    Close Inspection
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
