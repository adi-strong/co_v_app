import {API} from "../../../app/store.ts";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import type {CategorieProduit, SaveCategorieProduit} from "./categorieProduitService.ts";

let totalCategorieProduitsItems: number = 0

const categorieProduitApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    getCategorieProduits: build.query<CategorieProduit[], string>({
      query: () => `${API_PATH}/categorie_produits`,
      transformResponse: (response: JsonLDResponseInt<CategorieProduit>) => {
        totalCategorieProduitsItems = response.totalItems
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
    
    getUniqueCategorieProduit: build.query<CategorieProduit, string | number | undefined>({
      query: id => `${API_PATH}/categorie_produits/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),
    
    postCategorieProduit: build.mutation<CategorieProduit, SaveCategorieProduit>({
      query: (data: SaveCategorieProduit) => ({
        url: `${API_PATH}/categorie_produits`,
        method: APP_METHODS.POST,
        headers: APP_HEADERS.POST_HEADERS,
        body: JSON.stringify(data)
      })
    }),
    
    editCategorieProduit: build.mutation<CategorieProduit, SaveCategorieProduit>({
      query: (data: SaveCategorieProduit) => ({
        url: `${API_PATH}/categorie_produits/${data?.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify(data)
      }),
      invalidatesTags: (result, error, arg) => [{
        id: arg.id,
        type: 'UNIQUE',
      }]
    }),
    
    deleteCategorieProduit: build.mutation<void, CategorieProduit>({
      query: (data: CategorieProduit) => ({
        url: `${API_PATH}/categorie_produits/${data.id}`,
        method: APP_METHODS.DELETE
      })
    }),

  })
  
})

export const {
  useGetCategorieProduitsQuery,
  useGetUniqueCategorieProduitQuery,
  usePostCategorieProduitMutation,
  useEditCategorieProduitMutation,
  useDeleteCategorieProduitMutation,
} = categorieProduitApiSlice
