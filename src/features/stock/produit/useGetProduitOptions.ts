import {useCallback} from "react";
import type {Produit} from "./model/produitService.ts";
import {getProduitFakeData} from "./model/produitService.ts";
import type {SelectOptionType} from "../../../services/services.ts";

export default function useGetProduitOptions() {
  
  const products: Produit[] = getProduitFakeData()
  
  return useCallback(() => {
    const options: SelectOptionType[] = []
    
    if (products.length > 0) products.forEach(({ id, nom, fkUnite }): void => {
      const data: { uniteID: number; unite: string | null } = {
        uniteID: fkUnite ? fkUnite.id : 0,
        unite: fkUnite ? fkUnite.nom : null,
      }
      options.push({
        label: nom.toString(),
        value: nom.toString(),
        data,
        id,
      })
    })
    
    return options
  }, [products])
  
}
