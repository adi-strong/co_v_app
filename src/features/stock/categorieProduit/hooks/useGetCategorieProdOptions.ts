import {useCallback} from "react";
import type {MultiValue} from "react-select";
import type {SelectOptionType} from "../../../../services/services.ts";
import {useGetCategorieProduitsQuery} from "../model/categorieProduit.api.slice.ts";
import type {CategorieProduit} from "../model/categorieProduitService.ts";

export default function useGetCategorieProdOptions() {
  
  const { data: categories = [], isSuccess } = useGetCategorieProduitsQuery('LIST')
  
  return useCallback(() => {
    
    const options: MultiValue<SelectOptionType> = []
    
    if (isSuccess && categories.length > 0) {
      categories.forEach((c: CategorieProduit): void => {
        options.push({
          label: c.nom.toUpperCase(),
          value: c.nom.toUpperCase(),
          data: c['@id'],
        })
      })
    }
    
    return options
    
  }, [categories, isSuccess])
  
}
