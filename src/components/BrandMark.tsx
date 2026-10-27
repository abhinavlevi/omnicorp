import React from 'react';

interface BrandMarkProps {
  variant?: 'dark' | 'white' | 'silver';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const BrandMark: React.FC<BrandMarkProps> = ({
  variant = 'dark',
  className = '',
  size = 'md',
  showText = true,
}) => {
  const isWhite = variant === 'white';
  const primaryColor = isWhite ? '#ffffff' : '#091e3a';
  const gapColor = isWhite ? '#0f172a' : '#ffffff';

  const heights = {
    sm: 22,
    md: 30,
    lg: 40,
    xl: 52,
  };

  const h = heights[size];

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {showText && (
        <span
          className="font-orbitron font-black tracking-[0.2em] uppercase leading-none"
          style={{
            color: primaryColor,
            fontSize: `${h * 0.72}px`,
            textShadow: isWhite ? '0 1px 3px rgba(0,0,0,0.4)' : 'none',
          }}
        >
          OMNICORP
        </span>
      )}

      {/* Octagonal Logo Badge */}
      <svg
        width={h}
        height={h}
        viewBox="-54 -54 108 108"
        className="shrink-0 overflow-visible"
      >
        {/* Outer Octagon */}
        <polygon
          points="
            -48,-20 -20,-48 20,-48 48,-20
            48,20 20,48 -20,48 -48,20"
          fill={primaryColor}
        />

        {/* Outer Gap */}
        <polygon
          points="
            -40,-16 -16,-40 16,-40 40,-16
            40,16 16,40 -16,40 -40,16"
          fill={gapColor}
        />

        {/* Middle Octagon */}
        <polygon
          points="
            -33,-13 -13,-33 13,-33 33,-13
            33,13 13,33 -13,33 -33,13"
          fill={primaryColor}
        />

        {/* Inner Gap */}
        <polygon
          points="
            -25,-10 -10,-25 10,-25 25,-10
            25,10 10,25 -10,25 -25,10"
          fill={gapColor}
        />

        {/* Octagonal C Opening on Right */}
        <polygon
          points="
            -18,-7 -7,-18 7,-18 16,-9 16,-4 6,-14 -6,-14 -14,-6
            -14,6 -6,14 6,14 16,4 16,9 7,18 -7,18 -18,7"
          fill={primaryColor}
        />

        {/* Core Center Point */}
        <polygon
          points="
            -6,-2.5 -2.5,-6 2.5,-6 6,-2.5
            6,2.5 2.5,6 -2.5,6 -6,2.5"
          fill={primaryColor}
        />
      </svg>
    </div>
  );
};
