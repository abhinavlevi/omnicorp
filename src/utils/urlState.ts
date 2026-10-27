import { EmployeeBadgeState } from '../types';

export function serializeStateToUrl(state: EmployeeBadgeState): string {
  try {
    // Only serialize state attributes, skip large data URLs for photo if not preset
    const payload: Partial<EmployeeBadgeState> = {
      cardLayout: state.cardLayout,
      name: state.name,
      department: state.department,
      clearanceLevel: state.clearanceLevel,
      clearanceClass: state.clearanceClass,
      cardNo: state.cardNo,
      securityCode: state.securityCode,
      photoZoom: state.photoZoom,
      photoPanX: state.photoPanX,
      photoPanY: state.photoPanY,
      returnAddress: state.returnAddress,
      showLanyardSlot: state.showLanyardSlot,
      showHologram: state.showHologram,
    };

    // If photoUrl is one of the presets, include it
    if (state.photoUrl.startsWith('/presets/')) {
      payload.photoUrl = state.photoUrl;
    }

    const json = JSON.stringify(payload);
    const encoded = btoa(encodeURIComponent(json));
    const url = new URL(window.location.href);
    url.searchParams.set('badge', encoded);
    return url.toString();
  } catch (e) {
    console.error('Failed to serialize badge state to URL:', e);
    return window.location.href;
  }
}

export function parseStateFromUrl(): Partial<EmployeeBadgeState> | null {
  try {
    if (typeof window === 'undefined') return null;
    const url = new URL(window.location.href);
    const encoded = url.searchParams.get('badge');
    if (!encoded) return null;

    const json = decodeURIComponent(atob(encoded));
    const parsed = JSON.parse(json);
    return parsed as Partial<EmployeeBadgeState>;
  } catch (e) {
    console.warn('Could not parse badge from URL params:', e);
    return null;
  }
}
