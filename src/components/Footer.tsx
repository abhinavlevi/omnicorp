import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-200 text-slate-500 py-6 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <div className="flex items-center gap-2">
          <img
            src="/presets/omnicorp_logo_red.png"
            alt="OmniCorp"
            className="w-5 h-5 object-contain"
          />
          <span className="font-semibold text-slate-700">OmniCorp Security ID Generator</span>
          <span>•</span>
          <span>Single-Page Prop Replica Studio</span>
        </div>
        <div className="text-[11px] text-slate-400">
          Fan creation inspired by RoboCop / Omni Consumer Products. All photos remain in your browser.
        </div>
      </div>
    </footer>
  );
};
