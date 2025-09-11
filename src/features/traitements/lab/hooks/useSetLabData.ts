import type {Lab, LabExams, SaveLab} from "../model/labService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";

export default function useSetLabData(data?:Lab, setState?: Dispatch<SetStateAction<SaveLab>>): void {
  
  useEffect((): void => {
    if (data && setState) {
      const examsItems: LabExams[] = []
      
      if (data.examPrescrits.length > 0) {
        data.examPrescrits.forEach((exam): void => {
          examsItems.push({
            resultats: exam?.resultats ?? '',
            valeurNormale: exam?.valeurNormale ?? '',
            examID: exam.id,
            label: exam.fkExam.nom.toUpperCase()
          })
        })
      }
      
      setState({
        id: data.id,
        comment: data?.comment ?? '',
        conclusion: data?.conclusion ?? '',
        examsItems,
      })
    }
  }, [data, setState])
  
}
