import type {Fournisseur} from "../../fournisseur/model/fournisseurService.ts";
import type {Produit} from "../../produit/model/produitService.ts";
import type {LotProduit} from "../../lotProduit/model/lotProduitService.ts";
import type {UniteConsommation} from "../../uniteConsommation/model/uniteConsommationService.ts";
import type {SingleValue} from "react-select";
import type {SelectOptionType} from "../../../../services/services.ts";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
import type {NavigateFunction} from "react-router-dom";
  
// INTERFACES OR TYPES
export interface Appro {
  '@id'?: string
  id: number
  remise: number
  fkFournisseur: Fournisseur
  fkUser: object
  approProduits: []
  createdAt?: string
}

export interface ApproProdut {
  id: number
  fkProduit: Produit
  fkAppro: Appro
  quantite: number
  typeQuantite: string
  tva?: number
  prixHt: number
  prixTtc: number
  datePeremption: string
  fkUnite?: UniteConsommation
  lotProduit: LotProduit
}

interface ApproProductItem {
  id: number
  uniteID: number
  lotID: number
  quantite: number
  typeQuantite: string
  tva: number
  prixHt: number
  prixTtc: number
  datePeremption: string
  dateAppro: string
}

export interface SaveAppro {
  remise: number
  fkFournisseur: SingleValue<SelectOptionType> | null
  productItems: ApproProductItem[]
  createdAt: string
}

export interface ApproError {
  remise: string | null
  fkFournisseur: string | null
  productItems: string | null
  createdAt: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initApproProdutState = (): SaveAppro => ({
  fkFournisseur: null,
  createdAt: new Date().toISOString(),
  remise: 0,
  productItems: [],
})

export const initApproProdutErrorState = (): ApproError => ({
  remise: null,
  fkFournisseur: null,
  productItems: null,
  createdAt: null,
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
export async function onApproSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveAppro,
  setErrors: Dispatch<SetStateAction<ApproError>>,
  onSubmit: (data: SaveAppro) => Promise<any>,
  navigate: () => NavigateFunction,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  setErrors(initApproProdutErrorState())
  
  try {
    const { data, error }: JsonLdApiResponseInt<Appro> = await onSubmit(state)
    if (error && error?.data) {
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
    
    if (data) {
      toast.success('Approvisionnement bien effectué.')
      if (onRefresh) onRefresh()
      navigate()
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
