import {useSelector} from "react-redux";
import type {CategoryExamState} from "../../features/traitements/categorieExam/model/categorieExam.slice.ts";
import {RefObject, useEffect, useRef} from "react";
import {
  useLazyGetCategoriesExamsQuery
} from "../../features/traitements/categorieExam/model/categorieExam.api.slice.ts";
import type {CategorieExam} from "../../features/traitements/categorieExam/model/categorieExamService.ts";
import {setCategoriesExams} from "../../features/traitements/categorieExam/model/categorieExam.slice.ts";

export default function useGetCategoriesExams(dispatch: (params?: any) => void): void {
  
  const { categoriesExams } = useSelector((state: CategoryExamState) => state.categoriesExams)
  
  const [getCategoriesExams] = useLazyGetCategoriesExamsQuery()
  
  const hasFetchedCategories: RefObject<boolean> = useRef(false)
  
  useEffect((): void => {
    const fetchCategories = async (): Promise<void> => {
      if (!hasFetchedCategories?.current && categoriesExams.length < 1) {
        hasFetchedCategories.current = true
        
        try {
          const categoriesSession: CategorieExam[] = await getCategoriesExams('LIST').unwrap()
          const categories = categoriesSession.length > 0
            ? categoriesSession.map(c => ({
            id: c.id,
            nom: c.nom,
            exams: c.exams,
            selected: c.selected,
          }))
            : []
          
          dispatch(setCategoriesExams({
            categoriesExams: categories
          }))
        } catch (e) { }
      }
    }
    
    fetchCategories()
  }, [dispatch])
  
}
