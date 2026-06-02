import React, { useEffect, useState } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  ChevronRight, 
  Compass,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Heart,
  Volume2,
  Eye,
  Wind,
  Palette,
  Layers,
  Activity
} from 'lucide-react';

interface TechViewProps {
  onNavigate: (page: string, params?: any) => void;
  language: 'CN' | 'EN';
}

const aestheticsComfortFeatures = [
  {
    num: "01",
    titleCN: "Concepto圆形坐垫",
    titleEN: "Concepto Circular Cushion",
    descCN: "430*430*4mm记忆海绵填充，均匀分摊体重，贴合身体曲线，久坐不塌陷",
    descEN: "430*430*4mm high-density memory foam padding distributes body weight evenly, matches natural curves, and remains resilient without collapsing.",
    image: "https://img-reg-ab.imagency.cn/e/12a8e9f16fde300a0ac15cd7ae7de2b8.webp",
    iconName: "Sparkles"
  },
  {
    num: "02",
    titleCN: "Orden方形坐垫",
    titleEN: "Orden Square Cushion",
    descCN: "高密度冷泡海绵，回弹性优异，长期使用不变形，易清洁易维护",
    descEN: "Premium cold-cured resilient foam offers outstanding elasticity, preventing deformation during long-term commercial use while being extremely easy to clean.",
    image: "https://img-reg-ab.imagency.cn/e/123911daf02e9e85d0946f65e73db310.webp",
    iconName: "Layers"
  },
  {
    num: "03",
    titleCN: "103°黄金靠背倾角",
    titleEN: "103° Golden Backrest Angle",
    descCN: "自然贴合脊柱生理曲度，有效缓解腰部压力，2小时会议无疲劳感",
    descEN: "Engineered to mimic natural spinal curvature, relieving lumbar load perfectly. Keeps participants active, focused and comfortable even during 2-hour long symposia.",
    image: "https://img-reg-ab.imagency.cn/e/5a54fe0465b40c88314cf2c1bffe68fc.jpg",
    iconName: "Compass"
  },
  {
    num: "04",
    titleCN: "多材质定制",
    titleEN: "Sovereign Multi-Material Finishes",
    descCN: "提供木纹、金属、布艺、皮革等多种材质选择，完美匹配任何空间风格",
    descEN: "Personalize your layout with a luxurious variety of real wood veneers, brushed metals, durable acoustic fabrics, and micro-leathers to suit any interior theme.",
    image: "https://img-reg-ab.imagency.cn/e/2ad933f78bf48d566f9e4dfde95ac73e.png",
    iconName: "Palette"
  },
  {
    num: "05",
    titleCN: "隐藏式螺丝设计",
    titleEN: "Concealed Hardware Screws",
    descCN: "所有外露部件无螺丝，视觉更整洁，同时避免磕碰伤害",
    descEN: "A flush, screw-free exterior profile keeps the visual workspace immaculate while eliminating risk of grazing knees or snagging clothes underfoot.",
    image: "https://img-reg-ab.imagency.cn/e/d7e3b21df042913844f8cc9e62c007f0.jpg",
    iconName: "Eye"
  },
  {
    num: "06",
    titleCN: "圆角工艺处理",
    titleEN: "Exquisite Rounded Chamfers",
    descCN: "所有边角均采用圆弧过渡，触感顺滑，提升空间整体柔和度",
    descEN: "By replacing heavy industrial edges with delicate rounded corners, the system delivers soft sensory touchpoints and enhances architectural harmony.",
    image: "https://img-reg-ab.imagency.cn/e/9f41c71e27f68a5ed64a7dd5411341b7.jpg",
    iconName: "Wind"
  }
];

const renderIcon = (name: string, className: string) => {
  switch (name) {
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Heart': return <Heart className={className} />;
    case 'Volume2': return <Volume2 className={className} />;
    case 'Eye': return <Eye className={className} />;
    case 'Wind': return <Wind className={className} />;
    case 'Palette': return <Palette className={className} />;
    case 'Compass': return <Compass className={className} />;
    case 'Layers': return <Layers className={className} />;
    default: return <Cpu className={className} />;
  }
};

export default function TechView({ onNavigate, language }: TechViewProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen bg-cover bg-center" style={{ backgroundImage: "url('https://img-reg-ab.imagency.cn/e/5431c65a2723060f74ade4532238287b.webp')" }}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0C] via-transparent to-[#0A0B0C]"></div>
        </div>

        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full border border-brand-gold/15 pointer-events-none opacity-20 pulse"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-gold text-[10px] uppercase tracking-widest font-mono font-bold mb-6 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping"></span>
            ALTULA {language === 'CN' ? '美学与舒适' : 'AESTHETICS & COMFORT'}
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-none mb-4">
            {language === 'CN' ? (
              <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                美学与舒适
              </span>
            ) : (
              'Aesthetics & Comfort'
            )}
          </h1>
          
          <p className="text-brand-gold font-medium text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed mb-6">
            {language === 'CN'
              ? '以空间为原点，而非产品本身'
              : 'Space as the Origin, Not the Product Itself'}
          </p>

          <p className="text-gray-400 font-light text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {language === 'CN'
              ? '让设施成为空间的一部分，而非被摆放进去的设备'
              : 'Let facilities grow organically within the architectural context, rather than just being placed as equipment.'}
          </p>
        </div>
      </div>

      {/* ── Core Concept Showcase (LIGHT DESIGN - Off-white single showcase) ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 md:mb-24 -mt-16 relative z-20">
        <div id="tech-interactive-module" className="bg-white border border-stone-200/60 rounded-[2.5rem] p-8 md:p-14 overflow-hidden shadow-luxury relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left Column: Architectural and Spatial Philosophy */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-brand-gold text-[10px] uppercase tracking-widest font-bold leading-none">
                  {language === 'CN' ? '空间哲学' : 'SPATIAL PHILOSOPHY'}
                </span>
              </div>

              <h2 className="text-2xl md:text-3.5xl font-black text-brand-dark tracking-tight leading-tight">
                {language === 'CN' ? '以空间为原点，而非产品本身' : 'Space as the Origin, Not the Product Itself'}
              </h2>

              <div className="space-y-4 text-stone-600 font-light text-[13px] md:text-sm leading-relaxed">
                <p className="border-l-2 border-brand-gold pl-4 font-normal text-brand-dark">
                  {language === 'CN'
                    ? 'ALTULA 通过比例控制、线条克制与材质选择，让看台系统自然融入建筑语境，在视觉上 "隐于空间"，在使用中 "显于体验"。'
                    : 'ALTULA integrates telescopic systems naturally into architectural contexts through controlled proportions, restrained lines, and exquisite materials—hiding visually in space while standing out in actual experience.'}
                </p>
                <p className="text-stone-500 pl-4">
                  {language === 'CN'
                    ? '座椅结构遵循人体工学逻辑，在高频使用与长时停留之间取得平衡，实现真正的舒适承载。木饰面与全软包设计，让看台更像一件精致的家具，而非冰冷的工业设备。'
                    : 'The seating structures conform strictly to ergonomic principles, striking a perfect balance between high-frequency utilization and prolonged sessions for true physical support. With fine wood finishes and full upholstery, the system serves as sophisticated furniture rather than cold industrial equipment.'}
                </p>
              </div>
            </div>

            {/* Right Column: Immersive Image with Architectural Precision */}
            <div className="lg:col-span-7 relative rounded-[2rem] overflow-hidden shadow-luxury border border-stone-200/40 aspect-[16/10] bg-stone-100 group">
              <img 
                src="https://img-reg-ab.imagency.cn/e/5431c65a2723060f74ade4532238287b.webp"
                alt="ALTULA Spatial Origin Showcase" 
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-[4000ms] group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/10 via-transparent to-transparent"></div>
            </div>

          </div>

        </div>
      </div>

      {/* ── AESTHETICS & COMFORT (美学与舒适 section) ── */}
      <div id="aesthetics-comfort-section" className="max-w-7xl mx-auto px-6 md:px-12 mb-20 md:mb-24 reveal-up">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16 text-left">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-brand-gold text-[10px] uppercase tracking-widest font-bold leading-none">
              {language === 'CN' ? '触感与质感' : 'TEXTURE & SENSIBILITY'}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-none mb-6">
            {language === 'CN' ? '细节见真章，舒适藏于每一处' : 'Details Matter, Comfort is Hidden in Plain Sight'}
          </h2>
          <p className="text-stone-600 font-light text-sm md:text-base leading-relaxed">
            {language === 'CN' 
              ? '从材质选择到工艺打磨，每一个细节都为更好的体验而生'
              : 'From material selection to hand craftsmanship, every single detail is born for a superior sensory experience.'}
          </p>
        </div>

        {/* 6 Grid Bento-Style Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {aestheticsComfortFeatures.map((item) => (
            <div 
              key={item.num}
              className="group bg-white rounded-3xl border border-stone-200/50 p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-luxury hover:border-slate-300/80"
            >
              <div>
                {/* Image Frame with Aspect Ratio */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 bg-stone-100 border border-stone-200/20">
                  <img 
                    src={item.image} 
                    alt={language === 'CN' ? item.titleCN : item.titleEN} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none"></div>
                </div>

                {/* Sub-Header with Icon and Number Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-brand-gold/90 shrink-0 border border-stone-200/20 mr-2 group-hover:bg-brand-gold/10 group-hover:text-brand-gold transition-colors duration-300">
                      {renderIcon(item.iconName, "w-4 h-4")}
                    </span>
                    <h3 className="text-base md:text-lg font-black text-brand-dark tracking-tight transition-colors duration-200 group-hover:text-brand-gold">
                      {language === 'CN' ? item.titleCN : item.titleEN}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-stone-400 bg-stone-100 px-2 py-0.5 rounded-md pointer-events-none">
                    {item.num}
                  </span>
                </div>

                {/* Inner Content Text */}
                <p className="text-stone-500 font-light text-xs md:text-[13.5px] leading-relaxed">
                  {language === 'CN' ? item.descCN : item.descEN}
                </p>
              </div>

              {/* Bottom Subtle Interactive Line for Craftsmanship Touch */}
              <div className="w-full h-[1px] bg-stone-100 mt-6 relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-0 bg-brand-gold group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── COMFORT DETAILS (Full screen horizontal section) ── */}
      <div id="safety-config-section" className="w-full bg-[#1E2022] border-y border-neutral-800/40 py-20 md:py-28 relative overflow-hidden text-white my-16">
        <div className="absolute inset-0 bg-[url('https://img-reg-ab.imagency.cn/e/12a8e9f16fde300a0ac15cd7ae7de2b8.webp')] bg-cover bg-center opacity-12 pointer-events-none"></div>
        <div className="absolute inset-0 bg-black/48 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-brand-gold/5 via-transparent to-transparent opacity-80 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-15 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {(() => {
            const aestheticsProtocols = [
              {
                idx: 0,
                num: '01',
                btnTitleCN: '收合隐形设计',
                btnTitleEN: 'Invisible Retraction',
                btnDescCN: '完全收合后与墙面齐平，几乎不可见。',
                btnDescEN: 'Completely flush with structural walls when fully retracted.',
                categoryCN: '收合美学 / INTEGRATIVE MINIMALISM',
                categoryEN: 'SPACE OPTIMIZATION | CONCEALED FORM',
                mainTitleCN: '收合隐形设计，浑然一体的视觉纯净',
                mainTitleEN: 'Completely Flush Architectural Integration When Retracted',
                detailDescCN: '完全收合后与墙面齐平，几乎不可见。通过高静密折叠机制与高维参数模数对齐，消除视觉突兀度，使其在不使用时成为静谧的背景。',
                detailDescEN: 'Once fully retracted, the entire bleacher matches structural walls seamlessly, hiding all hardware details to keep spaces clean and uncluttered.',
                image: 'https://img-reg-ab.imagency.cn/e/5431c65a2723060f74ade4532238287b.webp'
              },
              {
                idx: 1,
                num: '02',
                btnTitleCN: '模数化拼接',
                btnTitleEN: 'Modular Connection',
                btnDescCN: '可根据空间尺寸自由组合，无缝衔接。',
                btnDescEN: 'Freely combinable layouts that snap seamlessly into place.',
                categoryCN: '积木组合 / FLEXIBLE EXTENSION',
                categoryEN: 'MODULAR COORDINATION | INTERACTION SPACE',
                mainTitleCN: '可根据空间尺寸自由组合，随时无缝衔接',
                mainTitleEN: 'Modular Configuration Connects Layout Boundaries Seamlessly',
                detailDescCN: '可根据空间尺寸自由组合，无缝衔接。模数化组件经过标准化物理公差校准，可以在几分钟内调整看台段落以契合各式大型多功能场景。',
                detailDescEN: 'Standardized components align under strict physical tolerance levels, enabling quick extensions and sections tailoring to fit active multipurpose venues.',
                image: 'https://img-reg-ab.imagency.cn/e/f77ee005ec194f8323d0bbaa4d26852d.webp'
              },
              {
                idx: 2,
                num: '03',
                btnTitleCN: '无棱角线条',
                btnTitleEN: 'Sleek Curved Outlines',
                btnDescCN: '所有线条均采用柔和过渡，与建筑自然融合。',
                btnDescEN: 'Linear design with soft transitions that blend into rooms.',
                categoryCN: '柔和流线 / ORGANIC CURVES',
                categoryEN: 'CHAMFER ARCHITECTURE | ANTI-COLLISION LINE',
                mainTitleCN: '所有线条均采用柔和过渡，提升空间整体性',
                mainTitleEN: 'Soft Rounded Outlines Flow Into Natural Architectural Formats',
                detailDescCN: '所有线条均采用柔和过渡，与建筑自然融合。倒角圆弧工艺平顺过渡，在避免意外磕碰发生的同时强化视觉优雅度。',
                detailDescEN: 'By crafting subtle organic corner transitions across both handles and panels, ALTULA adds high-end architectural softness while guaranteeing bump-resistant safety.',
                image: 'https://img-reg-ab.imagency.cn/e/9f41c71e27f68a5ed64a7dd5411341b7.jpg'
              },
              {
                idx: 3,
                num: '04',
                btnTitleCN: '色彩定制',
                btnTitleEN: 'Bespoke Colorways',
                btnDescCN: '支持全色系定制，与空间色调保持一致。',
                btnDescEN: 'Supports infinite color palettes to match existing decors.',
                categoryCN: '色彩美学 / CHROMATIC PURSUIT',
                categoryEN: 'BESPOKE FINISHES | CHROME HARMONY',
                mainTitleCN: '支持全色系定制，传递无出其右的贵重质感',
                mainTitleEN: 'Personalized Palettes Maintain Sovereign Architectural Harmony',
                detailDescCN: '支持全色系定制，与空间色调保持一致。我们提供多达一百种精奢色板选择，从天然烟熏色木装潢到艺术级织物表面，均能按需适配。',
                detailDescEN: 'Select from custom paint finishes, precious anodized metals, and performance textiles to seamlessly coordinate with any dynamic workspace theme.',
                image: 'https://img-reg-ab.imagency.cn/e/2ad933f78bf48d566f9e4dfde95ac73e.png'
              }
            ];

            const activeItem = aestheticsProtocols[activeTab] || aestheticsProtocols[0];

            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mt-4 relative z-20">
                {/* Left Column: Image Showcase */}
                <div className="lg:col-span-7 flex flex-col justify-start relative">
                  <div className="relative aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden border border-neutral-800/40 shadow-2xl group bg-[#111214]">
                    <img 
                      src={activeItem.image} 
                      alt={language === 'CN' ? activeItem.btnTitleCN : activeItem.btnTitleEN} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10"></div>
                    
                    {/* Floating Info */}
                    <div className="absolute bottom-8 left-8 right-8 z-20 text-left space-y-3.5 animate-fade-in pointer-events-none">
                      <div className="flex items-center gap-2">
                        <span className="text-brand-gold text-[10px] font-mono font-bold tracking-widest uppercase bg-brand-gold/20 px-2 py-0.5 rounded-md">
                          {activeItem.num}
                        </span>
                        <h4 className="text-base md:text-lg font-black text-white uppercase tracking-tight">
                          {language === 'CN' ? activeItem.btnTitleCN : activeItem.btnTitleEN}
                        </h4>
                      </div>
                      <p className="text-stone-100 font-normal text-xs md:text-[13px] leading-relaxed">
                        {language === 'CN' ? activeItem.detailDescCN : activeItem.detailDescEN}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Tab Selectors */}
                <div className="lg:col-span-5 flex flex-col justify-start py-2 space-y-6 md:space-y-8 relative z-25">
                  <div className="space-y-4 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-brand-gold text-[10px] md:text-xs font-mono tracking-[0.25em] uppercase font-bold">
                        {language === 'CN' ? '设计理念' : 'DESIGN PHILOSOPHY'}
                      </span>
                    </div>

                    <h3 className="text-3.5xl md:text-[44px] lg:text-[48px] font-black text-white tracking-tight leading-tight md:leading-[1.1]">
                      {language === 'CN' ? '不被注意，才是最好的设计' : 'The Best Design is the One That Goes Unnoticed'}
                    </h3>

                    <p className="text-stone-200 font-normal text-sm md:text-[14.5px] leading-relaxed max-w-2xl mt-3">
                      {language === 'CN'
                        ? '我们相信，真正好的空间设施，应该在不使用时"消失"，在使用时"恰到好处"。ALTULA摒弃多余的装饰与突兀的结构，通过精确的模数化设计，让收合后的看台与墙面、地面形成完整的视觉平面。它不是被摆放进去的设备，而是与空间共同生长的组成部分。'
                        : 'We believe that truly great spatial components should disappear when not in use and perform flawlessly when active. By abandoning superfluous accessories and obtrusive frameworks, ALTULA enables retracted seating decks to form a perfectly flush wall-floor visual plane. It is not just gear dropped in place, but an integral coordinate growing with the room.'}
                    </p>
                  </div>

                  {/* 2x2 buttons layout */}
                  <div className="text-left relative z-30">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {aestheticsProtocols.map((item) => {
                        const isActive = activeTab === item.idx;
                        return (
                          <button
                            key={item.idx}
                            onClick={() => setActiveTab(item.idx)}
                            className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 select-none flex flex-col justify-between min-h-[110px] cursor-pointer focus:outline-none relative z-40 ${
                              isActive
                                ? 'bg-[#12110e]/95 border-brand-gold/25 shadow-lg shadow-brand-gold/5 text-white'
                                : 'bg-[#0b0c0d]/85 border-white/[0.04] hover:bg-[#0f1011]/95 hover:border-neutral-700/20 text-gray-400 hover:text-white'
                            }`}
                          >
                            <div className="flex justify-between items-start w-full mb-1">
                              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                                isActive ? 'bg-brand-gold text-brand-dark' : 'bg-neutral-900 text-stone-400'
                              }`}>
                                {item.num}
                              </span>
                            </div>

                            <div className="space-y-0.5">
                              <h4 className={`text-xs md:text-[14px] font-black tracking-tight transition-colors ${
                                isActive ? 'text-brand-gold' : 'text-stone-100'
                              }`}>
                                {language === 'CN' ? item.btnTitleCN : item.btnTitleEN}
                              </h4>
                              <p className="text-[11px] text-gray-300 line-clamp-2 leading-relaxed mt-1.5 font-normal">
                                {language === 'CN' ? item.btnDescCN : item.btnDescEN}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* ── Immersive LIGHT BRANDED UNDERNEATH CTA ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="bg-gradient-to-b from-white to-[#FAF9F6] rounded-[2.5rem] p-12 md:p-20 text-center border border-stone-200/60 shadow-luxury w-full relative overflow-hidden reveal-up">
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-brand-gold/5 blur-[90px] rounded-full pointer-events-none z-0"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-bold block">
              {language === 'CN' ? '空间重设 · 臻美体验' : 'BEAUTIFUL SPATIAL BALANCING'}
            </span>
            <h3 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-none">
              {language === 'CN' ? '体验美学与技术的完美融合' : 'Experience the Perfect Fusion of Aesthetics & Tech'}
            </h3>
            <p className="text-gray-550 font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              {language === 'CN'
                ? 'ALTULA的精密组件工程师与多场景规划专家随时就位，为您解构看台系统的无限应用'
                : 'ALTULA precision hardware engineers and multi-scenario planners are standing by to decode the limitless possibilities of our seating systems.'}
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

