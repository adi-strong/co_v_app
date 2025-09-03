import {API} from "../../../app/store";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import type {Departement, SaveDepartement} from "./departementService.ts";

let totalDepartementsItems: number = 0

const departementApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    postDepartement: build.mutation<Departement, SaveDepartement>({
      query: (data: SaveDepartement) => ({
        url: `${API_PATH}/departements`,
        method: APP_METHODS.POST,
        headers: APP_HEADERS.POST_HEADERS,
        body: JSON.stringify(data)
      })
    }),
    
    getDepartements: build.query<Departement[], string>({
      query: () => `${API_PATH}/departements`,
      transformResponse: (response: JsonLDResponseInt<Departement>) => {
        totalDepartementsItems = response.totalItems
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
    
    editDepartement: build.mutation<Departement, SaveDepartement>({
      query: (data: SaveDepartement) => ({
        url: `${API_PATH}/departements/${data?.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify(data)
      }),
      invalidatesTags: (result, error, arg) => [{
        id: arg.id,
        type: 'UNIQUE',
      }]
    }),
    
    deleteDepartement: build.mutation<void, Departement>({
      query: (data: Departement) => ({
        url: `${API_PATH}/departements/${data.id}`,
        method: APP_METHODS.DELETE
      })
    }),
    
    getUniqueDepartement: build.query<Departement, string | number | undefined>({
      query: id => `${API_PATH}/departements/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),

  })
  
})

export const {
  useGetDepartementsQuery,
  useGetUniqueDepartementQuery,
  usePostDepartementMutation,
  useEditDepartementMutation,
  useDeleteDepartementMutation,
} = departementApiSlice
