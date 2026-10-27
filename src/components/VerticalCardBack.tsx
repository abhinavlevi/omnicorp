import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { EmployeeBadgeState } from '../types';
import { SmartChip } from './SmartChip';
import { HolographicSeal } from './HolographicSeal';
import { Radio } from 'lucide-react';

interface VerticalCardBackProps {
  badge: EmployeeBadgeState;
}

export const VerticalCardBack: React.FC<VerticalCardBackProps> = ({ badge }) => {
  return (
    <div
      className="relative w-[320px] h-[490px] rounded-xl overflow-hidden bg-white border border-slate-300 flex flex-col justify-between p-4 select-none"
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
  );
};
