import React from 'react';
import { EmployeeBadgeState } from '../types';
import { Barcode128 } from './Barcode128';
import { HolographicSeal } from './HolographicSeal';
import { SignatureLine } from './SignatureLine';

interface VerticalCardFrontProps {
  badge: EmployeeBadgeState;
}

export const VerticalCardFront: React.FC<VerticalCardFrontProps> = ({ badge }) => {
  const isCheng = badge.name === 'Cheng, W.';

  return (
    <div
      className="relative w-[320px] h-[490px] rounded-xl overflow-hidden bg-white border border-slate-300 flex flex-col justify-between select-none"
      style={{
        boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Background Octagon Watermark */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.12] overflow-hidden">
        <img
          src="/presets/omnicorp_watermark.png"
          alt="Watermark"
          className="w-[280px] h-[280px] object-contain"
        />
      </div>

      {/* Top Brushed Metallic Banner */}
      <div
        className="relative px-4 pt-3 pb-2.5 flex flex-col items-center justify-center border-b border-slate-300 shrink-0"
        style={{
          background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 40%, #cbd5e1 70%, #94a3b8 100%)',
        }}
      >
        {badge.showLanyardSlot && (
          <div className="w-14 h-2.5 rounded-full bg-slate-900 border border-slate-600/70 mb-1.5 shadow-inner" />
        )}
        <div className="flex items-center gap-2">
          <span className="font-orbitron font-black text-lg tracking-wider text-black">
            OMNICORP
          </span>
          <img
            src="/presets/omnicorp_logo_black.png"
            alt="Logo"
            className="w-6 h-6 object-contain"
          />
        </div>
        <div className="text-[8px] font-tech tracking-[0.25em] text-slate-700 font-bold uppercase mt-0.5">
          SECURITY ACCESS CREDENTIAL
        </div>
      </div>

      {/* Diagonal Warning Stripe */}
      <div className="h-2 w-full hazard-stripes shrink-0" />

      {/* Central Content */}
      <div className="relative px-5 py-2 flex-1 flex flex-col items-center justify-between z-10">
        {/* Portrait Container */}
        <div className="relative mt-1">
          <div className="w-[145px] h-[165px] rounded overflow-hidden border-2 border-slate-800 bg-slate-100 shadow-md relative">
            <img
              src={badge.photoUrl}
              alt={badge.name}
              className="w-full h-full object-cover origin-center transition-transform duration-75"
              style={{
                transform: `scale(${badge.photoZoom}) translate(${badge.photoPanX}%, ${badge.photoPanY}%)`,
              }}
            />
          </div>

          {/* Red Clearance Class Badge */}
          <div className="absolute -bottom-2 -right-2 bg-[#DC2626] text-white font-sans font-black text-lg px-2.5 py-0.5 rounded shadow border border-red-400">
            {badge.clearanceClass || 'A'}
          </div>
        </div>

        {/* Nameplate & Details */}
        <div className="w-full text-center mt-2">
          <div className="font-sans font-bold text-[18px] text-black tracking-wide uppercase leading-tight truncate">
            {badge.name}
          </div>
          <div className="font-sans font-semibold text-[12px] text-slate-700 tracking-wide uppercase mt-0.5 truncate">
            {badge.department}
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="w-full grid grid-cols-2 gap-2 bg-slate-50 rounded-md p-2 border border-slate-200 text-left mt-1 shadow-2xs">
          <div>
            <div className="text-[7.5px] font-sans font-bold uppercase text-slate-600 tracking-wider">CLEARANCE</div>
            <div className="text-[10.5px] font-sans font-bold text-red-700 uppercase truncate">
              {badge.clearanceLevel}
            </div>
          </div>
          <div>
            <div className="text-[7.5px] font-sans font-bold uppercase text-slate-600 tracking-wider">CARD NUMBER</div>
            <div className="text-[10.5px] font-tech font-bold text-black tracking-wider truncate">
              {badge.cardNo}
            </div>
          </div>
        </div>

        {/* Signature & Seal */}
        <div className="w-full flex items-center justify-between px-1 mt-1">
          <div className="text-left">
            <span className="text-[7px] font-sans font-bold text-slate-600 uppercase tracking-widest block">
              HOLDER SIGNATURE
            </span>
            <div className="h-6 flex items-center">
              {isCheng ? (
                <img
                  src="/presets/prop_signature.png"
                  alt="Signature"
                  className="h-6 object-contain"
                />
              ) : (
                <SignatureLine name={badge.name} width={115} height={24} />
              )}
            </div>
          </div>
          {badge.showHologram && (
            <HolographicSeal serial={badge.cardNo} size={38} className="shadow-2xs" />
          )}
        </div>
      </div>

      {/* Full-Width Bottom Barcode Strip */}
      <div className="bg-white border-t border-slate-300 py-1 px-3 flex flex-col items-center justify-center shrink-0">
        <Barcode128 value={badge.cardNo} height={26} showText={true} />
      </div>
    </div>
  );
};
