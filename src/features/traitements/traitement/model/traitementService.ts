import type {Dispatch, FormEvent, SetStateAction} from "react";
import toast from "react-hot-toast";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import type {NavigateFunction} from "react-router-dom";

// INTERFACES OR TYPES
export interface Traitement {
  '@id'?: string
  id: number
  nom: string
  prixHt: number
  prixTtc: number
  createdAt?: string
  updatedAt?: string
  slug?: string
  selected: boolean
}

export interface SaveTraitement {
  id: number
  nom: string
  prixHt: number
  prixTtc: number
}

export interface TraitementError {
  nom: string | null
  prixHt: string | null
  prixTtc: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initTraitementState = (): SaveTraitement => ({
  id: 0,
  nom: '',
  prixTtc: 0,
  prixHt: 0,
})

export const initTraitementErrorState = (): TraitementError => ({
  nom: null,
  prixHt: null,
  prixTtc: null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getTraitementFakeData = (): Traitement[] => [
  {
    id: 1,
    nom: 'Malaria',
    slug: 'malaria',
    createdAt: new Date().toISOString(),
    prixHt: 0,
    prixTtc: 0,
    selected: false,
  },
  {
    id: 2,
    nom: 'Typhoïde',
    slug: 'typhoide',
    createdAt: new Date().toISOString(),
    prixHt: 0,
    prixTtc: 0,
    selected: false,
  },
]

export async function onTraitementSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveTraitement,
  setState: Dispatch<SetStateAction<SaveTraitement>>,
  setErrors: Dispatch<SetStateAction<TraitementError>>,
  onSubmit: (data: SaveTraitement) => Promise<any>,
  onRefresh?: () => void,
  onHide?: () => void
): Promise<void> {
  
  e.preventDefault()
  setErrors(initTraitementErrorState())
  
  const { id } = state
  
  try {
    const { data, error}: JsonLdApiResponseInt<Traitement> = await onSubmit(state)
    if (data) {
      toast.success(`${id > 0 ? 'Modification ' : 'Enregistrement '} bien effectué${'e'}`)
      setState(initTraitementState())
      
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

export async function onDeleteTraitementSubmit(
  state: Traitement,
  onSubmit: (data: Traitement) => Promise<void>,
  onRefresh: () => void,
  onHide: () => void,
  navigate?: NavigateFunction
): Promise<void> {
  onHide()
  
  const { error }: JsonLdApiResponseInt<Traitement> = await onSubmit(state)
  if (error && error.data && error.data?.detail) toast.error(error.data.detail)
  else {
    toast.success('Suppression bien effectuée.')
    onRefresh()
    if (navigate) navigate('/app/traitements')
  }
  
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
