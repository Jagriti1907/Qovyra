import React, { useState, useEffect } from 'react';
import { LEARNING_MODULES, FORMULA_CARDS, QUIZ_QUESTIONS, LearningModule } from '../data/learningData';
import {
  BookOpen,
  Search,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  FileText,
  Calculator,
  Award,
  ChevronRight,
  Sliders,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const LearningHubPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'modules' | 'formulas' | 'quiz'>('modules');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(LEARNING_MODULES[0]);

  // Bookmarked formulas and modules in localStorage
  const [bookmarkedFormulas, setBookmarkedFormulas] = useState<string[]>(() => {
    const saved = localStorage.getItem('qovyra_bookmarked_formulas');
    return saved ? JSON.parse(saved) : ['f-01', 'f-02'];
  });

  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    const saved = localStorage.getItem('qovyra_completed_modules');
    return saved ? JSON.parse(saved) : ['mod-01'];
  });

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  useEffect(() => {
    localStorage.setItem('qovyra_bookmarked_formulas', JSON.stringify(bookmarkedFormulas));
  }, [bookmarkedFormulas]);

  useEffect(() => {
    localStorage.setItem('qovyra_completed_modules', JSON.stringify(completedModules));
  }, [completedModules]);

  const toggleBookmarkFormula = (id: string) => {
    setBookmarkedFormulas((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleCompleteModule = (id: string) => {
    setCompletedModules((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter modules
  const filteredModules = LEARNING_MODULES.filter(
    (m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter formulas
  const filteredFormulas = FORMULA_CARDS.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.application.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate quiz score
  const correctCount = QUIZ_QUESTIONS.filter(
    (q) => quizAnswers[q.id] === q.correctIndex
  ).length;

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 p-0.5 shadow-md shadow-blue-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight font-mono">
                Quality Engineering Learning Hub
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Curriculum aligned with GATE Industrial, ESE Mechanical, ASQ CQE certification, and high-stakes technical quality interviews.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="glass-panel px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-3 text-xs font-mono">
              <div>
                Progress: <strong className="text-cyan-300">{completedModules.length} / {LEARNING_MODULES.length}</strong>
              </div>
              <div className="w-px h-4 bg-slate-800" />
              <div>
                Formulas Saved: <strong className="text-amber-400">{bookmarkedFormulas.length}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* TOP TABS & SEARCH */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('modules')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'modules'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Learning Modules ({LEARNING_MODULES.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('formulas')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'formulas'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Formula Repository ({FORMULA_CARDS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'quiz'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Exam Practice & MCQs ({QUIZ_QUESTIONS.length})</span>
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, formulas, topics..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* 1. LEARNING MODULES TAB */}
        {activeTab === 'modules' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Module Selection List */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Curriculum Modules:
              </div>

              {filteredModules.map((mod) => {
                const isSelected = selectedModule?.id === mod.id;
                const isCompleted = completedModules.includes(mod.id);
                return (
                  <div
                    key={mod.id}
                    onClick={() => setSelectedModule(mod)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-400 shadow-xl shadow-cyan-500/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                        {mod.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">{mod.durationMin} min</span>
                    </div>

                    <h4 className="text-sm font-bold text-white mt-2 leading-snug">{mod.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{mod.summary}</p>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-400">{mod.level}</span>
                      <span className={isCompleted ? 'text-emerald-400' : 'text-slate-500'}>
                        {isCompleted ? 'Completed ✓' : 'Incomplete'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Full Module Reader */}
            {selectedModule && (
              <div className="lg:col-span-2 glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
                <div className="flex items-start justify-between border-b border-slate-800 pb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-800 uppercase">
                        {selectedModule.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        Level: {selectedModule.level} • {selectedModule.durationMin} min read
                      </span>
                    </div>
                    <h2 className="text-2xl font-extrabold text-white mt-2 leading-snug">
                      {selectedModule.title}
                    </h2>
                  </div>

                  <button
                    onClick={() => toggleCompleteModule(selectedModule.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-colors ${
                      completedModules.includes(selectedModule.id)
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-700'
                    }`}
                  >
                    {completedModules.includes(selectedModule.id) ? 'Completed ✓' : 'Mark Complete'}
                  </button>
                </div>

                {/* Exam Relevance Callout */}
                <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-600/40 text-xs text-amber-200 flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-300 font-mono">Competitive Exam Scope: </span>
                    {selectedModule.examRelevance}
                  </div>
                </div>

                {/* Content Sections */}
                <div className="space-y-6 text-slate-300 leading-relaxed text-sm">
                  {selectedModule.contentSections.map((sec, idx) => (
                    <div key={idx} className="space-y-3">
                      <h3 className="text-base font-bold text-white border-b border-slate-800 pb-1.5">
                        {sec.heading}
                      </h3>
                      <div className="whitespace-pre-wrap text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {sec.body}
                      </div>

                      {sec.formula && (
                        <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 font-mono text-xs text-cyan-300">
                          {sec.formula}
                        </div>
                      )}

                      {sec.takeaway && (
                        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 font-mono">
                          <strong className="text-cyan-400">Key Engineering Takeaway: </strong>
                          {sec.takeaway}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. FORMULA REPOSITORY TAB */}
        {activeTab === 'formulas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredFormulas.map((f) => (
              <div
                key={f.id}
                className="metallic-card rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                      {f.category}
                    </span>
                    <button
                      onClick={() => toggleBookmarkFormula(f.id)}
                      className="text-slate-500 hover:text-amber-400 transition-colors"
                    >
                      {bookmarkedFormulas.includes(f.id) ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-white mt-3">{f.name}</h3>

                  <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-cyan-500/40 font-mono text-xs text-cyan-300 font-bold overflow-x-auto">
                    {f.formula}
                  </div>

                  {/* Variables */}
                  <div className="mt-4 space-y-1.5 text-xs text-slate-300">
                    <div className="text-[10px] font-mono uppercase text-slate-400">Parameters:</div>
                    {f.variables.map((v, i) => (
                      <div key={i} className="text-[11px] font-mono text-slate-400">
                        <strong className="text-slate-200">{v.symbol}</strong>: {v.meaning}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 leading-snug">
                  {f.application}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. EXAM PRACTICE & MCQS TAB */}
        {activeTab === 'quiz' && (
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span>Quality Engineering Examination Practice</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Numerical derivations, statistical formulas, and standard auditing questions with step-by-step solutions.
                </p>
              </div>

              {submittedQuiz && (
                <div className="px-4 py-2 rounded-xl bg-cyan-950 border border-cyan-500 text-cyan-300 font-mono text-xs font-bold">
                  Score: {correctCount} / {QUIZ_QUESTIONS.length} (
                  {((correctCount / QUIZ_QUESTIONS.length) * 100).toFixed(0)}%)
                </div>
              )}
            </div>

            <div className="space-y-6">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const userChoice = quizAnswers[q.id];
                const isCorrect = userChoice === q.correctIndex;
                return (
                  <div key={q.id} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                        Q{idx + 1} • {q.category} ({q.difficulty})
                      </span>
                      {q.examRelevance && (
                        <span className="text-[10px] font-mono text-slate-500">{q.examRelevance}</span>
                      )}
                    </div>

                    <p className="text-sm font-semibold text-slate-100 leading-relaxed">{q.question}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, optIdx) => {
                        let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';
                        if (userChoice === optIdx) {
                          btnStyle = 'bg-cyan-950 border-cyan-400 text-white font-bold';
                        }
                        if (submittedQuiz) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                          } else if (userChoice === optIdx && !isCorrect) {
                            btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={submittedQuiz}
                            onClick={() => setQuizAnswers({ ...quizAnswers, [q.id]: optIdx })}
                            className={`p-3 rounded-xl border text-left transition-colors flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {submittedQuiz && optIdx === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                            )}
                            {submittedQuiz && userChoice === optIdx && !isCorrect && (
                              <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {submittedQuiz && (
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                        <strong className="text-cyan-400 font-mono block">Engineering Solution & Derivation:</strong>
                        <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{q.explanation}</p>
                        {q.formula && (
                          <div className="text-[11px] font-mono text-slate-400">
                            Formula used: <span className="text-cyan-300">{q.formula}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
              {submittedQuiz ? (
                <button
                  onClick={() => {
                    setQuizAnswers({});
                    setSubmittedQuiz(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider"
                >
                  Retake Practice Test
                </button>
              ) : (
                <button
                  onClick={() => setSubmittedQuiz(true)}
                  disabled={Object.keys(quizAnswers).length === 0}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Submit & View Step-by-Step Solutions
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
