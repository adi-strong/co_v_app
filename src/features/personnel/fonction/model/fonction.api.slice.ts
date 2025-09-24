import {API} from "../../../app/store";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import type {Fonction, SaveFonction} from "./fonctionService.ts";

let totalFonctionsItems: number = 0

const fonctionApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    getFonctions: build.query<Fonction[], string>({
      query: () => `${API_PATH}/fonctions`,
      transformResponse: (response: JsonLDResponseInt<Fonction>) => {
        totalFonctionsItems = response.totalItems
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
    
    getUniqueFonction: build.query<Fonction, string | number | undefined>({
      query: id => `${API_PATH}/fonctions/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),
    
    postFonction: build.mutation<Fonction, SaveFonction>({
      query: (data: SaveFonction) => ({
        url: `${API_PATH}/fonctions`,
        method: APP_METHODS.POST,
        headers: APP_HEADERS.POST_HEADERS,
        body: JSON.stringify(data)
      }),
      invalidatesTags: ['UNIQUE', 'LIST']
    }),
    
    editFonction: build.mutation<Fonction, SaveFonction>({
      query: (data: SaveFonction) => ({
        url: `${API_PATH}/fonctions/${data?.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify(data)
      }),
      invalidatesTags: ['UNIQUE', 'LIST']
    }),
    
    deleteFonction: build.mutation<void, Fonction>({
      query: (data: Fonction) => ({
        url: `${API_PATH}/fonctions/${data.id}`,
        method: APP_METHODS.DELETE
      }),
      invalidatesTags: ['UNIQUE', 'LIST']
    }),

  })
  
})

export const {
  usePostFonctionMutation,
  useGetFonctionsQuery,
  useEditFonctionMutation,
  useDeleteFonctionMutation,
  useGetUniqueFonctionQuery,
} = fonctionApiSlice
