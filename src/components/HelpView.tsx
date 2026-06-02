import React, { useState } from 'react';
import { Search, HelpCircle, FileText, Download, Play, CheckCircle, Video, BookOpen, AlertCircle, RefreshCw, X, Eye } from 'lucide-react';

interface HelpViewProps {
  onNavigate: (page: string, params?: any) => void;
  language: 'CN' | 'EN';
}

interface DocumentItem {
  id: string;
  nameCN: string;
  nameEN: string;
  size: string;
  type: 'pdf' | 'zip' | 'mp4';
}

interface VideoTutorialItem {
  id: string;
  titleCN: string;
  titleEN: string;
  duration: string;
  size: string;
  thumbnail: string;
  descCN: string;
  descEN: string;
}

export default function HelpView({ onNavigate, language }: HelpViewProps) {
  const [activeTab, setActiveTab] = useState<'installation' | 'troubleshooting' | 'videos' | 'technical'>('installation');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive simulator states
  const [downloadingFileId, setDownloadingFileId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadedFiles, setDownloadedFiles] = useState<string[]>([]);
  const [activeVideo, setActiveVideo] = useState<VideoTutorialItem | null>(null);

  // Document datasets
  const documents: { [key: string]: DocumentItem[] } = {
    installation: [
      {
        id: 'INST-001',
        nameCN: 'ALTULA 柔性变频系列看台基础钢轨道定位与预埋技术规范.pdf',
        nameEN: 'ALTULA Flexible VFD Seating Steel Track Alignment & Pre-embedding Spec.pdf',
        size: '8.4 MB',
        type: 'pdf'
      },
      {
        id: 'INST-002',
        nameCN: 'Wellgo 维格伸缩看台拉伸阻尼限位器精确装配图册 v3.2.pdf',
        nameEN: 'Wellgo Retractable Seating Extender Limit Dampener Assembly Atlas v3.2.pdf',
        size: '15.2 MB',
        type: 'pdf'
      },
      {
        id: 'INST-003',
        nameCN: 'concepto 弧形多合一智能座椅模块化配线与强电连锁控制规程.pdf',
        nameEN: 'concepto Curved Smart Seating Integrated Wiring & Dual-chain Lock Manual.pdf',
        size: '4.8 MB',
        type: 'pdf'
      }
    ],
    troubleshooting: [
      {
        id: 'TROUB-301',
        nameCN: '微阻变频算法核心反馈错误码码库：0x0F4-轨迹侧向偏转自诊断调校手册.pdf',
        nameEN: 'VFD Core Feedback Code Library: 0x0F4-Lateral Swerve Troubleshooting Handbook.pdf',
        size: '3.2 MB',
        type: 'pdf'
      },
      {
        id: 'TROUB-302',
        nameCN: '红外有源防撞激光测距仪零位校准与零位失效快速重置规程.pdf',
        nameEN: 'Active Laser Collision Distance Sensor Alignment & Recalibrating Standard.pdf',
        size: '5.6 MB',
        type: 'pdf'
      },
      {
        id: 'TROUB-303',
        nameCN: '静音自平衡高扭矩传动电机运行发热与声学谐振异常分析指南.pdf',
        nameEN: 'Acoustic Resonance & Heat Dissipation Excess Analysis for Heavy Duty Drive Motors.pdf',
        size: '6.1 MB',
        type: 'pdf'
      }
    ],
    technical: [
      {
        id: 'TECH-501',
        nameCN: 'ALTULA 建筑学重载等级看台钢结构拉弯载荷力学分析白皮书 - 甲级甲等标.pdf',
        nameEN: 'ALTULA Structural Architecture Heavy Seating Elastic Load-Bearing Whitepaper.pdf',
        size: '22.4 MB',
        type: 'pdf'
      },
      {
        id: 'TECH-502',
        nameCN: '极简高定看台材料声学测试：环保阻尼消噪复合高密度吸声棉测试报告.pdf',
        nameEN: 'Premium High-density Acoustic Dampening Foam Physical Testing Lab Report.pdf',
        size: '18.1 MB',
        type: 'pdf'
      },
      {
        id: 'TECH-503',
        nameCN: 'ALTULA 3D CAD/BIM 建筑立面一体化座位排布参数化建模通用接口 ZIP.zip',
        nameEN: 'ALTULA 3D CAD/BIM Architectural General Seating Integrated Library ZIP.zip',
        size: '48.5 MB',
        type: 'zip'
      }
    ]
  };

  const videos: VideoTutorialItem[] = [
    {
      id: 'VID-101',
      titleCN: '看台展开实况工艺：维格 retractable 伸缩看台流畅一键收展演示',
      titleEN: 'Smooth Automatic Deployment: Wellgo retractable Seating One-Button Run',
      duration: '12:45',
      size: '124 MB',
      thumbnail: 'https://img-reg-ab.imagency.cn/e/5431c65a2723060f74ade4532238287b.webp',
      descCN: '三维透视动画结合实景拍摄，全方位解析自平衡自校准消噪阻尼在运行时的力学协同机制。',
      descEN: 'Combine 3D transparent dynamics and actual theater capture to evaluate acoustic insulation rings in real-time.'
    },
    {
      id: 'VID-102',
      titleCN: '精装调试：ALTULA 独家静音自平衡消噪复合阻尼垫片配搭教学',
      titleEN: 'Precision Tuning: ALTULA Acoustic Self-balancing Elastomer Rings Setting',
      duration: '08:30',
      size: '86 MB',
      thumbnail: 'https://img-reg-ab.imagency.cn/e/13cdbba98ab5389c3943bb33868f153d.jpg',
      descCN: '由ALTULA首席结构工程师录制，深度演示大扭矩消噪底座如何通过2.5mm精密垫片阻断音腔共振。',
      descEN: 'Presented by Senior Architectural Architect outlining key vibration control parameters and spacing setup.'
    }
  ];

  // Filters logic
  const getFilteredDocs = () => {
    if (activeTab === 'videos') return [];
    const currentList = documents[activeTab] || [];
    return currentList.filter(doc => {
      const name = language === 'CN' ? doc.nameCN : doc.nameEN;
      return name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  };

  const getFilteredVideos = () => {
    if (activeTab !== 'videos') return [];
    return videos.filter(video => {
      const title = language === 'CN' ? video.titleCN : video.titleEN;
      return title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  };

  // Realistic Interactive download simulation
  const handleDownload = (id: string) => {
    if (downloadingFileId) return;
    setDownloadingFileId(id);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadingFileId(null);
            setDownloadedFiles(current => [...current, id]);
          }, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="pt-28 pb-16 bg-brand-light min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Page Hero Header */}
        <div className="border-b border-gray-200 pb-10 mb-12 text-center md:text-left md:flex md:items-center md:justify-between">
          <div>
            <span className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
              {language === 'CN' ? '技术支持与运维知识库' : 'ENGINEERING ACADEMY & RESOURCES'}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tight mb-2">
              {language === 'CN' ? '帮助文档与支持中心' : 'Support & Technical Deck'}
            </h1>
            <p className="text-gray-500 font-light text-sm max-w-xl">
              {language === 'CN'
                ? '下载官方精准安装图纸、故障排查手册、产品规格书等。'
                : 'Acquire precise specifications layouts, BIM connectors model packets, and troubleshooting guides.'}
            </p>
          </div>
          <div className="relative mt-6 md:mt-0 w-full md:w-80">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder={language === 'CN' ? '在知识库中搜索技术词...' : 'Search resources...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 focus:border-brand-gold focus:outline-none rounded-full pl-10 pr-4 py-2.5 text-xs font-semibold shadow-luxury"
            />
          </div>
        </div>

        {/* Tab Selection Row */}
        <div className="flex border-b border-gray-200 mb-10 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => { setActiveTab('installation'); setSearchQuery(''); }}
            className={`py-4 px-6 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'installation'
                ? 'border-brand-gold text-brand-gold'
                : 'border-transparent text-gray-500 hover:text-brand-dark hover:border-gray-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            {language === 'CN' ? '安装教程' : 'Installation Guides'}
          </button>
          <button
            onClick={() => { setActiveTab('troubleshooting'); setSearchQuery(''); }}
            className={`py-4 px-6 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'troubleshooting'
                ? 'border-brand-gold text-brand-gold'
                : 'border-transparent text-gray-500 hover:text-brand-dark hover:border-gray-200'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            {language === 'CN' ? '问题排错' : 'Troubleshooting'}
          </button>
          <button
            onClick={() => { setActiveTab('videos'); setSearchQuery(''); }}
            className={`py-4 px-6 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'videos'
                ? 'border-brand-gold text-brand-gold'
                : 'border-transparent text-gray-500 hover:text-brand-dark hover:border-gray-200'
            }`}
          >
            <Video className="w-4 h-4" />
            {language === 'CN' ? '视频教程' : 'Video Tutorials'}
          </button>
          <button
            onClick={() => { setActiveTab('technical'); setSearchQuery(''); }}
            className={`py-4 px-6 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'technical'
                ? 'border-brand-gold text-brand-gold'
                : 'border-transparent text-gray-500 hover:text-brand-dark hover:border-gray-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            {language === 'CN' ? '技术文档' : 'Technical Papers'}
          </button>
        </div>

        {/* Content Body Pane Section */}
        {activeTab !== 'videos' ? (
          
          /* Documents Standard List View */
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-luxury overflow-hidden">
            <div className="p-5 bg-gray-50/60 border-b border-gray-100 hidden md:grid grid-cols-12 text-xs font-bold text-gray-400 uppercase tracking-wider">
              <div className="col-span-8 px-4">{language === 'CN' ? '文档名和类型' : 'Documentation Header'}</div>
              <div className="col-span-2 text-center">{language === 'CN' ? '文件体积' : 'File Size'}</div>
              <div className="col-span-2 text-right px-4">{language === 'CN' ? '操作' : 'Action'}</div>
            </div>

            <div className="divide-y divide-gray-100">
              {getFilteredDocs().length === 0 ? (
                <div className="p-16 text-center text-gray-400">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-sm">{language === 'CN' ? '无匹配的内容' : 'No items matching query found.'}</p>
                </div>
              ) : (
                getFilteredDocs().map((doc) => {
                  const isDownloading = downloadingFileId === doc.id;
                  const isFinished = downloadedFiles.includes(doc.id);
                  
                  return (
                    <div key={doc.id} className="p-6 md:p-5 grid grid-cols-1 md:grid-cols-12 items-center gap-4 hover:bg-stone-50/40 transition-colors">
                      
                      {/* Document Details column */}
                      <div className="col-span-1 md:col-span-8 flex items-start gap-4">
                        <span className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/15 flex items-center justify-center text-brand-gold shrink-0">
                          <FileText className="w-5 h-5" />
                        </span>
                        <div className="space-y-0.5">
                          <h4 className="text-sm font-bold text-brand-dark leading-snug">
                            {language === 'CN' ? doc.nameCN : doc.nameEN}
                          </h4>
                          <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-stone-400">
                            ID: {doc.id} • {doc.type}
                          </span>
                        </div>
                      </div>

                      {/* File Volume Size column */}
                      <div className="col-span-1 md:col-span-2 text-left md:text-center">
                        <span className="text-[10px] md:hidden font-bold text-gray-400 uppercase mr-1">{language === 'CN' ? '体积：' : 'Size: '}</span>
                        <span className="text-xs font-mono font-medium text-brand-dark">{doc.size}</span>
                      </div>

                      {/* Interactive download action trigger */}
                      <div className="col-span-1 md:col-span-2 text-right">
                        {isFinished ? (
                          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full leading-none">
                            <CheckCircle className="w-3.5 h-3.5" />
                            {language === 'CN' ? '已下至本地' : 'Ready'}
                          </span>
                        ) : isDownloading ? (
                          <div className="w-full md:max-w-[120px] ml-auto space-y-1 text-right">
                            <div className="flex justify-between items-center text-[9px] font-mono font-bold text-brand-gold leading-none">
                              <span>DOWNLOADING</span>
                              <span>{downloadProgress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-brand-gold transition-all duration-150"
                                style={{ width: `${downloadProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleDownload(doc.id)}
                            className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 bg-brand-dark hover:bg-black text-white text-xs font-bold leading-none px-5 py-2.5 rounded-full transition-colors cursor-pointer border border-brand-dark"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>{language === 'CN' ? '立即下载' : 'Download'}</span>
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })
              )}
            </div>
          </div>
        ) : (
          
          /* Video Tutorials Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {getFilteredVideos().length === 0 ? (
              <div className="md:col-span-2 bg-white rounded-[2rem] border border-gray-100 shadow-luxury py-16 text-center">
                <Video className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400 text-sm font-light">{language === 'CN' ? '无匹配的内容' : 'No items found'}</p>
              </div>
            ) : (
              getFilteredVideos().map((vid) => (
                <div
                  key={vid.id}
                  className="bg-white rounded-3xl border border-gray-100 shadow-luxury overflow-hidden group hover:border-brand-gold/40 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Photo thumbnail overlay banner with a huge floating play indicator */}
                  <div className="aspect-[16/9] relative bg-stone-100 overflow-hidden cursor-pointer" onClick={() => setActiveVideo(vid)}>
                    <img
                      src={vid.thumbnail}
                      alt={language === 'CN' ? vid.titleCN : vid.titleEN}
                      className="w-full h-full object-cover absolute inset-0 transition-transform duration-[4000ms] group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/35 transition-colors flex items-center justify-center">
                      <span className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md group-hover:bg-brand-gold text-white flex items-center justify-center transition-all duration-300 shadow-xl group-hover:scale-110">
                        <Play className="w-6 h-6 fill-white text-transparent ml-0.5" />
                      </span>
                    </div>
                    
                    {/* Floating pill for video duration metric */}
                    <span className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-white font-bold tracking-wider leading-none shadow">
                      {vid.duration}
                    </span>
                  </div>

                  {/* Descriptions block */}
                  <div className="p-6 md:p-8 space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-mono text-brand-gold font-bold uppercase tracking-wider">
                        <span>ALTULA ACADEMY</span>
                        <span>{vid.size}</span>
                      </div>
                      <h3 className="text-base font-black text-brand-dark tracking-tight leading-snug group-hover:text-brand-gold transition-colors cursor-pointer" onClick={() => setActiveVideo(vid)}>
                        {language === 'CN' ? vid.titleCN : vid.titleEN}
                      </h3>
                      <p className="text-xs text-gray-500 font-light leading-relaxed">
                        {language === 'CN' ? vid.descCN : vid.descEN}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                      <button
                        onClick={() => setActiveVideo(vid)}
                        className="text-xs text-brand-dark font-black hover:text-brand-gold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>{language === 'CN' ? '立即播放教学' : 'Play Tutorial Now'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>

      {/* Cinematic Fullscreen Video Player Simulator Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in animate-duration-300">
          <div className="relative w-full max-w-4xl bg-[#0D0D0D] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            
            {/* Modal header title bar */}
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#151515] text-white">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                <h4 className="text-xs font-bold leading-none select-none tracking-widest text-[#B5BAC1] uppercase">
                  ALTULA DYNAMIC PLAYER - {activeVideo.id}
                </h4>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/15 text-[#B5BAC1] hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Live Video Player screen container */}
            <div className="aspect-[16/9] relative bg-black flex flex-col justify-between p-6">
              <img
                src={activeVideo.thumbnail}
                alt="Cinematic cover"
                className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none select-none filter blur-[1px]"
                referrerPolicy="no-referrer"
              />
              
              {/* Outer top subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 pointer-events-none z-0"></div>

              {/* Float Watermark overlay */}
              <div className="absolute top-6 left-6 z-10 p-2.5 bg-black/40 backdrop-blur-md rounded border border-white/10 font-mono text-[10px] text-brand-gold font-bold select-none leading-none">
                ALTULA LIVE BROADCAST • STREAM_01
              </div>

              {/* Dynamic decorative visual content in center of virtual player screen */}
              <div className="flex-1 flex flex-col items-center justify-center gap-4 z-10 text-white">
                <span className="w-16 h-16 rounded-full bg-brand-gold text-white flex items-center justify-center transition-transform hover:scale-105 shadow-xl shadow-brand-gold/20 cursor-pointer">
                  <Play className="w-7 h-7 fill-white text-transparent ml-1" />
                </span>
                <div className="text-center space-y-1">
                  <h3 className="text-base font-black tracking-tight">{language === 'CN' ? activeVideo.titleCN : activeVideo.titleEN}</h3>
                  <p className="text-[10px] font-medium font-mono text-[#8C929C]">{language === 'CN' ? '正在连接ALTULA云流媒体服务器...' : 'Connecting to ALTULA Streaming Cloud Server node...'}</p>
                </div>
              </div>

              {/* Dark control bar elements */}
              <div className="h-14 bg-black/60 backdrop-blur-md rounded-2xl border border-white/5 px-4 flex items-center justify-between gap-6 z-10 text-[#C1C6CC]">
                <div className="flex items-center gap-4">
                  <button className="text-brand-gold hover:text-white transition-colors cursor-pointer">
                    <Play className="w-4 h-4 fill-brand-gold text-transparent" />
                  </button>
                  <span className="text-[10px] font-mono leading-none tracking-wider text-stone-400">
                    00:00 / {activeVideo.duration}
                  </span>
                </div>
                
                {/* Simulated Seek Line progress bar */}
                <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer relative group">
                  <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-brand-gold rounded-full"></div>
                </div>

                <div className="flex items-center gap-4 text-[10px] font-mono font-bold tracking-widest text-[#8C929C]">
                  <span>HD 1080P</span>
                  <span className="text-brand-gold">H.265</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
