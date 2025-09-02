// Service bonDeDepenses à implémenter
import {API, API_PATH, HEADERS, METHODS} from "../../../app/store";
import {JsonLDResponse} from "../../../interfaces/JsonLDResponseInt";
import {Expense, ExpenseFilters, ExpenseSaver} from "./bonDeDepensesService";
  
export let totalExpensesItems: number = 0
export let totalExpensesPages: number = 1
  
  const bonDeDepensesApiSlice = API.injectEndpoints({
    endpoints: build => ({
      
      postExpense: build.mutation<Expense, ExpenseSaver>({
        query: (data) => ({
          url: API_PATH + `/bon_de_depenses`,
          method: METHODS.POST,
          headers: HEADERS.POST_HEADERS,
          body: JSON.stringify({
            demandeur: data.demandeur,
            createdAt: data.createdAt,
            objet: data.objet,
            designations: data.designations.length > 0
              ? data.designations.map(d => ({
                libelle: d.libelle,
                qte: d.qte,
                prixUnitaire: !isNaN(d.prixUnitaire) ? Number(d.prixUnitaire).toString() : '0',
                typeId: d.typeId,
              }))
              : [],
          })
        })
      }),
      
      getFilteredExpenses: build.mutation<Expense[], ExpenseFilters>({
        query: (data) => ({
          url: API_PATH + `/bon_de_depenses/filter`,
          method: METHODS.POST,
          headers: HEADERS.POST_HEADERS,
          body: JSON.stringify({
            startAt: data?.startAt ? data.startAt : null,
            endAt: data?.endAt ? data.endAt : null,
            object: data?.object ? data.object : null,
            expenseType: data?.expenseType ? Number(data.expenseType.data) : null,
            expenseId: data?.expenseId ? Number(data.expenseId) : null,
          })
        })
      }),
      
      getExpenses: build.query<Expense[], string>({
        query: () => API_PATH + '/bon_de_depenses',
        transformResponse: (response: JsonLDResponse<Expense>) => {
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
      
      getPaginateExpenses: build.query<Expense[], string>({
        query: (filters: string | number) => `${API_PATH}/bon_de_depenses${filters}`,
        transformResponse: (response: JsonLDResponse<Expense>) => {
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
              { type: 'LIST' as const, id: 'LIST' }
            ]
          }
          return [{ type: 'LIST' as const, id: 'LIST' }];
        }
      }),
      
      editExpense: build.mutation<Expense, ExpenseSaver>({
        query: (data) => ({
          url: API_PATH + `/bon_de_depenses/${data?.id}`,
          method: METHODS.PATCH,
          headers: HEADERS.PATCH_HEADERS,
          body: JSON.stringify({
            id: data?.id ? data.id : null,
            demandeur: data.demandeur,
            createdAt: data.createdAt,
            objet: data.objet,
            designations: data.designations.length > 0
              ? data.designations.map(d => ({
                libelle: d.libelle,
                qte: d.qte,
                prixUnitaire: !isNaN(d.prixUnitaire) ? Number(d.prixUnitaire).toString() : '0',
                typeId: d.typeId,
              }))
              : [],
          })
        })
      }),
      
      deleteExpense: build.mutation<void, Expense>({
        query: (data) => ({
          url: API_PATH + `/bon_de_depenses/${data?.id}`,
          method: METHODS.DELETE
        })
      }),
      
      getUniqueExpense: build.query<Expense, string | number | undefined>({
        query: id => API_PATH + `/bon_de_depenses/${id}`,
        providesTags: (result, error, arg) => [{
          type: 'UNIQUE',
          id: arg
        }]
      }),
    
    })
  });
  
  export const {
    usePostExpenseMutation,
    useEditExpenseMutation,
    useDeleteExpenseMutation,
    useGetExpensesQuery,
    useGetUniqueExpenseQuery,
    useLazyGetPaginateExpensesQuery,
    useGetFilteredExpensesMutation,
  } = bonDeDepensesApiSlice
