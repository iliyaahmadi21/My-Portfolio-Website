import React, { useState } from 'react';
import { Article } from '../types';
import { FileText, Clock, Eye, Heart, ArrowLeft, Search, Tag, Sparkles } from 'lucide-react';

interface ArticlesSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({ articles, onSelectArticle }) => {
  const [selectedTag, setSelectedTag] = useState<string>('همه');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const tags = ['همه', 'فن بیان', 'علوم شناختی', 'هوش کلامی', 'مذاکره', 'استرس'];

  const filteredArticles = articles.filter((art) => {
    const matchesTag = selectedTag === 'همه' || art.tags.includes(selectedTag) || art.category === selectedTag;
    const matchesSearch =
      art.title.includes(searchQuery) ||
      art.excerpt.includes(searchQuery) ||
      art.tags.some((t) => t.includes(searchQuery));
    return matchesTag && matchesSearch;
  });

  return (
    <section id="articles" className="py-16 md:py-24 bg-[#D9CBC2]/25 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-[#D9CBC2] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#002147] text-[#E0C58F] px-3.5 py-1 rounded-full text-xs font-bold mb-3">
              <FileText className="w-4 h-4" />
              <span>مقالات و جستارهای تحلیلی</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#002147] tracking-tight">
              یادداشت‌های اختصاصی ایلیا احمدی
            </h2>
            <p className="text-[#3C507D] text-sm sm:text-base mt-2 max-w-2xl font-light">
              تحلیل‌های کاربردی پیرامون هنر سخنوری، روان‌شناسی رفتار کلامی و یافته‌های علوم اعصاب.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute right-3 top-3.5 text-[#3C507D]" />
            <input
              type="text"
              placeholder="جستجو در مقالات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-[#002147] placeholder-[#3C507D]/60 pr-9 pl-4 py-2.5 rounded-2xl text-xs border border-[#D9CBC2] focus:outline-none focus:ring-2 focus:ring-[#002147]"
            />
          </div>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedTag === tag
                  ? 'bg-[#002147] text-[#E0C58F]'
                  : 'bg-white/80 text-[#3C507D] hover:bg-white border border-[#D9CBC2]'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Typographic Articles Grid / List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9CBC2] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-4 text-right">
                
                {/* Category & Date */}
                <div className="flex items-center justify-between text-xs text-[#3C507D]">
                  <span className="font-bold bg-[#F5F0E9] text-[#002147] px-3 py-1 rounded-full border border-[#D9CBC2]/60">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#E0C58F]" />
                    {article.readingTime}
                  </span>
                </div>

                {/* Article Title */}
                <h3 className="text-xl font-black text-[#002147] group-hover:text-[#3C507D] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-[#3C507D] font-medium leading-relaxed">
                  {article.subtitle}
                </p>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-[#112250]/80 font-light leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>

              </div>

              {/* Card Footer */}
              <div className="pt-6 mt-6 border-t border-[#F5F0E9] flex items-center justify-between text-xs text-[#3C507D]">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {article.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    {article.likes}
                  </span>
                </div>

                <span className="font-bold text-[#002147] flex items-center gap-1 group-hover:translate-x-[-4px] transition-transform">
                  خواندن مقاله
                  <ArrowLeft className="w-4 h-4 text-[#E0C58F]" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
