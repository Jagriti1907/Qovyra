import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { AIMentorPage } from './pages/AIMentorPage';
import { VirtualFactoryPage } from './pages/VirtualFactoryPage';
import { DefectIntelligencePage } from './pages/DefectIntelligencePage';
import { ToolkitPage } from './pages/ToolkitPage';
import { DigitalTwinPage } from './pages/DigitalTwinPage';
import { LearningHubPage } from './pages/LearningHubPage';
import { ChallengeArenaPage } from './pages/ChallengeArenaPage';
import { IndustrySolutionsPage } from './pages/IndustrySolutionsPage';
import { DashboardPage } from './pages/DashboardPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  // Sync state with URL hash
  const getInitialPage = (): PageId => {
    const hash = window.location.hash.replace('#', '') as PageId;
    const validPages: PageId[] = [
      'home',
      'mentor',
      'factory',
      'defects',
      'toolkit',
      'digital-twin',
      'learning',
      'challenges',
      'industries',
      'dashboard',
      'about',
      'contact'
    ];
    return validPages.includes(hash) ? hash : 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);

  // Sync hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (hash && hash !== currentPage) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage]);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Global Navigation Bar */}
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Dynamic Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}
        {currentPage === 'mentor' && <AIMentorPage />}
        {currentPage === 'factory' && <VirtualFactoryPage />}
        {currentPage === 'defects' && <DefectIntelligencePage />}
        {currentPage === 'toolkit' && <ToolkitPage />}
        {currentPage === 'digital-twin' && <DigitalTwinPage />}
        {currentPage === 'learning' && <LearningHubPage />}
        {currentPage === 'challenges' && <ChallengeArenaPage />}
        {currentPage === 'industries' && <IndustrySolutionsPage />}
        {currentPage === 'dashboard' && <DashboardPage onNavigate={navigateTo} />}
        {currentPage === 'about' && <AboutPage onNavigate={navigateTo} />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
