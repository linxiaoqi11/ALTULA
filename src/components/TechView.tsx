import React, { useEffect, useState } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  ChevronRight, 
  Compass,
  ArrowLeft,
  ArrowRight,
  Zap,
  Minimize2,
  RefreshCw,
  Smartphone,
  Database,
  Lightbulb
} from 'lucide-react';

interface TechViewProps {
  onNavigate: (page: string, params?: any) => void;
  language: 'CN' | 'EN';
}

const smartEfficientFeatures = [
  {
    num: "01",
    titleCN: "IOT 边缘计算中枢",
    titleEN: "IoT Edge Computing Center",
    descCN: "系统内置工业级边缘计算芯片，实现多点同步驱动与运行状态的实时调度。毫秒级响应速度，使每一次展开与收合都具备精确的一致性控制，无卡顿、无偏差。",
    descEN: "Built-in industrial-grade edge computing chips enable multi-point synchronous driving and real-time scheduling of operational status. Millisecond-level response speed ensures that each deployment and retraction possesses precise, consistent control with zero lagging or deviations.",
    image: "https://img-reg-ab.imagency.cn/e/5a54fe0465b40c88314cf2c1bffe68fc.jpg",
    iconName: "Zap"
  },
  {
    num: "02",
    titleCN: "专利限位排锁 2.0",
    titleEN: "Patented Row Limit Lock 2.0",
    descCN: "独家专利行程限位与状态反馈机制，设备运行过程可被持续监测与自动修正。精准锁定每一排的位置，在保证安全边界的前提下，实现平稳高效的空间转换。",
    descEN: "Our exclusive patented travel limit and state feedback mechanism allows continuous monitoring and automatic correction during equipment operations. Precisely lock the position of each row, achieving smooth, efficient spatial transitions while guaranteeing strict safety margins.",
    image: "https://img-reg-ab.imagency.cn/e/5432a4646b0b7f13280259f9e7a72781.jpg",
    iconName: "Minimize2"
  },
  {
    num: "03",
    titleCN: "自纠偏系统",
    titleEN: "Self-Correction System",
    descCN: "智能动态纠偏技术，实时监测轨道运行状态，自动修正左右偏差。即使长期高频使用，也能保持运行轨迹的精准一致，延长设备使用寿命。",
    descEN: "Smart dynamic alignment technology continuously monitors the track operating status and automatically corrects left and right deviations. Even under long-term high-frequency usage, it maintains high-precision trajectory consistency, extending equipment lifespan.",
    image: "https://img-reg-ab.imagency.cn/e/13cdbba98ab5389c3943bb33868f153d.jpg",
    iconName: "RefreshCw"
  },
  {
    num: "04",
    titleCN: "多元终端控制",
    titleEN: "Multi-Terminal Control",
    descCN: "支持手机、平板、中控屏、遥控器等多种终端控制方式。一键全控、分区控制、定时预约三种模式，灵活适配不同管理需求，操作简单便捷。",
    descEN: "Supports multiple control terminals including smartphones, tablets, central consoles, and remote controllers. Features three main modes: master control, zonal control, and scheduled reservations, adapting flexibly to various management needs with straightforward operation.",
    image: "https://img-reg-ab.imagency.cn/e/d7e3b21df042913844f8cc9e62c007f0.jpg",
    iconName: "Smartphone"
  },
  {
    num: "05",
    titleCN: "领先场馆运维数据云平台",
    titleEN: "Venue Ops Data Cloud Platform",
    descCN: "运行数据云端实时存储，自动生成使用报告与维护提醒。远程查看设备状态、故障预警、能耗统计，为空间运营管理提供数据支撑，提升整体运营效率。",
    descEN: "Running data is securely stored in the cloud in real time, automatically generating usage reports and maintenance alerts. Remotely view device status, fault warnings, and energy statistics to provide solid data backing for space operations and enhance efficiency.",
    image: "https://img-reg-ab.imagency.cn/e/9ebaa8c2e917e3c6cd750d2c432ac452.jpg",
    iconName: "Database"
  },
  {
    num: "06",
    titleCN: "智能过道灯",
    titleEN: "Smart Aisle Lights",
    descCN: "人体感应智能照明系统，有人经过时自动点亮，无人时自动熄灭。与看台运行状态联动，展开时自动开启，收合时自动关闭，节能又贴心。",
    descEN: "The smart motion-sensor lighting glows automatically when people pass by and dims down when vacant. Synced directly with the seating operation, it activates upon deployment and switches off when retracted, providing sweet and energy-saving care.",
    image: "https://img-reg-ab.imagency.cn/e/2ad933f78bf48d566f9e4dfde95ac73e.png",
    iconName: "Lightbulb"
  }
];

const renderIcon = (name: string, className: string) => {
  switch (name) {
    case 'Zap': return <Zap className={className} />;
    case 'Minimize2': return <Minimize2 className={className} />;
    case 'RefreshCw': return <RefreshCw className={className} />;
    case 'Smartphone': return <Smartphone className={className} />;
    case 'Database': return <Database className={className} />;
    case 'Lightbulb': return <Lightbulb className={className} />;
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

      {/* ── SMART & EFFICIENT (智慧高效 section) ── */}
      <div id="smart-efficient-section" className="max-w-7xl mx-auto px-6 md:px-12 mb-20 md:mb-24 reveal-up">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16 text-left">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-brand-gold text-[10px] uppercase tracking-widest font-bold leading-none">
              {language === 'CN' ? '智慧高效' : 'SMART & EFFICIENT'}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-none mb-6">
            {language === 'CN' ? '稳定有序，精准响应' : 'Stable & Orderly, Precise Response'}
          </h2>
          <p className="text-stone-600 font-light text-sm md:text-base leading-relaxed">
            {language === 'CN' 
              ? '基于电动驱动系统与分段控制技术，ALTULA 构建起稳定有序的运行逻辑。从芯片级控制到云端管理，每一个环节都经过精密调校，实现高效且可预期的空间切换。'
              : 'Based on electric drive systems and segmented control technology, ALTULA constructs a stable and orderly operational logic. From chip-level control to cloud management, every component is precisely tuned to achieve high efficiency and predictable spatial transitions.'}
          </p>
        </div>

        {/* 6 Grid Bento-Style Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {smartEfficientFeatures.map((item) => (
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
                  {/* Subtle Gradient Overlay on Image */}
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

      {/* ── SAFETY CONFIGURATION (Full screen horizontal section in Reference Layout) ── */}
      <div id="safety-config-section" className="w-full bg-[#1E2022] border-y border-neutral-800/40 py-20 md:py-28 relative overflow-hidden text-white my-16">
        <div className="absolute inset-0 bg-[url('https://img-reg-ab.imagency.cn/e/12a8e9f16fde300a0ac15cd7ae7de2b8.webp')] bg-cover bg-center opacity-12 pointer-events-none"></div>
        <div className="absolute inset-0 bg-black/48 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-brand-gold/5 via-transparent to-transparent opacity-80 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-15 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Interactive reference layout: Left big image display, Right dynamic texts and 2x2 cards */}
          {(() => {
            const safetyProtocols = [
              {
                idx: 0,
                num: '01',
                btnTitleCN: '自研安全数控芯片',
                btnTitleEN: 'Intelligent Safety Chip',
                btnDescCN: '安全主控芯片配置，异常数据0.1秒级极速响应。',
                btnDescEN: 'Proprietary core chip executes quick stop logic.',
                categoryCN: '智能智脑 | CORE BRAIN',
                categoryEN: 'DIGITAL INTELLECTUAL | CORE BRAIN',
                mainTitleCN: '智能主控芯片，从源头保障看台安全运转',
                mainTitleEN: 'Intelligent Active Brain-Control Chip Core System',
                detailDescCN: '自研云枢核心数控芯片为系统提供了最底层的数字主控防卫。实时监测并深度校核电机力矩、高压电流及机械运转角位移，一经检出异常负荷或非预置位冲力，将立即在0.1秒内触发紧急闭合停机指令，全域杜绝由于传统机电抖振、感应盲点带来的冲暴损伤。',
                detailDescEN: 'Our digital brain coordinates micro-metric datasets directly from key sensory circuits. Integrates robust physical-shield filters to safeguard stable operation logic.',
                image: 'https://img-reg-ab.imagency.cn/e/9f41c71e27f68a5ed64a7dd5411341b7.jpg'
              },
              {
                idx: 1,
                num: '02',
                btnTitleCN: '航空铝超承载骨架',
                btnTitleEN: 'Aerospace Structural Framework',
                btnDescCN: '高张力重度加筋合金框架，单座承重≥150kg。',
                btnDescEN: 'Lightweight high-rigidity aeron-metals distribution.',
                categoryCN: '结构冗余 | MATERIAL INTEGRITY',
                categoryEN: 'STRUCTURAL REDUNDANCY | STRENGTH PROFILE',
                mainTitleCN: '精铸航天级核心受力排骨架，抗扰稳如泰山',
                mainTitleEN: 'Military-Spec Aerospace Aluminum Profile Framework',
                detailDescCN: '整体承重核心精选兼有高弹性模量、极轻质量的航空级抗腐蚀压延铝合金拼机。底部经机器人一体激光融焊打磨成形，内设双向纵梁十字交叉剪刀撑，单座抗剪预载可保证≥150kg；整机多向均匀传导动荷能量，安全稳定性极大超越特种复杂承载行业资质。',
                detailDescEN: 'Forged from premier weight-bearing structural metals. Double cross-girder supports safely endure up to ≥150kg per single active tier, maintaining peak structural flexibility.',
                image: 'https://img-reg-ab.imagency.cn/e/1f261656c79a3b5a014673e90e744f8e.jpg'
              },
              {
                idx: 2,
                num: '03',
                btnTitleCN: '全封闭缝隙防坠落挡板',
                btnTitleEN: 'Fall-Prevention Barrier',
                btnDescCN: '平台排间全覆盖防护挡封，保障人体与杂物安全。',
                btnDescEN: 'Complete overlapping covers block debris dropping inside.',
                categoryCN: '精细防线 | GAP BARRIERS',
                categoryEN: 'TACTICAL SHIELDS | SAFETY OVERLAP BARRIERS',
                mainTitleCN: '全封闭平台防坠系统，消灭任何咬合盲区',
                mainTitleEN: 'Overlapping Fall-Shields For Extreme Gap Protection',
                detailDescCN: '看台排与排之间装配有度角契合的不锈钢密封防坠挡块。台阶动作合拢、拉伸时全程严密咬合覆盖，不留下机械空隙，从而将精密连杆传动件及螺母导轨槽全面覆护，有效杜绝随身小物件如手机、首饰跌落卷噬，同时降低噪音达30%以上，更柔和低噪。',
                detailDescEN: 'Fully sealed flexible side blocking panel shields are integrated beneath every active step overlap to prevent items like jewelry or phones from accidentally rolling into gear lines.',
                image: 'https://img-reg-ab.imagency.cn/e/2effed62039f391297e9eee589427d67.jpg'
              },
              {
                idx: 3,
                num: '04',
                btnTitleCN: '主动式毫米波探测防闯入',
                btnTitleEN: 'Intruders Detection Radar',
                btnDescCN: '毫米波雷达360°扇状扫描，遇障阻毫秒级自锁。',
                btnDescEN: 'High-frequency radar constructs border warnings online.',
                categoryCN: '主动感知 | ACTIVE SAFETY',
                categoryEN: 'ACTIVE SCANNING | ELECTROMAGNETIC FIELD',
                mainTitleCN: '高敏雷达微米主动防闯入，瞬时阻尼锁死',
                mainTitleEN: 'High-Precision Micro-Radar Dynamic Anti-Intrusion Shield',
                detailDescCN: '于看台下方多侧集成定轴微米级毫米波有源感应雷达矩阵，360°向外构建空气感知边界。不受多灰沙尘及反射光条件折绕限制。看台机电拉合过程中，一旦有外在肢体、杂物障碍、儿童及温血宠物侵犯警告防线，主板在10毫秒内触发智能停止运行。',
                detailDescEN: 'Embedded ultra-high resolution microwave transmitters create dynamic warnings mapping space detail around rotating paths, completely eliminating risk elements.',
                image: 'https://img-reg-ab.imagency.cn/e/a05e5b996f92b5642e010bd4cb7c2153.jpg'
              }
            ];

            const activeItem = safetyProtocols[activeTab] || safetyProtocols[0];

            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mt-4 relative z-20">
                {/* Left Column: Premium Rounded showcase card with integrated text inside (widened to 7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-start relative">
                  <div className="relative aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden border border-neutral-800/40 shadow-2xl group bg-[#111214]">
                    {/* Visual representation */}
                    <img 
                      src={activeItem.image} 
                      alt={language === 'CN' ? activeItem.btnTitleCN : activeItem.btnTitleEN} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Rich dark gradient mask - sized to match text content height for clean image presentation */}
                    <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10"></div>
                    
                    {/* Bottom-left integrated text within image frame with great readability */}
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

                {/* Right Column: General Safety Header & 2x2 layout buttons selectors (tightened spacing, narrowed to 5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-start py-2 space-y-6 md:space-y-8 relative z-25">
                  
                  {/* General Safety title representing the main theme */}
                  <div className="space-y-4 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-brand-gold text-[10px] md:text-xs font-mono tracking-[0.25em] uppercase font-bold">
                        {language === 'CN' ? '安全配置' : 'SAFETY CONFIGURATION'}
                      </span>
                    </div>

                    <h3 className="text-3.5xl md:text-[44px] lg:text-[48px] font-black text-white tracking-tight leading-tight md:leading-[1.1]">
                      {language === 'CN' ? '安全是底层逻辑' : 'Safety is our Foundational Logic'}
                    </h3>

                    <p className="text-stone-200 font-normal text-sm md:text-[14.5px] leading-relaxed max-w-2xl mt-3">
                      {language === 'CN'
                        ? '安全不仅是标准，更是 ALTULA 产品设计的底层逻辑。我们构建了从硬件到软件的全维度安全防护体系，多重机制相互配合，让每一次使用都安全无虞。'
                        : 'Safety is not just an industry standard, but the foundational philosophy of ALTULA product design. We have built a comprehensive dimensional safety protection framework from hardware to software integrating multiple mechanisms seamlessly.'}
                    </p>
                  </div>

                  {/* 2x2 selector tab cards panel representing "极致细节追求" counterpart */}
                  <div className="text-left relative z-30">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {safetyProtocols.map((item) => {
                        const isActive = activeTab === item.idx;
                        return (
                          <button
                            key={item.idx}
                            onClick={() => {
                              console.log('Switched safety config step to code:', item.idx);
                              setActiveTab(item.idx);
                            }}
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

      {/* ── Immersive LIGHT BRANDED UNDERNEATH CTA (Luxurious Off-White with gold) ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
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
