import type {User} from "../../user/model/userService.ts";
import type {Agent} from "../../personnel/agent/model/agentService.ts";
import type {SingleValue} from "react-select";
import type {SelectOptionType, THeadItemType} from "../../../services/services.ts";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {JsonLdApiResponseInt} from "../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
  
// INTERFACES OR TYPES
export interface RendezVous {
  '@id'?: string
  id: number
  nom: string
  objet: string
  tel: string
  date: string
  email?: string
  contenu?: string
  fkUser?: User
  fkAgent: Agent
  done: boolean
  releasedAt?: string
  slug?: string
  selected: boolean
}

export interface SaveRendezVous {
  id: number
  nom: string
  objet: string
  tel: string
  email: string
  date: string
  fkAgent: SingleValue<SelectOptionType> | null
  end: boolean
}

export interface RendezVousError {
  nom: string | null
  objet: string | null
  tel: string | null
  email: string | null
  contenu: string | null
  date: string | null
  fkAgent: string | null
  end: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initRendezVousState = (): SaveRendezVous => ({
  id: 0,
  date: '',
  email: '',
  end: false,
  tel: '',
  nom: '',
  objet: '',
  fkAgent: null,
})

export const initRendezVousErrorState = (): RendezVousError => ({
  nom: null,
  objet: null,
  tel: null,
  email: null,
  contenu: null,
  date: null,
  fkAgent: null,
  end: null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getRdvHeadItems = (): THeadItemType[] => [
  { th: 'Objet' },
  { th: 'N° Tél.' },
  { th: 'Date' },
]

export async function onRendezVousSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveRendezVous,
  setErrors: Dispatch<SetStateAction<RendezVousError>>,
  onSubmit: (data: SaveRendezVous) => Promise<any>,
  onHide: () => void,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  const { id } = state
  try {
    const { data, error}: JsonLdApiResponseInt<RendezVous> = await onSubmit(state)
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
