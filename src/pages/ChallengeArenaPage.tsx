import React, { useState, useEffect } from 'react';
import { DAILY_CHALLENGES, DEMO_LEADERBOARD } from '../data/challengesData';
import { ChallengeItem } from '../types';
import {
  Award,
  Zap,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Trophy,
  BarChart,
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';

export const ChallengeArenaPage: React.FC = () => {
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // User streak and points in localStorage
  const [userPoints, setUserPoints] = useState<number>(() => {
    const saved = localStorage.getItem('qovyra_user_points');
    return saved ? parseInt(saved) : 620;
  });
  const [streakDays, setStreakDays] = useState<number>(() => {
    const saved = localStorage.getItem('qovyra_streak_days');
    return saved ? parseInt(saved) : 7;
  });

  const [leaderboardFilter, setLeaderboardFilter] = useState<'All-Time' | 'Weekly' | 'Today'>('Weekly');

  useEffect(() => {
    localStorage.setItem('qovyra_user_points', userPoints.toString());
  }, [userPoints]);

  useEffect(() => {
    localStorage.setItem('qovyra_streak_days', streakDays.toString());
  }, [streakDays]);

  const currentChallenge = DAILY_CHALLENGES[activeChallengeIndex];
  const isCorrect = selectedOption === currentChallenge.correctIndex;

  const handleSubmitChallenge = () => {
    if (selectedOption === null || submitted) return;
    setSubmitted(true);
    if (isCorrect) {
      setUserPoints((prev) => prev + currentChallenge.points);
    }
  };

  const handleNextChallenge = () => {
    setSelectedOption(null);
    setSubmitted(false);
    setActiveChallengeIndex((prev) => (prev + 1) % DAILY_CHALLENGES.length);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-0.5 shadow-md shadow-amber-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Award className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight font-mono">
                Quality Engineering Challenge Arena
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Competitive engineering diagnostic arena. Solve daily shop-floor failure scenarios, GATE numerical calculations, and Six Sigma cases.
            </p>
          </div>

          {/* User Score & Streak Pill */}
          <div className="flex items-center gap-3 font-mono">
            <div className="glass-panel px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-amber-400">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span>{streakDays} Day Streak</span>
              </div>
              <div className="w-px h-4 bg-slate-800" />
              <div className="text-cyan-300">
                Score: <strong className="text-white">{userPoints} pts</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: Challenge Card + Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Interactive Challenge Workspace (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Challenge Nav Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              {DAILY_CHALLENGES.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    setActiveChallengeIndex(idx);
                    setSelectedOption(null);
                    setSubmitted(false);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all font-mono font-bold ${
                    activeChallengeIndex === idx
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Challenge {idx + 1} ({ch.track})
                </button>
              ))}
            </div>

            {/* Active Challenge Card */}
            <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl space-y-6">
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                      {currentChallenge.track}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                      Difficulty: {currentChallenge.difficulty}
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-white mt-2 leading-snug">
                    {currentChallenge.title}
                  </h2>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold text-amber-400 font-mono">+{currentChallenge.points}</div>
                  <div className="text-[10px] text-slate-500 font-mono">REWARD PTS</div>
                </div>
              </div>

              {/* Scenario Narrative */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
                <span className="text-amber-300 font-bold block mb-1 uppercase text-[10px]">
                  Shop-Floor Operational Scenario:
                </span>
                {currentChallenge.scenario}
              </div>

              {/* Question */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white leading-snug">
                  {currentChallenge.question}
                </h4>

                {/* Multiple Choice Options */}
                {currentChallenge.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    {currentChallenge.options.map((opt, optIdx) => {
                      let btnStyle = 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700';
                      if (selectedOption === optIdx) {
                        btnStyle = 'bg-cyan-950 border-cyan-400 text-white font-bold';
                      }
                      if (submitted) {
                        if (optIdx === currentChallenge.correctIndex) {
                          btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                        } else if (selectedOption === optIdx && !isCorrect) {
                          btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={submitted}
                          onClick={() => setSelectedOption(optIdx)}
                          className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span className="leading-snug">{opt}</span>
                          {submitted && optIdx === currentChallenge.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                          )}
                          {submitted && selectedOption === optIdx && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Submit & Navigation Bar */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                {!submitted ? (
                  <button
                    onClick={handleSubmitChallenge}
                    disabled={selectedOption === null}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Submit Diagnostic Diagnosis
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-mono font-bold flex items-center gap-1.5 ${
                        isCorrect ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isCorrect ? 'Correct Diagnosis (+points added!)' : 'Incorrect Solution'}
                    </span>
                    <button
                      onClick={handleNextChallenge}
                      className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider"
                    >
                      Next Challenge →
                    </button>
                  </div>
                )}
              </div>

              {/* Detailed Engineering Solution (Visible after submit) */}
              {submitted && (
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs leading-relaxed animate-in fade-in duration-200">
                  <div className="font-bold text-amber-300 font-mono text-[11px] uppercase">
                    Detailed Engineering Root Cause Derivation:
                  </div>
                  <div className="whitespace-pre-wrap text-slate-300 font-mono">
                    {currentChallenge.detailedSolution}
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]">
                    <strong className="text-cyan-400">High-Yield Takeaway: </strong>
                    {currentChallenge.keyTakeaway}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Leaderboard (Requirement 11) */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Global Leaderboard
                </h3>
              </div>

              {/* Filter */}
              <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[10px] font-mono">
                {(['Weekly', 'Today', 'All-Time'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setLeaderboardFilter(filter)}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      leaderboardFilter === filter
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-[10px] text-slate-500 font-mono italic">
              *Demo simulated multi-user rankings until enterprise SSO connection.
            </div>

            <div className="space-y-2.5">
              {DEMO_LEADERBOARD.map((entry) => (
                <div
                  key={entry.rank}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    entry.rank <= 3
                      ? 'bg-amber-950/20 border-amber-500/30'
                      : 'bg-slate-900/40 border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                        entry.rank === 1
                          ? 'bg-amber-500 text-slate-950'
                          : entry.rank === 2
                          ? 'bg-slate-300 text-slate-950'
                          : entry.rank === 3
                          ? 'bg-amber-700 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {entry.rank}
                    </span>

                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{entry.name}</span>
                        {entry.rank === 1 && <span className="text-[10px] text-amber-400">👑</span>}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">{entry.role}</div>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-xs font-bold text-amber-400">{entry.points} pts</div>
                    <div className="text-[10px] text-slate-500">{entry.streakDays}d streak</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
