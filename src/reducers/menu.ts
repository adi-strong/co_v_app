import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {AppMenuItemInt} from "../interfaces/AppMenuItemInt.ts";

export interface MenuInterface {
  menuItems: AppMenuItemInt[],
}

const initialState: MenuInterface = {
  menuItems: [
    {
      label: 'Tableau de bord',
      to: '/app/dashboard',
      key: 'dashboard',
      icon: 'bi bi-grid',
      isActive: false,
      isOpen: false,
    },
    {
      label: 'Articles',
      to: '#!',
      key: 'articles',
      icon: 'bi bi-file-text',
      isActive: false,
      isOpen: false,
      subItems: [
        {label: 'Tous les articles', to: '/app/articles'},
        {label: 'Ajouter un article', to: '/app/articles/new'},
        {label: 'Catégories', to: '/app/categories'},
        {label: 'Étiquettes (Tags)', to: '/app/tags'}
      ],
    },
    {
      label: 'Commentaires',
      to: '/app/commentaires',
      key: 'comments',
      icon: 'bi bi-chat-dots',
      isActive: false,
      isOpen: false,
    },
    {
      label: 'Utilisateurs',
      to: '#!',
      key: 'accounts',
      icon: 'bi bi-people',
      isActive: false,
      isOpen: false,
      subItems: [
        {label: 'Tous les comptes', to: '/app/users'},
        {label: 'Ajouter un compte', to: '/app/users/new'},
        {label: 'Mon profil', to: '/app/profil'},
      ],
    },
    {
      label: 'Contacts',
      to: '/app/contacts',
      key: 'contacts',
      icon: 'bi bi-phone-vibrate',
      isActive: false,
      isOpen: false,
    },
    {
      label: 'Team',
      to: '#!',
      key: 'team',
      icon: 'bi bi-person-square',
      isActive: false,
      isOpen: false,
      subItems: [
        {label: 'Tous les membres', to: '/app/team'},
        {label: 'Ajouter un membre', to: '/app/team/new'},
        {label: 'Fonctions de membres', to: '/app/fonctions'},
      ],
    },
    {
      label: 'Projets',
      to: '#!',
      key: 'projects',
      icon: 'bi bi-suitcase2',
      isActive: false,
      isOpen: false,
      subItems: [
        {label: 'Tous les projets', to: '/app/projets'},
        {label: 'Ajouter un projet', to: '/app/projets/new'},
        {label: 'Types de projets', to: '/app/types-projets'},
      ],
    },
    {
      label: 'Rendez-vous',
      to: '/app/rendez-vous',
      key: 'rdv',
      icon: 'bi bi-calendar2-event',
      isActive: false,
      isOpen: false,
    },
    {
      label: 'Réglages',
      to: '#!',
      key: 'params',
      icon: 'bi bi-gear',
      isActive: false,
      isOpen: false,
      subItems: [
        {label: 'Réglages généraux', to: '/app/params'},
        {label: 'Réglages des profils', to: '/app/params/profils'},
        {label: 'Autorisations', to: '/app/params/autorisations'},
      ],
    },
  ]
}

export type MenuItemsState = {
  menu: MenuInterface;
}

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    
    onToggleMenu: (state, action: PayloadAction<{ menuKey: string | number }>): void => {
      const { menuKey } = action.payload;
      state.menuItems = state.menuItems.map((item) =>
        item.key === menuKey
          ? {...item, isActive: true, isOpen: true}
          : {...item, isActive: false, isOpen: false}
      );
    },
    
    onOpenSubMenu: (state, action: PayloadAction<number | string>): void => {
      const index = action.payload.toString();
      const items = [...state.menuItems];
      items.forEach((item, idx) => {
        if (idx.toString() !== index) {
          item.isOpen = false;
        }
      });
      const itemToToggle = items[Number(index)];
      if (itemToToggle) {
        itemToToggle.isOpen = !itemToToggle.isOpen;
      }
      state.menuItems = items;
    },
    
  },
});

export const {
  onToggleMenu, onOpenSubMenu
} = menuSlice.actions;

export default menuSlice.reducer;
