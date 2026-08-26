import React, { useState } from 'react';
import { Mail, Send, CheckCircle, Download, Sparkles, ShieldCheck } from 'lucide-react';
import { SiteConfig } from '../types';

interface NewsletterBannerProps {
  config: SiteConfig;
  onSubscribe: (email: string, name?: string) => void;
}

export const NewsletterBanner: React.FC<NewsletterBannerProps> = ({ config, onSubscribe }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onSubscribe(email, name);
    setSubmitted(true);
  };

  return (
    <section id="newsletter" className="py-16 md:py-20 bg-[#112250] text-[#F5F0E9] relative overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#002147] rounded-full blur-3xl pointer-events-none opacity-60" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E0C58F]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="bg-[#002147] rounded-3xl p-8 sm:p-12 border border-[#3C507D]/60 shadow-2xl text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 bg-[#E0C58F] text-[#002147] px-4 py-1.5 rounded-full text-xs font-black shadow">
            <Sparkles className="w-4 h-4" />
            <span>هدیه ویژه عضویت</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            {config.emailNewsletterTitle}
          </h2>

          <p className="text-sm sm:text-base text-[#D9CBC2] max-w-2xl mx-auto font-light leading-relaxed">
            {config.emailNewsletterSubtitle}
          </p>

          {/* Giveaway Badge Box */}
          <div className="inline-flex items-center gap-3 bg-[#112250] border border-[#3C507D] px-4 py-2.5 rounded-2xl text-xs text-[#E0C58F] font-semibold">
            <Download className="w-4 h-4 animate-bounce text-[#E0C58F]" />
            <span>همراه با دانلود فوری PDF کتابچه «۷ اصل طلایی نفوذ کلام در مذاکرات»</span>
          </div>

          {/* Form / Success State */}
          {submitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/40 p-6 rounded-2xl max-w-lg mx-auto space-y-2 text-center text-emerald-300 animate-fadeIn">
              <CheckCircle className="w-10 h-10 mx-auto text-emerald-400" />
              <h3 className="font-extrabold text-base text-white">خوش آمدید! عضویت شما ثبت شد.</h3>
              <p className="text-xs font-light text-emerald-200">
                لینک دانلود کتابچه به همراه ایمیل تایید ارسال گردید. به جمع شنوندگان نخبه‌ی ما خوش آمدید!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="نام شما (اختیاری)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#112250] text-white placeholder-[#3C507D] px-4 py-3 rounded-2xl text-xs border border-[#3C507D] focus:outline-none focus:border-[#E0C58F] text-right"
                />

                <input
                  type="email"
                  required
                  placeholder="ایمیل شما (مثلا: name@example.com)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#112250] text-white placeholder-[#3C507D] px-4 py-3 rounded-2xl text-xs border border-[#3C507D] focus:outline-none focus:border-[#E0C58F] text-right dir-ltr"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#E0C58F] hover:bg-[#D2B48C] text-[#002147] font-black py-3.5 px-6 rounded-2xl text-sm transition-all duration-200 shadow-lg flex items-center justify-center gap-2 active:scale-98"
              >
                <span>عضویت رایگان و دریافت لینک دانلود</span>
                <Send className="w-4 h-4 ml-1 fill-current" />
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-2 text-xs text-[#3C507D] pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>اطلاعات شما ۱۰۰٪ محفوظ است. اسپم ارسال نمی‌شود.</span>
          </div>

        </div>

      </div>
    </section>
  );
};
