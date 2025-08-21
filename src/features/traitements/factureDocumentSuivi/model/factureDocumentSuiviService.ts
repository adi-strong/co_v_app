import type {DocumentSuivi} from "../../documentSuivi/model/documentSuiviService.ts";
import type {User} from "../../../user/model/userService.ts";
import type {Agent} from "../../../personnel/agent/model/agentService.ts";
import type {CompteCaisse} from "../../../finances/compteCaisse/model/compteCaisseService.ts";
import type {SingleValue} from "react-select";
import type {SelectOptionType} from "../../../../services/services.ts";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";

// INTERFACES OR TYPES
export interface FactureDocumentSuivi {
  '@id'?: string
  id: number
  amount: number
  fkDocSuivi: DocumentSuivi
  remise?: number
  valid: boolean
  fkUser?: User
  fkAgent: Agent
  fkCaisse?: CompteCaisse
  montantPaye: number
  taux: number
  releasedAt?: string
  updatedAt?: string
}

export interface SaveFactureDocumentSuivi {
  id: number
  amount: number
  end: boolean
  remise: number
  fkAgent: SingleValue<SelectOptionType> | null
  montantPaye: number
}

export interface FactureDocumentSuiviError {
  amount: string | null
  end: string | null
  remise: string | null
  fkAgent: string | null
  montantPaye: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initFactureDocumentSuiviState = (): SaveFactureDocumentSuivi => ({
  id: 0,
  end: false,
  amount: 0,
  fkAgent: null,
  montantPaye: 0,
  remise: 0,
})

export const initFactureDocumentSuiviErrorState = (): FactureDocumentSuiviError => ({
  amount: null,
  end: null,
  remise: null,
  fkAgent: null,
  montantPaye: null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export async function onPatchFactureDocumentSuiviSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveFactureDocumentSuivi,
  setErrors: Dispatch<SetStateAction<FactureDocumentSuiviError>>,
  onSubmit: (data: SaveFactureDocumentSuivi) => Promise<any>,
  onHide: () => void,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  const { id } = state
  try {
    const { data, error}: JsonLdApiResponseInt<FactureDocumentSuivi> = await onSubmit(state)
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
