import React, { useState } from 'react';
import { Filter, ArrowRight, Table, Settings, CheckCircle } from 'lucide-react';
import { productsData } from '../data';
import { Product } from '../types';

interface ProductsViewProps {
  onNavigate: (page: string, params?: any) => void;
  language: 'CN' | 'EN';
}

export default function ProductsView({ onNavigate, language }: ProductsViewProps) {
  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'retractable' | 'public'>('all');
  const [selectedSeatStyle, setSelectedSeatStyle] = useState<string>('all');
  const [selectedMoveMode, setSelectedMoveMode] = useState<string>('all');
  const [selectedWidth, setSelectedWidth] = useState<string>('all');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const productsList = [
    {
      id: 'flex-1000',
      parentId: 'retractable',
      name: 'ALTULA FLEX 1000',
      tag: 'FLEX 1000',
      category: 'retractable',
      seatStyle: 'wellgo',
      moveMode: 'manual',
      width: '4m',
      image: 'https://img-reg-ab.imagency.cn/e/02bbb6f33a36a708c3eb24284967254a.jpg',
      subtitleCN: '伸缩活动看台 · 1,000 座',
      subtitleEN: 'Retractable Grandstand · 1,000 Seats',
      colors: ['#7B92A2', '#86B5BD', '#CE3326']
    },
    {
      id: 'flex-2000',
      parentId: 'retractable',
      name: 'ALTULA FLEX 2000',
      tag: 'FLEX 2000',
      category: 'retractable',
      seatStyle: 'concepto',
      moveMode: 'electric',
      width: '6m',
      image: 'https://img-reg-ab.imagency.cn/e/dc5395da5efbb8d2d7798f4005768381.jpg',
      subtitleCN: '伸缩活动看台 · 2,000 座',
      subtitleEN: 'Retractable Grandstand · 2,000 Seats',
      colors: ['#121315', '#97A9B7', '#2573B7']
    },
    {
      id: 'classic-500',
      parentId: 'public',
      name: 'ALTULA CLASSIC 500',
      tag: 'CLASSIC 500',
      category: 'public',
      seatStyle: 'orden',
      moveMode: 'manual',
      width: 'custom',
      image: 'https://img-reg-ab.imagency.cn/e/8a48cfe1be17841fb3bf8ec91e4e12a2.webp',
      subtitleCN: '公共活动看台 · 500 座',
      subtitleEN: 'Public Seating · 500 Seats',
      colors: ['#999999', '#DCDCD9', '#3D4146']
    },
    {
      id: 'classic-1500',
      parentId: 'public',
      name: 'ALTULA CLASSIC 1500',
      tag: 'CLASSIC 1500',
      category: 'public',
      seatStyle: 'concepto',
      moveMode: 'electric',
      width: 'custom',
      image: 'https://img-reg-ab.imagency.cn/e/736c313958ba791f34e22b7b1dd62240.webp',
      subtitleCN: '公共活动看台 · 1,500 座',
      subtitleEN: 'Public Seating · 1,500 Seats',
      colors: ['#E9B136', '#636A73', '#111214']
    }
  ];

  // Filter logic
  const filteredProducts = productsList.filter((prod) => {
    // 1. One-level Category Filter
    if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
      return false;
    }

    // 2. Seat style filter
    if (selectedSeatStyle !== 'all' && prod.seatStyle !== selectedSeatStyle) {
      return false;
    }

    // 3. Move Mode filter
    if (selectedMoveMode !== 'all' && prod.moveMode !== selectedMoveMode) {
      return false;
    }

    // 4. Width constraints
    if (selectedWidth !== 'all' && prod.width !== selectedWidth) {
      return false;
    }

    return true;
  });

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedSeatStyle('all');
    setSelectedMoveMode('all');
    setSelectedWidth('all');
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

        {/* Layout: Filters Sidebar Left (3 col layout on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Filters: Left Sidebar Column */}
          <div className="hidden lg:block bg-white p-7 rounded-3xl border border-gray-100 shadow-luxury self-start">
            <div className="flex justify-between items-center pb-6 border-b border-gray-100 mb-6">
              <h3 className="font-bold text-brand-dark flex items-center gap-2">
                <Filter className="w-4 h-4 text-brand-gold" />
                {language === 'CN' ? '全能立体筛选' : 'Advanced Filters'}
              </h3>
              <button
                onClick={handleResetFilters}
                className="text-xs text-brand-gold hover:underline cursor-pointer font-medium"
              >
                {language === 'CN' ? '清空重置' : 'Reset All'}
              </button>
            </div>

            {/* Category selection */}
            <div className="mb-8">
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-dark mb-4">
                {language === 'CN' ? '一类主标' : 'Primary Tier'}
              </h4>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`text-left text-sm py-2 px-3.5 rounded-lg transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-brand-dark text-white font-semibold'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-brand-dark'
                  }`}
                >
                  {language === 'CN' ? '全部看台产品' : 'All Products'}
                </button>
                <button
                  onClick={() => setSelectedCategory('retractable')}
                  className={`text-left text-sm py-2 px-3.5 rounded-lg transition-all ${
                    selectedCategory === 'retractable'
                      ? 'bg-brand-dark text-white font-semibold'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-brand-dark'
                  }`}
                >
                  {language === 'CN' ? '伸缩活动看台系列' : 'Retractable Seating'}
                </button>
                <button
                  onClick={() => setSelectedCategory('public')}
                  className={`text-left text-sm py-2 px-3.5 rounded-lg transition-all ${
                    selectedCategory === 'public'
                      ? 'bg-brand-dark text-white font-semibold'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-brand-dark'
                  }`}
                >
                  {language === 'CN' ? '公共坐席看台系列' : 'Public Auditoriums'}
                </button>
              </div>
            </div>

            {/* Seat selection */}
            <div className="mb-8 border-t border-gray-100 pt-6">
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-dark mb-4">
                {language === 'CN' ? '座椅高定款式 (二级)' : 'Seat Profiles'}
              </h4>
              <div className="flex flex-col gap-2">
                {[
                  { value: 'all', label: language === 'CN' ? '不限结构款式' : 'All Profiles' },
                  { value: 'wellgo', label: language === 'CN' ? '维格 Wellgo' : 'Wellgo Seating' },
                  { value: 'concepto', label: language === 'CN' ? '圆形 Concepto' : 'Concepto Curved' },
                  { value: 'orden', label: language === 'CN' ? '方形 Orden' : 'Orden Geometric' }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSelectedSeatStyle(opt.value)}
                    className={`text-left text-xs py-2 px-3 rounded-md transition-all ${
                      selectedSeatStyle === opt.value
                        ? 'text-brand-gold font-semibold bg-brand-gold/5 border-l-2 border-brand-gold pl-2.5'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-brand-dark font-light pl-2'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Move Mode */}
            <div className="mb-8 border-t border-gray-100 pt-6">
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-dark mb-4">
                {language === 'CN' ? '动力收放方式 (自选)' : 'Movement Tech'}
              </h4>
              <div className="flex flex-col gap-2">
                {[
                  { value: 'all', label: language === 'CN' ? '全部方式' : 'All Modes' },
                  { value: 'manual', label: language === 'CN' ? '手动自控收折' : 'Manual Fold' },
                  { value: 'electric', label: language === 'CN' ? '电机智能驱合' : 'Electric Synchronous' }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSelectedMoveMode(opt.value)}
                    className={`text-left text-xs py-2 px-3 rounded-md transition-all ${
                      selectedMoveMode === opt.value
                        ? 'text-brand-gold font-semibold bg-brand-gold/5 border-l-2 border-brand-gold pl-2.5'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-brand-dark font-light pl-2'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom widths */}
            <div className="mb-6 border-t border-gray-100 pt-6">
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-dark mb-4">
                {language === 'CN' ? '组架配置宽度 (自选)' : 'Group Dimensions'}
              </h4>
              <div className="flex flex-col gap-2">
                {[
                  { value: 'all', label: language === 'CN' ? '全部宽度' : 'All Dimension' },
                  { value: '4m', label: language === 'CN' ? '精品组宽 4米' : 'Width: 4 Meters' },
                  { value: '5m', label: language === 'CN' ? '中等组宽 5米' : 'Width: 5 Meters' },
                  { value: '6m', label: language === 'CN' ? '宏伟组宽 6米' : 'Width: 6 Meters' },
                  { value: 'custom', label: language === 'CN' ? '1对1专属尺寸定做' : 'Bespoke Architectural' }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSelectedWidth(opt.value)}
                    className={`text-left text-xs py-2 px-3 rounded-md transition-all ${
                      selectedWidth === opt.value
                        ? 'text-brand-gold font-semibold bg-brand-gold/5 border-l-2 border-brand-gold pl-2.5'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-brand-dark font-light pl-2'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products: Grid Dashboard (Right Column) */}
          <div className="lg:col-span-3">
            {/* Mobile filters button */}
            <div className="lg:hidden flex justify-between items-center bg-white p-5 rounded-2xl border border-gray-100 mb-8 shadow-sm">
              <span className="font-bold text-sm text-brand-dark flex items-center gap-2">
                <Filter className="w-4 h-4 text-brand-gold" />
                {language === 'CN' ? '空间全能筛选' : 'Click Filters'}
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
              <div className="lg:hidden bg-white p-6 rounded-2xl border border-gray-100 mb-8 shadow-lg flex flex-col gap-5">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 mb-2 uppercase">一级筛选</h4>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'retractable', 'public'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat as any)}
                        className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                          selectedCategory === cat
                            ? 'bg-brand-gold text-white font-semibold'
                            : 'bg-gray-100 text-gray-500'
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

                <div>
                  <h4 className="text-xs font-bold text-gray-400 mb-2 uppercase">座椅款式</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { val: 'all', b: '不限' },
                      { val: 'wellgo', b: '维格' },
                      { val: 'concepto', b: '圆形' },
                      { val: 'orden', b: '方形' }
                    ].map((st) => (
                      <button
                        key={st.val}
                        onClick={() => setSelectedSeatStyle(st.val)}
                        className={`text-xs px-3 py-1.5 rounded-full ${
                          selectedSeatStyle === st.val ? 'bg-brand-dark text-white' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {st.b}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <button onClick={handleResetFilters} className="text-xs text-brand-gold font-medium">
                    重置所有筛选
                  </button>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="bg-brand-dark text-white text-xs font-semibold px-4 py-1.5 rounded-lg"
                  >
                    确认筛选
                  </button>
                </div>
              </div>
            )}

            {/* Filtered Products Count Grid */}
            <div className="flex justify-between items-center mb-8">
              <span className="text-gray-400 font-normal tracking-wide text-sm">
                {language === 'CN'
                  ? `共找到 ${filteredProducts.length} 款符合定制标准的产品`
                  : `Found ${filteredProducts.length} premium products matching criteria`}
              </span>
            </div>

            {/* Error state */}
            {filteredProducts.length === 0 && (
              <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-luxury">
                <Settings className="w-12 h-12 text-gray-300 mx-auto mb-4 animate-spin-slow" />
                <h4 className="text-brand-dark font-bold text-lg mb-2">
                  {language === 'CN' ? '无匹配方案' : 'No Profiles Match Selected Criteria'}
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

            {/* Grid of Individual Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {filteredProducts.map((prod) => (
                <div 
                  key={prod.id} 
                  className="group cursor-pointer flex flex-col"
                  onClick={() => onNavigate('product-detail', { id: prod.parentId })}
                >
                  {/* Image Container with Custom Tag */}
                  <div className="relative overflow-hidden rounded-3xl aspect-[4/3] bg-gray-100 shadow-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    {/* Top-left sticker */}
                    <div className="absolute top-5 left-5 bg-black/75 backdrop-blur-md text-white text-[11px] font-sans font-bold uppercase tracking-wider py-1.5 px-3.5 rounded-lg z-10 transition-colors duration-300 group-hover:bg-brand-dark">
                      {prod.moveMode === 'manual' 
                        ? (language === 'CN' ? '手动自控收折' : 'Manual') 
                        : (language === 'CN' ? '电机智能驱合' : 'Electric')}
                    </div>
                  </div>

                  {/* Information below image */}
                  <div className="mt-6 flex flex-col pl-1">
                    <h3 className="text-xl md:text-2xl font-black text-brand-dark tracking-tight mb-1.5 group-hover:text-brand-gold transition-colors duration-300">
                      {prod.name}
                    </h3>
                    <p className="text-gray-400 font-light text-sm md:text-base mb-1">
                      {language === 'CN' ? prod.subtitleCN : prod.subtitleEN}
                    </p>
                  </div>
                </div>
              ))}
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
