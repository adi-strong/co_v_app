import type {ApproProdut} from "../../appro/model/approService.ts";
import type {Fournisseur} from "../../fournisseur/model/fournisseurService.ts";
import type {User} from "../../../user/model/userService.ts";
import type {Produit} from "../../produit/model/produitService.ts";
import type {UniteConsommation} from "../../uniteConsommation/model/uniteConsommationService.ts";
import type {NumLot} from "../../numLot/model/numLotService.ts";
import type {SingleValue} from "react-select";
import type {SelectOptionType} from "../../../../services/services.ts";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {NavigateFunction} from "react-router-dom";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";

// INTERFACES OR TYPES
export interface LotProduit {
  '@id'?: string
  id: number
  quantite: number
  typeQuantite: string
  tva?: number
  prixHt: number
  prixTtc: number
  dateAppro: string
  datePeremption: string
  numLot: string
  fkAppro: ApproProdut
  fkFournisseur: Fournisseur
  fkUser?: User
  fkProduit: Produit
  fkLot: NumLot
  fkUnite?: UniteConsommation
  releasedAt?: string
  selected: boolean
}

export interface SaveLotProduit {
  id: number
  tva: number
  prixHt: number
  prixTtc: number
  fkFournisseur: SingleValue<SelectOptionType> | null
  fkUnite: SingleValue<SelectOptionType> | null
}

export interface LotProduitError {
  tva: string | null
  prixHt: string | null
  prixTtc: string | null
  fkFournisseur: string | null
  fkUnite: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initLotProduitState = (): SaveLotProduit => ({
  id: 0,
  fkFournisseur: null,
  fkUnite: null,
  prixHt: 0,
  prixTtc: 0,
  tva: 0,
})

export const initLotProduitErrorState = (): LotProduitError => ({
  tva: null,
  prixHt: null,
  prixTtc: null,
  fkFournisseur: null,
  fkUnite: null,
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
export async function onPatchLotProduitSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveLotProduit,
  setErrors: Dispatch<SetStateAction<LotProduitError>>,
  onSubmit: (data: SaveLotProduit) => Promise<any>,
  navigate: NavigateFunction,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  setErrors(initLotProduitErrorState())
  const { id } = state
  
  try {
    const { data, error }: JsonLdApiResponseInt<LotProduit> = await onSubmit(state)
    if (data) {
      toast.success('Modification bien effectuée.')
      if (onRefresh) onRefresh()
      navigate(`/app/produits/${data.fkProduit.id}/${data.fkProduit?.slug}`)
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
