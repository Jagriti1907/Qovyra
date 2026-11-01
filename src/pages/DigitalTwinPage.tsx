import React, { useState, useEffect, useRef } from 'react';
import {
  Activity,
  Play,
  Pause,
  RotateCcw,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  TrendingDown,
  TrendingUp,
  Cpu,
  Thermometer,
  Layers,
  ArrowRight
} from 'lucide-react';

interface TelemetryPoint {
  time: string;
  output: number;
  defectRate: number;
  oee: number;
  vibration: number;
  temp: number;
}

export const DigitalTwinPage: React.FC = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<1 | 2 | 5>(1);

  // Core metrics
  const [productionOutput, setProductionOutput] = useState<number>(4820);
  const [defectCount, setDefectCount] = useState<number>(14);
  const [cycleTimeSec, setCycleTimeSec] = useState<number>(4.2);
  const [utilization, setUtilization] = useState<number>(94.5);
  const [downtimeMin, setDowntimeMin] = useState<number>(18);
  const [spindleTempC, setSpindleTempC] = useState<number>(42.1);
  const [vibrationMmS, setVibrationMmS] = useState<number>(0.85);

  // Active faults injected
  const [activeFault, setActiveFault] = useState<string | null>(null);

  // Live telemetry stream history for charting
  const [history, setHistory] = useState<TelemetryPoint[]>([
    { time: '10:00', output: 4500, defectRate: 0.28, oee: 92.4, vibration: 0.8, temp: 41 },
    { time: '10:05', output: 4580, defectRate: 0.29, oee: 92.8, vibration: 0.82, temp: 41.5 },
    { time: '10:10', output: 4650, defectRate: 0.31, oee: 93.1, vibration: 0.84, temp: 42 },
    { time: '10:15', output: 4720, defectRate: 0.29, oee: 93.5, vibration: 0.85, temp: 42.1 },
    { time: '10:20', output: 4820, defectRate: 0.29, oee: 93.8, vibration: 0.85, temp: 42.1 }
  ]);

  // Derived metrics
  const defectRate = productionOutput > 0 ? (defectCount / productionOutput) * 100 : 0;
  // OEE = Availability * Performance * Quality
  const availability = Math.max((480 - downtimeMin) / 480, 0.5);
  const performance = Math.min((cycleTimeSec > 0 ? 4.0 / cycleTimeSec : 0.95), 1.0);
  const quality = Math.max((productionOutput - defectCount) / (productionOutput || 1), 0.8);
  const oee = availability * performance * quality * 100;

  // Real-time Simulation Engine Timer
  useEffect(() => {
    if (!isRunning) return;

    const intervalMs = 1200 / speedMultiplier;
    const timer = setInterval(() => {
      setProductionOutput((prev) => prev + (activeFault ? 1 : 2));

      // Handle defect generation based on active faults
      if (activeFault) {
        setDefectCount((prev) => prev + (Math.random() > 0.4 ? 1 : 0));
        setVibrationMmS((prev) => Math.min(prev + 0.05, 3.8));
        setSpindleTempC((prev) => Math.min(prev + 0.3, 78.0));
      } else {
        setDefectCount((prev) => prev + (Math.random() > 0.92 ? 1 : 0));
        setVibrationMmS((prev) => Math.max(0.75, prev + (Math.random() - 0.5) * 0.04));
        setSpindleTempC((prev) => Math.max(40.0, prev + (Math.random() - 0.5) * 0.1));
      }

      // Append live point to history
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setHistory((prev) => {
        const nextList = [
          ...prev.slice(-14),
          {
            time: timeStr,
            output: productionOutput,
            defectRate: Number(defectRate.toFixed(2)),
            oee: Number(oee.toFixed(1)),
            vibration: Number(vibrationMmS.toFixed(2)),
            temp: Number(spindleTempC.toFixed(1))
          }
        ];
        return nextList;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isRunning, speedMultiplier, activeFault, productionOutput, defectCount, defectRate, oee, vibrationMmS, spindleTempC]);

  const handleResetSimulation = () => {
    setProductionOutput(4000);
    setDefectCount(8);
    setCycleTimeSec(4.2);
    setDowntimeMin(15);
    setVibrationMmS(0.82);
    setSpindleTempC(41.0);
    setActiveFault(null);
  };

  const handleInjectFault = (faultName: string) => {
    if (activeFault === faultName) {
      setActiveFault(null); // clear
    } else {
      setActiveFault(faultName);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 p-0.5 shadow-md shadow-violet-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-violet-400" />
                </div>
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight font-mono">
                Digital Twin Simulation Cockpit
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Virtual telemetry replica of the physical manufacturing line. In-process OEE tracking, anomaly injection, and real-time degradation simulation.
            </p>
          </div>

          {/* Simulation Primary Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                isRunning
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isRunning ? 'Pause Sim' : 'Resume Sim'}</span>
            </button>

            <button
              onClick={handleResetSimulation}
              title="Reset Simulation Baseline"
              className="p-2 glass-panel rounded-xl text-slate-400 hover:text-white border border-slate-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Speed Multipliers */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              {([1, 2, 5] as const).map((spd) => (
                <button
                  key={spd}
                  onClick={() => setSpeedMultiplier(spd)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-mono font-bold transition-colors ${
                    speedMultiplier === spd
                      ? 'bg-cyan-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SIMULATED DATASET NOTICE (Requirement 9) */}
        <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between text-xs text-cyan-300 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span>Digital Twin Mode: Operating on Certified Simulated High-Frequency Industrial Telemetry Dataset</span>
          </div>
          <span className="text-[11px] text-slate-400">Stream Rate: {speedMultiplier * 0.8} Hz</span>
        </div>

        {/* 1. REAL-TIME METRIC CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
            <div className="text-[10px] text-slate-500 uppercase">Production Units</div>
            <div className="text-xl font-bold text-white mt-1">{productionOutput.toLocaleString()}</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">Shift Target: 5,000</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
            <div className="text-[10px] text-slate-500 uppercase">Defect Count</div>
            <div className={`text-xl font-bold mt-1 ${defectCount > 25 ? 'text-rose-400' : 'text-amber-300'}`}>
              {defectCount} units
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Rate: {defectRate.toFixed(2)}%</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
            <div className="text-[10px] text-slate-500 uppercase">Line OEE</div>
            <div
              className={`text-xl font-bold mt-1 ${
                oee >= 85 ? 'text-emerald-400' : oee >= 70 ? 'text-cyan-300' : 'text-rose-400'
              }`}
            >
              {oee.toFixed(1)}%
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Avail × Perf × Qual</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
            <div className="text-[10px] text-slate-500 uppercase">Cycle Time</div>
            <div className="text-xl font-bold text-white mt-1">{cycleTimeSec.toFixed(1)}s</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Ideal: 4.0s</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
            <div className="text-[10px] text-slate-500 uppercase">Spindle Temp</div>
            <div className={`text-xl font-bold mt-1 ${spindleTempC > 65 ? 'text-rose-400' : 'text-cyan-300'}`}>
              {spindleTempC.toFixed(1)}°C
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Limit: 75.0°C</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
            <div className="text-[10px] text-slate-500 uppercase">Spindle Vibration</div>
            <div className={`text-xl font-bold mt-1 ${vibrationMmS > 2.0 ? 'text-rose-400' : 'text-cyan-300'}`}>
              {vibrationMmS.toFixed(2)} mm/s
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">ISO 10816 Zone B</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono">
            <div className="text-[10px] text-slate-500 uppercase">Downtime</div>
            <div className="text-xl font-bold text-amber-300 mt-1">{downtimeMin} min</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Planned: 15 min</div>
          </div>
        </div>

        {/* 2. FAULT INJECTION CONTROLS & COMPARISON */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Chaos & Machine Fault Injection Sandbox</span>
              </h3>
              <p className="text-xs text-slate-400">
                Trigger simulated anomalies to test automated predictive quality alarms and OEE degradation.
              </p>
            </div>

            {activeFault && (
              <div className="px-3 py-1 rounded-xl bg-rose-950/80 border border-rose-600/80 text-rose-300 text-xs font-mono font-bold flex items-center gap-2 animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>ACTIVE FAULT: {activeFault}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                id: 'spindle-vib',
                title: 'Spindle Bearing Friction Spike',
                desc: 'Vibration rises above 2.8 mm/s; harmonics trigger tool chatter.'
              },
              {
                id: 'coolant-loss',
                title: 'Coolant Flow Starvation',
                desc: 'Thermal growth expands spindle z-axis; causes tolerance drift.'
              },
              {
                id: 'material-var',
                title: 'Raw Billet Hardness Surge',
                desc: 'Cutting forces jump 40%; tool flank wear accelerates.'
              },
              {
                id: 'weld-current',
                title: 'Weld Secondary Current Drop',
                desc: 'Spot weld nugget diameter drops below critical 4√t threshold.'
              }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => handleInjectFault(f.title)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  activeFault === f.title
                    ? 'bg-rose-950/70 border-rose-500 text-white shadow-xl shadow-rose-500/20'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                    Fault Scenario
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                      activeFault === f.title ? 'bg-rose-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {activeFault === f.title ? 'ACTIVE' : 'INJECT'}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white mt-1.5">{f.title}</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">{f.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* 3. DYNAMIC SVG TELEMETRY STREAM CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: OEE & Defect Rate Progression */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white font-mono">OEE & Defect Rate Stream</h4>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">Rolling 15-frame buffer</div>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="text-cyan-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" /> OEE %
                </span>
                <span className="text-rose-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-400" /> Defect Rate %
                </span>
              </div>
            </div>

            {/* SVG Visualizer */}
            <div className="h-44 w-full flex items-end gap-2 pt-4 px-2 border-b border-l border-slate-800 relative">
              {history.map((pt, idx) => {
                const heightPct = Math.min(pt.oee, 100);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full bg-cyan-500/80 rounded-t group-hover:bg-cyan-400 transition-all relative"
                    >
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] text-cyan-300 font-mono opacity-0 group-hover:opacity-100 whitespace-nowrap bg-slate-950 px-1 rounded">
                        {pt.oee}%
                      </div>
                    </div>
                    <span className="text-[8px] text-slate-500 font-mono mt-1 truncate max-w-[28px]">
                      {pt.time.slice(3)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chart 2: Spindle Vibration & Temperature Telemetry */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white font-mono">Spindle Dynamics (Vib & Temp)</h4>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">Sensor Node: ACC-SPN-201</div>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="text-violet-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-violet-400" /> Vibration (mm/s)
                </span>
                <span className="text-amber-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400" /> Temp (°C)
                </span>
              </div>
            </div>

            {/* SVG Visualizer */}
            <div className="h-44 w-full flex items-end gap-2 pt-4 px-2 border-b border-l border-slate-800 relative">
              {history.map((pt, idx) => {
                const vibHeight = Math.min((pt.vibration / 3.0) * 100, 100);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                    <div
                      style={{ height: `${vibHeight}%` }}
                      className="w-full bg-violet-500/80 rounded-t group-hover:bg-violet-400 transition-all relative"
                    >
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] text-violet-300 font-mono opacity-0 group-hover:opacity-100 whitespace-nowrap bg-slate-950 px-1 rounded">
                        {pt.vibration}
                      </div>
                    </div>
                    <span className="text-[8px] text-slate-500 font-mono mt-1 truncate max-w-[28px]">
                      {pt.time.slice(3)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
