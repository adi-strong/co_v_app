import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {CategorieExam} from "../model/categorieExamService.ts";

export default function useSetCategoriesExamensItems(
  data: CategorieExam[],
  setCategories: Dispatch<SetStateAction<CategorieExam[]>>
): void {
  
  useEffect(() => {
    if (data && data.length > 0) {
      setCategories(data)
    }
  }, [data, setCategories]);
  
}
