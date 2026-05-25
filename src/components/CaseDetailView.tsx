import React from 'react';
import { ArrowLeft, MapPin, Calendar, Landmark, Settings, ChevronRight, HelpCircle, PhoneCall, ListRestart } from 'lucide-react';
import { caseStudiesData } from '../data';

interface CaseDetailViewProps {
  caseId: string;
  onNavigate: (page: string, params?: any) => void;
  language: 'CN' | 'EN';
}

export default function CaseDetailView({ caseId, onNavigate, language }: CaseDetailViewProps) {
  // Find target case
  const currentCase = caseStudiesData.find((c) => c.id === caseId) || caseStudiesData[0];

  // Pick other recommendations (all except current)
  const recommendedCases = caseStudiesData.filter((c) => c.id !== currentCase.id).slice(0, 3);

  return (
    <div className="pt-28 pb-12 bg-white min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Back Row */}
        <button
          onClick={() => onNavigate('cases')}
          className="group flex items-center gap-2 text-xs font-semibold text-brand-gold hover:text-amber-700 transition-colors mb-10 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
          <span>{language === 'CN' ? '返回所有案例' : 'Back to Case studies'}</span>
        </button>

        {/* Hero title area */}
        <div className="mb-12 border-b border-gray-100 pb-10">
          <span className="text-brand-gold uppercase tracking-widest text-[10px] font-extrabold mb-3.5 block">
            {currentCase.tag}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight mb-6 leading-tight">
            {currentCase.title}
          </h1>

          <div className="flex flex-wrap gap-x-8 gap-y-4 text-xs text-gray-400 font-light">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-gold" />
              {language === 'CN' ? '项目所属地点：' : 'Project Location: '} <strong className="text-brand-dark font-medium">{currentCase.location}</strong>
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-gold" />
              {language === 'CN' ? '完工时间段：' : 'Completed Date: '} <strong className="text-brand-dark font-medium">{currentCase.date}</strong>
            </span>
            <span className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-brand-gold" />
              {language === 'CN' ? '高定硬件配置：' : 'Hardware Configuration: '} <strong className="text-brand-dark font-medium">{currentCase.config}</strong>
            </span>
          </div>
        </div>

        {/* Photo Gallery cascade */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20 items-stretch">
          <div className="lg:col-span-8 bg-gray-50 rounded-3xl overflow-hidden aspect-[16/10] shadow-luxury">
            <img src={currentCase.image} alt={currentCase.title} className="w-full h-full object-cover" />
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between bg-brand-light p-8 rounded-3xl border border-gray-100">
            <div>
              <h4 className="font-extrabold text-sm text-brand-dark uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-gray-200 pb-4">
                <Landmark className="w-4.5 h-4.5 text-brand-gold" />
                {language === 'CN' ? '设计核心课题' : 'Key Core Challenges'}
              </h4>

              <div className="space-y-6">
                {currentCase.highlights.map((hlt, idx) => (
                  <div key={idx} className="flex gap-3 text-xs leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-brand-gold/15 text-brand-gold font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-gray-600 font-light">{hlt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <button
                onClick={() => onNavigate('configurator')}
                className="w-full btn-gold text-center py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>{language === 'CN' ? '咨询定制同款配置方案' : 'Consult This Model'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Description Detailed article */}
        <div className="max-w-4xl mx-auto mb-28">
          <h2 className="text-2xl font-bold text-brand-dark mb-6">
            {language === 'CN' ? '项目深化落地记实' : 'Engineering Deployment Log'}
          </h2>
          <div className="text-gray-500 font-light text-base leading-loose space-y-6 border-l-4 border-brand-gold/20 pl-6 py-2">
            <p className="indent-8">{currentCase.description}</p>
            <p className="indent-8">
              {language === 'CN'
                ? '在与该建筑现场工程团队历经十数轮面商会改后，ALTULA 结构设计师通过将导轴限位提升至零反晃的工业红点高标，解决了大型声学报告厅固有的吸音防反响回阻课题，不仅将整套阻折椅面贴契了极简北欧风，更使日常重组工作流下降到极简中控10分钟，获得了客户项目组极其庄厚的好评信赖。'
                : 'Moreover, the structural team resolved severe alignment stresses perfectly.'}
            </p>
          </div>
        </div>

        {/* More recommendation slides */}
        <div className="border-t border-gray-100 pt-16">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-1 block">
                {language === 'CN' ? '更多名家名馆空间' : 'RECOMMENDED PROJECTS'}
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-brand-dark">
                {language === 'CN' ? '全球精彩相关推荐' : 'Related Landscapes'}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {recommendedCases.map((rec) => (
              <div
                key={rec.id}
                onClick={() => {
                  onNavigate('case-detail', { id: rec.id });
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="group cursor-pointer bg-[#F8F9FA] rounded-2xl overflow-hidden border border-gray-100 hover:shadow-luxury transition-all"
              >
                <div className="h-44 relative overflow-hidden bg-gray-200">
                  <img
                    src={rec.image}
                    alt={rec.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-3 left-3 bg-brand-dark/95 text-white text-[9px] px-2 py-0.5 rounded-full font-medium">
                    {rec.location}
                  </span>
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-brand-dark text-sm group-hover:text-brand-gold transition-colors line-clamp-1 mb-1">
                    {rec.title}
                  </h4>
                  <span className="text-[10px] text-gray-400 font-light">{rec.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
