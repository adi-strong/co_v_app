import {API} from "../../../app/store";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {CompteCaisse, SaveCompteCaisse} from "./compteCaisseService.ts";

const compteCaisseApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    getUniqueCompte: build.query<CompteCaisse, string | number | undefined>({
      query: id => `${API_PATH}/compte_caisses/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),
    
    editCompteCaisse: build.mutation<CompteCaisse, SaveCompteCaisse>({
      query: (data: SaveCompteCaisse) => ({
        url: `${API_PATH}/compte_caisses/${data.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify({ taux: isNaN(data.taux) ? null : data.taux.toString() })
      }),
      invalidatesTags: (result, error, arg) => [{
        id: arg.id,
        type: 'UNIQUE',
      }]
    }),

  })
  
})

export const {
  useGetUniqueCompteQuery,
  useLazyGetUniqueCompteQuery,
  useEditCompteCaisseMutation,
} = compteCaisseApiSlice
