import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";
import toast from "react-hot-toast";
import {Agent} from "../../personnel/agent/model/agentService";
import {Fonction} from "../../personnel/fonction/model/fonctionService";
import {Service} from "../../personnel/service/model/serviceService";

export interface TokenPayloadType {
  id: number
  username: string
  fullName?: string
  roles: string[]
  fkAgent?: Agent | undefined
  // fkGrade?: Grade | undefined;
  fkFonction?: Fonction | undefined
  fkService?: Service | undefined
  tel: string
  email?: string
  active: boolean
  createdAt?: string
}

export interface AuthUser extends TokenPayloadType {}

export interface AuthState {
  token: string | null
  user: AuthUser | null
}

export interface UserState { auth: AuthState }

const initialState: AuthState = {
  user: null,
  token: null,
}

const authSlice = createSlice({

  name: 'auth',
  initialState,
  reducers: {
    
    clearToken: (state): void => {
      state.user = null
      state.token = null
      localStorage.removeItem('authToken')
    },
    
    setToken: (state, action: PayloadAction<string>): void => {
      const token: string = action.payload;
      try {
        const decoded = jwtDecode<TokenPayloadType>(token);
        state.token = token;
        state.user = {
          id: decoded.id,
          username: decoded.username,
          fullName: decoded.fullName,
          roles: decoded.roles ?? [],
          fkAgent: decoded?.fkAgent ?? undefined,
          // fkGrade: decoded?.fkGrade ?? undefined,
          fkFonction: decoded?.fkFonction ?? undefined,
          fkService: decoded?.fkService ?? undefined,
          tel: decoded.tel,
          email: decoded.email,
          createdAt: decoded.createdAt
        };
        localStorage.setItem('authToken', token)
      } catch (err) {
        toast.error('Invalid JWT', err)
        state.token = null
        state.user = null
      }
    },
    
    setUser: (state, action: PayloadAction<{ user: AuthUser | null; token?: string | null }>): void => {
      const { user, token } = action.payload
      state.user = user
      if (token) {
        state.token = token
        localStorage.setItem('authToken', token)
      }
    },
    
    setup: (state): void => {
      const token: string = localStorage.getItem('authToken')
      if (!token) return
      
      try {
        const decoded = jwtDecode<TokenPayloadType>(token);
        state.token = token;
        state.user = {
          id: decoded.id,
          username: decoded.username,
          fullName: decoded.fullName,
          roles: decoded.roles ?? [],
          fkAgent: decoded?.fkAgent ?? undefined,
          // fkGrade: decoded?.fkGrade ?? undefined,
          fkFonction: decoded?.fkFonction ?? undefined,
          fkService: decoded?.fkService ?? undefined,
          tel: decoded.tel,
          email: decoded.email,
          createdAt: decoded.createdAt
        };
      } catch (err) {
        console.error("Token invalide pendant le setup :", err);
        localStorage.removeItem("authToken");
        state.token = null;
        state.user = null;
      }
    },
    
    logout: (state): void => {
      state.token = null
      state.user = null
      localStorage.removeItem('authToken')
    },
    
  },
});

export const {
  setup,
  logout,
  clearToken,
  setUser,
  setToken,
} = authSlice.actions

export default authSlice.reducer
