import type {SelectOptionType} from "../../../../services/services.ts";
import {useGetCategoriesExamsQuery} from "../model/categorieExam.api.slice.ts";
import {useCallback} from "react";
import type {CategorieExam} from "../model/categorieExamService.ts";

export default function useGetCatExamsOptions(): () => SelectOptionType[] {
  
  const { data, isSuccess } = useGetCategoriesExamsQuery('LIST')
  
  return useCallback((): SelectOptionType[] => {
    const options: SelectOptionType[] = []
    if (data && isSuccess) data.forEach((category: CategorieExam): void => {
      options.push({
        label: category.nom.toUpperCase(),
        value: category.nom.toUpperCase(),
        data: category['@id'],
      })
    })
    
    return options
  }, [data, isSuccess])
  
}
