import {API} from "../../../app/store.ts";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import type {Prescription, SavePrescription} from "./prescriptionservice.ts";

let totalPrescriptionsItems: number = 0

const prescriptionApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    getUniquePrescription: build.query<Prescription, string | number | undefined>({
      query: id => `${API_PATH}/prescriptions/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),
    
    getPrescriptions: build.query<Prescription[], string>({
      query: () => `${API_PATH}/prescriptions`,
      transformResponse: (response: JsonLDResponseInt<Prescription>) => {
        totalPrescriptionsItems = response.totalItems
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
    
    postPrescription: build.mutation<Prescription, SavePrescription>({
      query: (data: SavePrescription) => ({
        url: `${API_PATH}/prescriptions`,
        method: APP_METHODS.POST,
        headers: APP_HEADERS.POST_HEADERS,
        body: JSON.stringify(data)
      }),
    }),
    
    deletePrescription: build.mutation<void, Prescription>({
      query: (data: Prescription) => ({
        url: `${API_PATH}/prescriptions/${data.id}`,
        method: APP_METHODS.DELETE
      })
    }),

  })
  
})

export const {
  useGetUniquePrescriptionQuery,
  useGetPrescriptionsQuery,
  usePostPrescriptionMutation,
  useDeletePrescriptionMutation,
} = prescriptionApiSlice
