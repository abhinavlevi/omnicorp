import React from 'react';
import { BrandMark } from './BrandMark';
import { ShieldCheck, Cpu, Lock, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#050912] border-t border-slate-800/90 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Brand & Disclaimer */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <BrandMark variant="white" size="sm" />
          </div>
          <p className="text-xs font-tech text-slate-400 leading-relaxed max-w-lg">
            High-fidelity OmniCorp security credentials and employee access keycard generator inspired by cinematic prop design. Engineered with sub-pixel rendering, cryptographic smart contact pads, and physical CR-80 card specifications.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-tech text-slate-400 pt-1">
            <span>DELTA CITY FACILITY PASS</span>
            <span>•</span>
            <span>METRO WEST DETROIT MI</span>
            <span>•</span>
            <span className="text-rose-400 font-bold">SEC-DIRECTIVE-4</span>
          </div>
        </div>

        {/* Col 2: Specifications */}
        <div className="space-y-2.5">
          <h3 className="font-chakra font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-rose-500" />
            <span>Card Specifications</span>
          </h3>
          <ul className="text-xs font-tech text-slate-400 space-y-1.5">
            <li>• CR-80 Vertical: 320 × 490 px</li>
            <li>• Horizontal Pass: 500 × 315 px</li>
            <li>• Print Engine: 3× Pixel Ratio (300 DPI)</li>
            <li>• Barcode: Code 128 High-Contrast</li>
            <li>• Proximity: RFID ISO 14443-A Mock</li>
          </ul>
        </div>

        {/* Col 3: Privacy & Security */}
        <div className="space-y-2.5">
          <h3 className="font-chakra font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero-Knowledge Privacy</span>
          </h3>
          <p className="text-xs font-tech text-slate-400 leading-relaxed">
            100% Client-Side execution. Portraits and personal information are processed locally inside your web browser. No imagery is transferred to external servers.
          </p>
          <div className="pt-2 flex items-center gap-1.5 text-xs font-chakra text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Local Browser Sandbox</span>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Prop Disclaimer */}
      <div className="max-w-7xl mx-auto border-t border-slate-900 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-tech text-slate-400 gap-3">
        <div className="flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
          <span>Fictional prop replica fan creation. OmniCorp, Omni Consumer Products, and RoboCop are trademarks of their respective copyright holders.</span>
        </div>
        <div>
          <span>Engineered for Production Props &amp; Cosplay Enthusiasts</span>
        </div>
      </div>
    </footer>
  );
};
