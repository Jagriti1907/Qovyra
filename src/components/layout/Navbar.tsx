import React, { useState, useEffect } from 'react';
import { PageId } from '../../types';
import {
  Cpu,
  Bot,
  Box,
  Layers,
  Wrench,
  Activity,
  BookOpen,
  Award,
  Building2,
  LayoutDashboard,
  Info,
  Mail,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenAuthModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenAuthModal
}) => {
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setPlatformDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const platformPages: { id: PageId; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'factory',
      label: '3D Virtual Factory',
      desc: 'Interactive 8-zone manufacturing plant & machine telemetry',
      icon: <Box className="w-4 h-4 text-cyan-400" />,
    },
    {
      id: 'defects',
      label: 'Defect Intelligence',
      desc: '12-category metallurgical & manufacturing defect library',
      icon: <Layers className="w-4 h-4 text-amber-400" />,
    },
    {
      id: 'toolkit',
      label: 'Quality Toolkit',
      desc: 'FMEA, Pareto, Fishbone, SPC, Cpk & 8D interactive calculators',
      icon: <Wrench className="w-4 h-4 text-emerald-400" />,
    },
    {
      id: 'digital-twin',
      label: 'Digital Twin Simulator',
      desc: 'Real-time production line simulation with fault injection',
      icon: <Activity className="w-4 h-4 text-violet-400" />,
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-3'
          : 'bg-gradient-to-b from-slate-950/95 via-slate-950/70 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Wordmark */}
          <div
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-wider text-white font-mono">
                  QOVYRA
                </span>
                <span className="text-[10px] font-mono tracking-widest bg-cyan-950/90 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-800/80 font-bold">
                  QE·AI
                </span>
              </div>
              <div className="text-[10px] text-slate-400 tracking-wider hidden sm:block">
                Redefining Quality Through Intelligence
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => handleNav('home')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all btn-futuristic ${
                currentPage === 'home'
                  ? 'glow-active-cyan font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Home
            </button>

            {/* Platform Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPlatformDropdownOpen(!platformDropdownOpen)}
                onMouseEnter={() => setPlatformDropdownOpen(true)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all btn-futuristic ${
                  ['factory', 'defects', 'toolkit', 'digital-twin'].includes(currentPage)
                    ? 'glow-active-cyan font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <span>Platform</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${platformDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {platformDropdownOpen && (
                <div
                  onMouseLeave={() => setPlatformDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-80 rounded-2xl glass-panel-glow p-2 shadow-2xl border border-cyan-500/40 z-50 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-xl"
                >
                  <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 px-3 py-1.5 font-bold">
                    Engineering Ecosystem
                  </div>
                  {platformPages.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.id)}
                      className={`w-full text-left p-2.5 rounded-xl flex items-start gap-3 transition-all btn-futuristic ${
                        currentPage === item.id
                          ? 'glow-active-cyan text-white'
                          : 'hover:bg-slate-900/80 text-slate-300 hover:text-white hover:border-cyan-500/30'
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs font-semibold">{item.label}</div>
                        <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{item.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* AI Quality Mentor */}
            <button
              onClick={() => handleNav('mentor')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all btn-futuristic ${
                currentPage === 'mentor'
                  ? 'glow-active-cyan font-bold shadow-md shadow-cyan-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI Quality Mentor</span>
            </button>

            {/* Learning Hub */}
            <button
              onClick={() => handleNav('learning')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all btn-futuristic ${
                currentPage === 'learning'
                  ? 'glow-active-cyan font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>Learning Hub</span>
            </button>

            {/* Challenge Arena */}
            <button
              onClick={() => handleNav('challenges')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all btn-futuristic ${
                currentPage === 'challenges'
                  ? 'glow-active-cyan font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Challenge Arena</span>
            </button>

            {/* Industry Solutions */}
            <button
              onClick={() => handleNav('industries')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all btn-futuristic ${
                currentPage === 'industries'
                  ? 'glow-active-cyan font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Industries</span>
            </button>

            {/* Dashboard */}
            <button
              onClick={() => handleNav('dashboard')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all btn-futuristic ${
                currentPage === 'dashboard'
                  ? 'glow-active-cyan font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-violet-400" />
              <span>Dashboard</span>
            </button>

            {/* About */}
            <button
              onClick={() => handleNav('about')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all btn-futuristic ${
                currentPage === 'about'
                  ? 'glow-active-cyan font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              About
            </button>

            {/* Contact */}
            <button
              onClick={() => handleNav('contact')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all btn-futuristic ${
                currentPage === 'contact'
                  ? 'glow-active-cyan font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action: Get Started / Role Switcher */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNav('dashboard')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-extrabold tracking-wide shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 transition-all flex items-center gap-2 cursor-pointer btn-futuristic active:scale-95"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => handleNav('dashboard')}
              className="px-2.5 py-1.5 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold"
            >
              Demo
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-2xl glass-panel border border-slate-800 shadow-2xl space-y-2 animate-in fade-in duration-200">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleNav('home')}
                className={`p-2.5 rounded-xl text-left flex items-center gap-2 ${
                  currentPage === 'home' ? 'bg-cyan-950 text-cyan-300' : 'bg-slate-900/70 text-slate-200'
                }`}
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Home</span>
              </button>
              <button
                onClick={() => handleNav('mentor')}
                className={`p-2.5 rounded-xl text-left flex items-center gap-2 ${
                  currentPage === 'mentor' ? 'bg-cyan-950 text-cyan-300' : 'bg-slate-900/70 text-slate-200'
                }`}
              >
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>AI Mentor</span>
              </button>
              <button
                onClick={() => handleNav('factory')}
                className={`p-2.5 rounded-xl text-left flex items-center gap-2 ${
                  currentPage === 'factory' ? 'bg-cyan-950 text-cyan-300' : 'bg-slate-900/70 text-slate-200'
                }`}
              >
                <Box className="w-4 h-4 text-cyan-400" />
                <span>3D Factory</span>
              </button>
              <button
                onClick={() => handleNav('defects')}
                className={`p-2.5 rounded-xl text-left flex items-center gap-2 ${
                  currentPage === 'defects' ? 'bg-cyan-950 text-cyan-300' : 'bg-slate-900/70 text-slate-200'
                }`}
              >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Defects</span>
              </button>
              <button
                onClick={() => handleNav('toolkit')}
                className={`p-2.5 rounded-xl text-left flex items-center gap-2 ${
                  currentPage === 'toolkit' ? 'bg-cyan-950 text-cyan-300' : 'bg-slate-900/70 text-slate-200'
                }`}
              >
                <Wrench className="w-4 h-4 text-emerald-400" />
                <span>QE Toolkit</span>
              </button>
              <button
                onClick={() => handleNav('digital-twin')}
                className={`p-2.5 rounded-xl text-left flex items-center gap-2 ${
                  currentPage === 'digital-twin' ? 'bg-cyan-950 text-cyan-300' : 'bg-slate-900/70 text-slate-200'
                }`}
              >
                <Activity className="w-4 h-4 text-violet-400" />
                <span>Digital Twin</span>
              </button>
              <button
                onClick={() => handleNav('learning')}
                className={`p-2.5 rounded-xl text-left flex items-center gap-2 ${
                  currentPage === 'learning' ? 'bg-cyan-950 text-cyan-300' : 'bg-slate-900/70 text-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span>Learning Hub</span>
              </button>
              <button
                onClick={() => handleNav('challenges')}
                className={`p-2.5 rounded-xl text-left flex items-center gap-2 ${
                  currentPage === 'challenges' ? 'bg-cyan-950 text-cyan-300' : 'bg-slate-900/70 text-slate-200'
                }`}
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Challenges</span>
              </button>
              <button
                onClick={() => handleNav('industries')}
                className={`p-2.5 rounded-xl text-left flex items-center gap-2 ${
                  currentPage === 'industries' ? 'bg-cyan-950 text-cyan-300' : 'bg-slate-900/70 text-slate-200'
                }`}
              >
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span>Industries</span>
              </button>
              <button
                onClick={() => handleNav('dashboard')}
                className={`p-2.5 rounded-xl text-left flex items-center gap-2 ${
                  currentPage === 'dashboard' ? 'bg-cyan-950 text-cyan-300' : 'bg-slate-900/70 text-slate-200'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-violet-400" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => handleNav('about')}
                className={`p-2.5 rounded-xl text-left flex items-center gap-2 ${
                  currentPage === 'about' ? 'bg-cyan-950 text-cyan-300' : 'bg-slate-900/70 text-slate-200'
                }`}
              >
                <Info className="w-4 h-4 text-slate-400" />
                <span>About</span>
              </button>
              <button
                onClick={() => handleNav('contact')}
                className={`p-2.5 rounded-xl text-left flex items-center gap-2 ${
                  currentPage === 'contact' ? 'bg-cyan-950 text-cyan-300' : 'bg-slate-900/70 text-slate-200'
                }`}
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Contact</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
