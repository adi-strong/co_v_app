import {API} from "../../../app/store.ts";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import type {Lab, SaveLab} from "./labservice.ts";

let totalLabsItems: number = 0

const labApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    getLabs: build.query<Lab[], string>({
      query: () => `${API_PATH}/labs`,
      transformResponse: (response: JsonLDResponseInt<Lab>) => {
        totalLabsItems = response.totalItems
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
    
    getUniqueLab: build.query<Lab, string | number | undefined>({
      query: id => `${API_PATH}/labs/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),
    
    editLab: build.mutation<Lab, SaveLab>({
      query: (data: SaveLab) => ({
        url: `${API_PATH}/labs/${data?.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify(data)
      }),
      invalidatesTags: (result, error, arg) => [{
        id: arg.id,
        type: 'UNIQUE',
      }]
    }),

  })
  
})

export const {
  useGetLabsQuery,
  useGetUniqueLabQuery,
  useEditLabMutation,
} = labApiSlice
