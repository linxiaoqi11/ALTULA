import React, { useState } from 'react';
import { Search, Download, CheckCircle, Laptop, Landmark, ShieldCheck, Cpu, RefreshCw, FileText, ArrowRight, Smartphone, Terminal } from 'lucide-react';

interface SoftwareViewProps {
  onNavigate: (page: string, params?: any) => void;
  language: 'CN' | 'EN';
}

interface SoftwareItem {
  id: string;
  nameCN: string;
  nameEN: string;
  version: string;
  date: string;
  size: string;
  platforms: ('windows' | 'macos' | 'android' | 'ios' | 'linux')[];
  descCN: string;
  descEN: string;
  changelogCN: string[];
  changelogEN: string[];
}

export default function SoftwareView({ onNavigate, language }: SoftwareViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive simulators
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [installedIds, setInstalledIds] = useState<string[]>([]);

  const softwares: SoftwareItem[] = [
    {
      id: 'SOFT-001',
      nameCN: 'ALTULA CAD 建筑制图排比与力学计算插件包',
      nameEN: 'ALTULA CAD Seating Plan BIM Integration Plugin',
      version: 'v4.5.1',
      date: '2026-05-18',
      size: '184 MB',
      platforms: ['windows', 'macos'],
      descCN: '专为 AutoCAD 和 Autodesk Revit 打造的重载看台智能插件。支持输入楼梯、梁、大柱和安全出口间距，可在三维建筑模型中一键生成极简看台拉折物理图，并自动计算承重参数、载荷破坏系数与吸音量。',
      descEN: 'Tailored specifically for AutoCAD and Autodesk Revit templates. Easily key in beam spans, floor layers to auto-generate a comprehensive seating layout satisfying Grade-A load-bearing calculations.',
      changelogCN: [
        '新增：支持 3D BIM 实景构件拉弯载荷一键拟合',
        '优化：微阻变频消音垫圈在极端地震压力下的荷载计算精度'
      ],
      changelogEN: [
        'New: Support 3D BIM real-time component tensile bending lock fitting',
        'Optimized: Wellgo VFD dampener ring simulation index safety parameters'
      ]
    },
    {
      id: 'SOFT-002',
      nameCN: 'ALTULA Go Link 移动端一键智能遥控部署 App',
      nameEN: 'ALTULA Go Link Smart Mobile Controls Deployment Utility',
      version: 'v2.1.0',
      date: '2026-04-10',
      size: '42 MB',
      platforms: ['android', 'ios'],
      descCN: '面向剧院运维与设备管理员的智能移动遥控端软件。通过安全加密信道（数字证书、硬件绑定）现场连接看台的弱电变频控制柜。支持手势滑动无声拉折开合，实时遥控调节动力扭矩，以及红外主动雷达对齐监测。',
      descEN: 'Sovereign security mobile client linking with local PLC control nodes. Gestures remote control retractable operations securely, tracking live radar offset detection limits and heat overload.',
      changelogCN: [
        '新增：支持蓝牙 5.3 硬件防爆强效验证绑定协议',
        '优化：雷达对齐校准偏差警告提示由毫秒级升级为微妙级'
      ],
      changelogEN: [
        'New: Bluetooth 5.3 hardware anti-interference binding protocol integrated',
        'Optimized: Sensor trajectory deviation micro-adjust response lag down to micro-seconds'
      ]
    },
    {
      id: 'SOFT-003',
      nameCN: 'ALTULA 变频自平衡电机微阻调频固件升级包',
      nameEN: 'ALTULA VFD Self-balancing Drive Regulation Firmware Pack',
      version: 'v1.8.4',
      date: '2026-02-12',
      size: '12.8 MB',
      platforms: ['windows', 'linux'],
      descCN: '针对大扭矩变频传动系统控制模块（PLC/芯片）的底层驱动及指令固件更新件。针对高频次的展开合拢动作，优化变频器的动力调频电流波形，在看台拉伸段消除 75Hz-120Hz 钢梁的细微声学共振啸叫。',
      descEN: 'Low-level machinery drive upgrade correcting electromagnetic output curves. Restructure motor current frequency levels to eliminate steel-on-steel high frequency resonance harmonics entirely.',
      changelogCN: [
        '新增：引入“静音自适应柔顺调频”电流包络补偿机制',
        '修复：大纵深大级数重型看台在末段阻力过大导致的电磁啸叫'
      ],
      changelogEN: [
        'New: Self-adaptive current compensation dynamic wave introduced',
        'Fixed: End-phase friction drag noise for extreme multi-tier systems resolved'
      ]
    }
  ];

  const handleDownload = (id: string) => {
    if (downloadingId) return;
    setDownloadingId(id);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadingId(null);
            setInstalledIds(current => [...current, id]);
          }, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'windows':
      case 'macos':
      case 'linux':
        return <Laptop className="w-3.5 h-3.5" />;
      case 'android':
      case 'ios':
        return <Smartphone className="w-3.5 h-3.5" />;
      default:
        return <Terminal className="w-3.5 h-3.5" />;
    }
  };

  const filteredSoftwares = softwares.filter(soft => {
    const name = language === 'CN' ? soft.nameCN : soft.nameEN;
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="pt-28 pb-16 bg-brand-light min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Page Hero Header */}
        <div className="border-b border-gray-200 pb-10 mb-12 text-center md:text-left md:flex md:items-center md:justify-between">
          <div>
            <span className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
              {language === 'CN' ? '官方正版控制软件与工具集' : 'ALTULA SPATIAL CAD & FIRMWARE SUITES'}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tight mb-2">
              {language === 'CN' ? '软件下载中心' : 'Software Downloads'}
            </h1>
            <p className="text-gray-500 font-light text-sm max-w-xl">
              {language === 'CN'
                ? '下载官方正下载官方正版软件、智能遥控 APP 以及最新固件升级包。'
                : 'Acquire precise architectural CAD modeling modules and remote console applications.'}
            </p>
          </div>
          <div className="relative mt-6 md:mt-0 w-full md:w-80">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder={language === 'CN' ? '输入名称快速检索插件...' : 'Search softwares...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 focus:border-brand-gold focus:outline-none rounded-full pl-10 pr-4 py-2.5 text-xs font-semibold shadow-luxury"
            />
          </div>
        </div>

        {/* Central Grid layout cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredSoftwares.length === 0 ? (
            <div className="lg:col-span-2 bg-white rounded-[2rem] border border-gray-100 shadow-luxury py-16 text-center">
              <Cpu className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400 text-sm font-light">
                {language === 'CN' ? '无匹配的内容' : 'No software matching query found.'}
              </p>
            </div>
          ) : (
            filteredSoftwares.map((soft) => {
              const isDownloading = downloadingId === soft.id;
              const isInstalled = installedIds.includes(soft.id);
              
              return (
                <div
                  key={soft.id}
                  className="bg-white rounded-[2rem] border border-gray-100 shadow-luxury p-8 flex flex-col justify-between gap-6 hover:border-brand-gold/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="space-y-4">
                    
                    {/* Header: Title version date info */}
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="bg-brand-gold/10 text-brand-gold text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 rounded border border-brand-gold/15">
                            {soft.version}
                          </span>
                          <span className="text-[10px] font-mono text-gray-400 font-medium font-mono">
                            {language === 'CN' ? '发布：' : 'Released: '}{soft.date}
                          </span>
                        </div>
                        <h3 className="text-lg font-black text-brand-dark tracking-tight leading-snug">
                          {language === 'CN' ? soft.nameCN : soft.nameEN}
                        </h3>
                      </div>
                      
                      {/* Platform icons */}
                      <div className="flex gap-1">
                        {soft.platforms.map((plat) => (
                          <span
                            key={plat}
                            className="w-6 h-6 rounded bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 uppercase text-[9px] font-bold"
                            title={plat}
                          >
                            {getPlatformIcon(plat)}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Paragraph description body */}
                    <p className="text-xs text-gray-500 font-light leading-relaxed">
                      {language === 'CN' ? soft.descCN : soft.descEN}
                    </p>

                    {/* Nested Changlog block */}
                    <div className="p-4 bg-brand-light/60 rounded-2xl border border-gray-50 space-y-2">
                      <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                        {language === 'CN' ? '最近版本迭代要点' : 'Latest Release Highlights'}
                      </h4>
                      <ul className="text-xs font-medium text-brand-dark space-y-1 pl-4 list-disc marker:text-brand-gold/60">
                        {(language === 'CN' ? soft.changelogCN : soft.changelogEN).map((log, index) => (
                          <li key={index}>{log}</li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Actions Area */}
                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-50">
                    <span className="text-xs font-mono font-bold text-gray-400">
                      {language === 'CN' ? '归档体积: ' : 'Archive Size: '}<strong className="text-brand-dark font-black">{soft.size}</strong>
                    </span>

                    {isInstalled ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-5 py-2.5 rounded-full leading-none">
                        <CheckCircle className="w-3.5 h-3.5" />
                        {language === 'CN' ? '下载完毕' : 'Downloaded'}
                      </span>
                    ) : isDownloading ? (
                      <div className="w-32 space-y-1">
                        <div className="flex justify-between text-[9px] font-mono text-brand-gold font-bold">
                          <span>DOWNLOADING</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-brand-gold transition-all duration-150"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleDownload(soft.id)}
                        className="inline-flex items-center gap-1.5 bg-brand-gold hover:bg-[#B3966D] text-white text-xs font-bold leading-none px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer shrink-0"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{language === 'CN' ? '下载软件包' : 'Download Bundle'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
