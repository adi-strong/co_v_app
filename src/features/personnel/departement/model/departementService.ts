import type {Dispatch, FormEvent, SetStateAction} from "react";
import toast from "react-hot-toast";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";

// INTERFACES OR TYPES
export interface Departement {
  '@id'?: string
  id: number
  nom: string
  createdAt?: string
  updatedAt?: string
  slug?: string
  selected: boolean
}

export interface SaveDepartement {
  id: number
  nom: string
}

export interface NewDepartement {
  nom: string
  error: string | null
}

export interface DepartementError { nom: string | null }
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initNewDepartements = (): NewDepartement[] => [{ nom: '', error: null }]

export const initDepartementState = (): SaveDepartement => ({ nom: '', id: 0 })

export const initDepartementErrorState = (): DepartementError => ({ nom: null })
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getDepartementFakeData = (): Departement[] => [
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

export async function onPostDepartementSubmit(
  e: FormEvent<HTMLFormElement>,
  state: NewDepartement[],
  setState: Dispatch<SetStateAction<NewDepartement[]>>,
  onSubmit: (data: NewDepartement) => Promise<any>,
  onHide: () => void,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  const categories: NewDepartement[] = [...state]
  const remainingCategories: NewDepartement[] = []
  
  try {
    for (let i: number = 0; i < categories.length; i++) {
      const category: NewDepartement = categories[i]
      
      try {
        const { data, error }: JsonLdApiResponseInt<Departement> = await onSubmit(category)
        
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
        toast.error('Erreur lors de la soumission du département')
        remainingCategories.push({ ...category, error: 'Erreur lors de la soumission.' })
      }
    }
  } catch (e) { toast.error('Problème réseau.') }
  
  setState(remainingCategories)
  
  if (remainingCategories.length === 0) {
    setState(initNewDepartements())
    onHide()
  }
  
  if (onRefresh) onRefresh()
  
}

export async function onPatchDepartementSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveDepartement,
  setErrors: Dispatch<SetStateAction<DepartementError>>,
  onSubmit: (data: SaveDepartement) => Promise<any>,
  onHide: () => void,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  setErrors(initDepartementErrorState())
  
  try {
    const { data, error }: JsonLdApiResponseInt<Departement> = await onSubmit(state)
    if (error && error?.data) {
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
    
    if (data) {
      toast.success('Modification bien effectuée.')
      if (onRefresh) onRefresh()
      onHide()
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
