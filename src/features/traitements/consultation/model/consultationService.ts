import type {User} from "../../../user/model/userService.ts";
import type {Patient} from "../../../patients/patient/model/patientService.ts";
import type {Agent} from "../../../personnel/agent/model/agentService.ts";
import type {TypeConsultation} from "../../typeConsultation/model/typeConsultationService.ts";
import type {Traitement} from "../../traitement/model/traitementService.ts";
import type {ExamenPrescrit, ProduitPrescrit} from "../../prescription/model/prescriptionService.ts";
import type {Hospitalisation} from "../../hospitalisation/model/hospitalisationService.ts";
import type {DocumentSuivi} from "../../documentSuivi/model/documentSuiviService.ts";
import type {MultiValue, SingleValue} from "react-select";
import type {SelectOptionType, THeadItemType} from "../../../../services/services.ts";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";

// INTERFACES OR TYPES
export interface SigneVital {
  '@id'?: string
  temperature?: number
  poids?: number
  tensionArterielle?: string
  frequenceCardiaque?: string
  frequenceRespiratoire?: string
  saturationEnOxygene?: string
  comment?: string
  releasedAt?: string
}

export interface PremierSoin {
  '@id'?: string
  id: number
  fkTraitement: Traitement
  prixHt: number
  prixTtc: number
  releasedAt?: string
}

export interface Consultation {
  '@id'?: string
  id: number
  motif: string
  diagnostic: string
  conclusion: string
  comment: string
  statut: string
  renseignementClinic: string
  dateDebut: string
  dateFin: string
  finished: boolean
  fkUser?: User
  fkPatient: Patient
  fkAgent: Agent
  fkType?: TypeConsultation
  premierSoins: PremierSoin[]
  prescriptions: ProduitPrescrit[]
  hospitalisation?: Hospitalisation
  documentSuivi?: DocumentSuivi
  autresActesMedicaux: []
  signesVitaux: SigneVital[]
  examPrescrits: ExamenPrescrit[]
  createdAt?: string
  updatedAt?: string
  slug?: string
}

export interface SoinItem { traitementID: number }
export interface ExamItem { id: number }

export interface SigneItem {
  temperature: number
  poids: number
  tensionArterielle: string
  frequenceCardiaque: string
  frequenceRespiratoire: string
  saturationEnOxygene: string
  comment: string
}

export interface PrescriptionItem {
  quantite: number
  produitID: number
  lotProduitID: number
}

export interface SaveConsultation {
  id: number
  diagnostic: string
  conclusion: string
  comment: string
  statut: string
  renseignementClinic: string
  dateDebut: string
  dateFin: string
  fkPatient: SingleValue<SelectOptionType> | null
  fkAgent: SingleValue<SelectOptionType> | null
  fkType: SingleValue<SelectOptionType> | null
  
  end: boolean
  
  isSoins: boolean
  soinsItems?: SoinItem | null
  
  isExam: boolean
  exams: MultiValue<SelectOptionType>
  examsItems: ExamItem[]
  
  isSign: boolean
  signes?: SigneItem | null
}

export interface ConsultationError {
  motif: string | null
  diagnostic: string | null
  conclusion: string | null
  comment: string | null
  statut: string | null
  renseignementClinic: string | null
  dateDebut: string | null
  dateFin: string | null
  finished: string | null
  fkPatient: string | null
  fkAgent: string | null
  fkType: string | null
  
  end: string | null
  soinsItems: string | null
  examsItems: string | null
  signes: string | null
  prescriptionsItems: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initConsultSignes = (): SigneItem => {
  return {
    frequenceCardiaque: '',
    saturationEnOxygene: '',
    temperature: 0,
    comment: '',
    tensionArterielle: '',
    frequenceRespiratoire: '',
    poids: 0,
  }
}

export const initConsultationState = (): SaveConsultation => ({
  id: 0,
  end: false,
  signes: null,
  fkType: null,
  fkAgent: null,
  comment: '',
  fkPatient: null,
  renseignementClinic: '',
  statut: 'EN_COURS',
  dateFin: '',
  soinsItems: null,
  dateDebut: '',
  diagnostic: '',
  examsItems: [],
  isSign: false,
  conclusion: '',
  exams: [],
  isSoins: false,
  isExam: false,
})

export const initConsultationErrorState = (): ConsultationError => ({
  motif: null,
  diagnostic: null,
  conclusion: null,
  comment: null,
  statut: null,
  renseignementClinic: null,
  dateDebut: null,
  dateFin: null,
  finished: null,
  fkPatient: null,
  fkAgent: null,
  fkType: null,
  
  end: null,
  soinsItems: null,
  examsItems: null,
  signes: null,
  prescriptionsItems: null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getConsultHeadItems = (): THeadItemType[] => [
  { th: 'Fiche' },
  { th: 'Statut' },
  { th: 'Date début' },
]

/**
 *
 * @param e
 * @param state
 * @param setErrors
 * @param onSubmit
 * @param onHide
 * @param onRefresh
 */
export async function onConsultSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveConsultation,
  setErrors: Dispatch<SetStateAction<ConsultationError>>,
  onSubmit: (data: SaveConsultation) => Promise<any>,
  onHide: () => void,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  const { id } = state
  try {
    const { data, error}: JsonLdApiResponseInt<Consultation> = await onSubmit(state)
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

export const onConsultIsSignChange = (setState: Dispatch<SetStateAction<SaveConsultation>>): void => {
  setState(consult => {
    const isSign: boolean = !consult.isSign
    const signes: SigneItem | null = isSign ? initConsultSignes() : null
    return {
      ...consult,
      isSign,
      signes,
    }
  })
}

export const onConsultIsExamsChange = (setState: Dispatch<SetStateAction<SaveConsultation>>): void => {
  setState(consult => {
    return {
      ...consult,
      exams: [],
      isExam: !consult.isExam,
      examsItems: [],
      renseignementClinic: '',
    }
  })
}

export const onConsultExamsChange = (
  exams: MultiValue<SelectOptionType>,
  setState: Dispatch<SetStateAction<SaveConsultation>>
): void => {
  setState(consult => {
    let examsItems: ExamItem[] = []
    if (exams && exams.length > 0) {
      exams.forEach(({ id }): void => {
        if (id) examsItems.push({ id })
      })
    }
    return {
      ...consult,
      exams,
      examsItems,
    }
  })
}

export const getConsultStatusOptions = (): SingleValue<SelectOptionType>[] => [
  { label: '-- Aucune option sélectionnée --', value: '' },
  { label: 'EN COURS', value: 'EN_COURS' },
  { label: 'ANNULÉE', value: 'ANNULEE' },
  { label: 'TERMINÉE', value: 'TERMINEE' },
]
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
