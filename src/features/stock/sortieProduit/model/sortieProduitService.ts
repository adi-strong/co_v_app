import type {User} from "../../../user/model/userService.ts";
import type {Agent} from "../../../personnel/agent/model/agentService.ts";
import type {Produit} from "../../produit/model/produitService.ts";
import type {UniteConsommation} from "../../uniteConsommation/model/uniteConsommationService.ts";
import type {SingleValue} from "react-select";
import type {SelectOptionType} from "../../../../services/services.ts";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {NavigateFunction} from "react-router-dom";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
import type {FactureProduit} from "../../factureProduit/model/factureProduitService.ts";

// INTERFACES OR TYPES
export interface SortieProduit {
  '@id'?: string
  id: number
  taux: number
  nomClient: string
  fkUser?: User
  fkAgent?: Agent
  produitSorties: ProduitSortie[]
  factureProduit: FactureProduit
  createdAt?: string
  updatedAt?: string
}

export interface ProduitSortie {
  id: number
  fkProduit: Produit
  fkSortie: SortieProduit
  quantite: number
  prixHt: number
  prixTtc: number
  fkUnite?: UniteConsommation
}

interface ProduitItem {
  lotID: number
  quantite: number
}

export interface SaveSortieProduit {
  id: number,
  taux: number,
  nomClient: string,
  fkAgent: SingleValue<SelectOptionType> | null,
  produitItems: ProduitItem[],
  createdAt: string
}

export interface SortieErrorProduit {
  id: string | null,
  taux: string | null,
  nomClient: string | null,
  fkAgent: string | null,
  produitItems: string | null,
  createdAt: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initSortieProduitState = (): SaveSortieProduit => ({
  fkAgent: null,
  createdAt: '',
  id: 0,
  nomClient: '',
  produitItems: [],
  taux: 0,
})

export const initSortieProduitErrorState = (): SortieErrorProduit => ({
  id: null,
  taux: null,
  nomClient: null,
  fkAgent: null,
  produitItems: null,
  createdAt: null
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS

/**
 *
 * @param e
 * @param state
 * @param setErrors
 * @param onSubmit
 * @param navigate
 * @param onRefresh
 */
export async function onSortieProduitSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveSortieProduit,
  setErrors: Dispatch<SetStateAction<SortieErrorProduit>>,
  onSubmit: (data: SaveSortieProduit) => Promise<any>,
  navigate: NavigateFunction,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  setErrors(initSortieProduitErrorState())
  
  try {
    const { data, error }: JsonLdApiResponseInt<SortieProduit> = await onSubmit(state)
    if (error && error?.data) {
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
    
    if (data) {
      toast.success('Vente bien effectuée.')
      if (onRefresh) onRefresh()
      navigate('/app/produits-sorties')
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
