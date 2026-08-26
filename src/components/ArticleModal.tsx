import React, { useState } from 'react';
import { Article } from '../types';
import { X, Clock, Heart, Share2, BookOpen, Check } from 'lucide-react';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  const [likes, setLikes] = useState(article?.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-[#F5F0E9] text-[#112250] rounded-3xl max-w-3xl w-full p-6 sm:p-10 relative border border-[#D9CBC2] shadow-2xl space-y-6 dir-rtl max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 p-2 rounded-full bg-[#002147] text-[#E0C58F] hover:bg-[#112250] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Article Meta */}
        <div className="space-y-3 text-right pr-2 border-b border-[#D9CBC2] pb-6">
          <div className="flex items-center gap-3 text-xs text-[#3C507D]">
            <span className="bg-[#002147] text-[#E0C58F] px-3 py-1 rounded-full font-bold">
              {article.category}
            </span>
            <span className="font-mono">{article.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#002147] leading-tight">
            {article.title}
          </h1>

          <p className="text-sm text-[#3C507D] font-medium leading-relaxed">
            {article.subtitle}
          </p>
        </div>

        {/* Article Body */}
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#112250] font-normal text-right">
          {article.content.map((paragraph, index) => (
            <p key={index} className="bg-white/60 p-4 rounded-2xl border border-[#D9CBC2]/50">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Footer Controls */}
        <div className="pt-6 border-t border-[#D9CBC2] flex items-center justify-between">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              hasLiked ? 'bg-rose-500 text-white' : 'bg-white border border-[#D9CBC2] text-[#002147]'
            }`}
          >
            <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
            <span>{likes} پسندیدم</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-[#002147] text-[#E0C58F] px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#112250] transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'لینک کپی شد' : 'اشتراک‌گذاری مقاله'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
