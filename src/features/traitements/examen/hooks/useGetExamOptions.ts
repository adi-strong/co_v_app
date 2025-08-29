import {useCallback} from "react";
import type {Examen} from "../model/examenService.ts";
import {getExamenFakeData} from "../model/examenService.ts";
import type {MultiValue} from "react-select";
import type {SelectOptionType} from "../../../../services/services.ts";

export default function useGetExamOptions() {
  
  const exams: Examen[] = getExamenFakeData()
  
  return useCallback(() => {
    const options: MultiValue<SelectOptionType> = []
    if (exams.length > 0) exams.forEach(({ nom, id }): void => {
      options.push({
        label: nom.toUpperCase(),
        value: nom.toUpperCase(),
        id,
      })
    })
    
    return options
  }, [exams])
  
}
