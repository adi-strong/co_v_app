import type {Dispatch, FormEvent, SetStateAction} from "react";
import toast from "react-hot-toast";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";

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
  state: Traitement,
  setErrors: Dispatch<SetStateAction<TraitementError>>,
  onSubmit: (data: Traitement) => Promise<any>,
  onHide: () => void,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  const { id } = state
  try {
    const { data, error}: JsonLdApiResponseInt<Traitement> = await onSubmit(state)
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
