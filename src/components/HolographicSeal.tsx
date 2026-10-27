import React from 'react';

interface HolographicSealProps {
  serial?: string;
  size?: number;
  className?: string;
}

export const HolographicSeal: React.FC<HolographicSealProps> = ({
  serial = 'SEC-8842-OCP',
  size = 54,
  className = '',
}) => {
  return (
    <div
      className={`relative rounded-full overflow-hidden border border-slate-400/80 shadow-sm hologram-shimmer flex items-center justify-center select-none ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {/* Fine concentric micro-rings */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full opacity-60"
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.75"
      >
        <circle cx="50" cy="50" r="46" strokeDasharray="2,2" />
        <circle cx="50" cy="50" r="38" />
        <circle cx="50" cy="50" r="30" strokeDasharray="3,1" />
        <circle cx="50" cy="50" r="22" />
        <polygon
          points="50,15 75,25 85,50 75,75 50,85 25,75 15,50 25,25"
          stroke="#ffffff"
          strokeWidth="1.2"
          fill="none"
        />
        <text
          x="50"
          y="53"
          textAnchor="middle"
          fontSize="11"
          fontWeight="bold"
          fill="#ffffff"
          fontFamily="monospace"
          letterSpacing="1"
        >
          VALID
        </text>
      </svg>

      <span className="absolute bottom-1 font-tech text-[6px] tracking-widest text-slate-900 font-extrabold uppercase opacity-80">
        {serial.slice(0, 10)}
      </span>
    </div>
  );
};
