import {useGetFonctionsQuery} from "../model/fonction.api.slice.ts";
import {useCallback} from "react";
import type {SelectOptionType} from "../../../../services/services.ts";

export default function useGetFonctionsOptions() {
  
  const { data: functions = [], isSuccess } = useGetFonctionsQuery('LIST')
  
  return useCallback(() => {
    const options: SelectOptionType[] = []
    if (isSuccess && functions.length > 0) functions.forEach(({ id, nom }): void => {
      options.push({
        label: nom.toUpperCase(),
        value: nom.toUpperCase(),
        data: `/api/fonctions/${id}`,
      })
    })
    
    return options
  }, [isSuccess, functions])
  
}
