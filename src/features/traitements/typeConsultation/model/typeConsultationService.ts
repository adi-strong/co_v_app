import type {Dispatch, FormEvent, SetStateAction} from "react";
import toast from "react-hot-toast";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import type {NavigateFunction} from "react-router-dom";

// INTERFACES OR TYPES
export interface TypeConsultation {
  '@id'?: string
  id: number
  nom: string
  prixHt: number
  prixTtc: number
  createdAt?: string
  updatedAt?: string
  slug?: string
}

export interface SaveTypeConsultation {
  id: number
  nom: string
  prixHt: number
  prixTtc: number
}

export interface TypeConsultationError {
  nom: string | null
  prixHt: string | null
  prixTtc: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initTypeConsultationState = (): SaveTypeConsultation => ({
  id: 0,
  nom: '',
  prixTtc: 0,
  prixHt: 0,
})

export const initTypeConsultationErrorState = (): TypeConsultationError => ({
  nom: null,
  prixHt: null,
  prixTtc: null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getTypeConsultationFakeData = (): TypeConsultation[] => [
  {
    id: 1,
    nom: 'Consultation Générale',
    slug: 'consultation',
    prixHt: 12,
    prixTtc: 15,
    createdAt: new Date().toISOString(),
  },
]

export async function onTypeConsultationSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveTypeConsultation,
  setErrors: Dispatch<SetStateAction<TypeConsultationError>>,
  onSubmit: (data: SaveTypeConsultation) => Promise<any>,
  onHide: () => void,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  const { id } = state
  try {
    const { data, error}: JsonLdApiResponseInt<TypeConsultation> = await onSubmit(state)
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

export async function onDeleteTypeConsultation(
  state: TypeConsultation,
  onSubmit: (data: TypeConsultation) => Promise<void>,
  onRefresh: () => void,
  navigate?: NavigateFunction
): Promise<void> {
  
  try {
    const { error }: JsonLdApiResponseInt<TypeConsultation> = await onSubmit(state)
    if (error) {
      if (error?.data) toast.error(error.data.detail)
    } else {
      toast.success('Suppression bien effectuée.')
      onRefresh()
      if (navigate) navigate('/app/fournisseurs')
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
