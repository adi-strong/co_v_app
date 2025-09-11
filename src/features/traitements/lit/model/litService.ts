import type {CategorieLit} from "../../categorieLit/model/categorieLitService.ts";
import type {SingleValue} from "react-select";
import type {SelectOptionType, THeadItemType} from "../../../../services/services.ts";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
import {getCategorieLitFakeData} from "../../categorieLit/model/categorieLitService.ts";
import type {NavigateFunction} from "react-router-dom";

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

export type LitStatusKey = 'busy' | 'free'

export const litStatusLabel: Record<LitStatusKey, string> = {
  busy: 'Occupé',
  free: 'Disponible'
}

export const litStatusColor: Record<LitStatusKey, string> = {
  busy: 'danger',
  free: 'success'
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
  { th: 'Statut' },
]

export async function onLitSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveLit,
  setState: Dispatch<SetStateAction<SaveLit>>,
  setErrors: Dispatch<SetStateAction<LitError>>,
  onSubmit: (data: SaveLit) => Promise<any>,
  onRefresh?: () => void,
  onHide?: () => void,
): Promise<void> {
  
  e.preventDefault()
  const { id } = state
  try {
    const { data, error}: JsonLdApiResponseInt<Lit> = await onSubmit(state)
    if (data) {
      toast.success(`${id > 0 ? 'Modification ' : 'Enregistrement '} bien effectué${'e'}`)
      setState(initLitState())
      
      if (onRefresh) onRefresh()
      if (onHide) onHide()
    }
    
    if (error && error?.data) {
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}

export async function onDeleteLitSubmit(
  state: Lit,
  onSubmit: (data: Lit) => Promise<void>,
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
    if (navigate) navigate('/app/lits')
  }
  
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
