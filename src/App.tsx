import { useState, useEffect, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { EmployeeBadgeState } from './types';
import { DEFAULT_BADGE_STATE } from './data/presets';
import { Header } from './components/Header';
import { EmployeeEditor } from './components/EmployeeEditor';
import { BadgePreview } from './components/BadgePreview';
import { Footer } from './components/Footer';
import { parseStateFromUrl, serializeStateToUrl } from './utils/urlState';

export function App() {
  const [badge, setBadge] = useState<EmployeeBadgeState>(() => {
    const urlState = parseStateFromUrl();
    if (urlState) {
      return { ...DEFAULT_BADGE_STATE, ...urlState };
    }
    return DEFAULT_BADGE_STATE;
  });

  // Keep URL updated or provide share handler
  const handleShare = useCallback(async (): Promise<boolean> => {
    try {
      const shareUrl = serializeStateToUrl(badge);
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Failed to copy share URL:', e);
      return false;
    }
  }, [badge]);

  const handleBadgeChange = (updated: Partial<EmployeeBadgeState>) => {
    setBadge((prev) => ({ ...prev, ...updated }));
  };

  const handleResetPhoto = () => {
    setBadge((prev) => ({
      ...prev,
      photoZoom: 1.0,
      photoPanX: 0,
      photoPanY: 0,
    }));
  };

  // Sync title with employee name
  useEffect(() => {
    document.title = `${badge.name} | OmniCorp Security ID Generator`;
  }, [badge.name]);

  return (
    <div className="min-h-screen flex flex-col bg-[#070b14] text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* Global Application Header */}
      <Header onShare={handleShare} />

      {/* Main Studio Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Editor Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <EmployeeEditor
              badge={badge}
              onChange={handleBadgeChange}
              onResetPhoto={handleResetPhoto}
            />
          </div>

          {/* Right Column: Interactive 3D Badge Preview & Print Engine (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <BadgePreview badge={badge} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}

export default App;
