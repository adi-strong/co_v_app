import {API} from "../../../app/store.ts";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import type {BonEntree, SaveBonEntree} from "./bonEntreeService.ts";

let totalBonEntreesItems: number = 0

const bonEntreeApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    getBonEntrees: build.query<BonEntree[], string>({
      query: () => `${API_PATH}/bon_entrees`,
      transformResponse: (response: JsonLDResponseInt<BonEntree>) => {
        totalBonEntreesItems = response.totalItems
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
    
    getUniqueBonEntree: build.query<BonEntree, string | number | undefined>({
      query: id => `${API_PATH}/bon_entrees/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),
    
    postBonEntree: build.mutation<BonEntree, SaveBonEntree>({
      query: (data: SaveBonEntree) => ({
        url: `${API_PATH}/bon_entrees`,
        method: APP_METHODS.POST,
        headers: APP_HEADERS.POST_HEADERS,
        body: JSON.stringify({
          ...data,
          createdAt: data?.createdAt && data.createdAt.length >= 10 ? data.createdAt : null,
          designations: data.designations.length > 0
            ? data.designations.map(d => ({
              libelle: d.libelle,
              qte: d.qte,
              prixUnitaire: !isNaN(d.prixUnitaire) ? Number(d.prixUnitaire).toString() : '0'
            }))
            : [],
        })
      }),
      invalidatesTags: ['UNIQUE', 'LIST']
    }),

  })
  
})

export const {
  useGetBonEntreesQuery,
  useGetUniqueBonEntreeQuery,
  usePostBonEntreeMutation,
} = bonEntreeApiSlice
