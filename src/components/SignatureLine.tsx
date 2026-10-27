import React, { useMemo } from 'react';

interface SignatureLineProps {
  name: string;
  className?: string;
  width?: number;
  height?: number;
}

export const SignatureLine: React.FC<SignatureLineProps> = ({
  name,
  className = '',
  width = 130,
  height = 36,
}) => {
  // Generate a distinct stylized cursive vector path based on the employee name
  const pathD = useMemo(() => {
    // Generate organic cursive loop based on name characters
    let seed = 0;
    for (let i = 0; i < name.length; i++) {
      seed = (seed * 31 + name.charCodeAt(i)) % 1000;
    }

    // Authentic signature loop path
    return `M 8 24 
      Q ${18 + (seed % 10)} ${8 + (seed % 6)}, ${32 + (seed % 12)} ${18 + (seed % 8)} 
      T ${52 + (seed % 8)} ${14 + (seed % 6)} 
      C ${64 + (seed % 10)} ${26 + (seed % 4)}, ${72} ${6}, ${88 + (seed % 14)} ${20}
      Q ${102} ${24}, ${118} ${22}
      M ${15 + (seed % 5)} ${22} L ${95 + (seed % 15)} ${22}
      M ${45} ${12} Q ${55} ${28}, ${70} ${10}`;
  }, [name]);

  return (
    <div className={`relative ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 130 36"
        className="overflow-visible select-none"
      >
        <path
          d={pathD}
          fill="none"
          stroke="#091e3a"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
