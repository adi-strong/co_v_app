import {API} from "../../app/store.ts";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../interfaces/JsonLDResponseInt.ts";
import type {RendezVous, SaveRendezVous} from "./rendezVousService.ts";

let totalRendezVoussItems: number = 0

const rendezVousApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    getRendezVouss: build.query<RendezVous[], string>({
      query: () => `${API_PATH}/rendez_vouses`,
      transformResponse: (response: JsonLDResponseInt<RendezVous>) => {
        totalRendezVoussItems = response.totalItems
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
    
    getUniqueRendezVous: build.query<RendezVous, string | number | undefined>({
      query: id => `${API_PATH}/rendez_vouses/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),
    
    postRendezVous: build.mutation<RendezVous, SaveRendezVous>({
      query: (data: SaveRendezVous) => ({
        url: `${API_PATH}/rendez_vouses`,
        method: APP_METHODS.POST,
        headers: APP_HEADERS.POST_HEADERS,
        body: JSON.stringify({
          ...data,
          date: data?.date ? data.date : null,
          fkAgent: data?.fkAgent ? data.fkAgent?.data : null,
        })
      })
    }),
    
    editRendezVous: build.mutation<RendezVous, SaveRendezVous>({
      query: (data: SaveRendezVous) => ({
        url: `${API_PATH}/rendez_vouses/${data?.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify({
          ...data,
          date: data?.date ? data.date : null,
          fkAgent: data?.fkAgent ? data.fkAgent?.data : null,
        })
      }),
      invalidatesTags: (result, error, arg) => [{
        id: arg.id,
        type: 'UNIQUE',
      }]
    }),
    
    deleteRendezVous: build.mutation<void, RendezVous>({
      query: (data: RendezVous) => ({
        url: `${API_PATH}/rendez_vouses/${data.id}`,
        method: APP_METHODS.DELETE
      })
    }),

  })
  
})

export const {
  useGetRendezVoussQuery,
  useGetUniqueRendezVousQuery,
  usePostRendezVousMutation,
  useEditRendezVousMutation,
  useDeleteRendezVousMutation,
} = rendezVousApiSlice
