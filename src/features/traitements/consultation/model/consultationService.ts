import type {User} from "../../../user/model/userService.ts";
import type {Patient} from "../../../patients/patient/model/patientService.ts";
import type {Agent} from "../../../personnel/agent/model/agentService.ts";
import type {TypeConsultation} from "../../typeConsultation/model/typeConsultationService.ts";
import type {Traitement} from "../../traitement/model/traitementService.ts";
import type {ExamenPrescrit, ProduitPrescrit} from "../../prescription/model/prescriptionService.ts";
import type {Hospitalisation} from "../../hospitalisation/model/hospitalisationService.ts";
import type {DocumentSuivi} from "../../documentSuivi/model/documentSuiviService.ts";
import type {MultiValue, SingleValue} from "react-select";
import type {SelectOptionType, TabInt, THeadItemType} from "../../../../services/services.ts";
import type {Dispatch, SetStateAction} from "react";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
import type {NavigateFunction} from "react-router-dom";
import type {ViolationInt} from "../../../../interfaces/ViolationInt.ts";

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

export interface SaveSigneVital {
  temperature: number
  poids: number
  tensionArterielle: string
  frequenceCardiaque: string
  frequenceRespiratoire: string
  saturationEnOxygene: string
  comment: string
  releasedAt: string
  fkDocSuivi: string | null
  fkConsultation: string | null
}

export interface SigneVitalError {
  temperature: string | null
  poids: string | null
  tensionArterielle: string | null
  frequenceCardiaque: string | null
  frequenceRespiratoire: string | null
  saturationEnOxygene: string | null
  comment: string | null
  releasedAt: string | null
  fkDocSuivi: string | null
  fkConsultation: string | null
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
  conclusion?: string
  comment?: string
  statut: string
  renseignementClinic?: string
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

export type ConsultStatusKey = 'EN_COURS' | 'ANNULEE' | 'TERMINEE'

export const consultStatusLabel: Record<ConsultStatusKey, string> = {
  ANNULEE: 'Annulée',
  EN_COURS: 'En cours',
  TERMINEE: 'Terminée',
}

export const consultStatusColor: Record<ConsultStatusKey, string> = {
  ANNULEE: 'danger',
  EN_COURS: 'warning',
  TERMINEE: 'success',
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

export const initSigneVitalState = (): SaveSigneVital => ({
  comment: '',
  poids: 0,
  fkConsultation: null,
  fkDocSuivi: null,
  frequenceCardiaque: '',
  frequenceRespiratoire: '',
  releasedAt: '',
  saturationEnOxygene: '',
  temperature: 0,
  tensionArterielle: '',
})

export const initSigneVitalErrorState = (): SigneVitalError => ({
  temperature: null,
  poids: null,
  tensionArterielle: null,
  frequenceCardiaque: null,
  frequenceRespiratoire: null,
  saturationEnOxygene: null,
  comment: null,
  releasedAt: null,
  fkDocSuivi: null,
  fkConsultation: null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getConsultHeadItems = (): THeadItemType[] => [
  { th: 'Fiche' },
  { th: 'Statut' },
  { th: 'Admission' },
]

export const getUniqueConsultHeadItems = (): TabInt[] => [
  { title: 'Anamnèse', event: 'anamnesis' },
  { title: 'Fiche', event: 'file' },
  { title: 'Traitements', event: 'treatments' },
]

/**
 *
 * @param state
 * @param setErrors
 * @param onSubmit
 * @param onHide
 * @param navigate
 * @param onRefresh
 */
export async function onConsultSubmit(
  state: SaveConsultation,
  setErrors: Dispatch<SetStateAction<ConsultationError>>,
  onSubmit: (data: SaveConsultation) => Promise<any>,
  navigate: NavigateFunction,
  onHide: () => void,
  onRefresh?: () => void
): Promise<void> {
  onHide()
  const { id } = state
  
  try {
    const { data, error}: JsonLdApiResponseInt<Consultation> = await onSubmit(state)
    if (data) {
      toast.success(`${id > 0 ? 'Modification ' : 'Enregistrement '} bien effectué${'e'}`)
      if (onRefresh) onRefresh()
      if (onHide) onHide()
      navigate(`/app/consultations/${data.id}`)
    }
    
    if (error && error?.data) {
      if (error.data?.detail) toast.error(error.data.detail)
      
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

export const getConsultStatusOptions = (): SelectOptionType[] => [
  { label: '-- Aucune option sélectionnée --', value: '' },
  { label: 'EN COURS', value: 'EN_COURS' },
  { label: 'ANNULÉE', value: 'ANNULEE' },
]

export const onConsultEndChange = (setState: Dispatch<SetStateAction<SaveConsultation>>): void => {
  setState(consult => {
    return {
      ...consult,
      dateFin: '',
      end: !consult.end,
    }
  })
}

export const onConsultSignChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  state: SaveConsultation,
  setState: Dispatch<SetStateAction<SaveConsultation>>,
): void => {
  let value: any;
  const target = e.target;
  
  switch (target.type) {
    case 'number':
      const numValue = Number(target.value);
      value = isNaN(numValue) || numValue < 0 ? 0 : numValue;
      break;
    case 'file':
      if (target instanceof HTMLInputElement && target.files) {
        value = target.files.length > 0 ? target.files[0] : null;
      }
      break;
    case 'checkbox' || 'radio' || 'switch':
      if (target instanceof HTMLInputElement && target.checked) {
        value = target.checked
      } else value = false
      break
    default:
      value = target.value;
      break;
  }
  
  const signes = {
    ...state.signes,
    [target.name]: value
  }
  
  setState(consult => ({
    ...consult,
    signes
  } as SaveConsultation))
}

export const onConsultSigneVitalSubmit = async (
  state: SaveSigneVital,
  setState: Dispatch<SetStateAction<SaveSigneVital>>,
  setErrors: Dispatch<SetStateAction<SigneVitalError>>,
  onSubmit: (data: SaveSigneVital) => Promise<any>,
  onRefresh: () => void,
  onHide: () => void,
  consult?: Consultation,
  suiviDoc?: DocumentSuivi
): Promise<void> => {
  setErrors(initSigneVitalErrorState())
  let fkDocSuivi = null
  let fkConsultation = null
  
  if (consult) {
    fkConsultation = consult ? consult['@id'] : null
    fkDocSuivi = consult?.documentSuivi ? consult.documentSuivi['@id'] : null
  }
  
  if (suiviDoc) {
    fkDocSuivi = suiviDoc ? suiviDoc['@id'] : null
    fkConsultation = suiviDoc?.fkConsultation ? suiviDoc.fkConsultation['@id'] : null
  }
  
  try {
    const { data, error }: JsonLdApiResponseInt<SigneVital> = await onSubmit({
      ...state,
      fkDocSuivi,
      fkConsultation
    } as SaveSigneVital)
    
    if (data) {
      toast.success('Validation bien effectuée.')
      onRefresh()
      onHide()
      setState(initSigneVitalState())
    }
    
    if (error && error?.data) {
      if (error.data?.detail) toast.error(error.data.detail)
      
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }: ViolationInt): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
  } catch (e) { toast.error('Problème réseau.') }
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
