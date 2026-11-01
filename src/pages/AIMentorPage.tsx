import React, { useState, useRef, useEffect } from 'react';
import { DifficultyLevel, ChatMessage } from '../types';
import {
  Bot,
  Send,
  Square,
  Mic,
  MicOff,
  RotateCcw,
  Copy,
  Check,
  Trash2,
  Sparkles,
  Sliders,
  HelpCircle,
  AlertCircle,
  FileText,
  BookOpen,
  ArrowRight,
  PlusCircle,
  Zap,
  Microscope,
  Paperclip,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { MathMarkdown } from '../components/MathMarkdown';

interface AIMentorPageProps {
  onNavigateTopic?: (topic: string) => void;
}

interface UniversalSuggestedQuestion {
  category: string;
  label: string;
  prompt: string;
  mode: 'quick' | 'deep';
  difficulty: DifficultyLevel;
}

const UNIVERSAL_SUGGESTIONS: UniversalSuggestedQuestion[] = [
  {
    category: 'Total Quality Management',
    label: 'TQM Core Principles & PAF Model',
    prompt: 'Explain Total Quality Management (TQM) in clear engineering terms, and detail the Cost of Quality PAF (Prevention, Appraisal, Failure) model with the 1-10-100 rule.',
    mode: 'quick',
    difficulty: 'Beginner'
  },
  {
    category: 'Statistical Quality Control',
    label: 'Calculate Cpk Step-by-Step',
    prompt: 'Calculate Cp and Cpk step-by-step for a CNC shaft where USL = 35.15mm, LSL = 34.85mm, sample mean = 35.04mm, and within-subgroup standard deviation = 0.025mm. Explain the engineering interpretation.',
    mode: 'deep',
    difficulty: 'Intermediate'
  },
  {
    category: 'Reliability Engineering',
    label: 'Weibull Derivation & Failure Modes',
    prompt: 'Derive the Weibull reliability function R(t) from the hazard rate function λ(t), and explain how the shape parameter beta (β < 1, β = 1, β > 1) maps to the bathtub curve in aerospace systems.',
    mode: 'deep',
    difficulty: 'Advanced'
  },
  {
    category: 'Harmonized FMEA',
    label: 'DFMEA vs PFMEA & Action Priority',
    prompt: 'Compare DFMEA and PFMEA in a structured comparison table with an automotive industry example, and explain why AIAG-VDA replaced traditional RPN with Action Priority (AP).',
    mode: 'quick',
    difficulty: 'Intermediate'
  },
  {
    category: 'ISO & Industry Standards',
    label: 'ISO 9001:2015 Purpose & Structure',
    prompt: 'Explain the purpose, High-Level Structure (Annex SL), and core requirements of ISO 9001:2015, distinguishing mandatory requirements from audit guidance.',
    mode: 'quick',
    difficulty: 'Intermediate'
  },
  {
    category: 'Quality Gurus & Books',
    label: 'Deming Philosophy & Out of the Crisis',
    prompt: 'Summarize W. Edwards Deming philosophy from "Out of the Crisis", focusing on Systemic Variation (Common vs Special Causes), the PDCA cycle, and why mass inspection fails.',
    mode: 'deep',
    difficulty: 'Advanced'
  },
  {
    category: 'Emerging AI & Digital Twins',
    label: 'AI-Based Predictive Quality',
    prompt: 'Discuss AI-based predictive quality and machine vision defect detection at an expert research level. How do deep neural networks and digital twins detect anomalies before scrap is produced?',
    mode: 'deep',
    difficulty: 'Expert / Research Level'
  },
  {
    category: 'Manufacturing Quality',
    label: 'Welding HICC & Microstructural Control',
    prompt: 'Explain Hydrogen-Induced Cold Cracking (HICC) in high-strength structural steel welds: root causes, diffusible hydrogen thresholds, preheat calculation, and NDT detection.',
    mode: 'deep',
    difficulty: 'Advanced'
  }
];

export const AIMentorPage: React.FC<AIMentorPageProps> = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('qovyra_mentor_messages_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      {
        id: 'msg-welcome',
        role: 'model',
        content: `### Welcome to the QOVYRA AI Quality Mentor

I am your universal engineering intelligence engine dedicated to **Quality Engineering**, **Industrial Metrology**, **Statistical Quality Control (SPC)**, **Total Quality Management (TQM)**, and **Smart Cyber-Physical Manufacturing**.

Ask me any open-ended engineering question across:
- **Foundations & Gurus**: *TQM, Deming 14 points, Juran Trilogy, Taguchi Loss Function, Crosby Zero Defects, Ishikawa 7 QC Tools*
- **Statistical Quality Control**: *Cp, Cpk, Pp, Ppk, Shewhart X-bar/R/S/p/np/c/u charts, ANOVA, Weibull life modeling, AQL sampling*
- **Methods & Standards**: *AIAG-VDA FMEA, 8D Root Cause, 5-Why, CAPA, DMAIC, ISO 9001:2015, IATF 16949, AS9100D, ISO 17025*
- **Manufacturing & Inspection**: *Casting porosity, weld cold laps, machining chatter, CMM GD&T, NDT (PAUT, RT, MPI), AI machine vision*
- **Education & Research**: *GATE Industrial & Production, ESE Mechanical, NPTEL course topics, textbook chapters, numerical proofs*

Select **⚡ Quick Mode** for rapid answers or **🔬 Deep Mode** for comprehensive mathematical derivations, and select your difficulty level above.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        difficulty: 'Intermediate'
      }
    ];
  });

  const [inputPrompt, setInputPrompt] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Intermediate');
  const [mode, setMode] = useState<'quick' | 'deep'>('quick');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [activeModel, setActiveModel] = useState<string>('gemini-3.1-flash-lite');

  // Document grounding / RAG input context
  const [showDocDrawer, setShowDocDrawer] = useState(false);
  const [referenceContext, setReferenceContext] = useState('');

  // Error & Retry state
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastFailedPrompt, setLastFailedPrompt] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Save conversation to localStorage
  useEffect(() => {
    localStorage.setItem('qovyra_mentor_messages_v2', JSON.stringify(messages));
  }, [messages]);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Check speech recognition support
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputPrompt((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!speechSupported || !recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Speech recognition error:', err);
      }
    }
  };

  // Stop Generation
  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
  };

  // Main Stream Sender
  const handleSendMessage = async (textToSend?: string) => {
    const prompt = (textToSend || inputPrompt).trim();
    if (!prompt || isLoading) return;

    setInputPrompt('');
    setErrorMessage(null);
    setLastFailedPrompt(null);

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      difficulty,
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setIsLoading(true);

    const botMessageId = `bot-${Date.now()}`;
    const initialBotMessage: ChatMessage = {
      id: botMessageId,
      role: 'model',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      difficulty,
    };

    setMessages([...newHistory, initialBotMessage]);

    // Setup AbortController
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch('/api/mentor/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: prompt,
          difficulty,
          mode,
          referenceContext: referenceContext.trim(),
          history: newHistory.slice(-6).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.details || errorData.error || `HTTP ${response.status}: Server connection error`);
      }

      if (!response.body) {
        throw new Error('ReadableStream not supported by browser');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedContent = '';
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const dataStr = trimmed.slice(5).trim();

          if (dataStr === '[DONE]') {
            break;
          }

          try {
            const data = JSON.parse(dataStr);
            if (data.type === 'start' && data.model) {
              setActiveModel(data.model);
            } else if (data.type === 'chunk' && data.text) {
              streamedContent += data.text;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === botMessageId ? { ...m, content: streamedContent } : m
                )
              );
            } else if (data.type === 'error') {
              throw new Error(data.error || 'Stream encountered an error');
            }
          } catch (e: any) {
            // Ignore non-json or incomplete frames
            if (e.message && e.message.includes('Stream encountered')) {
              throw e;
            }
          }
        }
      }

      if (!streamedContent) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMessageId
              ? { ...m, content: 'Analysis completed with no output returned.' }
              : m
          )
        );
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // User stopped generation manually
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMessageId
              ? { ...m, content: (m.content || '') + '\n\n*(Generation stopped by user)*' }
              : m
          )
        );
      } else {
        console.error('AI Mentor Stream Error:', err);
        setLastFailedPrompt(prompt);
        const errorText = `**QOVYRA Intelligence Service Notice:**\n\n${
          err.message || 'Unable to communicate with the intelligence engine.'
        }\n\n*Please verify that the Default Gemini Key secret is accessible or click "Retry Question" below.*`;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMessageId
              ? { ...m, content: errorText, isError: true }
              : m
          )
        );
        setErrorMessage(err.message || 'Streaming failed');
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRegenerate = () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMsg) {
      handleSendMessage(lastUserMsg.content);
    }
  };

  const handleNewConversation = () => {
    if (messages.length <= 1 || window.confirm('Start a new conversation session?')) {
      handleStopGeneration();
      const freshMessage: ChatMessage = {
        id: `msg-fresh-${Date.now()}`,
        role: 'model',
        content: `**New Conversation Started.**\n\nActive Mode: **${mode === 'quick' ? '⚡ Quick Mode' : '🔬 Deep Mode'}** | Technical Level: **${difficulty}**.\n\nAsk any question across Quality Engineering, SPC formulas, ISO standards, or industrial problem-solving:`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        difficulty,
      };
      setMessages([freshMessage]);
      localStorage.removeItem('qovyra_mentor_messages_v2');
      setReferenceContext('');
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Clear all conversation history with QOVYRA AI Quality Mentor?')) {
      handleStopGeneration();
      setMessages([
        {
          id: `msg-reset-${Date.now()}`,
          role: 'model',
          content: 'Conversation history cleared. Ready for your next Quality Engineering query.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          difficulty,
        },
      ]);
      localStorage.removeItem('qovyra_mentor_messages_v2');
      setReferenceContext('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pt-24 pb-16 flex flex-col">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col">
        {/* Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-5 border-b border-slate-800/80 gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 p-0.5 shadow-md shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-white tracking-wide font-mono">
                    QOVYRA AI Quality Mentor
                  </h1>
                  <span className="text-[10px] font-mono tracking-wider bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-800">
                    {activeModel}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Universal Intelligence for Quality Engineering, Statistical Control, Metrology & Standards
                </p>
              </div>
            </div>
          </div>

          {/* Controls: Mode Switcher, Depth Selector, New Conversation */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Quick vs Deep Mode */}
            <div className="glass-panel p-1 rounded-xl flex items-center border border-slate-800 shadow-inner">
              <button
                onClick={() => setMode('quick')}
                className={`px-3 py-1.5 text-xs rounded-lg flex items-center gap-1.5 transition-all btn-futuristic font-semibold ${
                  mode === 'quick'
                    ? 'glow-active-cyan font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
                title="Quick Mode: Fast definitions, direct answers, formula reference"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Quick Mode</span>
              </button>

              <button
                onClick={() => setMode('deep')}
                className={`px-3 py-1.5 text-xs rounded-lg flex items-center gap-1.5 transition-all btn-futuristic-violet font-semibold ${
                  mode === 'deep'
                    ? 'glow-active-violet font-bold shadow-md shadow-violet-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
                title="Deep Mode: Research depth, mathematical derivations, step-by-step calculations"
              >
                <Microscope className="w-3.5 h-3.5" />
                <span>Deep Mode</span>
              </button>
            </div>

            {/* Technical Depth Selector */}
            <div className="glass-panel p-1 rounded-xl flex items-center gap-1 border border-slate-800 shadow-inner">
              <Sliders className="w-3.5 h-3.5 text-cyan-400 ml-1.5" />
              <span className="text-[10px] text-slate-400 uppercase font-mono mr-1">Level:</span>
              {(['Beginner', 'Intermediate', 'Advanced', 'Expert / Research Level'] as DifficultyLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setDifficulty(lvl)}
                  className={`px-2.5 py-1 text-xs rounded-lg transition-all btn-futuristic ${
                    difficulty === lvl
                      ? 'glow-active-cyan font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {lvl === 'Expert / Research Level' ? 'Expert+' : lvl}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <button
              onClick={handleNewConversation}
              title="Start New Conversation"
              className="px-3 py-1.5 glass-panel rounded-xl text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 border border-slate-800 flex items-center gap-1.5 text-xs transition-all btn-futuristic active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline font-mono">New Session</span>
            </button>

            <button
              onClick={handleClearChat}
              title="Clear Conversation History"
              className="p-2 glass-panel rounded-xl text-slate-400 hover:text-rose-400 hover:border-rose-500/40 border border-slate-800 transition-all btn-futuristic active:scale-95"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Optional Document Attachment / RAG Excerpt Drawer */}
        <div className="pt-2">
          <button
            onClick={() => setShowDocDrawer(!showDocDrawer)}
            className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
          >
            <Paperclip className="w-3.5 h-3.5" />
            <span>{showDocDrawer ? 'Hide Grounding Document / Notes Drawer' : '+ Attach Reference Document / Textbook Excerpt / Standard Excerpt'}</span>
            {showDocDrawer ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {showDocDrawer && (
            <div className="mt-2 p-3.5 rounded-2xl glass-panel border border-slate-700/80 space-y-2 animate-in fade-in duration-150">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-cyan-300 font-semibold flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Grounding Reference Material (RAG Context)
                </span>
                {referenceContext && (
                  <button
                    onClick={() => setReferenceContext('')}
                    className="text-[10px] text-slate-400 hover:text-rose-400 font-mono"
                  >
                    Clear Text
                  </button>
                )}
              </div>
              <textarea
                rows={3}
                value={referenceContext}
                onChange={(e) => setReferenceContext(e.target.value)}
                placeholder="Paste course notes, NPTEL lecture transcription, ISO clause excerpt, or textbook section to ground the AI Quality Mentor's responses directly in your material..."
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
              />
              <div className="text-[10px] text-slate-500 font-mono">
                When provided, QOVYRA will verify its responses against this document and cite relevant passages.
              </div>
            </div>
          )}
        </div>

        {/* Error / Retry Bar */}
        {errorMessage && lastFailedPrompt && (
          <div className="my-2 p-3.5 rounded-2xl bg-rose-950/60 border border-rose-700 flex items-center justify-between text-xs text-rose-200 font-mono animate-in fade-in">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Generation failed: {errorMessage}</span>
            </div>
            <button
              onClick={() => handleSendMessage(lastFailedPrompt)}
              className="px-3 py-1 rounded-lg bg-rose-500 text-slate-950 font-bold hover:bg-rose-400 transition-colors"
            >
              Retry Question
            </button>
          </div>
        )}

        {/* Conversation View Container */}
        <div className="flex-1 overflow-y-auto py-5 space-y-5 min-h-[440px] max-h-[620px] pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-1 shadow-md">
                  <Bot className="w-4 h-4 text-cyan-400" />
                </div>
              )}

              <div
                className={`max-w-2xl sm:max-w-3xl rounded-2xl p-4 sm:p-5 shadow-lg ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border border-cyan-400/30'
                    : msg.isError
                    ? 'bg-rose-950/40 border border-rose-800/80 text-rose-200'
                    : 'glass-panel border border-slate-800/90 text-slate-200'
                }`}
              >
                {/* Message Header */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800/60 pb-2 mb-3">
                  <span className={msg.role === 'user' ? 'text-cyan-100 font-semibold' : 'text-cyan-400 font-semibold'}>
                    {msg.role === 'user' ? 'Quality Engineer' : 'QOVYRA AI Quality Mentor'}
                  </span>
                  <div className="flex items-center gap-2">
                    {msg.difficulty && (
                      <span className="text-[10px] bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700 text-slate-300">
                        {msg.difficulty}
                      </span>
                    )}
                    <span>{msg.timestamp}</span>
                  </div>
                </div>

                {/* Formatted Message Content with KaTeX and Markdown */}
                <div className="font-sans selection:bg-cyan-500/30">
                  {msg.role === 'model' ? (
                    <MathMarkdown
                      content={msg.content || (isLoading ? 'Analyzing engineering fundamentals and computing solutions...' : '')}
                      isStreaming={isLoading && msg.id === messages[messages.length - 1]?.id}
                    />
                  ) : (
                    <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  )}
                </div>

                {/* Message Footer Controls */}
                {msg.role === 'model' && !msg.isError && msg.content && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs">
                    <span className="text-[10px] font-mono text-cyan-400/80 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      Validated Quality Engineering Output
                    </span>
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900/90 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 border border-slate-800 flex items-center gap-1.5 transition-all font-mono text-[11px] btn-futuristic active:scale-95"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Formula & Text Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Answer</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Real-time Streaming Pulse Indicator */}
          {isLoading && (
            <div className="flex items-center gap-2.5 text-xs font-mono text-cyan-300 pl-11 animate-in fade-in duration-150">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
              <span className="bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800/80 shadow-sm shadow-cyan-500/10">
                Streaming live intelligence from <strong className="text-cyan-200">{activeModel}</strong>...
              </span>
              <button
                onClick={handleStopGeneration}
                className="ml-2 px-2.5 py-1 rounded-lg bg-rose-950/90 border border-rose-600/70 text-rose-300 hover:bg-rose-900 flex items-center gap-1.5 transition-all btn-futuristic shadow-sm shadow-rose-500/20 active:scale-95"
              >
                <Square className="w-2.5 h-2.5 fill-rose-300" />
                <span>Stop Generation</span>
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Universal Suggested Queries Across Disciplines */}
        <div className="pt-2 pb-3">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Universal Quality Engineering Scenarios:</span>
            </span>
            <span className="text-[10px] text-slate-500 font-sans">Tap any scenario to compute instantly</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {UNIVERSAL_SUGGESTIONS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setMode(item.mode);
                  setDifficulty(item.difficulty);
                  handleSendMessage(item.prompt);
                }}
                disabled={isLoading}
                className="p-3 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/50 text-left transition-all group disabled:opacity-50 card-futuristic-interactive btn-futuristic shadow-sm hover:shadow-cyan-500/10"
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="text-cyan-400 font-semibold truncate group-hover:text-cyan-300">{item.category}</span>
                  <span className="text-slate-500 px-1 py-0.2 bg-slate-950 rounded border border-slate-800">{item.mode === 'quick' ? '⚡' : '🔬'}</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-200 group-hover:text-white truncate">
                  {item.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Question Input Bar */}
        <div className="relative pt-2">
          <div className="glass-panel-glow p-2 rounded-2xl border border-slate-700/80 focus-within:border-cyan-400 focus-within:shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all flex items-end gap-2">
            <textarea
              ref={textareaRef}
              rows={2}
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask any open-ended Quality Engineering question (e.g. 'Derive Weibull reliability function', 'Calculate Cpk', 'Compare DFMEA vs PFMEA', 'Summarize Deming 14 points')..."
              className="w-full bg-transparent border-0 text-slate-100 text-xs sm:text-sm placeholder-slate-500 focus:ring-0 resize-none p-2 focus:outline-none"
            />

            <div className="flex items-center gap-2 pb-1 pr-1 shrink-0">
              {speechSupported && (
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  title={isListening ? 'Stop recording voice' : 'Voice input'}
                  className={`p-2.5 rounded-xl border transition-all btn-futuristic ${
                    isListening
                      ? 'bg-rose-500 text-white border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.5)] animate-pulse'
                      : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              )}

              {isLoading ? (
                <button
                  type="button"
                  onClick={handleStopGeneration}
                  title="Stop Generating"
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-rose-500/30 btn-futuristic active:scale-95"
                >
                  <Square className="w-3.5 h-3.5 fill-white" />
                  <span>Stop</span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleRegenerate}
                    title="Regenerate Last Answer"
                    disabled={messages.length <= 1}
                    className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 disabled:opacity-40 transition-all btn-futuristic active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={!inputPrompt.trim()}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider disabled:opacity-40 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 btn-futuristic active:scale-95"
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Mode: {mode === 'quick' ? '⚡ Quick Stream' : '🔬 Deep Technical Analysis'} • Level: {difficulty}</span>
            </span>
            <span className="hidden sm:inline">Context-aware multi-turn engineering session active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
