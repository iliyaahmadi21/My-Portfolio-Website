import React from 'react';
import { PodcastEpisode } from '../types';
import { Play, Pause, Volume2, X, ExternalLink, Mic, Radio } from 'lucide-react';

interface PersistentAudioPlayerProps {
  currentEpisode: PodcastEpisode | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
}

export const PersistentAudioPlayer: React.FC<PersistentAudioPlayerProps> = ({
  currentEpisode,
  isPlaying,
  onTogglePlay,
  onClose,
}) => {
  if (!currentEpisode) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:right-8 sm:left-8 z-50 max-w-4xl mx-auto bg-[#002147] text-[#F5F0E9] p-3 sm:p-4 rounded-2xl border border-[#E0C58F]/40 shadow-2xl glass-nav animate-slideUp flex items-center justify-between gap-4">
      
      {/* Left info & Play trigger */}
      <div className="flex items-center gap-3 overflow-hidden">
        <button
          onClick={onTogglePlay}
          className="w-12 h-12 rounded-xl bg-[#E0C58F] text-[#002147] flex items-center justify-center shrink-0 font-bold shadow hover:bg-[#D2B48C] transition"
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
        </button>

        <div className="text-right overflow-hidden">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black bg-[#E0C58F] text-[#002147] px-2 py-0.5 rounded">
              قسمت {currentEpisode.episodeNumber}
            </span>
            <span className="text-[11px] text-[#D9CBC2] truncate font-mono">{currentEpisode.duration}</span>
          </div>

          <h4 className="text-xs sm:text-sm font-bold text-white truncate mt-0.5">
            {currentEpisode.title}
          </h4>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 shrink-0">
        <a
          href="https://castbox.fm"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 text-xs text-[#E0C58F] bg-[#112250] hover:bg-[#3C507D] px-3 py-1.5 rounded-xl border border-[#3C507D]/40 transition"
        >
          <span>Castbox</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        <button
          onClick={onClose}
          className="p-2 text-[#D9CBC2] hover:text-white rounded-lg hover:bg-white/10 transition"
          title="بستن پلیر"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
