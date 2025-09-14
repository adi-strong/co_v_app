import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type {Examen} from "../../examen/model/examenService.ts";

export interface CategoryExamPayload {
  id: number
  nom: string
  exams: Examen[]
  selected: boolean
}

export interface InitCategoryExamState { categoriesExams: CategoryExamPayload[] }

export interface CategoryExamState { categoriesExams: InitCategoryExamState }

const initialState: InitCategoryExamState = { categoriesExams: [] }

const categorieExamSlice = createSlice({

  name: 'categoriesExams',
  initialState,
  reducers: {

    resetCategoriesExams: (state: InitCategoryExamState): void => { state.categoriesExams = initialState.categoriesExams },
    
    setCategoriesExams: (state: InitCategoryExamState, action: PayloadAction<InitCategoryExamState>): void => {
      const { payload } = action
      state.categoriesExams = payload.categoriesExams
    }
    
  },
});

export const {
  resetCategoriesExams,
  setCategoriesExams,
} = categorieExamSlice.actions

export default categorieExamSlice.reducer
