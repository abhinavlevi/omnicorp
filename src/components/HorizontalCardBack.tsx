import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { EmployeeBadgeState } from '../types';
import { Barcode128 } from './Barcode128';
import { SmartChip } from './SmartChip';
import { HolographicSeal } from './HolographicSeal';
import { Radio } from 'lucide-react';

interface HorizontalCardBackProps {
  badge: EmployeeBadgeState;
}

export const HorizontalCardBack: React.FC<HorizontalCardBackProps> = ({ badge }) => {
  return (
    <div
      className="relative w-[510px] h-[320px] rounded-lg overflow-hidden bg-white border border-[#BFBCB5] flex flex-col justify-between p-4 select-none"
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
  );
};
