import type {ApproProdut} from "../model/approService.ts";
import {Dispatch, SetStateAction, useEffect} from "react";
import type {BaseTaxeInt} from "../../../../interfaces/BaseTaxeInt.ts";

export default function useSetApproTaxesData(
  products?: ApproProdut[],
  setTaxes?: Dispatch<SetStateAction<BaseTaxeInt[]>>) {
  
  useEffect((): void => {
    const taxes: BaseTaxeInt[] = []
    if (products && setTaxes) {
      products.forEach((prod: ApproProdut, index: number): void => {
        const id = prod.id
        const tva = prod?.tva ? Number(prod.tva) : 0
        const price = prod?.price && Number(prod.price) > 0 ? Number(prod.price) : Number(prod.prixHt)
        const quantity = prod?.price && Number(prod.qty) > 0 ? Number(prod.qty) : Number(prod.quantite)
        
        const baseHT: number = price * quantity
        let sum: number = (baseHT * tva) / 100
        let amount: number = baseHT + sum
        
        if (index < 1) taxes.push({ id, tva, baseHT, amount })
        
        if (index > 0) {
          const findTax = taxes.find(tax => tax.tva === tva)
          
          if (findTax) {
            findTax.baseHT += baseHT
            sum = (findTax.baseHT * findTax.tva) / 100
            findTax.amount = sum
          } else taxes.push({ id, tva, baseHT, amount })
        }
      })
      
      setTaxes(taxes)
    }
  }, [products, setTaxes]);
  
}
