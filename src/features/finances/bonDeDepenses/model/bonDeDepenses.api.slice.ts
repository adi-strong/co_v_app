import {API} from "../../../app/store.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {BonDeDepense, ExpenseSaver} from "./bonDeDepensesService.ts";
  
export let totalExpensesItems: number = 0
export let totalExpensesPages: number = 1
  
  const bonDeDepensesApiSlice = API.injectEndpoints({
    endpoints: build => ({
      
      postBonDepenses: build.mutation<BonDeDepense, ExpenseSaver>({
        query: (data: ExpenseSaver) => ({
          url: API_PATH + `/bon_de_depenses`,
          method: APP_METHODS.POST,
          headers: APP_HEADERS.POST_HEADERS,
          body: JSON.stringify({
            demandeur: data.demandeur,
            createdAt: data.createdAt,
            objet: data.objet,
            devise: data.devise,
            designations: data.designations.length > 0
              ? data.designations.map(d => ({
                libelle: d.libelle,
                qte: d.qte,
                prixUnitaire: !isNaN(d.prixUnitaire) ? Number(d.prixUnitaire).toString() : '0',
                typeId: d.typeId,
              }))
              : [],
          })
        }),
        invalidatesTags: ['UNIQUE', 'LIST']
      }),
      
      getBonDepenses: build.query<BonDeDepense[], string>({
        query: () => API_PATH + '/bon_de_depenses',
        transformResponse: (response: JsonLDResponseInt<BonDeDepense>) => {
          totalExpensesItems = response.totalItems
          
          if (response.view?.last) {
            const urlParts = response.view.last.split('?');
            const params = new URLSearchParams(urlParts[1]);
            totalExpensesPages = Number(params.get('page'));
          } else totalExpensesPages = 1
          
          return response.member;
        },
        providesTags: (result) => {
          if (result && Array.isArray(result)) {
            return [
              ...result.map(({ id }) => ({ type: 'UNIQUE' as const, id })),
              { type: 'LIST' as const, id: 'LIST' },
            ];
          }
          return [{ type: 'LIST' as const, id: 'LIST' }];
        },
      }),
      
      getUniqueBonDepense: build.query<BonDeDepense, string | number | undefined>({
        query: id => API_PATH + `/bon_de_depenses/${id}`,
        providesTags: (result, error, arg) => [{
          type: 'UNIQUE',
          id: arg
        }]
      }),
    
    })
  });
  
  export const {
    usePostBonDepensesMutation,
    useGetBonDepensesQuery,
    useGetUniqueBonDepenseQuery,
  } = bonDeDepensesApiSlice
