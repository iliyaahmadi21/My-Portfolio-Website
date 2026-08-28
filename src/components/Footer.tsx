import React from 'react';
import { SiteConfig } from '../types';
import { Instagram, Send, Youtube, Linkedin, Mic, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  config: SiteConfig;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#002147] text-[#F5F0E9] pt-16 pb-12 border-t border-[#3C507D]/40 text-right dir-rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#3C507D]/40">
          
          {/* Brand & Bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E0C58F] text-[#002147] flex items-center justify-center font-bold text-lg">
                ا‌ا
              </div>
              <span className="font-black text-2xl text-white tracking-tight">
                {config.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#D9CBC2] font-light leading-relaxed max-w-md">
              پلتفرم آموزشی تخصصی فن بیان، ارتباطات موثر و علوم شناختی. هدف ما ارتقای فرهنگ گفتاری و کمک به افراد برای کشف قدرت کلام و تاثیرگذاری بر ذهن مخاطب است.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={config.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#112250] hover:bg-[#E0C58F] hover:text-[#002147] text-[#E0C58F] flex items-center justify-center transition border border-[#3C507D]/40"
                title="اینستاگرام"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={config.socialLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#112250] hover:bg-[#E0C58F] hover:text-[#002147] text-[#E0C58F] flex items-center justify-center transition border border-[#3C507D]/40"
                title="تلگرام"
              >
                <Send className="w-4 h-4" />
              </a>

              <a
                href={config.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#112250] hover:bg-[#E0C58F] hover:text-[#002147] text-[#E0C58F] flex items-center justify-center transition border border-[#3C507D]/40"
                title="یوتیوب"
              >
                <Youtube className="w-4 h-4" />
              </a>

              <a
                href={config.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#112250] hover:bg-[#E0C58F] hover:text-[#002147] text-[#E0C58F] flex items-center justify-center transition border border-[#3C507D]/40"
                title="لینکدین"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold text-[#E0C58F] border-b border-[#3C507D]/40 pb-2">
              دسترسی سریع
            </h4>
            <ul className="space-y-2 text-xs text-[#D9CBC2]">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-white transition">
                  صفحه اصلی
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('consultation')} className="hover:text-white transition">
                  رزرو مشاوره اختصاصی
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('podcast')} className="hover:text-white transition">
                  پادکست ذهن و کلام
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-white transition">
                  دوره‌های آموزشی
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('articles')} className="hover:text-white transition">
                  مقالات و یادداشت‌ها
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition">
                  درباره ایلیا احمدی
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-extrabold text-[#E0C58F] border-b border-[#3C507D]/40 pb-2">
              ارتباط و پشتیبانی
            </h4>
            <p className="text-xs text-[#D9CBC2] leading-relaxed">
              جهت هماهنگی کارگاه‌های سازمانی، مشاوره اختصاصی سخنرانی و دعوت به سمینارها می‌توانید از طریق ایمیل یا تلگرام پیام دهید.
            </p>
            <div className="text-xs font-mono text-[#E0C58F] dir-ltr text-right">
              info@iliyaahmadi.ir
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D9CBC2]/80">
          <div>
            © {new Date().getFullYear()} تمامی حقوق مادی و معنوی متعلق به وب‌سایت <span className="text-[#E0C58F] font-bold">ایلیا احمدی</span> است.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 bg-[#112250] hover:bg-[#3C507D] text-[#E0C58F] px-3.5 py-2 rounded-xl text-xs font-bold transition border border-[#3C507D]/40"
          >
            <span>بازگشت به بالای صفحه</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
