import {API} from "../../../app/store.ts";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import type {SaveTraitement, Traitement} from "./traitementService.ts";

let totalTraitementsItems: number = 0

const traitementApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    getTraitements: build.query<Traitement[], string>({
      query: () => `${API_PATH}/traitements`,
      transformResponse: (response: JsonLDResponseInt<Traitement>) => {
        totalTraitementsItems = response.totalItems
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
    
    getUniqueTraitement: build.query<Traitement, string | number | undefined>({
      query: id => `${API_PATH}/traitements/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),
    
    postTraitement: build.mutation<Traitement, SaveTraitement>({
      query: (data: SaveTraitement) => ({
        url: `${API_PATH}/traitements`,
        method: APP_METHODS.POST,
        headers: APP_HEADERS.POST_HEADERS,
        body: JSON.stringify({
          ...data,
          prixHt: isNaN(data.prixHt) ? null : data.prixHt.toString(),
          prixTtc: isNaN(data.prixTtc) ? null : data.prixTtc.toString(),
        })
      })
    }),
    
    editTraitement: build.mutation<Traitement, SaveTraitement>({
      query: (data: SaveTraitement) => ({
        url: `${API_PATH}/traitements/${data?.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify({
          ...data,
          prixHt: isNaN(data.prixHt) ? null : data.prixHt.toString(),
          prixTtc: isNaN(data.prixTtc) ? null : data.prixTtc.toString(),
        })
      }),
      invalidatesTags: (result, error, arg) => [{
        id: arg.id,
        type: 'UNIQUE',
      }]
    }),
    
    deleteTraitement: build.mutation<void, Traitement>({
      query: (data: Traitement) => ({
        url: `${API_PATH}/traitements/${data.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify({ deleted: true })
      })
    }),

  })
  
})

export const {
  useGetTraitementsQuery,
  useGetUniqueTraitementQuery,
  usePostTraitementMutation,
  useEditTraitementMutation,
  useDeleteTraitementMutation,
} = traitementApiSlice
