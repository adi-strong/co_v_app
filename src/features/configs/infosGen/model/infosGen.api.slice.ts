import {API} from "../../../app/store";
import {API_PATH, APP_METHODS} from "../../../../config/configs.ts";
import type {InfosGen} from "./infosGenService.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";

let totalInfosGensItems: number = 0

const infosGenApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    getUniqueInfos: build.query<InfosGen, string | number | undefined>({
      query: id => `${API_PATH}/infos_gens/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),
    
    getInfosGens: build.query<InfosGen[], string>({
      query: () => `${API_PATH}/infos_gens`,
      transformResponse: (response: JsonLDResponseInt<InfosGen>) => {
        totalInfosGensItems = response.totalItems
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
    
    editInfosGen: build.mutation<InfosGen, FormData>({
      query: (data: FormData) => ({
        url: `${API_PATH}/update_infos_gen`,
        method: APP_METHODS.POST,
        body: data
      }),
      invalidatesTags: (result, error, arg) => [{
        id: arg.id,
        type: 'UNIQUE',
      }]
    }),

  })
  
})

export const {
  useGetUniqueInfosQuery,
  useLazyGetUniqueInfosQuery,
  useGetInfosGensQuery,
  useEditInfosGenMutation,
} = infosGenApiSlice
