import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { EmployeeBadgeState } from '../types';
import { BrandMark } from './BrandMark';
import { Barcode128 } from './Barcode128';
import { SmartChip } from './SmartChip';
import { HolographicSeal } from './HolographicSeal';
import { SignatureLine } from './SignatureLine';
import { Radio } from 'lucide-react';

interface VerticalCardProps {
  badge: EmployeeBadgeState;
  isFlipped: boolean;
}

export const VerticalCard: React.FC<VerticalCardProps> = ({ badge, isFlipped }) => {
  return (
    <div
      className="relative w-[320px] h-[490px] rounded-2xl shadow-2xl transition-transform duration-700 transform-style-3d select-none"
      style={{
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}
    >
      {/* ===================== FRONT SIDE ===================== */}
      <div
        className="absolute inset-0 w-[320px] h-[490px] rounded-2xl overflow-hidden bg-[#F8FAFC] border border-slate-300 backface-hidden flex flex-col justify-between"
        style={{
          boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Background Schematic Watermark (< 5% opacity) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.035] overflow-hidden">
          <svg viewBox="-100 -100 200 200" className="w-[380px] h-[380px]">
            <polygon points="-80,-33 -33,-80 33,-80 80,-33 80,33 33,80 -33,80 -80,33" fill="#091e3a" />
            <polygon points="-65,-27 -27,-65 27,-65 65,-27 65,27 27,65 -27,65 -65,27" fill="#ffffff" />
            <polygon points="-50,-21 -21,-50 21,-50 50,-21 50,21 21,50 -21,50 -50,21" fill="#091e3a" />
          </svg>
        </div>

        {/* Top Header Banner */}
        <div className="relative bg-[#081C36] text-white px-4 pt-3 pb-2.5 flex flex-col items-center justify-center border-b-2 border-rose-600 shrink-0">
          {/* Lanyard Slot Notch */}
          {badge.showLanyardSlot && (
            <div className="w-14 h-2.5 rounded-full bg-slate-900 border border-slate-600/70 mb-1.5 shadow-inner" />
          )}
          <BrandMark variant="white" size="sm" />
          <div className="text-[8px] font-tech tracking-[0.28em] text-slate-300 uppercase mt-0.5">
            SECURITY ACCESS CREDENTIAL
          </div>
        </div>

        {/* Diagonal Warning Accent Stripe */}
        <div className="h-1.5 w-full hazard-stripes shrink-0" />

        {/* Central Content Area */}
        <div className="relative px-5 py-2 flex-1 flex flex-col items-center justify-between z-10">
          {/* Photo Frame Container */}
          <div className="relative mt-1">
            <div className="w-[140px] h-[160px] rounded-lg overflow-hidden border-2 border-slate-800 bg-slate-200 shadow-md relative">
              <img
                src={badge.photoUrl}
                alt={badge.name}
                className="w-full h-full object-cover origin-center transition-transform duration-75"
                style={{
                  transform: `scale(${badge.photoZoom}) translate(${badge.photoPanX}%, ${badge.photoPanY}%)`,
                }}
              />
              {/* Corner crosshairs */}
              <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-rose-500 pointer-events-none" />
              <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-rose-500 pointer-events-none" />
              <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-rose-500 pointer-events-none" />
              <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-rose-500 pointer-events-none" />
            </div>

            {/* Clearance Class Floating Badge */}
            <div className="absolute -bottom-2 -right-2 bg-rose-600 text-white font-orbitron font-extrabold text-sm px-2 py-0.5 rounded shadow border border-rose-400">
              {badge.clearanceClass || 'A'}
            </div>
          </div>

          {/* Nameplate & Details Box */}
          <div className="w-full text-center mt-2.5">
            <div className="font-orbitron font-extrabold text-[17px] text-[#091E3A] tracking-wider uppercase leading-tight truncate">
              {badge.name}
            </div>
            <div className="font-chakra font-semibold text-[11px] text-slate-600 tracking-wide uppercase mt-0.5 truncate">
              {badge.department}
            </div>
          </div>

          {/* Credentials Grid */}
          <div className="w-full grid grid-cols-2 gap-2 bg-slate-100/90 rounded-md p-2 border border-slate-200/90 text-left mt-2 shadow-xs">
            <div>
              <div className="text-[7.5px] font-tech uppercase text-slate-500 tracking-wider">CLEARANCE</div>
              <div className="text-[10px] font-chakra font-bold text-rose-700 tracking-wide uppercase truncate">
                {badge.clearanceLevel}
              </div>
            </div>
            <div>
              <div className="text-[7.5px] font-tech uppercase text-slate-500 tracking-wider">CARD NUMBER</div>
              <div className="text-[10px] font-tech font-bold text-slate-800 tracking-wider truncate">
                {badge.cardNo}
              </div>
            </div>
            <div>
              <div className="text-[7.5px] font-tech uppercase text-slate-500 tracking-wider">VALID THRU</div>
              <div className="text-[9.5px] font-tech font-semibold text-slate-700">
                {badge.expiryDate}
              </div>
            </div>
            <div>
              <div className="text-[7.5px] font-tech uppercase text-slate-500 tracking-wider">SECURITY CODE</div>
              <div className="text-[9.5px] font-tech font-semibold text-slate-700 truncate">
                {badge.securityCode}
              </div>
            </div>
          </div>

          {/* Signature / Validation */}
          <div className="w-full flex items-center justify-between px-1 mt-1">
            <div className="text-left">
              <span className="text-[7px] font-tech text-slate-500 uppercase tracking-widest block">
                HOLDER SIGNATURE
              </span>
              <SignatureLine name={badge.name} width={115} height={26} />
            </div>
            {badge.showHologram && (
              <HolographicSeal serial={badge.cardNo} size={40} className="shadow-xs" />
            )}
          </div>
        </div>

        {/* Full-Width Bottom Barcode Strip */}
        <div className="bg-white border-t border-slate-300 py-1.5 px-3 flex flex-col items-center justify-center shrink-0">
          <Barcode128 value={badge.cardNo} height={28} showText={true} />
        </div>
      </div>

      {/* ===================== BACK SIDE ===================== */}
      <div
        className="absolute inset-0 w-[320px] h-[490px] rounded-2xl overflow-hidden bg-[#F8FAFC] border border-slate-300 backface-hidden rotate-y-180 flex flex-col justify-between p-4"
        style={{
          boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Background Schematic Watermark (< 5% opacity) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.04]">
          <svg viewBox="0 0 200 200" className="w-[350px] h-[350px]">
            <circle cx="100" cy="100" r="85" fill="none" stroke="#091e3a" strokeWidth="2" strokeDasharray="4,4" />
            <circle cx="100" cy="100" r="65" fill="none" stroke="#091e3a" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="45" fill="none" stroke="#091e3a" strokeWidth="2" />
            <line x1="10" y1="100" x2="190" y2="100" stroke="#091e3a" strokeWidth="1" />
            <line x1="100" y1="10" x2="100" y2="190" stroke="#091e3a" strokeWidth="1" />
          </svg>
        </div>

        {/* Top Section with Brandmark */}
        <div className="relative z-10 flex items-center justify-between border-b border-slate-200 pb-2">
          <BrandMark variant="dark" size="sm" />
          <div className="flex items-center gap-1 text-[9px] font-tech text-slate-600 font-bold uppercase tracking-wider">
            <Radio className="w-3 h-3 text-rose-600 animate-pulse" />
            PROX-RFID
          </div>
        </div>

        {/* Contact Pad & Holographic Grid */}
        <div className="relative z-10 flex items-center justify-between bg-slate-100 rounded-lg p-3 border border-slate-200 my-1">
          <SmartChip size="md" />
          <div className="flex flex-col items-end">
            <HolographicSeal serial={badge.securityCode} size={48} />
            <span className="font-tech text-[7px] text-slate-500 mt-1 uppercase tracking-widest">
              SECURE CRYPTO CHIP
            </span>
          </div>
        </div>

        {/* Legal Authorization Notice */}
        <div className="relative z-10 text-[8px] font-sans text-slate-700 leading-tight space-y-1.5 bg-white/80 p-2.5 rounded border border-slate-200 shadow-xs">
          <p className="font-bold text-[#091E3A] uppercase tracking-wider text-[8.5px]">
            PROPERTY OF OMNI CONSUMER PRODUCTS CORP.
          </p>
          <p>
            This credential is the exclusive property of OmniCorp. Possession constitutes acceptance of all corporate security regulations, non-disclosure agreements, and surveillance monitoring.
          </p>
          <p>
            Unauthorized reproduction, transfer, or possession is a federal violation punishable under corporate security directive 11-B.
          </p>
        </div>

        {/* Return Routing & QR Code */}
        <div className="relative z-10 flex items-center gap-3 bg-slate-100/90 p-2 rounded border border-slate-200">
          <div className="bg-white p-1 rounded border border-slate-300 shrink-0">
            <QRCodeSVG
              value={`https://omnicorp.sec/verify?card=${encodeURIComponent(badge.cardNo)}&code=${encodeURIComponent(badge.securityCode)}`}
              size={54}
              level="M"
            />
          </div>
          <div className="text-[7.5px] font-tech text-slate-600 leading-tight">
            <span className="font-bold text-[#091E3A] block uppercase mb-0.5">IF FOUND, RETURN POSTAGE GUARANTEED:</span>
            {badge.returnAddress}
            <span className="block text-[8px] font-bold text-rose-700 mt-1 uppercase">
              EMERGENCY COMM: 1-800-555-OMNI
            </span>
          </div>
        </div>

        {/* Bottom Magnetic Stripe Mock */}
        <div className="relative z-10 bg-[#0f172a] h-7 -mx-4 -mb-4 px-4 flex items-center justify-between text-slate-400 font-tech text-[8px] tracking-widest uppercase">
          <span>MAG-TRACK 2 / ENCRYPTED</span>
          <span className="text-slate-300">ISO-7810-ID1</span>
        </div>
      </div>
    </div>
  );
};
