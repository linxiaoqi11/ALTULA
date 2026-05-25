import React, { useEffect, useState } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  ChevronRight, 
  Compass, 
  Volume2, 
  Leaf, 
  Sliders
} from 'lucide-react';

interface TechViewProps {
  onNavigate: (page: string, params?: any) => void;
  language: 'CN' | 'EN';
}

export default function TechView({ onNavigate, language }: TechViewProps) {
  const [activeSection, setActiveSection] = useState<'modular' | 'silent' | 'green'>('modular');

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
    
    const timer = setTimeout(() => {
      elements.forEach((el) => el.classList.add('active'));
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-brand-dark pt-0 pb-12 overflow-x-hidden font-sans">
      
      {/* ── Immersive Cinematic Header & Background (DEEP DARK Style) ── */}
      <div className="relative w-full h-[550px] md:h-[650px] flex items-center justify-center overflow-hidden bg-[#0A0B0C] text-white">
        <div className="absolute inset-0 bg-[#0A0B0C]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/40 via-[#0A0B0C] to-[#0A0B0C]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35"></div>
          <div className="absolute -top-48 left-1/4 w-[600px] h-[600px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-48 right-1/4 w-[600px] h-[600px] bg-brand-gold/10 blur-[130px] rounded-full pointer-events-none"></div>
        </div>

        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen bg-cover bg-center" style={{ backgroundImage: "url('https://img-reg-ab.imagency.cn/e/123911daf02e9e85d0946f65e73db310.webp')" }}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0C] via-transparent to-[#0A0B0C]"></div>
        </div>

        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full border border-brand-gold/15 pointer-events-none opacity-20 pulse"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-gold text-[10px] uppercase tracking-widest font-mono font-bold mb-6 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping"></span>
            ALTULA {language === 'CN' ? '智能学设计科技' : 'SMART DESIGN TECH'}
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-none mb-6">
            {language === 'CN' ? (
              <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                特色技术
              </span>
            ) : (
              'Featured Technology'
            )}
          </h1>
          
          <p className="text-gray-400 font-light text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
            {language === 'CN'
              ? '以技术创新，重新定义活动看台的边界'
              : 'Redefining the boundaries of telescopic seating through technological innovation'}
          </p>
        </div>
      </div>

      {/* ── Core Concept Showcase (LIGHT DESIGN - Off-white with interactive tabs) ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-32 -mt-16 relative z-20">
        <div id="tech-interactive-module" className="bg-white border border-stone-200/60 rounded-[2.5rem] p-6 md:p-12 overflow-hidden shadow-luxury relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left: Interactive Sections */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
              
              <div 
                className={`p-4 md:p-[22px] rounded-2xl border transition-all duration-300 cursor-pointer ${
                  activeSection === 'modular'
                    ? 'bg-brand-gold/5 border-brand-gold/45 shadow-sm'
                    : 'bg-white border-transparent hover:bg-stone-50/60 hover:border-stone-200/40'
                }`}
                onClick={() => setActiveSection('modular')}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                    activeSection === 'modular' ? 'bg-brand-gold text-white shadow-md' : 'bg-stone-100 text-stone-600'
                  }`}>
                    <Sliders className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm md:text-base font-black text-brand-dark tracking-tight">
                    {language === 'CN' ? '模块化设计，快速落地' : 'Modular Design, Swift Realization'}
                  </h3>
                </div>
                <p className="text-gray-500 text-[11px] md:text-xs font-light leading-relaxed">
                  {language === 'CN'
                    ? 'ALTULA 采用全模块化产品架构，所有部件均在工厂预制完成，现场仅需简单拼接即可完成安装。相比传统看台，安装周期大幅缩短，且可根据空间变化灵活调整、扩展或迁移，真正实现一次投入，长期复用。'
                    : 'ALTULA adopts a fully modular product architecture with all components pre-engineered in the factory. On-site installation requires only simple assembly. Compared to traditional seating, the installation timeline is drastically shortened, allowing flexible adjustments, expansions, or relocations as spatial needs change, realizing long-term revenue.'}
                </p>
              </div>

              <div 
                className={`p-4 md:p-[22px] rounded-2xl border transition-all duration-300 cursor-pointer ${
                  activeSection === 'silent'
                    ? 'bg-brand-gold/5 border-brand-gold/45 shadow-sm'
                    : 'bg-white border-transparent hover:bg-stone-50/60 hover:border-stone-200/40'
                }`}
                onClick={() => setActiveSection('silent')}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                    activeSection === 'silent' ? 'bg-brand-gold text-white shadow-md' : 'bg-stone-100 text-stone-600'
                  }`}>
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm md:text-base font-black text-brand-dark tracking-tight">
                    {language === 'CN' ? '静谧运行，不打扰空间' : 'Quiet Flow, Undisturbed Ambiance'}
                  </h3>
                </div>
                <p className="text-gray-550 text-[11px] md:text-xs font-light leading-relaxed">
                  {language === 'CN'
                    ? '搭载工业级静音驱动系统与减震降噪结构，运行噪音低于45分贝，相当于图书馆的安静程度。即使在会议、演出等需要安静的场景中，看台的展开与收合也不会产生任何干扰，保持空间的静谧与秩序。'
                    : 'Equipped with an industrial-grade silent drive system and shock-absorbing noise-reduction structure, the operational noise is kept under 45 decibels, equivalent to the quietness of a library. The deployment and retraction of the seating will not cause any disruption.'}
                </p>
              </div>

              <div 
                className={`p-4 md:p-[22px] rounded-2xl border transition-all duration-300 cursor-pointer ${
                  activeSection === 'green'
                    ? 'bg-brand-gold/5 border-brand-gold/45 shadow-sm'
                    : 'bg-white border-transparent hover:bg-stone-50/60 hover:border-stone-200/40'
                }`}
                onClick={() => setActiveSection('green')}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                    activeSection === 'green' ? 'bg-brand-gold text-white shadow-md' : 'bg-stone-100 text-stone-600'
                  }`}>
                    <Leaf className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm md:text-base font-black text-brand-dark tracking-tight">
                    {language === 'CN' ? '绿色设计，可持续发展' : 'Green Design, Sustainable Development'}
                  </h3>
                </div>
                <p className="text-gray-550 text-[11px] md:text-xs font-light leading-relaxed">
                  {language === 'CN'
                    ? '所有产品均采用环保无毒材质，通过ISO14001环境管理体系认证。模块化结构可实现部件的单独更换与回收，减少资源浪费；节能驱动系统相比传统产品能耗显著降低，兼顾高端质感与绿色环保理念。'
                    : 'All products are crafted from eco-responsible, non-toxic materials and certified by ISO14001 Environmental Management Systems. The modular structure allows individual component replacement and recycling, reducing resource waste.'}
                </p>
              </div>

            </div>

            {/* Right: Immersive image matching active section */}
            <div className="lg:col-span-7 relative rounded-[2.2rem] overflow-hidden shadow-luxury border border-stone-200/40 min-h-[420px] h-full bg-stone-100">
              <img 
                src={
                  activeSection === 'modular' 
                    ? '/src/assets/images/regenerated_image_1779655862553.webp'
                    : activeSection === 'silent'
                    ? 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
                    : 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80'
                }
                alt={activeSection} 
                className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>

        </div>
      </div>

      {/* ── Core Deep Tech Modules ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24 md:space-y-36">

        {/* ── Module 1: 以空间为原点，而非产品本身 (LIGHT STYLE) ── */}
        <section className="reveal-up pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left text block with exquisite light/dark telemetry */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                  <Compass className="w-5 h-5" />
                </span>
                <span className="text-brand-gold text-[10px] uppercase tracking-widest font-bold leading-none">
                  {language === 'CN' ? '特色技术组 01 · 空间原点' : 'MODULE 01 · SPATIAL ORIGIN'}
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3.5xl font-black text-brand-dark tracking-tight leading-tight">
                {language === 'CN' ? '以空间为原点，而非产品本身' : 'Space as the Origin, Not the Product Itself'}
              </h2>
              
              <div className="space-y-4 text-gray-650 font-light text-sm md:text-base leading-relaxed">
                <p className="border-l-2 border-brand-gold pl-4 font-medium text-brand-dark">
                  {language === 'CN'
                    ? 'ALTULA 通过比例控制、线条克制与材质选择，让看台系统自然融入建筑语境，在视觉上“隐于空间”，在使用中“显于体验”。'
                    : 'ALTULA integrates telescopic systems naturally into architectural contexts through controlled proportions, restrained lines, and exquisite materials—hiding visually in space while standing out in actual experience.'}
                </p>
                <p className="text-gray-550 pt-1 text-xs md:text-sm">
                  {language === 'CN'
                    ? '座椅结构遵循人体工学逻辑，在高频使用与长时停留之间取得平衡，实现真正的舒适承载。木饰面与全软包设计，让看台更像一件精致的家具，而非冰冷的工业设备。'
                    : 'The seating structures conform strictly to ergonomic principles, striking a perfect balance between high-frequency utilization and prolonged sessions for true physical support.'}
                </p>
              </div>
            </div>

            {/* Right graphic presentation (Clean borderless style) */}
            <div className="lg:col-span-7 rounded-[2rem] overflow-hidden aspect-[16/9] bg-white border border-stone-200/50 shadow-luxury relative group">
              <img 
                src="/src/assets/images/regenerated_image_1779652631047.jpg" 
                alt="Aesthetic closeup of timber and leather texture" 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[4000ms]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6]/90 via-transparent to-transparent"></div>
            </div>
          </div>
        </section>


        {/* ── Module 2: 稳定有序，精准响应 (LIGHT STYLE) ── */}
        <section className="reveal-up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Graphic Presentation */}
            <div className="lg:col-span-7 rounded-[2rem] overflow-hidden aspect-[16/9] bg-white border border-stone-200/50 shadow-luxury order-2 lg:order-1 flex items-center justify-center p-6 md:p-8 relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FAF9F6] via-white to-white z-0"></div>
              <img 
                src="https://img-reg-ab.imagency.cn/e/eba0d9454fb1aeaa74d4b3276669c01c.png" 
                alt="Electrical synchronous control system blueprint" 
                className="w-full h-full object-contain select-none rounded-[1.5rem] relative z-10 group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6]/80 via-transparent to-transparent pointer-events-none z-10"></div>
            </div>

            {/* Right Text Block */}
            <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                  <Cpu className="w-5 h-5" />
                </span>
                <span className="text-brand-gold text-[10px] uppercase tracking-widest font-bold leading-none">
                  {language === 'CN' ? '特色技术组 02 · 精准响应' : 'MODULE 02 · PRECISE RESPONSE'}
                </span>
              </div>

              <h2 className="text-2xl md:text-3.5xl font-black text-brand-dark tracking-tight leading-tight">
                {language === 'CN' ? '稳定有序，精准响应' : 'Stable, Orderly & Precise Response'}
              </h2>

              <div className="space-y-4 text-gray-650 font-light text-sm md:text-base leading-relaxed">
                <p className="border-l-2 border-brand-gold pl-4 font-medium text-brand-dark">
                  {language === 'CN'
                    ? '基于电动驱动系统与分段控制技术，ALTULA 构建起稳定有序的运行逻辑。系统内置工业级控制芯片，实现多点同步驱动与运行状态的实时调度。'
                    : 'Driven by electric motor drives and segmented pacing, ALTULA builds a highly stable, orderly operational workflow.'}
                </p>
                <p className="text-gray-550 pt-1 text-xs md:text-sm">
                  {language === 'CN'
                    ? '通过行程限位与状态反馈机制，设备运行过程可被持续监测与修正。支持分区控制与集中管理，能够根据不同使用需求灵活调度。'
                    : 'Via active limit-switching and real-time state feedback mechanisms, the telescoping track is continuously audited.'}
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* ── Module 3: 安全是底层逻辑 (LIGHT STYLE) ── */}
        <section className="reveal-up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left text block */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <span className="text-brand-gold text-[10px] uppercase tracking-widest font-bold leading-none">
                  {language === 'CN' ? '特色技术组 03 · 底层安全逻辑' : 'MODULE 03 · SAFETY PROTOCOLS'}
                </span>
              </div>

              <h2 className="text-2xl md:text-3.5xl font-black text-brand-dark tracking-tight leading-tight">
                {language === 'CN' ? '安全是底层逻辑' : 'Safety is the Foundation'}
              </h2>

              <div className="space-y-4 text-gray-650 font-light text-sm md:text-base leading-relaxed">
                <p className="border-l-2 border-brand-gold pl-4 font-medium text-brand-dark font-sans">
                  {language === 'CN'
                    ? '系统采用高强度框架与多重支撑体系，确保整体稳定性与承载安全。引入雷达感应技术，对设备运行路径进行实时监测，当检测到人员或障碍物时即时停止运行。'
                    : 'Our structural engineering adopts high-strength framing and multi-point support structures to ensure global solidity. Radar imaging sensors scan active movement paths continuously, pausing operation instantly.'}
                </p>
                <p className="text-gray-550 pt-1 text-xs md:text-sm font-sans">
                  {language === 'CN'
                    ? '结合行程限位、防坠落结构及异常阻力保护机制，形成多重防护逻辑，让每一次使用都安全无虞。'
                    : 'Marrying dual-limit steps, absolute fall-protection systems, and active torque overload friction dampeners.'}
                </p>
              </div>
            </div>

            {/* Right graphic presentation (Clean Image-Only style, as requested) */}
            <div className="lg:col-span-7 rounded-[2rem] overflow-hidden aspect-[16/9] bg-white border border-stone-200/50 shadow-luxury relative group">
              <img 
                src="/src/assets/images/regenerated_image_1779652629465.webp" 
                alt="Architectural space safety stability design" 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>


        {/* ── Module 4: 两大突破，重新定义活动看台 (KEEPING DEEP DARK AS REQUESTED) ── */}
        <section className="py-16 md:py-24 bg-[#0A0B0C] rounded-[2.5rem] border border-neutral-800/80 shadow-2xl p-8 md:p-14 relative overflow-hidden reveal-up text-white">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-gold/10 via-transparent to-transparent opacity-70 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="text-center md:text-left mb-12 border-b border-neutral-800 pb-6">
              <span className="text-brand-gold text-[10px] uppercase tracking-[0.2em] font-bold">
                {language === 'CN' ? '多维技术突破与理念革新' : 'BREAKTHROUGHS & PARADIGM SHIFTS'}
              </span>
              <h3 className="text-2.5xl md:text-3.5xl font-black mt-2 text-white tracking-tight">
                {language === 'CN' ? '两大突破，重新定义活动看台' : 'Double Breakthrough Frameworks'}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {/* Breakthrough 1 */}
              <div className="bg-white/5 p-10 rounded-2xl border border-white/5 hover:border-brand-gold/30 transition-all duration-300">
                <span className="text-brand-gold text-[10px] font-bold tracking-widest block mb-4">
                  {language === 'CN' ? '核心突破 01 / 功能收纳' : 'BREAKTHROUGH 01 / ACTIVE STORAGE'}
                </span>
                <h4 className="text-2xl font-black text-white mb-4">{language === 'CN' ? '收纳即功能' : 'Storage as the Function'}</h4>
                <p className="text-gray-400 font-light text-xs md:text-sm leading-relaxed">
                  {language === 'CN'
                    ? '不再只是节省空间，而是让收纳本身成为空间使用的一部分。下部结构集成储物模块，可收纳折叠椅等临时设施，进一步扩展空间承载能力。'
                    : 'No longer a simple space saver, storage becomes integrated into daily layouts.'}
                </p>
              </div>

              {/* Breakthrough 2 */}
              <div className="bg-white/5 p-10 rounded-2xl border border-white/5 hover:border-brand-gold/30 transition-all duration-300">
                <span className="text-brand-gold text-[10px] font-bold tracking-widest block mb-4">
                  {language === 'CN' ? '核心突破 02 / 隐于无形' : 'BREAKTHROUGH 02 / INSTANT CAMOUFLAGE'}
                </span>
                <h4 className="text-2xl font-black text-white mb-4">{language === 'CN' ? '消失于空间' : 'Disappearing from Space'}</h4>
                <p className="text-gray-400 font-light text-xs md:text-sm leading-relaxed">
                  {language === 'CN'
                    ? '摒弃传统金属外露的工业感，采用统一的木饰面与软包设计，让看台成为空间的延伸，存在但不打扰。'
                    : 'Removing raw industrial steel skeletons, unified matching luxury timber facades.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Immersive LIGHT BRANDED UNDERNEATH CTA (Luxurious Off-White with gold) ── */}
        <div className="bg-gradient-to-b from-white to-[#FAF9F6] rounded-[2.5rem] p-12 md:p-20 text-center border border-stone-200/60 shadow-luxury w-full relative overflow-hidden reveal-up">
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-brand-gold/5 blur-[90px] rounded-full pointer-events-none z-0"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-bold block">
              {language === 'CN' ? '空间重设 · 精准定制' : 'DYNAMIC SPATIAL BLUEPRINTS'}
            </span>
            <h3 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-none">
              {language === 'CN' ? '体验前沿技术带来的空间变革' : 'Experience the spatial revolution driven by leading-edge technology'}
            </h3>
            <p className="text-gray-550 font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              {language === 'CN'
                ? 'ALTULA 的精密组件工程师与多功能场景规划专家随时就位，为您解构看台系统的无限应用。'
                : 'Our design experts and material scientists are ready to assist with high-end digital models and tailored architectural fits.'}
            </p>
            <div className="pt-6">
              <button
                onClick={() => onNavigate('products')}
                className="bg-brand-gold hover:bg-brand-gold/90 text-white px-10 py-4.5 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer shadow-lg hover:shadow-brand-gold/20 inline-flex items-center gap-2 hover:scale-[1.03] transition-transform duration-200"
              >
                <span>{language === 'CN' ? '查看产品系列' : 'Explore Collections'}</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
