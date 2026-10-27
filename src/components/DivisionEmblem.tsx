import React from 'react';

interface DivisionEmblemProps {
  size?: number;
  className?: string;
}

/**
 * Division / Project emblem as seen in authentic OmniCorp medical / cybernetics credential
 */
export const DivisionEmblem: React.FC<DivisionEmblemProps> = ({
  size = 38,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      className={`shrink-0 overflow-visible select-none ${className}`}
    >
      <defs>
        <linearGradient id="goldRing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
      </defs>

      {/* Outer gold disc with dark boundary */}
      <circle cx="30" cy="30" r="28" fill="none" stroke="url(#goldRing)" strokeWidth="4.5" />
      <circle cx="30" cy="30" r="23" fill="none" stroke="#a16207" strokeWidth="1" />

      {/* Horizontal grating bars */}
      <line x1="12" y1="20" x2="48" y2="20" stroke="#854d0e" strokeWidth="1.8" />
      <line x1="10" y1="25" x2="50" y2="25" stroke="#854d0e" strokeWidth="1.8" />
      <line x1="8" y1="30" x2="52" y2="30" stroke="#854d0e" strokeWidth="1.8" />
      <line x1="10" y1="35" x2="50" y2="35" stroke="#854d0e" strokeWidth="1.8" />
      <line x1="12" y1="40" x2="48" y2="40" stroke="#854d0e" strokeWidth="1.8" />

      {/* Inner gold arc */}
      <path
        d="M 28 14 A 16 16 0 0 1 44 30 A 16 16 0 0 1 28 46"
        fill="none"
        stroke="#eab308"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Red Directional Arrow / Chevron pointing left */}
      <polygon
        points="6,30 20,18 20,24 28,24 28,36 20,36 20,42"
        fill="#dc2626"
        stroke="#991b1b"
        strokeWidth="1"
      />
    </svg>
  );
};
