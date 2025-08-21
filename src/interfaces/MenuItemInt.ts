export interface MenuItemInt {
  label: string;
  to: string;
  key: string | number;
  icon: string;
  isActive: boolean;
  isOpen: boolean;
  subItems?: { label: string; to: string }[]; // sous-éléments du menu, si présents
}
