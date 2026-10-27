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

  const handleToggleHolder = () => {
    setBadge((prev) => ({
      ...prev,
      showHolderCase: !prev.showHolderCase,
    }));
  };

  useEffect(() => {
    document.title = `${badge.name} | OmniCorp Security ID Generator`;
  }, [badge.name]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800 selection:bg-rose-500 selection:text-white">
      {/* Light Theme Header */}
      <Header onShare={handleShare} />

      {/* Main Single Page Studio */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Quick Fun Customization Controls (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <EmployeeEditor
              badge={badge}
              onChange={handleBadgeChange}
              onResetPhoto={handleResetPhoto}
            />
          </div>

          {/* Right: Live Badge Replica & Export Engine (6 cols) */}
          <div className="lg:col-span-6 lg:sticky lg:top-20">
            <BadgePreview
              badge={badge}
              onToggleHolder={handleToggleHolder}
            />
          </div>
        </div>
      </main>

      {/* Simple Clean Footer */}
      <Footer />

      {/* Analytics */}
      <Analytics />
    </div>
  );
}

export default App;
