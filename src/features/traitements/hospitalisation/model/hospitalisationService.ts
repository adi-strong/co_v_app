import type {Lit} from "../../lit/model/litService.ts";
import type {SingleValue} from "react-select";
import type {SelectOptionType, THeadItemType} from "../../../../services/services.ts";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
import type {Consultation} from "../../consultation/model/consultationService.ts";

// INTERFACES OR TYPES
export interface Hospitalisation {
  '@id'?: string
  id: number
  motif: string
  modeEntree: string
  modeSortie?: string
  dateAdmission: string
  dateSortie: string
  statut: string
  fkLit: Lit
  prix: number
  mode: string
  taux: number
  nbreJours?: number
  nbreHeures?: number
  finished: boolean
  releasedAt?: string
  fkConsultation: Consultation
}

export interface SaveHospitalisation {
  id: number
  motif: string
  modeEntree: string
  modeSortie: string
  dateAdmission: string
  dateSortie: string
  statut: string
  fkLit: SingleValue<SelectOptionType> | null
  prix: number
  mode: string
  finished: boolean
}

export interface HospitalisationError {
  motif: string | null
  modeEntree: string | null
  modeSortie: string | null
  dateAdmission: string | null
  dateSortie: string | null
  statut: string | null
  fkLit: string | null
  prix: string | null
  mode: string | null
  finished: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initHospitalisationState = (): SaveHospitalisation => ({
  id: 0,
  prix: 0,
  finished: false,
  dateAdmission: '',
  dateSortie: '',
  fkLit: null,
  mode: 'NONE',
  modeEntree: 'NONE',
  modeSortie: 'NONE',
  motif: '',
  statut: 'NONE',
})

export const initHospitalisationErrorState = (): HospitalisationError => ({
  motif: null,
  modeEntree: null,
  modeSortie: null,
  dateAdmission: null,
  dateSortie: null,
  statut: null,
  fkLit: null,
  prix: null,
  mode: null,
  finished: null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getHospHeadItems = (): THeadItemType[] => [
  { th: 'Mode d\'entrée' },
  { th: 'Statut' },
  { th: 'Date d\'enregistrement' },
]

export async function onHospitalisationSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveHospitalisation,
  setErrors: Dispatch<SetStateAction<HospitalisationError>>,
  onSubmit: (data: SaveHospitalisation) => Promise<any>,
  onHide: () => void,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  const { id } = state
  try {
    const { data, error}: JsonLdApiResponseInt<Hospitalisation> = await onSubmit(state)
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
