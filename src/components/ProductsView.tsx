import React, { useState } from 'react';
import { Filter, ArrowRight, Settings, CheckCircle, ChevronRight, Layers } from 'lucide-react';
import { productsData } from '../data';
import { Product } from '../types';

interface ProductsViewProps {
  onNavigate: (page: string, params?: any) => void;
  language: 'CN' | 'EN';
}

export default function ProductsView({ onNavigate, language }: ProductsViewProps) {
  // Filters state (simplified to keep only first-level primary classification)
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'retractable' | 'public'>('all');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Richer product items loaded with specifications, descriptive texts, tags and color swatches
  const productsList = [
    {
      id: 'wellgo',
      parentId: 'retractable',
      name: '维格 Wellgo 伸缩看台',
      tag: '维格 Wellgo',
      category: 'retractable',
      seatStyle: 'wellgo',
      moveMode: 'manual',
      width: '4m',
      image: 'https://img-reg-ab.imagency.cn/e/02bbb6f33a36a708c3eb24284967254a.jpg',
      subtitleCN: '伸缩活动看台 · 维格 Wellgo 系列',
      subtitleEN: 'Retractable Grandstand · Wellgo Series',
      descCN: '采用特有的维格（Wellgo）高回弹模块化座椅，结合自平衡折叠骨架与高效隐藏收折，专为中等学术研讨厅及多功能会议层设计。',
      descEN: 'Features signature Wellgo high-resilience modular seating combined with self-balancing framework. Ideal for academic seminars and versatile meeting layers.',
      specsCN: [
        { label: '座椅设计', value: '维格 Wellgo 极简人体工学椅面' },
        { label: '动力方式', value: '自平衡高阻尼精密手动/智能驱合' },
        { label: '标准跨度', value: '组宽 4米 - 6米 / 跨度无缝拼接' },
        { label: '安全载荷', value: '单向支撑承重安全系数 ≥ 500 kg/㎡' }
      ],
      specsEN: [
        { label: 'Seat Design', value: 'Wellgo Ergonomic Seat Profile' },
        { label: 'Drive Tech', value: 'Self-Balancing Damped Fold' },
        { label: 'Standard Span', value: 'Span 4m - 6m / Seamless Connection' },
        { label: 'Safety Index', value: 'Load Capacity ≥ 500 kg/㎡' }
      ],
      tagsCN: ['维格座椅', '自平衡折叠', '高效阻燃'],
      tagsEN: ['Wellgo Seating', 'Self-Balancing', 'Flame-Retardant'],
      colors: ['#7B92A2', '#86B5BD', '#CE3326']
    },
    {
      id: 'concepto',
      parentId: 'retractable',
      name: 'concepto 伸缩看台',
      tag: 'concepto',
      category: 'retractable',
      seatStyle: 'concepto',
      moveMode: 'electric',
      width: '6m',
      image: 'https://img-reg-ab.imagency.cn/e/dc5395da5efbb8d2d7798f4005768381.jpg',
      subtitleCN: '伸缩活动看台 · concepto 系列',
      subtitleEN: 'Retractable Grandstand · concepto Series',
      descCN: '配备圆弧美学 concepto 奢臻全软包座椅，搭载智能变频同步防偏斜电机驱动。大度纵深，一键智能展收，为高端多功能馆、报告厅提供旗舰体验。',
      descEN: 'Equipped with curvy concepto premium fabric seating, powered by synchronized active anti-deflection induction motors. Effortless full automation.',
      specsCN: [
        { label: '座椅设计', value: 'concepto 弧形奢润圆润软包' },
        { label: '动力方式', value: '全电动智能变频分段同步控制' },
        { label: '安全防护', value: '3D激光雷达主动物联防撞系统' },
        { label: '空间成效', value: '收合后极薄，地坪释放效率达95%' }
      ],
      specsEN: [
        { label: 'Seat Design', value: 'concepto Luxurious Curvy Chair' },
        { label: 'Drive Tech', value: 'Fully Automated Synchronous Motors' },
        { label: 'Safety Tech', value: '3D LiDAR Active Protection System' },
        { label: 'Efficiency', value: 'Ultra Slim Profile, 95% Reclaimed' }
      ],
      tagsCN: ['圆润软包', '同步智能驱合', '变频自纠偏'],
      tagsEN: ['concepto Curvy', 'Smart Motorized', 'Variable Frequency'],
      colors: ['#121315', '#97A9B7', '#2573B7']
    },
    {
      id: 'orden',
      parentId: 'retractable',
      name: 'orden 伸缩看台',
      tag: 'orden',
      category: 'retractable',
      seatStyle: 'orden',
      moveMode: 'manual',
      width: 'custom',
      image: 'https://img-reg-ab.imagency.cn/e/8a48cfe1be17841fb3bf8ec91e4e12a2.webp',
      subtitleCN: '伸缩活动看台 · orden 系列',
      subtitleEN: 'Retractable Grandstand · orden Series',
      descCN: '高定德制 orden 方形立体阻尼折叠座椅，契合慢阻重力自锁回弹技术。木椅面与天然硬质饰面温润高雅，完美融入严谨庄重的政企接待空间。',
      descEN: 'Features orden geometric slow-rebound self-locking seating in exquisite multi-layer timber finish. Delivers an elegant and highly formal academic atmosphere.',
      specsCN: [
        { label: '座椅设计', value: 'orden 方形折线美学皮革软包' },
        { label: '阻尼回弹', value: '重力自锁慢回机构 (噪音≤35分贝)' },
        { label: '饰面材质', value: 'E0级原生态德系环保实木饰面' },
        { label: '声学效果', value: '自带微腔共鸣吸音面板控制混响' }
      ],
      specsEN: [
        { label: 'Seat Design', value: 'orden Geometric Leather Panel' },
        { label: 'Rebound Tech', value: 'Gravity Self-Lock (≤35 Decibels)' },
        { label: 'Wood Craft', value: 'Eco-Friendly E0 Grade Timber Trim' },
        { label: 'Acoustics', value: 'Self-Acoustic Resonating Panel' }
      ],
      tagsCN: ['德系高定', '慢阻静音', '环保实木面'],
      tagsEN: ['German Premium', 'Quiet Rebound', 'Eco Wood Base'],
      colors: ['#999999', '#DCDCD9', '#3D4146']
    },
    {
      id: 'hausheng-front',
      parentId: 'retractable',
      name: '豪晟前置 伸缩看台',
      tag: '豪晟前置',
      category: 'retractable',
      seatStyle: 'hausheng-front',
      moveMode: 'electric',
      width: 'custom',
      image: 'https://img-reg-ab.imagency.cn/e/f77ee005ec194f8323d0bbaa4d26852d.webp',
      subtitleCN: '伸缩活动看台 · 豪晟前置系列',
      subtitleEN: 'Retractable Grandstand · Hausem Front-Mounted',
      descCN: '采用豪晟特制的前置折叠传动机构，确保坐席回收时前部面层完美贴附壁龛，收纳厚度更薄，极致释放多功能大厅活动空间。',
      descEN: 'Equipped with bespoke front-folding active retraction mechanism, achieving absolute flush niche storage with minimum collapsed volume.',
      specsCN: [
        { label: '折叠方式', value: '前置前折传动/平整阴角收纳' },
        { label: '动力方式', value: '变频弱电中央驱控（多端联动)' },
        { label: '标准步高', value: '自适应高度 280mm - 340mm 精调' },
        { label: '踏面铺装', value: '防滑减震航空复合隔层防偏斜' }
      ],
      specsEN: [
        { label: 'Folding Method', value: 'Front-Flush Active Folding' },
        { label: 'Drive System', value: 'Low-Voltage Smart Motor Control' },
        { label: 'Step Height', value: 'Self-Adaptive 280mm - 340mm' },
        { label: 'Pedal Build', value: 'Anti-slip Damped Aerospace Sheets' }
      ],
      tagsCN: ['前置折细', '平滑省电', '嵌入式安装'],
      tagsEN: ['Front-Mounted', 'Smooth & Efficient', 'Recessed Slot'],
      colors: ['#B5A642', '#3B3C36', '#FAF0E6']
    },
    {
      id: 'hausheng-rear',
      parentId: 'retractable',
      name: '豪晟后置 伸缩看台',
      tag: '豪晟后置',
      category: 'retractable',
      seatStyle: 'hausheng-rear',
      moveMode: 'electric',
      width: 'custom',
      image: 'https://img-reg-ab.imagency.cn/e/faba224b11cbeb566081df8eff866c4d.jpg',
      subtitleCN: '伸缩活动看台 · 豪晟后置系列',
      subtitleEN: 'Retractable Grandstand · Hausem Rear-Mounted',
      descCN: '经典的后置传动牵引，配合双向同步轨道控制，特别适用于加高加大排数的重载看台，提供极致的安全感与超长耐用寿命。',
      descEN: 'Classic rear-mounted heavy-duty drive configuration with dual-direction linear guides, recommended for grand halls demanding massive rows and extreme structural load.',
      specsCN: [
        { label: '折叠方式', value: '后置后折折合重载支撑' },
        { label: '动力方式', value: '工业级双轨重载同步电磁电机' },
        { label: '安全指标', value: '站立冲击承载负荷 ≥ 600 kg/㎡' },
        { label: '防晃系统', value: '悬臂防侧摆双重咬合精密钢爪' }
      ],
      specsEN: [
        { label: 'Folding Method', value: 'Rear-Mounted Heavy-Duty Flip' },
        { label: 'Drive Tech', value: 'Industrial Dual-Trac Electromagnetic' },
        { label: 'Safety standard', value: 'Dynamic Loading Limit ≥ 600 kg/㎡' },
        { label: 'Anti-sway', value: 'Dual Symmetrical Side Locking Scaffolds' }
      ],
      tagsCN: ['后排重载', '双向轨道防晃', '航天级承托'],
      tagsEN: ['Rear Heavy-duty', 'Dual-Trac Anti-Sway', 'Heavy Load Steel'],
      colors: ['#4E5D6C', '#D0C1AC', '#1A1D20']
    },
    {
      id: 'public-a',
      parentId: 'public',
      name: '公共坐席 A系列',
      tag: 'A',
      category: 'public',
      seatStyle: 'series-a',
      moveMode: 'manual',
      width: 'custom',
      image: 'https://img-reg-ab.imagency.cn/e/736c313958ba791f34e22b7b1dd62240.webp',
      subtitleCN: '公共座席看台系列 · A系列国雅红',
      subtitleEN: 'Public Seating System · A-Series',
      descCN: 'A系列公共看台，采用模块化高强度固定台级排布。精选奢华吸音阻燃面料软包，搭配慢阻重力自锁，专为大中型剧场会议会馆提供典雅庄重承载。',
      descEN: 'A-Series seating features high-strength modular fixed tier alignment. Upholstered in acoustic retardant materials with slow gravitational self-locks, tailored for convention centers.',
      specsCN: [
        { label: '坐席设计', value: 'A系列尊贵羊毛织物全包吸音' },
        { label: '翻转机构', value: '重力式慢回弹阻尼系统 (≤35分贝)' },
        { label: '背部写字板', value: '重力支撑式隐形写字板/承重30kg' },
        { label: '拼装缝隙', value: '德式精工拼装精度缝隙低于 0.5mm' }
      ],
      specsEN: [
        { label: 'Seat Premium', value: 'A-Series Wool Fabric Panel Acoustic' },
        { label: 'Rebound Tech', value: 'Gravity Slow Damping System (≤35dB)' },
        { label: 'Writing Pad', value: 'Built-in Retraction Heavy-load (Max 30kg)' },
        { label: 'Precision Fit', value: 'German Splicing Seamless Fit < 0.5mm' }
      ],
      tagsCN: ['奢臻面料', '低阻慢回', '高精贴缝'],
      tagsEN: ['Premium Wool', 'Quiet Fold', 'Seamless Fit'],
      colors: ['#CE3326', '#E9B136', '#3D4146']
    },
    {
      id: 'public-b',
      parentId: 'public',
      name: '公共坐席 B系列',
      tag: 'B',
      category: 'public',
      seatStyle: 'series-b',
      moveMode: 'manual',
      width: 'custom',
      image: 'https://img-reg-ab.imagency.cn/e/af3a1511b2e4bc9f5f948cb183cd34cc.webp',
      subtitleCN: '公共座席看台系列 · B系列素岩灰',
      subtitleEN: 'Public Seating System · B-Series',
      descCN: 'B系列公共看台，强调轻量化高硬度碳钢骨架，环保多层板实木贴油，在保证美观大方的同时抗霉变易擦拭，兼顾极高实用性与温润木质感。',
      descEN: 'B-Series highlights lightweight high-rigidity carbon steel frames and FSC certified multi-layer wood finish, ensuring outstanding durability and pure warmth.',
      specsCN: [
        { label: '饰面贴皮', value: 'FSC 认证生态枫木/多层板防刮擦' },
        { label: '座底支撑', value: '4mm 加厚防锈高屈服航空碳素钢' },
        { label: '环保指数', value: '零醛释放，全面符合 E0 等级环保标准' },
        { label: '吸能系数', value: 'NRC ≥ 0.65 中低频多孔声学降噪' }
      ],
      specsEN: [
        { label: 'Wood Veneer', value: 'FSC Certified Maple Multi-layer Sheet' },
        { label: 'Seat Support', value: '4mm Lightweight Rustproof Aerospace Carbon' },
        { label: 'Green Index', value: 'Zero Emission Complies E0 Safety Grade' },
        { label: 'Acoustic Index', value: 'NRC ≥ 0.65 Broadband Acoustic Tuning' }
      ],
      tagsCN: ['生态多层木', '航空防锈钢', '零级环保'],
      tagsEN: ['FSC Wood', 'Aircraft Grade Steel', 'E0 Certified'],
      colors: ['#86B5BD', '#97A9B7', '#111214']
    },
    {
      id: 'public-c',
      parentId: 'public',
      name: '公共坐席 C系列',
      tag: 'C',
      category: 'public',
      seatStyle: 'series-c',
      moveMode: 'manual',
      width: 'custom',
      image: 'https://img-reg-ab.imagency.cn/e/dc5395da5efbb8d2d7798f4005768381.jpg',
      subtitleCN: '公共座席看台系列 · C系列雅黑质臻',
      subtitleEN: 'Public Seating System · C-Series',
      descCN: 'C系列公共看台，为顶奢行政会场、国际化论坛等重要涉外场所量身定做。每座可选配隐形线管通道并内置安全隔离强弱电面板。',
      descEN: 'C-Series is custom-designed for premium state conferences and international summits, featuring hidden integrated electrical outlets & isolation zones under each armrest.',
      specsCN: [
        { label: '内置布线', value: '底座骨架集成有线+弱电插座强网隔离' },
        { label: '坐垫工艺', value: '70kg/m³ 超高密度微孔慢发泡高弹海绵' },
        { label: '面层处理', value: '特氟龙防水防污易清洁易打理涂层' },
        { label: '安全护栏', value: '超稳德制固定坚韧夹胶钢化防跌玻璃' }
      ],
      specsEN: [
        { label: 'Electrics Clad', value: 'Concealed Conduit with Isolated Sockets' },
        { label: 'Foam Cushion', value: '70kg/m³ Extreme High Density Memory Foam' },
        { label: 'Fiber Finish', value: 'Teflon Soil-repellent Easy-clean Shield' },
        { label: 'Side guard', value: 'Ultra-rigid German Tempered Laminated Glass' }
      ],
      tagsCN: ['强弱电一体', '特调高回弹', '特氟龙防污皮'],
      tagsEN: ['Integrated Power', 'Memory Foam', 'Teflon Coating'],
      colors: ['#1C1D21', '#CE3326', '#EBE7E0']
    }
  ];

  // Simplified filter logic
  const filteredProducts = productsList.filter((prod) => {
    if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const handleResetFilters = () => {
    setSelectedCategory('all');
  };

  return (
    <div className="pt-28 pb-12 bg-brand-light min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Title Header */}
        <div className="border-b border-gray-200 pb-10 mb-12">
          <span className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
            {language === 'CN' ? '双核全品类中心' : 'PRODUCT CENTER EXHIBIT'}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tight mb-4">
            {language === 'CN' ? '产品中心' : 'Bespoke Stands & Seating'}
          </h1>
          <p className="text-gray-500 font-light text-base md:text-lg max-w-3xl leading-relaxed">
            {language === 'CN'
              ? '以极简主义声美设计与德系高载荷传动，融通建筑结构，让有限空间拥有无界周转、多层承托的流动实力。'
              : 'Precision architectural seating and event stand solutions designed for executive corporate premises.'}
          </p>
        </div>

        {/* Layout: Filters Sidebar Left (sticky/clean design columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Filters: Left Sidebar Column (Focused - Selection simplified as requested) */}
          <div className="hidden lg:block bg-white p-7 rounded-[2rem] border border-stone-200/40 shadow-luxury self-start sticky top-28">
            <div className="pb-5 border-b border-stone-100 mb-6">
              <h3 className="font-bold text-brand-dark flex items-center gap-2 text-sm tracking-tight">
                <Filter className="w-4 h-4 text-brand-gold" />
                {language === 'CN' ? '产品分类' : 'Product Category'}
              </h3>
            </div>

            {/* Simple Primary Category selection */}
            <div>
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`text-left text-xs py-3 px-4 rounded-xl transition-all cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-brand-dark text-white font-bold shadow-md'
                      : 'text-stone-500 hover:bg-stone-50 hover:text-brand-dark font-medium'
                  }`}
                >
                  {language === 'CN' ? '全部看台坐席' : 'All Assemblies'}
                </button>
                <button
                  onClick={() => setSelectedCategory('retractable')}
                  className={`text-left text-xs py-3 px-4 rounded-xl transition-all cursor-pointer ${
                    selectedCategory === 'retractable'
                      ? 'bg-brand-dark text-white font-bold shadow-md'
                      : 'text-stone-500 hover:bg-stone-50 hover:text-brand-dark font-medium'
                  }`}
                >
                  {language === 'CN' ? '伸缩活动看台系列' : 'Retractable Grandstands'}
                </button>
                <button
                  onClick={() => setSelectedCategory('public')}
                  className={`text-left text-xs py-3 px-4 rounded-xl transition-all cursor-pointer ${
                    selectedCategory === 'public'
                      ? 'bg-brand-dark text-white font-bold shadow-md'
                      : 'text-stone-500 hover:bg-stone-50 hover:text-brand-dark font-medium'
                  }`}
                >
                  {language === 'CN' ? '公共坐席卡台系列' : 'Public Seating Systems'}
                </button>
              </div>
            </div>
          </div>

          {/* Products: Dashboard flow details (Right Column) */}
          <div className="lg:col-span-3">
            {/* Mobile filters button */}
            <div className="lg:hidden flex justify-between items-center bg-white p-5 rounded-2xl border border-stone-100 mb-8 shadow-sm">
              <span className="font-bold text-sm text-brand-dark flex items-center gap-2">
                <Filter className="w-4 h-4 text-brand-gold" />
                {language === 'CN' ? '空间分类筛选' : 'Categories'}
              </span>
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="text-xs border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none"
              >
                {mobileFilterOpen ? (language === 'CN' ? '关闭' : 'Close') : (language === 'CN' ? '展开' : 'Expand')}
              </button>
            </div>

            {/* Mobile Expanded Filters Card */}
            {mobileFilterOpen && (
              <div className="lg:hidden bg-white p-6 rounded-2xl border border-stone-150 mb-8 shadow-lg flex flex-col gap-5">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 mb-2.5 uppercase">一级产品分类</h4>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'retractable', 'public'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat as any)}
                        className={`text-xs px-3.5 py-2 rounded-full transition-all ${
                          selectedCategory === cat
                            ? 'bg-brand-dark text-white font-semibold'
                            : 'bg-stone-100 text-stone-500'
                        }`}
                      >
                        {cat === 'all'
                          ? (language === 'CN' ? '全部' : 'All')
                          : cat === 'retractable'
                          ? (language === 'CN' ? '伸缩看台' : 'Retractable')
                          : (language === 'CN' ? '公共坐席' : 'Public')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-stone-100">
                  <button onClick={handleResetFilters} className="text-xs text-brand-gold font-medium">
                    重置筛选
                  </button>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="bg-brand-dark text-white text-xs font-semibold px-4 py-2 rounded-lg"
                  >
                    确认
                  </button>
                </div>
              </div>
            )}

            {/* Filtered Products Count Grid */}
            <div className="flex justify-between items-center mb-8">
              <span className="text-stone-400 font-normal tracking-wide text-xs font-mono uppercase">
                {language === 'CN'
                  ? `共筛选出 ${filteredProducts.length} 款符合定制标准的产品系统`
                  : `Found ${filteredProducts.length} premium systems matching definition`}
              </span>
            </div>

            {/* Error state */}
            {filteredProducts.length === 0 && (
              <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-luxury">
                <Settings className="w-12 h-12 text-gray-300 mx-auto mb-4 animate-spin-slow" />
                <h4 className="text-brand-dark font-bold text-lg mb-2">
                  {language === 'CN' ? '该分类下无匹配系统' : 'No Assemblies Match'}
                </h4>
                <p className="text-gray-400 text-sm max-w-sm mx-auto mb-6">
                  {language === 'CN'
                    ? '没有匹配到该种特定款式的成品预设。您可以直接进入 1v1 极简选配，由我们首席设计师为您核测建筑空间图纸进行定做。'
                    : 'Try resets.'}
                </p>
                <button
                  onClick={handleResetFilters}
                  className="text-white bg-brand-gold text-xs font-semibold px-6 py-3 rounded-full hover:scale-105 transition-transform cursor-pointer"
                >
                  {language === 'CN' ? '重置全部条件' : 'Reset Filters'}
                </button>
              </div>
            )}

            {/* Product items loop with vertical top-image, bottom-info grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {filteredProducts.map((prod) => {
                return (
                  <div 
                    key={prod.id} 
                    id={`product-item-${prod.id}`}
                    className="bg-white rounded-[2rem] border border-stone-200/30 p-5 md:p-6 shadow-luxury hover:shadow-hover transition-all duration-500 group flex flex-col justify-between hover:-translate-y-1.5"
                  >
                    <div>
                      {/* Top Interactive Image Container (Image on Top) */}
                      <div 
                        onClick={() => onNavigate('product-detail', { id: prod.parentId })}
                        className="w-full aspect-[16/10] relative rounded-[1.5rem] overflow-hidden bg-stone-100 cursor-pointer mb-5 shrink-0"
                      >
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />

                      </div>

                      {/* Info and Specifications Container (Information on Bottom) */}
                      <div className="px-1">
                        {/* Upper series tier headers */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold font-mono">
                            {prod.tag}
                          </span>
                          <span className="h-1 w-1 rounded-full bg-stone-300"></span>
                          <span className="text-[10px] font-mono font-medium text-stone-400">
                            {prod.category === 'retractable' ? (language === 'CN' ? '双核智能伸缩' : 'Retractable Core-Stands') : (language === 'CN' ? '多层公共固定' : 'Public Fixed Seating')}
                          </span>
                        </div>

                        {/* Title & Detail click action */}
                        <h3 
                          onClick={() => onNavigate('product-detail', { id: prod.parentId })}
                          className="text-lg md:text-xl font-black text-brand-dark tracking-tight mb-1 group-hover:text-brand-gold transition-colors duration-300 flex items-center justify-between cursor-pointer"
                        >
                          <span className="truncate">{prod.name}</span>
                          <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-brand-gold group-hover:translate-x-1.5 transition-all duration-300 shrink-0" />
                        </h3>

                        {/* Rich system description */}
                        <p className="text-stone-500 font-light text-xs leading-relaxed mb-4 line-clamp-2">
                          {language === 'CN' ? prod.descCN : prod.descEN}
                        </p>

                        {/* Simplified borderless highlights */}
                        <div className="mb-5 mt-4 border-t border-stone-100 pt-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
                            {(language === 'CN' ? prod.specsCN : prod.specsEN).map((spec, sidx) => (
                              <div key={sidx} className="flex items-start gap-1.5 text-xs text-stone-500">
                                <span className="text-brand-gold font-bold mt-0.5">•</span>
                                <span className="font-normal text-stone-600">
                                  <strong className="text-brand-dark/95 font-semibold">{spec.label}：</strong>
                                  {spec.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom action trigger bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-stone-100 px-1 mt-2">
                      {/* Custom materials colors list */}
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono tracking-wider text-stone-400 uppercase">
                          {language === 'CN' ? '配色' : 'Colors'}
                        </span>
                        <div className="flex gap-1">
                          {prod.colors.map((hex, cIdx) => (
                            <span 
                              key={cIdx} 
                              style={{ backgroundColor: hex }} 
                              className="w-3.5 h-3.5 rounded-full border border-stone-200/50 shadow-sm block"
                              title={hex}
                            />
                          ))}
                          <span 
                            className="w-3.5 h-3.5 rounded-full bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-amber-100 via-stone-200 to-indigo-100 border border-stone-200 shadow-sm block" 
                            title="More finishes" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA banner below */}
        <div className="mt-28 bg-brand-dark rounded-3xl overflow-hidden relative p-12 md:p-16 text-center text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-700/20 via-transparent to-transparent opacity-50 z-0"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-4xl font-extrabold mb-4 tracking-tight">
              {language === 'CN' ? '定制最适配的公共与商用看台' : 'Generate Digital Layout Specification'}
            </h3>
            <p className="text-gray-300 font-light text-sm md:text-base mb-8 max-w-lg mx-auto leading-relaxed">
              {language === 'CN'
                ? '支持输入建筑立面长宽高尺寸，由微阻变频算法为您测算出精确座位排比以及安全行径路径。'
                : 'Select fabrics, timbers and power layouts in real-time.'}
            </p>
            <button
              onClick={() => onNavigate('configurator')}
              className="btn-gold px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer hover:scale-105 transition-transform"
            >
              {language === 'CN' ? '进入在线配置方案' : 'Start My Configuration'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
