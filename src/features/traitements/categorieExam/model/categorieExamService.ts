import type {Dispatch, FormEvent, SetStateAction} from "react";
import toast from "react-hot-toast";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import type {NavigateFunction} from "react-router-dom";
import type {Examen} from "../../examen/model/examenService.ts";

// INTERFACES OR TYPES
export interface CategorieExam {
  '@id'?: string
  id: number
  nom: string
  createdAt?: string
  updatedAt?: string
  slug?: string
  selected: boolean
  exams: Examen[]
  total: number
}

export interface SaveCategorieExam {
  id: number
  nom: string
}

export interface NewCategorieExam {
  nom: string
  error: string | null
}

export interface CategorieExamError { nom: string | null }
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initNewCategorieExams = (): NewCategorieExam[] => [{ nom: '', error: null }]

export const initCategorieExamState = (): SaveCategorieExam => ({ nom: '', id: 0 })

export const initCategorieExamErrorState = (): CategorieExamError => ({ nom: null })
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getCategorieExamFakeData = (): CategorieExam[] => [
  {
    id: 1,
    nom: 'Malaria',
    slug: 'malaria',
    createdAt: new Date().toISOString(),
    "@id": '/api/categorie_exams/1',
    selected: false,
    exams: [],
    total: 0,
  },
  {
    id: 2,
    nom: 'Typhoïde',
    slug: 'typhoide',
    createdAt: new Date().toISOString(),
    "@id": '/api/categorie_exams/2',
    selected: false,
    exams: [],
    total: 0,
  },
]

export async function onPostCategorieExamSubmit(
  e: FormEvent<HTMLFormElement>,
  state: NewCategorieExam[],
  setState: Dispatch<SetStateAction<NewCategorieExam[]>>,
  onSubmit: (data: NewCategorieExam) => Promise<any>,
  onHide: () => void,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  const categories: NewCategorieExam[] = [...state]
  const remainingCategories: NewCategorieExam[] = []
  
  try {
    for (let i: number = 0; i < categories.length; i++) {
      const category: NewCategorieExam = categories[i]
      
      try {
        const { data, error }: JsonLdApiResponseInt<CategorieExam> = await onSubmit(category)
        
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
    setState(initNewCategorieExams())
    onHide()
  }
  
  if (onRefresh) onRefresh()
  
}

export async function onCategorieExamSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveCategorieExam,
  setState: Dispatch<SetStateAction<SaveCategorieExam>>,
  setErrors: Dispatch<SetStateAction<CategorieExamError>>,
  onSubmit: (data: SaveCategorieExam) => Promise<any>,
  onRefresh?: () => void,
  onHide?: () => void
): Promise<void> {
  
  e.preventDefault()
  const { id } = state
  setErrors(initCategorieExamErrorState())
  
  try {
    const { data, error }: JsonLdApiResponseInt<CategorieExam> = await onSubmit(state)
    if (error && error?.data) {
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
    
    if (data) {
      toast.success(`${id < 1 ? 'Enregistrement' : 'Modification'} bien effectué${id > 0 ? 'e' : ''}.`)
      setState(initCategorieExamState())
      
      if (onRefresh) onRefresh()
      if (onHide) onHide()
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}

export async function onDeleteCategorieExamSubmit(
  state: CategorieExam,
  onSubmit: (data: CategorieExam) => Promise<void>,
  onRefresh: () => void,
  onHide: () => void,
  navigate?: NavigateFunction
): Promise<void> {
  onHide()
  
  const { error }: JsonLdApiResponseInt<CategorieExam> = await onSubmit(state)
  if (error && error.data && error.data?.detail) toast.error(error.data.detail)
  else {
    toast.success('Suppression bien effectuée.')
    onRefresh()
    if (navigate) navigate('/app/categories-examens')
  }
  
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
