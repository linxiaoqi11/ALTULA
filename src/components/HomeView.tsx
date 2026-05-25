import React, { useRef, useEffect } from 'react';

interface HomeViewProps {
  onNavigate: (page: string, params?: any) => void;
  language: 'CN' | 'EN';
}

export default function HomeView({ onNavigate, language }: HomeViewProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const ctaVideoRef = useRef<HTMLVideoElement | null>(null);

  // Intersection observer effect to trigger slide animations exactly like the HTML
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-up');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    // Fallback: make everything visible if screen load doesn't trigger intersection
    const timer = setTimeout(() => {
      elements.forEach((el) => el.classList.add('active'));
    }, 150);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // Slide Next and Slide Prev handling for Testimonial Slider matching HTML JS precisely
  const handleSlideNext = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
      }
    }
  };

  const handleSlidePrev = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      if (slider.scrollLeft <= 0) {
        slider.scrollTo({ left: slider.scrollWidth, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: -slider.clientWidth, behavior: 'smooth' });
      }
    }
  };

  // Auto-scroll testimonials
  useEffect(() => {
    const timer = setInterval(handleSlideNext, 4000);
    return () => clearInterval(timer);
  }, []);

  // Play and pause video on Hover matching vanilla hover scripting
  const handleCTAEnter = () => {
    if (ctaVideoRef.current) {
      ctaVideoRef.current.play().catch((err) => {
        console.log('Video auto-playback blocked:', err);
      });
    }
  };

  const handleCTALeave = () => {
    if (ctaVideoRef.current) {
      ctaVideoRef.current.pause();
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* 英雄区 / Hero Section */}
      <section id="hero" className="relative w-full h-screen min-h-[700px] flex items-center bg-brand-dark overflow-hidden">
        <video 
          src="https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEUPYZqC_aBgKcOTfLHOVATvY4SswifWAACfSAAAjfoYFQfq6SaMfLsjTsE.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0 transform -scale-x-100"
        ></video>
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-20">
          <div className="max-w-3xl reveal-up">
            <h1 className="text-5xl md:text-7xl font-semibold text-white leading-[1.1] mb-8 tracking-tight">
              {language === 'CN' ? (
                <>
                  让空间拥有<br />
                  <span className="text-gradient-gold">变化的能力。</span>
                </>
              ) : (
                <>
                  Giving Space the<br />
                  <span className="text-gradient-gold">Power to Fluidly Adapt.</span>
                </>
              )}
            </h1>
            <p className="text-lg md:text-xl text-gray-100 drop-shadow-md font-light leading-relaxed mb-12 max-w-xl">
              {language === 'CN' 
                ? 'ALTULA不只是提供产品，而是构建一种空间使用方式——在有限空间中，实现更多可能；在复杂需求中，保持秩序与美感。'
                : 'ALTULA does not just supply standard seating systems, but coordinates an elegant, functional spatial configuration—achieving more within boundaries.'}
            </p>
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={() => onNavigate('products')} 
                className="btn-gold px-8 py-4 rounded-full text-sm tracking-widest uppercase flex items-center gap-2 cursor-pointer font-semibold shadow-lg"
              >
                <span>{language === 'CN' ? '探索产品系列' : 'Explore Collections'}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
              <button 
                onClick={() => onNavigate('about')} 
                className="px-8 py-4 rounded-full text-sm tracking-widest text-white border border-gray-600 hover:border-white hover:bg-white/5 transition-all cursor-pointer"
              >
                {language === 'CN' ? '了解品牌故事' : 'Explore Tech and Story'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 产品系列 Section / Products Section */}
      <section id="products" className="py-32 bg-brand-light relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 reveal-up">
            <div>
              <h3 className="text-4xl md:text-5xl font-semibold text-brand-dark tracking-tight">
                {language === 'CN' ? '两大核心系列' : 'Premium Seating Series'}
              </h3>
            </div>
            <p className="text-gray-600 text-base max-w-md mt-6 md:mt-0 font-light leading-relaxed">
              {language === 'CN'
                ? '以严谨的工程逻辑与极简美学，打造适配多元场景的高端空间看台解决方案。'
                : 'Combining precise mechanical integrity with minimalist architectural woodwork.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Box 1: Retractable */}
            <div 
              onClick={() => onNavigate('product-detail', { id: 'retractable' })} 
              className="group cursor-pointer reveal-up"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gray-200 aspect-[4/3] mb-8 shadow-sm">
                <img 
                  src="https://img-reg-ab.imagency.cn/e/02bbb6f33a36a708c3eb24284967254a.jpg" 
                  alt={language === 'CN' ? '伸缩活动看台系列' : 'Retractable Seating Series'} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
                <div className="absolute bottom-6 left-6 right-6 flex gap-2 z-20">
                  <span className="bg-white/90 backdrop-blur-md text-xs px-3 py-1 rounded-full text-brand-dark font-medium">
                    {language === 'CN' ? '维格' : 'Wellgo'}
                  </span>
                  <span className="bg-white/90 backdrop-blur-md text-xs px-3 py-1 rounded-full text-brand-dark font-medium">
                    {language === 'CN' ? 'Crear' : 'Crear'}
                  </span>
                  <span className="bg-white/90 backdrop-blur-md text-xs px-3 py-1 rounded-full text-brand-dark font-medium">
                    {language === 'CN' ? 'B系列' : 'B-Series'}
                  </span>
                </div>
              </div>
              <h4 className="text-2xl font-semibold text-brand-dark mb-3 group-hover:text-brand-gold transition-colors">
                {language === 'CN' ? '伸缩活动看台系列' : 'Retractable Telescopic Series'}
              </h4>
              <p className="text-gray-600 font-light leading-relaxed">
                {language === 'CN'
                  ? '隐于无形，展于惊艳。专为多功能场馆设计，一键实现平地与阶梯看台的自由切换，最大化释放空间商业价值。'
                  : 'Folds completely flush to optimize flat open floors. Expands silently into custom theater-grade seating.'}
              </p>
            </div>

            {/* Box 2: Fixed / Public */}
            <div 
              onClick={() => onNavigate('product-detail', { id: 'public' })} 
              className="group cursor-pointer reveal-up delay-100"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gray-200 aspect-[4/3] mb-8 shadow-sm">
                <img 
                  src="https://img-reg-ab.imagency.cn/e/dc5395da5efbb8d2d7798f4005768381.jpg" 
                  alt={language === 'CN' ? '公共坐席看台系列' : 'Public Seating Series'} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500"></div>
                <div className="absolute bottom-6 left-6 right-6 flex gap-2 z-20">
                  <span className="bg-brand-dark/90 backdrop-blur text-xs px-3 py-1 rounded-full text-white font-medium">
                    {language === 'CN' ? 'A系列' : 'A-Series'}
                  </span>
                  <span className="bg-brand-dark/90 backdrop-blur text-xs px-3 py-1 rounded-full text-white font-medium">
                    {language === 'CN' ? 'B系列' : 'B-Series'}
                  </span>
                  <span className="bg-brand-dark/90 backdrop-blur text-xs px-3 py-1 rounded-full text-white font-medium">
                    {language === 'CN' ? 'C系列' : 'C-Series'}
                  </span>
                </div>
              </div>
              <h4 className="text-2xl font-semibold text-brand-dark mb-3 group-hover:text-brand-gold transition-colors">
                {language === 'CN' ? '公共坐席看台系列' : 'Public Auditorium Chair Series'}
              </h4>
              <p className="text-gray-600 font-light leading-relaxed">
                {language === 'CN'
                  ? '符合人体工学的美学沉淀。适用于固定场馆、高端会议中心，提供卓越的舒适承载与长久耐用的品质保证。'
                  : 'Sleek, ergonomic public chair systems engineered to deliver luxurious stability and superb acoustic characteristics.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 全球地标空间鉴赏 (案例模块) / Case Grid Cascade */}
      <section id="cases" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 reveal-up">
            <div className="max-w-2xl">
              <h3 className="text-3xl md:text-4xl font-bold text-brand-dark tracking-tight mb-4">
                {language === 'CN' ? '全球地标空间鉴赏' : 'Global Masterpiece Landscapes'}
              </h3>
              <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed">
                {language === 'CN'
                  ? '见证无界空间的无尽可能。从大型地标场馆到奢华商业空间，ALTULA 以精工定制融入多元场景。'
                  : 'Witness boundless spatial capability seamlessly matching pristine, bespoke architectural layouts.'}
              </p>
            </div>
            <button 
              onClick={() => onNavigate('cases')} 
              className="mt-6 md:mt-0 flex items-center gap-1.5 text-sm font-medium text-brand-gold hover:text-[#B3966D] transition-colors shrink-0 cursor-pointer"
            >
              <span>{language === 'CN' ? '查看所有案例' : 'Explore All Portfolios'}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>

          {/* CSS Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 h-auto md:h-[600px]">
            {/* Box 1: Left tall item */}
            <div 
              onClick={() => onNavigate('case-detail', { id: 'maritime-museum' })} 
              className="md:col-span-4 h-[400px] md:h-full relative rounded-2xl overflow-hidden group cursor-pointer case-card reveal-up"
            >
              <img 
                src="https://img-reg-ab.imagency.cn/e/f77ee005ec194f8323d0bbaa4d26852d.webp" 
                alt="香港海事博物馆" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 flex flex-col justify-end transition-transform duration-500">
                <span className="inline-block bg-white/20 backdrop-blur-md border border-white/20 text-white/90 text-[11px] px-3 py-1 rounded-full w-fit mb-3 font-medium tracking-wider">
                  {language === 'CN' ? '企业商用' : 'Corporate'}
                </span>
                <h4 className="text-white text-2xl font-bold leading-snug drop-shadow-md">
                  {language === 'CN' ? (
                    <>香港海事博物馆 HK Maritime<br />Museum</>
                  ) : (
                    'HK Maritime Museum Spatial Unit'
                  )}
                </h4>
              </div>
            </div>

            {/* Right container */}
            <div className="md:col-span-8 flex flex-col gap-4 md:gap-5 h-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 h-[280px] md:h-[45%]">
                {/* Shanghai Normal */}
                <div 
                  onClick={() => onNavigate('case-detail', { id: 'normal-university' })} 
                  className="relative rounded-2xl overflow-hidden group cursor-pointer case-card reveal-up delay-100 h-full"
                >
                  <img 
                    src="https://img-reg-ab.imagency.cn/e/8a48cfe1be17841fb3bf8ec91e4e12a2.webp" 
                    alt="上海师范大学剧场" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-20">
                    <span className="inline-block bg-white/20 backdrop-blur-md border border-white/20 text-white/90 text-[11px] px-3 py-1 rounded-full w-fit mb-2 font-medium tracking-wider">
                      {language === 'CN' ? '剧场' : 'Theater / Opera'}
                    </span>
                    <h4 className="text-white text-lg md:text-xl font-bold drop-shadow-md">
                      {language === 'CN' ? '上海师范大学黑匣子剧场' : 'SHNU Blackbox Arts Theater'}
                    </h4>
                  </div>
                </div>

                {/* Gansu School */}
                <div 
                  onClick={() => onNavigate('case-detail', { id: 'lepanschool' })} 
                  className="relative rounded-2xl overflow-hidden group cursor-pointer case-card reveal-up delay-200 h-full"
                >
                  <img 
                    src="https://img-reg-ab.imagency.cn/e/736c313958ba791f34e22b7b1dd62240.webp" 
                    alt="甘肃合水乐蟠初中院" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-20">
                    <span className="inline-block bg-white/20 backdrop-blur-md border border-white/20 text-white/90 text-[11px] px-3 py-1 rounded-full w-fit mb-2 font-medium tracking-wider">
                      {language === 'CN' ? '报告厅' : 'Auditorium'}
                    </span>
                    <h4 className="text-white text-lg md:text-xl font-bold drop-shadow-md">
                      {language === 'CN' ? '甘肃合水乐蟠初中院报告厅' : 'Gansu Lepan Middle School Auditorium'}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Bottom wide long banner */}
              <div 
                onClick={() => onNavigate('case-detail', { id: 'australia-school' })} 
                className="relative rounded-2xl overflow-hidden group cursor-pointer case-card reveal-up delay-300 h-[250px] md:flex-grow"
              >
                <img 
                  src="https://img-reg-ab.imagency.cn/e/af3a1511b2e4bc9f5f948cb183cd34cc.webp" 
                  alt="澳大利亚报告厅" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                  <span className="inline-block bg-white/20 backdrop-blur-md border border-white/20 text-white/90 text-[11px] px-3 py-1 rounded-full w-fit mb-3 font-medium tracking-wider">
                    {language === 'CN' ? '报告厅' : 'Lecture Hall'}
                  </span>
                  <h4 className="text-white text-xl md:text-2xl font-bold drop-shadow-md">
                    {language === 'CN' ? '澳大利亚学校校报告厅' : 'Melbourne Academic Seating Hall'}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 设计师故事 Section / Brand Philosophy */}
      <section id="story" className="py-32 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2 order-2 lg:order-1 reveal-up">
            <h3 className="text-3xl md:text-4xl font-semibold text-brand-dark mb-10 leading-snug">
              {language === 'CN' ? (
                <>ALTULA的起点，不是看台，<br />而是空间本身。</>
              ) : (
                <>ALTULA departed not from furniture,<br />but from the concept of space itself.</>
              )}
            </h3>
            
            <div className="space-y-10 text-gray-600 font-light text-base md:text-lg leading-loose tracking-wide">
              <p>
                {language === 'CN' ? (
                  <>
                    我们重新思考一个问题：当空间需要不断变化时，设施是否可以不再“占据空间”，而成为空间的一部分？
                    <br /><br />
                    于是，ALTULA诞生了一套<span className="text-brand-dark font-medium">“可融入”</span>的系统：
                  </>
                ) : (
                  <>
                    We solved a core puzzle: when facilities change dynamically, how do they blend rather than occupy space? 
                    This conceived ALTULA's integrated visual profile:
                  </>
                )}
              </p>
              
              <div className="pl-6 border-l border-brand-gold/30 space-y-6">
                <div>
                  <span className="block text-brand-dark font-medium tracking-widest text-sm mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span> 
                    {language === 'CN' ? '展开时' : 'On Expanded Mode:'}
                  </span>
                  <p className="text-sm">
                    {language === 'CN' 
                      ? '它是秩序清晰、体验完整的功能载体；' 
                      : 'An authentic tactile carrier prioritizing comfort, acoustics and premium load capacity.'}
                  </p>
                </div>
                <div>
                  <span className="block text-brand-dark font-medium tracking-widest text-sm mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> 
                    {language === 'CN' ? '收合后' : 'On Collapsed Mode:'}
                  </span>
                  <p className="text-sm">
                    {language === 'CN' 
                      ? '它回归克制与安静，如同空间本身的结构延伸。' 
                      : 'It retracts flush into structural borders, matching custom background panels cleanly.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 order-1 lg:order-2 reveal-up delay-100">
            <div className="relative">
              <div className="aspect-square rounded-full bg-white absolute -top-10 -right-10 w-2/3 -z-10"></div>
              <img 
                src="https://img-reg-ab.imagency.cn/e/faba224b11cbeb566081df8eff866c4d.jpg" 
                alt="设计哲学" 
                className="rounded-3xl shadow-luxury w-full object-cover aspect-[3/4]" 
              />
              <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 bg-white/85 backdrop-blur-xl px-8 py-8 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] border border-white/60 z-20 transition-transform duration-500 hover:-translate-y-1">
                <p className="text-brand-dark text-xl md:text-2xl font-serif font-medium leading-relaxed tracking-wide">
                  {language === 'CN'
                    ? '"它不是被摆放进去的设备，而是与空间共同生长的组成部分。"'
                    : '"It functions not as imported gear, but as an integrated architectural element."'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section / Heavy Duty Technical Guidelines */}
      <section id="tech-intro" className="py-32 bg-brand-dark text-white relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-24 reveal-up">
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {language === 'CN' ? '重塑空间的技术准则' : 'Technical Guidelines of Spatial Evolution'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* Tech 1 */}
            <div className="reveal-up group relative pt-8 border-t border-white/10 hover:border-white/20 transition-colors duration-500 cursor-pointer">
              <div className="absolute top-[-1px] left-0 w-0 h-[2px] bg-brand-gold shadow-[0_0_12px_#C5A880] group-hover:w-1/3 transition-all duration-700 ease-out"></div>
              <div className="w-12 h-12 mb-8 text-gray-500 group-hover:text-brand-gold transition-colors duration-500">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path>
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-4 text-white group-hover:text-brand-gold transition-colors duration-500">
                {language === 'CN' ? '美学与舒适' : 'Material & Aesthetics'}
              </h4>
              <p className="text-gray-400 font-light leading-relaxed text-sm group-hover:text-gray-300 transition-colors duration-500">
                {language === 'CN'
                  ? '以空间为原点。通过比例控制、线条克制与材质选择，让系统在视觉上“隐于空间”，在使用中“显于体验”。座椅结构遵循人体工学，在高频使用与长时停留之间取得完美平衡。'
                  : 'Sleek visual lines keep hardware concealed, allowing spaces to stay clear. Integrated fabrics match rigorous ergonomic thresholds.'}
              </p>
            </div>

            {/* Tech 2 */}
            <div className="reveal-up delay-100 group relative pt-8 border-t border-white/10 hover:border-white/20 transition-colors duration-500 cursor-pointer">
              <div className="absolute top-[-1px] left-0 w-0 h-[2px] bg-brand-gold shadow-[0_0_12px_#C5A880] group-hover:w-1/3 transition-all duration-700 ease-out"></div>
              <div className="w-12 h-12 mb-8 text-gray-500 group-hover:text-brand-gold transition-colors duration-500">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-4 text-white group-hover:text-brand-gold transition-colors duration-500">
                {language === 'CN' ? '智能与高效' : 'Synchronous Control Core'}
              </h4>
              <p className="text-gray-400 font-light leading-relaxed text-sm group-hover:text-gray-300 transition-colors duration-500">
                {language === 'CN'
                  ? '内置工业级控制芯片，基于电动驱动与分段控制技术，实现多点同步驱动。支持分区控制与集中管理，在会议、演出与复合场景间快速切换，高效调度且精确响应。'
                  : 'Heavy load synchronous motors alignment with high consistency logic ensuring error-free, millimeter-grade folding synchrony.'}
              </p>
            </div>

            {/* Tech 3 */}
            <div className="reveal-up delay-200 group relative pt-8 border-t border-white/10 hover:border-white/20 transition-colors duration-500 cursor-pointer">
              <div className="absolute top-[-1px] left-0 w-0 h-[2px] bg-brand-gold shadow-[0_0_12px_#C5A880] group-hover:w-1/3 transition-all duration-700 ease-out"></div>
              <div className="w-12 h-12 mb-8 text-gray-500 group-hover:text-brand-gold transition-colors duration-500">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-4 text-white group-hover:text-brand-gold transition-colors duration-500">
                {language === 'CN' ? '安全底层逻辑' : 'Triple Safety Redundancy'}
              </h4>
              <p className="text-gray-400 font-light leading-relaxed text-sm group-hover:text-gray-300 transition-colors duration-500">
                {language === 'CN'
                  ? '高强度框架结合雷达感应技术，实时监测运行路径。遇障碍即时响应停止。行程限位、防坠落结构及异常阻力保护机制，形成多重防护，确保承载绝对安全。'
                  : 'Features multi-sensor radar safety fields, self-locking dual backup triggers, and active obstruction dampeners.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section / Users feedback slide */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 reveal-up">
            <div>
              <h3 className="text-4xl md:text-5xl font-semibold text-brand-dark tracking-tight">
                {language === 'CN' ? '他们这样评价ALTULA' : 'Prestige Client Audits'}
              </h3>
              <p className="text-gray-600 text-base max-w-md mt-6 font-light">
                {language === 'CN' ? '来自全球各地的客户，真实的项目反馈' : 'Direct, unedited reviews from master operations teams globally.'}
              </p>
            </div>
            
            <div className="hidden md:flex gap-4 mt-8 md:mt-0">
              <button 
                onClick={handleSlidePrev} 
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:text-brand-gold hover:border-brand-gold transition-colors focus:outline-none cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button 
                onClick={handleSlideNext} 
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:text-brand-gold hover:border-brand-gold transition-colors focus:outline-none cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Testimonial slider list container */}
          <div 
            ref={sliderRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pt-6 -mt-6 pb-12 hide-scrollbar"
          >
            {/* Card 1 */}
            <div className="bg-[#F8F9FA] p-10 rounded-2xl shadow-sm reveal-up testimonial-card snap-start shrink-0 w-full md:w-[calc(50%-1rem)] flex flex-col">
              <div className="text-brand-gold text-4xl font-serif mb-4 leading-none">"</div>
              <p className="text-gray-600 font-light leading-relaxed mb-8 flex-grow text-sm md:text-base">
                {language === 'CN'
                  ? 'ALTULA不是单一产品供应商，而是从空间整体出发给出解决方案。在多个项目中，他们对建筑结构、使用场景与运营需求的理解都非常到位，落地效果与前期方案高度一致。'
                  : 'ALTULA is not a single product vendor, but designs directly from general architectural intents. Engineering is robust and consistent.'}
              </p>
              <div className="flex items-center gap-4 border-t border-gray-200 pt-6 mt-auto">
                <div className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-white text-xs font-bold">M</div>
                <div>
                  <h5 className="text-sm font-semibold text-brand-dark">
                    {language === 'CN' ? '某大型商业地产空间总监' : 'Director of Commercial Real Estate'}
                  </h5>
                  <span className="text-xs text-gray-500">
                    {language === 'CN' ? '应用案例：多功能策展中心' : 'Collaborated: Multi-functional Art Fair Assembly'}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F8F9FA] p-10 rounded-2xl shadow-sm reveal-up delay-100 testimonial-card snap-start shrink-0 w-full md:w-[calc(50%-1rem)] flex flex-col">
              <div className="text-brand-gold text-4xl font-serif mb-4 leading-none">"</div>
              <p className="text-gray-600 font-light leading-relaxed mb-8 flex-grow text-sm md:text-base">
                {language === 'CN'
                  ? '场地切换效率明显提升，从会议模式到开放活动模式的转换时间大幅缩短，且过程可控、无需复杂操作，对日常运营非常友好。整体观感整洁，收合后不造成干扰。'
                  : 'Our operational efficiency improved dramatically. Seamless mode swaps take minutes rather than hours, maintaining a clean architectural presentation.'}
              </p>
              <div className="flex items-center gap-4 border-t border-gray-200 pt-6 mt-auto">
                <div className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-white text-xs font-bold">O</div>
                <div>
                  <h5 className="text-sm font-semibold text-brand-dark">
                    {language === 'CN' ? '国际会议中心运营负责人' : 'Operation Lead, International Center'}
                  </h5>
                  <span className="text-xs text-gray-500">
                    {language === 'CN' ? '应用案例：主会议厅看台升级' : 'Collaborated: Main Legislative Chamber'}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#F8F9FA] p-10 rounded-2xl shadow-sm reveal-up delay-200 testimonial-card snap-start shrink-0 w-full md:w-[calc(50%-1rem)] flex flex-col">
              <div className="text-brand-gold text-4xl font-serif mb-4 leading-none">"</div>
              <p className="text-gray-600 font-light leading-relaxed mb-8 flex-grow text-sm md:text-base">
                {language === 'CN'
                  ? '座椅舒适度优于预期，长时间使用也不会产生明显疲劳。细节处理非常完整，无论是静音电机的表现还是材质的触感，都体现出了成熟的工程经验与极高的品牌标准。'
                  : 'Acoustic dampers and cold foam foam padding support high posture comfort for meetings exceeding 4 hours.'}
              </p>
              <div className="flex items-center gap-4 border-t border-gray-200 pt-6 mt-auto">
                <div className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-white text-xs font-bold">C</div>
                <div>
                  <h5 className="text-sm font-semibold text-brand-dark">
                    {language === 'CN' ? '跨国企业行政采购总监' : 'Procurement Director, MNC'}
                  </h5>
                  <span className="text-xs text-gray-500">
                    {language === 'CN' ? '应用案例：企业总部多功能厅' : 'Collaborated: Global Corporate HQ Venue'}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[#F8F9FA] p-10 rounded-2xl shadow-sm reveal-up delay-300 testimonial-card snap-start shrink-0 w-full md:w-[calc(50%-1rem)] flex flex-col">
              <div className="text-brand-gold text-4xl font-serif mb-4 leading-none">"</div>
              <p className="text-gray-600 font-light leading-relaxed mb-8 flex-grow text-sm md:text-base">
                {language === 'CN'
                  ? '在这次大型品牌发布会中，ALTULA的看台系统让我们能够在一夜之间完成场地的重构。系统运行稳定且静音，完全没有干扰到现场的彩排进程，非常惊艳。'
                  : 'Highly recommend! Overnight structural seating rebuild enabled an amazing brand rollout. Smooth and incredibly silent motors.'}
              </p>
              <div className="flex items-center gap-4 border-t border-gray-200 pt-6 mt-auto">
                <div className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-white text-xs font-bold">D</div>
                <div>
                  <h5 className="text-sm font-semibold text-brand-dark">
                    {language === 'CN' ? '知名公关活动公司项目总负责' : 'Project Director, PR Agency'}
                  </h5>
                  <span className="text-xs text-gray-500">
                    {language === 'CN' ? '应用案例：年度旗舰新品发布会' : 'Collaborated: EV Car Announcement Ceremonies'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Guarantee / Quality Commitments */}
      <section id="services-guarantee" className="py-32 relative overflow-hidden bg-[#F2F3F5]">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="mb-20 reveal-up">
            <h3 className="text-3xl md:text-4xl font-semibold text-brand-dark">
              {language === 'CN' ? 'ALTULA 品质承诺' : 'ALTULA Gold Standard Service Warranty'}
            </h3>
            <p className="text-brand-gray mt-4 max-w-2xl mx-auto font-light">
              {language === 'CN' ? '以国际级标准，定义高端看台服务的全维度保障。' : 'World class structural parameters defining deep peace-of-mind.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {/* Item 1 */}
            <div className="reveal-up bg-white p-8 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-500 border border-gray-100">
              <h4 className="text-lg font-semibold text-brand-dark mb-4 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                {language === 'CN' ? '权威认证，品质有据' : 'International Certifications'}
              </h4>
              <p className="text-gray-600 font-light text-sm leading-relaxed">
                {language === 'CN'
                  ? '荣获红点设计奖、FIBA国际篮联认证、ISO体系及欧盟CE认证，全球严苛检测，品质同步国际高端。'
                  : 'Honored with RedDot visual awards, official FIBA stadium approvals, and European CE mechanical certifications.'}
              </p>
            </div>
            
            {/* Item 2 */}
            <div className="reveal-up delay-100 bg-white p-8 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-500 border border-gray-100">
              <h4 className="text-lg font-semibold text-brand-dark mb-4 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                {language === 'CN' ? '匠心精工，细节致臻' : 'Precision Woodwork Crafts'}
              </h4>
              <p className="text-gray-600 font-light text-sm leading-relaxed">
                {language === 'CN'
                  ? '依托领先体育30年深耕，联合国际顶尖设计团队，模块化精密制造，兼顾美学与安全。'
                  : 'Relying on Avant Sports 30-year industrial background. Delivers flawless custom design aesthetics.'}
              </p>
            </div>

            {/* Item 3 */}
            <div className="reveal-up delay-200 bg-white p-8 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-500 border border-gray-100">
              <h4 className="text-lg font-semibold text-brand-dark mb-4 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                {language === 'CN' ? '全链定制，方案专属' : 'End-to-End Bespoke Customization'}
              </h4>
              <p className="text-gray-600 font-light text-sm leading-relaxed">
                {language === 'CN'
                  ? '从空间勘测、设计到生产安装，提供一对一专属服务，完美适配会议、商业、公共等多元场景。'
                  : 'From draft structural rendering to acoustic planning. Catered 1-on-1 for architects.'}
              </p>
            </div>

            {/* Item 4 */}
            <div className="reveal-up bg-white p-8 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-500 border border-gray-100">
              <h4 className="text-lg font-semibold text-brand-dark mb-4 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                {language === 'CN' ? '安全可靠，多重防护' : 'Complete Mechanical Shields'}
              </h4>
              <p className="text-gray-600 font-light text-sm leading-relaxed">
                {language === 'CN'
                  ? '高强度框架 + 雷达感应系统 + 防坠落结构，运行稳定可控，杜绝安全隐患，适配高频使用。'
                  : 'Premium carbon steel frameworks coordinate with active laser radars to deliver uncompromised safety.'}
              </p>
            </div>

            {/* Item 5 */}
            <div className="reveal-up delay-100 bg-white p-8 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-500 border border-gray-100">
              <h4 className="text-lg font-semibold text-brand-dark mb-4 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                {language === 'CN' ? '长效质保，快速响应' : 'ALTULA CARE Premium Support'}
              </h4>
              <p className="text-gray-600 font-light text-sm leading-relaxed">
                {language === 'CN'
                  ? '核心部件长效质保，全国服务网络7×24小时响应，维保高效及时，保障长期稳定运转。'
                  : 'Unmatched structural warranties backed by regional rapid-response maintenance units 24/7.'}
              </p>
            </div>

            {/* Item 6 */}
            <div className="reveal-up delay-200 bg-white p-8 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-500 border border-gray-100">
              <h4 className="text-lg font-semibold text-brand-dark mb-4 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                {language === 'CN' ? '空间适配，长期价值' : 'High Performance Investment'}
              </h4>
              <p className="text-gray-600 font-light text-sm leading-relaxed">
                {language === 'CN'
                  ? '不仅交付产品，更提供长期适配方案，支持灵活切换，持续释放高端商业与公共空间价值。'
                  : 'Multiplies your physical space output, creating flexible corporate and art staging options.'}
              </p>
            </div>
          </div>

          {/* Certification Logos Panel */}
          <div className="reveal-up mt-8 bg-white py-6 px-8 md:px-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 text-brand-dark font-semibold text-base md:text-lg shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-[#C5A880]"></span>
              {language === 'CN' ? '全球权威认证资质' : 'Global Quality Accreditations'}
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-8 md:gap-x-12 gap-y-4">
              <img src="https://img-reg-ab.imagency.cn/e/ea73d253ee7d11e016460576cb0b4e65.png" alt="Red Dot Certification" className="h-8 md:h-10 w-auto object-contain" />
              <img src="https://img-reg-ab.imagency.cn/e/b9ffa0e392b6dcc7a70a6e804a1bdec0.png" alt="FIBA Certificate" className="h-8 md:h-10 w-auto object-contain" />
              <img src="https://img-reg-ab.imagency.cn/e/58041ce10058ea5521e9e0a58ca51d88.png" alt="ISO Certification" className="h-8 md:h-10 w-auto object-contain" />
              <img src="https://img-reg-ab.imagency.cn/e/c1943a4eda4234c1daa5f2b264c03150.png" alt="CE Mark" className="h-8 md:h-10 w-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with video on hover */}
      <section 
        id="cta-section" 
        onMouseEnter={handleCTAEnter}
        onMouseLeave={handleCTALeave}
        className="py-16 bg-brand-dark relative overflow-hidden group cursor-pointer transition-colors duration-1000"
      >
        <video 
          ref={ctaVideoRef}
          src="https://img.remit.ee/api/file/BAACAgUAAyEGAASHRsPbAAEURjtqDIozKhNairgHU7zs1KmHIg-9bAAC8iwAAjfoYFTpFPRhXJIknzsE.mp4" 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0 brightness-[0.35] group-hover:brightness-100 transition-all duration-1000 pointer-events-none"
        ></video>

        {/* Shadow gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-[85%] md:w-[55%] bg-gradient-to-r from-brand-dark via-brand-dark/90 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-1/4 md:w-1/6 bg-gradient-to-l from-brand-dark via-brand-dark/60 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-brand-dark via-brand-dark/70 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-transparent z-10 pointer-events-none"></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-left reveal-up">
            <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4 tracking-tight leading-tight">
              {language === 'CN' ? (
                <>ALTULA 精工定制，<br />适配高端之选</>
              ) : (
                <>ALTULA Bespoke Seating,<br />Engineered for Prestige Spaces</>
              )}
            </h2>
            <p className="text-brand-gold font-light text-lg">
              {language === 'CN' 
                ? '在线选配材质、规格与功能，打造专属空间解决方案。' 
                : 'Configure specifications, seating configurations and visual finishes online.'}
            </p>
          </div>
          <div className="reveal-up shrink-0">
            <button 
              onClick={() => onNavigate('configurator')} 
              className="btn-gold px-10 py-5 rounded-sm text-sm tracking-widest uppercase font-medium inline-flex items-center gap-2.5 transition-all cursor-pointer"
            >
              <span>{language === 'CN' ? '立即配置方案' : 'Configure Seating Plan'}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
