import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, CheckCircle2, ShieldCheck, Video, Sparkles, MessageSquare, CreditCard, ArrowLeft, AlertCircle } from 'lucide-react';
import { ConsultationOption } from '../types';

const CONSULTATION_OPTIONS: ConsultationOption[] = [
  {
    id: 'voice-speech',
    title: 'مشاوره تحلیل لحن و فن بیان',
    topic: 'تحلیل نوسان صدا، تکنیک‌های کنترل استرس سخنرانی و تقویت تنفس',
    duration: '۴۵ دقیقه',
    price: '۱,۸۰۰,۰۰۰ تومان',
    rawPrice: 1800000,
    format: 'آنلاین (تصویر و صدا)',
    description: 'مناسب برای افرادی که می‌خواهند لحن صحبت، وضوح کلام و اعتمادبه‌نفس خود را در جلسات کاری و سخنرانی صادر کنند.',
    features: [
      'آنلاین (تصویر و صدا در سیستم اختصاصی)',
      'ارائه فایل صوتی ضبط شده جلسه',
      'چک‌لیست تمرین‌های روزانه تقویت صدا'
    ]
  },
  {
    id: 'cognitive-strategy',
    title: 'مشاوره راهبردی علوم شناختی و مذاکره',
    topic: 'تحلیل شناختی مخاطب، تکنیک‌های اثرگذاری کلامی، زبان بدن و الگوی مذاکره',
    duration: '۶۰ دقیقه',
    price: '۲,۵۰۰,۰۰۰ تومان',
    rawPrice: 2500000,
    format: 'آنلاین (Google Meet / تصویری)',
    isPopular: true,
    description: 'طراحی شده برای مدیران، مذاکره‌کنندگان و استادانی که قصد دارند روی تصمیم‌گیری و درک مخاطب تاثیر عمیق بگذارند.',
    features: [
      'آنلاین با امکان اشتراک‌گذاری صفحه و تحلیل',
      'گزارش اختصاصی آنالیز الگوی رفتاری کلامی',
      '۱ هفته پشتیبانی پیامکی جهت بازخورد جلسات'
    ]
  },
  {
    id: 'tedtalk-coaching',
    title: 'کوچینگ اختصاصی سخنرانی و TEDTalk',
    topic: 'بازطراحی متن سخنرانی، تمرین زنده جلوی دوربین، اجرای استیج و روایت‌گری',
    duration: '۹۰ دقیقه',
    price: '۳,۸۰۰,۰۰۰ تومان',
    rawPrice: 3800000,
    format: 'آنلاین تک‌به‌تک و فشرده',
    description: 'جلسه اختصاصی آنالیز دقیق متن ارائه، استراکچر روایت‌گری (Storytelling) و اصلاح زبان بدن برای سخنرانی‌های کلیدی.',
    features: [
      'جلسه زنده تک‌به‌تک و شبیه‌سازی اجرا',
      'بازنویسی و ادیت کلامی نقاط کلیدی ارائه',
      'نقشه راه ذهنی برای سخنرانی زنده روی استیج'
    ]
  }
];

// Available Days Generator
const AVAILABLE_DAYS = [
  { id: '18-mordad', dayName: 'شنبه', dateNum: '۱۸', month: 'مرداد', fullDate: 'شنبه ۱۸ مرداد ۱۴۰۳', isAvailable: true },
  { id: '19-mordad', dayName: 'یکشنبه', dateNum: '۱۹', month: 'مرداد', fullDate: 'یکشنبه ۱۹ مرداد ۱۴۰۳', isAvailable: true },
  { id: '20-mordad', dayName: 'دوشنبه', dateNum: '۲۰', month: 'مرداد', fullDate: 'دوشنبه ۲۰ مرداد ۱۴۰۳', isAvailable: true },
  { id: '21-mordad', dayName: 'سه‌شنبه', dateNum: '۲۱', month: 'مرداد', fullDate: 'سه‌شنبه ۲۱ مرداد ۱۴۰۳', isAvailable: false },
  { id: '22-mordad', dayName: 'چهارشنبه', dateNum: '۲۲', month: 'مرداد', fullDate: 'چهارشنبه ۲۲ مرداد ۱۴۰۳', isAvailable: true },
  { id: '23-mordad', dayName: 'پنج‌شنبه', dateNum: '۲۳', month: 'مرداد', fullDate: 'پنج‌شنبه ۲۳ مرداد ۱۴۰۳', isAvailable: true },
  { id: '25-mordad', dayName: 'شنبه', dateNum: '۲۵', month: 'مرداد', fullDate: 'شنبه ۲۵ مرداد ۱۴۰۳', isAvailable: true },
];

const TIME_SLOTS: Record<string, string[]> = {
  '18-mordad': ['۱۰:۰۰ - ۱۰:۴۵', '۱۲:۰۰ - ۱۲:۴۵', '۱۶:۳۰ - ۱۷:۱۵', '۱۹:۰۰ - ۱۹:۴۵'],
  '19-mordad': ['۱۱:۰۰ - ۱۱:۴۵', '۱۵:۰۰ - ۱۵:۴۵', '۱۷:۳0 - ۱۸:۱۵', '۲۰:۰۰ - ۲۰:۴۵'],
  '20-mordad': ['۱۰:۳۰ - ۱۱:۱۵', '۱۴:۰۰ - ۱۴:۴۵', '۱۸:۰۰ - ۱۸:۴۵'],
  '22-mordad': ['۰۹:۳۰ - ۱۰:۱۵', '۱۲:۳۰ - ۱۳:۱۵', '۱۶:۰۰ - ۱۶:۴۵', '۱۹:۳۰ - ۲۰:۱۵'],
  '23-mordad': ['۱۱:۳۰ - ۱۲:۱۵', '۱۵:۳۰ - ۱۶:۱۵', '۱۸:۳۰ - ۱۹:۱۵'],
  '25-mordad': ['۱۰:۰۰ - ۱۰:۴۵', '۱۳:۰۰ - ۱۳:۴۵', '۱۷:۰۰ - ۱۷:۴۵', '۲۰:۳۰ - ۲۱:۱۵'],
};

export const ConsultationSection: React.FC = () => {
  const [selectedOptionId, setSelectedOptionId] = useState<string>('cognitive-strategy');
  const [selectedDayId, setSelectedDayId] = useState<string>('18-mordad');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('۱۶:۳۰ - ۱۷:۱۵');
  
  // User Form State
  const [userName, setUserName] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [userNotes, setUserNotes] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  
  // Modal State
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [bookingRefCode, setBookingRefCode] = useState<string>('');

  const selectedOption = CONSULTATION_OPTIONS.find(opt => opt.id === selectedOptionId) || CONSULTATION_OPTIONS[0];
  const selectedDay = AVAILABLE_DAYS.find(d => d.id === selectedDayId) || AVAILABLE_DAYS[0];
  const availableTimes = TIME_SLOTS[selectedDayId] || ['۱۵:۰۰ - ۱۵:۴۵', '۱۷:۰۰ - ۱۷:۴۵'];

  const handleDaySelect = (dayId: string) => {
    setSelectedDayId(dayId);
    const slots = TIME_SLOTS[dayId] || [];
    if (slots.length > 0) {
      setSelectedTimeSlot(slots[0]);
    } else {
      setSelectedTimeSlot('');
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      setFormError('لطفاً نام و نام خانوادگی خود را وارد کنید.');
      return;
    }
    if (!userPhone.trim() || userPhone.length < 10) {
      setFormError('لطفاً شماره موبایل معتبر (مثلاً ۰۹۱۲۳۴۵۶۷۸۹) وارد کنید.');
      return;
    }

    setFormError('');
    const refCode = 'CNS-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRefCode(refCode);
    setIsSuccessModalOpen(true);
  };

  return (
    <section id="consultation" className="py-20 bg-[#F5F0E9] border-t border-[#D9CBC2]/60 relative overflow-hidden">
      {/* Decorative ambient background blur */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E0C58F]/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#3C507D]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E0C58F]/30 border border-[#E0C58F]/60 text-[#002147] text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#002147]" />
            <span>مشاوره و آنالیز اختصاصی تک‌به‌تک</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002147] mb-4 leading-tight">
            رزرو نوبت مشاوره اختصاصی
          </h2>
          <p className="text-base text-[#3C507D] leading-relaxed">
            جلسات مشاوره تک‌به‌تک آنلاین با ایلیا احمدی جهت بررسی عمیق چالش‌های سخنرانی، تنظیم لحن و تحلیل رفتاری در مذاکرات حساس
          </p>
        </div>

        {/* Step 1: Choose Consultation Type */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#002147] text-white flex items-center justify-center text-sm font-bold">
              ۱
            </div>
            <h3 className="text-xl font-bold text-[#002147]">
              انتخاب نوع مشاوره و موضوع
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONSULTATION_OPTIONS.map((option) => {
              const isSelected = selectedOptionId === option.id;
              return (
                <div
                  key={option.id}
                  onClick={() => setSelectedOptionId(option.id)}
                  className={`relative rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border-2 ${
                    isSelected
                      ? 'bg-white border-[#002147] shadow-xl ring-2 ring-[#E0C58F]/50 scale-[1.02]'
                      : 'bg-white/80 hover:bg-white border-[#D9CBC2] shadow-sm hover:shadow-md'
                  }`}
                >
                  {option.isPopular && (
                    <div className="absolute -top-3.5 left-6 bg-[#002147] text-[#E0C58F] text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      پیشنهاد ویژه
                    </div>
                  )}

                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F5F0E9] text-[#3C507D] flex items-center gap-1">
                        <Video className="w-3.5 h-3.5" />
                        {option.format}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#E0C58F]/20 text-[#002147] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {option.duration}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-[#002147] mb-2">
                      {option.title}
                    </h4>

                    <div className="text-xs font-medium text-[#3C507D] mb-4 bg-[#F5F0E9]/60 p-2.5 rounded-lg border border-[#D9CBC2]/40">
                      <strong className="text-[#002147] block mb-1">موضوع اصلی:</strong>
                      {option.topic}
                    </div>

                    <p className="text-xs text-[#3C507D]/90 mb-4 leading-relaxed">
                      {option.description}
                    </p>

                    <ul className="space-y-2 mb-6 text-xs text-[#112250]">
                      {option.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-[#002147]' : 'text-[#3C507D]'}`} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#D9CBC2]/50 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#3C507D] block">هزینه سرمایه‌گذاری:</span>
                      <span className="text-base font-extrabold text-[#002147]">
                        {option.price}
                      </span>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-[#002147] bg-[#002147] text-white'
                          : 'border-[#D9CBC2] bg-transparent'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-[#E0C58F]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2 & 3 Grid: Calendar Selector and User Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Calendar & Time Selection Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#D9CBC2] shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#002147] text-white flex items-center justify-center text-sm font-bold">
                ۲
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#002147]">
                  انتخاب روز و ساعت جلسه
                </h3>
                <p className="text-xs text-[#3C507D] mt-0.5">
                  تقویم روزهای روزانه و زمان‌های باقی‌مانده ایلیا احمدی
                </p>
              </div>
            </div>

            {/* Calendar Days Selection Slider/Grid */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-[#002147] mb-3 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#3C507D]" />
                روزهای فعال هفته (مرداد ۱۴۰۳):
              </label>

              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {AVAILABLE_DAYS.map((day) => {
                  const isSelected = selectedDayId === day.id;
                  return (
                    <button
                      key={day.id}
                      type="button"
                      disabled={!day.isAvailable}
                      onClick={() => handleDaySelect(day.id)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all text-center ${
                        !day.isAvailable
                          ? 'bg-[#F5F0E9]/40 border-[#D9CBC2]/40 text-gray-400 cursor-not-allowed opacity-50'
                          : isSelected
                          ? 'bg-[#002147] text-white border-[#002147] shadow-md ring-2 ring-[#E0C58F]/60'
                          : 'bg-[#F5F0E9] hover:bg-[#D9CBC2]/30 border-[#D9CBC2] text-[#002147]'
                      }`}
                    >
                      <span className="text-[10px] font-medium opacity-80">{day.dayName}</span>
                      <span className="text-lg font-extrabold my-0.5">{day.dateNum}</span>
                      <span className="text-[10px] font-semibold">{day.month}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Picker */}
            <div>
              <label className="block text-xs font-bold text-[#002147] mb-3 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#3C507D]" />
                ساعت‌های آزاد برای {selectedDay.fullDate}:
              </label>

              {availableTimes.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                  {availableTimes.map((time, idx) => {
                    const isSelected = selectedTimeSlot === time;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedTimeSlot(time)}
                        className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#E0C58F] text-[#002147] border-[#002147] shadow-md'
                            : 'bg-white hover:bg-[#F5F0E9] border-[#D9CBC2] text-[#3C507D]'
                        }`}
                      >
                        <span>{time}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#002147]" />}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 bg-[#F5F0E9] rounded-xl text-xs text-[#3C507D]">
                  متاسفانه در این تاریخ زمان خالی وجود ندارد. لطفاً روز دیگری را انتخاب کنید.
                </div>
              )}
            </div>

            {/* Security Guarantee Note */}
            <div className="mt-8 pt-4 border-t border-[#D9CBC2]/40 flex items-start gap-3 text-xs text-[#3C507D]">
              <ShieldCheck className="w-5 h-5 text-[#002147] flex-shrink-0 mt-0.5" />
              <p>
                لینک ورود به جلسه اختصاصی آنلاین بلافاصله پس از تکمیل پرداخت به همراه پیامک یادآوری برای شما ارسال خواهد شد.
              </p>
            </div>
          </div>

          {/* User Details & Checkout Summary */}
          <div className="lg:col-span-5 bg-[#002147] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-[#112250] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="w-8 h-8 rounded-full bg-[#E0C58F] text-[#002147] flex items-center justify-center text-sm font-bold">
                  ۳
                </div>
                <h3 className="text-xl font-bold text-white">
                  مشخصات و نهایی‌سازی رزرو
                </h3>
              </div>

              {/* Selection Summary Box */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 space-y-3">
                <div className="flex justify-between items-start text-xs border-b border-white/10 pb-2">
                  <span className="text-[#D9CBC2]">نوع مشاوره:</span>
                  <span className="font-bold text-[#E0C58F] text-left max-w-[200px]">
                    {selectedOption.title}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                  <span className="text-[#D9CBC2]">مدت زمان:</span>
                  <span className="font-bold text-white">{selectedOption.duration}</span>
                </div>

                <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                  <span className="text-[#D9CBC2]">تاریخ جلسه:</span>
                  <span className="font-bold text-white">{selectedDay.fullDate}</span>
                </div>

                <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                  <span className="text-[#D9CBC2]">ساعت برگزاری:</span>
                  <span className="font-bold text-[#E0C58F]">{selectedTimeSlot || 'انتخاب نشده'}</span>
                </div>

                <div className="flex justify-between items-center text-sm pt-1">
                  <span className="text-[#D9CBC2]">مبلغ قابل پرداخت:</span>
                  <span className="font-extrabold text-base text-white">{selectedOption.price}</span>
                </div>
              </div>

              {/* Form Input Fields */}
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs text-[#D9CBC2] mb-1.5 font-medium flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#E0C58F]" />
                    نام و نام خانوادگی <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="مثال: علی رضایی"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E0C58F] focus:ring-1 focus:ring-[#E0C58F] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#D9CBC2] mb-1.5 font-medium flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#E0C58F]" />
                    شماره همراه (جهت ارسال لینک جلسه) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    dir="ltr"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white text-right placeholder-white/40 focus:outline-none focus:border-[#E0C58F] focus:ring-1 focus:ring-[#E0C58F] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#D9CBC2] mb-1.5 font-medium flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-[#E0C58F]" />
                    توضیح یا موضوع مورد نظر (اختیاری)
                  </label>
                  <textarea
                    rows={2}
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    placeholder="خلاصه‌ای از موضوع یا چالشی که می‌خواهید بررسی شود..."
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E0C58F] focus:ring-1 focus:ring-[#E0C58F] transition-all resize-none"
                  />
                </div>

                {formError && (
                  <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-xs text-red-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Main Quicksand CTA Button */}
                <button
                  type="submit"
                  className="w-full mt-4 bg-[#E0C58F] text-[#002147] hover:bg-[#D2B48C] active:scale-[0.99] font-extrabold py-3.5 px-6 rounded-xl shadow-lg transition-all text-sm sm:text-base flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <CreditCard className="w-5 h-5 text-[#002147] group-hover:scale-110 transition-transform" />
                  <span>تکمیل رزرو و پرداخت ({selectedOption.price})</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation / Payment Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#F5F0E9] border-2 border-[#D9CBC2] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200 text-[#002147]">
            <div className="w-16 h-16 bg-[#002147] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <CheckCircle2 className="w-9 h-9 text-[#E0C58F]" />
            </div>

            <h3 className="text-2xl font-extrabold text-center text-[#002147] mb-2">
              رزرو نوبت با موفقیت انجام شد!
            </h3>
            <p className="text-xs text-center text-[#3C507D] mb-6">
              کد پیگیری پرداخت و اطلاعات حضور در جلسه برای شما پیامک گردید.
            </p>

            <div className="bg-white rounded-2xl p-5 border border-[#D9CBC2] space-y-3 text-xs mb-6">
              <div className="flex justify-between border-b border-[#D9CBC2]/40 pb-2">
                <span className="text-[#3C507D]">کد پیگیری اختصاصی:</span>
                <span className="font-mono font-bold text-[#002147]">{bookingRefCode}</span>
              </div>
              <div className="flex justify-between border-b border-[#D9CBC2]/40 pb-2">
                <span className="text-[#3C507D]">نام متقاضی:</span>
                <span className="font-bold text-[#002147]">{userName}</span>
              </div>
              <div className="flex justify-between border-b border-[#D9CBC2]/40 pb-2">
                <span className="text-[#3C507D]">موضوع جلسه:</span>
                <span className="font-bold text-[#002147]">{selectedOption.title}</span>
              </div>
              <div className="flex justify-between border-b border-[#D9CBC2]/40 pb-2">
                <span className="text-[#3C507D]">تاریخ و زمان:</span>
                <span className="font-bold text-[#002147]">{selectedDay.fullDate} ساعت {selectedTimeSlot}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#3C507D]">وضعیت پرداخت:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  موفقیت‌آمیز (تایید شده)
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#E0C58F]/30 border border-[#E0C58F] rounded-xl text-xs text-[#002147] mb-6 flex items-center gap-2">
              <Video className="w-4 h-4 flex-shrink-0" />
              <span>لینک جلسه ۵ دقیقه قبل از زمان مقرر به شماره {userPhone} ارسال خواهد شد.</span>
            </div>

            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="w-full bg-[#002147] text-white hover:bg-[#112250] py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>بازگشت به صفحه اصلی</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
