import React, { useState, useRef } from 'react';
import { Layers, Settings, ArrowLeft, ArrowRight, Check, Send, Sparkles, Clipboard, VolumeX, Shield, CreditCard, Camera, Info, HelpCircle, Download, CheckCircle2 } from 'lucide-react';
import { productsData } from '../data';
import { ConfigState } from '../types';

interface ConfiguratorViewProps {
  initialType?: 'retractable' | 'public';
  onNavigate: (page: string, params?: any) => void;
  language: 'CN' | 'EN';
}

export default function ConfiguratorView({ initialType, onNavigate, language }: ConfiguratorViewProps) {
  // Steps: 1. Model & Style, 2. Materials & Woods, 3. Driving Tech, 4. Layout Dimensions, 5. Submit Spec
  const [activeStep, setActiveStep] = useState(1);
  const [activeCamera, setActiveCamera] = useState<'isometric' | 'cushion' | 'chassis' | 'collapsed'>('isometric');

  // Configuration state with premium default parameters
  const [config, setConfig] = useState<ConfigState>({
    productType: initialType || 'retractable',
    style: 'Wellgo 维格型',
    color: 'beige',
    pedals: 'wood',
    fences: 'glass',
    size: '5m-6w',
    customSize: { length: '', width: '', height: '' },
    mode: 'electric',
    charging: true,
    radar: true,
    contactName: '',
    contactPhone: '',
    companyName: '',
    projectAddress: ''
  });

  const [generationSuccess, setGenerationSuccess] = useState(false);
  const [generatedId, setGeneratedId] = useState('');
  const [isCoping, setIsCoping] = useState(false);

  // Dynamic cost calculations based on selections
  const calculateCosts = () => {
    let basePrice = config.productType === 'retractable' ? 120000 : 95000;
    let selectedOptionsCost = 0;

    // Seating profiles
    if (config.style.includes('Concepto')) {
      selectedOptionsCost += 15000;
    } else if (config.style.includes('Orden')) {
      selectedOptionsCost += 28000;
    }

    // Color coating premium
    if (config.color === 'gold' || config.color === 'custom') {
      selectedOptionsCost += 8000;
    }

    // Pedals / Timber Selection
    if (config.pedals === 'wood') {
      selectedOptionsCost += 18000;
    }

    // Guard material (Glass/Acrylic)
    if (config.fences === 'glass') {
      selectedOptionsCost += 12000;
    } else if (config.fences === 'acrylic') {
      selectedOptionsCost += 8000;
    }

    // Size multiplier
    if (config.size === '5m-6w') {
      selectedOptionsCost += 20000;
    } else if (config.size === '6m-6w') {
      selectedOptionsCost += 35000;
    } else if (config.size === 'custom') {
      selectedOptionsCost += 10000; // custom design markup
    }

    // Drive Modes
    if (config.mode === 'electric') {
      selectedOptionsCost += 25000;
    } else if (config.mode === 'entire') {
      selectedOptionsCost += 40000;
    }

    // Electrical add-ons
    if (config.charging) selectedOptionsCost += 12000;
    if (config.radar) selectedOptionsCost += 15000;

    return {
      base: basePrice,
      options: selectedOptionsCost,
      total: basePrice + selectedOptionsCost
    };
  };

  const costs = calculateCosts();

  const handleNextStep = () => {
    if (activeStep < 5) setActiveStep(activeStep + 1);
  };

  const handlePrevStep = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.contactName || !config.contactPhone) return;

    const randomId = 'ALTULA-' + Math.floor(100000 + Math.random() * 900000);
    setGeneratedId(randomId);
    setGenerationSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(generatedId);
    setIsCoping(true);
    setTimeout(() => setIsCoping(false), 2000);
  };

  // Color Swatches Definitions
  const colorsList = [
    { value: 'beige', name: language === 'CN' ? '羊毛卡米拉温米白' : 'Camila Cashmere Beige', hex: '#EBE7E0' },
    { value: 'darkgray', name: language === 'CN' ? '格拉苏蒂哑光深灰' : 'Glashütte Matte Anthracite', hex: '#53565A' },
    { value: 'black', name: language === 'CN' ? '曜石黑钢琴漆' : 'Obsidian Piano Black', hex: '#1C1D21' },
    { value: 'gold', name: language === 'CN' ? '萨克森奢雅奢金' : 'Saxony Vintage Gold', hex: '#D2C3B1' }
  ];

  const mapColorHex = () => {
    const activeCol = colorsList.find((c) => c.value === config.color);
    return activeCol ? activeCol.hex : '#EBE7E0';
  };

  const getSeatImage = () => {
    if (config.productType === 'public') {
      return 'https://img-reg-ab.imagency.cn/e/dc5395da5efbb8d2d7798f4005768381.jpg';
    }
    if (config.style.includes('Concepto') || config.style.includes('科索')) {
      return 'https://img-reg-ab.imagency.cn/e/faba224b11cbeb566081df8eff866c4d.jpg';
    }
    return 'https://img-reg-ab.imagency.cn/e/02bbb6f33a36a708c3eb24284967254a.jpg';
  };

  return (
    <div className="pt-24 pb-12 bg-brand-light min-h-screen text-brand-dark">
      {/* Porsche Banner Header */}
      <section className="bg-brand-dark text-white py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="text-brand-gold text-[10px] font-bold tracking-[0.25em] uppercase block mb-1">
              {language === 'CN' ? 'ALTULA 在线配置器' : 'ALTULA ONLINE CONFIGURATOR'}
            </span>
            <h1 className="text-xl md:text-3xl font-extrabold text-white tracking-tight">
              {config.productType === 'retractable' 
                ? (language === 'CN' ? '伸缩活动看台系列选配' : 'Retractable Standing Series')
                : (language === 'CN' ? '公共坐席看台系列选配' : 'Public Auditorium Series')}
            </h1>
          </div>
          <div className="flex items-baseline gap-4">
            <div className="text-right">
              <span className="text-[10px] text-gray-400 block uppercase tracking-wider">{language === 'CN' ? '预估总零售价：' : 'Total Est. Retail Price:'}</span>
              <span className="text-2xl font-black text-brand-gold font-mono">
                {language === 'CN' ? `¥ ${costs.total.toLocaleString()}` : `$ ${(costs.total / 7).toFixed(0)}`}
              </span>
            </div>
            {generationSuccess ? null : (
              <button
                onClick={() => setActiveStep(5)}
                className="bg-brand-gold hover:bg-[#B3966D] text-white py-2.5 px-6 rounded text-xs font-bold tracking-wider cursor-pointer transition-colors"
              >
                {language === 'CN' ? '呈报方案' : 'Request Quotation'}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Split Layout Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Aspect: Immersive Visual Rendering (Porsche style) (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-luxury sticky top-28 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Camera className="w-4 h-4 text-brand-gold animate-pulse" />
              <span>{language === 'CN' ? '坐席效果图' : 'Seat Rendering'}</span>
            </h3>
          </div>

          {/* Seat Render Image Block */}
          <div className="relative aspect-[16/10] w-full rounded-2xl bg-[#090A0B] overflow-hidden group">
            <img 
              src={getSeatImage()} 
              alt={language === 'CN' ? '坐席效果图' : 'Seat Rendering'} 
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Ambient gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30 pointer-events-none z-10"></div>

            {/* Spec metadata overlays */}
            <div className="absolute top-6 left-6 z-20 bg-black/50 backdrop-blur-md rounded-lg py-2 px-3 border border-white/10 text-[10px] text-gray-205 grid grid-cols-2 gap-x-4 gap-y-1 font-light max-w-[85%] sm:max-w-[70%] border-t border-l border-white/20">
              <div>
                <span className="text-gray-400">{language === 'CN' ? '结构系列：' : 'Framework: '}</span>
                <span className="text-white font-medium">{config.style}</span>
              </div>
              <div>
                <span className="text-gray-400">{language === 'CN' ? '动力传动：' : 'Module: '}</span>
                <span className="text-brand-gold font-bold uppercase">{config.mode}</span>
              </div>
              <div>
                <span className="text-gray-400">{language === 'CN' ? '侧护踢脚：' : 'Balustrade: '}</span>
                <span className="text-white font-medium">
                  {config.fences === 'glass' 
                    ? (language === 'CN' ? '双层钢化夹胶玻璃' : 'Laminated Glass')
                    : config.fences === 'acrylic' 
                    ? (language === 'CN' ? '高透磨砂亚克力' : 'Frosted Acrylic') 
                    : (language === 'CN' ? '实木侧隔阻面饰' : 'Spaced Timber Panel')}
                </span>
              </div>
              <div>
                <span className="text-gray-400">{language === 'CN' ? '附加电子器：' : 'Electronics: '}</span>
                <span className="text-white font-medium font-sans">
                  {config.charging || config.radar ? (language === 'CN' ? '智能加持已配' : 'Smart Active') : (language === 'CN' ? '无' : 'None')}
                </span>
              </div>
            </div>

            {/* Custom visual element overlay e.g. Selected color badge */}
            <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-inner" style={{ backgroundColor: mapColorHex() }}></span>
              <span className="text-[10px] text-white/95 font-mono tracking-wider font-light bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/5 border-t border-l border-white/10">
                {colorsList.find(c => c.value === config.color)?.name || config.color}
              </span>
            </div>

            {/* Scale marker line */}
            <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
              <span className="text-[9px] text-white/70 tracking-widest uppercase font-mono bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/5 border-t border-l border-white/10">
                ALTULA INDUSTRIAL SPEC
              </span>
            </div>
          </div>

          {/* Pricing detail breakdown sheet inside the canvas block */}
          <div className="mt-6 bg-brand-light p-5 rounded-2xl border border-gray-100">
            <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <span>{language === 'CN' ? '德系高奢看台部件报价单：' : 'German Architecture Parts Invoice:'}</span>
            </h4>
            <div className="space-y-2 text-[11px] font-mono border-b border-gray-200 pb-3">
              <div className="flex justify-between">
                <span className="text-gray-400">{language === 'CN' ? '一、精密高承载主骨架' : '1. Precision Chassis Steel'}</span>
                <span className="text-brand-dark font-medium">¥ {costs.base.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{language === 'CN' ? '二、拼装软包饰面与面饰' : '2. Upholstery & Cushioning'}</span>
                <span className="text-brand-dark font-medium">
                  {config.style.includes('Concepto') ? '¥ 15,000' : config.style.includes('Orden') ? '¥ 28,000' : '¥ 0'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{language === 'CN' ? '三、传动中控组（变频同步）' : '3. Driver sync & micro controller'}</span>
                <span className="text-brand-dark font-medium">¥ {config.mode === 'electric' ? '25,000' : config.mode === 'entire' ? '40,000' : '0'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{language === 'CN' ? '四、雷达测距停转与内置USB快充' : '4. Electronics and active protective shields'}</span>
                <span className="text-brand-dark font-medium">¥ {(config.charging ? 12000 : 0) + (config.radar ? 15000 : 0)}</span>
              </div>
            </div>
            <div className="pt-3 flex justify-between text-xs font-extrabold items-baseline">
              <span className="text-brand-dark">{language === 'CN' ? '合计预估零售零售价' : 'Total Est. Invoice Value'}</span>
              <span className="text-brand-gold text-lg font-black">
                {language === 'CN' ? `¥ ${costs.total.toLocaleString()}` : `$ ${(costs.total / 7).toFixed(0)}`}
              </span>
            </div>
          </div>
        </div>

        {/* Right Aspect: Scrollable high-density parameters drawers (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-luxury h-full flex flex-col justify-between">
          {generationSuccess ? (
            /* Success screen */
            <div className="py-12 text-center animate-fade-in flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 shadow-md border border-emerald-100 animate-bounce">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h2 className="text-2xl font-bold text-brand-dark mb-1">
                {language === 'CN' ? '尊贵选配单已生成' : 'Custom Config Completed'}
              </h2>
              <p className="text-xs text-brand-gold font-bold bg-[#E0CBA8]/10 py-1.5 px-4 rounded border border-brand-gold/20 font-mono mb-6 flex items-center gap-1.5">
                ID: {generatedId}
                <button 
                  onClick={handleCopyId}
                  className="hover:text-amber-800 transition-colors cursor-pointer"
                  title="Copy reference code"
                >
                  <Clipboard className="w-3.5 h-3.5" />
                </button>
              </p>
              {isCoping && (
                <span className="text-[10px] text-emerald-600 bg-emerald-50 py-0.5 px-2 rounded -mt-4 mb-4 select-none">
                  {language === 'CN' ? '复制到剪贴板' : 'Copied to clipboard'}
                </span>
              )}
              <p className="text-gray-500 font-light text-xs leading-relaxed max-w-sm mb-6">
                {language === 'CN' 
                  ? '您的专属看台配置参数已经下发至深圳极其精密的领先体育高定工厂销售系统。首席项目顾问将在1个工作日内与您联络并免费提供该配置的精确现场配置配合大图。'
                  : 'Your specifications are filed down into Avant Sports factory systems. Our principal designer will formulate targeted 2D/3D config blueprints matching this model shortly.'}
              </p>

              {/* PDF Spec list */}
              <div className="bg-brand-light p-4 rounded-xl text-left text-xs space-y-2 border border-gray-200/60 w-full mb-6 divide-y divide-gray-100">
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-400 font-light">{language === 'CN' ? '主看台类型：' : 'Standing Base:'}</span>
                  <span className="text-brand-dark font-bold">
                    {config.productType === 'retractable' ? (language === 'CN' ? '伸缩活动看台' : 'Retractable Seating') : (language === 'CN' ? '公共坐席平面' : 'Auditorium Planes')}
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-400 font-light">{language === 'CN' ? '座椅高定款式：' : 'Profile model:'}</span>
                  <span className="text-brand-dark font-bold">{config.style}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-400 font-light">{language === 'CN' ? '羊毛面料色：' : 'Upholstery:'}</span>
                  <span className="text-brand-dark font-bold">
                    {colorsList.find(c => c.value === config.color)?.name}
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-400 font-light">{language === 'CN' ? '项目主管姓名：' : 'Architect name:'}</span>
                  <span className="text-brand-dark font-bold">{config.contactName}</span>
                </div>
              </div>

              <div className="flex gap-4 w-full">
                <button
                  onClick={() => {
                    setGenerationSuccess(false);
                    setActiveStep(1);
                  }}
                  className="flex-1 bg-brand-dark hover:bg-black text-white py-3 rounded text-xs font-semibold cursor-pointer text-center"
                >
                  {language === 'CN' ? '重新选配一款' : 'Configure New'}
                </button>
                <button
                  onClick={() => onNavigate('home')}
                  className="flex-1 border border-gray-300 text-gray-500 hover:bg-gray-50 py-3 rounded text-xs font-semibold cursor-pointer text-center"
                >
                  {language === 'CN' ? '返回首页' : 'Home'}
                </button>
              </div>
            </div>
          ) : (
            /* Parameter Forms */
            <div>
              {/* Step indicator list */}
              <div className="flex border-b border-gray-100 pb-3 mb-6 overflow-x-auto gap-3 text-xs flex-nowrap scrollbar-hide">
                {[1, 2, 3, 4, 5].map((st) => (
                  <button
                    key={st}
                    onClick={() => setActiveStep(st)}
                    className={`py-1.5 px-3 rounded-full text-[10px] font-bold shrink-0 transition-colors cursor-pointer ${
                      activeStep === st
                        ? 'bg-brand-dark text-white'
                        : 'bg-gray-100 text-gray-400 hover:text-brand-dark'
                    }`}
                  >
                    {st === 1 && (language === 'CN' ? '1.外观与系列' : '1. Series')}
                    {st === 2 && (language === 'CN' ? '2.色彩与层板' : '2. Finishes')}
                    {st === 3 && (language === 'CN' ? '3.传动与电控' : '3. Tech')}
                    {st === 4 && (language === 'CN' ? '4.空间与测算' : '4. Layout')}
                    {st === 5 && (language === 'CN' ? '5.图纸申报' : '5. Request')}
                  </button>
                ))}
              </div>

              {/* Step 1 Content: Base Seating Model & Style */}
              {activeStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <span className="text-brand-gold text-[10px] font-bold uppercase tracking-widest">{language === 'CN' ? '第一步：车系底盘与款式选择' : 'CHASSIS & PROFILES'}</span>
                    <h2 className="text-xl font-extrabold text-brand-dark mt-1">
                      {language === 'CN' ? '定义基础空间看台形态' : 'Select Seating Frame & Style'}
                    </h2>
                  </div>

                  {/* Product class type */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">{language === 'CN' ? '核心架构等级' : 'CORE STRUCTURAL CLASS'}</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setConfig({ ...config, productType: 'retractable', style: 'Wellgo 维格型' });
                          setActiveCamera('isometric');
                        }}
                        className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                          config.productType === 'retractable'
                            ? 'border-brand-gold bg-brand-gold/5'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <span className="font-bold text-xs block mb-0.5">{language === 'CN' ? '伸缩活动看台' : 'Retractable Series'}</span>
                        <span className="text-[9px] text-gray-500 font-light block leading-relaxed">{language === 'CN' ? '展收如一，一键释放商业空间' : 'Collapsible multi-purpose stand'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setConfig({ ...config, productType: 'public', style: 'Orden 方角高定' });
                          setActiveCamera('isometric');
                        }}
                        className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                          config.productType === 'public'
                            ? 'border-brand-gold bg-brand-gold/5'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <span className="font-bold text-xs block mb-0.5">{language === 'CN' ? '公共坐席系列' : 'Public Auditoriums'}</span>
                        <span className="text-[9px] text-gray-500 font-light block leading-relaxed">{language === 'CN' ? '公建地标、会议中心静音高定' : 'Permanent acoustic lecture system'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Seating Upholstery Outline Profile */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">{language === 'CN' ? '座椅高顶靠背剖面款式' : 'SEATING SILHOUETTE DESIGN'}</label>
                    <div className="space-y-2">
                      {[
                        { 
                          name: 'Wellgo 维格型',
                          desc_cn: '现代立体。全铝压铸侧板，符合人体工学的大倾斜硬朗几何裁剪，折叠收拢阻力小。',
                          desc_en: 'Architectural straight cut. Premium cold cast shells fit standard multi-purpose functions.'
                        },
                        { 
                          name: 'Concepto 圆形席',
                          desc_cn: '弧形温润。精细羊毛双线压缝软包，声学材料加持，吸收多余杂音回弹。适合大剧院、学术中心。',
                          desc_en: 'Curved cozy shells. Integrates padded micro-fabrics which naturally absorb excess echo.'
                        },
                        { 
                          name: 'Orden 方角高定',
                          desc_cn: '尊高几何。方正轮廓拼接高密度记忆棉，德系高密编织背板。极富大国工匠的低调庄重。',
                          desc_en: 'Bold rectangular cushion with double backing. Expresses high-density corporate rigor.'
                        }
                      ].map((styleOpt) => (
                        <button
                          key={styleOpt.name}
                          type="button"
                          onClick={() => setConfig({ ...config, style: styleOpt.name })}
                          className={`w-full p-4 rounded-xl border text-left transition-colors cursor-pointer flex justify-between items-center ${
                            config.style === styleOpt.name
                              ? 'border-brand-gold bg-brand-gold/5 text-brand-dark'
                              : 'border-gray-100 hover:border-gray-300'
                          }`}
                        >
                          <div>
                            <span className="text-xs font-bold block">{styleOpt.name}</span>
                            <span className="text-[10px] text-gray-400 font-light block mt-1 leading-relaxed">
                              {language === 'CN' ? styleOpt.desc_cn : styleOpt.desc_en}
                            </span>
                          </div>
                          {config.style === styleOpt.name && (
                            <Check className="w-4 h-4 text-brand-gold bg-brand-gold/10 p-0.5 rounded-full z-10 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 Content: Colors & Wood Veneer materials */}
              {activeStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <span className="text-brand-gold text-[10px] font-bold uppercase tracking-widest">{language === 'CN' ? '第二步：色彩涂料与实木选型' : 'COLORS & WOOD FINISHES'}</span>
                    <h2 className="text-xl font-extrabold text-brand-dark mt-1">
                      {language === 'CN' ? '选择面皮色彩与踏板板材' : 'Matte Coatings & Timber Choices'}
                    </h2>
                  </div>

                  {/* High Quality Colors Swatches */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">{language === 'CN' ? '高弹性羊毛混合色彩饰面' : 'COATING FABRIC COLOURS'}</label>
                    <div className="grid grid-cols-2 gap-3">
                      {colorsList.map((col) => (
                        <button
                          key={col.value}
                          type="button"
                          onClick={() => {
                            setConfig({ ...config, color: col.value });
                            setActiveCamera('cushion');
                          }}
                          className={`p-3.5 rounded-xl border-2 transition-all flex items-center gap-3 cursor-pointer ${
                            config.color === col.value 
                              ? 'border-brand-gold bg-brand-gold/5' 
                              : 'border-gray-100 hover:border-gray-300 animate-none'
                          }`}
                        >
                          <span 
                            className="w-7 h-7 rounded-full border border-black/10 shadow-inner shrink-0 block"
                            style={{ backgroundColor: col.hex }}
                          ></span>
                          <span className="text-[10px] text-brand-dark font-extrabold leading-tight text-left">
                            {col.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Wood finish choices */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">{language === 'CN' ? '踏步层板与侧翼饰板材质' : 'TIMBER & PEDAL VENEERS'}</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setConfig({ ...config, pedals: 'wood' });
                          setActiveCamera('chassis');
                        }}
                        className={`p-4 rounded-xl border-2 text-left cursor-pointer transition-all ${
                          config.pedals === 'wood' 
                            ? 'border-brand-gold bg-brand-gold/5' 
                            : 'border-gray-100 hover:border-gray-300'
                        }`}
                      >
                        <span className="font-bold text-xs block mb-1">{language === 'CN' ? 'FSC 挂毯皇家原木板' : 'Real Hardwood Pedal'}</span>
                        <span className="text-[9px] text-gray-500 font-light block leading-relaxed">{language === 'CN' ? '18mm奢雅胡桃木原色，带减震阻尼器' : 'FSC certified hard maple block with dampers'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setConfig({ ...config, pedals: 'standard' });
                          setActiveCamera('chassis');
                        }}
                        className={`p-4 rounded-xl border-2 text-left cursor-pointer transition-all ${
                          config.pedals === 'standard' 
                            ? 'border-brand-gold bg-brand-gold/5' 
                            : 'border-gray-100 hover:border-gray-300'
                        }`}
                      >
                        <span className="font-bold text-xs block mb-1">{language === 'CN' ? '防滑磨砂碳纤维复合层' : 'Carbon Composite'}</span>
                        <span className="text-[9px] text-gray-500 font-light block leading-relaxed">{language === 'CN' ? '极致耐磨阻燃高分子，符合国家消防级' : 'Fibre with anti-skid sand texture'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Balustrade guardrail material selection */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">{language === 'CN' ? '看台护栏侧防坠落系统材' : 'GUARDRAIL INTEGRITY DESIGN'}</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { val: 'glass', title: language === 'CN' ? '钢化夹胶玻璃' : 'Laminated Glass' },
                        { val: 'acrylic', title: language === 'CN' ? '磨砂高透亚克力' : 'Frosted Acrylic' },
                        { val: 'side', title: language === 'CN' ? '铝包木栅栏' : 'Timber Spaced' }
                      ].map((g) => (
                        <button
                          key={g.val}
                          type="button"
                          onClick={() => setConfig({ ...config, fences: g.val })}
                          className={`p-3 rounded-lg border text-center transition-colors text-[10px] font-bold cursor-pointer ${
                            config.fences === g.val
                              ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                              : 'border-gray-100 hover:border-gray-300 text-gray-600 font-light'
                          }`}
                        >
                          {g.title}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* Step 3 Content: Power synchroniology & electronics */}
              {activeStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <span className="text-brand-gold text-[10px] font-bold uppercase tracking-widest">{language === 'CN' ? '第三步：传动牵引与AI感应系统' : 'POWER & DRIVETRAIN INTELLIGENCE'}</span>
                    <h2 className="text-xl font-extrabold text-brand-dark mt-1">
                      {language === 'CN' ? '选配动力单元与安全芯片' : 'Bespoke Drivetrain & Radar'}
                    </h2>
                  </div>

                  {/* Drive mode selection */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">{language === 'CN' ? '牵引移动动力等级' : 'DRIVE POWER SPECIFICATIONS'}</label>
                    <div className="flex flex-col gap-2">
                      {[
                        { val: 'manual', title_cn: '手动变位牵引', title_en: 'Manual Relocation', d: language === 'CN' ? '适合组款小于4米的微型阶梯，无阻力顺滑轨道。' : 'Glides smoothly up and down with easy human effort.' },
                        { val: 'electric', title_cn: '智能变频中控电动展收（推荐）', title_en: 'Smart Inverter Automated Sync', d: language === 'CN' ? '中控变频芯片自动校直对齐，抗卡顿智能阻断，多台联控同步。' : 'AI-assisted remote straightening and safety slow-speed torque.' },
                        { val: 'entire', title_cn: '底坐麦克纳姆轮三维漂移多维位移（超高规格）', title_en: 'Mecanum Multi-Axial Moving', d: language === 'CN' ? '内置全向特种底盘车轮，可实现左右侧移与多面漂移储存隐藏。' : 'Omni-directional Mecanum rollers glides the layout in any direction.' }
                      ].map((motor) => (
                        <button
                          key={motor.val}
                          type="button"
                          onClick={() => {
                            setConfig({ ...config, mode: motor.val });
                            if (motor.val === 'manual') setActiveCamera('isometric');
                            else setActiveCamera('collapsed');
                          }}
                          className={`p-4 rounded-xl border text-left transition-colors cursor-pointer flex justify-between items-center ${
                            config.mode === motor.val
                              ? 'border-brand-gold bg-brand-gold/5 text-brand-dark'
                              : 'border-gray-100 hover:border-gray-300'
                          }`}
                        >
                          <div>
                            <span className="text-xs font-bold block">{language === 'CN' ? motor.title_cn : motor.title_en}</span>
                            <span className="text-[9px] text-gray-400 font-light block mt-1 leading-relaxed">{motor.d}</span>
                          </div>
                          {config.mode === motor.val && (
                            <Check className="w-4 h-4 text-brand-gold shrink-0 bg-brand-gold/10 p-0.5 rounded-full z-10" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Micro Electronics Toggles */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">{language === 'CN' ? 'AI 交互电控辅助插口装置' : 'INTELLIGENT INTEGRATIONS'}</label>
                    <div className="space-y-3">
                      
                      {/* USB toggle */}
                      <button
                        type="button"
                        onClick={() => setConfig({ ...config, charging: !config.charging })}
                        className={`w-full p-4 rounded-xl border text-left transition-colors cursor-pointer flex justify-between items-center ${
                          config.charging ? 'border-brand-gold bg-brand-gold/5' : 'border-gray-100 hover:border-gray-200 text-gray-400'
                        }`}
                      >
                        <div>
                          <span className="text-xs font-bold block text-brand-dark">{language === 'CN' ? '集底排Type-C/USB手机高速安全快充' : 'Integrated Deep-Seat USB/Type-C charging hub'}</span>
                          <span className="text-[9px] text-gray-400 font-light block mt-1 leading-relaxed">
                            {language === 'CN' ? '阶梯底部暗藏集成弱电母线，会议讨论时提供便捷取电支持。' : 'Convenient power solutions for continuous long conference sessions.'}
                          </span>
                        </div>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                          config.charging ? 'bg-brand-gold text-white border-brand-gold' : 'border-gray-300 bg-white'
                        }`}>
                          {config.charging && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </button>

                      {/* Radar Toggle */}
                      <button
                        type="button"
                        onClick={() => setConfig({ ...config, radar: !config.radar })}
                        className={`w-full p-4 rounded-xl border text-left transition-colors cursor-pointer flex justify-between items-center ${
                          config.radar ? 'border-brand-gold bg-brand-gold/5' : 'border-gray-100 hover:border-gray-200 text-gray-400'
                        }`}
                      >
                        <div>
                          <span className="text-xs font-bold block text-brand-dark">{language === 'CN' ? '3D超声波雷达边缘防撞防护传感器' : 'Active 3D Collision Ultrasonic Radar Shields'}</span>
                          <span className="text-[9px] text-gray-400 font-light block mt-1 leading-relaxed">
                            {language === 'CN' ? '0.2秒极速刹停，检测通道内有无异物夹轧或行李杂物，确保运行绝对万全安全。' : 'Ultrasonic ping scans bounds to lock brakes under 0.2s if an object blocks glides.'}
                          </span>
                        </div>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                          config.radar ? 'bg-brand-gold text-white border-brand-gold' : 'border-gray-300 bg-white'
                        }`}>
                          {config.radar && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </button>

                    </div>
                  </div>

                </div>
              )}

              {/* Step 4 Content: Layout Presets & custom dimensions */}
              {activeStep === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <span className="text-brand-gold text-[10px] font-bold uppercase tracking-widest">{language === 'CN' ? '第四步：排距与现场物理界限算力' : 'DIMENSIONAL CAPACITY PLANS'}</span>
                    <h2 className="text-xl font-extrabold text-brand-dark mt-1">
                      {language === 'CN' ? '精确校对落位容积排数' : 'Verify Seat Layout Capacities'}
                    </h2>
                  </div>

                  {/* Row count config preset */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">{language === 'CN' ? '阶梯看台容量规格预设' : 'STAND DIMENSION PROFILE PRESET'}</label>
                    <div className="space-y-2">
                      {[
                        { val: '4m-5w', label: language === 'CN' ? 'A型 · 特别组（宽4M x 高5排，落座约40人）' : 'A-Series: Width 4M x Height 5 Rows (Est. 40 Seats)' },
                        { val: '5m-6w', label: language === 'CN' ? 'B型 · 特立尊（宽5M x 高6排，落座约60人）' : 'B-Series: Width 5M x Height 6 Rows (Est. 60 Seats)' },
                        { val: '6m-6w', label: language === 'CN' ? 'C型 · 领袖群（宽6M x 高6排，落座约80人）' : 'C-Series: Width 6M x Height 6 Rows (Est. 80 Seats)' },
                        { val: 'custom', label: language === 'CN' ? 'D型 · 大师非定做（输入客制几何尺寸，高级配置版）' : 'Custom architectural footprint bounds' }
                      ].map((preset) => (
                        <button
                          key={preset.val}
                          type="button"
                          onClick={() => setConfig({ ...config, size: preset.val })}
                          className={`w-full p-3.5 rounded-lg border text-left transition-all cursor-pointer flex justify-between items-center ${
                            config.size === preset.val
                              ? 'border-brand-gold bg-brand-gold/5 text-brand-dark'
                              : 'border-gray-100 hover:border-gray-300'
                          }`}
                        >
                          <span className="text-xs font-semibold">{preset.label}</span>
                          {config.size === preset.val && (
                            <Check className="w-4 h-4 text-brand-gold shrink-0 bg-brand-gold/10 p-0.5 rounded-full z-10" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* If custom, input numbers */}
                  {config.size === 'custom' && (
                    <div className="bg-brand-light p-5 rounded-2xl border border-gray-100 space-y-4 animate-fade-in text-xs">
                      <h4 className="font-extrabold text-brand-dark mb-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-bounce"></span>
                        <span>{language === 'CN' ? '请输入您的施工空间测量极值（毫米）：' : 'Specify exact spatial parameters (mm):'}</span>
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-[9px] text-gray-400 uppercase block mb-1">{language === 'CN' ? '空间长度 (mm)' : 'Length (mm)'}</label>
                          <input
                            type="number"
                            required
                            placeholder="e.g. 15000"
                            value={config.customSize.length}
                            onChange={(e) => setConfig({ ...config, customSize: { ...config.customSize, length: e.target.value }})}
                            className="w-full bg-white border border-gray-200 py-2 px-3 rounded text-xs outline-none focus:border-brand-gold font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] text-gray-400 uppercase block mb-1">{language === 'CN' ? '看台总宽度 (mm)' : 'Width (mm)'}</label>
                          <input
                            type="number"
                            required
                            placeholder="e.g. 9600"
                            value={config.customSize.width}
                            onChange={(e) => setConfig({ ...config, customSize: { ...config.customSize, width: e.target.value }})}
                            className="w-full bg-white border border-gray-200 py-2 px-3 rounded text-xs outline-none focus:border-brand-gold font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] text-gray-400 uppercase block mb-1">{language === 'CN' ? '最小吊顶高 (mm)' : 'Clear Height (mm)'}</label>
                          <input
                            type="number"
                            required
                            placeholder="e.g. 4200"
                            value={config.customSize.height}
                            onChange={(e) => setConfig({ ...config, customSize: { ...config.customSize, height: e.target.value }})}
                            className="w-full bg-white border border-gray-200 py-2 px-3 rounded text-xs outline-none focus:border-brand-gold font-mono"
                          />
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-400 font-light leading-relaxed">
                        * {language === 'CN' ? '注：ALTULA 自重力重力比通常需要现场地面承受3.5 kN/㎡，提交后我们将派遣技术主任现场协助打底加固校验。' : 'Note: ALTULA grandstands usually convey 3.5 kN/Sqm load requirements to ensure balance safety.'}
                      </p>
                    </div>
                  )}

                </div>
              )}

              {/* Step 5 Content: Submit Inquiry Formalities */}
              {activeStep === 5 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <span className="text-brand-gold text-[10px] font-bold uppercase tracking-widest">{language === 'CN' ? '第五步：提交大单立项与方案渲染' : 'FINALIZE PLATFORM SPECIFICATION'}</span>
                    <h2 className="text-xl font-extrabold text-brand-dark mt-1">
                      {language === 'CN' ? '申报尊选方案报告表' : 'Request Official Design Blueprint'}
                    </h2>
                    <p className="text-[11px] text-gray-400 font-light mt-1">
                      {language === 'CN' ? '请填写您的正确联络凭证。稍后我们将通过内部BMS系统5秒内派送配置方案包至您的专线号码。' : 'Provide installation coordinates. A technical lead will verify loads and draw mock configuration templates within 12 hours.'}
                    </p>
                  </div>

                  <form onSubmit={handleGeneratePlan} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-extrabold text-gray-500 uppercase block mb-1">{language === 'CN' ? '项目代表姓名 *' : 'Representative Name *'}</label>
                        <input
                          type="text"
                          required
                          placeholder={language === 'CN' ? '王主管 / 先生 / 女士' : 'e.g. Architect Lee'}
                          value={config.contactName}
                          onChange={(e) => setConfig({ ...config, contactName: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 py-2.5 px-3 rounded-lg text-xs font-semibold focus:border-brand-gold focus:outline-none focus:bg-white text-brand-dark"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-extrabold text-gray-500 uppercase block mb-1">{language === 'CN' ? '核审联络手机 *' : 'Callback Phone *'}</label>
                        <input
                          type="tel"
                          required
                          placeholder="1xx xxxx xxxx"
                          value={config.contactPhone}
                          onChange={(e) => setConfig({ ...config, contactPhone: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 py-2.5 px-3 rounded-lg text-xs font-semibold focus:border-brand-gold focus:outline-none focus:bg-white text-brand-dark"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-extrabold text-gray-500 uppercase block mb-1">{language === 'CN' ? '申领代表公司单位(选填)' : 'Developer / Corporate Entity'}</label>
                      <input
                        type="text"
                        placeholder="e.g. 华润置地深圳工程总部"
                        value={config.companyName}
                        onChange={(e) => setConfig({ ...config, companyName: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 py-2.5 px-3 rounded-lg text-xs font-semibold focus:border-brand-gold focus:outline-none focus:bg-white text-brand-dark"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-extrabold text-gray-500 uppercase block mb-1">{language === 'CN' ? '主要施工安装详址(选填)' : 'Installation Site Coordinates'}</label>
                      <input
                        type="text"
                        placeholder={language === 'CN' ? 'e.g. 广东省深圳市南山区深圳湾万象城中厅' : 'e.g. L3 Lobby Arena'}
                        value={config.projectAddress}
                        onChange={(e) => setConfig({ ...config, projectAddress: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 py-2.5 px-3 rounded-lg text-xs font-semibold focus:border-brand-gold focus:outline-none focus:bg-white text-brand-dark"
                      />
                    </div>

                    <div className="bg-brand-light p-3.5 rounded-lg border border-gray-200/50 text-[10px] text-gray-400 font-light leading-relaxed">
                      * {language === 'CN' 
                        ? '提交信息通过加密TLS 1.3传输，专享领先体育集团隐私合规保护，杜绝任何第三方商业广告侵扰。' 
                        : 'Your spatial credentials are protected by industrial private firewalls adhering to FCS standards.'}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-dark hover:bg-black text-white text-xs font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg shadow-black/10 mt-6"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{language === 'CN' ? '一键生成并呈报配置需求' : 'Formulate Spec & Generate Reference ID'}</span>
                    </button>
                  </form>
                </div>
              )}

              {/* Steps control togglers */}
              <div className="mt-8 pt-4 border-t border-gray-100 flex justify-between items-center">
                <button
                  onClick={handlePrevStep}
                  disabled={activeStep === 1}
                  className={`text-xs font-bold border border-gray-200 rounded-lg py-2 px-4 flex items-center gap-2 transition-all cursor-pointer ${
                    activeStep === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{language === 'CN' ? '上一步' : 'Previous'}</span>
                </button>

                {activeStep < 5 && (
                  <button
                    onClick={handleNextStep}
                    className="bg-brand-gold hover:bg-[#B3966D] text-white text-xs font-bold rounded-lg py-2 px-5 flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>{language === 'CN' ? '下一步' : 'Next Stage'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
