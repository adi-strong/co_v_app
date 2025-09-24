import type {User} from "../../../user/model/userService.ts";
import type {CompteCaisse} from "../../compteCaisse/model/compteCaisseService.ts";
import type {Dispatch, SetStateAction} from "react";
import toast from "react-hot-toast";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import {formatDecimalNumberWithSpaces} from "../../../../services/services.ts";

// INTERFACES OR TYPES
export interface DesignationBonEntree {
  '@id'?: string
  id: number
  libelle: string
  qte: number
  prixUnitaire: string
}

export interface DesignationBonEntreeItem {
  libelle: string
  qte: number
  prixUnitaire: number
}

export interface BonEntree {
  '@id'?: string
  id: number
  objet: string
  porteur?: string
  designationBonEntrees: DesignationBonEntree[]
  fkUser?: User
  fkCompte?: CompteCaisse
  devise: string
  taux?: string
  createdAt?: string
  slug?: string
}

export interface SaveBonEntree {
  id: number
  objet: string
  porteur: string
  designations: DesignationBonEntreeItem[]
  devise: string
  createdAt: string
}

export interface BonEntreeError {
  objet: string | null
  porteur: string | null
  designationBonEntrees: string | null
  devise: string | null
  createdAt: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initBonEntreeState = (): SaveBonEntree => ({
  id: 0,
  createdAt: '',
  designations: [],
  devise: '',
  objet: '',
  porteur: '',
})

export const initBonEntreeErrorState = (): BonEntreeError => ({
  objet: null,
  porteur: null,
  designationBonEntrees: null,
  devise: null,
  createdAt: null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const onBonEntreeSubmit = async (
  state: SaveBonEntree,
  setState: Dispatch<SetStateAction<SaveBonEntree>>,
  setErrors: Dispatch<SetStateAction<BonEntreeError>>,
  onSubmit: (data: SaveBonEntree) => Promise<any>,
  onRefresh: () => void,
  onHide?: () => void
): Promise<void> => {
  
  setErrors(initBonEntreeErrorState())
  
  const { id } = state
  
  try {
    const { data, error }: JsonLdApiResponseInt<BonEntree> = await onSubmit(state)
    
    if (data) {
      toast.success(id > 0 ? 'Modification bien effectuée' : 'Opération bien effectuée.')
      setState(initBonEntreeState())
      
      onRefresh()
      if (onHide) onHide()
    }
    
    if (error && error?.data) {
      if (error.data?.detail) toast.error(error.data.detail)
      
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
  } catch (e) { toast.error('Problèmes réseau.') }
  
}

export const getTotalBonEntree = (designations: DesignationBonEntree[]): number => {
  let sum = 0
  
  if (designations.length > 0) {
    for (const key in designations) {
      const designation = designations[key]
      const price = designation.prixUnitaire
      const qty = designation.qte
      sum += (price * qty)
    }
  }
  
  return sum
}

export const totalEntriesAmount = (designations: DesignationBonEntreeItem[]): string => {
  let sum = 0
  
  if (designations.length > 0) {
    designations.forEach(({ qte, prixUnitaire }): void => {
      const price = isNaN(prixUnitaire) || prixUnitaire < 0 ? 0 : prixUnitaire
      const quantity = isNaN(qte) || qte < 0 ? 0 : qte
      sum += price * quantity
    })
  }
  
  return formatDecimalNumberWithSpaces(sum)
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
