import type {ExamenPrescrit} from "../../prescription/model/prescriptionService.ts";
import type {Patient} from "../../../patients/patient/model/patientService.ts";
import type {Consultation} from "../../consultation/model/consultationService.ts";
import type {Dispatch, SetStateAction} from "react";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
import type {THeadItemType} from "../../../../services/services.ts";
import type {Agent} from "../../../personnel/agent/model/agentService.ts";
import type {CategorieExam} from "../../categorieExam/model/categorieExamService.ts";
import type {CategoryExamPayload, CategoryExamState} from "../../categorieExam/model/categorieExam.slice.ts";

// INTERFACES OR TYPES
export interface Lab {
  '@id'?: string
  id: number
  fkConsultation: Consultation
  examPrescrits: ExamenPrescrit[]
  finished: false
  conclusion?: string
  comment: string
  fkPatient: Patient
  releasedAt?: string
  fkAgent?: Agent
  nature?: string
}

export interface LabExams {
  resultats: string
  valeurNormale: string
  examID: number
  label: string
}

export interface SaveLab {
  id: number
  examsItems: LabExams[]
  conclusion: string
  comment: string
  nature: string
}

export interface LabError {
  examPrescrits: string | null
  conclusion: string | null
  comment: string | null
  nature: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initLabState = (): SaveLab => ({
  id: 0,
  comment: '',
  conclusion: '',
  examsItems: [],
  nature: '',
})

export const initLabErrorState = (): LabError => ({
  examPrescrits: null,
  conclusion: null,
  comment: null,
  nature: null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getLabHeadItems = (): THeadItemType[] => [
  { th: 'Fiche' },
  { th: 'Laborantin' },
  { th: 'Date' },
]

export async function onLabSubmit(
  state: SaveLab,
  setErrors: Dispatch<SetStateAction<LabError>>,
  onSubmit: (data: SaveLab) => Promise<any>,
  onHide: () => void,
  onRefresh?: () => void
): Promise<void> {
  
  setErrors(initLabErrorState())
  const { id } = state
  
  try {
    const { data, error}: JsonLdApiResponseInt<Lab> = await onSubmit(state)
    if (data) {
      toast.success(`${id > 0 ? 'Publication ' : 'Enregistrement '} bien effectué${'e'}`)
      if (onRefresh) onRefresh()
      onHide()
    }
    
    if (error && error?.data) {
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}

export const getLabExamsByCats = (exams: ExamenPrescrit[], setState: Dispatch<SetStateAction<CategoryExamPayload[]>>) => {
  
  return []
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
