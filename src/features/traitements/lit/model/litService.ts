import type {CategorieLit} from "../../categorieLit/model/categorieLitService.ts";
import type {SingleValue} from "react-select";
import type {SelectOptionType, THeadItemType} from "../../../../services/services.ts";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
import {getCategorieLitFakeData} from "../../categorieLit/model/categorieLitService.ts";

// INTERFACES OR TYPES
export interface Lit {
  '@id'?: string
  id: number
  numero: string
  prix: number
  fkCategorie?: CategorieLit
  estCeOccuppe: boolean
  mode: string
  createdAt?: string
  updatedAt?: string
  slug?: string
  selected: boolean
}

export interface SaveLit {
  id: number
  numero: string
  prix: number
  fkCategorie: SingleValue<SelectOptionType> | null
  mode: string
}

export interface LitError {
  numero: string | null
  prix: string | null
  fkCategorie: string | null
  mode: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initLitState = (): SaveLit => ({
  id: 0,
  mode: 'NONE',
  prix: 0,
  fkCategorie: null,
  numero: '',
})

export const initLitErrorState = (): LitError => ({
  numero: null,
  prix: null,
  fkCategorie: null,
  mode: null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getLitsFakeData = (): Lit[] => [
  {
    id: 1,
    createdAt: new Date().toISOString(),
    fkCategorie: getCategorieLitFakeData()[0],
    slug: 'lit',
    mode: 'PAR_JOUR',
    prix: 10,
    numero: '001',
    estCeOccuppe: false,
    selected: false,
  },
]

export const getLitModeOptions = (): SelectOptionType[] => [
  { label: '-- Aucun mode sélectionné --', value: 'NONE' },
  { label: 'Par Jour', value: 'PAR_JOUR' },
  { label: 'Par Heure', value: 'PAR_HEURE' },
]

export const getLitHeadItems = (): THeadItemType[] => [
  { th: 'Mode' },
  { th: 'Prix' },
  { th: 'Date' },
]

export async function onLitSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveLit,
  setErrors: Dispatch<SetStateAction<LitError>>,
  onSubmit: (data: SaveLit) => Promise<any>,
  onHide: () => void,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  const { id } = state
  try {
    const { data, error}: JsonLdApiResponseInt<Lit> = await onSubmit(state)
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
