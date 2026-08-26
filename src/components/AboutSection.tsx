import React from 'react';
import { Testimonial, SiteConfig } from '../types';
import { BookOpen, Award, GraduationCap, Star, Quote, CheckCircle2, HeartHandshake, Mic } from 'lucide-react';

interface AboutSectionProps {
  config: SiteConfig;
  testimonials: Testimonial[];
}

export const AboutSection: React.FC<AboutSectionProps> = ({ config, testimonials }) => {
  const milestones = [
    {
      year: '۱۳۹۲ - ۱۳۹۵',
      title: 'تحصیل در رشته زبان‌شناسی و آغاز پژوهش‌های بین‌رشته‌ای',
      description: 'ورود به دنیای آواشناسی، روان‌شناسی زبان و بررسی ساختارهای شناختی پشت تولید کلام در مغز انسان.',
    },
    {
      year: '۱۳۹۶ - ۱۳۹۹',
      title: 'اجرای برنامه‌های تخصصی صدا و گویندگی',
      description: 'همکاری با رادیو و رسانه‌های معتبر به عنوان گوینده و کارشناس مجری در برنامه‌های علمی-فرهنگی.',
    },
    {
      year: '۱۴۰۰ - ۱۴۰۲',
      title: 'راه‌اندازی پادکست «ذهن و کلام» و برگزاری دوره‌های ملی',
      description: 'انتشار بیش از ۶۰ قسمت پادکست تخصصی و آموزش به بیش از ۴۰ هزار دانشجو و مدیر در سراسر ایران.',
    },
    {
      year: '۱۴۰۳ - تاکنون',
      title: 'تالیف کتابچه و توسعه فریم‌ورک «معماری کلام شناختی»',
      description: 'تدوین متدولوژی نوین تلفیق علوم اعصاب کاربردی با فن بیان و ارتباطات کاری موفق.',
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-[#F5F0E9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Grid: Story & Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Story Column */}
          <div className="lg:col-span-6 space-y-6 text-right">
            <div className="inline-flex items-center gap-2 bg-[#D9CBC2]/60 text-[#002147] px-4 py-1.5 rounded-full text-xs font-bold border border-[#3C507D]/20">
              <BookOpen className="w-4 h-4 text-[#3C507D]" />
              <span>داستان و فلسفه فکری ایلیا احمدی</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#002147] tracking-tight">
              «کلام ما، آیینه شفافی از معماری ذهن ماست»
            </h2>

            <p className="text-base text-[#112250] leading-relaxed font-normal">
              من باور دارم که هیچ سخنور مادرزادی وجود ندارد. همان‌طور که عضلات بدن با تمرین پرورش می‌یابند، شبکه عصبی کلام و اعتمادبه‌نفس گفتاری نیز با تمرین‌های علمی عصب‌شناختی قابل بازسازی است.
            </p>

            <p className="text-sm text-[#3C507D] leading-relaxed font-light">
              در طول ۱۰ سال گذشته، رسالت من ساختن پلی بین یافته‌های پیچیده علوم شناختی (Cognitive Science) و تکنیک‌های ساده و ملموس روزمره بوده است تا هر فرد بتواند افکار عمیق خود را با شفافیت و نفوذ بیان کند.
            </p>

            {/* Core Values / Pillar boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/80 border border-[#D9CBC2]">
                <div className="w-8 h-8 rounded-xl bg-[#002147] text-[#E0C58F] flex items-center justify-center font-bold mb-2">
                  ۱
                </div>
                <h4 className="font-bold text-[#002147] text-sm mb-1">داده‌محور و علمی</h4>
                <p className="text-xs text-[#3C507D]">دوری از شعارهای انگیزش زرد و اتکا به علوم اعصاب کلام.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/80 border border-[#D9CBC2]">
                <div className="w-8 h-8 rounded-xl bg-[#002147] text-[#E0C58F] flex items-center justify-center font-bold mb-2">
                  ۲
                </div>
                <h4 className="font-bold text-[#002147] text-sm mb-1">تمرین‌محور و کاربردی</h4>
                <p className="text-xs text-[#3C507D]">ارائه تمرین‌های روزانه ۲ دقیقه‌ای برای خروجی ملموس.</p>
              </div>
            </div>

          </div>

          {/* Timeline Column */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#D9CBC2] shadow-sm">
            <h3 className="text-xl font-black text-[#002147] mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#E0C58F]" />
              <span>خط زمانی و دستاوردها</span>
            </h3>

            <div className="space-y-6 relative border-r-2 border-[#D9CBC2] pr-6 mr-2">
              {milestones.map((item, idx) => (
                <div key={idx} className="relative group text-right">
                  {/* Timeline Dot */}
                  <div className="absolute -right-[31px] top-1 w-4 h-4 rounded-full bg-[#002147] border-2 border-white group-hover:bg-[#E0C58F] transition-colors" />

                  <span className="text-xs font-bold text-[#E0C58F] bg-[#002147] px-2.5 py-0.5 rounded-md inline-block mb-1">
                    {item.year}
                  </span>

                  <h4 className="text-base font-extrabold text-[#002147] mb-1">
                    {item.title}
                  </h4>

                  <p className="text-xs text-[#3C507D] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Social Proof & Student Testimonials Grid */}
        <div className="pt-8 border-t border-[#D9CBC2]">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 text-[#3C507D] text-xs font-bold">
              <HeartHandshake className="w-4 h-4 text-[#E0C58F]" />
              <span>نظرات واقعی شرکت‌کنندگان</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#002147]">
              تجربه دانش‌پژوهان دوره‌ها
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white p-6 rounded-3xl border border-[#D9CBC2] shadow-sm flex flex-col justify-between text-right relative"
              >
                <Quote className="w-8 h-8 text-[#D9CBC2]/60 absolute top-4 left-4" />

                <div className="space-y-3 relative z-10">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-[#112250] leading-relaxed font-normal">
                    «{t.comment}»
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F5F0E9] flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-[#E0C58F]"
                  />
                  <div>
                    <span className="font-bold text-xs text-[#002147] block">{t.name}</span>
                    <span className="text-[11px] text-[#3C507D]">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
