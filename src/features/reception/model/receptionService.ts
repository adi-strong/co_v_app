import type {User} from "../../user/model/userService.ts";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {JsonLdApiResponseInt} from "../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
  
// INTERFACES OR TYPES
export interface Reception {
  '@id'?: string
  id: number
  nomComplet: string
  lieuNaissance?: string
  dateNaissance?: string
  sexe: string
  motif: string
  commentaire: string
  fkUser?: User
  tel: string
  email?: string
  createdAt?: string
}

export interface SaveReception {
  id: number
  nomComplet: string
  lieuNaissance: string
  dateNaissance: string
  sexe: string
  motif: string
  commentaire: string
  tel: string
  email: string
  rdvAt: string
}

export interface ReceptionError {
  nomComplet: string | null
  lieuNaissance: string | null
  dateNaissance: string | null
  sexe: string | null
  motif: string | null
  commentaire: string | null
  tel: string | null
  email: string | null
  rdvAt: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initReceptionState = (): SaveReception => ({
  id: 0,
  commentaire: '',
  tel: '',
  email: '',
  dateNaissance: '',
  motif: '',
  sexe: '',
  lieuNaissance: '',
  nomComplet: '',
  rdvAt: '',
})

export const initReceptionErrorState = (): ReceptionError => ({
  nomComplet: null,
  lieuNaissance: null,
  dateNaissance: null,
  sexe: null,
  motif: null,
  commentaire: null,
  tel: null,
  email: null,
  rdvAt: null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export async function onReceptionSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveReception,
  setErrors: Dispatch<SetStateAction<ReceptionError>>,
  onSubmit: (data: SaveReception) => Promise<any>,
  onHide: () => void,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  const { id } = state
  try {
    const { data, error}: JsonLdApiResponseInt<Reception> = await onSubmit(state)
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
