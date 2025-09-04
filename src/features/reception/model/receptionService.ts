import type {User} from "../../user/model/userService.ts";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {JsonLdApiResponseInt} from "../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
import type {SingleValue} from "react-select";
import type {SelectOptionType, THeadItemType} from "../../../services/services.ts";
import {getUserFakeData} from "../../user/model/userService.ts";
import type {NavigateFunction} from "react-router-dom";
  
// INTERFACES OR TYPES
export interface Reception {
  '@id'?: string
  id: number
  nomComplet: string
  lieuNaissance?: string
  dateNaissance?: string
  sexe: string
  motif: string
  commentaire?: string
  fkUser?: User
  tel: string
  email?: string
  slug?: string
  createdAt?: string
  estCePatient: boolean
}

export interface SaveReception {
  id: number
  nomComplet: string
  lieuNaissance: string
  dateNaissance: string
  sexe: string
  motif: string
  commentaire: string
  tel: string
  email: string
  rdvAt: string
  estCePatient: boolean
  patient: SingleValue<SelectOptionType> | null
}

export interface ReceptionError {
  nomComplet: string | null
  lieuNaissance: string | null
  dateNaissance: string | null
  sexe: string | null
  motif: string | null
  commentaire: string | null
  tel: string | null
  email: string | null
  rdvAt: string | null
  estCePatient: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initReceptionState = (): SaveReception => ({
  id: 0,
  commentaire: '',
  tel: '',
  email: '',
  dateNaissance: '',
  motif: '',
  sexe: '',
  lieuNaissance: '',
  nomComplet: '',
  rdvAt: '',
  patient: null,
  estCePatient: false,
})

export const initReceptionErrorState = (): ReceptionError => ({
  nomComplet: null,
  lieuNaissance: null,
  dateNaissance: null,
  sexe: null,
  motif: null,
  commentaire: null,
  tel: null,
  email: null,
  rdvAt: null,
  estCePatient: null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getReceptionHeadItems = (): THeadItemType[] => [
  { th: 'Nom complet' },
  { th: 'Motif' },
  { th: 'N° Tél.' },
  { th: 'Date d\'enregistrement' },
]

export const getReceptionsFakeData = (): Reception[] => [
  {
    id: 1,
    nomComplet: 'akondjaka ndjoku roméo',
    tel: '0904651464',
    sexe: 'H',
    createdAt: new Date().toISOString(),
    email: 'akondjakaromeo@gmail.com',
    commentaire: '',
    dateNaissance: new Date('1991-03-05').toISOString(),
    fkUser: getUserFakeData()[0],
    motif: 'RDV',
    lieuNaissance: 'Kinshasa',
    slug: 'romeo',
    estCePatient: false,
  },
]

export const getReceiptReasonOptions = (): SelectOptionType[] => [
  { label: '-- Aucune option sélectionnée --', value: '' },
  { label: 'Entretien', value: 'ENTRETIEN' },
  { label: 'Rendez-vous', value: 'RENDEZ_VOUS' },
  { label: 'Consultation', value: 'CONSULTATION' },
  { label: 'Autre(s)', value: 'AUTRE' },
]

export async function onReceptionSubmit(
  state: SaveReception,
  setErrors: Dispatch<SetStateAction<ReceptionError>>,
  onSubmit: (data: SaveReception) => Promise<any>,
  onHide: () => void,
  navigate?: NavigateFunction
): Promise<void> {
  onHide()
  
  const { id } = state
  try {
    const { data, error}: JsonLdApiResponseInt<Reception> = await onSubmit(state)
    if (data) {
      toast.success(`${id > 0 ? 'Modification ' : 'Enregistrement '} bien effectué${'e'}`)
      if (navigate) navigate('/app/receptions')
    }
    
    if (error && error?.data) {
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}

export const setReceptionPatientName = (
  e: SingleValue<SelectOptionType>,
  setState: Dispatch<SetStateAction<SaveReception>>
): void => {
  setState(prev => {
    const patient: SingleValue<SelectOptionType> = e
    
    let nomComplet: string
    
    if (patient) nomComplet = patient.label
    else nomComplet = ''
    
    return {
      ...prev,
      patient,
      nomComplet,
    }
  })
}

export const setReceptionEstCePatient = (setState: Dispatch<SetStateAction<SaveReception>>): void => {
  setState(prev => {
    const estCePatient: boolean = !prev.estCePatient
    const patient: SingleValue<SelectOptionType> = !estCePatient ? null : prev.patient
    const nomComplet: string = !estCePatient ? '' : prev?.patient?.label ?? ''
    
    return {
      ...prev,
      patient,
      estCePatient,
      nomComplet,
    }
  })
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
