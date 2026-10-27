import React from 'react';

interface SmartChipProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SmartChip: React.FC<SmartChipProps> = ({
  className = '',
  size = 'md',
}) => {
  const dimensions = {
    sm: { w: 42, h: 32 },
    md: { w: 52, h: 40 },
    lg: { w: 64, h: 48 },
  };

  const { w, h } = dimensions[size];

  return (
    <div
      className={`relative rounded-md overflow-hidden shadow-inner border border-amber-600/60 select-none ${className}`}
      style={{
        width: `${w}px`,
        height: `${h}px`,
        background: 'linear-gradient(135deg, #fef08a 0%, #eab308 40%, #ca8a04 70%, #a16207 100%)',
      }}
    >
      <svg
        viewBox="0 0 100 80"
        className="w-full h-full shape-rendering-geometricPrecision"
        fill="none"
        stroke="#78350f"
        strokeWidth="2.5"
      >
        {/* Center core contact */}
        <rect x="35" y="24" width="30" height="32" rx="4" fill="#facc15" stroke="#78350f" strokeWidth="2.5" />
        <line x1="50" y1="24" x2="50" y2="56" />

        {/* Peripheral contact channels */}
        <line x1="0" y1="24" x2="35" y2="24" />
        <line x1="0" y1="56" x2="35" y2="56" />
        <line x1="65" y1="24" x2="100" y2="24" />
        <line x1="65" y1="56" x2="100" y2="56" />

        <line x1="35" y1="0" x2="35" y2="24" />
        <line x1="65" y1="0" x2="65" y2="24" />
        <line x1="35" y1="56" x2="35" y2="80" />
        <line x1="65" y1="56" x2="65" y2="80" />
      </svg>
    </div>
  );
};
