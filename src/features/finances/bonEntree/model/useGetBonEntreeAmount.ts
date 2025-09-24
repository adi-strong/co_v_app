import {useCallback} from "react";
import type {DesignationBonEntree} from "./bonEntreeService.ts";

export default function useGetBonEntreeAmount(designations: DesignationBonEntree[]) {
  
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
