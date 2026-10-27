import React from 'react';
import { EmployeeBadgeState } from '../types';
import { HorizontalCardFront } from './HorizontalCardFront';
import { HorizontalCardBack } from './HorizontalCardBack';

interface HorizontalCardProps {
  badge: EmployeeBadgeState;
  isFlipped: boolean;
  withHolder?: boolean;
}

export const HorizontalCard: React.FC<HorizontalCardProps> = ({
  badge,
  isFlipped,
  withHolder = false,
}) => {
  const CardContent = (
    <div
      className="relative w-[510px] h-[320px] rounded-lg shadow-xl transition-transform duration-700 transform-style-3d select-none"
      style={{
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}
    >
      {/* Front Face */}
      <div className="absolute inset-0 backface-hidden">
        <HorizontalCardFront badge={badge} />
      </div>

      {/* Back Face */}
      <div className="absolute inset-0 backface-hidden rotate-y-180">
        <HorizontalCardBack badge={badge} />
      </div>
    </div>
  );

  // Clear Acrylic Holder Case matching the reference photo
  if (withHolder) {
    return (
      <div className="relative p-3.5 pt-8 bg-slate-100/50 backdrop-blur-2xs rounded-2xl border-2 border-slate-300/80 shadow-2xl flex flex-col items-center">
        {/* Top Clip Tab with Slot */}
        <div className="absolute -top-3 w-28 h-6 bg-slate-200/95 border border-slate-300 rounded-t-md flex items-center justify-center shadow-xs">
          <div className="w-12 h-2 rounded-full bg-slate-400 shadow-inner" />
        </div>

        {/* Clear Plastic Clips on Side Edges */}
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-14 bg-slate-300/90 rounded-r border border-slate-400/60 shadow-xs" />
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-14 bg-slate-300/90 rounded-l border border-slate-400/60 shadow-xs" />

        {CardContent}
      </div>
    );
  }

  return CardContent;
};
