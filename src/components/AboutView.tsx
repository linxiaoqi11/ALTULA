import React, { useEffect } from 'react';
import { 
  ArrowRight, 
  Trophy, 
  Compass, 
  ShieldCheck, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  Settings, 
  HeartHandshake, 
  Database,
  Blocks,
  FileCheck
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (page: string, params?: any) => void;
  language: 'CN' | 'EN';
}

export default function AboutView({ onNavigate, language }: AboutViewProps) {
  useEffect(() => {
    // Reveal animation observer matching vanilla CSS reveal patterns
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
    <div className="bg-[#FAF9F6] min-h-screen text-brand-dark pt-0 overflow-x-hidden font-sans">
      
      {/* ── Screen 1: Brand Origin (品牌起源) ── */}
      <section className="relative w-full py-32 md:py-48 bg-[#0F1012] text-white overflow-hidden">
        {/* Ambient background with ultra-clean factory image overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://img-reg-ab.imagency.cn/e/f0dc8e86ea57a93f18f933e36b564256.jpg" 
            alt="ALTURA Manufacturing Center" 
            className="w-full h-full object-cover opacity-35 scale-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1012] via-[#0F1012]/80 to-[#0F1012]/30"></div>
        </div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-gold/10 blur-[180px] rounded-full pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl reveal-up">
            <span className="text-brand-gold text-xs font-mono font-bold tracking-[0.3em] uppercase mb-6 block">
              {language === 'CN' ? '传承三十载 · 奢华子品牌' : 'HERITAGE & EVOLUTION'}
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.15] mb-8 text-white">
              {language === 'CN' ? (
                <>
                  ALTULA，<br />
                  重新定义空间。
                </>
              ) : (
                <>
                  ALTULA,<br />
                  Re-conceptualizing Spatial Void.
                </>
              )}
            </h1>
            <div className="space-y-6 text-gray-300 font-light text-sm md:text-base leading-relaxed max-w-2xl">
              <p>
                {language === 'CN' 
                  ? '1994年，领先体育诞生于深圳，开启了中国场馆设施行业的新篇章。三十载栉风沐雨，三十载砥砺前行。'
                  : 'In 1994, Avant Sports was founded in Shenzhen, charting an extraordinary saga in major international stadiums and academic layouts.'}
              </p>
              <p>
                {language === 'CN' 
                  ? '30年后，我们带着对空间本质、建材奢美美学与极致秩序的深刻思考，正式推出专注于商务会所与学术殿堂的高端子品牌：ALTULA。'
                  : 'Thirty years later, with profound reflection on empty space, structural order, and high-end timber cabinetry, we proudly launch the premium bespoke brand: ALTULA.'}
              </p>
              <p className="text-brand-gold font-medium border-l-2 border-brand-gold pl-4 mt-8">
                {language === 'CN'
                  ? '“我们相信，真正好的设施，不是拼命被注意到，而是在每一次使用中，被极其自然地接受。”'
                  : '"True luxury resides in tranquility. It is not designed to grab attention, but to be naturally accepted with every usage."'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Screen 2: Brand Philosophy (品牌理念) ── */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Big Aesthetic Typography */}
            <div className="lg:col-span-5 reveal-up">
              <span className="text-brand-gold text-[10px] font-mono tracking-widest block mb-2">PHILOSOPHY</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight leading-[1.2]">
                {language === 'CN' ? (
                  <>让空间拥有<br /><span className="text-brand-gold">变化的能力</span></>
                ) : (
                  <>Empowering Spaces with The Ability <br />to Transmute</>
                )}
              </h2>
              <div className="w-20 h-1 bg-brand-gold mt-6"></div>
            </div>

            {/* Right details */}
            <div className="lg:col-span-7 space-y-6 text-gray-500 font-light text-sm md:text-base leading-relaxed tracking-wide reveal-up delay-100">
              <p className="text-brand-dark font-medium text-base md:text-lg">
                {language === 'CN'
                  ? 'ALTULA 不单单是在提供一款看台产品，而是在构建一种跨越未来的多维空间使用方式。'
                  : 'ALTULA is more than dynamic seating panels; it builds complex spatial transmutations for tomorrow.'}
              </p>
              <p>
                {language === 'CN'
                  ? '传统的会所、报告厅往往被庞大呆板的外露钢架座椅所局限。我们反向思索：如何在高度有限的空间中，完美释放更多可能？如何在瞬息万变的多场景、高饱和需求中，永久保持秩序的纯粹与美感？'
                  : 'Traditional auditoriums are forever frozen by steel skeletons. We reverse this paradigm: how to release immense volumetric possibilities in compact bounds, while keeping pure Bauhaus alignments intact?'}
              </p>
              <p>
                {language === 'CN'
                  ? '我们从空间本体出发，融入柔性精工物理动力结构，让看台不再是占据尺度的设备，而是能伴随室内设计呼吸、共同生长的优雅墙体与几何艺术品。'
                  : 'We conceptualize seating from spatial viewpoints—integrating fine physical kinetic architectures so panels double as luxury solid-wood screens that breathe with your interiors.'}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Screen 3: Designer\'s Story (设计师故事) ── */}
      <section className="py-24 bg-[#EFECE6] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Image Column */}
            <div className="lg:col-span-6 relative reveal-up">
              <div className="absolute inset-0 bg-brand-dark/5 rounded-3xl z-10"></div>
              <img 
                src="https://img-reg-ab.imagency.cn/e/02bbb6f33a36a708c3eb24284967254a.jpg" 
                alt="Designer Workspace Crafting" 
                className="rounded-3xl shadow-luxury max-h-[500px] w-full object-cover relative z-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -left-6 bg-brand-dark text-white p-6 rounded-2xl block border border-white/5 shadow- luxury max-w-xs z-20">
                <span className="text-brand-gold text-[9px] font-mono tracking-widest block mb-1">DESIGN INSIGHT</span>
                <p className="text-xs font-light text-gray-300">
                  {language === 'CN' ? '“隐字，是设计对空间的崇高敬畏；显字，则是我们对极高工业品质的严苛追求。”' : '"Concealment expresses our absolute devotion; presentation reveals pure, long-term craft discipline."'}
                </p>
              </div>
            </div>

            {/* Right Story Text Column */}
            <div className="lg:col-span-6 space-y-8 reveal-up delay-100">
              <span className="text-brand-gold text-xs font-mono font-bold tracking-[0.25em] uppercase block">
                {language === 'CN' ? '匠心理念 · THE ORIGIN' : 'ARCHITECTURAL CONCEPT'}
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-brand-dark tracking-tight leading-snug">
                {language === 'CN' ? '我们的起点：不问看台，只问空间' : 'Our Blueprint Starts with Volume, Not Frameworks'}
              </h3>
              
              <div className="space-y-6 text-gray-650 font-light text-sm md:text-base leading-relaxed tracking-wider">
                <p>
                  {language === 'CN'
                    ? '当商务办公、顶奢发布厅与学术沙龙不得不高频交互时，公共设施是否可以摆脱丑陋粗糙的枷锁，实现真正的融入无声？'
                    : 'When high-end commercial release halls, private academic forums, and state councils coalesce, must structural fittings remain bulky?'}
                </p>
                <p>
                  {language === 'CN'
                    ? '带着追问，ALTULA 自立项起便抛却所有现成图纸。我们跨越工程力学与高定家具饰面的天堑，对每一毫米钢架、每一段传动、每一块实木触感进行解构与重建。'
                    : 'With this pursuit, ALTULA bypassed conventional mass blueprints. We bridge the gap between heavy structural load-physics and fine high-end cabinet woodworks, refining every millimeter of movement.'}
                </p>
                <p>
                  {language === 'CN'
                    ? '最终孕育出的高级“可融入”展收看台：展开时，它是秩序严明、声学吸音指标极佳的极致座席；收合后，其天然枫木饰面瞬间回归安静。它从不打扰，它只是空间延伸的一部分。'
                    : 'The ultimate smart system was born: in expanded mode, it offers pristine anatomical geometry and micro-acoustic sound control; in folded mode, its premium maple wood skins perfectly align back to the wall. Unintrusive, majestic, permanent.'}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Screen 4: Brand Strength (品牌实力) ── */}
      <section className="py-24 bg-[#0F1012] text-white overflow-hidden relative border-b border-white/5">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 blur-[200px] rounded-full pointer-events-none z-0"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal-up">
            <span className="text-brand-gold text-xs font-mono font-bold tracking-[0.25em] uppercase">
              {language === 'CN' ? '三十载岁月沉淀 · 大国品牌' : 'AVANT SPORTS METALS & RECORDS'}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-3 mb-4">
              {language === 'CN' ? '全球公认的国际级质保' : '30 Years of World-Class Accreditations'}
            </h2>
            <p className="text-gray-400 font-light text-xs md:text-sm leading-relaxed max-w-lg mx-auto">
              {language === 'CN' 
                ? '作为全球公认的高端场馆设施标杆制造中心，我们积累的不仅是生产线，而是横跨国际顶级赛事的最高赞誉与坚实堡垒。'
                : 'As an internationally recognized powerhouse in seating systems, our record spans continents, and our credentials undergo rigorous, supreme stress tests.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Box 1 */}
            <div className="p-8 bg-zinc-900/60 rounded-2xl border border-white/5 shadow-luxury hover:border-brand-gold/30 transition-all reveal-up">
              <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mb-6">
                <Trophy className="w-6 h-6 animate-pulse" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{language === 'CN' ? '全球领先' : 'Global Footprint'}</h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                {language === 'CN'
                  ? '领先体育作为全球优秀的体育场馆设施制造商，全系列服务覆盖全球100多个国家和重点地区。'
                  : 'As an elite seating developer, Avant Sports spans over 100+ countries with unmatched deployment capabilities.'}
              </p>
            </div>

            {/* Box 2 */}
            <div className="p-8 bg-zinc-900/60 rounded-2xl border border-white/5 shadow-luxury hover:border-brand-gold/30 transition-all reveal-up delay-100">
              <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{language === 'CN' ? '奥运顶级供应商' : 'Olympic Performance'}</h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                {language === 'CN'
                  ? '多次成为世界性奥运会、亚运会、亚冬会、世界大学生运动会官方指定座席供应商，品质高强度验证。'
                  : 'Official supplier for prestige Olympic setups, FIFA, Asian Games and global university sports events.'}
              </p>
            </div>

            {/* Box 3 */}
            <div className="p-8 bg-zinc-900/60 rounded-2xl border border-white/5 shadow-luxury hover:border-brand-gold/30 transition-all reveal-up delay-200">
              <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{language === 'CN' ? '权威国际认证' : 'Strict Certifications'}</h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                {language === 'CN'
                  ? '荣获世界红点工业设计大奖、国际篮联 FIBA 高级测试认证、ISO9001/14001、高标准欧盟 CE 及 SGS 安全检验。'
                  : 'Recognized with RedDot design trophies, FIBA credentials, ISO9001 quality certificates, European CE, and SGS reviews.'}
              </p>
            </div>

            {/* Box 4 */}
            <div className="p-8 bg-zinc-900/60 rounded-2xl border border-white/5 shadow-luxury hover:border-brand-gold/30 transition-all reveal-up delay-300">
              <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{language === 'CN' ? '自主研发实力' : 'R&D Powerhouse'}</h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                {language === 'CN'
                  ? '自建广东省装配式体育场馆工程研究实验室。掌握100多项发明专利及实用新型知识产权。'
                  : 'Backed by independent provincial engineering laboratories with over 100+ structural patents.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Screen 5: R&D and Manufacturing (研发与制造) ── */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Columns details */}
          <div className="lg:col-span-6 space-y-6 reveal-up">
            <span className="text-brand-gold text-xs font-mono font-bold tracking-[0.25em] uppercase block">
              {language === 'CN' ? '全流程闭环 · 核心科技' : 'IN-HOUSE ULTRA PRECISION'}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-brand-dark tracking-tight leading-snug">
              {language === 'CN' ? '从最初概念到最终落地，全程可控' : 'Total Ownership: From Raw Blueprint to Final Installation'}
            </h2>
            <div className="space-y-4 text-gray-600 font-light text-sm md:text-base leading-relaxed tracking-wider">
              <p>
                {language === 'CN'
                  ? '得益于领先体育庞大且精纯的自主供应链网络与现代化生产制造机床，ALTULA 拥有极度罕见的全链条质控闭环。'
                  : 'By harnessing Avant Sports highly massive automated robotic infrastructure and precision woodturning workstations, ALTULA maintains a flawless quality loop.'}
              </p>
              <p>
                {language === 'CN'
                  ? '我们占地数万平米的生产中心配有先进数控等离子切割区、自动化打磨设备、红外无缝焊接母机和高端除尘木工封边车间。在出厂进行现场拼装调试前，必须进行超200,000次的重载疲劳安全检测。'
                  : 'Our factory clusters host heavy CNC multi-axis lasers, premium electrostatic wood turnings, and robotic frame weld stations. Components must pass 200,000 intensive fatigue cycle reviews.'}
              </p>
              <p className="font-medium text-brand-dark">
                {language === 'CN'
                  ? '保证每一排面板完美缝合，每一次开合顺滑匀速，每一颗螺丝坚不可摧，赋予项目长久稳定的运营底气。'
                  : 'Providing tight tolerance gaps, stable automation, and structural security that guarantees decades of prestige operation.'}
              </p>
            </div>
          </div>

          {/* Right Column Factory picture block wrapper */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden aspect-[16/10] bg-gray-900 border border-gray-100 shadow-luxury-dark reveal-up delay-150">
            <img 
              src="https://img-reg-ab.imagency.cn/e/f0dc8e86ea57a93f18f933e36b564256.jpg" 
              alt="Heavy CNC manufacturing deck" 
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-white">
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#BFA15F]">{language === 'CN' ? '高度自动化·重载制造机台' : 'AUTOMATED FABRICATION FLIGHT'}</span>
              <span className="text-[10px] text-gray-300 font-light font-mono">SHENZHEN HEADQUARTERS</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── Screen 6: Partners (联合设计) ── */}
      <section className="py-24 bg-[#EFECE6] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16 reveal-up">
            <span className="text-brand-gold text-xs font-mono font-bold tracking-[0.25em] uppercase">
              {language === 'CN' ? '携手世界顶尖智慧' : 'GLOBAL STRATEGIC COLLABORATION'}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-brand-dark mt-3 mb-4">
              {language === 'CN' ? '与全球优秀学术与设计力量同行' : 'In Coalition with World-Class Thinkers'}
            </h2>
            <p className="text-gray-500 font-light text-xs md:text-sm leading-relaxed">
              {language === 'CN'
                ? '我们深信闭门造车无法铸就永恒艺术。因此，ALTULA 长期融入全球尖端建筑、物理、人体工学研究生态圈。'
                : 'Pioneering spatial geometry requires collective mastery. ALTULA integrates top architectural design and structural acoustic institutions globally.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Agency 1 */}
            <div className="p-8 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm hover:translate-y-[-4px] transition-transform reveal-up">
              <h4 className="text-base font-bold text-brand-dark mb-4 font-mono">{language === 'CN' ? '国际顶级事务所创意联动' : 'GMP ARCHITECTS (GERMANY)'}</h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                {language === 'CN'
                  ? '与德国 GMP 建筑师事务所、西班牙哈维尔设计师学院、多国国家馆主笔等建立核心创意联动，在建筑规划初期即切入一体化结构方案。'
                  : 'Collaborating directly with global architectural masterminds to embed structural active solutions in core schematic phases.'}
              </p>
            </div>

            {/* Agency 2 */}
            <div className="p-8 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm hover:translate-y-[-4px] transition-transform reveal-up delay-100">
              <h4 className="text-base font-bold text-brand-dark mb-4 font-mono">{language === 'CN' ? '国内顶尖学术产学研' : 'ACADEMIC ALUMNI LABS'}</h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                {language === 'CN'
                  ? '与哈尔滨工业大学力学科学工程院、华南理工大学建筑热工与防灾及低碳能效实验室展开多向深度人才产学研研发项目。'
                  : 'Co-established heavy vibration research paradigms with Harbin Institute of Technology and South China University of Technology.'}
              </p>
            </div>

            {/* Agency 3 */}
            <div className="p-8 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm hover:translate-y-[-4px] transition-transform reveal-up delay-200">
              <h4 className="text-base font-bold text-brand-dark mb-4 font-mono">{language === 'CN' ? '全球前沿建材供应链' : 'PREMIUM MATERIALS FLOW'}</h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                {language === 'CN'
                  ? '与欧洲声学科技、瑞士高性能皮革质料、日本微秒级同步减慢阻尼电机核心厂家深度绑定，打通奢华部件的一手定标。'
                  : 'Directly sourced finest acoustic dampening cloths, Swiss eco-leather pigments, and Japanese micro-torque brushless stepper motors.'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Screen 7: Spatial Value Proposition (空间价值主张) ── */}
      <section className="py-24 bg-white relative overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Aesthetic Graphics Left */}
          <div className="lg:col-span-5 relative order-2 lg:order-1 reveal-up">
            <img 
              src="https://img-reg-ab.imagency.cn/e/eba0d9454fb1aeaa74d4b3276669c01c.png" 
              alt="Bauhaus conceptual spatial drawing" 
              className="w-full h-auto max-h-[400px] object-contain rounded-2xl border border-gray-100 p-8 bg-[#FAF9F6] shadow-sm"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Texts Right */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2 reveal-up delay-100">
            <span className="text-brand-gold text-xs font-mono font-bold tracking-[0.25em] uppercase block">
              {language === 'CN' ? '空间长期价值 · 永续陪伴' : 'LONG-TERM VALUE PROPOSITION'}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-brand-dark tracking-tight leading-snug">
              {language === 'CN' ? '绝非单一产品设备，更是您的空间合伙人' : 'More Than Physical Fixtures, Your Long-Term Spatial Partner'}
            </h2>
            <div className="space-y-4 text-gray-500 font-light text-sm md:text-base leading-relaxed tracking-wider">
              <p>
                {language === 'CN'
                  ? 'ALTULA 自始至终交付的都不是普通的固定设施，而是一套完美贴合建筑寿命、能适应未来无限变换可能的极致空间升级法则。'
                  : 'ALTULA delivers a lifelong architectural upgrade—an adaptable spatial grammar that evolves alongside changing commercial desires.'}
              </p>
              <p>
                {language === 'CN'
                  ? '我们关心资产的长期折旧价值，关心在频繁变换多模式后的坚挺与精度，关心人处在其中时最微小的舒适性反应，也更注重设施、建筑以及人三者的高维和谐。'
                  : 'We focus on asset appreciation value, enduring precision over thousands of transitions, ergonomic physical feedback, and beautiful, high-contrast aesthetics.'}
              </p>
              <p className="border-l-4 border-brand-gold pl-4 py-2 font-medium text-brand-dark/90 bg-[#FAF9F6] rounded-r-lg">
                {language === 'CN'
                  ? '我们不仅缩短地坪闲置周期，更为您的空间释放深藏的物理与精神溢价。'
                  : 'We reclaim valuable, otherwise-lost floor-space efficiency and unlock premium aesthetic margins.'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Screen 8: Service System (服务体系) ── */}
      <section className="py-24 bg-[#FAF9F6] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16 reveal-up">
            <span className="text-brand-gold text-xs font-mono font-bold tracking-[0.25em] uppercase">
              {language === 'CN' ? '极致五星管家保障' : 'END-TO-END BESPOKE WHITE-GLOVE SERVICE'}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-brand-dark mt-3 mb-4">
              {language === 'CN' ? '全链路尊奢服务体系 · 程享无忧' : 'Lifelong Care: Standardized Professional Delivery'}
            </h2>
            <p className="text-gray-400 font-light text-xs md:text-sm">
              {language === 'CN'
                ? '我们提供从初始勘测设计到日常长久巡检的定制链路，全程贴身守护。'
                : 'Every millimeter is checked by certified surveyors and engineers to guarantee precision.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm reveal-up">
              <span className="font-mono text-xs font-bold text-[#BFA15F] tracking-widest block mb-4">PHASE 01</span>
              <div className="w-10 h-10 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mb-6">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-brand-dark mb-2">{language === 'CN' ? '勘测规划与物理声学深化' : 'Global Site Survey'}</h4>
              <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                {language === 'CN'
                  ? '资深技术顾问上门采集空间测量数据、测量阶梯梁高与声学消音震噪指数，出具极其精细的高定看台方案书。'
                  : 'On-site technical specialists perform multi-point laser scanning, acoustic calibration, and load modeling.'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm reveal-up delay-100">
              <span className="font-mono text-xs font-bold text-[#BFA15F] tracking-widest block mb-4">PHASE 02</span>
              <div className="w-10 h-10 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mb-6">
                <Settings className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-brand-dark mb-2">{language === 'CN' ? '专属柔性产线智能制造' : 'Custom Modular Manufacture'}</h4>
              <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                {language === 'CN'
                  ? '依托领先工业园专用高精定制生产专线，将精钢龙骨与精选北美胡桃木进行柔性CNC生产及部件耐用检测。'
                  : 'Every piece of aviation-grade frame and solid timber plate undergoes customized computerized tooling in our premium assembly bay.'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm reveal-up delay-200">
              <span className="font-mono text-xs font-bold text-[#BFA15F] tracking-widest block mb-4">PHASE 03</span>
              <div className="w-10 h-10 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mb-6">
                <Blocks className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-brand-dark mb-2">{language === 'CN' ? '专业高级无痕安装调试' : 'Certified Safe Deployment'}</h4>
              <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                {language === 'CN'
                  ? '由具有国际赛事建装经验的领先体育金牌施工团队上门无尘拼装，在毫厘级公差内调试高灵敏感应开合系统。'
                  : 'Professional technicians map out local load setups, securing perfect gaps and calibrated motor systems on-site.'}
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm reveal-up delay-300">
              <span className="font-mono text-xs font-bold text-[#BFA15F] tracking-widest block mb-4">PHASE 04</span>
              <div className="w-10 h-10 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mb-6">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-brand-dark mb-2">{language === 'CN' ? '7×24小时关怀与终身升级' : 'Lifelong Active Care'}</h4>
              <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                {language === 'CN'
                  ? '终身建立档案、提供定期系统上门巡检润滑、物料焕新、以及专属1对1的2小时电话快速售后响应。'
                  : 'Includes regular inspections, structural lubrication, component rejuvenations, and swift callout resolutions.'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Screen 9: Contact Us (联系我们) ── */}
      <section className="py-24 bg-[#0F1012] text-white relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-brand-gold/5 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Texts Box */}
            <div className="lg:col-span-6 space-y-8 reveal-up">
              <div>
                <span className="text-brand-gold text-xs font-mono font-bold tracking-[0.25em] uppercase block mb-3">
                  {language === 'CN' ? '期待与您开启非凡之旅' : 'MEETING SPATIAL EXCELLENCE'}
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-snug">
                  {language === 'CN' ? '探讨空间的更多可能' : 'Let\'s Discuss Spatial Transmutations'}
                </h2>
                <p className="text-gray-400 font-light text-xs md:text-sm leading-relaxed mt-4 max-w-md">
                  {language === 'CN'
                    ? '我们的专业顾问随时恭候您的探讨，免费为您提供现场布局测量与配置方案和定制材质样品板。'
                    : 'Get custom layouts, 3D diagrams, and elegant physical wood/leather materials boards delivered to your offices.'}
                </p>
              </div>

              <div className="space-y-6 font-mono text-xs md:text-sm">
                {/* Field 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-gold mt-1">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-widest">{language === 'CN' ? '总部座落' : 'HEADQUARTERS LOCATION'}</span>
                    <span className="text-white block font-sans mt-0.5">
                      {language === 'CN' ? '广东省深圳市宝安区石岩洲石路领先工业园' : 'Avant Industrial Park, Zhoushi Road, Shiyan, Baoan, Shenzhen, China'}
                    </span>
                  </div>
                </div>

                {/* Field 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-gold mt-1">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-widest">{language === 'CN' ? '专属热线' : 'EXCLUSIVE HOTLINE'}</span>
                    <a href="tel:4006181848" className="text-white hover:text-brand-gold block font-sans mt-0.5 text-lg font-black transition-colors">
                      400 618 1848
                    </a>
                  </div>
                </div>

                {/* Field 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-gold mt-1">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-widest">{language === 'CN' ? '咨询电邮' : 'VIP CONSULTING MAIL'}</span>
                    <a href="mailto:market@avant.com.cn" className="text-white hover:text-brand-gold block font-sans mt-0.5 transition-colors">
                      market@avant.com.cn
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Redirect Button Container Card */}
            <div className="lg:col-span-6 bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 shadow-luxury text-center reveal-up delay-150">
              <span className="text-brand-gold text-[10px] font-mono tracking-widest uppercase font-bold block mb-2">{language === 'CN' ? '体验在线配置器与专属咨询' : 'CUSTOM COMPILATION & PRIVATE INQUIRY'}</span>
              <h3 className="text-xl font-bold text-white mb-6">
                {language === 'CN' ? '只需3秒，即可定制您的看台尺寸' : 'Tailor Your Architectural Seating System'}
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed mb-8 max-w-sm mx-auto">
                {language === 'CN'
                  ? '使用我们的在线配置器，随心测试各种开合组宽、骨架颜色和木材面板质感。'
                  : 'Experience dynamic configuration. Intercept and adjust rows, wood skins, power socket integrations, and seating scales.'}
              </p>
              
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => onNavigate('configurator')}
                  className="bg-[#BFA15F] hover:bg-[#A98D4D] text-brand-dark font-black text-xs py-4 px-8 rounded-full cursor-pointer uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                >
                  <span>{language === 'CN' ? '立即在线配置' : 'Launch Configurator'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="bg-transparent hover:bg-white/5 border border-white/20 text-white font-bold text-xs py-4 px-8 rounded-full cursor-pointer uppercase tracking-widest transition-all"
                >
                  {language === 'CN' ? '立即联络顾问咨询' : 'VIP Contact Request'}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
