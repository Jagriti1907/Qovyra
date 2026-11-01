import React, { useState } from 'react';
import { FMEARow, FishboneData, CAPAItem } from '../types';
import {
  Wrench,
  Calculator,
  BarChart3,
  GitBranch,
  HelpCircle,
  TrendingUp,
  Gauge,
  FileCheck2,
  CheckCircle,
  AlertCircle,
  Download,
  Plus,
  Trash2,
  RefreshCw,
  Sliders,
  FileSpreadsheet
} from 'lucide-react';

export const ToolkitPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'fmea' | 'pareto' | 'fishbone' | 'fivewhy' | 'spc' | 'cpk' | 'eightd' | 'capa' | 'sixsigma'
  >('cpk');

  // -------------------------------------------------------------
  // 1. PROCESS CAPABILITY (Cp, Cpk, Pp, Ppk) STATE & MATH
  // -------------------------------------------------------------
  const [cpkUSL, setCpkUSL] = useState<number>(50.15);
  const [cpkLSL, setCpkLSL] = useState<number>(49.85);
  const [cpkTarget, setCpkTarget] = useState<number>(50.0);
  const [cpkDataInput, setCpkDataInput] = useState<string>(
    '50.04, 50.02, 50.06, 49.98, 50.05, 50.03, 50.07, 50.01, 50.04, 50.02, 50.05, 49.99, 50.03, 50.06, 50.02, 50.04, 50.05, 50.01, 50.03, 50.05'
  );

  // Calculations for Cp / Cpk
  const parseNumbers = (input: string) => {
    return input
      .split(/[\s,]+/)
      .map((v) => parseFloat(v))
      .filter((v) => !isNaN(v));
  };

  const cpkValues = parseNumbers(cpkDataInput);
  const n = cpkValues.length;
  const mean = n > 0 ? cpkValues.reduce((a, b) => a + b, 0) / n : 0;
  const sampleVariance =
    n > 1 ? cpkValues.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (n - 1) : 0;
  const sampleStdDev = Math.sqrt(sampleVariance);

  // Within-subgroup estimated std dev using moving range average d2 = 1.128 for n=2
  let movingRangeSum = 0;
  for (let i = 1; i < n; i++) {
    movingRangeSum += Math.abs(cpkValues[i] - cpkValues[i - 1]);
  }
  const avgMovingRange = n > 1 ? movingRangeSum / (n - 1) : 0;
  const withinStdDev = avgMovingRange > 0 ? avgMovingRange / 1.128 : sampleStdDev;

  const cp = withinStdDev > 0 ? (cpkUSL - cpkLSL) / (6 * withinStdDev) : 0;
  const cpu = withinStdDev > 0 ? (cpkUSL - mean) / (3 * withinStdDev) : 0;
  const cpl = withinStdDev > 0 ? (mean - cpkLSL) / (3 * withinStdDev) : 0;
  const cpk = Math.min(cpu, cpl);

  const pp = sampleStdDev > 0 ? (cpkUSL - cpkLSL) / (6 * sampleStdDev) : 0;
  const ppu = sampleStdDev > 0 ? (cpkUSL - mean) / (3 * sampleStdDev) : 0;
  const ppl = sampleStdDev > 0 ? (mean - cpkLSL) / (3 * sampleStdDev) : 0;
  const ppk = Math.min(ppu, ppl);

  // -------------------------------------------------------------
  // 2. FMEA (AIAG-VDA HARMONIZED) STATE
  // -------------------------------------------------------------
  const [fmeaRows, setFmeaRows] = useState<FMEARow[]>([
    {
      id: 'fmea-1',
      processStep: 'CNC Spindle Milling',
      failureMode: 'Excessive Tool Chatter & Scalloping',
      effect: 'Surface roughness exceeds Ra 0.8μm; rejection at FAI',
      severity: 8,
      cause: 'Tool stick-out L/D ratio > 4:1 causing regenerative resonance',
      occurrence: 4,
      currentControls: 'Vibration accelerometer sensor on spindle',
      detection: 3,
      rpn: 96,
      actionPriority: 'Medium',
      recommendedAction: 'Switch to shrink-fit anti-vibration damped tool holder and restrict L/D ≤ 3:1',
      responsible: 'Chief Tooling Engineer'
    },
    {
      id: 'fmea-2',
      processStep: 'Resistance Spot Welding',
      failureMode: 'Weld Expulsion & Undersized Nugget',
      effect: 'Reduced crash shear strength; structural joint failure',
      severity: 9,
      cause: 'Electrode tip mushrooming and squeeze pressure loss',
      occurrence: 5,
      currentControls: 'Destructive chisel peel test every 200 welds',
      detection: 4,
      rpn: 180,
      actionPriority: 'High',
      recommendedAction: 'Install automated pneumatic electrode tip dresser every 150 welds with current stepper',
      responsible: 'Robotics Weld Specialist'
    }
  ]);

  const [newFmea, setNewFmea] = useState<Partial<FMEARow>>({
    processStep: '',
    failureMode: '',
    effect: '',
    severity: 7,
    cause: '',
    occurrence: 3,
    currentControls: '',
    detection: 3,
    recommendedAction: '',
    responsible: ''
  });

  const calculateActionPriority = (s: number, o: number, d: number): 'High' | 'Medium' | 'Low' => {
    // AIAG-VDA logic: Severity 9-10 with moderate occurrence is always High
    if (s >= 9 && o >= 3) return 'High';
    if (s >= 7 && o >= 4 && d >= 4) return 'High';
    if (s >= 7 || (o >= 5 && d >= 4)) return 'Medium';
    return 'Low';
  };

  const handleAddFmea = () => {
    if (!newFmea.processStep || !newFmea.failureMode) return;
    const s = Number(newFmea.severity) || 5;
    const o = Number(newFmea.occurrence) || 3;
    const d = Number(newFmea.detection) || 3;
    const rpn = s * o * d;
    const ap = calculateActionPriority(s, o, d);

    const row: FMEARow = {
      id: `fmea-${Date.now()}`,
      processStep: newFmea.processStep,
      failureMode: newFmea.failureMode,
      effect: newFmea.effect || '',
      severity: s,
      cause: newFmea.cause || '',
      occurrence: o,
      currentControls: newFmea.currentControls || '',
      detection: d,
      rpn,
      actionPriority: ap,
      recommendedAction: newFmea.recommendedAction || '',
      responsible: newFmea.responsible || 'QE Lead'
    };
    setFmeaRows([...fmeaRows, row]);
    setNewFmea({
      processStep: '',
      failureMode: '',
      effect: '',
      severity: 7,
      cause: '',
      occurrence: 3,
      currentControls: '',
      detection: 3,
      recommendedAction: '',
      responsible: ''
    });
  };

  // -------------------------------------------------------------
  // 3. PARETO ANALYSIS STATE & MATH
  // -------------------------------------------------------------
  const [paretoItems, setParetoItems] = useState<{ id: string; defect: string; count: number }[]>([
    { id: 'p1', defect: 'Surface Scratches & Dents', count: 142 },
    { id: 'p2', defect: 'Dimensional Out-of-Tolerance', count: 86 },
    { id: 'p3', defect: 'Weld Porosity / Cold Lap', count: 48 },
    { id: 'p4', defect: 'Thread Misalignment / Burr', count: 24 },
    { id: 'p5', defect: 'Paint Orange Peel / Runs', count: 16 },
    { id: 'p6', defect: 'Missing Fastener / Washer', count: 8 }
  ]);

  const [newParetoName, setNewParetoName] = useState('');
  const [newParetoCount, setNewParetoCount] = useState<number>(10);

  const totalParetoCount = paretoItems.reduce((acc, item) => acc + item.count, 0);
  const sortedPareto = [...paretoItems].sort((a, b) => b.count - a.count);

  let cumulativeCount = 0;
  const paretoCalculated = sortedPareto.map((item) => {
    cumulativeCount += item.count;
    const pct = totalParetoCount > 0 ? (item.count / totalParetoCount) * 100 : 0;
    const cumPct = totalParetoCount > 0 ? (cumulativeCount / totalParetoCount) * 100 : 0;
    return { ...item, pct, cumPct };
  });

  const handleAddParetoItem = () => {
    if (!newParetoName.trim() || newParetoCount <= 0) return;
    setParetoItems([
      ...paretoItems,
      { id: `p-${Date.now()}`, defect: newParetoName.trim(), count: Number(newParetoCount) }
    ]);
    setNewParetoName('');
    setNewParetoCount(10);
  };

  // -------------------------------------------------------------
  // 4. FISHBONE (ISHIKAWA) 6M DIAGRAM
  // -------------------------------------------------------------
  const [fishbone, setFishbone] = useState<FishboneData>({
    problem: 'Excessive Cylinder Head Coolant Leakage during Hydrostatic Proof Testing',
    man: ['Operator fatigue on shift 3', 'Inadequate torque angle training'],
    machine: ['Spindle hydraulic pressure fluctuation', 'Worn CNC fixture clamping clamp pads'],
    material: ['Raw aluminum alloy high dissolved hydrogen', 'Inconsistent hardness in incoming ingots'],
    method: ['Improper unpressurized gating ratio in mold', 'Fast pouring speed causing air entrainment'],
    measurement: ['Uncalibrated pressure decay gauge transducer', 'Operator parallax error on dial indicator'],
    milieu: ['High seasonal humidity in foundry core room', 'Ambient shop-floor temperature shifts']
  });

  const [newCauseCategory, setNewCauseCategory] = useState<keyof Omit<FishboneData, 'problem'>>('machine');
  const [newCauseText, setNewCauseText] = useState('');

  const handleAddCause = () => {
    if (!newCauseText.trim()) return;
    setFishbone({
      ...fishbone,
      [newCauseCategory]: [...fishbone[newCauseCategory], newCauseText.trim()]
    });
    setNewCauseText('');
  };

  const handleRemoveCause = (category: keyof Omit<FishboneData, 'problem'>, index: number) => {
    setFishbone({
      ...fishbone,
      [category]: fishbone[category].filter((_, i) => i !== index)
    });
  };

  // -------------------------------------------------------------
  // 5. 5-WHY ROOT CAUSE ANALYSIS
  // -------------------------------------------------------------
  const [fiveWhyProblem, setFiveWhyProblem] = useState(
    'CNC 5-Axis Milling Machine shut down unexpectedly during aerospace titanium spar pocketing.'
  );
  const [fiveWhys, setFiveWhys] = useState<string[]>([
    'Why did the machine stop? → The spindle motor overheated and tripped the emergency thermal overload relay.',
    'Why did the spindle motor overheat? → The internal spindle bearing cooling circuit suffered from severely reduced coolant flow.',
    'Why was the cooling flow reduced? → The inline micro-filter cartridge was 95% clogged with metallic swarf and sludge.',
    'Why was the filter clogged with sludge? → The coolant filter element had not been replaced during the scheduled weekly PM.',
    'Why was the weekly PM skipped? → The maintenance technician lacked an automated reminder and assumed shift 2 had completed it.'
  ]);
  const [fiveWhyRootCause, setFiveWhyRootCause] = useState(
    'Absence of an automated digital CMMS interlocking maintenance checklist and filter differential pressure sensor.'
  );
  const [fiveWhyCAPA, setFiveWhyCAPA] = useState(
    '1. Install differential pressure transducer with auto-alarm. 2. Implement digital barcode CMMS checklist required to release machine for production.'
  );

  // -------------------------------------------------------------
  // 6. SPC (X-BAR & R CHART) CALCULATOR
  // -------------------------------------------------------------
  const [spcSubgroups, setSpcSubgroups] = useState<{ id: number; values: number[] }[]>([
    { id: 1, values: [25.02, 25.04, 25.01, 25.03] },
    { id: 2, values: [25.03, 25.02, 25.05, 25.04] },
    { id: 3, values: [25.01, 25.00, 25.02, 25.03] },
    { id: 4, values: [25.04, 25.06, 25.03, 25.05] },
    { id: 5, values: [25.02, 25.03, 25.04, 25.01] },
    { id: 6, values: [25.05, 25.07, 25.04, 25.06] },
    { id: 7, values: [25.03, 25.01, 25.02, 25.04] },
    { id: 8, values: [25.04, 25.05, 25.03, 25.02] }
  ]);

  // SPC Math: For subgroup size n=4, A2 = 0.729, D3 = 0, D4 = 2.282
  const spcCalculations = spcSubgroups.map((sg) => {
    const xbar = sg.values.reduce((a, b) => a + b, 0) / sg.values.length;
    const r = Math.max(...sg.values) - Math.min(...sg.values);
    return { ...sg, xbar, r };
  });

  const grandXBar =
    spcCalculations.reduce((acc, sg) => acc + sg.xbar, 0) / spcCalculations.length;
  const avgR = spcCalculations.reduce((acc, sg) => acc + sg.r, 0) / spcCalculations.length;

  const spcUCL_X = grandXBar + 0.729 * avgR;
  const spcLCL_X = grandXBar - 0.729 * avgR;
  const spcUCL_R = 2.282 * avgR;
  const spcLCL_R = 0;

  // -------------------------------------------------------------
  // 7. 8D PROBLEM SOLVING REPORT GENERATOR
  // -------------------------------------------------------------
  const [dReport, setDReport] = useState({
    d1_team: 'Arjun Verma (Champion), Jagriti Singh (Quality Lead), Marcus Vance (Process Tech)',
    d2_problem: 'Customer reported 12 out of 500 steering knuckles exhibiting cracked thread roots.',
    d3_containment: '100% quarantine of current warehouse stock; Eddy current inspection on all finished goods.',
    d4_rootcause: 'Tapping tool worn beyond allowable 800-hole tool life; tap pitch diameter reduced by 0.04mm.',
    d5_corrAction: 'Implemented tool life interlock shutdown on CNC controller at 650 holes; switched to TiAlN coated taps.',
    d6_verification: 'Inspected 3 consecutive batches (1,500 parts) with optical thread profile projector; 0 failures.',
    d7_prevention: 'Updated PFMEA and Control Plan with tool cycle counters; trained all machine operators.',
    d8_closure: 'Team celebrated at Kaizen review; formal sign-off completed by Quality Director on 2026-10-28.'
  });

  // -------------------------------------------------------------
  // 8. CAPA MANAGEMENT LOG
  // -------------------------------------------------------------
  const [capaItems, setCapaItems] = useState<CAPAItem[]>([
    {
      id: 'CAPA-2026-08',
      title: 'Quench Cracking in AISI 4340 Pinion Gears',
      nonconformity: '14 gears fractured along root radius during water quenching.',
      rootCause: 'Severe thermal shock; water quench used instead of specified polymer quench.',
      correctiveAction: 'Scrapped batch; cleaned and refilled quench bath with Aquaquench 260 polymer.',
      preventiveAction: 'Installed RFID barcode interlock on furnace door verifying quench recipe.',
      owner: 'Carlos Mendez (Heat Treat QE)',
      dueDate: '2026-11-15',
      status: 'In Progress',
      priority: 'High'
    },
    {
      id: 'CAPA-2026-09',
      title: 'Solder Paste Bridging on 0.4mm Pitch QFN',
      nonconformity: 'First-pass yield dropped to 91% due to short-circuit bridging.',
      rootCause: 'Stencil underside cleaning wiper solvent pump failed; solder residue accumulation.',
      correctiveAction: 'Replaced wiper solvent manifold; reworked 35 bridged PCB assemblies.',
      preventiveAction: 'Added automatic flow switch alarm on stencil cleaning pump.',
      owner: 'Elena Rostova (SMT QE)',
      dueDate: '2026-11-05',
      status: 'Verified',
      priority: 'Medium'
    }
  ]);

  // -------------------------------------------------------------
  // 9. SIX SIGMA & DPMO
  // -------------------------------------------------------------
  const [ssDefects, setSsDefects] = useState<number>(45);
  const [ssUnits, setSsUnits] = useState<number>(5000);
  const [ssOpportunities, setSsOpportunities] = useState<number>(10);

  const totalOpps = ssUnits * ssOpportunities;
  const dpmo = totalOpps > 0 ? (ssDefects / totalOpps) * 1000000 : 0;
  const yieldPct = totalOpps > 0 ? ((totalOpps - ssDefects) / totalOpps) * 100 : 100;

  // Approximate Sigma calculation (with 1.5 sigma shift)
  const estimateSigma = (d: number) => {
    if (d <= 3.4) return 6.0;
    if (d <= 233) return 5.0;
    if (d <= 6210) return 4.0;
    if (d <= 66807) return 3.0;
    if (d <= 308537) return 2.0;
    return 1.0;
  };
  const estimatedSigmaLevel = estimateSigma(dpmo);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 p-0.5 shadow-md shadow-emerald-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight font-mono">
                Quality Engineering Toolkit
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Fully interactive engineering calculation suite producing real mathematical outputs. FMEA risk prioritization, Pareto frequency analysis, Fishbone 6M, SPC Shewhart control charts, and Process Capability.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              100% Client-Side Real Mathematics
            </span>
          </div>
        </div>

        {/* TOOLKIT NAVIGATION TABS */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'cpk', label: 'Cp / Cpk Capability', icon: <Gauge className="w-4 h-4" /> },
            { id: 'spc', label: 'SPC Control Charts', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'fmea', label: 'AIAG-VDA FMEA', icon: <Calculator className="w-4 h-4" /> },
            { id: 'pareto', label: 'Pareto Analysis', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'fishbone', label: 'Fishbone (6M)', icon: <GitBranch className="w-4 h-4" /> },
            { id: 'fivewhy', label: '5-Why Root Cause', icon: <HelpCircle className="w-4 h-4" /> },
            { id: 'eightd', label: '8D Problem Solving', icon: <FileCheck2 className="w-4 h-4" /> },
            { id: 'capa', label: 'CAPA Management', icon: <CheckCircle className="w-4 h-4" /> },
            { id: 'sixsigma', label: 'Six Sigma & DPMO', icon: <Sliders className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all font-semibold ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-bold'
                  : 'glass-panel text-slate-300 hover:text-white border-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: PROCESS CAPABILITY CALCULATOR (Cp, Cpk, Pp, Ppk) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'cpk' && (
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-cyan-400" />
                  <span>Process Capability (Cp, Cpk) & Performance (Pp, Ppk)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Distinguishes within-subgroup variation (short-term potential) from overall sample variance (actual performance).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Parameter Inputs */}
              <div className="space-y-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  Specification Parameters
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 font-mono">Lower Spec Limit (LSL)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={cpkLSL}
                      onChange={(e) => setCpkLSL(parseFloat(e.target.value) || 0)}
                      className="w-full mt-1 p-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-mono">Upper Spec Limit (USL)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={cpkUSL}
                      onChange={(e) => setCpkUSL(parseFloat(e.target.value) || 0)}
                      className="w-full mt-1 p-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-mono">Nominal Target</label>
                  <input
                    type="number"
                    step="0.01"
                    value={cpkTarget}
                    onChange={(e) => setCpkTarget(parseFloat(e.target.value) || 0)}
                    className="w-full mt-1 p-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-mono">
                    Sample Data Points ({n} entries)
                  </label>
                  <textarea
                    rows={4}
                    value={cpkDataInput}
                    onChange={(e) => setCpkDataInput(e.target.value)}
                    placeholder="Enter comma or space separated numbers..."
                    className="w-full mt-1 p-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                  />
                  <div className="text-[10px] text-slate-500 font-mono mt-1">
                    Paste raw measurement values from CMM or digital micrometer.
                  </div>
                </div>
              </div>

              {/* Calculated Results Summary */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Potential Cp</div>
                    <div className="text-2xl font-bold text-cyan-400 mt-1 font-mono">{cp.toFixed(3)}</div>
                    <div className="text-[10px] text-slate-500 mt-1">(USL-LSL) / 6σ_w</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Capability Cpk</div>
                    <div
                      className={`text-2xl font-bold mt-1 font-mono ${
                        cpk >= 1.67 ? 'text-emerald-400' : cpk >= 1.33 ? 'text-cyan-300' : 'text-amber-400'
                      }`}
                    >
                      {cpk.toFixed(3)}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">min(CPU, CPL)</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Performance Pp</div>
                    <div className="text-2xl font-bold text-violet-400 mt-1 font-mono">{pp.toFixed(3)}</div>
                    <div className="text-[10px] text-slate-500 mt-1">(USL-LSL) / 6s</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Performance Ppk</div>
                    <div className="text-2xl font-bold text-violet-300 mt-1 font-mono">{ppk.toFixed(3)}</div>
                    <div className="text-[10px] text-slate-500 mt-1">Overall standard dev</div>
                  </div>
                </div>

                {/* Statistical Breakdown Panel */}
                <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 text-xs font-mono space-y-2">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Sample Mean (X-bar):</span>
                    <span className="text-white font-bold">{mean.toFixed(4)} mm</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Within-Subgroup Std Dev (σ_within):</span>
                    <span className="text-cyan-300 font-bold">{withinStdDev.toFixed(5)} mm</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Overall Sample Std Dev (s_overall):</span>
                    <span className="text-violet-300 font-bold">{sampleStdDev.toFixed(5)} mm</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Centering Factor (k):</span>
                    <span className="text-slate-200">
                      {(Math.abs(mean - cpkTarget) / ((cpkUSL - cpkLSL) / 2)).toFixed(4)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-400">Industrial Status:</span>
                    <span
                      className={`font-bold ${
                        cpk >= 1.67
                          ? 'text-emerald-400'
                          : cpk >= 1.33
                          ? 'text-cyan-300'
                          : 'text-amber-400'
                      }`}
                    >
                      {cpk >= 1.67
                        ? 'World-Class Six Sigma Tier (Safe for Auto/Aero)'
                        : cpk >= 1.33
                        ? 'Capable Process (Standard Industry Acceptable)'
                        : 'Inadequate Capability (Requires Mean Centering or Variance Reduction)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: SPC CONTROL CHARTS (X-BAR & R) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'spc' && (
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  <span>Shewhart Statistical Process Control (X-bar and R Chart)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Subgroup size n = 4. Control limits set at ±3 standard errors (A2 = 0.729, D4 = 2.282).
                </p>
              </div>
            </div>

            {/* SPC Summary Metric Tickers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-center font-mono">
                <div className="text-[10px] text-slate-500 uppercase">Grand Average (X-double-bar)</div>
                <div className="text-lg font-bold text-white mt-0.5">{grandXBar.toFixed(4)}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-center font-mono">
                <div className="text-[10px] text-slate-500 uppercase">Upper Control Limit (UCL_X)</div>
                <div className="text-lg font-bold text-rose-400 mt-0.5">{spcUCL_X.toFixed(4)}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-center font-mono">
                <div className="text-[10px] text-slate-500 uppercase">Lower Control Limit (LCL_X)</div>
                <div className="text-lg font-bold text-rose-400 mt-0.5">{spcLCL_X.toFixed(4)}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-center font-mono">
                <div className="text-[10px] text-slate-500 uppercase">Range UCL (UCL_R)</div>
                <div className="text-lg font-bold text-amber-400 mt-0.5">{spcUCL_R.toFixed(4)}</div>
              </div>
            </div>

            {/* Subgroups Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Subgroup #</th>
                    <th className="p-3">Observed Values (x1, x2, x3, x4)</th>
                    <th className="p-3">Subgroup Average (X-bar)</th>
                    <th className="p-3">Subgroup Range (R)</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {spcCalculations.map((sg) => {
                    const isOutOfControl = sg.xbar > spcUCL_X || sg.xbar < spcLCL_X;
                    return (
                      <tr key={sg.id} className="hover:bg-slate-900/40">
                        <td className="p-3 font-bold text-cyan-400">SG #{sg.id}</td>
                        <td className="p-3 text-slate-300">{sg.values.join(', ')}</td>
                        <td className="p-3 text-white font-semibold">{sg.xbar.toFixed(4)}</td>
                        <td className="p-3 text-amber-300">{sg.r.toFixed(4)}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] ${
                              isOutOfControl
                                ? 'bg-rose-950 text-rose-400 border border-rose-800 font-bold'
                                : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            }`}
                          >
                            {isOutOfControl ? 'OUT OF CONTROL' : 'IN CONTROL'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: AIAG-VDA HARMONIZED FMEA CALCULATOR */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'fmea' && (
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-cyan-400" />
                  <span>AIAG & VDA Harmonized FMEA Workspace</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Calculates Severity, Occurrence, Detection, RPN, and Action Priority (AP: High, Medium, Low).
                </p>
              </div>
            </div>

            {/* FMEA Entry Form */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                Add Failure Mode to Analysis
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 font-mono">Process Step</label>
                  <input
                    type="text"
                    value={newFmea.processStep}
                    onChange={(e) => setNewFmea({ ...newFmea, processStep: e.target.value })}
                    placeholder="e.g. Robot Laser Weld"
                    className="w-full mt-1 p-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-mono">Potential Failure Mode</label>
                  <input
                    type="text"
                    value={newFmea.failureMode}
                    onChange={(e) => setNewFmea({ ...newFmea, failureMode: e.target.value })}
                    placeholder="e.g. Incomplete Penetration"
                    className="w-full mt-1 p-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-mono">Failure Effect</label>
                  <input
                    type="text"
                    value={newFmea.effect}
                    onChange={(e) => setNewFmea({ ...newFmea, effect: e.target.value })}
                    placeholder="e.g. Joint separation in crash"
                    className="w-full mt-1 p-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 font-mono">Severity (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newFmea.severity}
                    onChange={(e) => setNewFmea({ ...newFmea, severity: parseInt(e.target.value) || 1 })}
                    className="w-full mt-1 p-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-mono">Occurrence (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newFmea.occurrence}
                    onChange={(e) => setNewFmea({ ...newFmea, occurrence: parseInt(e.target.value) || 1 })}
                    className="w-full mt-1 p-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-mono">Detection (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newFmea.detection}
                    onChange={(e) => setNewFmea({ ...newFmea, detection: parseInt(e.target.value) || 1 })}
                    className="w-full mt-1 p-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleAddFmea}
                    className="w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Insert Row</span>
                  </button>
                </div>
              </div>
            </div>

            {/* FMEA Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Process Step</th>
                    <th className="p-3">Failure Mode & Effect</th>
                    <th className="p-3 text-center">S</th>
                    <th className="p-3 text-center">O</th>
                    <th className="p-3 text-center">D</th>
                    <th className="p-3 text-center">RPN</th>
                    <th className="p-3 text-center">Action Priority</th>
                    <th className="p-3">Recommended Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {fmeaRows.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-900/40">
                      <td className="p-3 font-semibold text-white">{row.processStep}</td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-200">{row.failureMode}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{row.effect}</div>
                      </td>
                      <td className="p-3 text-center font-bold text-rose-400">{row.severity}</td>
                      <td className="p-3 text-center font-bold text-amber-400">{row.occurrence}</td>
                      <td className="p-3 text-center font-bold text-cyan-400">{row.detection}</td>
                      <td className="p-3 text-center font-bold text-white bg-slate-950/60 rounded">
                        {row.rpn}
                      </td>
                      <td className="p-3 text-center">
                        <span
                          className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                            row.actionPriority === 'High'
                              ? 'bg-rose-950 text-rose-300 border border-rose-800'
                              : row.actionPriority === 'Medium'
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          }`}
                        >
                          AP: {row.actionPriority}
                        </span>
                      </td>
                      <td className="p-3 text-slate-300 text-[11px]">{row.recommendedAction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: PARETO ANALYSIS & 80/20 CHART */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'pareto' && (
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  <span>Pareto Analysis & Vital Few 80/20 Rule</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Identifies the 20% of defect causes responsible for 80% of manufacturing rework and scrap.
                </p>
              </div>
            </div>

            {/* Input form */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={newParetoName}
                onChange={(e) => setNewParetoName(e.target.value)}
                placeholder="Defect Category Name..."
                className="flex-1 p-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
              />
              <input
                type="number"
                min="1"
                value={newParetoCount}
                onChange={(e) => setNewParetoCount(parseInt(e.target.value) || 1)}
                className="w-28 p-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
              />
              <button
                onClick={handleAddParetoItem}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider"
              >
                Add Defect Count
              </button>
            </div>

            {/* Interactive SVG Pareto Chart */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Frequency Bar & Cumulative % Curve</span>
                <span className="text-rose-400">--- 80% Vital Few Threshold</span>
              </div>

              <div className="h-64 w-full flex items-end gap-3 pt-6 pb-2 px-2 border-b border-l border-slate-800 relative">
                {/* 80% Cutoff Line */}
                <div className="absolute top-[20%] left-0 right-0 border-b border-dashed border-rose-500/80 flex justify-end pr-2 pointer-events-none">
                  <span className="text-[10px] text-rose-400 font-mono bg-slate-950 px-1 -mt-2.5">
                    80% Cutoff
                  </span>
                </div>

                {paretoCalculated.map((item, idx) => {
                  const barHeight = Math.max(
                    (item.count / (paretoCalculated[0]?.count || 1)) * 100,
                    5
                  );
                  return (
                    <div key={item.id} className="flex-1 flex flex-col items-center h-full justify-end group">
                      <div className="text-[10px] text-cyan-300 font-mono mb-1 group-hover:block transition-all">
                        {item.count}
                      </div>
                      <div
                        style={{ height: `${barHeight}%` }}
                        className="w-full bg-gradient-to-t from-cyan-600 to-blue-500 rounded-t-lg group-hover:from-cyan-400 group-hover:to-blue-400 transition-all relative"
                      >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] text-slate-300 font-mono whitespace-nowrap bg-slate-900 px-1 py-0.5 rounded border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
                          Cum: {item.cumPct.toFixed(1)}%
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-2 truncate max-w-[80px] text-center">
                        {item.defect}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 5: FISHBONE (ISHIKAWA) 6M DIAGRAM */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'fishbone' && (
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-cyan-400" />
                  <span>Ishikawa Cause and Effect (6M Fishbone Diagram)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Structure root cause brainstorming across Man, Machine, Material, Method, Measurement, and Milieu.
                </p>
              </div>
            </div>

            {/* Problem Statement Box */}
            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 space-y-1">
              <label className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                Problem Statement (Fish Head):
              </label>
              <input
                type="text"
                value={fishbone.problem}
                onChange={(e) => setFishbone({ ...fishbone, problem: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm font-semibold text-white"
              />
            </div>

            {/* Add Cause Form */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center gap-3">
              <select
                value={newCauseCategory}
                onChange={(e) => setNewCauseCategory(e.target.value as any)}
                className="p-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-cyan-300 font-mono"
              >
                <option value="man">Man (Personnel)</option>
                <option value="machine">Machine (Equipment)</option>
                <option value="material">Material (Raw Charge)</option>
                <option value="method">Method (Process SOP)</option>
                <option value="measurement">Measurement (Inspection)</option>
                <option value="milieu">Mother Nature (Environment)</option>
              </select>

              <input
                type="text"
                value={newCauseText}
                onChange={(e) => setNewCauseText(e.target.value)}
                placeholder="Enter contributing cause..."
                className="flex-1 p-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
              />

              <button
                onClick={handleAddCause}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider"
              >
                Add Cause
              </button>
            </div>

            {/* 6M Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(
                [
                  { key: 'man', label: '1. Man / Personnel', color: 'text-cyan-400' },
                  { key: 'machine', label: '2. Machine / Tooling', color: 'text-blue-400' },
                  { key: 'material', label: '3. Material / Raw Billet', color: 'text-emerald-400' },
                  { key: 'method', label: '4. Method / SOP Parameters', color: 'text-amber-400' },
                  { key: 'measurement', label: '5. Measurement / Gauges', color: 'text-violet-400' },
                  { key: 'milieu', label: '6. Mother Nature / Environment', color: 'text-rose-400' }
                ] as const
              ).map((cat) => (
                <div key={cat.key} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className={`text-xs font-mono font-bold uppercase tracking-wider ${cat.color}`}>
                    {cat.label}
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {fishbone[cat.key].map((cause, idx) => (
                      <li
                        key={idx}
                        className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 flex items-start justify-between gap-2"
                      >
                        <span className="leading-snug">{cause}</span>
                        <button
                          onClick={() => handleRemoveCause(cat.key, idx)}
                          className="text-slate-500 hover:text-rose-400 shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 6: 5-WHY ROOT CAUSE ANALYSIS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'fivewhy' && (
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-cyan-400" />
                  <span>5-Why Root Cause Investigative Ladder</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Drill down from superficial symptoms to actionable systemic and management root causes.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-1">
                <label className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                  Problem Description:
                </label>
                <input
                  type="text"
                  value={fiveWhyProblem}
                  onChange={(e) => setFiveWhyProblem(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="space-y-3">
                {fiveWhys.map((why, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <span className="w-7 h-7 rounded-xl bg-cyan-950 border border-cyan-700/80 flex items-center justify-center text-xs font-mono font-bold text-cyan-400 shrink-0 mt-0.5">
                      W{idx + 1}
                    </span>
                    <input
                      type="text"
                      value={why}
                      onChange={(e) => {
                        const updated = [...fiveWhys];
                        updated[idx] = e.target.value;
                        setFiveWhys(updated);
                      }}
                      className="flex-1 bg-transparent border-0 text-xs text-slate-200 focus:outline-none focus:ring-0 p-1"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-800/60 space-y-1">
                  <label className="text-[10px] font-mono uppercase text-rose-300 font-bold">
                    Identified Root Cause:
                  </label>
                  <textarea
                    rows={2}
                    value={fiveWhyRootCause}
                    onChange={(e) => setFiveWhyRootCause(e.target.value)}
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/60 space-y-1">
                  <label className="text-[10px] font-mono uppercase text-emerald-300 font-bold">
                    Corrective & Preventive Actions (CAPA):
                  </label>
                  <textarea
                    rows={2}
                    value={fiveWhyCAPA}
                    onChange={(e) => setFiveWhyCAPA(e.target.value)}
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 7: 8D PROBLEM SOLVING REPORT GENERATOR */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'eightd' && (
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-cyan-400" />
                  <span>8D Problem Solving Methodology Generator</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Standard Ford / Automotive 8 Disciplines format for containment, root cause verification, and prevention.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-bold">D1: Cross-Functional Team</span>
                <textarea
                  rows={2}
                  value={dReport.d1_team}
                  onChange={(e) => setDReport({ ...dReport, d1_team: e.target.value })}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-bold">D2: Problem Description</span>
                <textarea
                  rows={2}
                  value={dReport.d2_problem}
                  onChange={(e) => setDReport({ ...dReport, d2_problem: e.target.value })}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold">D3: Interim Containment Action</span>
                <textarea
                  rows={2}
                  value={dReport.d3_containment}
                  onChange={(e) => setDReport({ ...dReport, d3_containment: e.target.value })}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-rose-400 font-bold">D4: Verified Root Cause</span>
                <textarea
                  rows={2}
                  value={dReport.d4_rootcause}
                  onChange={(e) => setDReport({ ...dReport, d4_rootcause: e.target.value })}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold">D5: Permanent Corrective Actions</span>
                <textarea
                  rows={2}
                  value={dReport.d5_corrAction}
                  onChange={(e) => setDReport({ ...dReport, d5_corrAction: e.target.value })}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold">D6: Verification of Effectiveness</span>
                <textarea
                  rows={2}
                  value={dReport.d6_verification}
                  onChange={(e) => setDReport({ ...dReport, d6_verification: e.target.value })}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-violet-400 font-bold">D7: Preventive Recurrence Controls</span>
                <textarea
                  rows={2}
                  value={dReport.d7_prevention}
                  onChange={(e) => setDReport({ ...dReport, d7_prevention: e.target.value })}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-violet-400 font-bold">D8: Team Recognition & Sign-off</span>
                <textarea
                  rows={2}
                  value={dReport.d8_closure}
                  onChange={(e) => setDReport({ ...dReport, d8_closure: e.target.value })}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 8: CAPA MANAGEMENT LOG */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'capa' && (
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-400" />
                  <span>Corrective & Preventive Action (CAPA) Tracker</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  ISO 9001 Section 10.2 & IATF 16949 audit-ready nonconformance resolution tracking.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {capaItems.map((item) => (
                <div key={item.id} className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                        {item.id}
                      </span>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          item.status === 'Verified'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {item.status}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Due: {item.dueDate}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
                    <div>
                      <strong className="text-rose-400 block text-[10px] uppercase font-mono">
                        Nonconformity:
                      </strong>
                      <p className="mt-0.5 text-slate-400">{item.nonconformity}</p>
                    </div>
                    <div>
                      <strong className="text-amber-400 block text-[10px] uppercase font-mono">
                        Root Cause:
                      </strong>
                      <p className="mt-0.5 text-slate-400">{item.rootCause}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-400 font-mono flex items-center justify-between">
                    <span>Owner: {item.owner}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 9: SIX SIGMA & DPMO CALCULATOR */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'sixsigma' && (
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-cyan-400" />
                  <span>Six Sigma Metrics: DPMO & Sigma Level</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Universal defect rate standard with standard Motorola 1.5-sigma long term mean shift.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold">
                  Defect Count Input
                </h4>
                <div>
                  <label className="text-xs text-slate-400 font-mono">Defects Observed</label>
                  <input
                    type="number"
                    min="0"
                    value={ssDefects}
                    onChange={(e) => setSsDefects(parseInt(e.target.value) || 0)}
                    className="w-full mt-1 p-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-mono">Total Units Inspected</label>
                  <input
                    type="number"
                    min="1"
                    value={ssUnits}
                    onChange={(e) => setSsUnits(parseInt(e.target.value) || 1)}
                    className="w-full mt-1 p-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-mono">Opportunities Per Unit</label>
                  <input
                    type="number"
                    min="1"
                    value={ssOpportunities}
                    onChange={(e) => setSsOpportunities(parseInt(e.target.value) || 1)}
                    className="w-full mt-1 p-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center font-mono">
                    <div className="text-[10px] text-slate-500 uppercase">Calculated DPMO</div>
                    <div className="text-2xl font-bold text-cyan-400 mt-1">{dpmo.toFixed(1)}</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center font-mono">
                    <div className="text-[10px] text-slate-500 uppercase">First Pass Yield</div>
                    <div className="text-2xl font-bold text-emerald-400 mt-1">{yieldPct.toFixed(3)}%</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center font-mono">
                    <div className="text-[10px] text-slate-500 uppercase">Sigma Quality Level</div>
                    <div className="text-2xl font-bold text-violet-400 mt-1">{estimatedSigmaLevel.toFixed(1)} σ</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
                  <div>• 6.0 Sigma: 3.4 DPMO (World-Class Six Sigma Target)</div>
                  <div>• 5.0 Sigma: 233 DPMO</div>
                  <div>• 4.0 Sigma: 6,210 DPMO (Traditional Industry Benchmark)</div>
                  <div>• 3.0 Sigma: 66,807 DPMO</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
