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
  statusCode: 'pending_confirm' | 'pending_contract' | 'pending_deposit' | 'production' | 'mid_payment' | 'delivery' | 'installing' | 'final_payment' | 'completed' | 'warranty';
  progressCN: string;
  progressEN: string;
  specCN: string;
  specEN: string;
  rows: number;
  seats: number;
}

// Global orders array adhering strictly to user requirements and high-end aesthetics
const ordersData: Order[] = [
  {
    id: 'ALT-NO: ALT-Concepto-825712',
    productCN: 'ALTULA-Concepto级高伸缩活动看台组 - 5m / 6排',
    productEN: 'ALTULA-Concepto Grade Smart Telescopic Seating System - 5m / 6 Rows',
    date: '2026/5/29',
    price: '¥ 116,340',
    statusCN: '待确认',
    statusEN: 'Pending Confirmation',
    statusCode: 'pending_confirm',
    progressCN: '已提交，等待客服确认',
    progressEN: 'Submitted, pending customer service confirmation.',
    specCN: '5m 面宽 / 6排 / Concepto 430*430*4mm 记忆海绵圆形坐垫 / 电驱变频承载系统 / 家具级饰面材质选择',
    specEN: '5m Width / 6 Rows / Concepto 430*430*4mm Memory Foam Circular Cushions / Motorised Frequency-Regulated Seating Decks / Premium Materials Custom Accent Panels',
    rows: 6,
    seats: 36
  },
  {
    id: 'ALT-1026-085',
    productCN: '维格 Wellgo 智能活动看台',
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
    productCN: 'concepto 弧形艺术活动看台',
    productEN: 'concepto Curved Artistic Retractable Seating (Active Obstacle Avoidance)',
    date: '2026-03-05',
    price: '¥ 298,000',
    statusCN: '运输中',
    statusEN: 'In Transit',
    statusCode: 'delivery',
    progressCN: '专业物流班车已出发，预计近期运抵剧院安装现场，工程团队跟进中',
    progressEN: 'Professional logistics fleet dispatched. Expected arrival at theater site soon.',
    specCN: '8排 / 540座 / 弧形豪华双层软皮包覆座椅 / 3D 激光雷达主动防撞感应 / 自平衡精准消噪传动',
    specEN: '8 Rows / 540 Seats / Curved Luxury Double Soft-Leather Enveloping Seating / 3D LiDAR Collision Avoidance / Self-Balanced Ultra-Silent Drive',
    rows: 8,
    seats: 540
  },
  {
    id: 'ALT-1025-119',
    productCN: 'ALTULA 学术演讲大厅特制看台',
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

// Contract Monitoring Steps Definitions
const contractSteps = [
  { num: 1, textCN: '待确认', textEN: 'To Confirm', code: 'pending_confirm' },
  { num: 2, textCN: '待签合同', textEN: 'Sign Contract', code: 'pending_contract' },
  { num: 3, textCN: '待付定金', textEN: 'Deposit', code: 'pending_deposit' },
  { num: 4, textCN: '生产中', textEN: 'In Production', code: 'production' },
  { num: 5, textCN: '待付中期款', textEN: 'Mid Payment', code: 'mid_payment' },
  { num: 6, textCN: '配送中', textEN: 'In Transit', code: 'delivery' },
  { num: 7, textCN: '待安装', textEN: 'Installing', code: 'installing' },
  { num: 8, textCN: '待付尾款', textEN: 'Final Payment', code: 'final_payment' },
  { num: 9, textCN: '已完成', textEN: 'Completed', code: 'completed' },
  { num: 10, textCN: '质保中', textEN: 'Warranty', code: 'warranty' }
];

const getActiveStepNum = (statusCode: string) => {
  switch (statusCode) {
    case 'pending_confirm': return 1;
    case 'pending_contract': return 2;
    case 'pending_deposit': return 3;
    case 'production': return 4;
    case 'mid_payment': return 5;
    case 'delivery': return 6;
    case 'installing': return 7;
    case 'final_payment': return 8;
    case 'completed': return 9;
    case 'warranty': return 10;
    default: return 1;
  }
};

export default function OrdersView({ onNavigate, language }: OrdersViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(ordersData[0]);

  // Simulated Login State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('altula_is_logged_in') === 'true';
  });
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Filtered orders
  const filteredOrders = ordersData.filter(order => {
    const productNameMatch = (language === 'CN' ? order.productCN : order.productEN).toLowerCase().includes(searchQuery.toLowerCase());
    const idMatch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSearch = productNameMatch || idMatch;

    let matchesStatus = false;
    if (statusFilter === 'all') {
      matchesStatus = true;
    } else if (statusFilter === 'pending_confirm') {
      matchesStatus = order.statusCode === 'pending_confirm';
    } else if (statusFilter === 'production') {
      matchesStatus = order.statusCode === 'production';
    } else if (statusFilter === 'delivery') {
      matchesStatus = order.statusCode === 'delivery';
    } else if (statusFilter === 'completed') {
      matchesStatus = order.statusCode === 'completed';
    } else {
      matchesStatus = order.statusCode === statusFilter;
    }

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
            
            {/* Search and Filters Controls Block (Dropdown replaces high-density buttons) */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-luxury flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-3/5">
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
              
              {/* Single Select dropdown list */}
              <div className="relative w-full md:w-2/5 shrink-0">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-brand-gold focus:outline-none focus:bg-white rounded-lg pl-3.5 pr-10 py-2.5 text-xs font-bold text-gray-700 appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23C5A880' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                >
                  <option value="all">{language === 'CN' ? '全部订单状态' : 'All Statuses'}</option>
                  <option value="pending_confirm">{language === 'CN' ? '待确认' : 'Pending Confirmation'}</option>
                  <option value="production">{language === 'CN' ? '生产中' : 'In Production'}</option>
                  <option value="delivery">{language === 'CN' ? '运输中' : 'In Transit'}</option>
                  <option value="completed">{language === 'CN' ? '已交付' : 'Delivered'}</option>
                </select>
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
                filteredOrders.map((order) => {
                  const isExpanded = selectedOrder?.id === order.id;
                  
                  return (
                    <div
                      key={order.id}
                      onClick={() => setSelectedOrder(isExpanded ? null : order)}
                      className={`bg-white rounded-2xl border transition-all duration-300 shadow-luxury overflow-hidden cursor-pointer group ${
                        isExpanded
                          ? 'border-brand-gold bg-stone-50/20 shadow-xl'
                          : 'border-slate-100 hover:border-gray-300 hover:-translate-y-0.5'
                      }`}
                    >
                      {/* Collapsed view header */}
                      <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-bold text-stone-800 px-3 py-1 rounded bg-[#F8F6F1] border border-gray-200">
                              {order.id}
                            </span>
                            <span className={`inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full ${
                              order.statusCode === 'pending_confirm'
                                ? 'bg-[#EADECC]/80 text-[#7A6448]'
                                : order.statusCode === 'production'
                                ? 'bg-amber-100 text-amber-800'
                                : order.statusCode === 'delivery'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {language === 'CN' ? order.statusCN : order.statusEN}
                            </span>
                          </div>
                          
                          <h2 className="text-lg md:text-xl font-black text-brand-dark tracking-tight leading-snug group-hover:text-brand-gold transition-colors">
                            {language === 'CN' ? order.productCN : order.productEN}
                          </h2>
                          
                          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-brand-gray font-medium">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-gray-400" />
                              {language === 'CN' ? '创建日期： ' : 'Created: '}{order.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                              {order.rows}{language === 'CN' ? '排' : ' Rows'} / {order.seats}{language === 'CN' ? '座' : ' Seats'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-row md:flex-col justify-between md:items-end border-t border-gray-100 md:border-0 pt-3 md:pt-0 shrink-0">
                          <div className="md:text-right">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                              {language === 'CN' ? '意向金' : 'Deposit'}
                            </span>
                            <span className="text-xl font-mono font-black text-brand-dark">
                              {order.price}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-brand-gold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 mt-1 hidden md:flex">
                            {isExpanded 
                              ? (language === 'CN' ? '折叠详情' : 'Hide Details') 
                              : (language === 'CN' ? '展开详情' : 'Details')
                            }
                            <ArrowRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                          </span>
                        </div>
                      </div>

                      {/* Expandable Section */}
                      {isExpanded && (
                        <div className="bg-[#FAF9F5]/40 border-t border-gray-100 p-6 md:p-8 space-y-6 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                          
                          {/* Horizontal 10-node Progress Monitor matching Screenshot 1 exactly */}
                          <div className="py-4 border-b border-gray-200/50">
                            <span className="text-brand-gold text-[11px] font-mono tracking-[0.2em] uppercase font-bold mb-4 block">
                              {language === 'CN' ? '合同执行全维度十节点监察线' : '10-NODE CONTRACT MONITORING WATCHLINE'}
                            </span>
                            
                            <div className="flex items-center justify-between gap-1 overflow-x-auto pb-4 pt-2 -mx-2 px-2 scrollbar-thin scrollbar-thumb-gray-200">
                              {contractSteps.map((step, idx) => {
                                const isActive = getActiveStepNum(order.statusCode) === step.num;
                                const isCompleted = getActiveStepNum(order.statusCode) > step.num;
                                
                                return (
                                  <React.Fragment key={step.num}>
                                    <div className="flex flex-col items-center text-center min-w-[75px] shrink-0 snap-center">
                                      {/* Circle representing the dynamic state */}
                                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 text-sm font-bold shadow-sm ${
                                        isActive 
                                          ? 'bg-[#C5A880] text-stone-900 border-2 border-[#B69871] ring-4 ring-[#C5A880]/20'
                                          : isCompleted
                                          ? 'bg-emerald-50 text-emerald-600 border-2 border-emerald-200'
                                          : 'bg-gray-50 text-gray-400 border border-gray-200'
                                      }`}>
                                        {step.num}
                                      </div>
                                      
                                      {/* Node status name */}
                                      <span className={`text-[11px] mt-2 font-semibold whitespace-nowrap transition-colors duration-300 ${
                                        isActive 
                                          ? 'text-[#7A6448] font-bold'
                                          : isCompleted
                                          ? 'text-emerald-700'
                                          : 'text-gray-400'
                                      }`}>
                                        {language === 'CN' ? step.textCN : step.textEN}
                                      </span>
                                    </div>
                                    
                                    {/* Connectivity angle divider symbol */}
                                    {idx < contractSteps.length - 1 && (
                                      <span className="text-gray-300 font-light text-xs mx-1 select-none shrink-0">
                                        &gt;
                                      </span>
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </div>
                          </div>

                          {/* Dynamic latest status description callout banner */}
                          <div className="bg-[#FAF7F2] rounded-xl p-5 border border-[#F0E6D2]/60">
                            <div className="flex items-center gap-2 text-xs md:text-sm text-[#7A6448]">
                              <span className="font-bold">{language === 'CN' ? '最新状态： ' : 'Latest Status: '}</span>
                              <span>
                                {order.statusCode === 'pending_confirm'
                                  ? (language === 'CN' ? '已提交，等待客服确认' : 'Submitted, pending customer service confirmation')
                                  : (language === 'CN' ? order.progressCN : order.progressEN)
                                }
                              </span>
                            </div>
                          </div>

                          {/* Historical Engineering logs */}
                          <div>
                            <h4 className="text-xs font-bold text-brand-dark uppercase tracking-widest mb-4 flex items-center gap-1.5 border-b border-gray-200/50 pb-2">
                              <Package className="w-4 h-4 text-brand-gold" />
                              {language === 'CN' ? '制造及交付实时进度日志' : 'Live Production Progress Log'}
                            </h4>
                            
                            <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-1.5 before:bottom-1.5 before:w-[2px] before:bg-gray-200">
                              
                              {/* Current Step active details */}
                              <div className="relative">
                                <span className="absolute -left-6 top-1 w-[12px] h-[12px] rounded-full border-4 border-[#C5A880] bg-white ring-4 ring-[#C5A880]/15"></span>
                                <div className="pl-2">
                                  <h5 className="font-bold text-xs text-[#7A6448] flex items-center gap-2">
                                    {language === 'CN' ? '实时环节：' : 'Live Node: '}
                                    <span>{language === 'CN' ? order.statusCN : order.statusEN}</span>
                                  </h5>
                                  <p className="text-xs text-gray-500 font-medium leading-relaxed mt-1">
                                    {language === 'CN' ? order.progressCN : order.progressEN}
                                  </p>
                                </div>
                              </div>

                              {/* Historic backup log */}
                              <div className="relative opacity-60">
                                <span className="absolute -left-5 top-1.5 w-2 h-2 rounded-full bg-brand-gray"></span>
                                <div className="pl-2">
                                  <h5 className="font-bold text-[11px] text-brand-dark">
                                    {language === 'CN' ? '看台系统数字化预选模数审核通过' : 'Bleacher module structural pre-selection review passed'}
                                  </h5>
                                  <span className="text-[10px] text-gray-400 font-medium font-mono">2026-05-29 11:30</span>
                                </div>
                              </div>
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

                          {/* Actions */}
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
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column (lg:col-span-4): Personal Center Panel pruned to absolute basics per request */}
          <div className="lg:col-span-4">
            {isLoggedIn ? (
              
              /* Logged In View - Pruned Personal Center Portal */
              <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-luxury text-brand-dark space-y-6">
                
                {/* Profile Card Header with only avatar background and Username */}
                <div className="text-center pb-2 relative">
                  <div className="w-24 h-24 rounded-full bg-brand-gold/10 text-[#C5A880] border border-brand-gold/20 flex items-center justify-center mx-auto mb-4 relative shadow-sm">
                    <User className="w-12 h-12" />
                    <span className="absolute bottom-1 right-2 w-4.5 h-4.5 rounded-full bg-emerald-500 border-2 border-white"></span>
                  </div>
                  
                  <h3 className="text-xl font-black tracking-tight text-brand-dark">
                    ALTULA_VIP
                  </h3>
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
