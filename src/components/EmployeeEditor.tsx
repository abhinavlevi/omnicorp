import React, { useRef } from 'react';
import { EmployeeBadgeState, CardLayout } from '../types';
import { EMPLOYEE_PRESETS } from '../data/presets';
import { sound } from '../utils/audio';
import {
  Upload,
  RotateCcw,
  User,
  Sliders,
  CheckCircle2,
  Lock,
  Layers,
  Edit3,
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
    <div className="flex flex-col gap-4 text-slate-800">
      {/* 1. CHOOSE A CHARACTER PRESET */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <label className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-slate-700">
            <User className="w-4 h-4 text-rose-600" />
            <span>1. Choose Character (Presets)</span>
          </label>
          <span className="text-xs text-slate-500">Click to load</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {EMPLOYEE_PRESETS.map((preset) => {
            const isSelected = badge.cardNo === preset.cardNo;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetSelect(preset.id)}
                className={`p-2 rounded-lg border flex flex-col items-center text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-400 shadow-sm'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="w-12 h-14 rounded overflow-hidden border border-slate-300 bg-slate-200 mb-1.5 relative">
                  <img
                    src={preset.avatarThumb}
                    alt={preset.displayName}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 bg-rose-600 text-[9px] font-black px-1 text-white leading-none py-0.5">
                    {preset.clearanceClass}
                  </span>
                </div>

                <div className="font-bold text-xs text-slate-900 truncate w-full">
                  {preset.displayName}
                </div>
                <div className="text-[10px] text-slate-500 truncate w-full mt-0.5">
                  {preset.role}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. CARD LAYOUT */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <label className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-slate-700 mb-2.5">
          <Layers className="w-4 h-4 text-rose-600" />
          <span>2. Card Orientation</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleLayoutSelect('horizontal')}
            className={`p-3 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
              badge.cardLayout === 'horizontal'
                ? 'bg-rose-50 border-rose-500 ring-1 ring-rose-400 font-bold text-rose-900'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <div>
              <div className="text-sm font-bold">Horizontal Badge</div>
              <div className="text-[11px] text-slate-500">Classic Movie Prop Replica</div>
            </div>
            {badge.cardLayout === 'horizontal' && (
              <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
            )}
          </button>

          <button
            type="button"
            onClick={() => handleLayoutSelect('vertical')}
            className={`p-3 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
              badge.cardLayout === 'vertical'
                ? 'bg-rose-50 border-rose-500 ring-1 ring-rose-400 font-bold text-rose-900'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <div>
              <div className="text-sm font-bold">Vertical Badge</div>
              <div className="text-[11px] text-slate-500">Lanyard Pass Format</div>
            </div>
            {badge.cardLayout === 'vertical' && (
              <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
            )}
          </button>
        </div>
      </div>

      {/* 3. PHOTO UPLOAD & POSITIONING */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <label className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-slate-700">
            <Sliders className="w-4 h-4 text-rose-600" />
            <span>3. Upload &amp; Position Photo</span>
          </label>

          <button
            type="button"
            onClick={onResetPhoto}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Photo</span>
          </button>
        </div>

        {/* Upload Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mb-3">
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
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Your Photo</span>
          </button>

          {/* Privacy Guarantee */}
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex-1">
            <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Privacy: Your photo stays in this browser and is never uploaded.</span>
          </div>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100">
          <div>
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Zoom</span>
              <span className="font-bold text-rose-600">{badge.photoZoom.toFixed(1)}×</span>
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
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Move X</span>
              <span className="font-bold text-rose-600">{badge.photoPanX}%</span>
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
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Move Y</span>
              <span className="font-bold text-rose-600">{badge.photoPanY}%</span>
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

      {/* 4. CUSTOMIZE BADGE DETAILS (NO JARGON) */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <label className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-slate-700 mb-3">
          <Edit3 className="w-4 h-4 text-rose-600" />
          <span>4. Edit Badge Information</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={badge.name}
              onChange={(e) => onChange({ name: e.target.value })}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-semibold focus:outline-none focus:border-rose-500 focus:bg-white"
              placeholder="e.g. Cheng, W."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Department / Division
            </label>
            <input
              type="text"
              value={badge.department}
              onChange={(e) => onChange({ department: e.target.value })}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-semibold focus:outline-none focus:border-rose-500 focus:bg-white"
              placeholder="e.g. R/D Med Level 42"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Clearance Level
            </label>
            <input
              type="text"
              value={badge.clearanceLevel}
              onChange={(e) => onChange({ clearanceLevel: e.target.value })}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-semibold focus:outline-none focus:border-rose-500 focus:bg-white"
              placeholder="e.g. Restricted 3"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Clearance Letter (Red Letter)
            </label>
            <input
              type="text"
              maxLength={2}
              value={badge.clearanceClass}
              onChange={(e) => onChange({ clearanceClass: e.target.value.toUpperCase() })}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-black text-rose-600 focus:outline-none focus:border-rose-500 focus:bg-white"
              placeholder="A"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Card Number
            </label>
            <input
              type="text"
              value={badge.cardNo}
              onChange={(e) => onChange({ cardNo: e.target.value })}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-mono text-slate-900 font-semibold focus:outline-none focus:border-rose-500 focus:bg-white"
              placeholder="000-926384-2387"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Side Code (Right Edge)
            </label>
            <input
              type="text"
              value={badge.securityCode}
              onChange={(e) => onChange({ securityCode: e.target.value })}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-mono text-slate-900 font-semibold focus:outline-none focus:border-rose-500 focus:bg-white"
              placeholder="090"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
