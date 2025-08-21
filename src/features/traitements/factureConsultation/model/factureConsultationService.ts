import type {Consultation} from "../../consultation/model/consultationService.ts";
import type {Agent} from "../../../personnel/agent/model/agentService.ts";
import type {User} from "../../../user/model/userService.ts";
import type {CompteCaisse} from "../../../finances/compteCaisse/model/compteCaisseService.ts";
import type {Structure} from "../../../patients/structure/model/structureService.ts";
import type {SingleValue} from "react-select";
import type {SelectOptionType} from "../../../../services/services.ts";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
  
// INTERFACES OR TYPES
export interface FactureConsultation {
  '@id'?: string
  id: number
  valid: boolean
  fkConsultation: Consultation
  taux: number
  fkAgent: Agent
  fkUser?: User
  montantPaye: number
  fkCaisse: CompteCaisse
  remise?: number
  fkStructure?: Structure
  estCeConventionne: boolean
  releasedAt?: string
  updatedAt?: string
}

export interface SaveFactureConsultation {
  id: number
  amount: number
  end: boolean
  fkAgent: SingleValue<SelectOptionType> | null
  montantPaye: number
  remise: number
  releasedAt: string
}

export interface FactureConsultationError {
  amount: string | null
  end: string | null
  fkAgent: string | null
  montantPaye: string | null
  remise: string | null
  releasedAt: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initFactureConsultationState = (): SaveFactureConsultation => ({
  id: 0,
  amount: 0,
  end: false,
  fkAgent: null,
  montantPaye: 0,
  remise: 0,
  releasedAt: '',
})

export const initFactureConsultationErrorState = (): FactureConsultationError => ({
  amount: null,
  end: null,
  fkAgent: null,
  montantPaye: null,
  remise: null,
  releasedAt: null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export async function onPatchFactureConsultationSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveFactureConsultation,
  setErrors: Dispatch<SetStateAction<FactureConsultationError>>,
  onSubmit: (data: SaveFactureConsultation) => Promise<any>,
  onHide: () => void,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  const { id } = state
  try {
    const { data, error}: JsonLdApiResponseInt<FactureConsultation> = await onSubmit(state)
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
