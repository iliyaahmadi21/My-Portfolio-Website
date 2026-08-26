import React, { useState } from 'react';
import { Course } from '../types';
import { X, Check, Clock, Users, Star, ShieldCheck, Sparkles, Send } from 'lucide-react';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({ course, onClose }) => {
  const [enrolled, setEnrolled] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  if (!course) return null;

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setEnrolled(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-[#F5F0E9] text-[#112250] rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative border border-[#D9CBC2] shadow-2xl space-y-6 dir-rtl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 p-2 rounded-full bg-[#002147] text-[#E0C58F] hover:bg-[#112250] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 text-right pr-2">
          <span className="bg-[#002147] text-[#E0C58F] text-xs font-bold px-3 py-1 rounded-full">
            دوره آموزشی: {course.category}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#002147] mt-2">
            {course.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#3C507D]">
            {course.description}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-3 bg-white p-4 rounded-2xl border border-[#D9CBC2] text-center text-xs">
          <div>
            <span className="text-[#3C507D] block mb-1">مدت آموزش</span>
            <span className="font-extrabold text-[#002147]">{course.duration}</span>
          </div>
          <div>
            <span className="text-[#3C507D] block mb-1">تعداد سرفصل‌ها</span>
            <span className="font-extrabold text-[#002147]">{course.lessonsCount} جلسه</span>
          </div>
          <div>
            <span className="text-[#3C507D] block mb-1">امتیاز دانش‌پژوهان</span>
            <span className="font-extrabold text-amber-600 flex items-center justify-center gap-1">
              <Star className="w-3.5 h-3.5 fill-current" />
              {course.rating}
            </span>
          </div>
        </div>

        {/* Detailed Curriculum */}
        <div className="space-y-3 bg-white p-5 rounded-2xl border border-[#D9CBC2] text-right">
          <h3 className="text-sm font-black text-[#002147] border-b pb-2">
            ویژگی‌ها و دستاوردهای شما در پایان دوره:
          </h3>
          <ul className="space-y-2 text-xs text-[#002147]">
            {course.features.map((feat, i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price & Form */}
        {enrolled ? (
          <div className="bg-emerald-50 border border-emerald-300 p-6 rounded-2xl text-center space-y-2 text-emerald-900 animate-fadeIn">
            <Sparkles className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-extrabold text-lg">پیش‌ثبت‌نام شما با موفقیت ثبت شد!</h4>
            <p className="text-xs">
              همکاران پشتیبانی پلتفرم ایلیا احمدی به‌زودی جهت ارسال اطلاعات ورود و مشاوره با شما تماس خواهند گرفت.
            </p>
          </div>
        ) : (
          <form onSubmit={handleEnroll} className="space-y-4 pt-2 border-t border-[#D9CBC2]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#3C507D]">شهریه سرمایه‌گذاری:</span>
              <span className="text-xl font-black text-[#002147] font-mono">
                {course.discountPrice || course.price}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="نام و نام خانوادگی"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white p-3 rounded-xl border border-[#D9CBC2] text-xs focus:outline-none focus:border-[#002147]"
              />
              <input
                type="tel"
                placeholder="شماره موبایل (جهت دریافت لینک ورود)"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white p-3 rounded-xl border border-[#D9CBC2] text-xs focus:outline-none focus:border-[#002147] text-right dir-ltr"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#002147] hover:bg-[#112250] text-[#E0C58F] font-black py-3.5 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2"
            >
              <span>تایید و تکمیل ثبت‌نام اولیه</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
