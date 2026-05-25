import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ProductsView from './components/ProductsView';
import DetailView from './components/DetailView';
import AboutView from './components/AboutView';
import ConfiguratorView from './components/ConfiguratorView';
import CasesView from './components/CasesView';
import CaseDetailView from './components/CaseDetailView';
import TechView from './components/TechView';
import NewsView from './components/NewsView';
import NewsDetailView from './components/NewsDetailView';
import ContactView from './components/ContactView';

export default function App() {
  const [page, setPage] = useState<string>('home');
  const [params, setParams] = useState<any>({});
  const [language, setLanguage] = useState<'CN' | 'EN'>('CN');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scrolling to display a "Back to Top" button for extreme usability
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (targetPage: string, targetParams: any = {}) => {
    setPage(targetPage);
    setParams(targetParams);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render view dispatcher
  const renderView = () => {
    switch (page) {
      case 'home':
        return <HomeView onNavigate={handleNavigate} language={language} />;
      case 'about':
        return <AboutView onNavigate={handleNavigate} language={language} />;
      case 'products':
        return <ProductsView onNavigate={handleNavigate} language={language} />;
      case 'product-detail':
        return (
          <DetailView
            productId={params.id || 'retractable'}
            onNavigate={handleNavigate}
            language={language}
          />
        );
      case 'configurator':
        return (
          <ConfiguratorView
            initialType={params.productType}
            onNavigate={handleNavigate}
            language={language}
          />
        );
      case 'cases':
        return <CasesView onNavigate={handleNavigate} language={language} />;
      case 'case-detail':
        return (
          <CaseDetailView
            caseId={params.id || 'maritime-museum'}
            onNavigate={handleNavigate}
            language={language}
          />
        );
      case 'tech':
        return <TechView onNavigate={handleNavigate} language={language} />;
      case 'news':
        return <NewsView onNavigate={handleNavigate} language={language} />;
      case 'news-detail':
        return (
          <NewsDetailView
            newsId={params.id}
            onNavigate={handleNavigate}
            language={language}
          />
        );
      case 'contact':
        return <ContactView onNavigate={handleNavigate} language={language} />;
      default:
        return <HomeView onNavigate={handleNavigate} language={language} />;
    }
  };

  return (
    <div className="relative font-sans antialiased text-brand-dark bg-brand-light">
      {/* Header and navigation, identical across all sub-views */}
      <Navbar
        currentPage={page}
        onNavigate={handleNavigate}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main content body dispatcher */}
      <main className="min-h-screen">
        {renderView()}
      </main>

      {/* Footer is perfectly identical across all nested sites */}
      <Footer onNavigate={handleNavigate} language={language} />

      {/* Extreme luxury: Scroll to top floating button */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-8 right-8 z-[90] w-12 h-12 rounded-full bg-brand-dark hover:bg-black text-white flex items-center justify-center transition-all duration-300 shadow-2xl scale-100 hover:scale-105 border border-brand-gold/20 cursor-pointer"
          title={language === 'CN' ? '返回顶部' : 'Scroll to top'}
        >
          <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7"></path>
          </svg>
        </button>
      )}
    </div>
  );
}
