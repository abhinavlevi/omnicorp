import React, { useState } from 'react';
import { BrandMark } from './BrandMark';
import { sound } from '../utils/audio';
import { Volume2, VolumeX, Share2, Check, ShieldAlert } from 'lucide-react';

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
    <header className="w-full bg-[#081224] border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-95 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Identity & Title */}
        <div className="flex items-center gap-3">
          <BrandMark variant="white" size="sm" showText={false} />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-orbitron font-black text-lg tracking-wider text-slate-100">
                OMNICORP
              </span>
              <span className="bg-rose-950 border border-rose-800 text-rose-400 font-tech text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider font-bold">
                SECURITY SYSTEM
              </span>
            </div>
            <span className="text-[10px] font-tech text-slate-400 tracking-wider">
              FACILITY ACCESS &amp; CREDENTIAL STUDIO
            </span>
          </div>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-2.5">
          {/* Security Badge Advisory */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-700/80 rounded-full text-slate-300 font-tech text-xs">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
            <span>CLASSIFIED DELTA-04</span>
          </div>

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            aria-label={muted ? 'Unmute Audio UI' : 'Mute Audio UI'}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all cursor-pointer"
            title={muted ? 'Sound Muted' : 'Sound Enabled'}
          >
            {muted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Share Configuration URL */}
          <button
            onClick={handleShareClick}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 border border-slate-600 font-chakra font-bold text-xs shadow-sm transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-rose-500" />
                <span>Share URL</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
