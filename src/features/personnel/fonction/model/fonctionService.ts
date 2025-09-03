import type {Dispatch, FormEvent, SetStateAction} from "react";
import toast from "react-hot-toast";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import type {NavigateFunction} from "react-router-dom";

// INTERFACES OR TYPES
export interface Fonction {
  '@id'?: string
  id: number
  nom: string
  createdAt?: string
  updatedAt?: string
  slug?: string
  selected: boolean
}

export interface SaveFonction {
  id: number
  nom: string
}

export interface NewFonction {
  nom: string
  error: string | null
}

export interface FonctionError { nom: string | null }
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initNewFonctions = (): NewFonction[] => [{ nom: '', error: null }]

export const initFonctionState = (): SaveFonction => ({ nom: '', id: 0 })

export const initFonctionErrorState = (): FonctionError => ({ nom: null })
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getFonctionFakeData = (): Fonction[] => [
  {
    id: 1,
    nom: 'Malaria',
    slug: 'malaria',
    createdAt: new Date().toISOString(),
    "@id": '/api/categorie_exams/1',
    selected: false,
  },
  {
    id: 2,
    nom: 'Typhoïde',
    slug: 'typhoide',
    createdAt: new Date().toISOString(),
    "@id": '/api/categorie_exams/2',
    selected: false,
  },
]

export async function onPostFonctionSubmit(
  e: FormEvent<HTMLFormElement>,
  state: NewFonction[],
  setState: Dispatch<SetStateAction<NewFonction[]>>,
  onSubmit: (data: NewFonction) => Promise<any>,
  onRefresh?: () => void,
  onHide?: () => void,
): Promise<void> {
  
  e.preventDefault()
  const categories: NewFonction[] = [...state]
  const remainingCategories: NewFonction[] = []
  
  try {
    for (let i: number = 0; i < categories.length; i++) {
      const category: NewFonction = categories[i]
      
      try {
        const { data, error }: JsonLdApiResponseInt<Fonction> = await onSubmit(category)
        
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
        toast.error('Erreur lors de la soumission de la fonction')
        remainingCategories.push({ ...category, error: 'Erreur lors de la soumission.' })
      }
    }
  } catch (e) { toast.error('Problème réseau.') }
  
  setState(remainingCategories)
  
  if (remainingCategories.length === 0) {
    setState(initNewFonctions())
  }
  
  if (onRefresh) onRefresh()
  if (onHide) onHide()
  
}

export async function onFonctionSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveFonction,
  setState: Dispatch<SetStateAction<SaveFonction>>,
  setErrors: Dispatch<SetStateAction<FonctionError>>,
  onSubmit: (data: SaveFonction) => Promise<any>,
  onRefresh?: () => void,
  onHide?: () => void
): Promise<void> {
  
  e.preventDefault()
  setErrors(initFonctionErrorState())
  
  const { id } = state
  
  try {
    const { data, error }: JsonLdApiResponseInt<Fonction> = await onSubmit(state)
    if (error && error?.data) {
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
    
    if (data) {
      toast.success(id < 1 ? 'Enregistrement bien effectué.' : 'Modification bien effectuée.')
      setState(initFonctionState())
      
      if (onRefresh) onRefresh()
      if (onHide) onHide()
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}

export async function onDeleteFonctionSubmit(
  state: Fonction,
  onSubmit: (data: Fonction) => Promise<void>,
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
    if (navigate) navigate('/app/fonctions')
  }
  
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
