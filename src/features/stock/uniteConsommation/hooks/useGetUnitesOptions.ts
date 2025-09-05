import {useGetFonctionsQuery} from "../../../personnel/fonction/model/fonction.api.slice.ts";
import {useCallback} from "react";
import type {SelectOptionType} from "../../../../services/services.ts";
import {useGetUniteConsommationsQuery} from "../model/uniteConsommation.api.slice.ts";

export default function useGetUnitesOptions() {
  
  const { data: unites = [], isSuccess } = useGetUniteConsommationsQuery('LIST')
  
  return useCallback(() => {
    const options: SelectOptionType[] = []
    if (isSuccess && unites.length > 0) unites.forEach(({ id, nom }): void => {
      options.push({
        label: nom.toUpperCase(),
        value: nom.toUpperCase(),
        data: `/api/unite_consommations/${id}`,
      })
    })
    
    return options
  }, [isSuccess, unites])
  
}
