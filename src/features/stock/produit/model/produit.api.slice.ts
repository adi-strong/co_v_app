import {API} from "../../../app/store.ts";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import type {Produit, SaveProduit} from "./produitService.ts";

let totalProduitsItems: number = 0

const produitApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    getProduits: build.query<Produit[], string>({
      query: () => `${API_PATH}/produits`,
      transformResponse: (response: JsonLDResponseInt<Produit>) => {
        totalProduitsItems = response.totalItems
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
    
    getUniqueProduit: build.query<Produit, string | number | undefined>({
      query: id => `${API_PATH}/produits/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),
    
    postProduit: build.mutation<Produit, FormData>({
      query: (data: FormData) => ({
        url: `${API_PATH}/produits`,
        method: APP_METHODS.POST,
        body: data
      })
    }),
    
    editProduit: build.mutation<Produit, SaveProduit>({
      query: (data: SaveProduit) => ({
        url: `${API_PATH}/produits/${data?.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify({
          nom: data.nom,
          code: data.code,
          description: data?.description ?? null,
          codeQr: data?.codeQr ?? null,
          codeBar: data?.codeBar ?? null,
          fkUnite: data?.fkUnite ? data.fkUnite?.data : null,
          fkCategorie: data?.fkCategorie ? data.fkCategorie?.data : null,
        })
      }),
      invalidatesTags: (result, error, arg) => [{
        id: arg.id,
        type: 'UNIQUE',
      }]
    }),
    
    deleteProduit: build.mutation<Produit, Produit>({
      query: (data: Produit) => ({
        url: `${API_PATH}/produits/${data.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify({ deleted: true })
      })
    }),

  })
  
})

export const {
  useGetProduitsQuery,
  useLazyGetProduitsQuery,
  useGetUniqueProduitQuery,
  usePostProduitMutation,
  useEditProduitMutation,
  useDeleteProduitMutation,
} = produitApiSlice
