import React, { useEffect } from 'react';
import { 
  Cpu, 
  Zap, 
  RefreshCw, 
  Smartphone, 
  Database, 
  Sliders, 
  ArrowRight, 
  Radio, 
  Tablet, 
  BarChart3, 
  FileSpreadsheet, 
  Activity, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface TechSmartViewProps {
  onNavigate: (page: string, params?: any) => void;
  language: 'CN' | 'EN';
}

export default function TechSmartView({ onNavigate, language }: TechSmartViewProps) {
  
  useEffect(() => {
    // Custom animation fade-in triggers
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
      
      {/* ── 通栏1：顶部Banner通栏 ── */}
      <div className="relative w-full h-[550px] md:h-[650px] flex items-center justify-center overflow-hidden bg-[#0F141C] text-white">
        <div className="absolute inset-0 bg-[#0F141C]">
          {/* Subtle cyan-navy gradient background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-950/30 via-[#0F141C] to-[#0F141C]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40"></div>
          {/* Decorative glows */}
          <div className="absolute -top-48 left-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-48 right-1/4 w-[600px] h-[600px] bg-brand-gold/10 blur-[130px] rounded-full pointer-events-none"></div>
        </div>

        {/* Real background image with strong navy-black filter overlays */}
        <div 
          className="absolute inset-0 z-0 opacity-25 mix-blend-screen bg-cover bg-center" 
          style={{ backgroundImage: "url('https://img-reg-ab.imagency.cn/e/123911daf02e9e85d0946f65e73db310.webp')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F141C] via-transparent to-[#0F141C]"></div>
        </div>

        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full border border-blue-500/15 pointer-events-none opacity-20 pulse"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-gold text-[10px] uppercase tracking-widest font-mono font-bold backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
            ALTULA {language === 'CN' ? '智能控制科技' : 'SMART CONTROL TECH'}
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-none">
            {language === 'CN' ? '智能与高效' : 'Smart & Efficient'}
          </h1>
          
          <p className="text-blue-200/80 font-medium text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed">
            {language === 'CN' ? '稳定有序，精准响应' : 'Stable & Orderly, Precise Response'}
          </p>

          <p className="text-gray-400 font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            {language === 'CN'
              ? '基于电动驱动系统与分段控制技术，实现高效且可预期的空间切换'
              : 'Achieve highly efficient and predictable spatial conversions powered by advanced electric drive mechanics.'}
          </p>
        </div>
      </div>

      {/* ── 通栏2：核心智能控制系统 ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 reveal-up">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-5">
            <span className="text-brand-gold text-[10px] uppercase tracking-widest font-bold block mb-3">
              {language === 'CN' ? '精确控制核心' : 'PRECISION CONTROL CORE'}
            </span>
            <h2 className="text-3xl md:text-4.5xl font-black text-brand-dark tracking-tight leading-tight">
              {language === 'CN' ? '毫秒级精准控制' : 'Millisecond-level Precision'}
            </h2>
            <p className="text-brand-gold font-semibold text-sm md:text-base mt-2">
              {language === 'CN' 
                ? '系统内置工业级控制芯片，实现多点同步驱动与运行状态的实时调度' 
                : 'Built-in industrial-grade controller chips drive multiplex synchronization and status monitoring.'}
            </p>
          </div>
          <div className="lg:col-span-7">
            <p className="text-stone-600 font-light text-sm md:text-base leading-relaxed lg:pt-6 border-l-2 border-brand-gold/35 pl-6">
              {language === 'CN'
                ? '每一次展开与收合，都是上千次计算与调整的结果。ALTULA自研的智能控制系统，能够实时监测每一排看台的运行状态，自动调整电机转速与扭矩，确保所有看台同步运行，无卡顿、无偏差。'
                : 'Every single deployment is a masterpiece of complex calculations. ALTULA self-engineered active processing core logs multiple tier deviations and real-time current outputs to execute synchronized motion smoothly, effortlessly.'}
            </p>
          </div>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl border border-stone-200/50 p-8 flex flex-col justify-between hover:shadow-luxury hover:border-brand-gold/30 transition-all duration-300 group">
            <div className="space-y-6">
              <span className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-100 group-hover:bg-blue-100 transition-colors">
                <Cpu className="w-6 h-6" />
              </span>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-brand-dark tracking-tight">
                  {language === 'CN' ? 'IOT边缘计算中枢' : 'IoT Edge Computing Hub'}
                </h3>
                <p className="text-stone-500 font-light text-xs md:text-sm leading-relaxed">
                  {language === 'CN'
                    ? '160次/秒高频数据采集，80ms极速反馈，可自动响应远程预警。实现设备底层芯片指令的快速收发，保障系统无缝通信。'
                    : '160 times/sec high frequency data captures, 80ms prompt sensory execution and online safety pre-warnings response.'}
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-stone-100 mt-6 text-[11px] font-mono font-bold text-gray-400 group-hover:text-brand-gold transition-colors flex items-center gap-1.5">
              <span>ACTIVE SYSTEM NODE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl border border-stone-200/50 p-8 flex flex-col justify-between hover:shadow-luxury hover:border-brand-gold/30 transition-all duration-300 group">
            <div className="space-y-6">
              <span className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold border border-amber-100 group-hover:bg-amber-100 transition-colors">
                <RefreshCw className="w-6 h-6" />
              </span>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-brand-dark tracking-tight">
                  {language === 'CN' ? '自纠偏系统' : 'Self-Correction Engine'}
                </h3>
                <p className="text-stone-500 font-light text-xs md:text-sm leading-relaxed">
                  {language === 'CN'
                    ? '毫米级高精度激光相位传感，双电机快反差速纠偏，运行更丝滑。从根源上化解因基础不平或拉力不对称产生的物理偏差积聚。'
                    : 'Millimeter-level dynamic alignment with high-precision laser phase tracking, and quick-feedback motor torque adjustments.'}
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-stone-100 mt-6 text-[11px] font-mono font-bold text-gray-400 group-hover:text-brand-gold transition-colors flex items-center gap-1.5">
              <span>REALTIME CALIBRATOR</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl border border-stone-200/50 p-8 flex flex-col justify-between hover:shadow-luxury hover:border-brand-gold/30 transition-all duration-300 group">
            <div className="space-y-6">
              <span className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-800 flex items-center justify-center font-bold border border-stone-200 group-hover:bg-slate-100 transition-colors">
                <Zap className="w-6 h-6" />
              </span>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-brand-dark tracking-tight">
                  {language === 'CN' ? '专利限位排锁2.0' : 'Patented Row Lock 2.0'}
                </h3>
                <p className="text-stone-500 font-light text-xs md:text-sm leading-relaxed">
                  {language === 'CN'
                    ? '启动时逐排开合，如行云流水；入座时限位止晃，稳如泰山。采用高强度航空扣锁组件，高频开闭百万次寿命无损设计。'
                    : 'Unfolds tier by tier fluidly during launch; reinforces mechanical state lock when in use to block vibrations.'}
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-stone-100 mt-6 text-[11px] font-mono font-bold text-gray-400 group-hover:text-brand-gold transition-colors flex items-center gap-1.5">
              <span>PATENT NO: ZL.04.119</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* ── 通栏3：多终端智能操控 ── */}
      <div className="w-full bg-white border-y border-stone-200/45 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 reveal-up">
          
          {/* Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            <div className="lg:col-span-5">
              <span className="text-brand-gold text-[10px] uppercase tracking-widest font-bold block mb-3">
                {language === 'CN' ? '全场景自适应控制' : 'ALL-SCENARIO INTELLIGENT TELEMETRY'}
              </span>
              <h2 className="text-3xl md:text-4.5xl font-black text-brand-dark tracking-tight leading-tight">
                {language === 'CN' ? '随时随地，掌控全局' : 'Command Anywhere, Instantly'}
              </h2>
              <p className="text-brand-gold font-semibold text-sm md:text-base mt-2">
                {language === 'CN' 
                  ? '支持多种终端操控方式，满足不同场景的管理需求' 
                  : 'Fulfill multiplex site configurations and administrators command routines.'}
              </p>
            </div>
            <div className="lg:col-span-7">
              <p className="text-stone-600 font-light text-sm md:text-base leading-relaxed lg:pt-6 border-l-2 border-brand-gold/35 pl-6">
                {language === 'CN'
                  ? '无论是现场工作人员还是远程管理人员，都能通过最便捷的方式控制看台系统。我们提供从物理遥控到云平台管理的全链路解决方案，让空间管理变得简单高效。'
                  : 'From field engineers to distant control centers, anyone with secure clearance is able to control the telescopic assets seamlessly. High-performance mechanical links connected to local and cloud control modules.'}
              </p>
            </div>
          </div>

          {/* 3 Horizontal Cards/Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tool 1 */}
            <div className="bg-[#FAF9F6] rounded-3xl p-8 border border-stone-200/40 relative overflow-hidden group hover:border-brand-gold/30 hover:bg-white transition-all duration-300">
              <span className="w-10 h-10 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center mb-6">
                <Smartphone className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-black text-brand-dark tracking-tight mb-2">
                {language === 'CN' ? '手机APP控制' : 'Smart Mobile App'}
              </h3>
              <p className="text-stone-500 font-light text-xs md:text-sm leading-relaxed mb-6">
                {language === 'CN'
                  ? '一键展开/收合，远程查看运行状态，接收故障预警。配套专属数字保密身份锁与加密口令极速授权。'
                  : 'One-click automatic deployment, checking real-time current load, motor heat and receiving automated logs.'}
              </p>
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-white border border-stone-200/50">
                <img 
                  src="https://img-reg-ab.imagency.cn/e/d7e3b21df042913844f8cc9e62c007f0.jpg" 
                  alt="APP Control" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Tool 2 */}
            <div className="bg-[#FAF9F6] rounded-3xl p-8 border border-stone-200/40 relative overflow-hidden group hover:border-brand-gold/30 hover:bg-white transition-all duration-300">
              <span className="w-10 h-10 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center mb-6">
                <Tablet className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-black text-brand-dark tracking-tight mb-2">
                {language === 'CN' ? '本地触摸屏控制' : 'Local Touch Screen Console'}
              </h3>
              <p className="text-stone-500 font-light text-xs md:text-sm leading-relaxed mb-6">
                {language === 'CN'
                  ? '高清触控屏，直观操作，支持分区控制与场景预设。搭载工业级防震外表、嵌入墙体或独立操控柱，美观大方。'
                  : 'High Definition responsive layout, support custom presets and zone configurations. Perfect fitting for control desk.'}
              </p>
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-white border border-stone-200/50">
                <img 
                  src="https://img-reg-ab.imagency.cn/e/5431c65a2723060f74ade4532238287b.webp" 
                  alt="Console Screen" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Tool 3 */}
            <div className="bg-[#FAF9F6] rounded-3xl p-8 border border-stone-200/40 relative overflow-hidden group hover:border-brand-gold/30 hover:bg-white transition-all duration-300">
              <span className="w-10 h-10 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center mb-6">
                <Radio className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-black text-brand-dark tracking-tight mb-2">
                {language === 'CN' ? '物理遥控控制' : 'Physical Wireless Remote'}
              </h3>
              <p className="text-stone-500 font-light text-xs md:text-sm leading-relaxed mb-6">
                {language === 'CN'
                  ? '防水防尘设计，操作简单，适合现场快速操作。加粗防坠挂绳圈口，配备抗爆工业屏蔽芯片与防误触机械锁。'
                  : 'Industrial-grade dustproof-waterproof remote, easy quick controls, suitable for active venue stewards and fast deployment.'}
              </p>
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-white border border-stone-200/50">
                <img 
                  src="https://img-reg-ab.imagency.cn/e/5432a4646b0b7f13280259f9e7a72781.jpg" 
                  alt="Physical remote" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── 通栏4：场馆运维数据云平台 ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 reveal-up">
        <div className="bg-brand-dark text-white rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-[#16181A] to-[#16181A] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 pointer-events-none"></div>
          
          <div className="relative z-10 space-y-12">
            {/* Header */}
            <div className="max-w-3xl space-y-4">
              <span className="text-brand-gold text-[10px] tracking-[0.2em] font-mono uppercase font-bold block">
                {language === 'CN' ? '物联网与边缘云服务' : 'ALTULA CLOUD CORE DATABASE'}
              </span>
              <h2 className="text-3xl md:text-4.5xl font-black tracking-tight leading-none text-white">
                {language === 'CN' ? '数据驱动，智慧运维' : 'Data-Driven Smart Logistics'}
              </h2>
              <p className="text-blue-200 font-medium text-xs md:text-[15px]">
                {language === 'CN' ? '软硬件协同指挥中心，全生命周期无忧托付' : 'Software-hardware collaborative commands hub, guaranteeing lifelong hassle-free operations.'}
              </p>
              <p className="text-stone-300 font-light text-xs md:text-sm leading-relaxed max-w-2xl pt-2">
                {language === 'CN'
                  ? 'ALTULA领先场馆运维数据云平台，能够实时采集看台系统的所有运行数据，自动生成使用报告与维护提醒。通过大数据分析，提前预测潜在故障，实现从“被动维修”到“主动预防”的转变。'
                  : 'By capturing multiple engineering metrics from the local processors, our sovereign cloud console analyzes operating health charts to flag and estimate active warnings pre-emptively, securing structural robustness.'}
              </p>
            </div>

            {/* 3 Grid items inside dark block */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              {/* Item 1 */}
              <div className="space-y-4">
                <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-gold mb-2">
                  <BarChart3 className="w-5 h-5" />
                </span>
                <h4 className="font-bold text-base text-white">
                  {language === 'CN' ? '运行数据实时监测' : 'Live Operations Monitoring'}
                </h4>
                <p className="text-stone-400 font-light text-xs leading-relaxed">
                  {language === 'CN'
                    ? '电机温度、运行次数、电流电压等数据一目了然。通过直观的可视化图表展示，让管理人员随时掌握核心数据指针。'
                    : 'Track motor heat vectors, active deployment loops count, and system electricity indices seamlessly.'}
                </p>
              </div>

              {/* Item 2 */}
              <div className="space-y-4">
                <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-gold mb-2">
                  <FileSpreadsheet className="w-5 h-5" />
                </span>
                <h4 className="font-bold text-base text-white">
                  {language === 'CN' ? '自动生成维护报告' : 'Automatic Maintenance Report'}
                </h4>
                <p className="text-stone-400 font-light text-xs leading-relaxed">
                  {language === 'CN'
                    ? '根据使用频率与运行状态，自动生成维护建议。智能指引核心受力销轴与皮带消音阻尼组件的加注、锁固及微调。'
                    : 'System analyzes continuous cycles and issues targeted physical check manuals, optimizing maintenance costs.'}
                </p>
              </div>

              {/* Item 3 */}
              <div className="space-y-4">
                <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-gold mb-2">
                  <Activity className="w-5 h-5" />
                </span>
                <h4 className="font-bold text-base text-white">
                  {language === 'CN' ? '远程故障诊断' : 'Distant Diagnostics Terminal'}
                </h4>
                <p className="text-stone-400 font-light text-xs leading-relaxed">
                  {language === 'CN'
                    ? '工程师可远程查看系统状态，快速定位并解决问题。针对轻微阻尼或传感器零位偏移事件，可实现线上无缝一键重推参数修复。'
                    : 'Professional remote specialists read diagnostics variables directly to evaluate and fix micro-sensor errors online.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 通栏5：底部CTA通栏 ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 reveal-up">
        <div className="bg-gradient-to-b from-white to-[#FAF9F6] rounded-[2.5rem] p-12 md:p-20 text-center border border-stone-200/60 shadow-luxury w-full relative overflow-hidden">
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-brand-gold/5 blur-[90px] rounded-full pointer-events-none z-0"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-bold block">
              {language === 'CN' ? '智能操控 · 前瞻科技' : 'DYNAMIC SPATIAL CONTROL'}
            </span>
            <h3 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-none">
              {language === 'CN' ? '让空间切换更智能、更高效' : 'Empower Spatial Switch with Absolute Intelligence'}
            </h3>
            <p className="text-[#8C929C] font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              {language === 'CN'
                ? 'ALTULA智能控制系统，为您的空间管理赋能'
                : 'Pioneering intelligent control architectures to maximize venue utilization rate securely.'}
            </p>
            <div className="pt-6">
              <button
                onClick={() => onNavigate('contact')}
                className="bg-brand-dark hover:bg-black text-white px-10 py-4.5 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer shadow-lg inline-flex items-center gap-2 hover:scale-[1.03] transition-transform duration-200"
              >
                <span>{language === 'CN' ? '了解更多技术细节' : 'Inquire Technology Details'}</span>
                <ChevronRight className="w-4 h-4 text-brand-gold" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
