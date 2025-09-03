import type {User} from "../../../user/model/userService.ts";
import type {CurrencyInt} from "../../../../interfaces/CurrencyInt.ts";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import toast from "react-hot-toast";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import {getUserFakeData} from "../../../user/model/userService.ts";
import type {THeadItemType} from "../../../../services/services.ts";

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
  slug?: string
  selected: boolean
}

export interface SaveCompteCaisse {
  id: number,
  first: string
  last: string
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
  first: 'CDF',
  last: 'USD',
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
export const getComptesCaissesFakeData = (): CompteCaisse[] => [
  {
    id: 1,
    nom: 'Box par défaut',
    createdAt: new Date().toISOString(),
    first: {
      code: 'CDF',
      value: 'DR Congo (CDF)',
      symbol: 'FC',
      label: 'DR Congo (CDF)',
      image: 'https://flagcdn.com/cd.svg',
      flag: 'https://flagcdn.com/cd.svg',
    },
    last: {
      code: 'USD',
      value: 'United States (USD)',
      symbol: '$',
      label: 'United States (USD)',
      image: 'https://flagcdn.com/us.svg',
      flag: 'https://flagcdn.com/us.svg',
    },
    taux: 2850,
    selected: false,
    fkUser: getUserFakeData()[0],
    solde: 28900,
    estCeParDefaut: true,
  },
]

export const getCompteHeadItems = (): THeadItemType[] => [
  { th: '1ère devise' },
  { th: '2ème devise' },
  { th: 'Taux' },
  { th: 'Solde' },
]

export async function onCompteCaisseSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveCompteCaisse,
  setErrors: Dispatch<SetStateAction<CompteCaisseError>>,
  onSubmit: (data: SaveCompteCaisse) => Promise<any>,
  onRefresh?: () => void,
  onHide?: () => void,
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
      if (onHide) onHide()
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
