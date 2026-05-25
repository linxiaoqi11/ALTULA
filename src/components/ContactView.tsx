import React, { useState } from 'react';
import { Mail, Phone, MapPin, Printer, Compass, Check, Send, Globe2, Landmark } from 'lucide-react';

interface ContactViewProps {
  onNavigate: (page: string, params?: any) => void;
  language: 'CN' | 'EN';
}

export default function ContactView({ onNavigate, language }: ContactViewProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    projectType: 'corporate',
    detail: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        company: '',
        projectType: 'corporate',
        detail: ''
      });
    }, 5000);
  };

  return (
    <div className="pt-28 pb-12 bg-brand-light min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="border-b border-gray-200 pb-10 mb-16 text-center">
          <span className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
            {language === 'CN' ? '定制空间方案，解锁专属配置。' : 'PARTNERSHIP COOPERATION'}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tight mb-4">
            {language === 'CN' ? '联系我们' : 'Contact Partnership'}
          </h1>
          <p className="text-gray-500 font-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {language === 'CN'
              ? '填写需求，我们为您生成专属空间配置方案。'
              : 'Our technical support structures are aligned 24/7 across multiple time zones.'}
          </p>
        </div>

        {/* Layout Grid: Left addresses columns, Right interactive consultation form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12 items-stretch">
          {/* Left panel metrics (lg:col-span-6) */}
          <div className="lg:col-span-6">
            <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-luxury h-full flex flex-col justify-between gap-8">
              {/* Top Header */}
              <div>
                <span className="bg-brand-gold/10 text-brand-gold text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block">
                  {language === 'CN' ? '集团总部' : 'GLOBAL HEADQUARTERS'}
                </span>
                <h2 className="text-2xl font-black text-brand-dark mb-5 tracking-tight flex items-center gap-2">
                  <Compass className="w-5.5 h-5.5 text-brand-gold" />
                  {language === 'CN' ? '深圳总部 · 领先工业园' : 'Shenzhen HQ Base'}
                </h2>

                {/* HQ Address Panel */}
                <div className="flex gap-4 items-start bg-brand-light/40 p-4.5 rounded-2xl border border-brand-gold/10">
                  <span className="w-9 h-9 rounded-xl bg-white border border-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <div>
                    <h5 className="font-bold text-gray-400 text-[10px] uppercase tracking-wider mb-0.5">
                      {language === 'CN' ? '总部地址' : 'HQ Address'}
                    </h5>
                    <p className="text-brand-dark font-bold text-sm md:text-base leading-relaxed">
                      {language === 'CN' ? '广东省深圳市宝安区石岩洲石路领先工业园' : 'Avant Industrial Park, Zhoushi Road, Shiyan, Baoan District, Shenzhen, Guangdong'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Core Hotlines Grid */}
              <div className="space-y-6 flex-1">
                <div className="border-b border-gray-100 pb-3 mb-2">
                  <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">
                    {language === 'CN' ? '业务联络与支持' : 'Business Contact Lines'}
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Marketing Hotline */}
                  <div className="flex gap-3 items-center">
                    <span className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-brand-gold shrink-0 border border-gray-100">
                      <Phone className="w-4.5 h-4.5" />
                    </span>
                    <div>
                      <h5 className="font-bold text-gray-400 text-[10px] uppercase tracking-wider leading-none mb-1">
                        {language === 'CN' ? '营销热线' : 'Marketing Hotline'}
                      </h5>
                      <span className="text-brand-dark font-black text-base leading-none block">400 618 1848</span>
                    </div>
                  </div>

                  {/* Mailbox */}
                  <div className="flex gap-3 items-center">
                    <span className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-brand-gold shrink-0 border border-gray-100">
                      <Mail className="w-4.5 h-4.5" />
                    </span>
                    <div>
                      <h5 className="font-bold text-gray-400 text-[10px] uppercase tracking-wider leading-none mb-1">
                        {language === 'CN' ? '电子邮箱' : 'Email Address'}
                      </h5>
                      <a href="mailto:market@avant.com.cn" className="text-brand-dark font-bold text-sm leading-none block hover:text-brand-gold transition-colors break-all">
                        market@avant.com.cn
                      </a>
                    </div>
                  </div>

                  {/* Pre-Sales */}
                  <div className="flex gap-3 items-center pt-2 border-t border-gray-50 sm:border-0 sm:pt-0">
                    <span className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-brand-gold shrink-0 border border-gray-100">
                      <Phone className="w-4.5 h-4.5" />
                    </span>
                    <div>
                      <h5 className="font-bold text-gray-400 text-[10px] uppercase tracking-wider leading-none mb-1">
                        {language === 'CN' ? '售前客服' : 'Pre-Sales Service'}
                      </h5>
                      <span className="text-brand-dark font-black text-base leading-none block">185 8894 5064</span>
                    </div>
                  </div>

                  {/* Post-Sales */}
                  <div className="flex gap-3 items-center pt-2 border-t border-gray-50 sm:border-0 sm:pt-0">
                    <span className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-brand-gold shrink-0 border border-gray-100">
                      <Phone className="w-4.5 h-4.5" />
                    </span>
                    <div>
                      <h5 className="font-bold text-gray-400 text-[10px] uppercase tracking-wider leading-none mb-1">
                        {language === 'CN' ? '售后客服' : 'Post-Sales Support'}
                      </h5>
                      <span className="text-brand-dark font-black text-base leading-none block">181 2393 5931</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Switchboard/Fax/Web Row - Muted, unified */}
              <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-6 text-center text-xs">
                <div className="border-r border-gray-100 px-1">
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">{language === 'CN' ? '总机' : 'Switchboard'}</span>
                  <span className="font-bold text-brand-dark block mt-0.5">0755-26490688</span>
                </div>
                <div className="border-r border-gray-100 px-1">
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">{language === 'CN' ? '传真' : 'Fax'}</span>
                  <span className="font-bold text-brand-dark block mt-0.5">0755-29688489</span>
                </div>
                <div className="px-1">
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">{language === 'CN' ? '官方网站' : 'Website'}</span>
                  <span className="font-bold text-brand-dark block mt-0.5 truncate select-all" title="www.altulaseating.cn">
                    www.altulaseating.cn
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel map (lg:col-span-6, swapped with actual interactive map) */}
          <div className="lg:col-span-6 relative rounded-[2rem] bg-gray-50 min-h-[440px] md:min-h-[480px] overflow-hidden shadow-luxury border border-gray-100 flex flex-col justify-between p-4 group text-brand-dark self-stretch">
            {/* Live Map Iframe Embed container with positive padding/dimensions and negative margin to crop out top search and bottom info panel */}
            <div className="absolute inset-0 z-0 bg-gray-50 rounded-[2rem] overflow-hidden pointer-events-auto">
              <iframe 
                src="https://apis.map.qq.com/tools/poimarker?type=0&marker=coord:22.668212,113.926131;title:%E9%A2%86%E5%85%88%E4%BC%B4%E5%AE%87;addr:%E5%B9%BF%E4%B8%9C%E7%9C%81%E6%B7%B1%E5%9C%B3%E5%B8%82%E5%AE%9D%E5%AE%89%E5%8C%BA%E7%9F%B3%E5%B2%A9%E6%B4%B2%E7%9F%B3%E8%B7%AF%E9%A2%86%E5%85%88%E5%B7%A5%E4%B8%9A%E5%9B%AD&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"
                style={{
                  width: 'calc(100% + 100px)',
                  height: 'calc(100% + 220px)',
                  position: 'absolute',
                  top: '-45px',
                  bottom: '-175px',
                  left: '-50px',
                  right: '-50px',
                }}
                className="border-0"
                title="Vanguard Industrial Park Map"
                allowFullScreen
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Float Overlay: Information Display Card */}
            <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-gray-100 shadow-md max-w-[260px] md:max-w-xs text-brand-dark pointer-events-auto">
              <div className="flex items-center gap-2 mb-1.5">
                <Landmark className="w-4 h-4 text-brand-gold shrink-0" />
                <h4 className="text-[11px] font-bold tracking-tight text-brand-dark">
                  {language === 'CN' ? '领先体育国际高定产业基地' : 'Avant Advanced Production Complex'}
                </h4>
              </div>
              <p className="text-gray-500 font-medium text-[9px] leading-relaxed mb-1.5">
                {language === 'CN' 
                  ? '广东省深圳市宝安区石岩洲石路领先工业园' 
                  : 'Avant Industrial Park, Zhoushi Road, Shiyan, Baoan District, Shenzhen, China'}
              </p>
              <div className="flex gap-3 text-[8px] font-mono font-bold text-brand-gold">
                <span>LAT: 22.6682° N</span>
                <span>LNG: 113.9261° E</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Consulting Form Section (填充满内容宽度, swapped) */}
        <div className="w-full mb-24 bg-white p-8 md:p-12 rounded-[2rem] border border-gray-100 shadow-luxury">
          {formSubmitted ? (
            <div className="py-16 text-center flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-6">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-2">
                {language === 'CN' ? '方案咨询定制提交成功' : 'Partnership Proposal Registered'}
              </h3>
              <p className="text-gray-400 font-light text-xs max-w-sm leading-relaxed">
                {language === 'CN'
                  ? '我们的深圳商务经理已经核验到您的信息流，将在1个工作日内致电或派遣声学设计顾问会审您的空间配置图纸。感谢对极简高定看台的关注信托！'
                  : 'A regional manager will call you back within 12 hours.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-8">
              <div className="border-b border-gray-100 pb-5">
                <h3 className="text-2xl md:text-3xl font-black text-brand-dark mb-1 ml-1 tracking-tight">
                  {language === 'CN' ? '让您的空间也拥有无限变化的能力' : 'Digital Consultation form'}
                </h3>
                <p className="text-xs text-gray-400 ml-1">
                  {language === 'CN' ? '线上配置方案，我们会核算结构承压，在24小时内为您出具一份 1v1 极简看台配置书。' : 'Complimentary spatial configuration estimations.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    {language === 'CN' ? '您的尊姓名 *' : 'Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="先生 / 女士"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-xs font-medium focus:border-brand-gold focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    {language === 'CN' ? '联络手机号码 *' : 'Mobile *'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 1xx xxxx xxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-xs font-medium focus:border-brand-gold focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    {language === 'CN' ? '企商名称 / 单位名称' : 'Corporate Institution'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 领先科技工程有限公司"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-xs font-medium focus:border-brand-gold focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    {language === 'CN' ? '空间和项目大类' : 'Spatial Category'}
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-xs font-medium focus:border-brand-gold focus:outline-none focus:bg-white"
                  >
                    <option value="corporate">{language === 'CN' ? '多功能办公中心、报告学堂' : 'HQ Seating Hall'}</option>
                    <option value="auditorium">{language === 'CN' ? '大型剧院剧场、文化宫殿' : 'Theater / Opera House'}</option>
                    <option value="education">{language === 'CN' ? '学校校区学术中心' : 'Academic School Center'}</option>
                    <option value="sports">{language === 'CN' ? '体育馆、室外看台高定' : 'Aviation Sports Arenas'}</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    {language === 'CN' ? '需求详细/情况描述' : 'Additional Project Requirements'}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={language === 'CN' ? 'e.g. 需要定制组宽5米，收拢后带储物仓，配色暖灰，附带防撞检测。' : 'Requires dynamic configurations.'}
                    value={formData.detail}
                    onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3.5 px-4 text-xs font-medium focus:border-brand-gold focus:outline-none focus:bg-white resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="w-full md:w-64 bg-brand-dark hover:bg-black text-white text-xs font-bold py-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{language === 'CN' ? '获取详细配置报价方案' : 'Get Detailed Quotation & Scheme'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
