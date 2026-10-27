import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { Volume2, VolumeX, Share2, Check } from 'lucide-react';

interface HeaderProps {
  onShare: () => Promise<boolean>;
}

export const Header: React.FC<HeaderProps> = ({ onShare }) => {
  const [copied, setCopied] = useState(false);
  const [muted, setMuted] = useState(false);

  const handleShareClick = async () => {
    sound.playClick();
    const success = await onShare();
    if (success) {
      sound.playVerify();
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const toggleSound = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    sound.setMuted(nextMuted);
    if (!nextMuted) {
      sound.playClick();
    }
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <img
            src="/presets/omnicorp_logo_red.png"
            alt="OmniCorp Logo"
            className="w-9 h-9 object-contain"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-orbitron font-black text-lg tracking-wider text-slate-900">
                OMNICORP
              </span>
              <span className="bg-rose-100 text-rose-700 font-bold text-[11px] px-2 py-0.5 rounded-full uppercase tracking-wide">
                ID Generator
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              Create your own authentic employee security badge
            </span>
          </div>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-2">
          {/* Sound Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            aria-label={muted ? 'Unmute Audio UI' : 'Mute Audio UI'}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all cursor-pointer"
            title={muted ? 'Sound Muted' : 'Sound Enabled'}
          >
            {muted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-rose-600" />}
          </button>

          {/* Clean Short Share URL */}
          <button
            onClick={handleShareClick}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-300" />
                <span>Share Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
