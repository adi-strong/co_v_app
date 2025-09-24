import type {DesignationBonDeDepense} from "../model/bonDeDepensesService.ts";
import {useCallback} from "react";

export default function useGetExpenseAmount(designations: DesignationBonDeDepense[]) {
  
  return useCallback(() => {
    let sum: number = 0
    
    if (designations.length > 0) {
      designations.forEach(({ qte, prixUnitaire }): void => {
        const quantity = Number(qte)
        const price = Number(prixUnitaire)
        
        sum += (price * quantity)
      })
    }
    
    return sum
  }, [designations])
  
}
