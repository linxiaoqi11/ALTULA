import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Settings, 
  Check, 
  ChevronRight, 
  FileText, 
  Send, 
  Award, 
  Sparkles, 
  Sliders,
  Shield,
  VolumeX,
  Zap,
  Layers,
  HeartHandshake,
  Wrench,
  Search,
  CheckCircle2
} from 'lucide-react';
import { productsData, caseStudiesData } from '../data';

interface DetailViewProps {
  productId: string;
  onNavigate: (page: string, params?: any) => void;
  language: 'CN' | 'EN';
}

export default function DetailView({ productId, onNavigate, language }: DetailViewProps) {
  // Query active product (fallback to retractable)
  const product = productsData.find((p) => p.id === productId) || productsData[0];

  const [activeHighlightTab, setActiveHighlightTab] = useState(0);
  const [selectedPreviewColor, setSelectedPreviewColor] = useState('beige');
  const [detailConfig, setDetailConfig] = useState({
    productType: product.id === 'public' ? 'public' : 'retractable',
    style: product.id === 'public' ? 'Orden 方角高定' : 'Wellgo 维格型',
    color: 'beige',
    pedals: 'wood',
  });

  const detailColorsList = [
    { value: 'beige', name: language === 'CN' ? '羊毛卡米拉温米白' : 'Camila Cashmere Beige', hex: '#EBE7E0' },
    { value: 'darkgray', name: language === 'CN' ? '格拉苏蒂哑光深灰' : 'Glashütte Matte Anthracite', hex: '#53565A' },
    { value: 'black', name: language === 'CN' ? '曜石黑钢琴漆' : 'Obsidian Piano Black', hex: '#1C1D21' },
    { value: 'gold', name: language === 'CN' ? '萨克森奢雅奢金' : 'Saxony Vintage Gold', hex: '#D2C3B1' }
  ];

  const detailStylesList = [
    { name: 'Wellgo 维格型', name_en: 'Wellgo Profile' },
    { name: 'Concepto 圆形席', name_en: 'Concepto Curve' },
    { name: 'Orden 方角高定', name_en: 'Orden Executive' }
  ];

  const detailPedalsList = [
    { value: 'wood', name_cn: 'FSC 挂毯皇家原木板', name_en: 'Real Hardwood Pedal' },
    { value: 'standard', name_cn: '防滑磨砂碳纤维复合层', name_en: 'Carbon Composite' }
  ];

  const mapDetailColorHex = () => {
    const activeCol = detailColorsList.find((c) => c.value === detailConfig.color);
    return activeCol ? activeCol.hex : '#EBE7E0';
  };

  const getDetailSeatImage = () => {
    if (detailConfig.productType === 'public') {
      return 'https://img-reg-ab.imagency.cn/e/dc5395da5efbb8d2d7798f4005768381.jpg';
    }
    if (detailConfig.style.includes('Concepto') || detailConfig.style.includes('科索')) {
      return 'https://img-reg-ab.imagency.cn/e/faba224b11cbeb566081df8eff866c4d.jpg';
    }
    return 'https://img-reg-ab.imagency.cn/e/02bbb6f33a36a708c3eb24284967254a.jpg';
  };

  const [quoteName, setQuoteName] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteProjectSize, setQuoteProjectSize] = useState('100-300');
  const [messageSubmitted, setMessageSubmitted] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const [activePhilosophyIndex, setActivePhilosophyIndex] = useState(0);
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate dynamic card width and gap for smooth translation
  const getCardSpecs = () => {
    if (windowWidth < 768) {
      return { activeWidth: '88vw', inactiveWidth: '72vw', gap: '1.5rem' };
    } else if (windowWidth < 1024) {
      return { activeWidth: '56vw', inactiveWidth: '38vw', gap: '1.5rem' };
    } else {
      return { activeWidth: '48vw', inactiveWidth: '32vw', gap: '1.5rem' };
    }
  };
  const { activeWidth, inactiveWidth, gap } = getCardSpecs();
  const highlightTranslateX = `calc(-${activeHighlightTab} * (${inactiveWidth} + ${gap}))`;

  // Overriding/Enriching retractable copy to match absolute product criteria
  const isRetractable = product.id === 'retractable';
  
  const enrichedName = isRetractable 
    ? (language === 'CN' ? 'Crear 伸缩活动看台系列' : 'Crear Telescopic Grandstand Series') 
    : (language === 'CN' ? '公共坐席看台系列' : 'Public Seating Grandstand Series');
  
  const enrichedSubtitle = isRetractable
    ? (language === 'CN' ? '重新定义空间美学' : 'Redefining Spatial Aesthetics')
    : (language === 'CN' ? '秩序之美，融入空间' : 'Order & Flow');

  const enrichedSlogan = isRetractable
    ? (language === 'CN' ? '让每一处空间，皆藏无限可能' : 'Unlocking Spatial Multiplicity')
    : (language === 'CN' ? '匠心构造，德系硬核工艺' : 'Pure Comfort, Architectural Durability');

  const enrichedDescription = isRetractable
    ? (language === 'CN' ? '隐于无形，展于惊艳。一键切换空间形态，展开为秩序清晰的阶梯看台，收合后回归柜体尺度，释放完整空间。' : 'Concealing raw metallic hardware, ALTULA folds flush against structural frames. Expand into magnificent academic alignments with a single active smart click.')
    : (language === 'CN' ? '适用于固定场馆、高端学术报告厅和会议中心，提供符合人体工学的卓越舒适承载与长久耐用的高端品质工艺。' : 'Tailored individually for VIP public forums, academic auditoriums and government assemblies demanding rigid durability, noise control, and premium wooden trims.');

  // Sticky sub-navbar anchors
  const subSections = [
    { id: 'product-overview', cn: '产品概览', en: 'Overview' },
    { id: 'core-advantages', cn: '核心优势', en: 'Advantages' },
    { id: 'spatial-breakthroughs', cn: '全场景模式', en: 'Scenario Modes' },
    { id: 'application-scenarios', cn: '应用场景', en: 'Scenarios' },
    { id: 'technical-parameters', cn: '技术规格', en: 'Technical Data' }
  ];

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 135; // Main sticky header + sub header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Gallery items matching active product index
  const galleryImages = isRetractable 
    ? [
        { url: 'https://img-reg-ab.imagency.cn/e/02bbb6f33a36a708c3eb24284967254a.jpg', title_cn: '高级企业多功能厅展开场景', title_en: 'Active Grandstand Layout at Premium Hall' },
        { url: 'https://img-reg-ab.imagency.cn/e/faba224b11cbeb566081df8eff866c4d.jpg', title_cn: '踏步与天然枫木奢雅饰面', title_en: 'Premium Maple Woodwork Close-up' },
        { url: 'https://img-reg-ab.imagency.cn/e/f77ee005ec194f8323d0bbaa4d26852d.webp', title_cn: '香港海事博物馆大面积通透视野', title_en: 'Hong Kong Maritime Museum Open Seafront' },
        { url: 'https://img-reg-ab.imagency.cn/e/eba0d9454fb1aeaa74d4b3276669c01c.png', title_cn: 'Crear 传动系统模块化分解结构', title_en: 'Modular Structural Chassis Diagram' },
        { url: 'https://img-reg-ab.imagency.cn/e/8a48cfe1be17841fb3bf8ec91e4e12a2.webp', title_cn: '学术大厅静谧收折状态样式', title_en: 'Academic Hall Full Hidden Alignment' },
        { url: 'https://img-reg-ab.imagency.cn/e/f0dc8e86ea57a93f18f933e36b564256.jpg', title_cn: 'ALTURA 智能硬件柔性精密制造中心', title_en: 'ALTURA Advanced Smart Hardware Factory' }
      ]
    : [
        { url: 'https://img-reg-ab.imagency.cn/e/dc5395da5efbb8d2d7798f4005768381.jpg', title_cn: '高定商务谈判座席列阵', title_en: 'Executive Public Seating Alignment' },
        { url: 'https://img-reg-ab.imagency.cn/e/736c313958ba791f34e22b7b1dd62240.webp', title_cn: '乐蟠初中学术研究报告厅', title_en: 'LePan School Auditorium Full View' },
        { url: 'https://img-reg-ab.imagency.cn/e/af3a1511b2e4bc9f5f948cb183cd34cc.webp', title_cn: '传统拼装木饰看台拱顶空间物语', title_en: 'Cathedral Vault Seating Acoustics' },
        { url: 'https://img-reg-ab.imagency.cn/e/faba224b11cbeb566081df8eff866c4d.jpg', title_cn: '慢回弹静音阻尼转轴工艺', title_en: 'Concealed Slow Rebound Damping Axle Detail' },
        { url: 'https://img-reg-ab.imagency.cn/e/02bbb6f33a36a708c3eb24284967254a.jpg', title_cn: '人体工程学背部承载微视角', title_en: 'Ergonomic Premium Foam Core Backrest' },
        { url: 'https://img-reg-ab.imagency.cn/e/f0dc8e86ea57a93f18f933e36b564256.jpg', title_cn: '德国高标准工艺检测与组装区', title_en: 'German Machinery Rigorous Standards Hall' }
      ];

  useEffect(() => {
    const revealed = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.15 }
    );

    revealed.forEach((el) => observer.observe(el));
    
    const timer = setTimeout(() => {
      revealed.forEach((el) => el.classList.add('revealed'));
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [productId]);

  // Handle case studies filter
  const relatedCases = caseStudiesData.filter((c) => {
    if (isRetractable) {
      return c.config.toLowerCase().includes('伸缩');
    } else {
      return c.config.toLowerCase().includes('公共');
    }
  });

  const handleSendQuoteRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteName || !quotePhone) return;
    setMessageSubmitted(true);
    setTimeout(() => {
      setMessageSubmitted(false);
      setQuoteName('');
      setQuotePhone('');
    }, 5000);
  };

  const handlePrevHighlight = () => {
    setActiveHighlightTab((prev) => (prev === 0 ? designHighlights.length - 1 : prev - 1));
  };

  const handleNextHighlight = () => {
    setActiveHighlightTab((prev) => (prev === designHighlights.length - 1 ? 0 : prev + 1));
  };

  // Performance characteristics
  const performanceMetrics = isRetractable 
    ? [
        { label_cn: '智能开合声噪', label_en: 'Extension Noise Decibel', value: '<35 dB', desc_cn: '图书馆级消音减震滑轨，开合优雅静怡', desc_en: 'Specially engineered low noise drive' },
        { label_cn: '结构完全隐藏率', label_en: 'Space Reclaimed', value: '95%', desc_cn: '收合至极致柜面尺度，让出绝大多数平地', desc_en: 'Reclaims over 95% of room layout' },
        { label_cn: '最高安全动载力', label_en: 'Stress Loading Load', value: '450 kg/座', desc_cn: '高安全航空龙骨支撑，站行绝对稳固', desc_en: 'Stands dynamic human impacts safely' },
        { label_cn: '核心驱动控制保修', label_en: 'Core Spindle Warranty', value: '3 年', desc_cn: '原厂核心IoT智能感应模组原厂质保', desc_en: 'Full technical service warranty' }
      ]
    : [
        { label_cn: '慢仰回归角', label_en: 'Anatomical Pitch', value: '102.5°', desc_cn: '久坐舒缓，颈肩脊背完美卸载释压', desc_en: 'Ultimate ergonomic back alignment' },
        { label_cn: '消音岩棉吸能', label_en: 'Acoustic Barrier Rate', value: '0.85 NRC', desc_cn: '有效吸收观众区杂音，利于前台话筒', desc_en: 'Effectively absorbs lobby sound echoes' },
        { label_cn: '物理底架极限刚屈', label_en: 'Steel Yield Limits', value: '380 MPa', desc_cn: '底架重负载锻钢连接，坚固抗卡卡滞', desc_en: 'High-yield custom structural steel' },
        { label_cn: '防醛环保质检等级', label_en: 'Green Formaldehyde', value: 'E0 级', desc_cn: '免污染无甲醛释放，呵护师生健康', desc_en: 'Eco-certified green building logs' }
      ];

  // Tab dynamic values - Custom bilingual content requested by user
  const designHighlights = [
    {
      tab_name: language === 'CN' ? '人体工学舒适' : 'Ergonomic Comfort',
      tab_en: 'Ergonomic・Born for Comfort',
      bullets_cn: [
        '贴合人体脊柱曲线设计，久坐 4 小时无疲劳，适配长时间会议与培训',
        '全软包高密度海绵座椅 + 精细缝线工艺，触感细腻，高级质感拉满',
        '每一处角度精密调校，靠背倾角、坐深、扶手高度均符合人体工学标准'
      ],
      bullets_en: [
        'Sculpted to align with spine contours, allowing fatigue-free sitting for up to 4 hours.',
        'High-density cushioning paired with fine stitching delivers exquisite texture & premium feel.',
        'Each dimension is finely calibrated: backrest reclining, depth, and height meet executive standards.'
      ],
      image: 'https://img-reg-ab.imagency.cn/e/02bbb6f33a36a708c3eb24284967254a.jpg'
    },
    {
      tab_name: language === 'CN' ? '灵活空间扩展' : 'Flexible Space Expansion',
      tab_en: 'Flexible Expansion・Adaptive Space Design',
      bullets_cn: [
        '创新伸缩机械结构，一键电动展开 / 收合，单人即可完成操作',
        '自由调整排数与座位数，4m/5m/6m 标准组宽，支持任意尺寸定制',
        '无缝切换多种空间模式，从单人办公到百人大会，一键适配所有需求'
      ],
      bullets_en: [
        'Innovative telescopic motor controls enable electric expansion/retraction with single-operator ease.',
        'Freely scale configurations: support 4m/5m/6m spans or any custom length to fit layouts.',
        'Seamlessly morph across venues, adapting from dynamic workspaces to high-occupancy assemblies.'
      ],
      image: 'https://img-reg-ab.imagency.cn/e/faba224b11cbeb566081df8eff866c4d.jpg'
    },
    {
      tab_name: language === 'CN' ? '智能互联控制' : 'Smart Interconnection Control',
      tab_en: 'IoT-Enabled・Smart Interconnectivity',
      bullets_cn: [
        '全场景智能控制系统，支持一键收放、分区控制、集中管理',
        '雷达防撞感应技术，运行路径实时监测，遇障碍物自动紧急停机',
        'IoT 远程互联，可通过手机 / 平板控制设备，查看运行状态与维护记录'
      ],
      bullets_en: [
        'Full-range spatial control desk supporting single-key motion, zoned action, or central administration.',
        'Ultrasonic anti-collision radar dynamically senses obstacles to trigger intelligent safety stops.',
        'IoT interconnectivity permits telemetry reading, scheduling, and remote operations from personal tablets.'
      ],
      image: 'https://img-reg-ab.imagency.cn/e/eba0d9454fb1aeaa74d4b3276669c01c.png'
    },
    {
      tab_name: language === 'CN' ? '隐藏式智能收纳' : 'Concealed Smart Storage',
      tab_en: 'Storage Space・Intelligent Storage System',
      bullets_cn: [
        '极致收纳厚度，收合后仅为柜体尺度，释放 90% 以上场地空间',
        '下部集成隐藏式储物模块，可收纳折叠椅、会议物料、展示器材',
        '全隐藏式设计，收合后无任何外露结构，保持空间整洁优雅'
      ],
      bullets_en: [
        'Ultra-slim collapsed width stays strictly within cupboard bounds, freeing up to 90% floor venue.',
        'Bottom integrated drawer bins house auxiliary folding chairs, equipment, and presentation kits.',
        'Fully flush minimalist appearance. Folded fixtures hide all mechanical shafts to look seamless.'
      ],
      image: 'https://img-reg-ab.imagency.cn/e/8a48cfe1be17841fb3bf8ec91e4e12a2.webp'
    },
    {
      tab_name: language === 'CN' ? '内置不间断供电' : 'Built-in Uninterrupted Power',
      tab_en: 'Built-In Power Supply・Uninterrupted Power',
      bullets_cn: [
        '每座集成 USB+Type-C 双充电接口，支持有线 + 无线双充模式',
        '多设备同时供电无压力，满足会议、办公、培训等全场景用电需求',
        '隐藏式布线设计，无杂乱线缆，保持空间视觉统一'
      ],
      bullets_en: [
        'Dual integrated USB and Type-C sockets on each arm support wired and wireless power supply.',
        'Concurrent high-efficiency charging safely satisfies modern laptop and smartphone demands.',
        'Concealed cable lines run within inner conduits to ensure zero external cable clutter.'
      ],
      image: 'https://img-reg-ab.imagency.cn/e/dc5395da5efbb8d2d7798f4005768381.jpg'
    }
  ];

  const colorHexMap: Record<string, string> = {
    beige: '#EBE7E0',
    darkgray: '#53565A',
    black: '#1C1D21',
    gold: '#D2C3B1'
  };

  return (
    <div className="bg-[#FAF9F6] text-brand-dark min-h-screen pb-12 overflow-x-hidden font-sans">
      
      {/* ── Screen 1: Immersive Fullscreen Hero (Aesthetics overlay) ── */}
      <section className="relative w-full h-[75vh] md:h-[85vh] bg-brand-dark overflow-hidden flex flex-col justify-end">
        <div className="absolute inset-0">
          <img 
            src={product.image} 
            alt={enrichedName} 
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1012] via-[#0F1012]/40 to-black/30"></div>
        </div>

        {/* Back Link Row */}
        <div className="absolute top-24 left-6 md:left-12 z-20">
          <button
            onClick={() => onNavigate('products')}
            className="group inline-flex items-center gap-2 bg-black/60 backdrop-blur-md text-[10px] font-bold text-white tracking-widest uppercase hover:bg-brand-gold/90 transition-all py-2.5 px-5 rounded-full border border-white/10 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1.5 transition-transform" />
            <span>{language === 'CN' ? '返回产品系列' : 'Back to Exhibits'}</span>
          </button>
        </div>

        {/* Title details overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pb-16">
          <div className="max-w-3xl reveal-on-scroll">
            <span className="text-brand-gold text-xs font-mono font-bold tracking-[0.3em] uppercase mb-4 block">
              {enrichedSlogan}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.12] mb-6 shadow-text">
              {enrichedName}
            </h1>
            <p className="text-gray-300 font-light text-sm md:text-base leading-relaxed max-w-2xl">
              {enrichedDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-4 z-20 relative">
              <button
                onClick={() => onNavigate('configurator', { productType: product.id })}
                className="btn-gold px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>{language === 'CN' ? '立即在线配置' : 'Configure Now'}</span>
                <Sliders className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={() => handleScrollTo('consulting-form')}
                className="px-8 py-3.5 border border-white/30 hover:border-white text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all cursor-pointer"
              >
                {language === 'CN' ? '咨询报价方案' : 'Inquire Quote'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Segmented Sub-Navbar (Porsche Taycan Inspiration) */}
      <nav className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-12 flex justify-between items-center h-16">
          <div className="flex gap-1 items-center">
            <span className="font-extrabold text-sm text-brand-dark tracking-tight mr-3">{enrichedName}</span>
            <span className="bg-brand-gold/15 text-brand-gold/90 text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider font-mono">
              {language === 'CN'
                ? (product.id === 'retractable' ? '智能伸缩看台' : '固定看台坐席')
                : (product.id === 'retractable' ? 'RETRACTABLE' : 'PUBLIC')}
            </span>
          </div>
          <div className="flex gap-8">
            {subSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => handleScrollTo(sec.id)}
                className="text-gray-500 hover:text-brand-dark hover:border-brand-dark transition-all text-xs font-semibold py-5 cursor-pointer border-b-2 border-transparent"
              >
                {language === 'CN' ? sec.cn : sec.en}
              </button>
            ))}
          </div>
          <div>
            <button
              onClick={() => handleScrollTo('consulting-form')}
              className="bg-brand-dark hover:bg-black text-white text-[10px] font-bold px-4 py-2 rounded tracking-widest uppercase cursor-pointer transition-colors"
            >
              {language === 'CN' ? '立即咨询' : 'Inquire Now'}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Section 1: Product Intro (产品概览 - Porsche Taycan Split Screen Style) ── */}
      <section id="introduction" className="scroll-mt-24 py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <span className="text-brand-gold text-xs font-bold uppercase tracking-widest font-mono block mb-2">
              {language === 'CN' ? '空间重构' : 'SPATIAL RECONSTRUCTION'}
            </span>
            <h2 className="text-3xl md:text-5.5xl font-black text-brand-dark leading-[1.1] tracking-tight mb-6">
              {language === 'CN' ? '重塑空间张力，构筑非凡格局' : 'Reshaping spatial tension, building extraordinary patterns'}
            </h2>
            <p className="text-gray-500 font-light text-sm leading-relaxed mb-6">
              {language === 'CN' 
                ? '以极致的极简美学语汇与精密机械学构局，突破传统的固定阻隔。为高端多维会场、私属艺术展区与顶级会议空间赋予超阶流动能量与极致坪效转换。' 
                : 'With ultimate minimalist aesthetic vocabulary and precise mechanical layout, it breaks through traditional fixed barriers. Empowering premium workspaces with high flow capability.'
              }
            </p>
            <div className="pt-4 grid grid-cols-2 gap-6 divide-x divide-gray-200">
              <div className="pl-0">
                <span className="text-2xl font-black text-brand-dark font-mono block">
                  {isRetractable ? '95%' : '<35dB'}
                </span>
                <span className="text-gray-400 text-[10px]">
                  {isRetractable ? (language === 'CN' ? '地坪释放效率' : 'Space Reclamation Rate') : (language === 'CN' ? '慢慢回弹噪音' : 'Rebound Silence Decibel')}
                </span>
              </div>
              <div className="pl-6">
                <span className="text-2xl font-black text-brand-dark font-mono block">
                  {isRetractable ? '<35dB' : 'E0 等级'}
                </span>
                <span className="text-gray-400 text-[10px]">
                  {isRetractable ? (language === 'CN' ? '智能开合声噪' : 'Extension Noise Decibel') : (language === 'CN' ? '绿色无醛防醛' : 'Eco Formaldehyde Standard')}
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 rounded-3xl overflow-hidden aspect-[16/10] shadow-luxury bg-black">
            <video 
              src="https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEUPYZqC_aBgKcOTfLHOVATvY4SswifWAACfSAAAjfoYFQfq6SaMfLsjTsE.mp4"
              className="w-full h-full object-cover select-none"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </section>

      {/* ── 2. Performance Specs Grid ── */}
      <section className="py-12 bg-[#0F1012] text-white border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {performanceMetrics.map((met, idx) => (
              <div 
                key={idx} 
                className={`pt-6 lg:pt-0 lg:px-6 first:pl-0 border-t lg:border-t-0 border-white/10 first:border-t-0 flex flex-col justify-between reveal-on-scroll delay-${idx * 100}`}
              >
                <div>
                  <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest block mb-2">
                    {language === 'CN' ? met.label_cn : met.label_en}
                  </span>
                  <span className="text-3xl md:text-4xl font-black text-brand-gold font-mono block mb-2 leading-none">
                    {met.value}
                  </span>
                </div>
                <p className="text-gray-500 text-[11px] font-light leading-snug">
                  {language === 'CN' ? met.desc_cn : met.desc_en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Core Advantages (产品亮点 - Full Width Breakout Slider) ── */}
      <section id="core-advantages" className="scroll-mt-24 py-24 bg-white border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header with Title and Sliding Arrow Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-gray-100">
            <div className="text-left max-w-3xl">
              <span className="text-brand-gold text-xs font-bold uppercase tracking-widest font-mono block">
                {language === 'CN' ? '产品亮点' : 'PRODUCT HIGHLIGHTS'}
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-dark mt-2 tracking-tight">
                {language === 'CN' ? '五大核心优势，打造极致空间体验' : 'Five Core Advantages, Crafting the Ultimate Space Experience'}
              </h2>
              <p className="text-gray-500 font-light text-xs md:text-sm leading-relaxed mt-4">
                {language === 'CN'
                  ? '从舒适体验、空间效率到智能安全，每一项设计都源于对高端商务场景需求的深度洞察。我们拒绝冗余功能，只保留真正能解决痛点的核心优势，让每一次使用都成为享受。'
                  : 'From ergonomic comfort and spatial efficiency to intelligent safety, every design is born from a deep understanding of premium business scenarios. We reject redundant features, retaining only the vital core advantages that solve real user needs.'}
              </p>
            </div>
            
            {/* Sliding Arrow Controls (Porsche style) */}
            <div className="flex gap-3 mt-4 md:mt-0">
              <button 
                onClick={handlePrevHighlight}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-brand-dark hover:text-white hover:border-brand-dark text-gray-600 transition-all cursor-pointer"
                aria-label="Previous Highlight"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNextHighlight}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-brand-dark hover:text-white hover:border-brand-dark text-gray-600 transition-all cursor-pointer"
                aria-label="Next Highlight"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div> {/* Close max-w-7xl mx-auto px-6 md:px-12 constraint to break content to fullbleed edge */}

        {/* 1:1 Porsche Taycan Full-Bleed Slider Implementation */}
        <div className="relative w-full overflow-hidden py-4 bg-transparent">
          <div 
            className="flex gap-6 transition-transform duration-500 ease-out px-6 md:px-12 lg:px-[calc((100vw-min(1280px,100vw))/2+3rem)]"
            style={{ 
              transform: `translate3d(${highlightTranslateX}, 0, 0)`,
              width: 'max-content'
            }}
          >
            {designHighlights.map((high, idx) => {
              const isActive = activeHighlightTab === idx;
              return (
                <div
                  key={idx}
                  className={`shrink-0 aspect-[16/11.5] sm:aspect-[16/12] md:aspect-[16/12.5] relative rounded-[2rem] overflow-hidden bg-brand-dark shadow-luxury group text-white cursor-pointer transition-all duration-500 ${
                    isActive ? 'ring-2 ring-brand-gold scale-[1.04] shadow-[0_20px_50px_rgba(191,161,95,0.25)] z-10 z-[2]' : 'opacity-40 scale-[0.96] hover:opacity-72 hover:scale-[0.98]'
                  }`}
                  style={{ width: isActive ? activeWidth : inactiveWidth }}
                  onClick={() => setActiveHighlightTab(idx)}
                >
                  <img 
                    src={high.image} 
                    alt={high.tab_name} 
                    className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Dark gradient mask custom aligned with Porsche theme overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent flex flex-col justify-end p-6 md:p-8 lg:p-10 text-left">
                    <span className="text-brand-gold text-[10px] md:text-xs font-bold tracking-widest font-mono uppercase block mb-1">
                      {language === 'CN' ? `产品亮点 0${idx + 1}` : `HIGHLIGHT 0${idx + 1}`}
                    </span>
                    <h3 className="text-xl md:text-2xl lg:text-2.5xl font-extrabold text-white tracking-tight mb-2 md:mb-3">
                      {high.tab_name}
                    </h3>
                    
                    <ul className="text-[11px] md:text-xs text-gray-200/95 font-light leading-relaxed space-y-1.5 md:space-y-2 max-w-xl list-none mt-1">
                      {(language === 'CN' ? high.bullets_cn : high.bullets_en).map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-1 w-full text-left">
                          <span className="text-brand-gold mr-1 mt-1.5 select-none shrink-0 font-bold text-[8px]">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Dots Indicator at the bottom */}
          <div className="flex justify-center gap-2 mt-8">
            {designHighlights.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveHighlightTab(idx)}
                className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                  activeHighlightTab === idx ? 'w-8 bg-brand-dark' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={language === 'CN' ? `前往第 ${idx + 1} 个设计亮点` : `Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ── Section 3: 7 All-Scenario Modes Showcase (7 大全场景模式展示 - Interactive Tabbed Exhibition) ── */}
      <section id="spatial-breakthroughs" className="scroll-mt-24 py-24 bg-brand-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
            <span className="text-brand-gold text-xs font-bold uppercase tracking-widest font-mono">
              {language === 'CN' ? '空间重塑 ｜ 纯智场景' : 'SPATIAL DISCIPLINE ｜ MULTI-SCENARIOS'}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark mt-3 mb-4 tracking-tight">
              {language === 'CN' ? '7 大全场景模式展示' : '7 Ultimate All-Scenario Modes'}
            </h2>
            <p className="text-gray-500 font-light text-xs md:text-sm leading-relaxed">
              {language === 'CN'
                ? '通过智能伸缩机械系统与高定座椅的人体工学交互，ALTULA 赋予单一空间多重高端功能属性。'
                : 'Through dynamic telescopic mechanics and elite ergonomic seating configurations, ALTULA activates spatial multiplicity on demand.'}
            </p>
          </div>

          {/* 7 Scenarios Twin-Grid Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12 items-stretch">
            
            {/* Left Column: Interactive Scenario Items List (1 to 7) (Ratio: 3) */}
            <div className="lg:col-span-3 flex flex-col justify-center space-y-3 order-first">
              {[
                {
                  id: 1,
                  titleCN: "商务大会模式",
                  titleEN: "Business Conference Mode",
                  bulletsCN: [
                    "看台全展开，形成标准阶梯式观众席",
                    "每排视线无遮挡，可容纳最多人数",
                    "适配企业年会、产品发布会、行业论坛等大型活动"
                  ],
                  bulletsEN: [
                    "Fully deployed, creating standard tiered viewer layout",
                    "Zero structural sight-line blocks, scaling room limits",
                    "Ideal for enterprise summits, launches, global forums"
                  ]
                },
                {
                  id: 2,
                  titleCN: "培训学习模式",
                  titleEN: "Training & Study Mode",
                  bulletsCN: [
                    "座椅翻折，背部木质结构转化为临时桌面",
                    "配备独立充电接口，满足笔记本、平板使用需求",
                    "适配员工培训、技能讲座、在线课程等学习场景"
                  ],
                  bulletsEN: [
                    "Seating folds, conversion of wood trim backrest to note desk",
                    "Integrated electric socket clusters powering notebooks & gadgets",
                    "Crafted for intensive training, expert clinics, and video lectures"
                  ]
                },
                {
                  id: 3,
                  titleCN: "总结大会模式",
                  titleEN: "Annual Ceremony Mode",
                  bulletsCN: [
                    "前排展开为主席台，后排为观众席",
                    "分区控制，灵活调整主席台与观众席比例",
                    "适配季度总结会、年度表彰大会、全员大会等正式会议"
                  ],
                  bulletsEN: [
                    "Frontend functions as stage rostrum, backend as tiered seating",
                    "Sub-divided motor zones, free adjustment of audience proportions",
                    "Best for quarterly assemblies, award programs, company galas"
                  ]
                },
                {
                  id: 4,
                  titleCN: "会议 & 候场休息室模式",
                  titleEN: "Forum & Pre-function Lounge",
                  bulletsCN: [
                    "看台半展开，前区为正式会议区",
                    "后区收合为开放休息区，摆放沙发与茶歇",
                    "适配高端商务会议、VIP 接待、小型发布会等场景"
                  ],
                  bulletsEN: [
                    "Half-expanded system providing an premium discussion area",
                    "Rear bays retract, leaving room for plush sofas and buffet tables",
                    "Perfect for VIP meet-ups, executive receptions, and high-end briefings"
                  ]
                },
                {
                  id: 5,
                  titleCN: "会议 & 沙龙模式",
                  titleEN: "Symmetrical Seminar & Salon",
                  bulletsCN: [
                    "一侧展开为阶梯会议区，另一侧收合为沙龙交流区",
                    "同一空间同时满足正式会议与自由交流需求",
                    "适配行业沙龙、主题分享会、跨界交流活动等"
                  ],
                  bulletsEN: [
                    "One-side panel open for lectures, secondary side flat for circles",
                    "Single footprint achieves formal delivery & loose networking simultaneously",
                    "Great for design salons, master panels, and cross-field activities"
                  ]
                },
                {
                  id: 6,
                  titleCN: "双会议室模式",
                  titleEN: "Dual Autonomous Boardrooms",
                  bulletsCN: [
                    "看台完全收合，通过移动隔断将场地一分为二",
                    "形成两个独立的小型会议室，同时开展不同会议",
                    "大幅提升空间利用率，解决多会议同时进行的需求"
                  ],
                  bulletsEN: [
                    "Retracts completely, splitting space cleanly via acoustic partitions",
                    "Yields two quiet standalone rooms executing parallel agendas",
                    "Enormously increases workspace availability and scheduling options"
                  ]
                },
                {
                  id: 7,
                  titleCN: "团建空间活动模式",
                  titleEN: "Team Building & Social Gala",
                  bulletsCN: [
                    "看台完全收合，释放完整的开阔场地",
                    "可布置为团建游戏区、聚餐区、展示区等",
                    "适配企业团建、生日会、客户答谢会等休闲活动"
                  ],
                  bulletsEN: [
                    "Total retraction against walls, unleashing 100% flat square meters",
                    "Versatile layout accommodating interactive games, dining tables, displays",
                    "Superb for indoor games, private celebrations, corporate mixers"
                  ]
                }
              ].map((scenario, index) => {
                const isActive = activeScenarioIndex === index;
                return (
                  <button
                    key={scenario.id}
                    onClick={() => setActiveScenarioIndex(index)}
                    className={`w-full text-left p-4 md:p-5 rounded-2xl transition-all duration-300 flex items-start gap-4 border cursor-pointer outline-none ${
                      isActive 
                        ? 'bg-white border-brand-gold/60 shadow-md translate-x-2' 
                        : 'bg-white/40 hover:bg-white/80 border-transparent hover:translate-x-1'
                    }`}
                  >
                    {/* Index Circle Indicator */}
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors duration-300 ${
                      isActive 
                        ? 'bg-brand-gold text-white shadow' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      0{scenario.id}
                    </span>

                    {/* Content Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className={`text-sm md:text-base font-bold transition-colors duration-300 ${
                          isActive ? 'text-brand-dark font-black' : 'text-gray-600'
                        }`}>
                          {language === 'CN' ? scenario.titleCN : scenario.titleEN}
                        </h4>
                        
                        {/* Dynamic Active Indicator */}
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse shrink-0" />
                        )}
                      </div>

                      {/* Expandable Bullets Panel */}
                      <div className={`transition-all duration-500 overflow-hidden ${
                        isActive ? 'max-h-56 opacity-100 mt-3 pt-3 border-t border-gray-100' : 'max-h-0 opacity-0'
                      }`}>
                        <ul className="space-y-1.5 text-xs text-gray-500 font-light list-none">
                          {(language === 'CN' ? scenario.bulletsCN : scenario.bulletsEN).map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-1 text-left">
                              <span className="text-brand-gold mr-1 mt-1 font-bold text-[8px] select-none">•</span>
                              <span className="leading-relaxed">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Visual Media Display (Dynamic Image Showroom) (Ratio: 7) */}
            <div className="lg:col-span-7 flex flex-col justify-between relative min-h-[350px] md:min-h-[450px] lg:min-h-[550px] bg-brand-dark rounded-3xl overflow-hidden shadow-luxury">
              
              {/* Dynamic Image with elegant transitions */}
              {(() => {
                const scenarioImages = [
                  'https://img-reg-ab.imagency.cn/e/02bbb6f33a36a708c3eb24284967254a.jpg', // 商务大会
                  'https://img-reg-ab.imagency.cn/e/736c313958ba791f34e22b7b1dd62240.webp', // 培训学习
                  'https://img-reg-ab.imagency.cn/e/dc5395da5efbb8d2d7798f4005768381.jpg',   // 总结大会
                  'https://img-reg-ab.imagency.cn/e/f77ee005ec194f8323d0bbaa4d26852d.webp', // 会议&候场休息
                  'https://img-reg-ab.imagency.cn/e/af3a1511b2e4bc9f5f948cb183cd34cc.webp', // 会议&沙龙
                  'https://img-reg-ab.imagency.cn/e/faba224b11cbeb566081df8eff866c4d.jpg',   // 双会议室
                  'https://img-reg-ab.imagency.cn/e/f0dc8e86ea57a93f18f933e36b564256.jpg',   // 团建空间
                ];
                const activeImg = scenarioImages[activeScenarioIndex] || scenarioImages[0];
                return (
                  <div className="absolute inset-0 w-full h-full">
                    <img 
                      src={activeImg} 
                      alt="Active Scenario Mode Visualization" 
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out scale-102"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40" />
                  </div>
                );
              })()}



              {/* Bottom Details with description overlay */}
              {(() => {
                const scenarioTitlesCN = [
                  '商务大会模式',
                  '培训学习模式',
                  '总结大会模式',
                  '会议 & 候场休息室模式',
                  '会议 & 沙龙模式',
                  '双会议室模式',
                  '团建空间活动模式'
                ];
                const scenarioTitlesEN = [
                  'Business Assembly Mode',
                  'Training & Workshops Mode',
                  'Executive Plenary Mode',
                  'Conference & Lounge Mode',
                  'Conference & Creative Salon Mode',
                  'Dual Boardrooms Hybrid Mode',
                  'Corporate Team Building Mode'
                ];
                return (
                  <div className="relative z-10 p-8 md:p-12 text-left mt-auto">
                    <span className="text-brand-gold font-mono text-xs font-bold tracking-widest block mb-2">
                      {language === 'CN' ? '智变看台应用方案' : 'INTELLIGENT LAYOUT PROSPECTUS'}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none mb-3">
                      {language === 'CN' ? scenarioTitlesCN[activeScenarioIndex] : scenarioTitlesEN[activeScenarioIndex]}
                    </h3>
                    <p className="text-gray-300 font-light text-xs md:text-sm leading-relaxed max-w-xl">
                      {language === 'CN' ? 
                        [
                          '看台全展开，形成标准阶梯式观众席。每排视线无阻，带来尊贵极端的开阔会场视野。',
                          '座椅智能反转，靠背木质面板可充当稳置的书写面板以保障高品质沉浸研修。',
                          '前部与后部分区域独立开合控制，动态调整发言团队与广大座席受众的空间比重。',
                          '半合拢的流线型布局，将开阔平台空间完美分割，一侧议政探求一侧静谧茶歇。',
                          '一翼错落展开演说阶梯，一翼隐藏合拢为尊贵沙发软座的沙龙漫游交际空间。',
                          '全部看台隐匿收合，配合重叠吸音移动隔墙，将原本庞然会场分隔为对立并存的双工作区。',
                          '全收合空间退隐无声，释放平整开阔开地，任意放置展示设备与多类派对器材。'
                        ][activeScenarioIndex] :
                        [
                          'Fully deployed tiered grandstand setting. Perfect row sightlines maximizing occupancy.',
                          'Interactive seats fold back, converting solid wooden skins into personal note desks.',
                          'Multi-zone motion controls flexible scaling of stage boundaries and tiered seating counts.',
                          'Optimized half-open footprint generating formal meeting and comfortable coffee brake zones.',
                          'Combining structured presentations with relaxed networking setups side-by-side.',
                          'Full retraction hidden perfectly inside wall plates, allowing massive layouts to isolate easily.',
                          'Reclaim 100% floor plate to arrange catering tables, creative structures and party features.'
                        ][activeScenarioIndex]
                      }
                    </p>
                  </div>
                );
              })()}

            </div>

          </div>

        </div>
      </section>

      {/* ── Section 4: Design Philosophy (设计亮点 - 图文展示) ── */}
      <section id="application-scenarios" className="scroll-mt-24 py-24 bg-white border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Interactive Graphic Display Panel (Column span: 5) */}
            <div className="lg:col-span-5 relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-stone-50 shadow-luxury group">
              <img 
                src={
                  activePhilosophyIndex === 0 ? 'https://img-reg-ab.imagency.cn/e/02bbb6f33a36a708c3eb24284967254a.jpg' :
                  activePhilosophyIndex === 1 ? 'https://img-reg-ab.imagency.cn/e/faba224b11cbeb566081df8eff866c4d.jpg' :
                  activePhilosophyIndex === 2 ? 'https://img-reg-ab.imagency.cn/e/eba0d9454fb1aeaa74d4b3276669c01c.png' :
                  'https://img-reg-ab.imagency.cn/e/dc5395da5efbb8d2d7798f4005768381.jpg'
                } 
                alt="Design Detail Preview" 
                className="absolute inset-0 w-full h-full object-cover transition-all duration-[700ms] ease-out scale-[1.01] group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 p-8 flex flex-col justify-end">
                
                <div>
                  <span className="text-brand-gold text-xs font-bold font-mono">0{activePhilosophyIndex + 1}</span>
                  <h4 className="text-white text-xl font-extrabold tracking-tight mt-1">
                    {language === 'CN' ?
                      [
                        '统一材质语言',
                        '极简线条美学',
                        '隐藏式结构设计',
                        '多配色可选'
                      ][activePhilosophyIndex] :
                      [
                        'Unified Material Language',
                        'Minimalist Line Aesthetics',
                        'Concealed Structural Layout',
                        'Palette Customization'
                      ][activePhilosophyIndex]
                    }
                  </h4>
                </div>
              </div>
            </div>

            {/* Right: Rich Typography Statements (Column span: 7) */}
            <div className="lg:col-span-7 space-y-8 flex flex-col justify-center">
              
              <div className="space-y-4">
                <span className="text-brand-gold text-xs font-bold uppercase tracking-widest font-mono block">
                  {language === 'CN' ? '设计亮点 ｜ DESIGN PHILOSOPHY' : 'DESIGN PHILOSOPHY'}
                </span>
                <h2 className="text-3xl md:text-4.5xl font-black text-brand-dark mt-2 tracking-tight">
                  {language === 'CN' ? '形式与功能的完美统一' : 'The Perfect Harmony of Form & Function'}
                </h2>
                <p className="text-gray-500 font-light text-xs md:text-sm leading-relaxed">
                  {language === 'CN'
                    ? 'Crear 系列代表了现代设计的巅峰，将创新空间理念与实用功能完美融合，在每一个细节中平衡美学与实用。我们摒弃传统活动看台冰冷的工业感，以家具级的设计标准打造每一个部件，让看台不再是突兀的设备，而是空间的有机组成部分。'
                    : 'The Crear series represents the pinnacle of modern design, beautifully balancing visual elegance and function. We reject the cold, metallic feel of traditional folding grandstands, applying top cabinet-level standards to construct an organic architectural extension.'}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-brand-dark font-extrabold text-sm uppercase tracking-wider mb-4">
                  {language === 'CN' ? '极致细节追求' : 'Pursuit of Ultimate Details'}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      num: '1',
                      title_cn: '统一材质语言',
                      title_en: 'Unified Material Language',
                      desc_cn: '全系列采用木饰面 + 全软包设计，温润质感融入各类高端空间',
                      desc_en: 'The entire series integrates wood veneer with full upholstery, bringing a warm feel to premium contexts.'
                    },
                    {
                      num: '2',
                      title_cn: '极简线条美学',
                      title_en: 'Minimalist Line Aesthetics',
                      desc_cn: '无多余装饰，以克制的线条勾勒出优雅的空间轮廓',
                      desc_en: 'Zero visual clutter, crafting sleek lines for a pure architectural aesthetic.'
                    },
                    {
                      num: '3',
                      title_cn: '隐藏式结构设计',
                      title_en: 'Concealed Structural Layout',
                      desc_cn: '所有机械结构、布线、连接件全部隐藏，视觉干净整洁',
                      desc_en: 'All engineering gear, cables, and components are fully hidden for absolute visual neatness.'
                    },
                    {
                      num: '4',
                      title_cn: '多配色可选',
                      title_en: 'Multiple Colors Available',
                      desc_cn: '米白、深灰、黑色三大基础色，支持定制专属空间配色',
                      desc_en: 'Off-white, Dark Gray, and Black base palettes, with bespoke color matching solutions.'
                    }
                  ].map((item, idx) => {
                    const isActive = activePhilosophyIndex === idx;
                    return (
                      <div
                        key={idx}
                        className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                          isActive 
                            ? 'bg-brand-gold/5 border-brand-gold/60 text-brand-dark shadow-sm translate-y-[-2px]' 
                            : 'bg-brand-light/40 border-gray-200/50 text-gray-800 hover:bg-brand-light hover:border-gray-200'
                        }`}
                        onClick={() => setActivePhilosophyIndex(idx)}
                        onMouseEnter={() => setActivePhilosophyIndex(idx)}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-[10px] font-mono font-bold w-5 h-5 rounded-md flex items-center justify-center ${
                            isActive ? 'bg-brand-gold text-white shadow-sm' : 'bg-brand-gold/10 text-brand-gold'
                          }`}>
                            0{item.num}
                          </span>
                          <h4 className="text-sm font-bold tracking-tight">
                            {language === 'CN' ? item.title_cn : item.title_en}
                          </h4>
                        </div>
                        <p className={`text-[11px] leading-relaxed font-light ${
                          isActive ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {language === 'CN' ? item.desc_cn : item.desc_en}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>



      {/* ── Section 6: Synchronized Multi-Parameter Configurator Simulator ── */}
      <section className="py-20 bg-brand-light border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Block: Realtime Seat Rendering Image */}
          <div className="space-y-4 w-full">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-gold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
                <span>{language === 'CN' ? '坐席效果图' : 'Seat Rendering'}</span>
              </h3>
            </div>

            <div className="relative aspect-[16/10] w-full rounded-2xl bg-[#090A0B] overflow-hidden group shadow-luxury border border-gray-200/50">
              <img 
                src={getDetailSeatImage()} 
                alt={language === 'CN' ? '坐席效果图' : 'Seat Rendering'} 
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Ambient gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none z-10"></div>

              {/* Spec metadata overlays (Match Configurator layout) */}
              <div className="absolute top-6 left-6 z-20 bg-black/60 backdrop-blur-md rounded-lg py-3 px-4 border border-white/10 text-[10px] text-gray-300 grid grid-cols-2 gap-x-6 gap-y-1.5 font-light max-w-[85%] border-t border-l border-white/20">
                <div>
                  <span className="text-gray-400">{language === 'CN' ? '结构系列：' : 'Framework: '}</span>
                  <span className="text-white font-medium">{detailConfig.style}</span>
                </div>
                <div>
                  <span className="text-gray-400">{language === 'CN' ? '看台等级：' : 'Class: '}</span>
                  <span className="text-white font-medium">
                    {detailConfig.productType === 'retractable' ? (language === 'CN' ? '活动看台' : 'Retractable') : (language === 'CN' ? '固定看台' : 'Public')}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">{language === 'CN' ? '踏步板材：' : 'Pedal Timber: '}</span>
                  <span className="text-white font-medium">
                    {detailConfig.pedals === 'wood' ? (language === 'CN' ? '皇家原木原色' : 'Royal Hardwood') : (language === 'CN' ? '防滑碳纤' : 'Carbon Composite')}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">{language === 'CN' ? '辅助电子器：' : 'Electronics: '}</span>
                  <span className="text-white font-medium font-sans">
                    {language === 'CN' ? '智能加持已配' : 'Smart Active'}
                  </span>
                </div>
              </div>

              {/* Custom visual element overlay e.g. Selected color badge */}
              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-inner" style={{ backgroundColor: mapDetailColorHex() }}></span>
                <span className="text-[10px] text-white/95 font-mono tracking-wider font-light bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                  {detailColorsList.find(c => c.value === detailConfig.color)?.name || detailConfig.color}
                </span>
              </div>

              {/* Scale marker line */}
              <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
                <span className="text-[9px] text-white/70 tracking-widest uppercase font-mono bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10">
                  ALTULA INDUSTRIAL SPEC
                </span>
              </div>
            </div>
          </div>

          {/* Right Block: Fully Functional Compact Parameter Configurator */}
          <div className="bg-white p-7 rounded-3xl shadow-luxury border border-gray-105 flex flex-col justify-between self-stretch space-y-6 w-full">
            <div>
              <span className="text-brand-gold text-[10px] uppercase font-bold tracking-widest font-mono block mb-1">REALTIME DIGITAL PREVIEW</span>
              <h4 className="text-lg font-black text-brand-dark uppercase tracking-wide">{language === 'CN' ? '看台坐席配置方案实时校对' : 'Seating Specification Configurator'}</h4>
              <p className="text-[11px] text-gray-400 mt-1 font-light leading-relaxed">
                {language === 'CN' ? '在线随心选择各项参数，左侧效果图将随选择实时更新进行。' : 'Adjust the exact parameters below; rendering updates dynamically.'}
              </p>
            </div>

            {/* Config Options Form */}
            <div className="space-y-4">
              
              {/* Option 1: Core Class */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">{language === 'CN' ? '核心看台系统架构' : 'STAND SYSTEM ARCHITECTURE'}</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDetailConfig({ ...detailConfig, productType: 'retractable', style: 'Wellgo 维格型' })}
                    className={`py-2 px-3 rounded-lg border text-left transition-all cursor-pointer ${
                      detailConfig.productType === 'retractable'
                        ? 'border-brand-gold bg-brand-gold/5 text-brand-dark font-semibold'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-xs block">{language === 'CN' ? '伸缩活动看台' : 'Retractable Stand'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDetailConfig({ ...detailConfig, productType: 'public', style: 'Orden 方角高定' })}
                    className={`py-2 px-3 rounded-lg border text-left transition-all cursor-pointer ${
                      detailConfig.productType === 'public'
                        ? 'border-brand-gold bg-brand-gold/5 text-brand-dark font-semibold'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-xs block">{language === 'CN' ? '固定看台公共坐席' : 'Permanent Seating'}</span>
                  </button>
                </div>
              </div>

              {/* Option 2: Silhouette Style */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">{language === 'CN' ? '座椅靠背剖面设计' : 'SEATING CONTOUR SILHOUETTE'}</label>
                <div className="grid grid-cols-3 gap-2">
                  {detailStylesList.map((st) => (
                    <button
                      key={st.name}
                      type="button"
                      onClick={() => setDetailConfig({ ...detailConfig, style: st.name })}
                      className={`py-2 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                        detailConfig.style === st.name
                          ? 'border-brand-gold bg-brand-gold/5 text-brand-dark font-semibold'
                          : 'border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-[10px] block truncate">{language === 'CN' ? st.name.split(' ')[0] : st.name_en}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 3: Color swatches */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">{language === 'CN' ? '高质多色精选面料' : 'UPHOLSTERY TEXTURE COLOR'}</label>
                <div className="grid grid-cols-4 gap-2">
                  {detailColorsList.map((col) => (
                    <button
                      key={col.value}
                      type="button"
                      onClick={() => setDetailConfig({ ...detailConfig, color: col.value })}
                      title={col.name}
                      className={`p-1.5 rounded-lg border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        detailConfig.color === col.value
                          ? 'border-brand-gold bg-brand-gold/5'
                          : 'border-gray-100 hover:border-gray-300'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full border border-black/10 shadow-inner block" style={{ backgroundColor: col.hex }}></span>
                      <span className="text-[8px] text-gray-500 font-light truncate max-w-full block">
                        {language === 'CN' ? col.name.substring(0, 2) : col.value}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 4: Pedals */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">{language === 'CN' ? '踏步层层板选用材质' : 'PEDAL AND TIMBER VENEER'}</label>
                <div className="grid grid-cols-2 gap-2">
                  {detailPedalsList.map((pd) => (
                    <button
                      key={pd.value}
                      type="button"
                      onClick={() => setDetailConfig({ ...detailConfig, pedals: pd.value })}
                      className={`py-2 px-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        detailConfig.pedals === pd.value
                          ? 'border-brand-gold bg-brand-gold/5 text-brand-dark font-semibold'
                          : 'border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-[10px] block truncate">{language === 'CN' ? pd.name_cn : pd.name_en}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Primary custom proposal button */}
            <div className="pt-4 border-t border-gray-100 flex gap-4 items-center justify-between">
              <div className="hidden sm:block">
                <span className="text-[8px] text-gray-400 tracking-wider block font-mono">INTEGRATED PLANS</span>
                <span className="text-[10px] text-brand-gold font-bold">{language === 'CN' ? '已对接配置方案规范导出' : 'Ready to export to Spec/PDF'}</span>
              </div>
              <button
                onClick={() => onNavigate('configurator', { productType: detailConfig.productType, style: detailConfig.style, color: detailConfig.color, pedals: detailConfig.pedals })}
                className="btn-gold px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-md min-w-[150px]"
              >
                <Sliders className="w-3.5 h-3.5 text-brand-dark" />
                <span>{language === 'CN' ? '立即进入在线配置方案' : 'Launch Customizer'}</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── Section 7: Technical Specifications table (白色精细两列规格表) ── */}
      <section id="technical-parameters" className="scroll-mt-24 py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="text-left mb-12">
            <span className="text-gray-400 text-xs tracking-widest font-mono block mb-2 font-light">
              {language === 'CN' ? '技术参数' : 'TECHNICAL PARAMETERS'}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight">
              {language === 'CN' ? '技术参数' : 'Technical Specs'}
            </h2>
          </div>

          {/* Specifications Features: Seat Colors & Wood Finishes (座椅颜色 与 木板面饰) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-2 mb-8">
            {/* Seat Colors Component - Display Only */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 tracking-tight">
                {language === 'CN' ? '座椅颜色' : 'Seat Colors'}
              </h3>
              <div className="flex items-center gap-6">
                {/* Beige */}
                <div className="flex flex-col items-center gap-2 cursor-default select-none">
                  <div className="w-9 h-9 rounded-full shadow-sm border border-gray-100" style={{ backgroundColor: '#D2C5B1' }} />
                  <span className="text-xs text-zinc-900 font-medium">
                    {language === 'CN' ? '米色' : 'Beige'}
                  </span>
                </div>

                {/* Gray */}
                <div className="flex flex-col items-center gap-2 cursor-default select-none">
                  <div className="w-9 h-9 rounded-full shadow-sm border border-gray-100" style={{ backgroundColor: '#94A4B1' }} />
                  <span className="text-xs text-zinc-900 font-medium">
                    {language === 'CN' ? '灰色' : 'Gray'}
                  </span>
                </div>

                {/* Red */}
                <div className="flex flex-col items-center gap-2 cursor-default select-none">
                  <div className="w-9 h-9 rounded-full shadow-sm border border-gray-100" style={{ backgroundColor: '#C84630' }} />
                  <span className="text-xs text-zinc-900 font-medium">
                    {language === 'CN' ? '红色' : 'Red'}
                  </span>
                </div>
              </div>
            </div>

            {/* Wood Finishes Component - Display Only */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 tracking-tight">
                {language === 'CN' ? '木板面饰' : 'Timber Finishes'}
              </h3>
              <div className="flex items-center gap-6">
                {/* Natural Wood */}
                <div className="flex flex-col items-center gap-2 cursor-default select-none">
                  <div className="w-9 h-9 rounded-lg shadow-sm border border-gray-100" style={{ backgroundColor: '#D5AC6C' }} />
                  <span className="text-xs text-zinc-900 font-medium">
                    {language === 'CN' ? '原木色' : 'Natural'}
                  </span>
                </div>

                {/* Light Maple */}
                <div className="flex flex-col items-center gap-2 cursor-default select-none">
                  <div className="w-9 h-9 rounded-lg shadow-sm border border-gray-100" style={{ backgroundColor: '#EBE0C4' }} />
                  <span className="text-xs text-zinc-900 font-medium">
                    {language === 'CN' ? '浅枫木' : 'Light Maple'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications Matrix */}
          <div className="border-t border-gray-200/80">
            {[
              {
                left: {
                  labelCN: "产品型号",
                  labelEN: "Product Model",
                  valueCN: "FLEX 1000",
                  valueEN: "FLEX 1000"
                },
                right: {
                  labelCN: "标准容量",
                  labelEN: "Standard Capacity",
                  valueCN: "1,000 座",
                  valueEN: "1,000 Seats"
                }
              },
              {
                left: {
                  labelCN: "展开时间",
                  labelEN: "Deployment Time",
                  valueCN: "≤ 60 秒",
                  valueEN: "≤ 60 s"
                },
                right: {
                  labelCN: "收合时间",
                  labelEN: "Retraction Time",
                  valueCN: "≤ 60 秒",
                  valueEN: "≤ 60 s"
                }
              },
              {
                left: {
                  labelCN: "驱动方式",
                  labelEN: "Drive Mode",
                  valueCN: "电动液压",
                  valueEN: "Electro-hydraulic"
                },
                right: {
                  labelCN: "电源要求",
                  labelEN: "Power Requirements",
                  valueCN: "380V / 50Hz",
                  valueEN: "380V / 50Hz"
                }
              },
              {
                left: {
                  labelCN: "运行噪音",
                  labelEN: "Operating Noise",
                  valueCN: "≤ 65 dB",
                  valueEN: "≤ 65 dB"
                },
                right: {
                  labelCN: "座椅宽度",
                  labelEN: "Seat Width",
                  valueCN: "450 mm",
                  valueEN: "450 mm"
                }
              },
              {
                left: {
                  labelCN: "排间距",
                  labelEN: "Row Spacing",
                  valueCN: "800 mm",
                  valueEN: "800 mm"
                },
                right: {
                  labelCN: "结构材质",
                  labelEN: "Structural Material",
                  valueCN: "高强度热镀锌钢",
                  valueEN: "High-Strength Galvanized Steel"
                }
              },
              {
                left: {
                  labelCN: "座椅材质",
                  labelEN: "Seat Material",
                  valueCN: "注塑聚丙烯",
                  valueEN: "Injection Molded Polypropylene"
                },
                right: {
                  labelCN: "安全认证",
                  labelEN: "Safety Certification",
                  valueCN: "ISO 9001 / CE",
                  valueEN: "ISO 9001 / CE"
                }
              },
              {
                left: {
                  labelCN: "质保年限",
                  labelEN: "Warranty Period",
                  valueCN: "10 年",
                  valueEN: "10 Years"
                },
                right: {
                  labelCN: "安装周期",
                  labelEN: "Installation Period",
                  valueCN: "约 20 个工作日",
                  valueEN: "Approx. 20 Working Days"
                }
              }
            ].map((row, idx) => (
              <div 
                key={idx} 
                className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-24 py-5 md:py-6 border-b border-gray-200 items-center"
              >
                {/* Left Parameter item */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium text-xs md:text-sm">
                    {language === 'CN' ? row.left.labelCN : row.left.labelEN}
                  </span>
                  <span className="text-brand-dark font-black text-xs md:text-sm tracking-tight font-sans">
                    {language === 'CN' ? row.left.valueCN : row.left.valueEN}
                  </span>
                </div>

                {/* Right Parameter item */}
                <div className="flex justify-between items-center md:pl-8">
                  <span className="text-gray-500 font-medium text-xs md:text-sm">
                    {language === 'CN' ? row.right.labelCN : row.right.labelEN}
                  </span>
                  <span className="text-brand-dark font-black text-xs md:text-sm tracking-tight font-sans">
                    {language === 'CN' ? row.right.valueCN : row.right.valueEN}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>



      {/* Lightbox Portal Modal */}
      {activeGalleryIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/98 backdrop-blur-md flex flex-col justify-between p-6 animate-fade-in"
          onClick={() => setActiveGalleryIndex(null)}
        >
          <div className="flex justify-between items-center w-full relative z-10" onClick={(e) => e.stopPropagation()}>
            <div className="text-left">
              <span className="text-brand-gold text-[10px] font-mono tracking-widest block">ALTULA ART PROMPT GALLERY</span>
              <span className="text-white text-xs font-bold">
                {activeGalleryIndex + 1} / {galleryImages.length}
              </span>
            </div>
            <button
              onClick={() => setActiveGalleryIndex(null)}
              className="text-white hover:text-brand-gold bg-white/10 px-4 py-2 rounded-full cursor-pointer transition-colors text-xs font-bold uppercase tracking-widest font-mono"
            >
              ✕ CLOSE
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center p-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveGalleryIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryImages.length - 1));
              }}
              className="absolute left-4 bg-white/10 hover:bg-white/20 border border-white/5 text-white w-14 h-14 rounded-full flex items-center justify-center font-mono text-xl transition-all cursor-pointer z-20"
            >
              ◀
            </button>

            <div 
              className="max-w-4xl max-h-[70vh] rounded-xl overflow-hidden shadow-2xl border border-white/10 select-none cursor-default z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[activeGalleryIndex].url}
                alt={galleryImages[activeGalleryIndex].title_cn}
                className="w-full h-full object-contain max-h-[70vh]"
                referrerPolicy="no-referrer"
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveGalleryIndex((prev) => (prev !== null && prev < galleryImages.length - 1 ? prev + 1 : 0));
              }}
              className="absolute right-4 bg-white/10 hover:bg-white/20 border border-white/5 text-white w-14 h-14 rounded-full flex items-center justify-center font-mono text-xl transition-all cursor-pointer z-20"
            >
              ▶
            </button>
          </div>

          <div className="text-center w-full relative z-10 pb-4" onClick={(e) => e.stopPropagation()}>
            <h4 className="text-brand-gold text-lg font-black tracking-wide">
              {language === 'CN' ? galleryImages[activeGalleryIndex].title_cn : galleryImages[activeGalleryIndex].title_en}
            </h4>
            <p className="text-gray-400 text-xs font-light mt-1">
              {language === 'CN' ? 'ALTULA 尊奢现场精密装配检测细节' : 'Pristine structural alignments of ALTULA'}
            </p>
          </div>
        </div>
      )}

      {/* Related Cases Section */}
      {relatedCases.length > 0 && (
        <section id="project-cases" className="scroll-mt-24 py-20 bg-brand-light border-t border-b border-gray-200/40">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="text-brand-gold text-xs font-bold uppercase tracking-widest block mb-1">
                  {language === 'CN' ? '名家空间落地印记' : 'REAL WORLD ARCHITECTURE'}
                </span>
                <h3 className="text-2xl md:text-3.5xl font-black text-brand-dark">
                  {language === 'CN' ? '同系列奢享落地案例鉴赏' : 'Bespoke Practical Placements'}
                </h3>
              </div>
              <button
                onClick={() => onNavigate('cases')}
                className="text-xs font-bold text-[#BFA15F] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{language === 'CN' ? '查看全部案例' : 'Explore All Cases'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedCases.slice(0, 2).map((cs) => (
                <div
                  key={cs.id}
                  onClick={() => onNavigate('case-detail', { id: cs.id })}
                  className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-luxury hover:shadow-2xl transition-all duration-300"
                >
                  <div className="h-56 relative overflow-hidden bg-gray-100">
                    <img 
                      src={cs.image} 
                      alt={cs.title} 
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/15"></div>
                    <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md text-[10px] text-brand-dark px-3 py-1.5 rounded-full font-extrabold shadow-sm">
                      {cs.location}
                    </span>
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] text-brand-gold font-bold uppercase font-mono tracking-widest block mb-1">
                      {cs.tag}
                    </span>
                    <h4 className="font-extrabold text-brand-dark text-base group-hover:text-[#BFA15F] transition-colors mb-2">
                      {cs.title}
                    </h4>
                    <p className="text-gray-400 font-light text-xs line-clamp-2 leading-relaxed">
                      {cs.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ── Section 9: VIP Consultation Form & Slogan CTA ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-20">
        <div id="consulting-form" className="bg-brand-dark rounded-3xl p-8 md:p-14 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-700/10 via-transparent to-transparent opacity-55 z-0"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-brand-gold uppercase tracking-[0.2em] text-xs font-mono font-bold block">
                {language === 'CN' ? 'Bespoke Customization · 专属定制' : 'PRECISE ARCHITECTURAL COLLABORATION'}
              </span>
              <h3 className="text-3xl md:text-5.5xl font-black tracking-tight leading-snug">
                {language === 'CN' ? (
                  <>完美平衡<br />美学与功能</>
                ) : (
                  <>Synthesizing<br />Form & Function</>
                )}
              </h3>
              <p className="text-gray-300 font-light text-xs md:text-sm leading-relaxed">
                {language === 'CN'
                  ? '提交初步规划手机号后，领先技术方案中心高级工程师将在12小时内介入调试，为您绘制非标基础荷力承受和配置空间排布图样，全流程免费，助力方案落地。'
                  : 'Submit estimated capacity coordinates. Our technical desk will map custom load-bearing parameters, structure outlines, and furnish certified leather/wood swatches to your offices free of cost.'}
              </p>

              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-mono font-bold text-brand-gold shrink-0">
                  7x24
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-200">{language === 'CN' ? '专家配重直线' : 'Pre-Sales Technical Hotline'}</h5>
                  <p className="text-[11px] text-gray-400 font-light font-mono">185 8894 5064 / 400 618 1848</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl text-brand-dark shadow-2xl">
              {messageSubmitted ? (
                <div className="p-8 text-center animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100 animate-bounce">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-brand-dark">{language === 'CN' ? '专属方案申请成功' : 'Inquiry Lodged Successfully'}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
                    {language === 'CN'
                      ? '极简方案已被推流至领先设计院组。我们将以1对1方式派发对应的基础配合大图及精确样品物料箱。感谢信任。'
                      : 'Our project desk is on high alert. We registered your parameters and will mail matching physical wood/leather materials boards shortly.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendQuoteRequest} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1.5">
                        {language === 'CN' ? '项目代表尊称 *' : 'REPRESENTATIVE NAME *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={language === 'CN' ? '请输入您的尊称' : 'e.g. Architect Lee'}
                        value={quoteName}
                        onChange={(e) => setQuoteName(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-xs font-medium focus:outline-none focus:border-brand-gold focus:bg-white text-brand-dark"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1.5">
                        {language === 'CN' ? '接收纸质联络手机 *' : 'CONTACT PHONE *'}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="1xx xxxx xxxx"
                        value={quotePhone}
                        onChange={(e) => setQuotePhone(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-xs font-medium focus:outline-none focus:border-brand-gold focus:bg-white text-brand-dark"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold text-gray-400 uppercase mb-1.5">
                      {language === 'CN' ? '拟建大致容积座位数' : 'EXPECTED SEATING CAPACITY *'}
                    </label>
                    <select
                      value={quoteProjectSize}
                      onChange={(e) => setQuoteProjectSize(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-xs font-bold text-brand-dark focus:outline-none focus:border-brand-gold focus:bg-white cursor-pointer"
                    >
                      <option value="10-100">{language === 'CN' ? '少于 100 坐席（小而精研学论坛）' : 'Less than 100 Seats (Elite Forum Lobby)'}</option>
                      <option value="100-300">100 - 300 {language === 'CN' ? '座席（高规多功会场）' : 'Seats (High-End Conference Lounge)'}</option>
                      <option value="300-600">300 - 600 {language === 'CN' ? '座席（中大型多功能学术发布）' : 'Seats (Academic Theatre)'}</option>
                      <option value="600+">{language === 'CN' ? '600 座椅以上超大型体育公建' : 'Over 600 Seats (Major Sports Stadium)'}</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-dark hover:bg-black text-white text-xs font-black py-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md mt-6"
                  >
                    <span>{language === 'CN' ? '免费获取配置方案与专属估算书' : 'Request Free Seating Configuration Package'}</span>
                    <Send className="w-3.5 h-3.5 text-brand-gold" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
