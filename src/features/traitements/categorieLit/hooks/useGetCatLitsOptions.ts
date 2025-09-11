import type {SelectOptionType} from "../../../../services/services.ts";
import {useGetCategoriesLitsQuery} from "../model/categorieLit.api.slice.ts";
import {useCallback} from "react";
import type {CategorieLit} from "../model/categorieLitService.ts";

export default function useGetCatLitsOptions(): () => SelectOptionType[] {
  
  const { data: categories = [], isSuccess } = useGetCategoriesLitsQuery('LIST')
  
  return useCallback((): SelectOptionType[] => {
    const options: SelectOptionType[] = []
    if (categories.length > 0 && isSuccess) categories.forEach((category: CategorieLit): void => {
      options.push({
        label: category.nom.toUpperCase(),
        value: category.nom.toUpperCase(),
        data: category['@id'],
        id: category.id,
      })
    })
    
    return options
  }, [categories, isSuccess])
  
}
