import React from 'react';
import { EmployeeBadgeState } from '../types';
import { VerticalCardFront } from './VerticalCardFront';
import { VerticalCardBack } from './VerticalCardBack';

interface VerticalCardProps {
  badge: EmployeeBadgeState;
  isFlipped: boolean;
  withHolder?: boolean;
}

export const VerticalCard: React.FC<VerticalCardProps> = ({
  badge,
  isFlipped,
  withHolder = false,
}) => {
  const CardContent = (
    <div
      className="relative w-[320px] h-[490px] rounded-xl shadow-2xl transition-transform duration-700 transform-style-3d select-none"
      style={{
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}
    >
      {/* Front Face */}
      <div className="absolute inset-0 backface-hidden">
        <VerticalCardFront badge={badge} />
      </div>

      {/* Back Face */}
      <div className="absolute inset-0 backface-hidden rotate-y-180">
        <VerticalCardBack badge={badge} />
      </div>
    </div>
  );

  if (withHolder) {
    return (
      <div className="relative p-3 pt-7 bg-slate-100/50 backdrop-blur-2xs rounded-2xl border-2 border-slate-300/80 shadow-2xl flex flex-col items-center">
        <div className="absolute -top-3 w-24 h-5 bg-slate-200/90 border border-slate-300 rounded-t-md flex items-center justify-center">
          <div className="w-10 h-2 rounded-full bg-slate-400" />
        </div>
        {CardContent}
      </div>
    );
  }

  return CardContent;
};
