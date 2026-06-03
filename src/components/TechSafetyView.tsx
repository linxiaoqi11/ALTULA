import React, { useEffect, useState } from 'react';
import { 
  ShieldCheck, 
  ChevronRight, 
  ShieldAlert,
  Flame,
  Wrench,
  Zap,
  Activity,
  Eye,
  Lock,
  Sliders,
  Layers,
  Cpu
} from 'lucide-react';

interface TechSafetyViewProps {
  onNavigate: (page: string, params?: any) => void;
  language: 'CN' | 'EN';
}

const safetyFeatures = [
  {
    num: "01",
    titleCN: "主动式毫米波探测",
    titleEN: "Active Millimeter-Wave Radar",
    descCN: "台底配置激光运动传感器，360°无死角监测，人员闯入可自动报警、自动制动，杜绝安全隐患。",
    descEN: "Lower deck is configured with high-sensitivity laser motion sensors for 360-degree situational scanning, auto-braking upon localized intrusion to secure dynamic spaces.",
    image: "https://img-reg-ab.imagency.cn/e/d7e3b21df042913844f8cc9e62c007f0.jpg",
    iconName: "Eye"
  },
  {
    num: "02",
    titleCN: "防坠落封档",
    titleEN: "Fall Protection Shields",
    descCN: "全包围式防坠落设计，防止看台侧边人员踏空或坠物，安全省心，符合国家公共安全标准。",
    descEN: "Fully enclosed safety panel barriers stop spectators or equipment components from sliding off borders, meeting global safety and structural security standards.",
    image: "https://img-reg-ab.imagency.cn/e/123911daf02e9e85d0946f65e73db310.webp",
    iconName: "ShieldAlert"
  },
  {
    num: "03",
    titleCN: "异常阻力保护",
    titleEN: "Obstacle Resistance Guard",
    descCN: "当检测到异常阻力时，系统立即停止运行，避免设备损坏与人员伤害，反应时间小于0.1秒。",
    descEN: "State-of-the-art power load cells instantly freeze dynamic motor transmissions in less than 0.1s upon sensing high operational resistance or track jams.",
    image: "https://img-reg-ab.imagency.cn/e/5432a4646b0b7f13280259f9e7a72781.jpg",
    iconName: "Activity"
  },
  {
    num: "04",
    titleCN: "双重行程限位",
    titleEN: "Dual-Limit Positioning Gates",
    descCN: "机械+电子双重限位保护，确保看台运行在安全范围内，不会超程，即使单一限位失效也能保证安全。",
    descEN: "Couples hardware mechanical bumper limits with smart optoelectronic sensors to prevent structural overshoot even in extreme system anomalies.",
    image: "https://img-reg-ab.imagency.cn/e/4dc6ecfc013cf48039cfa34cc62a3f9e.jpg",
    iconName: "Sliders"
  },
  {
    num: "05",
    titleCN: "超承压结构系统",
    titleEN: "High-Load Structural Alloy",
    descCN: "首创领先构型，优选高张力轻钢，负载均匀分布，抗震耐久，最高可支持32排看台。",
    descEN: "Engineered with a high-tensile alloy steel chassis to split dynamic loads evenly, securing reliable seismic stiffness for up to 32 rows.",
    image: "https://img-reg-ab.imagency.cn/e/2ad933f78bf48d566f9e4dfde95ac73e.png",
    iconName: "Layers"
  },
  {
    num: "06",
    titleCN: "紧急停止按钮",
    titleEN: "Tactile Emergency Stop Hubs",
    descCN: "每一排看台都配备独立的紧急停止按钮，遇到任何突发情况都能立即停止运行。",
    descEN: "Highly visible physical manual shutoff push-valves are distributed on each individual platform tier to instantly cut power paths during sudden events.",
    image: "https://img-reg-ab.imagency.cn/e/13cdbba98ab5389c3943bb33868f153d.jpg",
    iconName: "Zap"
  }
];

const renderIcon = (name: string, className: string) => {
  switch (name) {
    case 'Lock': return <Lock className={className} />;
    case 'Eye': return <Eye className={className} />;
    case 'ShieldAlert': return <ShieldAlert className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'Flame': return <Flame className={className} />;
    case 'Wrench': return <Wrench className={className} />;
    case 'Activity': return <Activity className={className} />;
    case 'Sliders': return <Sliders className={className} />;
    case 'Layers': return <Layers className={className} />;
    default: return <ShieldCheck className={className} />;
  }
};

export default function TechSafetyView({ onNavigate, language }: TechSafetyViewProps) {
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
      
      {/* ── 通栏1：顶部Banner ── */}
      <div className="relative w-full h-[550px] md:h-[650px] flex items-center justify-center overflow-hidden bg-[#070809] text-white">
        {/* Background Dark Container */}
        <div className="absolute inset-0 bg-[#070809]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/40 via-[#070809] to-[#070809] z-10"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35 z-10"></div>
          <div className="absolute -top-48 left-1/4 w-[600px] h-[600px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none z-10"></div>
          <div className="absolute -bottom-48 right-1/4 w-[600px] h-[600px] bg-brand-gold/8 blur-[130px] rounded-full pointer-events-none z-10"></div>
        </div>

        {/* Foreground dynamic image showing industrial steel bracing / detail view */}
        <div 
          className="absolute inset-0 z-0 opacity-30 mix-blend-screen bg-cover bg-center" 
          style={{ backgroundImage: "url('https://img-reg-ab.imagency.cn/e/12a8e9f16fde300a0ac15cd7ae7de2b8.webp')" }}
        >
          {/* Lowered Opacity Black Overlay */}
          <div className="absolute inset-0 bg-black/45"></div>
        </div>

        {/* Cinematic circular vector outline */}
        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full border border-brand-gold/15 pointer-events-none opacity-20 pulse z-10"></div>

        <div className="relative z-15 max-w-5xl mx-auto text-center px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-gold text-[10px] uppercase tracking-widest font-mono font-bold mb-6 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-soft"></span>
            ALTULA {language === 'CN' ? '绝对防御极限' : 'ABSOLUTE PROTECTION'}
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-none mb-6">
            {language === 'CN' ? '安全配置' : 'Safety Protocols'}
          </h1>
          
          <h2 className="text-xl md:text-3.5xl font-light text-brand-gold tracking-tight mb-6">
            {language === 'CN' ? '安全不仅是标准，更是底层逻辑' : 'Safety is not just a standard, but our foundational logic'}
          </h2>
          
          <p className="text-gray-300 font-light text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {language === 'CN'
              ? '构建从硬件到软件的全维度安全防护体系，让每一次使用都安全无忧'
              : 'Constructing a multi-dimensional safety shield from hardware code to structural alloy steel to ensure ultimate peace of mind.'}
          </p>
        </div>
      </div>

      {/* ── 通栏2：左文右图通栏（新增/保持该模块，完全复用原美学模块的图文布局） ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 md:mb-24 -mt-16 relative z-20">
        <div id="tech-interactive-module" className="bg-white border border-stone-200/60 rounded-[2.5rem] p-8 md:p-14 overflow-hidden shadow-luxury relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left Column: Spatial Design Philosophy */}
            <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-brand-gold text-[10px] uppercase tracking-widest font-bold leading-none">
                  {language === 'CN' ? '安全配置' : 'SAFETY PROTOCOL'}
                </span>
              </div>

              <h2 className="text-2xl md:text-3.5xl font-black text-brand-dark tracking-tight leading-tight">
                {language === 'CN' ? '安全是底层逻辑' : 'Safety is Foundational Logic'}
              </h2>

              <div className="space-y-4 text-stone-600 font-light text-[13px] md:text-sm leading-relaxed">
                <p className="border-l-2 border-brand-gold pl-4 font-normal text-brand-dark">
                  {language === 'CN'
                    ? '安全不仅是标准，更是ALTULA产品设计的底层逻辑。我们构建了从硬件到软件的全维度安全防护体系，多重机制相互配合，让每一次使用都安全无虞。'
                    : 'Safety is never simply a structural regulation; it served as the absolute cornerstone guidelines of ALTULA design paradigms. We engineer a holistic shield bridging physical and software parameters.'}
                </p>
                <p className="text-stone-500 pl-4">
                  {language === 'CN'
                    ? '系统采用高强度框架与多重支撑体系，确保整体稳定性与承载安全。引入雷达感应技术，对设备运行路径进行实时监测，有效降低意外风险。'
                    : 'Our systems harness ultra-rigid grid layouts paired with responsive active radar arrays, sensing movement paths constantly to block unanticipated risks and secure dynamic operations.'}
                </p>
              </div>
            </div>

            {/* Right Column: Dynamic Image Showcase (工人正在安装看台结构的场景图) */}
            <div className="lg:col-span-12 xl:col-span-7 relative rounded-[2rem] overflow-hidden shadow-luxury border border-stone-200/40 aspect-[16/10] bg-stone-100 group">
              <img 
                src="https://img-reg-ab.imagency.cn/e/1f261656c79a3b5a014673e90e744f8e.jpg"
                alt="ALTULA Steel Bracing Construction Installation" 
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-[4000ms] group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/10 via-transparent to-transparent"></div>
            </div>

          </div>

        </div>
      </div>

      {/* ── 通栏3：6卡片网格通栏 ── */}
      <div id="safety-configs-section" className="max-w-7xl mx-auto px-6 md:px-12 mb-20 md:mb-24 reveal-up">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16 text-left">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-brand-gold text-[10px] uppercase tracking-widest font-bold leading-none">
              {language === 'CN' ? '主动预防与被动装甲' : 'ACTIVE RESOLUTION & PASSIVE SHIELD'}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-none mb-6">
            {language === 'CN' ? '多重防护，万无一失' : 'Absolute Multi-Tier Protection'}
          </h2>
          <p className="text-stone-600 font-light text-sm md:text-base leading-relaxed">
            {language === 'CN' 
              ? '从主动预警到被动防护，构建全方位的安全屏障'
              : 'Our design integrates dynamic structural shielding, real-time sensing limits, and fast auto-braking protocols to secure spectators.'}
          </p>
        </div>

        {/* 6 Grid Bento-Style Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {safetyFeatures.map((item) => (
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

              {/* Bottom Subtle Interactive Line */}
              <div className="w-full h-[1px] bg-stone-100 mt-6 relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-0 bg-brand-gold group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>



      {/* ── 通栏5：底部CTA通栏（保留原CTA样式，仅改文字） ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="bg-gradient-to-b from-white to-[#FAF9F6] rounded-[2.5rem] p-12 md:p-20 text-center border border-stone-200/60 shadow-luxury w-full relative overflow-hidden reveal-up">
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-brand-gold/5 blur-[90px] rounded-full pointer-events-none z-0"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-bold block">
              {language === 'CN' ? '尊享守护 · 一生托付' : 'SECURED SYSTEMS GUARANTEE'}
            </span>
            <h3 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-none">
              {language === 'CN' ? '安全，是我们对您的承诺' : 'Safety is our absolute vow to you'}
            </h3>
            <p className="text-gray-550 font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              {language === 'CN'
                ? 'ALTULA全维度安全防护体系，为您的空间保驾护航'
                : 'ALTULA multi-dimensional security network acts as the ultimate bedrock shield to insulate your facility operations.'}
            </p>
            <div className="pt-6">
              <button
                onClick={() => onNavigate('contact')}
                className="bg-brand-gold hover:bg-brand-gold/90 text-white px-10 py-4.5 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer shadow-lg hover:shadow-brand-gold/20 inline-flex items-center gap-2 hover:scale-[1.03] transition-transform duration-200"
              >
                <span>{language === 'CN' ? '了解更多安全细节' : 'Learn More Safety Details'}</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
