import {API} from "../../../app/store";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import type {CategorieExam, SaveCategorieExam} from "./categorieExamService.ts";

let totalCategorieExamsItems: number = 0

const categorieExamApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    postCategorieExam: build.mutation<CategorieExam, SaveCategorieExam>({
      query: (data: SaveCategorieExam) => ({
        url: `${API_PATH}/categorie_exams`,
        method: APP_METHODS.POST,
        headers: APP_HEADERS.POST_HEADERS,
        body: JSON.stringify(data)
      })
    }),
    
    getCategoriesExams: build.query<CategorieExam[], string>({
      query: () => `${API_PATH}/categorie_exams`,
      transformResponse: (response: JsonLDResponseInt<CategorieExam>) => {
        totalCategorieExamsItems = response.totalItems
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
    
    editCategorieExam: build.mutation<CategorieExam, SaveCategorieExam>({
      query: (data: SaveCategorieExam) => ({
        url: `${API_PATH}/categorie_exams/${data?.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify(data)
      }),
      invalidatesTags: (result, error, arg) => [{
        id: arg.id,
        type: 'UNIQUE',
      }]
    }),
    
    deleteCategorieExam: build.mutation<void, CategorieExam>({
      query: (data: CategorieExam) => ({
        url: `${API_PATH}/categorie_exams/${data.id}`,
        method: APP_METHODS.DELETE
      })
    }),
    
    getUniqueCategorieExam: build.query<CategorieExam, string | number | undefined>({
      query: id => `${API_PATH}/categorie_exams/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),

  })
  
})

export const {
  usePostCategorieExamMutation,
  useGetCategoriesExamsQuery,
  useEditCategorieExamMutation,
  useDeleteCategorieExamMutation,
  useGetUniqueCategorieExamQuery,
} = categorieExamApiSlice
