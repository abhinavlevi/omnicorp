import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { EmployeeBadgeState } from '../types';
import { BrandMark } from './BrandMark';
import { Barcode128 } from './Barcode128';
import { SmartChip } from './SmartChip';
import { HolographicSeal } from './HolographicSeal';
import { DivisionEmblem } from './DivisionEmblem';
import { SignatureLine } from './SignatureLine';
import { Radio } from 'lucide-react';

interface HorizontalCardProps {
  badge: EmployeeBadgeState;
  isFlipped: boolean;
}

export const HorizontalCard: React.FC<HorizontalCardProps> = ({ badge, isFlipped }) => {
  return (
    <div
      className="relative w-[500px] h-[315px] rounded-2xl shadow-2xl transition-transform duration-700 transform-style-3d select-none"
      style={{
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}
    >
      {/* ===================== FRONT SIDE ===================== */}
      <div
        className="absolute inset-0 w-[500px] h-[315px] rounded-2xl overflow-hidden bg-[#F8FAFC] border border-slate-300 backface-hidden flex flex-col justify-between"
        style={{
          boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Top Header: Brushed metallic silver banner */}
        <div
          className="relative h-[50px] w-full px-5 flex items-center justify-between border-b border-slate-300 shrink-0"
          style={{
            background: 'linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 50%, #94a3b8 100%)',
          }}
        >
          {/* OMNICORP typography */}
          <div className="font-orbitron font-black tracking-[0.26em] text-[26px] text-[#091E3A] uppercase select-none">
            OMNICORP
          </div>

          {/* Octagonal Logo Badge */}
          <div className="shrink-0">
            <svg width="42" height="42" viewBox="-54 -54 108 108">
              <polygon
                points="-48,-20 -20,-48 20,-48 48,-20 48,20 20,48 -20,48 -48,20"
                fill="#091e3a"
              />
              <polygon
                points="-40,-16 -16,-40 16,-40 40,-16 40,16 16,40 -16,40 -40,16"
                fill="#ffffff"
              />
              <polygon
                points="-33,-13 -13,-33 13,-33 33,-13 33,13 13,33 -13,33 -33,13"
                fill="#091e3a"
              />
              <polygon
                points="-25,-10 -10,-25 10,-25 25,-10 25,10 10,25 -10,25 -25,10"
                fill="#ffffff"
              />
              <polygon
                points="-18,-7 -7,-18 7,-18 16,-9 16,-4 6,-14 -6,-14 -14,-6 -14,6 -6,14 6,14 16,4 16,9 7,18 -7,18 -18,7"
                fill="#091e3a"
              />
              <polygon
                points="-6,-2.5 -2.5,-6 2.5,-6 6,-2.5 6,2.5 2.5,6 -2.5,6 -6,2.5"
                fill="#091e3a"
              />
            </svg>
          </div>
        </div>

        {/* Main Body Section */}
        <div className="relative flex-1 flex px-4 pt-2 pb-1 overflow-hidden z-10">
          {/* Center Octagonal Watermark (< 5% opacity strictly conforming to guidelines) */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.045] overflow-hidden">
            <svg viewBox="-80 -80 160 160" className="w-[300px] h-[300px]">
              <polygon
                points="-60,-25 -25,-60 25,-60 60,-25 60,25 25,60 -25,60 -60,25"
                fill="none"
                stroke="#091e3a"
                strokeWidth="12"
              />
              <polygon
                points="-42,-18 -18,-42 18,-42 42,-18 42,18 18,42 -18,42 -42,18"
                fill="none"
                stroke="#091e3a"
                strokeWidth="8"
              />
              <polygon
                points="-24,-10 -10,-24 10,-24 24,-10 24,10 10,24 -10,24 -24,10"
                fill="#091e3a"
              />
            </svg>
          </div>

          {/* Left Column: Division Emblem + Big Bold Red Clearance Letter */}
          <div className="w-[85px] flex flex-col items-center justify-between py-1 shrink-0">
            <DivisionEmblem size={46} />
            <div className="font-orbitron font-black text-[62px] text-[#DC2626] leading-none select-none tracking-tighter">
              {badge.clearanceClass || 'A'}
            </div>
          </div>

          {/* Middle Column: Fields & Information */}
          <div className="flex-1 flex flex-col justify-between pl-3 pr-2 py-0.5 z-10">
            {/* Field: Name */}
            <div>
              <span className="text-[9px] font-sans font-bold text-slate-500 uppercase tracking-wider block leading-none">
                Name
              </span>
              <span className="font-chakra font-bold text-[18px] text-[#091E3A] tracking-wide leading-tight truncate block">
                {badge.name}
              </span>
            </div>

            {/* Field: Department/Division */}
            <div>
              <span className="text-[8.5px] font-sans font-bold text-slate-500 uppercase tracking-wider block leading-none">
                Department/Division
              </span>
              <span className="font-chakra font-bold text-[13px] text-slate-800 tracking-wide leading-tight truncate block">
                {badge.department}
              </span>
            </div>

            {/* Field: Clearance Level */}
            <div>
              <span className="text-[8.5px] font-sans font-bold text-slate-500 uppercase tracking-wider block leading-none">
                Clearance Level
              </span>
              <span className="font-chakra font-bold text-[13px] text-slate-800 tracking-wide leading-tight truncate block">
                {badge.clearanceLevel}
              </span>
            </div>

            {/* Field: Card No */}
            <div>
              <span className="text-[8.5px] font-sans font-bold text-slate-500 uppercase tracking-wider block leading-none">
                Card No
              </span>
              <span className="font-tech font-bold text-[13px] text-slate-900 tracking-widest leading-tight block">
                {badge.cardNo}
              </span>
            </div>

            {/* Field: Holder's signature */}
            <div className="relative pt-0.5">
              <span className="text-[8px] font-sans font-bold text-slate-500 uppercase tracking-wider block leading-none">
                Holder's signature
              </span>
              <SignatureLine name={badge.name} width={135} height={28} />
            </div>
          </div>

          {/* Right Column: Hazard Stripe + Portrait Photo */}
          <div className="w-[145px] flex flex-col shrink-0 pl-1 z-10 relative">
            {/* Orange-Red Diagonal Caution Stripe Bar */}
            <div className="h-[18px] w-full hazard-stripes rounded-sm mb-1 shadow-xs" />

            {/* Portrait Container with interactive pan & zoom */}
            <div className="flex-1 rounded-sm overflow-hidden border-2 border-slate-700 bg-slate-200 relative shadow-sm">
              <img
                src={badge.photoUrl}
                alt={badge.name}
                className="w-full h-full object-cover origin-center transition-transform duration-75"
                style={{
                  transform: `scale(${badge.photoZoom}) translate(${badge.photoPanX}%, ${badge.photoPanY}%)`,
                }}
              />
              {/* Corner tech target indicators */}
              <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-rose-500 pointer-events-none" />
              <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-rose-500 pointer-events-none" />
              <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-rose-500 pointer-events-none" />
              <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-rose-500 pointer-events-none" />
            </div>

            {/* Vertical security serial on far right edge */}
            <div className="absolute -right-3 top-6 bottom-0 flex items-center justify-center">
              <span className="font-tech text-[8px] text-slate-400 font-bold rotate-90 tracking-widest select-none">
                {badge.securityCode.split('-')[0] || '090'}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom subtle edge */}
        <div className="h-1.5 bg-[#091E3A] w-full shrink-0" />
      </div>

      {/* ===================== BACK SIDE ===================== */}
      <div
        className="absolute inset-0 w-[500px] h-[315px] rounded-2xl overflow-hidden bg-[#F8FAFC] border border-slate-300 backface-hidden rotate-y-180 flex flex-col justify-between p-4"
        style={{
          boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Background Schematic Watermark (< 5% opacity) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.04]">
          <svg viewBox="0 0 300 200" className="w-[450px] h-[300px]">
            <polygon
              points="150,10 270,75 270,145 150,195 30,145 30,75"
              fill="none"
              stroke="#091e3a"
              strokeWidth="2.5"
            />
            <circle cx="150" cy="105" r="50" fill="none" stroke="#091e3a" strokeWidth="2" strokeDasharray="5,5" />
          </svg>
        </div>

        {/* Top Header Row */}
        <div className="relative z-10 flex items-center justify-between border-b border-slate-200 pb-2">
          <BrandMark variant="dark" size="sm" />
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[9px] font-tech text-slate-700 font-bold uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
              <Radio className="w-3 h-3 text-rose-600 animate-pulse" />
              <span>RFID-PROX DETROIT SEC-04</span>
            </div>
          </div>
        </div>

        {/* Middle Two-Column Grid */}
        <div className="relative z-10 flex items-start gap-4 my-auto">
          {/* Left: Smart Chip + Hologram + QR */}
          <div className="flex items-center gap-3 bg-slate-100/90 p-2.5 rounded-lg border border-slate-200 shrink-0">
            <SmartChip size="md" />
            <HolographicSeal serial={badge.cardNo} size={46} />
            <div className="bg-white p-1 rounded border border-slate-300">
              <QRCodeSVG
                value={`https://omnicorp.sec/verify?card=${encodeURIComponent(badge.cardNo)}&code=${encodeURIComponent(badge.securityCode)}`}
                size={44}
                level="M"
              />
            </div>
          </div>

          {/* Right: Legal Notice and Return Instructions */}
          <div className="flex-1 text-[8px] font-sans text-slate-700 leading-relaxed bg-white/90 p-2.5 rounded-lg border border-slate-200 shadow-xs">
            <p className="font-bold text-[#091E3A] uppercase tracking-wider text-[8.5px] mb-1">
              OFFICIAL PROPERTY OF OMNI CONSUMER PRODUCTS
            </p>
            <p className="mb-1">
              This card is non-transferable and must be surrendered upon termination or security inspection. All corporate premises are monitored under Directive 4.
            </p>
            <p className="text-[7.5px] text-slate-500 font-tech">
              IF FOUND: Drop in any mailbox. Return to {badge.returnAddress}.
            </p>
          </div>
        </div>

        {/* Bottom Full-Width Barcode Strip */}
        <div className="relative z-10 bg-white border border-slate-200 rounded-md py-1 px-3 flex items-center justify-between shadow-xs">
          <Barcode128 value={badge.cardNo} height={24} showText={false} className="w-2/3" />
          <span className="font-tech text-[10px] font-bold text-slate-800 tracking-wider">
            *{badge.cardNo}*
          </span>
        </div>
      </div>
    </div>
  );
};
