import {API} from "../../../app/store";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import type {SaveTypeConsultation, TypeConsultation} from "./typeConsultationService.ts";

let totalTypeConsultationsItems: number = 0

const typeConsultationApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    postTypeConsultation: build.mutation<TypeConsultation, SaveTypeConsultation>({
      query: (data: SaveTypeConsultation) => ({
        url: `${API_PATH}/type_consultations`,
        method: APP_METHODS.POST,
        headers: APP_HEADERS.POST_HEADERS,
        body: JSON.stringify({
          ...data,
          prixHt: isNaN(data.prixHt) ? null : data.prixHt.toString(),
          prixTtc: isNaN(data.prixTtc) ? null : data.prixTtc.toString(),
          taxe: isNaN(data.taxe) ? '0' : data.taxe.toString(),
        })
      })
    }),
    
    getTypeConsultations: build.query<TypeConsultation[], string>({
      query: () => `${API_PATH}/type_consultations`,
      transformResponse: (response: JsonLDResponseInt<TypeConsultation>) => {
        totalTypeConsultationsItems = response.totalItems
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
    
    getSearchTypeConsultations: build.query<TypeConsultation[], string>({
      query: (keywords: string) => `${API_PATH}/type_consultations?nom=${keywords}`,
      transformResponse: (response: JsonLDResponseInt<TypeConsultation>) => {
        totalTypeConsultationsItems = response.totalItems
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
    
    editTypeConsultation: build.mutation<TypeConsultation, SaveTypeConsultation>({
      query: (data: SaveTypeConsultation) => ({
        url: `${API_PATH}/type_consultations/${data?.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify({
          ...data,
          prixHt: isNaN(data.prixHt) ? null : data.prixHt.toString(),
          prixTtc: isNaN(data.prixTtc) ? null : data.prixTtc.toString(),
          taxe: isNaN(data.taxe) ? '0' : data.taxe.toString(),
        })
      }),
      invalidatesTags: (result, error, arg) => [{
        id: arg.id,
        type: 'UNIQUE',
      }]
    }),
    
    deleteTypeConsultation: build.mutation<TypeConsultation, TypeConsultation>({
      query: (data) => ({
        url: `${API_PATH}/type_consultations/${data?.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify({ deleted: true })
      }),
      invalidatesTags: (result, error, arg) => [{
        id: arg.id,
        type: 'UNIQUE',
      }]
    }),
    
    getUniqueTypeConsultation: build.query<TypeConsultation, string | number | undefined>({
      query: id => `${API_PATH}/type_consultations/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),

  })
  
})

export const {
  usePostTypeConsultationMutation,
  useGetTypeConsultationsQuery,
  useLazyGetSearchTypeConsultationsQuery,
  useEditTypeConsultationMutation,
  useDeleteTypeConsultationMutation,
  useGetUniqueTypeConsultationQuery,
} = typeConsultationApiSlice
