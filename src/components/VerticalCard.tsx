import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { EmployeeBadgeState } from '../types';
import { Barcode128 } from './Barcode128';
import { SmartChip } from './SmartChip';
import { HolographicSeal } from './HolographicSeal';
import { SignatureLine } from './SignatureLine';
import { Radio } from 'lucide-react';

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
  const isCheng = badge.name === 'Cheng, W.';

  const CardContent = (
    <div
      className="relative w-[320px] h-[490px] rounded-xl shadow-2xl transition-transform duration-700 transform-style-3d select-none"
      style={{
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}
    >
      {/* ===================== FRONT SIDE ===================== */}
      <div
        className="absolute inset-0 w-[320px] h-[490px] rounded-xl overflow-hidden bg-white border border-slate-300 backface-hidden flex flex-col justify-between"
        style={{
          boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Background Octagon Watermark */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.08] overflow-hidden">
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

      {/* ===================== BACK SIDE ===================== */}
      <div
        className="absolute inset-0 w-[320px] h-[490px] rounded-xl overflow-hidden bg-white border border-slate-300 backface-hidden rotate-y-180 flex flex-col justify-between p-4"
        style={{
          boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.08)',
        }}
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="font-orbitron font-black text-base text-black">OMNICORP</span>
            <img src="/presets/omnicorp_logo_black.png" alt="Logo" className="w-5 h-5 object-contain" />
          </div>
          <div className="flex items-center gap-1 text-[8.5px] font-tech text-slate-700 font-bold uppercase">
            <Radio className="w-3 h-3 text-rose-600" />
            PROX-RFID
          </div>
        </div>

        <div className="flex items-center justify-between bg-slate-50 rounded-lg p-2.5 border border-slate-200 my-1">
          <SmartChip size="md" />
          <HolographicSeal serial={badge.securityCode} size={44} />
        </div>

        <div className="text-[8px] font-sans text-slate-700 leading-tight space-y-1.5 bg-slate-50 p-2.5 rounded border border-slate-200">
          <p className="font-bold text-black uppercase tracking-wider text-[8.5px]">
            PROPERTY OF OMNI CONSUMER PRODUCTS
          </p>
          <p>
            Possession constitutes acceptance of all corporate security regulations. Unauthorized reproduction is prohibited.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 p-2 rounded border border-slate-200">
          <div className="bg-white p-1 rounded border border-slate-300 shrink-0">
            <QRCodeSVG
              value={`https://omnicorp.sec/verify?card=${encodeURIComponent(badge.cardNo)}`}
              size={50}
              level="M"
            />
          </div>
          <div className="text-[7.5px] font-tech text-slate-600 leading-tight">
            <span className="font-bold text-black block uppercase mb-0.5">IF FOUND, RETURN TO:</span>
            {badge.returnAddress}
          </div>
        </div>

        <div className="bg-black h-6 -mx-4 -mb-4 px-4 flex items-center justify-between text-slate-400 font-tech text-[8px] tracking-widest uppercase">
          <span>ENCRYPTED TRACK</span>
          <span className="text-slate-300">ISO-7810</span>
        </div>
      </div>
    </div>
  );

  if (withHolder) {
    return (
      <div className="relative p-3 pt-7 bg-white/40 backdrop-blur-xs rounded-2xl border-2 border-slate-300/80 shadow-2xl flex flex-col items-center">
        <div className="absolute -top-3 w-24 h-5 bg-slate-200/90 border border-slate-300 rounded-t-md flex items-center justify-center">
          <div className="w-10 h-2 rounded-full bg-slate-400" />
        </div>
        {CardContent}
      </div>
    );
  }

  return CardContent;
};
