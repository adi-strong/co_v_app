import {API} from "../../app/store.ts";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../interfaces/JsonLDResponseInt.ts";
import type {Reception, SaveReception} from "./receptionService.ts";

let totalReceptionsItems: number = 0

const receptionApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    getReceptions: build.query<Reception[], string>({
      query: () => `${API_PATH}/receptions`,
      transformResponse: (response: JsonLDResponseInt<Reception>) => {
        totalReceptionsItems = response.totalItems
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
    
    getUniqueReception: build.query<Reception, string | number | undefined>({
      query: id => `${API_PATH}/receptions/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),
    
    postReception: build.mutation<Reception, SaveReception>({
      query: (data: SaveReception) => ({
        url: `${API_PATH}/receptions`,
        method: APP_METHODS.POST,
        headers: APP_HEADERS.POST_HEADERS,
        body: JSON.stringify({
          ...data,
          rdvAt: data?.rdvAt ? data.rdvAt : null,
          dateNaissance: data?.dateNaissance ? data.dateNaissance : null,
        })
      })
    }),
    
    deleteReception: build.mutation<void, Reception>({
      query: (data: Reception) => ({
        url: `${API_PATH}/receptions/${data.id}`,
        method: APP_METHODS.DELETE
      })
    }),

  })
  
})

export const {
  useGetReceptionsQuery,
  useGetUniqueReceptionQuery,
  usePostReceptionMutation,
  useDeleteReceptionMutation,
} = receptionApiSlice
