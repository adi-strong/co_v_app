import type {Dispatch, FormEvent, SetStateAction} from "react";
import toast from "react-hot-toast";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import type {NavigateFunction} from "react-router-dom";

// INTERFACES OR TYPES
export interface CategorieProduit {
  '@id'?: string
  id: number
  nom: string
  createdAt?: string
  updatedAt?: string
  slug?: string
  selected: boolean
  total: number
}

export interface SaveCategorieProduit {
  id: number
  nom: string
}

export interface NewCategorieProduit {
  nom: string
  error: string | null
}

export interface CategorieLitError { nom: string | null }
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initNewCategorieProduits = (): NewCategorieProduit[] => [{ nom: '', error: null }]

export const initCategorieProduitState = (): SaveCategorieProduit => ({ nom: '', id: 0 })

export const initCategorieProduitErrorState = (): CategorieLitError => ({ nom: null })
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getCategorieProduitFakeData = (): CategorieProduit[] => [
  {
    id: 1,
    nom: 'Malaria',
    slug: 'malaria',
    createdAt: new Date().toISOString(),
    "@id": '/api/categorie_exams/1',
    selected: false,
    total: 0
  },
  {
    id: 2,
    nom: 'Typhoïde',
    slug: 'typhoide',
    createdAt: new Date().toISOString(),
    "@id": '/api/categorie_exams/2',
    selected: false,
    total: 0
  },
]

export async function onPostCategorieProduitSubmit(
  e: FormEvent<HTMLFormElement>,
  state: NewCategorieProduit[],
  setState: Dispatch<SetStateAction<NewCategorieProduit[]>>,
  onSubmit: (data: NewCategorieProduit) => Promise<any>,
  onHide: () => void,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  const categories: NewCategorieProduit[] = [...state]
  const remainingCategories: NewCategorieProduit[] = []
  
  try {
    for (let i: number = 0; i < categories.length; i++) {
      const category: NewCategorieProduit = categories[i]
      
      try {
        const { data, error }: JsonLdApiResponseInt<CategorieProduit> = await onSubmit(category)
        
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
        toast.error('Erreur lors de la soumission de la catégorie')
        remainingCategories.push({ ...category, error: 'Erreur lors de la soumission.' })
      }
    }
  } catch (e) { toast.error('Problème réseau.') }
  
  setState(remainingCategories)
  
  if (remainingCategories.length === 0) {
    setState(initNewCategorieProduits())
    onHide()
  }
  
  if (onRefresh) onRefresh()
  
}

export async function onCategorieProduitSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveCategorieProduit,
  setState: Dispatch<SetStateAction<SaveCategorieProduit>>,
  setErrors: Dispatch<SetStateAction<CategorieLitError>>,
  onSubmit: (data: SaveCategorieProduit) => Promise<any>,
  onRefresh: () => void,
  onHide?: () => void
): Promise<void> {
  
  e.preventDefault()
  setErrors(initCategorieProduitErrorState())
  
  try {
    const { data, error }: JsonLdApiResponseInt<CategorieProduit> = await onSubmit(state)
    if (error && error?.data) {
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
    
    if (data) {
      toast.success('Modification bien effectuée.')
      setState(initCategorieProduitState())
      
      onRefresh()
      if (onHide) onHide()
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}

export async function onDeleteCategorieProduitSubmit(
  state: CategorieProduit,
  onSubmit: (data: CategorieProduit) => Promise<void>,
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
