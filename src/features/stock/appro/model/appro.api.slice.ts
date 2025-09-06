import {API} from "../../../app/store.ts";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import type {Appro, SaveAppro} from "./approService.ts";

let totalApprosItems: number = 0

const approApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    getAppros: build.query<Appro[], string>({
      query: () => `${API_PATH}/appros`,
      transformResponse: (response: JsonLDResponseInt<Appro>) => {
        totalApprosItems = response.totalItems
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
    
    getUniqueAppro: build.query<Appro, string | number | undefined>({
      query: id => `${API_PATH}/appros/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),
    
    postAppro: build.mutation<Appro, SaveAppro>({
      query: (data: SaveAppro) => ({
        url: `${API_PATH}/appros`,
        method: APP_METHODS.POST,
        headers: APP_HEADERS.POST_HEADERS,
        body: JSON.stringify({
          ...data,
          remise: isNaN(data.remise) ? '0' : data.remise.toString(),
          createdAt: data?.createdAt ? data.createdAt : null,
          fkFournisseur: data?.fkFournisseur ? data.fkFournisseur?.data : null,
        })
      })
    }),

  })
  
})

export const {
  useGetApprosQuery,
  useGetUniqueApproQuery,
  usePostApproMutation,
} = approApiSlice
