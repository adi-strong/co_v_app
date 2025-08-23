import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {NavigateFunction} from "react-router-dom";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
  
// INTERFACES OR TYPES
import toast from "react-hot-toast";

export interface TypeDocSuivi {
  '@id'?: string
  id: number
  nom: string
  createdAt?: string
  updatedAt?: string
  slug?: string
  selected: boolean
}

export interface SaveTypeDocSuivi {
  id: number
  nom: string
}

export interface TypeDocSuiviError { nom: string | null }
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initTypeDocSuiviState = (): SaveTypeDocSuivi => ({ nom: '', id: 0 })

export const initTypeDocSuiviErrorState = (): TypeDocSuiviError => ({ nom: null })
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getTypeDocSuiviFakeData = (): TypeDocSuivi[] => [
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

export async function onTypeDocSuiviSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveTypeDocSuivi,
  setErrors: Dispatch<SetStateAction<TypeDocSuiviError>>,
  onSubmit: (data: SaveTypeDocSuivi) => Promise<any>,
  navigate: NavigateFunction,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  const { id } = state
  setErrors(initTypeDocSuiviErrorState())
  
  try {
    const { data, error }: JsonLdApiResponseInt<TypeDocSuivi> = await onSubmit(state)
    if (error && error?.data) {
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
    
    if (data) {
      toast.success(`${id < 1 ? 'Enregistrement' : 'Modification'} bien effectué${id > 0 ? 'e' : ''}.`)
      if (onRefresh) onRefresh()
      navigate('/app/types-documents-suivis')
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
