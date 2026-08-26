import React, { useState } from 'react';
import { Course } from '../types';
import { Star, Clock, Users, Check, ArrowLeft, Sparkles, Tag, Award } from 'lucide-react';

interface CoursesGridProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
}

export const CoursesGrid: React.FC<CoursesGridProps> = ({ courses, onSelectCourse }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('همه');

  const categories = ['همه', 'فن بیان', 'علوم شناختی', 'هوش کلامی', 'مذاکره'];

  const filteredCourses = courses.filter((course) => {
    if (selectedCategory === 'همه') return true;
    return course.category === selectedCategory;
  });

  return (
    <section id="courses" className="py-16 md:py-24 bg-[#F5F0E9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#D9CBC2]/60 text-[#002147] px-4 py-1.5 rounded-full text-xs font-bold border border-[#3C507D]/20 shadow-sm">
            <Award className="w-4 h-4 text-[#3C507D]" />
            <span>دوره‌های آموزشی تخصصی ایلیا احمدی</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#002147] tracking-tight">
            مسیر یادگیری فن بیان و علوم شناختی
          </h2>

          <p className="text-[#3C507D] text-sm sm:text-base font-normal leading-relaxed">
            دوره‌های طراحی‌شده بر اساس آخرین دستاوردهای علوم اعصاب و روان‌شناسی ارتباطات؛ برای هر کسی که می‌خواهد تاثیرگذارتر سخن بگوید.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#002147] text-[#E0C58F] shadow-md scale-105'
                    : 'bg-white/80 text-[#112250] hover:bg-[#D9CBC2]/50 border border-[#D9CBC2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`bg-white rounded-3xl overflow-hidden border border-[#D9CBC2] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${
                course.isPopular ? 'ring-2 ring-[#E0C58F]' : ''
              }`}
            >
              <div>
                {/* Course Image Header */}
                <div className="relative h-52 overflow-hidden bg-[#D9CBC2]">
                  <img
                    src={course.image}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/70 via-transparent to-transparent" />

                  {/* Badge */}
                  {course.badge && (
                    <div className="absolute top-4 right-4 bg-[#E0C58F] text-[#002147] text-xs font-black px-3 py-1.5 rounded-full shadow-md">
                      {course.badge}
                    </div>
                  )}

                  <div className="absolute bottom-4 right-4 text-white flex items-center gap-3 text-xs font-semibold">
                    <span className="flex items-center gap-1 bg-[#002147]/80 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-[#E0C58F]" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1 bg-[#002147]/80 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                      <Users className="w-3.5 h-3.5 text-[#E0C58F]" />
                      {course.studentsCount} دانشجو
                    </span>
                  </div>
                </div>

                {/* Course Content Info */}
                <div className="p-6 sm:p-8 space-y-4 text-right">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#3C507D] bg-[#F5F0E9] px-3 py-1 rounded-full border border-[#D9CBC2]/60">
                      دسته: {course.category}
                    </span>

                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-[#002147] leading-tight">
                    {course.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#3C507D] leading-relaxed font-light line-clamp-2">
                    {course.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 pt-2 border-t border-[#D9CBC2]/50 text-xs text-[#002147]">
                    {course.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Course Footer & CTA */}
              <div className="p-6 sm:p-8 pt-0 flex items-center justify-between border-t border-[#F5F0E9] mt-4">
                {/* Pricing */}
                <div className="text-right">
                  {course.discountPrice ? (
                    <div>
                      <span className="text-xs text-[#3C507D] line-through block font-mono">
                        {course.price}
                      </span>
                      <span className="text-lg font-black text-[#002147] font-mono">
                        {course.discountPrice}
                      </span>
                    </div>
                  ) : (
                    <span className="text-lg font-black text-[#002147] font-mono">
                      {course.price}
                    </span>
                  )}
                </div>

                {/* Enroll Trigger Button */}
                <button
                  onClick={() => onSelectCourse(course)}
                  className="bg-[#002147] hover:bg-[#112250] text-[#F5F0E9] font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 shadow hover:shadow-md active:scale-95"
                >
                  <span>ثبت‌نام در دوره</span>
                  <ArrowLeft className="w-4 h-4 text-[#E0C58F]" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
