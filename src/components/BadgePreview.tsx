import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { EmployeeBadgeState } from '../types';
import { VerticalCard } from './VerticalCard';
import { HorizontalCard } from './HorizontalCard';
import { HorizontalCardFront } from './HorizontalCardFront';
import { HorizontalCardBack } from './HorizontalCardBack';
import { VerticalCardFront } from './VerticalCardFront';
import { VerticalCardBack } from './VerticalCardBack';
import { sound } from '../utils/audio';
import { RotateCw, Download, Sparkles, Check, Layers } from 'lucide-react';

interface BadgePreviewProps {
  badge: EmployeeBadgeState;
  onToggleHolder: () => void;
}

export const BadgePreview: React.FC<BadgePreviewProps> = ({ badge, onToggleHolder }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);

  // Pure standalone export refs (NO 3D flip bleeding, NO double layers)
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
      const width = isVertical ? 320 : 510;
      const height = isVertical ? 490 : 320;

      const exportOptions = {
        pixelRatio: 3,
        width,
        height,
        cacheBust: true,
        backgroundColor: '#ffffff',
      };

      if (side === 'front' || side === 'both') {
        if (frontExportRef.current) {
          const dataUrl = await toPng(frontExportRef.current, exportOptions);
          const link = document.createElement('a');
          const cleanName = (badge.name || 'badge').replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
          link.download = `omnicorp_id_${cleanName}_front.png`;
          link.href = dataUrl;
          link.click();
        }
      }

      if (side === 'back' || side === 'both') {
        if (backExportRef.current) {
          const dataUrl = await toPng(backExportRef.current, exportOptions);
          const link = document.createElement('a');
          const cleanName = (badge.name || 'badge').replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
          link.download = `omnicorp_id_${cleanName}_back.png`;
          link.href = dataUrl;
          link.click();
        }
      }

      sound.playVerify();
      setExportSuccess(side === 'both' ? 'Both Sides Downloaded!' : `${side.toUpperCase()} Downloaded!`);
      setTimeout(() => setExportSuccess(null), 3000);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const isVertical = badge.cardLayout === 'vertical';

  return (
    <div className="flex flex-col items-center w-full">
      {/* Top Preview Controls Bar in Light Theme */}
      <div className="w-full flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          {/* Card Flip Button */}
          <button
            onClick={handleFlip}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5 text-rose-600" />
            <span>Flip Badge ({isFlipped ? 'Front' : 'Back'})</span>
          </button>

          {/* Toggle Acrylic Badge Case */}
          <button
            onClick={onToggleHolder}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer ${
              badge.showHolderCase
                ? 'bg-rose-50 border-rose-300 text-rose-700'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Badge Case: {badge.showHolderCase ? 'On' : 'Off'}</span>
          </button>
        </div>

        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {isFlipped ? 'Reverse' : 'Obverse'}
        </span>
      </div>

      {/* Main Interactive Card Display Area in Clean Light Studio Style */}
      <div
        className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-slate-200/70 to-slate-300/80 border border-slate-300 shadow-xl flex items-center justify-center min-h-[440px] w-full overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(#94a3b8 1px, transparent 1px), linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 100%)',
          backgroundSize: '20px 20px, 100% 100%',
        }}
      >
        {/* Outer 3D perspective wrapper */}
        <div className="perspective-1000 flex items-center justify-center">
          {isVertical ? (
            <VerticalCard
              badge={badge}
              isFlipped={isFlipped}
              withHolder={badge.showHolderCase}
            />
          ) : (
            <HorizontalCard
              badge={badge}
              isFlipped={isFlipped}
              withHolder={badge.showHolderCase}
            />
          )}
        </div>
      </div>

      {/* Action Buttons in Clean Light Styling */}
      <div className="w-full mt-4 flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 p-3.5 rounded-xl shadow-xs">
        <div className="text-xs font-semibold text-slate-600">
          Print-Ready 3× High Resolution
        </div>

        <div className="flex items-center gap-2">
          {/* Download Current Side */}
          <button
            onClick={() => handleDownload(isFlipped ? 'back' : 'front')}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 transition-all cursor-pointer disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Download {isFlipped ? 'Back (PNG)' : 'Front (PNG)'}</span>
          </button>

          {/* Download Both Sides */}
          <button
            onClick={() => handleDownload('both')}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Exporting...</span>
              </>
            ) : exportSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>{exportSuccess}</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download Both Sides</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ==============================================================
          OFF-SCREEN PURE 1:1 STANDALONE EXPORT NODES
          Notice: Each export node contains ONLY its respective face.
          Zero 3D transform, zero backface bleeding, zero mirrored text!
          ============================================================== */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -9999,
          pointerEvents: 'none',
          opacity: 0,
        }}
        aria-hidden="true"
      >
        <div ref={frontExportRef}>
          {isVertical ? (
            <VerticalCardFront badge={badge} />
          ) : (
            <HorizontalCardFront badge={badge} />
          )}
        </div>
        <div ref={backExportRef}>
          {isVertical ? (
            <VerticalCardBack badge={badge} />
          ) : (
            <HorizontalCardBack badge={badge} />
          )}
        </div>
      </div>
    </div>
  );
};
