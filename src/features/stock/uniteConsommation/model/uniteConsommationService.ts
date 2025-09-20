import type {Dispatch, FormEvent, SetStateAction} from "react";
import toast from "react-hot-toast";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import type {NavigateFunction} from "react-router-dom";

// INTERFACES OR TYPES
export interface UniteConsommation {
  '@id'?: string
  id: number
  nom: string
  createdAt?: string
  updatedAt?: string
  slug?: string
  selected: boolean
  total: number
}

export interface SaveUniteConsommation {
  id: number
  nom: string
}

export interface NewUniteConsommation {
  nom: string
  error: string | null
}

export interface DepartementError { nom: string | null }
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initNewUniteConsommations = (): NewUniteConsommation[] => [{ nom: '', error: null }]

export const initUniteConsommationState = (): SaveUniteConsommation => ({ nom: '', id: 0 })

export const initUniteConsommationErrorState = (): DepartementError => ({ nom: null })
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getUniteConsommationFakeData = (): UniteConsommation[] => [
  {
    id: 1,
    nom: 'pce',
    slug: 'pce',
    createdAt: new Date().toISOString(),
    "@id": '/api/unite_consommations/1',
    selected: false,
    total: 0,
  },
  {
    id: 2,
    nom: 'l',
    slug: 'pce',
    createdAt: new Date().toISOString(),
    "@id": '/api/unite_consommations/2',
    selected: false,
    total: 0,
  },
]

export async function onPostUniteConsommationSubmit(
  e: FormEvent<HTMLFormElement>,
  state: NewUniteConsommation[],
  setState: Dispatch<SetStateAction<NewUniteConsommation[]>>,
  onSubmit: (data: NewUniteConsommation) => Promise<any>,
  onHide: () => void,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  const categories: NewUniteConsommation[] = [...state]
  const remainingCategories: NewUniteConsommation[] = []
  
  try {
    for (let i: number = 0; i < categories.length; i++) {
      const category: NewUniteConsommation = categories[i]
      
      try {
        const { data, error }: JsonLdApiResponseInt<UniteConsommation> = await onSubmit(category)
        
        if (error && error?.data) {
          const { violations } = error.data
          if (violations) violations.forEach(({ message }): void => {
            category.error = message
          })
        }
        
        if (data) {
          toast.success('Opération bien effectué.')
        } else remainingCategories.push(category)
      } catch (e) {
        toast.error("Erreur lors de la soumission de l'Unité")
        remainingCategories.push({ ...category, error: 'Erreur lors de la soumission.' })
      }
    }
  } catch (e) { toast.error('Problème réseau.') }
  
  setState(remainingCategories)
  
  if (remainingCategories.length === 0) {
    setState(initNewUniteConsommations())
    onHide()
  }
  
  if (onRefresh) onRefresh()
  
}

export async function onUniteConsommationSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveUniteConsommation,
  setState: Dispatch<SetStateAction<SaveUniteConsommation>>,
  setErrors: Dispatch<SetStateAction<DepartementError>>,
  onSubmit: (data: SaveUniteConsommation) => Promise<any>,
  onRefresh: () => void,
  onHide?: () => void
): Promise<void> {
  
  e.preventDefault()
  setErrors(initUniteConsommationErrorState())
  
  try {
    const { data, error }: JsonLdApiResponseInt<UniteConsommation> = await onSubmit(state)
    if (error && error?.data) {
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
    
    if (data) {
      toast.success('Modification bien effectuée.')
      setState(initUniteConsommationState())
      
      onRefresh()
      if (onHide) onHide()
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}

export async function onDeleteUniteConsommationSubmit(
  state: UniteConsommation,
  onSubmit: (data: UniteConsommation) => Promise<void>,
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
    if (navigate) navigate('/app/unites-consommations')
  }
  
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
