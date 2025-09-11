import type {TypeDocSuivi} from "../../typeDocSuivi/model/typeDocSuiviService.ts";
import type {User} from "../../../user/model/userService.ts";
import type {Agent} from "../../../personnel/agent/model/agentService.ts";
import type {Hospitalisation} from "../../hospitalisation/model/hospitalisationService.ts";
import type {
  Consultation,
  SigneVital
} from "../../consultation/model/consultationService.ts";
import type {Prescription} from "../../prescription/model/prescriptionService.ts";
import type {Patient} from "../../../patients/patient/model/patientService.ts";
import type {SingleValue} from "react-select";
import type {SelectOptionType} from "../../../../services/services.ts";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
import type {Traitement} from "../../traitement/model/traitementService.ts";
import type {NavigateFunction} from "react-router-dom";

// INTERFACES OR TYPES
export interface SuiviTraitement {
  id: number
  prixHt?: number
  prixTtc?: number
  fkTraitement: Traitement
  fkDocSuivi: DocumentSuivi
  fkAgent: Agent
  fkUser?: User
  releasedAt?: string
  observation?: string
}

export interface SaveSuiviTraitement {
  fkDocSuivi: string | null
  releasedAt: string
  observation: string
  suivisItems: SelectOptionType[]
  id: number
}

export interface SuiviTraitementError {
  traitements: string | null,
  releasedAt: string | null,
  fkDocSuivi: string | null,
  observation: string | null,
}

export interface DocumentSuivi {
  '@id'?: string
  id: number
  motif: string
  dateDebut: string
  dateFin: string
  statut: string
  fkType?: TypeDocSuivi
  fkUser?: User
  fkAgent: Agent
  hospitalisation?: Hospitalisation
  fkConsultation?: Consultation
  prescriptions: Prescription[]
  suiviTraitements: SuiviTraitement[]
  fkPatient: Patient
  finished: boolean
  signesVitaux: SigneVital[]
  createdAt?: string
  updatedAt?: string
}

export interface SuiviItem { id: number }

export interface SaveDocumentSuivi {
  id: number
  motif: string
  dateDebut: string
  dateFin: string
  statut: string
  fkType: SingleValue<SelectOptionType> | null
  fkAgent: SingleValue<SelectOptionType> | null
  fkPatient: SingleValue<SelectOptionType> | null
  
  end: boolean
  dateSortie: string
  traitements: SelectOptionType[]
  suivisItems: SuiviItem[]
}

export interface DocumentSuiviError {
  motif: string | null
  dateDebut: string | null
  dateFin: string | null
  statut: string | null
  fkType: string | null
  fkAgent: string | null
  fkPatient: string | null
  finished: string | null
  
  end: string | null
  dateSortie: string | null
  suivisItems: string | null
  prescriptionsItems: string | null
  signes: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initDocumentSuiviState = (): SaveDocumentSuivi => ({
  id: 0,
  end: false,
  suivisItems: [],
  dateDebut: '',
  dateFin: '',
  dateSortie: '',
  fkAgent: null,
  fkPatient: null,
  fkType: null,
  motif: '',
  statut: 'EN_COURS',
  traitements: []
})

export const initDocumentSuiviErrorState = (): DocumentSuiviError => ({
  motif: null,
  dateDebut: null,
  dateFin: null,
  statut: null,
  fkType: null,
  fkAgent: null,
  fkPatient: null,
  finished: null,
  end: null,
  dateSortie: null,
  suivisItems: null,
  prescriptionsItems: null,
  signes: null,
})

export const initSuiviTraitementState = (): SaveSuiviTraitement => ({
  suivisItems: [],
  releasedAt: '',
  fkDocSuivi: null,
  observation: '',
  id: 0,
})

export const initSuiviTraitementErrorState = (): SuiviTraitementError => ({
  fkDocSuivi: null,
  traitements: null,
  observation: null,
  releasedAt: null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getDocStatusOptions = (): SelectOptionType[] => [
  { label: '-- --', value: '' },
  { label: 'EN COURS', value: 'EN_COURS' },
  { label: 'ANNULÉE', value: 'ANNULEE' },
]

export async function onDocumentSuiviSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveDocumentSuivi,
  setErrors: Dispatch<SetStateAction<DocumentSuiviError>>,
  onSubmit: (data: SaveDocumentSuivi) => Promise<any>,
  onRefresh?: () => void,
  navigate?: NavigateFunction,
): Promise<void> {
  
  e.preventDefault()
  const { id } = state
  try {
    const { data, error}: JsonLdApiResponseInt<DocumentSuivi> = await onSubmit(state)
    if (data) {
      toast.success(`${id > 0 ? 'Modification ' : 'Enregistrement '} bien effectué${'e'}`)
      if (onRefresh) onRefresh()
      if (navigate) navigate('/app/suivis')
    }
    
    if (error && error?.data) {
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}

export async function onSuiviTraitementSubmit(
  state: SaveSuiviTraitement,
  setState: React.Dispatch<React.SetStateAction<SaveSuiviTraitement>>,
  setErrors: React.Dispatch<React.SetStateAction<SuiviTraitementError>>,
  onSubmit: (data: SaveSuiviTraitement) => Promise<any>,
  onRefresh: () => void,
  onHide: () => void,
  docSuivi?: DocumentSuivi,
): Promise<void> {
  const fkDocSuivi: string | null = docSuivi ? `/api/document_suivis/${docSuivi.id}` : null
  const id: number = docSuivi ? docSuivi.id : 0
  
  setErrors(initSuiviTraitementErrorState())
  
  try {
    const { data, error }: JsonLdApiResponseInt<SuiviTraitement[]> = await onSubmit({ ...state, fkDocSuivi, id })
    
    if (error && error?.data) {
      if (error.data?.detail) toast.error(error.data.detail)
      
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void  => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
    
    if (data) {
      toast.success('Validation bien effectuée.')
      setState(initSuiviTraitementState())
      
      onRefresh()
      onHide()
    }
  } catch (e) { toast.error('Problème réseau.') }
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
