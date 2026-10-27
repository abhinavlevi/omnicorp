import React from 'react';

interface BrandMarkProps {
  variant?: 'dark' | 'white' | 'red';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const BrandMark: React.FC<BrandMarkProps> = ({
  variant = 'dark',
  className = '',
  size = 'md',
  showText = true,
}) => {
  const heights = {
    sm: 26,
    md: 34,
    lg: 44,
  };

  const h = heights[size];
  const logoSrc = variant === 'red' ? '/presets/omnicorp_logo_red.png' : '/presets/omnicorp_logo_black.png';
  const textColor = variant === 'white' ? '#ffffff' : variant === 'red' ? '#dc2626' : '#091e3a';

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {showText && (
        <span
          className="font-orbitron font-black tracking-[0.22em] uppercase leading-none"
          style={{
            color: textColor,
            fontSize: `${h * 0.72}px`,
          }}
        >
          OMNICORP
        </span>
      )}

      {/* Official Octagon Logo Image from user upload */}
      <img
        src={logoSrc}
        alt="OmniCorp Logo"
        style={{ width: `${h}px`, height: `${h}px` }}
        className="shrink-0 object-contain"
      />
    </div>
  );
};
