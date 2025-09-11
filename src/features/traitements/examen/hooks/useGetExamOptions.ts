import {useCallback} from "react";
import type {Examen} from "../model/examenService.ts";
import type {MultiValue} from "react-select";
import type {SelectOptionType} from "../../../../services/services.ts";
import {useGetExamensQuery} from "../model/examen.api.slice.ts";

export default function useGetExamOptions() {
  
  const { data: exams = [], isSuccess } = useGetExamensQuery('LIST')
  
  return useCallback(() => {
    const options: MultiValue<SelectOptionType> = []
    if (isSuccess && exams.length > 0) exams.forEach((exam: Examen): void => {
      options.push({
        label: exam.nom.toUpperCase(),
        value: exam.nom.toUpperCase(),
        data: exam['@id'],
        id: exam.id,
      })
    })
    
    return options
  }, [exams , isSuccess])
  
}
