import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type {MediaObjectInt} from "../../../../interfaces/MediaObjectInt.ts";

export interface InfosPayloadType {
  id: number
  nom: string
  slogan?: string
  logo?: MediaObjectInt
  about?: string
  address?: string
  tel: string
  email?: string
  tel2?: string
  email2?: string
  selected: boolean
}

export interface InfoState { infos: InfosPayloadType | null }

export interface InfoGenState { infos: InfoState }

const initialState: InfoState = { infos: null }

const infosGenSlice = createSlice({

  name: 'infos',
  initialState,
  reducers: {
    
    setInfosGen: (state: InfoState, action: PayloadAction<InfoState>): void => {
      const { payload } = action
      if (payload.infos) state.infos = payload.infos
    },
    
    setResetInfos: (state: InfoState): void => {
      state.infos = null
    }
    
  },
});

export const {
  setResetInfos,
  setInfosGen,
} = infosGenSlice.actions

export default infosGenSlice.reducer
