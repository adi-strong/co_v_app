import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {CategorieExam, SaveCategorieExam} from "../model/categorieExamService.ts";

export default function useSetCategorieExamensData(
  data: CategorieExam,
  setCategory?: Dispatch<SetStateAction<SaveCategorieExam>>
): void {
  
  useEffect(() => {
    if (data && setCategory) {
      setCategory(prev => ({
        ...prev,
        id: data.id,
        nom: data.nom,
      }))
    }
  }, [data, setCategory])
  
}
