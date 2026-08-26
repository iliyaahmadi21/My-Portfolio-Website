import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Mic, Share2, ExternalLink, Radio, Check, Search, Tag } from 'lucide-react';
import { PodcastEpisode } from '../types';

interface PodcastPlayerWidgetProps {
  episodes: PodcastEpisode[];
  currentEpisode: PodcastEpisode;
  isPlaying: boolean;
  onPlayEpisode: (episode: PodcastEpisode) => void;
  onTogglePlay: () => void;
  playbackRate: number;
  onChangeSpeed: (speed: number) => void;
}

export const PodcastPlayerWidget: React.FC<PodcastPlayerWidgetProps> = ({
  episodes,
  currentEpisode,
  isPlaying,
  onPlayEpisode,
  onTogglePlay,
  playbackRate,
  onChangeSpeed,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('همه');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(15); // Percentage
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState<string>('06:18');
  const [copied, setCopied] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync audio ref with current episode url and play state
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(currentEpisode.audioUrl);
    } else {
      audioRef.current.src = currentEpisode.audioUrl;
    }
    audioRef.current.playbackRate = playbackRate;
    audioRef.current.volume = isMuted ? 0 : volume;

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        // Fallback or browser policy
      });
    } else {
      audioRef.current.pause();
    }
  }, [currentEpisode]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Audio time update handler simulation
  useEffect(() => {
    const timer = setInterval(() => {
      if (isPlaying) {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 0.3;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const allTags = ['همه', 'فن بیان', 'علوم شناختی', 'هوش کلامی', 'مذاکره', 'استرس سخنرانی'];

  const filteredEpisodes = episodes.filter((ep) => {
    const matchesTag = selectedTag === 'همه' || ep.tags.includes(selectedTag);
    const matchesSearch =
      ep.title.includes(searchQuery) ||
      ep.description.includes(searchQuery) ||
      ep.tags.some((t) => t.includes(searchQuery));
    return matchesTag && matchesSearch;
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNextEpisode = () => {
    const currentIndex = episodes.findIndex((ep) => ep.id === currentEpisode.id);
    if (currentIndex > 0) {
      onPlayEpisode(episodes[currentIndex - 1]);
    } else {
      onPlayEpisode(episodes[episodes.length - 1]);
    }
  };

  const handlePrevEpisode = () => {
    const currentIndex = episodes.findIndex((ep) => ep.id === currentEpisode.id);
    if (currentIndex < episodes.length - 1) {
      onPlayEpisode(episodes[currentIndex + 1]);
    } else {
      onPlayEpisode(episodes[0]);
    }
  };

  return (
    <section id="podcast" className="py-16 md:py-24 bg-[#002147] text-[#F5F0E9] relative overflow-hidden">
      {/* Background Accent Graphics */}
      <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-r from-[#E0C58F] via-[#D2B48C] to-[#3C507D]" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#112250] rounded-full blur-3xl pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-[#3C507D]/40 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#E0C58F]/15 text-[#E0C58F] px-3.5 py-1 rounded-full text-xs font-bold mb-3 border border-[#E0C58F]/30">
              <Radio className="w-4 h-4 animate-pulse text-[#E0C58F]" />
              <span>پادکست اختصاصی «ذهن و کلام»</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              گفتگوهای هفتگی معماری کلام و علوم شناختی
            </h2>
            <p className="text-[#D9CBC2] text-sm sm:text-base mt-2 max-w-2xl font-light">
              در هر قسمت از پادکست، ابزارهای عصب‌شناختی و روان‌شناسی ارتباطات را باز می‌کنیم تا صدای رساتر و گفتاری متقاعدکننده‌تر داشته باشید.
            </p>
          </div>

          {/* External Platform Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://castbox.fm"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#112250] hover:bg-[#3C507D] text-[#E0C58F] border border-[#E0C58F]/30 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition"
            >
              <span>شنیدن در Castbox</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#112250] hover:bg-[#3C507D] text-emerald-400 border border-emerald-400/30 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition"
            >
              <span>Spotify</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#112250] hover:bg-[#3C507D] text-red-400 border border-red-400/30 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition"
            >
              <span>یوتیوب</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Player Widget Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Player Display (Right 7 Cols) */}
          <div className="lg:col-span-7 bg-[#112250] rounded-3xl p-6 sm:p-8 border border-[#3C507D]/50 shadow-2xl space-y-6">
            
            {/* Episode Badge & Audio Waveform Header */}
            <div className="flex items-center justify-between border-b border-[#3C507D]/40 pb-4">
              <div className="flex items-center gap-2">
                <span className="bg-[#E0C58F] text-[#002147] font-black text-xs px-3 py-1 rounded-lg">
                  قسمت {currentEpisode.episodeNumber}
                </span>
                <span className="text-xs text-[#D9CBC2] font-medium">{currentEpisode.date}</span>
              </div>

              {/* Animated Equalizer Visualizer */}
              <div className="flex items-end gap-1 h-6">
                <span className={`w-1 bg-[#E0C58F] rounded-full ${isPlaying ? 'animate-audio-bar-1' : 'h-1'}`}></span>
                <span className={`w-1 bg-[#E0C58F] rounded-full ${isPlaying ? 'animate-audio-bar-2' : 'h-2'}`}></span>
                <span className={`w-1 bg-[#E0C58F] rounded-full ${isPlaying ? 'animate-audio-bar-3' : 'h-3'}`}></span>
                <span className={`w-1 bg-[#E0C58F] rounded-full ${isPlaying ? 'animate-audio-bar-4' : 'h-1'}`}></span>
                <span className={`w-1 bg-[#E0C58F] rounded-full ${isPlaying ? 'animate-audio-bar-5' : 'h-2'}`}></span>
              </div>
            </div>

            {/* Current Episode Title & Info */}
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {currentEpisode.title}
              </h3>
              <p className="text-sm text-[#D9CBC2] leading-relaxed font-light">
                {currentEpisode.description}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {currentEpisode.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#002147] text-[#E0C58F] text-[11px] font-semibold px-2.5 py-0.5 rounded-md border border-[#3C507D]/40"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Scrubber Progress Bar */}
            <div className="space-y-2 pt-2">
              <div className="relative w-full h-2.5 bg-[#002147] rounded-full cursor-pointer overflow-hidden border border-[#3C507D]/30"
                   onClick={(e) => {
                     const rect = e.currentTarget.getBoundingClientRect();
                     const clickX = e.clientX - rect.left;
                     const newProgress = (clickX / rect.width) * 100;
                     setProgress(newProgress);
                   }}>
                <div
                  className="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-[#E0C58F] to-[#D2B48C] transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-[#D9CBC2] font-mono dir-ltr">
                <span>{currentTimeFormatted}</span>
                <span>{currentEpisode.duration}</span>
              </div>
            </div>

            {/* Interactive Player Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              
              {/* Playback Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrevEpisode}
                  className="text-[#D9CBC2] hover:text-white transition"
                  title="قسمت قبلی"
                >
                  <SkipForward className="w-5 h-5" />
                </button>

                <button
                  onClick={onTogglePlay}
                  className="w-14 h-14 rounded-2xl bg-[#E0C58F] hover:bg-[#D2B48C] text-[#002147] flex items-center justify-center font-bold shadow-lg transition transform hover:scale-105 active:scale-95"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={handleNextEpisode}
                  className="text-[#D9CBC2] hover:text-white transition"
                  title="قسمت بعدی"
                >
                  <SkipBack className="w-5 h-5" />
                </button>
              </div>

              {/* Speed & Volume */}
              <div className="flex items-center gap-3">
                {/* Speed selector */}
                <div className="flex items-center bg-[#002147] rounded-xl p-1 border border-[#3C507D]/40 text-xs font-semibold">
                  {[1, 1.25, 1.5, 2].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => onChangeSpeed(rate)}
                      className={`px-2 py-1 rounded-lg transition ${
                        playbackRate === rate
                          ? 'bg-[#E0C58F] text-[#002147] font-bold'
                          : 'text-[#D9CBC2] hover:text-white'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>

                {/* Mute / Volume toggle */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2.5 rounded-xl bg-[#002147] text-[#D9CBC2] hover:text-white border border-[#3C507D]/40 transition"
                  title={isMuted ? 'وصل صدا' : 'قطع صدا'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>

                {/* Share Link */}
                <button
                  onClick={handleCopyLink}
                  className="p-2.5 rounded-xl bg-[#002147] text-[#D9CBC2] hover:text-white border border-[#3C507D]/40 transition flex items-center gap-1.5 text-xs font-medium"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  <span className="hidden sm:inline">{copied ? 'کپی شد' : 'اشتراک'}</span>
                </button>
              </div>

            </div>

          </div>

          {/* Episode List Sidebar (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Search & Tag Filter Header */}
            <div className="bg-[#112250] p-4 rounded-2xl border border-[#3C507D]/40 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute right-3 top-3 text-[#3C507D]" />
                <input
                  type="text"
                  placeholder="جستجو در اپیزودها..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#002147] text-white placeholder-[#3C507D] pr-9 pl-3 py-2 rounded-xl text-xs border border-[#3C507D]/30 focus:outline-none focus:border-[#E0C58F]"
                />
              </div>

              {/* Tag filters scroll */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-2.5 py-1 rounded-lg shrink-0 transition text-[11px] font-medium ${
                      selectedTag === tag
                        ? 'bg-[#E0C58F] text-[#002147] font-bold'
                        : 'bg-[#002147] text-[#D9CBC2] hover:bg-[#3C507D]/50'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Episodes List Container */}
            <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
              {filteredEpisodes.map((ep) => {
                const isSelected = ep.id === currentEpisode.id;
                return (
                  <div
                    key={ep.id}
                    onClick={() => onPlayEpisode(ep)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 text-right ${
                      isSelected
                        ? 'bg-[#3C507D]/40 border-[#E0C58F] shadow-lg'
                        : 'bg-[#112250]/70 border-[#3C507D]/30 hover:bg-[#112250] hover:border-[#3C507D]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-[#E0C58F] flex items-center gap-1">
                        {isSelected && isPlaying && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>}
                        قسمت {ep.episodeNumber}
                      </span>
                      <span className="text-[11px] text-[#D9CBC2] font-mono">{ep.duration}</span>
                    </div>

                    <h4 className="text-sm font-bold text-white line-clamp-1 mb-1">
                      {ep.title}
                    </h4>

                    <p className="text-xs text-[#D9CBC2]/80 line-clamp-2 font-light">
                      {ep.description}
                    </p>
                  </div>
                );
              })}

              {filteredEpisodes.length === 0 && (
                <div className="p-8 text-center text-[#D9CBC2] text-xs">
                  هیچ اپیزودی با این عنوان یافت نشد.
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
