import {API} from "../../../app/store.ts";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import type {Examen, SaveExamen} from "./examenService.ts";

let totalExamensItems: number = 0

const examenApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    getExamens: build.query<Examen[], string>({
      query: () => `${API_PATH}/examens`,
      transformResponse: (response: JsonLDResponseInt<Examen>) => {
        totalExamensItems = response.totalItems
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
    
    getUniqueExamen: build.query<Examen, string | number | undefined>({
      query: id => `${API_PATH}/examens/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),
    
    postExamen: build.mutation<Examen, SaveExamen>({
      query: (data: SaveExamen) => ({
        url: `${API_PATH}/examens`,
        method: APP_METHODS.POST,
        headers: APP_HEADERS.POST_HEADERS,
        body: JSON.stringify({
          ...data,
          prixHt: isNaN(data.prixHt) ? null : data.prixHt.toString(),
          prixTtc: isNaN(data.prixTtc) ? null : data.prixTtc.toString(),
          fkCategorie: data?.fkCategorie ? data.fkCategorie?.data : null,
        })
      })
    }),
    
    editExamen: build.mutation<Examen, SaveExamen>({
      query: (data: SaveExamen) => ({
        url: `${API_PATH}/examens/${data?.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify({
          ...data,
          prixHt: isNaN(data.prixHt) ? null : data.prixHt.toString(),
          prixTtc: isNaN(data.prixTtc) ? null : data.prixTtc.toString(),
          fkCategorie: data?.fkCategorie ? data.fkCategorie?.data : null,
        })
      }),
      invalidatesTags: (result, error, arg) => [{
        id: arg.id,
        type: 'UNIQUE',
      }]
    }),
    
    deleteExamen: build.mutation<void, Examen>({
      query: (data: Examen) => ({
        url: `${API_PATH}/examens/${data.id}`,
        headers: APP_HEADERS.PATCH_HEADERS,
        method: APP_METHODS.PATCH,
        body: JSON.stringify({ deleted: true })
      })
    }),

  })
  
})

export const {
  useGetExamensQuery,
  useGetUniqueExamenQuery,
  usePostExamenMutation,
  useEditExamenMutation,
  useDeleteExamenMutation,
} = examenApiSlice
