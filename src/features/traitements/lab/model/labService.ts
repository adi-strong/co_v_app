import type {ExamenPrescrit} from "../../prescription/model/prescriptionService.ts";
import type {Patient} from "../../../patients/patient/model/patientService.ts";
import type {Consultation} from "../../consultation/model/consultationService.ts";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
import type {THeadItemType} from "../../../../services/services.ts";
  
// INTERFACES OR TYPES
export interface Lab {
  '@id'?: string
  id: number
  fkConsultation: Consultation
  examPrescrits: ExamenPrescrit[]
  finished: false
  conclusion: string
  comment: string
  fkPatient: Patient
  releasedAt?: string
}

export interface SaveLab {
  id: number
  examsItems: ExamenPrescrit[]
  conclusion: string
  comment: string
}

export interface LabError {
  examPrescrits: string | null
  conclusion: string | null
  comment: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initLabState = (): SaveLab => ({
  id: 0,
  comment: '',
  conclusion: '',
  examsItems: [],
})

export const initLabErrorState = (): LabError => ({
  examPrescrits: null,
  conclusion: null,
  comment: null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getLabHeadItems = (): THeadItemType[] => [
  { th: 'Fiche' },
  { th: 'Médecin' },
  { th: 'Date' },
]

export async function onLabSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveLab,
  setErrors: Dispatch<SetStateAction<LabError>>,
  onSubmit: (data: SaveLab) => Promise<any>,
  onHide: () => void,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  const { id } = state
  try {
    const { data, error}: JsonLdApiResponseInt<Lab> = await onSubmit(state)
    if (data) {
      toast.success(`${id > 0 ? 'Modification ' : 'Enregistrement '} bien effectué${'e'}`)
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
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
