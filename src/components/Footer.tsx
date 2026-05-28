import React from 'react';
import { Mail, Phone, MapPin, Printer, Facebook, Linkedin, Twitter, Instagram, Youtube, Music } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, params?: any) => void;
  language: 'CN' | 'EN';
}

export default function Footer({ onNavigate, language }: FooterProps) {
  const handleLinkClick = (page: string, e: React.MouseEvent, params?: any) => {
    e.preventDefault();
    onNavigate(page, params);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <footer id="contact" className="bg-[#111315] pt-24 pb-10 border-t border-white/5 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-12 lg:gap-8 mb-20">
          <div className="sm:col-span-2 lg:col-span-2 lg:pr-10">
            <div className="flex items-center mb-6">
              <img
                src="https://img-reg-ab.imagency.cn/e/eba0d9454fb1aeaa74d4b3276669c01c.png"
                alt="ALTULA Logo"
                className="h-5 md:h-6 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert"
              />
            </div>
            <p className="text-gray-500 text-sm font-light leading-relaxed">
              {language === 'CN'
                ? '专注于商业空间活动看台的一站式高端定制与整体解决方案。让物理空间拥有灵活切换的能力。'
                : 'Focusing on high-end customization and overall solutions for commercial space event stands.'}
            </p>
          </div>

          <div className="lg:col-span-1">
            <h5 className="text-white font-semibold mb-6 tracking-wide text-sm">
              {language === 'CN' ? '核心产品' : 'Products'}
            </h5>
            <ul className="space-y-4 text-sm font-light">
              <li>
                <a
                  href="#"
                  onClick={(e) => handleLinkClick('product-detail', e, { id: 'retractable' })}
                  className="hover:text-brand-gold transition-colors"
                >
                  {language === 'CN' ? '伸缩活动看台' : 'Retractable Stands'}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => handleLinkClick('product-detail', e, { id: 'public' })}
                  className="hover:text-brand-gold transition-colors"
                >
                  {language === 'CN' ? '公共坐席看台' : 'Public Seating'}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h5 className="text-white font-semibold mb-6 tracking-wide text-sm">
              {language === 'CN' ? '探索方案' : 'Explore'}
            </h5>
            <ul className="space-y-4 text-sm font-light">
              <li>
                <a
                  href="#"
                  onClick={(e) => handleLinkClick('cases', e)}
                  className="hover:text-brand-gold transition-colors"
                >
                  {language === 'CN' ? '应用场景' : 'Applications'}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => handleLinkClick('tech', e)}
                  className="hover:text-brand-gold transition-colors"
                >
                  {language === 'CN' ? '特色技术' : 'Acoustic Tech'}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => handleLinkClick('configurator', e)}
                  className="hover:text-brand-gold transition-colors"
                >
                  {language === 'CN' ? '配置方案' : 'Online Configurator'}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h5 className="text-white font-semibold mb-6 tracking-wide text-sm">
              {language === 'CN' ? '品牌动态' : 'Company'}
            </h5>
            <ul className="space-y-4 text-sm font-light">
              <li>
                <a
                  href="#"
                  onClick={(e) => handleLinkClick('home', e)}
                  className="hover:text-brand-gold transition-colors"
                >
                  {language === 'CN' ? '关于ALTULA' : 'About Us'}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => handleLinkClick('news', e)}
                  className="hover:text-brand-gold transition-colors"
                >
                  {language === 'CN' ? '资讯中心' : 'News Center'}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => handleLinkClick('contact', e)}
                  className="hover:text-brand-gold transition-colors"
                >
                  {language === 'CN' ? '联系我们' : 'Contact Us'}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 lg:pl-4">
            <h5 className="text-white font-semibold mb-6 tracking-wide text-sm">
              {language === 'CN' ? '品牌联络' : 'Contact'}
            </h5>
            <ul className="space-y-4 text-sm font-light text-gray-500">
              <li className="flex flex-col gap-1">
                <span className="text-gray-400 text-xs flex items-center gap-1.5 font-medium">
                  <Phone className="w-3.5 h-3.5 text-brand-gold" />
                  {language === 'CN' ? '全国销售热线：' : 'Sales Hotline:'}
                </span>
                <span className="text-white text-base font-semibold">400 618 1848</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-gray-400 text-xs flex items-center gap-1.5 font-medium">
                  <Mail className="w-3.5 h-3.5 text-brand-gold" />
                  {language === 'CN' ? '企业电子信箱：' : 'Corporate Email:'}
                </span>
                <a href="mailto:market@avant.com.cn" className="text-white hover:text-brand-gold transition-colors">
                  market@avant.com.cn
                </a>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-gray-400 text-xs flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                  {language === 'CN' ? '深圳总部基地：' : 'HQ Base:'}
                </span>
                <span className="text-gray-300 leading-relaxed text-xs">
                  {language === 'CN'
                    ? '广东省 · 深圳市 · 宝安区 · 石岩洲石路 领先工业园'
                    : 'Avant Industrial Park, Baoan District, Shenzhen, China'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-gray-600">
          <p>
            &copy; 2026 ALTULA Space Solutions. All Rights Reserved. {' '}
            {language === 'CN' ? '领先体育高端子品牌' : 'A Premium Brand of Avant Sports.'}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-brand-gold transition-colors duration-300"
                title="Facebook"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-brand-gold transition-colors duration-300"
                title="LinkedIn"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-brand-gold transition-colors duration-300"
                title="Twitter"
              >
                <Twitter className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-brand-gold transition-colors duration-300"
                title="Instagram"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-brand-gold transition-colors duration-300"
                title="YouTube"
              >
                <Youtube className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-brand-gold transition-colors duration-300"
                title="TikTok"
              >
                <Music className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
