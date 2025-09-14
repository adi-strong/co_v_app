import type {Lit} from "../../lit/model/litService.ts";
import type {SingleValue} from "react-select";
import type {SelectOptionType, THeadItemType} from "../../../../services/services.ts";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
import type {Consultation} from "../../consultation/model/consultationService.ts";
import type {NavigateFunction} from "react-router-dom";
import type {Patient} from "../../../patients/patient/model/patientService.ts";

// INTERFACES OR TYPES
export interface Hospitalisation {
  '@id'?: string
  id: number
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
  fkPatient?: Patient
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
  finished: boolean
  fkConsultation: string
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

export type HospModeEntryKeys = 'URGENT' | 'TRAITEMENT' | 'SUIVI'
export const hospEntryLabel: Record<HospModeEntryKeys, string> = {
  SUIVI: 'SUIVI',
  TRAITEMENT: 'TRAITEMENT',
  URGENT: 'URGENCE',
}
export const hospEntryColor: Record<HospModeEntryKeys, string> = {
  SUIVI: 'success',
  TRAITEMENT: 'primary',
  URGENT: 'danger',
}

export type HospModeLeaveKeys = 'URGENCE' | 'TRANSFERT' | 'FIN_SUIVI'
export const hospLeaveLabel: Record<HospModeLeaveKeys, string> = {
  FIN_SUIVI: 'CLÔTURE',
  TRANSFERT: 'TRANSFERT',
  URGENCE: 'URGENCE',
}
export const hospLeaveColor: Record<HospModeLeaveKeys, string> = {
  FIN_SUIVI: 'success',
  TRANSFERT: 'primary',
  URGENCE: 'dark',
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initHospitalisationState = (): SaveHospitalisation => ({
  id: 0,
  finished: false,
  dateAdmission: '',
  dateSortie: '',
  fkLit: null,
  modeEntree: '',
  modeSortie: '',
  motif: '',
  statut: '',
  fkConsultation: '',
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

export type ModeSortieKeys = 'URGENCE' | 'TRANSFERT' | 'FIN_SUIVI'

export const modeSortieLabel: Record<ModeSortieKeys, string> = {
  FIN_SUIVI: 'FIN DE SUIVI',
  URGENCE: 'URGENCE',
  TRANSFERT: 'TRANSFERT',
}

export const modeSortieColor: Record<ModeSortieKeys, string> = {
  FIN_SUIVI: 'danger',
  URGENCE: 'warning',
  TRANSFERT: 'primary',
}
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getHospHeadItems = (): THeadItemType[] => [
  { th: 'Lit' },
  { th: 'Entrée' },
  { th: 'Sortie' },
  { th: 'Statut' },
  { th: 'Date' },
]

export const getHospEntryModeOptions = (): SelectOptionType[] => [
  { label: '-- Aucun mode sélectionné --', value: '' },
  { label: 'Suivi', value: 'SUIVI' },
  { label: 'Traitement', value: 'TRAITEMENT' },
  { label: 'Urgence', value: 'URGENT' },
]

export const getHospLeaveModeOptions = (): SelectOptionType[] => [
  { label: '-- Aucun mode sélectionné --', value: '' },
  { label: 'Fin de suivi', value: 'FIN_SUIVI' },
  { label: 'Transfert', value: 'TRANSFERT' },
  { label: 'Urgence', value: 'URGENCE' },
]

export async function onHospitalisationSubmit(
  state: SaveHospitalisation,
  setErrors: Dispatch<SetStateAction<HospitalisationError>>,
  onSubmit: (data: SaveHospitalisation) => Promise<any>,
  onHide: () => void,
  consult: Consultation,
  onRefresh?: () => void,
): Promise<void> {
  setErrors(initHospitalisationErrorState())
  const { id } = state
  
  const fkConsultation = `/api/consultations/${consult.id}`
  
  try {
    const { data, error}: JsonLdApiResponseInt<Hospitalisation> = await onSubmit({ ...state, fkConsultation })
    if (data) {
      toast.success(`${id > 0 ? 'Opération ' : 'Enregistrement '} bien effectué${'e'}`)
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

export async function onDeleteHospSubmit(
  state: Hospitalisation,
  onSubmit: (data: Hospitalisation) => Promise<void>,
  onRefresh: () => void,
  onHide: () => void,
  navigate?: NavigateFunction
): Promise<void> {
  onHide()
  
  const { error }: JsonLdApiResponseInt<void> = await onSubmit(state)
  if (error && error.data && error.data?.detail) toast.error(error.data.detail)
  else {
    toast.success('Suppression bien effectuée.')
    onRefresh()
    if (navigate) navigate('/app/hospitalisations')
  }
  
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
