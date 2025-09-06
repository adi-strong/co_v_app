import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type {SelectOptionType} from "../../../../services/services.ts";

export interface DevisePayloadType {
  options: SelectOptionType[]
}

export interface DevisePayload { devise: DevisePayloadType | null }

export interface DeviseState { devise: DevisePayload }

const initialState: DevisePayload = { devise: null }

const deviseSlice = createSlice({
  name: 'devise',
  initialState,
  reducers: {
    
    resetDeviseState: (state: DevisePayload): void => { state.devise = initialState.devise },
    
    setDeviseState: (state: DevisePayload, action: PayloadAction<DevisePayload>): void => {
      const { payload } = action
      state.devise = payload.devise
    }
    
  }
})

export const {
  resetDeviseState,
  setDeviseState,
} = deviseSlice.actions

export default deviseSlice.reducer
