import type {Dispatch, FormEvent, SetStateAction} from "react";
import toast from "react-hot-toast";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import type {SingleValue} from "react-select";
import type {SelectOptionType} from "../../../../services/services.ts";
import type {Departement} from "../../departement/model/departementService.ts";
import type {NavigateFunction} from "react-router-dom";

// INTERFACES OR TYPES
export interface Service {
  '@id'?: string
  id: number
  nom: string
  fkDepartement?: Departement
  createdAt?: string
  updatedAt?: string
  slug?: string
  selected: boolean
}

export interface SaveService {
  id: number
  nom: string
  fkDepartement: SingleValue<SelectOptionType> | null
}

export interface NewService {
  nom: string
  fkDepartement: string | null
  error: string | null
}

export interface ServiceError {
  nom: string | null
  fkDepartement: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initNewServices = (): NewService[] => [{ nom: '', fkDepartement: null, error: null }]

export const initServiceState = (): SaveService => ({ nom: '', fkDepartement: null, id: 0 })

export const initServiceErrorState = (): ServiceError => ({ nom: null, fkDepartement: null })
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getServiceFakeData = (): Service[] => [
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

export async function onPostServiceSubmit(
  e: FormEvent<HTMLFormElement>,
  state: NewService[],
  setState: Dispatch<SetStateAction<NewService[]>>,
  fkDepartement: string | null,
  onSubmit: (data: NewService) => Promise<any>,
  onHide: () => void,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  const categories: NewService[] = [...state]
  const remainingCategories: NewService[] = []
  
  try {
    for (let i: number = 0; i < categories.length; i++) {
      const category: NewService = categories[i]
      
      try {
        const { data, error }: JsonLdApiResponseInt<Service> = await onSubmit({ ...category, fkDepartement })
        
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
        toast.error('Erreur lors de la soumission du service')
        remainingCategories.push({ ...category, error: 'Erreur lors de la soumission.' })
      }
    }
  } catch (e) { toast.error('Problème réseau.') }
  
  setState(remainingCategories)
  
  if (remainingCategories.length === 0) {
    setState(initNewServices())
    onHide()
  }
  
  if (onRefresh) onRefresh()
  
}

export async function onServiceSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveService,
  setState: Dispatch<SetStateAction<SaveService>>,
  setErrors: Dispatch<SetStateAction<ServiceError>>,
  onSubmit: (data: SaveService) => Promise<any>,
  onRefresh?: () => void,
  onHide?: () => void
): Promise<void> {
  
  e.preventDefault()
  setErrors(initServiceErrorState())
  
  const { id } = state
  
  try {
    const { data, error }: JsonLdApiResponseInt<Service> = await onSubmit(state)
    if (error && error?.data) {
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
    
    if (data) {
      toast.success(id < 1 ? 'Enregistrement bien effectué.' : 'Modification bien effectuée.')
      setState(initServiceState())
      
      if (onRefresh) onRefresh()
      if (onHide) onHide()
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}

export async function onDeleteServiceSubmit(
  state: Service,
  onSubmit: (data: Service) => Promise<void>,
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
    if (navigate) navigate('/app/services')
  }
  
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
