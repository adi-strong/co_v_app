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

// INTERFACES OR TYPES
export interface SuiviTraitement {
  id: number
  prixHt: number
  prixTtc: number
  fkTraitement: Traitement
  fkDocSuivi: DocumentSuivi
  fkAgent: Agent
  fkUser?: User
  releasedAt?: string
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
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getDocStatusOptions = (): SelectOptionType[] => [
  { label: '-- --', value: '' },
  { label: 'EN COURS', value: 'EN_COURS' },
  { label: 'TERMINÉE', value: 'TERMINEE' },
  { label: 'ANNULÉE', value: 'ANNULEE' },
]

export async function onDocumentSuiviSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveDocumentSuivi,
  setErrors: Dispatch<SetStateAction<DocumentSuiviError>>,
  onSubmit: (data: SaveDocumentSuivi) => Promise<any>,
  onHide: () => void,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  const { id } = state
  try {
    const { data, error}: JsonLdApiResponseInt<DocumentSuivi> = await onSubmit(state)
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
