import type {Produit} from "../../../stock/produit/model/produitService.ts";
import type {Agent} from "../../../personnel/agent/model/agentService.ts";
import type {Examen} from "../../examen/model/examenService.ts";
import type {User} from "../../../user/model/userService.ts";
import type {Patient} from "../../../patients/patient/model/patientService.ts";
import type {Consultation} from "../../consultation/model/consultationService.ts";
import type {SelectOptionType, THeadItemType} from "../../../../services/services.ts";
import type {SingleValue} from "react-select";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
import type {NavigateFunction} from "react-router-dom";

// INTERFACES OR TYPES
export interface ExamenPrescrit {
  '@id'?: string
  id: number
  fkExam: Examen
  prixHt: number
  prixTtc: number
  resultats?: string
  valeurNormale?: string
}

export interface ProduitPrescrit {
  '@id'?: string
  id: number
  fkProduit: Produit
  quantite: number
  dosage: string
  comment?: string
}

export interface ProduitPrescritItem {
  id: number
  fkProduit: SingleValue<SelectOptionType> | null
  quantite: number
  dosage: string
  comment: string
}

export interface AutreProduit {
  product: string
  quantite: string
  dosage: string
  comment: string
}

export interface Prescription {
  '@id'?: string
  id: number
  fkAgent: Agent
  fkPatient: Patient
  fkUser?: User
  fkConsultation?: Consultation
  produitPrescrits: ProduitPrescrit[]
  releasedAt?: string
  updatedAt?: string
  autresProduits: AutreProduit[]
  selected: boolean
}

export interface SavePrescription {
  fkConsultation: string | null
  autresProduits: AutreProduit[]
  produitItems: ProduitPrescritItem[]
  comment: string
}

export interface PrescriptionError {
  fkConsultation: string | null
  autresProduits: string | null
  produitItems: string | null
  comment: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const getPrescHeadItems = (): THeadItemType[] => [
  { th: 'Effectué par' },
  { th: 'Date' },
]

export const initProduitPrescritItem = (): ProduitPrescritItem => ({
  comment: '',
  dosage: '',
  id: 0,
  fkProduit: null,
  quantite: 0,
})

export const initPrescriptionState = (): SavePrescription => ({
  produitItems: [],
  autresProduits: [],
  fkConsultation: null,
  comment: '',
})

export const initPrescriptionErrorState = (): PrescriptionError => ({
  fkConsultation: null,
  autresProduits: null,
  produitItems: null,
  comment: null,
})

export const initAutrePrescriptProduit = (): AutreProduit => ({
  comment: '',
  dosage: '',
  product: '',
  quantite: '',
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const onPrescirpCartSubmit = (
  e: FormEvent<HTMLFormElement>,
  setState: Dispatch<SetStateAction<SavePrescription>>,
  setCart: Dispatch<SetStateAction<ProduitPrescritItem>>,
  setOtherCart: Dispatch<SetStateAction<AutreProduit>>,
  produit?: ProduitPrescritItem,
  autreProduit?: AutreProduit
): void => {
  e.preventDefault()
  setState(state => {
    let produitItems = [...state.produitItems]
    let autresProduits = [...state.autresProduits]
    
    if (produitItems.length < 1 && produit) {
      produitItems.push({...produit, id: produit?.fkProduit && produit.fkProduit?.id ? produit.fkProduit.id : 0})
      setCart(initProduitPrescritItem())
    }
    else {
      if (produit) {
        const findProduct = produitItems.find(
          p => p.id === produit?.fkProduit?.id
        )
        if (!findProduct) {
          produitItems.push({...produit, id: produit?.fkProduit && produit.fkProduit?.id ? produit.fkProduit.id : 0})
          setCart(initProduitPrescritItem())
        }
        else alert('Ce produit a déjà été ajouté.')
      }
    }
    
    if (autreProduit) {
      autresProduits.push(autreProduit)
      setOtherCart(initAutrePrescriptProduit())
    }
    
    return {
      ...state,
      produitItems,
      autresProduits,
    }
  })
}

export const onRemovePrescriptProductItem = (index: number, setState: Dispatch<SetStateAction<SavePrescription>>): void => {
  setState(state => {
    const produitItems = state.produitItems
    produitItems.splice(index, 1)
    
    return {
      ...state,
      produitItems,
    }
  })
}

export const onRemoveAutrePrescriptProduct = (index: number, setState: Dispatch<SetStateAction<SavePrescription>>): void => {
  setState(state => {
    const autresProduits = state.autresProduits
    autresProduits.splice(index, 1)
    
    return {
      ...state,
      autresProduits,
    }
  })
}


export const onPrescriptionSubmit = async (
  state: SavePrescription,
  setState: Dispatch<SetStateAction<SavePrescription>>,
  setErrors: Dispatch<SetStateAction<PrescriptionError>>,
  onSubmit: (data: SavePrescription) => Promise<any>,
  onRefresh :() => void,
  onHide: () => void,
  consult?: Consultation
): Promise<void> => {
  const fkConsultation = consult ? `/api/consultations/${consult.id}` : null
  setErrors(initPrescriptionErrorState())
  
  try {
    const { data, error }: JsonLdApiResponseInt<Prescription> = await onSubmit({ ...state, fkConsultation })
    
    if (error && error?.data) {
      if (error.data?.detail) toast.error(error.data.detail)
      
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
    
    if (data) {
      toast.success('Validation bien effectuée.')
      setState(initPrescriptionState())
      
      onRefresh()
      onHide()
    }
  } catch (e) { toast.error('Problème réseau.') }
}

export async function onDeletePrescriptionSubmit(
  state: Prescription,
  onSubmit: (data: Prescription) => Promise<void>,
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
    if (navigate) navigate('/app/prescriptions')
  }
  
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
