import {useGetStructuresQuery} from "../model/structure.api.slice.ts";
import {useCallback} from "react";
import type {SelectOptionType} from "../../../../services/services.ts";

export default function useGetStructuresOptions() {
  
  const { data: structures = [] , isSuccess } = useGetStructuresQuery('LIST')
  
  return useCallback(() => {
    const options: SelectOptionType[] = []
    if (structures.length > 0) structures.forEach(({ id, nom }): void => {
      options.push({
        label: nom.toUpperCase(),
        value: nom.toUpperCase(),
        data: `/api/structures/${id}`,
      })
    })
    
    return options
  }, [isSuccess, structures])
  
}
