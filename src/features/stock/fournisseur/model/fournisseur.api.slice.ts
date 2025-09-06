import {API} from "../../../app/store.ts";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import type {Fournisseur, SaveFournisseur} from "./fournisseurservice.ts";

let totalFournisseursItems: number = 0

const fournisseurApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    getFournisseurs: build.query<Fournisseur[], string>({
      query: () => `${API_PATH}/fournisseurs`,
      transformResponse: (response: JsonLDResponseInt<Fournisseur>) => {
        totalFournisseursItems = response.totalItems
        return response.member;
      },
      providesTags: (result) => {
        if (result && Array.isArray(result)) {
          return [
            ...result.map(({ id }) => ({ type: 'UNIQUE' as const, id })),
            { type: 'LIST' as const, id: 'LIST' }
          ]
        }
        return [{ type: 'LIST' as const, id: 'LIST' }];
      }
    }),
    
    getSearchFournisseurs: build.query<Fournisseur[], string>({
      query: (keywords: string) => `${API_PATH}/fournisseurs?nomCommercial=${keywords}`,
      transformResponse: (response: JsonLDResponseInt<Fournisseur>) => {
        totalFournisseursItems = response.totalItems
        return response.member;
      },
      providesTags: (result) => {
        if (result && Array.isArray(result)) {
          return [
            ...result.map(({ id }) => ({ type: 'UNIQUE' as const, id })),
            { type: 'LIST' as const, id: 'LIST' }
          ]
        }
        return [{ type: 'LIST' as const, id: 'LIST' }];
      }
    }),
    
    getUniqueFournisseur: build.query<Fournisseur, string | number | undefined>({
      query: id => `${API_PATH}/fournisseurs/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),
    
    postFournisseur: build.mutation<Fournisseur, SaveFournisseur>({
      query: (data: SaveFournisseur) => ({
        url: `${API_PATH}/fournisseurs`,
        method: APP_METHODS.POST,
        headers: APP_HEADERS.POST_HEADERS,
        body: JSON.stringify(data)
      })
    }),
    
    editFournisseur: build.mutation<Fournisseur, SaveFournisseur>({
      query: (data: SaveFournisseur) => ({
        url: `${API_PATH}/fournisseurs/${data?.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify(data)
      }),
      invalidatesTags: (result, error, arg) => [{
        id: arg.id,
        type: 'UNIQUE',
      }]
    }),
    
    deleteFournisseur: build.mutation<void, Fournisseur>({
      query: (data: Fournisseur) => ({
        url: `${API_PATH}/fournisseurs/${data.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify({ deleted: true })
      })
    }),

  })
  
})

export const {
  useGetFournisseursQuery,
  useLazyGetSearchFournisseursQuery,
  useGetUniqueFournisseurQuery,
  usePostFournisseurMutation,
  useEditFournisseurMutation,
  useDeleteFournisseurMutation,
} = fournisseurApiSlice
