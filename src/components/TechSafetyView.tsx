import React, { useEffect } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Eye, 
  ChevronRight, 
  Scale, 
  Lock, 
  Users, 
  ClipboardCheck, 
  Activity, 
  Grid, 
  Layers,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface TechSafetyViewProps {
  onNavigate: (page: string, params?: any) => void;
  language: 'CN' | 'EN';
}

export default function TechSafetyView({ onNavigate, language }: TechSafetyViewProps) {
  
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
      
      {/* ── 通栏1：顶部Banner通栏 (Industrial Dark theme) ── */}
      <div className="relative w-full h-[550px] md:h-[650px] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          {/* Pure black background with subtle pattern */}
          <div className="absolute inset-0 bg-black"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#BA9F76]/10 via-transparent to-black"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
          {/* Subtle glowing spheres */}
          <div className="absolute -top-48 right-1/4 w-[600px] h-[600px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-48 left-1/4 w-[600px] h-[600px] bg-brand-gold/10 blur-[130px] rounded-full pointer-events-none"></div>
        </div>

        {/* Textured image overlay with strong black mask */}
        <div 
          className="absolute inset-0 z-0 opacity-35 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://img-reg-ab.imagency.cn/e/12a8e9f16fde300a0ac15cd7ae7de2b8.webp')" }}
        >
          {/* Premium black gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black"></div>
        </div>

        {/* Inner black overlay card to make sure text pops out perfectly */}
        <div className="absolute inset-0 bg-black/50 z-[1] pointer-events-none"></div>

        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full border border-red-500/10 z-[2] pointer-events-none opacity-20 pulse"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-gold text-[10px] uppercase tracking-widest font-mono font-bold backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            ALTULA {language === 'CN' ? '极级防护核心' : 'ULTIMATE SECURITY CORE'}
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-none">
            {language === 'CN' ? '安全配置' : 'Safety Configurations'}
          </h1>
          
          <p className="text-[#E6E8EA] font-semibold text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed">
            {language === 'CN' ? '安全不仅是标准，更是底层逻辑' : 'Safety is not just a standard, but our foundational logic'}
          </p>

          <p className="text-stone-400 font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            {language === 'CN'
              ? '构建从硬件到软件的全维度安全防护体系，让每一次使用都安全无忧'
              : 'Constructing robust active defenses and mechanical fail-safes from hardware cells to cloud frameworks.'}
          </p>
        </div>
      </div>

      {/* ── 通栏2：主动安全防护 ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 reveal-up">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-5">
            <span className="text-brand-gold text-[10px] uppercase tracking-widest font-bold block mb-3">
              {language === 'CN' ? '防磨抗震第一道防线' : 'ACTIVE DEFENSIVE PERIMETER'}
            </span>
            <h2 className="text-3xl md:text-4.5xl font-black text-brand-dark tracking-tight leading-tight">
              {language === 'CN' ? '防患于未然' : 'Preventative Measures'}
            </h2>
            <p className="text-brand-gold font-semibold text-sm md:text-base mt-2">
              {language === 'CN' 
                ? '引入先进的感应技术，对设备运行路径进行实时监测' 
                : 'Pioneered active tracking to scan displacement and obstructions along operating lines.'}
            </p>
          </div>
          <div className="lg:col-span-7">
            <p className="text-stone-600 font-light text-sm md:text-base leading-relaxed lg:pt-6 border-l-2 border-brand-gold/35 pl-6">
              {language === 'CN'
                ? '我们认为，最好的安全防护是“不让事故发生”。ALTULA采用多重主动安全技术，能够在危险发生前及时预警并停止运行，从根本上杜绝安全隐患。'
                : 'Passive containment is never enough; active defense prevents incidents entirely. Our system detects micro-obstructions and abnormal torque variances pre-emptively to execute safe automatic lock commands.'}
            </p>
          </div>
        </div>

        {/* 3 cards with nice border glow - modified to light theme white base cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-[2rem] border border-stone-200/50 p-8 flex flex-col justify-between hover:shadow-luxury hover:border-brand-gold/30 hover:-translate-y-1 transition-all duration-300 group">
            <div className="space-y-6">
              <span className="w-12 h-12 rounded-2xl bg-brand-gold/10 text-brand-gold flex items-center justify-center font-bold border border-brand-gold/20">
                <Eye className="w-6 h-6" />
              </span>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-brand-dark tracking-tight group-hover:text-brand-gold transition-colors">
                  {language === 'CN' ? '主动式毫米波探测防闯入' : 'Active Radar Anti-Intrusion'}
                </h3>
                <p className="text-stone-500 font-light text-xs md:text-sm leading-relaxed">
                  {language === 'CN'
                    ? '台底配置激光/毫米波有源运动探头，设备开合中一旦识有人畜或障碍物穿入，可瞬间触达0.1秒级制动锁死，杜绝碰撞夹伤。'
                    : 'Tactical laser radars inspect workspace margins beneath active tiers, freezing movement in 0.1sec upon sudden unauthorized entries.'}
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-stone-100 mt-6 text-[10px] font-mono text-stone-400 font-bold group-hover:text-brand-gold transition-colors">
              RADAR ACTIVE FIELD ONLINE
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[2rem] border border-stone-200/50 p-8 flex flex-col justify-between hover:shadow-luxury hover:border-brand-gold/30 hover:-translate-y-1 transition-all duration-300 group">
            <div className="space-y-6">
              <span className="w-12 h-12 rounded-2xl bg-red-50 text-red-500/95 flex items-center justify-center font-bold border border-red-100">
                <ShieldAlert className="w-6 h-6" />
              </span>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-brand-dark tracking-tight group-hover:text-brand-gold transition-colors">
                  {language === 'CN' ? '异常阻力保护' : 'Abnormal Friction Protection'}
                </h3>
                <p className="text-stone-500 font-light text-xs md:text-sm leading-relaxed">
                  {language === 'CN'
                    ? '芯片实时采样电磁频率及差速阻抗数，一旦检得由于不均匀杂物积存带来的阻力畸变，电机会立刻熔断动力，避免损毁。'
                    : 'System samples output currents and locks drive motors immediately if debris causes resistance fluctuations, shielding hardware elements.'}
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-stone-100 mt-6 text-[10px] font-mono text-stone-400 font-bold group-hover:text-brand-gold transition-colors">
              OVERLOAD SHIELD SENSING
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[2rem] border border-stone-200/50 p-8 flex flex-col justify-between hover:shadow-luxury hover:border-brand-gold/30 hover:-translate-y-1 transition-all duration-300 group">
            <div className="space-y-6">
              <span className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-100">
                <Activity className="w-6 h-6" />
              </span>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-brand-dark tracking-tight group-hover:text-brand-gold transition-colors">
                  {language === 'CN' ? '行程限位保护' : 'Range Boundary Limit Lock'}
                </h3>
                <p className="text-stone-500 font-light text-xs md:text-sm leading-relaxed">
                  {language === 'CN'
                    ? '多重复锁锁死：机械硬阻块限位、低功耗光敏传感器辅助。双环安全护锁系统确保看台轨道永远不会发生溢出出轨事故。'
                    : 'Double mechanical blocks and electronic photoelectric boundaries synchronize limits, safeguarding track lines from errors.'}
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-stone-100 mt-6 text-[10px] font-mono text-stone-400 font-bold group-hover:text-brand-gold transition-colors">
              OPTOELECTRONIC STOPPER ACTIVED
            </div>
          </div>
        </div>
      </div>

      {/* ── 通栏3：结构安全保障 (Slate graphite layout wrapper - "黑色为辅" Premium Accent Block) ── */}
      <div className="w-full bg-[#0F1216] py-20 md:py-28 border-y border-stone-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 reveal-up">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            <div className="lg:col-span-5">
              <span className="text-brand-gold text-[10px] uppercase tracking-widest font-bold block mb-3">
                {language === 'CN' ? '高等级建筑学标准设计' : 'ROBUST ENGINEERING INTEGRITY'}
              </span>
              <h2 className="text-3xl md:text-4.5xl font-black text-white tracking-tight leading-tight">
                {language === 'CN' ? '坚若磐石的结构' : 'Steel Solid Foundations'}
              </h2>
              <p className="text-brand-gold font-semibold text-sm md:text-base mt-2">
                {language === 'CN' 
                  ? '采用高强度框架与多重支撑体系，确保整体稳定性与承载安全' 
                  : 'Engineered with massive load redistribution frame profiles to secure absolute structural stability.'}
              </p>
            </div>
            <div className="lg:col-span-7">
              <p className="text-stone-400 font-light text-sm md:text-base leading-relaxed lg:pt-6 border-l-2 border-brand-gold/35 pl-6">
                {language === 'CN'
                  ? '所有结构部件均经过严格的力学计算与疲劳测试，能够承受长期高频使用的考验。我们采用领先的构型设计，让负载均匀分布，即使在满座状态下，也能保持绝对的稳定。'
                  : 'Every support bracket, gusset, and anchor fastener has undergone finite element mathematical calculations and dynamic vibration stress modeling. This ensures absolute stability even when fully packed with dynamic cheering audiences.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Structural card 1 */}
            <div className="bg-[#171A21] rounded-3xl p-8 border border-white/[0.03] group hover:border-brand-gold/20 transition-all duration-300">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-900 border border-white/[0.05] mb-6">
                <img 
                  src="https://img-reg-ab.imagency.cn/e/1f261656c79a3b5a014673e90e744f8e.jpg" 
                  alt="Load structural system" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-lg font-black text-white tracking-tight mb-2 group-hover:text-brand-gold transition-colors">
                {language === 'CN' ? '超承压系统' : 'Massive Heavy Load-Bearing'}
              </h3>
              <p className="text-stone-400 font-light text-xs md:text-sm leading-relaxed">
                {language === 'CN'
                  ? '首创领先十字互锁构型，优选加厚抗剪高张力拉弯铝，承载力一流，最高支持设计并安全配置达到32排之多。'
                  : 'Innovative cross-bracing steel layout, crafted with high-tension aerospace structural grade alloys, supporting up to 32 rows.'}
              </p>
            </div>

            {/* Structural card 2 */}
            <div className="bg-[#171A21] rounded-3xl p-8 border border-white/[0.03] group hover:border-brand-gold/20 transition-all duration-300">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-900 border border-white/[0.05] mb-6">
                <img 
                  src="https://img-reg-ab.imagency.cn/e/2effed62039f391297e9eee589427d67.jpg" 
                  alt="Side barricades" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-lg font-black text-white tracking-tight mb-2 group-hover:text-brand-gold transition-colors">
                {language === 'CN' ? '防坠落封档及扶手' : 'Anti-Fall Barriers & Rails'}
              </h3>
              <p className="text-stone-400 font-light text-xs md:text-sm leading-relaxed">
                {language === 'CN'
                  ? '全包围无缝闭合封档，防止手机首饰甚至碎屑翻滚坠落内部传动齿轮；配合高硬防冲撞侧边扶手，全域防虚踏空。'
                  : 'Overlapping step sealing covers block small belongings from entering motor lines, with robust safety collision-resistant balustrades.'}
              </p>
            </div>

            {/* Structural card 3 */}
            <div className="bg-[#171A21] rounded-3xl p-8 border border-white/[0.03] group hover:border-brand-gold/20 transition-all duration-300">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-900 border border-white/[0.05] mb-6">
                <img 
                  src="https://img-reg-ab.imagency.cn/e/2effed62039f391297e9eee589427d67.jpg" 
                  alt="Fasteners bolts" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-lg font-black text-white tracking-tight mb-2 group-hover:text-brand-gold transition-colors">
                {language === 'CN' ? '高强度钢材与螺栓连接' : 'Tough Structural Connectors'}
              </h3>
              <p className="text-stone-400 font-light text-xs md:text-sm leading-relaxed">
                {language === 'CN'
                  ? '所有拼装受力节点均辅以抗剪切性能卓越的高扭矩螺螺母锁套连接。长期处于交变荷载和强烈晃动下仍能自紧固。'
                  : 'High-shear grade fasteners with self-locking locknuts secure every friction link point, maintaining locking posture under massive crowds.'}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ── 通栏4：全生命周期安全管理 (Light theme background) ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 reveal-up">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-brand-gold text-[10px] uppercase tracking-widest font-bold block">
              {language === 'CN' ? '长期守护 终生保障' : 'TOTAL LIFE CYCLE GUARANTY'}
            </span>
            <h2 className="text-3xl md:text-4.5xl font-black text-brand-dark tracking-tight">
              {language === 'CN' ? '安全设计，不止于交付' : 'Safety Beyond Handover'}
            </h2>
            <p className="text-brand-gold font-semibold text-sm">
              {language === 'CN' 
                ? '从设计、生产到安装、维护，全程守护您的安全' 
                : 'Pioneering complete quality tracking logs throughout planning, engineering, site assembly & yearly maintenance.'}
            </p>
            <p className="text-stone-600 font-light text-sm leading-relaxed">
              {language === 'CN'
                ? '安全是一个系统工程，贯穿于产品的整个生命周期。我们不仅提供安全的产品，更提供专业的安装服务与完善的售后保障，确保您的看台系统在使用年限内始终保持最佳的安全状态。'
                : 'Sustained security represents a holistic journey. We assign certified engineering crews for physical layout adjustment and issue annual digital diagnostic calibrations regularly.'}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {/* Grid for Life Cycle cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Item 1 */}
              <div className="p-6 rounded-2xl bg-white border border-stone-200/50 hover:shadow-luxury hover:border-brand-gold/30 transition-all duration-300 group">
                <span className="w-9 h-9 rounded-xl bg-brand-gold/15 text-brand-gold flex items-center justify-center mb-4 border border-brand-gold/20">
                  <Lock className="w-4.5 h-4.5" />
                </span>
                <h4 className="font-bold text-sm text-brand-dark group-hover:text-brand-gold transition-colors mb-1.5">
                  {language === 'CN' ? '自研安全数控芯片' : 'Sovereign Controller Cryptographic'}
                </h4>
                <p className="text-stone-500 font-light text-xs leading-relaxed">
                  {language === 'CN'
                    ? '金融级芯片底层数字指令加密，杜绝系统操作接口被外界非法恶意侵扰改动或失控运行。'
                    : 'Military-grade firmware encryption defends physical drive processors from unauthorized access.'}
                </p>
              </div>

              {/* Item 2 */}
              <div className="p-6 rounded-2xl bg-white border border-stone-200/50 hover:shadow-luxury hover:border-brand-gold/30 transition-all duration-300 group">
                <span className="w-9 h-9 rounded-xl bg-brand-gold/15 text-brand-gold flex items-center justify-center mb-4 border border-brand-gold/20">
                  <Users className="w-4.5 h-4.5" />
                </span>
                <h4 className="font-bold text-sm text-brand-dark group-hover:text-brand-gold transition-colors mb-1.5">
                  {language === 'CN' ? '资质卓越安装团队' : 'Premier Certified Installers'}
                </h4>
                <p className="text-stone-500 font-light text-xs leading-relaxed">
                  {language === 'CN'
                    ? '全员高级装配电工级技术资格考核上岗，高水平规范铺设每一个预埋点位与基础拉轨。'
                    : 'Certified mechanical fitters structure and test alignment tolerances rigorously on-site.'}
                </p>
              </div>

              {/* Item 3 */}
              <div className="p-6 rounded-2xl bg-white border border-stone-200/50 hover:shadow-luxury hover:border-brand-gold/30 transition-all duration-300 group sm:col-span-2">
                <div className="flex gap-4 items-start">
                  <span className="w-9 h-9 rounded-xl bg-brand-gold/15 text-brand-gold flex items-center justify-center shrink-0 border border-brand-gold/20">
                    <ClipboardCheck className="w-4.5 h-4.5" />
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-brand-dark group-hover:text-brand-gold transition-colors mb-1.5">
                      {language === 'CN' ? '无忧定期年度安全巡检' : 'Complimentary Annual Safety Audit'}
                    </h4>
                    <p className="text-stone-500 font-light text-xs leading-relaxed">
                      {language === 'CN'
                        ? '首年赠送免费专业结构力学无损检测及全套主被动传感器诊断升级，彻底防微杜渐，保障生命尊严。'
                        : 'Receive comprehensive structural load fatigue scanning and sensors alignment evaluation services yearly, protecting audiences without gaps.'}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── 通栏5：底部CTA通栏 (Auxiliary dark luxury theme) ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 reveal-up text-center">
        <div className="bg-[#0F1216] rounded-[2.5rem] p-12 md:p-20 text-center border border-stone-800 w-full relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-950/20 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-brand-gold/5 blur-[90px] rounded-full pointer-events-none z-0"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="text-brand-gold text-[10px] tracking-[0.25em] uppercase font-bold block">
              {language === 'CN' ? '生命安全重于泰山' : 'ABSOLUTE COMPLIANCE GUARANTEE'}
            </span>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none">
              {language === 'CN' ? '安全，是我们对您的承诺' : 'Absolute Safety is Our Sovereign Promise'}
            </h3>
            <p className="text-stone-400 font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              {language === 'CN'
                ? 'ALTULA全维度安全防护体系，为您的空间保驾护航'
                : 'ALTULA multi-tiered armor keeps the venue operating seamlessly and securely over active decades.'}
            </p>
            <div className="pt-6">
              <button
                onClick={() => onNavigate('contact')}
                className="bg-brand-gold hover:bg-[#B3966D] text-white px-10 py-4.5 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer shadow-lg inline-flex items-center gap-2 hover:scale-[1.03] transition-all duration-200"
              >
                <span>{language === 'CN' ? '获取安全技术白皮书' : 'Acquire Safety Technical Whitepaper'}</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
