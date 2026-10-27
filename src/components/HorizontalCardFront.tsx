import React from 'react';
import { EmployeeBadgeState } from '../types';
import { SignatureLine } from './SignatureLine';

interface HorizontalCardFrontProps {
  badge: EmployeeBadgeState;
}

export const HorizontalCardFront: React.FC<HorizontalCardFrontProps> = ({ badge }) => {
  const isCheng = badge.name === 'Cheng, W.';

  return (
    <div
      className="relative w-[510px] h-[320px] rounded-lg overflow-hidden bg-white border border-[#BFBCB5] flex flex-col justify-between select-none"
      style={{
        boxShadow: '0 6px 20px -3px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* Top Metallic Silver Header Bar */}
      <div
        className="relative h-[62px] w-full px-6 flex items-center justify-between border-b border-[#AFAEA8] shrink-0"
        style={{
          background: 'linear-gradient(180deg, #EBE9E5 0%, #DCD9D4 40%, #CBC8C2 75%, #BFBCB5 100%)',
        }}
      >
        {/* OMNICORP typography matching prop */}
        <div className="font-orbitron font-black tracking-[0.24em] text-[28px] text-black uppercase select-none drop-shadow-2xs">
          OMNICORP
        </div>

        {/* Official Black Octagon Logo */}
        <div className="shrink-0 flex items-center">
          <img
            src="/presets/omnicorp_logo_black.png"
            alt="OmniCorp"
            className="w-[46px] h-[46px] object-contain drop-shadow-2xs"
          />
        </div>
      </div>

      {/* Card Body Section */}
      <div className="relative flex-1 flex overflow-hidden bg-white">
        {/* Center Octagon Watermark */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
          <img
            src="/presets/omnicorp_watermark.png"
            alt="Watermark"
            className="w-[185px] h-[185px] object-contain ml-12 opacity-[0.28]"
          />
        </div>

        {/* Left Column: Division Emblem + Big Bold Red Clearance Letter */}
        <div className="w-[88px] flex flex-col items-center justify-between pt-2 pb-1.5 pl-3 pr-1 shrink-0 z-10">
          {/* Division Emblem */}
          <div className="w-[52px] h-[52px] flex items-center justify-center">
            <img
              src="/presets/division_emblem.png"
              alt="Division Emblem"
              className="w-full h-full object-contain filter drop-shadow-2xs"
            />
          </div>

          {/* Huge Bold Red Clearance Letter */}
          <div className="font-sans font-black text-[84px] text-[#D82613] leading-none select-none tracking-tighter -mb-2">
            {badge.clearanceClass || 'A'}
          </div>
        </div>

        {/* Middle Column: Fields & Real Signature */}
        <div className="flex-1 flex flex-col justify-between pt-2 pb-2 pl-3 pr-2 z-10 text-black">
          {/* Name */}
          <div>
            <span className="text-[10px] font-sans font-bold text-black uppercase tracking-wider block leading-none">
              Name
            </span>
            <span className="font-sans font-bold text-[17.5px] text-black tracking-wide leading-tight truncate block mt-0.5">
              {badge.name}
            </span>
          </div>

          {/* Department/Division */}
          <div>
            <span className="text-[9px] font-sans font-bold text-black uppercase tracking-wider block leading-none">
              Department/Division
            </span>
            <span className="font-sans font-semibold text-[13.5px] text-black tracking-wide leading-tight truncate block mt-0.5">
              {badge.department}
            </span>
          </div>

          {/* Clearance Level */}
          <div>
            <span className="text-[9px] font-sans font-bold text-black uppercase tracking-wider block leading-none">
              Clearance Level
            </span>
            <span className="font-sans font-semibold text-[13.5px] text-black tracking-wide leading-tight truncate block mt-0.5">
              {badge.clearanceLevel}
            </span>
          </div>

          {/* Card No */}
          <div>
            <span className="text-[9px] font-sans font-bold text-black uppercase tracking-wider block leading-none">
              Card No
            </span>
            <span className="font-tech font-bold text-[13.5px] text-black tracking-widest leading-tight block mt-0.5">
              {badge.cardNo}
            </span>
          </div>

          {/* Holder's signature */}
          <div className="relative pt-0.5">
            <span className="text-[8.5px] font-sans font-bold text-black uppercase tracking-wider block leading-none">
              Holder's signature
            </span>
            <div className="h-7 flex items-center">
              {isCheng ? (
                <img
                  src="/presets/prop_signature.png"
                  alt="Signature"
                  className="h-6 object-contain ml-2 mt-0.5"
                />
              ) : (
                <SignatureLine name={badge.name} width={135} height={26} />
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Caution Stripe Bar + Real Photo */}
        <div className="w-[162px] flex flex-col shrink-0 z-10 relative">
          {/* Orange-Red Caution Stripe Bar */}
          <div className="h-[21px] w-[148px] prop-stripes shadow-2xs" />

          {/* Portrait Container - Flush to bottom edge */}
          <div className="w-[148px] flex-1 overflow-hidden bg-slate-100 relative">
            <img
              src={badge.photoUrl}
              alt={badge.name}
              className="w-full h-full object-cover origin-center transition-transform duration-75"
              style={{
                transform: `scale(${badge.photoZoom}) translate(${badge.photoPanX}%, ${badge.photoPanY}%)`,
              }}
            />
          </div>

          {/* Vertical 090 Code in Far Right Margin */}
          <div className="absolute right-0 top-6 bottom-0 w-[14px] flex items-center justify-center">
            <span className="font-tech text-[8px] text-slate-500 font-bold rotate-90 tracking-widest select-none">
              {badge.securityCode || '090'}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom edge thin line */}
      <div className="h-[2px] bg-black w-full shrink-0" />
    </div>
  );
};
