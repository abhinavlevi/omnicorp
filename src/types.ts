export type CardLayout = 'vertical' | 'horizontal';

export interface EmployeeBadgeState {
  cardLayout: CardLayout;
  name: string;
  department: string;
  clearanceLevel: string;
  clearanceClass: string; // e.g. "A", "B", "S", "O"
  cardNo: string;
  issueDate: string;
  expiryDate: string;
  securityCode: string;
  signature: string;
  photoUrl: string;
  photoZoom: number; // 1.0 to 2.5
  photoPanX: number; // -40% to 40%
  photoPanY: number; // -40% to 40%
  showLanyardSlot: boolean;
  showHologram: boolean;
  facilityName: string;
  returnAddress: string;
}

export interface PresetProfile {
  id: string;
  name: string;
  displayName: string;
  role: string;
  department: string;
  clearanceLevel: string;
  clearanceClass: string;
  cardNo: string;
  securityCode: string;
  signature: string;
  photoUrl: string;
  avatarThumb: string;
  description: string;
}
