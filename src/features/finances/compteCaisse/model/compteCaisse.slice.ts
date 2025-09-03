import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type {CurrencyInt} from "../../../../interfaces/CurrencyInt.ts";
import type {User} from "../../../user/model/userService.ts";

export interface ComptePayloadType {
  id: number
  first: CurrencyInt
  last: CurrencyInt
  solde: number
  nom: string
  taux: number
  fkUser?: User
  estCeParDefaut: boolean
  createdAt?: string
  updatedAt?: string
  slug?: string
  selected: boolean
}

export interface CaisseState { compte: ComptePayloadType | null }

export interface CompteCaisseState { compte: CaisseState }

const initialState: CaisseState = { compte: null }

const compteCaisseSlice = createSlice({

  name: 'compte',
  initialState,
  reducers: {
    
    setResetCompte: (state: CaisseState): void => {
      state.compte = null
    },
    
    setCompteCaisseState: (state: CaisseState, action: PayloadAction<CaisseState>): void => {
      const { payload } = action
      if (payload.compte) state.compte = payload.compte
    }

  },
});

export const {
  setResetCompte,
  setCompteCaisseState,
} = compteCaisseSlice.actions

export default compteCaisseSlice.reducer
