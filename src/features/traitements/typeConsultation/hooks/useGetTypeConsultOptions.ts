import type {TypeConsultation} from "../model/typeConsultationService.ts";
import {useGetTypeConsultationsQuery} from "../model/typeConsultation.api.slice.ts";
import {useCallback} from "react";
import type {SelectOptionType} from "../../../../services/services.ts";

export default function useGetTypeConsultOptions(): () => SelectOptionType[] {
  
  const { data = [], isSuccess } = useGetTypeConsultationsQuery('LIST')
  
  return useCallback((): SelectOptionType[] => {
    const options: SelectOptionType[] = []
    if (data && isSuccess) data.forEach((type: TypeConsultation): void => {
      options.push({
        label: type.nom.toUpperCase(),
        value: type.nom.toUpperCase(),
        data: type['@id'],
      })
    })
    
    return options
  }, [data, isSuccess])
  
}
