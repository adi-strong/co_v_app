import type {Dispatch, FormEvent, SetStateAction} from "react";
import toast from "react-hot-toast";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import type {CategorieExam} from "../../categorieExam/model/categorieExamService.ts";

// INTERFACES OR TYPES
export interface Examen {
  '@id'?: string
  id: number
  nom: string
  prixHt: number
  prixTtc: number
  fkCategorie?: CategorieExam
  createdAt?: string
  updatedAt?: string
  slug?: string
  selected: boolean
}

export interface SaveExamen {
  id: number
  nom: string
  prixHt: number
  prixTtc: number
  fkCategorie: string | null
}

export interface ExamenError {
  nom: string | null
  prixHt: string | null
  prixTtc: string | null
  fkCategorie: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initExamenState = (): SaveExamen => ({
  id: 0,
  nom: '',
  prixTtc: 0,
  prixHt: 0,
  fkCategorie: null,
})

export const initExamenErrorState = (): ExamenError => ({
  nom: null,
  prixHt: null,
  prixTtc: null,
  fkCategorie: null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getExamenFakeData = (): Examen[] => [
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

export async function onExamenSubmit(
  e: FormEvent<HTMLFormElement>,
  state: Examen,
  setErrors: Dispatch<SetStateAction<ExamenError>>,
  onSubmit: (data: Examen) => Promise<any>,
  onHide: () => void,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  const { id } = state
  try {
    const { data, error}: JsonLdApiResponseInt<Examen> = await onSubmit(state)
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
