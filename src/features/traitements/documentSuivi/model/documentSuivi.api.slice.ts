import {API} from "../../../app/store.ts";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {DocumentSuivi, SaveDocumentSuivi, SaveSuiviTraitement, SuiviTraitement} from "./documentSuiviService.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";

let totalDocumentSuivisItems: number = 0

const documentSuiviApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    getUniqueDocumentSuivi: build.query<DocumentSuivi, string | number | undefined>({
      query: id => `${API_PATH}/document_suivis/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),
    
    getDocumentSuivis: build.query<DocumentSuivi[], string>({
      query: () => `${API_PATH}/document_suivis`,
      transformResponse: (response: JsonLDResponseInt<DocumentSuivi>) => {
        totalDocumentSuivisItems = response.totalItems
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
    
    postDocumentSuivi: build.mutation<DocumentSuivi, SaveDocumentSuivi>({
      query: (data: SaveDocumentSuivi) => ({
        url: `${API_PATH}/document_suivis`,
        method: APP_METHODS.POST,
        headers: APP_HEADERS.POST_HEADERS,
        body: JSON.stringify({
          dateDebut: data?.dateDebut && data.dateDebut.length >= 10 ? data.dateDebut : null,
          dateFin: data?.dateFin && data.dateFin.length >= 10 ? data.dateFin : null,
          dateSortie: data?.dateSortie && data.dateSortie.length >= 10 ? data.dateSortie : null,
          fkType: data?.fkType ? data.fkType?.data : null,
          motif: data.motif,
          end: data.end,
          fkPatient: data?.fkPatient ? data.fkPatient?.data : null,
        })
      })
    }),
    
    editDocumentSuivi: build.mutation<DocumentSuivi, SaveDocumentSuivi>({
      query: (data: SaveDocumentSuivi) => ({
        url: `${API_PATH}/document_suivis/${data?.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify({
          dateDebut: data?.dateDebut && data.dateDebut.length >= 10 ? data.dateDebut : null,
          dateFin: data?.dateFin && data.dateFin.length >= 10 ? data.dateFin : null,
          dateSortie: data?.dateSortie && data.dateSortie.length >= 10 ? data.dateSortie : null,
          fkType: data?.fkType ? data.fkType?.data : null,
          motif: data.motif,
          end: data.end,
        })
      }),
      invalidatesTags: (result, error, arg) => [{
        id: arg.id,
        type: 'UNIQUE',
      }]
    }),
    
    postSuiviTraitements: build.mutation<SuiviTraitement, SaveSuiviTraitement>({
      query: (data: SaveSuiviTraitement) => ({
        url: `${API_PATH}/document_suivis/${data.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify({
          ...data,
          releasedAt: data?.releasedAt && data.releasedAt.length >= 10 ? data.releasedAt : null,
        })
      }),
      invalidatesTags: ['LIST'],
    }),

  })
  
})

export const {
  usePostSuiviTraitementsMutation,
  useGetUniqueDocumentSuiviQuery,
  useGetDocumentSuivisQuery,
  usePostDocumentSuiviMutation,
  useEditDocumentSuiviMutation,
} = documentSuiviApiSlice
