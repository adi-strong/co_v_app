import type {BaseTaxeInt} from "../../../../interfaces/BaseTaxeInt.ts";
import {useCallback} from "react";

export default function useGetApproTaxTotal(taxes: BaseTaxeInt[]) {
  
  return useCallback(() => {
    let taxesAmount: number = 0
    if (taxes.length > 0) taxes.forEach((tax: BaseTaxeInt): void => {
      taxesAmount += tax.amount
    })
    
    return taxesAmount
  }, [taxes])
  
}
