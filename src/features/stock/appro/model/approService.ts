import type {Fournisseur} from "../../fournisseur/model/fournisseurService.ts";
import type {Produit} from "../../produit/model/produitService.ts";
import type {LotProduit} from "../../lotProduit/model/lotProduitService.ts";
import type {UniteConsommation} from "../../uniteConsommation/model/uniteConsommationService.ts";
import type {SingleValue} from "react-select";
import type {PriceType, SelectOptionType, THeadItemType} from "../../../../services/services.ts";
import type {ChangeEvent, Dispatch, FormEvent, SetStateAction} from "react";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
import type {NavigateFunction} from "react-router-dom";
import type {CompteCaisse} from "../../../finances/compteCaisse/model/compteCaisseService.ts";
import {onSetPrixHtChange, onSetTaxChange} from "../../../../services/services.ts";
import type {BaseTaxeInt} from "../../../../interfaces/BaseTaxeInt.ts";

// INTERFACES OR TYPES
export interface Appro {
  '@id'?: string
  id: number
  remise: number
  fkFournisseur: Fournisseur
  fkCaisse: CompteCaisse
  fkUser: object
  approProduits: ApproProdut[]
  createdAt?: string
  devise: string
  taux: number
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
  price?: number
  qty?: number
  unite?: string
}

export interface ApproProductItem {
  id: number
  nom: string
  uniteID: number
  quantite: number
  tva: number
  prixHt: number
  prixTtc: number
  datePeremption: string
  dateAppro: string
  unite: string | null
  qty: number | null
  realQty: number | null
  price: number | null
}

export interface SaveAppro {
  remise: number
  fkFournisseur: SingleValue<SelectOptionType> | null
  devise: string
  productItems: ApproProductItem[]
  createdAt: string
}

export interface ApproError {
  remise: string | null
  fkFournisseur: string | null
  productItems: string | null
  createdAt: string | null
  devise: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initApproProdutState = (): SaveAppro => ({
  fkFournisseur: null,
  createdAt: '',
  remise: 0,
  productItems: [],
  devise: 'CDF',
})

export const initApproProdutErrorState = (): ApproError => ({
  remise: null,
  fkFournisseur: null,
  productItems: null,
  createdAt: null,
  devise: null,
})

export const initApproProductItem = (): ApproProductItem => ({
  dateAppro: '',
  id: 0,
  datePeremption: '',
  prixHt: 0,
  prixTtc: 0,
  tva: 0,
  quantite: 1,
  uniteID: 0,
  unite: null,
  qty: null,
  realQty: null,
  nom: '',
  price: null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getApproHeadItems = (): THeadItemType[] => [
  { th: 'N° Document' },
  { th: 'Montant (CDF)' },
  { th: 'Montant (USD)' },
  { th: 'Date' },
]

export const getProductQtyTypeOptions = (): SelectOptionType[] => [
  { label: 'ENTIER', value: 'ENTIER' },
  { label: 'DÉCIMAL', value: 'DECIMAL' },
]

/**
 *
 * @param state
 * @param setState
 * @param setErrors
 * @param setTaxes
 * @param onSubmit
 * @param onHide
 * @param navigate
 */
export async function onApproSubmit(
  state: SaveAppro,
  setState: Dispatch<SetStateAction<SaveAppro>>,
  setErrors: Dispatch<SetStateAction<ApproError>>,
  setTaxes: Dispatch<SetStateAction<BaseTaxeInt[]>>,
  onSubmit: (data: SaveAppro) => Promise<any>,
  onHide: () => void,
  navigate?: NavigateFunction
): Promise<void> {
  
  setErrors(initApproProdutErrorState())
  
  onHide()
  
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
      setState(initApproProdutState())
      setTaxes([])
      if (navigate) navigate('/app/approvisionnements')
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}

export const onApproProductChange = (
  event: SingleValue<SelectOptionType>,
  setProduct: Dispatch<SetStateAction<SingleValue<SelectOptionType>>>,
  setData: Dispatch<SetStateAction<ApproProductItem>>
): void => {
  setProduct(event)
  const data: { uniteID: number; unite: string | null } = event && event?.data ? event.data : {
    uniteID: 0,
    unite: null,
  }
  setData(state => {
    return {
      ...state,
      uniteID: data.uniteID,
      id: event && event?.id ? event.id : 0,
      nom: event ? event.label.toUpperCase() : '',
      unite: data?.unite ? data.unite : event && event?.data ? event.data?.unite : '',
    }
  })
}

export const onApproPrixHTChange = (
  e: ChangeEvent<HTMLInputElement>,
  setState: Dispatch<SetStateAction<ApproProductItem>>
): void => {
  setState(state => {
    const prices: PriceType = onSetPrixHtChange(e, state.tva)
    const prixHt: number = prices.prixHt
    const prixTtc: number = prices.prixTtc
    
    return {
      ...state,
      prixHt,
      prixTtc,
    }
  })
}

export const onApproTaxeChange = (
  e: ChangeEvent<HTMLInputElement>,
  setState: Dispatch<SetStateAction<ApproProductItem>>,
): void => {
  setState(state => {
    const prices: PriceType = onSetTaxChange(e, state.prixHt)
    
    let tva: number = prices.taxe
    let prixTtc: number = prices.prixTtc
    
    return {
      ...state,
      tva,
      prixTtc,
    }
  })
}

export const onApproOtherQtyChange = (
  isBy: boolean,
  setIsBy: Dispatch<SetStateAction<boolean>>,
  setState: Dispatch<SetStateAction<ApproProductItem>>
): void => {
  const show: boolean = !isBy
  setState(state => {
    return {
      ...state,
      qty: show ? 1 : null,
      unite: show ? '' : null,
      realQty: show ? 1 : null,
      price: show ? 0 : null,
      quantite: 1,
      prixHt: 0,
      prixTtc: 0,
      tva: 0,
    }
  })
  
  setIsBy(show)
}

export const onApproRealQtyChange = (
  e: ChangeEvent<HTMLInputElement>,
  data: ApproProductItem,
  setState: Dispatch<SetStateAction<ApproProductItem>>
): void => {
  setState(state => {
    const value: number = Number(e.target.value)
    const realQty: number = isNaN(value) || value < 0 ? 0 : value
    const quantite: number = state.qty * realQty
    const price: number = state?.price ?? 0
    
    let prixTtc: number
    const tva: number = data.tva
    let prixHt: number = price > 0 ? price / realQty : 0
    
    if (tva > 0 && prixHt > 0) {
      const sum: number = (prixHt * tva) / 100
      prixTtc = prixHt + sum
    } else prixTtc = prixHt
    
    return {
      ...state,
      realQty,
      quantite,
      prixHt,
      prixTtc,
    }
  })
}

export const addOnApproCartSubmit = (
  e: FormEvent<HTMLFormElement>,
  state: SaveAppro,
  setState: Dispatch<SetStateAction<SaveAppro>>,
  data: ApproProductItem,
  setData: Dispatch<SetStateAction<ApproProductItem>>,
  setProduct: Dispatch<SetStateAction<SingleValue<SelectOptionType>>>,
  setIsBy: Dispatch<SetStateAction<boolean>>,
  taux: number,
  setTaxes: Dispatch<SetStateAction<BaseTaxeInt[]>>,
): void => {
  e.preventDefault()
  let productItems: ApproProductItem[] = [...state.productItems]
  
  if (productItems.length < 1) {
    productItems.push(data)
    if (data.tva > 0) {
      const id: number = data.id
      let tva: number = data.tva
      let price: number = data?.price && data.price > 0.00 ? data.price : data.prixHt
      let quantity: number = data?.qty && data.qty > 0.00 ? data.qty : data.quantite
      
      let baseHT: number = price * quantity
      let sum: number = (baseHT * tva) / 100
      let amount: number = baseHT + sum
      
      setTaxes(taxes => [...taxes, { id, tva, baseHT, amount }])
    }
  }
  
  if (productItems.length > 0) {
    const findData: ApproProductItem | undefined = productItems.find((p: ApproProductItem): boolean => p.id === data.id)
    if (!findData) {
      productItems.push(data)
      if (data.tva > 0) {
        const id: number = data.id
        const tva: number = data.tva
        let price: number = data?.price ?? data.prixHt
        let quantity: number = data?.qty ?? data.quantite
        
        const baseHT: number = price * quantity
        let sum: number = (baseHT * tva) / 100
        let amount: number = baseHT + sum
        
        setTaxes(taxes => {
          const findTax = taxes.find(tax => tax.tva === tva)
          
          if (findTax) {
            findTax.baseHT += baseHT
            sum = (findTax.baseHT * findTax.tva) / 100
            findTax.amount = sum
          } else taxes.push({ id, tva, baseHT, amount })
          
          return [...taxes]
        })
      }
    }
  }
  
  setState(prev => {
    return {
      ...prev,
      productItems,
    }
  })
  
  setIsBy(false)
  setProduct(null)
  setData(initApproProductItem())
}

export const onApproPriceChange = (
  e: ChangeEvent<HTMLInputElement>,
  setData: Dispatch<SetStateAction<ApproProductItem>>
): void => {
  setData(state => {
    const value: number = Number(e.target.value)
    const price: number = isNaN(value) || value < 0 ? 0 : value
    const realQty: number | null = state?.realQty ?? null
    
    let prixTtc: number
    
    const tva: number = state.tva
    let prixHt: number = price > 0 ? price / realQty : 0
    
    if (tva > 0 && prixHt > 0) {
      const sum: number = (prixHt * tva) / 100
      prixTtc = prixHt + sum
    } else prixTtc = prixHt
    
    return {
      ...state,
      realQty,
      prixHt,
      prixTtc,
      price,
    }
  })
}

export const onApproQtyChange = (
  e: ChangeEvent<HTMLInputElement>,
  setData: Dispatch<SetStateAction<ApproProductItem>>): void => {
  setData(state => {
    const value: number = Number(e.target.value)
    const qty: number = isNaN(value) || value < 0 ? 0 : value
    
    const realQty: number = state?.realQty ?? 0
    const quantite: number = qty * realQty
    
    return {
      ...state,
      qty,
      quantite,
    }
  })
}

export const onApproCurrencyChange = (
  e: ChangeEvent<HTMLSelectElement>,
  state: SaveAppro,
  setState: Dispatch<SetStateAction<SaveAppro>>,
  taux: number,
  setTaxes: Dispatch<SetStateAction<BaseTaxeInt[]>>
): void => {
  const value: string = e.target.value
  let devise: string
  
  setState(prev => {
    const productItems = prev.productItems.map(product => {
      let prixHt = product.prixHt
      let prixTtc = product.prixTtc
      let price = product.price
      
      if (value === 'USD' && prev.devise === 'CDF') {
        // Conversion CDF -> USD
        prixHt = prixHt / taux
        prixTtc = prixTtc / taux
        price = price ? price / taux : null
      } else if (value === 'CDF' && prev.devise === 'USD') {
        // Conversion USD -> CDF
        prixHt = prixHt * taux
        prixTtc = prixTtc * taux
        price = price ? price * taux : null
      }
      
      return { ...product, price, prixHt, prixTtc }
    })
    
    devise = value
    
    return {
      ...prev,
      devise: value,
      productItems,
    }
  })
  
  setTaxes(taxes => taxes.map(tax => {
    if (value === 'USD' && state.devise === 'CDF') {
      tax.baseHT = tax.baseHT / taux
      tax.amount = tax.amount / taux
    } else if (value === 'CDF' && state.devise === 'USD') {
      tax.baseHT = tax.baseHT * taux
      tax.amount = tax.amount * taux
    }
    
    return tax
  }))
}

export const onApproRemoveProduct = (
  index: number,
  products: ApproProductItem[],
  setState: Dispatch<SetStateAction<SaveAppro>>,
  setTaxes: Dispatch<SetStateAction<BaseTaxeInt[]>>,
  tva: number
): void => {
  const productItems = [...products]
  
  const removedProduct = productItems[index]
  
  productItems.splice(index, 1)
  setState(prev => ({ ...prev, productItems }))
  
  if (removedProduct) {
    const price = removedProduct.price ?? removedProduct.prixHt
    const quantity = removedProduct.qty ?? removedProduct.quantite
    const baseHT = price * quantity
    
    setTaxes(prevTaxes => {
      let taxes = [...prevTaxes]
      const findTax = taxes.find(t => t.tva === tva)
      
      if (findTax) {
        findTax.baseHT -= baseHT
        const sum: number = (findTax.baseHT * findTax.tva) / 100
        findTax.amount = findTax.baseHT + sum
        
        if (findTax.baseHT <= 0 || findTax.amount <= 0) {
          taxes = taxes.filter(t => t.tva !== tva)
        }
      }
      
      return taxes
    })
  }
}


export const onApproReset = (
  setState: Dispatch<SetStateAction<SaveAppro>>,
  setTaxes: Dispatch<SetStateAction<BaseTaxeInt[]>>
): void => {
  setTaxes([])
  setState(state => ({ ...state, productItems: [] }))
}

export const getApproSubTotal = (products: ApproProdut[]): number => {
  let subTotal: number = 0
  
  if (products.length > 0) products.forEach((product: ApproProdut): void => {
    const price: number = product?.price && product.price > 0 ? Number(product.price) : Number(product.prixHt)
    const quantity: number = product?.qty && product.qty > 0 ? Number(product.qty) : Number(product.quantite)
    subTotal += (price * quantity)
  })
  
  return subTotal
}

export const getApproSubTotalWithDiscount = (subTotal: number, discount: number): number => {
  if (discount > 0.00) {
    const discountAmount: number = (subTotal * discount) / 100
    subTotal -= discountAmount
  }
  
  return subTotal
}

export const getApproTaxTotal = (taxes: BaseTaxeInt[]): number => {
  let taxesAmount: number = 0
  if (taxes.length > 0) taxes.forEach((tax: BaseTaxeInt): void => {
    taxesAmount += tax.amount
  })
  
  return taxesAmount
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
