import type {TypeDocSuivi} from "../../typeDocSuivi/model/typeDocSuiviService.ts";
import type {User} from "../../../user/model/userService.ts";
import type {Agent} from "../../../personnel/agent/model/agentService.ts";
import type {Hospitalisation} from "../../hospitalisation/model/hospitalisationService.ts";
import type {
  Consultation,
  PrescriptionItem,
  SigneVital
} from "../../consultation/model/consultationService.ts";
import type {Prescription} from "../../prescription/model/prescriptionService.ts";
import type {Patient} from "../../../patients/patient/model/patientService.ts";
import type {SuiviTraitement} from "../../suiviTraitement/model/suiviTraitementService.ts";
import type {SingleValue} from "react-select";
import type {SelectOptionType} from "../../../../services/services.ts";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
  
// INTERFACES OR TYPES
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

export interface SuiviItem { traitementID: number }

export interface SaveDocumentSuivi {
  id: number
  motif: string
  dateDebut: string
  dateFin: string
  statut: string
  fkType: SingleValue<SelectOptionType> | null
  fkAgent: SingleValue<SelectOptionType> | null
  fkPatient: SingleValue<SelectOptionType> | null
  finished: boolean
  
  end: boolean
  dateSortie: string
  suivisItems: SuiviItem[]
  prescriptionsItems: PrescriptionItem[]
  signes: SigneVital[]
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
  prescriptionsItems: [],
  suivisItems: [],
  dateDebut: '',
  dateFin: '',
  dateSortie: '',
  signes: [],
  finished: false,
  fkAgent: null,
  fkPatient: null,
  fkType: null,
  motif: '',
  statut: 'NONE',
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
