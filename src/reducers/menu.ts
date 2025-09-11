import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {MenuItemInt} from "../interfaces/MenuItemInt.ts";

export interface MenuInterface {
  menuItems: MenuItemInt[],
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
    }, // 0 - Tableau de bord
    {
      label: 'Prescriptions',
      to: '/app/prescriptions',
      key: 'prescriptions',
      icon: 'bi bi-file-earmark-medical',
      isActive: false,
      isOpen: false,
    }, // 1 - Prescriptions
    
    // Accueil
    {
      label: 'Accueil',
      to: '#!',
      key: 'home',
      icon: 'bi bi-house-up',
      isActive: false,
      isOpen: false,
      subItems: [
        {label: 'Fiches des réceptions', to: '/app/receptions'},
        {label: 'Rendez-vous', to: '/app/rendez-vous'},
      ],
    }, // 2 - Accueil
    
    // Opérations
    {
      label: 'Patients',
      to: '#!',
      key: 'patients',
      icon: 'bi bi-people',
      isActive: false,
      isOpen: false,
      subItems: [
        {label: 'Tous les patients', to: '/app/patients'},
        {label: 'Ajouter un patient', to: '/app/patients/new'},
      ],
    }, // 3 - Patients
    {
      label: 'Dossiers médicaux',
      to: '#!',
      key: 'treats',
      icon: 'bi bi-folder',
      isActive: false,
      isOpen: false,
      subItems: [
        {label: 'Fiches des consultations', to: '/app/consultations'},
        {label: 'Nouvelle fiche', to: '/app/consultations/new'},
        {label: 'Documents de suivi', to: '/app/suivis'},
        {label: 'Laboratoire', to: '/app/labs'},
        {label: 'Hospitalisations', to: '/app/hospitalisations'},
      ],
    }, // 4 - Traitements
    {
      label: 'Pharmacie',
      to: '#!',
      key: 'pharmacy',
      icon: 'bi bi-capsule',
      isActive: false,
      isOpen: false,
      subItems: [
        {label: 'Vente', to: '/app/produits/vente'},
        {label: 'Tous les produits', to: '/app/produits'},
        {label: 'Tous les articles', to: '/app/produits/articles'},
        {label: 'Ajouter un produit', to: '/app/produits/new'},
        {label: 'Catégories des produits', to: '/app/categories-produits'},
        {label: 'U. des consommations', to: '/app/unites-consommations'},
        {label: 'Fournisseurs', to: '/app/fournisseurs'},
        {label: 'Approvisionnements', to: '/app/approvisionnements'},
        {label: 'Mouvements en stocks', to: '/app/mouvements-stocks'},
        {label: 'Pertes', to: '/app/pertes-produits'},
        {label: 'Factures', to: '/app/factures-des-produits'},
      ],
    }, // 5 - Pharmacie
    {
      label: 'Personnel',
      to: '#!',
      key: 'agents',
      icon: 'bi bi-person-check',
      isActive: false,
      isOpen: false,
      subItems: [
        {label: 'Tous les agents', to: '/app/agents'},
        {label: 'Ajouter un agent', to: '/app/agents/new'},
        {label: 'Départements', to: '/app/departements'},
        {label: 'Services', to: '/app/services'},
        {label: 'Fonctions', to: '/app/fonctions'},
      ],
    }, // 6 - Personnel
    {
      label: 'Utilisateurs',
      to: '#!',
      key: 'accounts',
      icon: 'bi bi-person',
      isActive: false,
      isOpen: false,
      subItems: [
        {label: 'Tous les comptes', to: '/app/users'},
        {label: 'Ajouter un compte', to: '/app/users/new'},
        {label: 'Mon profil', to: '/app/profil'},
      ],
    }, // 7 - Utilisateurs
    {
      label: 'Finances',
      to: '#!',
      key: 'finances',
      icon: 'bi bi-piggy-bank',
      isActive: false,
      isOpen: false,
      subItems: [
        {label: 'Bons des dépenses', to: '/app/bons-des-depenses'},
        {label: 'Bons des entrées', to: '/app/bons-des-entrees'},
        {label: 'Caisse', to: '/app/comptes'},
      ],
    }, // 8 - Finances
    {
      label: 'Factures',
      to: '#!',
      key: 'invoices',
      icon: 'bi bi-receipt-cutoff',
      isActive: false,
      isOpen: false,
      subItems: [
        {label: 'Factures consultations', to: '/app/factures-consultations'},
        {label: 'Factures suivi', to: '/app/factures-traitements'},
        {label: 'Factures des produits', to: '/app/factures-produits'},
      ],
    }, // 9 - Factures
    
    // Configurations
    {
      label: 'Réglages',
      to: '#!',
      key: 'params',
      icon: 'bi bi-gear',
      isActive: false,
      isOpen: false,
      subItems: [
        {label: 'Réglages généraux', to: '/app/params'},
        {label: 'Types des fiches', to: '/app/types-des-fiches'},
        {label: 'Catégories des examens', to: '/app/categories-examens'},
        {label: 'Examens', to: '/app/examens'},
        {label: 'Traitement', to: '/app/traitements'},
        {label: 'Catégories des lits', to: '/app/categories-lits'},
        {label: 'Lits', to: '/app/lits'},
      ],
    }, // 10 - Réglages
    
    {
      label: 'Structures (Conventions)',
      to: '/app/structures',
      key: 'structures',
      icon: 'bi bi-file-earmark-medical',
      isActive: false,
      isOpen: false,
    }, // 11 - Structures
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
