import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { EmployeeBadgeState } from '../types';
import { VerticalCard } from './VerticalCard';
import { HorizontalCard } from './HorizontalCard';
import { sound } from '../utils/audio';
import { RotateCw, Download, Sparkles, Check, ShieldCheck, Printer } from 'lucide-react';

interface BadgePreviewProps {
  badge: EmployeeBadgeState;
}

export const BadgePreview: React.FC<BadgePreviewProps> = ({ badge }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);

  // Hidden unscaled export refs
  const frontExportRef = useRef<HTMLDivElement>(null);
  const backExportRef = useRef<HTMLDivElement>(null);

  const handleFlip = () => {
    sound.playFlip();
    setIsFlipped(!isFlipped);
  };

  const handleDownload = async (side: 'front' | 'back' | 'both') => {
    sound.playShutter();
    setIsExporting(true);

    try {
      const isVertical = badge.cardLayout === 'vertical';
      const width = isVertical ? 320 : 500;
      const height = isVertical ? 490 : 315;

      const exportOptions = {
        pixelRatio: 3,
        width,
        height,
        cacheBust: true,
        style: {
          transform: 'none',
          transformOrigin: 'top left',
          margin: '0',
          position: 'static',
        },
      };

      if (side === 'front' || side === 'both') {
        if (frontExportRef.current) {
          const dataUrl = await toPng(frontExportRef.current, exportOptions);
          const link = document.createElement('a');
          const cleanName = badge.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
          link.download = `omnicorp_id_${cleanName}_front_3x.png`;
          link.href = dataUrl;
          link.click();
        }
      }

      if (side === 'back' || side === 'both') {
        if (backExportRef.current) {
          const dataUrl = await toPng(backExportRef.current, exportOptions);
          const link = document.createElement('a');
          const cleanName = badge.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
          link.download = `omnicorp_id_${cleanName}_back_3x.png`;
          link.href = dataUrl;
          link.click();
        }
      }

      sound.playVerify();
      setExportSuccess(side === 'both' ? 'Both Sides Exported!' : `${side.toUpperCase()} Exported!`);
      setTimeout(() => setExportSuccess(null), 3500);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const isVertical = badge.cardLayout === 'vertical';

  return (
    <div className="flex flex-col items-center">
      {/* Top Preview Controls Bar */}
      <div className="w-full flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-[11px] font-tech text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>CR-80 {isVertical ? 'VERTICAL 320×490' : 'HORIZONTAL 500×315'}</span>
          </div>
          <span className="text-[11px] font-tech text-slate-400">
            SIDE: <strong className="text-slate-200">{isFlipped ? 'REVERSE' : 'OBVERSE'}</strong>
          </span>
        </div>

        {/* 3D Flip Toggle Button */}
        <button
          onClick={handleFlip}
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-600/80 text-xs font-chakra font-bold text-slate-200 shadow-md transition-all cursor-pointer"
        >
          <RotateCw className="w-3.5 h-3.5 text-rose-500" />
          <span>Flip Badge ({isFlipped ? 'View Front' : 'View Back'})</span>
        </button>
      </div>

      {/* Main Interactive 3D Card Display Area */}
      <div className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-900 border border-slate-800 shadow-2xl flex items-center justify-center min-h-[460px] w-full overflow-hidden studio-grid">
        {/* Subtle decorative target corners */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-slate-700" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-slate-700" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-slate-700" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-slate-700" />

        {/* Outer scaling wrapper for responsive screens (avoids CSS transform on card itself) */}
        <div className="perspective-1000 flex items-center justify-center">
          {isVertical ? (
            <VerticalCard badge={badge} isFlipped={isFlipped} />
          ) : (
            <HorizontalCard badge={badge} isFlipped={isFlipped} />
          )}
        </div>
      </div>

      {/* Print & Export Actions Toolbar */}
      <div className="w-full mt-6 flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 text-xs font-tech text-slate-300">
          <ShieldCheck className="w-4 h-4 text-rose-500" />
          <span>Ultra 3× DPI Print Engine Ready</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Export Current Side */}
          <button
            onClick={() => handleDownload(isFlipped ? 'back' : 'front')}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-600 text-xs font-chakra font-bold text-slate-200 transition-all cursor-pointer shadow-sm disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5 text-slate-300" />
            <span>Download {isFlipped ? 'Back (3× PNG)' : 'Front (3× PNG)'}</span>
          </button>

          {/* Export Both Sides */}
          <button
            onClick={() => handleDownload('both')}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 active:scale-95 text-white font-chakra font-bold text-xs shadow-md shadow-rose-950 transition-all cursor-pointer disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Rendering 3× PNGs...</span>
              </>
            ) : exportSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>{exportSuccess}</span>
              </>
            ) : (
              <>
                <Printer className="w-3.5 h-3.5" />
                <span>Download Both Sides (3×)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ==============================================================
          OFF-SCREEN UNTRANSFORMED EXPORT NODES
          Strict requirement: Card container MUST never be resized via CSS transforms
          on the capture element itself. We mount pure 1:1 unscaled nodes here
          for razor-sharp 3x html-to-image capture!
          ============================================================== */}
      <div
        style={{
          position: 'fixed',
          top: '-9999px',
          left: '-9999px',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: -1,
        }}
        aria-hidden="true"
      >
        <div ref={frontExportRef}>
          {isVertical ? (
            <VerticalCard badge={badge} isFlipped={false} />
          ) : (
            <HorizontalCard badge={badge} isFlipped={false} />
          )}
        </div>
        <div ref={backExportRef}>
          {isVertical ? (
            <VerticalCard badge={badge} isFlipped={true} />
          ) : (
            <HorizontalCard badge={badge} isFlipped={true} />
          )}
        </div>
      </div>
    </div>
  );
};
