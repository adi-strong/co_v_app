import {API} from "../../../app/store.ts";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import type {Hospitalisation, SaveHospitalisation} from "./hospitalisationService.ts";

let totalHospitalisationsItems: number = 0

const hospitalisationApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    getHospitalisations: build.query<Hospitalisation[], string>({
      query: () => `${API_PATH}/hospitalisations`,
      transformResponse: (response: JsonLDResponseInt<Hospitalisation>) => {
        totalHospitalisationsItems = response.totalItems
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
    
    getUniqueHospitalisation: build.query<Hospitalisation, string | number | undefined>({
      query: id => `${API_PATH}/hospitalisations/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),
    
    postHospitalisation: build.mutation<Hospitalisation, SaveHospitalisation>({
      query: (data: SaveHospitalisation) => ({
        url: `${API_PATH}/hospitalisations`,
        method: APP_METHODS.POST,
        headers: APP_HEADERS.POST_HEADERS,
        body: JSON.stringify({
          fkLit: data?.fkLit ? data.fkLit?.data : null,
          dateAdmission: data?.dateAdmission && data.dateAdmission.length >= 10 ? data.dateAdmission : null,
          modeEntree: data.modeEntree,
          motif: data.motif,
          fkConsultation: data.fkConsultation
        })
      })
    }),
    
    editHospitalisation: build.mutation<Hospitalisation, SaveHospitalisation>({
      query: (data: SaveHospitalisation) => ({
        url: `${API_PATH}/hospitalisations/${data?.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify({
          end: data.finished,
          modeSortie: data.modeSortie,
          dateSortie: data?.dateSortie && data.dateSortie.length >= 10 ? data.dateSortie : null,
        })
      }),
      invalidatesTags: (result, error, arg) => [{
        id: arg.id,
        type: 'UNIQUE',
      }]
    }),
    
    deleteHospitalisation: build.mutation<void, Hospitalisation>({
      query: (data: Hospitalisation) => ({
        url: `${API_PATH}/hospitalisations/${data.id}`,
        method: APP_METHODS.DELETE
      })
    }),

  })
  
})

export const {
  useGetHospitalisationsQuery,
  useGetUniqueHospitalisationQuery,
  usePostHospitalisationMutation,
  useEditHospitalisationMutation,
  useDeleteHospitalisationMutation,
} = hospitalisationApiSlice
