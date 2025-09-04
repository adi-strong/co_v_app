import {API} from "../../../app/store";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import type {SaveStructure, Structure} from "./structureService.ts";

let totalStructuresItems: number = 0

const structureApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    getStructures: build.query<Structure[], string>({
      query: () => `${API_PATH}/structures`,
      transformResponse: (response: JsonLDResponseInt<Structure>) => {
        totalStructuresItems = response.totalItems
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
    
    getUniqueStructure: build.query<Structure, string | number | undefined>({
      query: id => `${API_PATH}/structures/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),
    
    postStructure: build.mutation<Structure, SaveStructure>({
      query: (data: SaveStructure) => ({
        url: `${API_PATH}/structures`,
        method: APP_METHODS.POST,
        headers: APP_HEADERS.POST_HEADERS,
        body: JSON.stringify(data)
      })
    }),
    
    editStructure: build.mutation<Structure, SaveStructure>({
      query: (data: SaveStructure) => ({
        url: `${API_PATH}/structures/${data?.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify(data)
      }),
      invalidatesTags: (result, error, arg) => [{
        id: arg.id,
        type: 'UNIQUE',
      }]
    }),
    
    deleteStructure: build.mutation<void, Structure>({
      query: (data: Structure) => ({
        url: `${API_PATH}/structures/${data.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify({ deleted: true })
      })
    }),

  })
  
})

export const {
  useGetStructuresQuery,
  useGetUniqueStructureQuery,
  usePostStructureMutation,
  useEditStructureMutation,
  useDeleteStructureMutation,
} = structureApiSlice
