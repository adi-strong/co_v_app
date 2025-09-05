import {API} from "../../../app/store.ts";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import type {SaveUniteConsommation, UniteConsommation} from "./uniteConsommationService.ts";

let totalUniteConsommationsItems: number = 0

const uniteConsommationApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    getUniteConsommations: build.query<UniteConsommation[], string>({
      query: () => `${API_PATH}/unite_consommations`,
      transformResponse: (response: JsonLDResponseInt<UniteConsommation>) => {
        totalUniteConsommationsItems = response.totalItems
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
    
    getUniqueUniteConsommation: build.query<UniteConsommation, string | number | undefined>({
      query: id => `${API_PATH}/unite_consommations/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),
    
    editUniteConsommation: build.mutation<UniteConsommation, SaveUniteConsommation>({
      query: (data: SaveUniteConsommation) => ({
        url: `${API_PATH}/unite_consommations/${data?.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify(data)
      }),
      invalidatesTags: (result, error, arg) => [{
        id: arg.id,
        type: 'UNIQUE',
      }]
    }),
    
    postUniteConsommation: build.mutation<UniteConsommation, SaveUniteConsommation>({
      query: (data: SaveUniteConsommation) => ({
        url: `${API_PATH}/unite_consommations`,
        method: APP_METHODS.POST,
        headers: APP_HEADERS.POST_HEADERS,
        body: JSON.stringify(data)
      })
    }),
    
    deleteUniteConsommation: build.mutation<void, UniteConsommation>({
      query: (data: UniteConsommation) => ({
        url: `${API_PATH}/unite_consommations/${data.id}`,
        method: APP_METHODS.DELETE
      })
    }),

  })
  
})

export const {
  useGetUniteConsommationsQuery,
  useGetUniqueUniteConsommationQuery,
  useEditUniteConsommationMutation,
  usePostUniteConsommationMutation,
  useDeleteUniteConsommationMutation,
} = uniteConsommationApiSlice
