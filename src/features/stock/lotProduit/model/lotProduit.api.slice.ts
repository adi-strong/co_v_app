import {API} from "../../../app/store.ts";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import type {LotProduit, SaveLotProduit} from "./lotProduitService.ts";

let totalLotProduitsItems: number = 0

const lotProduitApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    getLotProduits: build.query<LotProduit[], string>({
      query: () => `${API_PATH}/lot_produits`,
      transformResponse: (response: JsonLDResponseInt<LotProduit>) => {
        totalLotProduitsItems = response.totalItems
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
    
    getLotProduitsByProduct: build.query<LotProduit[], string | number>({
      query: (produitId: string | number) => `${API_PATH}/produits/${produitId}/lot_produits`,
      transformResponse: (response: JsonLDResponseInt<LotProduit>) => {
        totalLotProduitsItems = response.totalItems
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
    
    getUniqueLotProduit: build.query<LotProduit, string | number | undefined>({
      query: id => `${API_PATH}/lot_produits/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),
    
    editLotProduit: build.mutation<LotProduit, SaveLotProduit>({
      query: (data: SaveLotProduit) => ({
        url: `${API_PATH}/lot_produits/${data?.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify({
          tva: data.tva.toString(),
          prixHt: data.prixHt.toString(),
          prixTtc: data.prixTtc.toString(),
          fkFournisseur: data?.fkFournisseur ? data.fkFournisseur?.data : null,
        })
      }),
      invalidatesTags: ['UNIQUE', 'LIST']
    }),

  })
  
})

export const {
  useGetLotProduitsQuery,
  useGetUniqueLotProduitQuery,
  useGetLotProduitsByProductQuery,
  useEditLotProduitMutation,
} = lotProduitApiSlice
