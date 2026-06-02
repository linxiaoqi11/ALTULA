import React, { useState } from 'react';
import { Search, Filter, ClipboardList, Briefcase, Calendar, DollarSign, Loader2, User, Building, Phone, ShieldCheck, Mail, LogOut, CheckCircle, Package, ArrowRight, FileText } from 'lucide-react';

interface OrdersViewProps {
  onNavigate: (page: string, params?: any) => void;
  language: 'CN' | 'EN';
}

interface Order {
  id: string;
  productCN: string;
  productEN: string;
  date: string;
  price: string;
  statusCN: string;
  statusEN: string;
  statusCode: 'production' | 'delivery' | 'completed';
  progressCN: string;
  progressEN: string;
  specCN: string;
  specEN: string;
  rows: number;
  seats: number;
}

export default function OrdersView({ onNavigate, language }: OrdersViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'production' | 'delivery' | 'completed'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Simulated Login State - stored locally to feel high fidelity
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('altula_is_logged_in') === 'true';
  });
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Rich mock orders for ALTULA retractable stands and seating
  const ordersData: Order[] = [
    {
      id: 'ALT-1026-085',
      productCN: '维格 Wellgo 智能活动看台 (微阻双轨变频)',
      productEN: 'Wellgo Smart Retractable Seating (Dual-Track VFD)',
      date: '2026-04-12',
      price: '¥ 428,000',
      statusCN: '生产中',
      statusEN: 'In Production',
      statusCode: 'production',
      progressCN: '钢架构模块化焊接完毕，正在进行微阻变频轨迹校准检测',
      progressEN: 'Steel structure modular welding completed. VFD trajectory calibration in progress.',
      specCN: '12排 / 860座 / 羊毛卡米拉温米白防静电饰面 / 双层钢化夹胶防撞玻璃 / 电动遥控一键收展',
      specEN: '12 Rows / 860 Seats / Wool Camilla Warm Rice White Antistatic / Double Laminated Impact Glass / One-Button Automatic Fold',
      rows: 12,
      seats: 860
    },
    {
      id: 'ALT-1026-042',
      productCN: 'concepto 弧形艺术活动看台 (智能主动避障款)',
      productEN: 'concepto Curved Artistic Retractable Seating (Active Obstacle Avoidance)',
      date: '2026-03-05',
      price: '¥ 298,000',
      statusCN: '运输中',
      statusEN: 'In Transit',
      statusCode: 'delivery',
      progressCN: '专业物流班车已出发，预计 6 月 5 日运抵剧院安装现场，工程团队跟进中',
      progressEN: 'Professional logistics fleet dispatched. Expected arrival at theater site on June 5.',
      specCN: '8排 / 540座 / 弧形豪华双层软皮包覆座椅 / 3D 激光雷达主动防撞感应 / 自平衡精准消噪传动',
      specEN: '8 Rows / 540 Seats / Curved Luxury Double Soft-Leather Enveloping Seating / 3D LiDAR Collision Avoidance / Self-Balanced Ultra-Silent Drive',
      rows: 8,
      seats: 540
    },
    {
      id: 'ALT-1025-119',
      productCN: 'ALTULA 学术演讲大厅特制看台 (超高层悬挑型)',
      productEN: 'ALTULA Academic Auditorium Special Seating (High-Rise Cantilever)',
      date: '2025-12-20',
      price: '¥ 780,000',
      statusCN: '已交付',
      statusEN: 'Delivered',
      statusCode: 'completed',
      progressCN: '看台结构力学承重通过甲级工程院认证，主被动安全检测达标，设备已移交运营部使用',
      progressEN: 'Structural load-bearing certified by Grade-A engineering bureau. Active/passive safety completed.',
      specCN: '18排 / 1320座 / 自平衡折叠骨架结构 / 消音液压提升辅助 / 静音防滑拉丝合金铺板',
      specEN: '18 Rows / 1320 Seats / Self-Balancing Folding Steel Frame / Hydraulic Dampening Lift Assist / Acoustic Non-slip Aluminum Decks',
      rows: 18,
      seats: 1320
    }
  ];

  // Filtered orders
  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = (language === 'CN' ? order.productCN : order.productEN).toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.statusCode === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.username || !loginForm.password) {
      setLoginError(language === 'CN' ? '请输入账号和密码' : 'Please fill in credentials');
      return;
    }

    setIsLoggingIn(true);
    setLoginError('');

    // Simulate elite verification delay
    setTimeout(() => {
      setIsLoggingIn(false);
      setIsLoggedIn(true);
      localStorage.setItem('altula_is_logged_in', 'true');
    }, 1200);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('altula_is_logged_in');
    setSelectedOrder(null);
  };

  return (
    <div className="pt-28 pb-16 bg-brand-light min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header section in sync with ALTULA sleek styling */}
        <div className="border-b border-gray-200 pb-10 mb-12 text-center md:text-left md:flex md:items-center md:justify-between">
          <div>
            <span className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
              {language === 'CN' ? '全流程透明化进度追踪' : 'SECURE ORDER DISCOVER & TRACKING'}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tight mb-2">
              {language === 'CN' ? '订单查询系统' : 'Order Tracking Center'}
            </h1>
            <p className="text-gray-500 font-light text-sm max-w-xl">
              {language === 'CN'
                ? '查看您订单的实时工厂排产及物流状态'
                : 'Monitor production phases, alignment structural checks and live tracking log metrics.'}
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {language === 'CN' ? '数据接口：已连接' : 'API Node: Online'}
            </span>
          </div>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column (lg:col-span-8): Order Inquiry List */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Search and Filters Controls Block */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-luxury flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-1/2">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder={language === 'CN' ? '输入订单号或产品名称查询...' : 'Search order number, product key...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-brand-gold focus:outline-none focus:bg-white rounded-lg pl-10 pr-4 py-2.5 text-xs font-medium"
                />
              </div>
              
              {/* Category Filters */}
              <div className="flex gap-2 w-full md:w-auto overflow-x-auto hide-scrollbar shrink-0">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold leading-none transition-all cursor-pointer ${
                    statusFilter === 'all'
                      ? 'bg-brand-dark text-white shadow-md'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {language === 'CN' ? '全部订单' : 'All'}
                </button>
                <button
                  onClick={() => setStatusFilter('production')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold leading-none transition-all cursor-pointer ${
                    statusFilter === 'production'
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                  }`}
                >
                  {language === 'CN' ? '生产中' : 'Production'}
                </button>
                <button
                  onClick={() => setStatusFilter('delivery')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold leading-none transition-all cursor-pointer ${
                    statusFilter === 'delivery'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  {language === 'CN' ? '运输中' : 'In Transit'}
                </button>
                <button
                  onClick={() => setStatusFilter('completed')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold leading-none transition-all cursor-pointer ${
                    statusFilter === 'completed'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  {language === 'CN' ? '已交付' : 'Delivered'}
                </button>
              </div>
            </div>

            {/* List Content */}
            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-luxury py-16 text-center">
                  <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-400 font-light text-sm">
                    {language === 'CN' ? '未找到匹配的订单' : 'No matching orders found'}
                  </p>
                </div>
              ) : (
                filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                    className={`bg-white rounded-2xl border transition-all duration-300 shadow-luxury overflow-hidden cursor-pointer group ${
                      selectedOrder?.id === order.id
                        ? 'border-brand-gold bg-stone-50/20 shadow-xl'
                        : 'border-slate-100 hover:border-gray-300 hover:-translate-y-0.5'
                    }`}
                  >
                    {/* Collapsed view header */}
                    <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-bold text-brand-dark px-2.5 py-1 rounded bg-brand-light border border-gray-200">
                            {order.id}
                          </span>
                          <span className={`inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full ${
                            order.statusCode === 'production'
                              ? 'bg-amber-100 text-amber-800'
                              : order.statusCode === 'delivery'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {language === 'CN' ? order.statusCN : order.statusEN}
                          </span>
                        </div>
                        <h2 className="text-lg font-black text-brand-dark tracking-tight leading-snug group-hover:text-brand-gold transition-colors">
                          {language === 'CN' ? order.productCN : order.productEN}
                        </h2>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-brand-gray font-medium">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {language === 'CN' ? '下单日期：' : 'Ordered: '}{order.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-3.5 h-3.5" />
                            {order.rows}{language === 'CN' ? '排' : ' Rows'} / {order.seats}{language === 'CN' ? '座' : ' Seats'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-row md:flex-col justify-between md:items-end border-t border-gray-50 md:border-0 pt-3 md:pt-0 shrink-0">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                          {language === 'CN' ? '协议总价' : 'Project Cost'}
                        </span>
                        <span className="text-xl font-mono font-black text-brand-dark">
                          {order.price}
                        </span>
                        <span className="text-[10px] font-bold text-brand-gold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 mt-1 hidden md:flex">
                          {selectedOrder?.id === order.id 
                            ? (language === 'CN' ? '折叠详情' : 'Hide Details') 
                            : (language === 'CN' ? '展开详情' : 'Details')
                          }
                          <ArrowRight className={`w-3 h-3 transition-transform ${selectedOrder?.id === order.id ? 'rotate-90' : ''}`} />
                        </span>
                      </div>
                    </div>

                    {/* Expandable Section */}
                    {selectedOrder?.id === order.id && (
                      <div className="bg-brand-light/70 border-t border-gray-100 p-6 md:p-8 space-y-6 animate-fade-in">
                        
                        {/* Real-time Engineering Progress Tracker */}
                        <div>
                          <h4 className="text-xs font-bold text-brand-dark uppercase tracking-widest mb-4 flex items-center gap-1.5 border-b border-gray-200/50 pb-2">
                            <Package className="w-4 h-4 text-brand-gold" />
                            {language === 'CN' ? '制造及交付实时进度日志' : 'Live Production Progress Log'}
                          </h4>
                          
                          {/* Progress Tracker Steps Component */}
                          <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-1.5 before:bottom-1.5 before:w-[2px] before:bg-gray-200">
                            
                            {/* Current Step */}
                            <div className="relative">
                              <span className="absolute -left-6 top-1 w-[12px] h-[12px] rounded-full border-4 border-brand-gold bg-white ring-4 ring-brand-gold/15"></span>
                              <div className="pl-2">
                                <h5 className="font-bold text-xs text-brand-dark flex items-center gap-2">
                                  {language === 'CN' ? '实时环节：' : 'Live Node: '}
                                  <span className="text-brand-gold">{language === 'CN' ? order.statusCN : order.statusEN}</span>
                                </h5>
                                <p className="text-xs text-gray-500 font-medium leading-relaxed mt-1">
                                  {language === 'CN' ? order.progressCN : order.progressEN}
                                </p>
                              </div>
                            </div>

                            {/* Standard Sub-step logs */}
                            {order.statusCode === 'production' && (
                              <>
                                <div className="relative opacity-60">
                                  <span className="absolute -left-5 top-1.5 w-2 h-2 rounded-full bg-brand-gray"></span>
                                  <div className="pl-2">
                                    <h5 className="font-bold text-[11px] text-brand-dark">
                                      {language === 'CN' ? '看台骨架精密焊接通过核验' : 'Platform structure precision welding and testing passed'}
                                    </h5>
                                    <span className="text-[10px] text-gray-400 font-medium font-mono">2026-05-18 10:24</span>
                                  </div>
                                </div>
                                <div className="relative opacity-60">
                                  <span className="absolute -left-5 top-1.5 w-2 h-2 rounded-full bg-brand-gray"></span>
                                  <div className="pl-2">
                                    <h5 className="font-bold text-[11px] text-brand-dark">
                                      {language === 'CN' ? '首批加高加厚钢架构进入预装线' : 'Stage-1 steel framework pre-assembly verification'}
                                    </h5>
                                    <span className="text-[10px] text-gray-400 font-medium font-mono">2026-05-10 14:15</span>
                                  </div>
                                </div>
                              </>
                            )}

                            {order.statusCode === 'delivery' && (
                              <>
                                <div className="relative opacity-60">
                                  <span className="absolute -left-5 top-1.5 w-2 h-2 rounded-full bg-brand-gray"></span>
                                  <div className="pl-2">
                                    <h5 className="font-bold text-[11px] text-brand-dark">
                                      {language === 'CN' ? '看台完成抗震与 500kg/㎡ 载荷破坏性物理实验' : 'Antidisplacement anti-vibration & 500kg/m² structural load stress pass'}
                                    </h5>
                                    <span className="text-[10px] text-gray-400 font-medium font-mono">2026-04-22 16:30</span>
                                  </div>
                                </div>
                                <div className="relative opacity-60">
                                  <span className="absolute -left-5 top-1.5 w-2 h-2 rounded-full bg-brand-gray"></span>
                                  <div className="pl-2">
                                    <h5 className="font-bold text-[11px] text-brand-dark">
                                      {language === 'CN' ? '定制看台钢结构首选构件下线' : 'Seating materials and primary custom-extruded components roll out'}
                                    </h5>
                                    <span className="text-[10px] text-gray-400 font-medium font-mono">2026-04-05 09:12</span>
                                  </div>
                                </div>
                              </>
                            )}

                            {order.statusCode === 'completed' && (
                              <>
                                <div className="relative opacity-60">
                                  <span className="absolute -left-5 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                                  <div className="pl-2">
                                    <h5 className="font-bold text-[11px] text-emerald-800">
                                      {language === 'CN' ? '项目经理签署正式交付及质保证书' : 'Official Project Manager handover and warranty signing'}
                                    </h5>
                                    <span className="text-[10px] text-gray-400 font-medium font-mono">2026-01-18 10:00</span>
                                  </div>
                                </div>
                                <div className="relative opacity-60">
                                  <span className="absolute -left-5 top-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
                                  <div className="pl-2">
                                    <h5 className="font-bold text-[11px] text-brand-dark">
                                      {language === 'CN' ? '双轨变频动力与激光红外对齐测绘系统试运行完美' : 'Dual-motion laser indexing motor and alignment test run completed'}
                                    </h5>
                                    <span className="text-[10px] text-gray-400 font-medium font-mono">2026-01-15 15:45</span>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Engineering Technical Specifications details */}
                        <div className="pt-4 border-t border-gray-200/50">
                          <h4 className="text-xs font-bold text-brand-dark uppercase tracking-widest mb-3 flex items-center gap-1.5">
                            <FileText className="w-4 h-4 text-brand-gold" />
                            {language === 'CN' ? '设计与定制工艺参数档案' : 'Custom Crafting Technical Specs'}
                          </h4>
                          <div className="bg-white p-4.5 rounded-xl border border-gray-100/80">
                            <p className="text-xs text-gray-600 font-medium leading-relaxed">
                              {language === 'CN' ? order.specCN : order.specEN}
                            </p>
                          </div>
                        </div>

                        {/* Order action button */}
                        <div className="flex justify-end gap-3 pt-3">
                          <button
                            onClick={() => onNavigate('contact')}
                            className="bg-white hover:bg-gray-50 text-brand-dark border border-gray-200 py-2 px-4 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                          >
                            {language === 'CN' ? '联系专属项目经理' : 'Contact QA Manager'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Column (lg:col-span-4): Login Info / Account Management Panel */}
          <div className="lg:col-span-4">
            {isLoggedIn ? (
              
              /* Logged In View - Enterprise User Portal */
              <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-luxury text-brand-dark space-y-6">
                
                {/* Profile Card Header */}
                <div className="text-center pb-6 border-b border-gray-100 relative">
                  <div className="w-20 h-20 rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/20 flex items-center justify-center mx-auto mb-4 relative shadow-sm">
                    <User className="w-10 h-10" />
                    <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></span>
                  </div>
                  
                  <h3 className="text-lg font-black tracking-tight text-brand-dark">
                    ALTULA_VIP
                  </h3>
                  <div className="flex justify-center items-center gap-1.5 mt-1.5">
                    <span className="bg-brand-dark text-brand-gold text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-block">
                      {language === 'CN' ? '核心合伙人' : 'CORE PARTNER'}
                    </span>
                  </div>
                </div>

                {/* Account details registry */}
                <div className="space-y-4">
                  <div className="flex gap-3.5 items-start">
                    <span className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-brand-gold shrink-0">
                      <Building className="w-4 h-4" />
                    </span>
                    <div>
                      <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none mb-1">
                        {language === 'CN' ? '企商名称' : 'Institution Office'}
                      </h5>
                      <p className="text-xs font-bold text-brand-dark">
                        {language === 'CN' ? '北京国家大剧院改建筹备处' : 'National Grand Theater Reconstruction Office'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start">
                    <span className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-brand-gold shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                    <div>
                      <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none mb-1">
                        {language === 'CN' ? '信誉评级' : 'Soverign Credit Rating'}
                      </h5>
                      <p className="text-xs font-bold text-brand-dark flex items-center gap-1">
                        AA+ {language === 'CN' ? '(免收装配意向金)' : '(Security Free Credit)'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start">
                    <span className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-brand-gold shrink-0">
                      <Phone className="w-4 h-4" />
                    </span>
                    <div>
                      <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none mb-1">
                        {language === 'CN' ? 'VIP 经理热线' : 'Assigned Senior Manager'}
                      </h5>
                      <p className="text-xs font-bold text-brand-dark">
                        {language === 'CN' ? '185-8894-5064 (林经理)' : '+86 185-8894-5064 (Andy Lin)'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive statistical charts / summary info */}
                <div className="p-4 rounded-2xl bg-brand-light border border-gray-100/80 space-y-3.5">
                  <h4 className="text-[10px] font-bold text-brand-dark uppercase tracking-wider border-b border-gray-200/50 pb-1.5">
                    {language === 'CN' ? '合作成果统计' : 'Joint Partnership Stats'}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[9px] text-gray-400 font-bold uppercase tracking-wider">{language === 'CN' ? '累计采购总值' : 'Accumulated Cost'}</span>
                      <span className="text-base font-mono font-black text-brand-dark block mt-0.5">¥ 1,506 K</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-gray-400 font-bold uppercase tracking-wider">{language === 'CN' ? '已排产座位' : 'Total Seating'}</span>
                      <span className="text-base font-mono font-black text-brand-dark block mt-0.5">2,720 座</span>
                    </div>
                  </div>
                </div>

                {/* Log Out Control */}
                <button
                  onClick={handleLogout}
                  className="w-full border border-gray-200 hover:border-red-200 hover:bg-red-50 text-brand-dark hover:text-red-700 font-bold py-3 px-6 rounded-xl transition-all duration-300 text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{language === 'CN' ? '安全退出登录' : 'Logout Securely'}</span>
                </button>

              </div>
            ) : (
              
              /* Logged Out View - Premium Login Panel Form */
              <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-luxury text-brand-dark">
                
                <div className="text-center pb-5 mb-5 border-b border-gray-100">
                  <span className="w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center mx-auto mb-3">
                    <User className="w-6 h-6 border-transparent" />
                  </span>
                  <h3 className="text-lg font-black tracking-tight text-brand-dark">
                    {language === 'CN' ? '合作伙伴登录' : 'Partner Sign In'}
                  </h3>
                  <p className="text-xs text-gray-400 font-light mt-1">
                    {language === 'CN' ? '可获得订单精密工艺参数追溯功能' : 'View physical stress analytics logs'}
                  </p>
                </div>

                {loginError && (
                  <div className="mb-4 p-3 bg-red-50 rounded-lg text-xs font-bold text-red-700 border border-red-100">
                    {loginError}
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      {language === 'CN' ? '服务帐号 / Email' : 'Account Identifier / Email'}
                    </label>
                    <input
                      type="text"
                      placeholder="ALTULA_VIP"
                      value={loginForm.username}
                      onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3.5 text-xs font-medium focus:border-brand-gold focus:outline-none focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      {language === 'CN' ? '系统访问密码' : 'Access Password'}
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3.5 text-xs font-medium focus:border-brand-gold focus:outline-none focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full bg-brand-dark hover:bg-black text-white text-xs font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{language === 'CN' ? '正在连接安全网关...' : 'Verifying Security Node...'}</span>
                      </>
                    ) : (
                      <>
                        <span>{language === 'CN' ? '授信登录' : 'Authorize Log In'}</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Helpful hints and credential presets */}
                <div className="mt-5 p-3.5 bg-brand-light rounded-xl border border-dotted border-gray-200 text-center space-y-1.5">
                  <span className="text-[10px] font-black text-brand-gold uppercase tracking-widest block">
                    {language === 'CN' ? '系统演示帐号提示' : 'SANDBOX DEMO CREDENTIAL'}
                  </span>
                  <div className="text-[10px] text-gray-500 font-medium leading-relaxed">
                    <p>{language === 'CN' ? '请输入帐号：' : 'User: '} <strong className="text-brand-dark font-semibold">ALTULA_VIP</strong></p>
                    <p>{language === 'CN' ? '密码：任意输入即可登录' : 'Pass: any value'}</p>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
