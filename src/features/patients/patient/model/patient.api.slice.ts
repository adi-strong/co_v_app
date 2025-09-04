import {API} from "../../../app/store";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import type {Patient, SavePatient} from "./patientService.ts";

let totalPatientsItems: number = 0

const patientApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    postPatient: build.mutation<Patient, FormData>({
      query: (data: FormData) => ({
        url: `${API_PATH}/patients`,
        method: APP_METHODS.POST,
        body: data
      })
    }),
    
    getPatients: build.query<Patient[], string>({
      query: () => `${API_PATH}/patients`,
      transformResponse: (response: JsonLDResponseInt<Patient>) => {
        totalPatientsItems = response.totalItems
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
    
    editPatient: build.mutation<Patient, SavePatient>({
      query: (data: SavePatient) => ({
        url: `${API_PATH}/patients/${data?.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify({
          nom: data.nom,
          tel: data.tel,
          email: data.email,
          postNom: data?.postNom ?? null,
          prenom: data?.prenom ?? null,
          sexe: data?.sexe ?? null,
          etatCivil: data?.etatCivil ?? null,
          nationalite: data?.nationalite ?? null,
          dateDeNaissance: data?.dateDeNaissance ?? null,
          adresse: data?.adresse ?? null,
          mere: data?.mere ?? null,
          pere: data?.pere ?? null,
          estCeConventionne: data?.estCeConventionne ?? null,
          fkStructure: data?.fkStructure ? data.fkStructure?.data : null,
        })
      }),
      invalidatesTags: (result, error, arg) => [{
        id: arg.id,
        type: 'UNIQUE',
      }]
    }),
    
    deletePatient: build.mutation<void, Patient>({
      query: (data: Patient) => ({
        url: `${API_PATH}/patients/${data.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify({ deleted: true })
      })
    }),
    
    getUniquePatient: build.query<Patient, string | number | undefined>({
      query: id => `${API_PATH}/patients/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),

  })
  
})

export const {
  useGetPatientsQuery,
  useGetUniquePatientQuery,
  usePostPatientMutation,
  useEditPatientMutation,
  useDeletePatientMutation,
} = patientApiSlice
