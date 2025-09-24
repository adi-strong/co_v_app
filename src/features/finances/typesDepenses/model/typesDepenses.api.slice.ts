import type {ExpenseType, ExpenseTypeSaver} from "./typesDepensesService.ts";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import {API} from "../../../app/store.ts";


export let totalExpenseTypesItems: number = 0
export let totalPagesExpenseTypes: number = 1
  
  const typesDepensesApiSlice = API.injectEndpoints({
    endpoints: build => ({
      
      postExpenseType: build.mutation<ExpenseType, ExpenseTypeSaver>({
        query: (data) => ({
          url: API_PATH + `/type_depenses`,
          method: APP_METHODS.POST,
          headers: APP_HEADERS.POST_HEADERS,
          body: JSON.stringify(data)
        })
      }),
      
      editExpenseType: build.mutation<ExpenseType, ExpenseTypeSaver>({
        query: (data) => ({
          url: API_PATH + `/type_depenses/${data?.id}`,
          method: APP_METHODS.POST,
          headers: APP_HEADERS.POST_HEADERS,
          body: JSON.stringify(data)
        })
      }),
      
      getExpenseTypes: build.query<ExpenseType[], string>({
        query: () => API_PATH + '/type_depenses',
        transformResponse: (response: JsonLDResponseInt<ExpenseType>) => {
          totalExpenseTypesItems = response.totalItems
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
      
      deleteExpenseType: build.mutation<void, ExpenseType>({
        query: (data) => ({
          url: API_PATH + `/type_depenses/${data?.id}`,
          method: APP_METHODS.DELETE
        })
      }),
    
    })
  });
  
  export const {
    usePostExpenseTypeMutation,
    useGetExpenseTypesQuery,
    useEditExpenseTypeMutation,
    useDeleteExpenseTypeMutation,
  } = typesDepensesApiSlice
