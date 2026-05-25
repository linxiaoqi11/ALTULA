import React from 'react';
import { ArrowLeft, Calendar, User, Eye, Share2, Clipboard } from 'lucide-react';
import { newsData } from '../data';

interface NewsDetailViewProps {
  newsId: string;
  onNavigate: (page: string, params?: any) => void;
  language: 'CN' | 'EN';
}

export default function NewsDetailView({ newsId, onNavigate, language }: NewsDetailViewProps) {
  // Query targeted news
  const article = newsData.find((n) => n.id === newsId) || newsData[0];

  // Recommendations column (except current article)
  const otherReco = newsData.filter((n) => n.id !== article.id).slice(0, 3);

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'brand':
        return language === 'CN' ? '官方品牌新闻' : 'Brand';
      case 'industry':
        return language === 'CN' ? '空间行业分析' : 'Industry';
      case 'tech':
        return language === 'CN' ? '精密研发成果' : 'Technology';
      default:
        return language === 'CN' ? '资讯' : 'Media';
    }
  };

  // Helper to parse content blocks and split headings
  const textParagraphs = article.content.split('\n\n');

  return (
    <div className="pt-28 pb-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Back navigation */}
        <button
          onClick={() => onNavigate('news')}
          className="group flex items-center gap-2 text-xs font-semibold text-brand-gold hover:text-amber-700 transition-colors mb-10 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
          <span>{language === 'CN' ? '返回资讯中心' : 'Back to Articles'}</span>
        </button>

        {/* Article header display */}
        <div className="max-w-4xl mx-auto border-b border-gray-100 pb-10 mb-12">
          <span className="inline-block bg-brand-gold/15 text-brand-gold text-[10px] uppercase font-extrabold px-3 py-1 rounded-full mb-4 tracking-wider">
            {getCategoryLabel(article.category)}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-6 tracking-tight leading-snug">
            {article.title}
          </h1>

          <div className="flex flex-wrap gap-6 items-center text-xs text-gray-400 font-light">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-gold" />
              {language === 'CN' ? '发布时间：' : 'Published: '} {article.date}
            </span>
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-brand-gold" />
              {language === 'CN' ? 'ALTULA 空间编辑部' : 'ALTULA Editorial Unit'}
            </span>
          </div>
        </div>

        {/* Grid: main contents left, recommended columns right (lg:col-span-8 / 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Main article (lg:col-span-8) */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl overflow-hidden aspect-video bg-gray-50 mb-10 shadow-sm border border-gray-100">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            </div>

            {/* Inner text renders */}
            <div className="text-gray-600 font-light text-base leading-loose space-y-6">
              {textParagraphs.map((para, idx) => {
                // Check if segment is a sub-headline
                if (para.startsWith('**') && para.endsWith('**')) {
                  const headingText = para.replace(/\*\*/g, '');
                  return (
                    <h3 key={idx} className="text-xl font-bold text-brand-dark pt-4 pb-2">
                      {headingText}
                    </h3>
                  );
                }
                return (
                  <p key={idx} className="indent-8 text-justify">
                    {para}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Side Recommendations (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-brand-light p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="font-extrabold text-xs text-brand-dark uppercase tracking-widest mb-6 border-b border-gray-200 pb-4 flex items-center gap-2">
              <Share2 className="w-4.5 h-4.5 text-brand-gold" />
              {language === 'CN' ? '更多行业前沿动态' : 'Alternate Editorials'}
            </h4>

            <div className="space-y-6">
              {otherReco.map((re) => (
                <div
                  key={re.id}
                  onClick={() => {
                    onNavigate('news-detail', { id: re.id });
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="group cursor-pointer flex gap-4 items-start"
                >
                  <div className="w-20 h-16 rounded-lg overflow-hidden bg-gray-200 shrink-0 shadow-sm">
                    <img src={re.image} alt={re.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-brand-dark group-hover:text-brand-gold transition-colors line-clamp-2 leading-snug">
                      {re.title}
                    </h5>
                    <span className="text-[10px] text-gray-400 mt-1 block">{re.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
