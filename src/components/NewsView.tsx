import React, { useState } from 'react';
import { Calendar, ArrowRight, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { newsData } from '../data';

interface NewsViewProps {
  onNavigate: (page: string, params?: any) => void;
  language: 'CN' | 'EN';
}

export default function NewsView({ onNavigate, language }: NewsViewProps) {
  // Category filter state
  const [selectedCat, setSelectedCat] = useState<string>('all');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  const filteredNews = newsData.filter((item) => {
    if (selectedCat === 'all') return true;
    return item.category === selectedCat;
  });

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'brand':
        return language === 'CN' ? '品牌新闻' : 'Brand';
      case 'industry':
        return language === 'CN' ? '行业动态' : 'Industry';
      case 'tech':
        return language === 'CN' ? '技术分享' : 'Patents';
      default:
        return language === 'CN' ? '未知' : 'Misc';
    }
  };

  const handleCatChange = (cat: string) => {
    setSelectedCat(cat);
    setCurrentPage(1);
  };

  // Pagination calculations
  const totalItems = filteredNews.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="pt-28 pb-12 bg-brand-light min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="border-b border-gray-200 pb-10 mb-12">
          <span className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
            {language === 'CN' ? '洞悉行业与技术浪潮' : 'ALTULA MEDIA INTELLIGENCE'}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tight mb-4">
            {language === 'CN' ? '资讯中心' : 'News & Knowledge'}
          </h1>
          <p className="text-gray-500 font-light text-base md:text-lg max-w-2xl leading-relaxed">
            {language === 'CN'
              ? '获取 ALTULA 的最新科研公告、核心高品质地标落地报道、以及对全球灵活功能建筑的行业见地。'
              : 'Keep pace with core structural patents, project launches and macro academic reports.'}
          </p>
        </div>

        {/* Categories Tab selector */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {[
            { value: 'all', label: language === 'CN' ? '全部资讯' : 'All Articles' },
            { value: 'brand', label: language === 'CN' ? '品牌新闻' : 'Brand Announcements' },
            { value: 'industry', label: language === 'CN' ? '行业动态' : 'Industry Analysis' },
            { value: 'tech', label: language === 'CN' ? '技术分享' : 'Technical Columns' }
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCatChange(cat.value)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCat === cat.value
                  ? 'bg-brand-dark text-white shadow-md'
                  : 'bg-white text-gray-500 border border-gray-100 hover:border-gray-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* News Cards Grid List (3 Columns layout on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paginatedNews.map((news) => (
            <div
              key={news.id}
              onClick={() => onNavigate('news-detail', { id: news.id })}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-luxury border border-gray-100/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Photo Header */}
                <div className="h-48 bg-gray-100 overflow-hidden relative">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-brand-dark/90 backdrop-blur-md text-[9px] text-white/95 font-bold uppercase py-1 px-3.5 rounded-full tracking-wider shadow-sm">
                    {getCategoryLabel(news.category)}
                  </div>
                </div>

                {/* Summaries content */}
                <div className="p-7">
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-light mb-4">
                    <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{news.date}</span>
                  </div>

                  <h3 className="font-bold text-brand-dark text-lg group-hover:text-brand-gold transition-colors line-clamp-2 tracking-tight leading-snug mb-4">
                    {news.title}
                  </h3>

                  <p className="text-gray-400 font-light text-xs line-clamp-3 leading-relaxed">
                    {news.summary}
                  </p>
                </div>
              </div>

              {/* Bottom Card Footer row */}
              <div className="px-7 pb-7 pt-4 border-t border-gray-50/80 flex items-center justify-between text-xs font-semibold text-brand-gold">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 animate-pulse" />
                  {language === 'CN' ? '阅读全文' : 'Read Full Editorial'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-16 pb-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2.5 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                currentPage === 1
                  ? 'opacity-40 cursor-not-allowed text-gray-400 border-gray-200'
                  : 'text-brand-dark bg-white border-gray-200 hover:bg-brand-dark hover:text-white hover:border-brand-dark'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-10 h-10 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  currentPage === pageNum
                    ? 'bg-brand-dark text-white shadow-md'
                    : 'bg-white text-gray-500 border border-gray-100 hover:border-gray-300'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2.5 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                currentPage === totalPages
                  ? 'opacity-40 cursor-not-allowed text-gray-400 border-gray-200'
                  : 'text-brand-dark bg-white border-gray-200 hover:bg-brand-dark hover:text-white hover:border-brand-dark'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
