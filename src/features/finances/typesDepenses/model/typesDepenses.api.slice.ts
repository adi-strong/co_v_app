// Service typesDepenses à implémenter
import {API, API_PATH, HEADERS, METHODS} from "../../../app/store";
import {ExpenseType, ExpenseTypeSaver} from "./typesDepensesService";
import {JsonLDResponse} from "../../../interfaces/JsonLDResponse";

export let totalExpenseTypesItems: number = 0
export let totalPagesExpenseTypes: number = 1
  
  const typesDepensesApiSlice = API.injectEndpoints({
    endpoints: build => ({
      
      postExpenseType: build.mutation<ExpenseType, ExpenseTypeSaver>({
        query: (data) => ({
          url: API_PATH + `/type_depenses`,
          method: METHODS.POST,
          headers: HEADERS.POST_HEADERS,
          body: JSON.stringify(data)
        })
      }),
      
      editExpenseType: build.mutation<ExpenseType, ExpenseTypeSaver>({
        query: (data) => ({
          url: API_PATH + `/type_depenses/${data?.id}`,
          method: METHODS.PATCH,
          headers: HEADERS.PATCH_HEADERS,
          body: JSON.stringify(data)
        })
      }),
      
      getExpenseTypes: build.query<ExpenseType[], string>({
        query: () => API_PATH + '/type_depenses',
        transformResponse: (response: JsonLDResponse<ExpenseType>) => {
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
          method: METHODS.DELETE
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
