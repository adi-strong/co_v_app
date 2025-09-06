import type {ApproProdut} from "../../appro/model/approService.ts";
import type {Fournisseur} from "../../fournisseur/model/fournisseurService.ts";
import type {User} from "../../../user/model/userService.ts";
import type {Produit} from "../../produit/model/produitService.ts";
import type {UniteConsommation} from "../../uniteConsommation/model/uniteConsommationService.ts";
import type {NumLot} from "../../numLot/model/numLotService.ts";
import type {SingleValue} from "react-select";
import type {PriceType, SelectOptionType, THeadItemType} from "../../../../services/services.ts";
import type {ChangeEvent, Dispatch, FormEvent, SetStateAction} from "react";
import type {NavigateFunction} from "react-router-dom";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
import type {MediaObjectInt} from "../../../../interfaces/MediaObjectInt.ts";
import moment from "moment";
import {onSetPrixHtChange, onSetTaxChange} from "../../../../services/services.ts";

// INTERFACES OR TYPES
export interface LotProduit {
  '@id'?: string
  id: number
  nom: string
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
  image?: MediaObjectInt
  devise: string
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
export const getLotProdHeadItems = (): THeadItemType[] => [
  { th: 'Qté.' },
  { th: 'Prix HT' },
  { th: 'Prix TTC' },
  { th: 'TVA' },
  { th: 'Péremption' },
]

export const getLotAlertColor = (date: string): string => {
  let color: string
  
  const dateParam: Date = new Date(date)
  const currentDate: Date = new Date()
  
  const diff: number = moment(dateParam).diff(currentDate, 'days')
  
  if (diff > 32 && diff < 33) color = 'warning'
  else if (diff < 15) color = 'danger'
  else color = 'secondary'
  
  return color
}

/**
 *
 * @param e
 * @param state
 * @param setErrors
 * @param onSubmit
 * @param onRefresh
 * @param onHide
 * @param navigate
 */
export async function onPatchLotProduitSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveLotProduit,
  setErrors: Dispatch<SetStateAction<LotProduitError>>,
  onSubmit: (data: SaveLotProduit) => Promise<any>,
  onRefresh: () => void,
  onHide?: () => void,
  navigate?: NavigateFunction,
): Promise<void> {
  
  e.preventDefault()
  setErrors(initLotProduitErrorState())
  const { id } = state
  
  try {
    const { data, error }: JsonLdApiResponseInt<LotProduit> = await onSubmit(state)
    if (data) {
      toast.success('Modification bien effectuée.')
      onRefresh()
      if (onHide) onHide()
      if (navigate) navigate(`/app/produits/${data.fkProduit.id}/${data.fkProduit?.slug}`)
    }
    
    if (error && error?.data) {
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}

export const onTvaLotProdChange = (
  e: ChangeEvent<HTMLInputElement>,
  setState: Dispatch<SetStateAction<SaveLotProduit>>): void => {
  setState(prod => {
    const prices: PriceType = onSetTaxChange(e, prod.prixHt)
    
    let tva: number = prices.taxe
    let prixTtc: number = prices.prixTtc
    
    return {
      ...prod,
      tva,
      prixTtc,
    }
  })
}

export const onPrixHTLotProdChange = (
  e: ChangeEvent<HTMLInputElement>,
  setState: Dispatch<SetStateAction<SaveLotProduit>>): void => {
  setState(prod => {
    const prices: PriceType = onSetPrixHtChange(e, prod.tva)
    const prixHt: number = prices.prixHt
    const prixTtc: number = prices.prixTtc
    
    prod.prixHt = prices.prixHt
    prod.prixTtc = prices.prixTtc
    
    return {
      ...prod,
      prixHt,
      prixTtc,
    }
  })
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
