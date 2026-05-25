import React, { useState, useEffect } from 'react';
import { Menu, X, Landmark, Globe2, ChevronRight } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, params?: any) => void;
  language: 'CN' | 'EN';
  setLanguage: (lang: 'CN' | 'EN') => void;
}

export default function Navbar({ currentPage, onNavigate, language, setLanguage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pages with a dark hero banner at the very top benefit from a transparent menu initially for seamless overlaying.
  const hasDarkHero = currentPage === 'home' || currentPage === 'tech' || currentPage === 'about';
  const displayScrolled = scrolled || !hasDarkHero;

  const handleLinkClick = (page: string, e: React.MouseEvent, params?: any) => {
    e.preventDefault();
    onNavigate(page, params);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <header
      id="header"
      className={`fixed w-full top-0 z-[100] transition-all duration-500 ${
        displayScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#" onClick={(e) => handleLinkClick('home', e)} className="flex items-center z-50">
          <img
            src="https://img-reg-ab.imagency.cn/e/eba0d9454fb1aeaa74d4b3276669c01c.png"
            alt="ALTULA Logo"
            className={`h-6 md:h-7 w-auto object-contain drop-shadow-sm transition-all duration-500`}
            style={{ filter: displayScrolled ? 'none' : 'brightness(0) invert(1)' }}
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex lg:gap-5 xl:gap-7 items-center">
          <a
            href="#"
            onClick={(e) => handleLinkClick('home', e)}
            className={`text-sm font-medium transition-colors tracking-wide ${
              currentPage === 'home'
                ? 'text-brand-gold'
                : displayScrolled
                ? 'text-brand-dark hover:text-brand-gold'
                : 'text-white hover:text-brand-gold'
            }`}
          >
            {language === 'CN' ? '首页' : 'Home'}
          </a>
          <a
            href="#"
            onClick={(e) => handleLinkClick('products', e)}
            className={`text-sm font-medium transition-colors tracking-wide ${
              currentPage === 'products' || currentPage === 'product-detail'
                ? 'text-brand-gold'
                : displayScrolled
                ? 'text-brand-dark hover:text-brand-gold'
                : 'text-white hover:text-brand-gold'
            }`}
          >
            {language === 'CN' ? '产品' : 'Products'}
          </a>
          <a
            href="#"
            onClick={(e) => handleLinkClick('cases', e)}
            className={`text-sm font-medium transition-colors tracking-wide ${
              currentPage === 'cases' || currentPage === 'case-detail'
                ? 'text-brand-gold'
                : displayScrolled
                ? 'text-brand-dark hover:text-brand-gold'
                : 'text-white hover:text-brand-gold'
            }`}
          >
            {language === 'CN' ? '应用' : 'Applications'}
          </a>
          <a
            href="#"
            onClick={(e) => handleLinkClick('tech', e)}
            className={`text-sm font-medium transition-colors tracking-wide ${
              currentPage === 'tech'
                ? 'text-brand-gold'
                : displayScrolled
                ? 'text-brand-dark hover:text-brand-gold'
                : 'text-white hover:text-brand-gold'
            }`}
          >
            {language === 'CN' ? '技术' : 'Technology'}
          </a>
          <a
            href="#"
            onClick={(e) => handleLinkClick('about', e)}
            className={`text-sm font-medium transition-colors tracking-wide ${
              currentPage === 'about'
                ? 'text-brand-gold'
                : displayScrolled
                ? 'text-brand-dark hover:text-brand-gold'
                : 'text-white hover:text-brand-gold'
            }`}
          >
            {language === 'CN' ? '关于ALTULA' : 'About Us'}
          </a>
          <a
            href="#"
            onClick={(e) => handleLinkClick('news', e)}
            className={`text-sm font-medium transition-colors tracking-wide ${
              currentPage === 'news' || currentPage === 'news-detail'
                ? 'text-brand-gold'
                : displayScrolled
                ? 'text-brand-dark hover:text-brand-gold'
                : 'text-white hover:text-brand-gold'
            }`}
          >
            {language === 'CN' ? '资讯' : 'News'}
          </a>
          <a
            href="#"
            onClick={(e) => handleLinkClick('contact', e)}
            className={`text-sm font-medium transition-colors tracking-wide ${
              currentPage === 'contact'
                ? 'text-brand-gold'
                : displayScrolled
                ? 'text-brand-dark hover:text-brand-gold'
                : 'text-white hover:text-brand-gold'
            }`}
          >
            {language === 'CN' ? '联系' : 'Contact'}
          </a>

          {/* Divider */}
          <div
            className={`h-4 w-px mx-2 transition-colors duration-500 ${
              displayScrolled ? 'bg-gray-200' : 'bg-white/30'
            }`}
          ></div>

          {/* Language selection */}
          <div className="flex gap-2 text-xs font-semibold tracking-wider">
            <button
              onClick={() => setLanguage('CN')}
              className={`transition-colors py-1 px-1.5 rounded ${
                language === 'CN'
                  ? 'text-brand-gold font-bold'
                  : displayScrolled
                  ? 'text-brand-gray hover:text-brand-dark'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              CN
            </button>
            <span className={displayScrolled ? 'text-gray-300' : 'text-white/40'}>/</span>
            <button
              onClick={() => setLanguage('EN')}
              className={`transition-colors py-1 px-1.5 rounded ${
                language === 'EN'
                  ? 'text-brand-gold font-bold'
                  : displayScrolled
                  ? 'text-brand-gray hover:text-brand-dark'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          <a
            href="#"
            onClick={(e) => handleLinkClick('configurator', e)}
            className={`text-xs font-semibold border px-5 py-2.5 rounded-full transition-all tracking-wider ${
              displayScrolled
                ? 'text-brand-dark border-brand-dark hover:bg-brand-dark hover:text-white'
                : 'text-white border-white/60 hover:bg-white hover:text-brand-dark hover:border-white'
            }`}
          >
            {language === 'CN' ? '配置方案' : 'Configure Plan'}
          </a>
        </nav>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden z-50 focus:outline-none transition-colors"
          style={{ color: displayScrolled || mobileMenuOpen ? '#16181A' : '#FFFFFF' }}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 bg-white z-40 flex flex-col justify-center items-center transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-6 text-center">
          <a
            href="#"
            onClick={(e) => handleLinkClick('home', e)}
            className="text-2xl font-light text-brand-dark hover:text-brand-gold transition-colors"
          >
            {language === 'CN' ? '首页' : 'Home'}
          </a>
          <a
            href="#"
            onClick={(e) => handleLinkClick('products', e)}
            className="text-2xl font-light text-brand-dark hover:text-brand-gold transition-colors"
          >
            {language === 'CN' ? '产品系列' : 'Products'}
          </a>
          <a
            href="#"
            onClick={(e) => handleLinkClick('cases', e)}
            className="text-2xl font-light text-brand-dark hover:text-brand-gold transition-colors"
          >
            {language === 'CN' ? '应用案例' : 'Applications'}
          </a>
          <a
            href="#"
            onClick={(e) => handleLinkClick('tech', e)}
            className="text-2xl font-light text-brand-dark hover:text-brand-gold transition-colors"
          >
            {language === 'CN' ? '特色技术' : 'Technology'}
          </a>
          <a
            href="#"
            onClick={(e) => handleLinkClick('about', e)}
            className="text-2xl font-light text-brand-dark hover:text-brand-gold transition-colors"
          >
            {language === 'CN' ? '关于ALTULA' : 'About Us'}
          </a>
          <a
            href="#"
            onClick={(e) => handleLinkClick('news', e)}
            className="text-2xl font-light text-brand-dark hover:text-brand-gold transition-colors"
          >
            {language === 'CN' ? '资讯中心' : 'News'}
          </a>
          <a
            href="#"
            onClick={(e) => handleLinkClick('contact', e)}
            className="text-2xl font-light text-brand-dark hover:text-brand-gold transition-colors"
          >
            {language === 'CN' ? '联系我们' : 'Contact Us'}
          </a>
          <div className="h-px w-24 bg-gray-200 my-2 mx-auto"></div>
          <a
            href="#"
            onClick={(e) => handleLinkClick('configurator', e)}
            className="text-2xl font-normal text-brand-gold hover:text-amber-600 transition-colors"
          >
            {language === 'CN' ? '在线选配方案' : 'Configure Online'}
          </a>
          <div className="flex gap-4 justify-center mt-4 text-xs font-semibold tracking-wider text-gray-400">
            <button
              onClick={() => {
                setLanguage('CN');
                setMobileMenuOpen(false);
              }}
              className={language === 'CN' ? 'text-brand-gold underline' : ''}
            >
              中文 (CN)
            </button>
            <span>/</span>
            <button
              onClick={() => {
                setLanguage('EN');
                setMobileMenuOpen(false);
              }}
              className={language === 'EN' ? 'text-brand-gold underline' : ''}
            >
              English (EN)
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
