import type {Dispatch, FormEvent, SetStateAction} from "react";
import toast from "react-hot-toast";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import type {SelectOptionType} from "../../../../services/services.ts";
import type {NavigateFunction} from "react-router-dom";
import type {User} from "../../../user/model/userService.ts";

// INTERFACES OR TYPES
export interface CategorieLit {
  '@id'?: string
  id: number
  nom: string
  createdAt?: string
  updatedAt?: string
  slug?: string
  selected: boolean
}

export interface SaveCategorieLit {
  id: number
  nom: string
}

export interface NewCategorieLit {
  nom: string
  error: string | null
}

export interface CategorieLitError { nom: string | null }
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initNewCategorieLits = (): NewCategorieLit[] => [{ nom: '', error: null }]

export const initCategorieLitState = (): SaveCategorieLit => ({ nom: '', id: 0 })

export const initCategorieLitErrorState = (): CategorieLitError => ({ nom: null })
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getCategorieLitFakeData = (): CategorieLit[] => [
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

export const getgetCategorieLitActionsOptions = (): SelectOptionType[] => [
  { label: '-- Actions groupées --', value: '' },
  { label: 'Supprimer', value: 'ON_DELETE' },
]

export async function onPostCategorieLitSubmit(
  e: FormEvent<HTMLFormElement>,
  state: NewCategorieLit[],
  setState: Dispatch<SetStateAction<NewCategorieLit[]>>,
  onSubmit: (data: NewCategorieLit) => Promise<any>,
  onHide: () => void,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  const categories: NewCategorieLit[] = [...state]
  const remainingCategories: NewCategorieLit[] = []
  
  try {
    for (let i: number = 0; i < categories.length; i++) {
      const category: NewCategorieLit = categories[i]
      
      try {
        const { data, error }: JsonLdApiResponseInt<CategorieLit> = await onSubmit(category)
        
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
    setState(initNewCategorieLits())
    onHide()
  }
  
  if (onRefresh) onRefresh()
  
}

export async function onCategorieLitSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveCategorieLit,
  setState: Dispatch<SetStateAction<SaveCategorieLit>>,
  setErrors: Dispatch<SetStateAction<CategorieLitError>>,
  onSubmit: (data: SaveCategorieLit) => Promise<any>,
  onRefresh?: () => void,
  onHide?: () => void,
  navigate?: NavigateFunction
): Promise<void> {
  
  e.preventDefault()
  const { id } = state
  setErrors(initCategorieLitErrorState())
  
  const nameElt = document.getElementById('nom')
  
  try {
    const { data, error }: JsonLdApiResponseInt<CategorieLit> = await onSubmit(state)
    if (error && error?.data) {
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
    
    if (data) {
      toast.success(`${id < 1 ? 'Enregistrement' : 'Modification'} bien effectué${id > 0 ? '(e)' : ''}.`)
      
      setTimeout((): void => {
        nameElt.focus()
      }, 0)
      
      if (id < 1) setState(initCategorieLitState())
      
      if (onRefresh) onRefresh()
      if (onHide) onHide()
      if (navigate) navigate('categories-lits')
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}

export async function onDeleteCategorieLitSubmit(
  state: CategorieLit,
  onSubmit: (data: CategorieLit) => Promise<void>,
  onRefresh: () => void,
  onHide: () => void,
  navigate?: NavigateFunction
): Promise<void> {
  onHide()
  
  const { error }: JsonLdApiResponseInt<User> = await onSubmit(state)
  if (error && error.data && error.data?.detail) toast.error(error.data.detail)
  else {
    toast.success('Suppression bien effectuée.')
    onRefresh()
    if (navigate) navigate('/app/categorie_lits')
  }
  
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
