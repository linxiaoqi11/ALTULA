import React, { useEffect, useState } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  ChevronRight, 
  ArrowLeft,
  ArrowRight,
  Zap,
  Sliders,
  RefreshCw,
  Smartphone,
  Database,
  Lightbulb,
  Layers,
  Activity,
  LineChart,
  HardDrive
} from 'lucide-react';

interface TechSmartViewProps {
  onNavigate: (page: string, params?: any) => void;
  language: 'CN' | 'EN';
}

const smartEfficientFeatures = [
  {
    num: "01",
    titleCN: "IOT边缘计算中枢",
    titleEN: "IoT Edge Computing Center",
    descCN: "系统内置工业级边缘计算芯片，实现多点同步驱动与运行状态的实时调度，毫秒级响应速度，使每一次展开与收合都具备精确的一致性控制，无卡顿、无偏差。",
    descEN: "Built-in industrial-grade edge computing chips enable multi-point synchronous driving and real-time scheduling of operational status. Millisecond-level response speed ensures that each deploy/retract cycle is perfectly synchronized.",
    image: "https://img-reg-ab.imagency.cn/e/5a54fe0465b40c88314cf2c1bffe68fc.jpg",
    iconName: "Zap"
  },
  {
    num: "02",
    titleCN: "专利限位排锁2.0",
    titleEN: "Patented Limit Interlock 2.0",
    descCN: "独家专利行程限位与状态反馈机制，设备运行过程可被持续监测与自动修正，在保证安全边界的前提下，实现平稳高效的空间转换。",
    descEN: "Exclusive patented travel limit and feedback systems monitor movement continuously, automatically calibrating paths to ensure safe, smooth and elegant spatial changes.",
    image: "https://img-reg-ab.imagency.cn/e/4dc6ecfc013cf48039cfa34cc62a3f9e.jpg",
    iconName: "Sliders"
  },
  {
    num: "03",
    titleCN: "自纠偏系统",
    titleEN: "Self-Alignment System",
    descCN: "智能动态纠偏技术，实时监测轨道运行状态，自动修正左右偏差。即使长期高频使用，也能保持运行轨迹的精准一致，延长设备使用寿命。",
    descEN: "Active dynamic tracking system checks rails parameters, auto-adjusting left-right alignment instantly, retaining precise tracks even after decades of heavy multiplex use.",
    image: "https://img-reg-ab.imagency.cn/e/5432a4646b0b7f13280259f9e7a72781.jpg",
    iconName: "RefreshCw"
  },
  {
    num: "04",
    titleCN: "多元终端控制",
    titleEN: "Multi-Terminal Interfaces",
    descCN: "支持手机、平板、中控屏、遥控器等多种终端控制方式。一键全控、分区控制、定时预约三种模式，灵活适配不同管理需求，操作简单便捷。",
    descEN: "Supports smartphones, tablets, centralized display screens and dedicated remote controllers. One-touch fully automated layout switching caters flexibly to dynamic management.",
    image: "https://img-reg-ab.imagency.cn/e/d7e3b21df042913844f8cc9e62c007f0.jpg",
    iconName: "Smartphone"
  },
  {
    num: "05",
    titleCN: "领先场馆运维数据云平台",
    titleEN: "Elite Venue IoT Cloud",
    descCN: "运行数据云端实时存储，自动生成使用报告与维护提醒。远程查看设备状态、故障预警、能耗统计，为空间运营管理提供数据支撑，提升整体运营效率。",
    descEN: "Live operational analytics are streamed to the cloud, generating automated reports and calibration logs to secure uptime and guide optimized long-term stadium management.",
    image: "https://img-reg-ab.imagency.cn/e/9ebaa8c2e917e3c6cd750d2c432ac452.jpg",
    iconName: "Database"
  },
  {
    num: "06",
    titleCN: "智能过道灯",
    titleEN: "Smart Recessed Pathway LEDs",
    descCN: "人体感应智能照明系统，有人经过时自动点亮，无人时自动熄灭。与看台运行状态联动，展开时自动开启，收合时自动关闭，节能又贴心。",
    descEN: "Motion-sensing interior illumination lights path lines on active deployment, auto-dimming when idle and turning off completely on collapse to manage power elegantly.",
    image: "https://img-reg-ab.imagency.cn/e/2ad933f78bf48d566f9e4dfde95ac73e.png",
    iconName: "Lightbulb"
  }
];

const renderIcon = (name: string, className: string) => {
  switch (name) {
    case 'Zap': return <Zap className={className} />;
    case 'Sliders': return <Sliders className={className} />;
    case 'RefreshCw': return <RefreshCw className={className} />;
    case 'Smartphone': return <Smartphone className={className} />;
    case 'Database': return <Database className={className} />;
    case 'Lightbulb': return <Lightbulb className={className} />;
    default: return <Cpu className={className} />;
  }
};

export default function TechSmartView({ onNavigate, language }: TechSmartViewProps) {
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
      <div className="relative w-full h-[550px] md:h-[650px] flex items-center justify-center overflow-hidden bg-[#0A0B0C] text-white">
        <div className="absolute inset-0 bg-[#0A0B0C]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/40 via-[#0A0B0C] to-[#0A0B0C]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35"></div>
          <div className="absolute -top-48 left-1/4 w-[600px] h-[600px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-48 right-1/4 w-[600px] h-[600px] bg-brand-gold/10 blur-[130px] rounded-full pointer-events-none"></div>
        </div>

        {/* Background image showing telescopic motion effects / blue tech scene */}
        <div 
          className="absolute inset-0 z-0 opacity-40 mix-blend-screen bg-cover bg-center" 
          style={{ backgroundImage: "url('https://img-reg-ab.imagency.cn/e/123911daf02e9e85d0946f65e73db310.webp')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0C] via-transparent to-[#0A0B0C]"></div>
        </div>

        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full border border-brand-gold/15 pointer-events-none opacity-20 pulse"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-gold text-[10px] uppercase tracking-widest font-mono font-bold mb-6 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping"></span>
            ALTULA {language === 'CN' ? '智能与高效' : 'SMART & EFFICIENT'}
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-none mb-6">
            {language === 'CN' ? '智能与高效' : 'Smart & Efficient'}
          </h1>

          <h2 className="text-xl md:text-3.5xl font-light text-brand-gold tracking-tight mb-6">
            {language === 'CN' ? '稳定有序，精准响应' : 'Stable & Orderly, Precise Response'}
          </h2>
          
          <p className="text-gray-400 font-light text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {language === 'CN'
              ? '基于电动驱动系统与分段控制技术，实现高效且可预期的空间切换'
              : 'Based on electric drive mechanics and segmented control algorithms to achieve highly streamlined, predictable space transformations.'}
          </p>
        </div>
      </div>

      {/* ── 通栏2：左文右图通栏（新增原美学模块图文布局，修改文字） ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 md:mb-24 -mt-16 relative z-20">
        <div id="tech-interactive-module" className="bg-white border border-stone-200/60 rounded-[2.5rem] p-8 md:p-14 overflow-hidden shadow-luxury relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left Column: Spatial Intelligence Philosophy */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-brand-gold text-[10px] uppercase tracking-widest font-bold leading-none">
                  {language === 'CN' ? '智慧高效' : 'SMART & EFFICIENT'}
                </span>
              </div>

              <h2 className="text-2xl md:text-3.5xl font-black text-brand-dark tracking-tight leading-tight">
                {language === 'CN' ? '稳定有序，精准响应' : 'Stable, Orderly & Precise Response'}
              </h2>

              <div className="space-y-4 text-stone-600 font-light text-[13px] md:text-sm leading-relaxed">
                <p className="border-l-2 border-brand-gold pl-4 font-normal text-brand-dark">
                  {language === 'CN'
                    ? '基于电动驱动系统与分段控制技术，ALTULA构建起稳定有序的运行逻辑。从芯片级控制到云端管理，每一个环节都经过精密调校，实现高效且可预期的空间切换。'
                    : 'Based on electric drive systems and segmented control technology, ALTULA constructs a stable and orderly operating logic. From chip-level controls to cloud-hosted telemetry, every step is calibrated for smart transformations.'}
                </p>
                <p className="text-stone-500 pl-4">
                  {language === 'CN'
                    ? '系统内置工业级控制芯片，实现多点同步驱动与运行状态的实时调度，使每一次展开与收合都具备精确响应与一致性控制。'
                    : 'The integrated industrial-grade processor synchronizes multi-point driving forces, orchestrating the telescopic system flawlessly with zero lag.'}
                </p>
              </div>
            </div>

            {/* Right Column: Dynamic Image Showcase (工程师在中控室操作看台系统的场景图) */}
            <div className="lg:col-span-7 relative rounded-[2rem] overflow-hidden shadow-luxury border border-stone-200/40 aspect-[16/10] bg-stone-100 group">
              <img 
                src="https://img-reg-ab.imagency.cn/e/d7e3b21df042913844f8cc9e62c007f0.jpg"
                alt="ALTULA Operations Engineer at Command Console" 
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-[4000ms] group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/10 via-transparent to-transparent"></div>
            </div>

          </div>

        </div>
      </div>

      {/* ── 通栏3：6卡片网格通栏 ── */}
      <div id="smart-efficient-section" className="max-w-7xl mx-auto px-6 md:px-12 mb-20 md:mb-24 reveal-up">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16 text-left">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-brand-gold text-[10px] uppercase tracking-widest font-bold leading-none">
              {language === 'CN' ? '数字化与精准' : 'DIGITALIZATION & ACCURACY'}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-none mb-6">
            {language === 'CN' ? '稳定有序，精准响应' : 'Stable & Orderly, Precise Response'}
          </h2>
          <p className="text-stone-600 font-light text-sm md:text-base leading-relaxed">
            {language === 'CN' 
              ? '基于电动驱动系统与分段控制技术，ALTULA构建起稳定有序的运行逻辑。从芯片级控制到云端管理，每一个环节都经过精密调校，实现高效且可预期的空间切换。'
              : 'ALTULA weaves advanced physical frames with cloud diagnostics, delivering a highly unified operability curve for flexible multipurpose arenas.'}
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

      {/* ── 通栏4：左图右文深色通栏（完全复用原安全模块的深色布局，修改文字） ── */}
      <div id="safety-config-section" className="w-full bg-[#16181A] border-y border-neutral-800/40 py-20 md:py-28 relative overflow-hidden text-white my-16">
        <div className="absolute inset-0 bg-[url('https://img-reg-ab.imagency.cn/e/12a8e9f16fde300a0ac15cd7ae7de2b8.webp')] bg-cover bg-center opacity-12 pointer-events-none"></div>
        <div className="absolute inset-0 bg-black/48 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent opacity-85 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-15 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {(() => {
            const smartProtocols = [
              {
                idx: 0,
                num: '01',
                btnTitleCN: '远程故障诊断',
                btnTitleEN: 'Remote Diagnostics',
                btnDescCN: '工程师可远程查看系统状态，快速定位并解决问题。',
                btnDescEN: 'Engineers can view system status remotely for quick resolution.',
                categoryCN: '云端中控 / OUTSIDE CONSOLE',
                categoryEN: 'REMOTE ACCESS | DIGITAL DIAGNOSTICS',
                mainTitleCN: '远程双向组态定位，足不出户解决棘手异常',
                mainTitleEN: 'Bidirectional Cloud Link Accelerates Diagnostic Tasks Everywhere',
                detailDescCN: '工程师可远程查看系统状态，快速定位并解决问题。通过云端透传不仅能抓取历史运行日志，更能一镜透射伺服模块传感器输出扭矩。',
                detailDescEN: 'Equips technical directors with absolute physical logs and real-time controller voltages directly through a cryptographic network coupling.',
                image: 'https://img-reg-ab.imagency.cn/e/9ebaa8c2e917e3c6cd750d2c432ac452.jpg'
              },
              {
                idx: 1,
                num: '02',
                btnTitleCN: '自动维护提醒',
                btnTitleEN: 'Auto Maintenance Alerts',
                btnDescCN: '根据使用频率与运行状态，自动生成维护计划。',
                btnDescEN: 'Generates detailed preventative maintenance plans.',
                categoryCN: '主动预防 / PREEMPTIVE ANALYSIS',
                categoryEN: 'HEURISTIC CYCLES | PREVENTATIVE MAINTENANCE',
                mainTitleCN: '智能推演机械疲劳，自动触发健康养护日程',
                mainTitleEN: 'Intelligent Physical Profiling Predicts Lifespan Fatigue Levels',
                detailDescCN: '根据使用频率与运行状态，自动生成维护计划。算法通过记录每一次开闭阻尼起伏和折合周期，在配件耗损前提醒养护方案，杜绝赛事停工损耗。',
                detailDescEN: 'Records cumulative mechanical cycles and torque variations to output actionable, periodic hardware health profiles keeping reliability ratings high.',
                image: 'https://img-reg-ab.imagency.cn/e/5432a4646b0b7f13280259f9e7a72781.jpg'
              },
              {
                idx: 2,
                num: '03',
                btnTitleCN: '多场馆统一管理',
                btnTitleEN: 'Multi-Venue Management',
                btnDescCN: '一个平台管理多个场馆的所有看台设备。',
                btnDescEN: 'Unify and control multiple stadiums from one dashboard.',
                categoryCN: '集中调度 / MULTIPLEX DASHBOARD',
                categoryEN: 'CONCURRENT ENGINE | CENTRAL SCHEDULING',
                mainTitleCN: '分布式机组大屏，一站式囊括多馆看台态势',
                mainTitleEN: 'Central Operations Unifies Dispersed Seat Installations',
                detailDescCN: '一个平台管理多个场馆的所有看台设备。采用多层级并行数据中继，让运营高管随时随地透视分布式场馆的硬件折叠与电驱安全状态。',
                detailDescEN: 'Channels real-time coordinates of multiple stadium components on a unified screen console, dramatically reducing manual operational drag.',
                image: 'https://img-reg-ab.imagency.cn/e/d7e3b21df042913844f8cc9e62c007f0.jpg'
              },
              {
                idx: 3,
                num: '04',
                btnTitleCN: '数据可视化',
                btnTitleEN: 'Data Visualization Hub',
                btnDescCN: '直观展示运行数据、能耗统计、使用频率等信息。',
                btnDescEN: 'Renders dynamic power metrics, curves and cycles.',
                categoryCN: '数字看板 / METRICS CHART',
                categoryEN: 'LOGISTICAL CHARTS | ENERGY METRICS',
                mainTitleCN: '全维数据精美呈现，一键洞察能耗动力峰值',
                mainTitleEN: 'Dynamic Analytics Screen Empowers Complex Space Operations',
                detailDescCN: '直观展示运行数据、能耗统计、使用频率等信息。将极为复杂的变频扭矩波峰、能耗日志及空间周转效率转换成一目了然的可视化数字仪表。',
                detailDescEN: 'Transforms technical sensor streams into beautifully readable charts, tracking system efficiency profiles to simplify management.',
                image: 'https://img-reg-ab.imagency.cn/e/123911daf02e9e85d0946f65e73db310.webp'
              }
            ];

            const activeItem = smartProtocols[activeTab] || smartProtocols[0];

            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mt-4 relative z-20">
                {/* Left Column: Image Showcase (7 cols) (替换为电脑屏幕显示云平台管理界面的特写图) */}
                <div className="lg:col-span-7 flex flex-col justify-start relative">
                  <div className="relative aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden border border-neutral-800/40 shadow-2xl group bg-[#111214]">
                    <img 
                      src={activeItem.image} 
                      alt={language === 'CN' ? activeItem.btnTitleCN : activeItem.btnTitleEN} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10"></div>
                    
                    {/* Integrated text overlay with high contrast */}
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

                {/* Right Column: Dynamic Texts & Selectors (5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-start py-2 space-y-6 md:space-y-8 relative z-25">
                  <div className="space-y-4 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-brand-gold text-[10px] md:text-xs font-mono tracking-[0.25em] uppercase font-bold">
                        {language === 'CN' ? '云端管理' : 'CLOUD TELEMETRY'}
                      </span>
                    </div>

                    <h3 className="text-3.5xl md:text-[44px] lg:text-[48px] font-black text-white tracking-tight leading-tight md:leading-[1.1]">
                      {language === 'CN' ? '数据驱动，智慧运维' : 'Data-Driven Ops Core'}
                    </h3>

                    <p className="text-stone-200 font-normal text-sm md:text-[14.5px] leading-relaxed max-w-2xl mt-3">
                      {language === 'CN'
                        ? 'ALTULA领先场馆运维数据云平台，是软硬件协同的指挥中心，兼顾原生参数设置、历史数据记录与远程组态管理，实现全生命周期无忧托付。通过大数据分析，提前预测潜在故障，实现从“被动维修”到“主动预防”的转变，大幅降低运维成本，提升设备使用寿命。'
                        : 'ALTULA venue cloud architecture represents a unified, military-grade console center, bridging localized parameters with smart telemetry data visualization tools continuously.'}
                    </p>
                  </div>

                  {/* 2x2 buttons layout selector */}
                  <div className="text-left relative z-30">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {smartProtocols.map((item) => {
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

      {/* ── 通栏5：底部CTA通栏（保留原CTA样式，仅改文字） ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="bg-gradient-to-b from-white to-[#FAF9F6] rounded-[2.5rem] p-12 md:p-20 text-center border border-stone-200/60 shadow-luxury w-full relative overflow-hidden reveal-up">
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-brand-gold/5 blur-[90px] rounded-full pointer-events-none z-0"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-bold block">
              {language === 'CN' ? '睿智重设 · 瞬息而换' : 'CENTRAL SMART DEPLOYMENT'}
            </span>
            <h3 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-none">
              {language === 'CN' ? '让空间切换更智能、更高效' : 'Deliver smarter, more efficient spatial transformations'}
            </h3>
            <p className="text-gray-550 font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              {language === 'CN'
                ? 'ALTULA智能控制系统，为您的空间管理赋能'
                : 'ALTULA advanced electrical transmission mechanisms put spatial management in your direct control.'}
            </p>
            <div className="pt-6">
              <button
                onClick={() => onNavigate('contact')}
                className="bg-brand-gold hover:bg-brand-gold/90 text-white px-10 py-4.5 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer shadow-lg hover:shadow-brand-gold/20 inline-flex items-center gap-2 hover:scale-[1.03] transition-transform duration-200"
              >
                <span>{language === 'CN' ? '了解更多技术细节' : 'Explore Tech Details'}</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
