import type {User} from "../../../user/model/userService.ts";
import type {CurrencyInt} from "../../../../interfaces/CurrencyInt.ts";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import toast from "react-hot-toast";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";

// INTERFACES
export interface CompteCaisse {
  '@id'?: string
  id: number
  first: CurrencyInt
  last: CurrencyInt
  solde: number
  nom: string
  taux: number
  fkUser?: User
  estCeParDefaut: boolean
  createdAt?: string
  updatedAt?: string
  selected: boolean
}

export interface SaveCompteCaisse {
  id: number,
  first: CurrencyInt
  last: CurrencyInt
  nom: string
  taux: number
  estCeParDefaut: boolean
}

export interface CompteCaisseError {
  first: string | null
  last: string | null
  nom: string | null
  taux: string | null
  estCeParDefaut: string | null
}
// END INTERFACES

/* ------------------------------------------- */

// INIT
export const initCompteCaisseState = (): SaveCompteCaisse => ({
  nom: '',
  id: 0,
  estCeParDefaut: false,
  first: {
    code: '',
    flag: '',
    image: '',
    label: '',
    symbol: '',
    value: '',
  },
  last: {
    code: '',
    flag: '',
    image: '',
    label: '',
    symbol: '',
    value: '',
  },
  taux: 0,
})

export const initCompteCaisseErrorState = (): CompteCaisseError => ({
  first:  null,
  last:  null,
  nom:  null,
  taux:  null,
  estCeParDefaut:  null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export async function onCompteCaisseSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveCompteCaisse,
  setErrors: Dispatch<SetStateAction<CompteCaisseError>>,
  onSubmit: (data: SaveCompteCaisse) => Promise<any>,
  onHide: () => void,
  onRefresh?: () => void,
): Promise<void> {
  
  e.preventDefault()
  const { id } = state
  setErrors(initCompteCaisseErrorState())
  
  try {
    const { data, error }: JsonLdApiResponseInt<CompteCaisse> = await onSubmit(state)
    
    if (error && error?.data) {
      const { violations } = error.data
      if (violations && violations.length > 0) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
    
    if (data) {
      toast.success(`Compte ${id > 0 ? 'mis à jour.' : 'bien enregistré.'}`)
      if (onRefresh) onRefresh()
      onHide()
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
