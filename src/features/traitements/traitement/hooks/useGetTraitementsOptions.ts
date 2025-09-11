import type {SelectOptionType} from "../../../../services/services.ts";
import {useCallback} from "react";
import type {CategorieLit} from "../../categorieLit/model/categorieLitService.ts";
import {useGetTraitementsQuery} from "../model/traitement.api.slice.ts";

export default function useGetTraitementsOptions(): () => SelectOptionType[] {
  
  const { data: traitements = [], isSuccess } = useGetTraitementsQuery('LIST')
  
  return useCallback((): SelectOptionType[] => {
    const options: SelectOptionType[] = []
    if (traitements.length > 0 && isSuccess) traitements.forEach((treatment: CategorieLit): void => {
      options.push({
        label: treatment.nom.toUpperCase(),
        value: treatment.nom.toUpperCase(),
        data: treatment['@id'],
        id: treatment.id,
      })
    })
    
    return options
  }, [traitements, isSuccess])
  
}
