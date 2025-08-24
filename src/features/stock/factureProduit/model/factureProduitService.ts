import type {User} from "../../../user/model/userService.ts";
import type {Agent} from "../../../personnel/agent/model/agentService.ts";
import type {SingleValue} from "react-select";
import type {SelectOptionType, THeadItemType} from "../../../../services/services.ts";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
import type {NavigateFunction} from "react-router-dom";

// INTERFACES OR TYPES
export interface FactureProduit {
  '@id'?: string
  id: number
  taux: number
  nomClient: string
  fkUser?: User
  fkAgent?: Agent
  remise: number
  valid: boolean
  createdAt?: string
}

export interface SaveFactureProduit {
  id: number
  nomClient: string
  fkAgent: SingleValue<SelectOptionType> | null
  remise: number
  valid: boolean
}

export interface FactureProduitError {
  id: string | null
  nomClient: string | null
  fkAgent: string | null
  remise: string | null
  valid: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initFactureProduitState = (): SaveFactureProduit => ({
  remise: 0,
  fkAgent: null,
  valid: false,
  nomClient: '',
  id: 0,
})

export const initFactureProduitErrorState = (): FactureProduitError => ({
  id: null,
  nomClient: null,
  fkAgent: null,
  remise: null,
  valid: null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getFactureHeadItems = (): THeadItemType[] => [
  { th: 'Montant' },
  { th: 'Effectué par' },
  { th: 'Date' },
]

export async function onFactureProduitSubmit(
  e: FormEvent<HTMLFormElement>,
  state: FactureProduit,
  setErrors: Dispatch<SetStateAction<FactureProduitError>>,
  onSubmit: (data: FactureProduit) => Promise<any>,
  navigate: NavigateFunction,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  const { id } = state
  try {
    const { data, error}: JsonLdApiResponseInt<FactureProduit> = await onSubmit(state)
    if (data) {
      toast.success(`${id > 0 ? 'Modification ' : 'Enregistrement '} bien effectué${'e'}`)
      if (onRefresh) onRefresh()
      navigate('/app/factures-produits')
    }
    
    if (error && error?.data) {
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}

export async function onDeleteFactureProduit(
  state: FactureProduit,
  onSubmit: (data: FactureProduit) => Promise<void>,
  onRefresh: () => void,
  navigate?: NavigateFunction
): Promise<void> {
  
  try {
    const { error }: JsonLdApiResponseInt<FactureProduit> = await onSubmit(state)
    if (error) {
      if (error?.data) toast.error(error.data.detail)
    } else {
      toast.success('Suppression bien effectuée.')
      onRefresh()
      if (navigate) navigate('/app/factures-produits')
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
