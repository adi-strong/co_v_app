import {API} from "../../../app/store.ts";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import type {Lit, SaveLit} from "./litService.ts";

let totalLitsItems: number = 0

const litApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    getLits: build.query<Lit[], string>({
      query: () => `${API_PATH}/lits`,
      transformResponse: (response: JsonLDResponseInt<Lit>) => {
        totalLitsItems = response.totalItems
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
    
    getLitsByCategory: build.query<Lit[], string | number>({
      query: (categoryId: string | number) => `${API_PATH}/categorie_lits/${categoryId}/lits`,
      transformResponse: (response: JsonLDResponseInt<Lit>) => {
        totalLitsItems = response.totalItems
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
    
    getAvailableBeds: build.query<Lit[], string>({
      query: () => `${API_PATH}/lits?estCeOccuppe=false`,
      transformResponse: (response: JsonLDResponseInt<Lit>) => {
        totalLitsItems = response.totalItems
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
    
    getUniqueLit: build.query<Lit, string | number | undefined>({
      query: id => `${API_PATH}/lits/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),
    
    postLit: build.mutation<Lit, SaveLit>({
      query: (data: SaveLit) => ({
        url: `${API_PATH}/lits`,
        method: APP_METHODS.POST,
        headers: APP_HEADERS.POST_HEADERS,
        body: JSON.stringify({
          ...data,
          prix: isNaN(data.prix) ? null : data.prix.toString(),
          fkCategorie: data?.fkCategorie ? data.fkCategorie?.data : null,
        }),
        invalidatesTags: ['UNIQUE', 'LIST']
      })
    }),
    
    editLit: build.mutation<Lit, SaveLit>({
      query: (data: SaveLit) => ({
        url: `${API_PATH}/lits/${data?.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify({
          ...data,
          prix: isNaN(data.prix) ? null : data.prix.toString(),
          fkCategorie: data?.fkCategorie ? data.fkCategorie?.data : null,
        })
      }),
      invalidatesTags: ['UNIQUE', 'LIST']
    }),
    
    deleteLit: build.mutation<void, Lit>({
      query: (data: Lit) => ({
        url: `${API_PATH}/lits/${data.id}`,
        headers: APP_HEADERS.PATCH_HEADERS,
        method: APP_METHODS.PATCH,
        body: JSON.stringify({ deleted: true })
      }),
      invalidatesTags: ['UNIQUE', 'LIST']
    }),

  })
  
})

export const {
  useGetLitsQuery,
  useGetLitsByCategoryQuery,
  useGetAvailableBedsQuery,
  useGetUniqueLitQuery,
  usePostLitMutation,
  useEditLitMutation,
  useDeleteLitMutation,
} = litApiSlice
