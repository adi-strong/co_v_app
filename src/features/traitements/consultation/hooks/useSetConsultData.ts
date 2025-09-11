import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {Consultation, ExamItem, SaveConsultation} from "../model/consultationService.ts";
import type {SelectOptionType} from "../../../../services/services.ts";
import type {ExamenPrescrit} from "../../prescription/model/prescriptionService.ts";

export default function useSetConsultData(
  data?: Consultation,
  setDepartment?: Dispatch<SetStateAction<SaveConsultation>>): void {
  
  useEffect((): void => {
    if (data && setDepartment) {
      const fkAgent: SelectOptionType | null = data?.fkAgent ? {
        label: data.fkAgent?.fullName?.toUpperCase() ?? data.fkAgent.nom.toUpperCase(),
        value: data.fkAgent?.fullName?.toUpperCase() ?? data.fkAgent.nom.toUpperCase(),
        data: data.fkAgent['@id'],
      } : null
      
      const fkPatient: SelectOptionType | null = data?.fkPatient ? {
        label: data.fkPatient?.fullName?.toUpperCase() ?? data.fkPatient.nom.toUpperCase(),
        value: data.fkPatient?.fullName?.toUpperCase() ?? data.fkPatient.nom.toUpperCase(),
        data: data.fkPatient['@id'],
      } : null
      
      const fkType: SelectOptionType | null = data?.fkType ? {
        label: data.fkType.nom.toUpperCase(),
        value: data.fkType.nom.toUpperCase(),
        data: data.fkType['@id'],
      } : null
      
      const exams: SelectOptionType[] = []
      const examsItems: ExamItem[] = []
      
      if (data.examPrescrits.length > 0) {
        for (const key in data.examPrescrits) {
          const examPrescrit: ExamenPrescrit = data.examPrescrits[key]
          exams.push({
            label: examPrescrit.fkExam.nom.toUpperCase(),
            value: examPrescrit.fkExam.nom.toUpperCase(),
            data: examPrescrit.fkExam['@id'],
            id: examPrescrit.fkExam.id,
          })
          
          examsItems.push({ id: examPrescrit.fkExam.id })
        }
      }
      
      setDepartment(prev => ({
        ...prev,
        id: data.id,
        statut: data.statut,
        fkPatient,
        fkAgent,
        fkType,
        renseignementClinic: data?.renseignementClinic ?? '',
        diagnostic: data?.diagnostic ?? '',
        conclusion: data?.conclusion ?? '',
        comment: data?.comment ?? '',
        dateDebut: data?.dateDebut ? data.dateDebut.substring(0, 10) : '',
        isExam: data.examPrescrits.length > 0,
        examsItems,
        exams,
      }))
    }
  }, [data, setDepartment])
  
}
