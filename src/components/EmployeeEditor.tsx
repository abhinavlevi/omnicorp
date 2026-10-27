import React, { useRef } from 'react';
import { EmployeeBadgeState, CardLayout } from '../types';
import { EMPLOYEE_PRESETS } from '../data/presets';
import { sound } from '../utils/audio';
import {
  Upload,
  RotateCcw,
  Shield,
  CreditCard,
  User,
  Sliders,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface EmployeeEditorProps {
  badge: EmployeeBadgeState;
  onChange: (updated: Partial<EmployeeBadgeState>) => void;
  onResetPhoto: () => void;
}

export const EmployeeEditor: React.FC<EmployeeEditorProps> = ({
  badge,
  onChange,
  onResetPhoto,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePresetSelect = (presetId: string) => {
    sound.playClick();
    const preset = EMPLOYEE_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    onChange({
      name: preset.name,
      department: preset.department,
      clearanceLevel: preset.clearanceLevel,
      clearanceClass: preset.clearanceClass,
      cardNo: preset.cardNo,
      securityCode: preset.securityCode,
      signature: preset.signature,
      photoUrl: preset.photoUrl,
      photoZoom: 1.0,
      photoPanX: 0,
      photoPanY: 0,
    });
  };

  const handleLayoutSelect = (layout: CardLayout) => {
    sound.playClick();
    onChange({ cardLayout: layout });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    sound.playVerify();
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onChange({
          photoUrl: dataUrl,
          photoZoom: 1.0,
          photoPanX: 0,
          photoPanY: 0,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-6 text-slate-100">
      {/* ================= 1. CARD LAYOUT SELECTOR ================= */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-sm">
        <label className="flex items-center gap-2 font-chakra font-bold text-xs uppercase tracking-wider text-slate-300 mb-3">
          <CreditCard className="w-4 h-4 text-rose-500" />
          <span>Card Specification (Select Layout)</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleLayoutSelect('horizontal')}
            className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
              badge.cardLayout === 'horizontal'
                ? 'bg-rose-950/40 border-rose-500 ring-1 ring-rose-500 shadow-md'
                : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-chakra font-bold text-sm text-slate-100">
                Horizontal Facility Keycard
              </span>
              {badge.cardLayout === 'horizontal' && (
                <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
              )}
            </div>
            <div className="text-[11px] font-tech text-slate-400 mt-1">
              500 × 315 px • Medical & Lab Access Standard
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleLayoutSelect('vertical')}
            className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
              badge.cardLayout === 'vertical'
                ? 'bg-rose-950/40 border-rose-500 ring-1 ring-rose-500 shadow-md'
                : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-chakra font-bold text-sm text-slate-100">
                Vertical Staff Credential
              </span>
              {badge.cardLayout === 'vertical' && (
                <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
              )}
            </div>
            <div className="text-[11px] font-tech text-slate-400 mt-1">
              320 × 490 px • CR-80 Lanyard Pass Standard
            </div>
          </button>
        </div>
      </div>

      {/* ================= 2. CURATED EMPLOYEE PRESETS (EXACTLY 3) ================= */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <label className="flex items-center gap-2 font-chakra font-bold text-xs uppercase tracking-wider text-slate-300">
            <User className="w-4 h-4 text-rose-500" />
            <span>Curated Employee Presets (3 Profiles)</span>
          </label>
          <span className="text-[11px] font-tech text-slate-400">Select to load authentic records</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {EMPLOYEE_PRESETS.map((preset) => {
            const isSelected = badge.cardNo === preset.cardNo;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetSelect(preset.id)}
                className={`p-2.5 rounded-lg border flex flex-col items-center text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-rose-950/50 border-rose-500 ring-1 ring-rose-500 shadow-lg'
                    : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800'
                }`}
              >
                {/* Character Thumbnail */}
                <div className="w-14 h-16 rounded overflow-hidden border border-slate-600 bg-slate-900 mb-2 relative">
                  <img
                    src={preset.avatarThumb}
                    alt={preset.displayName}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 bg-rose-600 text-[9px] font-bold px-1 text-white leading-none py-0.5">
                    {preset.clearanceClass}
                  </span>
                </div>

                <div className="font-chakra font-bold text-xs text-slate-100 truncate w-full">
                  {preset.displayName}
                </div>
                <div className="font-tech text-[10px] text-rose-400 uppercase truncate w-full mt-0.5">
                  {preset.role}
                </div>
                <div className="font-tech text-[9px] text-slate-400 mt-1">
                  {preset.cardNo}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= 3. PHOTO UPLOAD & INTERACTIVE FRAMING ================= */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <label className="flex items-center gap-2 font-chakra font-bold text-xs uppercase tracking-wider text-slate-300">
            <Sliders className="w-4 h-4 text-rose-500" />
            <span>Portrait Upload &amp; Precision Framing</span>
          </label>

          <button
            type="button"
            onClick={onResetPhoto}
            className="flex items-center gap-1 text-[11px] font-tech text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Framing</span>
          </button>
        </div>

        {/* Upload Trigger Button & Privacy Notice */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-600 text-xs font-chakra font-bold text-slate-200 transition-all cursor-pointer shadow-xs"
          >
            <Upload className="w-4 h-4 text-rose-500" />
            <span>Upload Custom Photo</span>
          </button>

          {/* Privacy Guarantee (Mandatory text) */}
          <div className="flex items-center gap-2 text-[11px] font-tech text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-3 py-2 rounded-lg flex-1">
            <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Privacy: Your photo stays in this browser and is never uploaded.</span>
          </div>
        </div>

        {/* Framing Controls: Zoom & Pan */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-800">
          <div>
            <div className="flex justify-between text-[11px] font-tech text-slate-300 mb-1">
              <span>Zoom Scale</span>
              <span className="text-rose-400 font-bold">{badge.photoZoom.toFixed(2)}×</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="2.5"
              step="0.05"
              value={badge.photoZoom}
              onChange={(e) => onChange({ photoZoom: parseFloat(e.target.value) })}
              className="w-full accent-rose-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-tech text-slate-300 mb-1">
              <span>Pan Horizontal (X)</span>
              <span className="text-rose-400 font-bold">{badge.photoPanX > 0 ? `+${badge.photoPanX}%` : `${badge.photoPanX}%`}</span>
            </div>
            <input
              type="range"
              min="-40"
              max="40"
              step="1"
              value={badge.photoPanX}
              onChange={(e) => onChange({ photoPanX: parseInt(e.target.value, 10) })}
              className="w-full accent-rose-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-tech text-slate-300 mb-1">
              <span>Pan Vertical (Y)</span>
              <span className="text-rose-400 font-bold">{badge.photoPanY > 0 ? `+${badge.photoPanY}%` : `${badge.photoPanY}%`}</span>
            </div>
            <input
              type="range"
              min="-40"
              max="40"
              step="1"
              value={badge.photoPanY}
              onChange={(e) => onChange({ photoPanY: parseInt(e.target.value, 10) })}
              className="w-full accent-rose-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* ================= 4. BADGE FIELDS FORM ================= */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-sm">
        <label className="flex items-center gap-2 font-chakra font-bold text-xs uppercase tracking-wider text-slate-300 mb-4">
          <Shield className="w-4 h-4 text-rose-500" />
          <span>Credential Data &amp; Security Specifications</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Employee Name */}
          <div>
            <label className="block text-[11px] font-tech uppercase text-slate-400 mb-1">
              Employee Name (Surname, Initial)
            </label>
            <input
              type="text"
              value={badge.name}
              onChange={(e) => onChange({ name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-lg text-sm font-chakra text-slate-100 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              placeholder="e.g. Cheng, W."
            />
          </div>

          {/* Department / Division */}
          <div>
            <label className="block text-[11px] font-tech uppercase text-slate-400 mb-1">
              Department / Division
            </label>
            <input
              type="text"
              value={badge.department}
              onChange={(e) => onChange({ department: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-lg text-sm font-chakra text-slate-100 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              placeholder="e.g. R/D Med Level 42"
            />
          </div>

          {/* Clearance Level */}
          <div>
            <label className="block text-[11px] font-tech uppercase text-slate-400 mb-1">
              Clearance Level
            </label>
            <input
              type="text"
              value={badge.clearanceLevel}
              onChange={(e) => onChange({ clearanceLevel: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-lg text-sm font-chakra text-slate-100 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              placeholder="e.g. Restricted 3"
            />
          </div>

          {/* Clearance Classification Letter */}
          <div>
            <label className="block text-[11px] font-tech uppercase text-slate-400 mb-1">
              Clearance Letter (Class)
            </label>
            <input
              type="text"
              maxLength={2}
              value={badge.clearanceClass}
              onChange={(e) => onChange({ clearanceClass: e.target.value.toUpperCase() })}
              className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-lg text-sm font-orbitron font-bold text-rose-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              placeholder="A"
            />
          </div>

          {/* Card Number */}
          <div>
            <label className="block text-[11px] font-tech uppercase text-slate-400 mb-1">
              Card / Badge Number
            </label>
            <input
              type="text"
              value={badge.cardNo}
              onChange={(e) => onChange({ cardNo: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-lg text-sm font-tech text-slate-100 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              placeholder="000-926384-2387"
            />
          </div>

          {/* Security Code */}
          <div>
            <label className="block text-[11px] font-tech uppercase text-slate-400 mb-1">
              Internal Security String
            </label>
            <input
              type="text"
              value={badge.securityCode}
              onChange={(e) => onChange({ securityCode: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-lg text-sm font-tech text-slate-100 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              placeholder="090-MED-42-A"
            />
          </div>

          {/* Return Address / Facility */}
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-tech uppercase text-slate-400 mb-1">
              Return Routing Notice (Card Back)
            </label>
            <input
              type="text"
              value={badge.returnAddress}
              onChange={(e) => onChange({ returnAddress: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-lg text-sm font-tech text-slate-200 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              placeholder="OMNICORP SECURITY DIVISION, OMNI TOWER, DETROIT MI"
            />
          </div>
        </div>

        {/* Optional Security Features Checkboxes */}
        <div className="flex flex-wrap items-center gap-6 mt-4 pt-4 border-t border-slate-800 text-xs font-chakra">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={badge.showHologram}
              onChange={(e) => onChange({ showHologram: e.target.checked })}
              className="rounded accent-rose-600 w-4 h-4"
            />
            <span>Holographic Security Foil</span>
          </label>

          {badge.cardLayout === 'vertical' && (
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={badge.showLanyardSlot}
                onChange={(e) => onChange({ showLanyardSlot: e.target.checked })}
                className="rounded accent-rose-600 w-4 h-4"
              />
              <span>Punched Lanyard Slot</span>
            </label>
          )}
        </div>
      </div>
    </div>
  );
};
