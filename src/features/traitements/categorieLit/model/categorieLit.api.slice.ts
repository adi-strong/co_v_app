import {API} from "../../../app/store";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import type {CategorieLit, SaveCategorieLit} from "./categorieLitService.ts";

let totalCategorieLitsItems: number = 0

const categorieLitApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    postCategorieLit: build.mutation<CategorieLit, SaveCategorieLit>({
      query: (data: SaveCategorieLit) => ({
        url: `${API_PATH}/categorie_lits`,
        method: APP_METHODS.POST,
        headers: APP_HEADERS.POST_HEADERS,
        body: JSON.stringify(data)
      })
    }),
    
    getCategoriesLits: build.query<CategorieLit[], string>({
      query: () => `${API_PATH}/categorie_lits`,
      transformResponse: (response: JsonLDResponseInt<CategorieLit>) => {
        totalCategorieLitsItems = response.totalItems
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
    
    editCategorieLit: build.mutation<CategorieLit, SaveCategorieLit>({
      query: (data: SaveCategorieLit) => ({
        url: `${API_PATH}/categorie_lits/${data?.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify(data)
      }),
      invalidatesTags: (result, error, arg) => [{
        id: arg.id,
        type: 'UNIQUE',
      }]
    }),
    
    deleteCategorieLit: build.mutation<void, CategorieLit>({
      query: (data: CategorieLit) => ({
        url: `${API_PATH}/categorie_lits/${data.id}`,
        method: APP_METHODS.DELETE
      })
    }),
    
    getUniqueCategorieLit: build.query<CategorieLit, string | number | undefined>({
      query: id => `${API_PATH}/categorie_lits/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),

  })
  
})

export const {
  usePostCategorieLitMutation,
  useGetCategoriesLitsQuery,
  useEditCategorieLitMutation,
  useDeleteCategorieLitMutation,
  useGetUniqueCategorieLitQuery,
} = categorieLitApiSlice
