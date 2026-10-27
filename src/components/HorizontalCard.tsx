import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { EmployeeBadgeState } from '../types';
import { Barcode128 } from './Barcode128';
import { SmartChip } from './SmartChip';
import { HolographicSeal } from './HolographicSeal';
import { SignatureLine } from './SignatureLine';
import { Radio } from 'lucide-react';

interface HorizontalCardProps {
  badge: EmployeeBadgeState;
  isFlipped: boolean;
  withHolder?: boolean;
}

export const HorizontalCard: React.FC<HorizontalCardProps> = ({
  badge,
  isFlipped,
  withHolder = false,
}) => {
  const isCheng = badge.name === 'Cheng, W.';

  const CardContent = (
    <div
      className="relative w-[510px] h-[320px] rounded-lg shadow-xl transition-transform duration-700 transform-style-3d select-none"
      style={{
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}
    >
      {/* ===================== FRONT SIDE (1:1 PROP TWIN) ===================== */}
      <div
        className="absolute inset-0 w-[510px] h-[320px] rounded-lg overflow-hidden bg-white border border-[#BFBCB5] backface-hidden flex flex-col justify-between"
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
          {/* Prominent Center Octagon Watermark (< 5% opacity from prop) */}
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

            {/* Huge Bold Red Clearance Letter A */}
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

            {/* Portrait Container - Extends flush to the bottom edge */}
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

      {/* ===================== BACK SIDE ===================== */}
      <div
        className="absolute inset-0 w-[510px] h-[320px] rounded-lg overflow-hidden bg-white border border-[#BFBCB5] backface-hidden rotate-y-180 flex flex-col justify-between p-4"
        style={{
          boxShadow: '0 6px 20px -3px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(0, 0, 0, 0.06)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
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
          <div className="flex items-center gap-1 text-[9px] font-tech text-slate-700 font-bold uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
            <Radio className="w-3 h-3 text-rose-600 animate-pulse" />
            <span>RFID PROX ACCESS</span>
          </div>
        </div>

        {/* Center Details */}
        <div className="flex items-start gap-4 my-auto">
          <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-lg border border-slate-200 shrink-0">
            <SmartChip size="md" />
            <HolographicSeal serial={badge.cardNo} size={44} />
            <div className="bg-white p-1 rounded border border-slate-300">
              <QRCodeSVG
                value={`https://omnicorp.sec/verify?card=${encodeURIComponent(badge.cardNo)}`}
                size={42}
                level="M"
              />
            </div>
          </div>

          <div className="flex-1 text-[8.5px] font-sans text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <p className="font-bold text-black uppercase tracking-wider text-[9px] mb-1">
              PROPERTY OF OMNI CONSUMER PRODUCTS
            </p>
            <p className="mb-1">
              This card is non-transferable and must be surrendered upon request. All corporate premises are strictly monitored.
            </p>
            <p className="text-[8px] text-slate-500 font-tech">
              IF FOUND: Return to {badge.returnAddress}.
            </p>
          </div>
        </div>

        {/* Bottom Barcode Strip */}
        <div className="bg-white border border-slate-200 rounded-md py-1.5 px-3 flex items-center justify-between">
          <Barcode128 value={badge.cardNo} height={22} showText={false} className="w-2/3" />
          <span className="font-tech text-[10px] font-bold text-black tracking-wider">
            *{badge.cardNo}*
          </span>
        </div>
      </div>
    </div>
  );

  // Clear Acrylic Holder Case matching the reference photo
  if (withHolder) {
    return (
      <div className="relative p-3.5 pt-8 bg-slate-100/50 backdrop-blur-2xs rounded-2xl border-2 border-slate-300/80 shadow-2xl flex flex-col items-center">
        {/* Top Clip Tab with Slot */}
        <div className="absolute -top-3 w-28 h-6 bg-slate-200/95 border border-slate-300 rounded-t-md flex items-center justify-center shadow-xs">
          <div className="w-12 h-2 rounded-full bg-slate-400 shadow-inner" />
        </div>

        {/* Clear Plastic Clips on Side Edges */}
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-14 bg-slate-300/90 rounded-r border border-slate-400/60 shadow-xs" />
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-14 bg-slate-300/90 rounded-l border border-slate-400/60 shadow-xs" />

        {CardContent}
      </div>
    );
  }

  return CardContent;
};
