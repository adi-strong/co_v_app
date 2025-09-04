import type {User} from "../../user/model/userService.ts";
import type {Agent} from "../../personnel/agent/model/agentService.ts";
import type {SingleValue} from "react-select";
import type {SelectOptionType, THeadItemType} from "../../../services/services.ts";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {JsonLdApiResponseInt} from "../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
import type {NavigateFunction} from "react-router-dom";
  
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
  setState: Dispatch<SetStateAction<SaveRendezVous>>,
  setErrors: Dispatch<SetStateAction<RendezVousError>>,
  onSubmit: (data: SaveRendezVous) => Promise<any>,
  onRefresh?: () => void,
  onHide?: () => void
): Promise<void> {
  
  e.preventDefault()
  const { id } = state
  
  setErrors(initRendezVousErrorState())
  
  try {
    const { data, error}: JsonLdApiResponseInt<RendezVous> = await onSubmit(state)
    if (data) {
      toast.success(`${id > 0 ? 'Modification ' : 'Enregistrement '} bien effectué${'e'}`)
      setState(initRendezVousState())
      
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

export async function onDeleteRdvSubmit(
  state: RendezVous,
  onSubmit: (data: RendezVous) => Promise<void>,
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
    if (navigate) navigate('/app/rendez-vous')
  }
  
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
