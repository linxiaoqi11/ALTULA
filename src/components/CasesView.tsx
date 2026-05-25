import React, { useState } from 'react';
import { Landmark, ArrowRight, MapPin, Calendar, Layers, Eye } from 'lucide-react';
import { caseStudiesData } from '../data';

interface CasesViewProps {
  onNavigate: (page: string, params?: any) => void;
  language: 'CN' | 'EN';
}

export default function CasesView({ onNavigate, language }: CasesViewProps) {
  // Category state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Map category labels to keywords
  const categories = [
    { value: 'all', label: language === 'CN' ? '全部应用案例' : 'All Cases' },
    { value: 'corporate', label: language === 'CN' ? '商务办公空间' : 'Corporate Headquarters' },
    { value: 'education', label: language === 'CN' ? '学业教育空间' : 'Academic & Education' },
    { value: 'municipal', label: language === 'CN' ? '政务及多功能馆' : 'Municipal & Theatres' }
  ];

  const filteredCases = caseStudiesData.filter((cs) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'corporate') {
      return cs.tag.includes('企业') || cs.tag.includes('商用') || cs.tag.includes('学术研究') || cs.tag.includes('办公');
    }
    if (selectedCategory === 'education') {
      return cs.tag.includes('教育') || cs.tag.includes('学校') || cs.tag.includes('研学');
    }
    if (selectedCategory === 'municipal') {
      return cs.tag.includes('剧场') || cs.tag.includes('报告厅') || cs.tag.includes('政务') || cs.tag.includes('馆');
    }
    return true;
  });

  return (
    <div className="pt-28 pb-12 bg-brand-light min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="border-b border-gray-200 pb-10 mb-12">
          <span className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
            {language === 'CN' ? '鉴证流动空间的力量' : 'ALTULA GLOBAL FOOTPRINTS'}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tight mb-4">
            {language === 'CN' ? '应用案例' : 'Case Portfolio'}
          </h1>
          <p className="text-gray-500 font-light text-base md:text-lg max-w-3xl leading-relaxed">
            {language === 'CN'
              ? 'ALTULA 已无缝赋能全球数百个地标建筑。在这里，每一次对折收放，不仅解构了墙和台的物理边界，更见证着空间价值的数倍增长。'
              : 'Witness spatial fluidities. Check our masterworks implemented around the world.'}
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-brand-dark text-white shadow-md'
                  : 'bg-white text-gray-500 border border-gray-100 hover:border-gray-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cases Grid Render (2 Column Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredCases.map((cs) => (
            <div
              key={cs.id}
              onClick={() => onNavigate('case-detail', { id: cs.id })}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-luxury hover:shadow-2xl transition-all duration-500 border border-gray-100/40 flex flex-col justify-between"
            >
              {/* Photo Area */}
              <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                <img
                  src={cs.image}
                  alt={cs.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 to-transparent"></div>

                {/* Badges Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white z-20">
                  <span className="bg-brand-gold text-[9px] font-bold uppercase py-1 px-3 rounded-full tracking-wider shadow-sm">
                    {cs.tag}
                  </span>
                  <span className="text-[10px] font-medium flex items-center gap-1.5 drop-shadow">
                    <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                    {cs.location}
                  </span>
                </div>
              </div>

              {/* Text Area */}
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-brand-dark mb-3 group-hover:text-brand-gold transition-colors tracking-tight">
                    {cs.title}
                  </h3>
                  <p className="text-gray-500 font-light text-sm line-clamp-3 leading-relaxed mb-6">
                    {cs.description}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-6 flex justify-between items-center text-xs">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-brand-gold" />
                    {language === 'CN' ? '交付完工：' : 'Completed: '} {cs.date}
                  </span>
                  
                  <span className="font-bold text-brand-gold group-hover:underline flex items-center gap-1">
                    {language === 'CN' ? '查看案例特览' : 'Read Case Profile'}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick customization trigger underneath */}
        <div className="mt-28 bg-[#111315] text-white p-10 md:p-14 rounded-3xl relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-700/10 via-transparent to-transparent opacity-45"></div>
          <div className="relative z-10 max-w-xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-4">
              {language === 'CN' ? '让您的空间也拥有无限变化的能力' : 'Elevate Your Space Productivities'}
            </h3>
            <p className="text-gray-400 font-light text-xs md:text-sm mb-8 leading-relaxed">
              {language === 'CN'
                ? '线上配置方案，我们会核算结构承压，在24小时内为您出具一份 1v1 极简看台配置书。'
                : 'Formulate bespoke structural seating with expert layout architects.'}
            </p>
            <button
              onClick={() => onNavigate('configurator')}
              className="btn-gold px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer hover:scale-105 transition-transform"
            >
              {language === 'CN' ? '定制专属空间看台' : 'Configure Space Stands Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
