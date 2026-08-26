import React from 'react';
import { Play, ArrowLeft, Mic, Sparkles, Award, Users, BookOpen, CheckCircle2 } from 'lucide-react';
import { SiteConfig } from '../types';

interface HeroProps {
  config: SiteConfig;
  onNavigate: (sectionId: string) => void;
  onPlayFeaturedPodcast: () => void;
  isEditMode: boolean;
  onUpdateConfig: (updated: Partial<SiteConfig>) => void;
}

export const Hero: React.FC<HeroProps> = ({
  config,
  onNavigate,
  onPlayFeaturedPodcast,
  isEditMode,
  onUpdateConfig,
}) => {
  return (
    <section id="hero" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#D2B48C]/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#3C507D]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Right Column: Bio & Taglines (In RTL, this comes first) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-[#D9CBC2]/50 border border-[#3C507D]/20 rounded-full px-4 py-1.5 text-xs font-semibold text-[#002147] shadow-sm">
              <Sparkles className="w-4 h-4 text-[#002147]" />
              <span>مدرس فن بیان، ارتباطات موثر و علوم شناختی</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002147] leading-[1.25] tracking-tight">
              {isEditMode ? (
                <textarea
                  value={config.bioHeadline}
                  onChange={(e) => onUpdateConfig({ bioHeadline: e.target.value })}
                  className="w-full bg-white/80 p-2 rounded border border-[#E0C58F] text-[#002147] focus:outline-none focus:ring-2 focus:ring-[#002147]"
                  rows={3}
                />
              ) : (
                config.bioHeadline
              )}
            </h1>

            {/* Short Bio Paragraphs */}
            <div className="space-y-3 text-base sm:text-lg text-[#112250]/85 font-normal leading-relaxed max-w-2xl">
              <p>
                {isEditMode ? (
                  <textarea
                    value={config.bioParagraph1}
                    onChange={(e) => onUpdateConfig({ bioParagraph1: e.target.value })}
                    className="w-full bg-white/80 p-2 rounded border border-[#E0C58F] text-sm"
                    rows={3}
                  />
                ) : (
                  config.bioParagraph1
                )}
              </p>
              <p className="text-sm sm:text-base text-[#3C507D] font-medium border-r-2 border-[#E0C58F] pr-3 my-2">
                {isEditMode ? (
                  <textarea
                    value={config.bioParagraph2}
                    onChange={(e) => onUpdateConfig({ bioParagraph2: e.target.value })}
                    className="w-full bg-white/80 p-2 rounded border border-[#E0C58F] text-sm"
                    rows={2}
                  />
                ) : (
                  config.bioParagraph2
                )}
              </p>
            </div>

            {/* Highlights bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm font-semibold text-[#002147]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3C507D] shrink-0" />
                <span>فرمولاسیون علمی تسلط بر لحن و صدای رسا</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3C507D] shrink-0" />
                <span>کنترل ترس از سخنرانی با تنظیم سیستم عصبی</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3C507D] shrink-0" />
                <span>هوش کلامی، بداهه‌گویی و حاضرجوابی حرفه‌ای</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3C507D] shrink-0" />
                <span>روان‌شناسی اقناع و تاثیرگذاری مثبت در مذاکره</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('courses')}
                className="bg-[#002147] hover:bg-[#112250] text-[#F5F0E9] font-bold px-7 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-3 group active:scale-95"
              >
                <span>مشاهده دوره‌های آموزشی</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#E0C58F]" />
              </button>

              <button
                onClick={onPlayFeaturedPodcast}
                className="bg-[#E0C58F] hover:bg-[#D2B48C] text-[#002147] font-bold px-6 py-3.5 rounded-2xl shadow-sm hover:shadow transition-all duration-200 flex items-center gap-2.5 active:scale-95"
              >
                <div className="w-7 h-7 rounded-full bg-[#002147] text-[#E0C58F] flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>شنیدن جدیدترین پادکست</span>
              </button>
            </div>

          </div>

          {/* Left Column: Ali Abdaal Style Portrait & Interactive Floating Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Main Portrait Card */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#F5F0E9] bg-[#D9CBC2]/40 group">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80"
                alt="ایلیا احمدی"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Soft Gradient Overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/80 via-transparent to-transparent" />

              {/* Text on Portrait */}
              <div className="absolute bottom-6 right-6 left-6 text-[#F5F0E9] text-right">
                <span className="bg-[#E0C58F] text-[#002147] font-black text-xs px-3 py-1 rounded-full inline-block mb-1">
                  ایلیا احمدی
                </span>
                <p className="text-sm font-semibold text-white/90">
                  مدرس دانشگاه، پادکستر و مشاور ارتباطات
                </p>
              </div>
            </div>

            {/* Floating Podcast Badge Widget (Ali Abdaal signature element) */}
            <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#D9CBC2] max-w-xs flex items-center gap-3 animate-bounce-slow">
              <div className="w-12 h-12 rounded-xl bg-[#002147] text-[#E0C58F] flex items-center justify-center shrink-0 shadow-inner">
                <Mic className="w-6 h-6 animate-pulse" />
              </div>
              <div className="text-right text-xs">
                <span className="font-bold text-[#002147] block text-sm">پادکست «ذهن و کلام»</span>
                <span className="text-[#3C507D]">رتبه ۱ پادکست‌های آموزشی عمومی</span>
              </div>
            </div>

            {/* Top Left Experience Badge */}
            <div className="absolute -top-4 -left-2 sm:-left-6 bg-[#112250] text-[#E0C58F] px-4 py-2.5 rounded-2xl shadow-lg border border-[#3C507D]/40 text-xs font-bold flex items-center gap-2">
              <Award className="w-5 h-5 text-[#E0C58F]" />
              <div>
                <span className="block text-white font-extrabold text-sm">+۱۰ سال</span>
                <span className="text-white/80 text-[11px]">تجربه تدریس و پژوهش</span>
              </div>
            </div>

          </div>

        </div>

        {/* Stats Ticker Bar (Ali Abdaal style social proof ticker) */}
        <div className="mt-16 pt-8 border-t border-[#D9CBC2]/70 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-white/40 border border-[#D9CBC2]/50 hover:bg-white/80 transition-colors">
            <div className="flex justify-center mb-1 text-[#3C507D]">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-[#002147] block">
              {config.stats.students}
            </span>
            <span className="text-xs sm:text-sm text-[#3C507D] font-medium">دانشجوی دوره‌های آموزشی</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/40 border border-[#D9CBC2]/50 hover:bg-white/80 transition-colors">
            <div className="flex justify-center mb-1 text-[#3C507D]">
              <Mic className="w-5 h-5" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-[#002147] block">
              {config.stats.listeners}
            </span>
            <span className="text-xs sm:text-sm text-[#3C507D] font-medium">شنونده ماهانه پادکست</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/40 border border-[#D9CBC2]/50 hover:bg-white/80 transition-colors">
            <div className="flex justify-center mb-1 text-[#3C507D]">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-[#002147] block">
              {config.stats.episodes}
            </span>
            <span className="text-xs sm:text-sm text-[#3C507D] font-medium">قسمت پادکست منتشرشده</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/40 border border-[#D9CBC2]/50 hover:bg-white/80 transition-colors">
            <div className="flex justify-center mb-1 text-[#3C507D]">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-[#002147] block">
              ۹۹.۲٪
            </span>
            <span className="text-xs sm:text-sm text-[#3C507D] font-medium">رضایت شرکت‌کنندگان</span>
          </div>
        </div>

      </div>
    </section>
  );
};
