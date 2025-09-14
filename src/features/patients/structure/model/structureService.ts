import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
import type {NavigateFunction} from "react-router-dom";
import type {THeadItemType} from "../../../../services/services.ts";

// INTERFACES OR TYPES
export interface Structure {
  '@id'?: string
  id: number
  nom: string
  focal?: string
  tel: string
  email?: string
  createdAt?: string
  updatedAt?: string
  slug?: string
  selected: boolean
}

export interface SaveStructure {
  id: number
  nom: string
  focal: string
  tel: string
  email: string
}

export interface StructureError {
  id: string | null
  nom: string | null
  focal: string | null
  tel: string | null
  email: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initStructureState = (): SaveStructure => ({
  id: 1,
  nom: '',
  tel: '',
  email: '',
  focal: '',
})

export const initStructureErrorState = (): StructureError => ({
  id: null,
  nom: null,
  focal: null,
  tel: null,
  email: null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getStructureFakeData = (): Structure[] => [
  {
    id: 1,
    nom: 'BOP',
    focal: 'Adivin',
    tel: '0891759667',
    createdAt: new Date().toISOString(),
    slug: 'adi',
    selected: false,
    email: 'adi.life91@gmail.com',
  },
]

export const getStructureHeadItems = (): THeadItemType[] => [
  { th: 'N° Tél.' },
  { th: 'E-mail' },
]

export async function onStructureSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveStructure,
  setState: Dispatch<SetStateAction<SaveStructure>>,
  setErrors: Dispatch<SetStateAction<StructureError>>,
  onSubmit: (data: SaveStructure) => Promise<any>,
  onRefresh?: () => void,
  onHide?: () => void,
): Promise<void> {
  
  e.preventDefault()
  const { id } = state
  
  setErrors(initStructureErrorState())
  
  try {
    const { data, error}: JsonLdApiResponseInt<Structure> = await onSubmit(state)
    if (data) {
      toast.success(`${id > 0 ? 'Modification ' : 'Enregistrement '} bien effectué${'e'}`)
      setState(initStructureState())
      
      if (onRefresh) onRefresh()
      if (onHide) onHide()
    }
    
    if (error && error?.data) {
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}

export async function onDeleteStructureSubmit(
  state: Structure,
  onSubmit: (data: Structure) => Promise<void>,
  onRefresh: () => void,
  onHide: () => void,
  navigate?: NavigateFunction
): Promise<void> {
  onHide()
  
  try {
    const { error }: JsonLdApiResponseInt<Structure> = await onSubmit(state)
    if (error) {
      if (error?.data) toast.error(error.data.detail)
    } else {
      toast.success('Suppression bien effectuée.')
      onRefresh()
      if (navigate) navigate('/app/structures')
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
