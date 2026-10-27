import { EmployeeBadgeState } from '../types';
import { EMPLOYEE_PRESETS, DEFAULT_BADGE_STATE } from '../data/presets';

/**
 * Clean, short, human-readable URL sharing (NO LONG BASE64 JARGON LINKS)
 */
export function serializeStateToUrl(state: EmployeeBadgeState): string {
  try {
    const url = new URL(window.location.origin + window.location.pathname);
    
    // Check if matching a preset
    const matchedPreset = EMPLOYEE_PRESETS.find(
      (p) => p.name === state.name && p.cardNo === state.cardNo
    );

    if (matchedPreset) {
      url.searchParams.set('preset', matchedPreset.id);
      if (state.cardLayout !== 'horizontal') {
        url.searchParams.set('layout', state.cardLayout);
      }
      return url.toString();
    }

    // Short query params for custom badges
    if (state.name && state.name !== DEFAULT_BADGE_STATE.name) {
      url.searchParams.set('name', state.name);
    }
    if (state.department && state.department !== DEFAULT_BADGE_STATE.department) {
      url.searchParams.set('dept', state.department);
    }
    if (state.clearanceClass && state.clearanceClass !== DEFAULT_BADGE_STATE.clearanceClass) {
      url.searchParams.set('class', state.clearanceClass);
    }
    if (state.cardLayout !== 'horizontal') {
      url.searchParams.set('layout', state.cardLayout);
    }

    return url.toString();
  } catch (e) {
    console.error('Failed to serialize URL:', e);
    return window.location.origin + window.location.pathname;
  }
}

export function parseStateFromUrl(): Partial<EmployeeBadgeState> | null {
  try {
    if (typeof window === 'undefined') return null;
    const url = new URL(window.location.href);

    const presetId = url.searchParams.get('preset');
    if (presetId) {
      const preset = EMPLOYEE_PRESETS.find((p) => p.id === presetId);
      if (preset) {
        const layout = url.searchParams.get('layout') as 'horizontal' | 'vertical' | null;
        return {
          ...preset,
          cardLayout: layout || 'horizontal',
        };
      }
    }

    const name = url.searchParams.get('name');
    const dept = url.searchParams.get('dept');
    const clearanceClass = url.searchParams.get('class');
    const layout = url.searchParams.get('layout') as 'horizontal' | 'vertical' | null;

    if (name || dept || clearanceClass || layout) {
      return {
        ...(name ? { name } : {}),
        ...(dept ? { department: dept } : {}),
        ...(clearanceClass ? { clearanceClass } : {}),
        ...(layout ? { cardLayout: layout } : {}),
      };
    }

    return null;
  } catch (e) {
    console.warn('Could not parse URL params:', e);
    return null;
  }
}
