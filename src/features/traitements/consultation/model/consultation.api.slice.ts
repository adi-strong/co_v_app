import {API} from "../../../app/store.ts";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import type {Consultation, SaveConsultation, SaveSigneVital, SigneVital} from "./consultationService.ts";

let totalConsultationsItems: number = 0

const consultationApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    getConsultations: build.query<Consultation[], string>({
      query: () => `${API_PATH}/consultations`,
      transformResponse: (response: JsonLDResponseInt<Consultation>) => {
        totalConsultationsItems = response.totalItems
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
    
    getUniqueConsultation: build.query<Consultation, string | number | undefined>({
      query: id => `${API_PATH}/consultations/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),
    
    postConsultation: build.mutation<Consultation, SaveConsultation>({
      query: (data: SaveConsultation) => ({
        url: `${API_PATH}/consultations`,
        method: APP_METHODS.POST,
        headers: APP_HEADERS.POST_HEADERS,
        body: JSON.stringify({
          ...data,
          fkPatient: data?.fkPatient ? data.fkPatient?.data : null,
          fkAgent: data?.fkAgent ? data.fkAgent?.data : null,
          fkType: data?.fkAgent ? data.fkType?.data : null,
          dateDebut: data?.dateDebut ? data.dateDebut : null,
          dateFin: data?.dateFin ? data.dateFin : null,
        })
      }),
      invalidatesTags: ['LIST'],
    }),
    
    editConsultation: build.mutation<Consultation, SaveConsultation>({
      query: (data: SaveConsultation) => ({
        url: `${API_PATH}/consultations/${data?.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify({
          fkPatient: data?.fkPatient ? data.fkPatient?.data : null,
          fkAgent: data?.fkAgent ? data.fkAgent?.data : null,
          fkType: data?.fkAgent ? data.fkType?.data : null,
          dateDebut: data?.dateDebut && data.dateDebut.length >= 10 ? data.dateDebut : null,
          dateFin: data?.dateFin && data.dateFin.length >= 10 ? data.dateFin : null,
          abortStatus: data.statut,
          examsItems: data.examsItems,
          conclusion: data.conclusion,
          renseignementClinic: data.renseignementClinic,
          diagnostic: data.diagnostic,
          end: data.end,
          comment: data.comment,
        })
      }),
      invalidatesTags: (result, error, arg) => [{
        id: arg.id,
        type: 'UNIQUE',
      }]
    }),
    
    postSignesVitaux: build.mutation<SigneVital, SaveSigneVital>({
      query: (data: SaveSigneVital) => ({
        url: `${API_PATH}/signes_vitaux`,
        method: APP_METHODS.POST,
        headers: APP_HEADERS.POST_HEADERS,
        body: JSON.stringify({
          ...data,
          temperature: isNaN(data.temperature) ? null : Number(data.temperature),
          poids: isNaN(data.poids) ? null : Number(data.poids),
          releasedAt: data?.releasedAt && data.releasedAt.length >= 10 ? data.releasedAt : null,
        })
      }),
      invalidatesTags: ['LIST'],
    }),

  })
  
})

export const {
  useGetConsultationsQuery,
  useGetUniqueConsultationQuery,
  usePostConsultationMutation,
  useEditConsultationMutation,
  usePostSignesVitauxMutation,
} = consultationApiSlice
