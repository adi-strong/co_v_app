import { configureStore } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery, setupListeners } from '@reduxjs/toolkit/query/react'
import menuReducer from "../../reducers/menu.ts";
import {APP_ENTRYPOINT} from "../../config/configs.ts";
import authReducer from '../auth/model/auth.slice.ts'
import infosReducer from '../configs/infosGen/model/infosGen.slice.ts'
import compteReducer from '../finances/compteCaisse/model/compteCaisse.slice.ts'
import deviseReducer from '../finances/compteCaisse/model/devise.slice.ts'
import categoriesExamsReducer from '../traitements/categorieExam/model/categorieExam.slice.ts'

const baseQuery = fetchBaseQuery({
  baseUrl: APP_ENTRYPOINT,
  mode: 'cors',
  prepareHeaders: (headers, {getState}: any) => {
    const authState = getState().auth;  // Récupérez l'état de auth
    const TOKEN = authState && authState.token
      ? authState.token
      : localStorage.getItem('authToken')
        ? localStorage.getItem('authToken')
        : null;
    
    if (TOKEN) {
      headers.set('authorization', `Bearer ${TOKEN}`);
    }
    
    return headers;
  },
});

export const API = createApi({
  reducerPath: 'api',
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: 30,
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ['LIST', 'UNIQUE'],
})

const store = configureStore({
  reducer: {
    menu: menuReducer,
    auth: authReducer,
    infos: infosReducer,
    compte: compteReducer,
    devise: deviseReducer,
    categoriesExams: categoriesExamsReducer,
    [API.reducerPath]: API.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API.middleware),
  devTools: import.meta.env.DEV,
})

setupListeners(store.dispatch)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
